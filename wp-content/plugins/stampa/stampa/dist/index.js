// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"blocks/hero.js":[function(require,module,exports) {
/**
 * BLOCK: Hero
 *
 */
var __ = wp.i18n.__;
var registerBlockType = wp.blocks.registerBlockType;
var _wp$editor = wp.editor,
    InspectorControls = _wp$editor.InspectorControls,
    MediaUpload = _wp$editor.MediaUpload;
var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    IconButton = _wp$components.IconButton,
    TextareaControl = _wp$components.TextareaControl,
    Button = _wp$components.Button;
var _wp$element = wp.element,
    Fragment = _wp$element.Fragment,
    Component = _wp$element.Component; // Default attributes are set to avoid React throwing an error
// when start typeing something in the brew new added module

var defaultAttributes = {
  backgroundImage: {}
};
registerBlockType('stampa/hero', {
  title: __('Hero'),
  icon: 'welcome-write-blog',
  category: 'stampa-blocks',
  keywords: [],
  multiple: true,
  attributes: {
    "backgroundImage": {
      "type": "object"
    },
    "heading": {
      "type": "string"
    },
    "intro": {
      "type": "string"
    },
    "button": {
      "type": "string"
    }
  },

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {object} props Gutenberg props.
   * @return {JSX} JSX block.
   */
  edit: function edit(props) {
    var className = props.className,
        _props$attributes = props.attributes,
        attributes = _props$attributes === void 0 ? defaultAttributes : _props$attributes,
        setAttributes = props.setAttributes;

    function updateAttribute(field, value) {
      var attribute = {};
      attribute[field] = value;
      setAttributes(attribute);
    }

    return React.createElement(Fragment, null, React.createElement(InspectorControls, null, React.createElement(PanelBody, {
      title: __('Options')
    }, React.createElement(MediaUpload, {
      onSelect: function onSelect(image) {
        return updateAttribute('backgroundImage', image);
      },
      type: "image",
      value: attributes.backgroundImage,
      render: function render(_ref) {
        var open = _ref.open;
        return React.createElement(IconButton, {
          className: "button",
          label: __('Set background Image'),
          icon: "edit",
          onClick: open
        }, "Set background Image");
      }
    }))), React.createElement("div", {
      className: "".concat(className, " stampa-block")
    }, React.createElement("div", {
      className: "hero",
      style: {
        backgroundImage: "url(".concat(attributes.backgroundImage && attributes.backgroundImage.url, ")"),
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ',
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ',
        gridGap: '10px',
        height: '450px'
      }
    }, React.createElement("h2", {
      className: "stampa-field",
      style: {
        gridRowStart: 2,
        gridColumnStart: 2,
        gridRowEnd: 8,
        gridColumnEnd: 9
      }
    }, React.createElement("textarea", {
      type: "text",
      className: "stampa-field__height",
      value: attributes.heading,
      placeholder: "Title",
      onChange: function onChange(e) {
        return updateAttribute('heading', e.target.value);
      }
    })), React.createElement("div", {
      className: "stampa-field",
      style: {
        gridRowStart: 9,
        gridColumnStart: 2,
        gridRowEnd: 12,
        gridColumnEnd: 7
      }
    }, React.createElement(TextareaControl, {
      value: attributes.intro,
      placeholder: "Intro",
      onChange: function onChange(value) {
        return updateAttribute('intro', value);
      }
    })), React.createElement("div", {
      className: "stampa-field",
      style: {
        gridRowStart: 13,
        gridColumnStart: 2,
        gridRowEnd: 15,
        gridColumnEnd: 4
      }
    }, React.createElement(Button, {
      className: "stampa-field",
      style: {
        gridRowStart: 13,
        gridColumnStart: 2,
        gridRowEnd: 15,
        gridColumnEnd: 4
      },
      value: attributes.button,
      placeholder: "Button",
      onChange: function onChange(e) {
        return updateAttribute('button', e.target.value);
      }
    })))));
  },

  /**
   * Let the content to be rendered with PHP
   */
  save: function save() {
    return null;
  }
});
},{}],"blocks/another-one.js":[function(require,module,exports) {
/**
 * BLOCK: Another one
 *
 */
var __ = wp.i18n.__;
var registerBlockType = wp.blocks.registerBlockType;
var _wp$editor = wp.editor,
    InspectorControls = _wp$editor.InspectorControls,
    MediaUpload = _wp$editor.MediaUpload;
var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    IconButton = _wp$components.IconButton,
    TextareaControl = _wp$components.TextareaControl,
    Button = _wp$components.Button;
var _wp$element = wp.element,
    Fragment = _wp$element.Fragment,
    Component = _wp$element.Component; // Default attributes are set to avoid React throwing an error
// when start typeing something in the brew new added module

var defaultAttributes = {
  backgroundImage: {}
};
registerBlockType('stampa/another-one', {
  title: __('Another one'),
  icon: 'welcome-write-blog',
  category: 'stampa-blocks',
  keywords: [],
  multiple: true,
  attributes: {
    "backgroundImage": {
      "type": "object"
    },
    "heading": {
      "type": "string"
    },
    "text": {
      "type": "string"
    },
    "button": {
      "type": "string"
    }
  },

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {object} props Gutenberg props.
   * @return {JSX} JSX block.
   */
  edit: function edit(props) {
    var className = props.className,
        _props$attributes = props.attributes,
        attributes = _props$attributes === void 0 ? defaultAttributes : _props$attributes,
        setAttributes = props.setAttributes;

    function updateAttribute(field, value) {
      var attribute = {};
      attribute[field] = value;
      setAttributes(attribute);
    }

    return React.createElement(Fragment, null, React.createElement(InspectorControls, null, React.createElement(PanelBody, {
      title: __('Options')
    }, React.createElement(MediaUpload, {
      onSelect: function onSelect(image) {
        return updateAttribute('backgroundImage', image);
      },
      type: "image",
      value: attributes.backgroundImage,
      render: function render(_ref) {
        var open = _ref.open;
        return React.createElement(IconButton, {
          className: "button",
          label: __('Set background Image'),
          icon: "edit",
          onClick: open
        }, "Set background Image");
      }
    }))), React.createElement("div", {
      className: "".concat(className, " stampa-block")
    }, React.createElement("div", {
      className: "another-one",
      style: {
        backgroundImage: "url(".concat(attributes.backgroundImage && attributes.backgroundImage.url, ")"),
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ',
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ',
        gridGap: '5px',
        height: '460px'
      }
    }, React.createElement("h2", {
      className: "stampa-field",
      style: {
        gridRowStart: 2,
        gridColumnStart: 2,
        gridRowEnd: 3,
        gridColumnEnd: 9
      }
    }, React.createElement("textarea", {
      type: "text",
      className: "stampa-field__height",
      value: attributes.heading,
      placeholder: "Heading",
      onChange: function onChange(e) {
        return updateAttribute('heading', e.target.value);
      }
    })), React.createElement("div", {
      className: "stampa-field",
      style: {
        gridRowStart: 4,
        gridColumnStart: 2,
        gridRowEnd: 8,
        gridColumnEnd: 8
      }
    }, React.createElement(TextareaControl, {
      value: attributes.text,
      placeholder: "Write text...",
      onChange: function onChange(value) {
        return updateAttribute('text', value);
      }
    })), React.createElement("div", {
      className: "stampa-field",
      style: {
        gridRowStart: 9,
        gridColumnStart: 2,
        gridRowEnd: 10,
        gridColumnEnd: 5
      }
    }, React.createElement(Button, {
      className: "stampa-field",
      style: {
        gridRowStart: 9,
        gridColumnStart: 2,
        gridRowEnd: 10,
        gridColumnEnd: 5
      },
      value: attributes.button,
      placeholder: "Add text...",
      onChange: function onChange(e) {
        return updateAttribute('button', e.target.value);
      }
    })), React.createElement("div", {
      className: "stampa-field",
      style: {
        gridRowStart: 9,
        gridColumnStart: 6,
        gridRowEnd: 10,
        gridColumnEnd: 8
      }
    }, React.createElement(Button, {
      className: "stampa-field",
      style: {
        gridRowStart: 9,
        gridColumnStart: 6,
        gridRowEnd: 10,
        gridColumnEnd: 8
      },
      value: attributes.button,
      placeholder: "Add text...",
      onChange: function onChange(e) {
        return updateAttribute('button', e.target.value);
      }
    })))));
  },

  /**
   * Let the content to be rendered with PHP
   */
  save: function save() {
    return null;
  }
});
},{}],"index.js":[function(require,module,exports) {
"use strict";

require("./blocks/hero");

require("./blocks/another-one");
},{"./blocks/hero":"blocks/hero.js","./blocks/another-one":"blocks/another-one.js"}],"../../../../../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37819" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/index.js.map