<?php
/**
 * Plugin Name: Stampa
 *
 * @package stampa
 */

namespace Stampa;

define( 'STAMPA_VERSION', '0.1' );

require __DIR__ . '/stampa/stampa-loader.php';

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
	 * List of key pairs to use for replacing the custom
	 * {{fields}} tags in the boilerplates.
	 *
	 * @var array
	 */
	private static $replace = [];

	/**
	 * Register the filter/actions needed by stampa
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'init', __CLASS__ . '::register_stampa_blocks_cpt' );
		add_action( 'admin_enqueue_scripts', __CLASS__ . '::register_script' );
		// add_action( 'edit_form_after_title', __CLASS__ . '::render_stampa' );
		// Custom endpoint.
		add_action( 'rest_api_init', __CLASS__ . '::register_stampa_endpoint' );

		// Remove the default editor from the page.
		add_filter( 'replace_editor', __CLASS__ . '::replace_editor', 10, 2 );
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
				'methods'  => 'PUT',
				'callback' => __CLASS__ . '::save_block',
				'args'     => [
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
				// 'permission_callback' => function () {
				// return current_user_can( 'manage_options' );
				// },
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

		// Style needed for Gutenberg only.
		wp_enqueue_style( 'stampa-editor', plugins_url( 'dist/stampa-editor.css', __FILE__ ), [], STAMPA_VERSION );

		// Load the default stampa blocks.
		self::load_fields();

		$post_id = $_GET['post'] ?? get_the_ID();
		$data    = array(
			'home_url' => home_url(),
			'nonce'    => wp_create_nonce( 'wp_rest' ),
			'fields'   => self::$fields,
			'rest_url' => get_rest_url( null, '/stampa/v1/block' ),
			'post_ID'  => intval( $post_id ),
		);

		global $pagenow;
		$post_id = $_GET['post'] ?? null;
		if ( $pagenow == 'post.php' && $post_id && get_post_type( $post_id ) == 'stampa-block' ) {

			$data['stampa'] = [
				'blockTitle' => get_post_field( 'post_title', $post_id ),
				'grid'       => json_decode( get_post_meta( $post_id, '_stampa_grid', true ) ),
				'options'    => json_decode( get_post_meta( $post_id, '_stampa_options', true ), true ),
				'fields'     => json_decode( get_post_meta( $post_id, '_stampa_fields', true ) ),
			];
		}

		wp_register_script( 'stampa-script', plugins_url( 'dist/index.js', __FILE__ ), [], STAMPA_VERSION, true );
		wp_localize_script( 'stampa-script', 'stampa', $data );
		wp_enqueue_script( 'stampa-script' );
	}

	/**
	 * Replace the default editor with Stampa App.
	 *
	 * @param boolean $replace    Whether to replace the editor. Default false.
	 * @param object  $post Post object.
	 *
	 * @return boolean
	 */
	public static function replace_editor( $replace, $post ) : bool {
		// Don't know why this event is triggered 3 times...
		static $times = 0;

		global $pagenow;

		$is_new = $pagenow == 'post-new.php';
		// $is_edit = $pagenow == 'post.php';
		if ( $post->post_type === 'stampa-block' ) {
			$times++;

			remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );

			wp_enqueue_script( 'heartbeat' );

			require_once ABSPATH . 'wp-admin/admin-header.php';

			if ( $is_new || $is_edit || $times > 2 ) {
				self::render_stampa();
			}
			return true;
		}

		return $replace;
	}

	/**
	 * Render the stampa app
	 *
	 * @param [type] $post
	 * @return void
	 */
	public static function render_stampa() {
		echo '<link rel="stylesheet" href="/wp-includes/css/dist/block-library/editor.css" />';
		echo '<div id="stampa"></div>';
	}

	/**
	 * Load the default block from a JSON file
	 *
	 * @return void
	 */
	private static function load_fields() {
		$fields = glob( __DIR__ . '/assets/fields/*.json' );

		foreach ( $fields as $file ) {
			$field = json_decode( file_get_contents( $file ) );

			// "Adjust" the path for the images
			$svg_path              = plugins_url( 'assets/svg/', __FILE__ );
				$field->data->icon = $svg_path . $field->data->icon;

				self::add_field( $field->group, $field->id, (array) $field->data );
		}
	}


	/**
	 * Generate the Block options
	 *
	 * @return void
	 */
	private static function generate_options( array $options_params ) : void {
		// The options boilerplate.
		$options_boilerplate = file_get_contents( __DIR__ . '/assets/gutenberg/inspector-controls.boilerplace.js' );

		self::add_replace( 'default_attributes', [] );
		self::add_replace( 'options_content', '' );
		self::add_replace( 'render_container_start', '' );
		self::add_replace( 'render_container_end', '' );
		self::add_replace( 'attributes', [] );

		if ( $options_params['hasBackgroundOption'] == false ) {
			return;
		}

		self::add_replace( 'default_attributes', [ 'backgroundImage: {}' ] );
		self::add_replace( 'render_container_start', '<Fragment>' . $options_boilerplate );
		self::add_replace( 'render_container_end', '</Fragment>' );
		self::add_replace(
			'block_style',
			[
				'backgroundImage: `url(${attributes.backgroundImage && attributes.backgroundImage.url})`',
			]
		);
		self::add_replace(
			'attributes',
			[
				'backgroundImage' => [
					'type' => 'object',
				],
			]
		);
	}

	/**
	 * Generate the block body
	 *
	 * @param array $fields_params the fields to render.
	 * @return void
	 */
	private static function generate_block_body( array $fields_params ) {
		$render_content = [];

		foreach ( $fields_params as $field ) {
			$default = self::get_field_by_id( $field['id'] );

			$react_code = join( PHP_EOL, $default['gutenberg']->react );

			$stampa = $field['_stampa'];

			self::add_replace( 'grid_row_start', $stampa['startRow'] );
			self::add_replace( 'grid_row_end', intval( $stampa['startRow'] ) + intval( $stampa['endRow'] ) );
			self::add_replace( 'grid_column_start', $stampa['startColumn'] );
			self::add_replace( 'grid_column_end', intval( $stampa['startColumn'] ) + intval( $stampa['endColumn'] ) );
			self::add_replace( 'field_name', $stampa['name'] );

			// The values.
			foreach ( $field['_values'] as $key => $value ) {
				self::add_replace( 'value.' . $key, $value );
			}

			$attribute_name = $stampa['name'];
			self::add_replace(
				'attributes',
				[
					$attribute_name => [
						'type' => 'string',
					],
				]
			);

			self::add_replace( 'render_content', self::replace( $replace, $react_code ) );
		}
	}

	/**
	 * Replace all the {{stampa}} occurrences defined in the $replace array
	 * with the corrensponding value.
	 *
	 * @param array  $replace the array containing the replacing information.
	 * @param string $subject the string to modify.
	 * @return string
	 */
	private static function replace( array $replace, string $subject ) : string {
		// Let's do the replace.
		foreach ( $replace as $what => $to ) {
			if ( is_array( $to ) ) {
				if ( $what == 'render_content' ) {
					$to = join( PHP_EOL, $to );
				} else {
					$to = join( PHP_EOL . ',', $to );
				}
			}

			$subject = str_replace( "{{stampa.{$what}}}", $to, $subject );
		}

		return $subject;
	}

	/**
	 * Store the key and vaule pair that are going to be used to replace the {{fields}}
	 * in the boilerplate files.
	 *
	 * @param string $key the key.
	 * @param mixed  $value the value, if is an array it will be merged with Dthe previous value.
	 * @param mixed  $glue used for array to know the `glue` to use for the join function.
	 */
	private static function add_replace( string $replace, $value, $glue = ',' ) {
		$current_value = self::$replace[ $replace ] ?? null;

		if ( is_null( $current_value ) && is_array( $value ) && ! isset( $value['_glue'] ) ) {
			$value = [
				'_glue'  => $glue,
				'values' => $value,
			];
		}

		if ( is_null( $current_value ) ) {
			self::$replace[ $replace ] = $value;
		} else {
			if ( is_array( $current_value ) ) {
				self::$replace[ $repalce ] = array_unique( array_merge( $current_value['values'], $value ) );
			} else {
				self::$replace[ $repalce ] = $value;
			}
		}
	}

	/**
	 * Generate the REACT block
	 *
	 * @param int    $post_id the post ID.
	 * @param string $title the block title.
	 * @param array  $params the block parameters & fields.
	 */
	private static function generate_react_block( $post_id, $title, $grid_params, $options_params, $fields_params ) {
		$output_folder = trailingslashit( __DIR__ . '/stampa/blocks/' );
		// $output_folder = trailingslashit( get_template_directory() ) . 'assets/js/blocks/';
		$file_name   = sanitize_title( $title ) . '.js';
		$output_file = $output_folder . $file_name;

		/**
		 * If the file exists make sure that the file hasn't been manually changed.
		 */
		if ( \file_exists( $output_file ) ) {
			$md5     = md5_file( $output_file );
			$old_md5 = get_post_meta( $post_id, '_md5', true );

			if ( ! empty( $old_md5 ) && $md5 !== $old_md5 ) {
				error_log( print_r( $md5, true ) );
				return [
					'generation-skipped' => "md5 file don't match with the record ($md5)",
				];
			}
		}

		// The block boilerplate.
		$boilerplate = file_get_contents( __DIR__ . '/assets/gutenberg/block-boilerplate.js' );

		// Title & Id.
		self::add_replace( 'block_title', = $title );
		self::add_replace( 'sanitized_title', sanitize_title( $title ) );

		// The React components.
		self::load_fields();

		$gutenberg_components = [];
		foreach ( $fields_params as $stampa_field ) {
			$field = self::get_field_by_id( $stampa_field['id'] );
			if ( empty( $field ) ) {
				continue;
			}

			$gutenberg = $field['gutenberg'];
			if ( isset( $gutenberg->block ) ) {
				$gutenberg_components[] = $gutenberg->block;
			}
		}

		// Unique components to load.
		$gutenberg_components = array_unique( $gutenberg_components );
		self::add_replace( 'gutenberg_blocks', join( ',' . PHP_EOL . '  ', $gutenberg_components ) . ',' );

		// The block options.
		self::generate_options( $options_params );

		// The module fields.
		$replace = array_merge( $replace, self::generate_block_body( $fields_params, $replace['attributes'] ) );

		// $replace['attributes'] = json_encode( $replace['attributes'] );
		/**
		 * Stampa Grid style
		 */
		$min_height = intval( $grid_params['rowHeight'] ) * intval( $grid_params['rows'] );

		// Can't use "repeat" property -.-. Why people use React?
		$template_columns = str_repeat( '1fr ', $grid_params['columns'] );
		$template_rows    = str_repeat( '1fr ', $grid_params['rows'] );

		$grid_style = [
			"display: 'grid'",
			"gridTemplateColumns: '$template_columns'",
			"gridTemplateRows: '$template_rows'",
			"gridGap: '{$grid_params['gap']}px'",
			"height: '{$min_height}px'",
		];

		if ( isset( $replace['block_style'] ) ) {
			$replace['block_style'] = array_merge( $replace['block_style'], $grid_style );
		} else {
			$replace['block_style'] = $grid_style;
		}

		file_put_contents( $output_file, self::replace( $replace, $boilerplate ) );

		// Compile the JS file.
		exec( 'parcel build stampa/index.js -d stampa/dist' );
	}

	/**********************************
	 * Public API functionalities
	 **********************************/
	/**
	 * Register a new Stampa field
	 *
	 * @param string $group the group where to register the field.
	 * @param string $field_id the unique field ID.
	 * @param array  $field_data the field data.
	 * @return void
	 */
	public static function add_field( string $group, string $field_id, array $field_data ) {
		$group = ucfirst( $group );

		self::$fields_by_id[ $field_id ] = $field_data;

		self::$fields[ $group ][ $field_id ] = $field_data;
	}

	/**
	 * Return all the registered fields
	 *
	 * @return array
	 */
	public static function get_fields() : array {
		return self::$fields;
	}

	/**
	 * Get the field by id
	 *
	 * @param string $field_id the field unique ID.
	 * @return mixed
	 */
	private static function get_field_by_id( string $field_id ) {
		$block = self::$fields_by_id[ $field_id ] ?? null;

		return apply_filters( 'stampa/block/' . $field_id, $block );
	}

	/**
	 * Save the block and generate the React code
	 *
	 * @return array
	 */
	public static function save_block( $request ) {
		$params  = $request->get_params();
		$post_id = $params['id'];

		$post_args = [
			'ID'          => (int) $post_id,
			'post_title'  => $params['title'],
			'post_name'   => sanitize_title( $params['title'] ),
			'post_status' => 'publish',
			'post_type'   => 'stampa-block',
		];

		wp_update_post( $post_args );
		if ( ! isset( $params['fields'] ) || ! is_array( $params['fields'] ) ) {
			$params['fields'] = [];
		}

		$grid_params    = apply_filters( 'stampa/save-block/grid', $params['grid'] );
		$fields_params  = apply_filters( 'stampa/save-block/fields', $params['fields'] );
		$options_params = apply_filters( 'stampa/save-block/options', $params['options'] );

		update_post_meta( $post_id, '_stampa_grid', json_encode( $grid_params ) );
		update_post_meta( $post_id, '_stampa_fields', json_encode( $fields_params ) );
		update_post_meta( $post_id, '_stampa_options', json_encode( $options_params ) );

		if ( isset( $params['generate'] ) ) {
			self::generate_react_block( $post_id, $params['title'], $grid_params, $options_params, $fields_params );
		}

		return [ 'ID' => $post_id ];
	}
}

Stampa::init();
