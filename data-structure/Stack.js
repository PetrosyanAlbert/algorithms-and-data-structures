class Stack {
    #capacity;
    #size;

    constructor(initialCapacity = 16) {
        // Allocate internal array with given capacity
        this.data = new Array(initialCapacity);

        // 'top' points to the index where the next element will be inserted
        this.top = 0;

        // Private fields
        this.#capacity = initialCapacity;
        this.#size = 0;
    }

    // ✅ Returns true if stack is empty
    isEmpty() {
        return this.#size === 0;
    }

    // ✅ Returns the current number of elements
    get size() {
        return this.#size;
    }

    // ✅ Pushes (adds) a new element on top of the stack
    push(elem) {
        // If the stack is full, double its capacity
        if (this.#size === this.#capacity) {
            this.resize();
        }

        // Store element and move top pointer forward
        this.data[this.top++] = elem;
        this.#size++;
    }

    // ✅ Pops (removes) the top element and returns it
    pop() {
        if (this.isEmpty()) throw new Error("Stack is empty");

        // Move 'top' pointer back to previous element
        this.top--;
        this.#size--;

        // Get the value at new top position
        const value = this.data[this.top];
        this.data[this.top] = undefined; // optional cleanup
        return value; // return popped value
    }

    // ✅ Clears the entire stack
    clear() {
        this.top = 0;
        this.#size = 0;
        this.data.fill(undefined); // optional: reset elements
    }

    // ✅ Doubles the internal storage capacity when full
    resize() {
        const old_cap = this.#capacity;
        this.#capacity *= 2;

        // Create new, bigger array
        const newData = new Array(this.#capacity);

        // Copy old elements
        for (let i = 0; i < old_cap; ++i) {
            newData[i] = this.data[i];
        }

        this.data = newData;
    }

    // ✅ Makes the stack iterable (from bottom to top)
    [Symbol.iterator]() {
        let index = 0;
        let size = this.#size;
        let arr = this.data;

        return {
            next() {
                if (index < size) {
                    return { value: arr[index++], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
}

// ------------------ 🧪 USAGE EXAMPLES ------------------

// 1️⃣ Create new stack
let st = new Stack();

// 2️⃣ Push elements
for (let i = 0; i < 16; ++i) {
    st.push(i);
}

// 3️⃣ Automatically resizes when capacity is full
st.push(100);
st.push(200);
st.push(300);
st.push(400);

// 4️⃣ Iterate through all elements
console.log("Stack contents:");
for (let item of st) {
    console.log(item);
}

console.log("----------------");

// 5️⃣ Pop (remove) elements from top
console.log("Popped:", st.pop()); // removes 400
console.log("Popped:", st.pop()); // removes 300
console.log("Popped:", st.pop()); // removes 200

console.log("----------------");

// 6️⃣ Check size and emptiness
console.log("Current size:", st.size);   // e.g. 17
console.log("Is empty?", st.isEmpty());  // false

console.log("----------------");

// 7️⃣ Clear the stack
st.clear();
console.log("After clear, size =", st.size); // 0
console.log("Is empty?", st.isEmpty());      // true
