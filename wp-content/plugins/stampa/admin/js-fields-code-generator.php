<?php
namespace Stampa\JS_Generator;

use Stampa\Fields_Loader;
use Stampa\Block_Data;
use Stampa\Stampa_Replacer;

class JS_Fields_Code_Generator {
	public function __construct() {
		Stampa_Replacer::add_array_mapping( 'render.content', [], '' );

		$fields     = Block_Data::get_fields();
		$react_code = $this->generate_block_body_from_fields( $fields );

		Stampa_Replacer::add_array_mapping(
			'render.content',
			[
				$react_code,
			],
			''
		);
	}

	private function generate_block_body_from_fields( array $fields ) : string {
		$react_code = '';

		foreach ( $fields as $field ) {
			$stampa_field = Fields_Loader::get_field_by_id( $field->id );

			$field_code = $this->set_field_name_mapping( $field );

			$gutenberg   = $stampa_field['gutenberg'];
			$field_code .= $this->get_opening_div( $field, $gutenberg );
			$this->map_field_grid_position( $field->position );
			$this->map_field_values( $stampa_field, $field );
			$this->map_js_attributes_data( $stampa_field, $field );

			$field_code = Stampa_Replacer::apply_mapping( $field_code );

			$react_code .= $this->loop_subfields( $field, $gutenberg, $field_code );
			$this->remove_field_values_mapping( $field );
		}

		return $react_code;
	}

	private function set_field_name_mapping( object $field ) : string {
		$field_name = $field->name;

		Stampa_Replacer::add_single_mapping( 'field.name', $field_name );

		return '{/* ' . $field_name . ' */}';
	}

	private function get_opening_div( object $field, array $gutenberg ) : string {
		$stampa_field = Fields_Loader::get_field_by_id( $field->id );
		$is_container = ( $stampa_field['stampa']['container'] ?? null ) == null;

		if ( $is_container ) {
			$code = $this->get_container_div_code( $field );
		} else {
			$code = $this->get_field_div_code( $field );
		}

		$code .= $gutenberg['react'] ?? '';
		$code .= $gutenberg['react_start_block'] ?? '';

		return $code;
	}

	private function get_container_div_code( object $field ) : string {
		$field_id   = $field->id;
		$field_name = $field->name;

		return "
			<div
			className={`stampa-field stampa-field--{$field_id} field--{$field_name} \${focusedField == '{$field_name}' ? 'focused' : ''}`}
			style={{
				gridRowStart: {{stampa.grid_row_start}},
				gridColumnStart: {{stampa.grid_column_start}},
				gridRowEnd: {{stampa.grid_row_end}},
				gridColumnEnd: {{stampa.grid_column_end}}
			}}
			onClick={() => updateFocusedField('$field_name')}
			>
		";
	}

	private function get_field_div_code( object $field ) {
		$field_id   = $field->id;
		$field_name = $field->name;

		$values           = $field->values ?? [];
		$template_columns = trim( str_repeat( '1fr ', $values->columns ) );
		$template_rows    = trim( str_repeat( '1fr ', $values->rows ) );
		$gap              = $values->gap;

		return "
		<div
			className={`stampa-field stampa-field--{$field_id} field--{$field_name} \${focusedField == '{$field_name}' ? 'focused' : ''}`}
			style={{
			display: 'grid',
				gridTemplateColumns: '$template_columns',
				gridTemplateRows: '$template_rows',
				gridGap: '{$gap}px',
				gridRowStart: {{stampa.grid_row_start}},
				gridColumnStart: {{stampa.grid_column_start}},
				gridRowEnd: {{stampa.grid_row_end}},
				gridColumnEnd: {{stampa.grid_column_end}}
			}}
			onClick={() => updateFocusedField('$field_name')}
		>
		";
	}
	private function map_field_grid_position( object $position ) : void {
		$position_data = [
			'grid_row_start'    => $position->startRow,
			'grid_column_start' => $position->startColumn,
			'grid_row_end'      => intval( $position->startRow ) + intval( $position->endRow ),
			'grid_column_end'   => intval( $position->startColumn ) + intval( $position->endColumn ),
			'grid_rows'         => $position->endRow,
		];

		foreach ( $position_data as $key => $position ) {
			Stampa_Replacer::add_single_mapping( $key, $position );
		}
	}

	private function map_field_values( array $default_field, object $field ) : void {
		$this->map_field_default_values( $default_field );

		$selected_values = $field->values ?? [];
		foreach ( $selected_values as $key => $value ) {
			Stampa_Replacer::add_single_mapping( 'value.' . $key, $value );
		}
	}
	private function map_field_default_values( array $default_field ) : void {
		$default_options = $default_field['options'] ?? [];

		foreach ( $default_options as $option ) {
			if ( isset( $option['value'] ) ) {
				$name = $option['name'];
				Stampa_Replacer::add_single_mapping( 'value.' . $name, $option['value'] );
			}
		}
	}
	private function map_js_attributes_data( array $stampa_field, object $field ) : void {
		$attribute_name = $field->name;
		$attribute_type = $stampa_field['gutenberg']['attribute_type'] ?? null;

		if ( $attribute_type != null ) {
			Stampa_Replacer::add_json_mapping(
				'gutenberg.attributes',
				[
					$attribute_name => [
						'type'    => $attribute_type,
						'default' => Stampa_Replacer::get_mapping( 'value.' . $attribute_name ),
					],
				]
			);
		}

		$this->map_attributes_for_options( $stampa_field, $field );
	}

	private function map_attributes_for_options( array $stampa_field, object $field ) : void {
		$field_name   = $field->name;
		$field_values = $field->values ?? [];

		$options       = $stampa_field['options'];
		$field_options = [];
		foreach ( $options as $option ) {
			$show_in_inspector = ( $option['inspector'] ?? true ) == true;

			if ( ! $show_in_inspector ) {
				continue;
			}

			$option_name    = $option['name'];
			$attribute_name = $field_name . '__' . $option_name;

			$type         = $option['attribute_type'] ?? 'string';
			$option_value = $field_values->{$option_name} ?? $option['value'] ?? '';
			Stampa_Replacer::add_json_mapping(
				'gutenberg.attributes',
				[
					$attribute_name => [
						'type'    => $type,
						'default' => $option_value,
					],
				]
			);

			// This key is not needed for the Gutenberg code.
			unset( $option['tooltip'] );
		}
		$field_options[] = $option;

		Stampa_Replacer::add_json_mapping( 'all_fields_options', [ $field_name => $field_options ] );
	}

	private function loop_subfields( object $field, array $gutenberg, string $field_code ) : string {
		$closing_code = $this->get_closing_block_code( $gutenberg );

		$has_sub_fields = isset( $field->fields ) && is_array( $field->fields );
		if ( $has_sub_fields ) {
			$field_code .= $this->generate_block_body_from_fields( $field->fields );
		}

		$field_code .= $closing_code;

		return Stampa_Replacer::apply_mapping( $field_code );
	}
	private function get_closing_block_code( array $gutenberg ) : string {
		$closing_code = '';

		if ( isset( $gutenberg['react_end_block'] ) ) {
			$closing_code = $gutenberg['react_end_block'];
		}

		return $closing_code . '</div>';
	}

	private function remove_field_values_mapping( object $field ) : void {
		$values = $field->values ?? [];

		foreach ( $values as $key => $value ) {
			Stampa_Replacer::remove_mapping( 'value.' . $key );
		}
	}
}
