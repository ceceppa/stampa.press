/**
 * BLOCK: Aaron
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload } = wp.editor;
const {
  PanelBody, IconButton,
  TextareaControl,
} = wp.components;
const { Fragment, Component } = wp.element;

// Default attributes are set to avoid React throwing an error
// when start typeing something in the brew new added module
const defaultAttributes = {
backgroundImage: {}
};

registerBlockType('stampa/aaron', {
  title: __('Aaron'),
  icon: 'welcome-write-blog',
  category: 'stampa-blocks',
  keywords: [],

  multiple: true,

  attributes: {"backgroundImage":{"type":"object"},"heading":{"type":"string"},"text":{"type":"string"}},

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
      const { className, attributes = defaultAttributes, setAttributes} = props;

      function updateAttribute(field, value) {
        const attribute = {};
        attribute[field] = value;

        setAttributes(attribute);
      }

      return (
        <Fragment><InspectorControls>
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
          <div className="aaron" style={{backgroundImage: `url(${attributes.backgroundImage && attributes.backgroundImage.url})`
,display: 'grid'
,gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr '
,gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr '
,gridGap: '1px'
,height: '243px'}}>
        <h2
 className="stampa-field"
 style={{gridRowStart: 2, gridColumnStart: 2, gridRowEnd: 3, gridColumnEnd: 9}}>
<textarea type='text' className='stampa-field__height'
 value={attributes.heading}
 placeholder='Title'
 onChange={e => updateAttribute('heading', e.target.value)}
/>
</h2>
<div
 className="stampa-field"
 style={{gridRowStart: 4, gridColumnStart: 2, gridRowEnd: 8, gridColumnEnd: 5}}>
<TextareaControl
 value={attributes.text}
 placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
 onChange={value => updateAttribute('text', value)}
/>
</div>
<div
 className="stampa-field"
 style={{gridRowStart: 4, gridColumnStart: 6, gridRowEnd: 9, gridColumnEnd: 10}}>
<TextareaControl
 value={attributes.text}
 placeholder='Blaaaaaa'
 onChange={value => updateAttribute('text', value)}
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
