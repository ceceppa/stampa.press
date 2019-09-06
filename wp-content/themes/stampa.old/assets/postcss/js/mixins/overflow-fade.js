module.exports = (mixin, color, fade = '2.5em') => {
  const content = {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: fade,
    'box-shadow': `inset 0 calc(${fade} * -1) calc(${fade} * 0.6) calc(${fade} * -0.4) ${color}`,
    'z-index': 100,
  };
  return content;
};
