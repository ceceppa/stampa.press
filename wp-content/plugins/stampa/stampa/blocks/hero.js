/**
 * BLOCK: Hero
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const {
  Heading,
  PlainText,
} = wp.components;
const { Fragment, Component } = wp.element;

registerBlockType('nine3/hero', {
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
  edit: function ({ className, attributes }) {
    console.info(className, attributes);

    return (
      <Fragment>
        <div className="stampa-grid" style="
				display: grid;
				grid-template-columns: repeat(1fr, 12);
				grid-template-rows: repeat(1fr, 12);
				gap: 10px;
				min-height: 360px;
			">
          Et uailah
        </div>
      </Fragment>
    );
  },

  /**
   * Let the content to be rendered with PHP
   */
  save: null,
});
