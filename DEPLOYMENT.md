# 🚀 Deployment Guide

This guide walks you through deploying your Makeup Store e-commerce app to the internet.

## Quick Start - Choose Your Platform

- [Vercel (Recommended)](#vercel-deployment)
- [Netlify](#netlify-deployment)

---

## Vercel Deployment

**Vercel** is recommended because it has the best integration with React/Vite projects.

### Step 1: Prepare Your Git Repository

```bash
# Make sure all changes are committed
git status

# If needed:
git add .
git commit -m "Ready for deployment"
```

### Step 2: Push to GitHub

1. Create a repository on [github.com](https://github.com/new)
2. Follow GitHub's instructions to push your code:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/makeup-ecommerce.git
git push -u origin main
```

### Step 3: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign in"** → Choose **"GitHub"**
3. Authorize Vercel to access your GitHub account
4. Click **"New Project"**
5. Select your `makeup-ecommerce` repository
6. In **"Environment Variables"**, add:
   ```
   VITE_SUPABASE_URL = your_supabase_url
   VITE_SUPABASE_ANON_KEY = your_anon_key
   ```
7. Click **"Deploy"**

**That's it!** Your app is now live. Vercel provides a URL like `https://your-app-name.vercel.app`

### Custom Domain (Optional)

1. Go to your project settings on Vercel
2. Click **"Domains"**
3. Add your custom domain (requires DNS configuration)

### Auto-Deploy Updates

Whenever you push changes to GitHub, Vercel automatically rebuilds and deploys your app!

---

## Netlify Deployment

### Step 1: Prepare Your Project

```bash
# Build the production version
npm run build

# This creates a 'dist' folder with optimized files
```

### Step 2: Push to GitHub

Same as Vercel steps above.

### Step 3: Deploy on Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click **"Sign up"** → Choose **"GitHub"**
3. Authorize Netlify access
4. Click **"New site from Git"**
5. Select your repository
6. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
7. Click **"Show advanced"** and add environment variables:
   ```
   VITE_SUPABASE_URL = your_supabase_url
   VITE_SUPABASE_ANON_KEY = your_anon_key
   ```
8. Click **"Deploy site"**

**Your app is live!** Netlify provides a URL like `https://your-app-name.netlify.app`

---

## Finding Your Supabase Credentials

### Get VITE_SUPABASE_URL

1. Open your Supabase project
2. Click **"Settings"** (bottom left)
3. Click **"API"**
4. Copy the **"Project URL"**
   ```
   Format: https://xxxxxxxxxxxx.supabase.co
   ```

### Get VITE_SUPABASE_ANON_KEY

1. Same location as above
2. Copy the **"anon" public key**
   ```
   Format: eyJhbGc... (long string)
   ```

### ⚠️ NEVER Share These Keys!
- Don't post them on social media
- Don't commit them to git
- Don't put them in public documentation
- Only share with deployment services (Vercel/Netlify)

---

## Testing Your Deployment

### After deployment, test these features:

1. **Browse Products** ✅
   - Visit home page
   - See makeup products loading

2. **Sign Up / Login** ✅
   - Create a new account
   - Log in with that account
   - See email in header

3. **Add Product** ✅
   - Go to User Portal while logged in
   - Add a new makeup product
   - Check if it appears on home page

4. **Add to Cart** ✅
   - Add some products to cart
   - Check cart page shows items

5. **Place Order** ✅
   - Click "Place Order"
   - Should see success message
   - Order saved in Supabase

---

## Troubleshooting Deployment

### App loads but shows "Cannot find products"

**Solution:**
- Check environment variables are set correctly
- Go back to Vercel/Netlify → Project Settings → Environment Variables
- Make sure keys are exact (no extra spaces)
- Redeploy after updating

### Authentication not working

**Solution:**
- Verify Supabase Auth is enabled (Settings → Authentication)
- Check RLS policies are enabled on tables
- Test in development locally first

### Products not visible after adding

**Solution:**
- Check Products table exists in Supabase
- Verify RLS policy: "Allow public to view products"
- Check browser console for errors
- Try refreshing the page

### Deployment failed

**Solution:**
- Check build logs on Vercel/Netlify dashboard
- Run `npm run build` locally to find errors
- Fix errors and commit
- Vercel/Netlify will auto-redeploy

---

## Performance Tips

### Image Optimization
- Use small image URLs
- Consider using a CDN (Cloudinary, Imgix)
- Compress images before uploading

### Database Optimization
- Indexes are already created
- RLS policies are minimal
- Order queries are indexed

### Caching
- Browser caches CSS/JS automatically
- Products cached during session
- Clear cache if needed

---

## Monitoring & Analytics

### Vercel Dashboard
- View deployment logs
- Monitor performance metrics
- See error tracking

### Netlify Dashboard
- View build logs
- Monitor site traffic
- Set up notifications

### Supabase Dashboard
- View database usage
- Monitor authentication
- Check API usage

---

## Setting Up Domain Name (Optional)

### For Vercel:
1. Project → Settings → Domains
2. Add your domain
3. Update DNS settings (provided by Vercel)

### For Netlify:
1. Site settings → Domain management
2. Add custom domain
3. Update DNS settings (provided by Netlify)

---

## Continuous Deployment Workflow

Your deployment is already set up for continuous deployment:

```
You make changes
    ↓
git commit & git push
    ↓
GitHub notified
    ↓
Vercel/Netlify builds
    ↓
Tests run
    ↓
App deployed live
    ↓
New URL available
```

**No manual deployment needed!** Just push to GitHub and your changes go live.

---

## Common Environment Variable Issues

### ❌ Wrong Format
```
VITE_SUPABASE_URL = "https://xxxxx.supabase.co" (don't include quotes)
```

### ✅ Correct Format
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### Important
- No quotes around values
- No spaces around `=`
- Variable names are case-sensitive

---

## Rollback (Undo a Deployment)

### Vercel
1. Dashboard → Your Project
2. Click "Deployments"
3. Find previous successful deployment
4. Click "Promote to Production"

### Netlify
1. Site settings → Deploys
2. Find previous successful deploy
3. Click "Publish deploy"

---

## Need Help?

- Check the main [README.md](README.md)
- Review [Supabase docs](https://supabase.com/docs)
- Check [Vercel docs](https://vercel.com/docs)
- Check [Netlify docs](https://docs.netlify.com)

---

**Your app is now live! 🎉**

Share your live URL:
```
https://your-app-name.vercel.app
or
https://your-app-name.netlify.app
```
