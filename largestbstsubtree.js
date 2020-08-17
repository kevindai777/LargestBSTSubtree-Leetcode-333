//Objective is, given a binary tree, to find the largest subtree that is
//also a BST.

class Node {
    constructor(left, right, val) {
      this.left = left
      this.right = right
      this.val = val
    }
}
  
class Tree {
    constructor(root) {
      this.root = null
    }
  
    createRoot(val) {
      this.root = new Node(null, null, val)
    }
  
    addLeftNode(node, val) {
      node.left = new Node(null, null, val)
    }
  
    addRightNode(node, val) {
      node.right = new Node(null, null, val)
    }
}

let tree = new Tree()
tree.createRoot(1)
tree.addLeftNode(tree.root, 2)
tree.addRightNode(tree.root, 5)
tree.addLeftNode(tree.root.left, 3)
tree.addRightNode(tree.root.right, 6)
tree.addRightNode(tree.root.left, 4)


//O(n) solution where n is the number of nodes in the BST
//We do a DFS traversal where we check each node to see whether it's a BST,
//and if it is a BST, we check how many nodes there are

function largestBSTSubtree(root) {
    if (!root) {
        return 0
    }
    
    if (!root.left && !root.right) {
        return 1
    }
    
    //If we found a valid BST subtree
    if (isValid(root, null, null)) {
        return count(root)
    }
    
    function isValid(root, min, max) {
        if (!root) {
            return true
        }
        
        if (min != null && min >= root.val) {
            return false
        }
        
        if (max != null && max <= root.val) {
            return false
        } 
        
        return isValid(root.left, min, root.val) && isValid(root.right, root.val, max)
    }
    
    //Find the number of nodes in the subtree
    function count(root) {
        if (!root) {
            return 0
        }
        
        if (!root.left && !root.right) {
            return 1
        }
        
        return count(root.left) + count(root.right) + 1
    }
    
    //Find the largest subtree in the left and right subtrees
    return Math.max(largestBSTSubtree(root.left), largestBSTSubtree(root.right))
}
largestBSTSubtree(tree.root)
