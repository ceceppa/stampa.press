<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package nine3
 */

get_header(); ?>

<section class="error-404 not-found">
	<h1><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'nine3' ); ?></h1>
	<p><?php esc_html_e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'nine3' ); ?></p>
</section>

<?php get_footer(); ?>
