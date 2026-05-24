import { useState, useEffect, useRef } from 'react';
import './main.css';

// Components
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import CertificateModal from './components/CertificateModal';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      try {
        const stored = localStorage.getItem('currentUser');
        const user = stored ? JSON.parse(stored) : null;
        if (user && user.isGuest) {
          const elapsed = Date.now() - user.loginTime;
          if (elapsed >= 15 * 60 * 1000) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            return false;
          }
        }
      } catch {
        return false;
      }
    }
    return loggedIn;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('currentUser');
      return stored ? JSON.parse(stored) : { username: 'azhar', email: 'azhardev97@gmail.com', password: '12345', phone: '+91-7747047876' };
    } catch {
      return { username: 'azhar', email: 'azhardev97@gmail.com', password: '12345', phone: '+91-7747047876' };
    }
  });

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [selectedCert, setSelectedCert] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  const canvasRef = useRef(null);

  // Global background particle constellation system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Dynamic colors based on active theme
    const primaryColor = isDark ? '0, 245, 255' : '14, 165, 233'; // Cyber cyan vs Slate blue
    const secondaryColor = isDark ? '168, 85, 247' : '90, 129, 138'; // Cyber purple vs Soft teal

    // Particle system (120 particles for a beautiful full-screen starfield node network!)
    const particles = Array.from({ length: 120 }, () => {
      const useSecondary = Math.random() > 0.6;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.35,
        dy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.5 + 0.15,
        colorStr: useSecondary ? secondaryColor : primaryColor,
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.colorStr}, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${a.colorStr}, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [isDark, isLoggedIn]);

  // Sync theme to body class
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Global Premium IntersectionObserver for scroll animations
  useEffect(() => {
    if (!isLoggedIn) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: Unobserve if you only want the animation to happen once
          // observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Slightly trigger before element fully reaches the bottom
    });

    // Select all elements with the .reveal class
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoggedIn, activeSection]); // Re-bind observer on mount and section navigation


  // Sync scroll-active links highlight when logged in
  useEffect(() => {
    if (!isLoggedIn) return;

    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = () => {
      const scrollY = window.scrollY || window.pageYOffset;

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        // Bounding client rect calculates absolute document coordinates perfectly
        const sectionTop = current.getBoundingClientRect().top + scrollY - 150;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection((prev) => {
            if (prev !== sectionId) return sectionId;
            return prev;
          });
        }
      });
    };

    window.addEventListener('scroll', scrollActive);
    scrollActive(); // Sync initially on mount
    return () => window.removeEventListener('scroll', scrollActive);
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  };

  // Active background timer check for Guest session timeout
  useEffect(() => {
    if (!isLoggedIn || !currentUser || !currentUser.isGuest) return;

    const checkInterval = setInterval(() => {
      const elapsed = Date.now() - currentUser.loginTime;
      const limit = 15 * 60 * 1000; // 15 minutes in ms
      if (elapsed >= limit) {
        clearInterval(checkInterval);
        alert("⏱️ Guest session expired (15-minute timeout). Redirecting to Login...");
        handleLogout();
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(checkInterval);
  }, [isLoggedIn, currentUser]);

  const handleLoginSuccess = (userObj) => {
    setIsLoggedIn(true);
    const userToSave = userObj || { username: 'azhar', email: 'azhardev97@gmail.com', password: '12345', phone: '+91-7747047876' };
    setCurrentUser(userToSave);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(userToSave));
  };

  const handleThemeToggle = () => {
    setIsDark((prev) => !prev);
  };

  const handleProfileUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
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
          <a class="project-link" href="https://react-portfolio-virid-chi.vercel.app/" target="_blank"><i class="bx bx-link"></i> react-portfolio-virid-chi.vercel.app</a>
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

  if (!isLoggedIn) {
    return (
      <>
        <canvas ref={canvasRef} className="global-canvas" />
        <Login onLoginSuccess={handleLoginSuccess} isDark={isDark} onThemeToggle={handleThemeToggle} />
      </>
    );
  }

  return (
    <>
      <canvas ref={canvasRef} className="global-canvas" />
      <Header 
        key={currentUser ? currentUser.email : 'guest'}
        activeSection={activeSection} 
        isDark={isDark} 
        onThemeToggle={handleThemeToggle} 
        onLogout={handleLogout} 
        currentUser={currentUser}
        onProfileUpdate={handleProfileUpdate}
        onDownloadResume={downloadResume}
      />
      
      <main className="l-main">
        <Home isDark={isDark} onDownloadResume={downloadResume} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certificates onSelectCert={setSelectedCert} />
      </main>

      <Contact />
      <Footer />

      <CertificateModal
        selectedCert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </>
  );
}
