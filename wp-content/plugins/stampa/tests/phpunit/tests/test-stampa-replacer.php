<?php
namespace Stampa\Test;

use Stampa\Stampa_Replacer;

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
				'_glue'   => ',',
				'_values' => [
					'option' => 1,
				],
			]
		);
	}

	function test_add_array_mapping_should_append_data_if_key_exists() {
		Stampa_Replacer::add_array_mapping( 'test-append', [ 'option' ] );
		Stampa_Replacer::add_array_mapping( 'test-append', [ 'another' ] );

		$this->assertEquals(
			Stampa_Replacer::get_mapping( 'test-append' ),
			[
				'_glue'   => ',',
				'_values' => [
					'option',
					'another',
				],
			]
		);
	}

	function test_add_json_mapping() {
		Stampa_Replacer::add_json_mapping(
			'test-json',
			[
				'option' => 1,
			]
		);

		$result = Stampa_Replacer::get_mapping( 'test-json' );
		$this->assertEquals(
			$result,
			[
				'_glue'   => null,
				'_json'   => true,
				'_values' => [
					'option' => 1,
				],
			]
		);
	}

	function test_add_mapping_should_trigger_the_filter() {
		$observer = $this->getMockBuilder( Observer::class )
		->setMethods( [ 'test_filter' ] )
		->getMock();

		$observer->expects( $this->once() )
			->method( 'test_filter' )
		->with(
			$this->equalTo( 'value' ),
			$this->equalTo( 'test-mapping' )
		);

			add_filter( 'stampa/replacer/add', [ $observer, 'test_filter' ], 10, 2 );

		Stampa_Replacer::add_single_mapping( 'test-mapping', 'value' );
	}

	function test_apply_mapping_should_replace_the_special_variables() {
		Stampa_Replacer::clear_mapping();
		Stampa_Replacer::add_single_mapping( 'simple-string', 'its value' );

		$replaced = Stampa_Replacer::apply_mapping( '{{stampa.simple-string}}' );

		$this->assertEquals( $replaced, 'its value' );
	}

	function test_apply_mapping_with_for_array() {
		Stampa_Replacer::clear_mapping();
		Stampa_Replacer::add_array_mapping( 'array-mapping', [ 'a' ] );
		Stampa_Replacer::add_array_mapping( 'array-mapping', [ 'b' ] );

		$replaced = Stampa_Replacer::apply_mapping( '{{stampa.array-mapping}}' );

		$this->assertEquals( $replaced, "a,\nb" );
	}

	function test_apply_mapping_with_for_multiselect_output() {
		Stampa_Replacer::clear_mapping();
		Stampa_Replacer::add_array_mapping(
			'mutltiselect-mapping',
			[
				[
					'label' => 'a',
					'value' => 'b',
				],
			]
		);

		$replaced = Stampa_Replacer::apply_mapping( '{{stampa.mutltiselect-mapping}}' );

		$this->assertEquals( $replaced, 'b' );
	}

	function test_apply_mapping_with_for_json() {
		Stampa_Replacer::clear_mapping();
		Stampa_Replacer::add_json_mapping( 'json-mapping', [ 'a' => 1 ] );
		Stampa_Replacer::add_array_mapping( 'json-mapping', [ 'b' => 2 ] );

		$replaced = Stampa_Replacer::apply_mapping( '{{stampa.json-mapping}}' );

		$this->assertEquals(
			$replaced,
			json_encode(
				[
					'a' => 1,
					'b' => 2,
				]
			)
		);
	}

	function test_apply_mapping_should_support_sanitized_filter() {
		Stampa_Replacer::clear_mapping();

		Stampa_Replacer::add_single_mapping( 'test', 'this should be sanitized' );

		$replaced = Stampa_Replacer::apply_mapping( '{{stampa.test|sanitize}}' );
		return $this->assertEquals( $replaced, 'this-should-be-sanitized' );
	}
}
