<section class="test-repeater">
	<div class="test-repeater__repeater">
		<div class="test-repeater__container">
			<a href="<?php echo $button__url ?>" class="test-repeater__button">
				\n
				<?php echo $button ?>
				\n
			</a>
			<?php if ( isset( $image->
			id) ) { $object_fit = $__image->fit; $object_position =
			$__image->position; wp_get_attachment_image( $image->id, 'full', '', [
			'class' => "{$object_fit} {$object_position}" ] ); } ?>
		</div>
		<!-- container: image -->
	</div>
	<!-- container: image -->
</section>
