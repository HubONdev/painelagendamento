import confetti from 'canvas-confetti';
import { useCallback } from 'react';

export function useCelebration() {
  const celebrate = useCallback(() => {
    // Colors based on the PPM orange theme
    const colors = ['#DD490E', '#E85A1F', '#F07030', '#FF8C42', '#FFB366'];

    // First burst - left side
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.2, y: 0.6 },
      colors,
      startVelocity: 45,
      gravity: 1.2,
      scalar: 1.2,
      drift: 0.5,
    });

    // Second burst - right side with slight delay
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { x: 0.8, y: 0.6 },
        colors,
        startVelocity: 45,
        gravity: 1.2,
        scalar: 1.2,
        drift: -0.5,
      });
    }, 100);

    // Center burst - larger particles
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors,
        startVelocity: 55,
        gravity: 1,
        scalar: 1.5,
        shapes: ['circle', 'square'],
      });
    }, 200);

    // Final shimmer effect
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 120,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#FFD700', '#FF8C42', '#DD490E'],
        startVelocity: 30,
        gravity: 0.8,
        scalar: 0.8,
        ticks: 150,
      });
    }, 350);
  }, []);

  return { celebrate };
}
