import bcrypt from 'bcryptjs';
import promptSync from 'prompt-sync';
import { initDatabase, createAdmin, createJob } from './database.js';

function validateAdminPassword(password) {
  if (!password || password.length < 12) {
    throw new Error('Admin password must be at least 12 characters long.');
  }

  if (password.toLowerCase() === 'admin123') {
    throw new Error('Weak password detected. Do not use default passwords like "admin123".');
  }
}

function resolveAdminPassword() {
  const envPassword = process.env.ADMIN_PASSWORD?.trim();

  if (envPassword) {
    validateAdminPassword(envPassword);
    return envPassword;
  }

  const prompt = promptSync({ sigint: true });
  const enteredPassword = prompt('🔐 Enter admin password (min 12 chars): ', { echo: '*' })?.trim();

  validateAdminPassword(enteredPassword);
  return enteredPassword;
}

function seedDatabase() {
  console.log('🌱 Seeding database...');
  
  try {
    // Initialize database
    initDatabase();
    
    // Create default admin user
    console.log('👤 Creating default admin user...');
    const adminUsername = process.env.DEFAULT_ADMIN_USERNAME?.trim() || 'admin';
    const adminPassword = resolveAdminPassword();
    const hashedPassword = bcrypt.hashSync(adminPassword, 10);
    
    try {
      createAdmin({
        username: adminUsername,
        password: hashedPassword,
        email: 'admin@digiteckvision.com'
      });
      console.log(`✅ Admin created: username: ${adminUsername}`);
      console.log('🔒 Password was provided securely (env var or prompt) and was not logged.');
    } catch (error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        console.log(`ℹ️  Admin user already exists: ${adminUsername}`);
      } else {
        throw error;
      }
    }
    
    // Seed sample jobs from content.ts structure
    console.log('💼 Seeding sample jobs...');
    const sampleJobs = [
      {
        id: "job-001",
        role: "Senior Sales Manager",
        location: "Saudi Arabia",
        type: "Full time",
        workModel: "Hybrid",
        description: "Lead our sustainability initiatives and drive environmental responsibility across all company operations.",
        jobRef: "DV-SM-2026-001",
        dateListed: "2026-02-01",
        closingDate: "2026-03-15",
        status: "Active",
        department: "Operations",
        reportingTo: "Head of Operations",
        numberOfReportees: "3",
        jobDescription: "Lead our sustainability initiatives and drive environmental responsibility across all company operations. Develop and implement comprehensive sustainability strategies that align with our corporate values and regulatory requirements.",
        candidateRequirements: "Bachelor's degree in Environmental Science, Sustainability, or related field. 5+ years of experience in sustainability management. Strong analytical and project management skills."
      },
      {
        id: "job-002",
        role: "Office Manager",
        location: "San Francisco",
        type: "Full time",
        workModel: "On-site",
        description: "Oversee daily office operations and ensure smooth administrative processes.",
        jobRef: "DV-OM-2026-002",
        dateListed: "2026-02-05",
        closingDate: "2026-03-20",
        status: "Active",
        department: "Administration",
        reportingTo: "Chief Operating Officer",
        numberOfReportees: "2",
        jobDescription: "Oversee daily office operations and ensure smooth administrative processes. Manage office facilities, coordinate with vendors, and support team productivity through efficient operational systems.",
        candidateRequirements: "Bachelor's degree in Business Administration or equivalent experience. 3+ years in office management. Excellent organizational and communication skills. Proficiency in office management software."
      },
      {
        id: "job-003",
        role: "Senior Project Manager",
        location: "San Francisco",
        type: "Full time",
        workModel: "Remote",
        description: "Lead complex technology projects from conception to delivery.",
        jobRef: "DV-SPM-2026-003",
        dateListed: "2026-02-10",
        closingDate: "2026-04-01",
        status: "Active",
        department: "Project Management",
        reportingTo: "Director of Projects",
        numberOfReportees: "5",
        jobDescription: "Lead complex technology projects from conception to delivery. Coordinate cross-functional teams, manage project timelines, budgets, and stakeholder communications. Ensure project deliverables meet quality standards and business objectives.",
        candidateRequirements: "PMP certification preferred. 7+ years of project management experience in technology sector. Strong leadership skills and experience managing remote teams. Proficiency in project management tools like JIRA, Confluence."
      }
    ];
    
    for (const job of sampleJobs) {
      try {
        createJob(job);
        console.log(`✅ Created job: ${job.role}`);
      } catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) {
          console.log(`ℹ️  Job already exists: ${job.role}`);
        } else {
          throw error;
        }
      }
    }
    
    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`• Admin user: ${adminUsername}`);
    console.log('• Sample jobs created');
    console.log('• Admin panel available at: /admin');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
} else {
  // On Windows, also try alternative check
  seedDatabase();
}