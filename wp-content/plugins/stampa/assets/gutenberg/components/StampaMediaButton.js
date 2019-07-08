const { MediaUpload } = wp.editor;

export default function StampaMediaButton({
  image,
  gridPosition,
  updateAttribute,
}) {
  const customClass = image && image.url ? 'has-image' : 'wireframe';

  return (
    <div
      className="`stampa-field stampa-field--image field--image ${customClass}"
      style={{
        gridRowStart: gridPosition.gridRowStart,
        gridColumnStart: gridPosition.gridColumnStart,
        gridRowEnd: gridPosition.gridRowEnd,
        gridColumnEnd: gridPosition.gridColumnEnd,
      }}
    >
      <img src={image && image.url} className="stampa-field__image" />
      {image == null &&
        <svg
          className="image-wiraframe"
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
        onSelect={image => updateAttribute('image', image)}
        render={({ open }) => (
          <IconButton
            className="button add"
            label={__('Media')}
            icon="format-image"
            onClick={open}
          >
            <span>Select image</span>
          </IconButton>
        )}
      />
      <IconButton
        className="button round remove"
        label={__('Remove')}
        icon="no"
        onClick={updateAttribute('image', null)}
      >
        <span>Remove Image</span>
      </IconButton>
    </div>
  );
}
