class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        const sortedUnique = this.sortArray(arr);
        this.root = this.buildTree(sortedUnique, 0, sortedUnique.length - 1);
    }

    sortArray(arr) {
        const unique = {};
        for(let i = 0; i < arr.length; i++) {
            if(!unique[arr[i]]) {
                unique[arr[i]] = true;
            } else {
                arr.splice(i, 1);
                i--;
            }
        }
        arr.sort((a, b) => a - b);
        return arr;
    }

    buildTree(arr, start, end) {
        if (start > end) return null;

        let mid = start + Math.floor((end - start) / 2);
        let root = new Node (arr[mid]);
        root.left = this.buildTree(arr, start, mid - 1);
        root.right = this.buildTree(arr, mid + 1, end);

        return root;
    }

    insert(value) {
        function locateInsert(node, value) {
            if(node === null) {
                return new Node(value);
            } 
            
            if(value < node.data) {
                node.left = locateInsert(node.left, value);
            } else if(value > node.data) {
                node.right = locateInsert(node.right, value);
            }
            return node;
        }
        this.root = locateInsert(this.root, value);
    }

    delete(value) {
        function locateDelete(node, value) {
            if(node === null) return null;

            if(value < node.data) {
                node.left = locateDelete(node.left, value);
            } else if(value > node.data) {
                node.right = locateDelete(node.right, value);
            } else {
                if(node.left === null && node.right === null) {
                    return null;
                } else if(node.left === null) {
                    return node.right;
                } else if(node.right === null) {
                    return node.left;
                } else {
                    let successor = findMin(node.right);
                    node.data = successor.data;
                    node.right = locateDelete(node.right, successor.data);
                }
            }
            return node;
        }

        function findMin(node) {
            while(node.left !== null) {
                node = node.left;
            }
            return node;
        }

        this.root = locateDelete(this.root, value);
    }

    find(value) {
        function findValue(node, value) {
            if (node === null) return null;
            if (value === node.data) return node;
            if (value < node.data) {
                return findValue(node.left, value);
            } 
            if (value > node.data) {
                return findValue(node.right, value);
            }
        }
        return findValue(this.root, value);
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};


const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const test = new Tree(array);
//test.find(9);

const foundNode = test.find(9);
console.log(foundNode);
prettyPrint(foundNode);