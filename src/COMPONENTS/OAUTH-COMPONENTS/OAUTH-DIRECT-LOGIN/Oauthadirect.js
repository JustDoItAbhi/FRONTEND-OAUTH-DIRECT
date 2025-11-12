import axios from "axios";
import axiosInstance from "../../utils/authMiddleWear";

const backendUrl = import.meta.env.VITE_DIRECT_BACKEND_URL;
const clientId = import.meta.env.VITE_DIRECT_CLIENT_ID;
const clientSecret = import.meta.env.VITE_DIRECT_CLIENT_SECRET;
const redirectUri = import.meta.env.VITE_DIRECT_REDIRECT_URI;
console.log("BACKEND",backendUrl);
console.log("clinetid",clientId);
console.log("secret",clientSecret);
console.log("REDIRECTURL ",redirectUri);
console.log();


const Api = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  withCredentials:true
});



export const GetDriectOauthLoginProfile = async () => {
  try {
    const response = await Api.get("/api/user/me");
    console.log("✅ Profile fetched:", response.data);
    return response.data;
    
  } catch (err) {
    console.error("❌ Profile fetch failed:", err.response?.data || err.message);
    throw err;
  }
}

export const LoginDirectWithClientid = async (email, password) => {
  try {
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);

    const response = await Api.post("/api/auth/login", params);
    
    if (response.data.token) {
      // Also store in your Api instance
      Api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    
    return response.data;
    
  } catch (err) {
    const errorMessage = err.response?.data?.error || err.message || 'Login failed';
    console.error("❌ Login failed:", errorMessage);
    throw new Error(errorMessage);
  }
}
export const LogOutDriectWithClientid = async () => {
  try {
    const response = await Api.post("/api/auth/logout", {}, {
      withCredentials: true
    });
    
    console.log("✅ Logout successful:", response.data);
    localStorage.removeItem('access_token');
    return response.data;
    
  } catch (err) {
    console.error("❌ Logout failed:", err.response?.data || err.message);
    throw err;
  }
}