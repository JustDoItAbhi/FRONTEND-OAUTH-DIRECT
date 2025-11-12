import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios"; // Add this import

function CallBack() {
  const navigate = useNavigate();

  const handleTokenExchange = async (code) => {
    try {
      console.log("🔄 Handling token exchange with code:", code);
      
      const response = await handleTokenExchange(code);
      console.log("✅ Token exchange response:", response);
         localStorage.setItem("token",response.access_token);
      
      // Extract access token
      const accessToken = response.access_token;
      
      if (!accessToken) {
        throw new Error('No access token received');
      }
      
      // Store token
      localStorage.setItem("access_token", accessToken);
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      console.log("✅ Token stored, redirecting to dashboard...");
      navigate("/dashboard");
      
    } catch (error) {
      console.error('❌ Token exchange failed:', error);
      navigate("/");
    }
  };

  useEffect(() => {
    console.log("🔄 Processing OAuth callback...");
    
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");

    if (error) {
      console.error('❌ OAuth error:', error);
      navigate("/");
      return;
    }

    if (code) {
      handleTokenExchange(code);
    } else {
      console.error('❌ No authorization code found');
      navigate("/");
    }
  }, [navigate]);

  return (
    <div style={{ 
      textAlign: "center", 
      marginTop: "100px",
      padding: "20px" 
    }}>
      <h2>Processing OAuth2 Login...</h2>
      <p>Please wait while we complete your authentication.</p>
    </div>
  );
}

export default CallBack;