import { useEffect, useState } from 'react';

export default function CertificateModal({ selectedCert, onClose }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 10);
      return () => {
        clearTimeout(timer);
      };
    } else {
      // Use a microtask to avoid synchronous setState inside effect
      const timer = setTimeout(() => {
        setIsActive(false);
        document.body.style.overflow = '';
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedCert]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedCert) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCert, onClose]);

  if (!selectedCert) return null;

  return (
    <div
      id="certificateModal"
      className={`cert-modal ${isActive ? 'active' : ''}`}
      style={{ display: 'flex' }}
      onClick={(e) => {
        if (e.target.id === 'certificateModal') {
          onClose();
        }
      }}
    >
      <span className="cert-modal-close" onClick={onClose}>
        &times;
      </span>
      <img
        className="cert-modal-content"
        id="imgModalTarget"
        src={selectedCert.src}
        alt={selectedCert.alt}
      />
      <div id="certModalCaption" className="cert-modal-caption">
        {selectedCert.alt}
      </div>
    </div>
  );
}
