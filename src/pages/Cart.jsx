import { useNavigate } from 'react-router-dom'

function Cart({ cart, setCart }) {
  const navigate = useNavigate()

  const total = cart.reduce(
    (sum, product) => sum + product.price,
    0
  )

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-8 text-4xl font-bold">
          Your Cart 🛒
        </h1>

        {cart.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-3 text-gray-500">
              Add some beautiful jewellery to your cart.
            </p>

            <button
              onClick={() => navigate('/products')}
              className="mt-6 rounded-full bg-gray-900 px-8 py-3 font-semibold text-white"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4">

              {cart.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl bg-white p-5 shadow"
                >
                  <div className="flex items-center gap-5">

                    <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gray-100 text-4xl">
                      {product.image}
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        {product.category}
                      </p>

                      <h2 className="text-lg font-semibold">
                        {product.name}
                      </h2>

                      <p className="font-semibold">
                        ₹{product.price}
                      </p>
                    </div>

                  </div>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="font-semibold text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}

            </div>

            <div className="mt-6 rounded-2xl bg-white p-6 shadow">

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="mt-6 w-full rounded-full bg-gray-900 py-3 font-semibold text-white transition hover:bg-gray-700"
              >
                Proceed to Checkout
              </button>

            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default Cart