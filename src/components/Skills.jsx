import { useEffect, useState, useRef } from 'react';

const skillCategories = [
  {
    title: 'Backend Engineering',
    icon: 'bx bx-server',
    colorClass: 'backend',
    skills: [
      { name: 'Java', level: '85%' },
      { name: 'Spring Boot', level: '80%' },
      { name: 'PHP & Laravel', level: '75%' },
      { name: 'REST APIs', level: '80%' },
      { name: 'MVC Architecture', level: '75%' }
    ]
  },
  {
    title: 'Frontend Web',
    icon: 'bx bx-code-alt',
    colorClass: 'frontend',
    skills: [
      { name: 'React.js', level: '75%' },
      { name: 'Redux State', level: '70%' },
      { name: 'JavaScript (ES6+)', level: '80%' },
      { name: 'HTML5 & CSS3', level: '85%' }
    ]
  },
  {
    title: 'Database & Systems',
    icon: 'bx bx-data',
    colorClass: 'database',
    skills: [
      { name: 'SQL', level: '80%' },
      { name: 'MySQL', level: '80%' },
      { name: 'Schema Design', level: '75%' },
      { name: 'Query Optimization', level: '70%' }
    ]
  },
  {
    title: 'Tools & Workflows',
    icon: 'bx bx-cog',
    colorClass: 'tools',
    skills: [
      { name: 'Git & GitHub', level: '85%' },
      { name: 'Vite & Bundlers', level: '75%' },
      { name: 'Postman API Testing', level: '80%' },
      { name: 'SOLID Principles', level: '80%' }
    ]
  }
];

export default function Skills() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section className="skills section" id="skills" ref={sectionRef}>
      <h2 className="section-title reveal fade-up">Skills</h2>
      <p className="section-subtitle reveal fade-up delay-100" style={{ textAlign: 'center', marginBottom: '2.5rem', color: 'var(--text-color-light)' }}>
        A structured overview of my technology stack, specializing in backend frameworks and modern full-stack systems.
      </p>

      <div className="skills__category-grid bd-grid">
        {skillCategories.map((category, catIdx) => (
          <div 
            key={catIdx} 
            className={`skills__category-card reveal fade-up delay-${(catIdx + 1) * 100} ${category.colorClass}`}
          >
            <div className="category-header">
              <i className={category.icon}></i>
              <h3>{category.title}</h3>
            </div>
            <div className="category-skills">
              {category.skills.map((skill, skillIdx) => (
                <div key={skillIdx} className="skill-badge-item">
                  <div className="skill-badge-info">
                    <span className="skill-badge-name">{skill.name}</span>
                    <span className="skill-badge-level">{skill.level}</span>
                  </div>
                  <div className="skill-badge-bar">
                    <div 
                      className="skill-badge-progress" 
                      style={{ 
                        width: animate ? skill.level : '0%', 
                        transition: 'width 1.2s cubic-bezier(0.1, 0.76, 0.55, 0.94)' 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
