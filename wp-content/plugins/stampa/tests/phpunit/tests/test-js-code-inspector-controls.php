<?php
namespace Stampa\Test;

require_once __DIR__ . '/helpers.php';

use Stampa\JSGenerator\JS_Inspector_Control;
use Stampa\Block_Data;
use function Stampa\Test\Helpers\create_test_post_with_data;

add_filter(
	'stampa/inspector-control/options/file',
	function( string $filename ) {
		if ( ! defined( 'STAMPA_TEST_INSPECTOR_OPTION_FILTER_FILE' ) ) {
			define( 'STAMPA_TEST_INSPECTOR_OPTION_FILTER_FILE', true );
		}

		return $filename;
	}
);

add_filter(
	'stampa/inspector-control/options/code',
	function( string $code ) {
		if ( ! defined( 'STAMPA_TEST_INSPECTOR_OPTION_FILTER_CODE' ) ) {
			define( 'STAMPA_TEST_INSPECTOR_OPTION_FILTER_CODE', true );
		}

		return $code;
	}
);

add_filter(
	'stampa/inspector-control/file',
	function( string $filename ) {
		if ( ! defined( 'STAMPA_TEST_INSPECTOR_FILTER_FILE' ) ) {
			define( 'STAMPA_TEST_INSPECTOR_FILTER_FILE', true );
		}

		return $filename;
	}
);

add_filter(
	'stampa/inspector-control/code',
	function( string $code ) {
		if ( ! defined( 'STAMPA_TEST_INSPECTOR_FILTER_CODE' ) ) {
			define( 'STAMPA_TEST_INSPECTOR_FILTER_CODE', true );
		}

		return $code;
	}
);

function create_the_test_post() {
	$test_post_id = create_test_post_with_data(
		[
			'title'         => 'test inspector',
			'grid'          => [
				'rows' => 5,
			],
			'fields'        => [ 'fields' ],
			'block_options' => [
				'icon'                => 'flower',
				'hasBackgroundOption' => true,
			],
		]
	);

	new Block_Data( $test_post_id );
}


class Test_JS_Code_Inspector_Controls extends \WP_UnitTestCase {
	function test_should_trigger_the_filter_to_allow_customising_the_inspector_boilerplate_code() {
		create_the_test_post();
		new JS_Inspector_Control();

		$this->assertTrue( defined( 'STAMPA_TEST_INSPECTOR_FILTER_FILE' ), 'stampa/inspector-control/file' );
		$this->assertTrue( defined( 'STAMPA_TEST_INSPECTOR_FILTER_CODE' ), 'stampa/inspector-control/code' );
	}

	function test_should_trigger_the_filter_to_allow_customising_the_options_code() {
		create_the_test_post();
		new JS_Inspector_Control();

		$this->assertTrue( defined( 'STAMPA_TEST_INSPECTOR_OPTION_FILTER_FILE' ) );
		$this->assertTrue( defined( 'STAMPA_TEST_INSPECTOR_OPTION_FILTER_CODE' ) );
	}
}
