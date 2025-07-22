import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:reactive_forms/reactive_forms.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/widgets/animated_widgets.dart';
import '../../../core/localization/app_localizations.dart';
import '../../../shared/providers/theme_provider.dart';
import '../../../shared/providers/locale_provider.dart';

class RegisterScreen extends ConsumerStatefulWidget {
  const RegisterScreen({super.key});
  
  @override
  ConsumerState<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends ConsumerState<RegisterScreen> 
    with TickerProviderStateMixin {
  late AnimationController _backgroundController;
  late AnimationController _formController;
  bool _isPasswordVisible = false;
  bool _isConfirmPasswordVisible = false;
  bool _isLoading = false;
  int _currentStep = 0;
  
  final form = FormGroup({
    // Step 1: Account info
    'email': FormControl<String>(
      validators: [Validators.required, Validators.email],
    ),
    'password': FormControl<String>(
      validators: [Validators.required, Validators.minLength(8)],
    ),
    'confirmPassword': FormControl<String>(
      validators: [Validators.required],
    ),
    
    // Step 2: Personal info
    'firstName': FormControl<String>(
      validators: [Validators.required],
    ),
    'lastName': FormControl<String>(
      validators: [Validators.required],
    ),
    'phone': FormControl<String>(
      validators: [Validators.required, Validators.pattern(r'^\+?[0-9]{10,15}$')],
    ),
    
    // Step 3: Educational info
    'gradeLevel': FormControl<int>(
      validators: [Validators.required],
    ),
    'school': FormControl<String>(),
    'parentPhone': FormControl<String>(
      validators: [Validators.pattern(r'^\+?[0-9]{10,15}$')],
    ),
  }, validators: [
    Validators.mustMatch('password', 'confirmPassword'),
  ]);
  
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
  
  void _nextStep() {
    if (_validateCurrentStep()) {
      if (_currentStep < 2) {
        setState(() {
          _currentStep++;
        });
        _formController.reset();
        _formController.forward();
      } else {
        _handleRegister();
      }
    }
  }
  
  void _previousStep() {
    if (_currentStep > 0) {
      setState(() {
        _currentStep--;
      });
      _formController.reset();
      _formController.forward();
    }
  }
  
  bool _validateCurrentStep() {
    switch (_currentStep) {
      case 0:
        final emailValid = form.control('email').valid;
        final passwordValid = form.control('password').valid;
        final confirmValid = form.control('confirmPassword').valid;
        final passwordsMatch = form.control('password').value == 
                              form.control('confirmPassword').value;
        
        if (!emailValid) form.control('email').markAsTouched();
        if (!passwordValid) form.control('password').markAsTouched();
        if (!confirmValid || !passwordsMatch) {
          form.control('confirmPassword').markAsTouched();
          form.control('confirmPassword').setErrors({'mustMatch': true});
        }
        
        return emailValid && passwordValid && confirmValid && passwordsMatch;
        
      case 1:
        final firstNameValid = form.control('firstName').valid;
        final lastNameValid = form.control('lastName').valid;
        final phoneValid = form.control('phone').valid;
        
        if (!firstNameValid) form.control('firstName').markAsTouched();
        if (!lastNameValid) form.control('lastName').markAsTouched();
        if (!phoneValid) form.control('phone').markAsTouched();
        
        return firstNameValid && lastNameValid && phoneValid;
        
      case 2:
        final gradeLevelValid = form.control('gradeLevel').valid;
        
        if (!gradeLevelValid) form.control('gradeLevel').markAsTouched();
        
        return gradeLevelValid;
        
      default:
        return false;
    }
  }
  
  Future<void> _handleRegister() async {
    setState(() {
      _isLoading = true;
    });
    
    // Simulate API call
    await Future.delayed(const Duration(seconds: 2));
    
    if (mounted) {
      // Show success dialog
      _showSuccessDialog();
    }
  }
  
  void _showSuccessDialog() {
    final theme = Theme.of(context);
    final palette = AppTheme.palettes[ref.read(colorPaletteProvider)]!;
    
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => Dialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
        ),
        child: Container(
          padding: const EdgeInsets.all(32),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(24),
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                palette.primary.withValues(alpha: 0.1),
                palette.secondary.withValues(alpha: 0.05),
              ],
            ),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 80,
                height: 80,
                decoration: BoxDecoration(
                  color: palette.primary.withValues(alpha: 0.1),
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  Icons.check_circle,
                  color: palette.primary,
                  size: 48,
                ),
              ).animate()
                .scale(
                  begin: 0,
                  end: 1,
                  duration: 500.ms,
                  curve: Curves.elasticOut,
                ),
              
              const SizedBox(height: 24),
              
              Text(
                'تم التسجيل بنجاح!',
                style: theme.textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ).animate()
                .fadeIn(delay: 200.ms),
              
              const SizedBox(height: 16),
              
              Text(
                'تم إنشاء حسابك بنجاح. يمكنك الآن تسجيل الدخول والبدء في التعلم.',
                style: theme.textTheme.bodyMedium,
                textAlign: TextAlign.center,
              ).animate()
                .fadeIn(delay: 300.ms),
              
              const SizedBox(height: 32),
              
              AnimatedGradientButton(
                text: 'تسجيل الدخول',
                onPressed: () {
                  Navigator.pop(context);
                  Navigator.pop(context);
                },
                gradient: LinearGradient(
                  colors: [palette.primary, palette.secondary],
                ),
              ).animate()
                .fadeIn(delay: 400.ms)
                .slideY(begin: 0.2, end: 0),
            ],
          ),
        ),
      ),
    );
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
                      palette.secondary.withValues(alpha: 0.1),
                      palette.background,
                      palette.primary.withValues(alpha: 0.05),
                    ],
                    transform: GradientRotation(_backgroundController.value * 6.28),
                  ),
                ),
              );
            },
          ),
          
          SafeArea(
            child: Column(
              children: [
                // Header with back button
                _buildHeader(theme, isArabic),
                
                // Progress indicator
                _buildProgressIndicator(palette),
                
                // Form content
                Expanded(
                  child: ReactiveForm(
                    formGroup: form,
                    child: SingleChildScrollView(
                      padding: const EdgeInsets.all(24),
                      child: AnimatedSwitcher(
                        duration: const Duration(milliseconds: 400),
                        transitionBuilder: (child, animation) {
                          return FadeTransition(
                            opacity: animation,
                            child: SlideTransition(
                              position: Tween<Offset>(
                                begin: const Offset(0.1, 0),
                                end: Offset.zero,
                              ).animate(animation),
                              child: child,
                            ),
                          );
                        },
                        child: _buildCurrentStep(l10n, theme, isArabic),
                      ),
                    ),
                  ),
                ),
                
                // Navigation buttons
                _buildNavigationButtons(l10n, palette),
              ],
            ),
          ),
        ],
      ),
    );
  }
  
  Widget _buildHeader(ThemeData theme, bool isArabic) {
    return Padding(
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
          ),
          
          const SizedBox(width: 16),
          
          Expanded(
            child: Text(
              _getStepTitle(),
              style: theme.textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }
  
  Widget _buildProgressIndicator(ColorPalette palette) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Row(
        children: List.generate(3, (index) {
          final isActive = index <= _currentStep;
          final isCompleted = index < _currentStep;
          
          return Expanded(
            child: Container(
              margin: EdgeInsets.only(
                left: index > 0 ? 8 : 0,
              ),
              child: Column(
                children: [
                  AnimatedContainer(
                    duration: const Duration(milliseconds: 300),
                    height: 4,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(2),
                      gradient: isActive
                          ? LinearGradient(
                              colors: [palette.primary, palette.secondary],
                            )
                          : null,
                      color: isActive 
                          ? null 
                          : palette.onSurface.withValues(alpha: 0.1),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      if (isCompleted)
                        Icon(
                          Icons.check_circle,
                          size: 20,
                          color: palette.primary,
                        ).animate()
                          .scale(
                            begin: 0,
                            end: 1,
                            duration: 300.ms,
                            curve: Curves.elasticOut,
                          ),
                      if (!isCompleted)
                        Container(
                          width: 20,
                          height: 20,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(
                              color: isActive 
                                  ? palette.primary 
                                  : palette.onSurface.withValues(alpha: 0.3),
                              width: 2,
                            ),
                          ),
                          child: isActive
                              ? Center(
                                  child: Container(
                                    width: 10,
                                    height: 10,
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      color: palette.primary,
                                    ),
                                  ),
                                )
                              : null,
                        ),
                    ],
                  ),
                ],
              ),
            ),
          );
        }),
      ),
    );
  }
  
  Widget _buildCurrentStep(
    AppLocalizations l10n,
    ThemeData theme,
    bool isArabic,
  ) {
    switch (_currentStep) {
      case 0:
        return _buildAccountStep(l10n, theme, isArabic);
      case 1:
        return _buildPersonalStep(l10n, theme, isArabic);
      case 2:
        return _buildEducationalStep(l10n, theme, isArabic);
      default:
        return const SizedBox.shrink();
    }
  }
  
  Widget _buildAccountStep(
    AppLocalizations l10n,
    ThemeData theme,
    bool isArabic,
  ) {
    return Column(
      key: const ValueKey(0),
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const SizedBox(height: 40),
        
        Text(
          isArabic ? 'معلومات الحساب' : 'Account Information',
          style: theme.textTheme.headlineMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
          textAlign: TextAlign.center,
        ).animate(controller: _formController)
          .fadeIn()
          .slideY(begin: 0.2, end: 0),
        
        const SizedBox(height: 40),
        
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
          .fadeIn(delay: 200.ms)
          .slideX(begin: isArabic ? 0.1 : -0.1, end: 0),
        
        const SizedBox(height: 20),
        
        ReactiveTextField<String>(
          formControlName: 'password',
          decoration: InputDecoration(
            labelText: l10n.password,
            hintText: isArabic
              ? 'أدخل كلمة مرور قوية'
              : 'Enter a strong password',
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
          textInputAction: TextInputAction.next,
        ).animate(controller: _formController)
          .fadeIn(delay: 300.ms)
          .slideX(begin: isArabic ? 0.1 : -0.1, end: 0),
        
        const SizedBox(height: 20),
        
        ReactiveTextField<String>(
          formControlName: 'confirmPassword',
          decoration: InputDecoration(
            labelText: l10n.confirmPassword,
            hintText: isArabic
              ? 'أعد إدخال كلمة المرور'
              : 'Re-enter your password',
            prefixIcon: const Icon(Icons.lock_outline),
            suffixIcon: IconButton(
              icon: Icon(
                _isConfirmPasswordVisible
                  ? Icons.visibility_off_outlined
                  : Icons.visibility_outlined,
              ),
              onPressed: () {
                setState(() {
                  _isConfirmPasswordVisible = !_isConfirmPasswordVisible;
                });
              },
            ),
          ),
          obscureText: !_isConfirmPasswordVisible,
          textInputAction: TextInputAction.done,
          validationMessages: {
            'mustMatch': (_) => isArabic 
                ? 'كلمة المرور غير متطابقة'
                : 'Passwords do not match',
          },
        ).animate(controller: _formController)
          .fadeIn(delay: 400.ms)
          .slideX(begin: isArabic ? 0.1 : -0.1, end: 0),
      ],
    );
  }
  
  Widget _buildPersonalStep(
    AppLocalizations l10n,
    ThemeData theme,
    bool isArabic,
  ) {
    return Column(
      key: const ValueKey(1),
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const SizedBox(height: 40),
        
        Text(
          isArabic ? 'المعلومات الشخصية' : 'Personal Information',
          style: theme.textTheme.headlineMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
          textAlign: TextAlign.center,
        ).animate(controller: _formController)
          .fadeIn()
          .slideY(begin: 0.2, end: 0),
        
        const SizedBox(height: 40),
        
        Row(
          children: [
            Expanded(
              child: ReactiveTextField<String>(
                formControlName: 'firstName',
                decoration: InputDecoration(
                  labelText: isArabic ? 'الاسم الأول' : 'First Name',
                  prefixIcon: const Icon(Icons.person_outline),
                ),
                textInputAction: TextInputAction.next,
              ).animate(controller: _formController)
                .fadeIn(delay: 200.ms)
                .slideX(begin: isArabic ? 0.1 : -0.1, end: 0),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: ReactiveTextField<String>(
                formControlName: 'lastName',
                decoration: InputDecoration(
                  labelText: isArabic ? 'اسم العائلة' : 'Last Name',
                  prefixIcon: const Icon(Icons.person_outline),
                ),
                textInputAction: TextInputAction.next,
              ).animate(controller: _formController)
                .fadeIn(delay: 300.ms)
                .slideX(begin: isArabic ? 0.1 : -0.1, end: 0),
            ),
          ],
        ),
        
        const SizedBox(height: 20),
        
        ReactiveTextField<String>(
          formControlName: 'phone',
          decoration: InputDecoration(
            labelText: isArabic ? 'رقم الهاتف' : 'Phone Number',
            hintText: isArabic ? 'مثال: 01234567890' : 'e.g. 01234567890',
            prefixIcon: const Icon(Icons.phone_outlined),
          ),
          keyboardType: TextInputType.phone,
          textInputAction: TextInputAction.done,
        ).animate(controller: _formController)
          .fadeIn(delay: 400.ms)
          .slideX(begin: isArabic ? 0.1 : -0.1, end: 0),
      ],
    );
  }
  
  Widget _buildEducationalStep(
    AppLocalizations l10n,
    ThemeData theme,
    bool isArabic,
  ) {
    final grades = List.generate(12, (index) => index + 1);
    
    return Column(
      key: const ValueKey(2),
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const SizedBox(height: 40),
        
        Text(
          isArabic ? 'المعلومات التعليمية' : 'Educational Information',
          style: theme.textTheme.headlineMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
          textAlign: TextAlign.center,
        ).animate(controller: _formController)
          .fadeIn()
          .slideY(begin: 0.2, end: 0),
        
        const SizedBox(height: 40),
        
        ReactiveDropdownField<int>(
          formControlName: 'gradeLevel',
          decoration: InputDecoration(
            labelText: isArabic ? 'الصف الدراسي' : 'Grade Level',
            prefixIcon: const Icon(Icons.school_outlined),
          ),
          items: grades.map((grade) {
            return DropdownMenuItem(
              value: grade,
              child: Text(
                isArabic ? 'الصف $grade' : 'Grade $grade',
              ),
            );
          }).toList(),
        ).animate(controller: _formController)
          .fadeIn(delay: 200.ms)
          .slideX(begin: isArabic ? 0.1 : -0.1, end: 0),
        
        const SizedBox(height: 20),
        
        ReactiveTextField<String>(
          formControlName: 'school',
          decoration: InputDecoration(
            labelText: isArabic ? 'اسم المدرسة (اختياري)' : 'School Name (Optional)',
            prefixIcon: const Icon(Icons.business_outlined),
          ),
          textInputAction: TextInputAction.next,
        ).animate(controller: _formController)
          .fadeIn(delay: 300.ms)
          .slideX(begin: isArabic ? 0.1 : -0.1, end: 0),
        
        const SizedBox(height: 20),
        
        ReactiveTextField<String>(
          formControlName: 'parentPhone',
          decoration: InputDecoration(
            labelText: isArabic 
                ? 'رقم هاتف ولي الأمر (اختياري)' 
                : 'Parent Phone (Optional)',
            prefixIcon: const Icon(Icons.family_restroom_outlined),
          ),
          keyboardType: TextInputType.phone,
          textInputAction: TextInputAction.done,
        ).animate(controller: _formController)
          .fadeIn(delay: 400.ms)
          .slideX(begin: isArabic ? 0.1 : -0.1, end: 0),
      ],
    );
  }
  
  Widget _buildNavigationButtons(AppLocalizations l10n, ColorPalette palette) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, -5),
          ),
        ],
      ),
      child: Row(
        children: [
          if (_currentStep > 0)
            Expanded(
              child: OutlinedButton(
                onPressed: _previousStep,
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(AppTheme.borderRadiusMedium),
                  ),
                ),
                child: Text(l10n.back),
              ),
            ),
          if (_currentStep > 0) const SizedBox(width: 16),
          Expanded(
            flex: 2,
            child: AnimatedGradientButton(
              text: _currentStep < 2 ? l10n.next : l10n.register,
              onPressed: _nextStep,
              isLoading: _isLoading,
              gradient: LinearGradient(
                colors: [palette.primary, palette.secondary],
              ),
            ),
          ),
        ],
      ),
    );
  }
  
  String _getStepTitle() {
    switch (_currentStep) {
      case 0:
        return 'إنشاء حساب جديد';
      case 1:
        return 'معلوماتك الشخصية';
      case 2:
        return 'معلوماتك التعليمية';
      default:
        return '';
    }
  }
}