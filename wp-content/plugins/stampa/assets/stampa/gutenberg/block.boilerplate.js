/**
 * BLOCK: {{stampa.block.title}}
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

  edit( { className, attributes = {}, setAttributes} ) {
      const fieldOptions = allFieldsOptions[focusedField];

      const updateAttribute = useCallback((field, value) => {
        const attribute = {};
        attribute[field] = value;

        setAttributes(attribute);
      });

      const updateFocusedField = useCallback(fieldName => {
        focusedField = fieldName;
        
        setAttributes({__focused: fieldName});
      })

      return (
        <Fragment>
          <InspectorControls>
            {{stampa.inspector_controls}}
          </InspectorControls>
          <div className={`${className} stampa-block {{stampa.block.className}}`}>
            <div className="{{stampa.title|sanitize}}" style={{{stampa.block.style}}}>
              {{stampa.render.content}}
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
