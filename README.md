# 🎨 Makeup E-Commerce SPA

A modern, full-featured Single Page Application for an online makeup store built with **React** and **Supabase**.

## 🌟 Features

### Home Page
- Browse all available makeup products with beautiful card design
- View product details (name, description, price, category)
- Add items to cart with one click
- Real-time product updates from Supabase

### User Portal (Protected)
- **Sign Up / Login:** Secure authentication powered by Supabase Auth
- **Add Product Form:** Sellers can add new makeup products to the store
  - Product name, description, price, category
  - Image URL upload
  - Products instantly appear on the home page for all users

### Shopping Cart
- View all added items with product details
- Change quantities (+ / - buttons)
- Remove items from cart
- Real-time cart total calculation
- Persistent cart (saved in localStorage)

### Order Management
- Place orders (requires login)
- Order saved to database with timestamp
- Order status tracking
- Success confirmation alerts

### Security
- **Row Level Security (RLS):** Enforced at database level
- **Environment Variables:** Secure API key storage in `.env`
- **Authentication:** Supabase Auth with email/password

---

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ and npm/yarn
- Supabase account (free tier at https://supabase.com)
- GitHub account for version control

### 1. Setup Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to initialize
3. Go to **SQL Editor** and paste the entire contents of `SUPABASE_SETUP.sql`
4. Execute the SQL to create tables, indexes, and RLS policies
5. Note your Supabase credentials:
   - `Project URL` (Supabase URL)
   - `anon public key` (Supabase Anon Key)

### 2. Setup Local Project

```bash
# Navigate to project directory
cd "make up store"

# Install dependencies
npm install

# Create .env file and add your Supabase credentials
# Copy from .env.example and fill in your values
cp .env.example .env
```

**Edit `.env` file:**
```
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

---

## 📁 Project Structure

```
make up store/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header
│   │   ├── Footer.jsx          # Footer
│   │   ├── HomePage.jsx        # Product listing
│   │   ├── UserPortal.jsx      # Auth + Add product
│   │   └── CartPage.jsx        # Cart management
│   ├── context/
│   │   ├── AuthContext.jsx     # Authentication state
│   │   └── CartContext.jsx     # Shopping cart state
│   ├── hooks/
│   │   └── useCustomHooks.js   # Custom hooks
│   ├── config/
│   │   └── supabase.js         # Supabase client
│   ├── styles/
│   │   ├── App.css
│   │   ├── Header.css
│   │   ├── Footer.css
│   │   ├── HomePage.css
│   │   ├── UserPortal.css
│   │   └── CartPage.css
│   ├── App.jsx                 # Main app component
│   └── main.jsx                # Entry point
├── index.html                  # HTML template
├── vite.config.js             # Vite configuration
├── package.json               # Dependencies
├── .env                       # Environment variables (DON'T COMMIT)
├── .env.example              # Environment template
├── .gitignore               # Git ignore rules
└── SUPABASE_SETUP.sql       # Database setup script
```

---

## 🗄️ Database Schema

### Products Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(255) | Product name |
| description | TEXT | Product description |
| price | DECIMAL | Product price |
| category | VARCHAR(100) | Product category |
| image_url | TEXT | Product image URL |
| seller_id | UUID | Reference to seller (auth user) |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Orders Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Reference to buyer (auth user) |
| items | JSONB | Order items array |
| total_price | DECIMAL | Order total |
| status | VARCHAR(50) | Order status (pending, completed, etc.) |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### RLS Policies

**Products:**
- ✅ Public can SELECT all products
- ✅ Sellers can INSERT/UPDATE/DELETE only their products
- ❌ Other users cannot modify products

**Orders:**
- ✅ Users can SELECT/INSERT/UPDATE/DELETE only their orders
- ❌ Users cannot see other users' orders

---

## 🎯 Key Features Explained

### Authentication Flow
1. User signs up or logs in on the User Portal
2. Supabase Auth creates a session
3. User email displayed in header
4. Session persists across page reloads
5. Logout clears the session

### Product Management
1. Only authenticated users can add products
2. Products are associated with seller_id
3. All users can view all products
4. Products appear immediately after adding

### Cart Management
1. Cart stored in localStorage for persistence
2. Add/remove items and adjust quantities
3. Total calculated automatically
4. Clear cart after successful order

### Order Placement
1. Only authenticated users can place orders
2. Order saved with user_id and items array
3. Email confirmation (can be added via Supabase emails)
4. Order status tracked in database

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/makeup-ecommerce.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and select your repository
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click "Deploy"

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Go to [netlify.com](https://netlify.com) and sign in with GitHub
3. Click "New site from Git" and select your repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variables in Site settings
7. Deploy

---

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000

# Production
npm run build        # Build for production
npm run preview      # Preview production build locally

# Linting (optional)
npm run lint         # Check for ESLint errors
```

---

## 🔐 Security Best Practices

1. **Never commit `.env` file** - It contains sensitive API keys
2. **Use `.env.example`** - Template for required variables
3. **Enable RLS** - All database access controlled by policies
4. **Supabase Auth** - Automatic user identification
5. **HTTPS Only** - Always use HTTPS in production
6. **Regular Updates** - Keep dependencies up to date

---

## 📱 Responsive Design

The app is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

All components adapt to screen size automatically.

---

## 🐛 Troubleshooting

### Products not loading?
- Check Supabase URL and Anon Key in `.env`
- Verify RLS policies are correctly set
- Check browser console for errors

### Can't add products?
- Make sure you're logged in
- Check that seller_id matches your user.id
- Verify table has correct name (`products`)

### Cart not persisting?
- Check if localStorage is enabled in browser
- Clear browser cache and try again

### Authentication not working?
- Verify Supabase Auth is enabled
- Check email/password format
- Look for errors in console

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Vite Guide](https://vitejs.dev)
- [JavaScript Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

---

## 📧 Support

For issues and questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Contact support@makeupstore.com

---

**Built with ❤️ using React + Supabase + Vite**
"# MAKE-UP-" 
