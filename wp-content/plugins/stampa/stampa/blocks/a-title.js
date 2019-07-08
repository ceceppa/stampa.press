/**
 * BLOCK: A title
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload, RichText } = wp.editor;
const {} = wp.components;
const { Fragment, Component } = wp.element;

// Default attributes are set to avoid React throwing an error
// when start typeing something in the brew new added module
const defaultAttributes = {};

registerBlockType("stampa/a-title", {
  title: __("A title"),
  icon: "welcome-write-blog",
  category: "stampa-blocks",
  keywords: [],

  multiple: true,

  attributes: { wysiwyg: { type: "string" }, wysiwyg1: { type: "string" } },

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
      <div className={`${className} stampa-block a-title`}>
        <div
          className="a-title"
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
            gridTemplateRows:
              "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
            gridGap: "5px",
            height: "690px"
          }}
        >
          {/* post-selector */}
          <StampaPostSelector>{/* post-title */}</StampaPostSelector>
          {/* wysiwyg */}
          <div
            className="stampa-field stampa-field--wysiwyg field--static-label"
            style={{
              gridRowStart: 1,
              gridColumnStart: 1,
              gridRowEnd: 2,
              gridColumnEnd: 5
            }}
          >
            <RichText
              placeholder="yet another field"
              value={attributes.static - label}
              onChange={value => updateAttribute("static-label", value)}
            />
          </div>
          {/* wysiwyg1 */}
          <div
            className="stampa-field stampa-field--wysiwyg field--static-label"
            style={{
              gridRowStart: 1,
              gridColumnStart: 1,
              gridRowEnd: 2,
              gridColumnEnd: 5
            }}
          >
            <RichText
              placeholder="yet another field"
              value={attributes.static - label}
              onChange={value => updateAttribute("static-label", value)}
            />
          </div>
          {/* container */}
          <div
            className="stampa-field container field--static-label"
            style={{
              gridRowStart: 1,
              gridColumnStart: 1,
              gridRowEnd: 2,
              gridColumnEnd: 5
            }}
          >
            {/* static-label */}
            <span
              className="stampa-field stampa-field--label field--static-label"
              style={{
                gridRowStart: 1,
                gridColumnStart: 1,
                gridRowEnd: 2,
                gridColumnEnd: 5
              }}
            >
              Label
            </span>
            {/* container2 */}
            <div
              className="stampa-field container field--static-label"
              style={{
                gridRowStart: 1,
                gridColumnStart: 1,
                gridRowEnd: 2,
                gridColumnEnd: 5
              }}
            >
              {/* static-image */}
              <div
                className="stampa-field field--static-label"
                style={{
                  gridRowStart: 1,
                  gridColumnStart: 1,
                  gridRowEnd: 2,
                  gridColumnEnd: 5
                }}
              ></div>
              {/* container3 */}
              <div
                className="stampa-field container field--static-label"
                style={{
                  gridRowStart: 1,
                  gridColumnStart: 1,
                  gridRowEnd: 2,
                  gridColumnEnd: 5
                }}
              >
                {/* container4 */}
                <div
                  className="stampa-field container field--static-label"
                  style={{
                    gridRowStart: 1,
                    gridColumnStart: 1,
                    gridRowEnd: 2,
                    gridColumnEnd: 5
                  }}
                >
                  {/* static-label */}
                  <span
                    className="stampa-field stampa-field--label field--static-label"
                    style={{
                      gridRowStart: 1,
                      gridColumnStart: 1,
                      gridRowEnd: 2,
                      gridColumnEnd: 5
                    }}
                  >
                    Label
                  </span>
                </div>
              </div>
            </div>
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
