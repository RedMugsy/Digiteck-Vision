import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(20, 20, 26, 0.98)',
        backdropFilter: 'blur(10px)',
        padding: '1.5rem 2rem',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
        zIndex: 9999,
        borderTop: '1px solid rgba(255, 173, 1, 0.2)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: '300px' }}>
          <p
            style={{
              margin: 0,
              color: '#fff',
              fontSize: '0.95rem',
              lineHeight: 1.6,
            }}
          >
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            By clicking "Accept", you consent to our use of cookies. Read our{' '}
            <Link
              to="/privacy-policy"
              style={{
                color: '#FFAD01',
                textDecoration: 'underline',
                fontWeight: 500,
              }}
            >
              Privacy Policy
            </Link>{' '}
            for more information.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={acceptCookies}
            style={{
              background: '#FFAD01',
              color: '#000',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ff9500';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFAD01';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
