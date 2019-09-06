<?php 
/**
 * Template Name: Two columns, Sidebar on the Left
 *
 * @package Verbosa
 */
$verbosa_template_layout = 'two-columns-left';
get_header(); ?>

		<div id="container" class="<?php echo $verbosa_template_layout;?>">
		<?php verbosa_header_section() ?>
			<main id="main" role="main" <?php cryout_schema_microdata('main'); ?> class="main">
				<?php get_template_part( 'content/content', 'page'); ?>
			</main><!-- #main -->
		</div><!-- #container -->

<?php get_footer(); ?>