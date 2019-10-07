<section
	class="home-hero"
	style="background: url('<?php echo $backgroundImage; ?>') no-repeat center / cover "
>
	<div class="home-hero__intro"><?php echo $intro ?></div>
	<a
		href="<?php echo $icon-button__link; ?>"
		class="home-hero__icon-button"
		alt="Label"
	>
		<img
			class="home-hero__image"
			src="<?php echo $icon-button__icon['url']; ?>"
			alt="<?php echo esc_attr( $icon-button__label ); ?>"
		/>
		<span class="home-hero__label"><?php echo $icon-button__label; ?></span>
	</a>
</section>
