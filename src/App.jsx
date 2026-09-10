import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Components
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'

function App() {
  // Load cart from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('babafly-cart')

    return savedCart ? JSON.parse(savedCart) : []
  })

  // Save cart
  const saveCart = (newCart) => {
    setCart(newCart)
    localStorage.setItem('babafly-cart', JSON.stringify(newCart))
  }

  // Add product to cart
  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    )

    if (existingProduct) {
      const newCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )

      saveCart(newCart)
    } else {
      saveCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ])
    }
  }

  // Increase quantity
  const increaseQuantity = (id) => {
    const newCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    )

    saveCart(newCart)
  }

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const newCart = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0)

    saveCart(newCart)
  }

  // Remove product completely
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id)

    saveCart(newCart)
  }

  // Total number of products in cart
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <BrowserRouter>
      {/* Navbar */}
      <Navbar cartCount={cartCount} />

      <Routes>

        {/* Public Routes */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={
            <Products addToCart={addToCart} />
          }
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Checkout Route */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout
                cart={cart}
                setCart={setCart}
              />
            </ProtectedRoute>
          }
        />

        {/* Protected Orders Route */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App