<?php
namespace Stampa\JS_Generator;

use Stampa\Stampa_Replacer;
use Stampa\Block_Data;

class JS_Inspector_Control {
	private $boilerplate_code = null;

	public function __construct() {
		$this->load_field_options_boilerplate();

		$this->setup_block_option_blank_defaults();
		$this->setup_block_options();

		Stampa_Replacer::add_single_mapping(
			'inspector_controls',
			$this->get_code()
		);
	}

	private function load_field_options_boilerplate() : void {
		$boilerplate_file = STAMPA_REACT_BOILERPLATES_FOLDER . 'options.boilerplate.js';
		$boilerplate_file = apply_filters( 'stampa/inspector-control/options/file', $boilerplate_file );

		$code = file_get_contents( $boilerplate_file );
		$code = apply_filters( 'stampa/inspector-control/options/code', $code );

		$this->boilerplate_code .= $code;
	}

	private function setup_block_option_blank_defaults() : void {
		Stampa_Replacer::add_json_mapping( 'block.options.allFields', [] );
		Stampa_Replacer::add_single_mapping( 'block.options.content', '' );
		Stampa_Replacer::add_json_mapping( 'gutenberg.attributes', [] );
		Stampa_Replacer::add_single_mapping( 'block.options.fullWidthClass', '' );
	}

	private function setup_block_options() {
		$this->setup_block_icon();

		$has_background_option = Block_Data::get_block_option( 'hasBackgroundOption' );
		if ( $has_background_option ) {
			$this->setup_background_option();
		}
	}

	private function setup_block_icon() {
		$icon = Block_Data::get_block_option( 'icon' );
		Stampa_Replacer::add_single_mapping( 'block.options.icon', $icon );
	}

	private function setup_background_option() {
		$this->load_inspector_background_image_boilerplate();

		Stampa_Replacer::add_array_mapping( 'wp.components', [ 'IconButton' ] );
		Stampa_Replacer::add_json_mapping(
			'gutenberg.attributes',
			[
				'backgroundImage' => [
					'type' => 'object',
				],
			]
		);

		Stampa_Replacer::add_json_mapping(
			'block.style',
			[
				'backgroundImage' => '`url(${attributes . backgroundImage})`',
			]
		);
	}

	private function load_inspector_background_image_boilerplate() : void {
		$boilerplate_file = STAMPA_REACT_BOILERPLATES_FOLDER . 'inspector.boilerplate.js';
		$boilerplate_file = apply_filters( 'stampa/inspector-control/file', $boilerplate_file );

		$code = file_get_contents( $boilerplate_file );
		$code = apply_filters( 'stampa/inspector-control/code', $code );

		$this->boilerplate_code = $code . PHP_EOL . $this->boilerplate_code;
	}

	public function get_code() : string {
		return Stampa_Replacer::apply_mapping( $this->boilerplate_code );
	}
}
