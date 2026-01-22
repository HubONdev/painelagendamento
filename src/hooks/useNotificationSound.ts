import { useCallback, useRef } from 'react';

// Simple notification sound using Web Audio API
export function useNotificationSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playNotificationSound = useCallback(() => {
    try {
      // Create or reuse audio context
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioContextRef.current;
      
      // Resume context if suspended (browser autoplay policy)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // Create oscillator for a pleasant notification sound
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Pleasant two-tone notification
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, now); // A5
      oscillator.frequency.setValueAtTime(1174.66, now + 0.1); // D6

      // Envelope
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.02);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.12);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      oscillator.start(now);
      oscillator.stop(now + 0.4);
    } catch (error) {
      console.log('Audio not available:', error);
    }
  }, []);

  return { playNotificationSound };
}
