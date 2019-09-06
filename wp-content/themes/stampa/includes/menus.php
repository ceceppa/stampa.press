<?php
namespace Semplice;

add_action( 'after_setup_theme', __NAMESPACE__ . '\register_menus' );

function register_menus() {
	register_nav_menus(
		array(
			'primary' => __( 'Primary Navigation', 'semplice' ),
			'footer' => __( 'Footer Menu', 'semplice' ),
		)
	);
}
