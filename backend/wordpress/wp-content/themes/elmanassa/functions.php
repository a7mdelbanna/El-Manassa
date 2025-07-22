<?php
/**
 * El-Manassa WordPress Theme Functions
 * Custom theme for multi-tenant learning platform
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Theme setup
function elmanassa_setup() {
    // Add theme support
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));

    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'elmanassa'),
        'footer' => __('Footer Menu', 'elmanassa'),
    ));

    // Set content width
    global $content_width;
    if (!isset($content_width)) {
        $content_width = 1200;
    }
}
add_action('after_setup_theme', 'elmanassa_setup');

// Enqueue scripts and styles
function elmanassa_scripts() {
    // Theme stylesheet
    wp_enqueue_style('elmanassa-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Bootstrap CSS
    wp_enqueue_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css', array(), '5.3.0');
    
    // Custom CSS
    wp_enqueue_style('elmanassa-custom', get_template_directory_uri() . '/assets/css/custom.css', array('bootstrap'), '1.0.0');
    
    // Bootstrap JS
    wp_enqueue_script('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js', array(), '5.3.0', true);
    
    // Custom JS
    wp_enqueue_script('elmanassa-custom', get_template_directory_uri() . '/assets/js/custom.js', array('jquery'), '1.0.0', true);
    
    // Localize script for AJAX
    wp_localize_script('elmanassa-custom', 'elmanassa_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('elmanassa_nonce'),
    ));
}
add_action('wp_enqueue_scripts', 'elmanassa_scripts');

// Add REST API support for mobile apps
function elmanassa_rest_api_init() {
    // Enable CORS for mobile apps
    add_action('rest_api_init', function () {
        remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
        add_filter('rest_pre_serve_request', function ($value) {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
            header('Access-Control-Allow-Credentials: true');
            return $value;
        });
    }, 15);
}
add_action('init', 'elmanassa_rest_api_init');

// Custom post types for the learning platform
function elmanassa_custom_post_types() {
    // Announcements post type
    register_post_type('announcements', array(
        'labels' => array(
            'name' => __('Announcements', 'elmanassa'),
            'singular_name' => __('Announcement', 'elmanassa'),
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-megaphone',
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'show_in_rest' => true, // Enable for REST API
    ));

    // Resources post type
    register_post_type('resources', array(
        'labels' => array(
            'name' => __('Resources', 'elmanassa'),
            'singular_name' => __('Resource', 'elmanassa'),
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-download',
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'show_in_rest' => true,
    ));
}
add_action('init', 'elmanassa_custom_post_types');

// Custom fields for multi-tenancy
function elmanassa_add_tenant_fields() {
    // Add tenant selection to posts/courses
    add_meta_box(
        'tenant_selection',
        __('Tenant Assignment', 'elmanassa'),
        'elmanassa_tenant_meta_box',
        array('post', 'courses', 'announcements', 'resources'),
        'side',
        'high'
    );
}
add_action('add_meta_boxes', 'elmanassa_add_tenant_fields');

function elmanassa_tenant_meta_box($post) {
    wp_nonce_field('elmanassa_tenant_nonce', 'tenant_nonce');
    
    $tenants = get_option('elmanassa_tenants', array());
    $selected_tenants = get_post_meta($post->ID, '_elmanassa_tenants', true);
    
    if (!is_array($selected_tenants)) {
        $selected_tenants = array();
    }
    
    echo '<label for="elmanassa_tenants[]">' . __('Select Tenants:', 'elmanassa') . '</label><br>';
    
    if (empty($tenants)) {
        echo '<p>' . __('No tenants configured yet.', 'elmanassa') . '</p>';
        return;
    }
    
    foreach ($tenants as $tenant_id => $tenant_name) {
        $checked = in_array($tenant_id, $selected_tenants) ? 'checked="checked"' : '';
        echo '<label><input type="checkbox" name="elmanassa_tenants[]" value="' . esc_attr($tenant_id) . '" ' . $checked . '> ' . esc_html($tenant_name) . '</label><br>';
    }
}

// Save tenant assignments
function elmanassa_save_tenant_assignments($post_id) {
    if (!isset($_POST['tenant_nonce']) || !wp_verify_nonce($_POST['tenant_nonce'], 'elmanassa_tenant_nonce')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    $tenants = isset($_POST['elmanassa_tenants']) ? $_POST['elmanassa_tenants'] : array();
    update_post_meta($post_id, '_elmanassa_tenants', $tenants);
}
add_action('save_post', 'elmanassa_save_tenant_assignments');

// Add tenant management page
function elmanassa_admin_menu() {
    add_options_page(
        __('El-Manassa Settings', 'elmanassa'),
        __('El-Manassa', 'elmanassa'),
        'manage_options',
        'elmanassa-settings',
        'elmanassa_settings_page'
    );
}
add_action('admin_menu', 'elmanassa_admin_menu');

function elmanassa_settings_page() {
    if (isset($_POST['submit'])) {
        $tenants = array();
        if (isset($_POST['tenant_names'])) {
            foreach ($_POST['tenant_names'] as $index => $name) {
                if (!empty($name)) {
                    $tenants['tenant_' . $index] = sanitize_text_field($name);
                }
            }
        }
        update_option('elmanassa_tenants', $tenants);
        echo '<div class="notice notice-success"><p>' . __('Settings saved!', 'elmanassa') . '</p></div>';
    }
    
    $tenants = get_option('elmanassa_tenants', array());
    ?>
    <div class="wrap">
        <h1><?php _e('El-Manassa Settings', 'elmanassa'); ?></h1>
        
        <form method="post" action="">
            <h2><?php _e('Tenant Management', 'elmanassa'); ?></h2>
            <p><?php _e('Configure the different tenants (schools/institutions) for your multi-tenant platform:', 'elmanassa'); ?></p>
            
            <div id="tenant-list">
                <?php
                if (empty($tenants)) {
                    echo '<div class="tenant-item">
                        <input type="text" name="tenant_names[]" placeholder="' . __('Tenant Name', 'elmanassa') . '" />
                        <button type="button" class="button remove-tenant">' . __('Remove', 'elmanassa') . '</button>
                    </div>';
                } else {
                    foreach ($tenants as $tenant_id => $tenant_name) {
                        echo '<div class="tenant-item">
                            <input type="text" name="tenant_names[]" value="' . esc_attr($tenant_name) . '" />
                            <button type="button" class="button remove-tenant">' . __('Remove', 'elmanassa') . '</button>
                        </div>';
                    }
                }
                ?>
            </div>
            
            <button type="button" id="add-tenant" class="button"><?php _e('Add Tenant', 'elmanassa'); ?></button>
            
            <p class="submit">
                <input type="submit" name="submit" class="button-primary" value="<?php _e('Save Settings', 'elmanassa'); ?>" />
            </p>
        </form>
    </div>
    
    <script>
    jQuery(document).ready(function($) {
        $('#add-tenant').click(function() {
            $('#tenant-list').append('<div class="tenant-item"><input type="text" name="tenant_names[]" placeholder="<?php _e('Tenant Name', 'elmanassa'); ?>" /><button type="button" class="button remove-tenant"><?php _e('Remove', 'elmanassa'); ?></button></div>');
        });
        
        $(document).on('click', '.remove-tenant', function() {
            $(this).parent().remove();
        });
    });
    </script>
    
    <style>
    .tenant-item {
        margin-bottom: 10px;
    }
    .tenant-item input {
        width: 300px;
        margin-right: 10px;
    }
    </style>
    <?php
}

// Custom API endpoints
function elmanassa_register_api_routes() {
    register_rest_route('elmanassa/v1', '/tenants', array(
        'methods' => 'GET',
        'callback' => 'elmanassa_get_tenants',
        'permission_callback' => '__return_true',
    ));
    
    register_rest_route('elmanassa/v1', '/tenant-content/(?P<tenant_id>[a-zA-Z0-9_-]+)', array(
        'methods' => 'GET',
        'callback' => 'elmanassa_get_tenant_content',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'elmanassa_register_api_routes');

function elmanassa_get_tenants() {
    $tenants = get_option('elmanassa_tenants', array());
    return rest_ensure_response($tenants);
}

function elmanassa_get_tenant_content($request) {
    $tenant_id = $request['tenant_id'];
    
    // Get posts/courses for specific tenant
    $args = array(
        'post_type' => array('post', 'courses', 'announcements', 'resources'),
        'posts_per_page' => -1,
        'meta_query' => array(
            array(
                'key' => '_elmanassa_tenants',
                'value' => $tenant_id,
                'compare' => 'LIKE',
            ),
        ),
    );
    
    $posts = get_posts($args);
    
    $content = array();
    foreach ($posts as $post) {
        $content[] = array(
            'id' => $post->ID,
            'title' => $post->post_title,
            'content' => $post->post_content,
            'excerpt' => $post->post_excerpt,
            'type' => $post->post_type,
            'date' => $post->post_date,
            'thumbnail' => get_the_post_thumbnail_url($post->ID, 'medium'),
        );
    }
    
    return rest_ensure_response($content);
}

// Tutor LMS Customizations
function elmanassa_tutor_customizations() {
    if (!function_exists('tutor')) {
        return;
    }
    
    // Add tenant support to Tutor LMS courses
    add_action('tutor_course/single/after_content', 'elmanassa_display_course_tenants');
}
add_action('init', 'elmanassa_tutor_customizations');

function elmanassa_display_course_tenants() {
    global $post;
    $tenants = get_post_meta($post->ID, '_elmanassa_tenants', true);
    $all_tenants = get_option('elmanassa_tenants', array());
    
    if (!empty($tenants) && is_array($tenants)) {
        echo '<div class="course-tenants">';
        echo '<h4>' . __('Available for:', 'elmanassa') . '</h4>';
        echo '<ul>';
        foreach ($tenants as $tenant_id) {
            if (isset($all_tenants[$tenant_id])) {
                echo '<li>' . esc_html($all_tenants[$tenant_id]) . '</li>';
            }
        }
        echo '</ul>';
        echo '</div>';
    }
}

// Widget areas
function elmanassa_widgets_init() {
    register_sidebar(array(
        'name' => __('Sidebar', 'elmanassa'),
        'id' => 'sidebar-1',
        'description' => __('Add widgets here to appear in your sidebar.', 'elmanassa'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget' => '</section>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>',
    ));
    
    register_sidebar(array(
        'name' => __('Footer', 'elmanassa'),
        'id' => 'footer-1',
        'description' => __('Add widgets here to appear in your footer.', 'elmanassa'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget' => '</section>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>',
    ));
}
add_action('widgets_init', 'elmanassa_widgets_init');
?>