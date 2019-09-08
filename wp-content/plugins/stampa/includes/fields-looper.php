<?php

declare(strict_types=1);

/**
 * Loop the given fields array and its children elements
 */
namespace Stampa;

/**
 * Takes care of resursively looping the given fields array
 */

class Fields_Looper {
	private $opening_block_code = null;
	private $closing_block_code = null;
	private $code               = '';

	public function __construct( array $fields, $opening_block_code, $closing_block_code = null ) {
		$this->opening_block_code = $opening_block_code;
		$this->closing_block_code = $closing_block_code;

		$this->code = $this->generate_block_body_from_fields( $fields );
	}

	public function get_code() : string {
		return $this->code;
	}

	private function generate_block_body_from_fields( array $fields ) : string {
		$field_code = '';

		foreach ( $fields as $field ) {
			$stampa_field = Fields_Loader::get_field_by_id( $field->id );

			if ( count( $stampa_field ) === 0 ) {
				throw new \Exception( 'Stampa field not found: ' . $field->id );
			}

			Stampa_Replacer::add_single_mapping( 'field.name', $field->name );
			Stampa_Replacer::add_single_mapping( 'field.title', $field->title ?? '' );
			$this->map_field_values( $stampa_field, $field );

			$field_code .= call_user_func( $this->opening_block_code, $stampa_field, $field );
			$field_code  = Stampa_Replacer::apply_mapping( $field_code );

			$field_code = $this->loop_subfields( $stampa_field, $field, $field_code );

			$this->remove_field_values_mapping( $field );
		}

		return $field_code;
	}

	private function map_field_values( array $stampa_field, object $field ) : void {
		$this->map_field_default_values( $stampa_field );

		$selected_values = $field->values ?? [];
		foreach ( $selected_values as $key => $value ) {
			if ( is_array( $value ) ) {
				Stampa_Replacer::add_array_mapping( 'value.' . $key, $value );
			} else {
				Stampa_Replacer::add_single_mapping( 'value.' . $key, $value );
			}
		}
	}
	private function map_field_default_values( array $stampa_field ) : void {
		$default_options = $stampa_field['options'] ?? [];

		foreach ( $default_options as $option ) {
			if ( isset( $option['value'] ) ) {
				$name = $option['name'];
				Stampa_Replacer::add_single_mapping( 'value.' . $name, $option['value'] );
			}
		}
	}

	private function loop_subfields( array $stampa_field, object $field, string $field_code ) : string {
		$closing_code = '';

		if ( $this->closing_block_code ) {
			$closing_code = call_user_func( $this->closing_block_code, $stampa_field, $field );
		}

		$has_sub_fields = isset( $field->fields ) && is_array( $field->fields );
		if ( $has_sub_fields ) {
			$field_code .= $this->generate_block_body_from_fields( $field->fields );
		}

		$field_code .= $closing_code;

		return Stampa_Replacer::apply_mapping( $field_code );
	}

	private function remove_field_values_mapping( object $field ) : void {
		$values = $field->values ?? [];
		$keys   = array_keys( (array) $values );

		foreach ( $keys as $key ) {
			Stampa_Replacer::remove_mapping( 'value.' . $key );
		}
	}
}
