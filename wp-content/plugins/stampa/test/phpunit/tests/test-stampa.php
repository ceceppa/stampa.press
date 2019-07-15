<?php

do_action( 'init' );
do_action( 'rest_api_init' );
do_action( 'admin_enqueue_scripts' );

class Test_Stampa extends \WP_UnitTestCase {
	/**
	 * Test the save endpoint
	 *
	 * POST /stampa/v1/bloc/{id}
	 */
	function test_should_register_the_endpoints() {
		$this->assertEndpointsExist(
			'/stampa/v1',
			'/stampa/v1/block/(?P<id>[\\d]+)'
		);
		// $callback = $routes[ $endpoint ][0];
		// PUT callback?
		// $this->assertArrayHasKey( 'PUT', $callback['methods'] );
		// Is callable?
		// $method = $callback['callback'];
		// $this->assertTrue( is_callable( $method ) );
	}

	function assertEndpointsExist() {
		$endpoints = func_get_args();

		$routes = $this->getRestServerRoutes();

		foreach ( $endpoints as $endpoint ) {
			$this->assertArrayHasKey( $endpoint, $routes );
		}
	}

	function getRestServerRoutes() {
		$wp_rest_server = $this->getRestServer();

		return $wp_rest_server->get_routes();
	}

	function getRestServer() {
		static $wp_rest_server = null;

		if ( is_null( $wp_rest_server ) ) {
			$wp_rest_server = new \WP_REST_Server();
		}

		return $wp_rest_server;
	}

	// /**
	// * Test add field
	// */
	// function test_add_field() {
	// Stampa::add_field( 'my-group', 'my-id', [] );
	// $fields = Stampa::get_fields();
	// $this->assertCount( 2, $fields ); // 1 group is loaded by load_fields automatically.
	// $this->assertArrayHasKey( 'My-group', $fields );
	// }
}
