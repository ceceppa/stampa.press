<?php

declare(strict_types=1);

namespace Stampa;

class JS_Fields_Code_Generator {
	public function __construct() {
		Stampa_Replacer::add_array_mapping( 'render.content', [], '' );

		$fields     = Block_Data::get_fields();
		$react_code = new Fields_Looper(
			$fields,
			[ & $this, 'get_opening_block_code' ],
			[ & $this, 'get_closing_block_code' ]
		);

		Stampa_Replacer::add_array_mapping(
			'render.content',
			[
				$react_code->get_code(),
			],
			''
		);
	}

	public function get_opening_block_code( $stampa_field, $field ) {
		$gutenberg = $stampa_field['gutenberg'] ?? [];

		$this->map_field_grid_position( $field->position );
		$this->map_js_attributes_data( $stampa_field, $field );

		return $this->get_opening_div( $field, $gutenberg );
	}

	private function get_opening_div( object $field, array $gutenberg ) : string {
		$stampa_field = Fields_Loader::get_field_by_id( $field->id );
		$is_container = (int) ( $stampa_field['stampa']['container'] ?? 0 ) === 1;

		$code = '{/* ' . $field->name . ' */}';

		if ( $is_container ) {
			$code .= $this->get_container_div_code( $field );
		} else {
			$code .= $this->get_field_div_code( $field );
		}

		$code .= $gutenberg['react'] ?? '';
		$code .= $gutenberg['react_start_block'] ?? '';

		return $code;
	}

	private function get_container_div_code( object $field ) {
		$field_id   = $field->id;
		$field_name = $field->name;

		$values           = $field->values ?? [];
		$template_columns = trim( str_repeat( '1fr ', (int) $values->columns ) );

		$number_of_rows          = (int) $values->rows;
		$number_of_rows_occupied = (int) $field->position->endRow;

		$block_row_height = (int) Block_Data::get_grid_value( 'rowHeight' );
		$total_height     = $block_row_height * $number_of_rows_occupied;
		$field_row_height = $total_height / $number_of_rows;
		$template_rows    = trim( str_repeat( $field_row_height . 'px ', $number_of_rows ) );

		$gap = $values->gap;

		$on_click = $this->get_on_click_code( $field );

		return "
		<div
			className={`stampa-field stampa-field--{$field_id} {{stampa.block.className}}__{$field_name} \${focusedField == '{$field_name}' ? 'focused' : ''}`}
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
			$on_click
		>
		";
	}

	private function get_field_div_code( object $field ) : string {
		$field_id   = $field->id;
		$field_name = $field->name;

		$on_click = $this->get_on_click_code( $field );
		return "
			<div
			className={`stampa-field stampa-field--{$field_id} {{stampa.block.className}}__{$field_name} \${focusedField == '{$field_name}' ? 'focused' : ''}`}
			style={{
				gridRowStart: {{stampa.grid_row_start}},
				gridColumnStart: {{stampa.grid_column_start}},
				gridRowEnd: {{stampa.grid_row_end}},
				gridColumnEnd: {{stampa.grid_column_end}}
			}}
			$on_click
			title=\"$field_name\"
			>
		";
	}

	private function get_on_click_code( object $field ) : string {
		$field_name     = $field->name;
		$stampa_field   = Fields_Loader::get_field_by_id( $field->id );
		$focusable      = $stampa_field['gutenberg']['focusable'] ?? true;
		$can_have_focus = $focusable !== false;

		if ( ! $can_have_focus ) {
			return '';
		}

		return "onClick={e => updateFocusedField(e, '$field_name')}";
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
			Stampa_Replacer::add_single_mapping( $key, (string) $position );
		}
	}

	private function map_js_attributes_data( array $stampa_field, object $field ) : void {
		$attribute_name = $field->name;
		$attribute      = $stampa_field['gutenberg']['attribute'] ?? null;

		if ( is_array( $attribute ) ) {
			if ( ! isset( $attribute['default'] ) ) {
				$attribute['default'] = Stampa_Replacer::get_mapping( 'value.' . $attribute_name ) ?? '';
			}

			Stampa_Replacer::add_json_mapping( 'gutenberg.attributes', [ $attribute_name => $attribute ] );
		}

		$this->map_attributes_for_field_options( $stampa_field, $field );
	}

	private function map_attributes_for_field_options( array $stampa_field, object $field ) : void {
		$field_name   = $field->name;
		$field_values = $field->values ?? [];

		$options       = $stampa_field['options'] ?? [];
		$field_options = [];
		foreach ( $options as $option ) {
			$show_in_inspector = ( $option['inspector'] ?? 'true' ) === 'true';

			if ( ! $show_in_inspector ) {
				continue;
			}

			$option_name    = $option['name'];
			$attribute_name = $field_name . '__' . $option_name;

			$type         = $option['attribute_type'] ?? 'string';
			$option_value = $field_values->{$option_name} ?? $option['value'] ?? $option['attribute_default'] ?? '';

			if ( $type === 'object' ) {
				$option_value = str_replace( '"', '', $option_value );
				$option_value = str_replace( "'", '', $option_value );

				$option_value = json_decode( $option_value );
			}

			Stampa_Replacer::add_json_mapping(
				'gutenberg.attributes',
				[
					$attribute_name => [
						'type'    => $type,
						'default' => $option_value ?? '',
					],
				]
			);

			// This key is not needed for the Gutenberg code.
			unset( $option['tooltip'] );
			$field_options[] = $option;
		}

		Stampa_Replacer::add_json_mapping( 'all_fields_options', [ $field_name => $field_options ] );
	}

	public function get_closing_block_code( array $stampa_field ) : string {
		$closing_code = '';

		$gutenberg = $stampa_field['gutenberg'] ?? [];
		if ( isset( $gutenberg['react_end_block'] ) ) {
			$closing_code = $gutenberg['react_end_block'];
		}

		return $closing_code . '</div>';
	}
}
