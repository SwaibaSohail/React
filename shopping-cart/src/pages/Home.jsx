import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center px-4 text-center">
      {/* Decorative glow blob */}
      <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <p className="text-indigo-400 font-semibold uppercase tracking-widest text-sm mb-4">
        Welcome to NexCart
      </p>

      <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 relative">
        Discover.{' '}
        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Shop.
        </span>{' '}
        Repeat.
      </h1>

      <p className="text-slate-400 text-xl mb-10 max-w-md relative">
        NexCart brings you the best products at unbeatable prices — curated just for you.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 relative">
        <Link
          to="/shop"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Shop Now
        </Link>
        <Link
          to="/shop"
          className="border border-slate-600 hover:border-indigo-400 text-slate-300 hover:text-indigo-300 font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Browse Catalog
        </Link>
      </div>

      {/* Feature badges */}
      <div className="flex flex-wrap justify-center gap-6 mt-16 text-slate-500 text-sm relative">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
          Free Shipping
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
          Easy Returns
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" />
          Secure Checkout
        </span>
      </div>
    </main>
  )
}
