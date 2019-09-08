{
  fieldOptions && fieldOptions.length > 0 && (
    <PanelBody title={__('Options')} className="typed-panel-body">
      {fieldOptions.map(option => {
        const Component = fieldOptionsComponents[option.type];
        const attributeKey = `${focusedField}__${option.name}`;
        const values = option.values || [];

        return (
          Component && (
            <PanelRow key={option.name}>
              <Component
                label={option.label}
                value={attributes[attributeKey]}
                options={
                  values.map &&
                  values.map(value => {
                    return {
                      label: value,
                      value,
                    };
                  })
                }
                onChange={(value, subkey) =>
                  updateAttribute(attributeKey, value, subkey)
                }
              />
            </PanelRow>
          )
        );
      })}
    </PanelBody>
  )
}
