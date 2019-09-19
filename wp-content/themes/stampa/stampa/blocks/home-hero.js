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
  container: [],
  github: [
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
  ],
  docs: [
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
  ],
  tryme: [
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
  ],
  twitter: [
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
  ],
  intro: []
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
    github__icon: { type: "object", default: {} },
    github__label: { type: "string", default: "Github" },
    github__link: { type: "string", default: "" },
    docs__icon: { type: "object", default: {} },
    docs__label: { type: "string", default: "Doc" },
    docs__link: { type: "string", default: "" },
    tryme__icon: { type: "object", default: {} },
    tryme__label: { type: "string", default: "Try Me" },
    tryme__link: { type: "string", default: "" },
    twitter__icon: { type: "object", default: {} },
    twitter__label: { type: "string", default: "Twitter" },
    twitter__link: { type: "string", default: "" },
    intro: { type: "string", format: "string", default: "" }
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
            {/* container */}
            <div
              className={`stampa-field stampa-field--container home-hero__container ${
                focusedField == "container" ? "focused" : ""
              }`}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                gridTemplateRows: "92px",
                gridGap: "5px",
                gridRowStart: 3,
                gridColumnStart: 3,
                gridRowEnd: 5,
                gridColumnEnd: 11
              }}
              onClick={e => updateFocusedField(e, "container")}
            >
              {/* github */}
              <div
                className={`stampa-field stampa-field--icon-button home-hero__github ${
                  focusedField == "github" ? "focused" : ""
                }`}
                style={{
                  gridRowStart: 1,
                  gridColumnStart: 1,
                  gridRowEnd: 2,
                  gridColumnEnd: 3
                }}
                onClick={e => updateFocusedField(e, "github")}
                title="github"
              >
                <div className="flex flex--column">
                  {" "}
                  <img
                    src={attributes.github__icon.url}
                    alt={attributes.github__label}
                  />{" "}
                  <input
                    type="text"
                    value={attributes.github__label}
                    placeholder="Github"
                    onChange={e =>
                      updateAttribute("github__label", e.target.value)
                    }
                  />{" "}
                </div>
              </div>
              {/* docs */}
              <div
                className={`stampa-field stampa-field--icon-button home-hero__docs ${
                  focusedField == "docs" ? "focused" : ""
                }`}
                style={{
                  gridRowStart: 1,
                  gridColumnStart: 3,
                  gridRowEnd: 2,
                  gridColumnEnd: 5
                }}
                onClick={e => updateFocusedField(e, "docs")}
                title="docs"
              >
                <div className="flex flex--column">
                  {" "}
                  <img
                    src={attributes.docs__icon.url}
                    alt={attributes.docs__label}
                  />{" "}
                  <input
                    type="text"
                    value={attributes.docs__label}
                    placeholder="Doc"
                    onChange={e =>
                      updateAttribute("docs__label", e.target.value)
                    }
                  />{" "}
                </div>
              </div>
              {/* tryme */}
              <div
                className={`stampa-field stampa-field--icon-button home-hero__tryme ${
                  focusedField == "tryme" ? "focused" : ""
                }`}
                style={{
                  gridRowStart: 1,
                  gridColumnStart: 5,
                  gridRowEnd: 2,
                  gridColumnEnd: 7
                }}
                onClick={e => updateFocusedField(e, "tryme")}
                title="tryme"
              >
                <div className="flex flex--column">
                  {" "}
                  <img
                    src={attributes.tryme__icon.url}
                    alt={attributes.tryme__label}
                  />{" "}
                  <input
                    type="text"
                    value={attributes.tryme__label}
                    placeholder="Try Me"
                    onChange={e =>
                      updateAttribute("tryme__label", e.target.value)
                    }
                  />{" "}
                </div>
              </div>
              {/* twitter */}
              <div
                className={`stampa-field stampa-field--icon-button home-hero__twitter ${
                  focusedField == "twitter" ? "focused" : ""
                }`}
                style={{
                  gridRowStart: 1,
                  gridColumnStart: 7,
                  gridRowEnd: 2,
                  gridColumnEnd: 9
                }}
                onClick={e => updateFocusedField(e, "twitter")}
                title="twitter"
              >
                <div className="flex flex--column">
                  {" "}
                  <img
                    src={attributes.twitter__icon.url}
                    alt={attributes.twitter__label}
                  />{" "}
                  <input
                    type="text"
                    value={attributes.twitter__label}
                    placeholder="Twitter"
                    onChange={e =>
                      updateAttribute("twitter__label", e.target.value)
                    }
                  />{" "}
                </div>
              </div>
            </div>
            {/* intro */}
            <div
              className={`stampa-field stampa-field--richtext home-hero__intro ${
                focusedField == "intro" ? "focused" : ""
              }`}
              style={{
                gridRowStart: 1,
                gridColumnStart: 2,
                gridRowEnd: 2,
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