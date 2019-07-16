<?php
/**
 * Plugin Name: Stampa
 *
 * @package stampa
 */

namespace Stampa;

use Stampa\Init;

define( 'STAMPA_VERSION', '0.1' );
define( 'STAMPA_FOLDER', __DIR__ . '/' );
define( 'STAMPA_ASSETS_FOLDER', __DIR__ . '/assets/stampa/' );

require __DIR__ . '/vendor/autoload.php';

require __DIR__ . '/admin/init.php';
require __DIR__ . '/admin/fields-loader.php';
require __DIR__ . '/admin/block-generator.php';
require __DIR__ . '/admin/stampa-filters.php';

/**
 * The Stampa class
 */
class Stampa {
	/**
	 * Registered blocks
	 *
	 * @var array
	 */
	private static $fields = [];

	/**
	 * Registered blocks by id
	 *
	 * @var array
	 */
	private static $fields_by_id = [];

	/**
	 * Register the filter/actions needed by stampa
	 *
	 * @return void
	 */
	public function __construct() {
		new Init();

		add_action( 'rest_api_init', [ & $this, 'register_stampa_endpoints' ] );
		// add_filter( 'post_row_actions', [ & $this, 'add_quick_generate_block_link' ], 10, 2 );
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
				'args'                => [
					'title'   => [
						'required'    => true,
						'type'        => 'string',
						'description' => 'the block title',
					],
					'fields'  => [
						'required'    => false,
						'type'        => 'object',
						'description' => 'the block fields',
					],
					'options' => [
						'required'    => false,
						'type'        => 'object',
						'description' => 'the block options',
					],
					'grid'    => [
						'required'    => true,
						'type'        => 'object',
						'description' => 'the grid options',
					],
				],
				'permission_callback' => function ( $request ) {
					$params = $request->get_headers();
					$nonce  = isset( $params['x_wp_nonce'] ) ? join( '', $params['x_wp_nonce'] ) : null;

					return wp_verify_nonce( $nonce, 'wp_rest' );
				},
			)
		);
	}

	/**
	 * Add the "Generate block" item to the quick-edit menu.
	 */
	public static function add_quick_generate_block_link( array $actions, $post ) : array {
		$is_stampa_cpt = $post->post_type === 'stampa-block';

		if ( ! $is_stampa_cpt ) {
			return $actions;
		}

		$link = add_query_arg(
			[
				'stampa-action'   => 'generate-block',
				'stampa-block-id' => $post->ID,
			]
		);

		$actions['stampa-generate'] = sprintf( '<a href="%s">Generate block</a>', $link );

		return $actions;
	}

	public function save_and_generate_block( $request ) {
		$params      = $request->get_params();
		$post_id     = (int) $params['id'];
		$block_title = $params['title'];

		$this->update_block_title_and_status( $post_id, $block_title );
		$this->update_block_metadata( $post_id, $params );

		$generate_code = isset( $params['generate'] );
		if ( $generate_code ) {
			new BlockGenerator( $post_id );
		}

		return [
			'ID'   => $post_id,
			'link' => admin_url( 'post.php?post=' . $post_id ),
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
		$has_fields_key = isset( $params['fields'] ) && is_array( $params['fields'] );

		if ( ! $has_fields_key ) {
			$params['fields'] = [];
		}

		$this->apply_filter_and_update_data( $post_id, $params, 'grid' );
		$this->apply_filter_and_update_data( $post_id, $params, 'fields' );
		$this->apply_filter_and_update_data( $post_id, $params, 'block_options' );
	}

	private function apply_filter_and_update_data( int $post_id, array $params, string $key ) {
		$values     = $params[ $key ] ?? [];
		$meta_value = apply_filters( 'stampa/save-block/' . $key, $values );

		$encoded_data = json_encode( $meta_value );
		update_post_meta( $post_id, '_stampa_' . $key, $encoded_data );
	}
}

new Stampa();
