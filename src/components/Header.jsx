import { useAuth } from '../hooks/useCustomHooks'
import '../styles/Header.css'

export const Header = ({ currentPage, setCurrentPage }) => {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      setCurrentPage('home')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">✨ Makeup Store</h1>
        <nav className="nav">
          <button
            className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            🏠 Home
          </button>
          <button
            className={`nav-btn ${currentPage === 'portal' ? 'active' : ''}`}
            onClick={() => setCurrentPage('portal')}
          >
            👤 Portal
          </button>
          <button
            className={`nav-btn ${currentPage === 'cart' ? 'active' : ''}`}
            onClick={() => setCurrentPage('cart')}
          >
            🛒 Cart
          </button>
        </nav>
        <div className="auth-section">
          {user ? (
            <div className="user-info">
              <span className="email">{user.email}</span>
              <button className="logout-btn" onClick={handleSignOut}>
                Logout
              </button>
            </div>
          ) : (
            <span className="guest-text">Guest</span>
          )}
        </div>
      </div>
    </header>
  )
}
