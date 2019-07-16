<?php
namespace Stampa\Test;

use Stampa_Replacer;

class Test_Stampa_Replacer extends \WP_UnitTestCase {
	function test_add_single_mapping() {
		Stampa_Replacer::add_single_mapping( 'test-single', 'single' );

		$result = Stampa_Replacer::get_mapping( 'test-single' );

		$this->assertEquals( $result, 'single' );
	}

	function test_add_array_mapping() {
		Stampa_Replacer::add_array_mapping(
			'test-array',
			[
				'option' => 1,
			]
		);

		$result = Stampa_Replacer::get_mapping( 'test-array' );
		$this->assertEquals(
			$result,
			[
				'_glue'  => ',',
				'values' => [
					'option' => 1,
				],
			]
		);
	}
}
