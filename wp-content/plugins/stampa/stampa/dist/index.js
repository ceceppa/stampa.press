parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"rWO8":[function(require,module,exports) {
var e=wp.i18n.__,t=wp.blocks.registerBlockType,a=wp.editor,r=a.InspectorControls,l=a.MediaUpload,i=wp.components,n=i.IconButton,m=i.TextareaControl,c=wp.element,d=c.Fragment,o=c.Component,s={};t("stampa/m03-images-text",{title:e("M03 - Images + Text"),icon:"welcome-write-blog",category:"stampa-blocks",keywords:[],multiple:!0,attributes:{image1:{type:"object"},heading:{type:"string"},text:{type:"string"},image2:{type:"object"},image3:{type:"object"}},edit:function(t){var a=t.className,r=t.attributes,i=void 0===r?s:r,c=t.setAttributes;function d(e,t){var a={};a[e]=t,c(a)}return React.createElement("div",{className:"".concat(a," stampa-block")},React.createElement("div",{className:"m03-images-text",style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",gridTemplateRows:"1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",gridGap:"7px",height:"598px"}},React.createElement("div",{className:"stampa-field stampa-field--image ",style:{gridRowStart:1,gridColumnStart:1,gridRowEnd:9,gridColumnEnd:8}},React.createElement("img",{src:i.image1&&i.image1.url,className:"stampa-field__image"}),null==i.image1&&React.createElement("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"M0,0h24v24H0V0z",fill:"none"}),React.createElement("path",{d:"m19 5v14h-14v-14h14m0-2h-14c-1.1 0-2 0.9-2 2v14c0 1.1 0.9 2 2 2h14c1.1 0 2-0.9 2-2v-14c0-1.1-0.9-2-2-2z"}),React.createElement("path",{d:"m14.14 11.86l-3 3.87-2.14-2.59-3 3.86h12l-3.86-5.14z"})),React.createElement(l,{className:"media-upload",style:{gridRowStart:1,gridColumnStart:1,gridRowEnd:9,gridColumnEnd:8},value:i.image1,placeholder:"Write text...",onSelect:function(e){return d("image1",e)},render:function(t){var a=t.open;return React.createElement(n,{className:"button",label:e("Media"),icon:"media",onClick:a},"Select image")}})),React.createElement("h2",{className:"stampa-field stampa-field--heading",style:{gridRowStart:1,gridColumnStart:9,gridRowEnd:2,gridColumnEnd:15}},React.createElement("textarea",{type:"text",className:"stampa-field__height",value:i.heading,placeholder:"Heading",rows:"1",onChange:function(e){return d("heading",e.target.value)}})),React.createElement("div",{className:"stampa-field stampa-field--textarea",style:{gridRowStart:2,gridColumnStart:9,gridRowEnd:14,gridColumnEnd:15}},React.createElement(m,{value:i.text,placeholder:"Write text...",onChange:function(e){return d("text",e)}})),React.createElement("div",{className:"stampa-field stampa-field--image ",style:{gridRowStart:9,gridColumnStart:1,gridRowEnd:14,gridColumnEnd:5}},React.createElement("img",{src:i.image2&&i.image2.url,className:"stampa-field__image"}),null==i.image2&&React.createElement("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"M0,0h24v24H0V0z",fill:"none"}),React.createElement("path",{d:"m19 5v14h-14v-14h14m0-2h-14c-1.1 0-2 0.9-2 2v14c0 1.1 0.9 2 2 2h14c1.1 0 2-0.9 2-2v-14c0-1.1-0.9-2-2-2z"}),React.createElement("path",{d:"m14.14 11.86l-3 3.87-2.14-2.59-3 3.86h12l-3.86-5.14z"})),React.createElement(l,{className:"media-upload",style:{gridRowStart:9,gridColumnStart:1,gridRowEnd:14,gridColumnEnd:5},value:i.image2,placeholder:"Write text...",onSelect:function(e){return d("image2",e)},render:function(t){var a=t.open;return React.createElement(n,{className:"button",label:e("Media"),icon:"media",onClick:a},"Select image")}})),React.createElement("div",{className:"stampa-field stampa-field--image ",style:{gridRowStart:9,gridColumnStart:5,gridRowEnd:12,gridColumnEnd:8}},React.createElement("img",{src:i.image3&&i.image3.url,className:"stampa-field__image"}),null==i.image3&&React.createElement("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"M0,0h24v24H0V0z",fill:"none"}),React.createElement("path",{d:"m19 5v14h-14v-14h14m0-2h-14c-1.1 0-2 0.9-2 2v14c0 1.1 0.9 2 2 2h14c1.1 0 2-0.9 2-2v-14c0-1.1-0.9-2-2-2z"}),React.createElement("path",{d:"m14.14 11.86l-3 3.87-2.14-2.59-3 3.86h12l-3.86-5.14z"})),React.createElement(l,{className:"media-upload",style:{gridRowStart:9,gridColumnStart:5,gridRowEnd:12,gridColumnEnd:8},value:i.image3,placeholder:"Write text...",onSelect:function(e){return d("image3",e)},render:function(t){var a=t.open;return React.createElement(n,{className:"button",label:e("Media"),icon:"media",onClick:a},"Select image")}}))))},save:function(){return null}});
},{}],"BlM2":[function(require,module,exports) {
var e=wp.i18n.__,t=wp.blocks.registerBlockType,a=wp.editor,r=a.InspectorControls,n=a.MediaUpload,i=wp.components.TextareaControl,l=wp.element,d=l.Fragment,o=l.Component,m={};t("stampa/m04-text-image",{title:e("M04 - Text + Image"),icon:"welcome-write-blog",category:"stampa-blocks",keywords:[],multiple:!0,attributes:{image:{type:"object"},heading:{type:"string"},text:{type:"string"}},edit:function(t){var a=t.className,r=t.attributes,l=void 0===r?m:r,d=t.setAttributes;function o(e,t){var a={};a[e]=t,d(a)}return React.createElement("div",{className:"".concat(a," stampa-block")},React.createElement("div",{className:"m04-text-image",style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",gridTemplateRows:"1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",gridGap:"7px",height:"598px"}},React.createElement("div",{className:"stampa-field stampa-field--image ",style:{gridRowStart:1,gridColumnStart:8,gridRowEnd:9,gridColumnEnd:15}},React.createElement(n,{className:"media-upload",style:{gridRowStart:1,gridColumnStart:8,gridRowEnd:9,gridColumnEnd:15},value:l.image,placeholder:"Write text...",onSelect:function(e){return o("image",e)},render:function(t){var a=t.open;return React.createElement(IconButton,{className:"button",label:e("Media"),icon:"media",onClick:a},"Media")}})),React.createElement("h2",{className:"stampa-field",style:{gridRowStart:1,gridColumnStart:1,gridRowEnd:2,gridColumnEnd:7}},React.createElement("textarea",{type:"text",className:"stampa-field__height",value:l.heading,placeholder:"Heading",rows:"1",onChange:function(e){return o("heading",e.target.value)}})),React.createElement("div",{className:"stampa-field stampa-field--textarea",style:{gridRowStart:2,gridColumnStart:1,gridRowEnd:14,gridColumnEnd:7}},React.createElement(i,{value:l.text,placeholder:"Write text...",onChange:function(e){return o("text",e)}})),React.createElement("div",{className:"stampa-field stampa-field--image ",style:{gridRowStart:9,gridColumnStart:11,gridRowEnd:14,gridColumnEnd:15}},React.createElement(n,{className:"media-upload",style:{gridRowStart:9,gridColumnStart:11,gridRowEnd:14,gridColumnEnd:15},value:l.image,placeholder:"Write text...",onSelect:function(e){return o("image",e)},render:function(t){var a=t.open;return React.createElement(IconButton,{className:"button",label:e("Media"),icon:"media",onClick:a},"Media")}})),React.createElement("div",{className:"stampa-field stampa-field--image ",style:{gridRowStart:9,gridColumnStart:8,gridRowEnd:12,gridColumnEnd:11}},React.createElement(n,{className:"media-upload",style:{gridRowStart:9,gridColumnStart:8,gridRowEnd:12,gridColumnEnd:11},value:l.image,placeholder:"Write text...",onSelect:function(e){return o("image",e)},render:function(t){var a=t.open;return React.createElement(IconButton,{className:"button",label:e("Media"),icon:"media",onClick:a},"Media")}}))))},save:function(){return null}});
},{}],"kst3":[function(require,module,exports) {
function e(e){if(null==e)throw new TypeError("Cannot destructure undefined")}var t=wp.i18n.__,a=wp.blocks.registerBlockType,r=wp.editor,n=r.InspectorControls,i=r.MediaUpload,l=r.RichText;e(wp.components);var s=wp.element,o=s.Fragment,d=s.Component,c={};a("stampa/m02-paragraph",{title:t("M02 - Paragraph"),icon:"welcome-write-blog",category:"stampa-blocks",keywords:[],multiple:!0,attributes:{heading:{type:"string"},wysiwyg:{type:"string"}},edit:function(e){var t=e.className,a=e.attributes,r=void 0===a?c:a,n=e.setAttributes;function i(e,t){var a={};a[e]=t,n(a)}return React.createElement("div",{className:"".concat(t," stampa-block")},React.createElement("div",{className:"m02-paragraph",style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",gridTemplateRows:"1fr 1fr 1fr 1fr 1fr ",gridGap:"16px",height:"215px"}},React.createElement("h2",{className:"stampa-field stampa-field--heading",style:{gridRowStart:1,gridColumnStart:1,gridRowEnd:2,gridColumnEnd:13}},React.createElement("textarea",{type:"text",className:"stampa-field__height",value:r.heading,placeholder:"Heading",rows:"1",onChange:function(e){return i("heading",e.target.value)}})),React.createElement("div",{className:"stampa-field stampa-field--wysiwyg",style:{gridRowStart:2,gridColumnStart:1,gridRowEnd:6,gridColumnEnd:13}},React.createElement(l,{placeholder:"Write text...",value:r.wysiwyg,onChange:function(e){return i("wysiwyg",e)}}))))},save:function(){return null}});
},{}],"2HrY":[function(require,module,exports) {
function e(e){if(null==e)throw new TypeError("Cannot destructure undefined")}var t=wp.i18n.__,r=wp.blocks.registerBlockType,a=wp.editor,n=a.InspectorControls,i=a.MediaUpload;e(wp.components);var l=wp.element,o=l.Fragment,s=l.Component,c={};r("stampa/m00-title",{title:t("M00 - Title"),icon:"welcome-write-blog",category:"stampa-blocks",keywords:[],multiple:!0,attributes:{heading:{type:"string"}},edit:function(e){var t=e.className,r=e.attributes,a=void 0===r?c:r,n=e.setAttributes;return React.createElement("div",{className:"".concat(t," stampa-block")},React.createElement("div",{className:"m00-title",style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",gridTemplateRows:"1fr 1fr 1fr 1fr 1fr ",gridGap:"5px",height:"230px"}},React.createElement("h1",{className:"stampa-field",style:{gridRowStart:1,gridColumnStart:1,gridRowEnd:6,gridColumnEnd:13}},React.createElement("textarea",{type:"text",className:"stampa-field__height",value:a.heading,placeholder:"Heading",rows:"1",onChange:function(e){return t="heading",r=e.target.value,(a={})[t]=r,void n(a);var t,r,a}}))))},save:function(){return null}});
},{}],"07RD":[function(require,module,exports) {
var e=wp.i18n.__,t=wp.blocks.registerBlockType,a=wp.editor,r=a.InspectorControls,n=a.MediaUpload,o=wp.components,l=o.Button,c=o.PanelBody,i=o.IconButton,m=wp.element,d=m.Fragment,u=m.Component,g={backgroundImage:{}};t("stampa/m01-banner",{title:e("M01 - Banner"),icon:"welcome-write-blog",category:"stampa-blocks",keywords:[],multiple:!0,attributes:{backgroundImage:{type:"object"},button:{type:"string"}},edit:function(t){var a=t.className,o=t.attributes,m=void 0===o?g:o,u=t.setAttributes;function s(e,t){var a={};a[e]=t,u(a)}return React.createElement(d,null,React.createElement(r,null,React.createElement(c,{title:e("Options")},React.createElement(n,{onSelect:function(e){return s("backgroundImage",e)},type:"image",value:m.backgroundImage,render:function(t){var a=t.open;return React.createElement(i,{className:"button",label:e("Set background Image"),icon:"edit",onClick:a},"Set background Image")}}))),React.createElement("div",{className:"".concat(a," stampa-block")},React.createElement("div",{className:"m01-banner",style:{backgroundImage:"url(".concat(m.backgroundImage&&m.backgroundImage.url,")"),display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",gridTemplateRows:"1fr 1fr 1fr 1fr 1fr ",gridGap:"5px",height:"230px"}},React.createElement("div",{className:"stampa-field",style:{gridRowStart:3,gridColumnStart:4,gridRowEnd:4,gridColumnEnd:9}},React.createElement(l,{className:"stampa-field",style:{gridRowStart:3,gridColumnStart:4,gridRowEnd:4,gridColumnEnd:9},value:m.button,placeholder:"Add text...",onChange:function(e){return s("button",e.target.value)}})))))},save:function(){return null}});
},{}],"5klU":[function(require,module,exports) {
var e=wp.i18n.__,t=wp.blocks.registerBlockType,a=wp.editor,r=a.InspectorControls,n=a.MediaUpload,l=a.RichText,i=wp.components.Button,d=wp.element,o=d.Fragment,m=d.Component,s={};t("stampa/m05-block",{title:e("M05 - Block"),icon:"welcome-write-blog",category:"stampa-blocks",keywords:[],multiple:!0,attributes:{heading:{type:"string"},wysiwyg:{type:"string"},image:{type:"object"},rectangle:{type:"string"},button:{type:"string"},"static-image":{type:"string"}},edit:function(t){var a=t.className,r=t.attributes,d=void 0===r?s:r,o=t.setAttributes;function m(e,t){var a={};a[e]=t,o(a)}return React.createElement("div",{className:"".concat(a," stampa-block")},React.createElement("div",{className:"m05-block",style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",gridTemplateRows:"1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",gridGap:"0px",height:"1150px"}},React.createElement("h2",{className:"stampa-field",style:{gridRowStart:4,gridColumnStart:4,gridRowEnd:5,gridColumnEnd:20}},React.createElement("textarea",{type:"text",className:"stampa-field__height",value:d.heading,placeholder:"Heading",rows:"1",onChange:function(e){return m("heading",e.target.value)}})),React.createElement("div",{className:"stampa-field stampa-field--textarea",style:{gridRowStart:6,gridColumnStart:2,gridRowEnd:10,gridColumnEnd:22}},React.createElement(l,{placeholder:"Write text...",value:d.wysiwyg,onChange:function(e){return m("wysiwyg",e)}})),React.createElement("div",{className:"stampa-field stampa-field--image ",style:{gridRowStart:11,gridColumnStart:11,gridRowEnd:24,gridColumnEnd:22}},React.createElement(n,{className:"media-upload",style:{gridRowStart:11,gridColumnStart:11,gridRowEnd:24,gridColumnEnd:22},value:d.image,placeholder:"Write text...",onSelect:function(e){return m("image",e)},render:function(t){var a=t.open;return React.createElement(IconButton,{className:"button",label:e("Media"),icon:"media",onClick:a},"Media")}})),React.createElement("div",{className:"stampa-field",style:{gridRowStart:11,gridColumnStart:2,gridRowEnd:24,gridColumnEnd:11}}),React.createElement("h3",{className:"stampa-field",style:{gridRowStart:12,gridColumnStart:3,gridRowEnd:13,gridColumnEnd:10}},React.createElement("textarea",{type:"text",className:"stampa-field__height",value:d.heading,placeholder:"Heading",rows:"1",onChange:function(e){return m("heading",e.target.value)}})),React.createElement("h4",{className:"stampa-field",style:{gridRowStart:13,gridColumnStart:3,gridRowEnd:14,gridColumnEnd:10}},React.createElement("textarea",{type:"text",className:"stampa-field__height",value:d.heading,placeholder:"Heading",rows:"1",onChange:function(e){return m("heading",e.target.value)}})),React.createElement("div",{className:"stampa-field stampa-field--textarea",style:{gridRowStart:15,gridColumnStart:3,gridRowEnd:20,gridColumnEnd:10}},React.createElement(l,{placeholder:"Write text...",value:d.wysiwyg,onChange:function(e){return m("wysiwyg",e)}})),React.createElement("div",{className:"stampa-field",style:{gridRowStart:20,gridColumnStart:3,gridRowEnd:21,gridColumnEnd:6}},React.createElement(i,{className:"stampa-field",style:{gridRowStart:20,gridColumnStart:3,gridRowEnd:21,gridColumnEnd:6},value:d.button,placeholder:"Add text...",onChange:function(e){return m("button",e.target.value)}})),React.createElement("div",{className:"stampa-field",style:{gridRowStart:22,gridColumnStart:3,gridRowEnd:23,gridColumnEnd:4}}),React.createElement("div",{className:"stampa-field",style:{gridRowStart:11,gridColumnStart:21,gridRowEnd:12,gridColumnEnd:22}})))},save:function(){return null}});
},{}],"Focm":[function(require,module,exports) {
"use strict";require("./blocks/m03-images-text"),require("./blocks/m04-text-image"),require("./blocks/m02-paragraph"),require("./blocks/m00-title"),require("./blocks/m01-banner"),require("./blocks/m05-block");
},{"./blocks/m03-images-text":"rWO8","./blocks/m04-text-image":"BlM2","./blocks/m02-paragraph":"kst3","./blocks/m00-title":"2HrY","./blocks/m01-banner":"07RD","./blocks/m05-block":"5klU"}]},{},["Focm"], null)
//# sourceMappingURL=/index.js.map