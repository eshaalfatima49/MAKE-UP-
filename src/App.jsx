import { useState, useRef } from 'react'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './components/HomePage'
import { UserPortal } from './components/UserPortal'
import { CartPage } from './components/CartPage'
import './styles/App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const homePageRef = useRef()

  const handleProductAdded = () => {
    // Refresh home page products if needed
    if (homePageRef.current) {
      // This would call a refresh function if HomePage had one
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage ref={homePageRef} />
      case 'portal':
        return <UserPortal onProductAdded={handleProductAdded} />
      case 'cart':
        return <CartPage />
      default:
        return <HomePage ref={homePageRef} />
    }
  }

  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main className="main-content">
            {renderPage()}
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
