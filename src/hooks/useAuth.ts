import { useState, useEffect, useCallback } from 'react';
import { apiRequest, ApiError } from '../config/api';

interface Admin {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  admin: Admin | null;
  loading: boolean;
  error: string | null;
}

interface UseAuthReturn extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    admin: null,
    loading: true,
    error: null,
  });

  // Validate stored token on mount
  useEffect(() => {
    const validateStoredAuth = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const adminData = localStorage.getItem('adminUser');
        
        if (!token || !adminData) {
          setState(prev => ({ ...prev, loading: false }));
          return;
        }

        // Validate token format (basic JWT structure check)
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
          throw new Error('Invalid token format');
        }

        // Parse stored admin data
        let admin: Admin;
        try {
          admin = JSON.parse(adminData);
          if (!admin.id || !admin.username || !admin.role) {
            throw new Error('Invalid admin data');
          }
        } catch {
          throw new Error('Corrupted admin data');
        }

        // Test token validity with a light API call
        await apiRequest('/admin/jobs?limit=1');
        
        setState({
          isAuthenticated: true,
          admin,
          loading: false,
          error: null,
        });
        
      } catch (error) {
        console.warn('Stored authentication invalid:', error);
        // Clear invalid auth data
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setState({
          isAuthenticated: false,
          admin: null,
          loading: false,
          error: null,
        });
      }
    };

    validateStoredAuth();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Input validation
      if (!username || !password) {
        throw new ApiError('Please provide both username and password', 400);
      }
      
      if (username.length < 3 || username.length > 50) {
        throw new ApiError('Username must be 3-50 characters long', 400);
      }
      
      if (password.length < 6) {
        throw new ApiError('Password must be at least 6 characters long', 400);
      }

      const response = await apiRequest('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ 
          username: username.trim(), 
          password 
        }),
      });

      if (!response.success || !response.token || !response.admin) {
        throw new ApiError('Invalid login response format', 500);
      }

      // Store authentication data
      localStorage.setItem('adminToken', response.token);
      localStorage.setItem('adminUser', JSON.stringify(response.admin));

      setState({
        isAuthenticated: true,
        admin: response.admin,
        loading: false,
        error: null,
      });

    } catch (error) {
      let errorMessage = 'Login failed';
      
      if (error instanceof ApiError) {
        switch (error.status) {
          case 401:
            errorMessage = 'Invalid username or password';
            break;
          case 429:
            errorMessage = 'Too many login attempts. Please try again later.';
            break;
          case 0:
            errorMessage = 'Connection failed. Please check your network.';
            break;
          default:
            errorMessage = error.message || 'Login failed';
        }
      }

      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    setState({
      isAuthenticated: false,
      admin: null,
      loading: false,
      error: null,
    });
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    login,
    logout,
    clearError,
  };
};