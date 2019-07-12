/**
 * BLOCK: M01 - Hero
 *
 */
// Stampa Components
import { StampaMediaUpload } from "../components/stampa-components";

const useCallback = window.React.useCallback;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload } = wp.editor;
const {
  PanelBody,
  PanelRow,
  SelectControl,
  ToggleControl,
  TextControl,
  IconButton
} = wp.components;
const { Fragment, Component } = wp.element;

const allFieldsOptions = {
  heading: [
    {
      name: "level",
      type: "select",
      label: "Level",
      values: ["h1", "h2", "h3", "h4", "h5", "h6"],
      value: "h2"
    },
    {
      name: "placeholder",
      type: "text",
      label: "Placeholder",
      value: "Heading"
    }
  ],
  text: [
    {
      name: "placeholder",
      type: "text",
      label: "Placeholder",
      value: "Write text..."
    }
  ],
  button: [{ name: "link", type: "text", label: "URL", stampa: false }]
};
const fieldOptionsComponents = {
  select: SelectControl,
  checkbox: ToggleControl,
  text: TextControl
};
let focusedField;

registerBlockType("stampa/m01-hero", {
  title: __("M01 - Hero"),
  icon: "flag",
  category: "stampa-blocks",
  keywords: [],

  multiple: true,

  attributes: {
    backgroundImage: { type: "string" },
    heading: { type: "string" },
    heading__level: { type: "string", default: "h2" },
    heading__placeholder: { type: "string", default: "Heading" },
    text: { type: "string" },
    text__placeholder: { type: "string", default: "Write text..." },
    button: { type: "string" },
    button__link: { type: "string", default: "" }
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
    const { className, attributes = {}, setAttributes } = props;
    const fieldOptions = allFieldsOptions[focusedField];

    const updateAttribute = useCallback((field, value) => {
      const attribute = {};
      attribute[field] = value;

      setAttributes(attribute);
    });

    const updateFocusedField = useCallback(fieldName => {
      focusedField = fieldName;

      // We don't need this data to be saved by Gutenberg
      // but we want to trigger a re-render when focusedField changes.
      setAttributes({ __focused: fieldName });
    });

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__("Options")}>
            <MediaUpload
              onSelect={image => updateAttribute("backgroundImage", image.url)}
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
          {fieldOptions && (
            <PanelBody title={__("Options")} className="typed-panel-body">
              {fieldOptions.map(option => {
                const Component = fieldOptionsComponents[option.type];
                const attributeKey = `${focusedField}__${option.name}`;
                const values = option.values || [];

                return (
                  <PanelRow key={option.name}>
                    <Component
                      label={option.label}
                      value={attributes[attributeKey]}
                      options={
                        values.map &&
                        values.map(value => {
                          return {
                            label: value,
                            value
                          };
                        })
                      }
                      onChange={value => updateAttribute(attributeKey, value)}
                    />
                  </PanelRow>
                );
              })}
            </PanelBody>
          )}
        </InspectorControls>
        <div className={`${className} stampa-block m01d full-width`}>
          <div
            className="m01-hero"
            style={{
              backgroundImage: `url(${attributes.backgroundImage})`,
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
              gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
              gridGap: "5px",
              height: "414px"
            }}
          >
            {/* heading */}
            <div
              className={`stampa-field stampa-field--heading field--heading ${
                focusedField == "heading" ? "focused" : ""
              }`}
              style={{
                gridRowStart: 2,
                gridColumnStart: 2,
                gridRowEnd: 5,
                gridColumnEnd: 9
              }}
              onClick={() => updateFocusedField("heading")}
            >
              <h2>
                {" "}
                <textarea
                  type="text"
                  value={attributes.heading}
                  placeholder="Heading"
                  onChange={e => updateAttribute("heading", e.target.value)}
                />{" "}
              </h2>
            </div>
            {/* text */}
            <div
              className={`stampa-field stampa-field--text field--text ${
                focusedField == "text" ? "focused" : ""
              }`}
              style={{
                gridRowStart: 5,
                gridColumnStart: 2,
                gridRowEnd: 7,
                gridColumnEnd: 7
              }}
              onClick={() => updateFocusedField("text")}
            >
              <textarea
                value={attributes.text}
                placeholder="Write text..."
                onChange={e => updateAttribute("text", e.target.value)}
              />
            </div>
            {/* button */}
            <div
              className={`stampa-field stampa-field--button field--button ${
                focusedField == "button" ? "focused" : ""
              }`}
              style={{
                gridRowStart: 8,
                gridColumnStart: 2,
                gridRowEnd: 9,
                gridColumnEnd: 5
              }}
              onClick={() => updateFocusedField("button")}
            >
              <textarea
                className="button m01d__button"
                value={attributes.button}
                placeholder="LEARN MORE"
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
