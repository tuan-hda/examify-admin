const isEmptyObject = (object: Object) => {
  return (
    object && Object.keys(object).length === 0 && Object.getPrototypeOf(object) === Object.prototype
  );
};

export default isEmptyObject;
