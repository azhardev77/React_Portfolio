import React, { useEffect, useState, useRef } from 'react';
import skillsImg from '../assets/skills.png';

const skillsList = [
  { name: 'Java', level: '85%' },
  { name: 'Spring Boot', level: '80%' },
  { name: 'React', level: '75%' },
  { name: 'Redux', level: '70%' },
  { name: 'JavaScript', level: '80%' },
  { name: 'HTML & CSS', level: '85%' },
  { name: 'SQL', level: '80%' },
  { name: 'REST API', level: '80%' },
  { name: 'Git & GitHub', level: '85%' },
  { name: 'MVC', level: '75%' },
  { name: 'PHP & Laravel', level: '75%' }
];

function SkillItem({ name, level, animate, index }) {
  const progressRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    if (progressRef.current) {
      progressRef.current.style.setProperty('--glow-x', `${x}%`);
    }
  };

  const handleMouseLeave = () => {
    if (progressRef.current) {
      progressRef.current.style.setProperty('--glow-x', '50%');
    }
  };

  // Calculate a staggered delay class up to 500ms
  const delayClass = `delay-${(index % 6 + 1) * 100}`;

  return (
    <div className={`skills__data reveal fade-up ${delayClass}`}>
      <div className="skills__names">
        <span className="skills_name">{name}</span>
      </div>
      <div
        className="skill-bar"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={progressRef}
          className="skills-progress"
          style={{ width: animate ? level : '0%', transition: 'width 1s ease-out' }}
        ></div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="skills section" id="skills" ref={sectionRef}>
      <h2 className="section-title reveal fade-up">Skills</h2>

      <div className="skills__container bd-grid">
        <div className="skills__box">
          <h3 className="skills__subtitle reveal fade-right">Technical</h3>

          {skillsList.map((skill, idx) => (
            <SkillItem
              key={idx}
              index={idx}
              name={skill.name}
              level={skill.level}
              animate={animate}
            />
          ))}
        </div>

        <div className="skills__img reveal fade-left delay-300">
          <img src={skillsImg} alt="Skills Graphic" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
