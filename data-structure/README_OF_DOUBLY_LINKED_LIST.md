# 🔗 DoublyLinkedList — Doubly Linked List in JavaScript

`DoublyLinkedList` is a **fully-featured doubly linked list** implementation in JavaScript.  
It allows insertion, deletion, traversal, reversing, sorting, merging, and iteration using the `for...of` loop.  

---

## ✨ Features

- 🔹 **Dynamic insertion**: `push_front`, `push_back`, `insert(index, value)`  
- 🔹 **Dynamic removal**: `pop_front`, `pop_back`, `erase(index)`, `remove(value, equals)`  
- 🔹 **Access by index**: `at(index)`  
- 🔹 **Access first and last elements**: `front()`, `back()`  
- 🔹 **Reverse** the list: `reverse()`  
- 🔹 **Sort** with custom comparator using MergeSort: `sort(cmp)`  
- 🔹 **Merge** two doubly linked lists: `merge(list, cmp)`  
- 🔹 **Iterable** with `for...of` loops  
- 🔹 **Size tracking** and emptiness checks: `size`, `isEmpty()`  
- 🔹 **Create from iterable** (like arrays)  

---

## 💻 Usage Examples

```javascript
// Create a doubly linked list
const list = new DoublyLinkedList([10, 5, 12]);

// Size and emptiness
console.log(list.size);     // 3
console.log(list.isEmpty()); // false

// Add elements
list.push_front(1);
list.push_back(20);
for (let x of list) console.log(x); // 1, 10, 5, 12, 20

// Remove elements
list.pop_front();  // removes 1
list.pop_back();   // removes 20
for (let x of list) console.log(x); // 10, 5, 12

// Access first and last elements
console.log(list.front()); // 10
console.log(list.back());  // 12

// Access by index
console.log(list.at(0)); // 10
console.log(list.at(1)); // 5
console.log(list.at(2)); // 12

// Insert and erase
list.insert(1, 99);
for (let x of list) console.log(x); // 10, 99, 5, 12
list.erase(1);
for (let x of list) console.log(x); // 10, 5, 12

// Remove all nodes with value 5
list.push_back(5);
list.push_back(5);
list.remove(5, (a, b) => a === b);
for (let x of list) console.log(x); // 10, 12

// Reverse the list
list.push_back(7);
list.push_back(8);
list.reverse();
for (let x of list) console.log(x); // 8, 7, 12, 10

// Clear the list
list.clear();
console.log(list.size);     // 0
console.log(list.isEmpty()); // true

// Sorting
const d = new DoublyLinkedList([13, 4, 6, 3, 0]);
list.merge(d);
for (let x of list) console.log(x); // merged list

🔍 Implementation Details

Each node is represented by the Node class, with data, next, and prev.

Maintains head and tail pointers for fast operations at both ends.

remove supports custom equality comparators.

sort and merge accept custom comparators.

Optimized at(index) chooses the shortest path (from head or tail).

Iterable protocol allows using for...of seamlessly.

💡 Advantages

Full doubly linked list functionality

Efficient head/tail operations

Supports dynamic insertion/removal anywhere

Easy traversal and iteration

Sort and merge capabilities with custom comparators
