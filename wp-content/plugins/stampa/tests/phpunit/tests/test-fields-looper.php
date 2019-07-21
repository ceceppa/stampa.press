<?php
namespace Stampa\Test;

use Stampa\Fields_Looper;
use stdClass;
use Stampa\Fields_Loader;

class Test_Fields_Looper extends \WP_UnitTestCase {
	function get_image_field() {
		$fields = [];

		$field       = new stdClass();
		$field->id   = 'image';
		$field->name = 'test image';

		$fields[] = $field;

		return $fields;
	}

	function get_nested_fields() {
		$fields = $this->get_image_field();

		$nested       = new stdClass();
		$nested->id   = 'heading';
		$nested->name = 'heading';

		$fields[0]->fields = [ $nested ];

		return $fields;
	}

	function test_should_call_the_test_loop_field_start_callback() {
		$observer = $this->getMockBuilder( Observer::class )
		->setMethods( [ 'test_loop_field_start' ] )
		->getMock();

		$stampa_field = Fields_Loader::get_field_by_id( 'image' );
		$field        = $this->get_image_field();

		$observer->expects( $this->once() )
		->method( 'test_loop_field_start' )
		->with( $this->equalTo( $stampa_field ), $field[0] );

		new Fields_Looper( $field, [ & $observer, 'test_loop_field_start' ], null, function() {} );
	}

	function test_should_call_the_test_loop_field_end_callback() {
		$observer = $this->getMockBuilder( Observer::class )
		->setMethods( [ 'test_loop_field_end' ] )
		->getMock();

		$stampa_field = Fields_Loader::get_field_by_id( 'image' );
		$field        = $this->get_image_field();

		$observer->expects( $this->once() )
		->method( 'test_loop_field_end' )
		->with( $this->equalTo( $stampa_field ), $field[0] );

		new Fields_Looper( $field, function(){}, [ & $observer, 'test_loop_field_end' ], function() {} );
	}

	function test_should_call_the_test_closing_block_code_callback() {
		$observer = $this->getMockBuilder( Observer::class )
		->setMethods( [ 'test_closing_block_code' ] )
		->getMock();

		$stampa_field = Fields_Loader::get_field_by_id( 'image' );
		$field        = $this->get_image_field();

		$observer->expects( $this->once() )
		->method( 'test_closing_block_code' )
		->with( $this->equalTo( $stampa_field ), $field[0] );

		new Fields_Looper( $field, function(){}, function() {}, [ & $observer, 'test_closing_block_code' ] );
	}

	function test_nested_fields() {
		$observer = $this->getMockBuilder( Observer::class )
		->setMethods( [ 'test_nested_loop' ] )
		->getMock();

		$image_field = Fields_Loader::get_field_by_id( 'image' );
		$fields      = $this->get_nested_fields();

		$observer->expects( $this->at( 0 ) )
		->method( 'test_nested_loop' )
		->with( $this->equalTo( $image_field ), $fields[0] );

		$heading_field = Fields_Loader::get_field_by_id( 'heading' );
		$observer->expects( $this->at( 1 ) )
		->method( 'test_nested_loop' )
		->with( $this->equalTo( $heading_field ), $fields[0]->fields[0] );

		new Fields_Looper( $fields, [ & $observer, 'test_nested_loop' ], null, function() {} );
	}
}
