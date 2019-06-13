/**
 * BLOCK: Quote + Image
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload } = wp.editor;
const { PanelBody, Button, IconButton, TextareaControl } = wp.components;
const { Fragment, Component } = wp.element;

// Default attributes are set to avoid React throwing an error
// when start typeing something in the brew new added module
const defaultAttributes = {
  backgroundImage: {},
};

registerBlockType('stampa/quote-image', {
  title: __('Quote + Image'),
  icon: 'welcome-write-blog',
  category: 'stampa-blocks',
  keywords: [],

  multiple: true,

  attributes: {
    backgroundImage: { type: 'object' },
    text: { type: 'string' },
    image: { type: 'string' },
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
            className="quote-image"
            style={{
              backgroundImage: `url(${attributes.backgroundImage &&
                attributes.backgroundImage.url})`,
              display: 'grid',
              gridTemplateColumns:
                '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ',
              gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ',
              gridGap: '5px',
              height: '336px',
            }}
          >
            <div
              className="stampa-field"
              style={{
                gridRowStart: 2,
                gridColumnStart: 2,
                gridRowEnd: 6,
                gridColumnEnd: 8,
              }}
            >
              <textarea
                className="the-quote"
                value={attributes.text}
                placeholder="Quote"
                rows="5"
                onChange={e => updateAttribute('quote', e.target.value)}
              />
            </div>
            <div
              className="stampa-field"
              style={{
                gridRowStart: 7,
                gridColumnStart: 2,
                gridRowEnd: 8,
                gridColumnEnd: 8,
              }}
            >
              <textarea
                className="the-author"
                value={attributes.text}
                placeholder="The author"
                onChange={e => updateAttribute('author', e.target.value)}
              />
            </div>
            <div
              className="stampa-field stampa-field--image round"
              style={{
                gridRowStart: 2,
                gridColumnStart: 9,
                gridRowEnd: 6,
                gridColumnEnd: 11,
              }}
            >
              <img src={attributes.image && attributes.image.url} />
              <MediaUpload
                onSelect={image => updateAttribute('image', image)}
                type="image"
                value={attributes.image}
                render={({ open }) => (
                  <Button
                    className="button"
                    label={__('Media Library')}
                    icon="edit"
                    onClick={open}
                  >
                    Media Library
                  </Button>
                )}
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
