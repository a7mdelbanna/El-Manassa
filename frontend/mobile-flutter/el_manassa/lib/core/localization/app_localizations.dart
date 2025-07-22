import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:intl/intl.dart';

class AppLocalizations {
  final Locale locale;
  
  AppLocalizations(this.locale);
  
  static AppLocalizations of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations)!;
  }
  
  static const LocalizationsDelegate<AppLocalizations> delegate = _AppLocalizationsDelegate();
  
  // Common strings
  String get appName => _translate('app_name');
  String get welcome => _translate('welcome');
  String get welcomeBack => _translate('welcome_back');
  String get getStarted => _translate('get_started');
  String get continueText => _translate('continue');
  String get next => _translate('next');
  String get back => _translate('back');
  String get done => _translate('done');
  String get cancel => _translate('cancel');
  String get save => _translate('save');
  String get delete => _translate('delete');
  String get edit => _translate('edit');
  String get search => _translate('search');
  String get filter => _translate('filter');
  String get sort => _translate('sort');
  
  // Authentication
  String get login => _translate('login');
  String get logout => _translate('logout');
  String get register => _translate('register');
  String get email => _translate('email');
  String get password => _translate('password');
  String get confirmPassword => _translate('confirm_password');
  String get forgotPassword => _translate('forgot_password');
  String get resetPassword => _translate('reset_password');
  String get rememberMe => _translate('remember_me');
  String get orContinueWith => _translate('or_continue_with');
  
  // Navigation
  String get home => _translate('home');
  String get courses => _translate('courses');
  String get myCourses => _translate('my_courses');
  String get profile => _translate('profile');
  String get settings => _translate('settings');
  String get notifications => _translate('notifications');
  
  // Course related
  String get allCourses => _translate('all_courses');
  String get popularCourses => _translate('popular_courses');
  String get newCourses => _translate('new_courses');
  String get continueWatching => _translate('continue_watching');
  String get enrollNow => _translate('enroll_now');
  String get enrolled => _translate('enrolled');
  String get lessons => _translate('lessons');
  String get hours => _translate('hours');
  String get students => _translate('students');
  String get rating => _translate('rating');
  String get reviews => _translate('reviews');
  String get aboutCourse => _translate('about_course');
  String get curriculum => _translate('curriculum');
  String get instructor => _translate('instructor');
  
  // Progress
  String get progress => _translate('progress');
  String get completed => _translate('completed');
  String get inProgress => _translate('in_progress');
  String get notStarted => _translate('not_started');
  String get certificate => _translate('certificate');
  
  // Quiz
  String get quiz => _translate('quiz');
  String get startQuiz => _translate('start_quiz');
  String get submitQuiz => _translate('submit_quiz');
  String get score => _translate('score');
  String get passed => _translate('passed');
  String get failed => _translate('failed');
  String get tryAgain => _translate('try_again');
  
  // Settings
  String get language => _translate('language');
  String get theme => _translate('theme');
  String get darkMode => _translate('dark_mode');
  String get notifications => _translate('notifications');
  String get privacy => _translate('privacy');
  String get terms => _translate('terms');
  String get help => _translate('help');
  String get about => _translate('about');
  
  // Themes
  String get oceanBreeze => _translate('ocean_breeze');
  String get desertSunset => _translate('desert_sunset');
  String get forestDream => _translate('forest_dream');
  String get royalPurple => _translate('royal_purple');
  String get midnightDark => _translate('midnight_dark');
  
  // Messages
  String get noCoursesFound => _translate('no_courses_found');
  String get noInternetConnection => _translate('no_internet_connection');
  String get somethingWentWrong => _translate('something_went_wrong');
  String get tryAgainLater => _translate('try_again_later');
  String get success => _translate('success');
  String get error => _translate('error');
  String get warning => _translate('warning');
  String get info => _translate('info');
  
  // Formatting
  String formatNumber(int number) {
    if (locale.languageCode == 'ar') {
      return NumberFormat('#,###', 'ar').format(number);
    }
    return NumberFormat('#,###', 'en').format(number);
  }
  
  String formatCurrency(double amount) {
    if (locale.languageCode == 'ar') {
      return NumberFormat.currency(
        locale: 'ar',
        symbol: 'ج.م',
        decimalDigits: 0,
      ).format(amount);
    }
    return NumberFormat.currency(
      locale: 'en',
      symbol: 'EGP ',
      decimalDigits: 0,
    ).format(amount);
  }
  
  String formatDate(DateTime date) {
    if (locale.languageCode == 'ar') {
      return DateFormat('d MMMM yyyy', 'ar').format(date);
    }
    return DateFormat('MMMM d, yyyy', 'en').format(date);
  }
  
  String formatTime(DateTime time) {
    if (locale.languageCode == 'ar') {
      return DateFormat('h:mm a', 'ar').format(time);
    }
    return DateFormat('h:mm a', 'en').format(time);
  }
  
  String _translate(String key) {
    return _localizedValues[locale.languageCode]?[key] ?? key;
  }
  
  static final Map<String, Map<String, String>> _localizedValues = {
    'ar': {
      'app_name': 'المنصة',
      'welcome': 'مرحباً',
      'welcome_back': 'مرحباً بعودتك',
      'get_started': 'ابدأ الآن',
      'continue': 'متابعة',
      'next': 'التالي',
      'back': 'رجوع',
      'done': 'تم',
      'cancel': 'إلغاء',
      'save': 'حفظ',
      'delete': 'حذف',
      'edit': 'تعديل',
      'search': 'بحث',
      'filter': 'تصفية',
      'sort': 'ترتيب',
      
      'login': 'تسجيل الدخول',
      'logout': 'تسجيل الخروج',
      'register': 'إنشاء حساب',
      'email': 'البريد الإلكتروني',
      'password': 'كلمة المرور',
      'confirm_password': 'تأكيد كلمة المرور',
      'forgot_password': 'نسيت كلمة المرور؟',
      'reset_password': 'إعادة تعيين كلمة المرور',
      'remember_me': 'تذكرني',
      'or_continue_with': 'أو المتابعة باستخدام',
      
      'home': 'الرئيسية',
      'courses': 'الدورات',
      'my_courses': 'دوراتي',
      'profile': 'الملف الشخصي',
      'settings': 'الإعدادات',
      'notifications': 'الإشعارات',
      
      'all_courses': 'جميع الدورات',
      'popular_courses': 'الدورات الشائعة',
      'new_courses': 'الدورات الجديدة',
      'continue_watching': 'متابعة المشاهدة',
      'enroll_now': 'سجل الآن',
      'enrolled': 'مسجل',
      'lessons': 'دروس',
      'hours': 'ساعات',
      'students': 'طلاب',
      'rating': 'التقييم',
      'reviews': 'المراجعات',
      'about_course': 'عن الدورة',
      'curriculum': 'المنهج',
      'instructor': 'المدرس',
      
      'progress': 'التقدم',
      'completed': 'مكتمل',
      'in_progress': 'قيد التقدم',
      'not_started': 'لم يبدأ',
      'certificate': 'الشهادة',
      
      'quiz': 'اختبار',
      'start_quiz': 'بدء الاختبار',
      'submit_quiz': 'إرسال الاختبار',
      'score': 'النتيجة',
      'passed': 'ناجح',
      'failed': 'راسب',
      'try_again': 'حاول مرة أخرى',
      
      'language': 'اللغة',
      'theme': 'المظهر',
      'dark_mode': 'الوضع الليلي',
      'privacy': 'الخصوصية',
      'terms': 'الشروط والأحكام',
      'help': 'المساعدة',
      'about': 'حول',
      
      'ocean_breeze': 'نسيم المحيط',
      'desert_sunset': 'غروب الصحراء',
      'forest_dream': 'حلم الغابة',
      'royal_purple': 'البنفسجي الملكي',
      'midnight_dark': 'منتصف الليل',
      
      'no_courses_found': 'لم يتم العثور على دورات',
      'no_internet_connection': 'لا يوجد اتصال بالإنترنت',
      'something_went_wrong': 'حدث خطأ ما',
      'try_again_later': 'حاول مرة أخرى لاحقاً',
      'success': 'نجاح',
      'error': 'خطأ',
      'warning': 'تحذير',
      'info': 'معلومات',
    },
    'en': {
      'app_name': 'El-Manassa',
      'welcome': 'Welcome',
      'welcome_back': 'Welcome Back',
      'get_started': 'Get Started',
      'continue': 'Continue',
      'next': 'Next',
      'back': 'Back',
      'done': 'Done',
      'cancel': 'Cancel',
      'save': 'Save',
      'delete': 'Delete',
      'edit': 'Edit',
      'search': 'Search',
      'filter': 'Filter',
      'sort': 'Sort',
      
      'login': 'Login',
      'logout': 'Logout',
      'register': 'Register',
      'email': 'Email',
      'password': 'Password',
      'confirm_password': 'Confirm Password',
      'forgot_password': 'Forgot Password?',
      'reset_password': 'Reset Password',
      'remember_me': 'Remember Me',
      'or_continue_with': 'Or continue with',
      
      'home': 'Home',
      'courses': 'Courses',
      'my_courses': 'My Courses',
      'profile': 'Profile',
      'settings': 'Settings',
      'notifications': 'Notifications',
      
      'all_courses': 'All Courses',
      'popular_courses': 'Popular Courses',
      'new_courses': 'New Courses',
      'continue_watching': 'Continue Watching',
      'enroll_now': 'Enroll Now',
      'enrolled': 'Enrolled',
      'lessons': 'Lessons',
      'hours': 'Hours',
      'students': 'Students',
      'rating': 'Rating',
      'reviews': 'Reviews',
      'about_course': 'About Course',
      'curriculum': 'Curriculum',
      'instructor': 'Instructor',
      
      'progress': 'Progress',
      'completed': 'Completed',
      'in_progress': 'In Progress',
      'not_started': 'Not Started',
      'certificate': 'Certificate',
      
      'quiz': 'Quiz',
      'start_quiz': 'Start Quiz',
      'submit_quiz': 'Submit Quiz',
      'score': 'Score',
      'passed': 'Passed',
      'failed': 'Failed',
      'try_again': 'Try Again',
      
      'language': 'Language',
      'theme': 'Theme',
      'dark_mode': 'Dark Mode',
      'privacy': 'Privacy',
      'terms': 'Terms & Conditions',
      'help': 'Help',
      'about': 'About',
      
      'ocean_breeze': 'Ocean Breeze',
      'desert_sunset': 'Desert Sunset',
      'forest_dream': 'Forest Dream',
      'royal_purple': 'Royal Purple',
      'midnight_dark': 'Midnight Dark',
      
      'no_courses_found': 'No courses found',
      'no_internet_connection': 'No internet connection',
      'something_went_wrong': 'Something went wrong',
      'try_again_later': 'Try again later',
      'success': 'Success',
      'error': 'Error',
      'warning': 'Warning',
      'info': 'Info',
    },
  };
}

class _AppLocalizationsDelegate extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();
  
  @override
  bool isSupported(Locale locale) {
    return ['ar', 'en'].contains(locale.languageCode);
  }
  
  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(AppLocalizations(locale));
  }
  
  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}