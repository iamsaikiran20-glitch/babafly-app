import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Checkout({ cart, setCart }) {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  })

  const total = cart.reduce(
    (sum, product) => sum + product.price,
    0
  )

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }

    const order = {
      id: Date.now(),
      customer: form,
      products: cart,
      total: total,
      date: new Date().toLocaleDateString(),
      status: 'Order Placed',
    }

    const oldOrders =
      JSON.parse(localStorage.getItem('orders')) || []

    localStorage.setItem(
      'orders',
      JSON.stringify([...oldOrders, order])
    )

    setCart([])
    localStorage.setItem('cart', JSON.stringify([]))

    alert('Order placed successfully! 🎉')

    navigate('/orders')
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-4xl font-bold">
          Checkout
        </h1>

        <div className="grid gap-8 md:grid-cols-2">

          {/* CUSTOMER FORM */}

          <div className="rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-6 text-2xl font-bold">
              Delivery Details
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div>
                <label className="mb-2 block font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-xl border p-3 outline-none focus:ring-2"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                  className="w-full rounded-xl border p-3 outline-none focus:ring-2"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Address
                </label>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="House number, street, area"
                  rows="3"
                  className="w-full rounded-xl border p-3 outline-none focus:ring-2"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  placeholder="Enter city"
                  className="w-full rounded-xl border p-3 outline-none focus:ring-2"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  required
                  placeholder="Enter pincode"
                  className="w-full rounded-xl border p-3 outline-none focus:ring-2"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-gray-900 py-3 font-semibold text-white transition hover:bg-gray-700"
              >
                Place Order
              </button>

            </form>

          </div>

          {/* ORDER SUMMARY */}

          <div className="h-fit rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-6 text-2xl font-bold">
              Order Summary
            </h2>

            {cart.map((product, index) => (
              <div
                key={index}
                className="mb-4 flex items-center justify-between border-b pb-4"
              >

                <div>
                  <p className="font-semibold">
                    {product.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{product.price}
                </p>

              </div>
            ))}

            <div className="mt-6 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Checkout