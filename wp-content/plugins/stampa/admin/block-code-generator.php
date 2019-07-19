<?php
/**
 * Code that handles the generation of the react code
 *
 * @package stampa
 */
namespace Stampa;

require __DIR__ . '/assets-copier.php';
require __DIR__ . '/block-data.php';
require __DIR__ . '/js-code-generator.php';
require __DIR__ . '/stampa-replacer.php';

class Block_Code_Generator {
	public function __construct( int $post_id ) {
		$default_output_folder = trailingslashit( get_template_directory() ) . 'stampa';

		new Assets_Copier( $default_output_folder );
		new Block_Data( $post_id );
		new JS_Code_Generator();
		// new CSS_Generator();
		// new PHP_Code_Generator();
	}
}
