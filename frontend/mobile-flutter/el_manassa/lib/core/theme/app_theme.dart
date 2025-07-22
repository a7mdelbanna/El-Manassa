import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  static const double borderRadiusSmall = 8.0;
  static const double borderRadiusMedium = 16.0;
  static const double borderRadiusLarge = 24.0;
  
  // Modern color palettes
  static final Map<String, ColorPalette> palettes = {
    'ocean': ColorPalette(
      name: 'Ocean Breeze',
      primary: const Color(0xFF0EA5E9),
      secondary: const Color(0xFF7C3AED),
      tertiary: const Color(0xFF10B981),
      surface: const Color(0xFFF0F9FF),
      background: const Color(0xFFF8FAFC),
      onPrimary: Colors.white,
      onSecondary: Colors.white,
      onSurface: const Color(0xFF1E293B),
      gradient: const LinearGradient(
        colors: [Color(0xFF0EA5E9), Color(0xFF7C3AED)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
    ),
    'sunset': ColorPalette(
      name: 'Desert Sunset',
      primary: const Color(0xFFF59E0B),
      secondary: const Color(0xFFEF4444),
      tertiary: const Color(0xFF8B5CF6),
      surface: const Color(0xFFFFFBEB),
      background: const Color(0xFFFEF3C7),
      onPrimary: Colors.white,
      onSecondary: Colors.white,
      onSurface: const Color(0xFF78350F),
      gradient: const LinearGradient(
        colors: [Color(0xFFF59E0B), Color(0xFFEF4444)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
    ),
    'forest': ColorPalette(
      name: 'Forest Dream',
      primary: const Color(0xFF10B981),
      secondary: const Color(0xFF3B82F6),
      tertiary: const Color(0xFFF59E0B),
      surface: const Color(0xFFF0FDF4),
      background: const Color(0xFFECFDF5),
      onPrimary: Colors.white,
      onSecondary: Colors.white,
      onSurface: const Color(0xFF064E3B),
      gradient: const LinearGradient(
        colors: [Color(0xFF10B981), Color(0xFF3B82F6)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
    ),
    'royal': ColorPalette(
      name: 'Royal Purple',
      primary: const Color(0xFF6366F1),
      secondary: const Color(0xFFEC4899),
      tertiary: const Color(0xFF14B8A6),
      surface: const Color(0xFFF5F3FF),
      background: const Color(0xFFFAFAF9),
      onPrimary: Colors.white,
      onSecondary: Colors.white,
      onSurface: const Color(0xFF1E1B4B),
      gradient: const LinearGradient(
        colors: [Color(0xFF6366F1), Color(0xFFEC4899)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
    ),
    'midnight': ColorPalette(
      name: 'Midnight Dark',
      primary: const Color(0xFF3B82F6),
      secondary: const Color(0xFF8B5CF6),
      tertiary: const Color(0xFF10B981),
      surface: const Color(0xFF1E293B),
      background: const Color(0xFF0F172A),
      onPrimary: Colors.white,
      onSecondary: Colors.white,
      onSurface: const Color(0xFFE2E8F0),
      gradient: const LinearGradient(
        colors: [Color(0xFF3B82F6), Color(0xFF8B5CF6)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
      isDark: true,
    ),
  };
  
  static ThemeData buildTheme(ColorPalette palette, {bool isDark = false}) {
    final brightness = isDark ? Brightness.dark : Brightness.light;
    
    return ThemeData(
      useMaterial3: true,
      brightness: brightness,
      
      // Color scheme
      colorScheme: ColorScheme(
        brightness: brightness,
        primary: palette.primary,
        onPrimary: palette.onPrimary,
        secondary: palette.secondary,
        onSecondary: palette.onSecondary,
        tertiary: palette.tertiary,
        error: const Color(0xFFEF4444),
        onError: Colors.white,
        surface: palette.surface,
        onSurface: palette.onSurface,
        surfaceContainerHighest: palette.surface.withValues(alpha: 0.8),
        outline: palette.onSurface.withValues(alpha: 0.2),
      ),
      
      // Typography
      textTheme: _buildTextTheme(palette, isDark),
      
      // Component themes
      appBarTheme: AppBarTheme(
        elevation: 0,
        scrolledUnderElevation: 2,
        centerTitle: true,
        systemOverlayStyle: isDark 
          ? SystemUiOverlayStyle.light 
          : SystemUiOverlayStyle.dark,
        backgroundColor: Colors.transparent,
        foregroundColor: palette.onSurface,
      ),
      
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(borderRadiusMedium),
          ),
          textStyle: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ).copyWith(
          overlayColor: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.pressed)) {
              return palette.primary.withValues(alpha: 0.1);
            }
            return null;
          }),
        ),
      ),
      
      cardTheme: CardTheme(
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(borderRadiusLarge),
        ),
        color: palette.surface,
      ),
      
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: palette.surface,
        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(borderRadiusMedium),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(borderRadiusMedium),
          borderSide: BorderSide(
            color: palette.onSurface.withValues(alpha: 0.1),
            width: 1,
          ),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(borderRadiusMedium),
          borderSide: BorderSide(
            color: palette.primary,
            width: 2,
          ),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(borderRadiusMedium),
          borderSide: const BorderSide(
            color: Color(0xFFEF4444),
            width: 1,
          ),
        ),
      ),
      
      chipTheme: ChipThemeData(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(borderRadiusSmall),
        ),
      ),
      
      // Page transitions
      pageTransitionsTheme: const PageTransitionsTheme(
        builders: {
          TargetPlatform.android: CustomPageTransitionBuilder(),
          TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
        },
      ),
    );
  }
  
  static TextTheme _buildTextTheme(ColorPalette palette, bool isDark) {
    final baseTextColor = palette.onSurface;
    final secondaryTextColor = baseTextColor.withValues(alpha: 0.7);
    
    return TextTheme(
      displayLarge: GoogleFonts.poppins(
        fontSize: 48,
        fontWeight: FontWeight.w700,
        letterSpacing: -1.5,
        color: baseTextColor,
      ),
      displayMedium: GoogleFonts.poppins(
        fontSize: 36,
        fontWeight: FontWeight.w600,
        letterSpacing: -0.5,
        color: baseTextColor,
      ),
      displaySmall: GoogleFonts.poppins(
        fontSize: 30,
        fontWeight: FontWeight.w600,
        color: baseTextColor,
      ),
      headlineLarge: GoogleFonts.poppins(
        fontSize: 24,
        fontWeight: FontWeight.w600,
        color: baseTextColor,
      ),
      headlineMedium: GoogleFonts.poppins(
        fontSize: 20,
        fontWeight: FontWeight.w500,
        color: baseTextColor,
      ),
      headlineSmall: GoogleFonts.poppins(
        fontSize: 18,
        fontWeight: FontWeight.w500,
        color: baseTextColor,
      ),
      titleLarge: GoogleFonts.inter(
        fontSize: 18,
        fontWeight: FontWeight.w600,
        color: baseTextColor,
      ),
      titleMedium: GoogleFonts.inter(
        fontSize: 16,
        fontWeight: FontWeight.w500,
        color: baseTextColor,
      ),
      titleSmall: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w500,
        color: baseTextColor,
      ),
      bodyLarge: GoogleFonts.inter(
        fontSize: 16,
        fontWeight: FontWeight.w400,
        color: baseTextColor,
      ),
      bodyMedium: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        color: baseTextColor,
      ),
      bodySmall: GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w400,
        color: secondaryTextColor,
      ),
      labelLarge: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.5,
        color: baseTextColor,
      ),
      labelMedium: GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.5,
        color: baseTextColor,
      ),
      labelSmall: GoogleFonts.inter(
        fontSize: 10,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.5,
        color: secondaryTextColor,
      ),
    );
  }
}

