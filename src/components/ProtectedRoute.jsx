import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const isAuthenticated =
    localStorage.getItem('babafly-authenticated') === 'true'

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute