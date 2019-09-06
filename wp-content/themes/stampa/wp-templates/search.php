<?php
/**
 * Homepage template
 */

use function Semplice\FrontEnd\pagination;

get_header(); ?>
	<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/dist/styles/archive.css?ver=<?php SEMPLICE_THEME_VERSION; ?>">
	<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/dist/styles/404.css?ver=<?php SEMPLICE_THEME_VERSION; ?>">

	<main id="content" role="main" class="error404">
		<?php
		if ( have_posts() ) {
			while ( have_posts() ) :
				the_post();

				get_template_part( 'template-parts/archive' );
				endwhile;

		} else {
				get_template_part( 'template-parts/notfound' );
		}
		?>
		<?php pagination(); ?>
	</main>


<?php
get_footer();
