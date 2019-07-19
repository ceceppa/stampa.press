<?php
namespace Stampa\Test;

use function Stampa\Test\JS_Inspector\create_fieds_test_post_with_empty_fields;
use function Stampa\Test\JS_Inspector\create_fieds_test_post_with_fields;
use Stampa\JS_Fields_Code_Generator;
use Stampa\Stampa_Replacer;

require_once __DIR__ . '/js-code-inspector.helpers.php';

class Test_JS_Fields_Code_Generator extends \WP_UnitTestCase {
	function test_should_setup_the_render_function_content() {
		create_fieds_test_post_with_empty_fields();

		new JS_Fields_Code_Generator();

		$mapping = Stampa_Replacer::get_mapping( 'render.content' );
		$this->assertEquals(
			$mapping,
			[
				'_glue'   => '',
				'_values' => [
					'',
				],
			]
		);
	}

	function test_should_setup_the_render_function_content_with_fields_data() {
		create_fieds_test_post_with_fields();

		new JS_Fields_Code_Generator();

		$mapping = Stampa_Replacer::get_mapping( 'render.content' );
		$this->assertTrue(
			! is_null( $mapping )
		);
	}
}
