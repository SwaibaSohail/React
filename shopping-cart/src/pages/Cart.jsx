import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

export default function Cart() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Your Cart</h1>
        <p className="text-slate-400 mb-8">Your cart is empty.</p>
        <Link to="/shop" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
          Start Shopping
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Items list */}
        <div className="flex-1 space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-slate-800 rounded-xl p-4 flex items-center gap-4">
              <div className="bg-white rounded-lg p-2 w-16 h-16 flex-shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm line-clamp-2">{item.title}</h3>
                <p className="text-indigo-400 font-semibold">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className="w-16 bg-slate-700 text-white text-center rounded-lg p-1 border border-slate-600"
                  aria-label={`Quantity for ${item.title}`}
                />
                <span className="text-slate-400 text-sm w-16 text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-slate-400 hover:text-red-400 transition-colors p-1"
                  aria-label={`Remove ${item.title}`}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Order summary */}
        <div className="lg:w-72">
          <div className="bg-slate-800 rounded-xl p-6 sticky top-20">
            <h2 className="text-white font-bold text-xl mb-4">Order Summary</h2>
            <div className="space-y-2 text-slate-400 mb-4">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between border-t border-slate-700 pt-2 text-white font-semibold">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition-colors">
              Checkout
            </button>
            <Link to="/shop" className="block text-center text-slate-400 hover:text-white mt-3 text-sm transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
