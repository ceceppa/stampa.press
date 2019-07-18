<?php
namespace Stampa;

class Block_Data {
	private $post_id            = null;
	private static $block_data  = null;
	private static $block_title = null;

	public function __construct( int $post_id ) {
		$this->post_id    = $post_id;
		self::$block_data = $this->get_block_data( $post_id );

		$this->setup_block_information();
	}

	public function get_block_data() : array {
		$block_data = [
			'grid'          => $this->get_json_meta_data( 'grid' ),
			'fields'        => $this->get_json_meta_data( 'fields' ),
			'block_options' => $this->get_json_meta_data( 'block_options' ),
		];

		return apply_filters( 'stampa/block-data', $block_data, $this->post_id );
	}

	private function get_json_meta_data( string $key ) : array {
		$meta_value = get_post_meta( $this->post_id, '_stampa_' . $key, true );

		return (array) json_decode( $meta_value );
	}

	private function setup_block_information() : void {
		self::$block_title = get_post_field( 'post_title', $this->post_id );
		Stampa_Replacer::add_single_mapping( 'block.title', self::$block_title );

		$this->add_block_base_class_mapping();
	}

	private function add_block_base_class_mapping() {
		$block_options   = self::get_block_options();
		$block_css_class = $block_options->cssClassName ?? null;

		$block_css_class_name = empty( $block_css_class ) ? self::$block_title : $block_css_class;
		$block_css_class_name = sanitize_title( $block_css_class_name );

		Stampa_Replacer::add_single_mapping( 'block.className', $block_css_class_name );
	}

	/* Public methods */

	public static function get_grid_data() : object {
		return (object) self::$block_data['grid'];
	}

	public static function get_block_options() : object {
		return (object) self::$block_data['block_options'];
	}

	public static function get_block_option( string $key ) {
		return self::$block_data['block_options'][ $key ] ?? null;
	}

	public static function get_fields() : object {
		return (object) self::$block_data['fields'];
	}

	public static function get_block_title() : string {
		return self::$block_title;
	}
}
