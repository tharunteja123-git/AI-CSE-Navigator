const trees = {
  name: "Trees & BST",
  emoji: "🌳",
  color: "bg-orange-500",
  light: "bg-orange-50",
  border: "border-orange-200",
  text: "text-orange-700",
  total: 35,

  learningObjectives: [
    "Understand tree node structure and parent-child relationships",
    "Master DFS (inorder, preorder, postorder) and BFS (level order)",
    "Implement BST operations: insert, delete, search",
    "Solve 35+ tree interview problems with optimal solutions",
    "Know when to use recursive vs iterative tree traversal",
  ],

  prerequisites: ["Recursion basics", "Linked Lists", "Queues (for BFS)", "Stacks (for iterative DFS)"],

  whyLearn: {
    importance: "Trees are the most important non-linear data structure. They appear in 40%+ of interviews and underpin databases, file systems, compilers, and AI decision trees.",
    useCases: [
      "File systems — folders and files form a tree",
      "HTML/DOM — browser renders web pages as a tree",
      "Databases — B-Trees and B+ Trees for indexing",
      "Compilers — Abstract Syntax Tree (AST) for parsing code",
      "AI — Decision Trees and Random Forests for ML",
      "Autocomplete — Tries (prefix trees) for fast search",
    ],
  },

  definition: {
    short: "A Tree is a hierarchical data structure with a root node and subtrees of children. A Binary Tree has at most 2 children per node. A BST has left < root < right at every node.",
    analogy: "A tree is like a company org chart — CEO at top (root), managers below (internal nodes), employees with no reports at the bottom (leaves). Each person has exactly one manager (parent) except the CEO.",
    properties: [
      "Root: topmost node with no parent",
      "Leaf: node with no children (left=None, right=None)",
      "Height: longest path from root to any leaf",
      "Depth of node: distance from root to that node",
      "BST Property: for every node, left subtree values < node < right subtree values",
      "Balanced BST: height is O(log n) — AVL, Red-Black Trees",
      "Complete Binary Tree: all levels full except possibly last, filled left to right",
    ],
    complexity: [
      { op: "BST Search",          time: "O(h)",     space: "O(h)" },
      { op: "BST Insert",          time: "O(h)",     space: "O(h)" },
      { op: "BST Delete",          time: "O(h)",     space: "O(h)" },
      { op: "DFS Traversal",       time: "O(n)",     space: "O(h)" },
      { op: "BFS Traversal",       time: "O(n)",     space: "O(w)" },
      { op: "Balanced BST ops",    time: "O(log n)", space: "O(log n)" },
      { op: "Unbalanced BST ops",  time: "O(n)",     space: "O(n)" },
    ],
  },

  languages: [
    {
      lang: "Python",
      emoji: "🐍",
      color: "bg-blue-100 text-blue-800",
      syntax: `# Python — Binary Tree
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# ── Build tree from array (LeetCode style) ──
from collections import deque
def build_tree(arr):
    if not arr or arr[0] is None: return None
    root = TreeNode(arr[0])
    queue = deque([root])
    i = 1
    while queue and i < len(arr):
        node = queue.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); queue.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); queue.append(node.right)
        i += 1
    return root

# ── DFS Traversals (Recursive) ───────
def inorder(root):       # Left → Root → Right (sorted for BST)
    if not root: return []
    return inorder(root.left) + [root.val] + inorder(root.right)

def preorder(root):      # Root → Left → Right
    if not root: return []
    return [root.val] + preorder(root.left) + preorder(root.right)

def postorder(root):     # Left → Right → Root
    if not root: return []
    return postorder(root.left) + postorder(root.right) + [root.val]

# ── Iterative Inorder (no recursion) ──
def inorder_iter(root):
    result, stack = [], []
    curr = root
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        result.append(curr.val)
        curr = curr.right
    return result

# ── BFS Level Order ───────────────────
from collections import deque
def level_order(root):
    if not root: return []
    result, queue = [], deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result

# ── Tree Properties ──────────────────
def height(root):
    if not root: return 0
    return 1 + max(height(root.left), height(root.right))

def count_nodes(root):
    if not root: return 0
    return 1 + count_nodes(root.left) + count_nodes(root.right)

def is_balanced(root):
    def check(node):
        if not node: return 0
        l = check(node.left)
        r = check(node.right)
        if l == -1 or r == -1 or abs(l-r) > 1: return -1
        return 1 + max(l, r)
    return check(root) != -1

# ── BST Operations ───────────────────
def bst_search(root, val):
    if not root or root.val == val: return root
    if val < root.val: return bst_search(root.left, val)
    return bst_search(root.right, val)

def bst_insert(root, val):
    if not root: return TreeNode(val)
    if val < root.val: root.left = bst_insert(root.left, val)
    elif val > root.val: root.right = bst_insert(root.right, val)
    return root

def bst_delete(root, key):
    if not root: return None
    if key < root.val:
        root.left = bst_delete(root.left, key)
    elif key > root.val:
        root.right = bst_delete(root.right, key)
    else:
        if not root.left: return root.right
        if not root.right: return root.left
        # Find inorder successor (smallest in right subtree)
        succ = root.right
        while succ.left: succ = succ.left
        root.val = succ.val
        root.right = bst_delete(root.right, succ.val)
    return root`,
    },
    {
      lang: "JavaScript",
      emoji: "🟨",
      color: "bg-yellow-100 text-yellow-800",
      syntax: `// JavaScript Binary Tree
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val; this.left = left; this.right = right;
    }
}

// ── DFS Traversals ────────────────────
function inorder(root, result = []) {
    if (!root) return result;
    inorder(root.left, result);
    result.push(root.val);
    inorder(root.right, result);
    return result;
}

function preorder(root, result = []) {
    if (!root) return result;
    result.push(root.val);
    preorder(root.left, result);
    preorder(root.right, result);
    return result;
}

// ── BFS Level Order ───────────────────
function levelOrder(root) {
    if (!root) return [];
    const result = [], queue = [root];
    while (queue.length) {
        const level = [], size = queue.length;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left)  queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
    }
    return result;
}

// ── Tree Properties ───────────────────
const height = root => !root ? 0 : 1 + Math.max(height(root.left), height(root.right));
const countNodes = root => !root ? 0 : 1 + countNodes(root.left) + countNodes(root.right);

// ── BST Operations ────────────────────
function bstInsert(root, val) {
    if (!root) return new TreeNode(val);
    if (val < root.val) root.left = bstInsert(root.left, val);
    else if (val > root.val) root.right = bstInsert(root.right, val);
    return root;
}

function bstSearch(root, val) {
    if (!root || root.val === val) return root;
    return val < root.val ? bstSearch(root.left, val) : bstSearch(root.right, val);
}`,
    },
    {
      lang: "Java",
      emoji: "☕",
      color: "bg-orange-100 text-orange-800",
      syntax: `// Java Binary Tree
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

// ── DFS Traversals ────────────────────
void inorder(TreeNode root, List<Integer> result) {
    if (root == null) return;
    inorder(root.left, result);
    result.add(root.val);
    inorder(root.right, result);
}

// ── BFS Level Order ───────────────────
List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left  != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(level);
    }
    return result;
}

// ── Tree Properties ───────────────────
int height(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(height(root.left), height(root.right));
}

// ── Java Built-in TreeMap (BST) ───────
import java.util.TreeMap;
TreeMap<Integer, String> bst = new TreeMap<>();
bst.put(5, "five");
bst.get(5);              // Search O(log n)
bst.firstKey();          // Min
bst.lastKey();           // Max
bst.floorKey(6);         // Largest key <= 6
bst.ceilingKey(4);       // Smallest key >= 4
bst.headMap(5);          // All keys < 5
bst.tailMap(5);          // All keys >= 5`,
    },
    {
      lang: "C++",
      emoji: "⚙️",
      color: "bg-purple-100 text-purple-800",
      syntax: `// C++ Binary Tree
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

// ── DFS Traversals ────────────────────
void inorder(TreeNode* root, vector<int>& result) {
    if (!root) return;
    inorder(root->left, result);
    result.push_back(root->val);
    inorder(root->right, result);
}

// ── BFS ───────────────────────────────
vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        for (int i = 0; i < sz; i++) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(level);
    }
    return result;
}

// ── C++ STL set/map = BST ────────────
#include <set>
#include <map>
set<int> s = {3, 1, 4, 1, 5};   // sorted, no duplicates
s.insert(2);
s.count(3);           // 0 or 1
s.find(3);            // iterator
*s.begin();           // min
*s.rbegin();          // max
s.lower_bound(3);     // first >= 3
s.upper_bound(3);     // first > 3

map<int,int> m;       // sorted key-value BST
m[key] = value;
m.find(key);
m.count(key);`,
    },
  ],

  patterns: [
    {
      name: "DFS — Recursive Template",
      emoji: "🔍",
      color: "bg-orange-50 border-orange-200",
      titleColor: "text-orange-800",
      when: "Height, diameter, path sum, validate BST, LCA, any problem needing subtree info",
      avoid: "Very deep trees (stack overflow) — use iterative DFS instead",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h) — h is height",
      steps: [
        "Base case: if not root, return default value",
        "Recursively solve left subtree",
        "Recursively solve right subtree",
        "Combine results at current node",
        "Return answer for this subtree",
      ],
      template: `def solve(root):
    if not root: return BASE_CASE   # e.g., 0, None, True

    left_result  = solve(root.left)
    right_result = solve(root.right)

    # Combine and return
    return COMBINE(root.val, left_result, right_result)

# Example: Tree Height
def height(root):
    if not root: return 0
    return 1 + max(height(root.left), height(root.right))

# Example: Count nodes
def count(root):
    if not root: return 0
    return 1 + count(root.left) + count(root.right)`,
    },
    {
      name: "BFS — Level Order Template",
      emoji: "🌊",
      color: "bg-blue-50 border-blue-200",
      titleColor: "text-blue-800",
      when: "Level order traversal, minimum depth, right side view, connect level nodes",
      avoid: "Very wide trees (queue gets large)",
      timeComplexity: "O(n)",
      spaceComplexity: "O(w) — w is max width",
      steps: [
        "Initialize queue with root",
        "While queue not empty:",
        "  Record current queue size (= nodes at this level)",
        "  Process exactly that many nodes",
        "  Add their children to queue",
      ],
      template: `from collections import deque
def bfs(root):
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)          # nodes at this level
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
    },
    {
      name: "BST Range Check",
      emoji: "📏",
      color: "bg-green-50 border-green-200",
      titleColor: "text-green-800",
      when: "Validate BST, search in BST, insert in BST, kth smallest in BST",
      avoid: "Regular binary trees (not BST)",
      timeComplexity: "O(h)",
      spaceComplexity: "O(h)",
      steps: [
        "Pass min_val and max_val bounds down the tree",
        "At each node: check min_val < node.val < max_val",
        "For left subtree: max_val = node.val",
        "For right subtree: min_val = node.val",
      ],
      template: `def is_valid_bst(root, min_val=float('-inf'), max_val=float('inf')):
    if not root: return True
    if root.val <= min_val or root.val >= max_val:
        return False
    return (is_valid_bst(root.left,  min_val, root.val) and
            is_valid_bst(root.right, root.val, max_val))`,
    },
    {
      name: "Path Problems",
      emoji: "🛤️",
      color: "bg-purple-50 border-purple-200",
      titleColor: "text-purple-800",
      when: "Path sum, max path sum, path exists, all paths from root to leaf",
      avoid: "N/A — very general pattern",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      steps: [
        "Pass current path sum/collection down through parameters",
        "At leaf: check if condition met",
        "Backtrack: undo choice after recursive call",
      ],
      template: `# Has path with target sum?
def has_path_sum(root, target):
    if not root: return False
    if not root.left and not root.right:
        return root.val == target       # leaf check
    return (has_path_sum(root.left,  target - root.val) or
            has_path_sum(root.right, target - root.val))

# All root-to-leaf paths
def all_paths(root):
    result = []
    def dfs(node, path):
        if not node: return
        path.append(node.val)
        if not node.left and not node.right:
            result.append(path[:])      # found a path
        dfs(node.left, path)
        dfs(node.right, path)
        path.pop()                      # backtrack
    dfs(root, [])
    return result`,
    },
  ],

  problems: [
    {
      name: "Maximum Depth of Binary Tree",
      difficulty: "Easy",
      companies: ["Amazon", "Google", "Microsoft", "Facebook"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", id: "#104" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/find-the-maximum-depth-or-height-of-a-tree/", id: "Practice" },
      ],
      statement: "Given the root of a binary tree, return its maximum depth (number of nodes along the longest path from root to leaf).",
      example: "Tree: [3,9,20,null,null,15,7] → 3",
      constraints: ["0 ≤ nodes ≤ 10⁴"],
      approaches: [
        {
          title: "Recursive DFS",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(h)",
          idea: "Max depth = 1 + max(depth of left subtree, depth of right subtree). Base case: empty node has depth 0.",
          when: "Cleanest solution. Always use this.",
          code: `def max_depth(root):
    if not root: return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
        },
        {
          title: "BFS Level Order",
          emoji: "🌊",
          tag: "O(n) space",
          complexity: "Time: O(n) | Space: O(w)",
          idea: "Count levels processed in BFS. Each level = 1 depth.",
          when: "Good iterative alternative.",
          code: `from collections import deque
def max_depth(root):
    if not root: return 0
    queue = deque([root])
    depth = 0
    while queue:
        depth += 1
        for _ in range(len(queue)):
            node = queue.popleft()
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
    return depth`,
        },
        {
          title: "Iterative DFS (Stack)",
          emoji: "📚",
          tag: "O(h) space",
          complexity: "Time: O(n) | Space: O(h)",
          idea: "Use explicit stack storing (node, current_depth). Track max depth seen.",
          when: "When recursion depth limit is a concern.",
          code: `def max_depth(root):
    if not root: return 0
    stack = [(root, 1)]
    best = 0
    while stack:
        node, depth = stack.pop()
        best = max(best, depth)
        if node.left:  stack.append((node.left,  depth+1))
        if node.right: stack.append((node.right, depth+1))
    return best`,
        },
      ],
      ai: {
        hints: ["What's the depth of an empty tree?", "Can you define depth in terms of its children's depths?"],
        followUps: ["Minimum Depth of Binary Tree", "Balanced Binary Tree", "Diameter of Binary Tree"],
        interviewQuestions: ["What's the difference between height and depth?", "What if the tree is skewed?"],
      },
    },
    {
      name: "Validate Binary Search Tree",
      difficulty: "Medium",
      companies: ["Amazon", "Microsoft", "Bloomberg", "Facebook"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/validate-binary-search-tree/", id: "#98" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/a-program-to-check-if-a-binary-tree-is-bst-or-not/", id: "Practice" },
      ],
      statement: "Given root of a binary tree, determine if it is a valid BST.",
      example: "[2,1,3] → true | [5,1,4,null,null,3,6] → false (4 < 5)",
      constraints: ["Left subtree < root < right subtree — for ALL nodes, not just children"],
      approaches: [
        {
          title: "Wrong Approach (common mistake)",
          emoji: "🚫",
          tag: "WRONG",
          complexity: "Time: O(n) | Space: O(h)",
          idea: "Just compare each node with its immediate children. WRONG — doesn't catch violating values from ancestors.",
          when: "Never. This is the trap interviewers look for.",
          code: `# ❌ WRONG — doesn't check against ancestor bounds
def is_valid_bst_wrong(root):
    if not root: return True
    if root.left and root.left.val >= root.val: return False
    if root.right and root.right.val <= root.val: return False
    return is_valid_bst_wrong(root.left) and is_valid_bst_wrong(root.right)
# Fails for: [5, 4, 6, null, null, 3, 7]
# Node 3 is right child of 6, but 3 < 5 (root) — invalid BST`,
        },
        {
          title: "Range Validation (Optimal)",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(h)",
          idea: "Pass valid range [min, max] down the tree. Each node must be strictly inside this range. Left subtree: max becomes current node. Right subtree: min becomes current node.",
          when: "Always. This is THE correct approach.",
          code: `def is_valid_bst(root, min_val=float('-inf'), max_val=float('inf')):
    if not root: return True
    if root.val <= min_val or root.val >= max_val:
        return False
    return (is_valid_bst(root.left,  min_val,   root.val) and
            is_valid_bst(root.right, root.val,  max_val))`,
        },
        {
          title: "Inorder Traversal",
          emoji: "📋",
          tag: "Alternative",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "Inorder traversal of a valid BST gives sorted array. Check if inorder result is strictly increasing.",
          when: "Intuitive alternative. Slightly more space.",
          code: `def is_valid_bst(root):
    def inorder(node):
        if not node: return []
        return inorder(node.left) + [node.val] + inorder(node.right)
    vals = inorder(root)
    return all(vals[i] < vals[i+1] for i in range(len(vals)-1))

# Space-optimized: track prev node
def is_valid_bst_v2(root):
    prev = [float('-inf')]
    def check(node):
        if not node: return True
        if not check(node.left): return False
        if node.val <= prev[0]: return False
        prev[0] = node.val
        return check(node.right)
    return check(root)`,
        },
      ],
      ai: {
        hints: ["Just checking children isn't enough — think about ancestor constraints", "What range is valid for each node?"],
        followUps: ["Kth Smallest in BST", "BST to Greater Sum Tree", "Recover BST (two nodes swapped)"],
        interviewQuestions: ["Why does the wrong approach fail?", "Can you do it without extra space for inorder?"],
      },
    },
    {
      name: "Lowest Common Ancestor",
      difficulty: "Medium",
      companies: ["Amazon", "Facebook", "Google", "Microsoft"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", id: "#236" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/lowest-common-ancestor-binary-tree-set-1/", id: "Practice" },
      ],
      statement: "Given binary tree and two nodes p, q, find their Lowest Common Ancestor (deepest node that is ancestor of both).",
      example: "tree=[3,5,1,6,2,0,8], p=5, q=1 → 3 | p=5, q=4 → 5",
      constraints: ["All node values are unique", "p and q exist in the tree"],
      approaches: [
        {
          title: "Recursive DFS",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(h)",
          idea: "If current node is p or q, return it. Recurse left and right. If both return non-null, current node is LCA. Otherwise return whichever side found a node.",
          when: "Always. Clean and elegant.",
          code: `def lca(root, p, q):
    if not root or root == p or root == q:
        return root                         # found one of them (or null)
    left  = lca(root.left,  p, q)
    right = lca(root.right, p, q)
    if left and right:
        return root                         # p and q on different sides
    return left or right                    # both on same side`,
        },
        {
          title: "BST LCA (if BST)",
          emoji: "🌳",
          tag: "O(h) for BST",
          complexity: "Time: O(h) | Space: O(h)",
          idea: "In a BST, use node values to navigate. If both p,q < root → go left. If both > root → go right. Otherwise root is LCA.",
          when: "When the tree is specifically a BST.",
          code: `def lca_bst(root, p, q):
    if not root: return None
    if p.val < root.val and q.val < root.val:
        return lca_bst(root.left, p, q)   # both left
    if p.val > root.val and q.val > root.val:
        return lca_bst(root.right, p, q)  # both right
    return root                            # split → current is LCA`,
        },
      ],
      ai: {
        hints: ["What does it mean if a node IS p or q?", "What if p and q are on opposite sides of current node?"],
        followUps: ["LCA of BST", "LCA with parent pointers", "Distance between two nodes"],
        interviewQuestions: ["What if p or q might not exist in tree?", "How to handle multiple LCA queries efficiently?"],
      },
    },
    {
      name: "Binary Tree Maximum Path Sum",
      difficulty: "Hard",
      companies: ["Amazon", "Google", "Microsoft", "Apple"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", id: "#124" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/find-maximum-path-sum-in-a-binary-tree/", id: "Practice" },
      ],
      statement: "Find the maximum path sum in a binary tree. Path may start and end at any node.",
      example: "[-10,9,20,null,null,15,7] → 42 (path: 15→20→7)",
      constraints: ["Can start and end at any node", "Path must go through connected nodes"],
      approaches: [
        {
          title: "DFS with Global Max",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(h)",
          idea: "At each node, compute max gain from left and right. Update global max with node + left_gain + right_gain. Return node + max(left, right) gain to parent (can't branch).",
          when: "The only clean solution for this problem.",
          code: `def max_path_sum(root):
    best = [float('-inf')]      # use list for mutability in closure

    def max_gain(node):
        if not node: return 0
        # Only take positive contributions
        left_gain  = max(max_gain(node.left),  0)
        right_gain = max(max_gain(node.right), 0)
        # Path through this node (can't branch upward)
        best[0] = max(best[0], node.val + left_gain + right_gain)
        # Return max gain to parent (must choose one branch)
        return node.val + max(left_gain, right_gain)

    max_gain(root)
    return best[0]`,
        },
      ],
      ai: {
        hints: ["A path can't 'branch' — it's a straight line through the tree", "At each node, what's the best path that passes through it?"],
        followUps: ["Path Sum II", "Sum Root to Leaf Numbers", "Maximum Sum BST in Binary Tree"],
        interviewQuestions: ["Why can't we branch upward?", "What if all values are negative?"],
      },
    },
  ],

  interviewTips: [
    "Draw the tree before coding — label L (left) and R (right) pointers",
    "Think recursively: 'What do I need from left subtree? Right subtree?'",
    "BST problems: always leverage the left < root < right property",
    "For height/balance: DFS returns height; update global answer inside",
    "Level order (BFS) problems: always use queue, process level by level",
    "Validate BST: pass min/max bounds — never just check immediate children",
    "For path problems: go down with DFS, backtrack after returning",
    "Edge cases: null root, single node, all left/right (skewed tree)",
  ],

  mistakes: [
    "Validating BST by only checking immediate children (must check against all ancestors)",
    "Forgetting the base case: if not root: return None/0/True",
    "Mutating the tree during traversal — always save references before modifying",
    "BFS: using list.pop(0) which is O(n) — always use collections.deque",
    "Confusing height (from node to leaf) and depth (from root to node)",
    "In LCA: returning early without checking both subtrees",
  ],

  quiz: [
    {
      q: "Inorder traversal of a valid BST gives what?",
      options: ["Random order", "Reverse sorted order", "Sorted (ascending) order", "Level order"],
      answer: 2,
      explanation: "Inorder traversal visits Left → Root → Right. In a BST, left < root < right at every node, so inorder always produces a strictly increasing (sorted ascending) sequence.",
    },
    {
      q: "Time complexity of searching in a balanced BST?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
      answer: 1,
      explanation: "In a balanced BST, height = O(log n). At each step, BST property eliminates half the remaining nodes. So search takes O(height) = O(log n). Unbalanced BST degrades to O(n).",
    },
    {
      q: "Which traversal is best for printing a tree level by level?",
      options: ["Inorder", "Preorder", "Postorder", "BFS (Level Order)"],
      answer: 3,
      explanation: "BFS using a queue naturally processes all nodes at depth d before any nodes at depth d+1. This gives level-by-level output. DFS traversals don't group by level.",
    },
    {
      q: "Space complexity of DFS on a tree of height h?",
      options: ["O(n)", "O(h)", "O(1)", "O(n²)"],
      answer: 1,
      explanation: "Recursive DFS uses the call stack. At any point, the stack contains nodes along the current path from root to current node — exactly h nodes. So space = O(h). For balanced tree, h = O(log n). For skewed, h = O(n).",
    },
  ],

  practice_links: [
    { platform: "LeetCode Trees", url: "https://leetcode.com/tag/tree/", color: "bg-orange-500", problems: "200+ problems", recommended: true },
    { platform: "Striver's Tree Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", color: "bg-indigo-600", problems: "Easy to Hard roadmap", recommended: true },
    { platform: "NeetCode Trees", url: "https://neetcode.io/roadmap", color: "bg-violet-600", problems: "Curated 20 must-do" },
    { platform: "GFG Binary Trees", url: "https://www.geeksforgeeks.org/binary-tree-data-structure/", color: "bg-green-600", problems: "Theory + Practice" },
    { platform: "InterviewBit Trees", url: "https://www.interviewbit.com/courses/programming/trees/", color: "bg-blue-600", problems: "Interview focused" },
  ],
};

export default trees;