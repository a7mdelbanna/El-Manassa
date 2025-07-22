import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_theme.dart';
import '../../../shared/providers/theme_provider.dart';

class SplashScreen extends ConsumerStatefulWidget {
  const SplashScreen({super.key});
  
  @override
  ConsumerState<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends ConsumerState<SplashScreen> 
    with TickerProviderStateMixin {
  late AnimationController _logoController;
  late AnimationController _backgroundController;
  late Animation<double> _logoScale;
  late Animation<double> _logoRotation;
  late Animation<double> _textOpacity;
  
  @override
  void initState() {
    super.initState();
    
    // Logo animation controller
    _logoController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );
    
    // Background animation controller
    _backgroundController = AnimationController(
      duration: const Duration(seconds: 3),
      vsync: this,
    )..repeat(reverse: true);
    
    // Logo scale animation
    _logoScale = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _logoController,
      curve: const Interval(0.0, 0.6, curve: Curves.elasticOut),
    ));
    
    // Logo rotation animation
    _logoRotation = Tween<double>(
      begin: -0.5,
      end: 0.0,
    ).animate(CurvedAnimation(
      parent: _logoController,
      curve: const Interval(0.0, 0.8, curve: Curves.easeOutBack),
    ));
    
    // Text opacity animation
    _textOpacity = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _logoController,
      curve: const Interval(0.6, 1.0, curve: Curves.easeIn),
    ));
    
    // Start animations
    _logoController.forward();
    
    // Navigate after delay
    Future.delayed(const Duration(seconds: 3), () {
      if (mounted) {
        // TODO: Navigate to appropriate screen based on auth state
        // For now, navigate to onboarding
        Navigator.pushReplacement(
          context,
          PageRouteBuilder(
            pageBuilder: (context, animation, secondaryAnimation) => 
                const OnboardingScreen(),
            transitionsBuilder: (context, animation, secondaryAnimation, child) {
              return FadeTransition(
                opacity: animation,
                child: child,
              );
            },
            transitionDuration: const Duration(milliseconds: 800),
          ),
        );
      }
    });
  }
  
  @override
  void dispose() {
    _logoController.dispose();
    _backgroundController.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    final currentPalette = ref.watch(colorPaletteProvider);
    final palette = AppTheme.palettes[currentPalette]!;
    
    return Scaffold(
      body: Stack(
        children: [
          // Animated gradient background
          AnimatedBuilder(
            animation: _backgroundController,
            builder: (context, child) {
              return Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      palette.primary.withValues(alpha: 0.8),
                      palette.secondary.withValues(alpha: 0.6),
                      palette.tertiary.withValues(alpha: 0.4),
                    ],
                    transform: GradientRotation(_backgroundController.value * 6.28),
                  ),
                ),
              );
            },
          ),
          
          // Animated particles
          ...List.generate(20, (index) {
            return Positioned(
              left: (index * 50.0) % MediaQuery.of(context).size.width,
              child: AnimatedBuilder(
                animation: _backgroundController,
                builder: (context, child) {
                  final yOffset = MediaQuery.of(context).size.height * 
                      _backgroundController.value;
                  return Transform.translate(
                    offset: Offset(0, yOffset - 100),
                    child: Container(
                      width: 4,
                      height: 4,
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.3),
                        shape: BoxShape.circle,
                      ),
                    ),
                  );
                },
              ),
            );
          }),
          
          // Logo and text
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Animated logo
                AnimatedBuilder(
                  animation: _logoController,
                  builder: (context, child) {
                    return Transform.scale(
                      scale: _logoScale.value,
                      child: Transform.rotate(
                        angle: _logoRotation.value,
                        child: Container(
                          width: 150,
                          height: 150,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(30),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withValues(alpha: 0.2),
                                blurRadius: 20,
                                offset: const Offset(0, 10),
                              ),
                            ],
                          ),
                          child: Center(
                            child: Text(
                              'المنصة',
                              style: TextStyle(
                                fontSize: 48,
                                fontWeight: FontWeight.bold,
                                color: palette.primary,
                                fontFamily: 'Cairo',
                              ),
                            ),
                          ),
                        ),
                      ),
                    );
                  },
                ),
                
                const SizedBox(height: 40),
                
                // Animated text
                AnimatedBuilder(
                  animation: _textOpacity,
                  builder: (context, child) {
                    return Opacity(
                      opacity: _textOpacity.value,
                      child: Column(
                        children: [
                          Text(
                            'El-Manassa',
                            style: TextStyle(
                              fontSize: 32,
                              fontWeight: FontWeight.w600,
                              color: Colors.white,
                              letterSpacing: 2,
                              shadows: [
                                Shadow(
                                  color: Colors.black.withValues(alpha: 0.3),
                                  blurRadius: 10,
                                  offset: const Offset(0, 5),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 10),
                          Text(
                            'منصة التعليم الرائدة في مصر',
                            style: TextStyle(
                              fontSize: 18,
                              color: Colors.white.withValues(alpha: 0.9),
                              fontFamily: 'Cairo',
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                ),
                
                const SizedBox(height: 60),
                
                // Loading indicator
                SizedBox(
                  width: 60,
                  height: 60,
                  child: CircularProgressIndicator(
                    valueColor: AlwaysStoppedAnimation<Color>(
                      Colors.white.withValues(alpha: 0.8),
                    ),
                    strokeWidth: 3,
                  ),
                ).animate(
                  onPlay: (controller) => controller.repeat(),
                ).scale(
                  begin: 0.8,
                  end: 1.2,
                  duration: 1.seconds,
                  curve: Curves.easeInOut,
                ).then().scale(
                  begin: 1.2,
                  end: 0.8,
                  duration: 1.seconds,
                  curve: Curves.easeInOut,
                ),
              ],
            ),
          ),
          
          // Version text at bottom
          Positioned(
            bottom: 40,
            left: 0,
            right: 0,
            child: Text(
              'Version 1.0.0',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Colors.white.withValues(alpha: 0.6),
                fontSize: 12,
              ),
            ).animate()
              .fadeIn(delay: 2.seconds, duration: 500.ms),
          ),
        ],
      ),
    );
  }
}

// Placeholder for OnboardingScreen
class OnboardingScreen extends StatelessWidget {
  const OnboardingScreen({super.key});
  
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Text('Onboarding Screen'),
      ),
    );
  }
}