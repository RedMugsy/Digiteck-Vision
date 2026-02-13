import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getAllMessages,
  createMessage,
  updateMessageStatus,
  deleteMessage,
  createJobApplication,
  getJobApplications,
  createAdmin,
  getAdminByUsername
} from './database.js';
import {
  loginRateLimit,
  strictRateLimit,
  validateAdminLogin,
  validateJobApplication,
  validateMessage,
  validateJobId,
  handleValidationErrors,
  authenticateAdmin,
  securityLogger
} from './middleware/security.js';

const router = express.Router();

// Admin Authentication Routes
router.post('/admin/login', loginRateLimit, validateAdminLogin, handleValidationErrors, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Security logging
    securityLogger('LOGIN_ATTEMPT', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      username: username
    });
    
    const admin = getAdminByUsername(username);
    if (!admin) {
      securityLogger('LOGIN_FAILED_USER_NOT_FOUND', {
        ip: req.ip,
        username: username
      });
      return res.status(401).json({ 
        error: 'Authentication failed',
        message: 'Invalid credentials' 
      });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      securityLogger('LOGIN_FAILED_INVALID_PASSWORD', {
        ip: req.ip,
        username: username
      });
      return res.status(401).json({ 
        error: 'Authentication failed',
        message: 'Invalid credentials' 
      });
    }

    const token = jwt.sign(
      { 
        id: admin.id, 
        username: admin.username, 
        role: admin.role,
        iat: Math.floor(Date.now() / 1000)
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: '24h',
        issuer: 'digiteck-vision',
        audience: 'admin-panel'
      }
    );

    securityLogger('LOGIN_SUCCESS', {
      ip: req.ip,
      username: username,
      adminId: admin.id
    });

    res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    securityLogger('LOGIN_ERROR', {
      ip: req.ip,
      error: error.message
    });
    res.status(500).json({ 
      error: 'Authentication service temporarily unavailable',
      message: 'Please try again later' 
    });
  }
});

// REMOVED: Public admin registration endpoint for security
// Admin users must be created through secure seeding process

// Public Routes - Jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = getAllJobs();
    // Only return active jobs for public API with minimal data
    const activeJobs = jobs
      .filter(job => job.status === 'Active')
      .map(job => ({
        id: job.id,
        role: job.role,
        location: job.location,
        type: job.type,
        workModel: job.workModel,
        description: job.description,
        jobRef: job.jobRef,
        dateListed: job.dateListed,
        closingDate: job.closingDate,
        department: job.department
      }));
    
    res.json(activeJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ 
      error: 'Service temporarily unavailable',
      message: 'Unable to fetch job listings' 
    });
  }
});

router.get('/jobs/:id', validateJobId, handleValidationErrors, async (req, res) => {
  try {
    const job = getJobById(req.params.id);
    if (!job || job.status !== 'Active') {
      return res.status(404).json({ 
        error: 'Job not found',
        message: 'This job posting is no longer available' 
      });
    }
    
    // Return limited job data for public API
    const publicJobData = {
      id: job.id,
      role: job.role,
      location: job.location,
      type: job.type,
      workModel: job.workModel,
      description: job.description,
      jobRef: job.jobRef,
      dateListed: job.dateListed,
      closingDate: job.closingDate,
      department: job.department,
      reportingTo: job.reportingTo,
      numberOfReportees: job.numberOfReportees,
      jobDescription: job.jobDescription,
      candidateRequirements: job.candidateRequirements
    };
    
    res.json(publicJobData);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ 
      error: 'Service temporarily unavailable',
      message: 'Unable to fetch job details' 
    });
  }
});

// Job Application (Public)
router.post('/jobs/:id/apply', validateJobId, validateJobApplication, handleValidationErrors, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, resume, coverLetter } = req.body;
    const jobId = req.params.id;

    // Verify job exists and is active
    const job = getJobById(jobId);
    if (!job || job.status !== 'Active') {
      return res.status(404).json({ 
        error: 'Job not available',
        message: 'This job posting is no longer accepting applications' 
      });
    }

    // Check if closing date has passed
    if (new Date() > new Date(job.closingDate)) {
      return res.status(400).json({
        error: 'Application deadline passed',
        message: 'The application deadline for this position has expired'
      });
    }

    securityLogger('JOB_APPLICATION_SUBMITTED', {
      ip: req.ip,
      jobId: jobId,
      email: email
    });

    createJobApplication({
      jobId,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase(),
      phone: phone?.trim() || '',
      resume: resume?.trim() || '',
      coverLetter: coverLetter?.trim() || ''
    });

    res.json({ 
      success: true, 
      message: 'Application submitted successfully',
      jobReference: job.jobRef
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    securityLogger('JOB_APPLICATION_ERROR', {
      ip: req.ip,
      jobId: req.params.id,
      error: error.message
    });
    res.status(500).json({ 
      error: 'Application service temporarily unavailable',
      message: 'Please try submitting your application again later' 
    });
  }
});

