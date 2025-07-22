import { createTheme, ThemeOptions, alpha } from '@mui/material/styles';
import { Palette } from '@mui/material/styles';

// Extend the theme interface
declare module '@mui/material/styles' {
  interface Theme {
    gradient: {
      primary: string;
      secondary: string;
      success: string;
      error: string;
    };
  }
  interface ThemeOptions {
    gradient?: {
      primary?: string;
      secondary?: string;
      success?: string;
      error?: string;
    };
  }
}

export interface ColorPalette {
  name: string;
  primary: string;
  secondary: string;
  tertiary: string;
  surface: string;
  background: string;
  gradient: string[];
}

export const colorPalettes: Record<string, ColorPalette> = {
  ocean: {
    name: 'Ocean Breeze',
    primary: '#0EA5E9',
    secondary: '#7C3AED',
    tertiary: '#10B981',
    surface: '#F0F9FF',
    background: '#F8FAFC',
    gradient: ['#0EA5E9', '#7C3AED'],
  },
  sunset: {
    name: 'Desert Sunset',
    primary: '#F59E0B',
    secondary: '#EF4444',
    tertiary: '#8B5CF6',
    surface: '#FFFBEB',
    background: '#FEF3C7',
    gradient: ['#F59E0B', '#EF4444'],
  },
  forest: {
    name: 'Forest Dream',
    primary: '#10B981',
    secondary: '#3B82F6',
    tertiary: '#F59E0B',
    surface: '#F0FDF4',
    background: '#ECFDF5',
    gradient: ['#10B981', '#3B82F6'],
  },
  royal: {
    name: 'Royal Purple',
    primary: '#6366F1',
    secondary: '#EC4899',
    tertiary: '#14B8A6',
    surface: '#F5F3FF',
    background: '#FAFAF9',
    gradient: ['#6366F1', '#EC4899'],
  },
  midnight: {
    name: 'Midnight Dark',
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    tertiary: '#10B981',
    surface: '#1E293B',
    background: '#0F172A',
    gradient: ['#3B82F6', '#8B5CF6'],
  },
};

export const createAppTheme = (
  palette: ColorPalette,
  mode: 'light' | 'dark' = 'light',
  direction: 'ltr' | 'rtl' = 'ltr'
): ThemeOptions => {
  const isDark = mode === 'dark' || palette.name === 'Midnight Dark';
  
  return createTheme({
    direction,
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: palette.primary,
        light: alpha(palette.primary, 0.2),
        dark: alpha(palette.primary, 0.8),
      },
      secondary: {
        main: palette.secondary,
        light: alpha(palette.secondary, 0.2),
        dark: alpha(palette.secondary, 0.8),
      },
      background: {
        default: isDark ? palette.background : palette.background,
        paper: isDark ? palette.surface : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#E2E8F0' : '#1E293B',
        secondary: isDark ? '#94A3B8' : '#64748B',
      },
    },
    
    gradient: {
      primary: `linear-gradient(135deg, ${palette.gradient[0]} 0%, ${palette.gradient[1]} 100%)`,
      secondary: `linear-gradient(135deg, ${palette.gradient[1]} 0%, ${palette.tertiary} 100%)`,
      success: `linear-gradient(135deg, #10B981 0%, #34D399 100%)`,
      error: `linear-gradient(135deg, #EF4444 0%, #F87171 100%)`,
    },
    
    typography: {
      fontFamily: direction === 'rtl' 
        ? "'Cairo', 'Tajawal', sans-serif"
        : "'Inter', 'Poppins', sans-serif",
      
      h1: {
        fontSize: '3rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: '2.25rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontSize: '1.875rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.7,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
    },
    
    shape: {
      borderRadius: 16,
    },
    
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            fontWeight: 600,
            padding: '10px 24px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            },
          },
          contained: {
            background: `linear-gradient(135deg, ${palette.gradient[0]} 0%, ${palette.gradient[1]} 100%)`,
            '&:hover': {
              background: `linear-gradient(135deg, ${alpha(palette.gradient[0], 0.9)} 0%, ${alpha(palette.gradient[1], 0.9)} 100%)`,
            },
          },
        },
      },
      
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: isDark 
              ? '0 4px 20px rgba(0,0,0,0.3)' 
              : '0 4px 20px rgba(0,0,0,0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: isDark 
                ? '0 12px 28px rgba(0,0,0,0.4)' 
                : '0 12px 28px rgba(0,0,0,0.15)',
            },
          },
        },
      },
      
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              '& fieldset': {
                borderColor: alpha(isDark ? '#E2E8F0' : '#1E293B', 0.1),
              },
              '&:hover fieldset': {
                borderColor: alpha(palette.primary, 0.3),
              },
              '&.Mui-focused fieldset': {
                borderColor: palette.primary,
                borderWidth: 2,
              },
            },
          },
        },
      },
      
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: isDark 
              ? '0 2px 12px rgba(0,0,0,0.3)' 
              : '0 2px 12px rgba(0,0,0,0.08)',
          },
          elevation1: {
            boxShadow: isDark 
              ? '0 2px 12px rgba(0,0,0,0.3)' 
              : '0 2px 12px rgba(0,0,0,0.08)',
          },
          elevation2: {
            boxShadow: isDark 
              ? '0 4px 20px rgba(0,0,0,0.3)' 
              : '0 4px 20px rgba(0,0,0,0.08)',
          },
        },
      },
      
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
      
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: alpha(palette.primary, 0.08),
            },
          },
        },
      },
      
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRadius: 0,
            boxShadow: '0 0 20px rgba(0,0,0,0.1)',
          },
        },
      },
      
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderBottom: `1px solid ${alpha(isDark ? '#E2E8F0' : '#1E293B', 0.1)}`,
            backdropFilter: 'blur(10px)',
            backgroundColor: alpha(isDark ? palette.background : '#FFFFFF', 0.8),
          },
        },
      },
      
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 8,
            transition: 'all 0.2s ease-in-out',
            '&.Mui-selected': {
              backgroundColor: alpha(palette.primary, 0.08),
            },
          },
        },
      },
      
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            height: 8,
            backgroundColor: alpha(palette.primary, 0.1),
          },
          bar: {
            borderRadius: 4,
            background: `linear-gradient(90deg, ${palette.gradient[0]} 0%, ${palette.gradient[1]} 100%)`,
          },
        },
      },
    },
    
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
  });
};

// Animation variants for Framer Motion
export const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  
  fadeInScale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  
  slideInLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  
  slideInRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};