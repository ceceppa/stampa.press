<?php
/**
 * Plugin Name: Stampa
 *
 * @package stampa
 */

namespace Stampa;

define( 'STAMPA_VERSION', '0.1' );

/**
 * The Stampa class
 */
class Stampa {
	/**
	 * Registered blocks
	 *
	 * @var array
	 */
	private static $blocks = [];

	/**
	 * Register the filter/actions needed by stampa
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'init', __CLASS__ . '::register_stampa_blocks_cpt' );
		add_action( 'admin_enqueue_scripts', __CLASS__ . '::register_script' );
		add_action( 'edit_form_after_title', __CLASS__ . '::render_stampa' );

		// Custom endpoint.
		add_action( 'rest_api_init', __CLASS__ . '::register_stampa_endpoint' );
	}

	/**
	 * Register the custom /stampa/v1/ endpoint(s)
	 *
	 * @return void
	 */
	public static function register_stampa_endpoint() {
		register_rest_route(
			'stampa/v1',
			'/block/(?P<id>[\\d]+)',
			array(
				'methods'             => 'POST',
				'callback'            => __CLASS__ . '::save_block',
				'args'                => [
					'title'   => [
						'required'    => true,
						'type'        => 'string',
						'description' => 'the block title',
					],
					'fields'  => [
						'required'    => true,
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
				'permission_callback' => function () {
					return current_user_can( 'manage_options' );
				},
			)
		);
	}

	/**
	 * Add the "stampa-block" private CPT
	 *
	 * The CPT is used internally to take advantage of the WordPress list
	 *
	 * @return void
	 */
	public static function register_stampa_blocks_cpt() {
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

	/**
	 * Localize the Stampa app script
	 *
	 * @return void
	 */
	public static function register_script() {
		// The style.
		wp_enqueue_style( 'stampa-style', plugins_url( 'dist/style.css', __FILE__ ), [], STAMPA_VERSION );

		// Load the default stampa blocks.
		self::load_blocks();

		$data = array(
			'home_url' => home_url(),
			'nonce'    => wp_create_nonce( 'wp_rest' ),
			'blocks'   => self::$blocks,
			'rest_url' => get_rest_url( null, '/stampa/v1/block' ),
			'post_ID'  => get_the_ID(),
		);

		$post_id = $_GET['post'] ?? null;
		if ( $post_id && get_post_type( $post_id ) == 'stampa-block' ) {
			$data['block'] = [
				'grid'   => get_post_meta( $post_id, '_stampa_grid', true ),
				'fields' => get_post_meta( $post_id, '_stampa_fields', true ),
			];
		}

		wp_register_script( 'stampa-script', plugins_url( 'dist/index.js', __FILE__ ), [], STAMPA_VERSION, true );
		wp_localize_script( 'stampa-script', 'stampa', $data );
		wp_enqueue_script( 'stampa-script' );
	}

	/**
	 * Render the stampa app
	 *
	 * @param [type] $post
	 * @return void
	 */
	public static function render_stampa( $post ) {
		wp_enqueue_script( 'stampa' );

		echo '<div id="stampa"></div>';
	}

	/**
	 * Load the default block from a JSON file
	 *
	 * @return void
	 */
	private static function load_blocks() {
		$data = file_get_contents( __DIR__ . '/assets/blocks.json' );

		$blocks = json_decode( $data );

		// "Adjust" the path for the images
		$svg_path = plugins_url( 'assets/svg/', __FILE__ );
		foreach ( $blocks as $block ) {
			$block->data->icon = $svg_path . $block->data->icon;

			self::add_block( $block->group, $block->id, (array) $block->data );
		}
	}
	/**********************************
	 * Public API functionalities
	 **********************************/


	/**
	 * Register a new Stampa block
	 *
	 * @param string $group the group where to register the block.
	 * @param string $block_id the unique block ID.
	 * @param array  $block_data the block data.
	 * @return void
	 */
	public static function add_block( string $group, string $block_id, array $block_data ) {
		$group = ucfirst( $group );

		self::$blocks[ $group ][ $block_id ] = $block_data;
	}

	/**
	 * Save the block and generate the React code
	 *
	 * @return array
	 */
	public static function save_block( $request ) {
		$params  = $request->get_params();
		$post_id = $params['id'];

		wp_update_post(
			[
				'ID'    => (int) $post_id,
				'title' => $params['title'],
			]
		);

		update_post_meta( $post_id, '_stampa_grid', $params['grid'] );
		update_post_meta( $post_id, '_stampa_fields', $params['fields'] );

		return [ 'done' => 1 ];
	}
}

Stampa::init();
