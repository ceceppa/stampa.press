/**
 * BLOCK: Test repeater
 *
 */
// Stampa Components
import {
  ClassicEdit,
  StampaMediaUpload,
  StampaImageOption
} from "../stampa-components";

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
const { Fragment } = wp.element;

const allFieldsOptions = {
  repeater: [
    { name: "label", type: "label", label: "Number of items" },
    { name: "min", type: "number", label: "Min", value: 1 },
    { name: "max", type: "number", label: "Max", value: -1 },
    { name: "style", type: "label", label: "Container style" },
    {
      name: "type",
      type: "select",
      label: "Type",
      value: "flex",
      values: ["flex", "grid"]
    },
    {
      name: "flexWidth",
      type: "number",
      label: "Child width (%)",
      value: 100,
      suffix: "%",
      if: { option: "type", equals: "flex" }
    },
    {
      name: "flexWrap",
      type: "checkbox",
      label: "flex-wrap",
      value: "wrap",
      checked: "false",
      if: { option: "type", equals: "flex" }
    }
  ],
  container: [],
  button: [{ name: "link", type: "text", label: "URL", stampa: "false" }],
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
  text: TextControl,
  image: StampaImageOption
};
let focusedField;

registerBlockType("stampa/test-repeater", {
  title: __("Test repeater"),
  icon: "welcome-write-blog",
  category: "stampa-blocks",
  keywords: [],

  multiple: true,

  attributes: {
    repeater: { type: "array", default: "" },
    repeater__label: { type: "string", default: "" },
    repeater__min: { type: "string", default: 1 },
    repeater__max: { type: "string", default: -1 },
    repeater__style: { type: "string", default: "" },
    repeater__type: { type: "string", default: "flex" },
    repeater__flexWidth: { type: "string", default: "33" },
    repeater__flexWrap: { type: "string", default: "" },
    button: { type: "string", default: "" },
    button__link: { type: "string", default: "" },
    image: { type: "object", default: "" },
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
          {fieldOptions && fieldOptions.length > 0 && (
            <PanelBody title={__("Options")} className="typed-panel-body">
              {fieldOptions.map(option => {
                const Component = fieldOptionsComponents[option.type];
                const attributeKey = `${focusedField}__${option.name}`;
                const values = option.values || [];

                return (
                  Component && (
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
                        onChange={(value, subkey) =>
                          updateAttribute(attributeKey, value, subkey)
                        }
                      />
                    </PanelRow>
                  )
                );
              })}
            </PanelBody>
          )}
        </InspectorControls>
        <div className={`${className} stampa-block test-repeater`}>
          <div
            className="test-repeater"
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
              gridTemplateRows: "46px 46px 46px 46px 46px ",
              gridGap: "5px"
            }}
          >
            {/* repeater */}
            <div
              className={`stampa-field stampa-field--repeater test-repeater__repeater ${
                focusedField == "repeater" ? "focused" : ""
              }`}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                gridTemplateRows: "36.8px 36.8px 36.8px 36.8px 36.8px",
                gridGap: "5px",
                gridRowStart: 2,
                gridColumnStart: 3,
                gridRowEnd: 6,
                gridColumnEnd: 10
              }}
              onClick={e => updateFocusedField(e, "repeater")}
            >
              <RepeaterField
                fieldName="repeater"
                image={attributes.repeater}
                attributes={attributes}
                updateAttribute={updateAttribute}
                updateFocusedField={updateFocusedField}
              >
                {/* container */}
                <div
                  className={`stampa-field stampa-field--container test-repeater__container ${
                    focusedField == "container" ? "focused" : ""
                  }`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gridTemplateRows: "46px 46px 46px",
                    gridGap: "5px",
                    gridRowStart: 3,
                    gridColumnStart: 2,
                    gridRowEnd: 6,
                    gridColumnEnd: 5
                  }}
                  onClick={e => updateFocusedField(e, "container")}
                >
                  {/* button */}
                  <div
                    className={`stampa-field stampa-field--button test-repeater__button ${
                      focusedField == "button" ? "focused" : ""
                    }`}
                    style={{
                      gridRowStart: 3,
                      gridColumnStart: 1,
                      gridRowEnd: 4,
                      gridColumnEnd: 3
                    }}
                    onClick={e => updateFocusedField(e, "button")}
                    title="button"
                  >
                    <textarea
                      className="button test-repeater__button"
                      value={attributes.button}
                      placeholder="Link"
                      onChange={e => updateAttribute("button", e.target.value)}
                    />
                  </div>
                  {/* image */}
                  <div
                    className={`stampa-field stampa-field--image test-repeater__image ${
                      focusedField == "image" ? "focused" : ""
                    }`}
                    style={{
                      gridRowStart: 1,
                      gridColumnStart: 1,
                      gridRowEnd: 3,
                      gridColumnEnd: 3
                    }}
                    onClick={e => updateFocusedField(e, "image")}
                    title="image"
                  >
                    <StampaMediaUpload
                      fieldName="image"
                      image={attributes.image}
                      attributes={attributes}
                      updateAttribute={updateAttribute}
                      updateFocusedField={updateFocusedField}
                    />
                  </div>
                </div>
              </RepeaterField>
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
