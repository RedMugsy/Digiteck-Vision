# Digiteck Vision Contact Form Backend

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Email Settings

Copy `.env.example` to `.env` and update with your SMTP credentials:

```bash
cp .env.example .env
```

Then edit `.env` and add your email credentials:

#### For Gmail:
1. Go to https://myaccount.google.com/apppasswords
2. Create an App Password
3. Use it in your .env file:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-digit-app-password
```

#### For Outlook/Hotmail:
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

#### For Custom SMTP:
```
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-password
```

### 3. Start the Server

Development mode (auto-reload on changes):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:3001`

### 4. Testing

Health check endpoint:
```
GET http://localhost:3001/api/health
```

Contact form endpoint:
```
POST http://localhost:3001/api/contact
```

### Features

- ✅ Email forwarding to info@digiteckvision.com
- ✅ Message logging to `logs/messages-YYYY-MM-DD.json`
- ✅ Email validation
- ✅ Required field validation
- ✅ Error handling and logging
- ✅ CORS enabled for frontend connection
- ✅ Professional HTML email templates
- ✅ Reply-to field set to sender's email

### Production Deployment

For production:
1. Set environment variables on your hosting platform
2. Ensure PORT is set correctly
3. Configure firewall to allow SMTP traffic (port 587)
4. Consider using a service like SendGrid, AWS SES, or Mailgun for better deliverability
5. Set up SSL/TLS for the API endpoint
6. Update the frontend API URL from `localhost:3001` to your production domain

### Logs

All submissions are logged to `server/logs/messages-YYYY-MM-DD.json` for record keeping.
