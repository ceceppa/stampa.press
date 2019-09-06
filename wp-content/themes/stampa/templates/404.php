<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package Verbosa
 */

get_header(); ?>

	<div id="container" class="<?php echo verbosa_get_layout_class(); ?>">
		<?php verbosa_header_section() ?>
		<main id="main" role="main" class="main">

			<header id="post-0" class="pad-container error404 not-found" <?php cryout_schema_microdata( 'element' ); ?>>
				<h1 class="entry-title" <?php cryout_schema_microdata( 'entry-title' ); ?>><?php _e( 'Not Found', 'verbosa' ); ?></h1>
					<p <?php cryout_schema_microdata( 'text' ); ?>><?php _e( 'Apologies, but the page you requested could not be found. Perhaps searching will help.', 'verbosa' ); ?></p>
					<?php get_search_form(); ?>
			</header>

		</main><!-- #main -->

	</div><!-- #container -->

<?php get_footer(); ?>
