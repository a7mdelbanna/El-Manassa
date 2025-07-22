import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Common
      welcome: 'Welcome',
      home: 'Home',
      dashboard: 'Dashboard',
      courses: 'Courses',
      students: 'Students',
      analytics: 'Analytics',
      settings: 'Settings',
      profile: 'Profile',
      logout: 'Logout',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      search: 'Search',
      filter: 'Filter',
      
      // Dashboard
      welcomeTeacher: 'Welcome back, {{name}}',
      todayOverview: "Today's Overview",
      activeStudents: 'Active Students',
      totalCourses: 'Total Courses',
      monthlyRevenue: 'Monthly Revenue',
      completionRate: 'Completion Rate',
      recentActivity: 'Recent Activity',
      viewAll: 'View All',
      
      // Courses
      createCourse: 'Create Course',
      courseTitle: 'Course Title',
      courseDescription: 'Course Description',
      price: 'Price',
      duration: 'Duration',
      lessons: 'Lessons',
      enrolled: 'Enrolled',
      published: 'Published',
      draft: 'Draft',
      
      // Students
      studentName: 'Student Name',
      enrollmentDate: 'Enrollment Date',
      progress: 'Progress',
      lastActive: 'Last Active',
      grade: 'Grade',
      
      // Analytics
      performanceOverview: 'Performance Overview',
      enrollmentTrends: 'Enrollment Trends',
      revenueAnalysis: 'Revenue Analysis',
      studentEngagement: 'Student Engagement',
      exportReport: 'Export Report',
      
      // Settings
      generalSettings: 'General Settings',
      appearance: 'Appearance',
      notifications: 'Notifications',
      security: 'Security',
      billing: 'Billing',
      language: 'Language',
      theme: 'Theme',
      darkMode: 'Dark Mode',
    },
  },
  ar: {
    translation: {
      // Common
      welcome: 'مرحباً',
      home: 'الرئيسية',
      dashboard: 'لوحة التحكم',
      courses: 'الدورات',
      students: 'الطلاب',
      analytics: 'التحليلات',
      settings: 'الإعدادات',
      profile: 'الملف الشخصي',
      logout: 'تسجيل الخروج',
      save: 'حفظ',
      cancel: 'إلغاء',
      edit: 'تعديل',
      delete: 'حذف',
      search: 'بحث',
      filter: 'تصفية',
      
      // Dashboard
      welcomeTeacher: 'مرحباً بعودتك، {{name}}',
      todayOverview: 'نظرة عامة على اليوم',
      activeStudents: 'الطلاب النشطون',
      totalCourses: 'إجمالي الدورات',
      monthlyRevenue: 'الإيرادات الشهرية',
      completionRate: 'معدل الإكمال',
      recentActivity: 'النشاط الأخير',
      viewAll: 'عرض الكل',
      
      // Courses
      createCourse: 'إنشاء دورة',
      courseTitle: 'عنوان الدورة',
      courseDescription: 'وصف الدورة',
      price: 'السعر',
      duration: 'المدة',
      lessons: 'الدروس',
      enrolled: 'مسجل',
      published: 'منشور',
      draft: 'مسودة',
      
      // Students
      studentName: 'اسم الطالب',
      enrollmentDate: 'تاريخ التسجيل',
      progress: 'التقدم',
      lastActive: 'آخر نشاط',
      grade: 'الصف',
      
      // Analytics
      performanceOverview: 'نظرة عامة على الأداء',
      enrollmentTrends: 'اتجاهات التسجيل',
      revenueAnalysis: 'تحليل الإيرادات',
      studentEngagement: 'مشاركة الطلاب',
      exportReport: 'تصدير التقرير',
      
      // Settings
      generalSettings: 'الإعدادات العامة',
      appearance: 'المظهر',
      notifications: 'الإشعارات',
      security: 'الأمان',
      billing: 'الفوترة',
      language: 'اللغة',
      theme: 'السمة',
      darkMode: 'الوضع الليلي',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // Default to Arabic
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;