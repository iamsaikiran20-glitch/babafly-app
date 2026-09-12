import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Login from '../pages/Login'

describe('Login Page', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('shows validation errors when form is submitted empty', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const loginButton = screen.getByRole('button', {
      name: /login/i,
    })

    await user.click(loginButton)

    expect(
      await screen.findByText(/email is required/i)
    ).toBeInTheDocument()

    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument()
  })
})