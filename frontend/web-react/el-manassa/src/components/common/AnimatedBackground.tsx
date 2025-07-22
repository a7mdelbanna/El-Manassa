import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface AnimatedBackgroundProps {
  variant?: 'particles' | 'gradient' | 'waves' | 'mesh';
  intensity?: number;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  variant = 'particles',
  intensity = 0.5,
}) => {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  
  useEffect(() => {
    if (variant !== 'particles') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize particles
    const particleCount = Math.floor(50 * intensity);
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${
          theme.palette.mode === 'dark' ? '255, 255, 255' : '0, 0, 0'
        }, ${particle.opacity})`;
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [variant, intensity, theme.palette.mode]);
  
  if (variant === 'gradient') {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          background: theme.gradient?.primary,
          opacity: intensity * 0.3,
          filter: 'blur(100px)',
        }}
      >
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
          style={{
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle at 20% 50%, ${theme.palette.primary.main} 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 50%),
                        radial-gradient(circle at 40% 20%, ${theme.palette.primary.light} 0%, transparent 50%)`,
            backgroundSize: '200% 200%',
          }}
        />
      </Box>
    );
  }
  
  if (variant === 'waves') {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          overflow: 'hidden',
        }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '30%',
              background: `linear-gradient(180deg, transparent, ${
                theme.palette.primary.main
              }${Math.floor(intensity * 40).toString(16).padStart(2, '0')})`,
              borderRadius: '50% 50% 0 0',
              transform: 'translateY(50%)',
            }}
            animate={{
              y: [0, -20, 0],
              scaleX: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + index * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.5,
            }}
          />
        ))}
      </Box>
    );
  }
  
  if (variant === 'mesh') {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      >
        <svg width="100%" height="100%" style={{ position: 'absolute' }}>
          <defs>
            <pattern
              id="mesh-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <motion.circle
                cx="20"
                cy="20"
                r="1"
                fill={theme.palette.primary.main}
                animate={{
                  r: [1, 2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh-pattern)" />
        </svg>
      </Box>
    );
  }
  
  // Particles variant (default)
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

// Animated gradient text component
export const GradientText: React.FC<{
  children: React.ReactNode;
  gradient?: string;
  animate?: boolean;
}> = ({ children, gradient, animate = true }) => {
  const theme = useTheme();
  const defaultGradient = gradient || theme.gradient?.primary;
  
  return (
    <Box
      component={animate ? motion.span : 'span'}
      sx={{
        background: defaultGradient,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
      }}
      animate={
        animate
          ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }
          : undefined
      }
      transition={
        animate
          ? {
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }
          : undefined
      }
      style={
        animate
          ? {
              backgroundSize: '200% 200%',
            }
          : undefined
      }
    >
      {children}
    </Box>
  );
};

// Floating shapes component
export const FloatingShapes: React.FC = () => {
  const theme = useTheme();
  
  const shapes = [
    { size: 200, color: theme.palette.primary.main, top: '10%', left: '5%' },
    { size: 150, color: theme.palette.secondary.main, top: '60%', right: '10%' },
    { size: 100, color: theme.palette.primary.light, bottom: '20%', left: '15%' },
  ];
  
  return (
    <>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          style={{
            position: 'fixed',
            width: shape.size,
            height: shape.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${shape.color}40 0%, transparent 70%)`,
            filter: 'blur(40px)',
            ...shape,
            zIndex: -1,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 5 + index * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.5,
          }}
        />
      ))}
    </>
  );
};