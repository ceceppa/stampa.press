<?php

declare(strict_types=1);

namespace Stampa;

use Exception;
use Stampa\Assets_Copier;
use Stampa\Block_Data;

class File_Saver {
	private $file_extension = null;
	private $output_path    = null;

	public function __construct( string $asset_folder_name, string $file_extension ) {
		$this->output_path    = Assets_Copier::get_folder( $asset_folder_name );
		$this->file_extension = $file_extension;
	}

	public function get_output_file() : string {
		$file_name   = sprintf( '%s.%s', Block_Data::get_sanitized_block_title(), $this->file_extension );
		$output_file = $this->output_path . $file_name;

		$this->check_if_md5_matchs_record( $output_file );

		return $output_file;
	}

	private function check_if_md5_matchs_record( string $output_file ) {
		$output_file_exists = file_exists( $output_file );

		if ( ! $output_file_exists ) {
			return;
		}

		$matches = $this->md5_matches( $output_file );

		if ( ! $matches ) {
			$this->rename_original_file( $output_file );
		}
	}

	private function md5_matches( string $output_file ) {
		$old_md5 = Block_Data::get_md5( $this->file_extension );
		$md5     = md5_file( $output_file );

		return empty( $old_md5 ) || $md5 === $old_md5;
	}

	private function rename_original_file( string $output_file ) {
		$new_name = $output_file . '.' . date( 'Ymd-His' );

		rename( $output_file, $new_name );
	}

	public function save_file( string $output_file, string $content ) {
		$saved = file_put_contents( $output_file, $content );

		if ( ! $saved ) {
			throw new Exception( 'Cannot save ' . $output_file );
		}

		chmod( $output_file, 0777 );
	}
}
