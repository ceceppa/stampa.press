<?php
namespace Semplice\Sidebars;

add_action( 'widgets_init', __NAMESPACE__ . '\register_sidebars' );

function register_sidebars() {
	register_sidebar(
		[
			'name' => __( 'Main Sidebar', 'theme-slug' ),
			'id' => 'sidebar-1',
			'description' => __( 'Widgets in this area will be shown on all posts and pages.', 'theme-slug' ),
			'before_widget' => '<li id="%1$s" class="widget %2$s">',
			'after_widget' => '</li>',
			'before_title' => '<h2 class="widgettitle">',
			'after_title' => '</h2>',
		]
	);
}
