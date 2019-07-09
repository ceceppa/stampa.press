<?php
/**
 * Code that handles the generation of the react code
 *
 * @package stampa
 */
namespace Stampa\BlockGenerator;

use Stampa\Stampa;

define( 'STAMPA_STAMPA_FOLDER', trailingslashit( \realpath( __DIR__ . '/../assets/stampa/' ) ) );
define( 'STAMPA_REACT_BOILERPLATES_FOLDER', STAMPA_STAMPA_FOLDER . 'gutenberg/' );
define( 'STAMPA_MODULE_OUTPUT_FOLDER', get_template_directory() . '/modules/' );

define( 'STAMPA_CSS_EXTENSION', 'pcss' );

/**
 * The class
 */
class BlockGenerator extends Stampa {
	private static $post_ID = null;

	private static $block_title          = null;
	private static $block_css_class_name = null;
	private static $grid_params          = null;
	private static $fields_params        = null;
	private static $options_params       = null;

	private static $temp_file       = null;
	private static $output_file     = null;
	private static $php_output_file = null;

	/**
	 * List of key pairs to use for replacing the custom
	 * {{fields}} tags in the boilerplates.
	 *
	 * @var array
	 */
	private static $replace = [];

	/**
	 * Initialise the class
	 *
	 * @return void
	 */
	public static function init() {
			// Custom endpoint.
		add_action( 'rest_api_init', __CLASS__ . '::register_stampa_endpoint' );

		add_filter( 'post_row_actions', __CLASS__ . '::add_quick_generate_block_link', 10, 2 );

		$stampa_action = $_GET['stampa-action'] ?? null;
		if ( $stampa_action == 'generate-block' ) {
			self::load_and_generate_react_block();
		}
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
				'methods'             => 'PUT',
				'callback'            => __CLASS__ . '::save_and_generate_block',
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
	 * Save the block and generate the React code
	 *
	 * @return array
	 */
	public static function save_and_generate_block( $request ) {
		$params            = $request->get_params();
		self::$post_ID     = (int) $params['id'];
		self::$block_title = $params['title'];

		self::update_block_title_and_status();
		self::update_block_metadata( $params );

		$generate_code = isset( $params['generate'] );
		if ( $generate_code ) {
			self::generate_react_block();
		}

		return [ 'ID' => self::$post_ID ];
	}

	private static function update_block_title_and_status() {
		$post_args = [
			'ID'          => (int) self::$post_ID,
			'post_title'  => self::$block_title,
			'post_name'   => sanitize_title( self::$block_title ),
			'post_status' => 'publish',
			'post_type'   => 'stampa-block',
		];

		wp_update_post( $post_args );
	}

	private static function update_block_metadata( array $params ) {
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

	/**
	 * Generate the REACT block.
	 *
	 * @param int    $post_ID the post ID.
	 * @param string $title the block title.
	 * @param array  $params the block parameters & fields.
	 */
	private static function generate_react_block() {
		self::setup_dest_folder();

		$output_folder = trailingslashit( STAMPA_OUTPUT_FOLDER . 'blocks/' );
		$file_name     = sanitize_title( self::$block_title ) . '.js';

		self::$output_file = $output_folder . $file_name;

		if ( self::check_if_origin_been_modified() ) {
			return [
				'generation-skipped' => "md5 file don't match with the record",
			];
		}

		self::setup_block_information();
		self::setup_boilerplate_wp_variables();
		self::generate_options();

		self::generate_block_body();
		self::setup_grid_style();
		self::save_js_file();
		self::generate_basic_php_render_file();
	}

	private static function setup_dest_folder() {
		$output_folder = trailingslashit( get_template_directory() ) . 'stampa/';
		define( 'STAMPA_OUTPUT_FOLDER', $output_folder );

		$folder_exists = file_exists( $output_folder );
		if ( $folder_exists ) {
			return;
		}

		mkdir( $output_folder );
		mkdir( $output_folder . 'blocks' );
		mkdir( $output_folder . 'components' );
		mkdir( $output_folder . STAMPA_CSS_EXTENSION );

		if ( ! file_exists( STAMPA_MODULE_OUTPUT_FOLDER ) ) {
			mkdir( STAMPA_MODULE_OUTPUT_FOLDER );
		}

		self::copy_package_json();
		self::copy_stampa_editor_css();
		self::copy_stampa_loader();
		self::copy_stampa_components();
	}

	private static function copy_package_json() {
		$success = copy(
			STAMPA_STAMPA_FOLDER . 'package.json',
			STAMPA_OUTPUT_FOLDER . 'package.json'
		);

		if ( ! $success ) {
			throw new \Error( 'Cannot copy package.json file' );
		}

		$folder = STAMPA_OUTPUT_FOLDER;
		exec( "cd {$folder} && npm install" );
	}

	private static function copy_stampa_editor_css() {
		copy(
			STAMPA_FOLDER . 'dist/stampa-editor.css',
			STAMPA_OUTPUT_FOLDER . STAMPA_CSS_EXTENSION . '/stampa-editor.css'
		);
	}

	private static function copy_stampa_loader() {
		$success = copy(
			STAMPA_STAMPA_FOLDER . 'php/stampa-loader.php',
			STAMPA_OUTPUT_FOLDER . 'stampa-loader.php'
		);

		if ( ! $success ) {
			throw new \Error( 'Cannot copy stampa-loader.php' );
		}
	}

	private static function copy_stampa_components() {
		$components_folder = STAMPA_OUTPUT_FOLDER . 'components/';
		$components = glob( STAMPA_STAMPA_FOLDER . 'components/*.*' );

		foreach ( $components as $file ) {
			copy( $file, $components_folder . basename( $file ) );
		}
	}

	/**
	 * If the destination file already exists make sure that no one edited it
	 * comparing its md5 sum with the one stored in the database.
	 *
	 * @return void
	 */
	private static function check_if_origin_been_modified() {
		if ( \file_exists( self::$output_file ) ) {
			$md5     = md5_file( self::$output_file );
			$old_md5 = get_post_meta( self::$post_ID, '_md5_sum', true );

			if ( ! empty( $old_md5 ) && $md5 !== $old_md5 ) {
				error_log( 'Original JS checksum:' . $md5 );

				return true;
			}
		}

		return false;
	}

	private static function setup_block_information() {
		self::add_replace( 'block_title', self::$block_title );
		self::add_replace( 'sanitized_title', sanitize_title( self::$block_title ) );

		$block_css_class            = self::$options_params['cssClassName'] ?? null;
		self::$block_css_class_name = empty( $block_css_class ) ? self::$block_title : $block_css_class;
		self::$block_css_class_name = sanitize_title( self::$block_css_class_name );
		self::add_replace( 'block_css_class_name', self::$block_css_class_name );
	}

	private static function setup_boilerplate_wp_variables() {
		self::load_fields();

		$wp_components = [];
		$wp_editor     = [ 'InspectorControls', 'MediaUpload' ];

		foreach ( self::$fields_params as $stampa_field ) {
			$field = self::get_field_by_id( $stampa_field['id'] );

			if ( empty( $field ) ) {
				continue;
			}

			$gutenberg = $field['gutenberg'];
			if ( isset( $gutenberg->wp_components ) ) {
				$wp_components[] = $gutenberg->wp_components;
			}

			if ( isset( $gutenberg->wp_editor ) ) {
				$wp_editor[] = $gutenberg->wp_editor;
			}
		}

		$wp_components = array_unique( $wp_components );

		self::add_replace( 'wp.editor', $wp_editor );
		self::add_replace( 'wp.components', $wp_components );
	}

	private static function setup_grid_style() {
		$height      = intval( self::$grid_params['rowHeight'] ) * intval( self::$grid_params['rows'] );
		$grid_params = self::$grid_params;

		// Can't use "repeat" property -.-, why????
		$template_columns = str_repeat( '1fr ', $grid_params['columns'] );
		$template_rows    = str_repeat( '1fr ', $grid_params['rows'] );
		$grid_style       = [
			"display: 'grid'",
			"gridTemplateColumns: '$template_columns'",
			"gridTemplateRows: '$template_rows'",
			"gridGap: '{$grid_params['gap']}px'",
			"height: '{$height}px'",
		];

		self::add_replace( 'block_style', $grid_style );
	}

	private static function save_js_file() {
		self::$temp_file = tempnam( sys_get_temp_dir(), 'stampa' ) . '.js';

		$boilerplate  = file_get_contents( STAMPA_REACT_BOILERPLATES_FOLDER . 'block-boilerplate.js' );
		$file_content = self::replace( $boilerplate );

		file_put_contents( self::$temp_file, $file_content );

		self::beautify_js_file_or_fail();
		self::parcel_build();
	}

	private static function beautify_js_file_or_fail() {
		exec( 'prettier ' . self::$temp_file . ' > ' . self::$output_file, $ignore, $return_val );

		if ( $return_val > 0 ) {
			error_log( print_r( self::$temp_file, true ) );

			delete_post_meta( self::$post_ID, '_md5_sum' );
			throw new \Error( 'Prettier failed' );
		}

		self::update_js_md5();

		// Add to index.js (if not exists).
		self::add_block_to_indexjs();
	}

	private static function update_js_md5() {
		update_post_meta( self::$post_ID, '_md5_sum', md5_file( self::$output_file ) );
	}

	/**
	 * Store the key and vaule pair that are going to be used to replace the {{fields}}
	 * in the boilerplate files.
	 *
	 * @param string $key the key.
	 * @param mixed  $value the value, if is an array it will be merged with Dthe previous value.
	 * @param mixed  $glue used for array to know the `glue` to use for the join function.
	 */
	private static function add_replace( string $replace, $value, $glue = ',', $encode = false ) {
		$current_value = self::$replace[ $replace ] ?? null;

		if ( is_null( $current_value ) && is_array( $value ) && ! isset( $value['_glue'] ) ) {
			$value = [
				'_glue'   => $glue,
				'_encode' => $encode,
				'values'  => $value,
			];
		}

		if ( is_null( $current_value ) ) {
			self::$replace[ $replace ] = $value;
		} else {
			if ( is_array( $current_value ) ) {
				self::$replace[ $replace ]['values'] = array_merge( $current_value['values'], $value );
			} else {
				self::$replace[ $replace ] = $value;
			}
		}
	}

	/**
	 * Replace all the {{stampa}} occurrences defined in the $replace array
	 * with the corrensponding value.
	 *
	 * @param string $subject the string to modify.
	 * @return string
	 */
	private static function replace( string $subject ) : string {
		// Let's do the replace.
		foreach ( self::$replace as $what => $to ) {
			if ( is_array( $to ) ) {
				if ( $to['_encode'] ) {
					$to = json_encode( $to['values'] );
				} else {
					/**
					 * The MultiSelect returns an array of objects, in this case
					 * we need to keep only the "value" part of the object and
					 * discard the label one.
					 */
					$values = $to['values'];
					if ( is_array( $values ) && ! empty( $values ) && is_array( $values[0] ) ) {
						$values = wp_list_pluck( $values, 'value' );
					}
					$unique_values = array_unique( $values );
					$to            = join( PHP_EOL . $to['_glue'], $unique_values );
				}
			}

			$subject = str_replace( "{{stampa.{$what}}}", $to, $subject );
		}

		return $subject;
	}

	private static function generate_block_body() {
		self::add_replace( 'render_content', [], '' );

		$react_code = self::generate_block_body_from_fields( self::$fields_params );
		self::add_replace(
			'render_content',
			[
				$react_code,
			]
		);
	}

	private static function generate_block_body_from_fields( array $fields ) : string {
		$react_code = '';

		foreach ( $fields as $field ) {
			$default        = self::get_field_by_id( $field['id'] );
			$field_position = $field['position'];

			$gutenberg   = $default['gutenberg'];
			$field_code = '{/* ' . $field['name'] . ' */}';

			if ( isset( $gutenberg->react ) ) {
				$field_code .= join( PHP_EOL, $gutenberg->react );
			}

			if ( isset( $gutenberg->react_start_block ) ) {
				$field_code .= join( PHP_EOL, $gutenberg->react_start_block );
			}

			self::add_replace( 'grid_row_start', $field_position['startRow'] );
			self::add_replace( 'grid_row_end', intval( $field_position['startRow'] ) + intval( $field_position['endRow'] ) );
			self::add_replace( 'grid_column_start', $field_position['startColumn'] );
			self::add_replace( 'grid_column_end', intval( $field_position['startColumn'] ) + intval( $field_position['endColumn'] ) );
			self::add_replace( 'field_name', $field['name'] );

			// The values.
			if ( ! isset( $field['values'] ) ) {
				$field['values'] = [];
			}

			foreach ( $field['values'] as $key => $value ) {
				self::add_replace( 'value.' . $key, $value );
			}

			$attribute_name = $field['name'];
			if ( isset( $default['gutenberg']->attribute_type ) ) {
				self::add_replace(
					'attributes',
					[
						$attribute_name => [
							'type' => $default['gutenberg']->attribute_type,
						],
					]
				);
			}

			$closing_code = '';
			if ( isset( $gutenberg->react_end_block ) ) {
				$closing_code = $gutenberg->react_end_block;
			}

			$has_sub_fields = isset( $field['fields'] ) &&
												is_array( $field['fields'] ) &&
												! empty( $field['fields'] );

			if ( $has_sub_fields ) {
				$field_code .= self::generate_block_body_from_fields( $field['fields'] );
			}

			$field_code .= $closing_code;

			$react_code .= self::replace( $field_code );
		}

		return $react_code;
	}


	/**
	 * Generate the Block options
	 *
	 * @return void
	 */
	private static function generate_options() : void {
		self::add_replace( 'default_attributes', [] );
		self::add_replace( 'options_content', '' );
		self::add_replace( 'render_container_start', '' );
		self::add_replace( 'render_container_end', '' );
		self::add_replace( 'attributes', [], null, true );

		$hasBackground = self::$options_params['hasBackgroundOption'];

		if ( $hasBackground === false || $hasBackground === 'false' ) {
			return;
		}

		// The options boilerplate.
		$options_boilerplate = file_get_contents( STAMPA_REACT_BOILERPLATES_FOLDER . 'inspector-controls.boilerplace.js' );

		self::add_replace( 'wp.components', [ 'PanelBody', 'IconButton' ] );
		self::add_replace( 'default_attributes', [ 'backgroundImage: {}' ], null, true );
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
	 * Add the block to the index.js file, if is not there yet
	 */
	private static function add_block_to_indexjs() {
		$file_name  = preg_replace( '/.js$/', '', basename( self::$output_file ) );
		$index_file = STAMPA_OUTPUT_FOLDER . 'index.js';

		$index_content = '';
		if ( file_exists( $index_file ) ) {
			$index_content = file_get_contents( $index_file );
		}

		if ( stripos( $index_content, $file_name ) == 0 ) {
			$index_content .= "import './blocks/{$file_name}';" . PHP_EOL;

			$success = file_put_contents( $index_file, $index_content );

			if ( ! $success ) {
				throw new \Error( 'Cannot write the index.js file in stampa/blocks folder' );
			}
		}

		self::generate_post_css_file();
	}

	private static function generate_post_css_file() {
		$basename          = basename( self::$output_file );
		$post_css_filename = str_replace( '.js', '.' . STAMPA_CSS_EXTENSION, $basename );

		$output_css_file = STAMPA_OUTPUT_FOLDER . STAMPA_CSS_EXTENSION . '/' . $post_css_filename;
		$file_exists     = file_exists( $output_css_file );

		if ( ! $file_exists || true ) {
			$post_css_content = self::generate_post_css_file_content();

			$success = file_put_contents( $output_css_file, $post_css_content );

			if ( ! $success ) {
				throw new \Error( 'Cannot write the ' . $output_css_file . ' file' );
			}
		}

		self::add_css_file_to_index_css( $post_css_filename );
	}

	/**
	 * Generates a css line for each element within the block
	 */
	private static function generate_post_css_file_content() : string {
		$css_content = sprintf( '.%s {', self::$block_css_class_name );

		foreach ( self::$fields_params as $field ) {
			$css_content .= sprintf( '%s  &__%s {%s  }', PHP_EOL, $field['name'], PHP_EOL );
		}

		$css_content .= '}';

		return $css_content;
	}

	private static function add_css_file_to_index_css( string $post_css_filename ) {
		$index_file    = STAMPA_OUTPUT_FOLDER . 'index.' . STAMPA_CSS_EXTENSION;
		$css_ext = STAMPA_CSS_EXTENSION;

		$index_content = "@import './{$css_ext}/stampa-editor.css';" . PHP_EOL;
		if ( file_exists( $index_file ) ) {
			$index_content = file_get_contents( $index_file );
		}

		if ( stripos( $index_content, $post_css_filename ) == 0 ) {
			$index_content .= "@import './{$css_ext}/{$post_css_filename}';" . PHP_EOL;

			file_put_contents( $index_file, $index_content );
		}
	}

	private static function generate_basic_php_render_file() {
		$file_name             = sanitize_title( self::$block_title );
		self::$php_output_file = STAMPA_MODULE_OUTPUT_FOLDER . $file_name . '.php';

		if ( self::check_if_php_has_changed() ) {
			return;
		}

		self::generate_the_basic_php_code();
	}

	private static function check_if_php_has_changed() {
		if ( ! file_exists( self::$php_output_file ) ) {
			return false;
		}

		$md5_file = \md5_file( self::$php_output_file );
		$old_md5  = get_post_meta( self::$post_ID, '_md5_php', \true );

		return ! empty( $old_md5 ) && $md5_file != $old_md5;
	}

	private static function generate_the_basic_php_code() {
		$php_content = sprintf( '<section class="%s">%s', self::$block_css_class_name, \PHP_EOL );

		$php_content .= self::generate_php_code_from_fields_data( self::$fields_params );

		$php_content .= '</section>';

		file_put_contents( self::$php_output_file, $php_content );
	}

	private static function generate_php_code_from_fields_data( array $fields, $indent = 1 ) : string {
		$php_content = '';
		$tabs_index  = str_repeat( "\t", $indent );

		foreach ( $fields as $field ) {
			self::add_replace( 'field_name', $field['name'] );

			$default = self::get_field_by_id( $field['id'] );

			$php = $default['php'] ?? null;
			if ( is_string( $php ) ) {
				$php_content .= $tabs_index . self::replace( $default['php'] ) . PHP_EOL;
			}

			if ( isset( $php->start_block ) ) {
				$php_content .= $tabs_index . self::replace( $php->start_block ) . PHP_EOL;
			}

			$has_sub_fields = isset( $field['fields'] ) &&
												is_array( $field['fields'] ) &&
												! empty( $field['fields'] );

			if ( $has_sub_fields ) {
				$php_content .= self::generate_php_code_from_fields_data( $field['fields'], $indent + 1 ) . PHP_EOL;
			}

			if ( isset( $php->end_block ) ) {
				self::add_replace( 'field_name', $field['name'] );

				$php_content .= $tabs_index . self::replace( $php->end_block ) . PHP_EOL;
			}
		}

		return $php_content;
	}

	/**
	 * Run the parcel build command
	 */
	private static function parcel_build() {
		$stampa_path = STAMPA_OUTPUT_FOLDER;
		$css_ext = STAMPA_CSS_EXTENSION;

		exec( "parcel build {$stampa_path}index.{$css_ext} -d {$stampa_path}dist" );
		exec( "parcel build {$stampa_path}index.js -d {$stampa_path}dist" );
	}

	/**
	 * Add the "Generate block" item to the quick-edit menu.
	 *
	 * @param array   $actions the actions.
	 * @param WP_Post $post the post.
	 * @return array
	 */
	public static function add_quick_generate_block_link( array $actions, $post ) : array {
		if ( $post->post_type !== 'stampa-block' ) {
			return $actions;
		}

		$link                       = add_query_arg(
			[
				'stampa-action'   => 'generate-block',
				'stampa-block-id' => $post->ID,
			]
		);
		$actions['stampa-generate'] = sprintf( '<a href="%s">Generate block</a>', $link );

		return $actions;
	}

	/**
	 * Load the block and trigger the react_code generator
	 *
	 * @return void
	 */
	private static function load_and_generate_react_block() {
		$post_ID = $_GET['stampa-block-id'] ?? null;

		if ( $post_ID == \null || get_post_field( 'post_type', $post_ID ) !== 'stampa-block' ) {
			return;
		}

		$title          = get_post_field( 'post_title', $post_ID );
		$grid_params    = (array) json_decode( get_post_meta( $post_ID, '_stampa_grid', true ) );
		$fields_params  = (array) json_decode( get_post_meta( $post_ID, '_stampa_fields', true ) );
		$options_params = (array) json_decode( get_post_meta( $post_ID, '_stampa_options', true ) );

		self::convert_json_data_and_generate_react_block( $post_ID, $title, $grid_params, $fields_params, $options_params );
	}

	/**
	 * Convert the data as needed by generate_react_block and generate the JS code.
	 *
	 * @param [type] $title
	 * @param [type] $grid_params
	 * @param [type] $fields_params
	 * @param [type] $options_params
	 * @return void
	 */
	private static function convert_json_data_and_generate_react_block( $post_ID, $title, $grid_params, $fields_params, $options_params ) {
		// Convert the subdata from (stdClass) to array
		$fields_params = array_map(
			function( $field ) {
				$ret = [];

				foreach ( $field as $key => $value ) {
					if ( \is_object( $value ) ) {
						$value = (array) $value;
					}

					$ret[ $key ] = $value;
				}
				return $ret;
			},
			$fields_params
		);

		self::generate_react_block( $post_ID, $title, $grid_params, $options_params, $fields_params );
	}
}

BlockGenerator::init();
