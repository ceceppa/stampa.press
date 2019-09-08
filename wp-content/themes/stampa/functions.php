<?php
namespace Semplice;

use function Meno\Prevent\prevent_generation;

define( 'SEMPLICE_THEME_VERSION', '1567692552' );

$composer_autoload = __DIR__ . '/vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
	require $composer_autoload;
}

$includes_path = __DIR__ . '/includes/';
require $includes_path . 'fix-wp-templates-path.php';
require $includes_path . 'custom-post-types.php';
require $includes_path . 'theme-support.php';
require $includes_path . 'menus.php';
require $includes_path . 'image-sizes.php';
require $includes_path . 'localization.php';
require $includes_path . 'sidebars.php';
require $includes_path . 'styles.php';
require $includes_path . 'scripts.php';
require $includes_path . 'svg.php';
require $includes_path . 'seo.php';

if ( function_exists( 'prevent_generation' ) ) {
	prevent_generation();
}
