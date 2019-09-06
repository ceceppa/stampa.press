<?php
namespace Semplice\SVG;

function get_svg( string $icon_name, string $class_name = '' ) : string {
	$svg = <<< SVG
<svg class="svg-icon svg-icon--{$icon_name} {$class_name}" aria-hidden="true">
	<use href="#{$icon_name}" xlink:href="#{$icon_name}"></use>
</svg>
SVG;

	return $svg;
}

function the_svg( string $icon_name, string $class_name = '' ) {
	echo get_svg( $icon_name, $class_name );
}
