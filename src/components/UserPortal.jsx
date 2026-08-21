import { useState } from 'react'
import { useAuth } from '../hooks/useCustomHooks'
import '../styles/UserPortal.css'

export const UserPortal = ({ onProductAdded }) => {
  const { user, loading, signUp, signIn } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Add Product Form states
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productCategory, setProductCategory] = useState('Foundation')
  const [imageUrl, setImageUrl] = useState('')
  const [addingProduct, setAddingProduct] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleAuthSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setAuthLoading(true)

    try {
      if (isLogin) {
        await signIn(email, password)
      } else {
        await signUp(email, password)
      }
      setEmail('')
      setPassword('')
    } catch (err) {
      setError(err.message)
    } finally {
      setAuthLoading(false)
    }
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!productName || !productPrice || !productCategory) {
      setError('Please fill in all required fields')
      return
    }

    setAddingProduct(true)

    try {
      const products = JSON.parse(localStorage.getItem('makeup-store-products') || '[]')
      products.unshift({ id: Date.now(), name: productName, description: productDescription, price: parseFloat(productPrice), category: productCategory, image_url: imageUrl || 'https://via.placeholder.com/200', seller_id: user.id })
      localStorage.setItem('makeup-store-products', JSON.stringify(products))
      window.dispatchEvent(new Event('products-updated'))

      setSuccessMessage('Product added successfully!')
      setProductName('')
      setProductDescription('')
      setProductPrice('')
      setProductCategory('Foundation')
      setImageUrl('')

      // Call the callback to refresh products
      if (onProductAdded) {
        onProductAdded()
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setAddingProduct(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="user-portal">
      {!user ? (
        <div className="auth-container">
          <div className="auth-form-wrapper">
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleAuthSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <button
                type="submit"
                disabled={authLoading}
                className="submit-btn"
              >
                {authLoading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>
            <button
              className="toggle-btn"
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
              }}
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      ) : (
        <div className="seller-panel">
          <h2>👋 Welcome, {user.email}</h2>
          <div className="add-product-section">
            <h3>Add New Product</h3>
            <form onSubmit={handleAddProduct}>
              <div className="form-group">
                <label htmlFor="name">Product Name *</label>
                <input
                  id="name"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g., Lipstick Red"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Product description"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price *</label>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="19.99"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    required
                  >
                    <option>Foundation</option>
                    <option>Lipstick</option>
                    <option>Eyeshadow</option>
                    <option>Mascara</option>
                    <option>Concealer</option>
                    <option>Blush</option>
                    <option>Bronzer</option>
                    <option>Eyeliner</option>
                    <option>Nail Polish</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  id="image"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {error && <div className="error-message">{error}</div>}
              {successMessage && <div className="success-message">{successMessage}</div>}

              <button
                type="submit"
                disabled={addingProduct}
                className="submit-btn"
              >
                {addingProduct ? 'Adding...' : '+ Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
