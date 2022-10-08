// function does not copy store, rather receives a pointer
// so no memory wastage
export function isInDb(store, id) {
  return store[id] !== undefined ? true : false;
}

export const types = {
  String: 1,
  Number: 2,
  Object: 3,
};

export const isStr = (val) => typeof val === "string"

export const isNumb = (val) => typeof val === "number"

export const isObj = (val) => typeof val === "object"