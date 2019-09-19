# 93digital Starter Theme

The Amazing starter theme by 93digital for use as a starting template for building custom themes.
Uses PostCSS and Postcss Preset Env, HTML5 Boilerplate, Gulp and Parcel.

## Requirements

- Node ([nodejs.org](https://nodejs.org/))
- npm ([npmjs.com](https://www.npmjs.com/))
- php >= 7.1
- gulp ([gulpjs.org](https://gulpjs.com/))

## Installation

Clone Stella `$ git clone git@93digital.git:wordpress/starter-theme.git` into your `themes` directory and start coding :)

## Directory structure

::: vue
.
├── assets
│   ├── dist _(**Compiled js files and svg symbols**)_
│   │   └─ svg _(**Svg sprite folder**)_
│   │   └─ symbols.svg _(**The SVG sprite file**)_
│   │   ├─ build.js _(**The unminified JS bundle**)_
│   │   ├─ build.js.map _(**The JS SourceMap**)_
│   │   └─ symbols.map _(**HTML file generated by the gulp-svg-sprites addon (not used)**)_
│   ├── img _(**Images**)_
│   │   └─ svg _(**Svg files (to be **)_
│   ├── js _(**Js files**)_
│   │   └─ highway _(**[Highway script](https://github.com/ashh640/Highway)**)_
│   │   ├─ src _(**The theme specific js files**)_
│   │   │  └─ stella _(**The theme specific js files**)_
│   │   │     └─ polyfills _(**The theme specific js files**)_
│   │   │        ├─ object-fit.js _(**[Object Fit fix for IE 11.](/docs/JavaScript.html#object-fit)**)_
│   │   │        ├─ foreach.js _(Foreach fix for IE 11)_
│   │   │        └─ polyfill.js
│   │   │     ├─ ajax-login.js _(**The script to handle the custom (ajax login)[/docs/JavaScript.html#ajax-login]**)_     
│   │   │     ├─ browser-classes.js _(**[Appends](/docs/JavaScript.html#browser-classes) the current browser/os to the    &gt;body&lt; tag**)_
│   │   │     ├─ data-ajax.js _(**Handles the [AJAX requests](/docs/AJAX.html#usage)**)_
│   │   │     ├─ google-maps.js _(**[Initialise the Google Map for all the ".gmap" elements found in the page.](/docs/JavaScript.html#google-maps)**)_
│   │   │     ├─ helpers.js _(**[Helper functions](/docs/JavaScript.html#remval)**)_
│   │   │     ├─ resize.js _([Optimized window resize handler](/docs/JavaScript.html#resize))_
│   │   │     ├─ skip-link-focus.js _(Helps with accessibility for keyboard only users)_
│   │   │     └─ smooth-scroller.js _(Smooth 'totop' scroller)_
│   │   │     └─ swipe.js _(Swipe events)_
│   │   │     └─ toggle.js _(Toggle Class)_
│   │   └─ main.js _(**The main js file that is going to be compiled with parcel**)_
│   ├── postcss _(**The PostCSS files**)_
│   │   ├─ blocks _(Custom gutenberg blocks)_
│   │   ├─ components _(Reusable elements like: buttons, slider, accordions)_
│   │   ├─ fonts _(Fonts file)_
│   │   ├─ gutenberg _(Style for gutenberg elements)_
│   │   ├─ modules _(Modules)_
│   │   ├─ reset _(CSS reset)_
│   │   ├─ sections _(Global page sections: header, footer, main, sidebar, etc)_
│   │   ├─ utility _(Utility styles: accessibility, containers, flex, media, etc)_
└── package.json
:::

## Coding Standards

Stella contains definition for the following coding standards:

**PHP:**

The theme extend the [WordPress PHP Coding Standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/), but with the Yoda condition turned off.
This because it's unique to WordPress and not used by other JS standards. So in order to avoid confusion when switching between the 2 languages, we prefer having it off.

**JavaScript:**

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

The global object `window.stella` is available with the following informations:

| attribute | description                                          |
| --------- | ---------------------------------------------------- |
| home_url  | the Home url (used by data-ajax)                     |
| nonce     | the nonce to be passed for all the REST API requests |
| debug     | `true` if SCRIPT_DEBUG is enabled                    |

## Composer

Packages available:

- [Lama](https://93digital.gitlab.io/lama/) the Load More library by 93digital
- [Theme settings panel](https://kb.93digital.co.uk/knowledge-base/how-to-customize-the-theme-options-panel/) the theme options panel
- [Custom Post Type](https://github.com/93digital/custom-post-type) a PHP Class for creating WordPress Custom Post Types easily
- [Instagram](http://93digital.git:9999/wordpress/instagram) Instagram class

## Gulp

Gulp is used to compile and minify the JS files.

Available tasks:

| Action       | Description                                                 |
| ------------ | ----------------------------------------------------------- |
| svgsprite    | Creates the SVG sprite                                      |
| imagemin     | Optimise all the images inside the `assets/img` folder      |
| postcss      | Compiles the PostCSS files                                  |
| scripts      | Run Parcel for the JS in development mode only              |
| scripts-prod | Run Parcel for the JS in production mode only               |
| replace      | Update the `THEME_VERSION` constaint inside `functions.php` |

### Build

Execute all the above actions:

```bash
gulp build
```

### Watch for changes

```bash
gulp watch
```

### Autoreload on file changes

```bash
gulp
```