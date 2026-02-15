// API configuration using environment variables
const getApiUrl = () => {
  // Use environment variable or fallback to development default
  const envApiUrl = import.meta.env.VITE_API_URL;
  if (envApiUrl) return envApiUrl;
  
  // Fallback based on environment
  const isDevelopment = import.meta.env.MODE === 'development';
  return isDevelopment ? 'http://localhost:3001/api' : 'https://your-railway-app.railway.app/api';
};

export const API_URL = getApiUrl();

export const endpoints = {
  base: API_URL,
  // Public endpoints
  jobs: `${API_URL}/jobs`,
  messages: `${API_URL}/messages`,
  health: `${API_URL}/health`,
  // Admin endpoints
  admin: {
    login: `${API_URL}/admin/login`,
    jobs: `${API_URL}/admin/jobs`,
    messages: `${API_URL}/admin/messages`,
    applications: `${API_URL}/admin/applications`,
  }
};

// API request helpers with error handling
export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(
    message: string,
    status: number,
    code?: string
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export const apiRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = localStorage.getItem('adminToken');
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.message || data.error || 'Request failed',
        response.status,
        data.code
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or parsing errors
    throw new ApiError(
      'Network error - please check your connection',
      0,
      'NETWORK_ERROR'
    );
  }
};
