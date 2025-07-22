import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
  alpha,
  Badge,
  Tooltip,
  Switch,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  School,
  People,
  Analytics,
  Settings,
  Logout,
  Notifications,
  DarkMode,
  LightMode,
  Language,
  Palette,
  ExpandLess,
  ExpandMore,
  VideoLibrary,
  Quiz,
  Assignment,
  LiveTv,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../../store/themeStore';
import { colorPalettes } from '../../theme/theme';
import { GradientText } from '../common/AnimatedBackground';

const drawerWidth = 280;

interface NavItem {
  title: string;
  icon: React.ReactNode;
  path: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { title: 'dashboard', icon: <Dashboard />, path: '/dashboard' },
  {
    title: 'courses',
    icon: <School />,
    path: '/courses',
    children: [
      { title: 'allCourses', icon: <VideoLibrary />, path: '/courses/all' },
      { title: 'liveClasses', icon: <LiveTv />, path: '/courses/live' },
      { title: 'assignments', icon: <Assignment />, path: '/courses/assignments' },
      { title: 'quizzes', icon: <Quiz />, path: '/courses/quizzes' },
    ],
  },
  { title: 'students', icon: <People />, path: '/students' },
  { title: 'analytics', icon: <Analytics />, path: '/analytics' },
  { title: 'settings', icon: <Settings />, path: '/settings' },
];

export const DashboardLayout: React.FC = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { currentPalette, mode, direction, setPalette, toggleMode, toggleDirection } = useThemeStore();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [paletteMenuAnchor, setPaletteMenuAnchor] = useState<null | HTMLElement>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handlePaletteMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPaletteMenuAnchor(event.currentTarget);
  };
  
  const handlePaletteMenuClose = () => {
    setPaletteMenuAnchor(null);
  };
  
  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };
  
  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo Section */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background: theme.gradient?.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
            }}
          >
            م
          </Box>
        </motion.div>
        <Typography variant="h6" fontWeight="bold">
          <GradientText>المنصة</GradientText>
        </Typography>
      </Box>
      
      {/* Navigation */}
      <List sx={{ flex: 1, px: 2, py: 3 }}>
        {navItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  if (item.children) {
                    toggleExpanded(item.title);
                  } else {
                    navigate(item.path);
                    if (isMobile) setMobileOpen(false);
                  }
                }}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    background: theme.gradient?.primary,
                    color: 'white',
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: location.pathname === item.path ? 'inherit' : theme.palette.text.secondary,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={t(item.title)} />
                {item.children && (
                  expandedItems.includes(item.title) ? <ExpandLess /> : <ExpandMore />
                )}
              </ListItemButton>
            </ListItem>
            
            {item.children && (
              <Collapse in={expandedItems.includes(item.title)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 2 }}>
                  {item.children.map((child) => (
                    <ListItem key={child.title} disablePadding sx={{ mb: 0.5 }}>
                      <ListItemButton
                        onClick={() => {
                          navigate(child.path);
                          if (isMobile) setMobileOpen(false);
                        }}
                        selected={location.pathname === child.path}
                        sx={{
                          borderRadius: 1.5,
                          py: 1,
                          '&.Mui-selected': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.12),
                            color: theme.palette.primary.main,
                            '& .MuiListItemIcon-root': {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 36,
                            color: location.pathname === child.path 
                              ? theme.palette.primary.main 
                              : theme.palette.text.secondary,
                          }}
                        >
                          {child.icon}
                        </ListItemIcon>
                        <ListItemText primary={t(child.title)} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </motion.div>
        ))}
      </List>
      
      {/* User Section */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
          }}
          onClick={handleProfileMenuOpen}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: theme.gradient?.primary,
            }}
          >
            م
          </Avatar>
          <Box flex={1}>
            <Typography variant="body2" fontWeight="medium">
              د. محمد أحمد
            </Typography>
            <Typography variant="caption" color="text.secondary">
              مدرس
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: alpha(theme.palette.background.default, 0.8),
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {/* Theme Controls */}
          <Tooltip title={t('language')}>
            <IconButton
              onClick={() => {
                toggleDirection();
                i18n.changeLanguage(direction === 'ltr' ? 'ar' : 'en');
              }}
              sx={{ mx: 0.5 }}
            >
              <Language />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={t('theme')}>
            <IconButton onClick={handlePaletteMenuOpen} sx={{ mx: 0.5 }}>
              <Palette />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={t('darkMode')}>
            <IconButton onClick={toggleMode} sx={{ mx: 0.5 }}>
              {mode === 'dark' ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title={t('notifications')}>
            <IconButton sx={{ mx: 0.5 }}>
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      
      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: theme.palette.background.paper,
              borderRight: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: theme.palette.background.paper,
              borderRight: 'none',
              boxShadow: `4px 0 24px ${alpha(theme.palette.common.black, 0.04)}`,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </Box>
      
      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: theme.shadows[8],
          },
        }}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <People fontSize="small" />
          </ListItemIcon>
          {t('profile')}
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {t('settings')}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('logout')}
        </MenuItem>
      </Menu>
      
      {/* Palette Menu */}
      <Menu
        anchorEl={paletteMenuAnchor}
        open={Boolean(paletteMenuAnchor)}
        onClose={handlePaletteMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: theme.shadows[8],
          },
        }}
      >
        {Object.entries(colorPalettes).map(([key, palette]) => (
          <MenuItem
            key={key}
            onClick={() => {
              setPalette(key);
              handlePaletteMenuClose();
            }}
            selected={currentPalette === key}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: 1,
                  background: `linear-gradient(135deg, ${palette.gradient[0]} 0%, ${palette.gradient[1]} 100%)`,
                }}
              />
              <Typography>{palette.name}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};