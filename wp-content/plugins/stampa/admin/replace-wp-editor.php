<?php

declare(strict_types=1);

namespace Stampa\Replace_WP_Editor;

add_filter( 'replace_editor', __NAMESPACE__ . '\replace_wp_editor', 10, 2 );

	/**
	 * NOTE: Don't know why this event is more than once when editing... 3 times...
	 *
	 * @param bool   $replace    Whether to replace the editor. Default false.
	 * @param object $post Post object.
	 *
	 * @return bool
	 */
function replace_wp_editor( $replace, $post ) : bool {
	if ( $post->post_type === 'stampa-block' ) {
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );

		wp_enqueue_script( 'heartbeat' );

		require_once ABSPATH . 'wp-admin/admin-header.php';

		_render_stampa_div();

		return true;
	}

	return $replace;
}

	/**
	 * Render the stampa div for the React app.
	 *
	 * Because the replace_editor event, when opening the edit link, is fired multiple times
	 * we can't use an ID.
	 *
	 * @param [type] $post
	 * @return void
	 */
function _render_stampa_div() {
	echo '<link rel="stylesheet" href="/wp-includes/css/dist/block-library/editor.css" />';
	echo '<div class="stampa-app"></div>';
}
