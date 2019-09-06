<?php
/**
 * The template for displaying all single posts.
 *
 * @package nine3
 */

get_header();

	while ( have_posts() ) : the_post();
		get_template_part( 'template-parts/content', 'single' );
	endwhile;

get_footer(); ?>
