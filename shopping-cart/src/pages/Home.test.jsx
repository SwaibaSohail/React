import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  )
}

describe('Home page', () => {
  it('renders the NexCart brand name', () => {
    renderHome()
    // NexCart appears in multiple elements; confirm at least one is present
    const matches = screen.getAllByText(/NexCart/i)
    expect(matches.length).toBeGreaterThan(0)
  })

  it('renders the "Shop Now" link', () => {
    renderHome()
    expect(screen.getByRole('link', { name: /shop now/i })).toBeInTheDocument()
  })

  it('"Shop Now" link points to /shop', () => {
    renderHome()
    const shopNowLink = screen.getByRole('link', { name: /shop now/i })
    expect(shopNowLink).toHaveAttribute('href', '/shop')
  })
})
