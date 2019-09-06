<?php

declare(strict_types=1);

/**
 * Generate the PHP code
 */

namespace Stampa;

class PHP_Code_Generator {
	private $php_code = [];

	public function __construct() {
		$fields = Block_Data::get_fields();

		$looper = new Fields_Looper(
			$fields,
			[ & $this, 'opening_php_code' ],
			[ & $this, 'closing_php_code' ]
		);

		$this->php_code = $looper->get_code();

		$this->save_php_file();
	}

	public function opening_php_code( array $stampa_field ) {
		return $stampa_field['php']['code'] ?? '';
	}

	public function closing_php_code( array $stampa_field ) {
		return $stampa_field['php']['end_block'] ?? '';
	}

	private function save_php_file() : string {
		$file_saver  = new File_Saver( 'modules', 'php' );
		$output_file = $file_saver->get_output_file();

		$php_code = $this->start_section() . $this->php_code . "\n</section>";

		$file_saver->save_file( $output_file, $php_code );

		return $output_file;
	}

	private function start_section() {
		$has_background_image   = Block_Data::get_block_option( 'hasBackgroundOption' ) === 'true';
		$background_image_style = 'style="background: url(\'<?php echo $backgroundImage; ?>\') no-repeat center / cover "';

		$style   = $has_background_image ? $background_image_style : '';
		$section = sprintf(
			'<section class="{{stampa.block.className}}" %s>%s',
			$style,
			PHP_EOL
		);

		return Stampa_Replacer::apply_mapping( $section );
	}

}
