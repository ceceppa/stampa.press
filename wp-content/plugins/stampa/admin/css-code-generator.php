<?php
/**
 * Generate the CSS code
 */

namespace Stampa;

class CSS_Code_Generator {
	private $css_code = [];

	public function __construct() {
		$fields = Block_Data::get_fields();

		$this->css_code[] = sprintf( '.%s {', Block_Data::get_sanitized_block_title() );

		new Fields_Looper( $fields, [ & $this, 'loop_field_start' ] );

		$output_file = $this->save_css_file();
		$this->append_to_index_pcss( $output_file );

		new Parcel_Builder( 'pcss' );
	}

	public function loop_field_start( array $stampa_field, object $field ) {
		$this->css_code[] = sprintf( "  &__%s {\n  }", $field->name );
	}

	private function save_css_file() : string {
		$file_saver  = new File_Saver( 'postcss', 'pcss' );
		$output_file = $file_saver->get_output_file();

		$css_content = join( PHP_EOL, $this->css_code ) . "\n}";

		$file_saver->save_file( $output_file, $css_content );

		return $output_file;
	}

	private function append_to_index_pcss( string $output_file ) {
		$file_name   = preg_replace( '/.pcss$/', '', basename( $output_file ) );
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
}
