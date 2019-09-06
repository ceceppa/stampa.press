# CSS

The theme uses postCSS which is compiled via gulp from `assets/postcss/style.css` to the theme's default stylesheet `style.css`.

Custom CSS/postCSS should be BEM (http://getbem.com/) compliant, and each new block should have its own file. All files must be added to the postCSS directory and imported into `assets/postcss/style.css`. New

## File structure

The postCSS directory contains the following directories to keep things organised:

- `components/` Useful blocks which are used throughout the templates.
- `fonts/` Add any local font files here (dont forget to include the with `@fontface`!).
- `gutenberg/` Base Gutenberg block styles for front and back-end.
- `js/` PostCSS mixins.
- `modules/` module block styles.
- `reset/` Element reset styles.
- `sections/` Single elements or sections with a specific purpose.
- `utility/` Useful, reusable classes.

## Variables

All theme variables should be placed within the `:root{}` tag in `assets/postcss/variables.css`. Variable names must be appended with `--` and in order to use them the variable name needs to be wrapped in `var()`

#### Example (declaraion)

```css
:root {
  --red: #ff0000;
}
```

#### Example (usage)

```css
.text {
  color: var(--red);
}
```

### Custom media queries

There are a number of media query breakpoints in `variables.css` which can be used to create consistent media query sizes across the theme styling.

These are broken down into the following sizes:

|Name|Size|
|--max-xs|<=576px|
|--max-sm|<=768px|
|--max-md|<=1024px|
|--max-lg|<=1280px|
|--min-xs|>576px|
|--min-sm|>768px|
|--min-md|>1024px|
|--min-lg|>1280px|

#### Example

```css
.box {
  width: 25%;
  @media (--max-sm) {
    widht: 50%;
  }
}
```

There is also a touch only media query which targets touch only devices, it is supported by all major mobile device browser.

#### Example
```css
.link {
  &:hover {
    color: blue;
  }
  @media (--touch) {
    &:hover {
      color: red;
    }
  }
}
```

## Utility

Most of these are pretty self-explainatory, such as `flex.css` and `visibilty.css`, however some require bit more of an explination.

### Spinner

Located in `postcss/utility/icons.css`

The `.spinner` class adds a `::before` pseudo-element with a infinite rotating animation, useful when needing to simulate a loading state for a form, slider or AJAX request. The pseudo-element's parent requires a `position` style to be set (not `static`).

#### Example:

```css
.slider {
  position: relative
  &.loading {
    @extend .spinner;
  }
}
```

The `.spinner` class adds a `::before` pseudo-element with a infinite rotating animation, useful when needing to simulate a loading state for a form, slider or AJAX request. The pseudo-element's parent must have `position: relative;` or `position: absolute;`.

### Burger

Located in `postcss/utility/icons.css`

A ready to use burger icon transitions into an `X` when an `.active` class is added to the element. It uses both `::before` and `::after` pseudo-elements so be sure that if that the element does not already have either.

It is advisable to add some text to the the element to give it context, this text will not be visible.

#### Example:

```html
<!-- inactive -->
<button class="burger">
  Menu
</button>

<!-- active -->
<button class="burger active">
  Menu
</button>
```

### Video wrapper

Located in `postcss/utility/media.css`

This class should be added to an element which wraps around a video element e.g. `<iframe>` or `<video>`. It will set the videos resolution to 16:9 no matter what the width of the element is. It is also fully responsive.

#### Example:

```html
<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/Sv5iEK-IEzw" frameborder="0"></iframe>
</div>

<div class="video-wrapper">
  <video controls>
    <source src="avengers-infinity-wars.mp4" type="video/mp4">
    Browser does not support video tag.
  </video>
</div>
```

### Object fit

Located in `postcss/utility/media.css`

See `https://stella.starter-theme.pasta/docs/JavaScript.html#object-fit`

#### Example:

```html
<figure class="image-container"><img src="image.jpg" class="object-fit" /></figure>
```

### Truncate

Located in `postcss/utility/text.css`

Truncates text over one line, automatically adds `...` at the end of the string if it overflows its container.

#### Example:
```html
<span class="truncate">This is a really, really, really, really long line. I just can't help waffling on and adding text that wont fit!</span>
```

### WYSIWYG

Located in `postcss/utility/wysiwyg.css`

Wrapping class for WYSIWYG content.

Targets all common elements generated inside the WYSIWYG and adds some basic styling.

#### Example:

```html
<div class="wysiwyg">
  <?php the_content(); ?>
</div>
```

## Mixins

### Position absolute

Adds full-width & full-height absolute position to an element. The parent element must have `position: relative;` or `position: absolute;`

There is an optional parameter to allow `z-index` control. This is useful for colour overlays on images (default is 0).

`@mixin absolute $zindex: 0;`

#### Example:

```css
.element {
  @mixin absolute; // Default z-index: 0;
  @mixin absolute(1); // z-index: 1;
  @mixin absolute(99); // z-index: 99;
}
```

#### Use case:

Add a background-color overlay with a z-index of 1.

```css
.image::before {
  @include absolute(1);
  background-color: rgba(0, 0, 0, .25);
}
```

### Overflow fade

Add a fade to the bottom of the element. Gives the effect of overflowing text fading out, should be added as an `::after` psuedo element and the parent should have either `position: relative;` or `position: absolute;`

There are 2 parameters, `$color` and `$fade`. The first one is required and should be a CSS, RGB or HEX colour. The second parameter is the height of the fade and defaults to `2.5em`.

`@mixin overflow-fade $color, $fade: 2.5em`

#### Example

```css
.text {
  &::after {
    @mixin overflow-fade #FFF;
    @mixin overflow-fade var(--white);
  }
}
```

### Ratio Elements

Add specific responsive ratios to elements. Useful for image and video containers.

There are two parameters, `$width` & `$height`.

`@mixin ratio $width, $height;`

#### Example:
```css
.image {
  @include ratio 16, 9; // Creates an image with an aspect ratio of 16:9.
  @include ratio 1, 1; // Creates an image with an aspect ratio of 1:1 (Square).
}
```

#### Use case

Add a 16:9 video container and makes the child (iframe, video, img) fit those boundaries.

```css
.video-wrapper {
  @include ratio 16, 9;
  > * {
    @include absolute;
  }
}
```

## IE fixes

### IE only css

The `assets/postcss/ie-fix.css` file is used to target just IE 10 and 11 allowing you to create fallbacks for these browsers which wont have any affect on any ~~good~~ modern browser.

Styles must be placed within the media query.

#### Example

```css
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
  .text {
    color: blue;
  }
}
```

### CSS Grid

While support for CSS grid is now wide-spread enough to confidently use it in produciton, IE will still cause problems (who'd have guessed it?!).

The postcss gulp task contains the Grid Autoplace feature (via postcss-preset-env). This will add vendor prefixing for IE as it uses older grid syntax while adddding fixes to allow limited grid support.

While this fix is useful on some cases, in others it may not work so by default Autoplace feature wont be run when compiling the postcss.

To use it within a specific postcss file, just add the autprefixer comment to the top of the file:
``` CSS
/* autoprefixer grid: autoplace */

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, auto);
  ...
  ...
}
```

`grid-template-rows` needs to be defined a number of rows as the fix only works with a defined number of columns and rows.

https://github.com/postcss/autoprefixer#grid-autoplacement-support-in-ie
