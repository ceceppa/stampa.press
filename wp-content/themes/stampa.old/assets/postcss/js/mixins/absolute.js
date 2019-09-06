module.exports = (mixin, zindex = 0) => {
  const value = zindex;
  return {
    position: 'absolute',
    zIndex: value,
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
  };
};
