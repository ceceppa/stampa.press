let effects = store => {
  store
    .on('buttonText')
    .subscribe(buttonText =>
      console.log('The user updated buttonText to', buttonText)
    );
  return store;
};

export default effects;
