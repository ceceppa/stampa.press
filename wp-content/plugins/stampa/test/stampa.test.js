import stampa from '../src/stampa';

import blocksList from './components/blocks-list.test.json';

describe('Test Stampa helper functions', () => {
  beforeAll(() => {
    window.stampa = {
      blocks: blocksList,
    };
  });

  it('getBlocks() should return the blocks defined in window', () => {
    const blocks = stampa.getBlocks();
    expect(typeof blocks).toBe('object');
    expect(typeof blocks.Gutenberg).toBe('object');
  });

  it('getBlockById() should return the test "Button" block', () => {
    const block = stampa.getBlockById('button');

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

  it('setBlockPosition to store the the block position information', () => {
    stampa.setBlockPosition('anything');

    expect(stampa.getBlockPosition()).toBe('anything');
  });
});
