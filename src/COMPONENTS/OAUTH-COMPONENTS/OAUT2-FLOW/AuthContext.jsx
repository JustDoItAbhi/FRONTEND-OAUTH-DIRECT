import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
// const navigate=useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    // try {
    //   const token = localStorage.getItem('access_token');
      
    //   if (token) {
    //     // Set axios default header
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
    //     // Decode token to get user info
    //     const decodedUser = decodeJWT(token);
    //     setUser(decodedUser);
        
    //     console.log("✅ User authenticated:", decodedUser);
    //   } else {
    //     setUser(null);
    //     console.log("❌ No authentication token found");
    //   }
    // } catch (error) {
    //   console.error('Auth check failed:', error);
    //   localStorage.removeItem('access_token');
    //   delete axios.defaults.headers.common['Authorization'];
    //   setUser(null);
    // } finally {
    //   setLoading(false);
    // }
  };

    const login = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    
    const authUrl = `${backendUrl}/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid profile`;
    
      // navigate("/dashboard")
    window.location.href = "/dashboard";
    console.log("URL AUTHURL".replace,authUrl);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    console.log("✅ User logged out");
  };

  const value = {
    user,
    login,
    logout,
    checkAuthStatus,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;