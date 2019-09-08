<?php
/**
 * Homepage template
 */

get_header(); ?>

	<main id="main" role="main" class="main">
<a href="http://">Ciao</a>
		<?php
		if ( have_posts() ) {
			while ( have_posts() ) :
				the_post();

				get_template_part( 'content/content', get_post_format() );
				endwhile;

		} else {
				get_template_part( 'content/content', 'notfound' );
		}
		?>
	</main>


<?php
get_footer();
