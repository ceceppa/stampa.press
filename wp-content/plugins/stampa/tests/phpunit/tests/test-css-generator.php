<?php
use Stampa\Block_Data;
use function Stampa\Test\JS_Inspector\create_fieds_test_post_with_fields;
use Stampa\CSS_Generator;
use Stampa\Assets_Copier;

require_once __DIR__ . '/helpers.php';

class Test_CSS_Generator extends \WP_UnitTestCase {
	function test_should_generate_the_css_code() {
		create_fieds_test_post_with_fields();

		new CSS_Generator();

		$filename = Block_Data::get_sanitized_block_title() . '.pcss';
		$filename = Assets_Copier::get_folder( '__root' ) . 'postcss/' . $filename;

		$this->assertTrue( file_exists( $filename ), $filename );
	}
}
