import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import ProductDetails from './pages/ProductDetails'
import OrderDetails from './pages/OrderDetails'

import { useCart } from './context/CartContext'

function App() {
  const {
    cart,
    setCart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartCount,
  } = useCart()

  return (
    <BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: '12px',
            padding: '12px 16px',
          },
        }}
      />

      <Navbar cartCount={cartCount} />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={
            <Products
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/products/:id"
          element={
            <ProductDetails
              addToCart={addToCart}
            />
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

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App