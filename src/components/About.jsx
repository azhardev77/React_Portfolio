// About component
import aboutImg from '../assets/pic111.jpg';
import { use3dTilt } from '../hooks/use3dTilt';

export default function About() {
  const imgCardTilt = use3dTilt(6, 1.01);
  const textCardTilt = use3dTilt(6, 1.01);

  return (
    <section className="about section" id="about">
      <h2 className="section-title reveal fade-up">About</h2>

      <div className="about__container bd-grid">
        <div {...imgCardTilt} className="about__img-wrapper reveal fade-right">
          <div className="about__img" style={{ transform: 'translateZ(25px)' }}>
            <img src={aboutImg} alt="Mohd Azhar Mansoori" />
          </div>

          {/* Mini Core Tech Badges */}
          <div className="about__tech-badges" style={{ transform: 'translateZ(35px)' }}>
            <div className="tech-badge badge-java" title="Java Specialist">
              <i className="bx bxl-java"></i>
              <span>Java</span>
            </div>
            <div className="tech-badge badge-spring" title="Spring Boot Backend">
              <i className="bx bx-leaf"></i>
              <span>Spring</span>
            </div>
            <div className="tech-badge badge-react" title="React Frontend">
              <i className="bx bxl-react"></i>
              <span>React</span>
            </div>
            <div className="tech-badge badge-sql" title="Database Management">
              <i className="bx bx-data"></i>
              <span>SQL</span>
            </div>
          </div>
        </div>

        <div {...textCardTilt} className="about__card reveal fade-left delay-200">
          <h2 className="about__subtitle" style={{ transform: 'translateZ(20px)' }}>Mohd Azhar Mansoori</h2>

          <p className="about__text" style={{ transform: 'translateZ(10px)' }}>
            I am an experienced Full-Stack Software Developer with over 4 years of expertise in designing and building robust web applications. Specialized in Java, Spring Boot, React.js, and SQL, I focus on clean code practices, performance optimization, and modular software architectures.
            <br /><br />
            Through rigorous training at Scaler Academy, I have refined my skills in advanced Data Structures, Algorithms, and Object-Oriented design patterns. I enjoy solving complex business logic problems, optimizing database queries, and designing scalable system components that handle traffic and load gracefully.
          </p>

          <div className="about__social" style={{ transform: 'translateZ(25px)' }}>
            <a href="https://linkedin.com/in/azhardev77" target="_blank" rel="noopener noreferrer" className="footer__social" title="LinkedIn">
              <i className="bx bxl-linkedin"></i>
            </a>
            <a href="https://github.com/azhardev77" target="_blank" rel="noopener noreferrer" className="footer__social" title="GitHub">
              <i className="bx bxl-github"></i>
            </a>
            <a href="https://leetcode.com/u/Azhar97/" target="_blank" rel="noopener noreferrer" className="footer__social" title="LeetCode">
              <i className="bx bx-code-alt"></i>
            </a>
            <a href="https://www.hackerrank.com/profile/azhardev97" target="_blank" rel="noopener noreferrer" className="footer__social" title="HackerRank">
              <i className="bx bx-award"></i>
            </a>
            <a href="https://www.scaler.com/academy/profile/17f9c8696bec" target="_blank" rel="noopener noreferrer" className="footer__social" title="Scaler Academy">
              <i className="bx bx-graduation"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
