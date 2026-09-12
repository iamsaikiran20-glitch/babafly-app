import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    description:
      'An elegant gold ring designed with a timeless look for everyday and special occasions.',
  },
  {
    id: 2,
    name: 'Diamond Necklace',
    price: 24999,
    category: 'Necklaces',
    metal: 'Gold',
    polish: 'Diamond',
    image: '📿',
    description:
      'A beautiful necklace that combines classic elegance with a premium diamond finish.',
  },
  {
    id: 3,
    name: 'Classic Gold Earrings',
    price: 8999,
    category: 'Earrings',
    metal: 'Gold',
    polish: 'Glossy',
    image: '✨',
    description:
      'Classic gold earrings with a stylish design suitable for everyday wear.',
  },
  {
    id: 4,
    name: 'Premium Bracelet',
    price: 15999,
    category: 'Bracelets',
    metal: 'Gold',
    polish: 'Matte',
    image: '💎',
    description:
      'A premium bracelet crafted to give your look a sophisticated finish.',
  },
  {
    id: 5,
    name: 'Silver Ring',
    price: 6999,
    category: 'Rings',
    metal: 'Silver',
    polish: 'Glossy',
    image: '💍',
    description:
      'A minimal silver ring perfect for modern everyday styling.',
  },
  {
    id: 6,
    name: 'Pearl Necklace',
    price: 18999,
    category: 'Necklaces',
    metal: 'Silver',
    polish: 'Pearl',
    image: '📿',
    description:
      'A graceful pearl necklace created for an elegant and sophisticated appearance.',
  },
  {
    id: 7,
    name: 'Diamond Earrings',
    price: 29999,
    category: 'Earrings',
    metal: 'Gold',
    polish: 'Diamond',
    image: '✨',
    description:
      'Premium diamond earrings that add a luxurious touch to your style.',
  },
  {
    id: 8,
    name: 'Silver Bracelet',
    price: 9999,
    category: 'Bracelets',
    metal: 'Silver',
    polish: 'Matte',
    image: '💎',
    description:
      'A stylish silver bracelet with a clean and modern design.',
  },
]

