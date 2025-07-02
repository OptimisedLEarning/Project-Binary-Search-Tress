// Pseuedo code for binary tree implementation
// 1. Define a Node class with properties for value, left child, and right child
// 2. Define a BinaryTree class with methods for insertion, searching, and traversal
// 3. Implement insertion method to add nodes to the tree
// 4. Implement search method to find a node by value
// 5. Implement traversal methods (in-order, pre-order, post-order) to visit nodes
// 6. Implement a method to find the height of the tree

//Preudocode for node class
// 1. Define a Node class with properties for value, left child, and right child
// 2. Create a constructor to initialize the value and set left and right children to null
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// **Build a `Tree` class/factory**
//   Accepts an array when initialized. The `Tree` class should have a `root` attribute, which uses the return value of `buildTree` .

//1.  Define a Tree class with a constructor that accepts an array
//2.  Remove duplicates, sort it.
//3.  Call buildTree() inside the constructor to make the tree

//Pseudo code for tree class

/**
 * @class Tree
 * @description Represents a binary search tree.
 * It accepts an array upon initialization and builds a balanced BST from it.
 */

class Tree {
  /**
   // Creates an instance of Tree.
   // @param {Array<number>} arr The array of numbers to build the tree from.
   //Duplicates will be removed and the array will be sorted.
   */
  constructor(array) {
    // 1. Process the input array: remove duplicates and sort it.
    //    Using a Set to quickly remove duplicates, then converting back to an array,
    //    and finally sorting it in ascending order.
    const sortedUniqueArray = [...new Set(array)].sort((a, b) => a - b);

    // 2. Build the balanced binary search tree from the processed array.
    //    The root of the tree is the return value of the buildTree method.
    this.root = this.buildTree(sortedUniqueArray);
  }
  // pseudocode for BuildTree method
  buildTree(array) {
    //Base case : if the array is empty , their is no node to create so it should return null

    if (array.length === 0) {
      return null;
    }
    // Find the middle index of the array to create a balanced tree
    const mid = Math.floor(array.length / 2);
    // Create a new node with the middle element
    const node = new Node(array[mid]);
    // Recursively build the left and right subtrees using the left half of the array
    node.left = this.buildTree(array.slice(0, mid));
    // Recursively build the right subtree using the right half of the array
    node.right = this.buildTree(array.slice(mid + 1));
    return node;
  }
  //Visulize the tree structure

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) return;

    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    // Print the current node's value with the appropriate prefix
    // If the node is a left child, use "└── ", otherwise use "┌── "
    const prefixSymbol = isLeft ? "└── " : "┌── ";
    console.log(`${prefix}${prefixSymbol}${node.value}`);

    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  /**Pseudo Find(value) method**/

  // Find(value) method returns   the node with  the given value
  /**   function find(value, node = root):
    if node is null:
        return null   // Value not found

    if value === node.value:
        return node   // Value found

    if value < node.value:
        search in the left subtree: return find(value, node.left)

    else:
        search in the right subtree: return find(value, node.right)
*/
  //
  find(value, node = this.root) {
    if (typeof value !== "number" || value === null || node === null) {
      return null;
    }
    if (value === node.value) {
      // Value found
      return node;
    } else if (value < node.value) {
      // Search in the left subtree
      return this.find(value, node.left);
    } else {
      // Search in the right subtree
      return this.find(value, node.right);
    }
  }

  /**  Pseudo insert method */
  // the values is always goinng to be leaf of the node
  // if smaller then mid left insertion
  // if greater than mid right insertion
  // if equal or duplicate do nothing
  // This method is not implemented yet, but it should insert a value into the tree.
  insert(value, node = this.root) {
    if (this.root === null) {
      // If the tree is empty, create a new root node with the given value
      this.root = new Node(value);
      return this.root;
    }
    if (node === null) {
      // If the current node is null, create a new node with the given value
      return new Node(value);
    }

    if (value < node.value) {
      // If the value is less than the current node's value, insert it in the left subtree
      node.left = this.insert(value, node.left);
    } else if (value > node.value) {
      // If the value is greater than the current node's value, insert it in the right subtree
      node.right = this.insert(value, node.right);
    }
    return node;
  }

  /** Pseudo delete method */
  //thier are three cases for deletion
  // 1. Node to be deleted is a leaf node (no children)
  // 2. Node to be deleted has one child (either left or right)
  // 3. Node to be deleted has two children (left and right)

  // For the third case,
  // we need to find the in-order successor // (smallest value in the right subtree) or
  // in-order predecessor  (largest value in the left subtree)
  // to replace the deleted node's value, and then delete that successor/predecessor node.

  // Base case: If the tree is empty, return null
  // If the value to be deleted is less than the current node's value, search in the left subtree
  // If the value to be deleted is greater than the current node's value
  // search in the right subtree
  // If the value matches the current node's value, we need to delete this node
  // If the node has no children (leaf node), return null to remove it
  // If the node has one child, return that child to bypass the deleted node
  // If the node has two children, find the in-order successor (smallest value in the right subtree)
  // Replace the current node's value with the in-order successor's value
  // Delete the in-order successor node from the right subtree
  // Return the current node to maintain the tree structure

  delete(value, node = this.root) {
    if (node === null) {
      // If the tree is empty, there's nothing to delete
      return null;
    }

    if (value < node.value) {
      node.left = this.delete(value, node.left);
    } else if (value > node.value) {
      node.right = this.delete(value, node.right);
    } else {
      // If the value matches the current node's value, we need to delete this node
      if (node.left === null && node.right === null) {
        // Case 1: No children (leaf node)
        return null;
      } else if (node.left === null) {
        // Case 2: One child (right)
        return node.right;
      } else if (node.right === null) {
        // Case 2: One child (left)
        return node.left;
      } else {
        // Case 3: Two children
        const successor = this.findMin(node.right);
        node.value = successor.value;
        node.right = this.delete(successor.value, node.right);
      }
    }
    return node;
  }

  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  //pseudo code for levelOrder method
  /**
   * @method levelOrder
   * @description Traverses the tree in level order and applies a callback function to each node
   * @param {function} callback The function to apply to each node
   * @param {Node} [node=this.root] The node to start the traversal from
   * @throws {Error} If the callback is not a function
   */
  // Level order traversal visits nodes level by level, starting from the root.
  // It uses a queue to keep track of nodes at the current level and processes them before
  // moving to the next level.
  // The method accepts a callback function that is called on each node during the traversal.
  // The method starts from the root node and traverses the tree level by level, calling
  // the provided callback function on each node.
  // If the callback is not a function, it throws an error.

  levelOrder(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (node === null) return;

    const queue = [node];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      // 👉 Call the callback function on the current node
      callback(currentNode);

      // Add children to queue
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }

  inOrder(callBack, node = this.root) {
    if (typeof callBack !== "function") {
      throw new Error("A callback function is required");
    }

    if (node === null) return;

    // Traverse the left subtree
    this.inOrder(callBack, node.left);
    // Call the callback function on the current node
    callBack(node);
    // Traverse the right subtree
    this.inOrder(callBack, node.right);
  }

  preOrder(callBack, node = this.root) {
    if (typeof callBack !== "function") {
      throw new Error("A callback function is required");
    }

    if (node === null) return;

    // Call the callback function on the current node
    callBack(node);
    // Traverse the left subtree
    this.preOrder(callBack, node.left);
    // Traverse the right subtree
    this.preOrder(callBack, node.right);
  }

  postOrder(callBack, node = this.root) {
    if (typeof callBack !== "function") {
      throw new Error("A callback function is required");
    }

    if (node === null) return;

    // Traverse the left subtree
    this.postOrder(callBack, node.left);
    // Traverse the right subtree
    this.postOrder(callBack, node.right);
    // Call the callback function on the current node
    callBack(node);
  }
  // Method to find the height of the tree

  //pseudo code for height method
  // The height of a binary tree is the length of the longest path from the root
  // to a leaf node. This method calculates the height by recursively finding the
  // height of the left and right subtrees and returning the greater of the two
  // heights plus one (for the current node).

  //height(node = this.root,value = 0) {
  height(value) {
    const node = this.find(value);
    if (!node) return null;
    return (function calc(n) {
      if (!n) return -1; // Return -1 for null nodes to count edges correctly
      return Math.max(calc(n.left), calc(n.right)) + 1;
    })(node);
  }

  // Method to find the depth of a node in the tree}
  // pseudo code for depth method
  // function defpt(value):
  // currentnode  = this.root;
  // depth =0
  //while !currentNode !=null;
  //if value <currentNode.value
  // currentNode = currentNode.left;
  //else if value > currentNode.value
  // currentNode = currentNode.right;
  //else return depth;
  // depth++;
  // return null; // If the value is not found in the tree
  //

  depth(value) {
    let currentNode = this.root;
    let depth = 0;

    while (currentNode !== null) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else {
        return depth; // Value found, return the depth
      }
      depth++;
    }
    return null; //   or -1     for  Value not found in the tree
  }

  // Method to find the  isBalance function
  // pseudo code for isBalanced method
  // The isBalanced method checks if the tree is balanced by comparing the heights of the left
  // and right subtrees for each node. A tree is considered balanced if the height difference
  // between the left and right subtrees is at most 1 for every node in the tree.

  isBalanced(node = this.root) {
    if (node === null) {
      return true; // An empty tree is balanced
    }

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    // Check if the current node is balanced and recursively check its children
    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  //method to find the reblance function  in the tree
  //pseudo code     for rebalance method
  // The rebalance method rebuilds the tree to ensure it is balanced.
  // It first collects all the values in the tree using an in-order traversal,
  // then builds a new balanced tree using the buildTree method with the sorted values.
  // funvtion rebalance():
  // values = [];
  // if root is null:
  // return; // If the tree is empty, there's nothing to rebalance
  // inOrderTraversal((node) => {
  // values.push(node.value);
  // });
  // Build a new balanced tree from the sorted values
  // root = buildTree(values);
  // }

  rebalance() {
    const values = [];
    if (this.root === null) {
      return; // If the tree is empty, there's nothing to rebalance
    }
    this.inOrder((node) => {
      values.push(node.value);
    });
    // Build a new balanced tree from the sorted values
    this.root = this.buildTree(values);
  }
}

