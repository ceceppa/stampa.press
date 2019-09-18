<section
	class="hero"
	style="background: url('<?php echo $backgroundImage; ?>') no-repeat center / cover "
>
	<h2 class="hero__heading"><?php echo $heading; ?></h2>
	<div class="hero__intro"><?php echo $intro; ?></div>
	<div class="hero__container">
		<a href="<?php echo $github__link; ?>" class="hero__github" alt="Tooltip">
			<img
				class="hero__image"
				src="<?php echo $github__icon['url']; ?>"
				alt="<?php echo esc_attr( $github__label ); ?>"
			/>
			<span class="hero__label"><?php echo $github__label; ?></span>
		</a>
		<a href="<?php echo $docs__link; ?>" class="hero__docs" alt="Label">
			<img
				class="hero__image"
				src="<?php echo $docs__icon['url']; ?>"
				alt="<?php echo esc_attr( $docs__label ); ?>"
			/>
			<span class="hero__label"><?php echo $docs__label; ?></span>
		</a>
		<a href="<?php echo $tryme__link; ?>" class="hero__tryme" alt="Label">
			<img
				class="hero__image"
				src="<?php echo $tryme__icon['url']; ?>"
				alt="<?php echo esc_attr( $tryme__label ); ?>"
			/>
			<span class="hero__label"><?php echo $tryme__label; ?></span>
		</a>
		<a href="<?php echo $twitter__link; ?>" class="hero__twitter" alt="Label">
			<img
				class="hero__image"
				src="<?php echo $twitter__icon['url']; ?>"
				alt="<?php echo esc_attr( $twitter__label ); ?>"
			/>
			<span class="hero__label"><?php echo $twitter__label; ?></span>
		</a>
	</div>
</section>
