import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
  // Specific to letters
  char?: string;
  angle?: number;
  spinSpeed?: number;
  // Specific to feathers
  sway?: number;
  swaySpeed?: number;
  swayWidth?: number;
}

interface ParticleOverlayProps {
  type: 'droplets' | 'letters' | 'feathers' | 'none';
}

export default function ParticleOverlay({ type }: ParticleOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (type === 'none') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvasRef.current) return;
      width = canvasRef.current.width = window.innerWidth;
      height = canvasRef.current.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const maxParticles = type === 'droplets' ? 260 : type === 'letters' ? 90 : 60;
    const paperThreadsLetters = 'PaperThreads'.split('');

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    function createParticle(randomY = false): Particle {
      const pSize =
        type === 'droplets'
          ? Math.random() * 2 + 1
          : type === 'letters'
          ? Math.random() * 8 + 12
          : Math.random() * 10 + 15; // feathers are bigger

      const pSwaySpeed = Math.random() * 0.05 + 0.01;
      const pSwayWidth = Math.random() * 30 + 10;

      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : -30,
        speed:
          type === 'droplets'
            ? Math.random() * 4 + 3
            : type === 'letters'
            ? Math.random() * 1.5 + 0.8
            : Math.random() * 0.6 + 0.4, // feathers are very slow
        size: pSize,
        opacity: Math.random() * 0.5 + 0.25,
        char: paperThreadsLetters[Math.floor(Math.random() * paperThreadsLetters.length)],
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.03,
        sway: Math.random() * 100,
        swaySpeed: pSwaySpeed,
        swayWidth: pSwayWidth,
      };
    }

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, index) => {
        // Update physics
        p.y += p.speed;

        if (type === 'droplets') {
          // Drops slightly drift diagonally left
          p.x -= 0.5;
        } else if (type === 'letters') {
          // Letters rotate
          if (p.angle !== undefined && p.spinSpeed !== undefined) {
            p.angle += p.spinSpeed;
          }
        } else if (type === 'feathers') {
          // Feathers sway gracefully side to side
          if (p.sway !== undefined && p.swaySpeed !== undefined && p.swayWidth !== undefined) {
            p.sway += p.swaySpeed;
            p.x += Math.sin(p.sway) * (p.swayWidth / 60);
          }
        }

        // Reset off-screen particles
        if (p.y > height + 20 || p.x < -20 || p.x > width + 20) {
          particles[index] = createParticle(false);
          return;
        }

        // Draw particle
        ctx.beginPath();
        if (type === 'droplets') {
          // Draw diagonal rain streaks
          ctx.strokeStyle = `rgba(244, 63, 94, ${p.opacity * 0.7})`; // rose pink
          ctx.lineWidth = p.size;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 4, p.y + p.size * 5);
          ctx.stroke();
        } else if (type === 'letters') {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle || 0);
          ctx.font = `${p.size}px "JetBrains Mono", monospace`;
          ctx.fillStyle = `rgba(236, 72, 153, ${p.opacity})`; // pink-500
          ctx.shadowColor = '#db2777';
          ctx.shadowBlur = 4;
          ctx.fillText(p.char || 'A', 0, 0);
          ctx.restore();
        } else if (type === 'feathers') {
          // Draw stylized feather (curved shape or soft stroke)
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.sin(p.sway || 0) * 0.3);
          
          // Outer glow for magical vibe
          ctx.shadowColor = '#d946ef'; // Fuchsia
          ctx.shadowBlur = 8;

          // Feather path drawing
          ctx.beginPath();
          ctx.moveTo(0, -p.size / 2);
          ctx.quadraticCurveTo(p.size * 0.4, 0, 0, p.size / 2);
          ctx.quadraticCurveTo(-p.size * 0.4, 0, 0, -p.size / 2);
          ctx.fillStyle = `rgba(253, 244, 255, ${p.opacity * 0.45})`; // warm pinkish white
          ctx.fill();

          // Feather spine
          ctx.beginPath();
          ctx.moveTo(0, -p.size / 2);
          ctx.lineTo(0, p.size / 2);
          ctx.strokeStyle = `rgba(217, 70, 239, ${p.opacity * 0.8})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type]);

  if (type === 'none') return null;

  return (
    <canvas
      id="ambient-particle-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
