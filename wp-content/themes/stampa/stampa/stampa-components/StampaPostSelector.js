const { __ } = wp.i18n;
const { MediaUpload } = wp.editor;
const { IconButton } = wp.components;

export default function StampaPostSelector({
  fieldName,
  postTypes,
  taxonomies,
  updateAttribute,
  updateFocusedField,
}) {
  return (
    <div
      className="stampa-post-selector"
      onClick={e => updateFocusedField(e, fieldName)}
    ></div>
  );
}
