import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:shimmer/shimmer.dart';
import 'package:glass_kit/glass_kit.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../theme/app_theme.dart';

// Animated gradient button with ripple effect
class AnimatedGradientButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final LinearGradient? gradient;
  final double? width;
  final double height;
  final bool isLoading;
  
  const AnimatedGradientButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.gradient,
    this.width,
    this.height = 56,
    this.isLoading = false,
  });
  
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final defaultGradient = gradient ?? LinearGradient(
      colors: [
        theme.colorScheme.primary,
        theme.colorScheme.secondary,
      ],
    );
    
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        gradient: defaultGradient,
        borderRadius: BorderRadius.circular(AppTheme.borderRadiusMedium),
        boxShadow: [
          BoxShadow(
            color: theme.colorScheme.primary.withValues(alpha: 0.3),
            blurRadius: 12,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: isLoading ? null : onPressed,
          borderRadius: BorderRadius.circular(AppTheme.borderRadiusMedium),
          child: Center(
            child: isLoading
                ? SizedBox(
                    width: 24,
                    height: 24,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      valueColor: AlwaysStoppedAnimation<Color>(
                        Colors.white.withValues(alpha: 0.9),
                      ),
                    ),
                  )
                : Text(
                    text,
                    style: theme.textTheme.titleMedium?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
          ),
        ),
      ),
    ).animate()
      .fadeIn(duration: 300.ms)
      .scale(
        begin: 0.95,
        end: 1,
        duration: 300.ms,
        curve: Curves.easeOut,
      );
  }
}

// Glass morphism card with hover effect
class GlassMorphicCard extends StatefulWidget {
  final Widget child;
  final double? width;
  final double? height;
  final EdgeInsetsGeometry? padding;
  final VoidCallback? onTap;
  
  const GlassMorphicCard({
    super.key,
    required this.child,
    this.width,
    this.height,
    this.padding,
    this.onTap,
  });
  
  @override
  State<GlassMorphicCard> createState() => _GlassMorphicCardState();
}

class _GlassMorphicCardState extends State<GlassMorphicCard> 
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 150),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 0.98,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    ));
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => _controller.forward(),
      onTapUp: (_) => _controller.reverse(),
      onTapCancel: () => _controller.reverse(),
      onTap: widget.onTap,
      child: AnimatedBuilder(
        animation: _scaleAnimation,
        builder: (context, child) {
          return Transform.scale(
            scale: _scaleAnimation.value,
            child: GlassContainer(
              width: widget.width,
              height: widget.height,
              gradient: LinearGradient(
                colors: [
                  Colors.white.withValues(alpha: 0.1),
                  Colors.white.withValues(alpha: 0.05),
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderGradient: LinearGradient(
                colors: [
                  Colors.white.withValues(alpha: 0.3),
                  Colors.white.withValues(alpha: 0.1),
                ],
              ),
              blur: 10,
              borderRadius: BorderRadius.circular(AppTheme.borderRadiusLarge),
              child: Padding(
                padding: widget.padding ?? const EdgeInsets.all(16),
                child: widget.child,
              ),
            ),
          );
        },
      ),
    ).animate()
      .fadeIn(duration: 500.ms)
      .slideY(begin: 0.1, end: 0, duration: 500.ms);
  }
}

// Shimmer loading widget
class ShimmerLoading extends StatelessWidget {
  final double width;
  final double height;
  final double borderRadius;
  
  const ShimmerLoading({
    super.key,
    required this.width,
    required this.height,
    this.borderRadius = 16,
  });
  
  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      baseColor: Colors.grey[300]!,
      highlightColor: Colors.grey[100]!,
      child: Container(
        width: width,
        height: height,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(borderRadius),
        ),
      ),
    );
  }
}

// Animated course card
class AnimatedCourseCard extends StatelessWidget {
  final String title;
  final String instructor;
  final String imageUrl;
  final double rating;
  final int studentsCount;
  final double price;
  final VoidCallback onTap;
  final bool isEnrolled;
  
