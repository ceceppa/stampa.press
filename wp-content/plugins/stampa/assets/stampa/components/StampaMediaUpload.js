const { __ } = wp.i18n;
const { MediaUpload } = wp.editor;
const { IconButton } = wp.components;

export default function StampaMediaUpload({
  fieldName,
  image,
  attributes,
  updateAttribute,
  updateFocusedField,
}) {
  const object_fit = attributes[`${fieldName}__fit`];
  const object_position = attributes[`${fieldName}__position`].replace(
    ' ',
    '-'
  );

  let customClass = image && image.url ? 'has-image' : 'wireframe';
  customClass += ` object-fit--${object_fit} object-position--${object_position}`;

  return (
    <div
      className="stampa-media-upload"
      onClick={e => updateFocusedField(e, fieldName)}
    >
      <img
        className={`stampa-field__image ${customClass}`}
        src={image && image.url}
      />
      {image == null &&
        <svg
          className="image-wireframe"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M0,0h24v24H0V0z" fill="none" />
          <path d="m19 5v14h-14v-14h14m0-2h-14c-1.1 0-2 0.9-2 2v14c0 1.1 0.9 2 2 2h14c1.1 0 2-0.9 2-2v-14c0-1.1-0.9-2-2-2z" />
          <path d="m14.14 11.86l-3 3.87-2.14-2.59-3 3.86h12l-3.86-5.14z" />
        </svg>}
      <MediaUpload
        className="media-upload"
        value={image}
        placeholder="{{stampa.value.placeholder}}"
        onSelect={image =>
          updateAttribute(fieldName, { url: image.url, id: image.id })}
        render={({ open }) => (
          <IconButton
            className={`button add ${image && image.url ? 'round' : ''}`}
            label={__('Media')}
            icon="format-image"
            onClick={open}
          >
            <span>Select image</span>
          </IconButton>
        )}
      />
      {image &&
        <IconButton
          className="button round remove"
          label={__('Remove')}
          icon="no"
          onClick={() => updateAttribute(fieldName, null)}
        >
          <span>Remove Image</span>
        </IconButton>}
    </div>
  );
}
