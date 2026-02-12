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

const router = express.Router();

// Middleware for admin authentication
const authenticateAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'digiteck-vision-secret-key');
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Admin Authentication Routes
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = getAdminByUsername(username);
    if (!admin) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET || 'digiteck-vision-secret-key',
      { expiresIn: '24h' }
    );

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
    res.status(500).json({ message: 'Server error during login.' });
  }
});

router.post('/admin/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    
    // Check if admin already exists
    const existingAdmin = getAdminByUsername(username);
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin user already exists.' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create admin
    createAdmin({
      username,
      password: hashedPassword,
      email
    });

    res.json({ success: true, message: 'Admin user created successfully.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

// Public Routes - Jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = getAllJobs();
    // Only return active jobs for public API
    const activeJobs = jobs.filter(job => job.status === 'Active');
    res.json(activeJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

router.get('/jobs/:id', async (req, res) => {
  try {
    const job = getJobById(req.params.id);
    if (!job || job.status !== 'Active') {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Error fetching job' });
  }
});

// Job Application (Public)
router.post('/jobs/:id/apply', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, resume, coverLetter } = req.body;
    const jobId = req.params.id;

    // Verify job exists and is active
    const job = getJobById(jobId);
    if (!job || job.status !== 'Active') {
      return res.status(404).json({ message: 'Job not found or not active' });
    }

    createJobApplication({
      jobId,
      firstName,
      lastName,
      email,
      phone,
      resume,
      coverLetter
    });

    res.json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Error submitting application' });
  }
});

// Public Messages Route
router.post('/messages', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, message } = req.body;
    
    createMessage({
      firstName,
      lastName,
      email,
      phone: phone || '',
      company: company || '',
      message
    });

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

// Admin Routes - Jobs Management
router.get('/admin/jobs', authenticateAdmin, async (req, res) => {
  try {
    const jobs = await getAllJobs();
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching admin jobs:', error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

router.post('/admin/jobs', authenticateAdmin, async (req, res) => {
  try {
    const jobData = req.body;
    createJob(jobData);
    res.json({ success: true, message: 'Job created successfully' });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Error creating job' });
  }
});

router.put('/admin/jobs/:id', authenticateAdmin, async (req, res) => {
  try {
    const jobData = req.body;
    const updatedJob = updateJob(req.params.id, jobData);
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ success: true, job: updatedJob });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Error updating job' });
  }
});

router.delete('/admin/jobs/:id', authenticateAdmin, async (req, res) => {
  try {
    const deleted = deleteJob(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Error deleting job' });
  }
});

// Admin Routes - Messages Management
router.get('/admin/messages', authenticateAdmin, async (req, res) => {
  try {
    const messages = getAllMessages();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

router.put('/admin/messages/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    updateMessageStatus(req.params.id, status);
    res.json({ success: true, message: 'Message status updated' });
  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).json({ message: 'Error updating message status' });
  }
});

router.delete('/admin/messages/:id', authenticateAdmin, async (req, res) => {
  try {
    const deleted = deleteMessage(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Error deleting message' });
  }
});

// Admin Routes - Job Applications Management
router.get('/admin/applications', authenticateAdmin, async (req, res) => {
  try {
    const jobId = req.query.jobId;
    const applications = getJobApplications(jobId);
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

export default router;