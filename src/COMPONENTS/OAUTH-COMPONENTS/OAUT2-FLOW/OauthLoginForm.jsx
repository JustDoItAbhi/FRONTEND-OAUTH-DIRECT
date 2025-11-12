import { useState } from 'react';
import './Login.css'
const OauthLoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);

  const handleOAuthLogin = (provider = 'default') => {
    setIsLoading(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = "http://localhost:5173/callback"; // Exact match with database
  
  const authUrl = `${backendUrl}/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid%20profile`;

  console.log("🔗 OAuth URL:", authUrl);
    window.location.href = authUrl;
 // components/BeautifulLogin.jsx



  }
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>
        
        <div className="login-form">
          <button 
            className="oauth-btn primary"
            onClick={() => handleOAuthLogin()}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <>
                <svg className="btn-icon" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                Continue with OAuth2
              </>
            )}
          </button>
          
          <div className="divider">
            <span>or</span>
          </div>
          
          {/* You can add other login options here */}
          <button className="oauth-btn secondary">
            <svg className="btn-icon" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            </svg>
            Continue with Google
          </button>
        </div>
        
        <div className="login-footer">
          <p>By continuing, you agree to our Terms of Service</p>
        </div>
      </div>
    </div>
  );
};

export default OauthLoginForm;