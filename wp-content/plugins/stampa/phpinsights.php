<?php

declare(strict_types=1);

return [
	'preset' => 'default',
	'exclude' => [
		'tests',
		'phpinsights.php',
	],
	'remove' => [
		'PHP_CodeSniffer\Standards\Generic\Sniffs\WhiteSpace\DisallowTabIndentSniff',
		'PHP_CodeSniffer\Standards\PSR1\Sniffs\Methods\CamelCapsMethodNameSniff',
		'SlevomatCodingStandard\Sniffs\TypeHints\ReturnTypeHintSpacingSniff',
	],
];
