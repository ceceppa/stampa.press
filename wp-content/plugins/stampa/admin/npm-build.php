<?php
/**
 * Run npm build
 */
namespace Stampa;

class NPM_Build {
	public function __construct() {
		$stampa_path = Assets_Copier::get_folder( '__root' );

		chdir( $stampa_path );

		$this->remove_npm_log();
		$this->npm_install();

		$this->npm_run( 'prettify' );
		$this->npm_run( 'build' );

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

		exec( 'npm install >> npm.log' );
	}

	private function npm_run( string $script ) {
		$npm_path = $this->get_npm_path();

		$verbose = defined( 'WP_DEBUG' ) && WP_DEBUG ? '--verbose' : '--verbose';

		$command = sprintf( '%s run %s %s', $npm_path, $verbose, $script );
		$output  = shell_exec( $command );

		$this->log( $command );
		$this->log( $output );
	}

	private function get_npm_path() {
		$npm_path = apply_filters( 'stampa/npm-build/path', 'npm' );

		return $npm_path;
	}

	private function log( $output ) {
		file_put_contents( 'npm.log', print_r( $output, true ) . PHP_EOL, FILE_APPEND );
	}
}
