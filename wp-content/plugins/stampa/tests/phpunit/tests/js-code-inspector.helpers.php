<?php
namespace Stampa\Test\JS_Inspector;

use function Stampa\Test\Helpers\create_test_post_with_data;
use Stampa\Block_Data;

require_once __DIR__ . '/helpers.php';

function inspector_control_options_file_filter( string $filename ) :string {
	if ( ! defined( 'STAMPA_TEST_INSPECTOR_OPTIONS_FILTER_FILE' ) ) {
		define( 'STAMPA_TEST_INSPECTOR_OPTIONS_FILTER_FILE', true );
	}

	return __DIR__ . '/test-inspector.options.js';
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

	return __DIR__ . '/test-inspector.js';
}

function inspector_control_code( string $code ) : string {
	if ( ! defined( 'STAMPA_TEST_INSPECTOR_FILTER_CODE' ) ) {
		define( 'STAMPA_TEST_INSPECTOR_FILTER_CODE', true );
	}

	return $code;
}

function create_inspector_test_post( string $title = 'test inspector' ) {
	$test_data = file_get_contents( __DIR__ . '/test-block.json' );
	$json      = (array) json_decode( $test_data );

	$test_post_id = create_test_post_with_data(
		array_merge(
			[
				'title' => $title,
			],
			$json
		)
	);

	new Block_Data( $test_post_id );
}

function create_fieds_test_post_with_empty_fields() {
	$test_data = file_get_contents( __DIR__ . '/test-block.json' );
	$json      = (array) json_decode( $test_data );

	$json['fields'] = [];
	$test_post_id   = create_test_post_with_data(
		array_merge(
			[
				'title' => 'test fields generator with empty fields',
			],
			$json
		)
	);

	new Block_Data( $test_post_id );
}

function create_fieds_test_post_with_fields() {
	$test_data = file_get_contents( __DIR__ . '/test-block.json' );
	$json      = (array) json_decode( $test_data );

	$test_post_id = create_test_post_with_data(
		array_merge(
			[
				'title' => 'test fields generator with fields',
			],
			$json
		)
	);

	new Block_Data( $test_post_id );
}
