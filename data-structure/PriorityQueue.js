class PriorityQueue {
    constructor(compareFn){
        this.heap = [];
        this.compareFn = compareFn || ((a, b) => a - b);
    }

    //helpers
    swap(i, j){
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    heapifyUp(){
        let index = this.heap.length - 1;
        while(index > 0 && this.compareFn(this.heap[index], this.heap[this.getParent(index)]) < 0){
            this.swap(index, this.getParent(index));
            index = this.getParent(index);
        }
    }

    heapifyDown(index = 0){
        let smallest = index;
        while(true){
            let left = this.getLeftChild(index);
            let right = this.getRightChild(index);
            smallest = index;
            if(left < this.heap.length && this.compareFn(this.heap[left], this.heap[smallest]) < 0){
                smallest = left;
            }
            if(right < this.heap.length && this.compareFn(this.heap[right], this.heap[smallest]) < 0){
                smallest = right;
            }
            if(smallest === index){
                break;
            }
            this.swap(index, smallest);
            index = smallest;
        }
    }

    // general
    getParent(i){
        return Math.floor((i - 1) / 2);
    }

    getLeftChild(i){
        return 2 * i + 1;
    }

    getRightChild(i){
        return 2 * i + 2;
    }

    size(){
        return this.heap.length;
    }

    isEmpty(){
        return this.size() === 0;
    }

    peek(){
        return this.heap[0];
    }

    push(value){
        this.heap.push(value);
        this.heapifyUp();
    }

    pop(){
        if(this.isEmpty()) return null;
        const root = this.heap[0];
        const last = this.heap.pop();

        if(!this.isEmpty()){
            this.heap[0] = last;
            this.heapifyDown(0);
        }
        return root;
    }
}

const pq = new PriorityQueue((a, b) => a - b);
pq.push(5);
pq.push(2);
pq.push(8);
pq.push(1);
console.log(pq.pop()); // 1
console.log(pq.pop()); // 2
console.log(pq.pop()); // 5
console.log(pq.pop()); // 8

// HeapSort
function heapSort(arr) {
    const pq = new PriorityQueue((a, b) => a - b); // min-heap
    for (let num of arr) {
        pq.push(num);
    }
    const sorted = [];
    while (!pq.isEmpty()) {
        sorted.push(pq.pop());
    }
    return sorted;
}
const arr = [5, 2, 8, 1, 3];
const sortedArr = heapSort(arr);
console.log(sortedArr);
