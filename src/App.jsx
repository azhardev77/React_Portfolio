import React, { useState, useEffect } from 'react';
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
    return localStorage.getItem('isLoggedIn') === 'true';
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  };

  const handleProfileUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} isDark={isDark} onThemeToggle={handleThemeToggle} />;
  }

  return (
    <>
      <Header 
        activeSection={activeSection} 
        isDark={isDark} 
        onThemeToggle={handleThemeToggle} 
        onLogout={handleLogout} 
        currentUser={currentUser}
        onProfileUpdate={handleProfileUpdate}
      />
      
      <main className="l-main">
        <Home isDark={isDark} />
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
