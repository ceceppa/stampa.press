<?php
/**
 * In order to have max flexibility the boilerplates and the
 * yml files use "special" variables like:
 *
 * {{stampa.[OPTION NAME]}}
 *
 * and
 *
 * {{stampa.value.[VALUE KEY]}} - for the selected field option
 *
 * This special variables are replaced with their real content by
 * this class.
 *
 * NOTE: The special variables have to include `stampa.` only in the
 * boilerplate/yml file!
 */

class Stampa_Replacer {
	private static $mapping_data = [];

	public static function add_single_mapping( string $special_key, string $value ) : void {
		self::$mapping_data[ $special_key ] = $value;
		// if ( is_null( $current_value ) && is_array( $value ) && ! isset( $value['_glue'] ) ) {
		// $value = [
		// '_glue'   => $glue,
		// '_encode' => $encode,
		// 'values'  => $value,
		// ];
		// }
		// if ( is_null( $current_value ) ) {
		// self::$replace[ $replace ] = $value;
		// } else {
		// if ( is_array( $current_value ) ) {
		// self::$replace[ $replace ]['values'] = array_merge( $current_value['values'], $value );
		// } else {
		// self::$replace[ $replace ] = $value;
		// }
		// }
	}

	public static function add_array_mapping( string $special_key, array $values, $glue = ',' ) : void {
		$current_value = self::get_mapping( $special_key );

		if ( is_null( $current_value ) ) {
			$current_value = [
				'_glue'  => $glue,
				'values' => $values,
			];
		}

		$need_to_merge_values = is_array( $current_value );
		if ( $need_to_merge_values ) {
			$current_value['values'] = array_merge( $current_value['values'], $values );
		}

		self::$mapping_data[ $special_key ] = $current_value;
	}

	public static function add_json_mapping( string $special_key, array $values ) : void {

	}

	public static function get_mapping( string $special_key ) {
		return self::$mapping_data[ $special_key ] ?? null;
	}
}
