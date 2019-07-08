<section class="test-image">
	<?php if ( isset( $image->url ) ) : ?>
	<img class='test-image__image' src='<?php echo $image->url; ?>' alt='<?php echo $image->alt; ?>'/>
<?php endif; ?>
</section>
