/**
 * BLOCK: M01 - Banner
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload } = wp.editor;
const { Button, PanelBody, IconButton } = wp.components;
const { Fragment, Component } = wp.element;

// Default attributes are set to avoid React throwing an error
// when start typeing something in the brew new added module
const defaultAttributes = {
  backgroundImage: {}
};

registerBlockType("stampa/m01-banner", {
  title: __("M01 - Banner"),
  icon: "welcome-write-blog",
  category: "stampa-blocks",
  keywords: [],

  multiple: true,

  attributes: {
    backgroundImage: { type: "object" },
    button: { type: "string" }
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
            className="m01-banner"
            style={{
              backgroundImage: `url(${attributes.backgroundImage &&
                attributes.backgroundImage.url})`,
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
              gridTemplateRows: "1fr 1fr 1fr 1fr 1fr ",
              gridGap: "5px",
              height: "230px"
            }}
          >
            {/* button */}
            <div
              className="stampa-field"
              style={{
                gridRowStart: 3,
                gridColumnStart: 4,
                gridRowEnd: 4,
                gridColumnEnd: 9
              }}
            >
              <Button
                className="stampa-field"
                style={{
                  gridRowStart: 3,
                  gridColumnStart: 4,
                  gridRowEnd: 4,
                  gridColumnEnd: 9
                }}
                value={attributes.button}
                placeholder="Add text..."
                onChange={e => updateAttribute("button", e.target.value)}
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
