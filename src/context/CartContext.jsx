import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('babafly-cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch {
      return []
    }
  })

  const saveCart = (newCart) => {
    setCart(newCart)
    localStorage.setItem('babafly-cart', JSON.stringify(newCart))
  }

  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    )

    if (existingProduct) {
      const newCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
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

  const increaseQuantity = (id) => {
    const newCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )

    saveCart(newCart)
  }

  const decreaseQuantity = (id) => {
    const newCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)

    saveCart(newCart)
  }

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id)

    saveCart(newCart)
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}