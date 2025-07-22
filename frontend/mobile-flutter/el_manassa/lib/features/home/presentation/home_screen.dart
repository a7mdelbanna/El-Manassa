import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:glass_kit/glass_kit.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/widgets/animated_widgets.dart';
import '../../../core/localization/app_localizations.dart';
import '../../../shared/providers/theme_provider.dart';
import '../../../shared/providers/locale_provider.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});
  
  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> 
    with TickerProviderStateMixin {
  late AnimationController _backgroundController;
  late AnimationController _headerController;
  final ScrollController _scrollController = ScrollController();
  double _scrollOffset = 0;
  
  @override
  void initState() {
    super.initState();
    
    _backgroundController = AnimationController(
      duration: const Duration(seconds: 20),
      vsync: this,
    )..repeat();
    
    _headerController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    )..forward();
    
    _scrollController.addListener(() {
      setState(() {
        _scrollOffset = _scrollController.offset;
      });
    });
  }
  
  @override
  void dispose() {
    _backgroundController.dispose();
    _headerController.dispose();
    _scrollController.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);
    final currentPalette = ref.watch(colorPaletteProvider);
    final palette = AppTheme.palettes[currentPalette]!;
    final isArabic = ref.watch(localeProvider).languageCode == 'ar';
    
    return Scaffold(
      body: Stack(
        children: [
          // Animated background
          _buildAnimatedBackground(palette),
          
          // Main content
          CustomScrollView(
            controller: _scrollController,
            slivers: [
              // Custom app bar
              _buildSliverAppBar(l10n, theme, palette, isArabic),
              
              // Welcome section
              SliverToBoxAdapter(
                child: _buildWelcomeSection(l10n, theme, isArabic),
              ),
              
              // Progress cards
              SliverToBoxAdapter(
                child: _buildProgressSection(l10n, theme, palette),
              ),
              
              // Continue watching section
              SliverToBoxAdapter(
                child: _buildContinueWatchingSection(l10n, theme),
              ),
              
              // Popular courses section
              SliverToBoxAdapter(
                child: _buildPopularCoursesSection(l10n, theme),
              ),
              
              // Bottom padding
              const SliverToBoxAdapter(
                child: SizedBox(height: 100),
              ),
            ],
          ),
          
          // Bottom navigation bar
          _buildBottomNavigationBar(l10n, theme, palette),
        ],
      ),
    );
  }
  
  Widget _buildAnimatedBackground(ColorPalette palette) {
    return AnimatedBuilder(
      animation: _backgroundController,
      builder: (context, child) {
        return Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                palette.background,
                palette.surface,
                palette.background,
              ],
              transform: GradientRotation(_backgroundController.value * 6.28),
            ),
          ),
        );
      },
    );
  }
  
  Widget _buildSliverAppBar(
    AppLocalizations l10n,
    ThemeData theme,
    ColorPalette palette,
    bool isArabic,
  ) {
    final appBarOpacity = (_scrollOffset / 100).clamp(0.0, 1.0);
    
    return SliverAppBar(
      expandedHeight: 120,
      floating: false,
      pinned: true,
      backgroundColor: theme.colorScheme.surface.withValues(alpha: appBarOpacity),
      elevation: appBarOpacity * 4,
      flexibleSpace: FlexibleSpaceBar(
        title: AnimatedOpacity(
          opacity: appBarOpacity,
          duration: const Duration(milliseconds: 200),
          child: Text(
            l10n.home,
            style: TextStyle(
              color: theme.colorScheme.onSurface,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        background: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                palette.primary.withValues(alpha: 0.1),
                Colors.transparent,
              ],
            ),
          ),
          child: SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Logo
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: [
                        BoxShadow(
                          color: palette.primary.withValues(alpha: 0.2),
                          blurRadius: 12,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Text(
                      isArabic ? 'م' : 'M',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: palette.primary,
                      ),
                    ),
                  ).animate()
                    .scale(delay: 200.ms, duration: 600.ms)
                    .fadeIn(),
                  
                  // Actions
                  Row(
                    children: [
                      // Theme switcher
                      IconButton(
                        onPressed: () {
                          _showThemePicker(context);
                        },
                        icon: Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: Colors.white.withValues(alpha: 0.9),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Icon(
                            Icons.palette_outlined,
                            color: palette.primary,
                          ),
                        ),
                      ).animate()
                        .scale(delay: 300.ms, duration: 600.ms)
                        .fadeIn(),
                      
                      // Language switcher
                      IconButton(
                        onPressed: () {
                          ref.read(localeProvider.notifier).toggleLocale();
                        },
                        icon: Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: Colors.white.withValues(alpha: 0.9),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            isArabic ? 'EN' : 'ع',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: palette.primary,
                            ),
                          ),
                        ),
                      ).animate()
                        .scale(delay: 400.ms, duration: 600.ms)
                        .fadeIn(),
                      
                      // Notifications
                      IconButton(
                        onPressed: () {},
                        icon: Stack(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                color: Colors.white.withValues(alpha: 0.9),
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Icon(
                                Icons.notifications_outlined,
                                color: palette.primary,
                              ),
                            ),
                            Positioned(
                              right: 0,
                              top: 0,
                              child: Container(
                                width: 12,
                                height: 12,
                                decoration: BoxDecoration(
                                  color: palette.secondary,
                                  shape: BoxShape.circle,
                                  border: Border.all(
                                    color: Colors.white,
                                    width: 2,
                                  ),
                                ),
                              ).animate(onPlay: (controller) => controller.repeat())
                                .scale(
                                  begin: 0.8,
                                  end: 1.2,
                                  duration: 1.seconds,
                                  curve: Curves.easeInOut,
                                )
                                .then()
                                .scale(
                                  begin: 1.2,
                                  end: 0.8,
                                  duration: 1.seconds,
                                  curve: Curves.easeInOut,
                                ),
                            ),
                          ],
                        ),
                      ).animate()
                        .scale(delay: 500.ms, duration: 600.ms)
                        .fadeIn(),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
  
  Widget _buildWelcomeSection(
    AppLocalizations l10n,
    ThemeData theme,
    bool isArabic,
  ) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '${l10n.welcome}${isArabic ? ' أحمد' : ' Ahmed'} 👋',
            style: theme.textTheme.headlineLarge?.copyWith(
              fontWeight: FontWeight.bold,
            ),
          ).animate()
            .fadeIn(duration: 600.ms)
            .slideX(
              begin: isArabic ? 0.1 : -0.1,
              end: 0,
              duration: 600.ms,
            ),
          
          const SizedBox(height: 8),
          
          Text(
            isArabic 
              ? 'واصل رحلتك التعليمية اليوم'
              : 'Continue your learning journey today',
            style: theme.textTheme.bodyLarge?.copyWith(
              color: theme.colorScheme.onSurface.withValues(alpha: 0.7),
            ),
          ).animate()
            .fadeIn(delay: 200.ms, duration: 600.ms)
            .slideX(
              begin: isArabic ? 0.1 : -0.1,
              end: 0,
              duration: 600.ms,
            ),
        ],
      ),
    );
  }
  
  Widget _buildProgressSection(
    AppLocalizations l10n,
    ThemeData theme,
    ColorPalette palette,
  ) {
    return SizedBox(
      height: 180,
      child: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        scrollDirection: Axis.horizontal,
        children: [
          _buildProgressCard(
            title: l10n.progress,
            subtitle: '${l10n.formatNumber(15)} ${l10n.lessons}',
            progress: 0.75,
            icon: Icons.trending_up,
            gradient: LinearGradient(
              colors: [palette.primary, palette.secondary],
            ),
            theme: theme,
          ),
          const SizedBox(width: 16),
          _buildProgressCard(
            title: 'الوقت المستثمر',
            subtitle: '${l10n.formatNumber(24)} ${l10n.hours}',
            progress: 0.60,
            icon: Icons.access_time,
            gradient: LinearGradient(
              colors: [palette.secondary, palette.tertiary],
            ),
            theme: theme,
          ),
          const SizedBox(width: 16),
          _buildProgressCard(
            title: 'الشهادات',
            subtitle: '${l10n.formatNumber(3)} مكتملة',
            progress: 0.30,
            icon: Icons.emoji_events,
            gradient: LinearGradient(
              colors: [palette.tertiary, palette.primary],
            ),
            theme: theme,
          ),
        ],
      ),
    );
  }
  
  Widget _buildProgressCard({
    required String title,
    required String subtitle,
    required double progress,
    required IconData icon,
    required LinearGradient gradient,
    required ThemeData theme,
  }) {
    return GlassMorphicCard(
      width: 200,
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  gradient: gradient,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(
                  icon,
                  color: Colors.white,
                  size: 24,
                ),
              ).animate(onPlay: (controller) => controller.repeat())
                .rotate(
                  duration: 3.seconds,
                  curve: Curves.easeInOut,
                ),
              
              Text(
                '${(progress * 100).toInt()}%',
                style: theme.textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                  foreground: Paint()
                    ..shader = gradient.createShader(
                      const Rect.fromLTWH(0, 0, 100, 50),
                    ),
                ),
              ),
            ],
          ),
          
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                subtitle,
                style: theme.textTheme.bodySmall,
              ),
              const SizedBox(height: 12),
              AnimatedProgressIndicator(
                value: progress,
                gradient: gradient,
              ),
            ],
          ),
        ],
      ),
    ).animate()
      .fadeIn(duration: 600.ms)
      .scale(
        begin: 0.9,
        end: 1,
        duration: 600.ms,
        curve: Curves.easeOut,
      );
  }
  
  Widget _buildContinueWatchingSection(
    AppLocalizations l10n,
    ThemeData theme,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.all(20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                l10n.continueWatching,
                style: theme.textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              TextButton(
                onPressed: () {},
                child: Text(l10n.seeAll ?? 'See All'),
              ),
            ],
          ),
        ),
        
        SizedBox(
          height: 220,
          child: AnimationLimiter(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              scrollDirection: Axis.horizontal,
              itemCount: 5,
              itemBuilder: (context, index) {
                return AnimationConfiguration.staggeredList(
                  position: index,
                  duration: const Duration(milliseconds: 600),
                  horizontalOffset: 50.0,
                  child: SlideAnimation(
                    child: FadeInAnimation(
                      child: Padding(
                        padding: const EdgeInsets.only(right: 16),
                        child: _buildContinueWatchingCard(theme, index),
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ),
      ],
    );
  }
  
  Widget _buildContinueWatchingCard(ThemeData theme, int index) {
    final subjects = ['الرياضيات', 'الفيزياء', 'الكيمياء', 'الأحياء', 'اللغة العربية'];
    final progress = [0.75, 0.45, 0.90, 0.30, 0.60];
    
    return Container(
      width: 300,
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(AppTheme.borderRadiusLarge),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.08),
            blurRadius: 16,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Thumbnail with play button
          Stack(
            children: [
              Container(
                height: 120,
                decoration: BoxDecoration(
                  borderRadius: const BorderRadius.vertical(
                    top: Radius.circular(AppTheme.borderRadiusLarge),
                  ),
                  gradient: LinearGradient(
                    colors: [
                      theme.colorScheme.primary.withValues(alpha: 0.8),
                      theme.colorScheme.secondary.withValues(alpha: 0.8),
                    ],
                  ),
                ),
                child: Center(
                  child: Text(
                    subjects[index],
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Cairo',
                    ),
                  ),
                ),
              ),
              
              // Play button
              Positioned.fill(
                child: Center(
                  child: Container(
                    width: 56,
                    height: 56,
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.9),
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.2),
                          blurRadius: 12,
                        ),
                      ],
                    ),
                    child: Icon(
                      Icons.play_arrow_rounded,
                      color: theme.colorScheme.primary,
                      size: 32,
                    ),
                  ).animate(onPlay: (controller) => controller.repeat())
                    .scale(
                      begin: 0.9,
                      end: 1.1,
                      duration: 1.5.seconds,
                      curve: Curves.easeInOut,
                    )
                    .then()
                    .scale(
                      begin: 1.1,
                      end: 0.9,
                      duration: 1.5.seconds,
                      curve: Curves.easeInOut,
                    ),
                ),
              ),
            ],
          ),
          
          // Content
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'الفصل ${index + 3}: المعادلات التفاضلية',
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${(progress[index] * 100).toInt()}% مكتمل',
                  style: theme.textTheme.bodySmall,
                ),
                const SizedBox(height: 8),
                AnimatedProgressIndicator(
                  value: progress[index],
                  height: 6,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
  
  Widget _buildPopularCoursesSection(
    AppLocalizations l10n,
    ThemeData theme,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.all(20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                l10n.popularCourses,
                style: theme.textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              TextButton(
                onPressed: () {},
                child: Text(l10n.seeAll ?? 'See All'),
              ),
            ],
          ),
        ),
        
        AnimationLimiter(
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: 3,
            itemBuilder: (context, index) {
              return AnimationConfiguration.staggeredList(
                position: index,
                duration: const Duration(milliseconds: 600),
                child: SlideAnimation(
                  verticalOffset: 50.0,
                  child: FadeInAnimation(
                    child: Padding(
                      padding: const EdgeInsets.only(bottom: 16),
                      child: AnimatedCourseCard(
                        title: 'دورة شاملة في ${['الفيزياء', 'الكيمياء', 'الأحياء'][index]} - الصف الثاني عشر',
                        instructor: 'د. ${['محمد أحمد', 'فاطمة علي', 'أحمد حسن'][index]}',
                        imageUrl: 'https://picsum.photos/400/200?random=$index',
                        rating: [4.8, 4.9, 4.7][index],
                        studentsCount: [1234, 2345, 987][index],
                        price: [500, 600, 450][index],
                        isEnrolled: index == 0,
                        onTap: () {},
                      ),
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
  
  Widget _buildBottomNavigationBar(
    AppLocalizations l10n,
    ThemeData theme,
    ColorPalette palette,
  ) {
    return Positioned(
      bottom: 0,
      left: 0,
      right: 0,
      child: Container(
        decoration: BoxDecoration(
          color: theme.colorScheme.surface.withValues(alpha: 0.95),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.1),
              blurRadius: 20,
              offset: const Offset(0, -5),
            ),
          ],
        ),
        child: SafeArea(
          top: false,
          child: Container(
            height: 70,
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildNavItem(
                  icon: Icons.home_rounded,
                  label: l10n.home,
                  isSelected: true,
                  theme: theme,
                  palette: palette,
                ),
                _buildNavItem(
                  icon: Icons.school_rounded,
                  label: l10n.courses,
                  isSelected: false,
                  theme: theme,
                  palette: palette,
                ),
                _buildNavItem(
                  icon: Icons.quiz_rounded,
                  label: l10n.quiz,
                  isSelected: false,
                  theme: theme,
                  palette: palette,
                ),
                _buildNavItem(
                  icon: Icons.person_rounded,
                  label: l10n.profile,
                  isSelected: false,
                  theme: theme,
                  palette: palette,
                ),
              ],
            ),
          ),
        ),
      ).animate()
        .slideY(
          begin: 1,
          end: 0,
          delay: 800.ms,
          duration: 600.ms,
          curve: Curves.easeOut,
        ),
    );
  }
  
  Widget _buildNavItem({
    required IconData icon,
    required String label,
    required bool isSelected,
    required ThemeData theme,
    required ColorPalette palette,
  }) {
    return GestureDetector(
      onTap: () {},
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        padding: EdgeInsets.symmetric(
          horizontal: isSelected ? 20 : 12,
          vertical: 8,
        ),
        decoration: BoxDecoration(
          color: isSelected ? palette.primary.withValues(alpha: 0.1) : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          children: [
            Icon(
              icon,
              color: isSelected ? palette.primary : theme.colorScheme.onSurface.withValues(alpha: 0.6),
              size: 24,
            ),
            if (isSelected) ...[
              const SizedBox(width: 8),
              Text(
                label,
                style: TextStyle(
                  color: palette.primary,
                  fontWeight: FontWeight.w600,
                  fontSize: 14,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
  
  void _showThemePicker(BuildContext context) {
    final theme = Theme.of(context);
    
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        decoration: BoxDecoration(
          color: theme.colorScheme.surface,
          borderRadius: const BorderRadius.vertical(
            top: Radius.circular(24),
          ),
        ),
        child: SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 40,
                height: 4,
                margin: const EdgeInsets.symmetric(vertical: 12),
                decoration: BoxDecoration(
                  color: theme.colorScheme.onSurface.withValues(alpha: 0.2),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Choose Theme',
                      style: theme.textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 20),
                    ...AppTheme.palettes.entries.map((entry) {
                      final paletteName = entry.key;
                      final palette = entry.value;
                      
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: ListTile(
                          onTap: () {
                            ref.read(colorPaletteProvider.notifier)
                                .setPalette(paletteName);
                            Navigator.pop(context);
                          },
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                          tileColor: theme.colorScheme.surfaceContainerHighest,
                          leading: Container(
                            width: 48,
                            height: 48,
                            decoration: BoxDecoration(
                              gradient: palette.gradient,
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          title: Text(
                            palette.name,
                            style: const TextStyle(
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          trailing: ref.watch(colorPaletteProvider) == paletteName
                              ? Icon(
                                  Icons.check_circle,
                                  color: theme.colorScheme.primary,
                                )
                              : null,
                        ).animate()
                          .fadeIn(delay: (100 * entry.key.length).ms)
                          .slideX(begin: 0.2, end: 0),
                      );
                    }),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}