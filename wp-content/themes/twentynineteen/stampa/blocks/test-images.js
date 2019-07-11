/**
 * BLOCK: Test images
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
  IconButton
} = wp.components;
const { Fragment, Component } = wp.element;

const allFieldsOptions = {
  image1: [
    {
      name: "size",
      type: "select",
      label: "Image size",
      value: "full",
      values: [
        "full",
        "thumbnail",
        "medium",
        "medium_large",
        "large",
        "post-thumbnail"
      ]
    },
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
  image: [
    {
      name: "size",
      type: "select",
      label: "Image size",
      value: "full",
      values: [
        "full",
        "thumbnail",
        "medium",
        "medium_large",
        "large",
        "post-thumbnail"
      ]
    },
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
  checkbox: ToggleControl
};
let focusedField;

registerBlockType("stampa/test-images", {
  title: __("Test images"),
  icon: "welcome-write-blog",
  category: "stampa-blocks",
  keywords: [],

  multiple: true,

  attributes: {
    image1: { type: "object" },
    image1__size: { type: "string", default: "full" },
    image1__fit: { type: "string", default: "fill" },
    image1__position: { type: "string", default: "initial" },
    image: { type: "object" },
    image__size: { type: "string", default: "full" },
    image__fit: { type: "string", default: "scale-down" },
    image__position: { type: "string", default: "center center" }
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
        <div className={`${className} stampa-block test-images`}>
          <div
            className="test-images"
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
              gridTemplateRows: "1fr 1fr 1fr 1fr 1fr ",
              gridGap: "5px",
              height: "230px"
            }}
          >
            {/* image1 */}
            <div
              className="stampa-field stampa-field--image field--image1"
              style={{
                gridRowStart: 1,
                gridColumnStart: 7,
                gridRowEnd: 6,
                gridColumnEnd: 13
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
            {/* image */}
            <div
              className="stampa-field stampa-field--image field--image"
              style={{
                gridRowStart: 1,
                gridColumnStart: 1,
                gridRowEnd: 6,
                gridColumnEnd: 7
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
