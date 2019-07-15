<?php

namespace Stampa\Test\Helpers;

function assertEndpointsExist( $php_unit_class, array $endpoints ) {
	$routes = getRestServerRoutes();

	foreach ( $endpoints as $endpoint ) {
		$php_unit_class->assertArrayHasKey( $endpoint, $routes );
	}
}

function getRestServerRoutes() {
	$wp_rest_server = getRestServer();

	return $wp_rest_server->get_routes();
}

function getRestServer() {
	global $wp_rest_server;

	if ( is_null( $wp_rest_server ) ) {
		$wp_rest_server = new \WP_REST_Server();
	}

	return $wp_rest_server;
}

function assertEndpointCallbackIsCallable( $php_unit_class, $endpoint, $method ) {
	$routes   = getRestServerRoutes();
	$callback = array_shift( $routes[ $endpoint ] );

	$php_unit_class->assertArrayHasKey( 'PUT', $callback['methods'] );

	$method = $callback['callback'];
	$php_unit_class->assertTrue( is_callable( $method ) );
}

function create_test_post() {
	return wp_insert_post(
		[
			'post_type' => 'stampa-block',
		]
	);
}

function submitPutRequest( string $endpoint, array $params = [] ) {
	$request = new \WP_REST_Request( 'PUT', $endpoint );
	foreach ( $params as $key => $value ) {
		$request->set_param( $key, $value );
	}

	$server   = getRestServer();
	$response = $server->dispatch( $request );

	$nonce = wp_create_nonce( 'wp_rest' );
	$request->set_header( 'X-WP-Nonce', $nonce );

	$response = $server->dispatch( $request );

	return $response->get_data();
}

function assertReponseHasEditLink( $php_unit_class, $response ) {
	$php_unit_class->assertArrayHasKey( 'link', $response );

	$filtered_url = filter_var( $response['link'], FILTER_VALIDATE_URL );
	$is_url_valid = $filtered_url !== false;
	$php_unit_class->assertTrue( $is_url_valid );
}

function assertPostDataMatch( $php_unit_class, int $post_id, array $data_to_match ) {
	$post = get_post( $post_id );

	foreach ( $data_to_match as $key => $value ) {
		$php_unit_class->assertEquals( $post->{$key}, $value );
	}
}

function assertHasMetaData( $php_unit_class, int $post_id, array $meta_keys ) {
	foreach ( $meta_keys as $meta_key ) {
		$meta_key   = '_stampa_' . $meta_key;
		$meta_value = get_post_meta( $post_id, $meta_key, true );

		$meta_value = json_decode( $meta_value );
		$php_unit_class->assertTrue( is_array( $meta_value ), $meta_key );
	}
}
