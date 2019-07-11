<section class="test-images">
	<?php if ( isset( $image1->id) ) { $object_fit = $__image1->fit; $object_position = $__image1->position;
wp_get_attachment_image( $image1->id, 'full', '', [ 'class' => "{$object_fit} {$object_position}" ] ); } ?>
	<?php if ( isset( $image->id) ) { $object_fit = $__image->fit; $object_position = $__image->position;
wp_get_attachment_image( $image->id, 'full', '', [ 'class' => "{$object_fit} {$object_position}" ] ); } ?>
</section>