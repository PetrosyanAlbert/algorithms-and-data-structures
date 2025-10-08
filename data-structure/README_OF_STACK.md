# 🗂 Stack — Dynamic Array-Based Stack in JavaScript

`Stack` is a **dynamic, high-performance stack** implemented using a **resizable array**.  
Supports fast push/pop operations, iteration, and automatic resizing when the internal array is full.

---

## ✨ Features

- 🔹 **Push elements**: `push(elem)`  
- 🔹 **Pop elements**: `pop()`  
- 🔹 **Check emptiness**: `isEmpty()`  
- 🔹 **Check size**: `size` property  
- 🔹 **Clear stack**: `clear()`  
- 🔹 **Automatic resizing** when capacity is exceeded  
- 🔹 **Iterable**: Use `for...of` to traverse elements from bottom to top  

---

## 💻 Usage Examples

```javascript
// 1️⃣ Create a new stack
let st = new Stack();

// 2️⃣ Push elements
for (let i = 0; i < 16; ++i) st.push(i);

// 3️⃣ Automatic resizing when capacity is full
st.push(100);
st.push(200);
st.push(300);
st.push(400);

// 4️⃣ Iterate through elements (bottom → top)
for (let item of st) console.log(item);

// 5️⃣ Pop (remove) elements from top
console.log("Popped:", st.pop()); // 400
console.log("Popped:", st.pop()); // 300
console.log("Popped:", st.pop()); // 200

// 6️⃣ Check size and emptiness
console.log("Current size:", st.size);      // e.g. 17
console.log("Is empty?", st.isEmpty());     // false

// 7️⃣ Clear the stack
st.clear();
console.log("After clear, size =", st.size); // 0
console.log("Is empty?", st.isEmpty());      // true

💡 Implementation Details

Maintains an internal array data and a top pointer for the next insertion index.

Uses private fields #capacity and #size for internal tracking.

Automatic resizing ensures push operations never fail.

Stack is iterable using [Symbol.iterator]() for easy traversal.

Provides efficient pop and push operations at the top (O(1) amortized).

🏷 Advantages

✅ Simple and fast for LIFO operations

✅ Dynamic resizing — never worry about capacity

✅ Iterable and easy to use in for...of loops

✅ Clear API with minimal overhead
