<?php
/**
 * In order to prevent polluting the root theme folder will all the
 * template files required by WordPress (404, archive, etc), we're
 * saving them into the wp-templates folder.
 * So, we need to inform WP about our decision :)
 */

namespace Semplice;

/**
 * Unfortunately there is no unique filter to do that, but we have to loop
 * through all the possible values -.-".
 */
$possible_types = [
	'404',
	'archive',
	'author',
	'category',
	'tag',
	'taxonomy',
	'date',
	'embed',
	'home',
	'frontpage',
	'privacypolicy',
	'page',
	'paged',
	'search',
	'single',
	'singular',
	'attachment',
];

foreach ( $possible_types as $type ) {
	add_filter( "{$type}_template_hierarchy", __NAMESPACE__ . '\prepend_custom_folder', 10, 1 );
}

function prepend_custom_folder( $templates ) {
	foreach ( $templates as & $template ) {
		$template = 'wp-templates/' . $template;
	}

	return $templates;
}
