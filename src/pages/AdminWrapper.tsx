import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "./Admin";
import { useAuth } from "../hooks/useAuth";

export default function AdminWrapper() {
  const { isAuthenticated, admin, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #000000 0%, #CC8A00 100%)'
      }}>
        <div style={{ 
          color: '#fff', 
          fontSize: '1.2rem',
          textAlign: 'center'
        }}>
          <div>Loading...</div>
          <div style={{ 
            fontSize: '0.9rem', 
            marginTop: '0.5rem', 
            opacity: 0.7 
          }}>
            Verifying authentication
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminDashboard admin={admin} />;
}