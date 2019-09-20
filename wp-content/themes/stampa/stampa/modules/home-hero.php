<section
	class="home-hero"
	style="background: url('<?php echo $backgroundImage; ?>') no-repeat center / cover "
>
	<div class="home-hero__container">
		<a
			href="<?php echo $github__link; ?>"
			class="home-hero__github"
			alt="Github"
		>
			<img
				class="home-hero__image"
				src="<?php echo $github__icon['url']; ?>"
				alt="<?php echo esc_attr( $github__label ); ?>"
			/>
			<span class="home-hero__label"><?php echo $github__label; ?></span>
		</a>
		<a href="<?php echo $docs__link; ?>" class="home-hero__docs" alt="Doc">
			<img
				class="home-hero__image"
				src="<?php echo $docs__icon['url']; ?>"
				alt="<?php echo esc_attr( $docs__label ); ?>"
			/>
			<span class="home-hero__label"><?php echo $docs__label; ?></span>
		</a>
		<a href="<?php echo $tryme__link; ?>" class="home-hero__tryme" alt="Try Me">
			<img
				class="home-hero__image"
				src="<?php echo $tryme__icon['url']; ?>"
				alt="<?php echo esc_attr( $tryme__label ); ?>"
			/>
			<span class="home-hero__label"><?php echo $tryme__label; ?></span>
		</a>
		<a
			href="<?php echo $twitter__link; ?>"
			class="home-hero__twitter"
			alt="Twitter"
		>
			<img
				class="home-hero__image"
				src="<?php echo $twitter__icon['url']; ?>"
				alt="<?php echo esc_attr( $twitter__label ); ?>"
			/>
			<span class="home-hero__label"><?php echo $twitter__label; ?></span>
		</a>
	</div>
	<!-- container: twitter -->
	<div class="home-hero__intro"><?php echo $intro ?></div>
</section>
