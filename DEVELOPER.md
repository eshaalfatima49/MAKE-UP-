# 📚 Developer Quick Reference

Quick reference guide for developers working with the Makeup Store e-commerce app.

---

## Project Quick Facts

| Feature | Details |
|---------|---------|
| **Framework** | React 18 + Vite |
| **Backend** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth (Email/Password) |
| **State** | Context API |
| **Styling** | CSS3 (No frameworks) |
| **Storage** | localStorage (Cart) |
| **Deployment** | Vercel or Netlify |

---

## Folder Structure

```
src/
├── components/        # React UI components
├── context/          # State management (Auth, Cart)
├── hooks/            # Custom React hooks
├── config/           # Supabase client config
├── styles/           # CSS files
├── App.jsx           # Root component
└── main.jsx          # Entry point

Other:
├── .env              # Environment variables
├── .gitignore        # Git ignore rules
├── index.html        # HTML template
├── vite.config.js    # Vite config
├── package.json      # Dependencies
├── README.md         # Main documentation
├── SETUP.md          # Getting started
├── DEPLOYMENT.md     # Deploy guide
├── ARCHITECTURE.md   # Technical design
└── SUPABASE_SETUP.sql # Database schema
```

---

## Common Tasks

### Add a New Page

1. **Create component** in `src/components/`
```jsx
export const MyPage = () => {
  return (
    <div className="my-page">
      {/* Your content */}
    </div>
  )
}
```

2. **Add route** in `src/App.jsx`
```jsx
case 'mypage':
  return <MyPage />
```

3. **Add navigation button** in `src/components/Header.jsx`
```jsx
<button onClick={() => setCurrentPage('mypage')}>
  My Page
</button>
```

4. **Create CSS** in `src/styles/MyPage.css`
5. **Import CSS** in your component

### Add Form Validation

```jsx
const [errors, setErrors] = useState({})

const validateForm = (data) => {
  const newErrors = {}
  if (!data.name) newErrors.name = 'Name required'
  if (data.price <= 0) newErrors.price = 'Price must be positive'
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

// In submit handler:
if (!validateForm(formData)) return
// Process form...
```

### Query the Database

```jsx
import { supabase } from '../config/supabase'

// Read
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('category', 'Lipstick')

// Create
const { data, error } = await supabase
  .from('products')
  .insert([{ name: 'Product', price: 19.99 }])

// Update
const { data, error } = await supabase
  .from('products')
  .update({ price: 25.99 })
  .eq('id', productId)

// Delete
const { data, error } = await supabase
  .from('products')
  .delete()
  .eq('id', productId)
```

### Use Authentication

```jsx
import { useAuth } from '../hooks/useCustomHooks'

const MyComponent = () => {
  const { user, loading, signUp, signIn, signOut } = useAuth()

  if (loading) return <div>Loading...</div>

  if (!user) {
    return <button onClick={() => signIn('email', 'password')}>Login</button>
  }

  return <div>Welcome {user.email}</div>
}
```

### Use Shopping Cart

```jsx
import { useCart } from '../hooks/useCustomHooks'

const MyComponent = () => {
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice 
  } = useCart()

  return (
    <div>
      <p>Cart items: {cart.length}</p>
      <p>Total: ${getTotalPrice()}</p>
      <button onClick={() => addToCart(product)}>Add</button>
    </div>
  )
}
```

### Add Styling

```css
/* In src/styles/MyComponent.css */
.my-component {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.my-component h2 {
  color: #667eea;
  font-size: 24px;
}

@media (max-width: 768px) {
  .my-component {
    padding: 10px;
  }
}
```

```jsx
// Import in component
import '../styles/MyComponent.css'
```

---

## Debugging Tips

### Check Console Errors
```
Browser → F12 → Console tab
Look for red errors
```

### Check Supabase Connection
```javascript
import { supabase } from '../config/supabase'

console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Anon Key:', import.meta.env.VITE_SUPABASE_ANON_KEY)
```

### Check User Authentication
```javascript
const { data: { session } } = await supabase.auth.getSession()
console.log('Current user:', session?.user)
```

### Check Cart State
```javascript
console.log('Cart:', localStorage.getItem('cart'))
```

### Database Query Testing
```javascript
// Test query in browser console:
const { data, error } = await supabase
  .from('products')
  .select('*')
console.log(data, error)
```

---

## Common Patterns

### Loading States
```jsx
const [loading, setLoading] = useState(false)

const handleAction = async () => {
  setLoading(true)
  try {
    // Do something
  } catch (error) {
    console.error(error)
  } finally {
    setLoading(false)
  }
}
```

### Error Handling
```jsx
const [error, setError] = useState(null)

try {
  // Operation
} catch (err) {
  setError(err.message)
}

{error && <div className="error">{error}</div>}
```

