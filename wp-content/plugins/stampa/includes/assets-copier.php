<?php

declare(strict_types=1);

/**
 * Stampa has been created to generate "stand" alone code
 * that runs without this plugins.
 * So, in order to give all this freedom we need to copy
 * some of the assets file stored in assets-to-copy in the
 * theme folder.
 *
 * We're going to create the following folder structure inside
 * the theme one:
 *
 * "themefolder"
 * ├── stampa (a unique name to avoid conflicts ;))
 * │   ├── blocks (contains the JSX code generated)
 * │   ├── css (stampa-editor csss)
 * │   ├── components (Stampa components like: StampaMediaUpload, StampaPostSelector, etc)
 * │   ├── modules (The boilerplate PHP code generated for each stampa block)
 * │   ├── postcss (contains the PostCSS style generated)
 * │   ├── index.js (imports all the JSX blocks generated)
 * │   ├── index.pcss (imports all the styles generated)
 * │   ├── package.json
 * │   └── stampa-loader.php (enqueues the style and scripts generated, renders the blocks generate via PHP)
 */

namespace Stampa;

use Exception;

class Assets_Copier {
	private static $output_folders = [];
	private static $sub_folders    = [ 'blocks', 'css', 'stampa-components', 'modules', 'postcss' ];

	public function __construct( string $output_folder ) {
		$this->setup_folders( $output_folder );

		$this->create_folders();
		$this->copy_assets();
	}

	private function setup_folders( string $output_folder ) : void {
		$output_folder                  = trailingslashit( $output_folder );
		self::$output_folders['__root'] = $output_folder;

		foreach ( self::$sub_folders as $sub_folder ) {
			self::$output_folders[ $sub_folder ] = trailingslashit( $output_folder . $sub_folder );
		}
	}

	private function create_folders() : void {
		$folders = self::$output_folders;

		foreach ( $folders as $folder ) {
			$folder_exists = is_dir( $folder );

			if ( ! $folder_exists ) {
				$success = mkdir( $folder, 0777, true );

				if ( ! $success ) {
					throw new Exception( 'Cannot create the folder: <i>' . $folder . '</i>' );
				}
			}
		}
	}

	private function copy_assets() : void {
		$this->copy_files( '__root' );
		$this->copy_files( 'css' );
		$this->copy_files( 'stampa-components' );
	}

	private function copy_files( string $sub_folder_name ) : void {
		$source_folder = STAMPA_ASSETS_TO_COPY_FOLDER . $sub_folder_name;
		$source_files  = glob( $source_folder . '/{,.}[!.,!..]*', GLOB_MARK | GLOB_BRACE );

		$destination_folder = self::get_folder( $sub_folder_name );
		foreach ( $source_files as $source_file ) {
			$filename    = basename( $source_file );
			$destination = $destination_folder . $filename;

			if ( ! file_exists( $destination ) ) {
				copy( $source_file, $destination );

				chmod( $destination, 0777 );
			}
		}
	}

	public static function get_folder( string $sub_folder_name ) : string {
		$folder_name = self::$output_folders[ $sub_folder_name ] ?? null;

		if ( empty( $folder_name ) ) {
			throw new \Exception( 'Invalid subfolder name' );
		}

		return $folder_name;
	}
}
