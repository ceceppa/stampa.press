<section class="test-image-new" style="background: url('<?php echo $backgroundImage ?>') no-repeat center / cover ">
<?php $post = new WP_Query(['post_id' => {{stampa.value.postID}}]);
while ( $post->have_posts() ) \= $post->the_post(); ?> <div class="test-image-new__post-selector"><h3 class="test-image-new__post-title"> <?php the_title(); ?> </{{stampa.value.le}}></div> <?php endwhile; ?>
</section>