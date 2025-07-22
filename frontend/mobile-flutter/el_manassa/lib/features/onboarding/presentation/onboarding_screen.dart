import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lottie/lottie.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/widgets/animated_widgets.dart';
import '../../../core/localization/app_localizations.dart';
import '../../../shared/providers/theme_provider.dart';
import '../../../shared/providers/locale_provider.dart';
import '../../auth/presentation/login_screen.dart';

class OnboardingScreen extends ConsumerStatefulWidget {
  const OnboardingScreen({super.key});
  
  @override
  ConsumerState<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends ConsumerState<OnboardingScreen> 
    with TickerProviderStateMixin {
  final PageController _pageController = PageController();
  late AnimationController _backgroundController;
  late List<AnimationController> _itemControllers;
  int _currentPage = 0;
  
  late final List<OnboardingItem> _onboardingItems;
  
  @override
  void initState() {
    super.initState();
    
    _backgroundController = AnimationController(
      duration: const Duration(seconds: 15),
      vsync: this,
    )..repeat();
    
    // Create animation controllers for each page
    _itemControllers = List.generate(
      4,
      (index) => AnimationController(
        duration: const Duration(milliseconds: 800),
        vsync: this,
      ),
    );
    
    // Start animation for first page
    _itemControllers[0].forward();
  }
  
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final l10n = AppLocalizations.of(context);
    final isArabic = ref.read(localeProvider).languageCode == 'ar';
    
    _onboardingItems = [
      OnboardingItem(
        title: isArabic ? 'مرحباً في المنصة' : 'Welcome to El-Manassa',
        description: isArabic 
          ? 'منصة التعليم الرائدة في مصر\nتعلم من أفضل المدرسين في جميع المواد'
          : 'Egypt\'s leading education platform\nLearn from the best teachers in all subjects',
        animationAsset: 'assets/animations/welcome.json',
        backgroundColor: const Color(0xFF0EA5E9),
        secondaryColor: const Color(0xFF7C3AED),
      ),
      OnboardingItem(
        title: isArabic ? 'تعلم بطريقتك' : 'Learn Your Way',
        description: isArabic
          ? 'دروس مباشرة وفيديوهات مسجلة\nتعلم في أي وقت ومن أي مكان'
          : 'Live lessons and recorded videos\nLearn anytime, anywhere',
        animationAsset: 'assets/animations/learning.json',
        backgroundColor: const Color(0xFFF59E0B),
        secondaryColor: const Color(0xFFEF4444),
      ),
      OnboardingItem(
        title: isArabic ? 'تتبع تقدمك' : 'Track Your Progress',
        description: isArabic
          ? 'اختبارات تفاعلية وتقارير مفصلة\nاعرف مستواك وطور من أدائك'
          : 'Interactive quizzes and detailed reports\nKnow your level and improve your performance',
        animationAsset: 'assets/animations/progress.json',
        backgroundColor: const Color(0xFF10B981),
        secondaryColor: const Color(0xFF3B82F6),
      ),
      OnboardingItem(
        title: isArabic ? 'ابدأ رحلتك الآن' : 'Start Your Journey Now',
        description: isArabic
          ? 'انضم لآلاف الطلاب المتميزين\nوحقق أحلامك الأكاديمية'
          : 'Join thousands of outstanding students\nAnd achieve your academic dreams',
        animationAsset: 'assets/animations/success.json',
        backgroundColor: const Color(0xFF6366F1),
        secondaryColor: const Color(0xFFEC4899),
      ),
    ];
  }
  
  @override
  void dispose() {
    _backgroundController.dispose();
    for (var controller in _itemControllers) {
      controller.dispose();
    }
    _pageController.dispose();
    super.dispose();
  }
  
  void _onPageChanged(int page) {
    setState(() {
      _currentPage = page;
    });
    
    // Reset and start animation for new page
    _itemControllers[page].reset();
    _itemControllers[page].forward();
  }
  
