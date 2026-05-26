import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
          NexCart
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-slate-300 hover:text-white transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="text-slate-300 hover:text-white transition-colors font-medium"
          >
            Shop
          </Link>
          <Link
            to="/cart"
            className="relative text-slate-300 hover:text-white transition-colors"
            aria-label="Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-10H5.4m0 0L7 13m0 0l-1.5 6h13M7 13l-1.5 6m11.5-6l1.5 6"
              />
            </svg>
            {totalItems > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                data-testid="cart-badge"
              >
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
