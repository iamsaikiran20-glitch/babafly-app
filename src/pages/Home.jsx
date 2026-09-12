import { useNavigate } from 'react-router-dom'

const featuredProducts = [
  {
    id: 1,
    name: 'Elegant Gold Ring',
    price: 12999,
    category: 'Rings',
    image: '💍',
  },
  {
    id: 2,
    name: 'Diamond Necklace',
    price: 24999,
    category: 'Necklaces',
    image: '📿',
  },
  {
    id: 3,
    name: 'Classic Gold Earrings',
    price: 8999,
    category: 'Earrings',
    image: '✨',
  },
  {
    id: 4,
    name: 'Premium Bracelet',
    price: 15999,
    category: 'Bracelets',
    image: '💎',
  },
]

const categories = [
  {
    name: 'Rings',
    icon: '💍',
  },
  {
    name: 'Necklaces',
    icon: '📿',
  },
  {
    name: 'Earrings',
    icon: '✨',
  },
  {
    name: 'Bracelets',
    icon: '💎',
  },
]

function Home() {
  const navigate = useNavigate()

  const handleCategoryClick = (category) => {
    navigate('/products', {
      state: {
        category,
      },
    })
  }

  const handleSearch = (event) => {
    event.preventDefault()

    const searchValue =
      event.target.search.value.trim()

    if (!searchValue) {
      navigate('/products')
      return
    }

    navigate('/products', {
      state: {
        search: searchValue,
      },
    })
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="bg-gray-900 px-6 py-20 text-white md:py-28">

        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-300">
              Welcome to BabaFly
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-tight md:text-6xl">
              Jewellery that
              <span className="block">
                tells your story.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Discover beautifully crafted jewellery designed
              to make every moment special.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <button
                onClick={() => navigate('/products')}
                className="rounded-full bg-white px-7 py-3 font-semibold text-gray-900 transition hover:bg-gray-200"
              >
                Shop Collection
              </button>

              <button
                onClick={() => navigate('/categories')}
                className="rounded-full border border-white px-7 py-3 font-semibold transition hover:bg-white hover:text-gray-900"
              >
                Explore Categories
              </button>

            </div>

          </div>

          {/* Hero visual */}
          <div className="flex min-h-[350px] items-center justify-center rounded-3xl bg-gray-800">

            <div className="text-center">

              <div className="text-9xl">
                💎
              </div>

              <p className="mt-5 text-gray-300">
                Timeless Jewellery
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= SEARCH ================= */}
      <section className="px-6 py-10">

        <div className="mx-auto max-w-4xl">

          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-3 sm:flex-row"
          >

            <input
              name="search"
              type="text"
              placeholder="Search for rings, necklaces, earrings..."
              className="flex-1 rounded-full border border-gray-300 bg-white px-6 py-4 outline-none transition focus:border-gray-900"
            />

            <button
              type="submit"
              className="rounded-full bg-gray-900 px-8 py-4 font-semibold text-white transition hover:bg-gray-700"
            >
              Search
            </button>

          </form>

        </div>

      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="px-6 py-12">

        <div className="mx-auto max-w-6xl">

          <div className="mb-8 flex items-end justify-between">

            <div>

              <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                Collections
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Shop by Category
              </h2>

            </div>

            <button
              onClick={() => navigate('/categories')}
              className="hidden font-semibold text-gray-900 sm:block"
            >
              View All →
            </button>

          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {categories.map((category) => (

              <button
                key={category.name}
                onClick={() =>
                  handleCategoryClick(category.name)
                }
                className="group rounded-3xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-5xl transition group-hover:scale-110">
                  {category.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Explore Collection →
                </p>

              </button>

            ))}

          </div>

        </div>

      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="px-6 py-12">

        <div className="mx-auto max-w-6xl">

          <div className="mb-8">

            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Handpicked For You
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Featured Jewellery
            </h2>

          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {featuredProducts.map((product) => (

              <article
                key={product.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                <button
                  onClick={() =>
                    navigate(
                      `/products/${product.id}`,
                      {
                        state: { product },
                      }
                    )
                  }
                  className="flex h-56 w-full items-center justify-center bg-gray-100 text-8xl"
                >
                  {product.image}
                </button>

                <div className="p-5">

                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    {product.category}
                  </p>

                  <h3 className="mt-2 text-lg font-bold">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-xl font-bold">
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>

                  <button
                    onClick={() =>
                      navigate(
                        `/products/${product.id}`,
                        {
                          state: { product },
                        }
                      )
                    }
                    className="mt-4 w-full rounded-full border border-gray-900 py-3 font-semibold transition hover:bg-gray-900 hover:text-white"
                  >
                    View Product
                  </button>

                </div>

              </article>

            ))}

          </div>

          <div className="mt-10 text-center">

            <button
              onClick={() => navigate('/products')}
              className="rounded-full bg-gray-900 px-8 py-3 font-semibold text-white transition hover:bg-gray-700"
            >
              View All Products
            </button>

          </div>

        </div>

      </section>

      {/* ================= WHY BAB AFLY ================= */}
      <section className="px-6 py-16">

        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-sm md:p-12">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Why BabaFly
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Made for Every Special Moment
            </h2>

          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">

            <div className="text-center">

              <div className="text-4xl">
                ✨
              </div>

              <h3 className="mt-4 text-lg font-bold">
                Premium Quality
              </h3>

              <p className="mt-2 text-gray-600">
                Beautiful designs crafted with attention to detail.
              </p>

            </div>

            <div className="text-center">

              <div className="text-4xl">
                🛡️
              </div>

              <h3 className="mt-4 text-lg font-bold">
                Secure Shopping
              </h3>

              <p className="mt-2 text-gray-600">
                A simple and secure shopping experience.
              </p>

            </div>

            <div className="text-center">

              <div className="text-4xl">
                🚚
              </div>

              <h3 className="mt-4 text-lg font-bold">
                Easy Delivery
              </h3>

              <p className="mt-2 text-gray-600">
                Convenient ordering and delivery experience.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}

export default Home