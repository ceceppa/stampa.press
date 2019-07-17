<?php
/**
 * Filters
 *
 * @package Stampa
 */

namespace Stampa\Filters;

add_filter( 'stampa/add-field/post-selector', __NAMESPACE__ . '\available_post_types' );
add_filter( 'stampa_field_option/image/size', __NAMESPACE__ . '\available_image_sizes' );

function available_post_types( array $field_data ) : array {
	foreach ( $field_data['options'] as & $option ) {
		if ( $option['name'] == 'post_types' ) {
			$option['values'] = get_available_post_types();
		} elseif ( $option['name'] == 'taxonomies' ) {
			$option['values'] = get_available_taxonomies();
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

function available_image_sizes( array $option ) : array {
	$values = get_intermediate_image_sizes();

	array_unshift( $values, 'full' );
	$option['values'] = array_values( $values );

	return $option;
}
