<?php
use Stampa\Assets_Copier;

$stampa_temp_folder = sys_get_temp_dir() . '/stampa-unittest/';
if ( ! is_dir( $stampa_temp_folder ) ) {
	mkdir( $stampa_temp_folder );
}

$temp_folder_name = $stampa_temp_folder . uniqid() . '/';

define( 'STAMPA_UNIT_TEST_TEMP_FOLDER', $temp_folder_name );

new Assets_Copier( $temp_folder_name );

class Test_Assets_Copier extends \WP_UnitTestCase {
	function test_should_create_the_temp_folder() {
		$this->assertTrue( is_dir( STAMPA_UNIT_TEST_TEMP_FOLDER ) );
	}

	function test_should_create_the_blocks_folder() {
		$blocks_folder = STAMPA_UNIT_TEST_TEMP_FOLDER . 'blocks';

		$this->assertTrue( is_dir( $blocks_folder ) );
	}

	function test_should_create_the_components_folder() {
		$components_folder = STAMPA_UNIT_TEST_TEMP_FOLDER . 'components';

		$this->assertTrue( is_dir( $components_folder ) );
	}

	function test_should_create_the_modules_folder() {
		$modules_folder = STAMPA_UNIT_TEST_TEMP_FOLDER . 'modules';

		$this->assertTrue( is_dir( $modules_folder ) );
	}

	function test_should_create_the_postcss_folder() {
		$postcss_folder = STAMPA_UNIT_TEST_TEMP_FOLDER . 'postcss';

		$this->assertTrue( is_dir( $postcss_folder ) );
	}

	function test_get_folder_should_throw_an_error_if_invalid_subfolder_name() {
		$this->expectException( \Exception::class );

		Assets_Copier::get_folder( 'this is an invalid name' );
	}

	function test_get_folder_for_postcss_folder_path() {
		$folder = Assets_Copier::get_folder( 'postcss' );
		$this->assertEquals( $folder, STAMPA_UNIT_TEST_TEMP_FOLDER . 'postcss/' );
	}

	function test_should_copy_stampa_loader_php() {
		$php_file = STAMPA_UNIT_TEST_TEMP_FOLDER . 'stampa-loader.php';

		$this->assertTrue( file_exists( $php_file ) );
	}

	function test_should_copy_package_json() {
		$filename = STAMPA_UNIT_TEST_TEMP_FOLDER . 'package.json';

		$this->assertTrue( file_exists( $filename ) );
	}

	function test_should_copy_dot_babelrc() {
		$filename = STAMPA_UNIT_TEST_TEMP_FOLDER . '.babelrc';

		$this->assertTrue( file_exists( $filename ) );
	}

	function test_should_copy_the_custom_components() {
		$components = glob( STAMPA_ASSETS_FOLDER . '/components/*.*' );
		$copied     = glob( Assets_Copier::get_folder( 'components' ) . '*.*' );

		$this->assertEquals( count( $components ), count( $copied ) );
	}
}
