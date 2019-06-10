<InspectorControls>
  <PanelBody title={__('Options')}>
    <PanelRow>
      <ToggleControl
        label="Preview Mode"
        checked={attributes.previewMode}
        onChange={this.onAttributeChange.bind(this, 'previewMode')}
        toolip="Automatically runs the animation when a parameter changes"
      />

      {/* Trigger the animation */}
      <Button isDefault onClick={this.animateNow}>
        {__('Animate!')}
      </Button>
    </PanelRow>

    {attributes.strings.map((string, index) => {
      return (
        <div className="string-wrapper">
          <TextControl
            key={`key-${index}`}
            className="plain-text"
            value={string}
            onChange={this.onStringChange.bind(this, index)}
          />
          <IconButton
            icon="trash"
            value={__('Remove string')}
            onClick={this.removeString.bind(this, index)}
          />
        </div>
      );
    })}
    <Button isDefault className="add-more" onClick={this.addString}>
      {__('Add string')}
    </Button>
  </PanelBody>

  {/* Effects settings */}
  <PanelBody title={__('Effect settings')} className="effect-settings">
    {attributeKeys.map(key => {
      // From camelCase to -> camel Case
      const camel = key.split(/(?=[A-Z])/).join(' ');
      const label = camel.charAt(0).toUpperCase() + camel.slice(1); // capitalise first letter.
      const value = attributes[key];
      const type = blockAttributes[key].type;
      const attribute = blockAttributes[key];

      // Is it hidden?
      if (attribute.show && attributes[attribute.show] === false) {
        return;
      }

      switch (type) {
        case 'boolean':
          return (
            <PanelRow key={key}>
              <ToggleControl
                label={label}
                checked={value}
                onChange={this.onAttributeChange.bind(this, key)}
                help={attribute.description}
              />
            </PanelRow>
          );
        case 'select':
          // contentType?
          return (
            <PanelRow key={key}>
              <SelectControl
                label={label}
                value={value}
                options={attribute.values.map(value => {
                  return {
                    label: value,
                    value,
                  };
                })}
                onChange={this.onAttributeChange.bind(this, key)}
                help={attribute.description}
              />
            </PanelRow>
          );
        default:
          return (
            <PanelRow key={key}>
              <TextControl
                type={type === 'string' ? 'text' : type}
                label={label}
                value={value}
                onChange={this.onAttributeChange.bind(this, key)}
                help={attribute.description}
              />
            </PanelRow>
          );
      }
    })}
  </PanelBody>
</InspectorControls>;
