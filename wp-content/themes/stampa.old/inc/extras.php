<?php
/**
 * Custom functions that act independently of the theme templates
 *
 * Eventually, some of the functionality here could be replaced by core features
 *
 * @package nine3
 */

namespace Stampa\Theme\Extras;

function inline_svg( int $attachment_id ) {
	$file = get_attached_file( $attachment_id );

	if ( $file ) {
		include $file;
	}
}
