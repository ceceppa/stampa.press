/**
 * BLOCK: Hero
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload } = wp.editor;
const { PanelBody, IconButton, TextControl } = wp.components;
const { Fragment, Component } = wp.element;

// Default attributes are set to avoid React throwing an error
// when start typeing something in the brew new added module
const defaultAttributes = {
  backgrdoundImage: null,
};

registerBlockType('stampa/hero', {
  title: __('Hero'),
  icon: 'welcome-write-blog',
  category: 'stampa-blocks',
  keywords: [],

  multiple: true,

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
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Options')}>
            <MediaUpload
              onSelect={image => updateAttribute('backgroundImage', image)}
              type="image"
              value={attributes.backgroundImage}
              render={({ open }) => (
                <IconButton
                  className="button"
                  label={__('Set background Image')}
                  icon="edit"
                  onClick={open}
                >
                  Set background Image
                </IconButton>
              )}
            />
          </PanelBody>
        </InspectorControls>
        <div className={`${className} stampa-block`}>
          <div
            className="hero"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ',
              gridTemplateRows: '1fr 1fr 1fr 1fr 1fr ',
              gridGap: '5%',
              minHeight: '230px',
            }}
          >
            <h3
              className="stampa-field"
              style={{
                gridRowStart: 2,
                gridColumnStart: 2,
                gridRowEnd: 5,
                gridColumnEnd: 12,
              }}
            >
              <input
                type="text"
                value={attributes.heading}
                placeholder="Heading..."
                onChange={e =>
                  updateAttribute('{{stampa._field_name}}', e.value)}
              />
            </h3>
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
