<?php
/**
 * The template for displaying search results pages.
 *
 * @package nine3
 */

get_header();

	if ( have_posts() ) : ?>

		<h1 class="page-title"><?php printf( esc_html__( 'Search Results for: %s', 'nine3' ), '<span>' . get_search_query() . '</span>' ); ?></h1>
		
		<?php while ( have_posts() ) : the_post();
			get_template_part( 'template-parts/content', 'search' );
		endwhile;
		
	else :
		get_template_part( 'template-parts/content', 'none' );
	endif;
		
get_footer(); ?>
