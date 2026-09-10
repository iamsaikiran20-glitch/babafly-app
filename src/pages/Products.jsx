import { useEffect, useState } from 'react'
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
  },
  {
    id: 2,
    name: 'Diamond Necklace',
    price: 24999,
    category: 'Necklaces',
    metal: 'Diamond',
    polish: 'Glossy',
    image: '📿',
  },
  {
    id: 3,
    name: 'Classic Gold Earrings',
    price: 8999,
    category: 'Earrings',
    metal: 'Gold',
    polish: 'Matte',
    image: '✨',
  },
  {
    id: 4,
    name: 'Premium Bracelet',
    price: 15999,
    category: 'Bracelets',
    metal: 'Gold',
    polish: 'Glossy',
    image: '💎',
  },
]

function Products({ addToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Search
  const [search, setSearch] = useState('')

  // Filters
  const [category, setCategory] = useState('All')
  const [metal, setMetal] = useState('All')
  const [polish, setPolish] = useState('All')
  const [maxPrice, setMaxPrice] = useState(50000)

  // Sorting
  const [sort, setSort] = useState('default')

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)

  const [added, setAdded] = useState(null)

  const productsPerPage = 4

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()

        const productList = Array.isArray(data)
          ? data
          : data.products || data.data || []

        setProducts(productList)
      } catch (error) {
        console.log('API unavailable. Using demo products.')
        setProducts(fallbackProducts)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, category, metal, polish, maxPrice, sort])

  // Filter + search + sort
  const filteredProducts = products
    .filter((product) => {
      const productName = product.name?.toLowerCase() || ''

      const matchesSearch = productName.includes(
        search.toLowerCase()
      )

      const matchesCategory =
        category === 'All' ||
        product.category === category

      const matchesMetal =
        metal === 'All' ||
        product.metal === metal

      const matchesPolish =
        polish === 'All' ||
        product.polish === polish

      const matchesPrice =
        Number(product.price) <= maxPrice

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMetal &&
        matchesPolish &&
        matchesPrice
      )
    })
    .sort((a, b) => {
      if (sort === 'low') {
        return Number(a.price) - Number(b.price)
      }

      if (sort === 'high') {
        return Number(b.price) - Number(a.price)
      }

      if (sort === 'name') {
        return a.name.localeCompare(b.name)
      }

      return 0
    })

  // Pagination
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  )

  const startIndex =
    (currentPage - 1) * productsPerPage

  const visibleProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  )

  // Add to cart
  const handleAdd = (product) => {
    addToCart(product)

    setAdded(product.id)

    setTimeout(() => {
      setAdded(null)
    }, 1000)
  }

  // Clear filters
  const clearFilters = () => {
    setSearch('')
    setCategory('All')
    setMetal('All')
    setPolish('All')
    setMaxPrice(50000)
    setSort('default')
    setCurrentPage(1)
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <h1 className="text-4xl font-bold">
          Explore Jewellery
        </h1>

        <p className="mt-3 text-gray-600">
          Find something beautiful for every occasion.
        </p>

        {/* Search */}
        <div className="mt-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jewellery..."
            className="w-full rounded-xl border bg-white px-5 py-4 outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        {/* Filters */}
        <div className="mt-6 grid gap-4 rounded-xl bg-white p-5 shadow sm:grid-cols-2 lg:grid-cols-5">

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border px-4 py-3"
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
            className="rounded-lg border px-4 py-3"
          >
            <option value="All">All Metals</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Diamond">Diamond</option>
          </select>

          {/* Polish */}
          <select
            value={polish}
            onChange={(e) => setPolish(e.target.value)}
            className="rounded-lg border px-4 py-3"
          >
            <option value="All">All Polish</option>
            <option value="Glossy">Glossy</option>
            <option value="Matte">Matte</option>
          </select>

          {/* Price */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Max Price: ₹{maxPrice}
            </label>

            <input
              type="range"
              min="5000"
              max="50000"
              step="1000"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(Number(e.target.value))
              }
              className="w-full"
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border px-4 py-3"
          >
            <option value="default">Sort By</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
            <option value="name">Name: A → Z</option>
          </select>

        </div>

        {/* Clear filters */}
        <button
          onClick={clearFilters}
          className="mt-4 rounded-full border px-5 py-2 font-medium transition hover:bg-gray-900 hover:text-white"
        >
          Clear Filters
        </button>

        {/* Loading */}
        {loading && (
          <div className="mt-12 text-center">
            <p className="text-gray-500">
              Loading products...
            </p>
          </div>
        )}

        {/* Products */}
        {!loading && (
          <>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-xl bg-white p-4 shadow transition hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* Image */}
                  <div className="flex h-44 items-center justify-center bg-gray-100 text-6xl">
                    {product.image || '💎'}
                  </div>

                  {/* Category */}
                  <p className="mt-4 text-sm text-gray-500">
                    {product.category}
                  </p>

                  {/* Product name */}
                  <h2 className="font-bold">
                    {product.name}
                  </h2>

                  {/* Metal */}
                  {product.metal && (
                    <p className="mt-1 text-sm text-gray-500">
                      Metal: {product.metal}
                    </p>
                  )}

                  {/* Polish */}
                  {product.polish && (
                    <p className="text-sm text-gray-500">
                      Polish: {product.polish}
                    </p>
                  )}

                  {/* Price */}
                  <p className="mt-2 font-bold">
                    ₹{product.price}
                  </p>

                  {/* Cart */}
                  <button
                    onClick={() => handleAdd(product)}
                    className="mt-4 w-full rounded-full bg-gray-900 py-3 font-semibold text-white transition hover:bg-gray-700"
                  >
                    {added === product.id
                      ? '✓ Added to Cart'
                      : 'Add to Cart'}
                  </button>

                </div>
              ))}

            </div>

            {/* Empty state */}
            {visibleProducts.length === 0 && (
              <div className="mt-12 rounded-xl bg-white p-10 text-center shadow">
                <p className="text-lg font-semibold">
                  No products found
                </p>

                <p className="mt-2 text-gray-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-3">

                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => page - 1)
                  }
                  className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Previous
                </button>

                <span className="font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => page + 1)
                  }
                  className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next →
                </button>

              </div>
            )}

          </>
        )}

      </div>
    </main>
  )
}

export default Products