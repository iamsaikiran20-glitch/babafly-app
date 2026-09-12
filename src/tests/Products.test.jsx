import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Products from '../pages/Products'
import { getProducts } from '../utils/apiService'

jest.mock('../utils/apiService', () => ({
  getProducts: jest.fn(),
}))

describe('Products Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('fetches and displays products', async () => {
    getProducts.mockResolvedValue([
      {
        id: 1,
        name: 'Gold Ring',
        price: 5000,
        category: 'Rings',
        metal: 'Gold',
        polish: 'Glossy',
        image: '💍',
        description: 'Beautiful gold ring',
        rating: 4.5,
        stock: 10,
      },
    ])

    render(
      <MemoryRouter>
        <Products addToCart={jest.fn()} />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalled()
    })

    expect(
      await screen.findByText('Gold Ring')
    ).toBeInTheDocument()

    expect(
      screen.getByText(/₹5,000/i)
    ).toBeInTheDocument()
  })
})