### Success Messages
```jsx
const [message, setMessage] = useState('')

try {
  // Operation
  setMessage('✅ Success!')
  setTimeout(() => setMessage(''), 3000)
} catch (err) {
  setMessage(`❌ Error: ${err.message}`)
}

{message && <div className="message">{message}</div>}
```

---

## CSS Classes Naming Convention

```css
/* Block */
.product-card { }

/* Block__Element */
.product-card__image { }
.product-card__title { }

/* Block--Modifier */
.product-card--featured { }
.product-card--on-sale { }

/* States */
.is-loading { }
.is-error { }
.is-active { }
```

---

## Common Bugs & Fixes

### Bug: Products won't load
**Symptoms:** Blank home page, "Cannot read property 'map'"
**Fix:**
```javascript
// Before
const products = data  // If data is null, .map fails

// After
const products = data || []  // Use empty array as default
```

### Bug: Cart not persisting
**Symptoms:** Cart empty after refresh
**Fix:**
```javascript
// Make sure useEffect is saving to localStorage
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart))
}, [cart])
```

### Bug: Can't add products after login
**Symptoms:** Form doesn't work after authentication
**Fix:**
```javascript
// Make sure you're checking user is loaded
if (loading) return <div>Loading...</div>
if (!user) return <LoginForm />
```

### Bug: 401 Unauthorized errors
**Symptoms:** Auth errors in console
**Fix:**
```javascript
// Check .env has correct SUPABASE_ANON_KEY
// Make sure auth.email provider is enabled in Supabase
```

---

## Performance Optimization Tips

### 1. Lazy Load Images
```jsx
<img 
  src={url}
  alt="Product"
  loading="lazy"
/>
```

### 2. Memoize Components
```jsx
import { memo } from 'react'

const ProductCard = memo(({ product }) => (
  // Component
))
```

### 3. Limit Re-renders
```jsx
// Bad - re-renders on every parent update
const { data } = useContext(DataContext)

// Good - only re-render when data changes
const data = useMemo(() => selectedData, [selectedData])
```

### 4. Query Optimization
```javascript
// Bad - fetches all columns
.select('*')

// Good - fetch only needed columns
.select('id, name, price')
```

---

## Testing Checklist

Before deploying:

- [ ] All pages load without errors
- [ ] Navigation works (Home, Portal, Cart)
- [ ] Can sign up and login
- [ ] Can add products (when logged in)
- [ ] New products appear on home page
- [ ] Can add items to cart
- [ ] Can increase/decrease quantities
- [ ] Can remove items from cart
- [ ] Total price calculates correctly
- [ ] Can place order (when logged in)
- [ ] Cart clears after order
- [ ] Logout works properly
- [ ] Responsive on mobile (test in DevTools)
- [ ] No console errors (F12)

---

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
# ...

# Commit changes
git add .
git commit -m "Add feature: my-feature"

# Push to GitHub
git push origin feature/my-feature

# Create Pull Request on GitHub (optional)

# Merge to main
git checkout main
git merge feature/my-feature
git push origin main
```

---

## npm Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for deployment
npm run preview      # Test production build

# Install
npm install          # Install dependencies
npm install PACKAGE  # Install specific package

# Update
npm update           # Update all packages
npm outdated         # Check outdated packages
```

---

## Environment Variables

```env
# Required
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key

# Optional (add if needed)
VITE_API_URL=http://api.example.com
VITE_ENV=development
```

---

## Useful Extensions

### VS Code Extensions
- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **ESLint**
- **Thunder Client** or **REST Client**
- **Supabase Snippets**

### Browser Extensions
- **React Developer Tools**
- **Redux DevTools** (if using Redux)
- **JSONView**

---

## Learning Resources

| Resource | Topic | Link |
|----------|-------|------|
| React Docs | UI Components | [react.dev](https://react.dev) |
| Supabase | Backend/Database | [supabase.com/docs](https://supabase.com/docs) |
| Vite | Build Tool | [vitejs.dev](https://vitejs.dev) |
| MDN | Web APIs | [developer.mozilla.org](https://developer.mozilla.org) |
| CSS Tricks | Styling | [css-tricks.com](https://css-tricks.com) |

---

## Need Help?

1. Check README.md for overview
2. Check SETUP.md for getting started
3. Check ARCHITECTURE.md for technical details
4. Review component code for examples
5. Check browser console (F12) for errors
6. Search GitHub issues for similar problems

---

## Code Review Checklist

When reviewing PR:

- [ ] Code follows project style
- [ ] No console.log debugging left
- [ ] Error handling present
- [ ] Loading states shown
- [ ] Mobile responsive
- [ ] No hardcoded values (use constants)
- [ ] Comments on complex logic
- [ ] Tests pass
- [ ] No performance regressions

---

**Happy Coding! 💄✨**

Questions? Check the documentation or reach out to the team.