  const AnimatedCourseCard({
    super.key,
    required this.title,
    required this.instructor,
    required this.imageUrl,
    required this.rating,
    required this.studentsCount,
    required this.price,
    required this.onTap,
    this.isEnrolled = false,
  });
  
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: double.infinity,
        height: 280,
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
            // Course image with gradient overlay
            Stack(
              children: [
                ClipRRect(
                  borderRadius: const BorderRadius.vertical(
                    top: Radius.circular(AppTheme.borderRadiusLarge),
                  ),
                  child: CachedNetworkImage(
                    imageUrl: imageUrl,
                    height: 160,
                    width: double.infinity,
                    fit: BoxFit.cover,
                    placeholder: (context, url) => const ShimmerLoading(
                      width: double.infinity,
                      height: 160,
                      borderRadius: 0,
                    ),
                    errorWidget: (context, url, error) => Container(
                      height: 160,
                      color: theme.colorScheme.surfaceContainerHighest,
                      child: const Icon(Icons.error),
                    ),
                  ),
                ),
                
                // Gradient overlay
                Positioned(
                  bottom: 0,
                  left: 0,
                  right: 0,
                  child: Container(
                    height: 80,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Colors.transparent,
                          Colors.black.withValues(alpha: 0.7),
                        ],
                      ),
                    ),
                  ),
                ),
                
                // Rating badge
                Positioned(
                  top: 12,
                  right: 12,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 6,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.black.withValues(alpha: 0.7),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(
                          Icons.star_rounded,
                          color: Colors.amber,
                          size: 16,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          rating.toStringAsFixed(1),
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ).animate()
                    .fadeIn(delay: 300.ms)
                    .slideX(begin: 0.2, end: 0),
                ),
                
                // Enrolled badge
                if (isEnrolled)
                  Positioned(
                    top: 12,
                    left: 12,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        color: theme.colorScheme.primary,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: const Text(
                        'Enrolled',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ).animate()
                      .fadeIn(delay: 300.ms)
                      .slideX(begin: -0.2, end: 0),
                  ),
              ],
            ),
            
            // Course details
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          title,
                          style: theme.textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: 4),
                        Text(
                          instructor,
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.colorScheme.onSurface.withValues(alpha: 0.7),
                          ),
                        ),
                      ],
                    ),
                    
                    // Bottom row
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Icon(
                              Icons.people_outline,
                              size: 16,
                              color: theme.colorScheme.onSurface.withValues(alpha: 0.6),
                            ),
                            const SizedBox(width: 4),
                            Text(
                              '$studentsCount',
                              style: theme.textTheme.bodySmall,
                            ),
                          ],
                        ),
                        Text(
                          isEnrolled ? 'Continue' : 'EGP ${price.toStringAsFixed(0)}',
                          style: theme.textTheme.titleMedium?.copyWith(
                            color: theme.colorScheme.primary,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ).animate()
        .fadeIn(duration: 500.ms)
        .scale(
          begin: 0.9,
          end: 1,
          duration: 500.ms,
          curve: Curves.easeOut,
        ),
    );
  }
}

// Animated progress indicator
class AnimatedProgressIndicator extends StatelessWidget {
  final double value;
  final double height;
  final Color? backgroundColor;
  final Gradient? gradient;
  
  const AnimatedProgressIndicator({
    super.key,
    required this.value,
    this.height = 8,
    this.backgroundColor,
    this.gradient,
  });
  
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final defaultGradient = gradient ?? LinearGradient(
      colors: [
        theme.colorScheme.primary,
        theme.colorScheme.secondary,
      ],
    );
    
    return Container(
      height: height,
      decoration: BoxDecoration(
        color: backgroundColor ?? 
            theme.colorScheme.onSurface.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(height / 2),
      ),
      child: TweenAnimationBuilder<double>(
        tween: Tween(begin: 0, end: value),
        duration: const Duration(milliseconds: 1500),
        curve: Curves.easeOutExpo,
        builder: (context, animatedValue, child) {
          return FractionallySizedBox(
            alignment: Alignment.centerLeft,
            widthFactor: animatedValue,
            child: Container(
              decoration: BoxDecoration(
                gradient: defaultGradient,
                borderRadius: BorderRadius.circular(height / 2),
                boxShadow: [
                  BoxShadow(
                    color: theme.colorScheme.primary.withValues(alpha: 0.3),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
            ).animate()
              .shimmer(
                duration: 2.seconds,
                delay: 1.second,
                color: Colors.white.withValues(alpha: 0.3),
              ),
          );
        },
      ),
    );
  }
}