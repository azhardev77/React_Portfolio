import { use3dTilt } from '../hooks/use3dTilt';
import portfolioThumb from '../assets/portfolio_thumbnail.png';
import parkingLotThumb from '../assets/parking_lot_thumbnail.png';

const projects = [
  {
    src: portfolioThumb,
    alt: 'Personal Portfolio Website',
    title: 'Personal Portfolio',
    desc: 'A fully responsive, interactive portfolio utilizing CSS Glassmorphism, dynamically computed neon-glow trails, scroll reveals, and cloud-synced databases.',
    github: 'https://github.com/azhardev77/AzharPortfolio',
    live: 'https://react-portfolio-virid-chi.vercel.app/',
    tags: ['React', 'CSS', 'Vite'],
  },
  {
    src: parkingLotThumb,
    alt: 'Parking Lot Management System',
    title: 'Parking Lot System',
    desc: 'A highly modular core Java-based system built on SOLID principles. Leveraged optimized HashMap/ArrayList configurations to manage slot allotments, boosting utilization by 15%.',
    github: 'https://github.com/azhardev77/ParkingLot_Master',
    live: null,
    tags: ['Java', 'OOP', 'SOLID'],
  },
];

function ProjectCard({ project, index }) {
  const tilt = use3dTilt(8, 1.02);

  return (
    <div
      {...tilt}
      className={`project-card reveal fade-up delay-${(index + 1) * 100}`}
    >
      <div className="project-card__img-wrapper" style={{ transform: 'translateZ(30px)' }}>
        <img src={project.src} alt={project.alt} loading="lazy" className="project-card__img" />
      </div>
      
      <div className="project-card__content" style={{ transform: 'translateZ(15px)' }}>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.desc}</p>
        
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card__tag">{tag}</span>
          ))}
        </div>
        
        <div className="project-card__actions">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card__btn code" title="View Source Code on GitHub">
              <i className="bx bxl-github"></i> Code
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-card__btn live" title="View Live Site">
              <i className="bx bx-link-external"></i> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="projects section" id="projects">
      <h2 className="section-title reveal fade-up">Projects</h2>
      <p className="section-subtitle reveal fade-up delay-100" style={{ textAlign: 'center', marginBottom: '2.5rem', color: 'var(--text-color-light)' }}>
        A selection of backend systems and interactive full-stack web applications I have engineered.
      </p>
      
      <div className="projects__container bd-grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
