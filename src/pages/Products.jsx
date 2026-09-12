import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getProducts } from '../utils/apiService'

const fallbackProducts = [
  {
    id: 1,
    name: 'Elegant Gold Ring',
    price: 12999,
    category: 'Rings',
    metal: 'Gold',
    polish: 'Glossy',
    image: '💍',
    description: 'An elegant gold ring designed with a timeless look.',
  },
  {
    id: 2,
    name: 'Diamond Necklace',
    price: 24999,
    category: 'Necklaces',
    metal: 'Gold',
    polish: 'Diamond',
    image: '📿',
    description: 'A beautiful necklace with a premium diamond finish.',
  },
  {
    id: 3,
    name: 'Classic Gold Earrings',
    price: 8999,
    category: 'Earrings',
    metal: 'Gold',
    polish: 'Glossy',
    image: '✨',
    description: 'Classic gold earrings suitable for everyday wear.',
  },
  {
    id: 4,
    name: 'Premium Bracelet',
    price: 15999,
    category: 'Bracelets',
    metal: 'Gold',
    polish: 'Matte',
    image: '💎',
    description: 'A premium bracelet with a sophisticated finish.',
  },
  {
    id: 5,
    name: 'Silver Ring',
    price: 6999,
    category: 'Rings',
    metal: 'Silver',
    polish: 'Glossy',
    image: '💍',
    description: 'A minimal silver ring for modern styling.',
  },
  {
    id: 6,
    name: 'Pearl Necklace',
    price: 18999,
    category: 'Necklaces',
    metal: 'Silver',
    polish: 'Pearl',
    image: '📿',
    description: 'A graceful pearl necklace for an elegant appearance.',
  },
  {
    id: 7,
    name: 'Diamond Earrings',
    price: 29999,
    category: 'Earrings',
    metal: 'Gold',
    polish: 'Diamond',
    image: '✨',
    description: 'Premium diamond earrings with a luxurious touch.',
  },
  {
    id: 8,
    name: 'Silver Bracelet',
    price: 9999,
    category: 'Bracelets',
    metal: 'Silver',
    polish: 'Matte',
    image: '💎',
    description: 'A stylish silver bracelet with a modern design.',
  },
]