// Arabic text theme
class ArabicTextTheme {
  static TextTheme buildTextTheme(ColorPalette palette, bool isDark) {
    final baseTextColor = palette.onSurface;
    final secondaryTextColor = baseTextColor.withValues(alpha: 0.7);
    
    return TextTheme(
      displayLarge: GoogleFonts.cairo(
        fontSize: 48,
        fontWeight: FontWeight.w700,
        letterSpacing: -1.5,
        color: baseTextColor,
        height: 1.4,
      ),
      displayMedium: GoogleFonts.cairo(
        fontSize: 36,
        fontWeight: FontWeight.w600,
        letterSpacing: -0.5,
        color: baseTextColor,
        height: 1.4,
      ),
      displaySmall: GoogleFonts.cairo(
        fontSize: 30,
        fontWeight: FontWeight.w600,
        color: baseTextColor,
        height: 1.4,
      ),
      headlineLarge: GoogleFonts.cairo(
        fontSize: 24,
        fontWeight: FontWeight.w600,
        color: baseTextColor,
        height: 1.5,
      ),
      headlineMedium: GoogleFonts.cairo(
        fontSize: 20,
        fontWeight: FontWeight.w500,
        color: baseTextColor,
        height: 1.5,
      ),
      headlineSmall: GoogleFonts.cairo(
        fontSize: 18,
        fontWeight: FontWeight.w500,
        color: baseTextColor,
        height: 1.5,
      ),
      titleLarge: GoogleFonts.tajawal(
        fontSize: 18,
        fontWeight: FontWeight.w600,
        color: baseTextColor,
        height: 1.6,
      ),
      titleMedium: GoogleFonts.tajawal(
        fontSize: 16,
        fontWeight: FontWeight.w500,
        color: baseTextColor,
        height: 1.6,
      ),
      titleSmall: GoogleFonts.tajawal(
        fontSize: 14,
        fontWeight: FontWeight.w500,
        color: baseTextColor,
        height: 1.6,
      ),
      bodyLarge: GoogleFonts.tajawal(
        fontSize: 16,
        fontWeight: FontWeight.w400,
        color: baseTextColor,
        height: 1.7,
      ),
      bodyMedium: GoogleFonts.tajawal(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        color: baseTextColor,
        height: 1.7,
      ),
      bodySmall: GoogleFonts.tajawal(
        fontSize: 12,
        fontWeight: FontWeight.w400,
        color: secondaryTextColor,
        height: 1.7,
      ),
      labelLarge: GoogleFonts.tajawal(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.5,
        color: baseTextColor,
        height: 1.5,
      ),
      labelMedium: GoogleFonts.tajawal(
        fontSize: 12,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.5,
        color: baseTextColor,
        height: 1.5,
      ),
      labelSmall: GoogleFonts.tajawal(
        fontSize: 10,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.5,
        color: secondaryTextColor,
        height: 1.5,
      ),
    );
  }
}

