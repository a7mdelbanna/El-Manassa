import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:reactive_forms/reactive_forms.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/widgets/animated_widgets.dart';
import '../../../core/localization/app_localizations.dart';
import '../../../shared/providers/theme_provider.dart';
import '../../../shared/providers/locale_provider.dart';
import '../../home/presentation/home_screen.dart';
import 'register_screen.dart';
import 'forgot_password_screen.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});
  
  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> 
    with TickerProviderStateMixin {
  late AnimationController _backgroundController;
  late AnimationController _formController;
  bool _isPasswordVisible = false;
  bool _isLoading = false;
  
  final form = FormGroup({
    'email': FormControl<String>(
      validators: [Validators.required, Validators.email],
    ),
    'password': FormControl<String>(
      validators: [Validators.required, Validators.minLength(6)],
    ),
    'rememberMe': FormControl<bool>(value: false),
  });
  
  @override
  void initState() {
    super.initState();
    
    _backgroundController = AnimationController(
      duration: const Duration(seconds: 20),
      vsync: this,
    )..repeat();
    
    _formController = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    )..forward();
  }
  
  @override
  void dispose() {
    _backgroundController.dispose();
    _formController.dispose();
    super.dispose();
  }
  
  Future<void> _handleLogin() async {
    if (form.valid) {
      setState(() {
        _isLoading = true;
      });
      
      // Simulate API call
      await Future.delayed(const Duration(seconds: 2));
      
      if (mounted) {
        Navigator.pushReplacement(
          context,
          PageRouteBuilder(
            pageBuilder: (context, animation, secondaryAnimation) => 
                const HomeScreen(),
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
    } else {
      form.markAllAsTouched();
    }
  }
  
  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);
    final currentPalette = ref.watch(colorPaletteProvider);
    final palette = AppTheme.palettes[currentPalette]!;
    final isArabic = ref.watch(localeProvider).languageCode == 'ar';
    final size = MediaQuery.of(context).size;
    
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
                      palette.primary.withValues(alpha: 0.1),
                      palette.background,
                      palette.secondary.withValues(alpha: 0.05),
                    ],
                    transform: GradientRotation(_backgroundController.value * 6.28),
                  ),
                ),
              );
            },
          ),
          
          // Floating shapes
          ..._buildFloatingShapes(size, palette),
          
          // Main content
          SafeArea(
            child: ReactiveForm(
              formGroup: form,
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      const SizedBox(height: 40),
                      
                      // Logo and title
                      _buildHeader(theme, palette, l10n, isArabic),
                      
                      const SizedBox(height: 60),
                      
                      // Form fields
                      _buildForm(l10n, theme, isArabic),
                      
                      const SizedBox(height: 40),
                      
                      // Login button
                      AnimatedGradientButton(
                        text: l10n.login,
                        onPressed: _handleLogin,
                        isLoading: _isLoading,
                        gradient: LinearGradient(
                          colors: [palette.primary, palette.secondary],
                        ),
                      ).animate(controller: _formController)
                        .fadeIn(delay: 800.ms)
                        .slideY(begin: 0.3, end: 0),
                      
                      const SizedBox(height: 24),
                      
                      // Social login
                      _buildSocialLogin(l10n, theme),
                      
                      const SizedBox(height: 40),
                      
                      // Register link
                      _buildRegisterLink(l10n, theme, isArabic),
                    ],
                  ),
                ),
              ),
            ),
          ),
          
          // Language switcher
          Positioned(
            top: MediaQuery.of(context).padding.top + 10,
            right: isArabic ? null : 20,
            left: isArabic ? 20 : null,
            child: IconButton(
              onPressed: () {
                ref.read(localeProvider.notifier).toggleLocale();
              },
              icon: Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: theme.colorScheme.surface,
                  borderRadius: BorderRadius.circular(12),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.05),
                      blurRadius: 10,
                    ),
                  ],
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
              .fadeIn(delay: 1000.ms)
              .scale(begin: 0.8),
          ),
        ],
      ),
    );
  }
  
  List<Widget> _buildFloatingShapes(Size size, ColorPalette palette) {
    return [
      Positioned(
        top: -100,
        right: -100,
        child: Container(
          width: 200,
          height: 200,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: RadialGradient(
              colors: [
                palette.primary.withValues(alpha: 0.2),
                palette.primary.withValues(alpha: 0.0),
              ],
            ),
          ),
        ).animate(onPlay: (controller) => controller.repeat())
          .scale(
            begin: 0.8,
            end: 1.2,
            duration: 4.seconds,
            curve: Curves.easeInOut,
          )
          .then()
          .scale(
            begin: 1.2,
            end: 0.8,
            duration: 4.seconds,
            curve: Curves.easeInOut,
          ),
      ),
      Positioned(
        bottom: -80,
        left: -80,
        child: Container(
          width: 160,
          height: 160,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: RadialGradient(
              colors: [
                palette.secondary.withValues(alpha: 0.2),
                palette.secondary.withValues(alpha: 0.0),
              ],
            ),
          ),
        ).animate(onPlay: (controller) => controller.repeat())
          .scale(
            begin: 1.0,
            end: 1.3,
            duration: 5.seconds,
            curve: Curves.easeInOut,
          )
          .then()
          .scale(
            begin: 1.3,
            end: 1.0,
            duration: 5.seconds,
            curve: Curves.easeInOut,
          ),
      ),
    ];
  }
  
  Widget _buildHeader(
    ThemeData theme,
    ColorPalette palette,
    AppLocalizations l10n,
    bool isArabic,
  ) {
    return Column(
      children: [
        // Logo
        Container(
          width: 100,
          height: 100,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(24),
            boxShadow: [
              BoxShadow(
                color: palette.primary.withValues(alpha: 0.3),
                blurRadius: 20,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: Center(
            child: Text(
              isArabic ? 'م' : 'M',
              style: TextStyle(
                fontSize: 48,
                fontWeight: FontWeight.bold,
                color: palette.primary,
              ),
            ),
          ),
        ).animate(controller: _formController)
          .scale(
            begin: 0,
            end: 1,
            duration: 600.ms,
            curve: Curves.elasticOut,
          ),
        
        const SizedBox(height: 24),
        
        // Welcome text
        Text(
          l10n.welcomeBack,
          style: theme.textTheme.headlineLarge?.copyWith(
            fontWeight: FontWeight.bold,
          ),
          textAlign: TextAlign.center,
        ).animate(controller: _formController)
          .fadeIn(delay: 200.ms)
          .slideY(begin: 0.3, end: 0),
        
        const SizedBox(height: 8),
        
        Text(
          isArabic
            ? 'سجل دخولك للمتابعة إلى حسابك'
            : 'Sign in to continue to your account',
          style: theme.textTheme.bodyLarge?.copyWith(
            color: theme.colorScheme.onSurface.withValues(alpha: 0.7),
          ),
          textAlign: TextAlign.center,
        ).animate(controller: _formController)
          .fadeIn(delay: 300.ms)
          .slideY(begin: 0.3, end: 0),
      ],
    );
  }
  
  Widget _buildForm(
    AppLocalizations l10n,
    ThemeData theme,
    bool isArabic,
  ) {
    return Column(
      children: [
        // Email field
        ReactiveTextField<String>(
          formControlName: 'email',
          decoration: InputDecoration(
            labelText: l10n.email,
            hintText: isArabic 
              ? 'أدخل بريدك الإلكتروني'
              : 'Enter your email',
            prefixIcon: const Icon(Icons.email_outlined),
          ),
          keyboardType: TextInputType.emailAddress,
          textInputAction: TextInputAction.next,
        ).animate(controller: _formController)
          .fadeIn(delay: 400.ms)
          .slideX(begin: isArabic ? 0.1 : -0.1, end: 0),
        
        const SizedBox(height: 20),
        
        // Password field
        ReactiveTextField<String>(
          formControlName: 'password',
          decoration: InputDecoration(
            labelText: l10n.password,
            hintText: isArabic
              ? 'أدخل كلمة المرور'
              : 'Enter your password',
            prefixIcon: const Icon(Icons.lock_outline),
            suffixIcon: IconButton(
              icon: Icon(
                _isPasswordVisible
                  ? Icons.visibility_off_outlined
                  : Icons.visibility_outlined,
              ),
              onPressed: () {
                setState(() {
                  _isPasswordVisible = !_isPasswordVisible;
                });
              },
            ),
          ),
          obscureText: !_isPasswordVisible,
          textInputAction: TextInputAction.done,
          onSubmitted: (_) => _handleLogin(),
        ).animate(controller: _formController)
          .fadeIn(delay: 500.ms)
          .slideX(begin: isArabic ? 0.1 : -0.1, end: 0),
        
        const SizedBox(height: 16),
        
        // Remember me and forgot password
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            // Remember me
            Row(
              children: [
                ReactiveCheckbox(
                  formControlName: 'rememberMe',
                ),
                const SizedBox(width: 8),
                Text(
                  l10n.rememberMe,
                  style: theme.textTheme.bodyMedium,
                ),
              ],
            ),
            
            // Forgot password
            TextButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const ForgotPasswordScreen(),
                  ),
                );
              },
              child: Text(
                l10n.forgotPassword,
                style: TextStyle(
                  color: theme.colorScheme.primary,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        ).animate(controller: _formController)
          .fadeIn(delay: 600.ms),
      ],
    );
  }
  
  Widget _buildSocialLogin(AppLocalizations l10n, ThemeData theme) {
    return Column(
      children: [
        Row(
          children: [
            Expanded(
              child: Divider(
                color: theme.colorScheme.onSurface.withValues(alpha: 0.2),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Text(
                l10n.orContinueWith,
                style: theme.textTheme.bodySmall,
              ),
            ),
            Expanded(
              child: Divider(
                color: theme.colorScheme.onSurface.withValues(alpha: 0.2),
              ),
            ),
          ],
        ).animate(controller: _formController)
          .fadeIn(delay: 900.ms),
        
        const SizedBox(height: 24),
        
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _buildSocialButton(
              icon: Icons.g_mobiledata,
              color: const Color(0xFFDB4437),
              onTap: () {},
            ),
            const SizedBox(width: 16),
            _buildSocialButton(
              icon: Icons.facebook,
              color: const Color(0xFF1877F2),
              onTap: () {},
            ),
            const SizedBox(width: 16),
            _buildSocialButton(
              icon: Icons.apple,
              color: Colors.black,
              onTap: () {},
            ),
          ],
        ).animate(controller: _formController)
          .fadeIn(delay: 1000.ms)
          .scale(begin: 0.8),
      ],
    );
  }
  
  Widget _buildSocialButton({
    required IconData icon,
    required Color color,
    required VoidCallback onTap,
  }) {
    final theme = Theme.of(context);
    
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        width: 56,
        height: 56,
        decoration: BoxDecoration(
          color: theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: theme.colorScheme.onSurface.withValues(alpha: 0.1),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.05),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Icon(
          icon,
          color: color,
          size: 28,
        ),
      ),
    );
  }
  
  Widget _buildRegisterLink(
    AppLocalizations l10n,
    ThemeData theme,
    bool isArabic,
  ) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          isArabic ? 'ليس لديك حساب؟' : "Don't have an account?",
          style: theme.textTheme.bodyMedium,
        ),
        TextButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => const RegisterScreen(),
              ),
            );
          },
          child: Text(
            l10n.register,
            style: TextStyle(
              color: theme.colorScheme.primary,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ],
    ).animate(controller: _formController)
      .fadeIn(delay: 1100.ms);
  }
}