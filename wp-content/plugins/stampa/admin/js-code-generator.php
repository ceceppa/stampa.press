<?php

namespace Stampa\JSGenerator;

use JS_Inspector_Control;

require __DIR__ . '/js-code-inspector-controls.php';

class JS_Code_Generator {
	private $inspector_control_code = '';

	public function __construct() {
		new JS_Inspector_Control();
	}

	private function setup_boilerplate_wp_variables() {
		self::load_fields();

		$wp_components = [];
		$wp_editor     = [ 'InspectorControls', 'MediaUpload' ];

		foreach ( self::$fields_params as $stampa_field ) {
			$field = self::get_field_by_id( $stampa_field['id'] );

			if ( empty( $field ) ) {
				continue;
			}

			$gutenberg = $field['gutenberg'];
			if ( isset( $gutenberg['wp_components'] ) ) {
				$wp_components[] = $gutenberg['wp_components'];
			}

			if ( isset( $gutenberg['wp_editor'] ) ) {
				$wp_editor[] = $gutenberg['wp_editor'];
			}
		}

		$wp_components = array_unique( $wp_components );

		self::add_replace( 'wp.editor', $wp_editor );
		self::add_replace( 'wp.components', $wp_components );
	}
}
