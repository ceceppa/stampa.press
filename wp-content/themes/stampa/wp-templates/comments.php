<?php

use Semplice\Comments\Comment_Walker;

if ( post_password_required() ) {
	return;
}
?>

<section id="comments" class="post-comments">
	<?php if ( have_comments() ) : ?>

		<h3 id="comments-title">
			<span>
			<?php
			printf(
				_n( 'One Comment', '%1$s Comments', get_comments_number(), 'semplice' ),
				number_format_i18n( get_comments_number() )
			);
			?>
			</span>
		</h3>

		<?php
		wp_list_comments(
			array(
				'walker' => new Comment_Walker(),
			)
		);
		?>

		<?php
		if ( function_exists( 'the_comments_navigation' ) ) {
			the_comments_navigation();}
		?>

	<?php endif; // Check for have_comments(). ?>

	<?php
	// If comments are closed and there are comments, let's leave a little note, shall we?
	if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) :
		?>
		<p class="nocomments"><?php _e( 'Comments are closed.', 'verbosa' ); ?></p>
	<?php endif; ?>

	<?php
	if ( comments_open() ) {
		comment_form();}
	?>
</section><!-- #comments -->
