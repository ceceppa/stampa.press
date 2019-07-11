<PanelBody title={__('Options')}>
  <MediaUpload
    onSelect={image => updateAttribute('backgroundImage', image)}
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
