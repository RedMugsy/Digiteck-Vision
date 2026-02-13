# Digiteck Vision - Secure Deployment Configuration

## 🚀 Deployment Architecture

- **Code Repository:** GitHub (secure, .env files ignored)
- **Backend API:** Railway App (Node.js/Express server)
- **Frontend:** Cloudflare Pages (React/Vite static site)
- **Security:** Cloudflare Turnstile (CAPTCHA protection)

## 🔧 Railway Backend Setup

### Railway Environment Variables (Set in Railway Dashboard)
```env
# Server Configuration
NODE_ENV=production
PORT=3001

# Security (IMPORTANT: Generate unique values)
JWT_SECRET=your-super-secure-production-jwt-secret-at-least-32-characters-long
FRONTEND_URL=https://your-domain.pages.dev
CORS_ORIGIN=https://your-domain.pages.dev

# Admin Configuration
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD=change-this-secure-password

# Logging
LOG_LEVEL=info
```

### Railway Deployment Steps
1. Connect GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Railway will auto-deploy on git push
4. Note the Railway app URL for frontend configuration

## 🌐 Cloudflare Pages Setup

### Cloudflare Pages Build Configuration
```yaml
# Build command
npm run build

# Output directory
dist

# Node.js version
18
```

### Cloudflare Environment Variables
```env
# API Configuration
VITE_API_URL=https://your-railway-app.railway.app/api
VITE_NODE_ENV=production

# Cloudflare Turnstile (Get from Cloudflare Dashboard)
VITE_TURNSTILE_SITE_KEY=your-turnstile-site-key
```

## 🛡️ Cloudflare Turnstile Integration

### 1. Install Turnstile Package
```bash
npm install @marsidev/react-turnstile
```

### 2. Add Turnstile to Login/Contact Forms
```tsx
import { Turnstile } from '@marsidev/react-turnstile'

// In your forms:
<Turnstile
  siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
  onSuccess={(token) => setTurnstileToken(token)}
/>
```

### 3. Verify Turnstile on Backend
Add to server middleware:
```javascript
// Verify Turnstile token
const verifyTurnstile = async (token) => {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  });
  return (await response.json()).success;
};
```

## 🔒 Security Checklist

### ✅ Repository Security
- [x] .env files ignored in .gitignore
- [x] No secrets in source code
- [x] Database files excluded from git

### ✅ Backend Security (Railway)
- [x] JWT secret validation on startup
- [x] Rate limiting on all endpoints
- [x] CORS restricted to frontend domain
- [x] Input validation on all routes
- [x] Security headers (Helmet.js)
- [x] Admin registration disabled
- [x] Security event logging

### ✅ Frontend Security (Cloudflare)
- [x] Environment-based API URLs
- [x] Secure token storage patterns
- [x] HTTPS-only in production
- [x] Turnstile protection on forms

## 📦 Deployment Commands

### Deploy Backend (Railway)
```bash
# Automatic on git push to main branch
git push origin main
```

### Deploy Frontend (Cloudflare Pages)
```bash
# Build for production
npm run build

# Automatic deployment via Cloudflare Pages GitHub integration
```

## 🔍 Post-Deployment Verification

### Backend Health Checks
```bash
curl https://your-railway-app.railway.app/api/health
```

### Frontend Verification
1. Visit https://your-domain.pages.dev
2. Verify content loading from content.ts
3. Test admin login functionality
4. Confirm API connectivity

### Security Testing
1. Verify CORS restrictions
2. Test rate limiting
3. Confirm Turnstile protection
4. Validate JWT tokens
5. Test admin authentication

## 🚨 Production Security Reminders

1. **Change Default Admin Password** immediately after first login
2. **Monitor Security Logs** in Railway dashboard
3. **Update Secrets Regularly** (JWT secret, admin password)
4. **Enable Cloudflare Security Features** (WAF, DDoS protection)
5. **Set up Monitoring** for API endpoints and frontend performance

## 🔧 Troubleshooting

### CORS Issues
- Verify FRONTEND_URL in Railway matches Cloudflare domain
- Check CORS_ORIGIN environment variable

### Authentication Issues
- Ensure JWT_SECRET is properly set in Railway
- Verify token expiration settings

### Turnstile Issues
- Confirm site key matches Cloudflare dashboard
- Verify secret key is set in Railway backend