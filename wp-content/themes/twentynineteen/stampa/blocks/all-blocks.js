/**
 * BLOCK: All blocks
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
  image: [
    {
      name: "fit",
      type: "select",
      label: 'Default value for "object-fit"',
      values: ["fill", "contain", "cover", "none", "scale-down"],
      value: "fill"
    },
    {
      name: "position",
      type: "select",
      label: 'Default value for "object-position"',
      values: [
        "initial",
        "left top",
        "left center",
        "left bottom",
        "center center",
        "right top",
        "right center",
        "right bottom"
      ],
      value: "initial"
    }
  ],
  container: [],
  image1: [
    {
      name: "fit",
      type: "select",
      label: 'Default value for "object-fit"',
      values: ["fill", "contain", "cover", "none", "scale-down"],
      value: "fill"
    },
    {
      name: "position",
      type: "select",
      label: 'Default value for "object-position"',
      values: [
        "initial",
        "left top",
        "left center",
        "left bottom",
        "center center",
        "right top",
        "right center",
        "right bottom"
      ],
      value: "initial"
    }
  ]
};
const fieldOptionsComponents = {
  select: SelectControl,
  checkbox: ToggleControl,
  text: TextControl
};
let focusedField;

registerBlockType("stampa/all-blocks", {
  title: __("All blocks"),
  icon: "lightbulb",
  category: "stampa-blocks",
  keywords: [],

  multiple: true,

  attributes: {
    backgroundImage: { type: "string" },
    image: { type: "object" },
    image__fit: { type: "string", default: "fill" },
    image__position: { type: "string", default: "initial" },
    image1: { type: "object" },
    image1__fit: { type: "string", default: "cover" },
    image1__position: { type: "string", default: "center center" }
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
        <div className={`${className} stampa-block all-blocks full-width`}>
          <div
            className="all-blocks"
            style={{
              backgroundImage: `url(${attributes.backgroundImage})`,
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
              className={`stampa-field stampa-field--image field--image ${
                focusedField == "image" ? "focused" : ""
              }`}
              style={{
                gridRowStart: 1,
                gridColumnStart: 1,
                gridRowEnd: 6,
                gridColumnEnd: 6
              }}
              onClick={() => updateFocusedField("image")}
            >
              <StampaMediaUpload
                fieldName="image"
                image={attributes.image}
                customClass=""
                attributes={attributes}
                updateAttribute={updateAttribute}
              />
            </div>
            {/* container */}
            <div
              className={`stampa-field stampa-field--container field--container ${
                focusedField == "container" ? "focused" : ""
              }`}
              style={{
                gridRowStart: 1,
                gridColumnStart: 1,
                gridRowEnd: 4,
                gridColumnEnd: 4
              }}
              onClick={() => updateFocusedField("container")}
            ></div>
            {/* image1 */}
            <div
              className={`stampa-field stampa-field--image field--image1 ${
                focusedField == "image1" ? "focused" : ""
              }`}
              style={{
                gridRowStart: 1,
                gridColumnStart: 1,
                gridRowEnd: 4,
                gridColumnEnd: 4
              }}
              onClick={() => updateFocusedField("image1")}
            >
              <StampaMediaUpload
                fieldName="image1"
                image={attributes.image1}
                customClass=""
                attributes={attributes}
                updateAttribute={updateAttribute}
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
