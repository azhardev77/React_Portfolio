import React, { useState } from 'react';
import '../login.css';

export default function Login({ onLoginSuccess }) {
  const [isToggled, setIsToggled] = useState(false);

  // Sign In inputs
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign Up inputs
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const username = loginUsername.trim();
    const password = loginPassword.trim();

    // Default admin login
    if (username === 'azhar' && password === '12345') {
      onLoginSuccess();
      return;
    }

    // Verify stored users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (validUser) {
      onLoginSuccess();
    } else {
      alert('❌ Invalid username or password');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const username = regUsername.trim();
    const email = regEmail.trim();
    const password = regPassword.trim();

    if (!username || !email || !password) {
      alert('⚠️ Please fill all fields');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some((user) => user.username === username);
    if (userExists) {
      alert('❌ Username already exists');
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('✅ Registration successful! Please login.');
    // Reset signup inputs
    setRegUsername('');
    setRegEmail('');
    setRegPassword('');
    setIsToggled(false); // Switch to sign in view
  };

  return (
    <div className="auth-page-wrapper">
      <div className={`auth-wrapper ${isToggled ? 'toggled' : ''}`}>
        <div className="background-shape"></div>
        <div className="secondary-shape"></div>

        {/* ===== SIGN IN PANEL ===== */}
        <div className="credentials-panel signin">
          <h2 className="slide-element">Login</h2>
          <form id="loginForm" onSubmit={handleLoginSubmit}>
            <div className="field-wrapper slide-element">
              <input
                type="text"
                id="loginUsername"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
              />
              <label>Username</label>
              <i className="fa-solid fa-user"></i>
            </div>

            <div className="field-wrapper slide-element">
              <input
                type="password"
                id="loginPassword"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <label>Password</label>
              <i className="fa-solid fa-lock"></i>
            </div>

            <div className="field-wrapper slide-element">
              <button className="submit-button" type="submit">
                Login
              </button>
            </div>

            <div className="switch-link slide-element">
              <p>
                Don't have an account? <br />
                <button
                  className="submit-button register-trigger"
                  type="button"
                  onClick={() => setIsToggled(true)}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>

        <div className="welcome-section signin">
          <h2 className="slide-element">WELCOME BACK!</h2>
        </div>

        {/* ===== SIGN UP PANEL ===== */}
        <div className="credentials-panel signup">
          <h2 className="slide-element">Register</h2>
          <form id="registerForm" onSubmit={handleRegisterSubmit}>
            <div className="field-wrapper slide-element">
              <input
                type="text"
                id="regUsername"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                required
              />
              <label>Username</label>
              <i className="fa-solid fa-user"></i>
            </div>

            <div className="field-wrapper slide-element">
              <input
                type="email"
                id="regEmail"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
              <label>Email</label>
              <i className="fa-solid fa-envelope"></i>
            </div>

            <div className="field-wrapper slide-element">
              <input
                type="password"
                id="regPassword"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
              <label>Password</label>
              <i className="fa-solid fa-lock"></i>
            </div>

            <div className="field-wrapper slide-element">
              <button className="submit-button" type="submit" id="registerBtn">
                Register
              </button>
            </div>

            <div className="switch-link slide-element">
              <p>
                Already have an account? <br />
                <button
                  className="submit-button login-trigger"
                  type="button"
                  onClick={() => setIsToggled(false)}
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>

        <div className="welcome-section signup">
          <h2 className="slide-element welcome-text">
            WELCOME! <br />
            GET STARTED
          </h2>
        </div>
      </div>

      <div className="auth-footer">
        <p className="copyright-text">
          Mohd Azhar Mansoori &copy; {new Date().getFullYear()} all right reserved
        </p>
      </div>
    </div>
  );
}
