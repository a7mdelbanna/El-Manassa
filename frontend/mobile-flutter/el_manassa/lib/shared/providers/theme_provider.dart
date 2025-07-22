import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hive_flutter/hive_flutter.dart';

// Theme mode provider
final themeModeProvider = StateNotifierProvider<ThemeModeNotifier, ThemeMode>((ref) {
  return ThemeModeNotifier();
});

class ThemeModeNotifier extends StateNotifier<ThemeMode> {
  static const String _boxName = 'settings';
  static const String _themeKey = 'theme_mode';
  
  ThemeModeNotifier() : super(ThemeMode.system) {
    _loadThemeMode();
  }
  
  Future<void> _loadThemeMode() async {
    final box = await Hive.openBox(_boxName);
    final themeModeIndex = box.get(_themeKey, defaultValue: 0) as int;
    state = ThemeMode.values[themeModeIndex];
  }
  
  Future<void> setThemeMode(ThemeMode mode) async {
    state = mode;
    final box = await Hive.openBox(_boxName);
    await box.put(_themeKey, mode.index);
  }
  
  void toggleTheme() {
    if (state == ThemeMode.light) {
      setThemeMode(ThemeMode.dark);
    } else if (state == ThemeMode.dark) {
      setThemeMode(ThemeMode.light);
    } else {
      setThemeMode(ThemeMode.light);
    }
  }
}

// Color palette provider
final colorPaletteProvider = StateNotifierProvider<ColorPaletteNotifier, String>((ref) {
  return ColorPaletteNotifier();
});

class ColorPaletteNotifier extends StateNotifier<String> {
  static const String _boxName = 'settings';
  static const String _paletteKey = 'color_palette';
  
  ColorPaletteNotifier() : super('ocean') {
    _loadPalette();
  }
  
  Future<void> _loadPalette() async {
    final box = await Hive.openBox(_boxName);
    state = box.get(_paletteKey, defaultValue: 'ocean') as String;
  }
  
  Future<void> setPalette(String paletteName) async {
    state = paletteName;
    final box = await Hive.openBox(_boxName);
    await box.put(_paletteKey, paletteName);
  }
}