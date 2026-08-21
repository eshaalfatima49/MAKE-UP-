import { useState } from 'react'
import { useCart } from '../hooks/useCustomHooks'
import { useAuth } from '../hooks/useCustomHooks'
import '../styles/CartPage.css'

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const [placing, setPlacing] = useState(false)
  const [message, setMessage] = useState('')

  const handlePlaceOrder = async () => {
    if (!user) {
      alert('Please log in first to place an order!')
      return
    }

    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }

    setPlacing(true)
    try {
      const orders = JSON.parse(localStorage.getItem('makeup-store-orders') || '[]')
      orders.push({ id: Date.now(), user_id: user.id, items: cart, total_price: parseFloat(getTotalPrice()), status: 'pending' })
      localStorage.setItem('makeup-store-orders', JSON.stringify(orders))

      setMessage('✅ Order placed successfully! Thank you for your purchase.')
      clearCart()

      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch (err) {
      setMessage(`❌ Error placing order: ${err.message}`)
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div className="cart-page">
      <h2>🛒 Shopping Cart</h2>

      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p className="empty-hint">Browse our products and add some items!</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            <div className="cart-header">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
              <span>Action</span>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-name">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="item-thumb"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  )}
                  <span>{item.name}</span>
                </div>
                <span className="item-price">
                  ${parseFloat(item.price).toFixed(2)}
                </span>
                <div className="item-quantity">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    className="qty-btn"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
                <span className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${getTotalPrice()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${getTotalPrice()}</span>
            </div>
          </div>

          <div className="cart-actions">
            {!user && (
              <p className="login-prompt">
                ⚠️ Please log in to place an order
              </p>
            )}
            <button
              onClick={handlePlaceOrder}
              disabled={placing || !user}
              className="place-order-btn"
            >
              {placing ? 'Placing Order...' : '✅ Place Order'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
