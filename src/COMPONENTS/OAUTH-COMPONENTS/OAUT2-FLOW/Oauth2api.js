import axios from "axios";
import axiosInstance from "../../utils/authMiddleWear";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;

const Api = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const exchangeAuthCode = async (code) => {
  console.log("🔐 Exchanging authorization code for token...");
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  params.append("client_id", clientId);
  try {
    const response = await Api.post("/oauth2/token", params, {
      headers: {
        "Authorization": "Basic " + btoa(`${clientId}:${clientSecret}`),
      }
    });
    console.log("✅ Token exchange successful:", response.data)
    return response.data;
  } catch (err) {
    console.error("❌ Token exchange failed:", err.response?.data || err.message);
    throw err;
  }
}

export const LogOutWithClientid = async () => {
  try {
    const response = await axiosInstance.post("/api/auth/logout", {}, {
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

export const GetOauthLoginProfile = async () => {
  try {
    const response = await Api.get("/api/user/me");
    console.log("✅ Profile fetched:", response.data);
    return response.data;
    
  } catch (err) {
    console.error("❌ Profile fetch failed:", err.response?.data || err.message);
    throw err;
  }
}
