<?php

class Test_Stampa extends \WP_UnitTestCase {
	/**
	 * The endpoint namespace
	 *
	 * @var string
	 */
	private static $namespace = 'stampa/v1';

	function test_class_is_defined() {
		do_action( 'init' );

		$this->assertTrue( class_exists( 'Stampa\Stampa' ) );
	}

	function test_enqueue_script() {
		do_action( 'admin_enqueue_scripts' );

		$this->assertTrue( wp_script_is( 'stampa-script', 'registered' ) );
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

		// POST callback?
		$this->assertArrayHasKey( 'POST', $callback['methods'] );

		// Is callable?
		$method = $callback['callback'];
		$this->assertTrue( is_callable( $method ) );
	}
}
