/**
 * BLOCK: Test image
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload } = wp.editor;
const { IconButton } = wp.components;
const { Fragment, Component } = wp.element;

// Default attributes are set to avoid React throwing an error
// when start typeing something in the brew new added module
const defaultAttributes = {};

registerBlockType("stampa/test-image", {
  title: __("Test image"),
  icon: "welcome-write-blog",
  category: "stampa-blocks",
  keywords: [],

  multiple: true,

  attributes: { image: { type: "object" } },

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
      <div className={`${className} stampa-block test-image`}>
        <div
          className="test-image"
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
            gridTemplateRows: "1fr 1fr 1fr 1fr 1fr ",
            gridGap: "5px",
            height: "230px"
          }}
        >
          {/* image */}
          <div
            className="stampa-field stampa-field--image field--image "
            style={{
              gridRowStart: 1,
              gridColumnStart: 1,
              gridRowEnd: 6,
              gridColumnEnd: 6
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
                gridRowStart: 1,
                gridColumnStart: 1,
                gridRowEnd: 6,
                gridColumnEnd: 6
              }}
              value={attributes.image}
              placeholder="{{stampa.value.placeholder}}"
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
        </div>
      </div>
    );
  },

  /**
   * Let the content to be rendered with PHP
   */
  save: () => null
});
