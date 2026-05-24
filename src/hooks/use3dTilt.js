import { useRef } from 'react';

/**
 * Custom hook to apply a hardware-accelerated 3D tilt perspective effect to elements on hover/mouse-move.
 * Uses performance-optimized CSS 3D transforms.
 * 
 * @param {number} maxRotate Maximum rotation angle in degrees (default: 8)
 * @param {number} scale Hover scale factor (default: 1.02)
 */
export function use3dTilt(maxRotate = 8, scale = 1.02) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const card = ref.current;
    if (!card) return;

    // Direct client coordinate computations
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles based on distance from element center
    const rotateX = ((y - centerY) / centerY) * -maxRotate;
    const rotateY = ((x - centerX) / centerX) * maxRotate;

    // Apply GPU-accelerated perspective rotation and scaling
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
  };

  const handleMouseLeave = () => {
    const card = ref.current;
    if (!card) return;

    // Restore original state gracefully
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: {
      transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
      transformStyle: 'preserve-3d',
    }
  };
}
