import { useState } from 'react';
import cloud1 from '../assets/cloud_1.svg';
import cloud2 from '../assets/cloud_2.svg';
import cloud3 from '../assets/cloud_3.svg';
import cloud4 from '../assets/cloud_4.svg';
import stars from '../assets/stars.svg';
import aboutImg from '../assets/pic111.jpg';

export default function Header({ activeSection, isDark, onThemeToggle, onLogout, currentUser, onProfileUpdate, onDownloadResume }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Profile forms states
  const [profileName, setProfileName] = useState(currentUser ? (currentUser.username || '') : '');
  const [profilePassword, setProfilePassword] = useState(currentUser ? (currentUser.password || '') : '');
  const [profilePhone, setProfilePhone] = useState(currentUser ? (currentUser.phone || '') : '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    const name = profileName.trim();
    const password = profilePassword.trim();
    const phone = profilePhone.trim();

    if (!name || !password || !phone) {
      alert('⚠️ Please fill all required fields');
      return;
    }

    setIsUpdating(true);
    try {
      const DB_URL = "https://kvdb.io/JdNFFp7sNAmHmADV83gKko/users";
      const response = await fetch(DB_URL);
      let users = [];
      if (response.ok) {
        const text = await response.text();
        users = text ? JSON.parse(text) : [];
      }

      // Default admin profile is local-only bypass
      const userEmail = currentUser?.email || 'azhardev97@gmail.com';
      const updatedUsers = users.map(user => {
        if (user.email.toLowerCase() === userEmail.toLowerCase()) {
          return { ...user, username: name, password, phone };
        }
        return user;
      });

      // Save back to cloud
      await fetch(DB_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUsers)
      });

      // Update parent states
      const updatedUserObj = { ...currentUser, username: name, password, phone };
      onProfileUpdate(updatedUserObj);

      alert('✅ Profile updated successfully in Cloud Database!');
      setIsProfileOpen(false);
    } catch (error) {
      console.error("❌ Failed to update profile settings in cloud:", error);
      alert('❌ Error updating profile. Cloud DB offline.');
    } finally {
      setIsUpdating(false);
    }
  };

  const getLinkClass = (section) => {
    return `nav__link ${activeSection === section ? 'active' : ''}`;
  };

  // Shared resume print handler passed down from App.jsx

  return (
    <header className="l-header">
      <nav className="nav bd-grid">
        <div>
          <a href="#home" className="nav__logo">
            <span className="logo-text">AZHAR</span>
            <span className="logo-glow"></span>
          </a>
        </div>

        <div className={`nav__menu ${isMenuOpen ? 'show' : ''}`} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <a href="#home" className={getLinkClass('home')} onClick={() => setIsMenuOpen(false)}>Home</a>
            </li>
            <li className="nav__item">
              <a href="#about" className={getLinkClass('about')} onClick={() => setIsMenuOpen(false)}>About</a>
            </li>
            <li className="nav__item">
              <a href="#experience" className={getLinkClass('experience')} onClick={() => setIsMenuOpen(false)}>Experience</a>
            </li>
            <li className="nav__item">
              <a href="#projects" className={getLinkClass('projects')} onClick={() => setIsMenuOpen(false)}>Projects</a>
            </li>
            <li className="nav__item">
              <a href="#skills" className={getLinkClass('skills')} onClick={() => setIsMenuOpen(false)}>Skills</a>
            </li>
            <li className="nav__item">
              <a href="#certificate" className={getLinkClass('certificate')} onClick={() => setIsMenuOpen(false)}>Certificate</a>
            </li>
            <li className="nav__item">
              <a href="#contact" className={getLinkClass('contact')} onClick={() => setIsMenuOpen(false)}>Contact</a>
            </li>
            <li className="nav__item">
              <button 
                onClick={onDownloadResume} 
                className="nav__link resume-btn" 
                title="Download ATS Resume"
              >
                <i className="bx bx-download"></i> Resume
              </button>
            </li>

            <li className="nav__item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div 
                className="nav__profile-trigger" 
                onClick={() => setIsProfileOpen(true)}
                title="View Profile Settings"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  marginLeft: '8px',
                  width: '32px',
                  height: '32px',
                  flexShrink: 0
                }}
              >
                <img 
                  src={aboutImg} 
                  alt="Profile Avatar" 
                  style={{
                    width: '32px',
                    height: '32px',
                    minWidth: '32px',
                    minHeight: '32px',
                    borderRadius: '50%',
                    border: '2px solid #00d2ff',
                    objectFit: 'cover',
                    boxShadow: '0 0 8px rgba(0, 210, 255, 0.4)',
                    transition: 'transform 0.2s',
                    flexShrink: 0
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                />
              </div>
            </li>

            <li className="nav__itemdm">
              <label className="switch" htmlFor="theme-switch">
                <input
                  type="checkbox"
                  id="theme-switch"
                  checked={isDark}
                  onChange={onThemeToggle}
                />
                <div className="sunmoon">
                  <div className="darkside"></div>
                </div>
                <div className="border"></div>
                <div className="clouds">
                  <img src={cloud2} alt="Cloud 2" loading="lazy" className="cloud cloud-2" />
                  <img src={cloud1} alt="Cloud 1" loading="lazy" className="cloud cloud-1" />
                  <img src={cloud3} alt="Cloud 3" loading="lazy" className="cloud cloud-3" />
                  <img src={cloud4} alt="Cloud 4" loading="lazy" className="cloud cloud-4" />
                  <img src={stars} alt="Stars" loading="lazy" className="stars" />
                </div>
              </label>
            </li>
          </ul>
        </div>

        <div className="nav__toggle" id="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className="bx bx-menu"></i>
        </div>
      </nav>

      {/* ===== PREMIUM GLASSMORPHIC PROFILE MODAL ===== */}
      {isProfileOpen && (
        <div className="profile-modal-overlay" onClick={() => setIsProfileOpen(false)}>
          <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="profile-modal-close" onClick={() => setIsProfileOpen(false)}>
              <i className="bx bx-x"></i>
            </button>
            <div className="profile-modal-header">
              <img src={aboutImg} alt="Avatar" className="profile-modal-avatar" />
              <h3>{currentUser?.username || 'User Profile'}</h3>
              <p className="profile-modal-email">{currentUser?.email || 'user@example.com'}</p>
            </div>
            
            <form onSubmit={handleProfileSave} className="profile-modal-form">
              <div className="profile-form-group">
                <label><i className="bx bx-user"></i> Name / Username</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  required
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="profile-form-group">
                <label><i className="bx bx-lock-alt"></i> Password</label>
                <input
                  type="password"
                  value={profilePassword}
                  onChange={(e) => setProfilePassword(e.target.value)}
                  required
                  placeholder="Enter password"
                />
              </div>
              
              <div className="profile-form-group">
                <label><i className="bx bx-phone"></i> Phone Number</label>
                <input
                  type="text"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  required
                  placeholder="Enter phone number"
                />
              </div>
              
              <button type="submit" className="profile-save-btn" disabled={isUpdating}>
                {isUpdating ? 'Saving to Cloud DB...' : 'Save Changes'}
              </button>
            </form>
            
            <div className="profile-modal-divider"></div>
            
            <button 
              onClick={() => { setIsProfileOpen(false); onLogout(); }} 
              className="profile-modal-logout-btn"
            >
              <i className="bx bx-log-out"></i> Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
