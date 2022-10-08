export default class Store {
  // private variables start with a "#"
  #data = {};
  #meta = {
    length: 0,
  };

  // runs immediatley on class Instantiation
  constructor(name, options) {
    this.#meta.name = name;
    this.#meta.options = options;
  }

  // API

  // getters and setters(covered in OOJS)
  //simply returns data
  get getData() {
    return this.#data;
  }

  // sets data
  // data is type Object
  set setData(data) {
    if (!checkColumns(data, this.#meta.options.types)) {
      throw new Error(
        `db expected a document with these columns: ${Object.keys(
          this.#meta.options.types
        )},but got 
        ${Object.keys(data)} for this document ${JSON.stringify(data)}
        `
      );
    }

    if (!checkTypes(data, this.#meta.options.types)) {
      throw new Error(`db expected a document with these types: ${Object.values(
        this.#meta.options.types
      )},
      but got ${Object.values(data)} for this document ${JSON.stringify(
        data
      )}`);
    }

    data._id = this.#meta.length;

    if (this.#meta.options && this.#meta.options.timeStamp) {
      data.timeStamp = Date.now();
    }
    this.#data[this.#meta.length] = data;
    this.#meta.length++;
  }
}

Store.prototype.insert = function (data) {
  // invoking the setter
  // this keyword points to the class(instantiated object)
  this.setData = data;
};

Store.prototype.getByid = function (id) {
  const data = this.getData; // get the pointer the data(cause it's private we cannot access it directly)
  //object(remember the value by reference concept)
  if (data[id]) {
    // checking if id exists
    return data[id]; // returning the document
  } else {
    return "noDoc"; // for now a str will do
    // but an error object is more appropriate(future worry)
  }
};

Store.prototype.getAll = function () {
  return this.getData;
};

function checkColumns(doc, types) {
  let checkOut = true; // state -> the most important value here
  // if true everything is correct else not

  // yes you can definetley use forEach below instead of map(will change it too)
  // react.js habits cause me to use map everywhere 😂😂 i just noticed writing the article
  Object.keys(types).map((key, i) => {
    if (!checkOut) return checkOut;

    if (doc[key] === undefined) {
      console.log(key, "is missing in this document");

      checkOut = false;
    }
  });

  if (Object.keys(types).length !== Object.keys(doc).length) checkOut = false;

  return checkOut;
}
