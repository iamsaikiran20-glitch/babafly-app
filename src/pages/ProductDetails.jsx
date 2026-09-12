import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function ProductDetails({ addToCart }) {
  const location = useLocation()
  const navigate = useNavigate()
  const product = location.state?.product

  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-10 text-center shadow-lg">
          <div className="text-6xl">😕</div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Product Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            We couldn't find the product you're looking for.
          </p>

          <button
            onClick={() => navigate('/products')}
            className="mt-6 rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-700"
          >
            Back to Products
          </button>
        </div>
      </main>
    )
  }

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 1500)
  }

  const handleBuyNow = () => {
    addToCart(product)
    navigate('/checkout')
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="mb-8 font-semibold text-gray-700 transition hover:text-black"
        >
          ← Back to Products
        </button>

        <div className="grid gap-10 rounded-3xl bg-white p-6 shadow-lg md:grid-cols-2 md:p-10">

          {/* Product Image */}
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-gray-100">
            <div className="text-center">
              <div className="text-9xl">
                {product.image || '💎'}
              </div>

              <p className="mt-5 text-gray-500">
                Premium BabaFly Jewellery
              </p>
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              {product.category || 'Jewellery'}
            </p>

            <h1 className="mt-3 text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            <p className="mt-5 text-3xl font-bold text-gray-900">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </p>

            {/* Product Specifications */}
            <div className="mt-6 space-y-3 border-y py-6">

              <p className="text-gray-700">
                <span className="font-semibold">Metal:</span>{' '}
                {product.metal || 'Premium Gold'}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold">Polish:</span>{' '}
                {product.polish || 'High Quality'}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold">Category:</span>{' '}
                {product.category || 'Jewellery'}
              </p>

            </div>

            {/* Description */}
            <p className="mt-6 leading-7 text-gray-600">
              {product.description ||
                'Beautifully crafted jewellery designed to add elegance and style to every occasion.'}
            </p>

            {/* Add To Cart */}
            <button
              onClick={handleAddToCart}
              className="mt-8 rounded-full bg-gray-900 px-8 py-4 font-semibold text-white transition hover:bg-gray-700"
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              className="mt-3 rounded-full border border-gray-900 px-8 py-4 font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              Buy Now
            </button>

          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetails