const linkedList = {
  name: "Linked Lists",
  emoji: "🔗",
  color: "bg-green-500",
  light: "bg-green-50",
  border: "border-green-200",
  text: "text-green-700",
  total: 25,

  learningObjectives: [
    "Understand node structure and pointer manipulation",
    "Master Fast & Slow pointer technique",
    "Implement reversal, cycle detection, and merging",
    "Solve 25+ real interview problems with optimal solutions",
    "Know when to use LinkedList vs Array",
  ],

  prerequisites: ["Pointers & References", "Classes & Objects", "Recursion basics"],

  whyLearn: {
    importance: "Linked Lists test your ability to manipulate pointers — the core skill for Trees, Graphs, and system-level programming. They appear in 30%+ of interviews.",
    useCases: [
      "Browser history — back/forward navigation (doubly linked list)",
      "Music playlist — next/previous song",
      "OS memory allocation — free block management",
      "Undo/Redo in editors",
      "Hash table chaining for collision resolution",
    ],
  },

  definition: {
    short: "A Linked List is a sequence of nodes where each node stores data and a pointer to the next node. Unlike arrays, nodes are NOT stored in contiguous memory.",
    analogy: "Think of a treasure hunt — each clue (node) has the treasure (data) and a note pointing to the next location (next pointer). You must start at the first clue and follow the chain.",
    properties: [
      "Dynamic size — grows and shrinks at runtime with O(1) insert/delete at head",
      "No random access — must traverse from head to reach element i (O(n))",
      "Singly linked: each node has data + next pointer",
      "Doubly linked: each node has data + next + prev pointer",
      "Circular: last node points back to head",
      "Extra memory per node for the pointer (overhead vs arrays)",
    ],
    complexity: [
      { op: "Access by index",     time: "O(n)",  space: "O(1)" },
      { op: "Search",              time: "O(n)",  space: "O(1)" },
      { op: "Insert at head",      time: "O(1)",  space: "O(1)" },
      { op: "Insert at tail",      time: "O(n)",  space: "O(1)" },
      { op: "Insert at position",  time: "O(n)",  space: "O(1)" },
      { op: "Delete at head",      time: "O(1)",  space: "O(1)" },
      { op: "Delete at position",  time: "O(n)",  space: "O(1)" },
    ],
  },

  languages: [
    {
      lang: "Python",
      emoji: "🐍",
      color: "bg-blue-100 text-blue-800",
      syntax: `# Python — Linked List from scratch
class Node:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, val):           # O(n)
        new = Node(val)
        if not self.head:
            self.head = new; return
        curr = self.head
        while curr.next: curr = curr.next
        curr.next = new

    def prepend(self, val):          # O(1)
        new = Node(val)
        new.next = self.head
        self.head = new

    def delete(self, val):           # O(n)
        if not self.head: return
        if self.head.val == val:
            self.head = self.head.next; return
        curr = self.head
        while curr.next:
            if curr.next.val == val:
                curr.next = curr.next.next; return
            curr = curr.next

    def traverse(self):              # O(n)
        curr = self.head
        while curr:
            print(curr.val, end=" -> ")
            curr = curr.next
        print("None")

    def length(self):                # O(n)
        count = 0
        curr = self.head
        while curr: count += 1; curr = curr.next
        return count

    def to_list(self):               # O(n)
        result = []
        curr = self.head
        while curr:
            result.append(curr.val)
            curr = curr.next
        return result

# ── Helper to build list from array ──
def build(arr):
    if not arr: return None
    head = Node(arr[0])
    curr = head
    for val in arr[1:]:
        curr.next = Node(val)
        curr = curr.next
    return head

# ── Python's built-in collections.deque ──
from collections import deque
d = deque([1, 2, 3])
d.appendleft(0)         # Add to front O(1)
d.append(4)             # Add to end   O(1)
d.popleft()             # Remove front O(1)
d.pop()                 # Remove end   O(1)`,
    },
    {
      lang: "JavaScript",
      emoji: "🟨",
      color: "bg-yellow-100 text-yellow-800",
      syntax: `// JavaScript Linked List
class Node {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

class LinkedList {
    constructor() { this.head = null; this.size = 0; }

    append(val) {                        // O(n)
        const node = new Node(val);
        if (!this.head) { this.head = node; }
        else {
            let curr = this.head;
            while (curr.next) curr = curr.next;
            curr.next = node;
        }
        this.size++;
    }

    prepend(val) {                       // O(1)
        this.head = new Node(val, this.head);
        this.size++;
    }

    delete(val) {                        // O(n)
        if (!this.head) return;
        if (this.head.val === val) {
            this.head = this.head.next;
            this.size--; return;
        }
        let curr = this.head;
        while (curr.next) {
            if (curr.next.val === val) {
                curr.next = curr.next.next;
                this.size--; return;
            }
            curr = curr.next;
        }
    }

    toArray() {                          // O(n)
        const arr = [];
        let curr = this.head;
        while (curr) { arr.push(curr.val); curr = curr.next; }
        return arr;
    }

    print() { console.log(this.toArray().join(' -> ') + ' -> null'); }
}

// Build from array
function buildList(arr) {
    if (!arr.length) return null;
    const head = new Node(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) {
        curr.next = new Node(arr[i]);
        curr = curr.next;
    }
    return head;
}`,
    },
    {
      lang: "Java",
      emoji: "☕",
      color: "bg-orange-100 text-orange-800",
      syntax: `// Java — Custom + Built-in LinkedList
// Custom Node
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

// ── Java Built-in LinkedList ──────────
import java.util.LinkedList;
import java.util.Deque;

LinkedList<Integer> list = new LinkedList<>();
list.add(1);             // Add to end          O(1)
list.addFirst(0);        // Add to front         O(1)
list.addLast(5);         // Add to end           O(1)
list.add(2, 99);         // Add at index         O(n)
list.get(0);             // Get by index         O(n)
list.getFirst();         // Get head             O(1)
list.getLast();          // Get tail             O(1)
list.remove();           // Remove head          O(1)
list.removeFirst();      // Remove head          O(1)
list.removeLast();       // Remove tail          O(1)
list.remove(Integer.valueOf(3)); // Remove by value O(n)
list.size();             // Size                 O(1)
list.contains(3);        // Search               O(n)
list.indexOf(3);         // First index          O(n)

// ── As Stack (Deque) ──────────────────
Deque<Integer> stack = new LinkedList<>();
stack.push(1);           // Push to front
stack.pop();             // Pop from front
stack.peek();            // Peek front

// ── As Queue ──────────────────────────
Deque<Integer> queue = new LinkedList<>();
queue.offer(1);          // Enqueue (add to end)
queue.poll();            // Dequeue (remove from front)
queue.peek();            // Peek front`,
    },
    {
      lang: "C++",
      emoji: "⚙️",
      color: "bg-purple-100 text-purple-800",
      syntax: `// C++ — Custom + std::list
#include <list>
#include <forward_list>

// Custom Node (competitive programming)
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int v) : val(v), next(nullptr) {}
    ListNode(int v, ListNode* n) : val(v), next(n) {}
};

// ── std::list (doubly linked) ─────────
list<int> lst = {1, 2, 3};
lst.push_front(0);       // Add to front    O(1)
lst.push_back(4);        // Add to end      O(1)
lst.pop_front();         // Remove front    O(1)
lst.pop_back();          // Remove end      O(1)
lst.front();             // First element
lst.back();              // Last element
lst.size();              // Size            O(1)
lst.empty();             // Check empty
lst.insert(it, val);     // Insert at iter  O(1)
lst.erase(it);           // Erase at iter   O(1)
lst.remove(3);           // Remove all 3s   O(n)
lst.sort();              // Sort            O(n log n)
lst.reverse();           // Reverse         O(n)
lst.unique();            // Remove consecutive dups

// ── std::forward_list (singly linked) ─
forward_list<int> fl = {1, 2, 3};
fl.push_front(0);        // Only front operations
fl.pop_front();
fl.insert_after(fl.begin(), 99); // Insert after iterator
fl.erase_after(fl.begin());      // Erase after iterator`,
    },
  ],

  patterns: [
    {
      name: "Fast & Slow Pointer",
      emoji: "🐢🐇",
      color: "bg-green-50 border-green-200",
      titleColor: "text-green-800",
      when: "Find middle of list, detect cycle, find cycle start, find nth from end",
      avoid: "When you need random access or index-based operations",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      steps: [
        "slow moves 1 step, fast moves 2 steps",
        "When fast reaches end → slow is at middle",
        "If fast ever equals slow → cycle detected",
        "To find cycle start: reset slow to head, move both 1 step at a time",
      ],
      template: `def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next        # 1 step
        fast = fast.next.next   # 2 steps
    return slow                 # slow is at middle

def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast: return True
    return False`,
    },
    {
      name: "Reverse a Linked List",
      emoji: "↩️",
      color: "bg-blue-50 border-blue-200",
      titleColor: "text-blue-800",
      when: "Palindrome linked list, reverse in groups, reverse between positions",
      avoid: "When you need to preserve original order",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1) iterative, O(n) recursive",
      steps: [
        "prev = None, curr = head",
        "Save curr.next before overwriting",
        "Point curr.next to prev (reverse the pointer)",
        "Advance prev = curr, curr = saved next",
      ],
      template: `def reverse(head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next   # save
        curr.next = prev        # reverse
        prev = curr             # advance prev
        curr = next_node        # advance curr
    return prev                 # new head

# Recursive
def reverse_rec(head):
    if not head or not head.next: return head
    new_head = reverse_rec(head.next)
    head.next.next = head       # point back
    head.next = None            # cut forward
    return new_head`,
    },
    {
      name: "Dummy Head Node",
      emoji: "🎭",
      color: "bg-yellow-50 border-yellow-200",
      titleColor: "text-yellow-800",
      when: "Simplify edge cases when head might change (delete node, merge lists, add elements)",
      avoid: "When head never changes",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      steps: [
        "Create dummy = Node(0); dummy.next = head",
        "Operate on the list using dummy.next as real head",
        "Return dummy.next as new head",
      ],
      template: `def remove_elements(head, val):
    dummy = Node(0)
    dummy.next = head
    curr = dummy
    while curr.next:
        if curr.next.val == val:
            curr.next = curr.next.next  # skip node
        else:
            curr = curr.next
    return dummy.next                   # new head`,
    },
    {
      name: "Merge Two Sorted Lists",
      emoji: "🔀",
      color: "bg-purple-50 border-purple-200",
      titleColor: "text-purple-800",
      when: "Merge Sort on linked list, merge K sorted lists",
      avoid: "Unsorted lists",
      timeComplexity: "O(n + m)",
      spaceComplexity: "O(1) iterative",
      steps: [
        "Use dummy head to simplify",
        "Compare l1.val and l2.val",
        "Attach smaller node to result",
        "Advance that pointer",
        "Attach remaining list at end",
      ],
      template: `def merge_two_lists(l1, l2):
    dummy = Node(0)
    curr = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            curr.next = l1; l1 = l1.next
        else:
            curr.next = l2; l2 = l2.next
        curr = curr.next
    curr.next = l1 or l2    # attach remaining
    return dummy.next`,
    },
  ],

  problems: [
    {
      name: "Reverse Linked List",
      difficulty: "Easy",
      companies: ["Amazon", "Microsoft", "Facebook", "Adobe", "Goldman Sachs"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/reverse-linked-list/", id: "#206" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/reverse-a-linked-list/", id: "Practice" },
      ],
      statement: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
      example: "1→2→3→4→5 → 5→4→3→2→1",
      constraints: ["0 ≤ nodes ≤ 5000", "Must reverse in-place"],
      approaches: [
        {
          title: "Iterative (3 Pointers)",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Use prev, curr, next_node. At each step: save next, flip curr.next to prev, advance both pointers.",
          when: "Best solution. O(1) space. Always use this.",
          code: `def reverse_list(head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next   # 1. save next
        curr.next = prev        # 2. flip pointer
        prev = curr             # 3. advance prev
        curr = next_node        # 4. advance curr
    return prev                 # prev is now new head`,
        },
        {
          title: "Recursive",
          emoji: "🔄",
          tag: "O(n) space",
          complexity: "Time: O(n) | Space: O(n) call stack",
          idea: "Recursively reverse the rest, then fix current node's pointer.",
          when: "Good to show recursion skill but uses O(n) stack space.",
          code: `def reverse_list(head):
    if not head or not head.next:
        return head                     # base case
    new_head = reverse_list(head.next) # reverse rest
    head.next.next = head              # point next back to head
    head.next = None                   # cut forward pointer
    return new_head`,
        },
        {
          title: "Stack-based",
          emoji: "📚",
          tag: "O(n) space",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "Push all values to stack. Pop into new list. But requires extra space.",
          when: "Not recommended — shows concept but wastes space.",
          code: `def reverse_list(head):
    stack = []
    curr = head
    while curr:
        stack.append(curr.val)
        curr = curr.next
    dummy = Node(0)
    curr = dummy
    while stack:
        curr.next = Node(stack.pop())
        curr = curr.next
    return dummy.next`,
        },
      ],
      ai: {
        hints: ["How can you flip each pointer as you traverse?", "What do you need to save before flipping?"],
        followUps: ["Reverse Linked List II (reverse between positions)", "Palindrome Linked List", "Reverse Nodes in k-Group"],
        interviewQuestions: ["Can you do it without extra space?", "What if you could only traverse once?"],
      },
    },
    {
      name: "Linked List Cycle Detection",
      difficulty: "Easy",
      companies: ["Amazon", "Microsoft", "Apple", "Uber"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/linked-list-cycle/", id: "#141" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/", id: "Practice" },
      ],
      statement: "Given head of linked list, determine if it has a cycle.",
      example: "1→2→3→4→2(cycle) → true | 1→2→3 → false",
      constraints: ["Return true if cycle exists, false otherwise"],
      approaches: [
        {
          title: "HashSet",
          emoji: "🗂️",
          tag: "O(n) space",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "Store every visited node in a set. If we visit a node already in set → cycle.",
          when: "Intuitive. Good starting point.",
          code: `def has_cycle(head):
    seen = set()
    curr = head
    while curr:
        if curr in seen: return True
        seen.add(curr)
        curr = curr.next
    return False`,
        },
        {
          title: "Floyd's Cycle Detection",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Slow moves 1 step, fast moves 2. If cycle exists, fast laps slow and they meet. If no cycle, fast reaches None.",
          when: "Always. O(1) space is what interviewers want.",
          code: `def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next         # 1 step
        fast = fast.next.next    # 2 steps
        if slow == fast:
            return True          # they met → cycle!
    return False                 # fast reached end`,
        },
      ],
      ai: {
        hints: ["What happens if one pointer is always ahead in a circular track?", "Will they ever meet?"],
        followUps: ["Linked List Cycle II (find cycle start)", "Happy Number (same pattern)", "Find Duplicate Number"],
        interviewQuestions: ["How do you find WHERE the cycle starts?", "Prove Floyd's algorithm works mathematically."],
      },
    },
    {
      name: "Merge Two Sorted Lists",
      difficulty: "Easy",
      companies: ["Amazon", "Microsoft", "Google", "Apple"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/merge-two-sorted-lists/", id: "#21" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/", id: "Practice" },
      ],
      statement: "Merge two sorted linked lists and return the merged list (also sorted).",
      example: "1→2→4 and 1→3→4 → 1→1→2→3→4→4",
      constraints: ["Both lists are sorted in non-decreasing order"],
      approaches: [
        {
          title: "Iterative with Dummy Head",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n+m) | Space: O(1)",
          idea: "Use dummy head to avoid head edge case. Compare l1 and l2, attach smaller, advance that pointer.",
          when: "Clean, O(1) space. Best for interviews.",
          code: `def merge_two_lists(l1, l2):
    dummy = ListNode(0)
    curr = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            curr.next = l1
            l1 = l1.next
        else:
            curr.next = l2
            l2 = l2.next
        curr = curr.next
    curr.next = l1 if l1 else l2  # attach remaining
    return dummy.next`,
        },
        {
          title: "Recursive",
          emoji: "🔄",
          tag: "O(n+m) space",
          complexity: "Time: O(n+m) | Space: O(n+m) stack",
          idea: "Recursively merge: smaller head + merge(rest).",
          when: "Elegant but O(n+m) stack. Know both.",
          code: `def merge_two_lists(l1, l2):
    if not l1: return l2
    if not l2: return l1
    if l1.val <= l2.val:
        l1.next = merge_two_lists(l1.next, l2)
        return l1
    else:
        l2.next = merge_two_lists(l1, l2.next)
        return l2`,
        },
      ],
      ai: {
        hints: ["Use a dummy head to avoid handling head edge case", "After one list exhausts, what do you do?"],
        followUps: ["Merge K Sorted Lists", "Sort List", "Merge Sorted Array"],
        interviewQuestions: ["How would you merge K sorted lists?", "Can you do it without extra space?"],
      },
    },
    {
      name: "Remove Nth Node From End",
      difficulty: "Medium",
      companies: ["Amazon", "Microsoft", "Facebook", "Bloomberg"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", id: "#19" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/delete-nth-node-from-the-end-of-the-given-linked-list/", id: "Practice" },
      ],
      statement: "Given linked list, remove the nth node from the end and return head.",
      example: "1→2→3→4→5, n=2 → 1→2→3→5 (remove 4th node)",
      constraints: ["Must do in one pass if possible", "1 ≤ n ≤ sz"],
      approaches: [
        {
          title: "Two Pass",
          emoji: "2️⃣",
          tag: "O(n) straightforward",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "First pass: count length L. Second pass: go to (L-n)th node and delete next.",
          when: "Simple but requires two passes.",
          code: `def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    # Count length
    length = 0
    curr = head
    while curr: length += 1; curr = curr.next
    # Find (length-n)th node
    curr = dummy
    for _ in range(length - n):
        curr = curr.next
    curr.next = curr.next.next  # remove
    return dummy.next`,
        },
        {
          title: "One Pass — Two Pointers",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Advance fast pointer n steps ahead. Then move both until fast reaches end. Slow is now at node before the one to delete.",
          when: "Best — one pass, O(1) space.",
          code: `def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    fast = slow = dummy
    # Move fast n+1 steps ahead
    for _ in range(n + 1):
        fast = fast.next
    # Move both until fast reaches end
    while fast:
        slow = slow.next
        fast = fast.next
    slow.next = slow.next.next  # delete
    return dummy.next`,
        },
      ],
      ai: {
        hints: ["If you could have two runners with a gap of n between them...", "When the front runner reaches the end, where is the back runner?"],
        followUps: ["Middle of Linked List", "Delete Node in Linked List"],
        interviewQuestions: ["Why use a dummy node here?", "What if n equals the list length (delete head)?"],
      },
    },
    {
      name: "LRU Cache",
      difficulty: "Medium",
      companies: ["Amazon", "Google", "Microsoft", "Uber", "Bloomberg"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/lru-cache/", id: "#146" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/lru-cache-implementation/", id: "Practice" },
      ],
      statement: "Design a data structure that follows LRU (Least Recently Used) cache eviction policy. O(1) get and put.",
      example: "capacity=2, put(1,1), put(2,2), get(1)→1, put(3,3)[evicts 2], get(2)→-1",
      constraints: ["O(1) time for both get and put", "1 ≤ capacity ≤ 3000"],
      approaches: [
        {
          title: "OrderedDict (Python shortcut)",
          emoji: "🐍",
          tag: "Pythonic",
          complexity: "Time: O(1) | Space: O(capacity)",
          idea: "Python's OrderedDict maintains insertion order and supports move_to_end(). Use it as both cache and order tracker.",
          when: "Python interviews for quick implementation.",
          code: `from collections import OrderedDict
class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache: return -1
        self.cache.move_to_end(key)   # mark as recently used
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)  # remove LRU (front)`,
        },
        {
          title: "Doubly Linked List + HashMap",
          emoji: "⚡",
          tag: "OPTIMAL (proper)",
          complexity: "Time: O(1) | Space: O(capacity)",
          idea: "HashMap for O(1) key lookup. Doubly linked list to track order (most recent at tail, LRU at head). On access: remove from current position, add to tail. On evict: remove head.",
          when: "This is what interviewers actually want to see.",
          code: `class Node:
    def __init__(self, key=0, val=0):
        self.key = key; self.val = val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.cache = {}                 # key → Node
        # Dummy head (LRU end) and tail (MRU end)
        self.head = Node(); self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _insert_tail(self, node):
        node.prev = self.tail.prev
        node.next = self.tail
        self.tail.prev.next = node
        self.tail.prev = node

    def get(self, key):
        if key not in self.cache: return -1
        node = self.cache[key]
        self._remove(node)
        self._insert_tail(node)         # move to MRU
        return node.val

    def put(self, key, value):
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self.cache[key] = node
        self._insert_tail(node)
        if len(self.cache) > self.cap:
            lru = self.head.next        # remove LRU
            self._remove(lru)
            del self.cache[lru.key]`,
        },
      ],
      ai: {
        hints: ["You need O(1) access AND O(1) ordering — which structures give these?", "Doubly linked list allows O(1) remove from any position"],
        followUps: ["LFU Cache", "Design Twitter", "All O(1) Data Structure"],
        interviewQuestions: ["Why doubly linked (not singly)?", "How would you implement LFU instead?"],
      },
    },
  ],

  interviewTips: [
    "Always draw the linked list before coding — visualize pointer changes",
    "Use dummy head nodes to eliminate edge cases for head deletion",
    "Fast & Slow pointer is the key pattern — learn it for 5+ problems",
    "When modifying next pointers, always save next_node before overwriting",
    "Edge cases: empty list (head=None), single node, two nodes, cycle at tail",
    "Recursive solutions use O(n) stack space — mention this tradeoff",
    "For cycle detection: always mention Floyd's algorithm and prove it works",
  ],

  mistakes: [
    "Not saving curr.next before overwriting curr.next in reversal",
    "Forgetting to check both 'fast' and 'fast.next' in Floyd's algorithm",
    "Not using dummy head — leads to messy special cases for head deletion",
    "Off-by-one in 'nth from end' — gap should be n+1 not n",
    "Memory leak in C++ — not deleting removed nodes",
    "Not handling empty list or single node as edge cases",
  ],

  quiz: [
    {
      q: "What is the time complexity of inserting at the HEAD of a linked list?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      answer: 2,
      explanation: "Inserting at head only requires: new_node.next = head; head = new_node. This is O(1) — no traversal needed.",
    },
    {
      q: "In Floyd's cycle detection, why does fast move 2 steps and slow move 1?",
      options: [
        "To save time",
        "So they eventually meet if a cycle exists",
        "To find the middle node",
        "No specific reason",
      ],
      answer: 1,
      explanation: "If a cycle exists, fast gains 1 step on slow each iteration. Eventually fast laps slow and they meet inside the cycle. If no cycle, fast reaches null first.",
    },
    {
      q: "Why is a dummy head node useful in linked list problems?",
      options: [
        "It speeds up the algorithm",
        "It eliminates special cases when head might be deleted or changed",
        "It saves memory",
        "It's required by the language",
      ],
      answer: 1,
      explanation: "With a dummy head, you always have a node before the real head. This means deleting the head node or adding before head uses the same code as any other position — no special cases.",
    },
    {
      q: "What is the space complexity of reversing a linked list ITERATIVELY?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      answer: 2,
      explanation: "Iterative reversal uses only 3 pointers: prev, curr, next_node. Regardless of list size, constant extra space is used. Recursive reversal would be O(n) due to call stack.",
    },
  ],

  practice_links: [
    { platform: "LeetCode Linked List", url: "https://leetcode.com/tag/linked-list/", color: "bg-orange-500", problems: "100+ problems", recommended: true },
    { platform: "Striver's LinkedList Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", color: "bg-indigo-600", problems: "Complete roadmap", recommended: true },
    { platform: "NeetCode LinkedList", url: "https://neetcode.io/roadmap", color: "bg-violet-600", problems: "Curated problems" },
    { platform: "GFG Linked List", url: "https://www.geeksforgeeks.org/data-structures/linked-list/", color: "bg-green-600", problems: "Theory + Practice" },
    { platform: "InterviewBit LinkedList", url: "https://www.interviewbit.com/courses/programming/linked-lists/", color: "bg-blue-600", problems: "Interview focused" },
  ],
};

export default linkedList;