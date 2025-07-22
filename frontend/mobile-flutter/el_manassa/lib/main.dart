import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'core/theme/app_theme.dart';
import 'core/localization/app_localizations.dart';
import 'shared/providers/theme_provider.dart';
import 'shared/providers/locale_provider.dart';
import 'features/splash/presentation/splash_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Hive for local storage
  await Hive.initFlutter();
  
  // Set system UI overlay style
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
    ),
  );
  
  // Set preferred orientations
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);
  
  // Configure Flutter Animate
  Animate.restartOnHotReload = true;
  
  runApp(
    const ProviderScope(
      child: ElManassaApp(),
    ),
  );
}

class ElManassaApp extends ConsumerWidget {
  const ElManassaApp({super.key});
  
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeModeProvider);
    final currentPalette = ref.watch(colorPaletteProvider);
    final locale = ref.watch(localeProvider);
    
    return MaterialApp(
      title: 'El-Manassa',
      debugShowCheckedModeBanner: false,
      
      // Theme configuration
      theme: AppTheme.buildTheme(
        AppTheme.palettes[currentPalette]!,
        isDark: false,
      ),
      darkTheme: AppTheme.buildTheme(
        AppTheme.palettes['midnight']!,
        isDark: true,
      ),
      themeMode: themeMode,
      
      // Localization configuration
      locale: locale,
      supportedLocales: const [
        Locale('ar', 'EG'), // Arabic (Egypt)
        Locale('en', 'US'), // English (US)
      ],
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      
      // RTL support
      builder: (context, child) {
        return Directionality(
          textDirection: locale.languageCode == 'ar' 
              ? TextDirection.rtl 
              : TextDirection.ltr,
          child: child!,
        );
      },
      
      home: const SplashScreen(),
    );
  }
}
