class Node {
    constructor(data, next = null){
        this.data = data; // store the node value
        this.next = next; // reference to the next node
    }
}

class SList {
    constructor(iterables){
        this.head = null;   // first node (head of the list)
        this._size = 0;     // number of elements
        if(iterables){
            for(const item of iterables){
                this.push_back(item);
            }
        }
    }

    // Create list directly from array
    static fromArray(arr){
        return new SList(arr);
    }

    // Return current list size
    get size() { return this._size;}

    // Remove all elements
    clear(){
        this.head = null;
        this._size = 0;
    }

    // Add element at the end
    push_back(elem){
        if(!this.head){
            this.head = new Node(elem);
            this._size++;
            return;
        }
        let current = this.head;
        while(current.next){
            current = current.next;
        }
        current.next = new Node(elem);
        this._size++;
    }

    // Add element at the beginning
    push_front(elem){
        let newNode = new Node(elem);
        newNode.next = this.head;
        this.head = newNode;
        this._size++;
    }

    // Remove and return last element
    pop_back(){
        if(!this.head){
            return undefined;
        }else if(!this.head.next){
            const value = this.head.data;
            this.head = null;
            this._size--;
            return value;
        }else{
            let current =  this.head;
            while(current.next.next){
                current = current.next;
            }
            const value = current.next.data;
            current.next = null;
            this._size--;
            return value;
        }
    }

    // Remove and return first element
    pop_front(){
        if(!this.head){
            return undefined;
        }
        const value = this.head.data;
        this.head = this.head.next;
        this._size--;
        return value;
    }

    // Convert list to array
    toArray(){
        const res = [];
        let current = this.head;
        while(current){
            res.push(current.data);
            current = current.next;
        }
        return res;
    }

    // Get first element
    front(){
        if(!this.head){
            return undefined;
        }
        return this.head.data;
    }

    // Check if list is empty
    isEmpty(){
        return this._size === 0;
    }

    // Get element at index
    at(index){
        if(index < 0 || index >= this._size){
            throw new Error('Index out of bounds');
        }
        let current = this.head;
        let i = 0;
        while(i < index){
            current = current.next;
            i++;
        }
        return current.data;
    }

    // Insert element at specific index
    insert(index, value){
        if(index < 0 || index > this._size){
            throw new Error('Index out of bounds');
        }
        if(index === 0){
            this.push_front(value);
            return;
        }

        if(index === this._size){  // + оптимизация для вставки в конец
            this.push_back(value);
            return;
        }

        let current = this.head;
        let i = 0;
        while(i < index - 1){
            current = current.next;
            i++;
        }
        const newNode = new Node(value, current.next);
        current.next = newNode;
        this._size++;
    }

    // Remove element by index
    erase(index){
        if(index < 0 || index >= this._size){
            throw new Error('Index out of bounds');
        }
        if(index === 0){
            return this.pop_front();
        }
        let current = this.head;
        let i = 0;
        while(i < index - 1){
            current = current.next;
            i++;
        }
        let removeNode = current.next.data;
        current.next = current.next.next;
        this._size--;
        return removeNode;
    }

    // Reverse the entire list
    reverse(){
        let current = this.head;
        let prev = null;
        let next = null;
        while(current){
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        this.head = prev;
    }

    // Remove nodes by value with custom comparator
    remove(value, equals){
        let count = 0;

        // Handle head nodes
        while(this.head && equals(value, this.head.data)){
            this.head = this.head.next;
            count++;
            this._size--;
        }

        let cur = this.head;
        while(cur && cur.next){
            if(equals(value, cur.next.data)){
                cur.next = cur.next.next;
                count++;
                this._size--;
            } else {
                cur = cur.next;
            }
        }
        return count;
    }

    // Sort list using MergeSort
    sort(cmp){
        cmp = typeof cmp === 'function' ? cmp : (a, b) => a - b;
        function merge(left, right, cmp){
            const dummy = new Node(null);
            let current = dummy;
            while(left && right){
                if(cmp(left.data, right.data) <= 0){
                    current.next = left;
                    left = left.next;
                }else{
                    current.next = right;
                    right = right.next;
                }
                current = current.next;
            }
            current.next = left || right;
            return dummy.next;
        }
        function merge_sort(head, cmp){
            if(!head || !head.next) return head;

            let slow = head;
            let fast = head.next;

            while(fast && fast.next){
                slow = slow.next;
                fast = fast.next.next;
            }

            let mid = slow.next;
            slow.next = null;

            let left = merge_sort(head, cmp);
            let right = merge_sort(mid, cmp);
            return merge(left, right, cmp);
        }
        this.head = merge_sort(this.head, cmp);
    }

    // Merge two sorted lists into one sorted list
    merge(list, cmp){
        cmp = typeof cmp === 'function' ? cmp : (a, b) => a - b;
        if(!(list instanceof SList)) throw new Error("Argument must be an instance of SList");
        if(!this.head){
            this.head = list.head;
        }else{
            let cur = this.head;
            while(cur && cur.next){
                cur = cur.next;
            }
            cur.next = list.head;
        }
        this._size += list._size;
        this.sort(cmp);
    }

    // Iterator support (for-of loop)
    [Symbol.iterator](){
        let current = this.head;
        return {
            next(){
                if(current){
                    const value = current.data;
                    current = current.next;
                    return {value, done: false};
                }else{
                    return {value: undefined, done: true};
                }
            }
        }
    }
}



// USAGE EXAMPLES


// Create list and add elements
const list = new SList();
list.push_back(19);
list.push_back(23);
list.push_front(5);   // add to front
list.insert(1, 15);   // insert at index 1
console.log("List toArray:", list.toArray());

// // Access methods
console.log("First element (front):", list.front());
console.log("Element at index 2:", list.at(2));
console.log("Size:", list.size);
console.log("Is empty:", list.isEmpty());

// // Remove methods
console.log("Pop front:", list.pop_front());
console.log("Pop back:", list.pop_back());
console.log("Erase index 1:", list.erase(1));
console.log("List after removals:", list.toArray());

// Reverse list
list.reverse();
console.log("Reversed list:", list.toArray());

// Sort list
list.sort((a, b) => a - b);
console.log("Sorted list:", list.toArray());

// Merge with another sorted list
const list2 = SList.fromArray([10, 20, 30]);
list.merge(list2, (a, b) => a - b);
console.log("Merged list:", list.toArray());

// Iterate with for-of
console.log("Iterating with for-of:");
for(const val of list){
    console.log(val);
}
