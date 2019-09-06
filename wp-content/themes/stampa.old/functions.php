<?php
/**
 * Stampa Theme
 *
 * @package starter-theme
 */

namespace Stampa\Theme;

define( 'THEME_VERSION', 123233 );

$stampa_loader = get_template_directory() . '/stampa/stampa-loader.php';
if ( file_exists( $stampa_loader ) ) {
	require $stampa_loader;
}
require get_template_directory() . '/inc/icon-functions.php';
require get_template_directory() . '/inc/extras.php';
require get_template_directory() . '/inc/shortcodes.php';

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function setup() {

	// Make theme available for translation.
	load_theme_textdomain( 'stella', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Let WordPress manage the document title.
	add_theme_support( 'title-tag' );

	// Enable support for Post Thumbnails on posts and pages.
	add_theme_support( 'post-thumbnails' );

	// Register nav menus.
	register_nav_menus(
		array(
			'primary' => esc_html__( 'Primary Menu', 'stella' ),
		)
	);

	// Switch default core markup for search form, comment form, and comment to output valid HTML5.
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		)
	);

	/**
	 * Add Custom Image Sizes.
	 */
	add_image_size( 'max-width', 2200, 2200 );
	add_image_size( 'mobile', 600, 600 );
}
add_action( 'after_setup_theme', __NAMESPACE__ . '\setup' );

/**
 * Register widget area.
 *
 * @return void
 */
function widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'stella' ),
			'id'            => 'sidebar-1',
			'description'   => '',
			'before_widget' => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', __NAMESPACE__ . '\widgets_init' );

/**
 * Enqueue scripts and styles.
 *
 * @return void
 */
function scripts() {

	// Use minified libraries if SCRIPT_DEBUG is turned off.
	$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

	// Load theme's stylesheet.
	wp_enqueue_style( 'stella-style', get_template_directory_uri() . '/style.css', array(), THEME_VERSION );

	$script = get_template_directory_uri() . '/assets/dist/build' . $suffix . '.js';
	wp_register_script( 'stella-script', $script, array( 'jquery' ), THEME_VERSION, true );

	// Enable XDEBUG for remote calls too.
	if ( defined( 'NINE3_DEV_SERVER' ) ) {
		$ajax_url = add_query_arg( 'XDEBUG_SESSION_START', 'docker', $ajax_url );
	}
	$data = array(
		'home_url' => home_url(),
		'nonce'    => wp_create_nonce( 'wp_rest' ),
		'debug'    => defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG,
	);
	wp_localize_script( 'stella-script', 'stella', $data );
	wp_enqueue_script( 'stella-script' );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\scripts' );

/**
 * Check that the admin email is not set to any 93digital account.
 */
if ( defined( 'NINE3_DEV_SERVER' ) ) {
	add_action(
		'admin_notices',
		function() {
			$email = get_option( 'admin_email' );

			if ( stripos( $email, '@93digital.co.uk' ) !== false ) {
				echo '<div class="notice notice-error"><p>Admin email is set to: ' . esc_html( $email ) . ', please amend it!</p></div>';
			}
		}
	);
}

/**
 * Dump the variable using Tracy
 *
 * @param mixed $data To be dumped to the screen.
 * @param bool  $exit Whether to exit the script after output.
 */
function dump( $data, $exit = false ) {
	if ( class_exists( 'Tracy\\Debugger' ) ) {
		\Tracy\Debugger::dump( $data );
	} else {
		error_log( print_r( $data, true ) );
	}

	if ( $exit ) {
		die();
	}
}
