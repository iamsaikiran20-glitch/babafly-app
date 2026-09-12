import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '../pages/Home'

describe('Home Page', () => {
  test('renders the homepage successfully', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', {
        name: /Shop by Category/i,
      })
    ).toBeInTheDocument()
  })
})