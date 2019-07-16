<?php
namespace Stampa\Test;

use Stampa\JS_Code_Generator;

$file_content = file_get_contents( __DIR__ . '/test-fields.json' );
$test_data    = json_decode( $file_content );

new JS_Code_Generator( $test_data );

class Test_JS_Generator extends \WP_UnitTestCase {
}
