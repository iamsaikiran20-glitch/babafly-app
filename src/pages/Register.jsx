import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'

// Validation rules
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
    .oneOf([yup.ref('password')], 'Passwords must match'),
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
    // Save user locally for now
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
    }

    localStorage.setItem('babafly-user', JSON.stringify(user))

    alert('Account created successfully! 🎉')

    navigate('/login')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="text-3xl font-bold">
          Create Account
        </h1>

        <p className="mt-2 text-gray-600">
          Join BabaFly today 💎
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >

          {/* Name */}
          <div>
            <label className="mb-2 block font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              {...register('name')}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

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
              placeholder="Enter password"
              {...register('password')}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              {...register('confirmPassword')}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900"
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-full bg-gray-900 py-3 font-semibold text-white transition hover:bg-gray-700"
          >
            Create Account
          </button>

        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-gray-900 underline"
          >
            Login
          </Link>
        </p>

      </div>
    </main>
  )
}

export default Register