import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated, config } from '@react-spring/web';

// Floating Particles Background
export const FloatingParticles: React.FC<{ count?: number; color?: string }> = ({ 
  count = 50, 
  color = 'rgba(255,255,255,0.1)' 
}) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            backgroundColor: color,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </Box>
  );
};

// Morphing Blob Background
export const MorphingBlob: React.FC<{ colors: string[]; size?: number }> = ({ 
  colors, 
  size = 400 
}) => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [colors.length]);

  return (
    <motion.div
      style={{
        width: size,
        height: size,
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        background: `linear-gradient(45deg, ${colors[currentColorIndex]}, ${colors[(currentColorIndex + 1) % colors.length]})`,
        filter: 'blur(40px)',
        opacity: 0.3,
      }}
      animate={{
        borderRadius: [
          '60% 40% 30% 70% / 60% 30% 70% 40%',
          '30% 60% 70% 40% / 50% 60% 30% 60%',
          '60% 40% 30% 70% / 60% 30% 70% 40%',
        ],
        rotate: [0, 120, 360],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
};

// 3D Floating Card
export const FloatingCard3D: React.FC<{ children: React.ReactNode; delay?: number }> = ({ 
  children, 
  delay = 0 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x: x * 20, y: y * 20 });
  };

  const springProps = useSpring({
    transform: isHovered
      ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale3d(1.05, 1.05, 1.05)`
      : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    config: config.wobbly,
  });

  const floatAnimation = useSpring({
    from: { transform: 'translateY(0px)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translateY(-10px)' });
        await next({ transform: 'translateY(0px)' });
      }
    },
    config: { duration: 2000 + delay * 200 },
  });

  return (
    <animated.div style={floatAnimation}>
      <animated.div
        style={springProps}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {children}
      </animated.div>
    </animated.div>
  );
};

// Magnetic Button
export const MagneticButton: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  direction?: 'ltr' | 'rtl';
}> = ({ children, onClick, variant = 'primary', direction = 'ltr' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const theme = useTheme();

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x: x * 0.3, y: y * 0.3 });
  };

  const springProps = useSpring({
    transform: isHovered
      ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale(1.05)`
      : 'translate3d(0px, 0px, 0) scale(1)',
    config: config.wobbly,
  });

  const glowProps = useSpring({
    boxShadow: isHovered
      ? `0 20px 40px ${theme.palette.primary.main}40, 0 0 0 1px ${theme.palette.primary.main}20`
      : `0 8px 25px ${theme.palette.primary.main}20, 0 0 0 1px ${theme.palette.primary.main}10`,
    config: config.gentle,
  });

  return (
    <animated.button
      style={{
        ...springProps,
        ...glowProps,
        border: 'none',
        borderRadius: '16px',
        padding: direction === 'rtl' ? '16px 24px' : '16px 32px',
        background: variant === 'primary' 
          ? `linear-gradient(${direction === 'rtl' ? '225deg' : '135deg'}, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
          : 'transparent',
        color: variant === 'primary' ? '#ffffff' : theme.palette.primary.main,
        fontSize: '1rem',
        fontWeight: direction === 'rtl' ? 500 : 600,
        fontFamily: direction === 'rtl' 
          ? "'Tajawal', 'Cairo', sans-serif"
          : "'Inter', 'Poppins', sans-serif",
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        direction: direction,
        textAlign: 'center' as const,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {children}
      {isHovered && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '16px',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </animated.button>
  );
};

// Glassmorphism Container
export const GlassContainer: React.FC<{ 
  children: React.ReactNode; 
  blur?: number;
  opacity?: number;
}> = ({ children, blur = 20, opacity = 0.1 }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        background: theme.palette.mode === 'dark' 
          ? `rgba(255, 255, 255, ${opacity})`
          : `rgba(255, 255, 255, ${opacity * 0.8})`,
        backdropFilter: `blur(${blur}px)`,
        border: `1px solid rgba(255, 255, 255, ${opacity * 2})`,
        borderRadius: '20px',
        padding: '2rem',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '20px',
          padding: '1px',
          background: `linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
        },
      }}
    >
      {children}
    </Box>
  );
};

// Animated Number Counter
export const AnimatedCounter: React.FC<{ 
  value: number; 
  duration?: number;
  prefix?: string;
  suffix?: string;
}> = ({ value, duration = 2, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const incrementTime = (duration * 1000) / end;
    const timer = setInterval(() => {
      start += Math.ceil(end / 60);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// Scroll Reveal Container
export const ScrollReveal: React.FC<{ 
  children: React.ReactNode; 
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}> = ({ children, direction = 'up', delay = 0 }) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 60, x: 0 };
      case 'down': return { y: -60, x: 0 };
      case 'left': return { y: 0, x: 60 };
      case 'right': return { y: 0, x: -60 };
      default: return { y: 60, x: 0 };
    }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        ...getInitialPosition()
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0 
      }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  );
};

// Interactive Cursor Effect
export const CursorGlow: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
        transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px)`,
        filter: 'blur(10px)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};