<?php
use Stampa\Assets_Copier;

class Test_Assets_Copier extends \WP_UnitTestCase {
	private $stampa_temp_folder;

	public function __construct() {
		$system_temp              = sys_get_temp_dir();
		$this->stampa_temp_folder = $system_temp . '/stampa-unittest/';

		if ( ! is_dir( $this->stampa_temp_folder ) ) {
			mkdir( $this->stampa_temp_folder );
		}

		parent::__construct();
	}

	function test_should_create_the_temp_folder() {
		$temp_folder_name = $this->stampa_temp_folder . uniqid() . '/';
		new Assets_Copier( $temp_folder_name );

		$this->assertTrue( is_dir( $temp_folder_name ) );
	}

	function test_should_create_the_blocks_folder() {
		$temp_folder_name = $this->stampa_temp_folder . uniqid() . '/';
		new Assets_Copier( $temp_folder_name );

		$blocks_folder = $temp_folder_name . 'blocks';

		$this->assertTrue( is_dir( $blocks_folder ) );
	}

	function test_should_create_the_modules_folder() {
		$temp_folder_name = $this->stampa_temp_folder . uniqid() . '/';
		new Assets_Copier( $temp_folder_name );

		$modules_folder = $temp_folder_name . 'modules';

		$this->assertTrue( is_dir( $modules_folder ) );
	}

	function test_should_create_the_postcss_folder() {
		$temp_folder_name = $this->stampa_temp_folder . uniqid() . '/';
		new Assets_Copier( $temp_folder_name );

		$postcss_folder = $temp_folder_name . 'postcss';

		$this->assertTrue( is_dir( $postcss_folder ) );
	}

	function test_get_folder_should_throw_an_error_if_invalid_subfolder_name() {
		$temp_folder_name = $this->stampa_temp_folder . uniqid() . '/';
		new Assets_Copier( $temp_folder_name );

		$this->expectException( \Exception::class );

		Assets_Copier::get_folder( 'this is an invalid name' );
	}

	function test_get_folder_for_postcss_folder_path() {
		$temp_folder_name = $this->stampa_temp_folder . uniqid() . '/';
		new Assets_Copier( $temp_folder_name );

		$folder = Assets_Copier::get_folder( 'postcss' );
		$this->assertEquals( $folder, $temp_folder_name . 'postcss/' );
	}

	function test_should_copy_stampa_loader_php() {
		$temp_folder_name = $this->stampa_temp_folder . uniqid() . '/';
		new Assets_Copier( $temp_folder_name );

		$php_file = $temp_folder_name . 'stampa-loader.php';

		$this->assertTrue( file_exists( $php_file ) );
	}

	function test_should_copy_package_json() {
		$temp_folder_name = $this->stampa_temp_folder . uniqid() . '/';
		new Assets_Copier( $temp_folder_name );

		$filename = $temp_folder_name . 'package.json';

		$this->assertTrue( file_exists( $filename ) );
	}

	function test_should_copy_dot_babelrc() {
		$temp_folder_name = $this->stampa_temp_folder . uniqid() . '/';
		new Assets_Copier( $temp_folder_name );

		$filename = $temp_folder_name . '.babelrc';

		$this->assertTrue( file_exists( $filename ) );
	}

	function test_should_create_the_components_folder() {
		$temp_folder_name = $this->stampa_temp_folder . uniqid() . '/';
		new Assets_Copier( $temp_folder_name );

		$components_folder = $temp_folder_name . 'stampa-components';

		$this->assertTrue( is_dir( $components_folder ) );
	}

	function test_should_copy_the_custom_components() {
		$temp_folder_name = $this->stampa_temp_folder . uniqid() . '/';
		new Assets_Copier( $temp_folder_name );

		$components_to_copy = glob( STAMPA_ASSETS_TO_COPY_FOLDER . '/stampa-components/*.*' );
		$components_copied  = glob( Assets_Copier::get_folder( 'stampa-components' ) . '*.*' );

		$this->assertEquals( count( $components_to_copy ), count( $components_copied ) );
	}
}
