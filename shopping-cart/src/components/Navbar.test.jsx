import { render, screen, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import { useCart } from '../hooks/useCart'
import Navbar from './Navbar'

// Wrapper with both CartProvider and MemoryRouter
function renderNavbar(initialEntries = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <CartProvider>
        <Navbar />
      </CartProvider>
    </MemoryRouter>
  )
}

// Helper component that adds items to cart on mount
function NavbarWithItems({ items }) {
  return (
    <MemoryRouter>
      <CartProvider>
        <AddItemsOnMount items={items} />
        <Navbar />
      </CartProvider>
    </MemoryRouter>
  )
}

function AddItemsOnMount({ items }) {
  const { addItem } = useCart()
  // Use a ref to only run once
  const hasAdded = React.useRef(false)

  React.useEffect(() => {
    if (!hasAdded.current) {
      hasAdded.current = true
      items.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
          addItem({ id: item.id, name: item.name, price: item.price })
        }
      })
    }
  }, [addItem, items])

  return null
}

import React from 'react'

describe('Navbar', () => {
  test('renders NexCart brand text', () => {
    renderNavbar()
    expect(screen.getByText('NexCart')).toBeInTheDocument()
  })

  test('has a link to Home (/)', () => {
    renderNavbar()
    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).toHaveAttribute('href', '/')
  })

  test('has a link to Shop (/shop)', () => {
    renderNavbar()
    const shopLink = screen.getByRole('link', { name: /shop/i })
    expect(shopLink).toHaveAttribute('href', '/shop')
  })

  test('has a link to Cart (/cart)', () => {
    renderNavbar()
    // The cart link has aria-label="Cart" — query by exact label to avoid matching "NexCart"
    const cartLink = screen.getByRole('link', { name: /^cart$/i })
    expect(cartLink).toHaveAttribute('href', '/cart')
  })

  test('cart badge is not visible when cart is empty', () => {
    renderNavbar()
    expect(screen.queryByTestId('cart-badge')).not.toBeInTheDocument()
  })

  test('cart badge shows correct count when items are in cart', async () => {
    render(
      <NavbarWithItems
        items={[
          { id: 1, name: 'Widget A', price: 9.99, quantity: 2 },
          { id: 2, name: 'Widget B', price: 4.99, quantity: 1 },
        ]}
      />
    )

    // Wait for effects to run and badge to appear
    const badge = await screen.findByTestId('cart-badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent('3')
  })

  test('NexCart brand links to /', () => {
    renderNavbar()
    const brandLink = screen.getByText('NexCart').closest('a')
    expect(brandLink).toHaveAttribute('href', '/')
  })
})
