<?php
namespace Semplice\Styles;

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_styles' );

function enqueue_styles() {
	wp_enqueue_style( 'semplice-style', get_template_directory_uri() . '/dist/styles/style.css', [], SEMPLICE_THEME_VERSION );
}
