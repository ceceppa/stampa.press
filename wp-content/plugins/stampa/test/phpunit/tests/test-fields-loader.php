<?php
use Stampa\Fields_Loader;

class Test_Stampa_Fields_Loader extends \WP_UnitTestCase {
	function test_should_return_list_of_fields() {
		$fields = Fields_Loader::get_fields();

		$this->assertTrue( is_array( $fields ) );
		$this->assertTrue( count( $fields ) > 0 );
	}

	function test_should_allow_customise_the_field_data() {
		$observer = $this->getMockBuilder( Observer::class )
		->setMethods( [ 'test_filter' ] )
		->getMock();

		$field = [
			'id'    => 'test-field',
			'group' => 'group',
		];

		$expected = array_merge( $field, [ 'options' => [] ] );

		$observer->expects( $this->once() )
			->method( 'test_filter' )
		->with( $this->equalTo( $expected ) );

		add_filter( 'stampa_add_field/test-field', [ $observer, 'test_filter' ] );

		Fields_Loader::add_field( $field );
	}

	function test_should_allow_filtering_each_option() {
		$observer = $this->getMockBuilder( Observer::class )
		->setMethods( [ 'test_option_filter' ] )
		->getMock();

		$option = [
			'name'  => 'test-option',
			'value' => 'value',
		];

		$field = [
			'id'    => 'test-id',
			'group' => 'group',
		];

		$expected = array_merge( $field, [ 'options' => [] ] );

		$observer->expects( $this->once() )
			->method( 'test_option_filter' )
		->with( $this->equalTo( $option ) );

		add_filter( 'stampa_field_option/test-id/test-option', [ $observer, 'test_option_filter' ] );

		Fields_Loader::add_field( $field, [ $option ] );
	}

	function test_should_allow_to_get_the_field_by_id() {
		Fields_Loader::add_field(
			[
				'id'    => 'test-get-by-id',
				'group' => 'test-group',
			]
		);

		$field = Fields_Loader::get_field_by_id( 'test-get-by-id' );

		$this->assertTrue( is_array( $field ) );
	}
}
