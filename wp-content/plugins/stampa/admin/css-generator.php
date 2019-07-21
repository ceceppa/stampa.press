<?php
/**
 * Generate the CSS code
 */

namespace Stampa;

class CSS_Generator {
	private $css_code = [];

	public function __construct() {
		$fields = Block_Data::get_fields();

		$this->css_code[] = sprintf( '.%s {', Block_Data::get_sanitized_block_title() );

		new Fields_Looper( $fields, [ & $this, 'loop_field_start' ] );

		$this->save_css_file();
		$this->append_to_index_pcss();

		new Parcel_Builder( 'pcss' );
	}

	public function loop_field_start( array $stampa_field, object $field ) {
		$this->css_code[] = sprintf( "  &__%s {\n  }", $field->name );
	}

	private function save_css_file() {
		$output_file = $this->get_output_filename();

		if ( file_exists( $output_file ) ) {
			return;
		}

		$css_content = join( PHP_EOL, $this->css_code ) . "\n}";

		file_put_contents( $output_file, $css_content );
	}

	private function append_to_index_pcss() {
		$file_name   = preg_replace( '/.pcss$/', '', basename( $this->output_file ) );
		$root_folder = Assets_Copier::get_folder( '__root' );
		$index_file  = $root_folder . 'index.pcss';

		$index_content = '';
		if ( file_exists( $index_file ) ) {
			$index_content = file_get_contents( $index_file );
		}

		if ( stripos( $index_content, $file_name ) == 0 ) {
			$index_content .= "@import './postcss/{$file_name}';" . PHP_EOL;

			$success = file_put_contents( $index_file, $index_content );

			if ( ! $success ) {
				throw new \Error( 'Cannot write the index.pcss file in: ' . $root_folder );
			}
		}
	}

	private function get_output_filename() {
		$output_folder = Assets_Copier::get_folder( 'postcss' );
		$file_name     = Block_Data::get_sanitized_block_title() . '.pcss';

		$this->output_file = $output_folder . $file_name;

		return $this->output_file;
	}
}
