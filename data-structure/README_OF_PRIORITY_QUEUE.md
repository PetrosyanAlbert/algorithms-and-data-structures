PriorityQueue

PriorityQueue is a universal priority queue implementation in JavaScript using a binary heap.
It supports min-heap, max-heap, and custom priority rules through a comparator function.

⚙️ Constructor
new PriorityQueue(compareFn)

compareFn (optional) — a function to compare two elements (a, b) => ....

Returns < 0 → a has higher priority than b

Returns > 0 → a has lower priority than b

Defaults to min-heap if not provided.

Example comparators:

// Min-heap (default)
(a, b) => a - b

// Max-heap
(a, b) => b - a

// Custom priority for objects
(a, b) => a.priority - b.priority

🛠 Methods
Method	Description
push(value)	Inserts an element into the queue and restores the heap property.
pop()	Removes and returns the element with the highest priority (root of the heap).
peek()	Returns the root element without removing it.
size()	Returns the number of elements in the queue.
isEmpty()	Checks if the queue is empty.

🔧 Usage Examples
Min-heap (ascending order)
const pq = new PriorityQueue();

pq.push(5);
pq.push(2);
pq.push(8);
pq.push(1);

console.log(pq.pop()); // 1
console.log(pq.pop()); // 2
console.log(pq.pop()); // 5
console.log(pq.pop()); // 8

Max-heap (descending order)
const pq = new PriorityQueue((a, b) => b - a);

pq.push(5);
pq.push(2);
pq.push(8);
pq.push(1);

console.log(pq.pop()); // 8
console.log(pq.pop()); // 5
console.log(pq.pop()); // 2
console.log(pq.pop()); // 1

Custom priority (objects)
const pq = new PriorityQueue((a, b) => a.priority - b.priority);

pq.push({ task: "A", priority: 3 });
pq.push({ task: "B", priority: 1 });
pq.push({ task: "C", priority: 2 });

console.log(pq.pop()); // { task: "B", priority: 1 }
console.log(pq.pop()); // { task: "C", priority: 2 }
console.log(pq.pop()); // { task: "A", priority: 3 }

🔹 Implementation Highlights

Uses an array to store heap elements.

push and pop operations run in O(log n) time.

The universal comparator allows changing heap type without modifying core logic.

heapifyUp and heapifyDown ensure the heap property is maintained after insertions and deletions.

🔹 Time Complexity
Operation	Time Complexity
push	O(log n)
pop	O(log n)
peek	O(1)
size	O(1)
🔹 Notes

Use (a, b) => a - b for a min-heap.

Use (a, b) => b - a for a max-heap.

Custom comparators can be used for objects or complex priority rules.
