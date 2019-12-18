/**
 * BLOCK: Available blocks (Repeater)
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
    { name: "min", type: "number", label: "Min", value: 0 },
    { name: "max", type: "number", label: "Max", value: 0 },
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
      value: 33.3333,
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
  button: [],
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
  text: []
};
const fieldOptionsComponents = {
  select: SelectControl,
  checkbox: ToggleControl,
  text: TextControl,
  image: StampaImageOption
};
let focusedField;

registerBlockType("stampa/available-blocks-repeater", {
  title: __("Available blocks (Repeater)"),
  icon: "welcome-write-blog",
  category: "stampa-blocks",
  keywords: [],

  multiple: true,

  attributes: {
    repeater: { type: "array", default: "" },
    repeater__label: { type: "string", default: "" },
    repeater__min: { type: "string", default: "0" },
    repeater__max: { type: "string", default: "0" },
    repeater__style: { type: "string", default: "" },
    repeater__type: { type: "string", default: "flex" },
    repeater__flexWidth: { type: "string", default: "25" },
    repeater__flexWrap: { type: "string", default: "wrap" },
    image: { type: "object", default: "" },
    image__fit: { type: "string", default: "fill" },
    image__position: { type: "string", default: "initial" },
    text: { type: "string", default: "" }
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
        <div className={`${className} stampa-block available-blocks-repeater`}>
          <div
            className="available-blocks-repeater"
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
              className={`stampa-field stampa-field--repeater available-blocks-repeater__repeater ${
                focusedField == "repeater" ? "focused" : ""
              }`}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gridTemplateRows: "230px",
                gridGap: "5px",
                gridRowStart: 1,
                gridColumnStart: 1,
                gridRowEnd: 6,
                gridColumnEnd: 13
              }}
              onClick={e => updateFocusedField(e, "repeater")}
            >
              <RepeaterGroup fieldName="repeater">
                {" "}
                <RepeaterField
                  attributes={attributes}
                  updateAttribute={updateAttribute}
                  updateFocusedField={updateFocusedField}
                >
                  {/* button */}
                  <div
                    className={`stampa-field stampa-field--container available-blocks-repeater__button ${
                      focusedField == "button" ? "focused" : ""
                    }`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                      gridTemplateRows: "27.6px 27.6px 27.6px 27.6px 27.6px",
                      gridGap: "5px",
                      gridRowStart: 1,
                      gridColumnStart: 1,
                      gridRowEnd: 4,
                      gridColumnEnd: 4
                    }}
                    onClick={e => updateFocusedField(e, "button")}
                  >
                    {/* image */}
                    <div
                      className={`stampa-field stampa-field--image available-blocks-repeater__image ${
                        focusedField == "image" ? "focused" : ""
                      }`}
                      style={{
                        gridRowStart: 1,
                        gridColumnStart: 1,
                        gridRowEnd: 5,
                        gridColumnEnd: 7
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
                    {/* text */}
                    <div
                      className={`stampa-field stampa-field--plain-text available-blocks-repeater__text ${
                        focusedField == "text" ? "focused" : ""
                      }`}
                      style={{
                        gridRowStart: 5,
                        gridColumnStart: 1,
                        gridRowEnd: 6,
                        gridColumnEnd: 7
                      }}
                      onClick={e => updateFocusedField(e, "text")}
                      title="text"
                    >
                      <textarea
                        value={attributes.text}
                        placeholder="Text"
                        onChange={e => updateAttribute("text", e.target.value)}
                      />
                    </div>
                  </div>
                </RepeaterField>
              </RepeaterGroup>
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
