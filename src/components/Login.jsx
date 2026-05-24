import React, { useState } from 'react';
import '../login.css';

export default function Login({ onLoginSuccess, isDark, onThemeToggle }) {
  const [isToggled, setIsToggled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sign In inputs
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign Up inputs
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');

  // Secure global cloud DB endpoint
  const DB_URL = "https://kvdb.io/JdNFFp7sNAmHmADV83gKko/users";

  const saveCloudUsers = async (usersList) => {
    try {
      const response = await fetch(DB_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usersList)
      });
      // Always sync to local storage as fallback
      localStorage.setItem('users', JSON.stringify(usersList));
      return response.ok;
    } catch (error) {
      console.error("❌ Failed to synchronize with Cloud DB:", error);
      localStorage.setItem('users', JSON.stringify(usersList));
      return false;
    }
  };

  const fetchCloudUsers = async () => {
    try {
      const response = await fetch(DB_URL);
      if (!response.ok) {
        if (response.status === 404) return [];
        throw new Error('Database returned status: ' + response.status);
      }
      const text = await response.text();
      if (!text) return [];
      const data = JSON.parse(text);
      const cloudList = Array.isArray(data) ? data : [];

      // Proactive local-to-cloud auto-merge
      const localList = JSON.parse(localStorage.getItem('users')) || [];
      let merged = [...cloudList];
      let hasNewLocal = false;

      localList.forEach(localUser => {
        if (!merged.some(u => u.username.toLowerCase() === localUser.username.toLowerCase())) {
          merged.push(localUser);
          hasNewLocal = true;
        }
      });

      if (hasNewLocal) {
        console.log("Merging local offline accounts to cloud database...");
        await saveCloudUsers(merged);
        return merged;
      }

      return cloudList;
    } catch (error) {
      console.warn("⚠️ Cloud Database offline, utilizing localized fail-safe backup:", error);
      return JSON.parse(localStorage.getItem('users')) || [];
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const username = loginUsername.trim();
    const password = loginPassword.trim();

    // Default admin login (zero network bypass)
    if (username === 'azhar' && password === '12345') {
      onLoginSuccess({
        username: 'azhar',
        email: 'azhardev97@gmail.com',
        password: '12345',
        phone: '+91-7747047876'
      });
      return;
    }

    setIsLoading(true);
    const users = await fetchCloudUsers();
    setIsLoading(false);

    const validUser = users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase() && user.password === password
    );

    if (validUser) {
      onLoginSuccess(validUser);
    } else {
      alert('❌ Invalid username or password');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const username = regUsername.trim();
    const email = regEmail.trim();
    const password = regPassword.trim();
    const phone = regPhone.trim();

    if (!username || !email || !password || !phone) {
      alert('⚠️ Please fill all fields');
      return;
    }

    setIsLoading(true);
    const users = await fetchCloudUsers();

    const userExists = users.some(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (userExists) {
      setIsLoading(false);
      alert('❌ Username already exists');
      return;
    }

    const updatedUsersList = [...users, { username, email, password, phone }];
    const synced = await saveCloudUsers(updatedUsersList);
    setIsLoading(false);

    if (synced) {
      alert('✅ Registration successful! Saved securely to Cloud Database.');
    } else {
      alert('⚠️ Registration saved locally (Cloud sync currently offline).');
    }

    // Reset signup inputs
    setRegUsername('');
    setRegEmail('');
    setRegPassword('');
    setRegPhone('');
    setIsToggled(false); // Switch to sign in view
  };

  return (
    <div className="auth-page-wrapper">
      <div className="login-theme-toggle" onClick={onThemeToggle} title="Toggle Theme">
        <i className={isDark ? "bx bx-sun" : "bx bx-moon"}></i>
      </div>
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
              <button className="submit-button" type="submit" disabled={isLoading}>
                {isLoading ? 'Connecting DB...' : 'Login'}
              </button>
            </div>

            <div className="switch-link slide-element">
              <p>
                Don't have an account? <br />
                <button
                  className="submit-button register-trigger"
                  type="button"
                  onClick={() => setIsToggled(true)}
                  disabled={isLoading}
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
              <input
                type="text"
                id="regPhone"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                required
              />
              <label>Phone Number</label>
              <i className="fa-solid fa-phone"></i>
            </div>

            <div className="field-wrapper slide-element">
              <button className="submit-button" type="submit" id="registerBtn" disabled={isLoading}>
                {isLoading ? 'Saving to DB...' : 'Register'}
              </button>
            </div>

            <div className="switch-link slide-element">
              <p>
                Already have an account? <br />
                <button
                  className="submit-button login-trigger"
                  type="button"
                  onClick={() => setIsToggled(false)}
                  disabled={isLoading}
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
