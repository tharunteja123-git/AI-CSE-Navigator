const dp = {
  name: "Dynamic Programming",
  emoji: "⚡",
  color: "bg-orange-500",
  light: "bg-orange-50",
  border: "border-orange-200",
  text: "text-orange-700",
  total: 40,

definition: {
  short:
    "Dynamic Programming (DP) is an optimization technique used to solve problems by breaking them into smaller overlapping subproblems, solving each subproblem only once, storing the result (memoization/tabulation), and reusing it whenever needed to avoid repeated computation.",

  analogy:
    "Imagine climbing a staircase where you write down the number of ways to reach each step. Instead of calculating the same steps repeatedly, you simply look at your notes. DP works the same way—it remembers previous answers to save time.",

  properties: [
    "Breaks a complex problem into smaller subproblems.",
    "Works only when subproblems overlap.",
    "Stores previously computed answers for reuse.",
    "Can be implemented using Memoization (Top-Down) or Tabulation (Bottom-Up).",
    "Often reduces exponential solutions to polynomial time.",
    "Requires identifying the correct state and recurrence relation.",
    "Commonly used in optimization and counting problems."
  ],

  complexity: [
    {
      op: "Naive Recursion",
      time: "O(2ⁿ)",
      space: "O(n)"
    },
    {
      op: "Memoization",
      time: "O(n)",
      space: "O(n)"
    },
    {
      op: "Tabulation",
      time: "O(n)",
      space: "O(n)"
    },
    {
      op: "Space Optimized DP",
      time: "O(n)",
      space: "O(1)"
    }
  ]
},

  learningObjectives: [
    "Understand what DP is and the exact conditions that make it applicable",
    "Master the 3-step DP framework: Recursion → Memoization → Tabulation",
    "Learn all classic DP patterns: 0/1 Knapsack, LCS, LIS, Coin Change, Grid DP",
    "Recognize DP problems instantly by their structural properties",
    "Solve 40+ interview problems from Easy to Hard with space-optimized solutions",
  ],

  prerequisites: [
    "Recursion (comfortable with recursive thinking)",
    "Arrays and 2D Arrays",
    "Basic math (max, min, sum)",
    "HashMap/Memoization concept",
  ],

  whyLearn: {
    importance: "Dynamic Programming is the most powerful algorithmic technique in competitive programming and technical interviews. Problems that seem O(2^n) with brute force become O(n²) or O(n) with DP. It appears in 30%+ of hard interview questions at Google, Amazon, and Meta.",
    useCases: [
      "Resource allocation — maximize profit given constraints (Knapsack)",
      "Text editing — spell checkers use Edit Distance (Levenshtein)",
      "Bioinformatics — DNA sequence alignment uses LCS",
      "Speech recognition — hidden Markov models use DP",
      "Route planning — shortest path optimization (Bellman-Ford)",
      "Financial modeling — optimal portfolio selection",
      "Compiler optimization — optimal code generation",
    ],
  },

  concept: {
    intro: `Dynamic Programming (DP) is an optimization technique that solves complex problems by breaking them into simpler overlapping subproblems and storing their results to avoid redundant computation.

Two KEY properties required for DP:
1. OPTIMAL SUBSTRUCTURE: Optimal solution of the problem contains optimal solutions of its subproblems
2. OVERLAPPING SUBPROBLEMS: Same subproblems are solved multiple times in naive recursion

If both properties exist → DP gives exponential speedup.`,

    levels: [
      {
        level: "Beginner",
        color: "bg-green-100 text-green-800",
        title: "The DP Mindset — From Recursion to Optimization",
        sections: [
          {
            heading: "Step 1: What Is DP Really?",
            content: `DP = Recursion + Caching (Memoization)

Without DP: Fibonacci computes fib(3) millions of times
With DP: Compute fib(3) ONCE, store result, reuse it

The core question is: "Have I solved this exact subproblem before?"

WHEN TO USE DP — Ask these questions:
1. Does the problem ask for OPTIMAL (max/min/count)?
2. Can the problem be broken into SMALLER SUBPROBLEMS of same type?
3. Do subproblems REPEAT (overlapping)?
4. Does the optimal solution DEPEND on optimal solutions of subproblems?

All YES → DP is applicable.

COMMON TRIGGERS (words that suggest DP):
"Maximum/Minimum" → optimization DP
"Count the number of ways" → counting DP
"Is it possible?" → existence DP
"Longest/Shortest subsequence" → sequence DP`,
          },
          {
            heading: "Step 2: The 3-Step DP Framework",
            content: `Always follow this progression:

STEP 1 — Write plain recursion (brute force)
Define f(state) = answer for that state
Write recursive relation
Add base cases

STEP 2 — Add memoization (top-down DP)
Use a dictionary/array to cache results
Before computing: check if already cached
After computing: store result before returning

STEP 3 — Convert to tabulation (bottom-up DP)
Build answer from base cases upward
Fill a table iteratively (no recursion)
Often easier to optimize space

OPTIONAL STEP 4 — Optimize space
Often only need last 1-2 rows of table
Reduce O(n²) space to O(n) or O(1)

KEY INSIGHT: Top-down (memoization) and bottom-up (tabulation) have
IDENTICAL time complexity. Choose based on what's clearer.`,
          },
          {
            heading: "Step 3: Fibonacci — The Hello World of DP",
            content: `WHY FIBONACCI TEACHES DP:

PROBLEM: fib(n) = fib(n-1) + fib(n-2), fib(0)=0, fib(1)=1

NAIVE RECURSION — Why it's O(2^n):
fib(5)
├── fib(4)
│   ├── fib(3)  ← computed again below!
│   │   ├── fib(2)
│   │   └── fib(1)
│   └── fib(2)
└── fib(3)      ← same as above!
    ├── fib(2)
    └── fib(1)

fib(3) is computed TWICE. For fib(40), the same subproblems repeat MILLIONS of times.

WITH MEMOIZATION:
fib(3) computed ONCE, cached. When needed again → instant lookup.
Total unique subproblems: n
Each computed once → O(n) time, O(n) space

WITH TABULATION:
Fill array from bottom: dp[0]=0, dp[1]=1, dp[2]=dp[0]+dp[1]=1...
O(n) time, O(n) space → can optimize to O(1) space`,
          },
          {
            heading: "Step 4: Defining the DP State",
            content: `The HARDEST part of DP is defining the state.

STATE = the minimum information needed to uniquely describe a subproblem.

QUESTIONS TO ASK:
1. What changes between subproblems?
2. What information do I need to compute the answer?
3. Can I express it as dp[something]?

EXAMPLES:
Fibonacci: dp[i] = ith Fibonacci number
  → State: which index we're at (i)

Climbing Stairs: dp[i] = ways to reach stair i
  → State: current stair (i)

0/1 Knapsack: dp[i][w] = max value with first i items, capacity w
  → State: (item index, remaining capacity)

LCS: dp[i][j] = LCS length of s1[:i] and s2[:j]
  → State: (position in s1, position in s2)

RULE OF THUMB:
Number of states × Work per state = Time Complexity
If states = O(n²) and work per state = O(1) → O(n²) total`,
          },
          {
            heading: "Step 5: Transition Relation — The Heart of DP",
            content: `The TRANSITION (recurrence relation) says: how to compute dp[state] from smaller states.

This is the mathematical heart of every DP problem.

EXAMPLES:

Fibonacci:
dp[n] = dp[n-1] + dp[n-2]
"nth Fibonacci = sum of previous two"

Climbing Stairs (1 or 2 steps):
dp[n] = dp[n-1] + dp[n-2]
"reach step n from step n-1 OR from step n-2"

0/1 Knapsack:
dp[i][w] = max(dp[i-1][w],                    ← don't take item i
               dp[i-1][w-weight[i]] + value[i]) ← take item i (if fits)
"for each item, choose max of taking or not taking it"

IMPORTANT: You must PROVE the transition is correct.
Ask: "Is this ALL ways to reach state X?"
Check: Does every valid answer have a unique path through the DP table?`,
          },
        ],
        code: `# Python — DP Framework Applied to Fibonacci

# ── STEP 1: Plain Recursion — O(2^n) ─────────
def fib_recursive(n):
    if n <= 1: return n          # base case
    return fib_recursive(n-1) + fib_recursive(n-2)   # transition
# fib(40) takes ~50 seconds. fib(100) takes longer than universe age.

# ── STEP 2: Top-Down DP (Memoization) — O(n) ─
def fib_memo(n, memo=None):
    if memo is None: memo = {}
    if n in memo: return memo[n]  # cache hit!
    if n <= 1: return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]
# fib(100) = 354224848179261915075  ← instant!
# Uses Python's call stack + memo dict

# ── STEP 3: Bottom-Up DP (Tabulation) — O(n) ─
def fib_tabulation(n):
    if n <= 1: return n
    dp = [0] * (n+1)
    dp[0] = 0; dp[1] = 1        # base cases
    for i in range(2, n+1):
        dp[i] = dp[i-1] + dp[i-2]  # transition
    return dp[n]

# ── STEP 4: Space Optimized — O(1) space ──────
def fib_optimal(n):
    if n <= 1: return n
    prev2, prev1 = 0, 1         # only need last 2 values
    for _ in range(2, n+1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    return prev1

# ── Using functools.lru_cache (Pythonic) ──────
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_cache(n):
    if n <= 1: return n
    return fib_cache(n-1) + fib_cache(n-2)
# Automatic memoization. Same O(n) time, O(n) space.

# ── Complexity Comparison ─────────────────────
# Naive:          Time O(2^n)  Space O(n)   ← unusable
# Memo:           Time O(n)    Space O(n)   ← good
# Tabulation:     Time O(n)    Space O(n)   ← good
# Space-optimized:Time O(n)    Space O(1)   ← BEST

# Test:
for approach in [fib_recursive, fib_memo, fib_tabulation, fib_optimal]:
    print(approach(10))   # all give 55`,
      },

      // ── INTERMEDIATE ──
      {
        level: "Intermediate",
        color: "bg-yellow-100 text-yellow-800",
        title: "Classic DP Patterns — Master These 6",
        sections: [
          {
            heading: "Pattern 1: 1D DP — Linear Sequence",
            content: `State: dp[i] = answer for subproblem ending at/including index i
Transition: dp[i] depends on dp[i-1], dp[i-2], or some earlier state

WHEN TO USE:
- Problem on array/string where answer for position i depends on previous positions
- "Find maximum/minimum/count for subarrays ending at index i"

EXAMPLES:
Climbing Stairs: dp[n] = dp[n-1] + dp[n-2]
House Robber: dp[i] = max(dp[i-1], dp[i-2] + arr[i])
Maximum Subarray: dp[i] = max(arr[i], dp[i-1] + arr[i])
Jump Game: dp[i] = can we reach index i?

KEY INSIGHT: For 1D DP, ALWAYS think:
"What's the optimal decision at position i, given I know optimal for all positions before i?"`,
          },
          {
            heading: "Pattern 2: 0/1 Knapsack — Include/Exclude",
            content: `The MOST IMPORTANT DP pattern. Underlies dozens of problems.

STATE: dp[i][w] = max value using first i items with capacity w
TRANSITION:
  Don't take item i: dp[i][w] = dp[i-1][w]
  Take item i (if fits): dp[i][w] = dp[i-1][w-weight[i]] + value[i]
  Choose max of both.

IDENTIFIES AS KNAPSACK:
- Each item can be included at most ONCE (0/1)
- There's a constraint (capacity, budget, time)
- Maximize or minimize some objective

VARIANTS:
0/1 Knapsack: each item used 0 or 1 times
Unbounded Knapsack: each item used unlimited times (Coin Change II)
Bounded Knapsack: each item has limited count
Subset Sum: can we reach exactly target sum?
Equal Partition: can we split array into two equal halves?`,
          },
          {
            heading: "Pattern 3: Longest Common Subsequence (LCS)",
            content: `LCS: Longest sequence present in BOTH strings (not necessarily contiguous).

STATE: dp[i][j] = LCS length of s1[0..i-1] and s2[0..j-1]
BASE CASE: dp[0][j] = dp[i][0] = 0 (empty string has LCS 0)
TRANSITION:
  If s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1] + 1 (chars match, extend LCS)
  Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1]) (skip one char from either)

BUILT ON LCS:
LCS → used to find Longest Common Substring, Edit Distance, Shortest Common Supersequence
Edit Distance → spell correction, DNA comparison
Shortest Common Supersequence → merge two sequences optimally

TIME: O(m×n), SPACE: O(m×n) → optimizable to O(min(m,n))`,
          },
          {
            heading: "Pattern 4: Longest Increasing Subsequence (LIS)",
            content: `LIS: Longest subsequence that is strictly increasing.

APPROACH 1 — DP: O(n²)
STATE: dp[i] = length of LIS ENDING at index i
TRANSITION: dp[i] = max(dp[j] + 1) for all j < i where arr[j] < arr[i]
BASE CASE: dp[i] = 1 (each element alone is LIS of length 1)
Answer: max(dp)

APPROACH 2 — Binary Search: O(n log n)
Maintain a "tails" array where tails[i] = smallest tail element of all IS of length i+1.
For each new element: binary search in tails to find where to insert/replace.

VARIANTS:
LIS → Patience sorting game, Russian Doll Envelopes
LDS (Longest Decreasing Subsequence) → reverse array, then LIS
LNDS (Longest Non-Decreasing) → change strict to non-strict`,
          },
          {
            heading: "Pattern 5: Coin Change — Unbounded Knapsack",
            content: `COIN CHANGE I (minimum coins):
STATE: dp[amount] = minimum coins to make 'amount'
BASE: dp[0] = 0
TRANSITION: dp[a] = min(dp[a-coin] + 1) for each coin
Answer: dp[target]

COIN CHANGE II (count ways):
STATE: dp[amount] = number of ways to make 'amount'
TRANSITION: dp[a] += dp[a-coin] for each coin
Key: iterate coins OUTER, amounts INNER (avoids counting permutations)

DIFFERENCE FROM SUBSET SUM:
Subset Sum: each number used ONCE (0/1 knapsack)
Coin Change: each coin used UNLIMITED times (unbounded knapsack)

PERMUTATIONS vs COMBINATIONS:
For combinations (sets): iterate coins outer, amounts inner
For permutations (order matters): iterate amounts outer, coins inner`,
          },
          {
            heading: "Pattern 6: Grid DP — 2D Paths",
            content: `STATE: dp[i][j] = answer for reaching/being at cell (i,j)
BASE: dp[0][0] = start value
TRANSITION: dp[i][j] = f(dp[i-1][j], dp[i][j-1]) — come from top or left

EXAMPLES:
Unique Paths: dp[i][j] = dp[i-1][j] + dp[i][j-1] (count paths)
Minimum Path Sum: dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
Maximal Square: dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1

SPACE OPTIMIZATION:
Grid DP typically uses O(m×n) space → reduce to O(n) by:
Only keeping the CURRENT ROW and using it to overwrite previous row
Direction of traversal matters!`,
          },
        ],
        code: `# Python — All 6 Intermediate DP Patterns

# ── Pattern 1: House Robber (1D DP) ──────────
def house_robber(nums):
    if not nums: return 0
    if len(nums) == 1: return nums[0]
    # dp[i] = max money from houses 0..i
    dp = [0] * len(nums)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    for i in range(2, len(nums)):
        # Either rob house i (+ best from 2 ago) or skip it
        dp[i] = max(dp[i-1], dp[i-2] + nums[i])
    return dp[-1]

# Space optimized:
def house_robber_opt(nums):
    prev2 = prev1 = 0
    for n in nums:
        curr = max(prev1, prev2 + n)
        prev2, prev1 = prev1, curr
    return prev1

# ── Pattern 2: 0/1 Knapsack ───────────────────
def knapsack_01(weights, values, capacity):
    n = len(weights)
    dp = [[0]*(capacity+1) for _ in range(n+1)]
    for i in range(1, n+1):
        for w in range(capacity+1):
            # Option 1: don't take item i
            dp[i][w] = dp[i-1][w]
            # Option 2: take item i (if it fits)
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w],
                    dp[i-1][w-weights[i-1]] + values[i-1])
    return dp[n][capacity]

# ── Pattern 3: LCS ────────────────────────────
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1   # chars match!
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]

print(lcs("ABCBDAB", "BDCAB"))   # 4 (BCAB)

# ── Pattern 4: LIS — O(n²) ───────────────────
def lis(nums):
    n = len(nums)
    dp = [1] * n                         # each element alone = LIS of 1
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:        # can extend sequence ending at j
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)

# LIS — O(n log n) with binary search:
from bisect import bisect_left
def lis_fast(nums):
    tails = []
    for x in nums:
        pos = bisect_left(tails, x)
        if pos == len(tails):
            tails.append(x)              # extend LIS
        else:
            tails[pos] = x               # replace to keep tails small
    return len(tails)

print(lis_fast([10,9,2,5,3,7,101,18]))  # 4 ([2,3,7,101])

# ── Pattern 5a: Coin Change (Min Coins) ───────
def coin_change_min(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount+1):
        for coin in coins:
            if coin <= a:
                dp[a] = min(dp[a], dp[a-coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

# ── Pattern 5b: Coin Change (Count Ways) ──────
def coin_change_ways(coins, amount):
    dp = [0] * (amount + 1)
    dp[0] = 1                            # 1 way to make 0 (use nothing)
    for coin in coins:                   # OUTER: coins (combinations not permutations)
        for a in range(coin, amount+1):  # INNER: amounts
            dp[a] += dp[a-coin]
    return dp[amount]

# ── Pattern 6: Grid — Minimum Path Sum ────────
def min_path_sum(grid):
    m, n = len(grid), len(grid[0])
    dp = [[0]*n for _ in range(m)]
    dp[0][0] = grid[0][0]
    for i in range(1, m): dp[i][0] = dp[i-1][0] + grid[i][0]
    for j in range(1, n): dp[0][j] = dp[0][j-1] + grid[0][j]
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
    return dp[m-1][n-1]`,
      },

      // ── ADVANCED ──
      {
        level: "Advanced",
        color: "bg-red-100 text-red-800",
        title: "Advanced DP — Interval, Bitmask, DP on Trees",
        sections: [
          {
            heading: "Interval DP — Optimal Substructure Over Ranges",
            content: `STATE: dp[i][j] = optimal answer for subproblem on range [i, j]
TRANSITION: Try all split points k in [i, j]:
  dp[i][j] = optimize over (dp[i][k] + dp[k+1][j] + cost(i,j,k))

BASE CASE: dp[i][i] = trivial case (single element)

ITERATION ORDER: Must process SHORTER intervals before LONGER ones
  for length in range(1, n+1):
      for i in range(n-length):
          j = i + length - 1
          ...

EXAMPLES:
Burst Balloons: dp[i][j] = max coins from bursting balloons i..j
Matrix Chain Multiplication: dp[i][j] = min operations to multiply matrices i..j
Palindrome Partitioning: dp[i][j] = min cuts to make all substrings palindromes
Stone Game: who wins if players optimally pick from ends?

TIME: O(n³) — n² states, n choices per state
SPACE: O(n²)`,
          },
          {
            heading: "Bitmask DP — Subset State Representation",
            content: `When n ≤ 20, represent which elements are "used" as a bitmask.
State: dp[mask][i] = answer when elements in 'mask' are used, last is i

EXAMPLES:
Traveling Salesman Problem (TSP):
  dp[mask][i] = min cost to visit all cities in mask, ending at i
  Transition: dp[mask|(1<<j)][j] = min(dp[mask][i] + cost[i][j])
  Time: O(2^n × n²)

Minimum XOR Sum (Assignment):
  dp[mask] = min cost to assign first popcount(mask) items from A to items in mask of B
  Time: O(2^n × n)

Hamiltonian Path: exists if dp[(1<<n)-1][v] ≠ inf for some v

BITMASK TRICKS:
Check if bit i set: mask & (1<<i)
Set bit i:         mask | (1<<i)
Clear bit i:       mask & ~(1<<i)
Count set bits:    bin(mask).count('1') or popcount
All n bits set:    (1<<n) - 1
Iterate subsets:   sub = mask; while sub: sub = (sub-1) & mask`,
          },
          {
            heading: "DP on Trees — Rerooting Technique",
            content: `When the DP depends on subtree computations:

STEP 1 — Root the tree at any node (e.g., node 0)
STEP 2 — DFS from root: compute dp[node] from dp[children]
STEP 3 — For some problems: re-root to compute answer for each node as root

STATE: dp[node] = answer for subtree rooted at node

EXAMPLES:
Tree Diameter: for each node, max(left_height + right_height)
Maximum Path Sum: dp[node] = max(0, dp[left] + dp[right]) + val[node]
Tree DP (Count Colorings): dp[node][color] = ways to color subtree
Min Vertex Cover: dp[node][0/1] = min cover when node is not/is covered

TRANSITION: Process children first (post-order DFS)
dp[node] = f(val[node], dp[child1], dp[child2], ...)`,
          },
          {
            heading: "DP Optimization Techniques",
            content: `SPACE OPTIMIZATION:
Rolling Array: If dp[i] only needs dp[i-1], use 2 rows instead of n.
1D from 2D: If only previous row needed, use single 1D array.
Caution: direction of traversal matters (left-to-right vs right-to-left)

KNUTH'S OPTIMIZATION:
For interval DP with convex/concave cost:
opt[i][j] ≤ opt[i][j+1] (optimal split point is monotone)
Reduces O(n³) to O(n²)

DIVIDE AND CONQUER OPTIMIZATION:
For DP where opt[i][j] is monotone in i:
Can split the DP into O(log n) layers
Each layer is O(n) → total O(n log n)

CONVEX HULL TRICK:
For DP of form: dp[i] = min(dp[j] + a[j]*b[i] + c[j])
Maintain convex hull of lines (CHT) → O(n) total instead of O(n²)
Used in: Slope DP, Optimal BST queries`,
          },
          {
            heading: "Recognizing DP vs Greedy",
            content: `GREEDY works when LOCAL optimal → GLOBAL optimal
DP is needed when LOCAL optimal does NOT guarantee GLOBAL optimal

TEST: Can you prove a greedy choice is always safe?

GREEDY (local choice works):
Activity Selection: always take earliest finishing activity
Coin Change with canonical coins (1,5,10,25): always take largest
Dijkstra: always expand the nearest unvisited node

DP NEEDED (greedy fails):
General Coin Change: [1,3,4] target 6 → greedy gives 4+1+1=3 coins, DP finds 3+3=2 coins
0/1 Knapsack: can't greedily pick highest value-to-weight ratio
Edit Distance: local substitution might not lead to global minimum

INTERVIEW TIP: If greedy seems obvious but you're unsure, try a counterexample.
If counterexample exists → need DP.`,
          },
        ],
        code: `# Advanced DP Patterns

# ── Interval DP: Burst Balloons ───────────────
def max_coins_balloons(nums):
    # Add boundary balloons with value 1
    nums = [1] + nums + [1]
    n = len(nums)
    dp = [[0]*n for _ in range(n)]
    
    # Process intervals of increasing length
    for length in range(2, n):        # length of interval
        for left in range(0, n-length):
            right = left + length
            for k in range(left+1, right):  # k is LAST balloon burst in [left,right]
                coins = nums[left] * nums[k] * nums[right]
                dp[left][right] = max(dp[left][right],
                    dp[left][k] + coins + dp[k][right])
    
    return dp[0][n-1]

# ── Bitmask DP: Minimum Cost to Connect Stickers ──
def min_sticker_cost(stickers, target):
    t = len(target)
    full = 1 << t
    dp = [float('inf')] * full
    dp[0] = 0
    
    for mask in range(full):
        if dp[mask] == float('inf'): continue
        # Find first uncovered character
        for i in range(t):
            if not (mask & (1 << i)):
                first_uncovered = target[i]
                break
        # Try each sticker that contains this character
        for sticker in stickers:
            if first_uncovered not in sticker: continue
            new_mask = mask
            s = list(sticker)
            for i in range(t):
                if target[i] in s:
                    new_mask |= (1 << i)
                    s.remove(target[i])
            dp[new_mask] = min(dp[new_mask], dp[mask] + 1)
    
    return dp[full-1] if dp[full-1] != float('inf') else -1

# ── Tree DP: Maximum Path Sum ─────────────────
def max_path_sum(root):
    best = [float('-inf')]
    def dfs(node):
        if not node: return 0
        left  = max(0, dfs(node.left))   # ignore negative paths
        right = max(0, dfs(node.right))
        best[0] = max(best[0], left + right + node.val)  # path through node
        return max(left, right) + node.val  # best path going up
    dfs(root)
    return best[0]

# ── DP with Binary Search: LIS O(n log n) ─────
from bisect import bisect_left
def lis_optimal(nums):
    tails = []  # tails[i] = smallest tail of IS with length i+1
    for x in nums:
        pos = bisect_left(tails, x)  # find leftmost position to replace
        if pos == len(tails):
            tails.append(x)   # new longest IS found
        else:
            tails[pos] = x    # replace to keep tails[pos] as small as possible
    return len(tails)

# ── Classic: Edit Distance ────────────────────
def edit_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = list(range(n+1))   # space-optimized: only 1D!
    for i in range(1, m+1):
        prev = dp[:]
        dp[0] = i
        for j in range(1, n+1):
            if word1[i-1] == word2[j-1]:
                dp[j] = prev[j-1]           # no operation needed
            else:
                dp[j] = 1 + min(prev[j],    # delete from word1
                                dp[j-1],     # insert into word1
                                prev[j-1])   # replace
    return dp[n]

print(edit_distance("horse", "ros"))   # 3

# ── Longest Palindromic Subsequence ───────────
def longest_palindromic_subseq(s):
    n = len(s)
    dp = [[0]*n for _ in range(n)]
    for i in range(n): dp[i][i] = 1  # single char = palindrome of length 1
    for length in range(2, n+1):
        for i in range(n-length+1):
            j = i + length - 1
            if s[i] == s[j]:
                dp[i][j] = dp[i+1][j-1] + 2
            else:
                dp[i][j] = max(dp[i+1][j], dp[i][j-1])
    return dp[0][n-1]`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LANGUAGES
  // ─────────────────────────────────────────────
  languages: [
    {
      lang: "Python",
      emoji: "🐍",
      color: "bg-blue-100 text-blue-800",
      syntax: `# Python — DP Complete Reference

from functools import lru_cache
import sys

# ── Method 1: lru_cache decorator ────────────
@lru_cache(maxsize=None)
def knapsack(i, w, weights, values):
    if i == 0 or w == 0: return 0
    if weights[i-1] > w:
        return knapsack(i-1, w, weights, values)
    return max(
        knapsack(i-1, w, weights, values),
        knapsack(i-1, w-weights[i-1], weights, values) + values[i-1]
    )
# Note: tuples needed for lru_cache (not lists)

# ── Method 2: Manual memo dict ────────────────
def lis_memo(nums, i=0, prev=-float('inf'), memo=None):
    if memo is None: memo = {}
    if i == len(nums): return 0
    if (i, prev) in memo: return memo[(i, prev)]
    # Option 1: skip nums[i]
    result = lis_memo(nums, i+1, prev, memo)
    # Option 2: take nums[i] if it extends sequence
    if nums[i] > prev:
        result = max(result, 1 + lis_memo(nums, i+1, nums[i], memo))
    memo[(i, prev)] = result
    return result

# ── Method 3: Tabulation (Bottom-Up) ──────────
def unique_paths(m, n):
    dp = [[1]*n for _ in range(m)]  # base: first row and col = 1
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    return dp[m-1][n-1]

# ── Method 4: Space-Optimized Tabulation ──────
def unique_paths_opt(m, n):
    dp = [1] * n          # represents current row
    for _ in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j-1]   # dp[j] = old dp[j] (from above) + dp[j-1] (from left)
    return dp[n-1]

# ── 2D DP: Longest Common Subsequence ─────────
def lcs_full(s1, s2):
    m, n = len(s1), len(s2)
    # Build table
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    # Reconstruct the actual LCS
    result = []
    i, j = m, n
    while i > 0 and j > 0:
        if s1[i-1] == s2[j-1]:
            result.append(s1[i-1])
            i -= 1; j -= 1
        elif dp[i-1][j] > dp[i][j-1]:
            i -= 1
        else:
            j -= 1
    return dp[m][n], ''.join(reversed(result))

length, seq = lcs_full("ABCBDAB", "BDCAB")
print(f"Length: {length}, Sequence: {seq}")  # 4, BCAB

# ── Subset Sum (Knapsack variant) ─────────────
def subset_sum(nums, target):
    dp = [False] * (target + 1)
    dp[0] = True     # empty subset sums to 0
    for num in nums:
        for t in range(target, num-1, -1):  # reverse! (0/1 knapsack)
            dp[t] = dp[t] or dp[t-num]
    return dp[target]

print(subset_sum([3, 34, 4, 12, 5, 2], 9))   # True (4+5 or 3+4+2)

# ── Partition Equal Subset Sum ─────────────────
def can_partition(nums):
    total = sum(nums)
    if total % 2 != 0: return False
    return subset_sum(nums, total // 2)

# ── Counting DP: Ways to make change ──────────
def coin_combinations(coins, amount):
    dp = [0] * (amount + 1)
    dp[0] = 1
    for coin in coins:          # outer loop = combinations (not permutations)
        for a in range(coin, amount+1):
            dp[a] += dp[a-coin]
    return dp[amount]

def coin_permutations(coins, amount):
    dp = [0] * (amount + 1)
    dp[0] = 1
    for a in range(1, amount+1):  # outer loop = permutations
        for coin in coins:
            if coin <= a:
                dp[a] += dp[a-coin]
    return dp[amount]`,
    },
    {
      lang: "JavaScript",
      emoji: "🟨",
      color: "bg-yellow-100 text-yellow-800",
      syntax: `// JavaScript — DP Complete Reference

// ── Memoization with Map ──────────────────────
function fib(n, memo = new Map()) {
    if (memo.has(n)) return memo.get(n);
    if (n <= 1) return n;
    const result = fib(n-1, memo) + fib(n-2, memo);
    memo.set(n, result);
    return result;
}

// ── Coin Change (Min Coins) ───────────────────
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let a = 1; a <= amount; a++) {
        for (const coin of coins) {
            if (coin <= a) {
                dp[a] = Math.min(dp[a], dp[a - coin] + 1);
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// ── LCS ───────────────────────────────────────
function longestCommonSubsequence(s1, s2) {
    const m = s1.length, n = s2.length;
    const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i-1] === s2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[m][n];
}

// ── House Robber ──────────────────────────────
function rob(nums) {
    let prev2 = 0, prev1 = 0;
    for (const n of nums) {
        [prev2, prev1] = [prev1, Math.max(prev1, prev2 + n)];
    }
    return prev1;
}

// ── 0/1 Knapsack ──────────────────────────────
function knapsack01(weights, values, capacity) {
    const n = weights.length;
    const dp = new Array(capacity + 1).fill(0);
    for (let i = 0; i < n; i++) {
        // Traverse right-to-left for 0/1 (each item used once)
        for (let w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    return dp[capacity];
}

// ── Edit Distance ─────────────────────────────
function editDistance(word1, word2) {
    const m = word1.length, n = word2.length;
    let dp = Array.from({length: n+1}, (_, i) => i);
    for (let i = 1; i <= m; i++) {
        const prev = [...dp];
        dp[0] = i;
        for (let j = 1; j <= n; j++) {
            if (word1[i-1] === word2[j-1]) {
                dp[j] = prev[j-1];
            } else {
                dp[j] = 1 + Math.min(prev[j], dp[j-1], prev[j-1]);
            }
        }
    }
    return dp[n];
}

// ── LIS (O(n log n)) ──────────────────────────
function lengthOfLIS(nums) {
    const tails = [];
    for (const x of nums) {
        let lo = 0, hi = tails.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (tails[mid] < x) lo = mid + 1;
            else hi = mid;
        }
        tails[lo] = x;
    }
    return tails.length;
}

// ── Unique Paths (Grid DP) ────────────────────
function uniquePaths(m, n) {
    const dp = new Array(n).fill(1);
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] += dp[j-1];
        }
    }
    return dp[n-1];
}`,
    },
    {
      lang: "Java",
      emoji: "☕",
      color: "bg-orange-100 text-orange-800",
      syntax: `// Java — DP Complete Reference
import java.util.*;

// ── Memoization (Top-Down) ────────────────────
Map<Integer, Integer> memo = new HashMap<>();

public int fib(int n) {
    if (memo.containsKey(n)) return memo.get(n);
    if (n <= 1) return n;
    int result = fib(n-1) + fib(n-2);
    memo.put(n, result);
    return result;
}

// ── Coin Change (Min Coins) ───────────────────
public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);   // fill with "infinity"
    dp[0] = 0;
    for (int a = 1; a <= amount; a++) {
        for (int coin : coins) {
            if (coin <= a) {
                dp[a] = Math.min(dp[a], dp[a - coin] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}

// ── LCS ───────────────────────────────────────
public int longestCommonSubsequence(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    int[][] dp = new int[m+1][n+1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1.charAt(i-1) == s2.charAt(j-1))
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}

// ── 0/1 Knapsack (Space Optimized) ────────────
public int knapsack(int[] weights, int[] values, int capacity) {
    int[] dp = new int[capacity + 1];
    for (int i = 0; i < weights.length; i++) {
        // Right to left prevents using item i twice
        for (int w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w-weights[i]] + values[i]);
        }
    }
    return dp[capacity];
}

// ── House Robber ──────────────────────────────
public int rob(int[] nums) {
    int prev2 = 0, prev1 = 0;
    for (int n : nums) {
        int curr = Math.max(prev1, prev2 + n);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// ── Edit Distance (Space Optimized) ───────────
public int minDistance(String w1, String w2) {
    int m = w1.length(), n = w2.length();
    int[] dp = new int[n+1];
    for (int j = 0; j <= n; j++) dp[j] = j;
    for (int i = 1; i <= m; i++) {
        int prev = dp[0];
        dp[0] = i;
        for (int j = 1; j <= n; j++) {
            int temp = dp[j];
            if (w1.charAt(i-1) == w2.charAt(j-1))
                dp[j] = prev;
            else
                dp[j] = 1 + Math.min(prev, Math.min(dp[j], dp[j-1]));
            prev = temp;
        }
    }
    return dp[n];
}

// ── LIS (O(n log n)) ──────────────────────────
public int lengthOfLIS(int[] nums) {
    List<Integer> tails = new ArrayList<>();
    for (int x : nums) {
        int pos = Collections.binarySearch(tails, x);
        if (pos < 0) pos = -(pos + 1);
        if (pos == tails.size()) tails.add(x);
        else tails.set(pos, x);
    }
    return tails.size();
}`,
    },
    {
      lang: "C++",
      emoji: "⚙️",
      color: "bg-purple-100 text-purple-800",
      syntax: `// C++ — DP Complete Reference
#include <vector>
#include <map>
#include <algorithm>
#include <numeric>
using namespace std;

// ── Memoization with unordered_map ────────────
unordered_map<int, int> memo;
int fib(int n) {
    if (memo.count(n)) return memo[n];
    if (n <= 1) return n;
    return memo[n] = fib(n-1) + fib(n-2);
}

// ── Coin Change (Min Coins) ───────────────────
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount+1, amount+1);
    dp[0] = 0;
    for (int a = 1; a <= amount; a++)
        for (int c : coins)
            if (c <= a)
                dp[a] = min(dp[a], dp[a-c]+1);
    return dp[amount] > amount ? -1 : dp[amount];
}

// ── LCS ───────────────────────────────────────
int lcs(string& s1, string& s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = (s1[i-1]==s2[j-1])
                ? dp[i-1][j-1]+1
                : max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
}

// ── 0/1 Knapsack (Space Optimized) ────────────
int knapsack01(vector<int>& wt, vector<int>& val, int W) {
    vector<int> dp(W+1, 0);
    for (int i = 0; i < wt.size(); i++)
        for (int w = W; w >= wt[i]; w--)   // reverse!
            dp[w] = max(dp[w], dp[w-wt[i]] + val[i]);
    return dp[W];
}

// ── House Robber ──────────────────────────────
int rob(vector<int>& nums) {
    int prev2 = 0, prev1 = 0;
    for (int n : nums) {
        int curr = max(prev1, prev2+n);
        prev2 = prev1; prev1 = curr;
    }
    return prev1;
}

// ── Edit Distance ─────────────────────────────
int minDistance(string w1, string w2) {
    int m=w1.size(), n=w2.size();
    vector<int> dp(n+1);
    iota(dp.begin(), dp.end(), 0);
    for (int i = 1; i <= m; i++) {
        int prev = dp[0]; dp[0] = i;
        for (int j = 1; j <= n; j++) {
            int temp = dp[j];
            if (w1[i-1]==w2[j-1]) dp[j]=prev;
            else dp[j]=1+min({prev,dp[j],dp[j-1]});
            prev=temp;
        }
    }
    return dp[n];
}

// ── LIS (O(n log n)) ──────────────────────────
int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}

// ── Subset Sum ────────────────────────────────
bool subsetSum(vector<int>& nums, int target) {
    vector<bool> dp(target+1, false);
    dp[0] = true;
    for (int num : nums)
        for (int t = target; t >= num; t--)   // reverse for 0/1
            dp[t] = dp[t] || dp[t-num];
    return dp[target];
}`,
    },
  ],

  // ─────────────────────────────────────────────
  // PATTERNS
  // ─────────────────────────────────────────────
  patterns: [
    {
      name: "0/1 Knapsack — Include or Exclude",
      emoji: "🎒",
      color: "bg-orange-50 border-orange-200",
      titleColor: "text-orange-800",
      when: "Each item used at most once, optimize under a constraint",
      avoid: "Unbounded use (use Coin Change pattern instead)",
      timeComplexity: "O(n × capacity)",
      spaceComplexity: "O(capacity) with 1D optimization",
      steps: [
        "State: dp[i][w] = max value with first i items, capacity w",
        "Transition: max(exclude item i, include item i if fits)",
        "Fill table left-to-right, row by row",
        "Space optimize: use 1D array, iterate BACKWARDS",
      ],
      template: `def knapsack_01(weights, values, capacity):
    n = len(weights)
    dp = [0] * (capacity + 1)
    for i in range(n):
        # Iterate BACKWARDS to avoid using item i twice
        for w in range(capacity, weights[i]-1, -1):
            dp[w] = max(dp[w],                         # exclude item i
                        dp[w-weights[i]] + values[i])  # include item i
    return dp[capacity]

# Pattern identification:
# "Select subset of items to maximize value under weight limit" → 0/1 Knapsack
# "Partition array into two equal subsets" → Subset Sum (Knapsack variant)
# "Count subsets with sum = target" → Counting Knapsack`,
    },
    {
      name: "Unbounded Knapsack — Reuse Items",
      emoji: "♻️",
      color: "bg-blue-50 border-blue-200",
      titleColor: "text-blue-800",
      when: "Items can be reused unlimited times (coins, rods, resources)",
      avoid: "When each item can only be used once (use 0/1 Knapsack)",
      timeComplexity: "O(n × amount)",
      spaceComplexity: "O(amount)",
      steps: [
        "State: dp[a] = min/max/count for amount a",
        "Transition: for each coin/item, dp[a] = optimize(dp[a-coin]+1)",
        "Iterate FORWARDS (allows reuse of same item)",
        "COMBINATIONS: iterate items outer, amounts inner",
      ],
      template: `def coin_change_min(coins, amount):   # Minimize coins
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for coin in coins:
            if coin <= a:
                dp[a] = min(dp[a], dp[a - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

def coin_combinations(coins, amount):  # Count combinations
    dp = [0] * (amount + 1)
    dp[0] = 1
    for coin in coins:         # OUTER = items (for combinations)
        for a in range(coin, amount + 1):  # FORWARD (reuse allowed)
            dp[a] += dp[a - coin]
    return dp[amount]`,
    },
    {
      name: "LCS / String DP — 2D Grid",
      emoji: "🔤",
      color: "bg-purple-50 border-purple-200",
      titleColor: "text-purple-800",
      when: "Compare two strings/sequences, find common patterns, align sequences",
      avoid: "When only one string involved (use 1D DP instead)",
      timeComplexity: "O(m × n)",
      spaceComplexity: "O(min(m,n)) with optimization",
      steps: [
        "State: dp[i][j] = answer for s1[:i] and s2[:j]",
        "If chars match: dp[i][j] = dp[i-1][j-1] + 1",
        "Else: dp[i][j] = max/min of dp[i-1][j], dp[i][j-1]",
        "Answer at dp[m][n]",
      ],
      template: `def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1   # chars match → extend
            else:
                dp[i][j] = max(dp[i-1][j],      # skip s1[i]
                               dp[i][j-1])       # skip s2[j]
    return dp[m][n]

# Built on LCS:
# Edit Distance: insert/delete/replace transitions
# Shortest Common Supersequence: m+n-lcs(s1,s2)
# Longest Palindromic Subsequence: lcs(s, reverse(s))`,
    },
    {
      name: "Kadane / 1D Sequence DP",
      emoji: "📈",
      color: "bg-green-50 border-green-200",
      titleColor: "text-green-800",
      when: "Optimize over contiguous subarrays or sequences",
      avoid: "When non-contiguous subsequences needed (use separate LIS/LCS)",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      steps: [
        "State: dp[i] = optimal answer for subarray/sequence ENDING at i",
        "Transition: dp[i] = f(arr[i], dp[i-1])",
        "Track global best separately",
        "Usually O(1) space since only dp[i-1] needed",
      ],
      template: `def max_subarray(nums):          # Kadane's Algorithm
    cur = best = nums[0]
    for x in nums[1:]:
        cur = max(x, cur + x)   # extend or restart
        best = max(best, cur)
    return best

def house_robber(nums):
    prev2, prev1 = 0, 0
    for n in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + n)
    return prev1

# Pattern: dp[i] = max/min value considering element i
# Decision: include arr[i] with previous, or start fresh at arr[i]`,
    },
  ],

  // ─────────────────────────────────────────────
  // PROBLEMS
  // ─────────────────────────────────────────────
  problems: [
    {
      name: "Climbing Stairs",
      difficulty: "Easy",
      companies: ["Amazon", "Google", "Microsoft", "Adobe", "Apple"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/climbing-stairs/", id: "#70" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/count-ways-reach-nth-stair/", id: "Practice" },
      ],
      statement: "You can climb 1 or 2 steps at a time. Count the distinct ways to climb n stairs.",
      example: "n=2 → 2 (1+1, 2) | n=3 → 3 (1+1+1, 1+2, 2+1) | n=5 → 8",
      constraints: ["1 ≤ n ≤ 45", "Exactly Fibonacci sequence!"],
      approaches: [
        {
          title: "Naive Recursion",
          emoji: "🐢",
          tag: "O(2^n)",
          complexity: "Time: O(2^n) | Space: O(n) stack",
          idea: "To reach stair n, come from n-1 (took 1 step) or n-2 (took 2 steps). Recursively count both.",
          when: "Never use. Shows why DP is needed.",
          code: `def climb_stairs(n):
    if n <= 2: return n
    return climb_stairs(n-1) + climb_stairs(n-2)
# Same as Fibonacci. O(2^n) — TLE for n>35`,
        },
        {
          title: "Memoization",
          emoji: "💾",
          tag: "O(n) time O(n) space",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "Cache results of subproblems. Each of n stairs computed exactly once.",
          when: "Good. Shows DP thinking.",
          code: `def climb_stairs(n, memo={}):
    if n in memo: return memo[n]
    if n <= 2: return n
    memo[n] = climb_stairs(n-1, memo) + climb_stairs(n-2, memo)
    return memo[n]`,
        },
        {
          title: "Tabulation",
          emoji: "📊",
          tag: "O(n) time O(n) space",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "Build from base: ways[1]=1, ways[2]=2. Each stair = sum of previous two.",
          when: "Classic bottom-up. Clean and clear.",
          code: `def climb_stairs(n):
    if n <= 2: return n
    dp = [0] * (n+1)
    dp[1] = 1; dp[2] = 2
    for i in range(3, n+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]`,
        },
        {
          title: "Space Optimized",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Only need previous 2 values. Use two variables instead of array.",
          when: "Best solution. O(1) space.",
          code: `def climb_stairs(n):
    if n <= 2: return n
    prev2, prev1 = 1, 2
    for _ in range(3, n+1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    return prev1`,
        },
      ],
      ai: {
        hints: ["To reach step n, where could you have been on step n-1?", "This is exactly Fibonacci — why?"],
        followUps: ["Jump Game", "Min Cost Climbing Stairs", "Decode Ways"],
        interviewQuestions: ["What if you can take 1, 2, or 3 steps?", "What if some steps are broken?"],
      },
    },
    {
      name: "House Robber",
      difficulty: "Medium",
      companies: ["Amazon", "Google", "LinkedIn", "Microsoft"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/house-robber/", id: "#198" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/find-maximum-possible-stolen-value-houses/", id: "Practice" },
      ],
      statement: "Rob houses in a row. Adjacent houses have alarm. Maximize money robbed.",
      example: "[1,2,3,1] → 4 (rob 1+3) | [2,7,9,3,1] → 12 (rob 2+9+1)",
      constraints: ["Cannot rob adjacent houses", "1 ≤ nums.length ≤ 100"],
      approaches: [
        {
          title: "Brute Force — All Subsets",
          emoji: "🐢",
          tag: "O(2^n)",
          complexity: "Time: O(2^n) | Space: O(n)",
          idea: "Try all valid subsets of non-adjacent houses. Return max.",
          when: "Never.",
          code: `def rob_brute(nums):
    n = len(nums)
    best = 0
    for mask in range(1 << n):
        valid = True; total = 0
        for i in range(n):
            if mask & (1<<i):
                if i > 0 and mask & (1<<(i-1)):
                    valid = False; break
                total += nums[i]
        if valid: best = max(best, total)
    return best`,
        },
        {
          title: "DP with Array",
          emoji: "📊",
          tag: "O(n) time O(n) space",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "dp[i] = max money from houses 0..i. Either rob house i (+ dp[i-2]) or skip it (dp[i-1]).",
          when: "Clean explanation of logic.",
          code: `def rob(nums):
    if not nums: return 0
    if len(nums) == 1: return nums[0]
    n = len(nums)
    dp = [0] * n
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    for i in range(2, n):
        dp[i] = max(dp[i-1],          # skip house i
                    dp[i-2] + nums[i]) # rob house i
    return dp[-1]`,
        },
        {
          title: "Space Optimized",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Only need dp[i-1] and dp[i-2]. Use two variables.",
          when: "Always. O(1) space.",
          code: `def rob(nums):
    prev2 = prev1 = 0
    for n in nums:
        curr = max(prev1,        # skip house
                   prev2 + n)    # rob house
        prev2, prev1 = prev1, curr
    return prev1`,
        },
      ],
      ai: {
        hints: ["For each house: rob it (add to 2-ago) or skip it (take best from previous)", "The decision is independent for each house"],
        followUps: ["House Robber II (circular)", "House Robber III (tree)", "Delete and Earn"],
        interviewQuestions: ["What if houses are in a circle?", "What if you must rob at least one house?"],
      },
    },
    {
      name: "Coin Change",
      difficulty: "Medium",
      companies: ["Amazon", "Google", "Facebook", "Microsoft", "Bloomberg"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/coin-change/", id: "#322" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/find-minimum-number-of-coins-that-make-a-change/", id: "Practice" },
      ],
      statement: "Given coin denominations and an amount, find minimum number of coins to make that amount.",
      example: "coins=[1,5,6,9], amount=11 → 2 (5+6) NOT 3 (1+1+9 or 1+4+... wait, let's use [1,2,5], amount=11 → 3 (5+5+1))",
      constraints: ["Coins can be reused unlimited times", "Return -1 if impossible"],
      approaches: [
        {
          title: "Greedy — FAILS for some inputs",
          emoji: "🚫",
          tag: "WRONG",
          complexity: "Time: O(amount) | Space: O(1)",
          idea: "Always take the largest coin that fits. FAILS: coins=[1,3,4], target=6 → greedy gives 4+1+1=3 but optimal is 3+3=2.",
          when: "NEVER. Greedy fails for general coin change. Always use DP.",
          code: `# ⚠️ WRONG for general case!
def coin_change_greedy(coins, amount):
    coins.sort(reverse=True)
    count = 0
    for coin in coins:
        while amount >= coin:
            amount -= coin
            count += 1
    return count if amount == 0 else -1
# FAILS: coins=[1,3,4], amount=6 → gives 3 (4+1+1), but DP gives 2 (3+3)`,
        },
        {
          title: "Top-Down DP",
          emoji: "💾",
          tag: "O(n×amount)",
          complexity: "Time: O(amount × |coins|) | Space: O(amount)",
          idea: "Recursively try each coin. Cache results.",
          when: "Good for understanding recursive structure.",
          code: `def coin_change(coins, amount):
    from functools import lru_cache
    @lru_cache(maxsize=None)
    def dp(rem):
        if rem == 0: return 0
        if rem < 0: return float('inf')
        return 1 + min(dp(rem - coin) for coin in coins)
    result = dp(amount)
    return result if result != float('inf') else -1`,
        },
        {
          title: "Bottom-Up DP",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(amount × |coins|) | Space: O(amount)",
          idea: "Build dp[0..amount]. dp[a] = min coins to make amount a. Try each coin: dp[a] = min(dp[a], dp[a-coin]+1).",
          when: "Always. Clean, no recursion.",
          code: `def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0          # 0 coins needed to make amount 0
    
    for a in range(1, amount + 1):
        for coin in coins:
            if coin <= a:
                dp[a] = min(dp[a], dp[a-coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1

# Trace coins=[1,2,5], amount=5:
# dp[0]=0, dp[1]=1, dp[2]=1, dp[3]=2, dp[4]=2, dp[5]=1
# dp[5]: try coin=5 → dp[0]+1=1  ← minimum!`,
        },
      ],
      ai: {
        hints: ["Why does greedy fail here?", "What's the minimum coins for amount 0?"],
        followUps: ["Coin Change II (count ways)", "Perfect Squares", "Minimum Cost Climbing Stairs"],
        interviewQuestions: ["What if each coin can only be used once?", "What changes for count vs minimum?"],
      },
    },
    {
      name: "Longest Common Subsequence",
      difficulty: "Medium",
      companies: ["Google", "Amazon", "Facebook", "Microsoft", "Adobe"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/longest-common-subsequence/", id: "#1143" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/", id: "Practice" },
      ],
      statement: "Find the length of the longest subsequence present in both strings.",
      example: 'text1="abcde", text2="ace" → 3 ("ace") | "abc","abc" → 3 | "abc","def" → 0',
      constraints: ["Subsequence: characters need not be contiguous", "O(m×n) time expected"],
      approaches: [
        {
          title: "Recursion",
          emoji: "🐢",
          tag: "O(2^(m+n))",
          complexity: "Time: O(2^(m+n)) | Space: O(m+n)",
          idea: "If last chars match: lcs(m-1,n-1)+1. Else: max(lcs(m-1,n), lcs(m,n-1)).",
          when: "Never. Shows the subproblem structure.",
          code: `def lcs(s1, s2, m=None, n=None):
    if m is None: m, n = len(s1), len(s2)
    if m == 0 or n == 0: return 0
    if s1[m-1] == s2[n-1]:
        return 1 + lcs(s1, s2, m-1, n-1)
    return max(lcs(s1, s2, m-1, n), lcs(s1, s2, m, n-1))`,
        },
        {
          title: "2D DP Tabulation",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(m×n) | Space: O(m×n)",
          idea: "Build m×n table. dp[i][j] = LCS of s1[:i] and s2[:j]. Answer at dp[m][n].",
          when: "Standard solution. Clean and correct.",
          code: `def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    
    for i in range(1, m+1):
        for j in range(1, n+1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1  # chars match!
            else:
                dp[i][j] = max(dp[i-1][j],    # skip text1[i]
                               dp[i][j-1])     # skip text2[j]
    
    return dp[m][n]`,
        },
        {
          title: "Space Optimized (1D)",
          emoji: "✨",
          tag: "O(min(m,n)) space",
          complexity: "Time: O(m×n) | Space: O(min(m,n))",
          idea: "Only need current and previous row. Use two 1D arrays.",
          when: "When memory is a concern. Same time complexity.",
          code: `def lcs_space_opt(text1, text2):
    if len(text1) < len(text2):
        text1, text2 = text2, text1    # shorter string = columns
    m, n = len(text1), len(text2)
    prev = [0] * (n + 1)
    curr = [0] * (n + 1)
    for i in range(1, m+1):
        for j in range(1, n+1):
            if text1[i-1] == text2[j-1]:
                curr[j] = prev[j-1] + 1
            else:
                curr[j] = max(prev[j], curr[j-1])
        prev, curr = curr, [0]*(n+1)
    return prev[n]`,
        },
      ],
      ai: {
        hints: ["What are the subproblems? What does dp[i][j] represent?", "When last characters match, what can you conclude?"],
        followUps: ["Edit Distance", "Shortest Common Supersequence", "Longest Palindromic Subsequence", "Delete Operation for Two Strings"],
        interviewQuestions: ["How is LCS different from LCS (substring)?", "How do you reconstruct the actual LCS string?"],
      },
    },
    {
      name: "0/1 Knapsack",
      difficulty: "Medium",
      companies: ["Amazon", "Google", "Microsoft", "Adobe", "Goldman Sachs"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/ones-and-zeroes/", id: "#474 (variant)" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/", id: "Practice" },
      ],
      statement: "Given items with weights and values, and a bag with capacity W, maximize total value without exceeding capacity. Each item used at most once.",
      example: "weights=[1,3,4,5], values=[1,4,5,7], W=7 → 9 (take items with weight 3,4 → value 4+5=9)",
      constraints: ["Each item used at most ONCE", "Cannot exceed total weight W"],
      approaches: [
        {
          title: "Recursive Brute Force",
          emoji: "🐢",
          tag: "O(2^n)",
          complexity: "Time: O(2^n) | Space: O(n)",
          idea: "For each item: include it or exclude it. 2 choices per item → 2^n combinations.",
          when: "Never. Shows exponential nature without DP.",
          code: `def knapsack_brute(weights, values, capacity, n=None):
    if n is None: n = len(weights)
    if n == 0 or capacity == 0: return 0
    if weights[n-1] > capacity:              # item too heavy
        return knapsack_brute(weights, values, capacity, n-1)
    return max(
        knapsack_brute(weights, values, capacity, n-1),    # exclude
        values[n-1] + knapsack_brute(weights, values,      # include
                                     capacity-weights[n-1], n-1)
    )`,
        },
        {
          title: "2D DP Table",
          emoji: "📊",
          tag: "O(n×W) time O(n×W) space",
          complexity: "Time: O(n×W) | Space: O(n×W)",
          idea: "dp[i][w] = max value using first i items with capacity w. Fill row by row.",
          when: "Classic. Good for explanation.",
          code: `def knapsack_dp(weights, values, capacity):
    n = len(weights)
    dp = [[0]*(capacity+1) for _ in range(n+1)]
    
    for i in range(1, n+1):
        for w in range(capacity+1):
            # Exclude item i
            dp[i][w] = dp[i-1][w]
            # Include item i (if it fits)
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w],
                    dp[i-1][w-weights[i-1]] + values[i-1])
    
    return dp[n][capacity]`,
        },
        {
          title: "1D Space Optimized",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n×W) | Space: O(W)",
          idea: "Use single 1D array. MUST iterate capacity BACKWARDS to avoid using item twice (ensures each item used at most once).",
          when: "Always in interviews. Shows space optimization mastery.",
          code: `def knapsack_01(weights, values, capacity):
    dp = [0] * (capacity + 1)
    
    for i in range(len(weights)):
        # REVERSE iteration: prevents using item i more than once
        for w in range(capacity, weights[i]-1, -1):
            dp[w] = max(dp[w],
                        dp[w-weights[i]] + values[i])
    
    return dp[capacity]

# WHY reverse?
# If forward: dp[w] might use updated dp[w-weight[i]] (already counted item i)
# If reverse: dp[w-weight[i]] is still from previous item row → correct!

# Contrast with Unbounded Knapsack (forward iteration):
def knapsack_unbounded(weights, values, capacity):
    dp = [0] * (capacity + 1)
    for i in range(len(weights)):
        for w in range(weights[i], capacity+1):  # FORWARD!
            dp[w] = max(dp[w], dp[w-weights[i]] + values[i])
    return dp[capacity]`,
        },
      ],
      ai: {
        hints: ["For each item: what are your only two choices?", "Why must we iterate capacity backwards in the 1D version?"],
        followUps: ["Partition Equal Subset Sum", "Target Sum", "Last Stone Weight II", "Ones and Zeroes"],
        interviewQuestions: ["What changes for unbounded knapsack?", "How do you reconstruct which items were taken?"],
      },
    },
    {
      name: "Longest Increasing Subsequence",
      difficulty: "Medium",
      companies: ["Microsoft", "Amazon", "Google", "Bloomberg", "Uber"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/longest-increasing-subsequence/", id: "#300" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/", id: "Practice" },
      ],
      statement: "Find the length of the longest strictly increasing subsequence.",
      example: "[10,9,2,5,3,7,101,18] → 4 ([2,3,7,101]) | [0,1,0,3,2,3] → 4",
      constraints: ["Subsequence need not be contiguous", "O(n log n) preferred"],
      approaches: [
        {
          title: "DP — O(n²)",
          emoji: "📊",
          tag: "O(n²)",
          complexity: "Time: O(n²) | Space: O(n)",
          idea: "dp[i] = LIS length ending at index i. For each i, check all j<i where arr[j]<arr[i].",
          when: "Good starting point. Clear logic.",
          code: `def length_of_lis(nums):
    n = len(nums)
    dp = [1] * n               # each element is LIS of length 1 alone
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:   # can extend sequence ending at j
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)`,
        },
        {
          title: "Binary Search — O(n log n)",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n log n) | Space: O(n)",
          idea: "Maintain 'tails' array: tails[i] = smallest ending element of all IS with length i+1. For each new element: binary search where to insert/replace in tails.",
          when: "Best time complexity. Know this for interviews.",
          code: `from bisect import bisect_left

def length_of_lis(nums):
    tails = []    # tails[i] = smallest tail of IS with length i+1
    
    for x in nums:
        pos = bisect_left(tails, x)    # find leftmost position for x
        if pos == len(tails):
            tails.append(x)            # x extends the longest IS
        else:
            tails[pos] = x             # replace with smaller tail
    
    return len(tails)

# Trace [10,9,2,5,3,7,101,18]:
# x=10: tails=[10]
# x=9:  tails=[9]      (replace 10 with 9)
# x=2:  tails=[2]      (replace 9 with 2)
# x=5:  tails=[2,5]    (extend)
# x=3:  tails=[2,3]    (replace 5 with 3)
# x=7:  tails=[2,3,7]  (extend)
# x=101:tails=[2,3,7,101] (extend)
# x=18: tails=[2,3,7,18]  (replace 101 with 18)
# Length = 4 ✅

# NOTE: tails is NOT the actual LIS! It just gives the correct LENGTH.
# To find actual LIS, use parent tracking in the O(n²) approach.`,
        },
      ],
      ai: {
        hints: ["What does dp[i] represent?", "Why does the greedy binary search approach give correct length?"],
        followUps: ["Russian Doll Envelopes", "Maximum Length of Pair Chain", "Number of LIS"],
        interviewQuestions: ["Can you find the actual subsequence?", "How to handle non-strictly increasing?"],
      },
    },
    {
      name: "Edit Distance",
      difficulty: "Hard",
      companies: ["Google", "Amazon", "Facebook", "Microsoft", "Twitter"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/edit-distance/", id: "#72" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/edit-distance-dp-5/", id: "Practice" },
      ],
      statement: "Find minimum operations (insert, delete, replace) to convert word1 to word2.",
      example: '"horse" → "ros" → 3 (replace h→r, delete r, delete e) | "intention"→"execution" → 5',
      constraints: ["3 operations: insert, delete, replace", "O(m×n) time expected"],
      approaches: [
        {
          title: "Recursive Brute Force",
          emoji: "🐢",
          tag: "O(3^(m+n))",
          complexity: "Time: O(3^(m+n)) | Space: O(m+n)",
          idea: "At each position: if chars match, advance both. Else try insert, delete, replace — take minimum.",
          when: "Shows the recursive structure. Never use directly.",
          code: `def edit_dist(w1, w2, i=None, j=None):
    if i is None: i, j = len(w1), len(w2)
    if i == 0: return j      # insert j chars
    if j == 0: return i      # delete i chars
    if w1[i-1] == w2[j-1]:
        return edit_dist(w1, w2, i-1, j-1)   # chars match, no op
    return 1 + min(
        edit_dist(w1, w2, i, j-1),    # insert  into w1
        edit_dist(w1, w2, i-1, j),    # delete  from w1
        edit_dist(w1, w2, i-1, j-1)   # replace in w1
    )`,
        },
        {
          title: "2D DP",
          emoji: "📊",
          tag: "O(mn) time O(mn) space",
          complexity: "Time: O(m×n) | Space: O(m×n)",
          idea: "dp[i][j] = min operations to convert w1[:i] to w2[:j]. Build from base cases.",
          when: "Standard interview answer.",
          code: `def min_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    
    # Base cases
    for i in range(m+1): dp[i][0] = i    # delete all from word1
    for j in range(n+1): dp[0][j] = j    # insert all of word2
    
    for i in range(1, m+1):
        for j in range(1, n+1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]       # no operation
            else:
                dp[i][j] = 1 + min(
                    dp[i][j-1],    # insert
                    dp[i-1][j],    # delete
                    dp[i-1][j-1]   # replace
                )
    return dp[m][n]`,
        },
        {
          title: "Space Optimized (2 rows)",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(m×n) | Space: O(n)",
          idea: "Only need previous row to compute current. Use two 1D arrays and swap.",
          when: "Best space. Shows DP optimization skill.",
          code: `def min_distance(word1, word2):
    m, n = len(word1), len(word2)
    # Use only 1D array
    dp = list(range(n+1))     # dp[j] = edit_dist(0, j)
    
    for i in range(1, m+1):
        prev = dp[0]           # dp[i-1][j-1]
        dp[0] = i              # edit_dist(i, 0) = i
        for j in range(1, n+1):
            temp = dp[j]       # save dp[i-1][j] before overwriting
            if word1[i-1] == word2[j-1]:
                dp[j] = prev
            else:
                dp[j] = 1 + min(dp[j],    # delete (was dp[i-1][j])
                                dp[j-1],   # insert
                                prev)      # replace (was dp[i-1][j-1])
            prev = temp        # update prev for next iteration
    return dp[n]`,
        },
      ],
      ai: {
        hints: ["What are the three operations? How does each change (i,j)?", "What does dp[i][j]=0 mean when i==0?"],
        followUps: ["Delete Operation for Two Strings", "Minimum ASCII Delete Sum", "Shortest Common Supersequence"],
        interviewQuestions: ["Reconstruct the sequence of operations?", "What if replace has different cost than insert/delete?"],
      },
    },
    {
      name: "Burst Balloons",
      difficulty: "Hard",
      companies: ["Google", "Amazon", "Facebook"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/burst-balloons/", id: "#312" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/burst-balloon-to-maximize-coins/", id: "Practice" },
      ],
      statement: "Burst balloons in best order to maximize coins. Coins for bursting i = nums[left]*nums[i]*nums[right].",
      example: "[3,1,5,8] → 167 (burst 1→3×1×5=15, burst 5→3×5×8=120, burst 3→1×3×8=24, burst 8→1×8×1=8: 15+120+24+8=167)",
      constraints: ["Add boundary balloons with value 1", "Interval DP — think LAST balloon burst, not first"],
      approaches: [
        {
          title: "Brute Force — All Permutations",
          emoji: "🐢",
          tag: "O(n!)",
          complexity: "Time: O(n!) | Space: O(n)",
          idea: "Try all orders of bursting. Take maximum.",
          when: "Never. Just for understanding.",
          code: `def max_coins_brute(nums):
    from itertools import permutations
    nums = [1] + nums + [1]
    best = 0
    for perm in permutations(range(1, len(nums)-1)):
        coins = 0; remaining = list(nums)
        for i in perm:
            # Find i's current neighbors
            # ... complex tracking needed
        best = max(best, coins)
    return best`,
        },
        {
          title: "Interval DP — Think LAST Not FIRST",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n³) | Space: O(n²)",
          idea: `KEY INSIGHT: Instead of asking "which balloon to burst FIRST?", ask "which balloon to burst LAST in this range?"

When balloon k is burst LAST in range [left, right]:
- All other balloons in [left, right] are already gone
- The neighbors of k are exactly nums[left-1] and nums[right+1]
- Coins = nums[left-1] × nums[k] × nums[right+1]
- dp[left][right] = max over k of (dp[left][k-1] + coins + dp[k+1][right])

Add boundary 1s to handle edge cases cleanly.`,
          when: "Classic hard DP. The insight about LAST balloon is key.",
          code: `def max_coins(nums):
    nums = [1] + nums + [1]    # add boundary balloons
    n = len(nums)
    dp = [[0]*n for _ in range(n)]
    
    # Process intervals of increasing length
    for length in range(2, n):          # interval length
        for left in range(0, n-length):
            right = left + length
            # Try each k as the LAST balloon burst in (left, right)
            for k in range(left+1, right):
                coins = nums[left] * nums[k] * nums[right]
                dp[left][right] = max(dp[left][right],
                    dp[left][k] + coins + dp[k][right])
    
    return dp[0][n-1]

# WHY "last balloon" insight works:
# When k is the last in [left,right], its neighbors are the BOUNDARIES
# not other balloons (they're all already gone).
# This gives clean independent subproblems: left half and right half.`,
        },
      ],
      ai: {
        hints: ["Why think about the LAST balloon burst instead of first?", "When the last balloon is burst, what are its neighbors?"],
        followUps: ["Strange Printer", "Remove Boxes", "Zuma Game"],
        interviewQuestions: ["Why does thinking first-to-burst not work cleanly?", "What makes this interval DP?"],
      },
    },
  ],

  // ─────────────────────────────────────────────
  // INTERVIEW TIPS
  // ─────────────────────────────────────────────
  interviewTips: [
    "ALWAYS start with brute force recursion — it shows you understand the problem structure",
    "Identify overlapping subproblems by drawing the recursion tree — if branches repeat, use DP",
    "State definition is the hardest part — spend 2-3 minutes carefully defining dp[i] or dp[i][j]",
    "Transition relation: ask 'what are ALL ways to reach state X?' — don't miss any",
    "Base cases: what happens when input is empty/zero? Usually trivial",
    "For 1D array optimization: if dp[i] only needs dp[i-1] → use two variables",
    "0/1 Knapsack optimization: iterate capacity BACKWARDS in 1D version — critical!",
    "Unbounded Knapsack (Coin Change): iterate capacity FORWARDS — allows reuse",
    "When in doubt: recursion + memoization (top-down) is safer to code correctly than tabulation",
    "Always mention: Time = O(states × work per state), Space = O(states) or O(optimized)",
    "Mention space optimization even if not asked — shows depth of understanding",
    "DP vs Greedy: if greedy fails on a counterexample → need DP",
  ],

  // ─────────────────────────────────────────────
  // COMMON MISTAKES
  // ─────────────────────────────────────────────
  mistakes: [
    "Wrong direction in 1D knapsack: iterating FORWARD instead of BACKWARD → items used multiple times",
    "Off-by-one in DP table size: array should be [n+1][m+1] to handle empty prefix",
    "Not initializing base cases: dp[0][j] and dp[i][0] often need explicit initialization",
    "Confusing subsequence (non-contiguous) with substring (contiguous) — different DP structure",
    "Coin Change: swapping inner/outer loops changes combinations vs permutations",
    "Greedy for coin change with non-standard denominations — always use DP",
    "Forgetting to handle impossible case: return -1 if dp[target] still infinity",
    "LIS O(n log n): tails array doesn't contain the actual LIS — only gives length",
    "Edit Distance base case: dp[0][j]=j and dp[i][0]=i — easy to forget",
    "Interval DP iteration order: must process shorter intervals BEFORE longer ones",
  ],

  // ─────────────────────────────────────────────
  // QUIZ
  // ─────────────────────────────────────────────
  quiz: [
    {
      q: "What are the TWO required properties for Dynamic Programming to apply?",
      options: [
        "Sorted input and monotone function",
        "Optimal substructure and overlapping subproblems",
        "Greedy choice and local optimum",
        "Binary search space and monotone check",
      ],
      answer: 1,
      explanation: "DP requires: (1) Optimal Substructure — optimal solution contains optimal subsolutions, and (2) Overlapping Subproblems — same subproblems are solved repeatedly in naive recursion. Both must be present. If subproblems don't overlap, divide-and-conquer (not DP) is used.",
    },
    {
      q: "In 0/1 Knapsack with 1D DP, why must you iterate the capacity in REVERSE?",
      options: [
        "It's just a convention",
        "Forward iteration gives wrong result",
        "Reverse ensures each item is counted at most once",
        "Reverse is faster",
      ],
      answer: 2,
      explanation: "Forward iteration: when computing dp[w], dp[w-weight] might already include the current item (updated earlier in the same loop). This would count item multiple times. Reverse iteration: dp[w-weight] is still from the PREVIOUS item's row, so each item is used at most once.",
    },
    {
      q: "For Coin Change (count combinations), which is correct?",
      options: [
        "Iterate amounts outer, coins inner",
        "Iterate coins outer, amounts inner",
        "Either order gives the same answer",
        "Use 2D DP only",
      ],
      answer: 1,
      explanation: "Iterating COINS outer and AMOUNTS inner gives COMBINATIONS (sets). This avoids counting [1,2] and [2,1] as different — once coin 2 is processed, we never re-process coin 1. Iterating amounts outer and coins inner gives PERMUTATIONS (ordered sequences), where [1,2] and [2,1] are counted separately.",
    },
    {
      q: "LIS using binary search: what does the 'tails' array represent?",
      options: [
        "The actual longest increasing subsequence",
        "The indices of elements in LIS",
        "tails[i] = smallest ending element of all IS with length i+1",
        "A sorted copy of the input",
      ],
      answer: 2,
      explanation: "tails[i] stores the smallest possible tail element for all increasing subsequences of length i+1. It's NOT the actual LIS! It's a maintenance structure that allows O(log n) per element via binary search. The length of tails at the end equals the LIS length.",
    },
    {
      q: "Coin Change minimum: coins=[1,3,4], amount=6. What's the minimum coins?",
      options: ["3 (greedy: 4+1+1)", "2 (DP: 3+3)", "1", "4"],
      answer: 1,
      explanation: "Greedy gives 4+1+1=3 coins (wrong!). DP correctly finds 3+3=2 coins. This is THE classic example why greedy fails for general coin change. dp[6]: try coin=1→dp[5]+1=4, coin=3→dp[3]+1=2, coin=4→dp[2]+1=3. Min=2. Always use DP for coin change!",
    },
    {
      q: "In Burst Balloons interval DP, why think about the LAST balloon to burst?",
      options: [
        "It's easier to code",
        "When last balloon in [left,right] is burst, its neighbors are the boundaries — giving clean independent subproblems",
        "Last balloon gives maximum coins",
        "It avoids recursion",
      ],
      answer: 1,
      explanation: "When thinking about the FIRST balloon burst in a range, its neighbors change unpredictably as other balloons burst. But when thinking about the LAST balloon k in range (left, right): all other balloons are gone, so its neighbors are exactly nums[left-1] and nums[right+1]. This gives perfectly independent subproblems: dp[left][k] and dp[k][right].",
    },
    {
      q: "LCS time complexity for strings of length m and n:",
      options: ["O(m+n)", "O(m×n)", "O(m²+n²)", "O(2^(m+n))"],
      answer: 1,
      explanation: "LCS has m×n states (dp[i][j] for i=0..m, j=0..n). Each state takes O(1) to compute. Total: O(m×n). Space is also O(m×n) for the full table, but can be optimized to O(min(m,n)) using rolling arrays.",
    },
  ],

  practice_links: [
    { platform: "LeetCode DP", url: "https://leetcode.com/tag/dynamic-programming/", color: "bg-orange-500", problems: "500+ problems", recommended: true },
    { platform: "Striver's DP Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", color: "bg-indigo-600", problems: "50 curated DP problems", recommended: true },
    { platform: "Aditya Verma DP Playlist", url: "https://www.youtube.com/playlist?list=PL_z_8CaSLPWekqhdCPmFohncHwz8TY2Go", color: "bg-red-600", problems: "Best DP YouTube series" },
    { platform: "NeetCode DP", url: "https://neetcode.io/roadmap", color: "bg-violet-600", problems: "Curated 20 must-do DP" },
    { platform: "GFG Dynamic Programming", url: "https://www.geeksforgeeks.org/dynamic-programming/", color: "bg-green-600", problems: "Theory + Practice" },
    { platform: "AtCoder DP Contest", url: "https://atcoder.jp/contests/dp/tasks", color: "bg-blue-600", problems: "26 classic DP problems" },
    { platform: "CSES DP Problems", url: "https://cses.fi/problemset/", color: "bg-teal-600", problems: "Competitive DP problems" },
  ],
};

export default dp;
