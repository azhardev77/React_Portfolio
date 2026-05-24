// Home component

export default function Home({ onDownloadResume }) {
  return (
    <section className="home" id="home">
      
      {/* 3D Floating Ambient Shapes */}
      <div className="floating-shape shape-sphere shape-1"></div>
      <div className="floating-shape shape-ring shape-2"></div>
      <div className="floating-shape shape-cube shape-3"></div>

      <div className="home__container bd-grid">
        <div className="home__data reveal fade-up">
          <span className="home__greeting">Hello, I'm</span>
          <h1 className="home__name">Mohd Azhar Mansoori</h1>
          <h2 className="home__role">Full-Stack Software Developer <span className="role-divider">|</span> Java Backend Specialist</h2>
          
          <p className="home__tagline">
            Crafting High-Performance Backends & Scalable Web Architectures
          </p>
          
          <p className="home__description">
            Specializing in building robust enterprise APIs, modern frontend interfaces, and optimized database layers. Dedicated to clean code, performance tuning, and highly scalable system designs.
          </p>
          
          <div className="home__ctas">
            <a href="#projects" className="home__cta-btn primary" title="Explore My Projects">
              <i className="bx bx-folder"></i> View Projects
            </a>
            <button onClick={onDownloadResume} className="home__cta-btn secondary" title="Print Professional ATS Resume">
              <i className="bx bx-download"></i> Get Resume
            </button>
            <a href="#contact" className="home__cta-btn text-link" title="Send Me a Message">
              Contact Me <i className="bx bx-right-arrow-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
