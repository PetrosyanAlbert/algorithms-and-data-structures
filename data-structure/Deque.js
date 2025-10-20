class Deque {
    #blocks = [];
    #blockSize = 0;
    #frontBlock = 0;
    #backBlock = 0;
    #frontIndex = 0;
    #backIndex = 0;
    #size = 0;
    #MIN_BLOCK_SIZE = 4;
    #IS_EMPTY = 0;
    #MAGIC_ZERO = 0;
    constructor(blockSize = this.#MIN_BLOCK_SIZE){
        if(blockSize < this.#MIN_BLOCK_SIZE){
            throw new Error(`blockSize must be at least ${this.#MIN_BLOCK_SIZE}`);
        }
        this.#blockSize = blockSize;
        for(let i = 0; i < this.#MIN_BLOCK_SIZE; ++i){
            this.#blocks.push(new Array(this.#blockSize));
        }
        let mid = Math.floor(this.#blocks.length / 2);
        this.#frontBlock = mid - 1;
        this.#backBlock = mid;
        this.#frontIndex = this.#blockSize - 1;
        this.#backIndex = 0;
        this.#size = 0;
    }

    get size(){
        return this.#size;
    }

    isEmpty(){
        return this.#size === this.#IS_EMPTY;
    }

    push_back(value){
        if(this.#backIndex === this.#blockSize){
            if(this.#backBlock === this.#blocks.length - 1){
                this.resize();
            }
            this.#backBlock++;
            this.#backIndex = 0;
        }
        this.#blocks[this.#backBlock][this.#backIndex] = value;
        this.#backIndex++;
        this.#size++;
    }

    push_front(value){
        if(this.#frontIndex < 0){
            if(this.#frontBlock === 0){
                this.resize();
            }else{
                this.#frontBlock--;
            }
            this.#frontIndex = this.#blockSize - 1;
        }
        this.#blocks[this.#frontBlock][this.#frontIndex] = value;
        this.#frontIndex--;
        this.#size++;
    }

    pop_back(){
        if(this.isEmpty()) throw new Error("Deque is empty");
        this.#backIndex--;
        if(this.#backIndex < 0){
            this.#backBlock--;
            this.#backIndex = this.#blockSize - 1;
        }
        const value = this.#blocks[this.#backBlock][this.#backIndex];
        this.#size--;
        return value;
    }

    pop_front(){
        if(this.isEmpty()) throw new Error("Deque is empty");
        this.#frontIndex++;
        if(this.#frontIndex === this.#blockSize){
            this.#frontBlock++;
            this.#frontIndex = 0;
        }
        const value = this.#blocks[this.#frontBlock][this.#frontIndex];
        this.#size--;
        return value;
    }

    at(index){
        if (index < 0 || index >= this.#size) throw new Error("Index out of range");
        const offset = this.#frontIndex + 1 + index;
        const blockIndex = this.#frontBlock + Math.floor(offset / this.#blockSize);
        const innerIndex = offset % this.#blockSize;
        return this.#blocks[blockIndex][innerIndex];
    }

    *[Symbol.iterator](){
        let block = this.#frontBlock;
        let index = this.#frontIndex + 1;
        let count = 0;
        while(count < this.#size){
            if(index === this.#blockSize){
                block++;
                index = 0;
            }
            yield this.#blocks[block][index];
            count++;
            index++;
        }
    }

    toArray(){
        let arr = [];
        let block = this.#frontBlock;
        let index = this.#frontIndex + 1;
        let count = 0;
        while(count < this.#size){
            if(index === this.#blockSize){
                block++;
                index = 0;
            }
            arr.push(this.#blocks[block][index]);
            count++;
            index++;
        }
        return arr;
    }

    resize() {
        const oldArray = this.toArray(); 
        const oldSize = this.#blocks.length;
        const newSize = oldSize * 2;
        this.#blocks = [];
        for (let i = 0; i < newSize; i++) {
            this.#blocks.push(new Array(this.#blockSize));
        }
        const mid = Math.floor(newSize / 2);
        this.#frontBlock = mid - 1;
        this.#backBlock = mid;
        this.#frontIndex = this.#blockSize - 1;
        this.#backIndex = 0;
        this.#size = 0;
        for (let val of oldArray) {
            this.push_back(val);
        }
    }
}

function demoDequeOperations() {
    const d = new Deque();
    console.log("=== Adding elements to the back ===");
    d.push_back(10);
    d.push_back(20);
    d.push_back(30);
    console.log("Current deque:", d.toArray());
    console.log("=== Adding elements to the front ===");
    d.push_front(5);
    d.push_front(1);
    console.log("Current deque:", d.toArray());
    console.log("=== Automatic resizing ===");
    for(let i = 0; i < 20; i++) d.push_front(i);
    console.log("After adding 20 elements to the front (resize):", d.toArray());
    console.log("=== Accessing elements by index ===");
    console.log("Element at position 0:", d.at(0));
    console.log("Element at position 5:", d.at(5));
    console.log("Element at last position:", d.at(d.size - 1));
    console.log("=== Removing elements ===");
    console.log("pop_front():", d.pop_front());
    console.log("pop_back():", d.pop_back());
    console.log("Current deque after removal:", d.toArray());
    console.log("=== Iterating using for...of ===");
    for (const val of d) {
        console.log(val);
    }
    console.log("=== Deque size ===");
    console.log("Size:", d.size);
}

demoDequeOperations();






