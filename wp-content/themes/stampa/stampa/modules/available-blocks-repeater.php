<section class="available-blocks-repeater">
	<div class="available-blocks-repeater__repeater">
		<div class="available-blocks-repeater__button">
			<?php if ( isset( $image->
			id) ) { $object_fit = $__image->fit; $object_position =
			$__image->position; wp_get_attachment_image( $image->id, 'full', '', [
			'class' => "{$object_fit} {$object_position}" ] ); } ?>
			<p class="available-blocks-repeater__text"><?php echo $text ?></p>
		</div>
		<!-- container: text -->
	</div>
	<!-- container: text -->
</section>
