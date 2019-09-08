<?php

declare(strict_types=1);

/**
 * Code that handles the generation of the react code
 *
 * @package stampa
 */
namespace Stampa;

require __DIR__ . '/assets-copier.php';
require __DIR__ . '/block-data.php';
require __DIR__ . '/fields-looper.php';
require __DIR__ . '/file-saver.php';
require __DIR__ . '/js-code-generator.php';
require __DIR__ . '/npm-build.php';
require __DIR__ . '/stampa-replacer.php';
require __DIR__ . '/css-code-generator.php';
require __DIR__ . '/php-code-generator.php';

class Block_Code_Generator {
	public function __construct( int $post_id ) {
		$default_output_folder = trailingslashit( get_template_directory() ) . 'stampa';

		new Assets_Copier( $default_output_folder );
		new Block_Data( $post_id );
		new JS_Code_Generator();
		new CSS_Code_Generator();
		new PHP_Code_Generator();

		$can_run_parcel = ! defined( 'STAMPA_PHPUNIT' ) || defined( 'STAMPA_RUN_PARCEL' );

		if ( $can_run_parcel ) {
			new NPM_Build( Block_Data::get_sanitized_block_title() );
		}
	}
}
