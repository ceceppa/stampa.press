<?php
/**
 *
 * The template for displaying pages
 *
 * @package Verbosa
 */
?>
<?php while ( have_posts() ) : the_post(); ?>

	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		<?php cryout_singlefeatured_hook(); ?>
		<header class="entry-header">
			<?php if ( is_front_page() ) { ?>
				<h2 class="entry-title" <?php cryout_schema_microdata('entry-title'); ?>><?php the_title(); ?></h2>
			<?php } else { ?>
				<h1 class="entry-title" <?php cryout_schema_microdata('entry-title'); ?>><?php the_title(); ?></h1>
			<?php } ?>
			<span class="entry-meta" >
				<?php edit_post_link( __( 'Edit', 'verbosa' ), '<span class="edit-link"><i class="icon-pencil2"></i> ', '</span>' ); ?>
			</span>
		</header>

		<?php cryout_singular_before_inner_hook();  ?>

		<div class="entry-content" <?php cryout_schema_microdata( 'text' ); ?>>
			<?php the_content(); ?>
			<div style="clear:both;"></div>

			<?php wp_link_pages( array( 'before' => '<div class="page-link">' . __( 'Pages:', 'verbosa' ), 'after' => '</div>' ) ); ?>
		</div><!-- .entry-content -->

		<?php  comments_template( '', true ); ?>
		<?php cryout_singular_after_inner_hook();  ?>
	</article><!-- #post-## -->

<?php endwhile; ?>
