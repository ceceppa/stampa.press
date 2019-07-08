import StampaMediaButton from '../stampa/StampaMediaButton';

/**
 * BLOCK: Test image
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload } = wp.editor;
const { IconButton } = wp.components;
const { Fragment, Component } = wp.element;

// Default attributes are set to avoid React throwing an error
// when start typeing something in the brew new added module
const defaultAttributes = {};

registerBlockType('stampa/test-image', {
  title: __('Test image'),
  icon: 'welcome-write-blog',
  category: 'stampa-blocks',
  keywords: [],

  multiple: true,

  attributes: { image: { type: 'object' } },

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

    function updateAttribute(field, value) {
      const attribute = {};
      attribute[field] = value;

      setAttributes(attribute);
    }

    return (
      <div className={`${className} stampa-block test-image`}>
        <div
          className="test-image"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ',
            gridTemplateRows: '1fr 1fr 1fr 1fr 1fr ',
            gridGap: '5px',
            height: '230px',
          }}
        >
          {/* image */}
          <StampaMediaButton
            image={attributes.image}
            gridPosition={{
              gridRowStart: 1,
              gridColumnStart: 1,
              gridRowEnd: 6,
              gridColumnEnd: 6,
            }}
            updateAttribute={updateAttribute}
          />
        </div>
      </div>
    );
  },

  /**
   * Let the content to be rendered with PHP
   */
  save: () => null,
});
