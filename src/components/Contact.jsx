import { useState } from 'react';

export default function Contact() {
  const [emailFeedback, setEmailFeedback] = useState('');
  const [phoneFeedback, setPhoneFeedback] = useState('');

  const copyEmail = () => {
    const email = 'azharmansori779@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      setEmailFeedback('Email copied ✔');
      setTimeout(() => {
        setEmailFeedback('');
      }, 1500);
    });
  };

  const copyPhone = () => {
    const number = '+917747047876';
    navigator.clipboard.writeText(number).then(() => {
      setPhoneFeedback('Number copied ✔');
      setTimeout(() => {
        setPhoneFeedback('');
      }, 1500);
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('📧 Message sending simulated! In a production deployment, this can be integrated with EmailJS.');
    e.currentTarget.reset();
  };

  return (
    <section className="contact section" id="contact">
      <h2 className="section-title reveal fade-up">Contact</h2>

      <div className="contact__container bd-grid">
        <div className="contact__info reveal fade-right">
          {/* EMAIL */}
          <h3 className="contact__subtitle">EMAIL</h3>
          <div className="contact__email-box">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=azharmansori779@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__email-text"
              title="Open in Gmail"
            >
              azharmansori779@gmail.com
            </a>
            <span
              className="contact__email-icon copy"
              onClick={copyEmail}
              title="Copy email"
            >
              <i className="bx bx-clipboard"></i>
            </span>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=azharmansori779@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__email-icon gmail"
              title="Open Gmail"
            >
              <i className="bx bx-at"></i>
            </a>
          </div>
          <span className="email-copy-feedback" style={{ display: emailFeedback ? 'block' : 'none' }}>
            {emailFeedback}
          </span>

          {/* PHONE */}
          <h3 className="contact__subtitle">PHONE</h3>
          <div className="contact__phone-box">
            <a href="tel:+917747047876" className="contact__phone-number">
              +91-7747047876
            </a>
            <span
              className="contact__icon copy"
              title="Copy number"
              onClick={copyPhone}
            >
              <i className="bx bx-clipboard"></i>
            </span>
            <a
              href="https://wa.me/917747047876"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__icon whatsapp"
              title="WhatsApp"
            >
              <i className="bx bxl-whatsapp"></i>
            </a>
          </div>
          <span className="copy-feedback" style={{ display: phoneFeedback ? 'block' : 'none' }}>
            {phoneFeedback}
          </span>

          {/* ADDRESS */}
          <h3 className="contact__subtitle">ADDRESS</h3>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Gohalpur,+Jabalpur,+Madhya+Pradesh+482001"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__text contact__map-link"
            title="Open in Google Maps"
          >
            Gohalpur, Jabalpur, Madhya Pradesh<br />482001
            <span className="map-icon"><i className="bx bx-map"></i></span>
          </a>
        </div>

        {/* Form */}
        <form className="contact__form reveal fade-left delay-200" onSubmit={handleFormSubmit}>
          <div className="contact__inputs">
            <input type="text" placeholder="Name" className="contact__input" required />
            <input type="email" placeholder="Email" className="contact__input" required />
          </div>
          <textarea
            name="feedback"
            id="feedback"
            cols="0"
            rows="10"
            className="contact__input"
            placeholder="Message"
            required
          ></textarea>
          <input type="submit" value="Send" className="contact__button" />
        </form>
      </div>
    </section>
  );
}
