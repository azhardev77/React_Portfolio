// Home component
import { useEffect, useRef } from 'react';
import avatarImg from '../assets/Azhar.jpeg';

export default function Home({ isDark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrameId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Dynamic colors based on active theme
    const primaryColor = isDark ? '0, 245, 255' : '14, 165, 233'; // Cyber cyan vs Slate blue
    const secondaryColor = isDark ? '168, 85, 247' : '90, 129, 138'; // Cyber purple vs Soft teal

    // Particle system
    const particles = Array.from({ length: 80 }, () => {
      const useSecondary = Math.random() > 0.6;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.35,
        dy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.5 + 0.15,
        colorStr: useSecondary ? secondaryColor : primaryColor,
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.colorStr}, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${a.colorStr}, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  return (
    <section className="home" id="home">
      <canvas ref={canvasRef} className="home-canvas" />
      <div className="home__container bd-grid">
        <h1 className="home__title reveal fade-up">
          <span>Hello,</span>
          <span><br />There.</span>
        </h1>
        <img
          src={avatarImg}
          alt="Mohd Azhar Mansoori"
          loading="lazy"
          className="home__img reveal fade-left delay-200"
        />
      </div>
    </section>
  );
}
