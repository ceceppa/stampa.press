/**
 * BLOCK: Another one
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload } = wp.editor;
const {
  PanelBody, IconButton,
  TextareaControl,
  Button,
} = wp.components;
const { Fragment, Component } = wp.element;

// Default attributes are set to avoid React throwing an error
// when start typeing something in the brew new added module
const defaultAttributes = {
backgroundImage: {}
};

registerBlockType('stampa/another-one', {
  title: __('Another one'),
  icon: 'welcome-write-blog',
  category: 'stampa-blocks',
  keywords: [],

  multiple: true,

  attributes: {"backgroundImage":{"type":"object"},"heading":{"type":"string"},"text":{"type":"string"},"button":{"type":"string"}},

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
          <div className="another-one" style={{backgroundImage: `url(${attributes.backgroundImage && attributes.backgroundImage.url})`
,display: 'grid'
,gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr '
,gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr '
,gridGap: '5px'
,height: '460px'}}>
        <h2
 className="stampa-field"
 style={{gridRowStart: 2, gridColumnStart: 2, gridRowEnd: 3, gridColumnEnd: 9}}>
<textarea type='text' className='stampa-field__height'
 value={attributes.heading}
 placeholder='Heading'
 onChange={e => updateAttribute('heading', e.target.value)}
/>
</h2>
<div
 className="stampa-field"
 style={{gridRowStart: 4, gridColumnStart: 2, gridRowEnd: 8, gridColumnEnd: 8}}>
<TextareaControl
 value={attributes.text}
 placeholder='Write text...'
 onChange={value => updateAttribute('text', value)}
/>
</div>
<div
 className="stampa-field"
 style={{gridRowStart: 9, gridColumnStart: 2, gridRowEnd: 10, gridColumnEnd: 5}}>
<Button
 className="stampa-field"
 style={{gridRowStart: 9, gridColumnStart: 2, gridRowEnd: 10, gridColumnEnd: 5}}
 value={attributes.button}
 placeholder='Add text...'
 onChange={e => updateAttribute('button', e.target.value)}
/>
</div>
<div
 className="stampa-field"
 style={{gridRowStart: 9, gridColumnStart: 6, gridRowEnd: 10, gridColumnEnd: 8}}>
<Button
 className="stampa-field"
 style={{gridRowStart: 9, gridColumnStart: 6, gridRowEnd: 10, gridColumnEnd: 8}}
 value={attributes.button}
 placeholder='Add text...'
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
