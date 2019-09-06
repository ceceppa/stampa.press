<?php

declare(strict_types=1);

/**
 * Plugin Name: Stampa
 *
 * @package stampa
 */

namespace Stampa;

add_action( 'init', __NAMESPACE__ . '\register_stampa_blocks_cpt' );

function register_stampa_blocks_cpt() : void {
	$args = [
		'public'            => false,
		'label'             => 'Stampa',
		'show_in_nav_menus' => true,
		'show_ui'           => true,
		'menu_position'     => 90,
		'supports'          => [ 'title' ],
		'labels'            => [
			'add_new'      => __( 'Add New Block', 'stampa' ),
			'add_new_item' => __( 'Add New Block', 'stampa' ),
			'edit_item'    => __( 'Edit Block', 'stampa' ),
		],
	];

	register_post_type( 'stampa-block', $args );
}
