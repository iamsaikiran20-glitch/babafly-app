import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const isAuthenticated =
    localStorage.getItem('babafly-authenticated') === 'true'

  const handleLogout = () => {
    localStorage.removeItem('babafly-authenticated')
    localStorage.removeItem('babafly-token')

    setMenuOpen(false)
    navigate('/login')
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          BabaFly <span>💎</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">

          <Link
            to="/"
            className="font-medium text-gray-700 transition hover:text-black"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="font-medium text-gray-700 transition hover:text-black"
          >
            Products
          </Link>

          <Link
            to="/categories"
            className="font-medium text-gray-700 transition hover:text-black"
          >
            Categories
          </Link>

          <Link
            to="/orders"
            className="font-medium text-gray-700 transition hover:text-black"
          >
            Orders
          </Link>

          <Link
            to="/cart"
            className="relative font-medium text-gray-700 transition hover:text-black"
          >
            Cart

            {cartCount > 0 && (
              <span className="absolute -right-4 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="rounded-full bg-gray-900 px-5 py-2 font-semibold text-white transition hover:bg-gray-700"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-gray-900 px-5 py-2 font-semibold text-white transition hover:bg-gray-700"
            >
              Login
            </Link>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-xl md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-5 md:hidden">

          <div className="flex flex-col gap-4">

            <Link
              to="/"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 font-medium hover:bg-gray-100"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 font-medium hover:bg-gray-100"
            >
              Products
            </Link>

            <Link
              to="/categories"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 font-medium hover:bg-gray-100"
            >
              Categories
            </Link>

            <Link
              to="/orders"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 font-medium hover:bg-gray-100"
            >
              Orders
            </Link>

            <Link
              to="/cart"
              onClick={closeMenu}
              className="flex items-center justify-between rounded-lg px-3 py-2 font-medium hover:bg-gray-100"
            >
              <span>Cart</span>

              {cartCount > 0 && (
                <span className="rounded-full bg-gray-900 px-2 py-1 text-xs text-white">
                  {cartCount} items
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="rounded-full bg-gray-900 py-3 font-semibold text-white"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="rounded-full bg-gray-900 py-3 text-center font-semibold text-white"
              >
                Login
              </Link>
            )}

          </div>

        </div>
      )}

    </nav>
  )
}

export default Navbar