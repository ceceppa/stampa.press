<?php
/**
 * Run parcel build
 */
namespace Stampa;

class Parcel_Builder {
	public function __construct( string $ext ) {
		$stampa_path = Assets_Copier::get_folder( '__root' );

		exec( "cd $stampa_path && if [ ! -d '{$stampa_path}/node_modules' ]; then yarn install > /dev/null 2>&1; fi" );
		$command = "cd $stampa_path && parcel build {$stampa_path}index.{$ext} - d {$stampa_path}dist > /dev/null";
		$output  = system( $command, $return_val );

		if ( $return_val > 0 ) {
			throw new \Error( sprintf( "parcel build failed : %s (%d)\n -> %s", $stampa_path, $return_val, $output ) );
		}
	}
}
