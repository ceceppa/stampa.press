/**
 * BLOCK: M05 - Block
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload, RichText } = wp.editor;
const { IconButton, Button } = wp.components;
const { Fragment, Component } = wp.element;

// Default attributes are set to avoid React throwing an error
// when start typeing something in the brew new added module
const defaultAttributes = {};

registerBlockType("stampa/m05-block", {
  title: __("M05 - Block"),
  icon: "welcome-write-blog",
  category: "stampa-blocks",
  keywords: [],

  multiple: true,

  attributes: {
    heading: { type: "string" },
    wysiwyg: { type: "string" },
    image: { type: "object" },
    rectangle: { type: "string" },
    button: { type: "string" },
    "static-image": { type: "string" }
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
  edit: function(props) {
    const { className, attributes = defaultAttributes, setAttributes } = props;

    function updateAttribute(field, value) {
      const attribute = {};
      attribute[field] = value;

      setAttributes(attribute);
    }

    return (
      <div className={`${className} stampa-block`}>
        <div
          className="m05-block"
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
            gridTemplateRows:
              "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
            gridGap: "0px",
            height: "1150px"
          }}
        >
          {/* heading */}
          <h2
            className="stampa-field stampa-field--heading"
            style={{
              gridRowStart: 4,
              gridColumnStart: 4,
              gridRowEnd: 5,
              gridColumnEnd: 20
            }}
          >
            <textarea
              type="text"
              className="stampa-field__height"
              value={attributes.heading}
              placeholder="Heading"
              rows="1"
              onChange={e => updateAttribute("heading", e.target.value)}
            />
          </h2>
          {/* wysiwyg */}
          <div
            className="stampa-field stampa-field--wysiwyg"
            style={{
              gridRowStart: 6,
              gridColumnStart: 2,
              gridRowEnd: 10,
              gridColumnEnd: 22
            }}
          >
            <RichText
              placeholder="Write text..."
              value={attributes.wysiwyg}
              onChange={value => updateAttribute("wysiwyg", value)}
            />
          </div>
          {/* image */}
          <div
            className="stampa-field stampa-field--image "
            style={{
              gridRowStart: 11,
              gridColumnStart: 11,
              gridRowEnd: 24,
              gridColumnEnd: 22
            }}
          >
            <img
              src={attributes.image && attributes.image.url}
              className="stampa-field__image"
            />
            {attributes.image == null && (
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M0,0h24v24H0V0z" fill="none"></path>
                <path d="m19 5v14h-14v-14h14m0-2h-14c-1.1 0-2 0.9-2 2v14c0 1.1 0.9 2 2 2h14c1.1 0 2-0.9 2-2v-14c0-1.1-0.9-2-2-2z"></path>
                <path d="m14.14 11.86l-3 3.87-2.14-2.59-3 3.86h12l-3.86-5.14z"></path>
              </svg>
            )}
            <MediaUpload
              className="media-upload"
              style={{
                gridRowStart: 11,
                gridColumnStart: 11,
                gridRowEnd: 24,
                gridColumnEnd: 22
              }}
              value={attributes.image}
              placeholder="Write text..."
              onSelect={image => updateAttribute("image", image)}
              render={({ open }) => (
                <IconButton
                  className="button"
                  label={__("Media")}
                  icon="media"
                  onClick={open}
                >
                  Select image
                </IconButton>
              )}
            />
          </div>
          {/* rectangle */}
          <div
            className="stampa-field"
            style={{
              gridRowStart: 11,
              gridColumnStart: 2,
              gridRowEnd: 24,
              gridColumnEnd: 11
            }}
          ></div>
          {/* heading */}
          <h3
            className="stampa-field stampa-field--heading"
            style={{
              gridRowStart: 12,
              gridColumnStart: 3,
              gridRowEnd: 13,
              gridColumnEnd: 10
            }}
          >
            <textarea
              type="text"
              className="stampa-field__height"
              value={attributes.heading}
              placeholder="Heading"
              rows="1"
              onChange={e => updateAttribute("heading", e.target.value)}
            />
          </h3>
          {/* heading */}
          <h4
            className="stampa-field stampa-field--heading"
            style={{
              gridRowStart: 13,
              gridColumnStart: 3,
              gridRowEnd: 14,
              gridColumnEnd: 10
            }}
          >
            <textarea
              type="text"
              className="stampa-field__height"
              value={attributes.heading}
              placeholder="Heading"
              rows="1"
              onChange={e => updateAttribute("heading", e.target.value)}
            />
          </h4>
          {/* wysiwyg */}
          <div
            className="stampa-field stampa-field--wysiwyg"
            style={{
              gridRowStart: 15,
              gridColumnStart: 3,
              gridRowEnd: 20,
              gridColumnEnd: 10
            }}
          >
            <RichText
              placeholder="Write text..."
              value={attributes.wysiwyg}
              onChange={value => updateAttribute("wysiwyg", value)}
            />
          </div>
          {/* button */}
          <div
            className="stampa-field"
            style={{
              gridRowStart: 20,
              gridColumnStart: 3,
              gridRowEnd: 21,
              gridColumnEnd: 6
            }}
          >
            <Button
              className="stampa-field"
              style={{
                gridRowStart: 20,
                gridColumnStart: 3,
                gridRowEnd: 21,
                gridColumnEnd: 6
              }}
              value={attributes.button}
              placeholder="Add text..."
              onChange={e => updateAttribute("button", e.target.value)}
            />
          </div>
          {/* static-image */}
          <div
            className="stampa-field"
            style={{
              gridRowStart: 22,
              gridColumnStart: 3,
              gridRowEnd: 23,
              gridColumnEnd: 4
            }}
          ></div>
          {/* static-image */}
          <div
            className="stampa-field"
            style={{
              gridRowStart: 11,
              gridColumnStart: 21,
              gridRowEnd: 12,
              gridColumnEnd: 22
            }}
          ></div>
        </div>
      </div>
    );
  },

  /**
   * Let the content to be rendered with PHP
   */
  save: () => null
});