// Color palette model
class ColorPalette {
  final String name;
  final Color primary;
  final Color secondary;
  final Color tertiary;
  final Color surface;
  final Color background;
  final Color onPrimary;
  final Color onSecondary;
  final Color onSurface;
  final LinearGradient gradient;
  final bool isDark;
  
  const ColorPalette({
    required this.name,
    required this.primary,
    required this.secondary,
    required this.tertiary,
    required this.surface,
    required this.background,
    required this.onPrimary,
    required this.onSecondary,
    required this.onSurface,
    required this.gradient,
    this.isDark = false,
  });
}

// Custom page transition
class CustomPageTransitionBuilder extends PageTransitionsBuilder {
  const CustomPageTransitionBuilder();
  
  @override
  Widget buildTransitions<T>(
    PageRoute<T> route,
    BuildContext context,
    Animation<double> animation,
    Animation<double> secondaryAnimation,
    Widget child,
  ) {
    return child
      .animate(controller: animation)
      .fadeIn(duration: 300.ms, curve: Curves.easeOutQuart)
      .slideY(
        begin: 0.02,
        end: 0,
        duration: 300.ms,
        curve: Curves.easeOutQuart,
      )
      .scale(
        begin: 0.98,
        end: 1,
        duration: 300.ms,
        curve: Curves.easeOutQuart,
      );
  }
}