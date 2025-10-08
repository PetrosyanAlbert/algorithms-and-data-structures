# 🌀 Deque — Block-Based Double-Ended Queue in JavaScript

`Deque` is a **high-performance double-ended queue (deque)** implemented in JavaScript using **blocks** for efficient insertion and removal from both ends.  
It supports random access by index, iteration, automatic resizing, and works efficiently even with large datasets.

---

## ✨ Features

- 🔹 **Add elements at both ends**: `push_front(value)`, `push_back(value)`  
- 🔹 **Remove elements from both ends**: `pop_front()`, `pop_back()`  
- 🔹 **Random access by index**: `at(index)`  
- 🔹 **Iterable**: Supports `for...of` loops  
- 🔹 **Automatic resizing** when capacity is exceeded  
- 🔹 **Check size and emptiness**: `size`, `isEmpty()`  
- 🔹 **Convert to array**: `toArray()`  

---

## 💻 Usage Examples

```javascript
const d = new Deque(); // default deque with 4 blocks

// === Adding elements ===
d.push_back(10);
d.push_back(20);
d.push_back(30);
console.log(d.toArray()); // [10, 20, 30]

d.push_front(5);
d.push_front(1);
console.log(d.toArray()); // [1, 5, 10, 20, 30]

// === Automatic resizing ===
for (let i = 0; i < 20; i++) d.push_front(i);
console.log(d.toArray()); // deque automatically resized and contains all elements

// === Access elements by index ===
console.log(d.at(0));        // first element
console.log(d.at(5));        // 6th element
console.log(d.at(d.size-1)); // last element

// === Removing elements ===
console.log(d.pop_front()); // removes first element
console.log(d.pop_back());  // removes last element
console.log(d.toArray());   // current deque after removals

// === Iterating using for...of ===
for (const val of d) {
  console.log(val);
}

// === Size and emptiness ===
console.log(d.size);      // current number of elements
console.log(d.isEmpty()); // check if deque is empty

💡 Implementation Details

Uses a block-based storage to minimize copying during insertion/removal.

Maintains frontBlock/backBlock and frontIndex/backIndex to track element positions.

Automatic resizing doubles the number of blocks when needed.

Supports iterators for easy traversal.

Designed for high-performance operations on both ends.


🏷 Advantages

Fast insertions/removals at both ends (amortized O(1))

Efficient random access

Can handle large number of elements with minimal overhead

Easy to iterate and convert to arrays

Scalable due to block-based structure
