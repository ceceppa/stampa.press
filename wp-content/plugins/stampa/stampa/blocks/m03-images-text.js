/**
 * BLOCK: M03 - Images + Text
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload } = wp.editor;
const { IconButton, TextareaControl } = wp.components;
const { Fragment, Component } = wp.element;

// Default attributes are set to avoid React throwing an error
// when start typeing something in the brew new added module
const defaultAttributes = {};

registerBlockType("stampa/m03-images-text", {
  title: __("M03 - Images + Text"),
  icon: "welcome-write-blog",
  category: "stampa-blocks",
  keywords: [],

  multiple: true,

  attributes: {
    image1: { type: "object" },
    heading: { type: "string" },
    text: { type: "string" },
    image2: { type: "object" },
    image3: { type: "object" }
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
          className="m03-images-text"
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
            gridTemplateRows:
              "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
            gridGap: "7px",
            height: "598px"
          }}
        >
          {/* image1 */}
          <div
            className="stampa-field stampa-field--image "
            style={{
              gridRowStart: 1,
              gridColumnStart: 1,
              gridRowEnd: 9,
              gridColumnEnd: 8
            }}
          >
            <img
              src={attributes.image1 && attributes.image1.url}
              className="stampa-field__image"
            />
            {attributes.image1 == null && (
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
                gridRowStart: 1,
                gridColumnStart: 1,
                gridRowEnd: 9,
                gridColumnEnd: 8
              }}
              value={attributes.image1}
              placeholder="Write text..."
              onSelect={image => updateAttribute("image1", image)}
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
          {/* heading */}
          <h2
            className="stampa-field stampa-field--heading"
            style={{
              gridRowStart: 1,
              gridColumnStart: 9,
              gridRowEnd: 2,
              gridColumnEnd: 15
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
          {/* text */}
          <div
            className="stampa-field stampa-field--textarea"
            style={{
              gridRowStart: 2,
              gridColumnStart: 9,
              gridRowEnd: 14,
              gridColumnEnd: 15
            }}
          >
            <TextareaControl
              value={attributes.text}
              placeholder="Write text..."
              onChange={value => updateAttribute("text", value)}
            />
          </div>
          {/* image2 */}
          <div
            className="stampa-field stampa-field--image "
            style={{
              gridRowStart: 9,
              gridColumnStart: 1,
              gridRowEnd: 14,
              gridColumnEnd: 5
            }}
          >
            <img
              src={attributes.image2 && attributes.image2.url}
              className="stampa-field__image"
            />
            {attributes.image2 == null && (
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
                gridRowStart: 9,
                gridColumnStart: 1,
                gridRowEnd: 14,
                gridColumnEnd: 5
              }}
              value={attributes.image2}
              placeholder="Write text..."
              onSelect={image => updateAttribute("image2", image)}
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
          {/* image3 */}
          <div
            className="stampa-field stampa-field--image "
            style={{
              gridRowStart: 9,
              gridColumnStart: 5,
              gridRowEnd: 12,
              gridColumnEnd: 8
            }}
          >
            <img
              src={attributes.image3 && attributes.image3.url}
              className="stampa-field__image"
            />
            {attributes.image3 == null && (
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
                gridRowStart: 9,
                gridColumnStart: 5,
                gridRowEnd: 12,
                gridColumnEnd: 8
              }}
              value={attributes.image3}
              placeholder="Write text..."
              onSelect={image => updateAttribute("image3", image)}
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
        </div>
      </div>
    );
  },

  /**
   * Let the content to be rendered with PHP
   */
  save: () => null
});
