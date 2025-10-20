class Queue {
    #capacity;  
    #size;      
    #isEmpty = 0;

    constructor(capacity = 8) {
        this.buffer = new Array(capacity); 
        this.front = 0;  
        this.rear = 0;   
        this.#size = 0;         
        this.#capacity = capacity; 
    }

    enqueue(elem) {
        if (this.#size === this.#capacity) {
            throw new Error("Queue overflow — queue is full!");
        }
        this.buffer[this.rear] = elem;
        this.rear = (this.rear + 1) % this.#capacity;
        this.#size++;
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue underflow - queue is empty");
        }
        const elem = this.buffer[this.front];  
        this.front = (this.front + 1) % this.#capacity;
        this.#size--;
        return elem;     
    }

    get size() {
        return this.#size;
    }

    get_front() {
        return this.buffer[this.front];
    }

    get_back() {
        if (this.isEmpty()) return undefined;
        const index = (this.rear - 1 + this.#capacity) % this.#capacity;
        return this.buffer[index];
    }

    print() {
        let result = [];
        let index = this.front;
        for (let i = 0; i < this.#size; ++i) {
            result.push(this.buffer[index]);
            index = (index + 1) % this.#capacity; 
        }
        console.log("Queue:", result);
    }

    isEmpty() {
        return this.size === this.#isEmpty;
    }
}
// ======================= 🧪 USAGE EXAMPLES =======================

const debug = () => {
    const q = new Queue(5);
    q.enqueue(10);
    q.enqueue(20); 
    q.enqueue(30);
    q.print(); 
    console.log("Front element:", q.get_front()); 
    console.log("Back element:", q.get_back());   
    q.dequeue(); 
    q.print();
    q.enqueue(40);
    q.enqueue(50);
    q.enqueue(60);
    q.print();
    console.log("Current size:", q.size);
    q.dequeue(); 
    q.dequeue(); 
    q.print(); 
    console.log("Is queue empty?", q.isEmpty()); 
}



module.exports = Queue;