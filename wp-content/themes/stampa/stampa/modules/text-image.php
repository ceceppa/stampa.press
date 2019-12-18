<section class="text-image">
	<h2 class="text-image__heading"><?php echo $heading; ?></h2>
	<div class="text-image__richtext"><?php echo $richtext ?></div>
	<?php if ( isset( $image->
	id) ) { $object_fit = $__image->fit; $object_position = $__image->position;
	wp_get_attachment_image( $image->id, 'medium', '', [ 'class' => "{$object_fit}
	{$object_position}" ] ); } ?>
</section>
