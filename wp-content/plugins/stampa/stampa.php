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

	public function save_and_generate_block( $request ) {
		$params      = $request->get_params();
		$post_id     = (int) $params['id'];
		$block_title = $params['title'];

		update_block_title_and_status();
		update_block_metadata( $params );

		$generate_code = isset( $params['generate'] );
		if ( $generate_code ) {
			self::generate_react_block();
		}

		return [ 'ID' => get_permalink( $post_id ) ];
	}

	private function update_block_title_and_status() {
		$post_args = [
			'ID'          => (int) self::$post_ID,
			'post_title'  => self::$block_title,
			'post_name'   => sanitize_title( self::$block_title ),
			'post_status' => 'publish',
			'post_type'   => 'stampa-block',
		];

		wp_update_post( $post_args );
	}

	private function update_block_metadata( array $params ) {
		if ( ! isset( $params['fields'] ) || ! is_array( $params['fields'] ) ) {
			$params['fields'] = [];
		}

		self::$grid_params    = apply_filters( 'stampa/save-block/grid', $params['grid'] );
		self::$fields_params  = apply_filters( 'stampa/save-block/fields', $params['fields'] );
		self::$options_params = apply_filters( 'stampa/save-block/options', $params['options'] );

		update_post_meta( self::$post_ID, '_stampa_grid', json_encode( self::$grid_params ) );
		update_post_meta( self::$post_ID, '_stampa_fields', json_encode( self::$fields_params ) );
		update_post_meta( self::$post_ID, '_stampa_options', json_encode( self::$options_params ) );
	}
}

new Stampa();
