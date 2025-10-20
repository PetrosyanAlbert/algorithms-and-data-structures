# 🌳 Binary Search Tree (BST) Implementation in JavaScript

A fully functional **Binary Search Tree (BST)** implemented in JavaScript with both **recursive** and **iterative** methods.  
Includes insertion, searching, deletion, and all major traversal algorithms (in-order, pre-order, post-order, level-order).

---

## 📦 Features

- ✅ Recursive & Iterative insertion methods  
- ✅ Recursive & Iterative search (`contains`)  
- ✅ Recursive node removal (`removeRecursive`)  
- ✅ Traversals:
  - In-Order (LNR)
  - Pre-Order (NLR)
  - Post-Order (LRN)
  - Level-Order (BFS)
- ✅ Utility methods:
  - `getMin(node)`
  - `getMax(node)`
  - `getHeight()`
- ⚙️ Optional extensions:
  - `validateBST()`
  - `isEmpty()`
  - `getSize()`

---

## 🧠 How the BST Works

Each node contains:
```js
class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

Example Usage
const tree = new BST();

// Insert elements
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);
tree.insert(13);
tree.insert(16);

// Traversals
console.log("🔹 In-Order (Iterative):", tree.inOrder());
console.log("🔹 Pre-Order (Iterative):", tree.preorder());
console.log("🔹 Post-Order (Iterative):", tree.postOrder());
console.log("🔹 Level-Order (BFS):", tree.levelOrder());

// Searching
console.log("🔍 Contains 7:", tree.contains(7));
console.log("🔍 Contains 42:", tree.containsRecursive(42));

// Min, Max, Height
console.log("⬇️ Minimum value:", tree.getMin(tree.root).data);
console.log("⬆️ Maximum value:", tree.getMax(tree.root).data);
console.log("🌳 Tree height:", tree.getHeight());

// Removal
console.log("🗑 Removing node 7...");
tree.removeRecursive(7);
console.log("🔹 In-Order after removal:", tree.inOrder());

🔹 In-Order (Iterative): [ 3, 5, 7, 10, 13, 15, 16 ]
🔹 Pre-Order (Iterative): [ 10, 5, 3, 7, 15, 13, 16 ]
🔹 Post-Order (Iterative): [ 3, 7, 5, 13, 16, 15, 10 ]
🔹 Level-Order (BFS): [ 10, 5, 15, 3, 7, 13, 16 ]

🔍 Contains 7: true
🔍 Contains 42: false

⬇️ Minimum value: 3
⬆️ Maximum value: 16
🌳 Tree height: 3

🗑 Removing node 7...
🔹 In-Order after removal: [ 3, 5, 10, 13, 15, 16 ]


