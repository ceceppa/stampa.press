<?php
/**
 * Template file for the custom pagination.
 *
 * @used:
 *  - by \Stella\FrontEnd\Utils::pagination
 *
 * @package Stella
 */

?>
<nav class="pagination">
	<?php if ( $current_page > 1 && $show_ends ) : ?>
		<a href="<?php echo esc_url( $first_page ); ?>" class="first page-numbers" title="Go to first page">&laquo;</a>
	<?php endif; ?>

	<?php echo paginate_links( $args ); // PHPCS: XSS Ok. ?>

	<?php if ( $current_page < $total_pages && $show_ends ) : ?>
		<a href="<?php echo esc_url( $last_page ); ?>" class="last page-numbers" title="Go to last page">&raquo;</a>
	<?php endif; ?>
</nav>