// Public Messages Route
router.post('/messages', validateMessage, handleValidationErrors, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, message } = req.body;
    
    securityLogger('CONTACT_MESSAGE_SUBMITTED', {
      ip: req.ip,
      email: email
    });
    
    createMessage({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase(),
      phone: phone?.trim() || '',
      company: company?.trim() || '',
      message: message.trim()
    });

    res.json({ 
      success: true, 
      message: 'Message sent successfully. We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Error creating message:', error);
    securityLogger('CONTACT_MESSAGE_ERROR', {
      ip: req.ip,
      error: error.message
    });
    res.status(500).json({ 
      error: 'Message service temporarily unavailable',
      message: 'Please try sending your message again later' 
    });
  }
});

// Admin Routes - Jobs Management
router.get('/admin/jobs', authenticateAdmin, async (req, res) => {
  try {
    const jobs = await getAllJobs();
    res.json({
      success: true,
      data: jobs,
      count: jobs.length
    });
  } catch (error) {
    console.error('Error fetching admin jobs:', error);
    res.status(500).json({ 
      error: 'Database service unavailable',
      message: 'Unable to fetch job listings' 
    });
  }
});

router.post('/admin/jobs', authenticateAdmin, strictRateLimit, async (req, res) => {
  try {
    // Sanitize and validate job data
    const jobData = {
      ...req.body,
      createdBy: req.admin.username,
      lastModifiedBy: req.admin.username
    };
    
    securityLogger('ADMIN_JOB_CREATED', {
      adminId: req.admin.id,
      ip: req.ip,
      jobId: jobData.id
    });
    
    const result = createJob(jobData);
    res.json({ 
      success: true, 
      message: 'Job created successfully',
      jobId: result.lastID
    });
  } catch (error) {
    console.error('Error creating job:', error);
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({
        error: 'Duplicate job',
        message: 'A job with this ID or reference already exists'
      });
    }
    res.status(500).json({ 
      error: 'Job creation failed',
      message: 'Unable to create job posting' 
    });
  }
});

router.put('/admin/jobs/:id', authenticateAdmin, validateJobId, handleValidationErrors, strictRateLimit, async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      lastModifiedBy: req.admin.username
    };
    
    securityLogger('ADMIN_JOB_UPDATED', {
      adminId: req.admin.id,
      ip: req.ip,
      jobId: req.params.id
    });
    
    const updatedJob = updateJob(req.params.id, jobData);
    if (!updatedJob) {
      return res.status(404).json({ 
        error: 'Job not found',
        message: 'The specified job does not exist' 
      });
    }
    res.json({ 
      success: true, 
      data: updatedJob,
      message: 'Job updated successfully'
    });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ 
      error: 'Job update failed',
      message: 'Unable to update job posting' 
    });
  }
});

router.delete('/admin/jobs/:id', authenticateAdmin, validateJobId, handleValidationErrors, strictRateLimit, async (req, res) => {
  try {
    securityLogger('ADMIN_JOB_DELETED', {
      adminId: req.admin.id,
      ip: req.ip,
      jobId: req.params.id
    });
    
    const deleted = deleteJob(req.params.id);
    if (!deleted) {
      return res.status(404).json({ 
        error: 'Job not found',
        message: 'The specified job does not exist' 
      });
    }
    res.json({ 
      success: true, 
      message: 'Job deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ 
      error: 'Job deletion failed',
      message: 'Unable to delete job posting' 
    });
  }
});

// Admin Routes - Messages Management
router.get('/admin/messages', authenticateAdmin, async (req, res) => {
  try {
    const messages = getAllMessages();
    res.json({
      success: true,
      data: messages,
      count: messages.length
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ 
      error: 'Database service unavailable',
      message: 'Unable to fetch messages' 
    });
  }
});

router.put('/admin/messages/:id/status', authenticateAdmin, strictRateLimit, async (req, res) => {
  try {
    const { status } = req.body;
    
    // Validate status value
    if (!['read', 'unread', 'archived'].includes(status)) {
      return res.status(400).json({
        error: 'Invalid status',
        message: 'Status must be: read, unread, or archived'
      });
    }
    
    securityLogger('ADMIN_MESSAGE_STATUS_UPDATED', {
      adminId: req.admin.id,
      ip: req.ip,
      messageId: req.params.id,
      newStatus: status
    });
    
    const updated = updateMessageStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({
        error: 'Message not found',
        message: 'The specified message does not exist'
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Message status updated successfully' 
    });
  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).json({ 
      error: 'Status update failed',
      message: 'Unable to update message status' 
    });
  }
});

router.delete('/admin/messages/:id', authenticateAdmin, strictRateLimit, async (req, res) => {
  try {
    securityLogger('ADMIN_MESSAGE_DELETED', {
      adminId: req.admin.id,
      ip: req.ip,
      messageId: req.params.id
    });
    
    const deleted = deleteMessage(req.params.id);
    if (!deleted) {
      return res.status(404).json({ 
        error: 'Message not found',
        message: 'The specified message does not exist' 
      });
    }
    res.json({ 
      success: true, 
      message: 'Message deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ 
      error: 'Message deletion failed',
      message: 'Unable to delete message' 
    });
  }
});

// Admin Routes - Job Applications Management
router.get('/admin/applications', authenticateAdmin, async (req, res) => {
  try {
    const jobId = req.query.jobId;
    const applications = getJobApplications(jobId);
    res.json({
      success: true,
      data: applications,
      count: applications.length,
      filteredBy: jobId ? `jobId: ${jobId}` : 'all applications'
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ 
      error: 'Database service unavailable',
      message: 'Unable to fetch applications' 
    });
  }
});

export default router;