/**
 * BLOCK: {{stampa.block_title}}
 *
 */
// Stampa Components
import { StampaMediaUpload } from '../components/stampa-components';

const useCallback = window.React.useCallback;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { {{stampa.wp.editor}} } = wp.editor;
const {
  PanelBody,
  PanelRow,
  SelectControl,
  ToggleControl,
  TextControl,
  {{stampa.wp.components}}
} = wp.components;
const { Fragment, Component } = wp.element;

const allFieldsOptions = {{stampa.all_fields_options}};
const fieldOptionsComponents = {
  select: SelectControl,
  checkbox: ToggleControl,
  text: TextControl,
};
let focusedField;

registerBlockType('stampa/{{stampa.sanitized_title}}', {
  title: __('{{stampa.block_title}}'),
  icon: '{{stampa.block.options.icon}}',
  category: 'stampa-blocks',
  keywords: [],

  multiple: true,

  attributes: {{stampa.gutenberg.attributes}},

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
      const { className, attributes = {}, setAttributes} = props;
      const fieldOptions = allFieldsOptions[focusedField];

      const updateAttribute = useCallback((field, value) => {
        const attribute = {};
        attribute[field] = value;

        setAttributes(attribute);
      });

      const updateFocusedField = useCallback(fieldName => {
        focusedField = fieldName;
        
        // We don't need this data to be saved by Gutenberg
        // but we want to trigger a re-render when focusedField changes.
        setAttributes({__focused: fieldName});
      })

      return (
        <Fragment>
          <InspectorControls>
            {{stampa.inspector_controls}}
          </InspectorControls>
          <div className={`${className} stampa-block {{stampa.block.className}}`}>
            <div className="{{stampa.title|sanitize}}" style={{{stampa.block.style}}}>
          {{stampa.render_content}}
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
