<?php
/**
 * Filters
 *
 * @package Stampa
 */

namespace Stampa\Filters;

add_filter( 'stampa_add_field/post-selector', __NAMESPACE__ . '\update_values_with_available_post_types' );

function update_values_with_available_post_types( array $field_data ) : array {
	foreach ( $field_data['options'] as & $option ) {
		if ( $option->name == 'post_types' ) {
			$option->values = get_available_post_types();
		} elseif ( $option->name == 'taxonomies' ) {
			$option->values = get_available_taxonomies();
		}
	}

	return $field_data;
}

function get_available_post_types() : array {
	$post_types = get_post_types( [ '_bultin' => false ] );

	$post_types['post'] = 'Post';
	$post_types['page'] = 'Page';

	return $post_types;
}

function get_available_taxonomies() : array {
	return get_taxonomies( [ 'public' => true ] );
}