// testing the Tree class
const tree = new Tree([5, 3, 8, 1, 4, 7, 9, 2, 6, 3, 9, 11, 13]);
console.log(tree.root); // Should print the root node of the balanced BST
console.log(tree.root.value); // Should print the value of the root node
console.log(tree.root.left.value); // Should print the value of the left child of the root
console.log(tree.root.right.value); // Should print the value of the right child of the root
console.log(tree.root.left.left.value); // Should print the value of the left child's left child
console.log(tree.root.left.right.value); // Should print the value of the left child's right child
console.log(tree.root.right.left.value); // Should print the value of the right child's left child
console.log(tree.root.right.right.value); // Should print the value of the right child's right child
console.log(tree); //; // Should print the entire tree structure

// Visualizing the tree structure
console.log(tree.prettyPrint(tree.root)); // Should print the tree structure in a readable format

// Testing the insert method

tree.insert(10);
tree.insert(120);
tree.insert(140);

console.log(tree.root.right.right.left.value); // Should print 10, which is the new

console.log(tree.prettyPrint(tree.root)); // Should print the updated tree structure with the new value inserted

// Testing the delete method

tree.delete(10);
tree.delete;

console.log(tree.prettyPrint(tree.node)); // Should print the tree structure after deleting the value 10

// Testing the find method
const foundNode = tree.find(4);
console.log(foundNode); // Should print the node with value 4

// testing the levelOrder method
tree.levelOrder((node) => {
  console.log(node.value); // Should print the value of each node in level order
});

// Testing the inOrder method
tree.inOrder((node) => {
  console.log(node.value); // Should print the value of each node in in-order traversal
});

// Testing the preOrder method
tree.preOrder((node) => {
  console.log(node.value); // Should print the value of each node in pre-order traversal
});

// Testing the postOrder method
tree.postOrder((node) => {
  console.log(node.value); // Should print the value of each node in post-order traversal
});

// Testing the height method
const height = tree.height(4);
console.log(height); // Should print the height of the tree from the node with value 4
// Testing the depth method
const depth = tree.depth(4);
console.log(depth); // Should print the depth of the node with value 4 in the tree

// Testing the isBalanced method
const isBalanced = tree.isBalanced();

console.log(isBalanced); // Should print true if the tree is balanced, false otherwise

// Testing the rebalance method
tree.rebalance();
console.log(tree.prettyPrint(tree.root)); // Should print the tree structure after rebalancing
