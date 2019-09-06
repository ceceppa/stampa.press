<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package Verbosa
 */

get_header(); ?>
	<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/dist/styles/404.css?ver=<?php SEMPLICE_THEME_VERSION; ?>">

	<main id="content" role="main" class="error404">

		<header class="error404__content">
			<h1 class="error404__title">
				<?php _e( 'Not Found', 'verbosa' ); ?>
			</h1>
			<p>
				<?php _e( 'Apologies, but the page you requested could not be found. Perhaps searching will help.', 'verbosa' ); ?>
			</p>
			<?php get_search_form(); ?>
		</header>

	</main><!-- #main -->

<?php get_footer(); ?>
