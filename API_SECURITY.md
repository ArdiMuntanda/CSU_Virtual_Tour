# CSU Virtual Tour - API Security Setup

## 🔒 Security Implementation Guide

This project uses environment variables to securely manage API keys and prevent accidental exposure of sensitive credentials.

## ⚠️ CRITICAL: API Key Exposure

**Your Google Maps API key was previously exposed in the repository.**

### Immediate Action Required:

1. **REVOKE the exposed API key immediately:**

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to **APIs & Services** → **Credentials**
   - Find and delete the exposed key: `AIzaSyDdUp_37M_ivzEpHtz3wzkg1nb7Jo8Z2GU`
   - Create a new API key for your project

2. **Update your `.env` file with the new key:**
   ```bash
   VITE_GOOGLE_MAPS_API_KEY=your_new_api_key_here
   ```

## 📂 Project Structure

```
.env                    # ← Your local credentials (DO NOT commit)
.env.example            # ← Template for developers (SAFE to commit)
scripts/config.js       # ← Application configuration
scripts/load-env.js     # ← Environment loader
scripts/inject-api-key.js # ← API key injection script
```

## 🚀 Setup Instructions

### For Development:

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create your `.env` file:**

   ```bash
   cp .env.example .env
   ```

3. **Add your Google Maps API key to `.env`:**

   ```bash
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

### For Production:

Set the `VITE_GOOGLE_MAPS_API_KEY` environment variable on your hosting platform:

- **Netlify:** Settings → Build & Deploy → Environment
- **Vercel:** Settings → Environment Variables
- **GitHub Pages:** Use GitHub Actions with secrets
- **Traditional Server:** Use your server's environment configuration

## 🛡️ Best Practices

1. ✅ **DO:**

   - Store API keys in `.env` files locally
   - Use environment variables in production
   - Restrict API key permissions in Google Cloud Console
   - Review `.gitignore` to ensure `.env` is excluded
   - Add API key restrictions by referencing domain/IP

2. ❌ **DON'T:**
   - Commit `.env` files to version control
   - Expose keys in client-side code
   - Share API keys in Slack, email, or commits
   - Use the same key for multiple projects
   - Allow unrestricted API key permissions

## 🔑 Google Cloud Console Security

After creating a new API key:

1. Go to **Credentials**
2. Click on your API key
3. Under **Application restrictions:**
   - Select **HTTP referrers (web sites)**
   - Add your domain(s): `yoursite.com`, `*.yoursite.com`
4. Under **API restrictions:**
   - Select **Restrict key**
   - Check only: **Maps JavaScript API** and **Street View API**

## 📖 How It Works

1. **Development:** `dotenv` loads variables from `.env` into `process.env`
2. **Injection:** `inject-api-key.js` sets `window.__GOOGLE_MAPS_API_KEY__`
3. **Usage:** `config.js` retrieves the key from the window object
4. **Production:** Environment variables are injected by your hosting platform

## 🧪 Testing

Verify your setup:

```javascript
// Open browser console and check:
console.log(window.__GOOGLE_MAPS_API_KEY__); // Should show your key
```

## 📞 Support

If you encounter issues:

1. Verify `.env` file exists in the root directory
2. Check that `VITE_GOOGLE_MAPS_API_KEY` is set
3. Restart your development server
4. Clear browser cache and restart
5. Check browser console for error messages

## 🚨 Troubleshooting

| Issue               | Solution                                          |
| ------------------- | ------------------------------------------------- |
| API key undefined   | Verify `.env` file exists and has the key         |
| Maps not loading    | Check API key is active in Google Cloud Console   |
| 403 Forbidden error | Verify API restrictions don't exclude your domain |
| Module not found    | Run `npm install` to install dependencies         |

---

**Last Updated:** November 16, 2025  
**Maintained by:** CSU Software Development Team
