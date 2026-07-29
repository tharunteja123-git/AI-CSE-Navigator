const timeComplexity = {
  name: "Time & Space Complexity",
  emoji: "⏱️",
  color: "bg-emerald-500",
  light: "bg-emerald-50",
  border: "border-emerald-200",
  text: "text-emerald-700",
  total: 20,

definition: {
  short:
    "Time Complexity measures how the execution time of an algorithm grows as the input size increases, while Space Complexity measures how much extra memory an algorithm requires during execution. Together they help determine how efficient and scalable a solution is.",

  analogy:
    "Imagine traveling to a destination. Time Complexity is how long the journey takes, while Space Complexity is how much luggage you carry. A fast journey with very little luggage is usually the best choice.",

  properties: [
    "Big-O describes the growth rate, not the exact execution time.",
    "Time Complexity focuses on operations performed as input grows.",
    "Space Complexity measures additional memory used by the algorithm.",
    "Lower complexity generally means better performance on large datasets.",
    "Interviewers expect candidates to analyze complexity after writing code.",
    "Choosing the right algorithm is usually more important than hardware speed.",
    "Trade-offs often exist between time and space complexity.",
    "Scalability is the main reason complexity analysis matters."
  ],

  complexity: [
    {
      op: "Best Case",
      time: "O(1)",
      space: "O(1)"
    },
    {
      op: "Average Case",
      time: "Depends on Algorithm",
      space: "Depends on Algorithm"
    },
    {
      op: "Worst Case",
      time: "Analyzed using Big-O",
      space: "Depends on Algorithm"
    }
  ]
},

  learningObjectives: [
    "Understand Big-O notation from the ground up — what it means, not just the symbols",
    "Master all complexity classes: O(1), O(log n), O(n), O(n log n), O(n²), O(2^n), O(n!)",
    "Analyze time and space complexity of any code confidently",
    "Learn the rules for calculating complexity: loops, recursion, nested structures",
    "Recognize complexity patterns instantly during interviews without calculation",
  ],

  prerequisites: [
    "Basic arithmetic and algebra",
    "Loops (for, while)",
    "Recursion basics",
    "Functions and code reading",
  ],

  whyLearn: {
    importance: "Time and space complexity is the LANGUAGE of algorithms. Every senior engineer and interviewer speaks it fluently. Without it, you cannot compare solutions, predict performance, or pass interviews at any top company. It is non-negotiable.",
    useCases: [
      "Interviews: every coding solution requires stating time and space complexity",
      "Code reviews: justify why your solution is better than the naive approach",
      "System design: predict how a system behaves under 10x, 100x load",
      "Optimization: identify bottlenecks before profiling",
      "API design: document performance guarantees for users",
      "Database: understand why INDEX makes a query O(log n) instead of O(n)",
    ],
  },

  concept: {
    intro: `Time Complexity measures how the RUNTIME of an algorithm scales as input size n grows.
Space Complexity measures how much EXTRA MEMORY an algorithm uses as input size n grows.

Both are expressed using Big-O notation — the universal language of algorithm efficiency.

WHY NOT JUST MEASURE RUNTIME IN SECONDS?
Because actual runtime depends on: CPU speed, programming language, compiler, cache, OS.
Big-O gives a HARDWARE-INDEPENDENT measure of efficiency.
It answers: "If I double the input, how does the runtime change?"`,

    levels: [
      // ── BEGINNER ──
      {
        level: "Beginner",
        color: "bg-green-100 text-green-800",
        title: "What is Big-O? The Real Intuition",
        sections: [
          {
            heading: "The Core Idea: How Does Runtime GROW?",
            content: `Big-O notation describes the GROWTH RATE of an algorithm, not its exact runtime.

We ask: if input size doubles from n to 2n, what happens to runtime?

ANALOGY — Reading a book:
Find a specific page number: O(1) — open directly to any page
Find a word by scanning page by page: O(n) — scan all pages
Find a word in sorted index: O(log n) — binary search

Big-O is about the SHAPE of growth, not the exact value.
O(2n) and O(5n) are both written as O(n) because both grow LINEARLY.
The constant doesn't change the shape.`,
          },
          {
            heading: "Formal Definition (Simple Version)",
            content: `f(n) is O(g(n)) if for large enough n:
f(n) ≤ C × g(n) for some constant C > 0

In English: "f grows no faster than g"

EXAMPLES:
5n + 3 is O(n) because 5n+3 ≤ 10n for all n ≥ 1
(C=10 works)

3n² + 100n + 50 is O(n²) because eventually n² term dominates
For large n: 3n² + 100n + 50 ≤ 200n²

This is why we DROP constants and lower-order terms:
O(5n + 3) = O(n)
O(3n² + 100n) = O(n²)
O(2^n + n³) = O(2^n)

RULE: Keep only the FASTEST-GROWING term, drop its coefficient.`,
          },
          {
            heading: "The 3 Types of Analysis",
            content: `BEST CASE (Ω — Omega): fastest possible runtime
Searching for first element: always found immediately → O(1)
Not very useful — real world rarely hits best case

AVERAGE CASE (Θ — Theta): expected runtime on typical input  
Most practical and most useful for real analysis
QuickSort: O(n log n) on average random input

WORST CASE (O — Big-O): slowest possible runtime
What we almost always mean when we say "time complexity"
QuickSort: O(n²) worst case (already sorted array with bad pivot)

RULE FOR INTERVIEWS: Always state WORST CASE unless asked otherwise.
"This solution is O(n) time in the worst case."`,
          },
          {
            heading: "The Complexity Hierarchy (Fast to Slow)",
            content: `O(1) < O(log n) < O(√n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2^n) < O(n!)

COMPARING GROWTH for n = 1,000,000:
O(1)       = 1 operation         → instant
O(log n)   = ~20 operations      → instant
O(√n)      = ~1,000 operations   → instant
O(n)       = 1,000,000           → milliseconds
O(n log n) = ~20,000,000         → milliseconds
O(n²)      = 1,000,000,000,000   → hours
O(2^n)     = 2^1000000           → longer than universe age

PRACTICAL LIMITS (what fits in 1 second):
O(1), O(log n): any n up to 10^18
O(√n):          n up to 10^14
O(n):           n up to 10^8
O(n log n):     n up to 10^6
O(n²):          n up to 10^4
O(n³):          n up to 10^3
O(2^n):         n up to 25
O(n!):          n up to 12`,
          },
          {
            heading: "Space Complexity: What Counts as Extra Space?",
            content: `Space complexity counts the EXTRA memory used beyond the input itself.

WHAT COUNTS:
✅ Variables declared inside the function
✅ Arrays/lists/dicts created during execution
✅ Recursive call stack frames
✅ Output array (sometimes — clarify with interviewer)

WHAT DOES NOT COUNT:
❌ The input array itself (it's given to us)
❌ Output array in some definitions (clarify!)

EXAMPLES:
int x = 5;                    → O(1) — constant space
int[] arr = new int[n];       → O(n) — linear space
int[][] mat = new int[n][n];  → O(n²) — quadratic space
Recursive depth d             → O(d) — stack frames

O(1) space = "in-place" — algorithm modifies input or uses fixed variables`,
          },
        ],
        code: `# Python — Reading Code Complexity (Beginner)

# ── O(1) — Constant Time ──────────────────────
# Number of operations DOESN'T change with n
def get_first(arr):
    return arr[0]              # 1 operation always

def is_even(n):
    return n % 2 == 0          # 1 operation always

def swap(arr, i, j):
    arr[i], arr[j] = arr[j], arr[i]   # 3 operations always

# ── O(n) — Linear Time ────────────────────────
# Operations grow PROPORTIONALLY with n
def find_max(arr):
    max_val = arr[0]
    for x in arr:              # loop runs n times
        if x > max_val:
            max_val = x
    return max_val

def sum_array(arr):
    total = 0
    for x in arr:              # n iterations
        total += x             # O(1) per iteration
    return total               # Total: O(n)

# ── O(n²) — Quadratic Time ────────────────────
# Operations grow with n SQUARED
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):         # n iterations
        for j in range(n-i-1): # n iterations (inner loop)
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    # n × n = n² total comparisons → O(n²)

def has_duplicate_naive(arr):
    n = len(arr)
    for i in range(n):         # n
        for j in range(i+1, n):# n
            if arr[i] == arr[j]:
                return True    # n² comparisons worst case
    return False

# ── O(log n) — Logarithmic Time ───────────────
# Input HALVED each step
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: lo = mid + 1
        else: hi = mid - 1
    return -1
# Each iteration: n → n/2 → n/4 → ... → 1
# Steps needed: log₂(n)

# ── Space Complexity Examples ─────────────────
def sum_array_O1_space(arr):
    total = 0                  # 1 variable
    for x in arr:
        total += x
    return total
# Time: O(n), Space: O(1) — just one variable

def copy_array_On_space(arr):
    return arr[:]              # creates new array of size n
# Time: O(n), Space: O(n)

def recursive_sum(arr, i=0):
    if i == len(arr): return 0
    return arr[i] + recursive_sum(arr, i+1)
# Time: O(n), Space: O(n) — n stack frames!`,
      },

      // ── INTERMEDIATE ──
      {
        level: "Intermediate",
        color: "bg-yellow-100 text-yellow-800",
        title: "Rules for Calculating Complexity",
        sections: [
          {
            heading: "Rule 1: Sequential Statements — Add",
            content: `When code runs one block AFTER another, ADD complexities.
Then keep the dominant term.

EXAMPLE:
Block 1: O(n)    — scan array
Block 2: O(n²)   — nested loops
Total:   O(n + n²) = O(n²)   ← n² dominates

ANOTHER EXAMPLE:
Block 1: O(n log n)  — sort
Block 2: O(n)        — scan
Total:   O(n log n + n) = O(n log n)  ← n log n dominates

CODE EXAMPLE:
def process(arr):
    arr.sort()            # O(n log n)
    total = sum(arr)      # O(n)
    return arr, total
# Total: O(n log n + n) = O(n log n)`,
          },
          {
            heading: "Rule 2: Nested Loops — Multiply",
            content: `When one loop is INSIDE another, MULTIPLY complexities.

Simple nested:
for i in range(n):        # n
    for j in range(n):    # n each time
→ O(n × n) = O(n²)

Different ranges:
for i in range(n):        # n
    for j in range(m):    # m each time
→ O(n × m) = O(nm)

Inner loop depends on outer:
for i in range(n):        # n
    for j in range(i):    # 0,1,2,...,n-1
→ Total iterations: 0+1+2+...+(n-1) = n(n-1)/2 = O(n²)

TRIPLE NESTED:
for i in range(n):
    for j in range(n):
        for k in range(n):
→ O(n³)`,
          },
          {
            heading: "Rule 3: Loops That Skip — Divide",
            content: `When a loop variable is MULTIPLIED (not incremented), it's O(log n).

EXAMPLE 1: i doubles each time
i = 1
while i < n:
    i *= 2          # i = 1, 2, 4, 8, ..., n
# Steps: log₂(n)  → O(log n)

EXAMPLE 2: i halves each time
i = n
while i > 0:
    i //= 2         # i = n, n/2, n/4, ..., 1
# Steps: log₂(n)  → O(log n)

EXAMPLE 3: i goes up by sqrt(n) each time? Still O(√n):
i = 0
while i < n:
    i += int(n**0.5)  # n/√n = √n steps → O(√n)

COMBINED EXAMPLE:
for i in range(n):     # O(n)
    j = 1
    while j < n:       # O(log n) per outer iteration
        j *= 2
# Total: O(n log n)`,
          },
          {
            heading: "Rule 4: If-Else — Take Maximum",
            content: `For if-else statements, take the MAXIMUM of both branches.

EXAMPLE:
if condition:          # O(n) — some operation
    scan(arr)
else:                  # O(n²) — expensive operation
    nested_loops(arr)
→ O(max(n, n²)) = O(n²)

WHY: In worst case, we take the expensive branch.
We always analyze worst case.

PRACTICAL EXAMPLE:
def process(arr, sorted_flag):
    if sorted_flag:
        return binary_search(arr, target)  # O(log n)
    else:
        return linear_search(arr, target)  # O(n)
# Worst case: O(n)`,
          },
          {
            heading: "Rule 5: Recursion — Recurrence Relations",
            content: `For recursive functions, set up a recurrence relation and solve it.

EXAMPLE 1 — Linear recursion:
def factorial(n):
    if n <= 1: return 1
    return n * factorial(n-1)

T(n) = T(n-1) + O(1)
     = T(n-2) + O(1) + O(1)
     = T(0) + n × O(1)
     = O(n)

EXAMPLE 2 — Binary recursion (halving):
def binary_search(arr, lo, hi):
    mid = (lo+hi)//2
    return binary_search(arr, lo, mid-1)  # or right half

T(n) = T(n/2) + O(1)
     = T(n/4) + O(1) + O(1)
     = T(1) + log₂(n) × O(1)
     = O(log n)

EXAMPLE 3 — Two recursive calls:
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

T(n) = T(n-1) + T(n-2) + O(1)
→ Solves to O(2^n)  ← EXPONENTIAL!`,
          },
          {
            heading: "Master Theorem: Quick Recurrence Solving",
            content: `For recurrences of form: T(n) = a·T(n/b) + f(n)
a = number of subproblems
b = factor by which input shrinks
f(n) = work done outside recursive calls

Three cases:
Let p = log_b(a)

Case 1: f(n) = O(n^c) where c < p
→ T(n) = O(n^p)
"Recursion dominates"

Case 2: f(n) = O(n^p)  (same as recursive work)
→ T(n) = O(n^p × log n)
"Both equal — multiply by log"

Case 3: f(n) = O(n^c) where c > p
→ T(n) = O(f(n))
"Outside work dominates"

EXAMPLES:
Merge Sort: T(n) = 2T(n/2) + O(n)
  a=2, b=2, p=log₂(2)=1, f(n)=O(n)=O(n^1)
  Case 2 (c=p=1): T(n) = O(n log n) ✅

Binary Search: T(n) = T(n/2) + O(1)
  a=1, b=2, p=log₂(1)=0, f(n)=O(1)=O(n^0)
  Case 2 (c=p=0): T(n) = O(n^0 × log n) = O(log n) ✅`,
          },
        ],
        code: `# Python — Intermediate Complexity Analysis

# ── Sequential: O(n log n) ───────────────────
def find_duplicates_sorted(arr):
    arr.sort()                     # O(n log n)
    duplicates = []
    for i in range(1, len(arr)):   # O(n)
        if arr[i] == arr[i-1]:
            duplicates.append(arr[i])
    return duplicates
# Total: O(n log n + n) = O(n log n)

# ── Nested but NOT n²: O(n) ──────────────────
def two_sum_optimal(arr, target):
    seen = {}                      # O(1) space
    for x in arr:                  # O(n) — single loop
        complement = target - x
        if complement in seen:     # O(1) HashMap lookup
            return [seen[complement], arr.index(x)]
        seen[x] = arr.index(x)
    return []
# SINGLE loop → O(n) NOT O(n²)!

# ── Tricky: What's the complexity? ───────────
def mystery1(arr):
    n = len(arr)
    result = 0
    i = 1
    while i < n:
        result += arr[i]
        i *= 2              # i doubles: 1,2,4,8,...
    return result
# Answer: O(log n) — i doubles each iteration

def mystery2(arr):
    n = len(arr)
    for i in range(n):          # O(n)
        j = i
        while j < n:
            j += i              # j increments by i each time
    # Inner loop: n/i iterations (for each i)
    # Total: n/1 + n/2 + n/3 + ... + n/n = n × H(n) ≈ n ln n
    # Answer: O(n log n) — harmonic series!

def mystery3(n):
    if n <= 1: return 1
    return mystery3(n//2) + mystery3(n//2) + n
# T(n) = 2T(n/2) + O(n)
# Master theorem Case 2: a=2, b=2, p=1, f(n)=O(n^1)
# Answer: O(n log n)

# ── Space Complexity Analysis ─────────────────
def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])   # creates new arrays!
    right = merge_sort(arr[mid:])
    return merge(left, right)      # creates merged array
# Time: O(n log n)
# Space: O(n) — auxiliary arrays, O(log n) call stack
# Total Space: O(n)

def dfs_recursive(graph, node, visited=None):
    if visited is None: visited = set()
    visited.add(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)
# Time: O(V + E) — visits each vertex and edge once
# Space: O(V) — visited set + O(V) recursion depth = O(V)

# ── Common Patterns Summary ───────────────────
# Pattern: LOGARITHMIC
def log_example(n):
    count = 0
    while n > 1:
        n //= 2; count += 1    # halves each time → log n steps
    return count

# Pattern: n log n (sort + scan)
def n_log_n_example(arr):
    arr.sort()              # O(n log n)
    return arr[0], arr[-1]  # O(1)
    # Total: O(n log n)

# Pattern: Deceptive O(n) (looks like O(n²))
def two_pointer(arr, target):
    left, right = 0, len(arr)-1
    while left < right:         # appears as loop in loop but...
        s = arr[left]+arr[right]
        if s == target: return True
        elif s < target: left += 1
        else: right -= 1        # each pointer moves at most n times total
    return False
# Total: O(n) — not O(n²)! Each pointer moves ≤ n times total`,
      },

      // ── ADVANCED ──
      {
        level: "Advanced",
        color: "bg-red-100 text-red-800",
        title: "Advanced Analysis: Amortized, Recursion Trees, Data Structures",
        sections: [
          {
            heading: "Amortized Analysis: Average Over Operations",
            content: `Amortized analysis gives the AVERAGE cost per operation over a SEQUENCE of operations.
Even if some operations are expensive, the average can be cheap.

CLASSIC EXAMPLE: Dynamic Array (Python list, Java ArrayList)

When array is full and you append:
- Allocate double the space
- Copy all elements → O(n) this append

But how often does this doubling happen?
Start with size 1. Double to 2, 4, 8, 16, ..., n.
Total copy work: 1 + 2 + 4 + 8 + ... + n = 2n

Over n appends: total work = n (appends) + 2n (copies) = 3n
Average per append: 3n/n = O(1) AMORTIZED!

So append is O(1) amortized, O(n) worst case.

OTHER AMORTIZED O(1) OPERATIONS:
- Python list.pop() from end
- Stack push/pop
- Deque append/popleft
- Union-Find operations with path compression`,
          },
          {
            heading: "Recursion Tree Method",
            content: `Draw the recursion as a tree. Sum up work at each level.

EXAMPLE: Merge Sort T(n) = 2T(n/2) + O(n)

Level 0: 1 call of size n         → n work
Level 1: 2 calls of size n/2      → 2×(n/2) = n work
Level 2: 4 calls of size n/4      → 4×(n/4) = n work
...
Level k: 2^k calls of size n/2^k  → n work per level
...
Level log n: n calls of size 1    → n work

Total levels: log n + 1
Work per level: O(n)
TOTAL: O(n log n) ✅

ANOTHER EXAMPLE: T(n) = 2T(n/2) + O(1) (binary search with 2 calls?)
Level 0: 1 × 1 = 1 work
Level 1: 2 × 1 = 2 work
Level 2: 4 × 1 = 4 work
Level k: 2^k × 1 work
Total: 1 + 2 + 4 + ... + n = 2n - 1 = O(n)`,
          },
          {
            heading: "Data Structure Complexity Reference",
            content: `ARRAY (Static):
Access:   O(1)   ← direct index
Search:   O(n)   ← linear scan
Insert:   O(n)   ← shift elements
Delete:   O(n)   ← shift elements

DYNAMIC ARRAY (Python list, ArrayList):
Access:   O(1)
Append:   O(1) amortized
Insert middle: O(n)
Pop end:  O(1)
Pop middle: O(n)

LINKED LIST:
Access:   O(n)
Search:   O(n)
Insert head: O(1)
Insert tail: O(n) singly, O(1) doubly
Delete:   O(n) find + O(1) delete

HASH MAP / HASH SET:
Insert:   O(1) average, O(n) worst (collision)
Search:   O(1) average, O(n) worst
Delete:   O(1) average

BINARY SEARCH TREE (balanced: AVL, Red-Black):
Insert:   O(log n)
Search:   O(log n)
Delete:   O(log n)
Min/Max:  O(log n)

HEAP / PRIORITY QUEUE:
Insert:   O(log n)
Get min/max: O(1)
Extract min/max: O(log n)
Build heap: O(n)  ← NOT O(n log n)!

SORTING ALGORITHMS:
Bubble:    O(n²)     O(1) space   Stable
Selection: O(n²)     O(1) space   Unstable
Insertion: O(n²) worst, O(n) best  O(1)  Stable
Merge:     O(n log n) O(n) space  Stable
Quick:     O(n log n) avg, O(n²) worst  O(log n)  Unstable
Heap:      O(n log n) O(1) space  Unstable
Counting:  O(n+k)    O(k) space  Stable
Radix:     O(d×(n+k)) O(n+k)     Stable
Tim:       O(n log n) O(n)        Stable (Python, Java)`,
          },
          {
            heading: "Graph Algorithm Complexity",
            content: `Let V = vertices (nodes), E = edges

BFS (Breadth First Search):
Time:  O(V + E)   — visit each vertex and edge once
Space: O(V)       — queue + visited set

DFS (Depth First Search):
Time:  O(V + E)
Space: O(V)       — stack/recursion depth

Dijkstra's (shortest path):
With binary heap: O((V + E) log V)
With Fibonacci heap: O(E + V log V)

Bellman-Ford (negative weights):
Time:  O(V × E)
Space: O(V)

Floyd-Warshall (all pairs):
Time:  O(V³)
Space: O(V²)

Topological Sort (BFS/Kahn's):
Time:  O(V + E)
Space: O(V)

Union-Find (with path compression + union by rank):
Amortized: O(α(n)) per operation ≈ O(1)
α = inverse Ackermann function, practically constant`,
          },
          {
            heading: "Complexity of Common Python Operations",
            content: `LIST:
arr[i]                → O(1)
arr.append(x)         → O(1) amortized
arr.pop()             → O(1)
arr.pop(0)            → O(n) ← SLOW! Use deque
arr.insert(i, x)      → O(n)
x in arr              → O(n)
arr.sort()            → O(n log n)
arr.reverse()         → O(n)
arr.copy()            → O(n)
len(arr)              → O(1)

DICT:
d[key]                → O(1)
d[key] = val          → O(1)
key in d              → O(1)
del d[key]            → O(1)
d.keys(), d.values()  → O(n) to iterate

SET:
s.add(x)              → O(1)
x in s                → O(1)
s.remove(x)           → O(1)
s1 & s2 (intersection)→ O(min(len(s1),len(s2)))
s1 | s2 (union)       → O(len(s1)+len(s2))

STRING:
s[i]                  → O(1)
s + t (concat)        → O(len(s)+len(t)) — creates new string!
''.join(arr)          → O(total chars) ← use this, not +=
s.split()             → O(n)
s.find(sub)           → O(n×m) naive

DEQUE (collections.deque):
appendleft(x)         → O(1)
popleft()             → O(1)  ← use instead of list.pop(0)!`,
          },
          {
            heading: "Hidden Complexity Traps",
            content: `TRAP 1: String concatenation in loop
result = ""
for s in arr:
    result += s    # creates new string each time!
# Total: O(1+2+3+...+n) = O(n²) ← SLOW!
# Fix: ''.join(arr) → O(n)

TRAP 2: List insert/pop at front
for x in data:
    arr.insert(0, x)   # O(n) each insert!
# Total: O(n²)
# Fix: Use deque with appendleft → O(1) each → O(n) total

TRAP 3: "in" operator on list vs set
# x in my_list → O(n)
# x in my_set  → O(1)
# Difference: O(n²) vs O(n) total for n lookups!

TRAP 4: Sorting inside a loop
for i in range(n):
    arr.sort()     # O(n log n) each iteration!
# Total: O(n² log n) — almost always a bug

TRAP 5: Slice creates a copy
arr[1:]           # O(n) — new array!
arr[::-1]         # O(n) — new array!

TRAP 6: Recursion depth
def fib(n):
    if n<=1: return n
    return fib(n-1) + fib(n-2)
# Time O(2^n) AND Space O(n) call stack
# Fix: memoization → O(n) time and O(n) space`,
          },
        ],
        code: `# Advanced Complexity Analysis

# ── Amortized O(1): Dynamic Array Simulation ──
class DynamicArray:
    def __init__(self):
        self.data = [None]
        self.size = 0
        self.capacity = 1
        self.total_copies = 0   # track for amortized analysis

    def append(self, val):
        if self.size == self.capacity:      # array full!
            # Double the capacity
            new_data = [None] * (2 * self.capacity)
            for i in range(self.size):      # copy all elements
                new_data[i] = self.data[i]
            self.total_copies += self.size  # O(n) this time
            self.data = new_data
            self.capacity *= 2
        self.data[self.size] = val
        self.size += 1
        # After n appends: total_copies ≤ 2n → O(1) amortized

# ── Recursion Tree: Fibonacci Exponential ─────
import sys; sys.setrecursionlimit(10000)
call_count = [0]

def fib_naive(n):
    call_count[0] += 1
    if n <= 1: return n
    return fib_naive(n-1) + fib_naive(n-2)

# fib(10): call_count ≈ 177 (≈ 2^10 = 1024, but branches share)
# fib(20): call_count ≈ 21,891

def fib_memo(n, memo={}):
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib_memo(n-1) + fib_memo(n-2)
    return memo[n]
# O(n) time, O(n) space — memoized

# ── Tricky Complexity Analysis ─────────────────
def tricky_1(n):
    # What is the time complexity?
    total = 0
    i = n
    while i > 0:
        total += i
        i //= 2        # i halves each iteration
    return total
# i = n, n/2, n/4, ... , 1 → log₂(n) iterations → O(log n)

def tricky_2(arr):
    # What is the time complexity?
    n = len(arr)
    count = 0
    for i in range(n):
        for j in range(1, n, i+1):    # j goes 1,1+i+1,1+2(i+1),...
            count += 1
    return count
# Inner loop: n/(i+1) iterations for each i
# Total: n/1 + n/2 + n/3 + ... + n/n = n × H(n) ≈ n ln n
# Answer: O(n log n)

def tricky_3(arr):
    # What is the time complexity?
    arr.sort()                         # O(n log n)
    seen = set()                       # O(1)
    for x in arr:                      # O(n)
        if x in seen:                  # O(1)
            return True
        seen.add(x)                    # O(1)
    return False
# Answer: O(n log n) — sort dominates

# ── Space Complexity: The Call Stack ──────────
def max_depth_recursive(root):
    if not root: return 0
    return 1 + max(
        max_depth_recursive(root.left),
        max_depth_recursive(root.right)
    )
# Time: O(n) — visits all nodes
# Space: O(h) where h = height of tree
# Worst case (skewed tree): O(n)
# Best case (balanced tree): O(log n)

# ── Common Space Complexities ─────────────────
def O1_space(arr):
    a = b = c = 0          # constant variables
    for x in arr:
        a += x
    return a
# Space: O(1)

def On_space(arr):
    seen = set(arr)         # set of size n
    return seen
# Space: O(n)

def On2_space(n):
    matrix = [[0]*n for _ in range(n)]   # n×n matrix
    return matrix
# Space: O(n²)

def Ologn_space(n):
    if n <= 1: return 1
    return 1 + Ologn_space(n//2)    # log₂(n) stack frames
# Space: O(log n) — recursion depth`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // COMPLEXITY CHEAT SHEET
  // ─────────────────────────────────────────────
  cheatSheet: [
    // O(1)
    { name: "Array access arr[i]",         time: "O(1)",      space: "O(1)",      category: "O(1)" },
    { name: "Hash map get/put",             time: "O(1) avg",  space: "O(1)",      category: "O(1)" },
    { name: "Stack push/pop",               time: "O(1)",      space: "O(1)",      category: "O(1)" },
    { name: "Linked list insert at head",   time: "O(1)",      space: "O(1)",      category: "O(1)" },
    { name: "Heap get min/max",             time: "O(1)",      space: "O(1)",      category: "O(1)" },
    // O(log n)
    { name: "Binary search",               time: "O(log n)",  space: "O(1)",      category: "O(log n)" },
    { name: "BST search (balanced)",        time: "O(log n)",  space: "O(1)",      category: "O(log n)" },
    { name: "Heap insert/extract",          time: "O(log n)",  space: "O(1)",      category: "O(log n)" },
    { name: "Fast exponentiation",          time: "O(log n)",  space: "O(1)",      category: "O(log n)" },
    { name: "Euclidean GCD",               time: "O(log n)",  space: "O(1)",      category: "O(log n)" },
    // O(n)
    { name: "Linear search",               time: "O(n)",      space: "O(1)",      category: "O(n)" },
    { name: "Array traversal",             time: "O(n)",      space: "O(1)",      category: "O(n)" },
    { name: "Find min/max",                time: "O(n)",      space: "O(1)",      category: "O(n)" },
    { name: "BFS / DFS",                   time: "O(V+E)",    space: "O(V)",      category: "O(n)" },
    { name: "Build hash map from array",   time: "O(n)",      space: "O(n)",      category: "O(n)" },
    { name: "Sieve (amortized per number)",time: "O(n log log n)", space: "O(n)", category: "O(n)" },
    // O(n log n)
    { name: "Merge sort",                  time: "O(n log n)", space: "O(n)",     category: "O(n log n)" },
    { name: "Quick sort (average)",        time: "O(n log n)", space: "O(log n)", category: "O(n log n)" },
    { name: "Heap sort",                   time: "O(n log n)", space: "O(1)",     category: "O(n log n)" },
    { name: "Tim sort (Python default)",   time: "O(n log n)", space: "O(n)",     category: "O(n log n)" },
    { name: "n binary searches",           time: "O(n log n)", space: "O(1)",     category: "O(n log n)" },
    // O(n²)
    { name: "Bubble sort",                 time: "O(n²)",     space: "O(1)",      category: "O(n²)" },
    { name: "Selection sort",              time: "O(n²)",     space: "O(1)",      category: "O(n²)" },
    { name: "Insertion sort (worst)",      time: "O(n²)",     space: "O(1)",      category: "O(n²)" },
    { name: "Naive two-sum (brute force)", time: "O(n²)",     space: "O(1)",      category: "O(n²)" },
    { name: "Matrix multiplication (naive)",time:"O(n³)",     space: "O(n²)",     category: "O(n²)" },
    // O(2^n)
    { name: "Generate all subsets",        time: "O(2^n)",    space: "O(n)",      category: "O(2^n)" },
    { name: "Fibonacci (naive recursive)", time: "O(2^n)",    space: "O(n)",      category: "O(2^n)" },
    { name: "Traveling salesman (brute)",  time: "O(n!)",     space: "O(n)",      category: "O(n!)" },
    { name: "Generate all permutations",   time: "O(n!)",     space: "O(n)",      category: "O(n!)" },
  ],

  // ─────────────────────────────────────────────
  // LANGUAGES
  // ─────────────────────────────────────────────
  languages: [
    {
      lang: "Python",
      emoji: "🐍",
      color: "bg-blue-100 text-blue-800",
      syntax: `# Python — Complexity of Built-in Operations

# ─── LIST ─────────────────────────────────────
arr = [1, 2, 3, 4, 5]

arr[2]                   # O(1)  — index access
len(arr)                 # O(1)  — stored internally
arr.append(6)            # O(1) amortized
arr.pop()                # O(1)  — from end
arr.pop(0)               # O(n)  ← AVOID! Shifts all elements
arr.insert(0, 0)         # O(n)  ← AVOID! Use deque
arr.remove(3)            # O(n)  — search then remove
arr[1:4]                 # O(k)  — creates new list of k elements
3 in arr                 # O(n)  — linear scan
arr.index(3)             # O(n)
arr.sort()               # O(n log n)  — TimSort
sorted(arr)              # O(n log n)  — creates new sorted list
arr.reverse()            # O(n)
arr.copy()               # O(n)
arr.count(3)             # O(n)
arr.extend([7, 8])       # O(k)  — k = len of extension

# ─── DICT ─────────────────────────────────────
d = {'a': 1, 'b': 2}

d['a']                   # O(1)  average
d['c'] = 3               # O(1)  average
'a' in d                 # O(1)  average
del d['a']               # O(1)  average
d.get('x', 0)            # O(1)
list(d.keys())           # O(n)  — iterate all keys
list(d.values())         # O(n)
list(d.items())          # O(n)
d.update({'x': 9})       # O(k)  k = size of update dict

# ─── SET ──────────────────────────────────────
s = {1, 2, 3, 4, 5}

s.add(6)                 # O(1)
6 in s                   # O(1)  ← much faster than list!
s.remove(3)              # O(1)
s.discard(99)            # O(1)  — no error if not found
s1 & s2                  # O(min(|s1|, |s2|))  — intersection
s1 | s2                  # O(|s1| + |s2|)      — union
s1 - s2                  # O(|s1|)             — difference

# ─── STRING ───────────────────────────────────
s = "hello world"

s[0]                     # O(1)
len(s)                   # O(1)
s + " again"             # O(n + m)  — creates new string!
"".join(["a","b","c"])   # O(n)      ← always use join, not +=
s.split()                # O(n)
s.find("world")          # O(n*m) naive
s.replace("l", "L")      # O(n)
s[::-1]                  # O(n)      — creates new string

# STRING CONCATENATION TRAP:
result = ""
for i in range(n):
    result += str(i)   # O(1+2+3+...+n) = O(n²) SLOW!
# FIX:
result = "".join(str(i) for i in range(n))  # O(n)

# ─── DEQUE ────────────────────────────────────
from collections import deque
dq = deque([1, 2, 3])

dq.appendleft(0)         # O(1)  ← unlike list.insert(0,x)!
dq.popleft()             # O(1)  ← unlike list.pop(0)!
dq.append(4)             # O(1)
dq.pop()                 # O(1)
dq.rotate(1)             # O(k)

# ─── HEAPQ ────────────────────────────────────
import heapq
heap = [3, 1, 4, 1, 5]

heapq.heapify(heap)      # O(n)     ← NOT O(n log n)!
heapq.heappush(heap, 2)  # O(log n)
heapq.heappop(heap)      # O(log n)
heap[0]                  # O(1)  — peek min without removing
heapq.nlargest(k, heap)  # O(n + k log n)
heapq.nsmallest(k, heap) # O(n + k log n)`,
    },
    {
      lang: "JavaScript",
      emoji: "🟨",
      color: "bg-yellow-100 text-yellow-800",
      syntax: `// JavaScript — Complexity of Built-in Operations

// ─── ARRAY ────────────────────────────────────
const arr = [1, 2, 3, 4, 5];

arr[2]                   // O(1)
arr.length               // O(1)
arr.push(6)              // O(1) amortized
arr.pop()                // O(1)
arr.shift()              // O(n)  ← SLOW! Reindexes all
arr.unshift(0)           // O(n)  ← SLOW!
arr.splice(1, 1)         // O(n)
arr.includes(3)          // O(n)
arr.indexOf(3)           // O(n)
arr.find(x => x > 3)     // O(n)
arr.findIndex(x => x>3)  // O(n)
arr.slice(1, 4)          // O(k)  — new array of k elements
arr.sort((a,b) => a-b)   // O(n log n)  — TimSort
arr.reverse()            // O(n)
arr.concat([6, 7])       // O(n + m)
[...arr]                 // O(n)  — spread = copy
arr.map(x => x*2)        // O(n)
arr.filter(x => x > 2)   // O(n)
arr.reduce((a,b)=>a+b,0) // O(n)
arr.forEach(x => ...)    // O(n)
arr.every(x => x > 0)    // O(n) worst case
arr.some(x => x < 0)     // O(n) worst case
arr.flat()               // O(n × depth)

// ─── MAP (Hash Map) ───────────────────────────
const map = new Map();

map.set('key', 'val')    // O(1) average
map.get('key')           // O(1) average
map.has('key')           // O(1) average
map.delete('key')        // O(1) average
map.size                 // O(1)
map.clear()              // O(n)
for (const [k,v] of map) // O(n)

// ─── SET ──────────────────────────────────────
const set = new Set([1, 2, 3]);

set.add(4)               // O(1)
set.has(3)               // O(1)  ← O(1) vs O(n) for array!
set.delete(2)            // O(1)
set.size                 // O(1)
set.clear()              // O(n)

// ─── STRING ───────────────────────────────────
const s = "hello";

s[0]                     // O(1)
s.length                 // O(1)
s + " world"             // O(n+m) — new string
s.includes("hell")       // O(n*m)
s.indexOf("l")           // O(n)
s.slice(1, 4)            // O(k)
s.split("")              // O(n) — array of chars
[...s].reverse().join("") // O(n) — reverse string
s.repeat(k)              // O(n*k)
s.replace("l","L")       // O(n) — first only
s.replaceAll("l","L")    // O(n)
Array.from(s)            // O(n)

// ─── OBJECT ───────────────────────────────────
const obj = {a:1, b:2};

obj['a']                 // O(1) average
obj['c'] = 3             // O(1)
'a' in obj               // O(1)
delete obj['a']          // O(1)
Object.keys(obj)         // O(n)
Object.values(obj)       // O(n)
Object.entries(obj)      // O(n)`,
    },
    {
      lang: "Java",
      emoji: "☕",
      color: "bg-orange-100 text-orange-800",
      syntax: `// Java — Complexity of Collections

import java.util.*;

// ─── ARRAYLIST ────────────────────────────────
ArrayList<Integer> list = new ArrayList<>();

list.get(i)              // O(1)
list.size()              // O(1)
list.add(x)              // O(1) amortized — end
list.add(0, x)           // O(n) — start, shifts elements
list.remove(list.size()-1) // O(1)
list.remove(0)           // O(n) — shifts elements
list.contains(x)         // O(n)
list.indexOf(x)          // O(n)
list.set(i, x)           // O(1)
list.subList(1, 4)       // O(1) view, O(k) to iterate
Collections.sort(list)   // O(n log n)

// ─── LINKEDLIST ───────────────────────────────
LinkedList<Integer> ll = new LinkedList<>();

ll.addFirst(x)           // O(1)
ll.addLast(x)            // O(1)
ll.removeFirst()         // O(1)
ll.removeLast()          // O(1)
ll.get(i)                // O(n) ← no random access!
ll.contains(x)           // O(n)

// ─── HASHMAP ──────────────────────────────────
HashMap<String,Integer> map = new HashMap<>();

map.put("key", 1)        // O(1) average
map.get("key")           // O(1) average
map.containsKey("key")   // O(1) average
map.remove("key")        // O(1) average
map.size()               // O(1)
map.getOrDefault("x", 0) // O(1)
map.entrySet()           // O(n) to iterate

// ─── HASHSET ──────────────────────────────────
HashSet<Integer> set = new HashSet<>();

set.add(x)               // O(1) average
set.contains(x)          // O(1) average ← much faster than List!
set.remove(x)            // O(1) average

// ─── TREEMAP / TREESET (sorted) ───────────────
TreeMap<Integer,String> tm = new TreeMap<>();

tm.put(1, "one")         // O(log n)
tm.get(1)                // O(log n)
tm.firstKey()            // O(log n)
tm.lastKey()             // O(log n)
tm.floorKey(5)           // O(log n) — largest key <= 5
tm.ceilingKey(5)         // O(log n) — smallest key >= 5

// ─── PRIORITYQUEUE (Min Heap) ─────────────────
PriorityQueue<Integer> pq = new PriorityQueue<>();

pq.offer(x)              // O(log n)
pq.poll()                // O(log n) — remove min
pq.peek()                // O(1)     — view min
pq.contains(x)           // O(n)     — heap has no random access!
pq.size()                // O(1)

// ─── DEQUE ────────────────────────────────────
Deque<Integer> dq = new ArrayDeque<>();

dq.offerFirst(x)         // O(1)
dq.offerLast(x)          // O(1)
dq.pollFirst()           // O(1)
dq.pollLast()            // O(1)
dq.peekFirst()           // O(1)`,
    },
    {
      lang: "C++",
      emoji: "⚙️",
      color: "bg-purple-100 text-purple-800",
      syntax: `// C++ — STL Container Complexity
#include <vector>
#include <map>
#include <unordered_map>
#include <set>
#include <unordered_set>
#include <queue>
#include <deque>

// ─── VECTOR ───────────────────────────────────
vector<int> v = {1,2,3,4,5};

v[i]                     // O(1)
v.size()                 // O(1)
v.push_back(x)           // O(1) amortized
v.pop_back()             // O(1)
v.insert(v.begin(), x)   // O(n) — front insert
v.erase(v.begin())       // O(n) — front erase
v.front(), v.back()      // O(1)
find(v.begin(),v.end(),x)// O(n)
sort(v.begin(),v.end())  // O(n log n)

// ─── UNORDERED_MAP (Hash Map) ─────────────────
unordered_map<string,int> um;

um["key"] = 1            // O(1) average
um.count("key")          // O(1) average
um.find("key")           // O(1) average
um.erase("key")          // O(1) average
um.size()                // O(1)

// ─── MAP (Ordered / Red-Black Tree) ───────────
map<int,string> m;

m[1] = "one"             // O(log n) — sorted insertion
m.count(1)               // O(log n)
m.find(1)                // O(log n)
m.lower_bound(5)         // O(log n) — first key >= 5
m.upper_bound(5)         // O(log n) — first key > 5
m.begin(), m.end()       // O(1)

// ─── UNORDERED_SET (Hash Set) ─────────────────
unordered_set<int> us;

us.insert(x)             // O(1) average
us.count(x)              // O(1) average — 0 or 1
us.find(x)               // O(1) average
us.erase(x)              // O(1) average

// ─── SET (Ordered / Red-Black Tree) ───────────
set<int> s;

s.insert(x)              // O(log n)
s.count(x)               // O(log n)
*s.begin()               // O(1)  — minimum
*s.rbegin()              // O(1)  — maximum
s.lower_bound(5)         // O(log n)

// ─── PRIORITY QUEUE (Max Heap by default) ─────
priority_queue<int> pq;  // max heap
priority_queue<int,vector<int>,greater<int>> min_pq;  // min heap

pq.push(x)               // O(log n)
pq.pop()                 // O(log n)
pq.top()                 // O(1) — peek max

// ─── DEQUE ────────────────────────────────────
deque<int> dq;

dq.push_front(x)         // O(1)
dq.push_back(x)          // O(1)
dq.pop_front()           // O(1)
dq.pop_back()            // O(1)
dq[i]                    // O(1) — random access!`,
    },
  ],

  // ─────────────────────────────────────────────
  // PATTERNS
  // ─────────────────────────────────────────────
  patterns: [
    {
      name: "Recognize O(n log n) from Sorting",
      emoji: "📊",
      color: "bg-blue-50 border-blue-200",
      titleColor: "text-blue-800",
      when: "Any time you sort + do linear work. Sorting dominates.",
      avoid: "Sorting unnecessarily when O(n) or O(n log n) without sort suffices",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1) to O(n) depending on sort",
      steps: [
        "Identify any sort call: O(n log n)",
        "Identify linear scan after sort: O(n)",
        "Add: O(n log n + n) = O(n log n)",
        "Sorting dominates — total is O(n log n)",
      ],
      template: `# Pattern: Sort + Linear Scan = O(n log n)
def example(arr, target):
    arr.sort()              # O(n log n)
    lo, hi = 0, len(arr)-1
    while lo < hi:          # O(n) — two pointer
        s = arr[lo]+arr[hi]
        if s == target: return True
        elif s < target: lo += 1
        else: hi -= 1
    return False
# Total: O(n log n) — sort dominates`,
    },
    {
      name: "HashMap Converts O(n²) to O(n)",
      emoji: "⚡",
      color: "bg-green-50 border-green-200",
      titleColor: "text-green-800",
      when: "Any time you have nested loops checking membership or pairs",
      avoid: "When you need indices and sorting would break them",
      timeComplexity: "O(n) with O(n) extra space",
      spaceComplexity: "O(n)",
      steps: [
        "Identify the inner loop checking if value exists",
        "Replace inner loop with HashMap lookup O(1)",
        "Outer loop still O(n)",
        "Total: O(n) instead of O(n²)",
      ],
      template: `# O(n²) brute force — nested loops
def has_pair_slow(arr, target):
    for i in range(len(arr)):           # O(n)
        for j in range(i+1, len(arr)):  # O(n)
            if arr[i]+arr[j]==target: return True
    return False
# Time: O(n²)

# O(n) with HashMap — eliminate inner loop
def has_pair_fast(arr, target):
    seen = set()
    for x in arr:                       # O(n)
        if target - x in seen: return True  # O(1) lookup
        seen.add(x)
    return False
# Time: O(n), Space: O(n) — massive improvement!`,
    },
    {
      name: "Recursion: Count the Work per Level",
      emoji: "🌳",
      color: "bg-purple-50 border-purple-200",
      titleColor: "text-purple-800",
      when: "Analyzing recursive algorithms — draw the recursion tree",
      avoid: "Don't guess. Always draw the tree or use Master Theorem.",
      timeComplexity: "Depends on tree shape",
      spaceComplexity: "O(depth) for call stack",
      steps: [
        "Draw top level: 1 call, f(n) work",
        "Draw level 1: a calls each f(n/b) work",
        "Count total work per level",
        "Count total levels (log_b(n))",
        "Multiply or use Master Theorem",
      ],
      template: `# T(n) = 2T(n/2) + O(n)  → Merge Sort
# Level 0: 1 call  × n work = n
# Level 1: 2 calls × n/2    = n
# Level 2: 4 calls × n/4    = n
# ...
# Level k: 2^k × n/2^k      = n
# Total levels: log n
# Total work: n × log n = O(n log n)

# T(n) = T(n-1) + O(1)  → Factorial
# Level 0: O(1)
# Level 1: O(1)
# ...
# Level n: O(1)
# Total levels: n
# Total work: n × O(1) = O(n)

# T(n) = 2T(n-1) + O(1)  → Naive Fibonacci
# Level 0: 1 call
# Level 1: 2 calls
# Level 2: 4 calls
# Level k: 2^k calls
# Total: 1+2+4+...+2^n ≈ 2^n = O(2^n)`,
    },
    {
      name: "Two Pointers: O(n) Not O(n²)",
      emoji: "👆👆",
      color: "bg-yellow-50 border-yellow-200",
      titleColor: "text-yellow-800",
      when: "Sorted array, need pairs. Looks like O(n²) but is O(n).",
      avoid: "Confusing two nested loops with two-pointer — they're different!",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      steps: [
        "Left pointer moves right at most n times",
        "Right pointer moves left at most n times",
        "Total pointer movements: at most 2n",
        "Each iteration: one pointer moves",
        "Total iterations: at most 2n = O(n)",
      ],
      template: `def two_pointer(arr, target):
    left, right = 0, len(arr)-1
    # While loop looks nested but isn't!
    while left < right:
        s = arr[left] + arr[right]
        if s == target: return True
        elif s < target: left += 1   # left moves right: at most n times
        else: right -= 1             # right moves left: at most n times
    return False
# Total iterations ≤ n (each step moves one pointer permanently)
# NOT O(n²) — it's O(n)!`,
    },
  ],

  // ─────────────────────────────────────────────
  // PROBLEMS
  // ─────────────────────────────────────────────
  problems: [
    {
      name: "Analyze This Code (Easy)",
      difficulty: "Easy",
      companies: ["Amazon", "Google", "Microsoft"],
      platforms: [
        { name: "LeetCode Discuss", url: "https://leetcode.com/discuss/", id: "Practice" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/", id: "Theory" },
      ],
      statement: "What is the time and space complexity of this code?\n\nfor i in range(n):\n  for j in range(i, n):\n    print(i, j)",
      example: "n=4: prints (0,0),(0,1),(0,2),(0,3),(1,1),(1,2),(1,3),(2,2),(2,3),(3,3) = 10 pairs",
      constraints: ["Express in Big-O", "State both time and space"],
      approaches: [
        {
          title: "Count the iterations",
          emoji: "🔢",
          tag: "O(n²)",
          complexity: "Time: O(n²) | Space: O(1)",
          idea: "Inner loop runs n-i times for each i. Sum: n + (n-1) + ... + 1 = n(n+1)/2. This is O(n²). Space: only loop variables, O(1).",
          when: "Always reason from first principles before pattern matching.",
          code: `# Counting iterations:
# i=0: j from 0 to n-1 → n iterations
# i=1: j from 1 to n-1 → n-1 iterations
# i=2: j from 2 to n-1 → n-2 iterations
# ...
# i=n-1: j = n-1 → 1 iteration

# Total = n + (n-1) + (n-2) + ... + 1
#       = n(n+1)/2
#       = O(n²)

# Space: i and j are just integers → O(1)

# RULE: inner loop from i to n (not 0 to n) is STILL O(n²)
# It's n(n+1)/2 iterations, which is O(n²)`,
        },
      ],
      ai: {
        hints: ["Count how many times the inner loop runs for each value of i", "Sum up the inner loop iterations"],
        followUps: ["What if inner loop was from 0 to i?", "What if there was a third loop from j to n?"],
        interviewQuestions: ["How does this differ from two full nested loops?", "Same complexity but different constant?"],
      },
    },
    {
      name: "Fibonacci Optimization",
      difficulty: "Easy",
      companies: ["Amazon", "Google", "Microsoft", "Facebook"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/fibonacci-number/", id: "#509" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/", id: "Practice" },
      ],
      statement: "Compute nth Fibonacci number. Analyze each approach's complexity.",
      example: "fib(10) = 55 | fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2...",
      constraints: ["Show 4 approaches with different complexities", "0 ≤ n ≤ 30"],
      approaches: [
        {
          title: "Naive Recursion",
          emoji: "🐢",
          tag: "O(2^n) time O(n) space",
          complexity: "Time: O(2^n) | Space: O(n) call stack",
          idea: "Direct recursion. Each call makes 2 more calls. Exponential — completely impractical for large n.",
          when: "Never. Only for teaching purposes.",
          code: `def fib_naive(n):
    if n <= 1: return n
    return fib_naive(n-1) + fib_naive(n-2)
# Recurrence: T(n) = T(n-1) + T(n-2) + O(1)
# Solves to: T(n) = O(2^n)
# fib(50) would take years!`,
        },
        {
          title: "Memoization (Top-Down DP)",
          emoji: "💾",
          tag: "O(n) time O(n) space",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "Cache results. Each unique subproblem (0 to n) solved exactly once. n unique subproblems × O(1) each = O(n).",
          when: "Good when top-down thinking is clearer. Same complexity as tabulation.",
          code: `def fib_memo(n, memo={}):
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]
# Each of n subproblems computed ONCE → O(n)
# memo dict stores n values → O(n) space
# Call stack depth: O(n) → O(n) space total`,
        },
        {
          title: "Tabulation (Bottom-Up DP)",
          emoji: "📊",
          tag: "O(n) time O(n) space",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "Build table from base cases up. No recursion. One loop, each iteration O(1).",
          when: "Often preferred — no recursion overhead, clearer complexity.",
          code: `def fib_dp(n):
    if n <= 1: return n
    dp = [0] * (n+1)   # O(n) space
    dp[1] = 1
    for i in range(2, n+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
# n iterations, each O(1) → O(n) time
# Array of n+1 elements → O(n) space`,
        },
        {
          title: "Space Optimized DP",
          emoji: "⚡",
          tag: "OPTIMAL: O(n) time O(1) space",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "We only need the last 2 values. Use two variables instead of array.",
          when: "Best — same time, O(1) space. Always prefer this.",
          code: `def fib_optimal(n):
    if n <= 1: return n
    prev2, prev1 = 0, 1
    for _ in range(2, n+1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    return prev1
# n iterations, each O(1) → O(n) time
# Only 3 variables → O(1) space!

# BONUS: Matrix exponentiation → O(log n) time O(1) space
# [[1,1],[1,0]]^n = [[F(n+1),F(n)],[F(n),F(n-1)]]`,
        },
      ],
      ai: {
        hints: ["Draw the recursion tree for naive approach", "How many unique subproblems are there?"],
        followUps: ["Climbing Stairs (same pattern)", "Fibonacci in O(log n) with matrix exponentiation"],
        interviewQuestions: ["Can you do O(log n)?", "When would you prefer memoization vs tabulation?"],
      },
    },
    {
      name: "Best Time to Buy Stock — Why O(n)?",
      difficulty: "Easy",
      companies: ["Amazon", "Facebook", "Goldman Sachs", "Microsoft"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", id: "#121" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/best-time-to-buy-and-sell-stock/", id: "Practice" },
      ],
      statement: "Show how recognizing that you only need one pass reduces O(n²) to O(n).",
      example: "[7,1,5,3,6,4] → 5 (buy at 1, sell at 6)",
      constraints: ["Show both O(n²) and O(n) with complexity proof"],
      approaches: [
        {
          title: "Brute Force — O(n²)",
          emoji: "🐢",
          tag: "O(n²)",
          complexity: "Time: O(n²) | Space: O(1)",
          idea: "Try every pair (buy day, sell day). n×(n-1)/2 pairs = O(n²).",
          when: "Never use. Shows baseline.",
          code: `def max_profit_brute(prices):
    best = 0
    for i in range(len(prices)):      # O(n)
        for j in range(i+1, len(prices)):  # O(n)
            profit = prices[j] - prices[i]
            best = max(best, profit)
    return best
# n×(n-1)/2 ≈ n²/2 iterations = O(n²)`,
        },
        {
          title: "Single Pass — O(n)",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Track minimum price seen so far. At each price, potential profit = today - min_so_far. Track max profit. One pass = O(n).",
          when: "Always. Mathematical insight eliminates inner loop.",
          code: `def max_profit(prices):
    min_price = float('inf')  # running minimum
    max_profit = 0
    for price in prices:      # O(n) — single loop!
        min_price = min(min_price, price)
        profit = price - min_price
        max_profit = max(max_profit, profit)
    return max_profit
# WHY O(n): 1 loop, each iteration O(1)
# WHY NOT O(n²): we don't need to revisit past prices
#   because we track min_price as we go!
# Space: O(1) — just 2 variables`,
        },
      ],
      ai: {
        hints: ["What information from previous days do you actually need?", "Can one variable capture all you need?"],
        followUps: ["Stock II (multiple transactions)", "Maximum Subarray (same pattern)"],
        interviewQuestions: ["Why is keeping track of min_price sufficient?", "Space: O(1) — why?"],
      },
    },
  ],

  // ─────────────────────────────────────────────
  // INTERVIEW TIPS
  // ─────────────────────────────────────────────
  interviewTips: [
    "Always state BOTH time and space complexity for every solution without being asked",
    "Use 'worst case' by default unless asked for average or best case",
    "Drop constants and lower-order terms: O(2n + n log n + 5) = O(n log n)",
    "Be precise: O(V+E) for graphs, not just O(n) — V = vertices, E = edges",
    "String concatenation in loop is O(n²) — always use join() or StringBuilder",
    "Recursive call stack counts as space: O(depth) — often O(n) or O(log n)",
    "HashSet lookup is O(1) average — use instead of list's O(n) when checking membership",
    "Sorting is O(n log n) — if your solution's time includes a sort, total is at least O(n log n)",
    "Amortized O(1): dynamic array append, stack push/pop — say 'amortized O(1)'",
    "Heapify (build heap from array) is O(n) NOT O(n log n) — common interview surprise",
    "Two pointers on sorted array is O(n) not O(n²) — understand WHY each pointer moves at most n times",
    "Matrix exponentiation can compute linear recurrences (Fibonacci) in O(log n)",
  ],

  // ─────────────────────────────────────────────
  // COMMON MISTAKES
  // ─────────────────────────────────────────────
  mistakes: [
    "Saying O(n) for sorted operations — always check if sort is needed first (O(n log n))",
    "Forgetting call stack space in recursion — add O(depth) to space complexity",
    "Treating Python list.pop(0) as O(1) — it's O(n)! Use deque.popleft() for O(1)",
    "Treating string concatenation (+=) in loop as O(n) — it's O(n²), use join()",
    "Claiming HashSet lookup is O(1) always — worst case is O(n) with hash collisions",
    "Confusing two-pointer O(n) with nested loops O(n²) — key: each pointer moves at most n total",
    "Building heap with n pushes: O(n log n) — use heapify() for O(n)",
    "Forgetting that slicing creates a copy: arr[1:] is O(n) not O(1)",
    "Saying 'n² because two loops' — two independent loops are O(2n) = O(n), not O(n²)",
    "Confusing worst case with average case for QuickSort — worst is O(n²), average is O(n log n)",
  ],

  // ─────────────────────────────────────────────
  // QUIZ
  // ─────────────────────────────────────────────
  quiz: [
    {
      q: "What is the time complexity of this code?\nfor i in range(n):\n    for j in range(n):\n        pass",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(2n)"],
      answer: 2,
      explanation: "Two nested loops each running n times: n × n = n² total iterations. This is O(n²). Note: O(2n) = O(n) — this is NOT two independent loops, it's NESTED loops which MULTIPLY.",
    },
    {
      q: "String concatenation 'result += s' inside a loop of n strings is what complexity?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
      answer: 2,
      explanation: "Each += creates a NEW string copying all previous characters. After n iterations: 1+2+3+...+n = n(n+1)/2 = O(n²) character copies! Always use ''.join(arr) which is O(n) total.",
    },
    {
      q: "What is the space complexity of recursive binary search?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      answer: 1,
      explanation: "Recursive binary search makes O(log n) recursive calls before reaching base case. Each call occupies one stack frame. Maximum call stack depth = O(log n). Note: iterative binary search is O(1) space.",
    },
    {
      q: "Python's list.pop(0) — what is its time complexity?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      answer: 2,
      explanation: "list.pop(0) removes from the FRONT, requiring all remaining n-1 elements to shift left one position. This is O(n). Use collections.deque.popleft() for O(1) front removal.",
    },
    {
      q: "What is the time complexity of heapq.heapify(arr) in Python?",
      options: ["O(n log n)", "O(n)", "O(log n)", "O(n²)"],
      answer: 1,
      explanation: "heapify() is O(n), NOT O(n log n)! The mathematical proof shows that the total work for sifting down all nodes is bounded by O(n) (most nodes are near the bottom and need few swaps). Doing n individual heappush() operations would be O(n log n).",
    },
    {
      q: "T(n) = 2T(n/2) + O(n) — what does the Master Theorem give?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      answer: 1,
      explanation: "a=2, b=2, p=log₂(2)=1. f(n)=O(n)=O(n^1). Since c=p=1, this is Case 2: T(n)=O(n^1 × log n) = O(n log n). This is Merge Sort's recurrence — confirms O(n log n).",
    },
    {
      q: "Two independent loops (not nested):\nfor i in range(n): pass\nfor j in range(n): pass\nWhat is the complexity?",
      options: ["O(n²)", "O(2n²)", "O(n)", "O(2n)"],
      answer: 2,
      explanation: "Two SEQUENTIAL (not nested) loops: O(n) + O(n) = O(2n) = O(n). Sequential code ADDS complexities. Nested code MULTIPLIES. O(2n) = O(n) by dropping the constant 2.",
    },
  ],

  practice_links: [
    { platform: "LeetCode Complexity Problems", url: "https://leetcode.com/explore/learn/card/recursion-i/", color: "bg-orange-500", problems: "Recursion + complexity", recommended: true },
    { platform: "GFG Complexity Analysis", url: "https://www.geeksforgeeks.org/analysis-algorithms-big-o-analysis/", color: "bg-green-600", problems: "Complete theory + examples", recommended: true },
    { platform: "MIT OpenCourseWare", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/", color: "bg-slate-700", problems: "Rigorous mathematical foundation" },
    { platform: "Big-O Cheat Sheet", url: "https://www.bigocheatsheet.com/", color: "bg-blue-600", problems: "Visual complexity reference" },
    { platform: "Striver's Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", color: "bg-indigo-600", problems: "All topics with complexity", recommended: true },
    { platform: "Visualgo", url: "https://visualgo.net/", color: "bg-teal-600", problems: "Visual algorithm animations" },
  ],
};

export default timeComplexity;
