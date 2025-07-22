import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hive_flutter/hive_flutter.dart';

// Locale provider
final localeProvider = StateNotifierProvider<LocaleNotifier, Locale>((ref) {
  return LocaleNotifier();
});

class LocaleNotifier extends StateNotifier<Locale> {
  static const String _boxName = 'settings';
  static const String _localeKey = 'app_locale';
  
  LocaleNotifier() : super(const Locale('ar', 'EG')) {
    _loadLocale();
  }
  
  Future<void> _loadLocale() async {
    final box = await Hive.openBox(_boxName);
    final localeCode = box.get(_localeKey, defaultValue: 'ar') as String;
    state = localeCode == 'ar' 
        ? const Locale('ar', 'EG') 
        : const Locale('en', 'US');
  }
  
  Future<void> setLocale(Locale locale) async {
    state = locale;
    final box = await Hive.openBox(_boxName);
    await box.put(_localeKey, locale.languageCode);
  }
  
  void toggleLocale() {
    if (state.languageCode == 'ar') {
      setLocale(const Locale('en', 'US'));
    } else {
      setLocale(const Locale('ar', 'EG'));
    }
  }
  
  bool get isArabic => state.languageCode == 'ar';
}