import { useState, useEffect } from 'react'
import { fetchProducts } from '../services/api'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadProducts = () => {
    setLoading(true)
    setError(null)
    fetchProducts()
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    loadProducts()
  }, [])

  if (loading)
    return (
      <div className="min-h-[calc(100vh-64px)] bg-slate-900 flex items-center justify-center">
        <p className="text-slate-300 text-lg animate-pulse">Loading products...</p>
      </div>
    )

  if (error)
    return (
      <div className="min-h-[calc(100vh-64px)] bg-slate-900 flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 text-lg">{error}</p>
        <button
          onClick={loadProducts}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    )

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-900 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Shop</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  )
}
