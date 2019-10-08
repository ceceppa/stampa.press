/**
 * BLOCK: Home hero
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
  intro: [],
  try_me: [
    {
      name: "icon",
      type: "image",
      label: "Icon",
      attribute_type: "object",
      attribute_default: "{}",
      stampa: "false"
    },
    { name: "label", type: "text", label: "Label", value: "Label" },
    { name: "link", type: "text", label: "URL", stampa: "false" }
  ]
};
const fieldOptionsComponents = {
  select: SelectControl,
  checkbox: ToggleControl,
  text: TextControl,
  image: StampaImageOption
};
let focusedField;

registerBlockType("stampa/home-hero", {
  title: __("Home hero"),
  icon: "admin-home",
  category: "stampa-blocks",
  keywords: [],

  multiple: true,

  attributes: {
    backgroundImage: { type: "object" },
    intro: { type: "string", format: "string", default: "" },
    try_me__icon: { type: "object", default: {} },
    try_me__label: { type: "string", default: "Label" },
    try_me__link: { type: "string", default: "" }
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
          <PanelBody title={__("Block options")}>
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
          ;
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
        <div className={`${className} stampa-block home-hero`}>
          <div
            className="home-hero"
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
              gridTemplateRows: "46px 46px 46px 46px ",
              gridGap: "5px",
              backgroundImage: `url(${attributes.backgroundImage})`
            }}
          >
            {/* intro */}
            <div
              className={`stampa-field stampa-field--richtext home-hero__intro ${
                focusedField == "intro" ? "focused" : ""
              }`}
              style={{
                gridRowStart: 1,
                gridColumnStart: 2,
                gridRowEnd: 3,
                gridColumnEnd: 12
              }}
              onClick={e => updateFocusedField(e, "intro")}
              title="intro"
            >
              <RichText
                multiline={true}
                placeholder="Intro text"
                value={attributes.intro}
                onChange={value => updateAttribute("intro", value)}
              />
            </div>
            {/* try_me */}
            <div
              className={`stampa-field stampa-field--icon-button home-hero__try_me ${
                focusedField == "try_me" ? "focused" : ""
              }`}
              style={{
                gridRowStart: 4,
                gridColumnStart: 6,
                gridRowEnd: 5,
                gridColumnEnd: 8
              }}
              onClick={e => updateFocusedField(e, "try_me")}
              title="try_me"
            >
              <div className="flex flex--row">
                {" "}
                <img
                  src={attributes.try_me__icon.url}
                  alt={attributes.try_me__label}
                />{" "}
                <input
                  type="text"
                  value={attributes.try_me__label}
                  placeholder="Label"
                  onChange={e =>
                    updateAttribute("try_me__label", e.target.value)
                  }
                />{" "}
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
