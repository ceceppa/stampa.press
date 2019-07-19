<?php
namespace Stampa\Test;

use function Stampa\Test\JS_Inspector\create_inspector_test_post;
use Stampa\JS_Generator\JS_Code_Generator;
use Stampa\Stampa_Replacer;
use Stampa\Assets_Copier;

require_once __DIR__ . '/js-code-inspector.helpers.php';

class Test_JS_Code_Generator extends \WP_UnitTestCase {
	private $test_id = null;

	function test_should_setup_wp_components_and_editor_variables() {
		create_inspector_test_post();

		new JS_Code_Generator();

		$this->assertEquals(
			Stampa_Replacer::get_mapping( 'wp.components' ),
			[
				'_glue'   => ',',
				'_values' => [
					'IconButton',
					'IconButton',
				],
			]
		);
	}

	function test_should_generate_the_js_file_without_failing() {
		$this->test_id = create_inspector_test_post( 'test-block' );

		define( 'STAMPA_GENERATE_JS_FILE', true );

		new JS_Code_Generator();

		$this->assertEquals(
			Stampa_Replacer::get_mapping( 'wp.components' ),
			[
				'_glue'   => ',',
				'_values' => [
					'IconButton',
					'IconButton',
				],
			]
		);

		$output_folder = Assets_Copier::get_folder( 'blocks' );
		$output_file   = 'test-block.js';
		$expected_file = trailingslashit( $output_folder ) . $output_file;

		$this->assertTrue( file_exists( $expected_file ), 'File not found: ' . $expected_file );
	}

	function test_should_import_the_test_file_into_index_js() {
		$output_folder = Assets_Copier::get_folder( '__root' );
		$indexjs       = $output_folder . 'index.js';

		$content = file_get_contents( $indexjs );

		$this->assertTrue( stripos( $content, 'test-block' ) !== false );
	}

	function test_should_compile_the_js_file() {
		$post_id = create_inspector_test_post();

		define( 'STAMPA_RUN_PARCEL', true );
		new JS_Code_Generator();

		$this->assertEquals(
			Stampa_Replacer::get_mapping( 'wp.components' ),
			[
				'_glue'   => ',',
				'_values' => [
					'IconButton',
					'IconButton',
				],
			]
		);

		$output_folder = Assets_Copier::get_folder( '__root' );
		$this->assertTrue( file_exists( $output_folder . 'dist/index.js' ) );
	}
}
