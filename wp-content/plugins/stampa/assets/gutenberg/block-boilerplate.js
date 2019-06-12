/**
 * BLOCK: {{stampa.block_title}}
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload } = wp.editor;
const {
  PanelBody, IconButton,
  {{stampa.gutenberg_blocks}}
} = wp.components;
const { Fragment, Component } = wp.element;

// Default attributes are set to avoid React throwing an error
// when start typeing something in the brew new added module
const defaultAttributes = {
{{stampa.default_attributes}}
};

registerBlockType('stampa/{{stampa.sanitized_title}}', {
  title: __('{{stampa.block_title}}'),
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
      const { className, attributes = defaultAttributes, setAttributes} = props;

      function updateAttribute(field, value) {
        const attribute = {};
        attribute[field] = value;

        setAttributes(attribute);
      }

      return (
        {{stampa.render_container_start}}
		    <div className={`${className} stampa-block`}>
          <div className="{{stampa.sanitized_title}}" style={{{{stampa.block_style}}}}>
        {{stampa.render_content}}
          </div>
        </div>
        {{stampa.render_container_end}}
      );
  },

  /**
   * Let the content to be rendered with PHP
   */
  save: () => null,
});
