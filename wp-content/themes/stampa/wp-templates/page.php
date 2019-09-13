<?php
/**
 * Homepage template
 */

get_header(); ?>
	<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/dist/styles/post.css?ver=<?php SEMPLICE_THEME_VERSION; ?>">

	<main id="content" role="main">
		<?php
		if ( have_posts() ) {
			while ( have_posts() ) :
				the_post();

				get_template_part( 'template-parts/page' );
				endwhile;

		} else {
				get_template_part( 'template-parts/notfound' );
		}
		?>
	</main>


<?php
get_footer();
