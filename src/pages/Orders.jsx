import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Orders() {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(
        localStorage.getItem('babafly-orders') || '[]'
      )

      setOrders(savedOrders)
    } catch (error) {
      console.error('Failed to load orders:', error)
      setOrders([])
    }
  }, [])

  if (orders.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-20 text-center">
        <div className="text-7xl">📦</div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          No Orders Yet
        </h1>

        <p className="mt-3 text-gray-500">
          Your placed orders will appear here.
        </p>

        <Link
          to="/products"
          className="mt-7 inline-block rounded-full bg-gray-900 px-7 py-3 font-semibold text-white transition hover:bg-gray-700"
        >
          Start Shopping
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          My Orders
        </h1>

        <p className="mt-2 text-gray-500">
          Track and view your previous orders.
        </p>
      </div>

      <div className="space-y-5">
        {orders.map((order) => {
          const itemCount = order.products.reduce(
            (total, item) => total + item.quantity,
            0
          )

          const orderDate = new Date(order.date)

          return (
            <div
              key={order.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:shadow-md"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <h2 className="mt-1 font-bold text-gray-900">
                    {order.id}
                  </h2>
                </div>

                <span className="w-fit rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                  {order.status}
                </span>
              </div>

              <div className="mt-6 grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-gray-500">
                    Order Date
                  </p>

                  <p className="mt-1 font-medium text-gray-900">
                    {orderDate.toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Items
                  </p>

                  <p className="mt-1 font-medium text-gray-900">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Total
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    ₹{order.total.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => navigate(`/orders/${order.id}`)}
                  className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
                >
                  View Details →
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default Orders