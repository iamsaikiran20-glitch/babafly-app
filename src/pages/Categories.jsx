import { useNavigate } from 'react-router-dom'

const categories = [
  {
    name: 'Rings',
    icon: '💍',
    description: 'Elegant rings for every occasion',
  },
  {
    name: 'Necklaces',
    icon: '📿',
    description: 'Beautiful necklaces with timeless style',
  },
  {
    name: 'Earrings',
    icon: '✨',
    description: 'Stylish earrings to complete your look',
  },
  {
    name: 'Bracelets',
    icon: '💎',
    description: 'Premium bracelets for everyday elegance',
  },
]

function Categories() {
  const navigate = useNavigate()

  const handleCategoryClick = (category) => {
    navigate('/products', {
      state: {
        category,
      },
    })
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">

      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            BabaFly Collection
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
            Shop by Category
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Explore our jewellery collections and find something
            perfect for your style.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className="group rounded-3xl bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              {/* Icon */}
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-5xl transition group-hover:scale-110">
                {category.icon}
              </div>

              {/* Name */}
              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                {category.name}
              </h2>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {category.description}
              </p>

              {/* Button text */}
              <p className="mt-6 font-semibold text-gray-900">
                Explore Collection →
              </p>

            </button>
          ))}

        </div>

      </div>
    </main>
  )
}

export default Categories