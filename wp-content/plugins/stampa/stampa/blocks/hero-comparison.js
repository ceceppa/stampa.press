/**
 * BLOCK: Hero
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { Heading, TextControl } = wp.components;
const { Fragment, Component } = wp.element;

const defaultAttributes = {
  blockTitle: '',
};

registerBlockType('stampa/hero', {
  title: __('Hero'),
  icon: 'welcome-write-blog',
  category: 'stampa-blocks',
  keywords: [],

  multiple: false,

  attributes: {
    image: {
      type: 'object',
    },
    backgroundImage: {
      type: 'string',
    },
    blockTitle: {
      type: 'string',
    },
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

    function updateCiao(value) {
      setAttributes({ blockTitle: value });
    }

    return (
      <div>
        <span>{attributes.blockTitle}</span>
        <TextControl value={attributes.blockTitle} onChange={updateCiao} />

      </div>
    );
  },

  /**
   * Let the content to be rendered with PHP
   */
  save: () => null,
});
