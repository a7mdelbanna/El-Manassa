import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:reactive_forms/reactive_forms.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/widgets/animated_widgets.dart';
import '../../../core/localization/app_localizations.dart';
import '../../../shared/providers/theme_provider.dart';
import '../../../shared/providers/locale_provider.dart';

class ForgotPasswordScreen extends ConsumerStatefulWidget {
  const ForgotPasswordScreen({super.key});
  
  @override
  ConsumerState<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends ConsumerState<ForgotPasswordScreen> 
    with TickerProviderStateMixin {
  late AnimationController _backgroundController;
  late AnimationController _contentController;
  bool _isLoading = false;
  bool _emailSent = false;
  
  final form = FormGroup({
    'email': FormControl<String>(
      validators: [Validators.required, Validators.email],
    ),
  });
  
  @override
  void initState() {
    super.initState();
    
    _backgroundController = AnimationController(
      duration: const Duration(seconds: 20),
      vsync: this,
    )..repeat();
    
    _contentController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    )..forward();
  }
  
  @override
  void dispose() {
    _backgroundController.dispose();
    _contentController.dispose();
    super.dispose();
  }
  
  Future<void> _handleResetPassword() async {
    if (form.valid) {
      setState(() {
        _isLoading = true;
      });
      
      // Simulate API call
      await Future.delayed(const Duration(seconds: 2));
      
      setState(() {
        _isLoading = false;
        _emailSent = true;
      });
      
      // Reset animation for success state
      _contentController.reset();
      _contentController.forward();
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
    
    return Scaffold(
      body: Stack(
        children: [
          // Animated background
          AnimatedBuilder(
            animation: _backgroundController,
            builder: (context, child) {
              return Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      palette.tertiary.withValues(alpha: 0.1),
                      palette.background,
                      palette.primary.withValues(alpha: 0.05),
                    ],
                    transform: GradientRotation(_backgroundController.value * 6.28),
                  ),
                ),
              );
            },
          ),
          
          // Animated circles
          Positioned(
            top: -50,
            left: -50,
            child: Container(
              width: 150,
              height: 150,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: palette.primary.withValues(alpha: 0.1),
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
          
          SafeArea(
            child: Column(
              children: [
                // Header with back button
                Padding(
                  padding: const EdgeInsets.all(20),
                  child: Row(
                    children: [
                      IconButton(
                        onPressed: () => Navigator.pop(context),
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
                          child: Icon(
                            isArabic ? Icons.arrow_forward : Icons.arrow_back,
                            color: theme.colorScheme.onSurface,
                          ),
                        ),
                      ).animate()
                        .fadeIn()
                        .scale(begin: 0.8),
                    ],
                  ),
                ),
                
                // Content
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(24),
                    child: _emailSent 
                        ? _buildSuccessContent(theme, palette, isArabic)
                        : _buildResetForm(l10n, theme, palette, isArabic),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
  
  Widget _buildResetForm(
    AppLocalizations l10n,
    ThemeData theme,
    ColorPalette palette,
    bool isArabic,
  ) {
    return ReactiveForm(
      formGroup: form,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 40),
          
          // Icon
          Container(
            width: 120,
            height: 120,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: LinearGradient(
                colors: [
                  palette.primary.withValues(alpha: 0.2),
                  palette.secondary.withValues(alpha: 0.1),
                ],
              ),
            ),
            child: Center(
              child: Icon(
                Icons.lock_reset,
                size: 60,
                color: palette.primary,
              ),
            ),
          ).animate(controller: _contentController)
            .scale(
              begin: 0,
              end: 1,
              duration: 600.ms,
              curve: Curves.elasticOut,
            ),
          
          const SizedBox(height: 40),
          
          // Title
          Text(
            l10n.resetPassword,
            style: theme.textTheme.headlineLarge?.copyWith(
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
          ).animate(controller: _contentController)
            .fadeIn(delay: 200.ms)
            .slideY(begin: 0.2, end: 0),
          
          const SizedBox(height: 16),
          
          // Description
          Text(
            isArabic
              ? 'أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور'
              : 'Enter your email and we\'ll send you a link to reset your password',
            style: theme.textTheme.bodyLarge?.copyWith(
              color: theme.colorScheme.onSurface.withValues(alpha: 0.7),
            ),
            textAlign: TextAlign.center,
          ).animate(controller: _contentController)
            .fadeIn(delay: 300.ms)
            .slideY(begin: 0.2, end: 0),
          
          const SizedBox(height: 40),
          
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
            textInputAction: TextInputAction.done,
            onSubmitted: (_) => _handleResetPassword(),
          ).animate(controller: _contentController)
            .fadeIn(delay: 400.ms)
            .slideX(begin: isArabic ? 0.1 : -0.1, end: 0),
          
          const SizedBox(height: 40),
          
          // Submit button
          AnimatedGradientButton(
            text: isArabic ? 'إرسال رابط الاستعادة' : 'Send Reset Link',
            onPressed: _handleResetPassword,
            isLoading: _isLoading,
            gradient: LinearGradient(
              colors: [palette.primary, palette.secondary],
            ),
          ).animate(controller: _contentController)
            .fadeIn(delay: 500.ms)
            .slideY(begin: 0.2, end: 0),
        ],
      ),
    );
  }
  
  Widget _buildSuccessContent(
    ThemeData theme,
    ColorPalette palette,
    bool isArabic,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const SizedBox(height: 40),
        
        // Success icon
        Container(
          width: 120,
          height: 120,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: palette.primary.withValues(alpha: 0.1),
          ),
          child: Center(
            child: Icon(
              Icons.mark_email_read,
              size: 60,
              color: palette.primary,
            ),
          ),
        ).animate(controller: _contentController)
          .scale(
            begin: 0,
            end: 1,
            duration: 600.ms,
            curve: Curves.elasticOut,
          ),
        
        const SizedBox(height: 40),
        
        // Success title
        Text(
          isArabic ? 'تم الإرسال!' : 'Email Sent!',
          style: theme.textTheme.headlineLarge?.copyWith(
            fontWeight: FontWeight.bold,
            color: palette.primary,
          ),
          textAlign: TextAlign.center,
        ).animate(controller: _contentController)
          .fadeIn(delay: 200.ms)
          .slideY(begin: 0.2, end: 0),
        
        const SizedBox(height: 16),
        
        // Success message
        Text(
          isArabic
            ? 'تم إرسال رابط إعادة تعيين كلمة المرور إلى\n${form.control('email').value}'
            : 'Password reset link has been sent to\n${form.control('email').value}',
          style: theme.textTheme.bodyLarge?.copyWith(
            color: theme.colorScheme.onSurface.withValues(alpha: 0.7),
          ),
          textAlign: TextAlign.center,
        ).animate(controller: _contentController)
          .fadeIn(delay: 300.ms)
          .slideY(begin: 0.2, end: 0),
        
        const SizedBox(height: 40),
        
        // Instructions
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: palette.primary.withValues(alpha: 0.05),
            borderRadius: BorderRadius.circular(AppTheme.borderRadiusMedium),
            border: Border.all(
              color: palette.primary.withValues(alpha: 0.2),
            ),
          ),
          child: Column(
            children: [
              Icon(
                Icons.info_outline,
                color: palette.primary,
                size: 32,
              ),
              const SizedBox(height: 12),
              Text(
                isArabic
                  ? 'تحقق من بريدك الإلكتروني واتبع التعليمات لإعادة تعيين كلمة المرور'
                  : 'Check your email and follow the instructions to reset your password',
                style: theme.textTheme.bodyMedium,
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ).animate(controller: _contentController)
          .fadeIn(delay: 400.ms)
          .scale(begin: 0.9, end: 1),
        
        const SizedBox(height: 40),
        
        // Back to login button
        OutlinedButton(
          onPressed: () => Navigator.pop(context),
          style: OutlinedButton.styleFrom(
            padding: const EdgeInsets.symmetric(vertical: 16),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(AppTheme.borderRadiusMedium),
            ),
          ),
          child: Text(
            isArabic ? 'العودة لتسجيل الدخول' : 'Back to Login',
          ),
        ).animate(controller: _contentController)
          .fadeIn(delay: 500.ms)
          .slideY(begin: 0.2, end: 0),
        
        const SizedBox(height: 20),
        
        // Resend link
        TextButton(
          onPressed: () {
            setState(() {
              _emailSent = false;
            });
            _contentController.reset();
            _contentController.forward();
          },
          child: Text(
            isArabic ? 'لم تستلم البريد؟ أعد الإرسال' : "Didn't receive email? Resend",
            style: TextStyle(
              color: palette.primary,
              fontWeight: FontWeight.w600,
            ),
          ),
        ).animate(controller: _contentController)
          .fadeIn(delay: 600.ms),
      ],
    );
  }
}