/**
 * BLOCK: Test images
 *
 */
// Stampa Components
import { StampaMediaUpload } from '../components/stampa-components';

const useCallback = window.React.useCallback;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload } = wp.editor;
const { SelectControl, IconButton } = wp.components;
const { Fragment, Component } = wp.element;

// Default attributes are set to avoid React throwing an error
// when start typeing something in the brew new added module
const defaultAttributes = {
  image1__size: 'full',
  image1__fit: 'none',
  image1__position: 'initial',
  image__size: 'full',
  image__fit: 'scale-down',
  image__position: 'center center',
};

const allFieldsOptions = {
  image1: [
    {
      name: 'size',
      type: 'select',
      label: 'Image size',
      value: 'full',
      values: [
        'full',
        'thumbnail',
        'medium',
        'medium_large',
        'large',
        'post-thumbnail',
      ],
    },
    {
      name: 'fit',
      type: 'select',
      label: 'Default value for <i>object-fit<\/i>',
      values: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      value: 'none',
    },
    {
      name: 'position',
      type: 'select',
      label: 'Default value for <i>object-position<\/i>',
      values: [
        'initial',
        'left top',
        'left center',
        'left bottom',
        'center center',
        'right top',
        'right center',
        'right bottom',
      ],
      value: 'initial',
    },
  ],
  image: [
    {
      name: 'size',
      type: 'select',
      label: 'Image size',
      value: 'full',
      values: [
        'full',
        'thumbnail',
        'medium',
        'medium_large',
        'large',
        'post-thumbnail',
      ],
    },
    {
      name: 'fit',
      type: 'select',
      label: 'Default value for <i>object-fit<\/i>',
      values: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      value: 'none',
    },
    {
      name: 'position',
      type: 'select',
      label: 'Default value for <i>object-position<\/i>',
      values: [
        'initial',
        'left top',
        'left center',
        'left bottom',
        'center center',
        'right top',
        'right center',
        'right bottom',
      ],
      value: 'initial',
    },
  ],
};
const fieldOptionsComponents = {
  select: SelectControl,
};

registerBlockType('stampa/test-images', {
  title: __('Test images'),
  icon: 'welcome-write-blog',
  category: 'stampa-blocks',
  keywords: [],

  multiple: true,

  attributes: {
    image1__size: { type: 'string' },
    image1__fit: { type: 'string' },
    image1__position: { type: 'string' },
    image__size: { type: 'string' },
    image__fit: { type: 'string' },
    image__position: { type: 'string' },
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
    const { className, attributes = defaultAttributes, setAttributes } = props;
    cost[(focusedField, setFocusedField)] = window.React.useState(null);
    const fieldOptions = allFieldsOptions[focusedField];

    const updateAttribute = useCallback((field, value) => {
      const attribute = {};
      attribute[field] = value;

      setAttributes(attribute);
    });

    const updateFocusedField = useCallback(fieldName => {
      setFocusedField(fieldName);
    });

    return (
      <Fragment>
        <InspectorControls>
          {fieldOptions &&
            fieldOptions.map(option => {
              const Component = fieldOptionsComponents[option.type];
              const attributeKey = `${focusedField}__${option.name}`;
              const values = attributes[attributeKey] || [];

              return (
                <Component
                  label={option.label}
                  value={attributes[attributeKey]}
                  key={option.name}
                  options={value => {
                    return {
                      label: value,
                      value,
                    };
                  }}
                  onChange={value => updateAttribute(attributeKey, value)}
                  selectedValues={activeField.values}
                />
              );
            })}

        </InspectorControls>
        <div className={`${className} stampa-block test-images`}>
          <div
            className="test-images"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ',
              gridTemplateRows: '1fr 1fr 1fr 1fr 1fr ',
              gridGap: '5px',
              height: '230px',
            }}
          >
            {/* image1 */}
            <div
              className="stampa-field stampa-field--image field--image1"
              gridPosition={{
                gridRowStart: 1,
                gridColumnStart: 7,
                gridRowEnd: 6,
                gridColumnEnd: 13,
              }}
              onClick={() => updateFocusedField('image1')}
            >
              <StampaMediaUpload
                fieldName="image1"
                image={attributes.image1}
                customClass=""
                attributes={attributes}
                updateAttribute={updateAttribute}
              />
            </div>{/* image */}
            <div
              className="stampa-field stampa-field--image field--image"
              gridPosition={{
                gridRowStart: 1,
                gridColumnStart: 1,
                gridRowEnd: 6,
                gridColumnEnd: 7,
              }}
              onClick={() => updateFocusedField('image')}
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
  save: () => null,
});
