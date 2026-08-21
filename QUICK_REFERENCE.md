# 🎯 Quick Reference Card

**Makeup E-Commerce SPA - Essential Commands & Steps**

---

## 🚀 QUICK START (5 MINUTES)

```bash
# 1. Navigate to project
cd "make up store"

# 2. Install dependencies (2 min)
npm install

# 3. Add .env credentials
# Copy your Supabase URL and Anon Key to .env

# 4. Start dev server
npm run dev

# 5. Open browser to http://localhost:3000
```

---

## 🔑 SUPABASE SETUP

### Get Credentials
1. Go to supabase.com → Your Project → Settings
2. Click API → Copy "Project URL"
3. Copy "anon" public key
4. Paste into `.env` file

### Create Database
1. Go to SQL Editor
2. Paste SUPABASE_SETUP.sql
3. Click "Run"
4. Wait for tables to create

---

## 📁 PROJECT FILES

```
Key Files to Know:
├── src/
│   ├── components/     # UI components
│   ├── context/        # State management
│   └── styles/         # CSS
├── .env               # Your secrets (DON'T COMMIT!)
├── .env.example       # Template
├── SUPABASE_SETUP.sql # Database schema
└── package.json       # Dependencies
```

---

## 💻 COMMON COMMANDS

```bash
# Development
npm run dev            # Start dev server
npm run build          # Build for production
npm run preview        # Test production build

# Git
git add .              # Stage changes
git commit -m "msg"    # Commit
git push               # Push to GitHub

# Dependencies
npm install            # Install all packages
npm install PACKAGE    # Install specific package
npm update             # Update all packages
```

---

## 🧪 TEST FEATURES

- [ ] Home page loads (see products)
- [ ] Can sign up and login
- [ ] Can add products (when logged in)
- [ ] Products appear on home page
- [ ] Can add to cart
- [ ] Can change quantities
- [ ] Total calculates correctly
- [ ] Can place order (logged in)
- [ ] Cart clears after order

---

## 🚢 DEPLOY IN 3 STEPS

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Deploy ready"
git push origin main
```

### Step 2: Connect Vercel
1. Go to vercel.com
2. Click "New Project"
3. Select your repo
4. Add environment variables (.env)
5. Click Deploy

### Step 3: Go Live
- Vercel provides your URL
- Your site is live!
- Auto-deploys on git push

---

## 🔐 SECURITY CHECKLIST

- [ ] `.env` file added to `.gitignore`
- [ ] `.env` contains Supabase credentials only
- [ ] Never commit `.env` file
- [ ] `.env.example` has template (no real keys)
- [ ] Supabase Auth enabled
- [ ] RLS policies activated

---

## 🐛 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| "Cannot find module" | Run `npm install` |
| Products won't load | Check `.env` credentials |
| Can't sign up | Verify Supabase Auth enabled |
| Cart disappears | Enable localStorage in browser |
| Port 3000 in use | Run on different port: `npm run dev -- --port 3001` |

---

## 📚 DOCUMENTATION FILES

| File | When to Read |
|------|--------------|
| README.md | Project overview |
| SETUP.md | Getting started |
| DEPLOYMENT.md | Going live |
| ARCHITECTURE.md | Understanding design |
| DEVELOPER.md | Coding patterns |
| FILES.md | Project structure |

---

## 🎨 STYLING TIPS

```css
/* Main color scheme */
Primary: #667eea
Secondary: #764ba2
Text: #333
Background: #f5f5f5

/* Common classes */
.nav-btn       /* Navigation buttons */
.product-card  /* Product display */
.add-to-cart-btn /* Action buttons */
.error         /* Error messages */
```

---

## 🔗 IMPORTANT LINKS

- **Supabase:** https://supabase.com
- **React Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev
- **GitHub:** https://github.com
- **Vercel:** https://vercel.com
- **Netlify:** https://netlify.com

---

## 📋 ENVIRONMENT VARIABLES

```env
# Required (.env file)
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_ANON_KEY=your_key_here

# Format: No quotes, no spaces
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

---

## 🛒 KEY FEATURES

✅ **Home Page**
- Browse all products
- Add to cart
- Responsive grid

✅ **User Portal**
- Sign up / Login
- Add new products
- Seller dashboard

✅ **Cart**
- View items
- Change quantities
- Place orders

✅ **Security**
- User authentication
- Database RLS
- Secure API keys

---

## 💡 TIPS

1. **Always commit to GitHub** - Backup your code
2. **Use .env.example** - Share template, not secrets
3. **Test on mobile** - Use Chrome DevTools
4. **Read error messages** - They usually tell you what's wrong
5. **Keep dependencies updated** - `npm update`

---

## 📞 HELP RESOURCES

1. Check README.md for overview
2. Check SETUP.md for getting started
3. Check DEVELOPER.md for code help
4. Review browser console (F12)
5. Search Supabase documentation
6. Ask in GitHub discussions

---

## ⏱️ TIME ESTIMATES

| Task | Time |
|------|------|
| Local setup | 5-10 min |
| Database setup | 5 min |
| Testing locally | 10-15 min |
| Deployment | 10-15 min |
| **Total** | **~45 min** |

---

## 🎊 SUCCESS INDICATORS

- ✅ Projects runs on localhost:3000
- ✅ Products display from Supabase
- ✅ Can log in and add products
- ✅ Cart works and persists
- ✅ Orders save to database
- ✅ No console errors
- ✅ Responsive on mobile
- ✅ Deployed and live on Vercel/Netlify

---

## 🚀 YOUR JOURNEY

```
Start → Setup → Test → Deploy → Live!
  ↓      ↓      ↓       ↓       ↓
 5m    10m    15m      15m    ✨
```

---

## 🎯 REMEMBER

- Don't skip steps
- Read error messages carefully
- Test before deploying
- Keep .env secret
- Commit regularly to GitHub
- Have fun! 🎉

---

**Print this card or keep it handy!**
**Last update: 2026-08-20**
