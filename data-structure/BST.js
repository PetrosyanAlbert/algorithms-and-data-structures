const Queue = require('./Queue');
const Stack = require('./Stack');

class TreeNode {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor(){
        this.root = null;
    }

    //helpers
    _insert(node, value){
        if (!node) return new TreeNode(value);
        if (value < node.data) {
            node.left = this._insert(node.left, value);
        } else if (value > node.data) {
            node.right = this._insert(node.right, value);
        } else {
        return node;
        }
        return node; 
    }

    _contains(node, value){
        if(!node) return false;
        if(value === node.data) return true;
        if(value < node.data) return this._contains(node.left, value);
        else if(value > node.data) return this._contains(node.right, value);
        return false; 
    }

    _inorder(node, result){
        if(!node) return;
        this._inorder(node.left, result);
        result.push(node.data);
        this._inorder(node.right, result);
    }

    _preOrder(node, result){
        if(!node) return;
        result.push(node.data);
        this._preOrder(node.left, result);
        this._preOrder(node.right, result);
    }

    _postOrder(node, result){
        if(!node) return;
        this._postOrder(node.left, result);
        this._postOrder(node.right, result);
        result.push(node.data);
    }

    _remove(node, value){
        if(!node) return null;
        if(value < node.data) node.left = this._remove(node.left, value);
        else if(value > node.data){
            node.right = this._remove(node.right, value);
        }
        else{
            if(!node.left && !node.right) return null;
            if(!node.left) return node.right;
            if(!node.right) return node.left;
            let successor = this.getMin(node.right);
            node.data = successor.data;
            node.right = this._remove(node.right, successor.data);
        }
        return node;
    }

    getMin(node){
        if(!node) return null;
        while(node.left){
            node = node.left;
        }
        return node;
    }

    // recursion
    insertRecursive(value){
        this.root = this._insert(this.root, value);
    }

    containsRecursive(value){
        return this._contains(this.root, value);
    }

    inOrderRecursive(){
        const result = [];
        this._inorder(this.root, result);
        return result;
    }

    preOrderRecursive(){
        const result = [];
        this._preOrder(this.root, result);
        return result;
    }

    postOrderRecursive(){
        const result = [];
        this._postOrder(this.root, result);
        return result;
    }

    removeRecursive(value){
        this.root = this._remove(this.root, value);
    }


    //iterative
    insert(value){
        let newNode = new TreeNode(value);
        if(!this.root){
            this.root = newNode;
            return;
        }
        let current = this.root;
        while(true){
           if(value < current.data){
            if(!current.left){
                current.left = newNode;
                return;
            }
            current = current.left;
           }else if(value > current.data){
            if(!current.right){
                current.right = newNode;
                return;
            }
            current = current.right;
           }
           else return;
        }
    }

    contains(value){
        let current = this.root;
        while(current){
            if(value === current.data) return true;
            else if(value < current.data) current = current.left;
            else current = current.right
        }
        return false;
    }
    
    preOrder(){
        if(!this.root) return [];
        let stack = []; 
        let result = [];
        stack.push(this.root);
        while(stack.length){
            let current = stack.pop();
            result.push(current.data);
            if(current.right) stack.push(current.right);
            if(current.left) stack.push(current.left);
        }
        return result;
    }

    inOrder(){
        if(!this.root) return [];
        let result = [];
        let stack = new Stack();
        let current = this.root;
        while(current || !stack.isEmpty()){
            while(current){
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            result.push(current.data);
            current = current.right;
        }
        return result;
    }   
    
    postOrder(){
        if(!this.root) return;
        let stack1 = [this.root];
        let stack2 = [];
        let result = [];
        while(stack1.length){
            const node = stack1.pop();
            stack2.push(node);
            if(node.left) stack1.push(node.left);
            if(node.right) stack1.push(node.right);
        }
        while(stack2.length){
            const node = stack2.pop();
            result.push(node.data);
        }
        return result;
    }

    levelOrder(){
        if(!this.root) return;
        let result = [];
        let queue = new Queue();
        queue.enqueue(this.root);
        while(!queue.isEmpty()){
            let level = queue.size;
            for(let i = 0; i < level; ++i){
                let current = queue.dequeue();
                result.push(current.data);
                if(current.left) queue.enqueue(current.left);
                if(current.right) queue.enqueue(current.right);
            } 
        }
        return result;
    }

    getHeight(){
        if(!this.root) return 0;
        let height = 0;
        let queue = new Queue();
        queue.enqueue(this.root);
        while(!queue.isEmpty()){
            let level = queue.size;
            for(let i = 0; i < level; ++i){
                let current = queue.dequeue();
                if(current.left) queue.enqueue(current.left);
                if(current.right) queue.enqueue(current.right);
            }
            ++height;
        }
        return height;
    }
    
}

// === Example usage of BST ===
const debug = () =>{
    const tree = new BST();
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);
    tree.insert(3);
    tree.insert(7);
    tree.insert(13);
    tree.insert(16);
    console.log("In-Order (Iterative):", tree.inOrder());
    console.log("In-Order (Recursive):", tree.inOrderRecursive());
    console.log("Pre-Order (Iterative):", tree.preOrder());
    console.log("Pre-Order (Recursive):", tree.preOrderRecursive());
    console.log("Post-Order (Iterative):", tree.postOrder());
    console.log("Post-Order (Recursive):", tree.postOrderRecursive());
    console.log("Level-Order (BFS):", tree.levelOrder());
    console.log("Contains 7 (Iterative):", tree.contains(7));
    console.log("Contains 42 (Recursive):", tree.containsRecursive(42));
    console.log("Minimum value:", tree.getMin(tree.root).data);
    console.log("Tree height:", tree.getHeight());
    tree.removeRecursive(7);
    console.log("In-Order after removal:", tree.inOrder());
}


debug()