<InspectorControls>
  <PanelBody title={__('Options')}>
    {blockOptions.map(key => {
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
        case 'image':
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
