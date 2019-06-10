/**
 * BLOCK: {{stampa.block_title}}
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const {
  {{stampa.gutenberg_blocks}}
} = wp.components;
const { Fragment, Component } = wp.element;

registerBlockType('nine3/{{stampa.sanitized_title}}', {
  title: __('{{stampa.block_title}}'),
  icon: 'welcome-write-blog',
  category: 'formatting',
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
  edit: function edit({ className, attributes }) {
      const { className, attributes } = props;
      const attributeKeys = Object.keys(blockAttributes).filter(
        key => key !== 'strings' && key !== 'className'
      );

      {{stampa.block_handlers}}

      return (
        <Fragment>
          {{stampa.block_options}}

          <div className="stampa-grid" style="{{stampa.grid_style}}">
            {{stampa.block_react_code}}
          </div>
        </Fragment>
      );
    }
  },

  /**
   * Let the content to be rendered with PHP
   */
  save: null,
});
