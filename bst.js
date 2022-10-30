class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

class Tree {
  constructor(array) {
    this.root =
      this.buildTree([...new Set(array)].sort((a, b) => a - b)) || null;
  }
  buildTree(arr) {
    if (arr.length === 0) return null;
    let half = Math.floor(arr.length / 2);
    let newNode = new Node(arr[half]);
    newNode.right = this.buildTree(arr.slice(half + 1));
    newNode.left = this.buildTree(arr.slice(0, half));
    return newNode;
  }
  insert(value, root = this.root) {
    if (root === null) return new Node(value);

    if (root.value < value) {
      root.right = this.insert(value, root.right);
    } else {
      root.left = this.insert(value, root.left);
    }
    return root;
  }
  delete(value, root = this.root) {
    if (root === null) return root;
    if (root.value < value) {
      root.right = this.delete(value, root.right);
    } else if (root.value > value) {
      root.left = this.delete(value, root.left);
    } else {
      if (root.left === null) return root.right;
      else if (root.right === null) return root.left;
      root.value = minValue(root.right);
      root.right = this.delete(value, root.right);
    }
    return root;
  }
  // left root right
  inOrder(node, result = []) {
    if (!node) return;
    else if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }

  // root left right

  preOrder(node, result = []) {
    if (!node) return;
    else if (node) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
    return result;
  }

  // left right root
  postOrder(node, result = []) {
    if (!node) return;
    else if (node) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.value);
    }
    return result;
  }

  height(node = this.root) {
    if (node == null) return 0;
    const left = this.height(node.left);
    const right = this.height(node.right);
    return Math.max(left, right) + 1;
  }

  depth(node, root = this.root, level = 0) {
    if (!node) return null;
    if (root == null) return 0;
    if (root.value == node.value) return level;
    let count = this.depth(node, root.left, level + 1);
    if (count !== 0) return count;
    return this.depth(node, root.right, level + 1);
  }

  isBalanced(node = this.root) {
    if (node === null) return true;
    const heightDiff = Math.abs(
      this.height(node.left) - this.height(node.right)
    );
    return (
      heightDiff <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    if (this.root == null) return;
    let sorted = [...new Set(this.inOrder(this.root).sort((a, b) => a - b))];
    this.root = this.buildTree(sorted);
  }
}

function minValue(root) {
  let min = root.value;
  while (root != null) {
    min = root.value;
    root = root.left;
  }
  return min;
}

function randomNumber(quantity) {
  let arr = [];
  for (let i = 0; i < quantity; i++) {
    arr.push(Math.floor(Math.random() * (15 - 1 + 1) + 1));
  }
  return arr;
}

const newTree = new Tree(randomNumber(10));

newTree.height();
newTree.isBalanced();
newTree.preOrder(newTree.root);
newTree.inOrder(newTree.root);
newTree.postOrder(newTree.root);
newTree.insert(101);
newTree.insert(102);
newTree.insert(103);
newTree.insert(104);
newTree.insert(105);
newTree.isBalanced();
newTree.rebalance();
newTree.isBalanced();
