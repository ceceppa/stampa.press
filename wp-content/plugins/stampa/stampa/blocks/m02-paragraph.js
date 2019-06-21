/**
 * BLOCK: M02 - Paragraph
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload } = wp.editor;
const { Paragraph, PanelBody, IconButton } = wp.components;
const { Fragment, Component } = wp.element;

// Default attributes are set to avoid React throwing an error
// when start typeing something in the brew new added module
const defaultAttributes = {
  backgroundImage: {}
};

registerBlockType("stampa/m02-paragraph", {
  title: __("M02 - Paragraph"),
  icon: "welcome-write-blog",
  category: "stampa-blocks",
  keywords: [],

  multiple: true,

  attributes: {
    backgroundImage: { type: "object" },
    heading: { type: "string" },
    wysiwyg: { type: "string" }
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
            className="m02-paragraph"
            style={{
              backgroundImage: `url(${attributes.backgroundImage &&
                attributes.backgroundImage.url})`,
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
              gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr ",
              gridGap: "16px",
              height: "258px"
            }}
          >
            {/* heading */}
            <h2
              className="stampa-field"
              style={{
                gridRowStart: 2,
                gridColumnStart: 3,
                gridRowEnd: 3,
                gridColumnEnd: 11
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
            <RichText
              gridArea={{ gridArea }}
              value={fieldName}
              onChange={value => updateAttribute("wysiwyg", value)}
            />
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
