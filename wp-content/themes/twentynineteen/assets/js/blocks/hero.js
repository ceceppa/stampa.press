/**
 * BLOCK: Hero
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const {
  {{stampa.gutenberg_blocks}}
} = wp.components;
const { Fragment, Component } = wp.element;

registerBlockType('nine3/hero', {
  title: __('Hero'),
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

          <div className="stampa-grid" style="
				display: grid;
				grid-template-columns: repeat(1fr, 12);
				grid-template-rows: repeat(1fr, 12);
				gap: 10px;
				min-height: 360px;
			">
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
