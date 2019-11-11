<?php

declare(strict_types=1);

/**
 * Stampa has been built to be extented using simple yaml files.
 * This gives us max flexibility where we can create and add most
 * fields without writing a single line of code.
 * In order to achieve that both boilerplate and the generator
 * use special custom variables like:
 *
 * {{stampa.[OPTION NAME]}}
 * {{stampa.value.[VALUE KEY]}} - for the selected field option
 * {{[]|sanitize}} - allows to retrieve the sanitized version of the value
 *
 * This special variables are replaced with their real content by
 * this class during the generation phase.
 *
 * NOTE: The special variables have to include `stampa.` only in the
 * boilerplate/yml file!
 * NOTE: Inside the YAML file I didn't find any built-in escaping solution for the :,
 * unless wrapping the element in quotes. But doing this will make the quotes
 * be part of the output, so the output is going to be invalid.
 * For this reason I'm using the "custom" symbol "\=" instead of the : symbol.
 */

namespace Stampa;

class Stampa_Replacer {
	private static $mapping_data = [];

	public static function add_single_mapping( string $special_key, $value ) : void {
		self::add_mapping( $special_key, $value );
	}

	public static function add_array_mapping( string $special_key, array $values, $glue = ',' ) : void {
		$current_value = self::get_mapping( $special_key );

		$has__values_key = isset( $current_value['_values'] );

		if ( ! $has__values_key ) {
			$current_value = [
				'_glue'   => $glue,
				'_values' => $values,
			];
		} else {
			$current_value['_values'] = array_merge( $current_value['_values'], $values );
		}

		self::add_mapping( $special_key, $current_value );
	}

	public static function add_json_mapping( string $special_key, array $values ) : void {
		self::add_array_mapping( $special_key, $values, null );

		self::$mapping_data[ $special_key ]['_json'] = true;
	}

	private static function add_mapping( string $special_key, $value ) {
		$value = apply_filters( 'stampa/replacer/add', $value, $special_key );

		self::$mapping_data[ $special_key ] = $value;
	}

	public static function get_mapping( string $special_key ) {
		return self::$mapping_data[ $special_key ] ?? null;
	}

	public static function clear_mapping() : void {
		self::$mapping_data = [];
	}

	public static function remove_mapping( string $special_key ) {
		unset( self::$mapping_data[ $special_key ] );
	}

	public static function apply_mapping( string $to ) {
		$return = $to;

		foreach ( self::$mapping_data as $key => $value ) {
			$special_key           = sprintf( '{{stampa.%s}}', $key );
			$sanitized_special_key = sprintf( '{{stampa.%s|sanitize}}', $key );

			$has_glue      = isset( $value['_glue'] );
			$json_encoding = isset( $value['_json'] );

			if ( $json_encoding ) {
				$value = self::get_json_encoding( $value );
			} elseif ( $has_glue ) {
				$value = self::get_glued_array( $value );
			}

			$return = str_replace( $special_key, $value, $return );
			$return = str_replace( $sanitized_special_key, sanitize_title( $value ), $return );
		}

		return self::fix_encoding( $return );
	}

	public static function fix_encoding( string $return ) {
		$return = str_replace( '\=', ':', $return );
		$return = str_replace( "'`", '`', $return );
		$return = str_replace( '"`', '`', $return );
		$return = str_replace( '`"', '`', $return );

		return $return;
	}

	private static function get_glued_array( array $array ) : string {
		$glue   = $array['_glue'];
		$values = array_unique( $array['_values'] );

		/**
		 * NOTE: The react MultiSelect components returns an array of objects,
		 * instead of a simple array, but we only need the "value" part of it.
	   */
		$is_multiselect_value = isset( $values[0] ) ? ( is_array( $values[0] ) || is_object( $values[0] ) ) : false;
		if ( $is_multiselect_value ) {
			$values = wp_list_pluck( $values, 'value' );
		}

		return join( $glue . PHP_EOL, $values );
	}

	private static function get_json_encoding( array $array ) : string {
		return json_encode( $array['_values'] );
	}
}
