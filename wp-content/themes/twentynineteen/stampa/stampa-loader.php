<?php
/**
 * Loading utility for Stampa
 *
 * !DO NOT EDIT THIS FILE BECAUSE IT WILL BE OVERWRITE WHEN GENERATING A BLOCK!
 *
 * @package stampa
 */

namespace Stampa\Loader;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'wp_head', __NAMESPACE__ . '\register_blocks_render_callback' );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\load_stampa_editor_css', 999 );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\load_blocks_style', 999 );
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\load_blocks_style', 999 );
add_filter( 'block_categories', __NAMESPACE__ . '\register_stampa_blocks_category', 10, 2 );
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_blocks' );

/**
 * Register the new "Stampa blocks"
 *
 * NOTE: The Group title can be update as you like, but not the slug.
 *
 * @param array $categories array of block categories.
 * @param mixed $post the current post.
 */
function register_stampa_blocks_category( $categories, $post ) {
	return array_merge(
		$categories,
		[
			[
				'slug'  => 'stampa-blocks',
				'title' => __( 'Stampa Blocks', 'stampa' ),
			],
		]
	);
}

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function enqueue_blocks() {
	wp_enqueue_script(
		'stampa-blocks-js',
		get_template_directory_uri() . '/stampa/dist/index.js',
		[ 'wp-blocks', 'wp-i18n', 'wp-element' ],
		filemtime( __DIR__ . '/dist/index.js' ),
		true
	);
}

/**
 * Define the render callback for each block
 *
 * @return void
 */
function register_blocks_render_callback() {
	$files = glob( __DIR__ . '/blocks/*.js' );

	if ( wp_doing_ajax() || is_admin() ) {
		return;
	}

	foreach ( $files as $file ) {
		$block = sanitize_title( basename( $file ) );
		$block = str_replace( '-js', '', $block );

		register_block_type(
			'stampa/' . sanitize_title( $block ),
			[
				'render_callback' => function( $attributes ) use ( $block ) {
					$module_file = get_template_directory() . "/stampa/modules/${block}.php";

					if ( file_exists( $module_file ) ) {
						extract( $attributes, EXTR_SKIP );
						unset( $attributes );

						ob_start();

						include $module_file;

						return ob_get_clean();
					}
				},
			]
		);
	}
}

function load_stampa_editor_css() {
	wp_enqueue_style( 'stampa-editor', get_template_directory_uri() . '/stampa/css/stampa-editor.css', [], '1.0' );
}

function load_blocks_style() {
	wp_enqueue_style( 'stampa-blocks-style', get_template_directory_uri() . '/stampa/dist/index.css', [], '1.0' );
}
