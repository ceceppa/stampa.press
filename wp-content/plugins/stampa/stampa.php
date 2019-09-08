<?php

declare(strict_types=1);

/**
 * Plugin Name: Stampa
 *
 * @package stampa
 */

namespace Stampa;

use Stampa\Rest_API\Rest_API;

define( 'STAMPA_VERSION', '0.1' );
define( 'STAMPA_FOLDER', __DIR__ . '/' );
define( 'STAMPA_PLUGIN_PATH', STAMPA_FOLDER . 'stampa.php' );
define( 'STAMPA_PLUGIN_URL', plugins_url( 'stampa/', __DIR__ ) . '/' );
define( 'STAMPA_ASSETS_TO_COPY_FOLDER', __DIR__ . '/assets-to-copy/' );
define( 'STAMPA_REACT_BOILERPLATES_FOLDER', __DIR__ . '/assets-to-copy/gutenberg/' );

require __DIR__ . '/vendor/autoload.php';

require __DIR__ . '/includes/styles.php';
require __DIR__ . '/includes/scripts.php';
require __DIR__ . '/includes/stampa-custom-post-type.php';
require __DIR__ . '/includes/replace-wp-editor.php';
require __DIR__ . '/includes/fields-loader.php';
require __DIR__ . '/includes/block-code-generator.php';
require __DIR__ . '/includes/stampa-filters.php';
require __DIR__ . '/includes/rest-api.php';

new Rest_API();
