// LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginPage.css';
import Footer from '../Footer/Footer';

const LoginPage = ({ isSignUp: initialSignUp }) => {
  const [isSignUp, setIsSignUp] = useState(initialSignUp);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const slideVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: { duration: 0.5 },
    }),
  };

  const [direction, setDirection] = useState(1);

  const toggleForm = () => {
    setDirection(isSignUp ? -1 : 1);
    setIsSignUp((prev) => !prev);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError("Passwords do not match!");
          return;
        }

        const response = await axios.post(
          "http://localhost:8800/api/auth/register",
          "https://real-estate-platform-akzo.onrender.com/api/auth/register",
          { username, email, password }
        );

        if (response.status === 201) {
          alert("Sign-up successful! Please login.");
          setIsSignUp(false);
          setError("");
        }
      } else {
        const response = await axios.post(
          "http://localhost:8800/api/auth/login",
          "https://real-estate-platform-akzo.onrender.com/api/auth/login",
          { email, password },
          { withCredentials: true }
        );

        if (response.status === 200) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("email", email);
          localStorage.setItem("username", username);

          const redirectTo = location.state?.redirectTo;
          if (redirectTo && redirectTo.startsWith("/singlepage")) {
            const propertyId = redirectTo.split("/")[2];
            navigate(`/singlepage/${propertyId}`);
          } else {
            navigate("/dashboard");
          }
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="loginpage0">
        <div className="leftsec0">
          <span>Welcome to our platform</span>
          <img src="../../Assets/images/bgimg5.jpg" alt="Background" />
        </div>
        <div className="rightsec0">
          <div className="auth-container0">
            <div className="auth-card0">
              <div className="card-decoration0"></div>
              <AnimatePresence custom={direction}>
                <motion.div
                  key={isSignUp ? 'signup' : 'signin'}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={direction}
                  className="auth-form0"
                >
                  <h2 className="form-title0">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
                  <p className="form-subtitle0">{isSignUp ? 'Sign up to get started' : 'Sign in to continue'}</p>
                  
                  {error && <p className="error-message0">{error}</p>}
                  
                  <form onSubmit={handleSubmit}>
                    {isSignUp && (
                      <div className="form-group0">
                        <div className="input-wrapper0">
                          <input
                            type="text"
                            id="username"
                            className="form-input0"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder=" "
                          />
                          <label htmlFor="username" className="floating-label0">Username</label>
                          <div className="input-highlight0"></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="form-group0">
                      <div className="input-wrapper0">
                        <input
                          type="email"
                          id="email"
                          className="form-input0"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder=" "
                        />
                        <label htmlFor="email" className="floating-label0">Email</label>
                        <div className="input-highlight0"></div>
                      </div>
                    </div>

                    <div className="form-group0">
                      <div className="input-wrapper0">
                        <input
                          type="password"
                          id="password"
                          className="form-input0"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder=" "
                        />
                        <label htmlFor="password" className="floating-label0">Password</label>
                        <div className="input-highlight0"></div>
                      </div>
                    </div>
                    
                    {isSignUp && (
                      <div className="form-group0">
                        <div className="input-wrapper0">
                          <input
                            type="password"
                            id="confirm-password"
                            className="form-input0"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder=" "
                          />
                          <label htmlFor="confirm-password" className="floating-label0">Confirm Password</label>
                          <div className="input-highlight0"></div>
                        </div>
                      </div>
                    )}
                    
                    {!isSignUp && (
                      <div className="forgot-password0">
                        <a href="#" className="forgot-link0">Forgot password?</a>
                      </div>
                    )}
                    
                    <button type="submit" className="btn0">
                      {isSignUp ? 'Create Account' : 'Sign In'}
                    </button>
                    
                    {/* <div className="or-divider0">
                      <span>OR</span>
                    </div> */}
                    
                    {/* <div className="social-login0">
                      <button type="button" className="social-btn0 google0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.554 3.921 1.47l2.814-2.814A9.996 9.996 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"></path>
                        </svg>
                        Continue with Google
                      </button>
                    </div> */}
                  </form>
                </motion.div>
              </AnimatePresence>
              
              <p className="toggle-text0">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <span className="toggle-link0" onClick={toggleForm}>
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;