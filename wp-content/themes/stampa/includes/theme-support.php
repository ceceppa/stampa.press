<?php
namespace Semplice\Setup;

add_action( 'after_setup_theme', __NAMESPACE__ . '\setup_theme_support' );

// Let's remove customizer support as is not needed.
add_action( 'admin_bar_menu', __NAMESPACE__ . '\remove_customize_support_script', 99 );

function setup_theme_support() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );

	add_theme_support(
		'custom-logo',
		array(
			'height'      => 240,
			'width'       => 240,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);

	add_theme_support( 'post-thumbnails' );

	set_post_thumbnail_size( 1440, 1440 );
}

function remove_customize_support_script() {
	remove_action( 'wp_before_admin_bar_render', 'wp_customize_support_script' );
}