function Products({ addToCart }) {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [metal, setMetal] = useState('All')
  const [polish, setPolish] = useState('All')
  const [maxPrice, setMaxPrice] = useState(50000)
  const [sort, setSort] = useState('default')

  const [currentPage, setCurrentPage] = useState(1)
  const [addedId, setAddedId] = useState(null)

  const productsPerPage = 4

  // Fetch products from backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts()

        let apiProducts = []

        if (Array.isArray(data)) {
          apiProducts = data
        } else if (Array.isArray(data?.products)) {
          apiProducts = data.products
        } else if (Array.isArray(data?.data)) {
          apiProducts = data.data
        }

        if (apiProducts.length > 0) {
          setProducts(apiProducts)
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

  // Filter products
  const filteredProducts = products.filter((product) => {
    const productName = String(product.name || '').toLowerCase()
    const productCategory = String(product.category || '')
    const productMetal = String(product.metal || '')
    const productPolish = String(product.polish || '')
    const productPrice = Number(product.price || 0)

    const matchesSearch = productName.includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' || productCategory === category

    const matchesMetal =
      metal === 'All' || productMetal === metal

    const matchesPolish =
      polish === 'All' || productPolish === polish

    const matchesPrice = productPrice <= maxPrice

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMetal &&
      matchesPolish &&
      matchesPrice
    )
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'low') {
      return Number(a.price) - Number(b.price)
    }

    if (sort === 'high') {
      return Number(b.price) - Number(a.price)
    }

    if (sort === 'name') {
      return String(a.name).localeCompare(String(b.name))
    }

    return 0
  })

  // Pagination
  const totalPages = Math.ceil(
    sortedProducts.length / productsPerPage
  )

  const startIndex = (currentPage - 1) * productsPerPage

  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage
  )

  const handleAddToCart = (product) => {
    addToCart(product)

    setAddedId(product.id)

    setTimeout(() => {
      setAddedId(null)
    }, 1500)
  }

  const clearFilters = () => {
    setSearch('')
    setCategory('All')
    setMetal('All')
    setPolish('All')
    setMaxPrice(50000)
    setSort('default')
    setCurrentPage(1)
  }

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, category, metal, polish, maxPrice, sort])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">

          <div className="h-10 w-48 animate-pulse rounded bg-gray-200" />

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>

        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            BabaFly Collection
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Explore Jewellery
          </h1>

          <p className="mt-2 text-gray-600">
            Find the perfect piece for every occasion.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-10 rounded-2xl bg-white p-5 shadow-sm">

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {/* Search */}
            <input
              type="text"
              placeholder="Search jewellery..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
            />

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Rings">Rings</option>
              <option value="Necklaces">Necklaces</option>
              <option value="Earrings">Earrings</option>
              <option value="Bracelets">Bracelets</option>
            </select>

            {/* Metal */}
            <select
              value={metal}
              onChange={(e) => setMetal(e.target.value)}
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none"
            >
              <option value="All">All Metals</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
            </select>

            {/* Polish */}
            <select
              value={polish}
              onChange={(e) => setPolish(e.target.value)}
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none"
            >
              <option value="All">All Polish</option>
              <option value="Glossy">Glossy</option>
              <option value="Matte">Matte</option>
              <option value="Diamond">Diamond</option>
              <option value="Pearl">Pearl</option>
            </select>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Maximum Price: ₹{maxPrice.toLocaleString('en-IN')}
              </label>

              <input
                type="range"
                min="5000"
                max="50000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none"
            >
              <option value="default">Sort: Default</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>

          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="mt-5 rounded-full border border-gray-900 px-5 py-2 text-sm font-semibold transition hover:bg-gray-900 hover:text-white"
          >
            Clear Filters
          </button>

        </div>

        {/* Result Count */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-gray-600">
            Showing {sortedProducts.length} product
            {sortedProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Empty State */}
        {paginatedProducts.length === 0 && (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

            <div className="text-6xl">🔍</div>

            <h2 className="mt-5 text-2xl font-bold">
              No products found
            </h2>

            <p className="mt-2 text-gray-600">
              Try changing your search or filters.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 rounded-full bg-gray-900 px-6 py-3 font-semibold text-white"
            >
              Clear Filters
            </button>

          </div>
        )}

        {/* Product Grid */}
        {paginatedProducts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {paginatedProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Product Image */}
                <button
                  onClick={() =>
                    navigate(`/products/${product.id}`, {
                      state: { product },
                    })
                  }
                  className="flex h-52 w-full items-center justify-center bg-gray-100 text-7xl"
                >
                  {product.image || '💎'}
                </button>

                <div className="p-5">

                  {/* Category */}
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    {product.category || 'Jewellery'}
                  </p>

                  {/* Name */}
                  <button
                    onClick={() =>
                      navigate(`/products/${product.id}`, {
                        state: { product },
                      })
                    }
                    className="mt-2 block text-left text-lg font-bold text-gray-900 hover:underline"
                  >
                    {product.name}
                  </button>

                  {/* Price */}
                  <p className="mt-3 text-xl font-bold">
                    ₹{Number(product.price).toLocaleString('en-IN')}
                  </p>

                  {/* Add to Cart */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 w-full rounded-full bg-gray-900 py-3 font-semibold text-white transition hover:bg-gray-700"
                  >
                    {addedId === product.id
                      ? '✓ Added'
                      : 'Add to Cart'}
                  </button>

                </div>
              </article>
            ))}

          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="rounded-full border px-5 py-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>

            <span className="font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="rounded-full border px-5 py-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>

          </div>
        )}

      </div>
    </main>
  )
}

export default Products