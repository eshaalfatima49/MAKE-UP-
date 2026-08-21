import { useEffect, useState } from 'react'
import { useCart } from '../hooks/useCustomHooks'
import '../styles/HomePage.css'

const defaultProducts = [
  { id: 'foundation', name: 'Silk Veil Foundation', description: 'Lightweight, buildable coverage with a natural finish.', price: 28, category: 'Foundation', image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=80' },
  { id: 'lipstick', name: 'Velvet Rose Lipstick', description: 'Rich color and a comfortable satin finish.', price: 18, category: 'Lipstick', image_url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=500&q=80' },
  { id: 'blush', name: 'Peach Bloom Blush', description: 'A soft, luminous flush for every complexion.', price: 22, category: 'Blush', image_url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=500&q=80' }
]

export const HomePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts()
    window.addEventListener('products-updated', fetchProducts)
    return () => window.removeEventListener('products-updated', fetchProducts)
  }, [])

  const fetchProducts = () => {
    const savedProducts = JSON.parse(localStorage.getItem('makeup-store-products') || 'null')
    const productsToShow = savedProducts || defaultProducts
    if (!savedProducts) localStorage.setItem('makeup-store-products', JSON.stringify(defaultProducts))
    setProducts(productsToShow)
    setLoading(false)
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    alert(`${product.name} added to cart!`)
  }

  if (loading) return <div className="loading">Loading products...</div>

  return (
    <div className="home-page">
      <div className="home-header">
        <h2>Welcome to Our Makeup Store</h2>
        <p>Discover our collection of premium makeup products</p>
      </div>

      {products.length === 0 ? (
        <div className="no-products">
          <p>No products available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img
                  src={product.image_url || 'https://via.placeholder.com/200'}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200'
                  }}
                />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <p className="category">Category: {product.category}</p>
                <div className="product-footer">
                  <span className="price">${parseFloat(product.price).toFixed(2)}</span>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
