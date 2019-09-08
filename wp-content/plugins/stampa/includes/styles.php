<?php

declare(strict_types=1);

namespace Stampa;

add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\enqueue_styles' );

function enqueue_styles() {
	wp_enqueue_style(
		'stampa-app-style',
		plugins_url( 'dist/style.css', STAMPA_PLUGIN_PATH ),
		[ 'wp-block-library' ],
		STAMPA_VERSION
	);

	wp_enqueue_style(
		'stampa-gutenberg-styles',
		plugins_url( 'assets/stampa/css/stampa-editor.css', STAMPA_PLUGIN_PATH ),
		[],
		STAMPA_VERSION
	);
}
