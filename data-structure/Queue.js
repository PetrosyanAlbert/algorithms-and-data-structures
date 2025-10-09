class Queue {
    #capacity;   // 🔒 Maximum number of elements the queue can hold
    #size;       // 🔒 Current number of elements in the queue
    #isEmpty = 0; // 🔒 Constant representing the empty state (size = 0)

    constructor(capacity = 8) {
        // 🧱 Internal circular buffer (array used for queue storage)
        this.buffer = new Array(capacity); 
        
        // 📍 'front' — index of the first element in the queue
        this.front = 0;  
        
        // 📍 'rear' — index where the next element will be inserted
        this.rear = 0;   
        
        this.#size = 0;         // initially queue is empty
        this.#capacity = capacity; // total capacity of queue
    }

    // ➕ Adds an element to the rear (end) of the queue
    enqueue(elem) {
        // ❌ If queue is full, throw an error
        if (this.#size === this.#capacity) {
            throw new Error("Queue overflow — queue is full!");
        }

        // ✅ Store element at the current rear position
        this.buffer[this.rear] = elem;

        // 🔁 Move rear forward (wrap around using modulo)
        this.rear = (this.rear + 1) % this.#capacity;

        // 📈 Increase size counter
        this.#size++;
    }
    
    // ➖ Removes an element from the front (start) of the queue
    dequeue() {
        // ❌ If queue is empty, cannot dequeue
        if (this.isEmpty()) {
            throw new Error("Queue underflow - queue is empty");
        }

        // 🔁 Move front forward (wrap around using modulo)
        this.front = (this.front + 1) % this.#capacity;

        // 📉 Decrease size counter
        this.#size--;
    }

    // 📏 Returns the number of elements in the queue
    get size() {
        return this.#size;
    }

    // 👀 Returns the element at the front without removing it
    get_front() {
        return this.buffer[this.front];
    }

    // 👀 Returns the element at the rear (last added)
    get_back() {
        return this.buffer[this.rear];
    }

    // 🖨️ Prints all elements in queue order (front → rear)
    print() {
        let result = [];
        let index = this.front;

        // 🔁 Iterate through all elements using circular indexing
        for (let i = 0; i < this.#size; ++i) {
            result.push(this.buffer[index]);
            index = (index + 1) % this.#capacity; // wrap around if needed
        }

        console.log("Queue:", result);
    }

    // ❓ Returns true if the queue is empty
    isEmpty() {
        return this.size === this.#isEmpty;
    }
}

// ======================= 🧪 USAGE EXAMPLES =======================

const q = new Queue(5); // create queue with capacity = 5

// ✅ Add elements to the queue
q.enqueue(10); // add 10
q.enqueue(20); // add 20
q.enqueue(30); // add 30
q.print(); // Queue: [10, 20, 30]

// ✅ Check the first and last elements
console.log("Front element:", q.get_front()); // should return 10
console.log("Back element:", q.get_back());   // should return 30

// ✅ Remove one element
q.dequeue(); // removes 10
q.print(); // Queue: [20, 30]

// ✅ Add more elements
q.enqueue(40);
q.enqueue(50);
q.enqueue(60);
q.print(); // Queue: [20, 30, 40, 50, 60]

// ✅ Check queue size
console.log("Current size:", q.size); // should return 5

// ✅ Remove a few elements
q.dequeue(); // removes 20
q.dequeue(); // removes 30
q.print(); // Queue: [40, 50, 60]

// ✅ Check if queue is empty
console.log("Is queue empty?", q.isEmpty()); // should return false