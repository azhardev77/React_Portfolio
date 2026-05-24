import React, { useState, useEffect } from 'react';
import cloud1 from '../assets/cloud_1.svg';
import cloud2 from '../assets/cloud_2.svg';
import cloud3 from '../assets/cloud_3.svg';
import cloud4 from '../assets/cloud_4.svg';
import stars from '../assets/stars.svg';
import aboutImg from '../assets/pic111.jpg';

export default function Header({ activeSection, isDark, onThemeToggle, onLogout, currentUser, onProfileUpdate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Profile forms states
  const [profileName, setProfileName] = useState(currentUser ? currentUser.username : '');
  const [profilePassword, setProfilePassword] = useState(currentUser ? currentUser.password : '');
  const [profilePhone, setProfilePhone] = useState(currentUser ? currentUser.phone : '');
  const [isUpdating, setIsUpdating] = useState(false);

  // Sync profile forms whenever active user changes
  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.username);
      setProfilePassword(currentUser.password);
      setProfilePhone(currentUser.phone);
    }
  }, [currentUser]);

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
      const DB_URL = "https://kvdb.io/AzharPortfolioUsersBucket_v1/users";
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

  const downloadResume = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const resumeHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Mohd_Azhar_Mansoori_Resume</title>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #212529;
            line-height: 1.35;
            margin: 0;
            padding: 20px 40px;
            font-size: 9.5pt;
          }
          .header-container {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
          }
          .header-left h1 {
            font-size: 21pt;
            margin: 0;
            color: #0b5ed7; /* Beautiful blue matching screenshot */
            font-weight: 700;
            letter-spacing: -0.5px;
          }
          .header-right {
            text-align: right;
            font-size: 8.5pt;
            color: #495057;
            line-height: 1.4;
          }
          .contact-item {
            margin-bottom: 3px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 4px;
          }
          .contact-item i {
            color: #0b5ed7;
            font-size: 10.5pt;
            vertical-align: middle;
          }
          .contact-item a {
            color: #0b5ed7;
            text-decoration: none;
          }
          .contact-item a:hover {
            text-decoration: underline;
          }
          .links-row {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 5px;
            flex-wrap: wrap;
          }
          .links-row i {
            font-size: 9.5pt;
            margin-right: 1px;
          }
          h2 {
            font-size: 13.5pt;
            font-weight: 700;
            color: #212529;
            margin: 15px 0 6px 0;
            padding: 0;
            letter-spacing: -0.2px;
          }
          .skills-line {
            font-size: 9.5pt;
            color: #212529;
            margin: 0 0 10px 0;
          }
          .project-item {
            margin-bottom: 10px;
          }
          .project-name {
            font-size: 10.5pt;
            font-weight: 700;
            color: #212529;
            margin: 0;
          }
          .project-link {
            font-size: 8.5pt;
            color: #0b5ed7;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            margin: 2px 0 4px 0;
          }
          .project-link i {
            font-size: 9.5pt;
          }
          .project-link:hover {
            text-decoration: underline;
          }
          .experience-item {
            margin-bottom: 12px;
          }
          .row-title {
            display: flex;
            justify-content: space-between;
            font-weight: 700;
            font-size: 10pt;
            color: #212529;
          }
          .row-company {
            font-weight: 700;
            font-size: 9.5pt;
            color: #495057;
            margin-bottom: 4px;
          }
          ul {
            margin: 2px 0 6px 0;
            padding-left: 15px;
            list-style-type: disc;
          }
          li {
            margin-bottom: 3px;
            font-size: 9pt;
            color: #333333;
            line-height: 1.35;
          }
          @media print {
            body {
              padding: 0;
              margin: 0;
            }
            @page {
              margin: 0.35in 0.4in 0.35in 0.4in;
            }
          }
        </style>
      </head>
      <body>
        
        <div class="header-container">
          <div class="header-left">
            <h1>Mohd Azhar Mansoori</h1>
          </div>
          <div class="header-right">
            <div class="contact-item">
              <span><i class="bx bx-map"></i> Jabalpur</span> &nbsp;|&nbsp; <span><i class="bx bx-phone"></i> +91-7747047876</span>
            </div>
            <div class="contact-item links-row">
              <a href="https://linkedin.com/in/azhardev77" target="_blank"><i class="bx bx-link"></i> Linkedin</a> | 
              <a href="https://github.com/azhardev77" target="_blank">Github</a> | 
              <a href="https://leetcode.com/u/Azhar97/" target="_blank">Leetcode</a> | 
              <a href="https://www.hackerrank.com/profile/azhardev97" target="_blank">Hackerrank</a> | 
              <a href="https://www.scaler.com/academy/profile/17f9c8696bec" target="_blank">Scaler</a>
            </div>
            <div class="contact-item">
              <span><i class="bx bx-envelope"></i> <a href="mailto:azhardev97@gmail.com">azhardev97@gmail.com</a></span>
            </div>
          </div>
        </div>

        <h2>Skills</h2>
        <div class="skills-line">
          • Java, Spring Boot, React.js, PHP, Laravel, SQL, JavaScript, HTML, CSS, Redux, REST API, Git & GitHub, Node.js
        </div>

        <h2>Projects</h2>

        <div class="project-item">
          <div class="project-name">Personal Portfolio Website</div>
          <a class="project-link" href="https://azhardev77.github.io/AzharPortfolio/main.html" target="_blank"><i class="bx bx-link"></i> azhardev77.github.io/AzharPortfolio/main.html</a>
          <ul>
            <li>Designed and developed a fully responsive personal portfolio website using HTML5, CSS3, and JavaScript.</li>
            <li>Implemented modern UI/UX principles and mobile-first responsive web design.</li>
            <li>Built interactive user interface components including smooth scrolling, animations, and dynamic navigation.</li>
            <li>Implemented dark and light theme toggle functionality using JavaScript and LocalStorage.</li>
            <li>Managed client-side state and user preferences without external frameworks.</li>
            <li>Optimized website performance by minimizing DOM manipulation and improving load times.</li>
            <li>Ensured cross-browser compatibility across Chrome, Firefox, and Edge.</li>
            <li>Applied accessibility best practices (ARIA labels, semantic HTML) to improve usability.</li>
            <li>Followed clean code practices and modular CSS architecture for maintainability.</li>
            <li>Deployed the application using GitHub Pages and maintained source code using Git and GitHub.</li>
          </ul>
        </div>

        <div class="project-item" style="margin-bottom: 5px;">
          <div class="project-name">Parking Lot Management System</div>
          <a class="project-link" href="https://github.com/azhardev77/ParkingLot_Master" target="_blank"><i class="bx bx-link"></i> github.com/azhardev77/ParkingLot_Master</a>
          <ul>
            <li>Designed and developed a Parking Lot Management System using Java, following Object-Oriented Programming (OOP) principles.</li>
            <li>Implemented core business logic for vehicle entry, exit, and parking slot allocation.</li>
            <li>Utilized Data Structures such as HashMap and ArrayList to manage real-time parking availability efficiently.</li>
            <li>Designed modular and reusable classes adhering to clean code and SOLID principles.</li>
            <li>Implemented parking duration tracking and basic billing logic using Java.</li>
            <li>Applied algorithmic thinking to optimize space utilization and reduce congestion during peak hours.</li>
            <li>Developed exception handling and input validation to ensure system reliability.</li>
            <li>Used Git for version control and maintained project documentation on GitHub.</li>
            <li>Improved overall parking space utilization by approximately 15% through optimized allocation logic.</li>
          </ul>
        </div>

        <h2>Experience</h2>

        <div class="experience-item">
          <div class="row-title">
            <span>Software Engineer</span>
            <span>Feb 2026 - Present</span>
          </div>
          <div class="row-company">White Force Group</div>
          <ul>
            <li>Contributing to the development of highly scalable HR-Tech solutions using PHP and the Laravel framework.</li>
            <li>Designing and optimizing secure RESTful APIs to enhance platform connectivity and candidate data management.</li>
            <li>Collaborating with engineering teams to implement clean MVC architecture, keeping the code dry, modular, and maintainable.</li>
            <li>Leveraging MySQL for schema design, query optimization, and ensuring seamless integration between backend engines and frontend panels.</li>
          </ul>
        </div>

        <div class="experience-item" style="margin-bottom: 5px;">
          <div class="row-title">
            <span>Software Developer</span>
            <span>Sep 2019 - Dec 2023</span>
          </div>
          <div class="row-company">Self-Employed</div>
          <ul>
            <li>Designed and engineered robust full-stack web applications using React.js for frontend and Spring Boot for backend development.</li>
            <li>Built reusable, modular UI components following modern frontend state management patterns (including Redux).</li>
            <li>Integrated secure RESTful APIs and implemented modern authentication/authorization protocols (JWT, OAuth).</li>
            <li>Worked extensively across full-stack tech stacks including Java, JavaScript, HTML5, CSS3, and SQL.</li>
            <li>Prioritized clean code, unit testing, performance optimization, and cross-browser responsive compatibility.</li>
            <li>Refined analytical and troubleshooting capabilities through rigorous problem-solving of complex Data Structures and Algorithms (DSA).</li>
          </ul>
        </div>

        <h2>Education</h2>

        <div class="experience-item">
          <div class="row-title">
            <span>Scaler Academy</span>
            <span>2019 - Present</span>
          </div>
          <div class="row-company">Specialization in Software Development</div>
          <ul>
            <li>Deeply refined algorithms, data structures, and system design strategies, specializing in writing high-performance production-ready code.</li>
          </ul>
        </div>

        <div class="experience-item" style="margin-bottom: 0;">
          <div class="row-title">
            <span>Shri Ram Institute of Science & Technology</span>
            <span>Graduated 2019</span>
          </div>
          <div class="row-company">BE / B.Tech in Computer Science & Engineering</div>
          <ul>
            <li>Acquired a solid foundation in core Computer Science subjects including Operating Systems, Databases, and Object-Oriented Programming (OOPs).</li>
          </ul>
        </div>

      </body>
      </html>
    `;
    printWindow.document.write(resumeHTML);
    printWindow.document.close();
    printWindow.onload = function() {
      printWindow.focus();
      printWindow.print();
    };
    setTimeout(() => {
      if (printWindow) {
        printWindow.focus();
        printWindow.print();
      }
    }, 400);
  };

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
                onClick={downloadResume} 
                className="nav__link resume-btn" 
                title="Download ATS Resume"
              >
                <i className="bx bx-download"></i> Resume
              </button>
            </li>

            <li className="nav__item">
              <div 
                className="nav__profile-trigger" 
                onClick={() => setIsProfileOpen(true)}
                title="View Profile Settings"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  marginLeft: '8px'
                }}
              >
                <img 
                  src={aboutImg} 
                  alt="Profile Avatar" 
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '2px solid #00d2ff',
                    objectFit: 'cover',
                    boxShadow: '0 0 8px rgba(0, 210, 255, 0.4)',
                    transition: 'transform 0.2s'
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
