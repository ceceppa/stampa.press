<PanelBody title={__('Block options')}>
  <MediaUpload
    onSelect={image => updateAttribute('backgroundImage', image.url)}
    type="image"
    value={attributes.backgroundImage}
    render={({ open }) => (
      <IconButton
        className="button"
        label={__('Set background Image')}
        icon="edit"
        onClick={open}
      >
        Set background Image
      </IconButton>
    )}
  />
</PanelBody>;
