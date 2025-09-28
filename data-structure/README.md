# DynamicArray (JS)

**DynamicArray** is a JavaScript implementation of a dynamic array, similar to the C++ `vector`.  
It uses a **typed buffer (`Uint32Array`)** internally, supports dynamic resizing, and provides most of the standard array functionalities along with additional features.

---

## 📦 Features

- Dynamic resizing and shrinking of the internal buffer.
- Element insertion, deletion, and swapping.
- Iterators: `keys()`, `values()`, `entries()`.
- Traversal methods: `forEach()`.
- Higher-order methods: `map()`, `filter()`, `reduce()`.
- Logical checks: `some()`, `every()`.
- Search methods: `find()`, `findIndex()`, `includes()`.

---

## ⚙️ Usage

### Creating a DynamicArray

```js
const arr = new DArray(5); // initial capacity 5
arr.push_back(10);
arr.push_back(20);
arr.push_back(30);

