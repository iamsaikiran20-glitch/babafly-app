import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mt-16 bg-gray-900 text-white">

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold"
            >
              BabaFly 💎
            </Link>

            <p className="mt-4 max-w-xs leading-7 text-gray-400">
              Discover elegant jewellery designed to
              make every moment special.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="font-semibold">
              Quick Links
            </h2>

            <div className="mt-4 flex flex-col gap-3 text-gray-400">

              <Link
                to="/"
                className="transition hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="transition hover:text-white"
              >
                Products
              </Link>

              <Link
                to="/categories"
                className="transition hover:text-white"
              >
                Categories
              </Link>

              <Link
                to="/orders"
                className="transition hover:text-white"
              >
                My Orders
              </Link>

            </div>
          </div>

          {/* Customer */}
          <div>
            <h2 className="font-semibold">
              Customer Care
            </h2>

            <div className="mt-4 space-y-3 text-gray-400">

              <p>
                📦 Fast Delivery
              </p>

              <p>
                🔒 Secure Shopping
              </p>

              <p>
                💎 Premium Quality
              </p>

              <p>
                🤝 Customer Support
              </p>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-semibold">
              Contact
            </h2>

            <div className="mt-4 space-y-3 text-gray-400">

              <p>
                📧 support@babafly.com
              </p>

              <p>
                📞 +91 98765 43210
              </p>

              <p>
                📍 Hyderabad, India
              </p>

            </div>
          </div>

        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} BabaFly. All rights reserved.
        </div>

      </div>

    </footer>
  )
}

export default Footer