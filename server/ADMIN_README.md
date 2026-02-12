# Digiteck Vision Admin System

## Overview
A comprehensive backend system for managing job postings and contact messages with a full-featured admin dashboard.

## Features

### Admin Dashboard
- **Job Management**: Full CRUD operations for job postings
- **Message Management**: View, status tracking, and deletion of contact messages
- **Secure Authentication**: JWT-based admin authentication
- **Responsive Interface**: Mobile-friendly admin panel

### Database Schema
- **Jobs Table**: Complete job information with all fields
- **Messages Table**: Contact form submissions
- **Admin Users**: Secure admin authentication
- **Job Applications**: Application tracking system

## Quick Setup

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Environment Configuration
Create a `.env` file in the server directory:
```env
PORT=3001
JWT_SECRET=your-super-secure-jwt-secret-key
EMAIL_HOST=your-email-host
EMAIL_PORT=587
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-email-password
```

### 3. Database Setup & Seeding
```bash
npm run seed
```
This will:
- Create SQLite database with all required tables
- Create default admin user (admin/admin123)
- Seed sample job data

### 4. Start Server
```bash
# Development
npm run dev

# Production
npm start
```

## Admin Access

### Default Credentials
- **URL**: `http://localhost:3000/admin`
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Important**: Change the default password after first login!

### Admin Features

#### Job Management
- **Add Jobs**: Complete job creation form with all fields
- **Edit Jobs**: Modify existing job postings
- **Delete Jobs**: Remove job postings
- **Status Control**: Active/Inactive/Closed status management
- **Field Management**: All job fields supported:
  - Job Title, Location, Type, Work Model
  - Department, Reporting To, Number of Reportees
  - Job Description, Candidate Requirements
  - Status, Dates, References

#### Message Management
- **View Messages**: All contact form submissions
- **Status Tracking**: Unread/Read/Replied status
- **Message Details**: Full message content viewing
- **Delete Messages**: Remove processed messages

## API Endpoints

### Public Endpoints
```
GET    /api/jobs              - Get active jobs
GET    /api/jobs/:id          - Get specific job
POST   /api/jobs/:id/apply    - Submit job application
POST   /api/messages          - Submit contact message
```

### Admin Endpoints (Require Authentication)
```
POST   /api/admin/login       - Admin login
POST   /api/admin/register    - Create admin user

GET    /api/admin/jobs        - Get all jobs
POST   /api/admin/jobs        - Create job
PUT    /api/admin/jobs/:id    - Update job
DELETE /api/admin/jobs/:id    - Delete job

GET    /api/admin/messages    - Get all messages
PUT    /api/admin/messages/:id/status - Update message status
DELETE /api/admin/messages/:id - Delete message

GET    /api/admin/applications - Get job applications
```

## Database

### Location
SQLite database: `server/digiteck_vision.db`

### Tables
- `jobs` - Job postings with all fields
- `messages` - Contact form submissions
- `admin_users` - Admin user accounts
- `job_applications` - Job application submissions

### Backup
The SQLite database file should be backed up regularly:
```bash
# Create backup
cp digiteck_vision.db digiteck_vision_backup_$(date +%Y%m%d).db

# Restore from backup
cp digiteck_vision_backup_YYYYMMDD.db digiteck_vision.db
```

## Security Features

### Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Token expiration (24 hours)
- Secure admin routes

### Data Validation
- Input sanitization
- Email validation
- Required field validation
- SQL injection protection (parameterized queries)

## Production Deployment

### Environment Variables
Set these in production:
```env
NODE_ENV=production
PORT=3001
JWT_SECRET=generate-a-very-secure-random-key
DATABASE_URL=your-production-database-url (if using external DB)
```

### Database Migration
For production, consider migrating to PostgreSQL or MySQL:
1. Update database.js with production DB configuration
2. Run migration scripts
3. Update connection strings

### Security Recommendations
1. Change default admin password immediately
2. Use strong JWT secret (32+ characters)
3. Enable HTTPS in production
4. Implement rate limiting
5. Regular database backups
6. Monitor admin access logs

## Frontend Integration

The admin system integrates seamlessly with the existing React frontend:
- Admin dashboard at `/admin` route
- Centralized content management
- Consistent navigation structure
- Mobile-responsive design

## Troubleshooting

### Common Issues
1. **Database not found**: Run `npm run seed` to initialize
2. **Admin login fails**: Check JWT_SECRET in .env
3. **Jobs not displaying**: Verify database connection
4. **Messages not saving**: Check API endpoints and CORS

### Logs
- Server logs: Console output
- Message logs: `server/logs/messages-YYYY-MM-DD.json`
- Database queries: Enable in development

## Development

### Adding New Features
1. Update database schema in `database.js`
2. Add API routes in `routes.js`
3. Update admin dashboard components
4. Test with sample data

### Testing
```bash
# Test API endpoints
curl -X GET http://localhost:3001/api/health

# Test admin login
curl -X POST http://localhost:3001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## Support
For technical support or feature requests, contact the development team.