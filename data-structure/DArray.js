class DArray {
  // Private properties
  #size = 0;          // Current number of elements
  #capacity = 0;      // Current capacity of the array
  #arr = null;        // Underlying Uint32Array storage
  #CAP_EXPONENT = 2;  // Factor to increase capacity when resizing

  // Constructor: initialize array with given capacity
  constructor(cap) {
    if (cap <= 0) return;
    this.#capacity = cap;
    this.#arr = new Uint32Array(cap);
  }

  // Resize internal array to new capacity, optionally filling extra space with `fill`
  resize(new_cap, fill = 0) {
    const tmp = new Uint32Array(new_cap);

    // Copy existing elements
    for (let i = 0; i < this.#size; ++i) {
      tmp[i] = this.#arr[i];
    }

    // Fill remaining space with `fill`
    for (let i = this.#size; i < new_cap; ++i) {
      tmp[i] = fill;
    }

    this.#capacity = new_cap;
    this.#arr = tmp;
  }

  // Add element to the end of the array
  push_back(elem) {
    // Resize if capacity exceeded
    if (this.#size === this.#capacity) {
      this.resize(this.#capacity * this.#CAP_EXPONENT);
    }
    this.#arr[this.#size++] = elem;
  }

  // Remove element from the end of the array
  pop_back() {
    if (this.#size === 0) {
      throw new Error("Array is empty");
    }
    return this.#arr[--this.#size];
  }

  // Access element by index with bounds checking
  at(index) {
    if (index < 0 || index >= this.#size) {
      throw new Error('Out of range');
    }
    return this.#arr[index];
  }

  // Remove element at a specific position
  erase(pos) {
    if (pos < 0 || pos >= this.#size) {
      throw new Error("Index out of bounds");
    }

    // Shift all elements after pos to the left
    for (let i = pos; i < this.#size - 1; i++) {
      this.#arr[i] = this.#arr[i + 1];
    }

    this.#size--;
  }

  // Insert element at a specific position
  insert(pos, value) {
    if (pos < 0 || pos >= this.#size) {
      throw new Error("Index out of bounds");
    }

    // Resize if needed
    if (this.#size === this.#capacity) {
      this.resize(this.#capacity * this.#CAP_EXPONENT);
    }

    // Shift elements to the right
    for (let i = this.#size; i > pos; --i) {
      this.#arr[i] = this.#arr[i - 1];
    }

    this.#arr[pos] = value;
    this.#size++;
  }

  // Swap two elements by index
  swap(i, j) {
    if (i < 0 || i >= this.#size || j < 0 || j >= this.#size) {
      throw new Error("Index out of bounds");
    }
    let tmp = this.#arr[i];
    this.#arr[i] = this.#arr[j];
    this.#arr[j] = tmp;
  }

  // Generator to iterate over values
  *values() {
    for (let i = 0; i < this.#size; i++) {
      yield this.#arr[i];
    }
  }

  // Generator to iterate over keys (indices)
  *keys() {
    for (let i = 0; i < this.#size; i++) {
      yield i;
    }
  }

  // forEach method: executes a callback for each element
  forEach(fn) {
    for (let i = 0; i < this.#size; ++i) {
      fn(this.#arr[i], i, this);
    }
  }

  // Map method: returns new DArray with results of callback
  map(fn) {
    let res = new DArray(this.#size);
    for (let i = 0; i < this.#size; ++i) {
      res.push_back(fn(this.#arr[i], i, this));
    }
    return res;
  }

  // Filter method: returns new DArray with elements that pass the callback
  filter(fn) {
    let res = new DArray(this.#size);
    for (let i = 0; i < this.#size; ++i) {
      if (fn(this.#arr[i], i, this)) {
        res.push_back(this.#arr[i]);
      }
    }
    return res;
  }

  // Reduce method: applies a function to reduce array to a single value
  reduce(fn, init) {
    if (this.#size === 0 && init === undefined) {
      throw new Error("Reduce of empty array with no initial value");
    }

    let acc, startIndex;
    if (init !== undefined) {
      acc = init;
      startIndex = 0;
    } else {
      acc = this.#arr[0];
      startIndex = 1;
    }

    for (let i = startIndex; i < this.#size; ++i) {
      acc = fn(acc, this.#arr[i], i, this);
    }
    return acc;
  }

  // some method: returns true if any element passes the callback
  some(fn) {
    for (let i = 0; i < this.#size; ++i) {
      if (fn(this.#arr[i], i, this)) {
        return true;
      }
    }
    return false;
  }

  // find method: returns first element that passes the callback
  find(fn) {
    for (let i = 0; i < this.#size; ++i) {
      if (fn(this.#arr[i], i, this)) {
        return this.#arr[i];
      }
    }
    return undefined;
  }

  // findIndex method: returns index of first element that passes the callback
  findIndex(fn) {
    for (let i = 0; i < this.#size; ++i) {
      if (fn(this.#arr[i], i, this)) {
        return i;
      }
    }
    return -1;
  }

  // includes method: checks if value exists in array
  includes(value) {
    for (let i = 0; i < this.#size; i++) {
      if (this.#arr[i] === value) {
        return true;
      }
    }
    return false;
  }

  // Iterator to allow spreading and for...of loops
  [Symbol.iterator]() {
    const collection = this.#arr;
    const collection_length = this.#size;
    let index = 0;
    return {
      next() {
        if (index < collection_length) {
          return { value: collection[index++], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

// ===== Example usage =====
const arr = new DArray(5);

// Push elements to array
arr.push_back(4);
arr.push_back(10);
arr.push_back(3);
arr.push_back(4);
arr.push_back(5);
arr.push_back(20); // triggers resize
arr.pop_back();    // removes last element (20)

// Access element by index
console.log(...arr);      // spread operator to print all
console.log(arr.at(2));   // element at index 2

// Iterate over keys
for (const i of arr.keys()) {
  console.log(i);
}

// Iterate over values
for (const val of arr.values()) {
  console.log(val);
}

// forEach usage
arr.forEach((value, index) => {
  console.log(`arr[${index}] = ${value}`);
});

// map usage: square each element
const squared = arr.map(x => x * x);
console.log([...squared]);

// filter usage: keep even numbers
const even = arr.filter(x => x % 2 === 0);
console.log([...even]);

// reduce usage: sum of elements
const sum = arr.reduce((acc, val) => acc + val, 0);
console.log(sum);

// some usage: check if any element > 3
console.log(arr.some(x => x > 3));

// find usage: first element > 15
console.log(arr.find(x => x > 15));

// find usage: first element > 3
console.log(arr.find(x => x > 3));
