import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider } from '../context/CartContext'
import { useCart } from '../hooks/useCart'
import ProductCard from './ProductCard'

const mockProduct = {
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack',
  price: 109.95,
  image: 'https://fakestoreapi.com/img/81fAn2lBkiL._AC_UL640_FMwebp_QL65_.jpg',
  rating: { rate: 3.9, count: 120 },
}

function CartItemCount() {
  const { totalItems } = useCart()
  return <div data-testid="total-items">{totalItems}</div>
}

function renderWithCart(ui) {
  return render(
    <CartProvider>
      {ui}
      <CartItemCount />
    </CartProvider>
  )
}

describe('ProductCard', () => {
  it('renders product title', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
  })

  it('renders product price formatted as $X.XX', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    expect(screen.getByText('$109.95')).toBeInTheDocument()
  })

  it('renders product image with correct alt text', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    const img = screen.getByRole('img', { name: mockProduct.title })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', mockProduct.image)
  })

  it('renders rating rate and count', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    expect(screen.getByText(/3\.9/)).toBeInTheDocument()
    expect(screen.getByText(/120/)).toBeInTheDocument()
  })

  it('clicking Add to Cart adds item to cart', async () => {
    const user = userEvent.setup()
    renderWithCart(<ProductCard product={mockProduct} />)

    expect(screen.getByTestId('total-items')).toHaveTextContent('0')

    await user.click(screen.getByRole('button', { name: /add to cart/i }))

    expect(screen.getByTestId('total-items')).toHaveTextContent('1')
  })
})
