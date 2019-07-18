<?php
namespace Stampa\Test;

require_once __DIR__ . '/js-code-inspector.helpers.php';

use Stampa\JSGenerator\JS_Inspector_Control;
use function Stampa\Test\JS_Inspector\create_inspector_test_post;

class Test_JS_Code_Inspector_Controls extends \WP_UnitTestCase {
	function test_should_trigger_the_filter_for_the_options_file() {
		add_filter(
			'stampa/inspector-control/options/file',
			'\Stampa\Test\JS_Inspector\inspector_control_options_file_filter'
		);
		create_inspector_test_post();
		new JS_Inspector_Control();

		$this->assertTrue( defined( 'STAMPA_TEST_INSPECTOR_OPTIONS_FILTER_FILE' ) );
	}

	function test_should_trigger_the_filter_for_the_options_code() {
		add_filter( 'stampa/inspector-control/options/code', '\Stampa\Test\JS_Inspector\inspector_control_options_code', 10, 1 );

		create_inspector_test_post();
		new JS_Inspector_Control();

		$this->assertTrue( defined( 'STAMPA_TEST_INSPECTOR_OPTIONS_FILTER_CODE' ) );
	}

	function test_should_trigger_the_filter_for_the_inspector_file() {
		add_filter(
			'stampa/inspector-control/file',
			'\Stampa\Test\JS_Inspector\inspector_control_file'
		);

		create_inspector_test_post();
		new JS_Inspector_Control();

		$this->assertTrue( defined( 'STAMPA_TEST_INSPECTOR_FILTER_FILE' ), 'stampa/inspector-control/file' );
	}

	function test_should_trigger_the_filter_for_the_inspector_code() {
		add_filter(
			'stampa/inspector-control/file',
			'\Stampa\Test\JS_Inspector\inspector_control_code'
		);

		create_inspector_test_post();
		new JS_Inspector_Control();

		$this->assertTrue( defined( 'STAMPA_TEST_INSPECTOR_FILTER_CODE' ), 'stampa/inspector-control/code' );
	}
}
