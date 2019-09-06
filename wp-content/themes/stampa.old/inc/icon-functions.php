<?php
/**
 * SVG icons related functions and filters
 *
 * Original code from twentyseventeen theme
 *
 * @package 93digital
 * @since 1.0
 */

namespace Stampa\Icons;

/**
 * Add SVG definitions to the footer.
 */
function include_svg_icons() {
	// Define SVG sprite file.
	$svg_icons = get_parent_theme_file_path( '/assets/dist/svg/symbols.svg' );

	// If it exists, include it.
	if ( file_exists( $svg_icons ) ) {
		echo '<div class="svg-sprite" style="display: none">';
		require_once $svg_icons;
		echo '</div>';
	}
}
add_action( 'wp_footer', __NAMESPACE__ . '\include_svg_icons', 9999 );

/**
 * Return SVG markup.
 *
 * @param array/string $args {
 *     Parameters needed to display an SVG.
 *
 *     @type string $icon  Required SVG icon filename.
 *     @type string $title Optional SVG title.
 *     @type string $desc  Optional SVG description.
 * } or pass the icon name to be shown.
 *
 * @param bool         $echo if false return the SVG string needed.
 *
 * @return string SVG markup.
 */
function svg( $args = null, $echo = true ) {
	// Make sure $args are an array.
	if ( is_null( $args ) || empty( $args ) ) {
		return __( 'Please define default parameters in the form of an array.', 'stella' );
	}

	// Define an icon.
	if ( is_array( $args ) && false === array_key_exists( 'icon', $args ) ) {
		return __( 'Please define an SVG icon filename.', 'stella' );
	}

	// Set defaults.
	$defaults = array(
		'icon'     => '',
		'title'    => '',
		'desc'     => '',
		'fallback' => true,
	);

	// Did we pass only the icon name?
	if ( is_string( $args ) ) {
		$args = array(
			'icon' => $args,
		);
	}

	// Parse args.
	$args = wp_parse_args( $args, $defaults );

	// Set aria hidden.
	$aria_hidden = ' aria-hidden="true"';

	// Set ARIA.
	$aria_labelledby = '';

	/*
	 * Twenty Seventeen doesn't use the SVG title or description attributes; non-decorative icons are described with .screen-reader-text.
	 *
	 * However, child themes can use the title and description to add information to non-decorative SVG icons to improve accessibility.
	 *
	 * Example 1 with title: <?php \Stella\Icons\svg( array( 'icon' => 'arrow-right', 'title' => __( 'This is the title', 'textdomain' ) ) ); ?>
	 *
	 * Example 2 with title and description: <?php \Stella\Icons\svg( array( 'icon' => 'arrow-right', 'title' => __( 'This is the title', 'textdomain' ), 'desc' => __( 'This is the description', 'textdomain' ) ) ); ?>
	 *
	 * See https://www.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/.
	 */
	if ( $args['title'] ) {
		$aria_hidden     = '';
		$unique_id       = uniqid();
		$aria_labelledby = ' aria-labelledby="title-' . $unique_id . '"';

		if ( $args['desc'] ) {
			$aria_labelledby = ' aria-labelledby="title-' . $unique_id . ' desc-' . $unique_id . '"';
		}
	}

	/**
	 * Add the viewBox parameter, the info is "extracted" during the gulp svgs process.
	 */
	// Contains all the "loaded" viewBox attributes so far.
	$icon = esc_attr( $args['icon'] );

	// Begin SVG markup.
	$svg = '<svg class="svg-icon svg-icon--' . $icon . '"' . $aria_hidden . $aria_labelledby . ' role="img">';

	// Display the title.
	if ( $args['title'] ) {
		$svg .= '<title id="title-' . $unique_id . '">' . esc_html( $args['title'] ) . '</title>';

		// Display the desc only if the title is already set.
		if ( $args['desc'] ) {
			$svg .= '<desc id="desc-' . $unique_id . '">' . esc_html( $args['desc'] ) . '</desc>';
		}
	}

	/*
	 * Display the icon.
	 *
	 * The whitespace around `<use>` is intentional - it is a work around to a keyboard navigation bug in Safari 10.
	 *
	 * See https://core.trac.wordpress.org/ticket/38387.
	 */
	$svg .= ' <use href="#' . esc_html( $args['icon'] ) . '" xlink:href="#' . esc_html( $args['icon'] ) . '"></use> ';

	// Add some markup to use as a fallback for browsers that do not support SVGs.
	if ( $args['fallback'] ) {
		$svg .= '<span class="svg-fallback icon-' . esc_attr( $args['icon'] ) . '"></span>';
	}

	$svg .= '</svg>';

	if ( $echo ) {
		echo $svg; // WPCS: XSS OK.
	}

	return $svg;
}
