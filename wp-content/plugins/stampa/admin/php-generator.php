<?php
/**
 * Generate the PHP code
 */

namespace Stampa;

class PHP_Generator {
	private $php_code = [];

	public function __construct() {
		$fields = Block_Data::get_fields();

		$this->setup_section_code();

		new Fields_Looper( $fields, [ & $this, 'loop_field_start' ] );

		$this->save_php_file();
	}

	private function setup_section_code() {
		$has_background_image   = Block_Data::get_block_option( 'hasBackgroundOption' );
		$background_image_style = ' style="background: url(\'<?php echo $backgroundImage ?>\') no-repeat center / cover "';

		$this->php_code = sprintf(
			'<section class="{{stampa.block.className}}"%s>%s',
			$has_background_image ? $background_image_style : '',
			PHP_EOL
		);
	}

	public function loop_field_start( array $stampa_field, object $field ) {
		$this->css_code[] = sprintf( "  &__%s {\n  }", $field->name );
	}

	private function save_php_file() {
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
