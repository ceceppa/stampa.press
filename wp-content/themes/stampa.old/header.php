<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package nine3
 */

/**
 *  Favicons
 */
$theme_color = '#50a9d7';
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="format-detection" content="telephone=no">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet">
<meta name="msapplication-TileColor" content="<?php echo $theme_color; ?>">
<meta name="theme-color" content="<?php echo $theme_color; ?>">

<?php wp_head(); ?>
<noscript>
	<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/postcss/noscript.css">
</noscript>

</head>
<body id="body" <?php body_class(); ?>>
	<a href="#main" class="skip-link"><?php esc_html_e( 'Skip to content', 'nine3' ); ?></a>

	<header class="header" role="banner" id="header">
		<div class="header__logo">
		<a href="<?php echo home_url(); ?>">
			<img src="logo" alt="Stampa">
		</a>
		</div>

		<?php
		wp_nav_menu(
			array(
				'theme_location' => 'primary',
				'menu_id'        => 'primary-menu',
			)
		);
		?>
	</header>


	<main class="main" role="main" id="main" data-router-wrapper>
		<article data-router-view="name">
