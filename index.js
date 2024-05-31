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
}
