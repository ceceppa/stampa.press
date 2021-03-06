<?php

declare(strict_types=1);

namespace Stampa\Rest_API;

use Stampa\Block_Code_Generator;

class Rest_API {
	public function __construct() {
		// add_action( 'rest_api_init', [ & $this, 'init_wp_rest_multiple_posttype_endpoint' ] );
		add_action( 'rest_api_init', [ & $this, 'register_stampa_endpoints' ] );
		// add_filter( 'post_row_actions', [ & $this, 'add_quick_generate_block_link' ], 10, 2 );
	}

	public function init_wp_rest_multiple_posttype_endpoint() {
		$controller = new \WP_REST_Multiple_PostType_Controller();
		$controller->register_routes();
	}

	/**
	 * PUT /stampa/v1/<block-id>
	 */
	public function register_stampa_endpoints() : void {
		register_rest_route(
			'stampa/v1',
			'/block/(?P<id>[\\d]+)',
			array(
				'methods'             => 'PUT',
				'callback'            => [ & $this, 'save_and_generate_block' ],
				'args'                => $this->get_collection_params(),
				'permission_callback' => function ( $request ) {
					$params = $request->get_headers();
					$nonce  = isset( $params['x_wp_nonce'] ) ? join( '', $params['x_wp_nonce'] ) : null;

					return wp_verify_nonce( $nonce, 'wp_rest' );
				},
			)
		);
	}

	private function get_collection_params() {
		return [
			'title'         => [
				'required'    => true,
				'type'        => 'string',
				'description' => 'the block title',
			],
			'fields'        => [
				'required'    => false,
				'type'        => 'object',
				'description' => 'the block fields',
			],
			'block_options' => [
				'required'    => false,
				'type'        => 'object',
				'description' => 'the block options',
			],
			'grid'          => [
				'required'    => true,
				'type'        => 'object',
				'description' => 'the grid options',
			],
		];
	}

	public function save_and_generate_block( $request ) {
		$params      = $request->get_params();
		$post_id     = (int) $params['id'];
		$block_title = $params['title'];

		$this->update_block_title_and_status( $post_id, $block_title );
		$this->update_block_metadata( $post_id, $params );

		$generate_code = isset( $params['generate'] );
		$message       = __( 'Block saved successfully', 'stampa' );
		if ( $generate_code ) {
			$code_generator = new Block_Code_Generator( $post_id );
			$status         = $code_generator->get_status();

			$icon    = '<img class="toast-message__icon" src="' . STAMPA_PLUGIN_URL . 'svg/success.svg" aria-hidden="true">';
			$message = $icon . __( 'Block generated successfully', 'stampa' );

			if ( is_wp_error( $status ) ) {
				return $status;
			}
		}

		return [
			'ID'      => $post_id,
			'link'    => admin_url( 'post.php?post=' . $post_id . '&action=edit' ),
			'message' => $message,
		];
	}

	private function update_block_title_and_status( int $post_id, string $block_title ) : void {
		$post_args = [
			'ID'          => $post_id,
			'post_title'  => $block_title,
			'post_name'   => sanitize_title( $block_title ),
			'post_status' => 'publish',
			'post_type'   => 'stampa-block',
		];

		wp_update_post( $post_args );
	}

	private function update_block_metadata( int $post_id, array $params ) {
		$has_fields_key = isset( $params['fields'] ) &&
											is_array( $params['fields'] );

		if ( ! $has_fields_key ) {
			$params['fields'] = [];
		}

		$this->apply_filter_and_update_data( $post_id, $params, 'grid' );
		$this->apply_filter_and_update_data( $post_id, $params, 'fields' );
		$this->apply_filter_and_update_data( $post_id, $params, 'block_options' );
	}

	private function apply_filter_and_update_data( int $post_id, array $params, string $key ) : void {
		$values     = $params[ $key ] ?? [];
		$meta_value = apply_filters( 'stampa/save-block/' . $key, $values );

		$encoded_data = json_encode( $meta_value );
		update_post_meta( $post_id, '_stampa_' . $key, $encoded_data );
	}
}
