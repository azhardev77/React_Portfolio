// Footer component

export default function Footer() {
  return (
    <footer className="footer section">
      <div className="footer__container bd-grid">
        <div className="footer__data">
          <h2 className="footer__title">Azhar</h2>
          <p className="footer__text">I'm Azhar and this is my Portfolio website</p>
          <a href="mailto:azhardev97@gmail.com" className="footer__social">
            <i className="bx bx-mail-send"></i>
          </a>
        </div>

        <div className="footer__data">
          <h2 className="footer__title">EXPLORE</h2>
          <ul>
            <li><a href="#home" className="footer__link">Home</a></li>
            <li><a href="#about" className="footer__link">About</a></li>
            <li><a href="#experience" className="footer__link">Experience</a></li>
            <li><a href="#projects" className="footer__link">Projects</a></li>
            <li><a href="#skills" className="footer__link">Skills</a></li>
            <li><a href="#certificate" className="footer__link">Certificate</a></li>
            <li><a href="#contact" className="footer__link">Contact</a></li>
          </ul>
        </div>

        <div className="footer__data">
          <h2 className="footer__title">FOLLOW</h2>

          <div className="about__social">
            <a href="https://linkedin.com/in/azhardev77" target="_blank" rel="noopener noreferrer" className="footer__social" title="LinkedIn">
              <i className="bx bxl-linkedin"></i>
            </a>
            <a href="https://github.com/azhardev77" target="_blank" rel="noopener noreferrer" className="footer__social" title="GitHub">
              <i className="bx bxl-github"></i>
            </a>
            <a href="https://leetcode.com/u/Azhar97/" target="_blank" rel="noopener noreferrer" className="footer__social" title="LeetCode">
              <i className="bx bx-code-alt"></i>
            </a>
          </div>
          <p>&copy; 2026 copyright all right reserved</p>
        </div>
      </div>
    </footer>
  );
}
