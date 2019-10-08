<?php

declare(strict_types=1);

/**
 * Run npm build
 */
namespace Stampa;

use Exception;

class NPM_Build {
	public function __construct( string $block_name ) {
		$theme_stampa_path = Assets_Copier::get_folder( '__root' );

		chdir( $theme_stampa_path );

		$this->remove_npm_log();
		$this->npm_install();

		self::exec( 'npm run build' );
	}

	private function remove_npm_log() {
		if ( file_exists( 'npm.log' ) ) {
			unlink( 'npm.log' );
		}
	}

	private function npm_install() {
		$folder_node_modules_exists = file_exists( 'node_modules' );

		if ( $folder_node_modules_exists ) {
			return;
		}

		exec( 'npm install > npm.log 2>&1', $output, $return_value );

		if ( $return_value > 0 ) {
			throw new Exception( '"npm install" command failed' );
		}
	}

	public static function exec( string $command ) {
		$command .= ' 2>&1';
		exec( $command, $output, $return_value );

		if ( $return_value > 0 ) {
			self::log( $command );
			self::log( $return_value );
			self::log( $output );
			error_log( print_r( $output, true ) );

			throw new Exception( sprintf( 'Command failed:</p><p><strong>%s</strong>', $command ) );
		}
	}

	private static function log( $output ) {
		if ( is_array( $output ) ) {
			$output = join( PHP_EOL, $output );
		}
		file_put_contents( 'npm.log', print_r( $output, true ) . PHP_EOL, FILE_APPEND );
	}

	private function update_md5( string $block_name, string $assets_output_folder_name ) {
		$folder = Assets_Copier::get_folder( $assets_output_folder_name );

		$file = $this->find_file_in_folder( $folder, $block_name );
		$this->save_md5( $file );
	}

	private function find_file_in_folder( string $folder, string $block_name ) : string {
		$files = glob( $folder . $block_name . '.{pcss,php,js}', GLOB_BRACE );

		return array_shift( $files );
	}

	private function save_md5( $file ) {
		$path_parts = pathinfo( $file );
		$extension  = $path_parts['extension'];

		Block_Data::update_md5( $file, $extension );
	}
}
