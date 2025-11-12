import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { LoginDirectWithClientid, LogOutDriectWithClientid } from './Oauthadirect';
import decodeJWT from '../decodeJWT';

// Create and export context
export const AuthContext = createContext();

// Custom hook - make sure it's exported
export const useAuthDirect = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthDirect must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
  try {
    setLoading(true); // Set loading to true at start
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(JSON.parse(userData));
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    // Clear invalid tokens
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
        } finally {
            setLoading(false);
        }
    };

   const login = async (email, password) => {
  console.log("useAuthDirect LOGIN PAGE");
  try {
    const response = await LoginDirectWithClientid(email, password);
    console.log("AUTH RESPONSE ", response);
    
    const { token, user: userData } = response;
    localStorage.setItem('access_token', token);
    
    // Set axios default headers immediately
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
      setUser(userData);
      return response;
  } catch (error) {
    console.log("Login error:", error.message);
    throw error;
  }
};

    const logout = async () => {
        try {
            await LogOutDriectWithClientid();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
            window.location.href = '/';
        }
    };

    const value = {
        user,
        login,
        logout,
        checkAuthStatus,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthContext;