<?php

class Test_Stampa_Init extends \WP_UnitTestCase {
	/**
	 * The endpoint namespace
	 *
	 * @var string
	 */
	private static $namespace = 'stampa/v1';

	function getRestServer() {
		static $wp_rest_server = null;

		if ( is_null( $wp_rest_server ) ) {
			$wp_rest_server = new \WP_REST_Server();
		}

		return $wp_rest_server;
	}

	function getRestServerRoutes() {
		$wp_rest_server = $this->getRestServer();

		return $wp_rest_server->get_routes();
	}

	function assertEndpointsExist() {
		$endpoints = func_get_args();

		$routes = $this->getRestServerRoutes();

		foreach ( $endpoints as $endpoint ) {
			$this->assertArrayHasKey( $endpoint, $routes );
		}
	}

	function test_should_register_app_script() {

		$this->assertTrue( wp_script_is( 'stampa-app-script', 'enqueued' ) );
	}

	function test_should_register_the_styles() {
		$this->assertStylesAreRegistered(
			[
				'stampa-app-style',
				'stampa-gutenberg-styles',
			]
		);
	}

	function assertStylesAreRegistered( array $styles ) {
		foreach ( $styles as $style ) {
			$this->assertTrue( wp_style_is( $style, 'registered' ) );
		}
	}

}
