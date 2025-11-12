import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/AuthLoginCss.css"
import { useAuthDirect } from "./useAuthDirect"; // Make sure this path is correct
import decodeJWT from "../decodeJWT";

const AuthLogin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuthDirect();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            console.log(formData.email,"AND ",formData.password);
            const response = await login(formData.email, formData.password);
            console.log("LOGIN RESPONSE ", response);

            if (response && response.token) {
                console.log("Login successful, redirecting to dashboard...");
                navigate("/dashboard");
            }

        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.error || err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="login-links">
                    <a href="/SENDOTP">Forgot Password?</a>
                    <a href="/SEND-OPT-FOR-SIGNUP">Create Account</a>
                </div>
            </div>
        </div>
    );
};

export default AuthLogin;