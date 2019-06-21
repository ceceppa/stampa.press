<?php
/**
 * Plugin Name: Stampa
 *
 * @package stampa
 */

namespace Stampa;

define( 'STAMPA_VERSION', '0.1' );

require __DIR__ . '/stampa/stampa-loader.php';
require __DIR__ . '/class/block-generator.php';

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
	public static function init() {
		add_action( 'init', __CLASS__ . '::register_stampa_blocks_cpt' );
		add_action( 'admin_enqueue_scripts', __CLASS__ . '::register_script' );
		// add_action( 'edit_form_after_title', __CLASS__ . '::render_stampa' );
		// Remove the default editor from the page.
		add_filter( 'replace_editor', __CLASS__ . '::replace_wp_editor', 10, 2 );
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

			$data['block'] = [
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
	 * Don't know why this event is more than once when editing... 3 times...
	 *
	 * @param boolean $replace    Whether to replace the editor. Default false.
	 * @param object  $post Post object.
	 *
	 * @return boolean
	 */
	public static function replace_wp_editor( $replace, $post ) : bool {
		global $pagenow;

		if ( $post->post_type === 'stampa-block' ) {
			remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );

			wp_enqueue_script( 'heartbeat' );

			require_once ABSPATH . 'wp-admin/admin-header.php';

			self::render_stampa_div();

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

	/**
	 * Load the default block from a JSON file
	 *
	 * @return void
	 */
	protected static function load_fields() {
		$fields = glob( __DIR__ . '/assets/fields/*.json' );

		foreach ( $fields as $file ) {
			$field = json_decode( file_get_contents( $file ) );

			// "Adjust" the path for the images
			$svg_path              = plugins_url( 'assets/svg/', __FILE__ );
				$field->data->icon = $svg_path . $field->data->icon;

				self::add_field( $field->group, $field->id, (array) $field->data, $field->gutenberg );
		}
	}

	/**
	 * Register a new Stampa field
	 *
	 * @param string $group the group where to register the field.
	 * @param string $field_id the unique field ID.
	 * @param array  $field_data the field data.
	 * @return void
	 */
	public static function add_field( string $group, string $field_id, array $field_data, $gutenberg_data ) {
		$group = ucfirst( $group );

		self::$fields[ $group ][ $field_id ] = $field_data;

		// Gutenberg data is needed only for the back-end.
		self::$fields_by_id[ $field_id ] = [
			'data'      => $field_data,
			'gutenberg' => $gutenberg_data,
		];
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
	protected static function get_field_by_id( string $field_id ) {
		$block = self::$fields_by_id[ $field_id ] ?? null;

		return apply_filters( 'stampa/block/' . $field_id, $block );
	}
}

Stampa::init();
