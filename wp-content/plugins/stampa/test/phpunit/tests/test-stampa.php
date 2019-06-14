<?php

use Stampa\Stampa;


class Test_Stampa extends \WP_UnitTestCase {
	/**
	 * The endpoint namespace
	 *
	 * @var string
	 */
	private static $namespace = 'stampa/v1';

	function __constructor() {
		do_action( 'init' );
	}

	/**
	 * Make sure that the class register the js and the stylesheet
	 */
	function test_register_script_and_style() {
		do_action( 'admin_enqueue_scripts' );

		$this->assertTrue( wp_script_is( 'stampa-script', 'registered' ) );
		$this->assertTrue( wp_style_is( 'stampa-style', 'registered' ) );
	}

	/**
	 * Test the save endpoint
	 *
	 * POST /stampa/v1/bloc/{id}
	 */
	function test_endpoint() {
		global $wp_rest_server;

		$wp_rest_server = new \WP_REST_Server();
		do_action( 'rest_api_init' );

		// Check taht the namespace exists.
		$routes = $wp_rest_server->get_routes();
		$this->assertArrayHasKey( '/stampa/v1', $routes );

		$endpoint = '/stampa/v1/block/(?P<id>[\\d]+)';
		$this->assertArrayHasKey( $endpoint, $routes );

		$callback = $routes[ $endpoint ][0];

		// PUT callback?
		$this->assertArrayHasKey( 'PUT', $callback['methods'] );

		// Is callable?
		$method = $callback['callback'];
		$this->assertTrue( is_callable( $method ) );
	}

	/**
	 * Test add field
	 */
	function test_add_field() {
		Stampa::add_field( 'my-group', 'my-id', [] );

		$fields = Stampa::get_fields();
		$this->assertCount( 2, $fields ); // 1 group is loaded by load_fields automatically.
		$this->assertArrayHasKey( 'My-group', $fields );
	}
}