function Products({ addToCart }) {
  const location = useLocation()
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState(
    location.state?.search || ''
  )

  const [category, setCategory] = useState(
    location.state?.category || 'All'
  )

  const [metal, setMetal] = useState('All')
  const [polish, setPolish] = useState('All')
  const [maxPrice, setMaxPrice] = useState(50000)
  const [sort, setSort] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)

  const productsPerPage = 4

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts()

        if (Array.isArray(data) && data.length > 0) {
          setProducts(data)
        } else {
          setProducts(fallbackProducts)
        }
      } catch (error) {
        console.log('Using demo products because API is unavailable.')
        setProducts(fallbackProducts)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const name = String(product.name || '').toLowerCase()

    const productCategory = String(
      product.category || ''
    )

    const productMetal = String(
      product.metal || ''
    )

    const productPolish = String(
      product.polish || ''
    )

    const price = Number(product.price || 0)

    return (
      name.includes(search.toLowerCase()) &&
      (category === 'All' ||
        productCategory === category) &&
      (metal === 'All' ||
        productMetal === metal) &&
      (polish === 'All' ||
        productPolish === polish) &&
      price <= maxPrice
    )
  })

  const sortedProducts = [...filteredProducts].sort(
    (a, b) => {
      if (sort === 'low') {
        return Number(a.price) - Number(b.price)
      }

      if (sort === 'high') {
        return Number(b.price) - Number(a.price)
      }

      if (sort === 'name') {
        return String(a.name).localeCompare(
          String(b.name)
        )
      }

      return 0
    }
  )

  const totalPages = Math.ceil(
    sortedProducts.length / productsPerPage
  )

  const startIndex =
    (currentPage - 1) * productsPerPage

  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [
    search,
    category,
    metal,
    polish,
    maxPrice,
    sort,
  ])

  const handleAddToCart = (product) => {
    addToCart(product)

    toast.success(
      `${product.name} added to cart! 🛒`
    )
  }

  const clearFilters = () => {
    setSearch('')
    setCategory('All')
    setMetal('All')
    setPolish('All')
    setMaxPrice(50000)
    setSort('default')

    navigate('/products', {
      replace: true,
      state: {},
    })
  }

  const isImageUrl = (image) => {
    return (
      typeof image === 'string' &&
      (image.startsWith('http://') ||
        image.startsWith('https://'))
    )
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-7xl">

          <div className="h-10 w-56 animate-pulse rounded bg-gray-200" />

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl bg-white p-5 shadow-sm"
              >
                <div className="h-48 rounded-xl bg-gray-200" />

                <div className="mt-4 h-5 rounded bg-gray-200" />

                <div className="mt-3 h-5 w-24 rounded bg-gray-200" />
              </div>
            ))}
          </div>

        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              BabaFly Collection
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Explore Products
            </h1>
          </div>

          <p className="text-gray-500">
            {sortedProducts.length} products found
          </p>

        </div>

        {/* Category Banner */}
        {category !== 'All' && (
          <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-gray-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm text-gray-400">
                Category
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {category}
              </h2>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-full bg-white px-5 py-2 font-semibold text-gray-900 transition hover:bg-gray-200"
            >
              Show All Products
            </button>

          </div>
        )}

        {/* Filters */}
        <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm">

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

            {/* Search */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Search
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search products..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
              >
                <option value="All">
                  All Categories
                </option>

                <option value="Rings">
                  Rings
                </option>

                <option value="Necklaces">
                  Necklaces
                </option>

                <option value="Earrings">
                  Earrings
                </option>

                <option value="Bracelets">
                  Bracelets
                </option>
              </select>
            </div>

            {/* Metal */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Metal
              </label>

              <select
                value={metal}
                onChange={(e) =>
                  setMetal(e.target.value)
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
              >
                <option value="All">
                  All Metals
                </option>

                <option value="Gold">
                  Gold
                </option>

                <option value="Silver">
                  Silver
                </option>
              </select>
            </div>

            {/* Polish */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Polish
              </label>

              <select
                value={polish}
                onChange={(e) =>
                  setPolish(e.target.value)
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
              >
                <option value="All">
                  All Polish
                </option>

                <option value="Glossy">
                  Glossy
                </option>

                <option value="Matte">
                  Matte
                </option>

                <option value="Diamond">
                  Diamond
                </option>

                <option value="Pearl">
                  Pearl
                </option>

                <option value="High Quality">
                  High Quality
                </option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Sort
              </label>

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
              >
                <option value="default">
                  Default
                </option>

                <option value="low">
                  Price: Low to High
                </option>

                <option value="high">
                  Price: High to Low
                </option>

                <option value="name">
                  Name: A to Z
                </option>
              </select>
            </div>

          </div>

          {/* Price */}
          <div className="mt-5">

            <div className="mb-2 flex justify-between">

              <label className="text-sm font-semibold text-gray-700">
                Maximum Price
              </label>

              <span className="font-semibold text-gray-900">
                ₹{maxPrice.toLocaleString('en-IN')}
              </span>

            </div>

            <input
              type="range"
              min="5"
              max="50000"
              step="100"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(Number(e.target.value))
              }
              className="w-full"
            />

          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold transition hover:bg-gray-100"
          >
            Clear Filters
          </button>

        </div>

        {/* Products */}
        {paginatedProducts.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-white p-12 text-center shadow-sm">

            <div className="text-6xl">
              🔍
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              No Products Found
            </h2>

            <p className="mt-2 text-gray-500">
              Try changing your search or filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-700"
            >
              Clear Filters
            </button>

          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Product Image */}
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/products/${product.id}`, {
                      state: { product },
                    })
                  }
                  className="flex h-56 w-full items-center justify-center overflow-hidden bg-gray-100"
                >

                  {isImageUrl(product.image) ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain p-6 transition duration-300 hover:scale-105"
                    />
                  ) : (
                    <span className="text-8xl">
                      {product.image || '💎'}
                    </span>
                  )}

                </button>

                {/* Product Info */}
                <div className="p-5">

                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    {product.category || 'Jewellery'}
                  </p>

                  <h2 className="mt-2 line-clamp-2 text-lg font-bold text-gray-900">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-xl font-bold text-gray-900">
                    ₹{Number(product.price).toLocaleString('en-IN')}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">

                    <span className="rounded-full bg-gray-100 px-3 py-1">
                      {product.metal || 'Premium'}
                    </span>

                    <span className="rounded-full bg-gray-100 px-3 py-1">
                      {product.polish || 'Quality'}
                    </span>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                    className="mt-5 w-full rounded-full bg-gray-900 py-3 font-semibold text-white transition hover:bg-gray-700"
                  >
                    Add to Cart
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  (page) => page - 1
                )
              }
              className="rounded-full border border-gray-300 px-4 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
            >
              ←
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() =>
                  setCurrentPage(page)
                }
                className={`h-10 w-10 rounded-full font-semibold ${
                  currentPage === page
                    ? 'bg-gray-900 text-white'
                    : 'border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (page) => page + 1
                )
              }
              className="rounded-full border border-gray-300 px-4 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
            >
              →
            </button>

          </div>
        )}

      </div>

    </main>
  )
}

export default Products