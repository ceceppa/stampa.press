<?php
/**
 * This file contains all the shortcodes needed on the website.
 *
 * @package shortcodes
 */

namespace Nine3\Stella\Shortcodes;

/**
 * Show a Google's map and a marker.
 *
 * @param  array $attrs shortcode parameters.
 * @return string
 */
function gmap( $attrs ) {
	$zoom   = isset( $attrs['zoom'] ) ? intval( $attrs['zoom'] ) : 15;
	$lat    = isset( $attrs['lat'] ) ? $attrs['lat'] : '';
	$lng    = isset( $attrs['lng'] ) ? $attrs['lng'] : '';
	$address    = isset( $attrs['address'] ) ? $attrs['address'] : '';

	if ( $lat ) {
		$attributes = 'data-lat="' . esc_attr( $lat ) . '" data-lng="' . esc_attr( $lng ) . '"';
	} else {
		$attributes = 'data-address="' . esc_attr( $address ) . '"';
	}

	wp_enqueue_script( 'gmap' );
	return '<div class="gmap" data-zoom="' . esc_attr( $zoom ) . '"' . $attributes . '></div>';
}

add_shortcode( 'gmap', '\Stella\Shortcodes\gmap' );
