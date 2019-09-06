<?php

declare(strict_types=1);

/**
 * Plugin Name: Stampa
 *
 * @package stampa
 */

namespace Stampa;

/**
 * The Stampa class
 */
class Styles_Script {
	/**
	 * Register the filter/actions needed by stampa
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'init', [ & $this, 'register_stampa_blocks_cpt' ] );
		add_action( 'admin_enqueue_scripts', [ & $this, 'enqueue_styles' ], 99 );
		add_action( 'admin_enqueue_scripts', [ & $this, 'register_app_script' ], 99 );

		add_filter( 'replace_editor', [ & $this, 'replace_wp_editor' ], 10, 2 );
	}

	/**
	 * The CPT is used internally to take advantage of the buil-in WordPress functionalities
	 * such as list, add new and edit...
	 */
	public function register_stampa_blocks_cpt() : void {
		$args = [
			'public'            => false,
			'label'             => 'Stampa',
			'show_in_nav_menus' => true,
			'show_ui'           => true,
			'menu_position'     => 90,
			'supports'          => [ 'title' ],
			'labels'            => [
				'add_new'      => __( 'Add New Block', 'stampa' ),
				'add_new_item' => __( 'Add New Block', 'stampa' ),
				'edit_item'    => __( 'Edit Block', 'stampa' ),
			],
		];

		register_post_type( 'stampa-block', $args );
	}

	public function enqueue_styles() {
		wp_enqueue_style( 'stampa-app-style', plugins_url( 'dist/style.css', STAMPA_PLUGIN_PATH ), [ 'wp-block-library' ], STAMPA_VERSION );

		wp_enqueue_style( 'stampa-gutenberg-styles', plugins_url( 'assets/stampa/css/stampa-editor.css', STAMPA_PLUGIN_PATH ), [], STAMPA_VERSION );
	}

	public function register_app_script() : void {
		$data = $this->get_stampa_localized_data();

		wp_register_script( 'stampa-app-script', plugins_url( 'dist/index.js', STAMPA_PLUGIN_PATH ), [], STAMPA_VERSION, true );
		wp_localize_script( 'stampa-app-script', 'stampa', $data );
		wp_enqueue_script( 'stampa-app-script' );
	}

	private function get_stampa_localized_data() : array {
		$post_id = intval( $_GET['post'] ?? get_the_ID() );

		$return = [
			'home_url' => home_url(),
			'nonce'    => wp_create_nonce( 'wp_rest' ),
			'fields'   => Fields_Loader::get_fields(),
			'rest_url' => get_rest_url( null, '/stampa/v1/block' ),
			'post_ID'  => $post_id,
			'svg_path' => plugins_url( 'assets/svg/', STAMPA_PLUGIN_PATH ),
		];

		$block_data = $this->get_block_data( $post_id );

		if ( ! empty( $block_data ) ) {
			$return['block'] = $block_data;
		}

		return $return;
	}

	private function get_block_data( int $post_id ) : array {
		$pagenow = GLOBALS['pagenow'];

		$is_stampa_post_type = $pagenow === 'post.php' &&
														$post_id &&
														get_post_type( $post_id ) === 'stampa-block';

		$block_data = [];
		if ( $is_stampa_post_type ) {

			$block_data = [
				'blockTitle' => get_post_field( 'post_title', $post_id ),
				'grid'       => json_decode( get_post_meta( $post_id, '_stampa_grid', true ) ),
				'options'    => json_decode( get_post_meta( $post_id, '_stampa_block_options', true ), true ),
				'fields'     => json_decode( get_post_meta( $post_id, '_stampa_fields', true ) ),
			];
		}

		return $block_data;
	}

	/**
	 * NOTE: Don't know why this event is more than once when editing... 3 times...
	 *
	 * @param bool   $replace    Whether to replace the editor. Default false.
	 * @param object $post Post object.
	 *
	 * @return bool
	 */
	public static function replace_wp_editor( $replace, $post ) : bool {
		$pagenow = $GLOBALS['pagenow'];

		if ( $post->post_type === 'stampa-block' ) {
			remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );

			wp_enqueue_script( 'heartbeat' );

			require_once ABSPATH . 'wp-admin/admin-header.php';

			$this->render_stampa_div();

			return true;
		}

		return $replace;
	}

	/**
	 * Render the stampa div for the React app.
	 *
	 * Because the replace_editor event, when opening the edit link, is fired multiple times
	 * we can't use an ID.
	 *
	 * @param [type] $post
	 * @return void
	 */
	public static function render_stampa_div() {
		echo '<link rel="stylesheet" href="/wp-includes/css/dist/block-library/editor.css" />';
		echo '<div class="stampa-app"></div>';
	}
}
