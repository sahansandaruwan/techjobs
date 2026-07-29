import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#f6f6ef',
      borderTop: '1px solid #ff6600',
      padding: '10px',
      textAlign: 'center',
      zIndex: 1000,
      fontSize: '10pt'
    }}>
      <span style={{ marginRight: '10px' }}>
        We use cookies to improve your experience and serve relevant ads. By using our site, you consent to our <a href="/privacy" style={{ textDecoration: 'underline' }}>Privacy Policy</a>.
      </span>
      <button 
        onClick={acceptCookies}
        style={{
          backgroundColor: '#ff6600',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Accept
      </button>
    </div>
  );
}