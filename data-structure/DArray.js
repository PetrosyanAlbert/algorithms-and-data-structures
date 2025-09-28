 class DArray {
  #size = 0;
  #capacity = 0;
  #arr = null;
  #CAP_EXPONENT = 2;

  constructor(cap) {
    if (cap <= 0) return;
    this.#capacity = cap;
    this.#arr = new Uint32Array(cap);
  }

  resize(new_cap, fill = 0) {

    const tmp = new Uint32Array(new_cap);
    for (let i = 0; i < this.#size; ++i) {
      tmp[i] = this.#arr[i];
    }

    for (let i = this.#size; i < new_cap; ++i) {
      tmp[i] = fill;
    }
    this.#capacity = new_cap;

    this.#arr = tmp;
  }

  push_back(elem) {

    if (this.#size === this.#capacity) {
      this.resize(this.#capacity * this.#CAP_EXPONENT);
    }

    this.#arr[this.#size++] = elem;
  }

  pop_back(){

    return this.#arr[this.#size - 1];
  }

  at(index){

    if(index < 0 && index >= this.#size){
        throw new Error('Out of range');
    }

    return this.#arr[index];
  }

  erase(pos) {

  if (pos < 0 || pos >= this.#size) {
    throw new Error("Index out of bounds");
  }

  for (let i = pos; i < this.#size - 1; i++) {
    this.#arr[i] = this.#arr[i + 1];
  }

  this.#size--;
  }

  insert(pos, value){

    if(pos < 0 || pos >= this.#size){
        throw new Error("Index out of bounds");
    }

    if (this.#size === this.#capacity) {
      this.resize(this.#capacity * this.#CAP_EXPONENT);
    }

    for(let i = this.#size; i > pos; --i){
        this.#arr[i] = this.#arr[i - 1];
    }

    this.#arr[pos] = value;
    this.#size++;
  }

  swap(i, j){
    if (i < 0 || i >= this.#size || j < 0 || j >= this.#size) {
        throw new Error("Index out of bounds");
    }
    for(let i = 0; i < this.#size; ++i){
        let tmp = this.#arr[i];
        this.#arr[i] = this.#arr[j];
        this.#arr[j] = tmp;
    }
  }

  *values(){
    for (let i = 0; i < this.#size; i++) {
        yield this.#arr[i];
    }
  }

  *keys(){
    for (let i = 0; i < this.#size; i++) {
        yield i;
    }
  }

  forEach(fn){
    for(let i = 0; i < this.#size; ++i){
        fn(this.#arr[i], i, this);
    }
  }

  map(fn){
    let res = new DArray(this.#size);
    for(let i = 0; i < this.#size; ++i){
        res.push_back(fn(this.#arr[i], i, this));
    }
    return res;
  }

  filter(fn){
    let res = new DArray(this.#size);
    for(let i = 0; i < this.#size; ++i){
        if(fn(this.#arr[i], i, this)){
            res.push_back(this.#arr[i]);
        }
    }
    return res;
  }

  reduce(fn, init){
    if (this.#size === 0 && init === undefined) {
        throw new Error("Reduce of empty array with no initial value");
    }

    let acc;
    let startIndex;
    if(init !== undefined){
        acc = init;
        startIndex = 0;
    }else{
        accumulator = this.#arr[0];
        startIndex = 1;
    }
    for(let i = startIndex; i < this.#size; ++i){
        acc = fn(acc, this.#arr[i], i, this);
    }
    return acc;
  }

  some(fn){
    for(let i = 0; i < this.#size; ++i){
        if(fn(this.#arr[i], i, this)){
            return true;
        }
    }
    return false;
  }

  find(fn){
    for(let i = 0; i < this.#size; ++i){
        if(fn(this.#arr[i], i, this)){
            return this.#arr[i];
        }
    }
    return undefined;
  }

  findIndex(fn){
    for(let i = 0; i < this.#size; ++i){
        if(fn(this.#arr[i], i, this)){
            return i;
        }
    }
    return -1;
  }

  includes(value){
    for (let i = 0; i < this.#size; i++) {
        if (this.#arr[i] === value) {
        return true;
        }   
    }
    return false;
  }

  [Symbol.iterator]() {

    const collection = this.#arr;
    const collection_length = this.#size;
    let index = 0;
    return {
      next() {
        if (index < collection_length) {
          return {
            value: collection[index++],
            done: false,
          };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

const arr = new DArray(5);
arr.push_back(4);
arr.push_back(10);
arr.push_back(3);
arr.push_back(4);
arr.push_back(5);
arr.push_back(20);
arr.pop_back();
console.log(...arr);
console.log(arr.at(2));

for (const i of arr.keys()) {
  console.log(i);
}

for (const val of arr.values()) {
  console.log(val);
}


arr.forEach((value, index) => {
  console.log(`arr[${index}] = ${value}`);
});


const squared = arr.map(x => x * x);

console.log([...squared]);


const even = arr.filter(x => x % 2 === 0);

console.log([...even]);

const sum = arr.reduce((acc, val) => acc + val, 0);
console.log(sum);


console.log(arr.some(x => x > 3));


console.log(arr.find(x => x > 15));

