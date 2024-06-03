class Node {
  constructor(data){
    this.data = data;
    this.left = null;
    this.right = null;
}}

class Tree {
  constructor(arr){
    this.root = this.buildTree(arr);
  }

  buildTree(arr){
    if (arr.length ===  0) return null;
    
    const sortedArray = [...new Set(arr)].sort((a, b) => a - b);

    const build = (start, end) => {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);
      const node = new Node(sortedArray[mid]);

      node.left = build(start, mid - 1);
      node.right = build(mid + 1, end);

      return node;
    };
    return build(0, sortedArray.length - 1);
  }
  insert(data){
    const insertNode = (node, data) => {
      if (node === null){
        return new Node(data);
      }
      if (data < node.data){
        node.left = insertNode(node.left, data);
      } else if (data > node.data){
        node.right = insertNode(node.right, data);
      }
      return node;
    };
    this.root = insertNode(this.root, data);
  }

  deleteItem(data){
    const deleteNode = (node, data) => {
      if (node === null){
        return null;
      }

      if (data < node.data){
        node.left = deleteNode(node.left, data);
      } else if (data > node.data){
        node.right = deleteNode(node.right, data);
      } else {
        if (node.left === null){
          return node.right;
        } else if (node.right === null){
          return node.left;
        }

        node.data = this.minValue(node.right);
        node.right = deleteNode(node.right, node.data);
      }
      return node;
    };
    this.root = deleteNode(this.root, data);
  }
  minValue(node){
    let current = node;
    while (current.left !== null){
      current = current.left;
    }
    return current.data;
  }
  search(data){
    const searchNode = (node, data) => {
      if (node === null){
        return false;
      }
      if (data === node.data){
        return true;
      } else if (data < node.data){
        return searchNode(node.left, data);
      } else {
        return searchNode(node.right, data);
      }
    };
    return searchNode(this.root, data);
  }

  levelOrder(callback){
    if (this.root === null) return;

    const queue = [];
    queue.push(this.root);

    while (queue.length > 0){
      const node = queue.shift();
      callback(node.data);

      if (node.left !== null){
        queue.push(node.left);
      }
      if (node.right !== null){
        queue.push(node.right);
      }
    }
  }
  inOrder(callback){
  const inOrderTraverse = (node) => {
    if (node !== null){
      inOrderTraverse(node.left);
      callback(node.data);
      inOrderTraverse(node.right);
    }
  };
  inOrderTraverse(this.root);
 }

 preOrder(callback){
  const preOrderTraverse = (node) => {
    if (node !== null) {
        callback(node.data);
        preOrderTraverse(node.left);
        preOrderTraverse(node.right);
      }
    };
    preOrderTraverse(this.root);
  }
 
  postOrder(callback){
    const postOrderTraverse = (node) => {
      if (node !== null){
        postOrderTraverse(node.left);
        postOrderTraverse(node.right);
        callback(node.data);
      }
    };
    postOrderTraverse(this.root);
  }
}
 const prettyPrint = (node, prefix = "", isLeft = true) => {
   if (node === null) {
     return;
   }
   if (node.right !== null) {
     prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
   }
   console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
   if (node.left !== null) {
     prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
   }
 };

 const arr = [10, 5, 15, 3, 7, 12, 18, 10];
 const tree = new Tree(arr);
 tree.insert(23);
 tree.deleteItem(3);
 console.log(tree.search(10));
 tree.inOrder((data) => console.log(data)); 
 tree.preOrder((data) => console.log(data));
 tree.postOrder((data) => console.log(data));
 prettyPrint(tree.root)

 
