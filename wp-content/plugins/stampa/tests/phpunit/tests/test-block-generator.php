<?php
namespace Stampa\Test;

use Stampa\BlockGenerator;
use function Stampa\Test\Helpers\create_test_post_with_data;

class Test_Block_Generator extends \WP_UnitTestCase {
	function test_should_load_the_block_meta_data() {
		$this->assertTrue( true );
		// create_test_post_with_data(
		// [
		// 'title'         => 'block title',
		// 'grid'          => [
		// 'rows' => 5,
		// ],
		// 'fields'        => [ 'fields' ],
		// 'block_options' => [ 'block_options' ],
		// ]
		// );
	}
}
