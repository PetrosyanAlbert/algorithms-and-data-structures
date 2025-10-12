class Stack {
    #capacity;
    #size;

    constructor(initialCapacity = 16) {
        this.data = new Array(initialCapacity);
        this.top = 0;
        this.#capacity = initialCapacity;
        this.#size = 0;
    }

    isEmpty() {
        return this.#size === 0;
    }

    get size() {
        return this.#size;
    }

    push(elem) {
        if (this.#size === this.#capacity) {
            throw new Error("Stack is full");
        }
        this.data[this.top++] = elem;
        this.#size++;
    }

    pop() {
        if (this.isEmpty()) throw new Error("Stack is empty");
        this.top--;
        this.#size--;
        const value = this.data[this.top];
        return value; 
    }

    clear() {
        this.top = 0;
        this.#size = 0;
        this.data.fill(undefined); 
    }

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
let st = new Stack();
for (let i = 0; i < 16; ++i) {
    st.push(i);
}
st.push(100);
st.push(200);
st.push(300);
st.push(400);
console.log("Stack contents:");
for (let item of st) {
    console.log(item);
}
console.log("Popped:", st.pop()); 
console.log("Popped:", st.pop()); 
console.log("Popped:", st.pop());
console.log("Current size:", st.size);  
console.log("Is empty?", st.isEmpty()); 
st.clear();
console.log("After clear, size =", st.size);
console.log("Is empty?", st.isEmpty());   
