import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, param, query, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

// Security headers middleware
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false, // Disable for development
});

// Rate limiting configurations
export const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const strictRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs for sensitive endpoints
  message: {
    error: 'Too many attempts from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Skip successful requests
  skipSuccessfulRequests: true,
});

export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 login attempts per 15 minutes
  message: {
    error: 'Too many login attempts from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

// Input validation schemas
export const validateAdminLogin = [
  body('username')
    .isLength({ min: 3, max: 50 })
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Username must be 3-50 characters, alphanumeric only'),
  body('password')
    .isLength({ min: 6, max: 128 })
    .withMessage('Password must be 6-128 characters'),
];

export const validateJobApplication = [
  body('firstName')
    .isLength({ min: 2, max: 50 })
    .matches(/^[a-zA-Z\s-']+$/)
    .withMessage('First name must be 2-50 characters, letters only'),
  body('lastName')
    .isLength({ min: 2, max: 50 })
    .matches(/^[a-zA-Z\s-']+$/)
    .withMessage('Last name must be 2-50 characters, letters only'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage('Valid email required (max 100 characters)'),
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Invalid phone number format'),
  body('resume')
    .optional()
    .isLength({ max: 10000 })
    .withMessage('Resume content too long'),
  body('coverLetter')
    .optional()
    .isLength({ max: 5000 })
    .withMessage('Cover letter content too long'),
];

export const validateMessage = [
  body('firstName')
    .isLength({ min: 2, max: 50 })
    .matches(/^[a-zA-Z\s-']+$/)
    .withMessage('First name must be 2-50 characters, letters only'),
  body('lastName')
    .isLength({ min: 2, max: 50 })
    .matches(/^[a-zA-Z\s-']+$/)
    .withMessage('Last name must be 2-50 characters, letters only'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage('Valid email required (max 100 characters)'),
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Invalid phone number format'),
  body('company')
    .optional()
    .isLength({ max: 100 })
    .matches(/^[a-zA-Z0-9\s&.-]+$/)
    .withMessage('Company name contains invalid characters'),
  body('message')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be 10-2000 characters'),
  body('turnstileToken')
    .isString()
    .notEmpty()
    .withMessage('Captcha verification required'),
];

export const validateJobId = [
  param('id')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Invalid job ID format'),
];

// Validation error handler
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Enhanced admin authentication middleware
export const authenticateAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ 
      error: 'Access denied',
      message: 'Authentication token required' 
    });
  }

  try {
    // Ensure JWT_SECRET is available
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
      console.error('JWT_SECRET is not properly configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const decoded = jwt.verify(token, secret);
    
    // Validate token structure
    if (!decoded.id || !decoded.username || !decoded.role) {
      return res.status(403).json({ error: 'Invalid token structure' });
    }
    
    req.admin = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ error: 'Invalid token' });
    }
    return res.status(500).json({ error: 'Token verification failed' });
  }
};

// CORS configuration for Railway + Cloudflare deployment
export const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      // Development origins
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',
      'http://localhost:5177',
      'http://localhost:5178',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
    ];
    
    // Production origins
    if (process.env.NODE_ENV === 'production') {
      // Add Railway frontend URL
      if (process.env.FRONTEND_URL) {
        allowedOrigins.push(process.env.FRONTEND_URL);
      }
      
      // Add Cloudflare Pages domains
      allowedOrigins.push(
        // Standard Cloudflare Pages patterns
        /^https:\/\/.*\.pages\.dev$/,
        // Custom domains on Cloudflare
        /^https:\/\/.*\.digiteckvision\.com$/,
        /^https:\/\/digiteckvision\.com$/,
        /^https:\/\/www\.digiteckvision\.com$/
      );
    }
    
    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return allowed === origin;
      } else if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error(`CORS policy violation: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 86400 // 24 hours
};

// Cloudflare Turnstile verification
export const verifyTurnstile = async (token) => {
  if (!token) {
    return { success: false, error: 'No Turnstile token provided' };
  }
  
  if (!process.env.TURNSTILE_SECRET_KEY) {
    // In development, skip Turnstile verification
    if (process.env.NODE_ENV === 'development') {
      return { success: true, message: 'Turnstile verification skipped in development' };
    }
    return { success: false, error: 'Turnstile secret key not configured' };
  }
  
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    });
    
    const result = await response.json();
    
    if (result.success) {
      return { success: true, message: 'Turnstile verification passed' };
    } else {
      return { 
        success: false, 
        error: 'Turnstile verification failed',
        codes: result['error-codes'] 
      };
    }
  } catch (error) {
    return { 
      success: false, 
      error: 'Turnstile verification service unavailable',
      details: error.message 
    };
  }
};

// Turnstile middleware for forms
export const requireTurnstile = async (req, res, next) => {
  // Skip in development
  if (process.env.NODE_ENV === 'development') {
    return next();
  }
  
  const turnstileToken = req.body['cf-turnstile-response'] || req.headers['x-turnstile-token'];
  
  if (!turnstileToken) {
    return res.status(400).json({
      error: 'Security verification required',
      message: 'Please complete the security check'
    });
  }
  
  const verification = await verifyTurnstile(turnstileToken);
  
  if (!verification.success) {
    securityLogger('TURNSTILE_VERIFICATION_FAILED', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      error: verification.error
    });
    
    return res.status(400).json({
      error: 'Security verification failed',
      message: 'Please try the security check again'
    });
  }
  
  securityLogger('TURNSTILE_VERIFICATION_SUCCESS', {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  next();
};

// Environment validation for secure deployment
export const validateEnvironment = () => {
  const requiredEnvVars = ['JWT_SECRET'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingVars.join(', '));
    console.error('Please copy .env.template to .env and configure the required variables');
    process.exit(1);
  }
  
  // Validate JWT secret strength
  if (process.env.JWT_SECRET.length < 32) {
    console.error('❌ JWT_SECRET must be at least 32 characters long');
    process.exit(1);
  }
  
  // Validate production environment
  if (process.env.NODE_ENV === 'production') {
    const productionVars = ['FRONTEND_URL'];
    const missingProdVars = productionVars.filter(varName => !process.env[varName]);
    
    if (missingProdVars.length > 0) {
      console.warn('⚠️  Missing recommended production variables:', missingProdVars.join(', '));
    }
    
    if (process.env.JWT_SECRET.includes('digiteck-vision') || process.env.JWT_SECRET.includes('default')) {
      console.error('❌ JWT_SECRET appears to be a default value. Use a unique secret in production!');
      process.exit(1);
    }
    
    if (!process.env.TURNSTILE_SECRET_KEY) {
      console.warn('⚠️  TURNSTILE_SECRET_KEY not set - form protection disabled');
    }
  }
  
  console.log('✅ Environment validation passed');
};

// Turnstile Verification
export const verifyTurnstile = async (token) => {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.warn('⚠️  Turnstile verification skipped - TURNSTILE_SECRET_KEY not configured');
    return true; // Allow in development if not configured
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', process.env.TURNSTILE_SECRET_KEY);
    formData.append('response', token);

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
};

// Security logging
export const securityLogger = (event, details = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    event,
    ip: details.ip,
    userAgent: details.userAgent,
    ...details
  };
  
  // In production, use proper logging service
  console.log(`[SECURITY] ${timestamp} - ${event}:`, logEntry);
};