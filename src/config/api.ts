// API configuration
const apiConfig = {
  // For development
  development: {
    apiUrl: 'http://localhost:3001/api',
  },
  // For production - update this with your production API URL
  production: {
    apiUrl: 'https://your-domain.com/api', // TODO: Update with your production API URL
  }
};

// Get current environment
const environment = import.meta.env.MODE || 'development';

export const API_URL = apiConfig[environment as keyof typeof apiConfig].apiUrl;

export const endpoints = {
  contact: `${API_URL}/contact`,
  health: `${API_URL}/health`,
};
