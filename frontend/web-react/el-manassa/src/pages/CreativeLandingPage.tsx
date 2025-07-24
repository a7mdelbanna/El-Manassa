import React, { useState } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  useMediaQuery,
  alpha,
  Stack,
  Chip,
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
  PlayArrow,
  Palette,
  AutoAwesome,
  Rocket,
  Psychology,
  EmojiEvents,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { createAppTheme, colorPalettes } from '../theme/theme';
import { useThemeStore } from '../store/themeStore';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../i18n/config';
import {
  FloatingParticles,
  MorphingBlob,
  FloatingCard3D,
  MagneticButton,
  GlassContainer,
  AnimatedCounter,
  ScrollReveal,
  CursorGlow,
} from '../components/common/CreativeAnimations';

// Creative Hero Section
const CreativeHero: React.FC = () => {
  const { t } = useTranslation();
  const { direction } = useThemeStore();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
      }}
    >
      {/* Animated Background Elements */}
      <FloatingParticles count={80} color="rgba(59, 130, 246, 0.3)" />
      
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          [direction === 'rtl' ? 'left' : 'right']: '10%',
          zIndex: 0,
        }}
      >
        <MorphingBlob 
          colors={['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981']} 
          size={300} 
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          [direction === 'rtl' ? 'right' : 'left']: '5%',
          zIndex: 0,
        }}
      >
        <MorphingBlob 
          colors={['#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']} 
          size={200} 
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={6} alignItems="center" direction={direction === 'rtl' ? 'row-reverse' : 'row'}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: direction === 'rtl' ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={direction === 'rtl' ? 'slide-in-right' : 'slide-in-left'}
            >
              <Box sx={{ mb: 3 }}>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{ display: 'inline-block' }}
                >
                  <AutoAwesome sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                </motion.div>
              </Box>

              <Typography
                variant={isMobile ? 'h3' : 'h1'}
                fontWeight={direction === 'rtl' ? 700 : 800}
                gutterBottom
                sx={{ 
                  lineHeight: direction === 'rtl' ? 1.3 : 1.1,
                  textAlign: direction === 'rtl' ? 'right' : 'left',
                  fontFamily: direction === 'rtl' 
                    ? "'Tajawal', 'Cairo', sans-serif"
                    : "'Inter', 'Poppins', sans-serif",
                  background: `linear-gradient(${direction === 'rtl' ? '225deg' : '135deg'}, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 3s ease infinite',
                  '@keyframes gradientShift': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                  },
                }}
              >
                {direction === 'rtl' ? (
                  <>
                    منصة <motion.span 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      المنصة
                    </motion.span> التعليمية
                  </>
                ) : (
                  <>
                    Platform <motion.span 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      El-Manassa
                    </motion.span> Educational
                  </>
                )}
              </Typography>
              
              <Typography
                variant={isMobile ? 'h6' : 'h5'}
                color="text.secondary"
                paragraph
                sx={{ 
                  mb: 4, 
                  lineHeight: direction === 'rtl' ? 1.8 : 1.6, 
                  maxWidth: 500,
                  textAlign: direction === 'rtl' ? 'right' : 'left',
                  fontFamily: direction === 'rtl' 
                    ? "'Tajawal', 'Cairo', sans-serif"
                    : "'Inter', 'Poppins', sans-serif",
                }}
              >
                {t('heroSubtitle')}
              </Typography>
              
              <Stack 
                direction={isMobile ? 'column' : (direction === 'rtl' ? 'row-reverse' : 'row')} 
                spacing={3} 
                mb={4}
                sx={{ justifyContent: direction === 'rtl' ? 'flex-end' : 'flex-start' }}
              >
                <MagneticButton variant="primary" direction={direction}>
                  <PlayArrow sx={{ [direction === 'rtl' ? 'ml' : 'mr']: 1 }} />
                  {t('startLearning')}
                </MagneticButton>
                
                <MagneticButton variant="secondary" direction={direction}>
                  <VideoLibrary sx={{ [direction === 'rtl' ? 'ml' : 'mr']: 1 }} />
                  {t('watchDemo')}
                </MagneticButton>
              </Stack>
              
              <Stack 
                direction={direction === 'rtl' ? 'row-reverse' : 'row'} 
                spacing={2} 
                flexWrap="wrap"
                sx={{ justifyContent: direction === 'rtl' ? 'flex-end' : 'flex-start' }}
              >
                {[
                  { icon: <Security />, label: t('secureProtected') },
                  { icon: <Speed />, label: t('fastEfficient') },
                  { icon: <Star />, label: t('highQuality') },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  >
                    <Chip
                      icon={item.icon}
                      label={item.label}
                      variant="outlined"
                      sx={{ 
                        fontWeight: 'medium',
                        borderColor: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'white',
                          transform: 'translateY(-2px)',
                          transition: 'all 0.3s ease',
                        },
                      }}
                    />
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: direction === 'rtl' ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className={direction === 'rtl' ? 'slide-in-left' : 'slide-in-right'}
            >
              <GlassContainer>
                <Grid container spacing={3}>
                  {[
                    { value: 15000, label: direction === 'rtl' ? 'طالب نشط' : 'Active Students', icon: <Group />, delay: 0 },
                    { value: 500, label: direction === 'rtl' ? 'دورة تعليمية' : 'Courses', icon: <School />, delay: 0.1 },
                    { value: 98, label: direction === 'rtl' ? 'نسبة الرضا' : 'Satisfaction', suffix: '%', icon: <EmojiEvents />, delay: 0.2 },
                    { value: 50, label: direction === 'rtl' ? 'معلم خبير' : 'Expert Teachers', icon: <Psychology />, delay: 0.3 },
                  ].map((stat, index) => (
                    <Grid item xs={6} key={index}>
                      <FloatingCard3D delay={stat.delay}>
                        <Card
                          sx={{
                            textAlign: 'center',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.2)',
                              transform: 'translateY(-5px)',
                            },
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ mb: 2, color: 'primary.main' }}>
                              {stat.icon}
                            </Box>
                            <Typography
                              variant="h4"
                              fontWeight="bold"
                              sx={{
                                background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                              }}
                            >
                              <AnimatedCounter 
                                value={stat.value} 
                                suffix={stat.suffix || '+'} 
                                duration={2 + (stat.delay || 0)}
                              />
                            </Typography>
                            <Typography variant="body2" color="text.secondary" fontWeight="medium">
                              {stat.label}
                            </Typography>
                          </CardContent>
                        </Card>
                      </FloatingCard3D>
                    </Grid>
                  ))}
                </Grid>
              </GlassContainer>
            </motion.div>
          </Grid>
        </Grid>

        {/* Floating Down Arrow */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer',
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'primary.main',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.1)',
                transition: 'all 0.3s ease',
              },
            }}
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <PlayArrow sx={{ transform: 'rotate(90deg)' }} />
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

// Creative Features Section
const CreativeFeatures: React.FC = () => {
  const { t } = useTranslation();
  const { direction } = useThemeStore();

  const features = [
    {
      icon: <School sx={{ fontSize: 32 }} />,
      title: t('interactiveCourses'),
      description: t('interactiveCoursesDesc'),
      color: '#3B82F6',
    },
    {
      icon: <VideoLibrary sx={{ fontSize: 32 }} />,
      title: t('highQualityVideos'),
      description: t('highQualityVideosDesc'),
      color: '#8B5CF6',
    },
    {
      icon: <Quiz sx={{ fontSize: 32 }} />,
      title: t('smartTests'),
      description: t('smartTestsDesc'),
      color: '#06B6D4',
    },
    {
      icon: <Assignment sx={{ fontSize: 32 }} />,
      title: t('interactiveAssignments'),
      description: t('interactiveAssignmentsDesc'),
      color: '#10B981',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 32 }} />,
      title: t('progressTracking'),
      description: t('progressTrackingDesc'),
      color: '#F59E0B',
    },
    {
      icon: <Group sx={{ fontSize: 32 }} />,
      title: t('educationalCommunity'),
      description: t('educationalCommunityDesc'),
      color: '#EF4444',
    },
  ];

  return (
    <Box sx={{ py: 10, position: 'relative', overflow: 'hidden' }}>
      <FloatingParticles count={40} color="rgba(139, 92, 246, 0.2)" />
      
      <Container maxWidth="lg">
        <ScrollReveal direction="up">
          <Typography
            variant="h2"
            textAlign="center"
            fontWeight={direction === 'rtl' ? 600 : 700}
            gutterBottom
            sx={{ 
              mb: 2,
              fontFamily: direction === 'rtl' 
                ? "'Tajawal', 'Cairo', sans-serif"
                : "'Inter', 'Poppins', sans-serif",
              background: `linear-gradient(${direction === 'rtl' ? '225deg' : '135deg'}, #3B82F6 0%, #8B5CF6 50%, #10B981 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('exceptionalFeatures')}
          </Typography>
          
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            sx={{ 
              mb: 8, 
              maxWidth: 600, 
              mx: 'auto',
              lineHeight: direction === 'rtl' ? 1.7 : 1.6,
              fontFamily: direction === 'rtl' 
                ? "'Tajawal', 'Cairo', sans-serif"
                : "'Inter', 'Poppins', sans-serif",
            }}
          >
            {t('featuresSubtitle')}
          </Typography>
        </ScrollReveal>
        
        <Grid container spacing={4} direction={direction === 'rtl' ? 'row-reverse' : 'row'}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ScrollReveal 
                direction={direction === 'rtl' 
                  ? (index % 2 === 0 ? 'right' : 'left')
                  : (index % 2 === 0 ? 'left' : 'right')
                } 
                delay={index * 0.1}
              >
                <FloatingCard3D delay={index * 0.2}>
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '24px',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: `linear-gradient(90deg, ${feature.color}, ${feature.color}80)`,
                      },
                      '&:hover': {
                        background: `rgba(${feature.color.replace('#', '')
                          .match(/.{2}/g)
                          ?.map(hex => parseInt(hex, 16))
                          .join(', ')}, 0.1)`,
                        borderColor: feature.color,
                      },
                    }}
                  >
                    <CardContent sx={{ 
                      p: 4, 
                      textAlign: 'center',
                      direction: direction,
                    }}>
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${feature.color}, ${feature.color}80)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            mx: 'auto',
                            mb: 3,
                            boxShadow: `0 10px 30px ${feature.color}40`,
                          }}
                        >
                          {feature.icon}
                        </Box>
                      </motion.div>
                      
                      <Typography 
                        variant="h6" 
                        fontWeight={direction === 'rtl' ? 500 : 600}
                        gutterBottom
                        sx={{
                          fontFamily: direction === 'rtl' 
                            ? "'Tajawal', 'Cairo', sans-serif"
                            : "'Inter', 'Poppins', sans-serif",
                        }}
                      >
                        {feature.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{
                          lineHeight: direction === 'rtl' ? 1.7 : 1.6,
                          fontFamily: direction === 'rtl' 
                            ? "'Tajawal', 'Cairo', sans-serif"
                            : "'Inter', 'Poppins', sans-serif",
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </FloatingCard3D>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// Creative CTA Section
const CreativeCTA: React.FC = () => {
  const { t } = useTranslation();
  const { direction } = useThemeStore();
  
  // Debug: Ensure direction is available
  console.log('CTA Direction:', direction);

  return (
    <Box
      sx={{
        py: 10,
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
        overflow: 'hidden',
      }}
    >
      <FloatingParticles count={60} color="rgba(59, 130, 246, 0.4)" />
      
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
        }}
      >
        <MorphingBlob 
          colors={['#3B82F6', '#8B5CF6', '#06B6D4']} 
          size={600} 
        />
      </Box>

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <ScrollReveal direction="up">
          <GlassContainer>
            <Box sx={{ textAlign: 'center' }}>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{ display: 'inline-block', marginBottom: '2rem' }}
              >
                <Rocket sx={{ fontSize: 60, color: 'primary.main' }} />
              </motion.div>
              
              <Typography
                variant="h3"
                fontWeight={direction === 'rtl' ? 600 : 700}
                gutterBottom
                sx={{
                  fontFamily: direction === 'rtl' 
                    ? "'Tajawal', 'Cairo', sans-serif"
                    : "'Inter', 'Poppins', sans-serif",
                  background: `linear-gradient(${direction === 'rtl' ? '225deg' : '135deg'}, #3B82F6 0%, #8B5CF6 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('readyToStart')}
              </Typography>
              
              <Typography
                variant="h6"
                color="text.secondary"
                paragraph
                sx={{ 
                  mb: 4, 
                  maxWidth: 500, 
                  mx: 'auto',
                  lineHeight: direction === 'rtl' ? 1.7 : 1.6,
                  fontFamily: direction === 'rtl' 
                    ? "'Tajawal', 'Cairo', sans-serif"
                    : "'Inter', 'Poppins', sans-serif",
                }}
              >
                {t('joinThousands')}
              </Typography>
              
              <MagneticButton variant="primary" direction={direction}>
                <PersonAdd sx={{ [direction === 'rtl' ? 'ml' : 'mr']: 1 }} />
                {t('startFreeNow')}
              </MagneticButton>
            </Box>
          </GlassContainer>
        </ScrollReveal>
      </Container>
    </Box>
  );
};

// Main Creative Landing Page Component
export const CreativeLandingPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);
  const [paletteMenuAnchor, setPaletteMenuAnchor] = useState<null | HTMLElement>(null);
  const { currentPalette, mode, direction, setPalette, toggleMode, setDirection } = useThemeStore();
  const { t, i18n } = useTranslation();
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CursorGlow />
      
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {/* Floating Navigation */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Box
            component="nav"
            sx={{
              position: 'fixed',
              top: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              width: '90%',
              maxWidth: 1200,
            }}
          >
            <GlassContainer blur={30} opacity={0.1}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 1,
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Typography
                    variant="h5"
                    fontWeight={direction === 'rtl' ? 500 : 600}
                    sx={{
                      fontFamily: direction === 'rtl' 
                        ? "'Tajawal', 'Cairo', sans-serif"
                        : "'Inter', 'Poppins', sans-serif",
                      background: `linear-gradient(${direction === 'rtl' ? '225deg' : '135deg'}, #3B82F6 0%, #8B5CF6 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    {t('platformName')}
                  </Typography>
                </motion.div>
                
                <Stack 
                  direction={direction === 'rtl' ? 'row-reverse' : 'row'} 
                  spacing={1} 
                  alignItems="center"
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconButton
                      onClick={(e) => setPaletteMenuAnchor(e.currentTarget)}
                      sx={{ 
                        color: 'text.primary',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': { background: 'rgba(255, 255, 255, 0.2)' },
                      }}
                    >
                      <Palette />
                    </IconButton>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconButton
                      onClick={() => {
                        const newDirection = direction === 'rtl' ? 'ltr' : 'rtl';
                        const newLang = newDirection === 'rtl' ? 'ar' : 'en';
                        setDirection(newDirection);
                        i18n.changeLanguage(newLang);
                      }}
                      sx={{ 
                        color: 'text.primary',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': { background: 'rgba(255, 255, 255, 0.2)' },
                      }}
                    >
                      <Language />
                    </IconButton>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconButton
                      onClick={toggleMode}
                      sx={{ 
                        color: 'text.primary',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': { background: 'rgba(255, 255, 255, 0.2)' },
                      }}
                    >
                      {mode === 'dark' ? <LightMode /> : <DarkMode />}
                    </IconButton>
                  </motion.div>
                  
                  <MagneticButton onClick={() => setAuthMode('login')} direction={direction}>
                    <Login sx={{ [direction === 'rtl' ? 'ml' : 'mr']: 1, fontSize: 18 }} />
                    {t('login')}
                  </MagneticButton>
                  
                  <MagneticButton variant="primary" onClick={() => setAuthMode('register')} direction={direction}>
                    <PersonAdd sx={{ [direction === 'rtl' ? 'ml' : 'mr']: 1, fontSize: 18 }} />
                    {t('register')}
                  </MagneticButton>
                </Stack>
              </Box>
            </GlassContainer>
          </Box>
        </motion.div>

        {/* Main Content Sections */}
        <CreativeHero />
        <CreativeFeatures />
        <CreativeCTA />

        {/* Floating Dashboard Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 2, type: 'spring' }}
          style={{
            position: 'fixed',
            bottom: 24,
            [direction === 'rtl' ? 'left' : 'right']: 24,
            zIndex: 1000,
          }}
        >
          <MagneticButton
            onClick={() => navigate('/app/dashboard')}
            variant="primary"
            direction={direction}
          >
            <Dashboard />
          </MagneticButton>
        </motion.div>
        
        {/* Color Palette Menu */}
        <Menu
          anchorEl={paletteMenuAnchor}
          open={Boolean(paletteMenuAnchor)}
          onClose={() => setPaletteMenuAnchor(null)}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
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

        {/* Auth Modal */}
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
                backdropFilter: 'blur(10px)',
              }}
              onClick={() => setAuthMode(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <GlassContainer>
                  <Box sx={{ textAlign: 'center', minWidth: 300 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {authMode === 'login' ? t('login') : t('register')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {direction === 'rtl' ? 'قريباً سيتم إطلاق نظام التسجيل الكامل' : 'Coming soon - full registration system'}
                    </Typography>
                    <MagneticButton
                      onClick={() => setAuthMode(null)}
                      variant="primary"
                      direction={direction}
                    >
                      {direction === 'rtl' ? 'حسناً' : 'OK'}
                    </MagneticButton>
                  </Box>
                </GlassContainer>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </ThemeProvider>
  );
};