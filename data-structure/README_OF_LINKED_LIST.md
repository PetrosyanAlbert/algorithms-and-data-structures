# 🔗 SList — Singly Linked List Implementation in JavaScript

`SList` is a **singly linked list** implementation in JavaScript.  
It supports standard linked list operations like insertion, deletion, traversal, sorting, reversing, and merging, while providing iterator support for `for...of` loops.

---

## ✨ Features

- 🔹 **Dynamic insertion and removal** at both head and tail  
- 🔹 **Access by index** with `at(index)`  
- 🔹 **Push and pop** operations: `push_front`, `push_back`, `pop_front`, `pop_back`  
- 🔹 **Erase and remove** elements by index or value with custom comparator  
- 🔹 **Reverse** the entire list  
- 🔹 **Sort** the list using MergeSort  
- 🔹 **Merge** two sorted lists into a single sorted list  
- 🔹 Convert to array: `toArray()`  
- 🔹 Supports **iterators** (`for...of`)  
- 🔹 Create list directly from an array with `SList.fromArray(arr)`  

---

## 💻 Usage Examples

```javascript
// Create a new list
const list = new SList();

// Add elements
list.push_back(19);
list.push_back(23);
list.push_front(5);   // Add at the front
list.insert(1, 15);   // Insert at index 1

console.log("List toArray:", list.toArray()); // [5, 15, 19, 23]

// Access elements
console.log("First element (front):", list.front()); // 5
console.log("Element at index 2:", list.at(2)); // 19
console.log("Size:", list.size); // 4
console.log("Is empty:", list.isEmpty()); // false

// Remove elements
console.log("Pop front:", list.pop_front()); // 5
console.log("Pop back:", list.pop_back()); // 23
console.log("Erase index 1:", list.erase(1)); // 19
console.log("List after removals:", list.toArray()); // [15]

// Reverse the list
list.reverse();
console.log("Reversed list:", list.toArray()); // [15]

// Sort the list
list.push_back(10);
list.push_back(20);
list.sort((a, b) => a - b);
console.log("Sorted list:", list.toArray()); // [10, 15, 20]

// Merge with another sorted list
const list2 = SList.fromArray([5, 25, 30]);
list.merge(list2, (a, b) => a - b);
console.log("Merged list:", list.toArray()); // [5, 10, 15, 20, 25, 30]

// Iterate with for-of
console.log("Iterating with for-of:");
for(const val of list){
    console.log(val);
}

🔍 Internal Implementation Details

Each node is represented by the Node class with data and next properties.

The list tracks size with _size for constant-time size retrieval.

Sorting is implemented via MergeSort to maintain O(n log n) efficiency.

Merge operation appends another list and re-sorts to maintain order.

The list supports custom comparators for sort, merge, and remove.


💡 Advantages

Full linked list functionality with head and tail operations

Supports both index-based and value-based operations

Iterators and for...of loops supported

Easy conversion to array for interoperability with standard JS methods

⚡ Notes

remove(value, equals) allows a custom equality comparator function.

sort and merge can accept a comparator function (a, b) => number.

This implementation is singly linked, so pop_back and insert at arbitrary positions are O(n).
