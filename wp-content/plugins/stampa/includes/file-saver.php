<?php

declare(strict_types=1);

namespace Stampa;

use Exception;
use Stampa\Assets_Copier;
use Stampa\Block_Data;

class File_Saver {
	private $file_extension = null;
	private $output_path    = null;
	private $new_content    = null;
	private $md5_matches    = true;
	private $temp_file      = null;

	public function __construct( string $asset_folder_name, string $file_extension, string $new_content ) {
		$this->output_path    = Assets_Copier::get_folder( $asset_folder_name );
		$this->file_extension = $file_extension;
		$this->new_content    = $new_content;

		$this->temp_file = $this->get_output_file();
	}

	public function get_output_file() : string {
		$file_name   = sprintf( '%s.%s', Block_Data::get_sanitized_block_title(), $this->file_extension );
		$output_file = $this->output_path . $file_name;

		return $output_file;
	}

	public function prettify( string $parameters = '' ) {
		$temp_file = tempnam( sys_get_temp_dir(), 'stampa-prettify' ) . '.' . $this->file_extension;
		$saved     = file_put_contents( $temp_file, $this->new_content );

		if ( ! $saved ) {
			throw new Exception( 'Cannot save ' . $temp_file );
		}

		NPM_Build::exec( 'prettify --write ' . $parameters . ' ' . $temp_file );

		$this->compare_md5( $temp_file );
		$this->temp_file = $temp_file;
	}

	public function save_file( string $new_content ) {
		$output_file = $this->get_output_file();

		if ( ! $this->md5_matches ) {
			$this->rename_original_file( $output_file );
		}

		$saved = rename( $temp_file, $output_file );
		if ( ! $saved ) {
			throw new Exception( 'Cannot save ' . $output_file );
		}

		chmod( $output_file, 0777 );
	}

	private function compare_md5( string $new_file ) {
		$output_file        = $this->get_output_file();
		$output_file_exists = file_exists( $output_file );

		if ( ! $output_file_exists ) {
			return;
		}

		$old_md5 = Block_Data::get_md5( $this->file_extension );
		$md5     = md5_file( $new_file );

		$this->md5_matches = empty( $old_md5 ) || $md5 === $old_md5;
	}

	private function rename_original_file( string $output_file ) {
		$new_name = $output_file . '.' . date( 'Ymd-His' );

		rename( $output_file, $new_name );
	}
}
