export const isObjectEmpty = (obj) => {
  if (!obj) {
    return true;
  }
  return JSON.stringify(obj) === "{}"
};