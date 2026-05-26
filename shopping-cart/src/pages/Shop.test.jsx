import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import Shop from './Shop'

const mockProducts = [
  { id: 1, title: 'Product 1', price: 9.99, image: 'img1.jpg', rating: { rate: 4.5, count: 100 } },
  { id: 2, title: 'Product 2', price: 19.99, image: 'img2.jpg', rating: { rate: 3.8, count: 50 } },
]

function renderShop() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Shop />
      </CartProvider>
    </MemoryRouter>
  )
}

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('Shop page', () => {
  it('shows loading text while fetching products', () => {
    // Never resolves during this test
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))

    renderShop()

    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  it('renders product cards after successful fetch', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        })
      )
    )

    renderShop()

    // Loading visible initially
    expect(screen.getByText('Loading products...')).toBeInTheDocument()

    // Wait for products to appear
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument()
    })

    expect(screen.getByText('Product 2')).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(2)
  })

  it('shows error message when fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        })
      )
    )

    renderShop()

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch products')).toBeInTheDocument()
    })

    expect(screen.queryByText('Loading products...')).not.toBeInTheDocument()
  })

  it('retry button calls fetch again on error', async () => {
    const user = userEvent.setup()

    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    )
    vi.stubGlobal('fetch', fetchMock)

    renderShop()

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch products')).toBeInTheDocument()
    })

    const retryButton = screen.getByRole('button', { name: /retry/i })
    await user.click(retryButton)

    // fetch should have been called twice: once on mount, once on retry
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
