<?php
namespace Stampa\Test;

use function Stampa\Test\Helpers\create_test_post_with_data;
use Stampa\Block_Generator;

class Test_Block_Generator extends \WP_UnitTestCase {
	private $test_data = [
		'grid'          => [
			'rows' => 5,
		],
		'fields'        => [ 'fields' ],
		'block_options' => [ 'block_options' ],
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

		$block_generator = new Block_Generator( $test_id );
		$field_data      = $block_generator->get_block_data();

		$this->assertEquals( $field_data, $this->test_data );
	}

	function test_get_grid_data_should_return_an_object() {
		$grid_data = Block_Generator::get_grid_data();

		$this->assertTrue( is_object( $grid_data ) );
		$this->assertEquals( (array) $grid_data, $this->test_data['grid'] );
	}

}
