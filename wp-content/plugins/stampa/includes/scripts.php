<?php

declare(strict_types=1);

namespace Stampa\Script;

use Stampa\Fields_Loader;

class Script {
	public function __construct() {
		add_action( 'admin_enqueue_scripts', [ & $this, 'register_app_script' ], 99 );
	}

	public function register_app_script() : void {
		$data = $this->get_stampa_localized_data();

		wp_register_script( 'stampa-app-script', plugins_url( 'dist/react-app/index.js', STAMPA_PLUGIN_PATH ), [], STAMPA_VERSION, true );
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
		$pagenow = $GLOBALS['pagenow'];

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
}

new Script();
