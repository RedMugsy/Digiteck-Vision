import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const JOBS_FILE = path.join(DATA_DIR, 'jobs.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const ADMINS_FILE = path.join(DATA_DIR, 'admins.json');
const APPLICATIONS_FILE = path.join(DATA_DIR, 'applications.json');

// Initialize data directory and files
export function initDatabase() {
  // Create data directory if it doesn't exist
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Initialize JSON files if they don't exist
  const files = [
    { path: JOBS_FILE, data: [] },
    { path: MESSAGES_FILE, data: [] },
    { path: ADMINS_FILE, data: [] },
    { path: APPLICATIONS_FILE, data: [] }
  ];

  files.forEach(({ path, data }) => {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify(data, null, 2));
    }
  });

  console.log('JSON database initialized successfully');
  return true;
}

// Helper functions to read/write JSON files
function readDataFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

function writeDataFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}

// Job CRUD operations
export function getAllJobs() {
  return readDataFile(JOBS_FILE);
}

export function getActiveJobs() {
  const jobs = readDataFile(JOBS_FILE);
  return jobs.filter(job => job.status === 'Active');
}

export function getJobById(id) {
  const jobs = readDataFile(JOBS_FILE);
  return jobs.find(job => job.id === id);
}

export function createJob(jobData) {
  const jobs = readDataFile(JOBS_FILE);
  
  // Check if job with same ID or jobRef already exists
  const existingJob = jobs.find(job => job.id === jobData.id || job.jobRef === jobData.jobRef);
  if (existingJob) {
    throw new Error('UNIQUE constraint failed: job ID or reference already exists');
  }
  
  const newJob = {
    ...jobData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  jobs.push(newJob);
  writeDataFile(JOBS_FILE, jobs);
  
  return { lastID: jobData.id, changes: 1 };
}

export function updateJob(id, jobData) {
  const jobs = readDataFile(JOBS_FILE);
  const jobIndex = jobs.findIndex(job => job.id === id);
  
  if (jobIndex === -1) {
    throw new Error('Job not found');
  }
  
  jobs[jobIndex] = {
    ...jobs[jobIndex],
    ...jobData,
    updatedAt: new Date().toISOString()
  };
  
  writeDataFile(JOBS_FILE, jobs);
  return jobs[jobIndex];
}

export function deleteJob(id) {
  const jobs = readDataFile(JOBS_FILE);
  const jobIndex = jobs.findIndex(job => job.id === id);
  
  if (jobIndex === -1) {
    return false;
  }
  
  jobs.splice(jobIndex, 1);
  writeDataFile(JOBS_FILE, jobs);
  return true;
}

// Message operations
export function getAllMessages() {
  const messages = readDataFile(MESSAGES_FILE);
  return messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function createMessage(messageData) {
  const messages = readDataFile(MESSAGES_FILE);
  
  const newMessage = {
    id: crypto.randomUUID(),
    ...messageData,
    status: 'unread',
    createdAt: new Date().toISOString()
  };
  
  messages.push(newMessage);
  writeDataFile(MESSAGES_FILE, messages);
  
  return { lastID: newMessage.id, changes: 1 };
}

export function updateMessageStatus(id, status) {
  const messages = readDataFile(MESSAGES_FILE);
  const messageIndex = messages.findIndex(msg => msg.id === id);
  
  if (messageIndex === -1) {
    return false;
  }
  
  messages[messageIndex].status = status;
  writeDataFile(MESSAGES_FILE, messages);
  return true;
}

export function deleteMessage(id) {
  const messages = readDataFile(MESSAGES_FILE);
  const messageIndex = messages.findIndex(msg => msg.id === id);
  
  if (messageIndex === -1) {
    return false;
  }
  
  messages.splice(messageIndex, 1);
  writeDataFile(MESSAGES_FILE, messages);
  return true;
}

// Job application operations
export function createJobApplication(applicationData) {
  const applications = readDataFile(APPLICATIONS_FILE);
  
  const newApplication = {
    id: crypto.randomUUID(),
    ...applicationData,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  applications.push(newApplication);
  writeDataFile(APPLICATIONS_FILE, applications);
  
  return { lastID: newApplication.id, changes: 1 };
}

export function getJobApplications(jobId = null) {
  const applications = readDataFile(APPLICATIONS_FILE);
  const jobs = readDataFile(JOBS_FILE);
  
  // Add job title to applications
  const applicationsWithJobTitle = applications.map(app => {
    const job = jobs.find(j => j.id === app.jobId);
    return {
      ...app,
      jobTitle: job ? job.role : 'Unknown Job'
    };
  });
  
  if (jobId) {
    return applicationsWithJobTitle.filter(app => app.jobId === jobId);
  }
  
  return applicationsWithJobTitle.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Admin operations
export function createAdmin(adminData) {
  const admins = readDataFile(ADMINS_FILE);
  
  // Check if admin already exists
  const existingAdmin = admins.find(admin => admin.username === adminData.username);
  if (existingAdmin) {
    throw new Error('UNIQUE constraint failed: admin username already exists');
  }
  
  const newAdmin = {
    id: crypto.randomUUID(),
    ...adminData,
    role: adminData.role || 'admin',
    createdAt: new Date().toISOString()
  };
  
  admins.push(newAdmin);
  writeDataFile(ADMINS_FILE, admins);
  
  return { lastID: newAdmin.id, changes: 1 };
}

export function getAdminByUsername(username) {
  const admins = readDataFile(ADMINS_FILE);
  return admins.find(admin => admin.username === username);
}

export function updateAdminPassword(username, hashedPassword) {
  const admins = readDataFile(ADMINS_FILE);
  const adminIndex = admins.findIndex(admin => admin.username === username);
  
  if (adminIndex === -1) {
    return false;
  }
  
  admins[adminIndex].password = hashedPassword;
  writeDataFile(ADMINS_FILE, admins);
  return true;
}

// Utility functions
export function getDatabase() {
  return {
    dataDir: DATA_DIR,
    files: {
      jobs: JOBS_FILE,
      messages: MESSAGES_FILE,
      admins: ADMINS_FILE,
      applications: APPLICATIONS_FILE
    }
  };
}

export function closeDatabase() {
  // No cleanup needed for JSON files
  return true;
}