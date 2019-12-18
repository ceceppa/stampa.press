/**
 * BLOCK: Text + Image
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
const { InspectorControls, MediaUpload, RichText } = wp.editor;
const {
  PanelBody,
  PanelRow,
  SelectControl,
  ToggleControl,
  TextControl,
  IconButton
} = wp.components;
const { Fragment } = wp.element;

const allFieldsOptions = {
  heading: [
    {
      name: "level",
      type: "select",
      label: "Level",
      values: ["h1", "h2", "h3", "h4", "h5", "h6"],
      value: "h2"
    }
  ],
  richtext: [],
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

registerBlockType("stampa/text-image", {
  title: __("Text + Image"),
  icon: "welcome-write-blog",
  category: "stampa-blocks",
  keywords: [],

  multiple: true,

  attributes: {
    heading: { type: "string", default: "" },
    heading__level: { type: "string", default: "h2" },
    richtext: { type: "string", format: "string", default: "" },
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
        <div className={`${className} stampa-block text-image`}>
          <div
            className="text-image"
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
              gridTemplateRows: "80px 80px 80px 80px 80px ",
              gridGap: "5px"
            }}
          >
            {/* heading */}
            <div
              className={`stampa-field stampa-field--heading text-image__heading ${
                focusedField == "heading" ? "focused" : ""
              }`}
              style={{
                gridRowStart: 1,
                gridColumnStart: 1,
                gridRowEnd: 2,
                gridColumnEnd: 7
              }}
              onClick={e => updateFocusedField(e, "heading")}
              title="heading"
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
            {/* richtext */}
            <div
              className={`stampa-field stampa-field--richtext text-image__richtext ${
                focusedField == "richtext" ? "focused" : ""
              }`}
              style={{
                gridRowStart: 2,
                gridColumnStart: 1,
                gridRowEnd: 6,
                gridColumnEnd: 7
              }}
              onClick={e => updateFocusedField(e, "richtext")}
              title="richtext"
            >
              <RichText
                multiline={true}
                placeholder="RichText"
                value={attributes.richtext}
                onChange={value => updateAttribute("richtext", value)}
              />
            </div>
            {/* image */}
            <div
              className={`stampa-field stampa-field--image text-image__image ${
                focusedField == "image" ? "focused" : ""
              }`}
              style={{
                gridRowStart: 1,
                gridColumnStart: 7,
                gridRowEnd: 6,
                gridColumnEnd: 13
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
        </div>
      </Fragment>
    );
  },

  /**
   * Let the content to be rendered with PHP
   */
  save: () => null
});
