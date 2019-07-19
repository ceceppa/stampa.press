<?php
namespace Stampa\Test;

require_once __DIR__ . '/js-code-inspector.helpers.php';

use Stampa\JS_Generator\JS_Inspector_Control;
use function Stampa\Test\JS_Inspector\create_inspector_test_post;

class Test_JS_Code_Inspector_Controls extends \WP_UnitTestCase {
	private $filters = [
		'options/file'   => [
			'stampa/inspector-control/options/file',
			'\Stampa\Test\JS_Inspector\inspector_control_options_file_filter',
		],
		'options/code'   => [
			'stampa/inspector-control/options/code',
			'\Stampa\Test\JS_Inspector\inspector_control_options_code',
		],
		'inspector/file' => [
			'stampa/inspector-control/file',
			'\Stampa\Test\JS_Inspector\inspector_control_file',
		],
		'inspector/code' => [
			'stampa/inspector-control/file',
			'\Stampa\Test\JS_Inspector\inspector_control_code',
		],
	];

	function add_all_filters() {
		foreach ( $this->filters as $filter ) {
			list($tag, $function) = $filter;

			add_filter( $tag, $function );
		}
	}

	function add_filter( string $filter ) {
		list($tag, $function) = $this->filters[ $filter ];

		add_filter( $tag, $function );
	}

	function remove_all_filters() {
		foreach ( $this->filters as $filter ) {
			list($tag, $function) = $filter;

			remove_filter( $tag, $function );
		}
	}

	function remove_filter( string $filter ) {
		list($tag, $function) = $this->filters[ $filter ];

		remove_filter( $tag, $function );
	}

	function test_should_trigger_the_filter_for_the_options_file() {
		$this->add_filter( 'options/file' );

		create_inspector_test_post();
		new JS_Inspector_Control();

		$this->assertTrue( defined( 'STAMPA_TEST_INSPECTOR_OPTIONS_FILTER_FILE' ) );
		$this->remove_filter( 'options/file' );
	}

	function test_should_trigger_the_filter_for_the_options_code() {
		$this->add_filter( 'options/code' );
		create_inspector_test_post();
		new JS_Inspector_Control();

		$this->assertTrue( defined( 'STAMPA_TEST_INSPECTOR_OPTIONS_FILTER_CODE' ) );
		$this->remove_filter( 'options/code' );
	}

	function test_should_trigger_the_filter_for_the_inspector_file() {
		$this->add_filter( 'inspector/file' );

		create_inspector_test_post();
		new JS_Inspector_Control();

		$this->assertTrue( defined( 'STAMPA_TEST_INSPECTOR_FILTER_FILE' ), 'stampa/inspector-control/file' );
		$this->remove_filter( 'inspector/file' );
	}

	function test_should_trigger_the_filter_for_the_inspector_code() {
		$this->add_filter( 'inspector/code' );

		create_inspector_test_post();
		new JS_Inspector_Control();

		$this->assertTrue( defined( 'STAMPA_TEST_INSPECTOR_FILTER_CODE' ), 'stampa/inspector-control/code' );
		$this->remove_filter( 'inspector/code' );
	}

	function test_get_code_should_the_custom_inspector_boilerplate() {
		$this->add_all_filters();

		create_inspector_test_post();
		$inspector = new JS_Inspector_Control();
		$code      = $inspector->get_code();

		$compare = "test inspector background image for test inspector\ntest options for test inspector";
		$this->assertEquals( $code, $compare );

		$this->remove_all_filters();
	}
}
