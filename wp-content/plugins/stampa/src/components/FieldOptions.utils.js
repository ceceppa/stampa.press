function getFieldByKey(fields, fieldKey) {
  for (let field of fields) {
    if (field.key == fieldKey) {
      return field;
    }

    if (Array.isArray(field.fields)) {
      const found = getFieldByKey(field.fields, fieldKey);

      if (found) {
        return found;
      }
    }
  }

  return null;
}

export { getFieldByKey };
