<?php
/**
 * The template for displaying posts in the Status Post Format on index and archive pages
 *
 * Learn more: http://codex.wordpress.org/Post_Formats
 *
 * @package Verbosa
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); cryout_schema_microdata('blogpost');?>>
<?php cryout_featured_hook(); ?>

	<header class="entry-header">
	<?php cryout_post_title_hook(); ?>
	<?php cryout_meta_format_hook(); ?>
		<?php the_title( sprintf( '<h2 class="entry-title"' . cryout_schema_microdata( 'entry-title', 0 )  . '>
										<a href="%s" ' . cryout_schema_microdata( 'mainEntityOfPage', 0 ) . ' rel="bookmark">',
										esc_url( get_permalink() ) ),
										'</a></h2>' ); ?>

		<div class="entry-meta">
			<?php cryout_post_meta_hook(); ?>
		</div><!-- .entry-meta -->

	</header><!-- .entry-header -->

	<?php cryout_before_inner_hook(); ?>
	<div class="entry-content"  <?php cryout_schema_microdata('entry-content'); ?>>

		<div class="avatar">
			<?php echo get_avatar( get_the_author_meta( 'ID' ), apply_filters( 'verbosa_status_avatar', '65' ) ); ?>
		</div>
		<div class="status_content">
			<?php the_content(); ?>
		</div>

	</div><!-- .entry-content -->

	<footer class="post-continue-container">
		<?php cryout_after_inner_hook(); ?>
	</footer>

</article><!-- #post-<?php the_ID(); ?> -->
