module.exports = (mixin, width, height) => {
  const value = (height / width) * 100;
  return {
    padding: `0 0 ${value}%`,
    position: 'relative',
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    height: 0,
  };
};
