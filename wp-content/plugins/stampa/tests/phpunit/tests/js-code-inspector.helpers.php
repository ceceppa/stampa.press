<?php
namespace Stampa\Test\JS_Inspector;

use function Stampa\Test\Helpers\create_test_post_with_data;
use Stampa\Block_Data;

require_once __DIR__ . '/helpers.php';

function inspector_control_options_file_filter( string $filename ) :string {
	if ( ! defined( 'STAMPA_TEST_INSPECTOR_OPTIONS_FILTER_FILE' ) ) {
		define( 'STAMPA_TEST_INSPECTOR_OPTIONS_FILTER_FILE', true );
	}

	return $filename;
}

function inspector_control_options_code( string $code ) :string {
	if ( ! defined( 'STAMPA_TEST_INSPECTOR_OPTIONS_FILTER_CODE' ) ) {
		define( 'STAMPA_TEST_INSPECTOR_OPTIONS_FILTER_CODE', true );
	}

	return $code;
}

function inspector_control_file( string $filename ) : string {
	if ( ! defined( 'STAMPA_TEST_INSPECTOR_FILTER_FILE' ) ) {
		define( 'STAMPA_TEST_INSPECTOR_FILTER_FILE', true );
	}

	return $filename;
}

function inspector_control_code( string $code ) : string {
	if ( ! defined( 'STAMPA_TEST_INSPECTOR_FILTER_CODE' ) ) {
		define( 'STAMPA_TEST_INSPECTOR_FILTER_CODE', true );
	}

	return $code;
}

function create_inspector_test_post() {
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
