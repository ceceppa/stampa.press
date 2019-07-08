<?php
/**
 * Loading utility for Stampa
 *
 * @package stampa
 */

namespace Stampa\Loader;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Register a new Gutenbeg category.
add_filter( 'block_categories', __NAMESPACE__ . '\register_stampa_blocks_category', 10, 2 );

// Load the custom blocks.
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_blocks' );

// The PHP block rendered.
// add_action( 'init', __NAMESPACE__ . '\block_renderer' );


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
		plugins_url( '/stampa/dist/index.js', dirname( __FILE__ ) ),
		[ 'wp-blocks', 'wp-i18n', 'wp-element' ],
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/index.js' ),
		true
	);
}

	/**
	 * Define the render callback for each block
	 *
	 * @return void
	 */
function block_renderer() {
	$files = glob( __DIR__ . '/blocks/*.js' );

	foreach ( $files as $file ) {
		$block = sanitize_title( basename( $file ) );
		$block = str_replace( '-js', '', $block );

		register_block_type(
			'stampa/' . sanitize_title( $block ),
			[
				'render_callback' => function( $attributes ) use ( $block ) {
					$module_file = __DIR__ . "/modules/${block}.php";
					extract( $attributes, EXTR_SKIP );
					unset( $attributes );

					include $module_file;
				},
			]
		);
	}
}

