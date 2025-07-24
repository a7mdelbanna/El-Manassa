import React, { useState } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Fab,
  useMediaQuery,
  alpha,
  Stack,
  Chip,
  Paper,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  School,
  TrendingUp,
  Group,
  VideoLibrary,
  Quiz,
  Assignment,
  Language,
  DarkMode,
  LightMode,
  Login,
  PersonAdd,
  Dashboard,
  Star,
  Security,
  Speed,
  Phone,
  Email,
  LocationOn,
  PlayArrow,
  KeyboardArrowDown,
  Palette,
  ExpandMore,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { createAppTheme, colorPalettes } from '../theme/theme';
import { AnimatedBackground, GradientText, FloatingShapes } from '../components/common/AnimatedBackground';
import { useThemeStore } from '../store/themeStore';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

const AnimatedNumber: React.FC<{ value: number; prefix?: string; suffix?: string }> = ({ 
  value, 
  prefix = '', 
  suffix = '' 
}) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const props = useSpring({
    from: { number: 0 },
    to: { number: inView ? value : 0 },
    config: { duration: 2000 },
  });
  
  return (
    <span ref={ref}>
      {prefix}
      <animated.span>
        {props.number.to((n) => Math.floor(n).toLocaleString('ar-EG'))}
      </animated.span>
      {suffix}
    </span>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}> = ({ icon, title, description, delay = 0 }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Card
        sx={{
          height: '100%',
          textAlign: 'center',
          position: 'relative',
          overflow: 'visible',
          background: hovered ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)' : 'background.paper',
          transition: 'all 0.3s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #0EA5E9 0%, #7C3AED 100%)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          },
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0EA5E9 0%, #7C3AED 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              mx: 'auto',
              mb: 3,
              transform: hovered ? 'rotate(10deg) scale(1.1)' : 'none',
              transition: 'transform 0.3s ease',
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const StatCard: React.FC<{
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  delay?: number;
}> = ({ value, label, prefix, suffix, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            background: 'linear-gradient(135deg, #0EA5E9 0%, #7C3AED 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
        </Typography>
        <Typography variant="body1" color="text.secondary" fontWeight="medium">
          {label}
        </Typography>
      </Paper>
    </motion.div>
  );
};

export const LandingPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);
  const [paletteMenuAnchor, setPaletteMenuAnchor] = useState<null | HTMLElement>(null);
  const { currentPalette, mode, direction, setPalette, toggleMode, setDirection } = useThemeStore();
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  
  // Sync direction with i18n on initial load
  React.useEffect(() => {
    const currentLang = i18n.language;
    const expectedDirection = currentLang === 'ar' ? 'rtl' : 'ltr';
    if (direction !== expectedDirection) {
      setDirection(expectedDirection);
    }
  }, [i18n.language, direction, setDirection]);
  
  const theme = createAppTheme(
    colorPalettes[currentPalette],
    mode,
    direction
  );
  
  const features = [
    {
      icon: <School sx={{ fontSize: 32 }} />,
      title: t('interactiveCourses'),
      description: t('interactiveCoursesDesc')
    },
    {
      icon: <VideoLibrary sx={{ fontSize: 32 }} />,
      title: t('highQualityVideos'),
      description: t('highQualityVideosDesc')
    },
    {
      icon: <Quiz sx={{ fontSize: 32 }} />,
      title: t('smartTests'),
      description: t('smartTestsDesc')
    },
    {
      icon: <Assignment sx={{ fontSize: 32 }} />,
      title: t('interactiveAssignments'),
      description: t('interactiveAssignmentsDesc')
    },
    {
      icon: <TrendingUp sx={{ fontSize: 32 }} />,
      title: t('progressTracking'),
      description: t('progressTrackingDesc')
    },
    {
      icon: <Group sx={{ fontSize: 32 }} />,
      title: t('educationalCommunity'),
      description: t('educationalCommunityDesc')
    },
  ];
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <AnimatedBackground variant="gradient" intensity={0.3} />
        <FloatingShapes />
        
        {/* Navigation */}
        <Box
          component="nav"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backdropFilter: 'blur(20px)',
            backgroundColor: alpha(theme.palette.background.default, 0.8),
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 2,
              }}
            >
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    background: 'linear-gradient(135deg, #0EA5E9 0%, #7C3AED 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {t('platformName')}
                </Typography>
              </motion.div>
              
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton
                  onClick={(e) => setPaletteMenuAnchor(e.currentTarget)}
                  sx={{ color: 'text.primary' }}
                  title="Color Palette"
                >
                  <Palette />
                </IconButton>
                <IconButton
                  onClick={() => {
                    const newDirection = direction === 'rtl' ? 'ltr' : 'rtl';
                    const newLang = newDirection === 'rtl' ? 'ar' : 'en';
                    setDirection(newDirection);
                    i18n.changeLanguage(newLang);
                  }}
                  sx={{ color: 'text.primary' }}
                  title={direction === 'rtl' ? 'English' : 'العربية'}
                >
                  <Language />
                </IconButton>
                <IconButton
                  onClick={toggleMode}
                  sx={{ color: 'text.primary' }}
                  title={mode === 'dark' ? t('theme') : t('darkMode')}
                >
                  {mode === 'dark' ? <LightMode /> : <DarkMode />}
                </IconButton>
                <Button
                  variant="outlined"
                  startIcon={<Login />}
                  onClick={() => setAuthMode('login')}
                  sx={{ ml: 1 }}
                >
                  {t('login')}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PersonAdd />}
                  onClick={() => setAuthMode('register')}
                  sx={{
                    background: 'linear-gradient(135deg, #0EA5E9 0%, #7C3AED 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0284C7 0%, #6D28D9 100%)',
                    },
                  }}
                >
                  {t('register')}
                </Button>
              </Stack>
            </Box>
          </Container>
        </Box>
        
        {/* Hero Section */}
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            pt: 10,
            position: 'relative',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Typography
                    variant={isMobile ? 'h3' : 'h1'}
                    fontWeight="bold"
                    gutterBottom
                    sx={{ lineHeight: 1.2 }}
                  >
                    {direction === 'rtl' ? 'منصة' : 'Platform'}
                    <GradientText>
                      {direction === 'rtl' ? ' المنصة ' : ' El-Manassa '}
                    </GradientText>
                    {direction === 'rtl' ? 'التعليمية' : 'Educational'}
                  </Typography>
                  
                  <Typography
                    variant={isMobile ? 'h6' : 'h5'}
                    color="text.secondary"
                    paragraph
                    sx={{ mb: 4, lineHeight: 1.6 }}
                  >
                    {t('heroSubtitle')}
                  </Typography>
                  
                  <Stack direction={isMobile ? 'column' : 'row'} spacing={2} mb={4}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<PlayArrow />}
                        onClick={() => setAuthMode('register')}
                        sx={{
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          background: 'linear-gradient(135deg, #0EA5E9 0%, #7C3AED 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #0284C7 0%, #6D28D9 100%)',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        {t('startLearning')}
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<VideoLibrary />}
                        onClick={() => scrollToSection('features')}
                        sx={{
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          borderWidth: 2,
                          '&:hover': {
                            borderWidth: 2,
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        {t('watchDemo')}
                      </Button>
                    </motion.div>
                  </Stack>
                  
                  <Stack direction="row" spacing={3} flexWrap="wrap">
                    <Chip
                      icon={<Security />}
                      label={t('secureProtected')}
                      variant="outlined"
                      sx={{ fontWeight: 'medium' }}
                    />
                    <Chip
                      icon={<Speed />}
                      label={t('fastEfficient')}
                      variant="outlined"
                      sx={{ fontWeight: 'medium' }}
                    />
                    <Chip
                      icon={<Star />}
                      label={t('highQuality')}
                      variant="outlined"
                      sx={{ fontWeight: 'medium' }}
                    />
                  </Stack>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: -20,
                        left: -20,
                        right: 20,
                        bottom: 20,
                        background: 'linear-gradient(135deg, #0EA5E9 0%, #7C3AED 100%)',
                        borderRadius: 4,
                        opacity: 0.1,
                        zIndex: -1,
                      },
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <StatCard value={15000} label={direction === 'rtl' ? 'طالب نشط' : 'Active Students'} suffix="+" delay={0.1} />
                      </Grid>
                      <Grid item xs={6}>
                        <StatCard value={500} label={direction === 'rtl' ? 'دورة تعليمية' : 'Educational Courses'} suffix="+" delay={0.2} />
                      </Grid>
                      <Grid item xs={6}>
                        <StatCard value={98} label={t('satisfaction')} suffix="%" delay={0.3} />
                      </Grid>
                      <Grid item xs={6}>
                        <StatCard value={50} label={t('expertTeachers')} suffix="+" delay={0.4} />
                      </Grid>
                    </Grid>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                bottom: 30,
                left: '50%',
                transform: 'translateX(-50%)',
                cursor: 'pointer',
              }}
              onClick={() => scrollToSection('features')}
            >
              <IconButton
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <KeyboardArrowDown sx={{ fontSize: 32 }} />
              </IconButton>
            </motion.div>
          </Container>
        </Box>
        
        {/* Features Section */}
        <Box id="features" sx={{ py: 10, bg: 'background.paper' }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                textAlign="center"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 2 }}
              >
                <GradientText>{t('exceptionalFeatures')}</GradientText>
              </Typography>
              
              <Typography
                variant="h6"
                textAlign="center"
                color="text.secondary"
                sx={{ mb: 8, maxWidth: 600, mx: 'auto' }}
              >
                {t('featuresSubtitle')}
              </Typography>
            </motion.div>
            
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    delay={index * 0.1}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        
        {/* CTA Section */}
        <Box
          sx={{
            py: 10,
            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)',
            position: 'relative',
          }}
        >
          <Container maxWidth="md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h3"
                textAlign="center"
                fontWeight="bold"
                gutterBottom
              >
                {t('readyToStart')}
              </Typography>
              
              <Typography
                variant="h6"
                textAlign="center"
                color="text.secondary"
                paragraph
                sx={{ mb: 4 }}
              >
                {t('joinThousands')}
              </Typography>
              
              <Box sx={{ textAlign: 'center' }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PersonAdd />}
                    onClick={() => setAuthMode('register')}
                    sx={{
                      px: 6,
                      py: 2,
                      fontSize: '1.2rem',
                      background: 'linear-gradient(135deg, #0EA5E9 0%, #7C3AED 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #0284C7 0%, #6D28D9 100%)',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 24px rgba(14, 165, 233, 0.3)',
                      },
                    }}
                  >
                    {t('startFreeNow')}
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Container>
        </Box>
        
        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 6,
            background: 'background.paper',
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {t('educationalPlatformFooter')}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {t('aboutPlatform')}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <Phone />
                  </IconButton>
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <Email />
                  </IconButton>
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <LocationOn />
                  </IconButton>
                </Stack>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <Grid container spacing={4}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {t('services')}
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">{t('coursesMenu')}</Typography>
                      <Typography variant="body2" color="text.secondary">{t('tests')}</Typography>
                      <Typography variant="body2" color="text.secondary">{t('assignments')}</Typography>
                    </Stack>
                  </Grid>
                  
                  <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {t('support')}
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">{t('help')}</Typography>
                      <Typography variant="body2" color="text.secondary">{t('contact')}</Typography>
                      <Typography variant="body2" color="text.secondary">{t('faq')}</Typography>
                    </Stack>
                  </Grid>
                  
                  <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {t('company')}
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">{t('aboutUs')}</Typography>
                      <Typography variant="body2" color="text.secondary">{t('blog')}</Typography>
                      <Typography variant="body2" color="text.secondary">{t('jobs')}</Typography>
                    </Stack>
                  </Grid>
                  
                  <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {t('legal')}
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">{t('privacy')}</Typography>
                      <Typography variant="body2" color="text.secondary">{t('terms')}</Typography>
                      <Typography variant="body2" color="text.secondary">{t('cookies')}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            
            <Box
              sx={{
                mt: 4,
                pt: 4,
                borderTop: `1px solid ${theme.palette.divider}`,
                textAlign: 'center',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                © 2024 {t('platformName')} {t('educationalPlatform')}. {t('allRightsReserved')}.
              </Typography>
            </Box>
          </Container>
        </Box>
        
        {/* Floating Dashboard Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1, type: 'spring' }}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <Fab
            color="primary"
            sx={{
              background: 'linear-gradient(135deg, #0EA5E9 0%, #7C3AED 100%)',
              '&:hover': {
                transform: 'scale(1.1)',
                background: 'linear-gradient(135deg, #0284C7 0%, #6D28D9 100%)',
              },
            }}
            onClick={() => navigate('/app/dashboard')}
          >
            <Dashboard />
          </Fab>
        </motion.div>
        
        {/* Auth Modal (placeholder) */}
        <AnimatePresence>
          {authMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 2000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => setAuthMode(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Paper
                  sx={{
                    p: 4,
                    maxWidth: 400,
                    width: '90vw',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {authMode === 'login' ? t('login') : t('register')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {direction === 'rtl' ? 'قريباً سيتم إطلاق نظام التسجيل الكامل' : 'Coming soon - full registration system'}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => setAuthMode(null)}
                    sx={{
                      background: 'linear-gradient(135deg, #0EA5E9 0%, #7C3AED 100%)',
                    }}
                  >
                    {direction === 'rtl' ? 'حسناً' : 'OK'}
                  </Button>
                </Paper>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Color Palette Menu */}
        <Menu
          anchorEl={paletteMenuAnchor}
          open={Boolean(paletteMenuAnchor)}
          onClose={() => setPaletteMenuAnchor(null)}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: `0 8px 32px ${alpha('#000', 0.1)}`,
            },
          }}
        >
          <MenuItem disabled>
            <Typography variant="subtitle2" fontWeight="bold">
              {direction === 'rtl' ? 'اختر لوحة الألوان' : 'Choose Color Palette'}
            </Typography>
          </MenuItem>
          <Divider sx={{ my: 1 }} />
          {Object.entries(colorPalettes).map(([key, palette]) => (
            <MenuItem
              key={key}
              onClick={() => {
                setPalette(key);
                setPaletteMenuAnchor(null);
              }}
              selected={currentPalette === key}
              sx={{
                py: 1.5,
                '&.Mui-selected': {
                  backgroundColor: alpha(palette.primary, 0.1),
                },
              }}
            >
              <ListItemIcon>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${palette.gradient[0]} 0%, ${palette.gradient[1]} 100%)`,
                    border: currentPalette === key ? `2px solid ${palette.primary}` : `2px solid transparent`,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={palette.name}
                primaryTypographyProps={{
                  fontWeight: currentPalette === key ? 'bold' : 'normal',
                  fontSize: '0.875rem',
                }}
              />
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </ThemeProvider>
  );
};