<?php
namespace Stampa;

use Symfony\Component\Yaml\Yaml;

class Fields_Loader {
	private static $fields       = null;
	private static $fields_by_id = [];

	public static function get_fields() : array {
		if ( is_null( self::$fields ) ) {
			self::load_fields();
		}

		return self::$fields;
	}

	public static function get_field_by_id( string $id ) : array {
		return self::$fields_by_id[ $id ] ?? [];
	}

	private static function load_fields() {
		$fields = glob( STAMPA_FOLDER . '/assets/fields/*.yml' );

		foreach ( $fields as $file ) {
			$field = self::load_and_parse_yml_file( $file );

			// "Adjust" the path for the images by prepending the plugin URL.
			$svg_path                = plugins_url( 'assets/svg/', __FILE__ );
			$field['stampa']['icon'] = $svg_path . $field['stampa']['icon'];

			self::add_field(
				$field['stampa'],
				$field['options'] ?? [],
				$field['gutenberg'] ?? [],
				$field['php'] ?? []
			);
		}
	}

	private static function load_and_parse_yml_file( string $file ) : array {
		try {
			return Yaml::parseFile( $file );
		} catch ( \Exception $e ) {
			error_log( 'Invalid YAML file!' );
			error_log( print_r( $file, true ) );
			error_log( print_r( $e, true ) );
			die();
		}
	}

	public static function add_field( array $field, array $options = [], array $gutenberg_data = [], $php_data = [] ) {
		$field_id = $field['id'];
		$group    = ucfirst( $field['group'] );

		$field = self::setup_field_options( $field, $options );
		$field = apply_filters( "stampa_add_field/{$field_id}", $field );

		self::$fields[ $group ][ $field_id ] = $field;

		// Gutenberg & php data is needed only by the generator.
		self::$fields_by_id[ $field_id ] = [
			'stampa'    => $field,
			'options'   => $options,
			'gutenberg' => $gutenberg_data,
			'php'       => $php_data,
		];
	}

	private static function setup_field_options( array $field, array $options ) {
		$field_id = $field['id'];

		foreach ( $options as & $option ) {
			$hide_in_stampa = isset( $option['stampa'] ) && $option['stampa'] == false;

			if ( $hide_in_stampa ) {
				continue;
			}

			$option = apply_filters( "stampa_field_option/{$field_id}/{$option['name']}", $option );
		}

		$field['options'] = $options;

		return $field;
	}
}