  void _nextPage() {
    if (_currentPage < _onboardingItems.length - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 500),
        curve: Curves.easeInOut,
      );
    } else {
      _navigateToAuth();
    }
  }
  
  void _navigateToAuth() {
    Navigator.pushReplacement(
      context,
      PageRouteBuilder(
        pageBuilder: (context, animation, secondaryAnimation) => 
            const LoginScreen(),
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          return FadeTransition(
            opacity: animation,
            child: ScaleTransition(
              scale: Tween<double>(begin: 0.95, end: 1.0).animate(
                CurvedAnimation(
                  parent: animation,
                  curve: Curves.easeOut,
                ),
              ),
              child: child,
            ),
          );
        },
        transitionDuration: const Duration(milliseconds: 600),
      ),
    );
  }
  
  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isArabic = ref.watch(localeProvider).languageCode == 'ar';
    
    return Scaffold(
      body: Stack(
        children: [
          // Animated background
          AnimatedBuilder(
            animation: _backgroundController,
            builder: (context, child) {
              final currentItem = _onboardingItems[_currentPage];
              return Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      currentItem.backgroundColor,
                      currentItem.secondaryColor,
                      currentItem.backgroundColor.withValues(alpha: 0.8),
                    ],
                    transform: GradientRotation(_backgroundController.value * 6.28),
                  ),
                ),
              );
            },
          ),
          
          // Floating particles
          ...List.generate(15, (index) {
            return Positioned(
              left: (index * 80.0) % size.width,
              top: (index * 120.0) % size.height,
              child: AnimatedBuilder(
                animation: _backgroundController,
                builder: (context, child) {
                  final offset = Offset(
                    30 * math.cos(_backgroundController.value * 6.28 + index),
                    30 * math.sin(_backgroundController.value * 6.28 + index),
                  );
                  return Transform.translate(
                    offset: offset,
                    child: Container(
                      width: 6,
                      height: 6,
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.3),
                        shape: BoxShape.circle,
                      ),
                    ).animate(onPlay: (controller) => controller.repeat())
                      .scale(
                        begin: 0.5,
                        end: 1.5,
                        duration: (2 + index % 3).seconds,
                      )
                      .then()
                      .scale(
                        begin: 1.5,
                        end: 0.5,
                        duration: (2 + index % 3).seconds,
                      ),
                  );
                },
              ),
            );
          }),
          
          // Skip button
          SafeArea(
            child: Align(
              alignment: isArabic ? Alignment.topLeft : Alignment.topRight,
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: TextButton(
                  onPressed: _navigateToAuth,
                  style: TextButton.styleFrom(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 20,
                      vertical: 10,
                    ),
                    backgroundColor: Colors.white.withValues(alpha: 0.2),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                  ),
                  child: Text(
                    isArabic ? 'تخطي' : 'Skip',
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ).animate()
                  .fadeIn(delay: 500.ms)
                  .slideY(begin: -0.5, end: 0),
              ),
            ),
          ),
          
          // Page content
          Column(
            children: [
              Expanded(
                child: PageView.builder(
                  controller: _pageController,
                  onPageChanged: _onPageChanged,
                  itemCount: _onboardingItems.length,
                  itemBuilder: (context, index) {
                    return AnimatedBuilder(
                      animation: _itemControllers[index],
                      builder: (context, child) {
                        return _buildPage(
                          item: _onboardingItems[index],
                          animation: _itemControllers[index],
                          isArabic: isArabic,
                        );
                      },
                    );
                  },
                ),
              ),
              
              // Bottom section
              Container(
                height: 200,
                padding: const EdgeInsets.all(20),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    // Page indicator
                    SmoothPageIndicator(
                      controller: _pageController,
                      count: _onboardingItems.length,
                      effect: WormEffect(
                        dotWidth: 10,
                        dotHeight: 10,
                        spacing: 16,
                        activeDotColor: Colors.white,
                        dotColor: Colors.white.withValues(alpha: 0.3),
                      ),
                    ).animate()
                      .fadeIn(delay: 800.ms),
                    
                    // Action buttons
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        // Language switcher
                        IconButton(
                          onPressed: () {
                            ref.read(localeProvider.notifier).toggleLocale();
                          },
                          icon: Container(
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: Colors.white.withValues(alpha: 0.2),
                              shape: BoxShape.circle,
                            ),
                            child: Text(
                              isArabic ? 'EN' : 'ع',
                              style: const TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ).animate()
                          .fadeIn(delay: 900.ms)
                          .scale(begin: 0.8),
                        
                        // Next button
                        AnimatedGradientButton(
                          text: _currentPage == _onboardingItems.length - 1
                              ? (isArabic ? 'ابدأ الآن' : 'Get Started')
                              : (isArabic ? 'التالي' : 'Next'),
                          onPressed: _nextPage,
                          width: 160,
                          gradient: LinearGradient(
                            colors: [
                              Colors.white.withValues(alpha: 0.9),
                              Colors.white.withValues(alpha: 0.7),
                            ],
                          ),
                        ).animate()
                          .fadeIn(delay: 1000.ms)
                          .slideX(
                            begin: isArabic ? -0.2 : 0.2,
                            end: 0,
                          ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
  
  Widget _buildPage({
    required OnboardingItem item,
    required AnimationController animation,
    required bool isArabic,
  }) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(40),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Animation placeholder (replace with Lottie when assets are added)
            Container(
              width: 300,
              height: 300,
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.2),
                shape: BoxShape.circle,
              ),
              child: Center(
                child: Icon(
                  _getIconForPage(item.title),
                  size: 120,
                  color: Colors.white,
                ),
              ),
            ).animate(controller: animation)
              .scale(
                begin: 0,
                end: 1,
                duration: 600.ms,
                curve: Curves.elasticOut,
              )
              .rotate(
                begin: -0.1,
                end: 0,
                duration: 600.ms,
              ),
            
            const SizedBox(height: 60),
            
            // Title
            Text(
              item.title,
              style: TextStyle(
                fontSize: isArabic ? 32 : 28,
                fontWeight: FontWeight.bold,
                color: Colors.white,
                fontFamily: isArabic ? 'Cairo' : null,
                height: 1.2,
              ),
              textAlign: TextAlign.center,
            ).animate(controller: animation)
              .fadeIn(
                delay: 300.ms,
                duration: 500.ms,
              )
              .slideY(
                begin: 0.2,
                end: 0,
                delay: 300.ms,
                duration: 500.ms,
              ),
            
            const SizedBox(height: 20),
            
            // Description
            Text(
              item.description,
              style: TextStyle(
                fontSize: isArabic ? 18 : 16,
                color: Colors.white.withValues(alpha: 0.9),
                fontFamily: isArabic ? 'Cairo' : null,
                height: 1.5,
              ),
              textAlign: TextAlign.center,
            ).animate(controller: animation)
              .fadeIn(
                delay: 500.ms,
                duration: 500.ms,
              )
              .slideY(
                begin: 0.2,
                end: 0,
                delay: 500.ms,
                duration: 500.ms,
              ),
          ],
        ),
      ),
    );
  }
  
  IconData _getIconForPage(String title) {
    if (title.contains('Welcome') || title.contains('مرحباً')) {
      return Icons.waving_hand;
    } else if (title.contains('Learn') || title.contains('تعلم')) {
      return Icons.school;
    } else if (title.contains('Track') || title.contains('تتبع')) {
      return Icons.trending_up;
    } else {
      return Icons.rocket_launch;
    }
  }
}

class OnboardingItem {
  final String title;
  final String description;
  final String animationAsset;
  final Color backgroundColor;
  final Color secondaryColor;
  
  OnboardingItem({
    required this.title,
    required this.description,
    required this.animationAsset,
    required this.backgroundColor,
    required this.secondaryColor,
  });
}

// Add this import at the top
import 'dart:math' as math;