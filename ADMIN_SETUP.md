# Admin Authentication Setup

## Environment Variables Required

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection String
# For local development: mongodb://localhost:27017/raj-kharel
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/raj-kharel
MONGODB_URI=mongodb://localhost:27017/raj-kharel

# Admin Password for /admin page
# Change this to a strong password in production
ADMIN_PASSWORD=1254kharel
```

## Security Notes

### ✅ Production-Ready Features:
- **Server-side authentication**: Password is verified on the server via `/api/admin/auth`
- **Environment variables**: Password stored in `.env.local` (not in code)
- **No client-side password**: Password never exposed in browser JavaScript

### 🔒 For Production Deployment:

1. **Set environment variables** on your hosting platform (Vercel, Netlify, etc.):
   - `MONGODB_URI` - Your MongoDB connection string
   - `ADMIN_PASSWORD` - A strong, unique password

2. **Never commit** `.env.local` to git (already in `.gitignore`)

3. **Use strong passwords** - Consider using:
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, and symbols
   - Password manager generated passwords

### 📝 How It Works:

1. User enters password on `/admin` page
2. Password sent to `/api/admin/auth` via POST request
3. Server compares with `ADMIN_PASSWORD` environment variable
4. Returns success/failure response
5. Client stores authentication state in session storage

### 🚀 Deployment Instructions:

**Vercel:**
```bash
vercel env add ADMIN_PASSWORD
vercel env add MONGODB_URI
```

**Netlify:**
Go to Site settings → Environment variables → Add variables

**Other platforms:**
Check your platform's documentation for setting environment variables.
