<?php
/**
 * The template for displaying Search results pages.
 *
 * @package Verbosa
 */

get_header(); ?>

	<div id="container" class="<?php echo verbosa_get_layout_class(); ?>">
		<?php verbosa_header_section() ?>
		<main id="main" role="main" class="main">
			<?php cryout_before_content_hook(); ?>

			<?php if ( have_posts() ) : ?>

				<header class="content-search pad-container" <?php cryout_schema_microdata( 'element' ); ?>>
					<?php get_search_form(); ?>
					<h1 class="page-title" <?php cryout_schema_microdata( 'entry-title' ); ?>>
						<?php printf( __( 'Search Results for: %s', 'verbosa' ), '<strong>' . get_search_query() . '</strong>' ); ?>
					</h1>
				</header>
				<?php cryout_breadcrumbs_hook(); ?>
				
				<div id="content-masonry"  <?php cryout_schema_microdata( 'blog' ); ?>>
					<?php /* Start the Loop */

					while ( have_posts() ) : the_post();

						get_template_part( 'content/content', get_post_format() );
					endwhile;
					?>
				</div><!--content-masonry-->
				<?php

				verbosa_pagination();

			else :

				get_template_part( 'content/content', 'notfound' );
				?><div id="content-masonry"></div><?php

			endif; ?>

			<?php cryout_after_content_hook(); ?>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
