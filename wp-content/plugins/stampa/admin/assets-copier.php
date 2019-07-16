<?php
/**
 * Stampa has been created to generate "stand" alone code
 * that runs without this plugins.
 * So, in order to give all this freedom we need to copy
 * some of the assets file stored in assets/stampa in the
 * theme folder.
 *
 * We're going to create the following folder structure inside
 * the theme one:
 *
 * "themefolder"
 * ├── stampa (a unique name to avoid conflicts ;))
 * │   ├── blocks (contains the JSX code generated)
 * │   ├── components (Stampa components like: StampaMediaUpload, StampaPostSelector, etc)
 * │   ├── modules (The boilerplate PHP code generated for each stampa block)
 * │   ├── postcss (contains the PostCSS style generated)
 * │   ├── index.js (imports all the JSX blocks generated)
 * │   ├── index.pcss (imports all the styles generated)
 * │   ├── package.json
 * │   └── stampa-loader.php (enqueues the style and scripts generated, renders the blocks generate via PHP)
 *
 * @package stampa
 */

namespace Stampa;

class Assets_Copier {
	private static $output_folders = [];
	private static $sub_folders    = [ 'blocks', 'components', 'modules', 'postcss' ];

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
				mkdir( $folder );
			}
		}
	}

	private function copy_assets() : void {
		$this->copy_files( '__root' );
		$this->copy_files( 'components' );
	}

	private function copy_files( string $sub_folder_name ) : void {
		$source_folder = STAMPA_ASSETS_FOLDER . $sub_folder_name;
		$source_files  = glob( $source_folder . '/{,.}[!.,!..]*', GLOB_MARK | GLOB_BRACE );

		foreach ( $source_files as $source_file ) {
			$filename    = basename( $source_file );
			$destination = self::get_folder( $sub_folder_name ) . $filename;

			copy( $source_file, $destination );
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
