# Back-end & Front-End

Front-end and Back-end built-in utility functions

## Utility

Utility functions built in the theme available for both back-end & front-end.

### Cache

The theme has a built in caching system based on files.
The cache is purged every time something is saved in the back-end.

**NOTE** To disable the custom cache set `NINE3_DONT_USE_CUSTOM_CACHE` always to `true` (`inc/nine3.php`).
#### Get

Get the cached value, if exists.

```php
$value = nine3_cache_get( [key] );
```

**NOTE** the default return value is `null`.

#### Set

Save the value on cache.

```php
nine3_cache_set( [key], [value] );
```

### Get/Include template

```php
nine3_locate_template( $template_name, $args = array() );
```

#### Example

```php
nine3_locate_template(
  'template-parts/test-template.php',
  [
    'hello' => 'world'
  ],
);
```

The template file: *template-parts/test-template.php*

```html
<div>
  <?php echo $hello; // world; ?>
</div>
```

### Dump variable

The code dump the variable on the screen only if Tracy is available, otherwise
the output goes to the WP/Server log file.

```php
\Stella\dump( [variable to dump] );
```

### Theme settings

The theme provides basic Theme Settings page for:

- Google Analytics ID
- Google Tag Manager ID
- Google Maps API Key
- Google Maps Pin Icon
- Custom header code (to allow the user to use different tracking platforms)
- Favicons

### Global Options


## Back-end

The `assets/postcss/admin.css` is automatically loaded for customising the back-end when needed.

### Files & Folders structure

The base path for the back-end files is `inc/back-end/`.

- `class/` folder contains all the extra classes neeed by the back-end
- `ajax.php` contains all the code needed for the AJAX callback
- `login.php` utility functions to customise the standard WP login errors
- `utility.php` utility functions for the back-end

## Front-end

### Defer attribute

By default the theme adds the `defer` attribute to all the JS files, but it causes problems with inline scripts that use jQuery (for example GF).
To turn it off, please comment the filter `set_defer_attribute` inside the `inc/front-end/utils.php` file.

### Safe email

The function obfuscate the ouput for the `mailto:` anchor attribute.

```php
\Stella\FrontEnd\Utils\safe_email( $email_address );
```

### Youtube embed parameters

Add valid YouTube embed parameters to a YouTube embed URL.

```php
\Stella\FrontEnd\Utils\add_youtube_embed_parameters( string $url, $autoplay = '0', $showinfo = '0', $loop = '0' )
```

### Vimeo embed parameters

Add valid Vimeo embed parameters to a Vimeo embed URL.

```php
\Stella\FrontEnd\Utils\add_vimeo_embed_parameters( string $url, $autoplay = '0', $loop = '0', $title = '0', $muted = '0' )
```

### Truncate text

Truncate text to a certian character length.

```php
\Stella\FrontEnd\Utils\truncate_text( $string_to_truncate, $length_in_chars = 100 );
```

### Slugify a string

Slugify a string of text. Replaces spaces and underscores with hyphens and converts the whole string to lower case.
```php
\Stella\FrontEnd\Utils\slugify( $string_to_slugify );
```

### Is youtube URL?

Check to see if youtube video.

```php
\Stella\FrontEnd\Utils\is_youtube_url( $url );
```

### Pagination

To use the custom pagination:

```php
\Stealla\FrontEnd\Utils\pagination( $show_ends = true );
```

- `show_ends` Whether to show links to the first and last page (where applicable).

### SVG Icons

The starter theme has built in support for (svg symbol sprites)[https://css-tricks.com/svg-symbol-good-choice-icons/].

All the SVG icons have to be stored inside the `assets/img/svg` folder, while the sprite can be generated with any of the following commands:

- gulp build
- gulp svgsprite

**NOTE**: The generated SVG Sprite is automatically injected in the [wp_footer](https://developer.wordpress.org/reference/functions/wp_footer/) hook.

#### Svg

`Stella\Icons\svg( $icon, $echo = true );`

- $icon (String|Array) icon to print
- $echo (Boolean) if false does not automatically echo the SVG markup

The function allows you to customise some attribute of the SVG markup by passing an array as 1st parameter.
