import stampa from '../src/stampa';

import blocksList from './components/fields-list.test.json';

describe('Test Stampa helper functions', () => {
  beforeAll(() => {
    window.stampa = {
      fields: blocksList,
    };
  });

  it('getFields() should return the blocks defined in window', () => {
    const blocks = stampa.getFields();
    expect(typeof blocks).toBe('object');
    expect(typeof blocks.Gutenberg).toBe('object');
  });

  it('getFieldById() should return the test "Button" block', () => {
    const block = stampa.getFieldById('button');

    expect(typeof block).toBe('object');
  });

  it('setResizeDirection store the resizing information', () => {
    stampa.setResizeDirection('whatever');

    expect(stampa.getResizeDirection()).toBe('whatever');
  });

  it('setResizing to store the resizing status', () => {
    stampa.setResizing(true);

    expect(stampa.isResizing()).toBe(true);
  });

  it('setFieldPosition to store the the block position information', () => {
    stampa.setFieldPosition('anything');

    expect(stampa.getFieldPosition()).toBe('anything');
  });

  it('sanitizeVariableName should convert the input in an valid variable name', () => {
    expect(stampa.sanitizeVariableName('field name')).toBe('field_name');
    expect(stampa.sanitizeVariableName('field@name')).toBe('field_name');
    expect(stampa.sanitizeVariableName('field+name')).toBe('field_name');
    expect(stampa.sanitizeVariableName('field-name')).toBe('field_name');
    expect(stampa.sanitizeVariableName('field/name')).toBe('field_name');
    expect(stampa.sanitizeVariableName('30 fields')).toBe('_fields');
    expect(stampa.sanitizeVariableName('"fields')).toBe('_fields');
    expect(stampa.sanitizeVariableName("'fields")).toBe('_fields');
    expect(stampa.sanitizeVariableName('fields ')).toBe('fields_');
    expect(stampa.sanitizeVariableName(' fields')).toBe('_fields');
  });
});
