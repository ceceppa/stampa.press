<?php

namespace Stampa;

class JS_Code_Generator {
	public function __construct() {

	}
	private static function setup_block_information() {
		self::add_replace( 'block_title', self::$block_title );
		self::add_replace( 'sanitized_title', sanitize_title( self::$block_title ) );

		$block_css_class            = self::$options_params['cssClassName'] ?? null;
		self::$block_css_class_name = empty( $block_css_class ) ? self::$block_title : $block_css_class;
		self::$block_css_class_name = sanitize_title( self::$block_css_class_name );
		self::add_replace( 'block_css_class_name', self::$block_css_class_name );
	}
}
