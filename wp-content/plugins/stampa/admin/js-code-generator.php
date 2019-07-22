<?php
namespace Stampa;

require __DIR__ . '/js-code-inspector-controls.php';
require __DIR__ . '/js-fields-code-generator.php';

use Stampa\Fields_Loader;
use Stampa\Block_Data;
use Stampa\Stampa_Replacer;
use Stampa\Assets_Copier;

class JS_Code_Generator {
	public function __construct() {
		$this->setup_wp_components_and_editor_variables();
		$this->setup_block_grid_style();

		new JS_Inspector_Control();
		new JS_Fields_Code_Generator();

		$can_generate_file = ! defined( 'STAMPA_PHPUNIT' ) || defined( 'STAMPA_GENERATE_JS_FILE' );

		if ( $can_generate_file ) {
			$temp_file   = $this->generate_js_temp_file();
			$output_file = $this->save_file( $temp_file );
			$this->append_to_index_js( $output_file );
		}

		$can_run_parcel = ! defined( 'STAMPA_PHPUNIT' ) || defined( 'STAMPA_RUN_PARCEL' );

		if ( $can_run_parcel ) {
			new Parcel_Builder( 'js' );
		}
	}

	private function setup_wp_components_and_editor_variables() {
		$block_fields = Block_Data::get_fields();

		Stampa_Replacer::add_array_mapping( 'wp.components', [] );
		Stampa_Replacer::add_array_mapping( 'wp.editor', [ 'InspectorControls', 'MediaUpload' ] );

		foreach ( $block_fields as $field ) {
			$field = Fields_Loader::get_field_by_id( $field->id );

			$gutenberg = $field['gutenberg'] ?? [];
			$this->setup_wp_components( $gutenberg );
			$this->setup_wp_editor( $gutenberg );
		}
	}

	private function setup_wp_components( $gutenberg ) : void {
		$wp_component = $gutenberg['wp_components'] ?? null;

		if ( is_null( $wp_component ) ) {
			return;
		}
		Stampa_Replacer::add_array_mapping( 'wp.components', [ $wp_component ] );
	}

	private function setup_wp_editor( $gutenberg ) : void {
		$wp_editor = $gutenberg['wp_editor'] ?? null;

		if ( is_null( $wp_editor ) ) {
			return;
		}

		Stampa_Replacer::add_array_mapping( 'wp.editor', [ $gutenberg['wp_editor'] ] );
	}

	private function setup_block_grid_style() {
		$row_height = Block_Data::get_grid_value( 'rowHeight' );
		$columns    = Block_Data::get_grid_value( 'columns' );
		$rows       = Block_Data::get_grid_value( 'rows' );
		$gap        = Block_Data::get_grid_value( 'gap' );
		$height     = intval( $row_height ) * intval( $rows );

		// Can't use "repeat" property -.-, why????
		$template_columns = str_repeat( '1fr ', $columns );
		$template_rows    = str_repeat( '1fr ', $rows );
		$grid_style       = [
			'display'             => 'grid',
			'gridTemplateColumns' => $template_columns,
			'gridTemplateRows'    => $template_rows,
			'gridGap'             => "{$gap}px",
			'height'              => "{$height}px",
		];

		Stampa_Replacer::add_json_mapping( 'block.style', $grid_style );
	}

	private function generate_js_temp_file() {
		$temp_file = tempnam( sys_get_temp_dir(), 'stampa' ) . '.js';

		$boilerplate_file = STAMPA_REACT_BOILERPLATES_FOLDER . 'block.boilerplate.js';
		$boilerplate_file = apply_filters( 'stampa/fields-code/boilerplate-file', $boilerplate_file );

		$boilerplate  = file_get_contents( $boilerplate_file );
		$file_content = Stampa_Replacer::apply_mapping( $boilerplate );

		file_put_contents( $temp_file, $file_content );

		return $temp_file;
	}

	private function save_file( string $temp_file ) : string {
		$file_copier = new File_Saver( 'blocks', 'js' );

		$output_file = $file_copier->get_output_file();

		$command = sprintf(
			'prettier %s > %s',
			$temp_file,
			$output_file
		);

		$file_copier->exec_command_and_update_md5( $command, $output_file );

		return $output_file;
	}

	private function append_to_index_js( string $output_file ) {
		$file_name  = preg_replace( '/.js$/', '', basename( $output_file ) );
		$index_file = Assets_Copier::get_folder( '__root' ) . 'index.js';

		$index_content = '';
		if ( file_exists( $index_file ) ) {
			$index_content = file_get_contents( $index_file );
		}

		if ( stripos( $index_content, $file_name ) == 0 ) {
			$index_content .= "import './blocks/{$file_name}';" . PHP_EOL;

			$success = file_put_contents( $index_file, $index_content );

			if ( ! $success ) {
				throw new \Error( 'Cannot write the index.js file in stampa/blocks folder' );
			}
		}
	}

}
