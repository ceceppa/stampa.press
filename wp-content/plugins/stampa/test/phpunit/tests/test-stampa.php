<?php
namespace Stampa\Test;

require __DIR__ . '/helpers.php';

use function Stampa\Test\Helpers\assertEndpointsExist;
use function Stampa\Test\Helpers\assertEndpointCallbackIsCallable;
use function Stampa\Test\Helpers\submitPutRequest;
use function Stampa\Test\Helpers\create_test_post;
use function Stampa\Test\Helpers\assertReponseHasEditLink;
use function Stampa\Test\Helpers\assertPostDataMatch;
use function Stampa\Test\Helpers\assertHasMetaData;

define( 'STAMPA_PHPUNIT', true );

do_action( 'init' );
do_action( 'rest_api_init' );
do_action( 'admin_enqueue_scripts' );

define( 'STAMPA_TEST_POST_ID', $test_post_id );

class Test_Stampa extends \WP_UnitTestCase {
	function test_should_register_the_endpoints() {
		assertEndpointsExist(
			$this,
			[
				'/stampa/v1',
				'/stampa/v1/block/(?P<id>[\\d]+)',
			]
		);
	}

	function test_the_endpoint_callback_should_be_callable() {
		assertEndpointCallbackIsCallable(
			$this,
			'/stampa/v1/block/(?P<id>[\d]+)',
			'PUT'
		);
	}

	function test_put_request_with_no_title_and_grid_should_fail() {
		$response = submitPutRequest( '/stampa/v1/block/1' );

		$this->assertEquals( 400, $response['data']['status'] );
		$this->assertEquals( 'Missing parameter(s): title, grid', $response['message'] );
	}

	function test_should_return_the_edit_link() {
		$test_post_id = create_test_post();

		$response = submitPutRequest(
			'/stampa/v1/block/' . $test_post_id,
			[
				'title' => 'block title',
				'grid'  => [],
			]
		);

		assertReponseHasEditLink( $this, $response );
		assertPostDataMatch(
			$this,
			$test_post_id,
			[
				'post_title'  => 'block title',
				'post_status' => 'publish',
			]
		);

		assertHasMetaData( $this, $test_post_id, [ 'grid', 'options', 'fields' ] );
	}
}
