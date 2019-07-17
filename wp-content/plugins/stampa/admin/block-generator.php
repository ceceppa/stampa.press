<?php
/**
 * Code that handles the generation of the react code
 *
 * @package stampa
 */
namespace Stampa;

use Stampa\Stampa;
use Stampa_Replacer;

require __DIR__ . '/assets-copier.php';
require __DIR__ . '/block-data.php';
require __DIR__ . '/js-code-generator.php';
require __DIR__ . '/stampa-replacer.php';

class Block_Generator {
	public function __construct( int $post_id ) {
		new Assets_Copier( get_template_directory() );
		new Block_Data( $post_id );
	}
}
