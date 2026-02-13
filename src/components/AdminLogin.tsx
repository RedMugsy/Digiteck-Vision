import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function AdminLogin() {
  const { login, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await login(formData.username, formData.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleFocus = () => {
    if (error) {
      clearError();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #CC8A00 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '12px',
        padding: '3rem',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#333',
          fontSize: '2rem',
          fontWeight: 700
        }}>
          Admin Login
        </h2>

        {error && (
          <div style={{
            background: '#fee',
            color: '#c33',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid #fcc'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 600,
              color: '#333'
            }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onFocus={handleFocus}
              required
              autoComplete="username"
              maxLength={50}
              style={{
                width: '100%',
                padding: '1rem',
                border: error ? '2px solid #d32f2f' : '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                background: '#fff',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
            />
            {formData.username && (formData.username.length < 3 || formData.username.length > 50) && (
              <div style={{
                color: '#d32f2f',
                fontSize: '0.8rem',
                marginTop: '0.3rem'
              }}>
                Username must be 3-50 characters long
              </div>
            )}
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 600,
              color: '#333'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={handleFocus}
                required
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '1rem',
                  paddingRight: '3rem',
                  border: error ? '2px solid #d32f2f' : '2px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: '#fff',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666',
                  fontSize: '0.9rem'
                }}
              >
                {showPassword ? '👁️‍🗨️' : '👁️'}
              </button>
            </div>
          </div>

          {/* Security Notice */}
          <div style={{
            background: '#f5f5f5',
            padding: '0.8rem',
            borderRadius: '6px',
            marginBottom: '1.5rem',
            fontSize: '0.85rem',
            color: '#666',
            border: '1px solid #e0e0e0'
          }}>
            🔒 Your login session will expire after 24 hours for security
          </div>

          <button
            type="submit"
            disabled={loading || !formData.username || !formData.password}
            style={{
              width: '100%',
              padding: '1rem',
              background: (loading || !formData.username || !formData.password) ? '#ccc' : '#CC8A00',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: (loading || !formData.username || !formData.password) ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s ease',
              textTransform: 'uppercase'
            }}
            onMouseEnter={(e) => {
              if (!loading && formData.username && formData.password) {
                e.currentTarget.style.background = '#B87700';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && formData.username && formData.password) {
                e.currentTarget.style.background = '#CC8A00';
              }
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}