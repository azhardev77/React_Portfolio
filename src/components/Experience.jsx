// Experience component

export default function Experience() {
  return (
    <section className="experience section" id="experience">
      <h2 className="section-title reveal fade-up">Experience & Education</h2>

      <div className="timeline bd-grid">
        {/* Experience 1: White Force Group */}
        <div className="timeline-item reveal fade-up delay-100">
          <div className="timeline-icon">
            <i className="bx bx-briefcase-alt-2"></i>
          </div>
          <div className="timeline-content">
            <span className="timeline-date">Dec 2025 - Present</span>
            <h3 className="timeline-title">Software Engineer</h3>
            <span className="timeline-subtitle">White Force Group</span>
            <ul className="timeline-bullets">
              <li>Contributing to the development of scalable HR-Tech solutions using PHP and the Laravel framework.</li>
              <li>Developing and optimizing RESTful APIs to enhance platform connectivity and candidate data management.</li>
              <li>Collaborating with the engineering team to implement MVC architecture and maintain clean, efficient codebases.</li>
              <li>Working with MySQL for database management and ensuring seamless integration between the backend and frontend.</li>
            </ul>
          </div>
        </div>

        {/* Experience 2: Self-Employed */}
        <div className="timeline-item reveal fade-up delay-200">
          <div className="timeline-icon">
            <i className="bx bx-briefcase-alt-2"></i>
          </div>
          <div className="timeline-content">
            <span className="timeline-date">Sep 2019 - Dec 2023</span>
            <h3 className="timeline-title">Software Developer</h3>
            <span className="timeline-subtitle">Self-Employed</span>
            <ul className="timeline-bullets">
              <li>Designed and developed full-stack web applications using React.js for frontend and Spring Boot for backend development.</li>
              <li>Built reusable UI components and followed modern frontend architecture for scalable and maintainable applications.</li>
              <li>Integrated RESTful APIs and implemented authentication and authorization flows.</li>
              <li>Applied state management techniques to handle complex application data efficiently.</li>
              <li>Worked extensively with Java, JavaScript, HTML5, CSS3, and SQL.</li>
              <li>Focused on clean code practices, performance optimization, and cross-browser compatibility.</li>
              <li>Strengthened problem-solving skills through consistent practice of Data Structures, Algorithms, and Object-Oriented Programming.</li>
            </ul>
          </div>
        </div>

        {/* Education 1 */}
        <div className="timeline-item reveal fade-up delay-300">
          <div className="timeline-icon">
            <i className="bx bx-graduation"></i>
          </div>
          <div className="timeline-content">
            <span className="timeline-date">2019 - Present</span>
            <h3 className="timeline-title">Scaler Academy</h3>
            <span className="timeline-subtitle">Specialization in Software Development</span>
            <p className="timeline-text">Refined algorithms and system design strategies, specializing in writing production-level clean code, optimizing space/time complexities, and implementing robust design patterns.</p>
          </div>
        </div>

        {/* Education 2 */}
        <div className="timeline-item reveal fade-up delay-400">
          <div className="timeline-icon">
            <i className="bx bx-book"></i>
          </div>
          <div className="timeline-content">
            <span className="timeline-date">Graduated 2019</span>
            <h3 className="timeline-title">Shri Ram Institute of Science & Technology</h3>
            <span className="timeline-subtitle">BE / B.Tech in Computer Science & Engineering</span>
            <p className="timeline-text">Acquired a strong foundation in core computer science, software engineering, databases, OS, and Object-Oriented programming.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
