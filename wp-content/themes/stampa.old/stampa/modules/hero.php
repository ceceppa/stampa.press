<?php
use function Stampa\Theme\Extras\inline_svg;
?>

<section
	class="hero"
	style="background: url('<?php	echo $backgroundImage ?? ''; ?>') no-repeat center / cover "
>
	<div class="hero__wrapper">
		<h2 class="hero__heading"><?php echo $heading; ?></h2>
		<div class="hero__intro"><?php echo $intro; ?></div>
		<div class="hero__container">
			<?php
				$icons = [
					'github',
					'docs',
					'tryme',
					'twitter',
				];

				foreach ( $icons as $icon ) :
					?>
				<a href="<?php echo $attributes[ $icon . '__link' ]; ?>" class="hero__button hero__<?php echo $icon; ?>" alt="Github">
					<div class="hero__image">
						<?php inline_svg( $attributes[ $icon . '__icon' ]['id'] ); ?>
					</div>
					<span class="hero__label"><?php echo $attributes[ $icon . '__label' ]; ?></span>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</section>
