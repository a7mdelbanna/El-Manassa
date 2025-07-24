import { createTheme, ThemeOptions, alpha } from '@mui/material/styles';

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
  modern: {
    name: 'Modern Professional',
    primary: '#2563EB', // Deep blue - trust, intelligence
    secondary: '#06B6D4', // Vibrant cyan - innovation, clarity  
    tertiary: '#F97316', // Warm orange - energy, creativity
    surface: '#FAFBFC',
    background: '#FFFFFF',
    gradient: ['#2563EB', '#06B6D4'],
  },
  sophisticated: {
    name: 'Sophisticated Dark',
    primary: '#6366F1', // Refined indigo
    secondary: '#8B5CF6', // Rich purple
    tertiary: '#F59E0B', // Amber accent
    surface: '#F8FAFC',
    background: '#FFFFFF',
    gradient: ['#6366F1', '#8B5CF6'],
  },
  premium: {
    name: 'Premium Education',
    primary: '#1E40AF', // Deep navy - authority, trust
    secondary: '#0D9488', // Sophisticated teal - growth
    tertiary: '#DC2626', // Confident red - achievement
    surface: '#F9FAFB',
    background: '#FFFFFF',
    gradient: ['#1E40AF', '#0D9488'],
  },
  creative: {
    name: 'Creative Learning',
    primary: '#7C3AED', // Rich purple - creativity
    secondary: '#059669', // Forest green - growth
    tertiary: '#EA580C', // Energetic orange
    surface: '#FAFAFA',
    background: '#FFFFFF', 
    gradient: ['#7C3AED', '#059669'],
  },
  ocean: {
    name: 'Ocean Breeze',
    primary: '#0EA5E9', // Sky blue
    secondary: '#06B6D4', // Cyan
    tertiary: '#F59E0B', // Amber
    surface: '#F0F9FF',
    background: '#FFFFFF',
    gradient: ['#0EA5E9', '#06B6D4'],
  },
  sunset: {
    name: 'Sunset Glow',
    primary: '#F59E0B', // Amber
    secondary: '#EF4444', // Red
    tertiary: '#8B5CF6', // Purple
    surface: '#FFFBEB',
    background: '#FFFFFF',
    gradient: ['#F59E0B', '#EF4444'],
  },
  forest: {
    name: 'Forest Green',
    primary: '#059669', // Emerald
    secondary: '#10B981', // Green
    tertiary: '#F97316', // Orange
    surface: '#F0FDF4',
    background: '#FFFFFF',
    gradient: ['#059669', '#10B981'],
  },
  dark: {
    name: 'Dark Professional',
    primary: '#3B82F6', // Bright blue for dark mode
    secondary: '#10B981', // Bright emerald 
    tertiary: '#F59E0B', // Warm amber
    surface: '#1E293B', // Dark slate
    background: '#0F172A', // Rich navy black
    gradient: ['#3B82F6', '#10B981'],
  },
};

