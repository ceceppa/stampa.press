<?php
/**
 * The Header
 *
 * Displays all of the <head> section and everything up till <main>
 *
 * @package Verbosa
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link href="https://fonts.googleapis.com/css?family=Lato:300,400,500,600&display=swap" rel="stylesheet"> 
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<a 
	class="skip-link screen-reader-text" href="#content">
	<?php _e( 'Skip to content', 'semplice' ); ?>
</a>

	<?php get_template_part( 'template-parts/main', 'sidebar' ); ?>
