import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function OrderDetails() {
  const { id } = useParams()

  const [order, setOrder] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(
        localStorage.getItem('babafly-orders') || '[]'
      )

      const foundOrder = savedOrders.find(
        (item) => item.id === id
      )

      if (foundOrder) {
        setOrder(foundOrder)
      } else {
        setNotFound(true)
      }
    } catch (error) {
      console.error('Failed to load order:', error)
      setNotFound(true)
    }
  }, [id])

  if (notFound) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-20 text-center">
        <div className="text-7xl">😕</div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Order Not Found
        </h1>

        <p className="mt-3 text-gray-500">
          We couldn't find this order.
        </p>

        <Link
          to="/orders"
          className="mt-7 inline-block rounded-full bg-gray-900 px-7 py-3 font-semibold text-white transition hover:bg-gray-700"
        >
          Back to Orders
        </Link>
      </main>
    )
  }

  if (!order) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="h-40 rounded-2xl bg-gray-200" />
          <div className="h-60 rounded-2xl bg-gray-200" />
        </div>
      </main>
    )
  }

  const orderDate = new Date(order.date)

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/orders"
          className="text-sm font-semibold text-gray-500 transition hover:text-black"
        >
          ← Back to Orders
        </Link>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Order ID
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-900">
              {order.id}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Placed on{' '}
              {orderDate.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

          <span className="w-fit rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            {order.status}
          </span>
        </div>
      </div>

      {/* Products */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900">
          Ordered Products
        </h2>

        <div className="mt-6 divide-y divide-gray-100">
          {order.products.map((item) => {
            const isImageUrl =
              typeof item.image === 'string' &&
              (item.image.startsWith('http://') ||
                item.image.startsWith('https://'))

            return (
              <div
                key={item.id}
                className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center"
              >
                {/* Image */}
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                  {isImageUrl ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain p-2"
                    />
                  ) : (
                    <span className="text-4xl">
                      {item.image || '💎'}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.category}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    ₹{item.price.toLocaleString('en-IN')} ×{' '}
                    {item.quantity}
                  </p>
                </div>

                {/* Item Total */}
                <p className="font-bold text-gray-900">
                  ₹{(
                    item.price * item.quantity
                  ).toLocaleString('en-IN')}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Bottom Section */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Delivery Address */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-900">
            Delivery Address
          </h2>

          <div className="mt-5 space-y-2 text-gray-600">
            <p className="font-semibold text-gray-900">
              {order.address.name}
            </p>

            <p>{order.address.phone}</p>

            <p>{order.address.address}</p>

            <p>
              {order.address.city} - {order.address.pincode}
            </p>
          </div>
        </section>

        {/* Order Summary */}
        <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">
            Order Summary
          </h2>

          <div className="mt-5 space-y-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>

              <span>
                ₹{order.subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>

              <span>
                {order.delivery === 0
                  ? 'FREE'
                  : `₹${order.delivery}`}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>

                <span>
                  ₹{order.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Continue Shopping */}
      <div className="mt-8 text-center">
        <Link
          to="/products"
          className="inline-block rounded-full bg-gray-900 px-7 py-3 font-semibold text-white transition hover:bg-gray-700"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  )
}

export default OrderDetails