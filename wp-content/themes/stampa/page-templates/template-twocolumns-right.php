<?php 
/**
 * Template Name: Two Columns, Sidebar on the Right
 *
 * @package Verbosa
 */
$verbosa_template_layout = 'two-columns-right';
get_header(); ?>

		<div id="container" class="<?php echo $verbosa_template_layout;?>">
		<?php verbosa_header_section() ?>
			<main id="main" role="main" <?php cryout_schema_microdata('main'); ?> class="main">
				<?php get_template_part( 'content/content', 'page'); ?>
			</main><!-- #main -->
		</div><!-- #container -->

<?php get_footer(); ?>