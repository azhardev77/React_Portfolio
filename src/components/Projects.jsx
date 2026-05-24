// Projects component
import { useRef } from 'react';
import portfolioThumb from '../assets/portfolio_thumbnail.png';
import parkingLotThumb from '../assets/parking_lot_thumbnail.png';

const projects = [
  {
    src: portfolioThumb,
    alt: 'Personal Portfolio Website',
    title: 'Personal Portfolio',
    desc: 'A fully responsive, interactive portfolio utilizing CSS Glassmorphism, dynamically computed neon-glow trails, scroll reveals, and LocalStorage client preferences.',
    github: 'https://github.com/azhardev77/AzharPortfolio',
    live: 'https://azhardev77.github.io/AzharPortfolio/main.html',
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
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      className={`project-card reveal fade-up delay-${(index + 1) * 100}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.1s ease-out, box-shadow 0.3s ease' }}
    >
      <img src={project.src} alt={project.alt} loading="lazy" />
      <div className="project-overlay">
        <p className="project-desc">{project.desc}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
        <div className="project-icons">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" title="GitHub">
              <i className="bx bxl-github"></i>
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" title="Live Demo">
              <i className="bx bx-link-external"></i>
            </a>
          )}
        </div>
      </div>
      <h3 className="project-title">{project.title}</h3>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="projects section" id="projects">
      <h2 className="section-title reveal fade-up">Projects</h2>
      <div className="projects__container bd-grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
