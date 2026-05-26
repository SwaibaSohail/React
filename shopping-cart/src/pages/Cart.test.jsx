import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import { useCart } from '../hooks/useCart'
import Cart from './Cart'
import { useEffect } from 'react'

const MOCK_ITEM = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  image: 'https://example.com/img.jpg',
  rating: { rate: 4.5, count: 100 },
}

const MOCK_ITEM_2 = {
  id: 2,
  title: 'Second Product',
  price: 10.00,
  image: 'https://example.com/img2.jpg',
  rating: { rate: 4.0, count: 50 },
}

// Helper: seeds items then renders Cart
function CartSeeded({ items = [MOCK_ITEM] }) {
  return (
    <MemoryRouter>
      <CartProvider>
        <Seeder items={items} />
      </CartProvider>
    </MemoryRouter>
  )
}

function Seeder({ items }) {
  const { addItem } = useCart()
  useEffect(() => {
    items.forEach(item => addItem(item))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Cart />
}

// Helper: empty cart render
function renderCart() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Cart />
      </CartProvider>
    </MemoryRouter>
  )
}

describe('Cart page', () => {
  test('1. renders "Your cart is empty" when cart is empty', () => {
    renderCart()
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
  })

  test('2. "Start Shopping" link points to /shop', () => {
    renderCart()
    const link = screen.getByRole('link', { name: /start shopping/i })
    expect(link).toHaveAttribute('href', '/shop')
  })

  test('3. renders item title when cart has items', async () => {
    render(<CartSeeded />)
    expect(await screen.findByText('Test Product')).toBeInTheDocument()
  })

  test('4. renders item price', async () => {
    render(<CartSeeded />)
    // The unit price is rendered in a <p> with class text-indigo-400
    const prices = await screen.findAllByText('$29.99')
    expect(prices.length).toBeGreaterThan(0)
  })

  test('5. remove button removes item from cart', async () => {
    render(<CartSeeded />)
    expect(await screen.findByText('Test Product')).toBeInTheDocument()
    const removeBtn = screen.getByRole('button', { name: /remove test product/i })
    act(() => { fireEvent.click(removeBtn) })
    expect(screen.queryByText('Test Product')).not.toBeInTheDocument()
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
  })

  test('6. quantity input updates quantity', async () => {
    render(<CartSeeded />)
    const qtyInput = await screen.findByRole('spinbutton', { name: /quantity for test product/i })
    expect(qtyInput).toHaveValue(1)
    act(() => { fireEvent.change(qtyInput, { target: { value: '3' } }) })
    expect(qtyInput).toHaveValue(3)
  })

  test('7. shows correct subtotal', async () => {
    render(<CartSeeded items={[MOCK_ITEM, MOCK_ITEM_2]} />)
    // 29.99 + 10.00 = 39.99
    expect(await screen.findByText('$39.99')).toBeInTheDocument()
  })

  test('8. "Continue Shopping" link points to /shop', async () => {
    render(<CartSeeded />)
    await screen.findByText('Test Product') // wait for items
    const link = screen.getByRole('link', { name: /continue shopping/i })
    expect(link).toHaveAttribute('href', '/shop')
  })
})