export const createAppTheme = (
  palette: ColorPalette,
  mode: 'light' | 'dark' = 'light',
  direction: 'ltr' | 'rtl' = 'ltr'
): ThemeOptions => {
  const isDark = mode === 'dark';
  
  // Use the dark palette for dark mode
  const effectivePalette = isDark ? colorPalettes.dark : palette;
  
  return createTheme({
    direction,
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: effectivePalette.primary,
        light: isDark ? alpha(effectivePalette.primary, 0.3) : alpha(effectivePalette.primary, 0.1),
        dark: alpha(effectivePalette.primary, 0.9),
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: effectivePalette.secondary,
        light: isDark ? alpha(effectivePalette.secondary, 0.3) : alpha(effectivePalette.secondary, 0.1), 
        dark: alpha(effectivePalette.secondary, 0.9),
        contrastText: '#FFFFFF',
      },
      success: {
        main: isDark ? '#10B981' : '#059669',
        light: isDark ? alpha('#10B981', 0.3) : alpha('#059669', 0.1),
        dark: alpha('#059669', 0.9),
      },
      warning: {
        main: effectivePalette.tertiary,
        light: isDark ? alpha(effectivePalette.tertiary, 0.3) : alpha(effectivePalette.tertiary, 0.1),
        dark: alpha(effectivePalette.tertiary, 0.9),
      },
      error: {
        main: isDark ? '#F87171' : '#DC2626',
        light: isDark ? alpha('#F87171', 0.3) : alpha('#DC2626', 0.1),
        dark: alpha('#DC2626', 0.9),
      },
      background: {
        default: effectivePalette.background,
        paper: isDark ? alpha('#1E293B', 0.8) : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F1F5F9' : '#0F172A',
        secondary: isDark ? '#CBD5E1' : '#475569',
        disabled: isDark ? '#64748B' : '#94A3B8',
      },
      divider: isDark ? alpha('#CBD5E1', 0.1) : alpha('#0F172A', 0.06),
      action: {
        hover: isDark ? alpha('#F1F5F9', 0.04) : alpha('#0F172A', 0.04),
        selected: isDark ? alpha('#F1F5F9', 0.08) : alpha('#0F172A', 0.08),
        disabled: isDark ? alpha('#F1F5F9', 0.3) : alpha('#0F172A', 0.26),
        disabledBackground: isDark ? alpha('#F1F5F9', 0.12) : alpha('#0F172A', 0.12),
      },
    },
    
    gradient: {
      primary: `linear-gradient(135deg, ${effectivePalette.gradient[0]} 0%, ${effectivePalette.gradient[1]} 100%)`,
      secondary: `linear-gradient(135deg, ${effectivePalette.gradient[1]} 0%, ${effectivePalette.tertiary} 100%)`,
      success: isDark 
        ? `linear-gradient(135deg, #10B981 0%, #34D399 100%)`
        : `linear-gradient(135deg, #059669 0%, #10B981 100%)`,
      error: isDark
        ? `linear-gradient(135deg, #F87171 0%, #FCA5A5 100%)`
        : `linear-gradient(135deg, #DC2626 0%, #EF4444 100%)`,
    },
    
    typography: {
      fontFamily: direction === 'rtl' 
        ? "'Tajawal', 'Cairo', 'IBM Plex Sans Arabic', 'Noto Sans Arabic', sans-serif"
        : "'Inter', 'Poppins', 'SF Pro Display', 'Segoe UI', 'Roboto', sans-serif",
      
      // Font smoothing for better Arabic rendering
      fontDisplay: 'swap',
      fontFeatureSettings: direction === 'rtl' 
        ? "'liga' 1, 'kern' 1, 'ss01' 1"
        : "'liga' 1, 'kern' 1",
      
      h1: {
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: direction === 'rtl' ? 700 : 800,
        lineHeight: direction === 'rtl' ? 1.2 : 1.1,
        letterSpacing: direction === 'rtl' ? '0.01em' : '-0.025em',
        textAlign: direction === 'rtl' ? 'right' : 'left',
      },
      h2: {
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: direction === 'rtl' ? 600 : 700,
        lineHeight: direction === 'rtl' ? 1.3 : 1.2,
        letterSpacing: direction === 'rtl' ? '0.005em' : '-0.02em',
        textAlign: direction === 'rtl' ? 'right' : 'left',
      },
      h3: {
        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
        fontWeight: direction === 'rtl' ? 600 : 700,
        lineHeight: direction === 'rtl' ? 1.4 : 1.3,
        letterSpacing: direction === 'rtl' ? '0.005em' : '-0.015em',
        textAlign: direction === 'rtl' ? 'right' : 'left',
      },
      h4: {
        fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
        fontWeight: direction === 'rtl' ? 500 : 600,
        lineHeight: direction === 'rtl' ? 1.4 : 1.3,
        letterSpacing: direction === 'rtl' ? '0.005em' : '0',
        textAlign: direction === 'rtl' ? 'right' : 'left',
      },
      h5: {
        fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
        fontWeight: direction === 'rtl' ? 500 : 600,
        lineHeight: direction === 'rtl' ? 1.5 : 1.4,
        letterSpacing: direction === 'rtl' ? '0.005em' : '0',
        textAlign: direction === 'rtl' ? 'right' : 'left',
      },
      h6: {
        fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
        fontWeight: direction === 'rtl' ? 500 : 600,
        lineHeight: direction === 'rtl' ? 1.5 : 1.4,
        letterSpacing: direction === 'rtl' ? '0.005em' : '0',
        textAlign: direction === 'rtl' ? 'right' : 'left',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: direction === 'rtl' ? 1.8 : 1.7,
        fontWeight: direction === 'rtl' ? 400 : 400,
        letterSpacing: direction === 'rtl' ? '0.01em' : '0',
        textAlign: direction === 'rtl' ? 'right' : 'left',
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: direction === 'rtl' ? 1.7 : 1.6,
        fontWeight: direction === 'rtl' ? 400 : 400,
        letterSpacing: direction === 'rtl' ? '0.01em' : '0',
        textAlign: direction === 'rtl' ? 'right' : 'left',
      },
      button: {
        fontWeight: direction === 'rtl' ? 500 : 600,
        fontSize: '0.875rem',
        textTransform: 'none',
        letterSpacing: direction === 'rtl' ? '0.01em' : '0.025em',
        fontFamily: direction === 'rtl' 
          ? "'Tajawal', 'Cairo', sans-serif"
          : "'Inter', 'Poppins', sans-serif",
      },
    },
    
    shape: {
      borderRadius: 16,
    },
    
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            textTransform: 'none',
            fontWeight: direction === 'rtl' ? 500 : 600,
            fontSize: '0.875rem',
            padding: direction === 'rtl' ? '12px 24px' : '12px 32px',
            boxShadow: 'none',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            fontFamily: direction === 'rtl' 
              ? "'Tajawal', 'Cairo', sans-serif"
              : "'Inter', 'Poppins', sans-serif",
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: isDark 
                ? `0 8px 32px ${alpha(effectivePalette.primary, 0.3)}`
                : `0 8px 32px ${alpha(effectivePalette.primary, 0.15)}`,
            },
          },
          contained: {
            background: `linear-gradient(135deg, ${effectivePalette.gradient[0]} 0%, ${effectivePalette.gradient[1]} 100%)`,
            color: '#FFFFFF',
            '&:hover': {
              background: `linear-gradient(135deg, ${alpha(effectivePalette.gradient[0], 0.9)} 0%, ${alpha(effectivePalette.gradient[1], 0.9)} 100%)`,
            },
          },
          outlined: {
            borderWidth: 2,
            borderColor: isDark ? alpha(effectivePalette.primary, 0.3) : alpha(effectivePalette.primary, 0.2),
            color: effectivePalette.primary,
            '&:hover': {
              borderWidth: 2,
              borderColor: effectivePalette.primary,
              backgroundColor: isDark ? alpha(effectivePalette.primary, 0.1) : alpha(effectivePalette.primary, 0.04),
            },
          },
          sizeSmall: {
            padding: direction === 'rtl' ? '8px 16px' : '8px 20px',
            fontSize: '0.8125rem',
          },
          sizeLarge: {
            padding: direction === 'rtl' ? '16px 32px' : '16px 40px',
            fontSize: '1rem',
          },
        },
      },
      
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            border: isDark 
              ? `1px solid ${alpha('#F1F5F9', 0.1)}` 
              : `1px solid ${alpha('#0F172A', 0.04)}`,
            boxShadow: isDark 
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(15, 23, 42, 0.08)',
            backgroundColor: isDark 
              ? alpha('#1E293B', 0.6)
              : '#FFFFFF',
            backdropFilter: 'blur(16px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            direction: direction,
            textAlign: direction === 'rtl' ? 'right' : 'left',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: isDark 
                ? '0 20px 64px rgba(0, 0, 0, 0.5)'
                : '0 20px 64px rgba(15, 23, 42, 0.15)',
              borderColor: isDark 
                ? alpha('#F1F5F9', 0.2)
                : alpha(effectivePalette.primary, 0.1),
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
            borderRadius: 20,
            backgroundColor: isDark 
              ? alpha('#1E293B', 0.8)
              : '#FFFFFF',
            backgroundImage: 'none',
          },
          elevation1: {
            boxShadow: isDark 
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(15, 23, 42, 0.08)',
          },
          elevation2: {
            boxShadow: isDark 
              ? '0 12px 48px rgba(0, 0, 0, 0.4)'
              : '0 12px 48px rgba(15, 23, 42, 0.12)',
          },
          elevation3: {
            boxShadow: isDark 
              ? '0 16px 64px rgba(0, 0, 0, 0.5)'
              : '0 16px 64px rgba(15, 23, 42, 0.15)',
          },
        },
      },
      
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: direction === 'rtl' ? 400 : 500,
            fontFamily: direction === 'rtl' 
              ? "'Tajawal', 'Cairo', sans-serif"
              : "'Inter', 'Poppins', sans-serif",
            direction: direction,
          },
        },
      },
      
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundColor: isDark 
                ? alpha(effectivePalette.primary, 0.1)
                : alpha(effectivePalette.primary, 0.04),
            },
            '& .MuiSvgIcon-root': {
              transform: direction === 'rtl' ? 'scaleX(-1)' : 'none',
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
            borderBottom: `1px solid ${alpha(isDark ? '#F1F5F9' : '#0F172A', 0.08)}`,
            backdropFilter: 'blur(24px)',
            backgroundColor: isDark 
              ? alpha(effectivePalette.background, 0.8)
              : alpha('#FFFFFF', 0.85),
          },
        },
      },
      
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: direction === 'rtl' ? 500 : 600,
            borderRadius: 8,
            transition: 'all 0.2s ease-in-out',
            fontFamily: direction === 'rtl' 
              ? "'Tajawal', 'Cairo', sans-serif"
              : "'Inter', 'Poppins', sans-serif",
            '&.Mui-selected': {
              backgroundColor: alpha(effectivePalette.primary, 0.08),
            },
          },
        },
      },
      
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            height: 8,
            backgroundColor: alpha(effectivePalette.primary, 0.1),
            direction: direction,
          },
          bar: {
            borderRadius: 4,
            background: `linear-gradient(${direction === 'rtl' ? '270deg' : '90deg'}, ${effectivePalette.gradient[0]} 0%, ${effectivePalette.gradient[1]} 100%)`,
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