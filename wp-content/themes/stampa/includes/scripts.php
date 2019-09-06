<?php
namespace Semplice\Scripts;

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_scripts' );
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\deregister_unnecessary_scripts' );
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\remove_useless_emoji' );
add_filter( 'script_loader_tag', __NAMESPACE__ . '\add_defer_attribute', 10, 3 );

function enqueue_scripts() {
	wp_enqueue_script( 'semplice-js', get_template_directory_uri() . '/dist/script.js', [], SEMPLICE_THEME_VERSION, true );
}

/**
 * Prevent the loading of unecessary scripts like wp-embed and jQuery.
 */
function deregister_unnecessary_scripts() {
	wp_deregister_script( 'wp-embed' );

	$debug_enabled = defined( 'WP_DEBUG' ) && WP_DEBUG === true;
	if ( ! $debug_enabled ) {
		wp_deregister_script( 'jquery' );
	}
}

/**
 * Emoji are in 99.9999% of case useless, so let's don't waste
 * browser resources to load the CSS/JS for them.
 */
function remove_useless_emoji() {
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
}

/**
 * If you or some plugin uses inline jQuery (THIS SHOULD NEVER HAPPEN)
 * you need to exclude it from being deferred.
 *
 * NOTE: Do not defer ADMIN scripts
 */
function add_defer_attribute( $tag ) {
	if ( is_admin() ) {
		return $tag;
	}

	return str_replace( ' src', ' defer src', $tag );
}
