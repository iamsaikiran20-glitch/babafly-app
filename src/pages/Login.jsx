 
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'

// Validation rules
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
    // Get registered user
    const savedUser = localStorage.getItem('babafly-user')

    if (!savedUser) {
      alert('No account found. Please register first.')
      return
    }

    const user = JSON.parse(savedUser)

    // Check email and password
    if (
      data.email !== user.email ||
      data.password !== user.password
    ) {
      alert('Invalid email or password ❌')
      return
    }

    // Login successful
    localStorage.setItem(
      'babafly-token',
      'demo-jwt-token'
    )

    localStorage.setItem(
      'babafly-authenticated',
      'true'
    )

    alert('Login successful! 🎉')

    navigate('/')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mt-2 text-gray-600">
          Login to your BabaFly account 💎
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >

          {/* Email */}
          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register('password')}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full rounded-full bg-gray-900 py-3 font-semibold text-white transition hover:bg-gray-700"
          >
            Login
          </button>

        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}

          <Link
            to="/register"
            className="font-semibold text-gray-900 underline"
          >
            Create Account
          </Link>
        </p>

      </div>
    </main>
  )
}

export default Login