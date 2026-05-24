// Certificates component
import dsaCert from '../assets/DSA_Certificate.webp';
import dsaCertImg from '../assets/data structure & algorithm.png';
import sqlCert from '../assets/SQL_Certificate.webp';
import javaCert from '../assets/java.png';
import reactCert from '../assets/react.png';
import advDiplomaCert from '../assets/Advance-Diploma.webp';

const certsList = [
  { src: dsaCert, alt: 'Skill Mastery Certification - Intermediate DSA' },
  { src: dsaCertImg, alt: 'Skill Mastery Certification - Data Structures & Algorithms' },
  { src: sqlCert, alt: 'Skill Mastery Certification - Databases and SQL' },
  { src: javaCert, alt: 'Skill Mastery Certification - Java Programming' },
  { src: reactCert, alt: 'Skill Mastery Certification - React.js Web Development' },
  { src: advDiplomaCert, alt: 'Advance Diploma in Computer Programming - 264 Hours duration' }
];

export default function Certificates({ onSelectCert }) {
  return (
    <section className="certificate section" id="certificate">
      <h2 className="section-title reveal fade-up">Certificates</h2>

      <div className="certificate__container bd-grid">
        {certsList.map((cert, idx) => (
          <div
            key={idx}
            className={`certificate__img reveal zoom-in delay-${(idx % 3 + 1) * 100}`}
            style={{ cursor: 'pointer' }}
            onClick={() => onSelectCert(cert)}
          >
            <img src={cert.src} alt={cert.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
