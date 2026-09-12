import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

function Login() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    const savedUser = localStorage.getItem('babafly-user')

    if (!savedUser) {
      toast.error('No account found. Please register first.')
      return
    }

    const user = JSON.parse(savedUser)

    if (
      data.email !== user.email ||
      data.password !== user.password
    ) {
      toast.error('Invalid email or password ❌')
      return
    }

    localStorage.setItem(
      'babafly-token',
      'demo-jwt-token'
    )

    localStorage.setItem(
      'babafly-authenticated',
      'true'
    )

    toast.success('Login successful! 🎉')

    setTimeout(() => {
      navigate('/')
    }, 700)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg sm:p-10">

        <div className="text-center">

          <div className="text-5xl">
            💎
          </div>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Login to your BabaFly account
          </p>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >

          {/* Email */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                errors.email
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-gray-900'
              }`}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* Password */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register('password')}
              className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                errors.password
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-gray-900'
              }`}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}

          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-gray-900 py-3.5 font-semibold text-white transition hover:bg-gray-700"
          >
            Login
          </button>

        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}

          <Link
            to="/register"
            className="font-semibold text-gray-900 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </main>
  )
}

export default Login