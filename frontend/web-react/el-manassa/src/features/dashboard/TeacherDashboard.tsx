import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
  Chip,
  LinearProgress,
  useTheme,
  alpha,
  Tooltip,
  Fab,
} from '@mui/material';
import {
  TrendingUp,
  People,
  School,
  MonetizationOn,
  MoreVert,
  Add,
  ArrowUpward,
  ArrowDownward,
  Schedule,
  Assignment,
  VideoLibrary,
  Quiz,
  Notifications,
  Settings,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { GradientText, FloatingShapes } from '../../components/common/AnimatedBackground';
import { useThemeStore } from '../../store/themeStore';

// Animated number component
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

// Stats card component
const StatsCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: number;
  prefix?: string;
  suffix?: string;
  color: string;
  delay?: number;
}> = ({ title, value, icon, trend, prefix, suffix, color, delay = 0 }) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Card
        sx={{
          height: '100%',
          position: 'relative',
          overflow: 'visible',
          background: hovered
            ? `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`
            : theme.palette.background.paper,
          transition: 'all 0.3s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${color} 0%, ${alpha(color, 0.6)} 100%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          },
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box flex={1}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {title}
              </Typography>
              <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
              </Typography>
              {trend !== undefined && (
                <Box display="flex" alignItems="center" gap={0.5}>
                  {trend > 0 ? (
                    <ArrowUpward sx={{ fontSize: 16, color: 'success.main' }} />
                  ) : (
                    <ArrowDownward sx={{ fontSize: 16, color: 'error.main' }} />
                  )}
                  <Typography
                    variant="body2"
                    color={trend > 0 ? 'success.main' : 'error.main'}
                    fontWeight="medium"
                  >
                    {Math.abs(trend)}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    من الشهر الماضي
                  </Typography>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                transform: hovered ? 'rotate(10deg) scale(1.1)' : 'none',
                transition: 'transform 0.3s ease',
              }}
            >
              {icon}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Activity timeline item
const ActivityItem: React.FC<{
  title: string;
  time: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, time, icon, color }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 5 }}
    >
      <Box display="flex" gap={2} p={2}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            background: alpha(color, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color,
          }}
        >
          {icon}
        </Box>
        <Box flex={1}>
          <Typography variant="body2" fontWeight="medium">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {time}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export const TeacherDashboard: React.FC = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { direction } = useThemeStore();
  const isRTL = direction === 'rtl';
  
  // Sample data for charts
  const revenueData = [
    { month: 'يناير', revenue: 45000 },
    { month: 'فبراير', revenue: 52000 },
    { month: 'مارس', revenue: 48000 },
    { month: 'أبريل', revenue: 61000 },
    { month: 'مايو', revenue: 55000 },
    { month: 'يونيو', revenue: 67000 },
  ];
  
  const enrollmentData = [
    { name: 'الرياضيات', value: 345, color: theme.palette.primary.main },
    { name: 'الفيزياء', value: 280, color: theme.palette.secondary.main },
    { name: 'الكيمياء', value: 200, color: theme.palette.success.main },
    { name: 'الأحياء', value: 150, color: theme.palette.warning.main },
  ];
  
  const weeklyActivityData = [
    { day: 'السبت', students: 120, lessons: 8 },
    { day: 'الأحد', students: 180, lessons: 12 },
    { day: 'الإثنين', students: 160, lessons: 10 },
    { day: 'الثلاثاء', students: 200, lessons: 15 },
    { day: 'الأربعاء', students: 170, lessons: 11 },
    { day: 'الخميس', students: 190, lessons: 13 },
    { day: 'الجمعة', students: 80, lessons: 5 },
  ];
  
  return (
    <Box sx={{ p: 3, position: 'relative', minHeight: '100vh' }}>
      <FloatingShapes />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box mb={4}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            <GradientText>
              {t('welcomeTeacher', { name: 'د. محمد أحمد' })}
            </GradientText>
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {t('todayOverview')} - {format(new Date(), 'EEEE, d MMMM yyyy', { 
              locale: isRTL ? ar : enUS 
            })}
          </Typography>
        </Box>
      </motion.div>
      
      {/* Stats Grid */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title={t('activeStudents')}
            value={1234}
            icon={<People />}
            trend={12}
            color={theme.palette.primary.main}
            delay={0.1}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title={t('totalCourses')}
            value={18}
            icon={<School />}
            trend={5}
            color={theme.palette.secondary.main}
            delay={0.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title={t('monthlyRevenue')}
            value={67000}
            prefix="ج.م "
            icon={<MonetizationOn />}
            trend={8}
            color={theme.palette.success.main}
            delay={0.3}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title={t('completionRate')}
            value={85}
            suffix="%"
            icon={<TrendingUp />}
            trend={-2}
            color={theme.palette.warning.main}
            delay={0.4}
          />
        </Grid>
      </Grid>
      
      {/* Charts Section */}
      <Grid container spacing={3} mb={4}>
        {/* Revenue Chart */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card sx={{ height: 400 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h6" fontWeight="bold">
                    الإيرادات الشهرية
                  </Typography>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
                    <XAxis 
                      dataKey="month" 
                      stroke={theme.palette.text.secondary}
                      style={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke={theme.palette.text.secondary}
                      style={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value / 1000}k`}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: theme.shape.borderRadius,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke={theme.palette.primary.main}
                      strokeWidth={3}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        
        {/* Enrollment Distribution */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card sx={{ height: 400 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  توزيع الطلاب حسب المادة
                </Typography>
                <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={enrollmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {enrollmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                  {enrollmentData.map((item) => (
                    <Chip
                      key={item.name}
                      label={item.name}
                      size="small"
                      sx={{
                        backgroundColor: alpha(item.color, 0.1),
                        color: item.color,
                        fontWeight: 'medium',
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
      
      {/* Activity and Quick Actions */}
      <Grid container spacing={3}>
        {/* Weekly Activity */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  النشاط الأسبوعي
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={weeklyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
                    <XAxis dataKey="day" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <RechartsTooltip />
                    <Bar dataKey="students" fill={theme.palette.primary.main} radius={[8, 8, 0, 0]} />
                    <Bar dataKey="lessons" fill={theme.palette.secondary.main} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        
        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight="bold">
                    {t('recentActivity')}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                  >
                    {t('viewAll')}
                  </Typography>
                </Box>
                <Box>
                  <ActivityItem
                    title="طالب جديد التحق بدورة الرياضيات"
                    time="منذ 5 دقائق"
                    icon={<People sx={{ fontSize: 20 }} />}
                    color={theme.palette.primary.main}
                  />
                  <ActivityItem
                    title="تم إكمال اختبار الفيزياء"
                    time="منذ 15 دقيقة"
                    icon={<Quiz sx={{ fontSize: 20 }} />}
                    color={theme.palette.success.main}
                  />
                  <ActivityItem
                    title="تم رفع درس جديد في الكيمياء"
                    time="منذ ساعة"
                    icon={<VideoLibrary sx={{ fontSize: 20 }} />}
                    color={theme.palette.secondary.main}
                  />
                  <ActivityItem
                    title="تم تقديم واجب الأحياء"
                    time="منذ ساعتين"
                    icon={<Assignment sx={{ fontSize: 20 }} />}
                    color={theme.palette.warning.main}
                  />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
      
      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1, type: 'spring' }}
        style={{
          position: 'fixed',
          bottom: 24,
          right: isRTL ? 'auto' : 24,
          left: isRTL ? 24 : 'auto',
        }}
      >
        <Fab
          color="primary"
          sx={{
            background: theme.gradient?.primary,
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >
          <Add />
        </Fab>
      </motion.div>
    </Box>
  );
};