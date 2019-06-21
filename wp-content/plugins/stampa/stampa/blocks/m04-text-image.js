/**
 * BLOCK: M04 - Text + Image
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload } = wp.editor;
const { TextareaControl, PanelBody, IconButton } = wp.components;
const { Fragment, Component } = wp.element;

// Default attributes are set to avoid React throwing an error
// when start typeing something in the brew new added module
const defaultAttributes = {
  backgroundImage: {}
};

registerBlockType("stampa/m04-text-image", {
  title: __("M04 - Text + Image"),
  icon: "welcome-write-blog",
  category: "stampa-blocks",
  keywords: [],

  multiple: true,

  attributes: {
    backgroundImage: { type: "object" },
    image: { type: "object" },
    heading: { type: "string" },
    text: { type: "string" }
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
      <Fragment>
        <InspectorControls>
          <PanelBody title={__("Options")}>
            <MediaUpload
              onSelect={image => updateAttribute("backgroundImage", image)}
              type="image"
              value={attributes.backgroundImage}
              render={({ open }) => (
                <IconButton
                  className="button"
                  label={__("Set background Image")}
                  icon="edit"
                  onClick={open}
                >
                  Set background Image
                </IconButton>
              )}
            />
          </PanelBody>
        </InspectorControls>
        <div className={`${className} stampa-block`}>
          <div
            className="m04-text-image"
            style={{
              backgroundImage: `url(${attributes.backgroundImage &&
                attributes.backgroundImage.url})`,
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
              gridTemplateRows:
                "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
              gridGap: "7px",
              height: "598px"
            }}
          >
            {/* image */}
            <div
              className="stampa-field stampa-field--image "
              style={{
                gridRowStart: 1,
                gridColumnStart: 8,
                gridRowEnd: 9,
                gridColumnEnd: 15
              }}
            >
              <MediaUpload
                className="media-upload"
                style={{
                  gridRowStart: 1,
                  gridColumnStart: 8,
                  gridRowEnd: 9,
                  gridColumnEnd: 15
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
                    Media
                  </IconButton>
                )}
              />
            </div>
            {/* heading */}
            <h2
              className="stampa-field"
              style={{
                gridRowStart: 1,
                gridColumnStart: 1,
                gridRowEnd: 2,
                gridColumnEnd: 7
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
                gridColumnStart: 1,
                gridRowEnd: 14,
                gridColumnEnd: 7
              }}
            >
              <TextareaControl
                value={attributes.text}
                placeholder="Write text..."
                onChange={value => updateAttribute("text", value)}
              />
            </div>
            {/* image */}
            <div
              className="stampa-field stampa-field--image "
              style={{
                gridRowStart: 9,
                gridColumnStart: 11,
                gridRowEnd: 14,
                gridColumnEnd: 15
              }}
            >
              <MediaUpload
                className="media-upload"
                style={{
                  gridRowStart: 9,
                  gridColumnStart: 11,
                  gridRowEnd: 14,
                  gridColumnEnd: 15
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
                    Media
                  </IconButton>
                )}
              />
            </div>
            {/* image */}
            <div
              className="stampa-field stampa-field--image "
              style={{
                gridRowStart: 9,
                gridColumnStart: 8,
                gridRowEnd: 12,
                gridColumnEnd: 11
              }}
            >
              <MediaUpload
                className="media-upload"
                style={{
                  gridRowStart: 9,
                  gridColumnStart: 8,
                  gridRowEnd: 12,
                  gridColumnEnd: 11
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
                    Media
                  </IconButton>
                )}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  },

  /**
   * Let the content to be rendered with PHP
   */
  save: () => null
});
