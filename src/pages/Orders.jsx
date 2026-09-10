import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Orders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem('orders')) || []

    setOrders(savedOrders)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">
            My Orders 📦
          </h1>

          <button
            onClick={() => navigate('/products')}
            className="rounded-full bg-gray-900 px-6 py-3 font-semibold text-white"
          >
            Continue Shopping
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">

            <div className="mb-4 text-6xl">
              📦
            </div>

            <h2 className="text-2xl font-bold">
              No Orders Yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your purchased jewellery will appear here.
            </p>

            <button
              onClick={() => navigate('/products')}
              className="mt-6 rounded-full bg-gray-900 px-8 py-3 font-semibold text-white"
            >
              Start Shopping
            </button>

          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl bg-white p-6 shadow"
              >

                {/* ORDER HEADER */}

                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b pb-4">

                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <p className="font-semibold">
                      #{order.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Order Date
                    </p>

                    <p className="font-semibold">
                      {order.date}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                    {order.status}
                  </span>

                </div>

                {/* PRODUCTS */}

                <div className="space-y-4">

                  {order.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
                    >

                      <div className="flex items-center gap-4">

                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-3xl">
                          {product.image}
                        </div>

                        <div>
                          <h3 className="font-semibold">
                            {product.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {product.category}
                          </p>
                        </div>

                      </div>

                      <p className="font-semibold">
                        ₹{product.price}
                      </p>

                    </div>
                  ))}

                </div>

                {/* TOTAL */}

                <div className="mt-5 flex justify-between border-t pt-5 text-xl font-bold">
                  <span>Total</span>

                  <span>
                    ₹{order.total}
                  </span>
                </div>

                {/* CUSTOMER */}

                <div className="mt-5 rounded-xl bg-gray-50 p-4">

                  <h3 className="mb-2 font-bold">
                    Delivery Address
                  </h3>

                  <p>
                    {order.customer.name}
                  </p>

                  <p className="text-gray-600">
                    {order.customer.phone}
                  </p>

                  <p className="text-gray-600">
                    {order.customer.address}
                  </p>

                  <p className="text-gray-600">
                    {order.customer.city} -{' '}
                    {order.customer.pincode}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  )
}

export default Orders