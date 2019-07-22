/**
 * BLOCK: Test image new
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
  TextControl
} = wp.components;
const { Fragment, Component } = wp.element;

const allFieldsOptions = {
  container: [],
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
  ]
};
const fieldOptionsComponents = {
  select: SelectControl,
  checkbox: ToggleControl,
  text: TextControl
};
let focusedField;

registerBlockType("stampa/test-image-new", {
  title: __("Test image new"),
  icon: "controls-repeat",
  category: "stampa-blocks",
  keywords: [],

  multiple: true,

  attributes: {
    image: { type: "object", default: null },
    image__fit: { type: "string", default: "fill" },
    image__position: { type: "string", default: "initial" }
  },

  edit({ className, attributes = {}, setAttributes }) {
    const fieldOptions = allFieldsOptions[focusedField];

    const updateAttribute = useCallback((field, value) => {
      const attribute = {};
      attribute[field] = value;

      setAttributes(attribute);
    });

    const updateFocusedField = useCallback((e, fieldName) => {
      if (fieldName.length) {
        e.stopPropagation();
      }

      focusedField = fieldName;

      setAttributes({ __focused: fieldName });
    });

    return (
      <Fragment>
        <InspectorControls>
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
        <div className={`${className} stampa-block test-image-new`}>
          <div
            className="test-image-new"
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
              gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
              gridGap: "5px",
              height: "322px"
            }}
          >
            {/* container */}
            <div
              className={`stampa-field stampa-field--container test-image-new__container ${
                focusedField == "container" ? "focused" : ""
              }`}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                gridTemplateRows: "1fr 1fr 1fr 1fr 1fr",
                gridGap: "5px",
                gridRowStart: 2,
                gridColumnStart: 4,
                gridRowEnd: 6,
                gridColumnEnd: 10
              }}
              onClick={e => updateFocusedField(e, "container")}
            >
              {/* image */}
              <div
                className={`stampa-field stampa-field--image test-image-new__image ${
                  focusedField == "image" ? "focused" : ""
                }`}
                style={{
                  gridRowStart: 1,
                  gridColumnStart: 1,
                  gridRowEnd: 5,
                  gridColumnEnd: 5
                }}
                onClick={e => updateFocusedField(e, "image")}
              >
                <StampaMediaUpload
                  fieldName="image"
                  image={attributes.image}
                  customClass=""
                  attributes={attributes}
                  updateAttribute={updateAttribute}
                  updateFocusedField={updateFocusedField}
                />
              </div>
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
