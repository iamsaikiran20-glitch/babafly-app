import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),

  phone: yup
    .string()
    .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit phone number')
    .required('Phone number is required'),

  address: yup
    .string()
    .trim()
    .min(10, 'Address must be at least 10 characters')
    .required('Address is required'),

  city: yup
    .string()
    .trim()
    .required('City is required'),

  pincode: yup
    .string()
    .matches(/^\d{6}$/, 'Enter a valid 6-digit pincode')
    .required('Pincode is required'),
})

function Checkout({ cart, setCart }) {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const delivery = subtotal >= 20000 ? 0 : 99

  const total = subtotal + delivery

  const onSubmit = async (data) => {
    try {
      const order = {
        id: `BF-${Date.now()}`,
        date: new Date().toISOString(),
        status: 'Order Placed',

        products: cart,

        subtotal,
        delivery,
        total,

        address: data,
      }

      const existingOrders = JSON.parse(
        localStorage.getItem('babafly-orders') || '[]'
      )

      const updatedOrders = [
        order,
        ...existingOrders,
      ]

      localStorage.setItem(
        'babafly-orders',
        JSON.stringify(updatedOrders)
      )

      localStorage.removeItem('babafly-cart')

      setCart([])

      toast.success('Order placed successfully! 🎉')

      setTimeout(() => {
        navigate('/orders')
      }, 700)
    } catch (error) {
      console.error(error)

      toast.error(
        'Something went wrong while placing the order.'
      )
    }
  }

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="text-7xl">🛒</div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Your Cart is Empty
        </h1>

        <p className="mt-3 text-gray-500">
          Add some products before proceeding to checkout.
        </p>

        <Link
          to="/products"
          className="mt-7 inline-block rounded-full bg-gray-900 px-7 py-3 font-semibold text-white transition hover:bg-gray-700"
        >
          Browse Products
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Checkout
        </h1>

        <p className="mt-2 text-gray-500">
          Enter your delivery details and place your order.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Address Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900">
            Delivery Address
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 space-y-5"
          >
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <input
                {...register('name')}
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Phone Number
              </label>

              <input
                {...register('phone')}
                type="tel"
                maxLength="10"
                placeholder="Enter 10-digit phone number"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              />

              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Address
              </label>

              <textarea
                {...register('address')}
                rows="4"
                placeholder="House number, street, area..."
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              />

              {errors.address && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* City + Pincode */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  City
                </label>

                <input
                  {...register('city')}
                  type="text"
                  placeholder="Hyderabad"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />

                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Pincode
                </label>

                <input
                  {...register('pincode')}
                  type="text"
                  maxLength="6"
                  placeholder="500001"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />

                {errors.pincode && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.pincode.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? 'Placing Order...'
                : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-4 text-sm"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {item.name}
                  </p>

                  <p className="text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-gray-900">
                  ₹{(
                    item.price * item.quantity
                  ).toLocaleString('en-IN')}
                </p>
              </div>
            ))}

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>

                <span>
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="mt-3 flex justify-between text-gray-600">
                <span>Delivery</span>

                <span>
                  {delivery === 0
                    ? 'FREE'
                    : `₹${delivery}`}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>

                <span>
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Checkout