class Node {
  constructor(data, next = null, prev = null) {
    this.data = data;  
    this.next = next;  
    this.prev = prev;  
  }
}

class DoublyLinkedList {
  #head = null; 
  #tail = null; 
  #size = 0;
  
  constructor(iterables) {
    if (iterables === undefined) return;
    if (iterables && typeof iterables[Symbol.iterator] !== 'function') {
      iterables = [iterables];
    }
    for (const item of iterables) {
      this.push_back(item);
    }
  }

  get size() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === 0;
  }

  clear() {
    this.#head = this.#tail = null;
    this.#size = 0;
  }

  push_front(value) {
    const n = new Node(value);
    if (!this.#head) { 
      this.#head = this.#tail = n;
    } else {
      n.next = this.#head;
      this.#head.prev = n;
      this.#head = n;
    }
    this.#size++;
  }

  push_back(value) {
    const n = new Node(value);
    if (!this.#head) {
      this.#head = this.#tail = n;
    } else {
      n.prev = this.#tail;
      this.#tail.next = n;
      this.#tail = n;
    }
    this.#size++;
  }

  pop_front() {
    if (!this.#head) {
      throw new Error('List is empty');
    }
    const val = this.#head.data;
    if (this.#head === this.#tail) {
      this.#head = this.#tail = null;
    } else {
      this.#head = this.#head.next;
      this.#head.prev = null;
    }
    this.#size--;
    return val;
  }

  pop_back() {
    if (!this.#head) {
      throw new Error('List is empty');
    }
    const val = this.#tail.data;
    if (this.#head === this.#tail) {
      this.#head = this.#tail = null;
    } else {
      this.#tail = this.#tail.prev;
      this.#tail.next = null;
    }
    this.#size--;
    return val;
  }

  front() {
    if(this.#head){
      return this.#head.data;
    }else{
      throw new Error('List is empty');
    }
  }

  back() {
    if(this.#tail){
      return this.#tail.data;
    }else{
      throw new Error('List is empty');
    }
  }

  at(index) {
    if (index < 0 || index >= this.#size) {
        throw new Error('Index out of bounds');
    }
    let current;
    if (index < this.#size / 2) {
      current = this.#head;
      let i = 0;
      while (i < index) {
        current = current.next;
        i++;
      }
    } else {
      current = this.#tail;
      let i = this.#size - 1;
      while (i > index) {
        current = current.prev;
        i--;
      }
    }
    return current.data;
  }

  insert(index, value) {
   if (index < 0 || index > this.#size) {
    throw new Error('Index out of bounds');
   }
    if (index === 0) return this.push_front(value);
    if (index === this.#size) return this.push_back(value);
    let current;
    if (index < this.#size / 2) {
      current = this.#head;
      let i = 0;
      while (i < index - 1) {
        current = current.next;
        i++;
      }
    } else {
      current = this.#tail;
      let i = this.#size - 1;
      while (i > index - 1) {
        current = current.prev;
        i--;
      }
    }
    const n = new Node(value);
    n.next = current.next;
    n.prev = current;
    current.next.prev = n;
    current.next = n;
    this.#size++;
  }

  erase(index) {
    if (index < 0 || index >= this.#size) {
      throw new Error('Index out of bounds');
    }
    if (index === 0) return this.pop_front();
    if (index === this.#size - 1) return this.pop_back();
    let current;
    if (index < this.#size / 2) {
      current = this.#head;
      let i = 0;
      while (i < index) {
        current = current.next;
        i++;
      }
    } else {
      current = this.#tail;
      let i = this.#size - 1;
      while (i > index) {
        current = current.prev;
        i--;
      }
    }
    current.prev.next = current.next;
    current.next.prev = current.prev;
    this.#size--;
    return current.data;
  }

  remove(value, equals) {
    let count = 0;
    let current = this.#head;
    while (current) {
        if (equals(value, current.data)) {
            if (current.prev) {
                current.prev.next = current.next;
            } else {
                this.#head = current.next;
            }
            if (current.next) {
                current.next.prev = current.prev;
            } else {
                this.#tail = current.prev;
            }
            this.#size--;
            count++;
        }
        current = current.next;
    }
    return count;
  }

  reverse() {
    if (!this.#head) return;
    let current = this.#head;
    let tmp = null;
    while (current) {
      tmp = current.next;
      current.next = current.prev;
      current.prev = tmp;
      current = current.prev; 
    }
    tmp = this.#head;
    this.#head = this.#tail;
    this.#tail = tmp;
  }

  sort(cmp){
    cmp = typeof cmp === 'function' ? cmp : (a, b) => a - b;
    function merge(left, right, cmp){
      const dummy = new Node(null);
      let cur = dummy;
      while(left && right){
        if(cmp(left.data, right.data) <= 0){
          cur.next = left;
          left.prev = cur;
          left = left.next;
        }else{
          cur.next = right;
          right.prev = cur;
          right = right.next;
        }
        cur = cur.next;
      }
      cur.next = left || right;
      if(cur.next) cur.next.prev = cur;
      const head = dummy.next;
      if (head) head.prev = null;
      return head;
    }

    function mergeSort(head, cmp){
      if(!head || !head.next) return head;
      let slow = head;
      let fast = head;

      while(fast.next && fast.next.next){
        slow = slow.next;
        fast = fast.next.next;
      }
      let mid = slow.next;
      slow.next = null;
      if(mid) mid.prev = null;
      let left = mergeSort(head, cmp);
      let right = mergeSort(mid, cmp);
      return merge(left, right, cmp);
    }
    this.#head = mergeSort(this.#head, cmp);
    let tail = this.#head;
    while (tail && tail.next) {
      if (!tail.next) this.#tail = tail;
      tail = tail.next;
    }
  }

  merge(list, cmp) {
    if (!(list instanceof DoublyLinkedList)) throw new Error("Argument must be a DoublyLinkedList");
    cmp = typeof cmp === 'function' ? cmp : (a, b) => a - b;
    if (!this.#head) {
        this.#head = list.#head;
        this.#tail = list.#tail;
    } else if (list.#head) {
        this.#tail.next = list.#head;
        list.#head.prev = this.#tail;
        this.#tail = list.#tail;
    }
    this.sort(cmp);
  }

  [Symbol.iterator]() {
    let current = this.#head;
    return {
      next() {
        if (current) {
          const val = current.data;
          current = current.next;
          return { value: val, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}
// =================== TESTS ===================
const debug = () => {
  const list = new DoublyLinkedList([10, 5, 12]);
  console.log("=== size / isEmpty ===");
  console.log(list.size)
  console.log(list.isEmpty());  
  console.log("=== push_front / push_back ===");
  list.push_front(1);
  list.push_back(20);
  for (let x of list) console.log(x); 
  console.log("=== pop_front / pop_back ===");
  list.pop_front();
  list.pop_back();
  for (let x of list) console.log(x); 
  console.log("=== front / back ===");
  console.log(list.front());
  console.log(list.back());  
  console.log("=== at(index) ===");
  console.log(list.at(0)); 
  console.log(list.at(1)); 
  console.log(list.at(2)); 
  console.log("=== insert(index, value) ===");
  list.insert(1, 99);
  for (let x of list) console.log(x);
  console.log("=== erase(index) ===");
  list.erase(1);
  for (let x of list) console.log(x);
  console.log("=== remove(value) ===");
  list.push_back(5);
  list.push_back(5);
  list.remove(5, (a, b) => a === b);
  for (let x of list) console.log(x);
  console.log("=== reverse() ===");
  list.push_back(7);
  list.push_back(8);
  list.reverse();
  for (let x of list) console.log(x); 
  console.log("=== clear() ===");
  list.clear();
  console.log(list.size);    
  console.log(list.isEmpty());
  list.sort();
  for (let x of list) console.log(x); 
  let d = new DoublyLinkedList([13, 4, 6, 3, 0]);
  list.merge(d);
  for (let x of list) console.log(x);
}