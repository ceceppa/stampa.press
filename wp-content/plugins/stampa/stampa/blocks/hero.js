/**
 * BLOCK: Hero
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload } = wp.editor;
const { PanelBody, IconButton, TextareaControl, Button } = wp.components;
const { Fragment, Component } = wp.element;

// Default attributes are set to avoid React throwing an error
// when start typeing something in the brew new added module
const defaultAttributes = {
  backgroundImage: {},
};

registerBlockType('stampa/hero', {
  title: __('Hero'),
  icon: 'welcome-write-blog',
  category: 'stampa-blocks',
  keywords: [],

  multiple: true,

  attributes: {
    backgroundImage: { type: 'object' },
    heading: { type: 'string' },
    intro: { type: 'string' },
    button: { type: 'string' },
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
            className="hero"
            style={{
              backgroundImage: `url(${attributes.backgroundImage &&
                attributes.backgroundImage.url})`,
              display: 'grid',
              gridTemplateColumns:
                '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ',
              gridTemplateRows:
                '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ',
              gridGap: '10px',
              height: '450px',
            }}
          >
            <h2
              className="stampa-field"
              style={{
                gridRowStart: 2,
                gridColumnStart: 2,
                gridRowEnd: 8,
                gridColumnEnd: 9,
              }}
            >
              <textarea
                type="text"
                className="stampa-field__height"
                value={attributes.heading}
                placeholder="Title"
                onChange={e => updateAttribute('heading', e.target.value)}
              />
            </h2>
            <div
              className="stampa-field"
              style={{
                gridRowStart: 9,
                gridColumnStart: 2,
                gridRowEnd: 12,
                gridColumnEnd: 7,
              }}
            >
              <TextareaControl
                value={attributes.intro}
                placeholder="Intro"
                onChange={e => updateAttribute('intro', e)}
              />
            </div>
            <div
              className="stampa-field"
              style={{
                gridRowStart: 13,
                gridColumnStart: 2,
                gridRowEnd: 15,
                gridColumnEnd: 4,
              }}
            >
              <Button
                className="stampa-field"
                style={{
                  gridRowStart: 13,
                  gridColumnStart: 2,
                  gridRowEnd: 15,
                  gridColumnEnd: 4,
                }}
                value={attributes.button}
                placeholder="Button"
                onChange={e => updateAttribute('button', e.target.value)}
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
