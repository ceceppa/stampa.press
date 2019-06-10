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
		wp_enqueue_style( 'stampa-style', plugins_url( 'dist/style.css', __FILE__ ), [ 'wp-block-library' ], STAMPA_VERSION );

		// Load the default stampa blocks.
		self::load_blocks();

		$data = array(
			'home_url' => home_url(),
			'nonce'    => wp_create_nonce( 'wp_rest' ),
			'blocks'   => self::$blocks,
			'rest_url' => get_rest_url( null, '/stampa/v1/block' ),
			'post_ID'  => get_the_ID(),
		);

		global $pagenow;
		$post_id = $_GET['post'] ?? null;
		if ( $pagenow == 'post.php' && $post_id && get_post_type( $post_id ) == 'stampa-block' ) {

			$data['stampa'] = [
				'grid'    => json_decode( get_post_meta( $post_id, '_stampa_grid', true ) ),
				'options' => json_decode( get_post_meta( $post_id, '_stampa_options', true ), true ),
				'fields'  => json_decode( get_post_meta( $post_id, '_stampa_fields', true ) ),
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

		echo '<link rel="stylesheet" href="/wp-includes/css/dist/block-library/editor.css" />';
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

		// No really needed.
		unset( $block_data['react'] );
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

		$grid_params    = apply_filters( 'stampa/save-block/grid', $params['grid'] );
		$fields_params  = apply_filters( 'stampa/save-block/fields', $params['fields'] );
		$options_params = apply_filters( 'stampa/save-block/options', $params['options'] );

		update_post_meta( $post_id, '_stampa_grid', json_encode( $grid_params ) );
		update_post_meta( $post_id, '_stampa_fields', json_encode( $fields_params ) );
		update_post_meta( $post_id, '_stampa_options', json_encode( $options_params ) );

		if ( isset( $params['generate'] ) ) {
			self::generate_react_block( $post_id, $params['title'], $grid_params, $fields_params, $options_params );
		}

		return [ 'done' => 1 ];
	}

	/**
	 * Generate the REACT block
	 *
	 * @param int    $post_id the post ID.
	 * @param string $title the block title.
	 * @param array  $params the block parameters & fields.
	 */
	private static function generate_react_block( $post_id, $title, $grid_params, $fields_params, $options_params ) {
		$output_folder = trailingslashit( get_template_directory() ) . 'assets/js/blocks/';
		$file_name     = sanitize_title( $title ) . '.js';
		$output_file   = $output_folder . $file_name;

		/**
		 * If the file exists make sure that the file hasn't been manually changed.
		 */
		if ( \file_exists( $output_file ) ) {
			$md5 = md5_file( $output_file );

			if ( $md5 !== get_post_meta( $post_id, '_md5', true ) ) {
				return [
					'generation-skipped' => "md5 file don't match with the record ($md5)",
				];
			}
		}

		// The block boilerplate.
		$boilerplate = file_get_contents( __DIR__ . '/assets/gutenberg/block-boilerplate.js' );

		// Title & Id.
		$replace['{{stampa.block_title}}']     = $title;
		$replace['{{stampa.sanitized_title}}'] = sanitize_title( $title );

		/**
		 * Stampa Grid style
		*/
		$grid_style = sprintf(
			'
				display: grid;
				grid-template-columns: repeat(1fr, %d);
				grid-template-rows: repeat(1fr, %d);
				gap: %dpx;
				min-height: 360px;
			',
			$grid_params['columns'],
			$grid_params['rows'],
			$grid_params['gap'],
			$grid_params['gap']
		);

		$replace['{{stampa.grid_style}}'] = $grid_style;

		foreach ( $replace as $what => $to ) {
			$boilerplate = str_replace( $what, $to, $boilerplate );
		}

		file_put_contents( $output_file, $boilerplate );
	}
}

Stampa::init();
