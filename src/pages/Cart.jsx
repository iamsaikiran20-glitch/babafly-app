import { Link, useNavigate } from 'react-router-dom'

function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  const navigate = useNavigate()

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const delivery = subtotal >= 20000 ? 0 : 99

  const total = subtotal + delivery

  const isImageUrl = (image) =>
    typeof image === 'string' &&
    (image.startsWith('http://') ||
      image.startsWith('https://'))

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20 text-center">
        <div className="text-7xl">🛒</div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Your Cart is Empty
        </h1>

        <p className="mt-3 text-gray-500">
          Looks like you haven't added anything yet.
        </p>

        <Link
          to="/products"
          className="mt-7 inline-block rounded-full bg-gray-900 px-7 py-3 font-semibold text-white transition hover:bg-gray-700"
        >
          Continue Shopping
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Shopping Cart
        </h1>

        <p className="mt-2 text-gray-500">
          Review your items before checkout.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-5 lg:col-span-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center"
            >
              {/* Product Image */}
              <div className="flex h-32 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:w-32">
                {isImageUrl(item.image) ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain p-3"
                  />
                ) : (
                  <span className="text-5xl">
                    {item.image || '💎'}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <p className="text-sm text-gray-500">
                  {item.category}
                </p>

                <h2 className="mt-1 text-lg font-semibold text-gray-900">
                  {item.name}
                </h2>

                <p className="mt-2 font-bold text-gray-900">
                  ₹{item.price.toLocaleString('en-IN')}
                </p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-lg transition hover:bg-gray-100"
                >
                  −
                </button>

                <span className="w-6 text-center font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-lg transition hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm font-semibold text-red-500 transition hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>

              <span>
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>

              <span>
                {delivery === 0
                  ? 'FREE'
                  : `₹${delivery}`}
              </span>
            </div>

            {delivery === 0 && (
              <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                🎉 You unlocked free delivery!
              </p>
            )}

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>

                <span>
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="mt-7 w-full rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-700"
          >
            Proceed to Checkout
          </button>

          <Link
            to="/products"
            className="mt-4 block text-center text-sm font-semibold text-gray-600 transition hover:text-black"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Cart