# 🏗️ Project Architecture & API Reference

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         Components (UI Layer)                         │  │
│  │  ├─ Header (Navigation)                              │  │
│  │  ├─ HomePage (Product List)                          │  │
│  │  ├─ UserPortal (Auth + Add Product)                  │  │
│  │  ├─ CartPage (Shopping Cart)                         │  │
│  │  └─ Footer                                            │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │    Context Providers (State Management)              │  │
│  │  ├─ AuthContext (User Authentication)                │  │
│  │  └─ CartContext (Shopping Cart State)                │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ (HTTP/WebSocket)
                            │
┌─────────────────────────────────────────────────────────────┐
│              Supabase Backend (Firebase Alternative)         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │        PostgreSQL Database (Backend)                  │  │
│  │  ┌──────────────────┐      ┌──────────────────┐      │  │
│  │  │   products       │      │    orders        │      │  │
│  │  │  ├─ id (UUID)    │      │  ├─ id (UUID)    │      │  │
│  │  │  ├─ name         │      │  ├─ user_id      │      │  │
│  │  │  ├─ price        │      │  ├─ items (JSON) │      │  │
│  │  │  ├─ category     │      │  ├─ total_price  │      │  │
│  │  │  ├─ seller_id    │      │  ├─ status       │      │  │
│  │  │  └─ created_at   │      │  └─ created_at   │      │  │
│  │  └──────────────────┘      └──────────────────┘      │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │       Authentication (Supabase Auth)                  │  │
│  │  ├─ Email/Password Auth                              │  │
│  │  ├─ JWT Token Management                             │  │
│  │  └─ User Session Management                          │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │       Row Level Security (RLS Policies)              │  │
│  │  ├─ Products: Public read, Seller write              │  │
│  │  └─ Orders: Users see only their own                 │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagrams

### 1. Browse Products Flow

```
User Views Home
     ↓
HomePage Component Mounts
     ↓
Calls: supabase.from('products').select('*')
     ↓
Supabase Checks RLS Policy: "Allow public to view products"
     ↓
Database Returns All Products
     ↓
Products Display in Grid
     ↓
User Clicks "Add to Cart"
     ↓
CartContext adds product to cart
     ↓
localStorage saves cart
```

### 2. Authentication Flow

```
User Enters Email & Password
     ↓
Clicks "Sign Up" or "Login"
     ↓
Calls: supabase.auth.signUp() or signInWithPassword()
     ↓
Supabase Auth Service Creates/Validates User
     ↓
Returns User Object with JWT Token
     ↓
AuthContext Updates user state
     ↓
Header Shows User Email
     ↓
User Portal Shows "Add Product" Form
```

### 3. Add Product Flow

```
Seller Logs In
     ↓
Fills Product Form (name, price, category, image)
     ↓
Clicks "Add Product"
     ↓
Calls: supabase.from('products').insert({...})
     ↓
Supabase Checks RLS: seller_id === auth.uid()
     ↓
If Valid: Insert into products table
     ↓
Product saved with seller_id
     ↓
HomePage refetches products
     ↓
New product appears immediately
```

### 4. Checkout Flow

```
User Reviews Cart
     ↓
Logged In? (Check user in AuthContext)
     ↓
Clicks "Place Order"
     ↓
Calls: supabase.from('orders').insert({
         user_id: auth.uid(),
         items: cart,
         total_price: sum
       })
     ↓
Supabase Checks RLS: user_id === auth.uid()
     ↓
Order saved to database
     ↓
CartContext.clearCart()
     ↓
Success Alert Shown
```

---

## Component Hierarchy

```
App.jsx (Main Component)
├── AuthProvider
│   └── AuthContext.Provider
│       └── CartProvider
│           └── CartContext.Provider
│               ├── Header
│               │   ├── Navigation Buttons
│               │   └── Auth Info (Email/Logout)
│               ├── Main Content (Dynamic based on page)
│               │   ├── HomePage
│               │   │   ├── ProductCard (×N)
│               │   │   └── "Add to Cart" Button
│               │   ├── UserPortal
│               │   │   ├── LoginForm / SignUpForm
│               │   │   └── AddProductForm
│               │   └── CartPage
│               │       ├── CartItem (×N)
│               │       ├── CartSummary
│               │       └── "Place Order" Button
│               └── Footer
```

