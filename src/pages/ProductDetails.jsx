import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

import { getProductById } from '../utils/apiService'

function ProductDetails({ addToCart }) {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [product, setProduct] = useState(location.state?.product || null)
  const [loading, setLoading] = useState(!location.state?.product)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product)
      setLoading(false)
      return
    }

    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(false)

        const data = await getProductById(id)
        setProduct(data)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id, location.state])

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid animate-pulse gap-10 md:grid-cols-2">
          <div className="h-96 rounded-2xl bg-gray-200" />
          <div className="space-y-5">
            <div className="h-8 w-3/4 rounded bg-gray-200" />
            <div className="h-6 w-1/3 rounded bg-gray-200" />
            <div className="h-24 rounded bg-gray-200" />
            <div className="h-12 w-40 rounded bg-gray-200" />
          </div>
        </div>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20 text-center">
        <div className="text-6xl">😕</div>

        <h1 className="mt-5 text-2xl font-bold text-gray-900">
          Product Not Found
        </h1>

        <p className="mt-2 text-gray-500">
          We couldn't load this product.
        </p>

        <button
          onClick={() => navigate('/products')}
          className="mt-6 rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-700"
        >
          Back to Products
        </button>
      </main>
    )
  }

  const isImageUrl =
    typeof product.image === 'string' &&
    (product.image.startsWith('http://') ||
      product.image.startsWith('https://'))

  const handleAddToCart = () => {
    addToCart(product)

    toast.success('Added to cart!')
  }

  const handleBuyNow = () => {
    addToCart(product)

    toast.success('Product added to cart!')

    setTimeout(() => {
      navigate('/checkout')
    }, 500)
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 text-sm font-semibold text-gray-600 transition hover:text-black"
      >
        ← Back
      </button>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Product Image */}
        <div className="flex min-h-[420px] items-center justify-center rounded-3xl bg-gray-50 p-8">
          {isImageUrl ? (
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[380px] w-full object-contain transition duration-300 hover:scale-105"
            />
          ) : (
            <div className="text-9xl">
              {product.image || '💎'}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center">
          <span className="mb-3 w-fit rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>

            {product.rating > 0 && (
              <span className="rounded-full bg-yellow-50 px-3 py-1 text-sm font-medium text-yellow-700">
                ⭐ {product.rating.toFixed(1)}
              </span>
            )}
          </div>

          <p className="mt-6 leading-7 text-gray-600">
            {product.description}
          </p>

          {/* Product Details */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Category</p>
              <p className="mt-1 font-semibold text-gray-900">
                {product.category}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Metal</p>
              <p className="mt-1 font-semibold text-gray-900">
                {product.metal}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Polish</p>
              <p className="mt-1 font-semibold text-gray-900">
                {product.polish}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Availability</p>
              <p className="mt-1 font-semibold text-gray-900">
                {product.stock > 0 ? 'In Stock' : 'Available'}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToCart}
              className="flex-1 rounded-full border border-gray-900 px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-700"
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