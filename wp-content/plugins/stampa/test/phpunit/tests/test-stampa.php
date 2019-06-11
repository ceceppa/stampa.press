<?php

class Test_Stampa extends \WP_UnitTestCase {
	private $namespace = 'stampa/v1';

	function test_class_is_defined() {
		do_action( 'init' );

		$this->assertTrue( class_exists( 'Stampa\Stampa' ) );
	}

	function test_enqueue_script() {
		do_action( 'admin_enqueue_scripts' );

		$this->assertTrue( wp_script_is( 'stampa-script', 'registered' ) );
	}

	function test_endpoint() {
		// Check taht the namespace exists.
		$routes = $this->server->get_routes();
		$this->assertArrayHasKey( self::$namespace, $routes );

		$endpoints = [
			self::$namespace . self::$start_endpoint . self::$start_pattern,
			self::$namespace . self::$watch_endpoint . self::$watch_pattern,
		];

		// The endpoint.
		foreach ( $endpoints as $endpoint ) {
			$this->assertArrayHasKey( $endpoint, $routes );

			// Is callable?
			$callback = $routes[ $endpoint ][0];

			$class  = $callback['callback'][0];
			$method = $callback['callback'][1];

			$this->assertTrue( is_callable( array( $class, $method ) ) );
		}

	}
}
