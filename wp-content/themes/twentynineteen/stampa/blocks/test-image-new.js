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
  "post-selector": [],
  "post-title": [
    {
      name: "level",
      type: "select",
      label: "Level",
      values: ["h1", "h2", "h3", "h4", "h5", "h6"],
      value: "h3"
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

  attributes: { "post-title__level": { type: "string", default: "h3" } },

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
            {/* post-selector */}
            <div
              className={`stampa-field stampa-field--post-selector test-image-new__post-selector ${
                focusedField == "post-selector" ? "focused" : ""
              }`}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                gridTemplateRows: "1fr 1fr 1fr 1fr 1fr",
                gridGap: "5px",
                gridRowStart: 2,
                gridColumnStart: 2,
                gridRowEnd: 7,
                gridColumnEnd: 9
              }}
              onClick={e => updateFocusedField(e, "post-selector")}
            >
              <StampaPostSelector
                postTypes="{{stampa.value.post_types}}"
                taxonomies="{{stampa.value.taxonomies}}"
              >
                {/* post-title */}
                <div
                  className={`stampa-field stampa-field--post-title test-image-new__post-title ${
                    focusedField == "post-title" ? "focused" : ""
                  }`}
                  style={{
                    gridRowStart: 1,
                    gridColumnStart: 3,
                    gridRowEnd: 2,
                    gridColumnEnd: 7
                  }}
                  onClick={e => updateFocusedField(e, "post-title")}
                ></div>
              </StampaPostSelector>
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
