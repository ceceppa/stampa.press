/**
 * BLOCK: Quote + Image
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

registerBlockType("stampa/quote-image", {
  title: __("Quote + Image"),
  icon: "welcome-write-blog",
  category: "stampa-blocks",
  keywords: [],

  multiple: true,

  attributes: {
    backgroundImage: { type: "object" },
    quote: { type: "string" },
    author: { type: "string" },
    image: { type: "object" }
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
            className="quote-image"
            style={{
              backgroundImage: `url(${attributes.backgroundImage &&
                attributes.backgroundImage.url})`,
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
              gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
              gridGap: "5px",
              height: "336px"
            }}
          >
            {/* quote */}
            <div
              className="stampa-field stampa-field--textarea"
              style={{
                gridRowStart: 2,
                gridColumnStart: 2,
                gridRowEnd: 6,
                gridColumnEnd: 8
              }}
            >
              <TextareaControl
                value={attributes.quote}
                placeholder="Quote"
                onChange={value => updateAttribute("quote", value)}
              />
            </div>
            {/* author */}
            <div
              className="stampa-field stampa-field--textarea"
              style={{
                gridRowStart: 7,
                gridColumnStart: 2,
                gridRowEnd: 8,
                gridColumnEnd: 8
              }}
            >
              <TextareaControl
                value={attributes.author}
                placeholder="The author"
                onChange={value => updateAttribute("author", value)}
              />
            </div>
            {/* image */}
            <div
              className="stampa-field stampa-field--image round"
              style={{
                gridRowStart: 2,
                gridColumnStart: 9,
                gridRowEnd: 6,
                gridColumnEnd: 11
              }}
            >
              <MediaUpload
                className="media-upload"
                style={{
                  gridRowStart: 2,
                  gridColumnStart: 9,
                  gridRowEnd: 6,
                  gridColumnEnd: 11
                }}
                value={attributes.image}
                placeholder="The author"
                onChange={image => updateAttribute("image", image)}
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
