<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package Verbosa
 */
get_header(); ?>

	<div id="container" class="wrapper">
		<main id="main" role="main" class="main">

			<?php get_template_part( 'content/content', 'page' ); ?>

		</main>

	</div>

<?php
get_footer();
