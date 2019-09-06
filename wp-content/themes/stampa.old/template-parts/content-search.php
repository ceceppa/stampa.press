<?php
/**
 * The template part for displaying results in search pages.
 *
 * @used:
 *  - search.php
 *
 * @package Stella
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
  <header class="entry-header">
	<?php the_title( sprintf( '<h2 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h2>' ); ?>

	<?php if ( 'post' == get_post_type() ) : ?>
	<div class="entry-meta">
		<?php nine3_posted_on(); ?>
	</div><!-- .entry-meta -->
	<?php endif; ?>
  </header><!-- .entry-header -->

  <div class="entry-summary">
	<?php the_excerpt(); ?>
  </div><!-- .entry-summary -->

  <footer class="entry-footer">
	<?php nine3_entry_footer(); ?>
  </footer><!-- .entry-footer -->
</article><!-- #post-## -->

