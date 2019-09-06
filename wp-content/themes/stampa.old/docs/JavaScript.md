# JavaScript

Npm packages installed by default:

- [micromodal](https://micromodal.now.sh/)
- [smoothscroll](https://github.com/iamdustan/smoothscroll)

Built in JavaScript utilities:

## Ajax login

`assets/js/src/stella/ajax-login.js` 

This script is needed by the custom login system.

## Browser classes

`assets/js/src/stella/browser-classes.js` 

The script is used to append the current browser and OS to the `<body>` tag.

**NOTE** Due to caching is not possible to print this information using the WP [body_class](https://developer.wordpress.org/reference/functions/body_class/) function.

## Google Maps

`assets/js/src/stella/google-maps.js`

Initialise the Google Map for all the ".gmap" elements found in the page.

### Shortcode

`[gmap lat="..." lng="..." address="..." zoom="15"]`

**NOTE** Address is used only if no latitude is provided.

#### PHP

To use from the PHP Code

``` php
\Stella\Shortcodes\gmap( [
  'lat' => '',
  'lng' => '',
  'address' => '',
  'zoom' => 15, // default value
] );
```

### HTML Tag

Using latitude and longitude

``` html
<div class="gmap" data-lat="..." data-lng="..."></div>
```

Providing address

``` html
<div class="gmap" data-address="..."></div>
```

## Object-fit

`assets/js/src/stella/polyfills/object-fit.js`

Object Fit fix for IE 11.

### Usage

``` html
<figure class="image-container"><img src="image.jpg" class="object-fit" /></figure>
```

## Resize

`assets/js/resize.js`

Optimized resize for [performance purpose](https://developer.mozilla.org/en-US/docs/Web/Events/resize).

### Usage

``` js
import optimizedResize from './stella/resize';

optimizedResize.add(function() {
  console.log('Resource conscious resize callback!')
});
```

## Swipe

`assets/js/src/stella/swipe.js`

Detect a swipe event on an element.

### Usage

``` js
import swipeEvent from './stella/swipe';

swipeEvent(document.querySelector('.elem'), swipeDir => {
  console.log(swipeDir); // will output either "up", "down", "left" or "right.
});
```

## Smooth scroll

`assets/js/src/stella/smooth-scroller.js`

Creates a smooth scrolling transition when using a hash link.

### Usage

``` html
<a href="#some-element" data-smooth-scroll>Some link</a>
```

### Options

Add an empty `data-smooth-scroll-no-hash` attribute to the link to prevent the hash being appended in the address bar - useful for back-to-the-top links. B-)

``` html
<a href="#body" data-smooth-scroll data-smooth-scroll-no-hash>Back to the top</a>
```

Adding `data-smooth-scroll-no-hash` prevents the hash being added to the address bar (desirable with 'back to top' links).

## Toggle

`assets/js/src/stella/toggle.js`

Enables the toggling of elements, useful for dropdowns or modal windows.

### Usage
 
``` html
<button type="button" data-toggle="search">Open Search</button>
<div data-toggle-target="search">
  ...
  <button type="button" data-toggle-close="search">Close Search</button>
</div>
```

The class comes with two event listeners, 'open' & 'close'. You can use these to add additional functionality to the toggle like animations.

``` js
document.querySelector('[data-toggle]').addEventListener('open', () => openFunction());
document.querySelector('[data-toggle]').addEventListener('close', () => closeFunction());
```

## Helpers

### remVal

`remVal( px )`

Convert px value into rem.

#### Usage

``` js
import { remVal } from './stella/helpers';

// Convert 10px in rem.
const test = remVal(10); // example: 0.625rem
```

### isTouch

Check if device is touch capable.

#### Usage

``` js
import { isTouch } from './stella/helpers';

// Convert 10px in rem.
if ( isTouch() ) {
  console.info('is a touch device!');
} else {
  console.info('is not a touch device :(');
}
```
