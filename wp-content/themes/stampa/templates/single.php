<?php
/**
 * The Template for displaying all single posts.
 *
 * @package Verbosa
 */

get_header();?>

<div id="container" class="<?php echo verbosa_get_layout_class(); ?>">
	<?php verbosa_header_section() ?>
	<main id="main" role="main" class="main">
		<?php cryout_before_content_hook(); ?>

		<?php while ( have_posts() ) : the_post(); ?>

			<article id="post-<?php the_ID(); ?>" <?php post_class(); cryout_schema_microdata('article');?>>

		<?php cryout_singlefeatured_hook(); ?>
			<header class="entry-header">
				<?php cryout_post_title_hook(); ?>
				<?php the_title( '<h1 class="entry-title" ' . cryout_schema_microdata('entry-title', 0) . '>', '</h1>' ); ?>

				<div class="entry-meta">
					<?php cryout_post_meta_hook(); ?>
				</div><!-- .entry-meta -->
			</header>

			<?php cryout_singular_before_inner_hook();  ?>

			<div class="entry-content" <?php cryout_schema_microdata('entry-content'); ?>>
				<?php the_content(); ?>
				<?php wp_link_pages( array( 'before' => '<div class="page-link"><span>' . __( 'Pages:', 'verbosa' ), 'after' => '</span></div>' ) ); ?>
			</div><!-- .entry-content -->

			<?php if ( get_the_author_meta( 'description' ) ) {
					// If a user has filled out their description, show a bio on their entries
					get_template_part( 'content/author-bio' );
			} ?>

			<footer class="entry-meta">
				<?php cryout_post_footer_hook(); ?>
			</footer><!-- .entry-meta -->

			<nav id="nav-below" class="navigation" role="navigation">
				<div class="nav-previous"><em><?php _e('Previous Post', 'verbosa');?></em><?php previous_post_link( '%link', '<span>%title</span>' ); ?></div>
				<div class="nav-next"><em><?php _e('Next Post', 'verbosa');?></em><?php next_post_link( '%link', '<span>%title</span>' ); ?></div>
			</nav><!-- #nav-below -->

		<?php comments_template( '', true ); ?>
		<?php cryout_singular_after_inner_hook();  ?>
		</article><!-- #post-## -->

<?php endwhile; // end of the loop. ?>

	<?php cryout_after_content_hook(); ?>
	</main><!-- #main -->
</div><!-- #container -->

<?php get_footer();