---

## State Management

### AuthContext

**Stores:**
```javascript
{
  user: {
    id: "uuid",
    email: "user@example.com",
    // ... Supabase user object
  } | null,
  loading: boolean
}
```

**Methods:**
```javascript
signUp(email, password)      // Create new account
signIn(email, password)       // Login
signOut()                     // Logout
```

### CartContext

**Stores:**
```javascript
{
  cart: [
    {
      id: "uuid",
      name: "Product Name",
      price: 19.99,
      quantity: 2,
      image_url: "...",
      category: "Lipstick",
      // ... other product fields
    },
    // ... more items
  ]
}
```

**Methods:**
```javascript
addToCart(product)                    // Add/increase item
removeFromCart(productId)             // Remove item
updateQuantity(productId, quantity)   // Change quantity
getTotalPrice()                       // Calculate sum
clearCart()                           // Empty cart
```

---

## API Reference

### Supabase Client Methods

#### Products Table

**Read Products:**
```javascript
supabase
  .from('products')
  .select('*')
  .order('created_at', { ascending: false })
```

**Add Product (Authenticated):**
```javascript
supabase
  .from('products')
  .insert([{
    name: "Product Name",
    description: "...",
    price: 19.99,
    category: "Lipstick",
    image_url: "https://...",
    seller_id: user.id
  }])
  .select()
```

**Update Product (Seller Only):**
```javascript
supabase
  .from('products')
  .update({ price: 25.99, name: "New Name" })
  .eq('id', productId)
  .eq('seller_id', user.id)
```

**Delete Product (Seller Only):**
```javascript
supabase
  .from('products')
  .delete()
  .eq('id', productId)
  .eq('seller_id', user.id)
```

#### Orders Table

**Create Order (Authenticated):**
```javascript
supabase
  .from('orders')
  .insert([{
    user_id: user.id,
    items: [
      { id, name, price, quantity },
      // ... more items
    ],
    total_price: 99.99,
    status: 'pending'
  }])
  .select()
```

**Get User's Orders:**
```javascript
supabase
  .from('orders')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false })
```

**Update Order Status:**
```javascript
supabase
  .from('orders')
  .update({ status: 'completed' })
  .eq('id', orderId)
  .eq('user_id', user.id)
```

#### Authentication

**Sign Up:**
```javascript
supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure_password'
})
```

**Sign In:**
```javascript
supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})
```

**Sign Out:**
```javascript
supabase.auth.signOut()
```

**Get Current User:**
```javascript
const { data: { session } } = await supabase.auth.getSession()
const user = session?.user
```

**Listen to Auth Changes:**
```javascript
supabase.auth.onAuthStateChange((event, session) => {
  const user = session?.user
})
```

---

## RLS Policies Explanation

### Products Table Policies

**Policy 1: "Allow public to view products"**
```sql
CREATE POLICY "Allow public to view products"
  ON products FOR SELECT
  USING (true);
```
- ✅ Anyone can read all products
- ❌ No restrictions
- Effect: Home page shows all products for guests

**Policy 2: "Allow sellers to insert products"**
```sql
CREATE POLICY "Allow sellers to insert products"
  ON products FOR INSERT
  WITH CHECK (auth.uid() = seller_id);
```
- ✅ Only authenticated users can insert
- ✅ Only if seller_id matches their user ID
- Effect: Users can only add products as themselves

**Policy 3: "Allow sellers to update their products"**
```sql
CREATE POLICY "Allow sellers to update their products"
  ON products FOR UPDATE
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);
```
- ✅ Only sellers can update their own products
- ❌ Users cannot update others' products
- Effect: Product editing restricted to seller

**Policy 4: "Allow sellers to delete their products"**
```sql
CREATE POLICY "Allow sellers to delete their products"
  ON products FOR DELETE
  USING (auth.uid() = seller_id);
```
- ✅ Only sellers can delete their own products
- ❌ Users cannot delete others' products
- Effect: Only sellers can remove their listings

### Orders Table Policies

