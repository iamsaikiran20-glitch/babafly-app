import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),

  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),

  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf(
      [yup.ref('password')],
      'Passwords must match'
    ),
})

function Register() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    const existingUser =
      localStorage.getItem('babafly-user')

    if (existingUser) {
      const user = JSON.parse(existingUser)

      if (user.email === data.email) {
        toast.error(
          'An account with this email already exists.'
        )
        return
      }
    }

    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
    }

    localStorage.setItem(
      'babafly-user',
      JSON.stringify(user)
    )

    toast.success(
      'Account created successfully! 🎉'
    )

    setTimeout(() => {
      navigate('/login')
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
            Create Account
          </h1>

          <p className="mt-2 text-gray-500">
            Join BabaFly today
          </p>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >

          {/* Name */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              {...register('name')}
              className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                errors.name
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-gray-900'
              }`}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}

          </div>

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
              placeholder="Create a password"
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

          {/* Confirm Password */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              {...register('confirmPassword')}
              className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                errors.confirmPassword
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-gray-900'
              }`}
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}

          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-gray-900 py-3.5 font-semibold text-white transition hover:bg-gray-700"
          >
            Create Account
          </button>

        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}

          <Link
            to="/login"
            className="font-semibold text-gray-900 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </main>
  )
}

export default Register