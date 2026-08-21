# 🎯 Getting Started Guide

Welcome to the Makeup E-Commerce Store! Follow these steps to get the project running locally on your computer.

---

## Prerequisites - What You Need

Before starting, make sure you have:

1. **Node.js** (version 14 or higher)
   - Download from [nodejs.org](https://nodejs.org)
   - Check if installed: `node --version`

2. **npm** (comes with Node.js)
   - Check if installed: `npm --version`

3. **Git** (for version control)
   - Download from [git-scm.com](https://git-scm.com)
   - Check if installed: `git --version`

4. **Supabase Account** (free)
   - Sign up at [supabase.com](https://supabase.com)
   - Verify your email

5. **GitHub Account** (for storing code)
   - Sign up at [github.com](https://github.com)
   - This is where you'll push your code

---

## Step 1: Setup Supabase Database

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"Sign in"** → then **"New project"**
3. Choose your organization
4. Fill in:
   - **Project name:** `makeup-store`
   - **Database password:** Create a strong password (save it!)
   - **Region:** Choose closest to you
5. Click **"Create new project"**
6. Wait 2-3 minutes for project to initialize

### 1.2 Create Database Tables

1. Go to your Supabase project dashboard
2. On the left sidebar, click **"SQL Editor"**
3. Click **"New query"**
4. Paste the entire contents of `SUPABASE_SETUP.sql` from your project folder
5. Click **"Run"** button (or press Ctrl+Enter)
6. Wait for the SQL to execute (should show green checkmark)

**Important:** This creates:
- `products` table (for makeup items)
- `orders` table (for customer orders)
- Security policies (RLS)
- Sample products

### 1.3 Get Your Supabase Credentials

You'll need two things to connect your app to Supabase:

**To get VITE_SUPABASE_URL:**
1. Click **"Settings"** (bottom left of Supabase)
2. Click **"API"** in sidebar
3. Look for **"Project URL"**
4. Copy it (looks like: `https://xxxxx.supabase.co`)
5. Save it somewhere safe

**To get VITE_SUPABASE_ANON_KEY:**
1. Same location as above
2. Look for **"anon"** under "Project API keys"
3. Copy the key (long string starting with `eyJ...`)
4. Save it somewhere safe

⚠️ **NEVER share these keys publicly!**

---

## Step 2: Setup Local Project

### 2.1 Install Dependencies

```bash
# Open terminal/command prompt
# Navigate to your project folder
cd "make up store"

# Install all dependencies
npm install
```

This downloads all required packages (React, Supabase client, etc). Takes 1-2 minutes.

### 2.2 Create Environment File

```bash
# Copy the example file
cp .env.example .env
```

**On Windows (if the above doesn't work):**
- Open `.env.example` in a text editor
- Save it as `.env` in the same folder

### 2.3 Add Your Credentials

1. Open the `.env` file in your text editor
2. Fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your_url_here.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace:
- `https://your_url_here.supabase.co` with your actual URL
- `your_anon_key_here` with your actual anon key

3. Save the file (Ctrl+S)

---

## Step 3: Run the Development Server

```bash
# Start the development server
npm run dev
```

You should see:
```
  VITE v4.3.9  ready in 233 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

**Your browser should open automatically to http://localhost:3000**

If not, manually go to `http://localhost:3000` in your browser.

---

## Step 4: Test Basic Functionality

### ✅ Test Home Page
1. You should see **"Welcome to Our Makeup Store"**
2. You should see 8 sample makeup products
3. Try adding a product to cart

### ✅ Test Authentication
1. Click **"👤 Portal"** in the header
2. Click **"Don't have an account? Sign Up"**
3. Enter an email: `test@example.com`
4. Enter a password: `Test123!`
5. Click **"Sign Up"**
6. You should see: **"Welcome, test@example.com"**
7. Check the header - your email should appear

### ✅ Test Add Product
1. While logged in, you should see the **"Add New Product"** form
2. Fill in:
   - Product Name: `My Lipstick`
   - Price: `19.99`
   - Category: `Lipstick`
3. Click **"+ Add Product"**
4. You should see: **"Product added successfully!"**
5. Go back to Home page
6. Your new product should appear at the top!

### ✅ Test Cart
1. Go to **"🛒 Cart"**
2. You should see products you added
3. Try:
   - Click **"+"** to increase quantity
   - Click **"−"** to decrease quantity
   - Click **"🗑️"** to remove an item

### ✅ Test Place Order
1. While on cart page with items
2. Make sure you're logged in (should see your email in header)
3. Click **"✅ Place Order"**
4. You should see: **"✅ Order placed successfully!"**
5. Cart should be empty

**Congratulations! Everything is working! 🎉**

---

## Step 5: GitHub Setup (Important for Deployment)

### 5.1 Initialize Git Repository

```bash
# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Makeup store setup"
```

### 5.2 Create GitHub Repository

1. Go to [github.com](https://github.com/new)
2. Create a new repository:
   - Name: `makeup-ecommerce`
   - Description: `E-commerce store for makeup products`
   - Set to **Public** (so you can deploy)
   - Don't initialize with README
3. Click **"Create repository"**

### 5.3 Push Code to GitHub

Follow GitHub's instructions or use:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/makeup-ecommerce.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

**Your code is now backed up on GitHub!**

---

## Common Issues & Solutions

### Issue: "npm command not found"
**Solution:** Node.js not installed or not in PATH
- Download and install Node.js from [nodejs.org](https://nodejs.org)
- Restart your terminal/command prompt
- Try `npm --version` again

### Issue: "Cannot find products"
**Solution:** Supabase credentials are wrong or not loaded
- Check `.env` file has correct URL and key
- Make sure you ran `SUPABASE_SETUP.sql`
- Restart dev server: `npm run dev`
- Check browser console for errors (F12 → Console)

### Issue: "Port 3000 already in use"
**Solution:** Another app is using port 3000
- Close other apps using port 3000
- Or run on different port: `npm run dev -- --port 3001`

### Issue: "Products table doesn't exist"
**Solution:** SQL script didn't run properly
- Go to Supabase SQL Editor
- Check if `products` and `orders` tables exist
- If not, run `SUPABASE_SETUP.sql` again

### Issue: "Can't sign up - getting error"
**Solution:** Supabase Auth not enabled
- Go to Supabase project
- Click **"Authentication"** in sidebar
- Click **"Providers"**
- Make sure **"Email"** is enabled (toggle ON)

### Issue: Changes not showing up?
**Solution:** Need to rebuild or refresh
- Stop dev server (Ctrl+C)
- Run `npm run dev` again
- Refresh browser (Ctrl+R or Cmd+R)
- Clear cache if needed (Ctrl+Shift+Delete)

---

## Next Steps

After everything is working:

1. **Customize the store**
   - Change colors in CSS files
   - Update product categories
   - Add your own product images

2. **Add more features**
   - Email notifications
   - Product search
   - User dashboard
   - Product reviews

3. **Deploy to internet**
   - Follow [DEPLOYMENT.md](DEPLOYMENT.md) guide
   - Get a live URL
   - Share with friends!

---

## File Structure Quick Reference

```
make up store/
├── src/                    # All your React code
│   ├── components/         # React components (Header, Cart, etc)
│   ├── context/           # State management (Auth, Cart)
│   ├── styles/            # CSS styling
│   └── App.jsx            # Main app component
├── .env                   # Your secret keys (DON'T COMMIT!)
├── .env.example          # Template for .env
├── package.json          # Project dependencies
└── README.md             # Main documentation
```

---

## Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Stop the server
Ctrl+C
```

---

## Getting Help

If you get stuck:

1. Check the [README.md](README.md) file
2. Review [Supabase documentation](https://supabase.com/docs)
3. Check browser console for errors (F12)
4. Try restarting the dev server
5. Delete `node_modules` folder and run `npm install` again

---

## You're All Set! 🚀

Your Makeup E-Commerce store is ready to use and customize!

**Next:** Follow [DEPLOYMENT.md](DEPLOYMENT.md) when you're ready to go live.

Happy coding! 💄✨
