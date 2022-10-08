const tracker = {
  id: 0, // needed to ID each channel and retrieve or update it's state
};

const search = function (comm, data) {
  let split = comm.split(" "); // ['age', '>', 23]
  // split[0] property to query
  // split[1] operator
  // compare against
  let filtered = [];
  // detecting the operator
  if (split[1] === "===" || split[1] === "==") {
    data.map((obj, i) => {
      // mapSearch maps every operator to a function that can handle it
      // and evalute it
      // mapSearch returns a boolean saying whether the object fits the query if true we add the object to the filtered
      if (mapSearch("eq", obj[split[0]], split[2])) {
        // e.g here mapSearch will map each object with a function
        // that checks for equality(eq)
        filtered.push(obj);
      }
    });
  } else if (split[1] === "<") {
    data.map((obj, i) => {
      // less than search
      if (mapSearch("ls", obj[split[0]], split[2])) {
        filtered.push(obj);
      }
    });
  } else if (split[1] === ">") {
    data.map((obj, i) => {
      // greater than search
      if (mapSearch("gt", obj[split[0]], split[2])) {
        filtered.push(obj);
      }
    });
  }
  return filtered; // assigned to f in Where function
};

const mapSearch = function (direct, a, b) {
  if (direct === "eq") {
    // comparers defined func below
    return comparers["eq"](a, b); // compare for equality
  } else if (direct === "gt") {
    return comparers["gt"](a, b); // is a > b
  } else if (direct === "ls") {
    return comparers["ls"](a, b); // is a < b
  } else {
    console.log("Not handled");
  }
};

const comparers = {
  eq: (a, b) => a === b,
  gt: (a, b) => a > b,
  ls: (a, b) => a < b,
};

function functionalObj(store) {
  this.id = NaN; // to give to tracker.id(self identity)
  // channelName will help with Identifying and dubugging for the developer using our db
  this.beginQuery = (channelName = "") => {
    // safeguard not to open the same query/channel twice
    if (tracker[this.id] && tracker[this.id].beganQ) {
      // checking if the channel already exists(when this.id !== NaN)
      console.warn("please close the previous query");
      return;
    }

    // opening a node/channel
    this.id = tracker.id;
    tracker[this.id] = {
      filtered: [], // holds filtered data
      beganQ: false, // initial status of the channel(began Query)
      cName: channelName === "" ? this.id : channelName,
    };

    tracker.id++; // for new channels

    // officially opening the channel to be queried

    // we will define the getAll func later
    // it basically does what it's says
    tracker[this.id].filtered = Object.values(store.getAll()); // to be filtered data
    tracker[this.id].beganQ = true; // opening the channel
    console.log("opening channel: ", tracker[this.id].cName); // for debugging
  };
  // end of begin query function
  this.Where = (str) => {
    // do not allow a query of the channel/node if not opened
    if (!tracker[this.id] || (tracker[this.id] && !tracker[this.id].beganQ)) {
      console.log("begin query to filter");
      return;
    }

    let f = search(str, tracker[this.id].filtered); // we will define search later(will return filtered data and can handle query strings)

    // update filtered data for the correct channel
    if (f.length > 0) {
      tracker[this.id].filtered = f;
    }
  };
  // end of where

  this.endQuery = () => {
    if (!tracker[this.id] || (tracker[this.id] && !tracker[this.id].beganQ)) {
      console.warn("no query to close");
      return;
    }

    // returns data
    return { data: tracker[this.id].filtered, channel: tracker[this.id].cName };
  };

  // end of endQuery

  this.close = () => {
    // if a node/channel exist destroy it
    if (tracker[this.id] && !tracker[this.id].closed) {
      Reflect.deleteProperty(tracker, this.id); // delete
      console.log("cleaned up", tracker);
    }
  };
}

export default function select(option = "*") {
  // checking if option is a number
  if (typeof option === 'number') {
    // return prevents select from running code below this if statement()
    // think of it as an early break
    return this.store.getByid(+option);
    // the +option converts option to a number just to make sure it is
  }
  // query mode code will be here
  return new functionalObj(this.store);
}
