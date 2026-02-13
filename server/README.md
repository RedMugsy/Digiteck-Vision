# Digiteck Vision Backend Server

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

Copy `.env.template` to `.env` and update the values:

```bash
cp .env.template .env
```

Then edit `.env` and set your configuration:

```env
# Generate a secure JWT secret (32+ characters)
JWT_SECRET=your-super-secure-jwt-secret-key-at-least-32-characters-long

# Set your frontend URL for CORS
FRONTEND_URL=http://localhost:3000

# Admin login credentials
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD=change-this-to-secure-password
```

### 3. Initialize Database

```bash
npm run seed
```

This creates the JSON database files and default admin user.

### 4. Start the Server

Development mode (auto-reload on changes):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:3001`

### 5. Testing

Health check endpoint:
```
GET http://localhost:3001/api/health
```

Admin login endpoint:
```
POST http://localhost:3001/api/admin/login
```

Contact messages endpoint:
```
POST http://localhost:3001/api/messages
```

### Features

- ✅ **Admin Dashboard** - Secure admin panel with JWT authentication
- ✅ **Contact Messages** - Store contact form submissions in JSON database
- ✅ **Job Applications** - Handle job application submissions
- ✅ **Job Listings** - CRUD operations for job postings
- ✅ **Rate Limiting** - Protect against brute force attacks
- ✅ **Input Validation** - Comprehensive form validation
- ✅ **Security Headers** - Helmet.js security middleware
- ✅ **CORS Protection** - Restricted to frontend domains only
- ✅ **Security Logging** - Track authentication and admin operations

### Data Storage

- Contact messages: `server/data/messages.json`
- Job applications: `server/data/applications.json`
- Job listings: `server/data/jobs.json` 
- Admin users: `server/data/admins.json`

### Admin Panel Access

1. Start the server: `npm start`
2. Visit your frontend admin route (typically `/admin`)
3. Login with credentials from `.env`:
   - Username: `admin` (or your `DEFAULT_ADMIN_USERNAME`)
   - Password: `admin123` (or your `DEFAULT_ADMIN_PASSWORD`)

### Production Deployment

For production (Railway + Cloudflare):
1. Set environment variables in Railway dashboard
2. Generate secure JWT secret: `openssl rand -base64 64`
3. Set FRONTEND_URL to your Cloudflare Pages domain
4. Enable Cloudflare Turnstile for form protection
5. Update CORS_ORIGIN to production domain
6. Use strong admin password
