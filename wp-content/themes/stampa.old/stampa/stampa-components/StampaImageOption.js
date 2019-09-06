import React from 'react';
const { MediaUpload } = wp.editor;
const { IconButton } = wp.components;
const useCallback = window.React.useCallback;

export default function MediaField({ label, value, onChange }) {
  if (value == null) {
    value = {};
  }

  const updateImage = useCallback(image => {
    onChange({ url: image.url, id: image.id });
  });

  return (
    <MediaUpload
      onSelect={image => updateImage(image)}
      type="image"
      value={value}
      render={({ open }) => (
        <IconButton
          className="button"
          label={label}
          icon="image"
          onClick={open}
        >
          {label}
        </IconButton>
      )}
    />
  );
}
