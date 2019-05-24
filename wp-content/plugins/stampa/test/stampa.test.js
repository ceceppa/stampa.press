import stampa from '../src/stampa';

import blocksList from './components/blocks-list.test.json';

describe('Test Stampa helper functions', () => {
  beforeAll(() => {
    window.stampa = {
      blocks: blocksList,
    }
  });

  it('getBlocks() should return the blocks defined in window', () => {
    const blocks = stampa.getBlocks(); 
    expect(typeof blocks).toBe('object')
    expect(typeof blocks.Gutenberg).toBe('object');
  })

  it('getBlockById() should return the test "Button" block', () => {
    const block = stampa.getBlockById('button');

    expect(typeof block).toBe('object');
  })
})