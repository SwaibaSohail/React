import PropTypes from 'prop-types'
import { useCart } from '../hooks/useCart'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { title, price, image, rating } = product

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-indigo-900/30 hover:shadow-xl transition-shadow">
      <div className="bg-white p-4 h-48 flex items-center justify-center">
        <img src={image} alt={title} className="h-full w-full object-contain" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white font-medium text-sm line-clamp-2 mb-2 flex-1">{title}</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-indigo-400 font-bold text-lg">${price.toFixed(2)}</span>
          <span className="text-slate-400 text-xs">⭐ {rating.rate} ({rating.count})</span>
        </div>
        <button
          onClick={() => addItem(product)}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg transition-colors text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
}
