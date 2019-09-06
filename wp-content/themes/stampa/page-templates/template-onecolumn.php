<?php
/**
 * Template Name: One column, no sidebar
 *
 * A custom page template without sidebar.
 *
 * The "Template Name:" bit above allows this to be selectable
 * from a dropdown menu on the edit page screen.
 *
 * @package Verbosa
 */

get_header(); ?>
		<div id="container" class="one-column">
		<?php verbosa_header_section() ?>
			<main id="main" role="main" <?php cryout_schema_microdata('main'); ?> class="main">
				<?php get_template_part( 'content/content', 'page'); ?>
			</main><!-- #main -->	
		</div><!-- #container -->

<?php get_footer(); ?>
