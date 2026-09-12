import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import Cart from '../pages/Cart'

describe('Cart Page', () => {
  test('displays a product and handles quantity increase', async () => {
    const user = userEvent.setup()

    const product = {
      id: 1,
      name: 'Gold Ring',
      price: 5000,
      category: 'Rings',
      metal: 'Gold',
      polish: 'Glossy',
      image: '💍',
      quantity: 1,
    }

    const increaseQuantity = jest.fn()
    const decreaseQuantity = jest.fn()
    const removeFromCart = jest.fn()

    render(
      <MemoryRouter>
        <Cart
          cart={[product]}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
        />
      </MemoryRouter>
    )

    // Product should be displayed
    expect(
      screen.getByText('Gold Ring')
    ).toBeInTheDocument()

    // Price appears more than once, so use getAllByText
    expect(
      screen.getAllByText(/₹5,000/i).length
    ).toBeGreaterThan(0)

    // Quantity should initially be 1
    expect(
      screen.getByText('1')
    ).toBeInTheDocument()

    // Increase quantity
    const increaseButton = screen.getByRole('button', {
      name: '+',
    })

    await user.click(increaseButton)

    expect(increaseQuantity).toHaveBeenCalledWith(1)
  })
})