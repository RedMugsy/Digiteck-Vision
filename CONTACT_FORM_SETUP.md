# Digiteck Vision - Production Contact Form Setup

## Overview

The contact form is fully configured for production with:
- ✅ Backend API server with email forwarding
- ✅ Message logging system
- ✅ Form validation (client & server-side)
- ✅ International phone number support with country flags
- ✅ Error handling and user feedback
- ✅ Loading states during submission
- ✅ Email forwarding to info@digiteckvision.com
- ✅ Professional HTML email templates

## Quick Start

### 1. Configure Email Settings

Edit `server/.env` with your SMTP credentials:

```bash
cd server
cp .env.example .env
# Edit .env with your email credentials
```

**For Gmail:**
1. Enable 2-factor authentication on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Generate an App Password
4. Use it in your `.env` file

### 2. Install Dependencies

```bash
# Install frontend dependencies (already done)
npm install

# Install backend dependencies (already done)
cd server
npm install
cd ..
```

### 3. Run Development Servers

**Option A: Run both servers together**
```bash
npm run dev:all
```

**Option B: Run separately**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run dev:server
```

The frontend will run on `http://localhost:5173`  
The backend will run on `http://localhost:3001`

## Testing the Contact Form

1. Navigate to `/contact` page
2. Fill out the form (required fields: First Name, Last Name, Email, Company)
3. Select at least one interest
4. Check "I agree to the terms & conditions"
5. Click Submit
6. Check `server/logs/` for the logged submission
7. Check info@digiteckvision.com inbox for the email

## Production Deployment

### Backend Deployment

1. **Update Environment Variables:**
   - Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` on your hosting platform
   - Set `PORT` (default: 3001)

2. **Update API Configuration:**
   - Edit `src/config/api.ts`
   - Update the `production.apiUrl` with your API domain

3. **Deploy Backend:**
   - Use platforms like Heroku, DigitalOcean, AWS, Railway, or Render
   - Ensure Node.js environment
   - Run `npm start` in the `server` directory

4. **SSL/TLS:**
   - Use a reverse proxy (nginx) or hosting platform SSL
   - Update CORS settings in `server/index.js` if needed

### Frontend Deployment

1. **Build:**
   ```bash
   npm run build
   ```

2. **Deploy `dist/` folder to:**
   - Vercel
   - Netlify
   - CloudFlare Pages
   - AWS S3 + CloudFront
   - Your hosting provider

3. **Environment:**
   - Set `NODE_ENV=production`
   - Frontend will automatically use production API URL

## Email Provider Recommendations

For production, consider using:
- **SendGrid** - Free tier: 100 emails/day
- **AWS SES** - Very cheap, high deliverability
- **Mailgun** - Free tier: 5,000 emails/month
- **Resend** - Developer-friendly, good free tier

Benefits over Gmail SMTP:
- Better deliverability
- No 2FA/App Password issues
- Higher sending limits
- Better spam reputation
- Detailed analytics

## File Structure

```
digiteck-vision-new/
├── server/
│   ├── index.js           # Backend API server
│   ├── package.json       # Backend dependencies
│   ├── .env               # Email configuration (DO NOT COMMIT)
│   ├── .env.example       # Example configuration
│   ├── .gitignore         # Ignore logs and .env
│   ├── logs/              # Message logs (created automatically)
│   │   └── messages-YYYY-MM-DD.json
│   └── README.md          # Backend documentation
├── src/
│   ├── config/
│   │   └── api.ts         # API endpoint configuration
│   ├── sections/
│   │   └── ContactForm.tsx # Contact form component
│   └── phoneInput.css     # Phone input styling
└── package.json           # Frontend dependencies
```

## Features

### Contact Form
- First Name, Last Name (required)
- Email (required, validated)
- Phone (optional, international format with country selector)
- Company (required)
- Message (optional)
- 11 Interest checkboxes
- Terms & Conditions agreement (required)

### Backend API
- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check endpoint

### Logging
- All submissions logged to `server/logs/messages-YYYY-MM-DD.json`
- Includes timestamp, all form data, and submission status
- Errors are also logged

### Email Template
Professional HTML email with:
- Branded header (#FFAD01 gold color)
- Organized sections for contact info, interests, and message
- Reply-to set to sender's email for easy responses
- Footer with timestamp

## Security Considerations

1. **Environment Variables:** Never commit `.env` file
2. **CORS:** Update CORS settings for production domain
3. **Rate Limiting:** Consider adding rate limiting middleware
4. **Input Sanitization:** Currently validates required fields and email format
5. **HTTPS:** Always use HTTPS in production
6. **API Keys:** Keep SMTP credentials secure

## Troubleshooting

### Email Not Sending
1. Check SMTP credentials in `server/.env`
2. For Gmail, ensure App Password is used (not regular password)
3. Check server logs for error messages
4. Test with health endpoint: `GET http://localhost:3001/api/health`

### Form Not Submitting
1. Ensure backend server is running
2. Check browser console for errors
3. Verify API URL in `src/config/api.ts`
4. Check CORS settings in `server/index.js`

### Phone Number Issues
1. Phone field uses `react-phone-number-input`
2. Deimport PhoneInput from 'react-phone-number-input';
3. Supports all countries with automatic formatting

## Support

For issues or questions:
- Check `server/logs/` for error messages
- Review server console output
- Check browser developer console
- Verify email configuration in `.env`
