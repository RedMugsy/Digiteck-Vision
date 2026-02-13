import { useState, useEffect } from "react";
import { endpoints, apiRequest, ApiError } from "../config/api";
import { useAuth } from "../hooks/useAuth";

interface Job {
  id: string;
  role: string;
  location: string;
  type: string;
  workModel: string;
  description: string;
  jobRef: string;
  dateListed: string;
  closingDate: string;
  status: string;
  department: string;
  reportingTo: string;
  numberOfReportees: string;
  jobDescription: string;
  candidateRequirements: string;
}

interface Message {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  status: string;
  createdAt: string;
}

interface AdminDashboardProps {
  admin: any;
}

export default function AdminDashboard({ admin }: AdminDashboardProps) {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [jobForm, setJobForm] = useState({
    id: '',
    role: '',
    location: '',
    type: 'Full time',
    workModel: 'On-site',
    description: '',
    jobRef: '',
    dateListed: new Date().toISOString().split('T')[0],
    closingDate: '',
    status: 'Active',
    department: '',
    reportingTo: '',
    numberOfReportees: '',
    jobDescription: '',
    candidateRequirements: ''
  });

  useEffect(() => {
    if (activeTab === 'jobs') {
      fetchJobs();
    } else if (activeTab === 'messages') {
      fetchMessages();
    }
  }, [activeTab]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${endpoints.base}/admin/jobs`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
    setLoading(false);
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${endpoints.base}/admin/messages`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
    setLoading(false);
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editingJob ? 'PUT' : 'POST';
      const url = editingJob 
        ? `${endpoints.base}/admin/jobs/${editingJob.id}`
        : `${endpoints.base}/admin/jobs`;

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(jobForm)
      });

      const data = await response.json();
      
      if (data.success) {
        fetchJobs();
        resetJobForm();
        alert(editingJob ? 'Job updated successfully!' : 'Job created successfully!');
      }
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Error saving job');
    }
    setLoading(false);
  };

  const deleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const response = await fetch(`${endpoints.base}/admin/jobs/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      const data = await response.json();
      if (data.success) {
        fetchJobs();
        alert('Job deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Error deleting job');
    }
  };

  const editJob = (job: Job) => {
    setJobForm(job);
    setEditingJob(job);
    setShowJobForm(true);
  };

  const resetJobForm = () => {
    setJobForm({
      id: `job-${Date.now()}`,
      role: '',
      location: '',
      type: 'Full time',
      workModel: 'On-site',
      description: '',
      jobRef: `DV-${Date.now()}`,
      dateListed: new Date().toISOString().split('T')[0],
      closingDate: '',
      status: 'Active',
      department: '',
      reportingTo: '',
      numberOfReportees: '',
      jobDescription: '',
      candidateRequirements: ''
    });
    setEditingJob(null);
    setShowJobForm(false);
  };

  const updateMessageStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`${endpoints.base}/admin/messages/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      
      const data = await response.json();
      if (data.success) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`${endpoints.base}/admin/messages/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      const data = await response.json();
      if (data.success) {
        fetchMessages();
        alert('Message deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Error deleting message');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setJobForm({
      ...jobForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <div style={{
        background: '#000',
        color: '#fff',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
          Digiteck Vision - Admin Dashboard
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Welcome, {admin.username}</span>
          <button
            onClick={onLogout}
            style={{
              background: '#CC8A00',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #ddd',
        padding: '0 2rem'
      }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <button
            onClick={() => setActiveTab('jobs')}
            style={{
              background: 'none',
              border: 'none',
              padding: '1rem 0',
              borderBottom: activeTab === 'jobs' ? '3px solid #CC8A00' : '3px solid transparent',
              color: activeTab === 'jobs' ? '#CC8A00' : '#666',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Jobs Management ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            style={{
              background: 'none',
              border: 'none',
              padding: '1rem 0',
              borderBottom: activeTab === 'messages' ? '3px solid #CC8A00' : '3px solid transparent',
              color: activeTab === 'messages' ? '#CC8A00' : '#666',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Messages ({messages.filter(m => m.status === 'unread').length} unread)
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '2rem' }}>
        {activeTab === 'jobs' && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2>Jobs Management</h2>
              <button
                onClick={() => setShowJobForm(true)}
                style={{
                  background: '#CC8A00',
                  color: '#fff',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Add New Job
              </button>
            </div>

            {showJobForm && (
              <div style={{
                background: '#fff',
                padding: '2rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3>{editingJob ? 'Edit Job' : 'Add New Job'}</h3>
                <form onSubmit={handleJobSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Job Title</label>
                    <input
                      type="text"
                      name="role"
                      value={jobForm.role}
                      onChange={handleInputChange}
                      required
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={jobForm.location}
                      onChange={handleInputChange}
                      required
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Job Type</label>
                    <select
                      name="type"
                      value={jobForm.type}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
                    >
                      <option value="Full time">Full time</option>
                      <option value="Part time">Part time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Work Model</label>
                    <select
                      name="workModel"
                      value={jobForm.workModel}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
                    >
                      <option value="On-site">On-site</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Department</label>
                    <input
                      type="text"
                      name="department"
                      value={jobForm.department}
                      onChange={handleInputChange}
                      required
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Reporting To</label>
                    <input
                      type="text"
                      name="reportingTo"
                      value={jobForm.reportingTo}
                      onChange={handleInputChange}
                      required
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Number of Reportees</label>
                    <input
                      type="text"
                      name="numberOfReportees"
                      value={jobForm.numberOfReportees}
                      onChange={handleInputChange}
                      required
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Job Reference</label>
                    <input
                      type="text"
                      name="jobRef"
                      value={jobForm.jobRef}
                      onChange={handleInputChange}
                      required
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Date Listed</label>
                    <input
                      type="date"
                      name="dateListed"
                      value={jobForm.dateListed}
                      onChange={handleInputChange}
                      required
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Closing Date</label>
                    <input
                      type="date"
                      name="closingDate"
                      value={jobForm.closingDate}
                      onChange={handleInputChange}
                      required
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Status</label>
                    <select
                      name="status"
                      value={jobForm.status}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Short Description</label>
                    <textarea
                      name="description"
                      value={jobForm.description}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Job Description</label>
                    <textarea
                      name="jobDescription"
                      value={jobForm.jobDescription}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Candidate Requirements</label>
                    <textarea
                      name="candidateRequirements"
                      value={jobForm.candidateRequirements}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', paddingTop: '1rem' }}>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        background: loading ? '#ccc' : '#CC8A00',
                        color: '#fff',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '6px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '1rem',
                        fontWeight: 600
                      }}
                    >
                      {loading ? 'Saving...' : (editingJob ? 'Update Job' : 'Create Job')}
                    </button>
                    <button
                      type="button"
                      onClick={resetJobForm}
                      style={{
                        background: '#666',
                        color: '#fff',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 600
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Jobs Table */}
            <div style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Job Title</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Location</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Type</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Date Listed</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '1rem' }}>{job.role}</td>
                      <td style={{ padding: '1rem' }}>{job.location}</td>
                      <td style={{ padding: '1rem' }}>{job.type}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          background: job.status === 'Active' ? '#d4edda' : '#f8d7da',
                          color: job.status === 'Active' ? '#155724' : '#721c24'
                        }}>
                          {job.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>{new Date(job.dateListed).toLocaleDateString()}</td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => editJob(job)}
                            style={{
                              background: '#007bff',
                              color: '#fff',
                              border: 'none',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '0.875rem'
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteJob(job.id)}
                            style={{
                              background: '#dc3545',
                              color: '#fff',
                              border: 'none',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '0.875rem'
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <h2>Messages</h2>
            <div style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Email</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Company</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Date</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((message) => (
                    <tr key={message.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '1rem' }}>{message.firstName} {message.lastName}</td>
                      <td style={{ padding: '1rem' }}>{message.email}</td>
                      <td style={{ padding: '1rem' }}>{message.company || '--'}</td>
                      <td style={{ padding: '1rem' }}>
                        <select
                          value={message.status}
                          onChange={(e) => updateMessageStatus(message.id, e.target.value)}
                          style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            background: message.status === 'read' ? '#d4edda' : '#fff3cd'
                          }}
                        >
                          <option value="unread">Unread</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                      </td>
                      <td style={{ padding: '1rem' }}>{new Date(message.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '1rem' }}>
                        <button
                          onClick={() => {
                            alert(`Message: ${message.message}\n\nPhone: ${message.phone}`);
                          }}
                          style={{
                            background: '#28a745',
                            color: '#fff',
                            border: 'none',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            marginRight: '0.5rem'
                          }}
                        >
                          View
                        </button>
                        <button
                          onClick={() => deleteMessage(message.id)}
                          style={{
                            background: '#dc3545',
                            color: '#fff',
                            border: 'none',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}