**Policy 1: "Allow users to view own orders"**
```sql
CREATE POLICY "Allow users to view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);
```
- ✅ Users can only see their own orders
- ❌ Users cannot see other users' orders
- Effect: Privacy - orders are confidential

**Policy 2: "Allow users to create orders"**
```sql
CREATE POLICY "Allow users to create orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```
- ✅ Only authenticated users can create orders
- ✅ Only if user_id matches their ID
- Effect: Users can only place orders for themselves

---

## Error Handling

### Common Errors & Solutions

**"PGRST301 – Relation does not exist"**
- Cause: Table doesn't exist
- Solution: Run SUPABASE_SETUP.sql

**"Permission denied" or "new row violates row-level security policy"**
- Cause: RLS policy violation
- Solution: Check if user_id/seller_id matches auth.uid()

**"Not authenticated"**
- Cause: User not logged in
- Solution: Add authentication check before operation

**"42P02 – column does not exist"**
- Cause: Typo in column name
- Solution: Check table schema in Supabase

---

## Performance Considerations

### Indexed Columns (Fast Queries)

```sql
-- Already indexed for fast lookups:
CREATE INDEX products_seller_id_idx ON products(seller_id);
CREATE INDEX products_category_idx ON products(category);
CREATE INDEX products_created_at_idx ON products(created_at DESC);
CREATE INDEX orders_user_id_idx ON orders(user_id);
CREATE INDEX orders_created_at_idx ON orders(created_at DESC);
CREATE INDEX orders_status_idx ON orders(status);
```

### Query Optimization Tips

1. **Don't fetch all products with orders**
   - Only select needed columns: `.select('id, name, price')`

2. **Filter server-side**
   - Use `.eq()` `.lt()` `.gt()` on server, not client

3. **Limit results**
   - Use `.limit(50)` for large result sets

4. **Order results**
   - Use `.order()` to sort on server, not client

---

## Security Checklist

- [x] RLS enabled on all tables
- [x] Public can view products only
- [x] Users can only modify own data
- [x] Environment variables in .env (not in code)
- [x] HTTPS enforced in deployment
- [x] Supabase Auth enabled
- [x] No hardcoded passwords/keys

---

## Future Enhancement Opportunities

1. **Search & Filter**
   - Search products by name/category
   - Filter by price range

2. **Wishlist**
   - Save favorite products
   - Separate from cart

3. **Reviews & Ratings**
   - Users rate products
   - Display average rating

4. **Payment Integration**
   - Stripe/PayPal integration
   - Real payment processing

5. **Admin Panel**
   - Order management
   - Product moderation
   - Sales analytics

6. **User Dashboard**
   - Order history
   - Saved addresses
   - Wishlist management

7. **Email Notifications**
   - Order confirmation
   - Shipping updates
   - Product recommendations

8. **Inventory Management**
   - Stock tracking
   - Low stock alerts
   - Availability checking

---

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 | UI Components |
| Build Tool | Vite | Fast development & bundling |
| Styling | CSS3 | Responsive design |
| State | Context API | Global state management |
| Backend | Supabase | Database & Auth |
| Database | PostgreSQL | Data storage |
| Auth | Supabase Auth | User authentication |
| Security | RLS | Database access control |
| Storage | localStorage | Cart persistence |
| Deployment | Vercel/Netlify | Live hosting |

---

## File Size & Performance

**Build Output (production):**
- JavaScript bundle: ~120KB (gzipped: ~40KB)
- CSS: ~25KB (gzipped: ~8KB)
- Total: ~48KB gzipped

**Recommended Optimizations:**
- Use CDN for images
- Enable caching headers
- Lazy load components if needed
- Monitor bundle size

---

## Testing Scenarios

### Happy Path (Everything Works)

1. ✅ User visits site
2. ✅ Products load from Supabase
3. ✅ User signs up
4. ✅ User adds product
5. ✅ Product appears immediately
6. ✅ User adds to cart
7. ✅ User places order
8. ✅ Order saved to database

### Error Path (Handle Failures)

1. ✅ Network error - show error message
2. ✅ Auth error - redirect to login
3. ✅ Invalid data - form validation
4. ✅ Database error - show user-friendly message

---

**This architecture ensures security, scalability, and maintainability!**
