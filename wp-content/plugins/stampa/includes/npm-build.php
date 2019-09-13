<?php

declare(strict_types=1);

/**
 * Run npm build
 */
namespace Stampa;

use Exception;

class NPM_Build {
	public function __construct( string $block_name ) {
		$stampa_path = Assets_Copier::get_folder( '__root' );

		chdir( $stampa_path );

		$this->remove_npm_log();
		$this->npm_install();

		// exec: npm run prettify / build doesn't work from PHP return error 1?
		$this->exec( 'prettier --write blocks/' . $block_name . '.js' );
		$this->exec( 'prettier --write --html-whitespace-sensitivity ignore --parser html modules/' . $block_name . '.php' );
		$this->exec( 'parcel build index.js -d dist && parcel build index.pcss -d dist' );
		$this->exec( 'npm run build' );

		$this->update_md5( $block_name );

		chmod( 'npm.log', 0777 );
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

	private function exec( string $command ) {
		exec( $command, $output, $return_value );

		$this->log( $command );
		$this->log( $return_value );
		$this->log( $output );
	}

	private function log( $output ) {
		file_put_contents( 'npm.log', print_r( $output, true ) . PHP_EOL, FILE_APPEND );
	}

	private function update_md5( string $block_name ) {
		$folders = [ Assets_Copier::get_folder( 'blocks' ), Assets_Copier::get_folder( 'postcss' ), Assets_Copier::get_folder( 'modules' ) ];

		foreach ( $folders as $folder ) {
			$file = $this->find_file_in_folder( $folder, $block_name );
			$this->save_md5( $file );
		}
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
