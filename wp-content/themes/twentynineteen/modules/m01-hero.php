<section class="m01d" style="background: url('<?php echo $backgroundImage ?>') no-repeat center / cover ">
    <?php if (! empty($heading) ) : ?> <h2 class="m01d__heading" > <?php echo $heading ?> </h2> <?php 
    endif; ?>
    <div class="m01d__text"> <?php echo $text ?> </div>
    <a href="<?php echo $button__url ?>" class="m01d__button" >
    <?php echo $button ?>
 </a>
</section>