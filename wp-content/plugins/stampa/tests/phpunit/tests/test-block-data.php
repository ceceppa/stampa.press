<?php
namespace Stampa\Test;

use function Stampa\Test\Helpers\create_test_post_with_data;
use Stampa\Stampa_Replacer;
use Stampa\Block_Data;

class Test_Block_Data extends \WP_UnitTestCase {
	private $test_data = [
		'grid'          => [
			'rows' => 5,
		],
		'fields'        => [ 'fields' ],
		'block_options' => [ 'icon' => 'flower' ],
	];

	function test_should_load_the_block_meta_data() {
		$test_id = create_test_post_with_data(
			array_merge(
				[
					'title' => 'block title',
				],
				$this->test_data
			)
		);

		$block_generator = new Block_Data( $test_id );
		$field_data      = $block_generator->get_block_data();

		$this->assertEquals( $field_data, $this->test_data );
	}

	function test_get_block_data_should_apply_the_filter() {
		$test_id         = create_test_post_with_data(
			array_merge(
				[
					'title' => 'block title',
				],
				$this->test_data
			)
		);
		$block_generator = new Block_Data( $test_id );

		// will is needed to satisfy the return type of the function invoked.
		$observer = $this->getMockBuilder( Observer::class )
		->setMethods( [ 'test_filter' ] )
		->getMock();

		$observer->expects( $this->once() )
			->method( 'test_filter' )
		->with( $this->equalTo( $this->test_data ) )
			->will( $this->returnValue( [] ) );

			add_filter( 'stampa/block-data', [ $observer, 'test_filter' ] );

			$block_generator->get_block_data();
			remove_filter( 'stampa/block-data', [ $observer, 'test_filter' ] );
	}

	function test_get_grid_data_should_return_an_array() {
		$grid_data = Block_Data::get_grid_data();

		$this->assertTrue( is_array( $grid_data ) );
		$this->assertEquals( $grid_data, $this->test_data['grid'] );
	}

	function test_get_grid_value_should_return_the_single_value() {
		$rows = Block_Data::get_grid_value( 'rows' );

		$this->assertEquals( $rows, 5 );
	}

	function test_get_block_options_should_return_an_array() {
		$block_options = Block_Data::get_block_options();

		$this->assertTrue( is_array( $block_options ) );
		$this->assertEquals( $block_options, $this->test_data['block_options'] );
	}

	function test_get_block_option() {
		$icon = Block_Data::get_block_option( 'icon' );

		$this->assertEquals( $icon, 'flower' );
	}

	function test_get_fields_should_return_an_array() {
		$fields = Block_Data::get_fields();

		$this->assertTrue( is_array( $fields ) );
		$this->assertEquals( $fields, $this->test_data['fields'] );
	}

	function test_get_block_title_should_return_the_post_title() {
		$this->assertEquals( Block_Data::get_block_title(), 'block title' );
	}

	function test_get_sanitized_block_title_should_return_the_post_title_sanitized() {
		$this->assertEquals( Block_Data::get_sanitized_block_title(), 'block-title' );
	}

	function test_should_add_the_base_title_as_mapping() {
		$test_id = create_test_post_with_data(
			array_merge(
				[
					'title' => 'test block title',
				],
				$this->test_data
			)
		);

		$block_generator = new Block_Data( $test_id );
		$this->assertEquals( Stampa_Replacer::get_mapping( 'block.title' ), 'test block title' );
	}

	function test_should_add_the_base_class_as_mapping() {
		$test_id = create_test_post_with_data(
			array_merge(
				[
					'title' => 'another block title',
				],
				$this->test_data
			)
		);

		new Block_Data( $test_id );
		$this->assertEquals( Stampa_Replacer::get_mapping( 'block.className' ), 'another-block-title' );
	}

	function test_should_clear_the_mapping() {
		Stampa_Replacer::add_single_mapping( 'this should not exists', 'whatever' );

		$mapping = Stampa_Replacer::get_mapping( 'this should not exists' );
		$this->assertTrue( ! empty( $mapping ) );

		$test_id = create_test_post_with_data(
			array_merge(
				[
					'title' => 'another block title',
				],
				$this->test_data
			)
		);

		new Block_Data( $test_id );
		$mapping = Stampa_Replacer::get_mapping( 'this should not exists' );
		$this->assertTrue( empty( $mapping ) );
	}
}
