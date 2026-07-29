const binarySearch = {
  name: "Binary Search",
  emoji: "🔍",
  color: "bg-violet-500",
  light: "bg-violet-50",
  border: "border-violet-200",
  text: "text-violet-700",
  total: 25,

definition: {
  short:
    "Binary Search is a divide-and-conquer searching algorithm that repeatedly halves the search space to find a target efficiently. It works only when the data is sorted or when the search space is monotonic.",

  analogy:
    "Imagine searching for a word in a dictionary. Instead of reading every page one by one, you open the middle page, decide whether the word comes before or after it, discard half the book, and repeat. This is exactly how Binary Search works.",

  properties: [
    "Works only on sorted or monotonic data",
    "Eliminates half of the search space every iteration",
    "Uses Divide and Conquer strategy",
    "Time complexity is logarithmic O(log n)",
    "Can be implemented iteratively or recursively",
    "Foundation for Lower Bound and Upper Bound algorithms",
    "Used in searching, optimization, and answer-space problems",
    "One of the most frequently asked interview algorithms"
  ],

  complexity: [
    { op: "Best Case", time: "O(1)", space: "O(1)" },
    { op: "Average Case", time: "O(log n)", space: "O(1)" },
    { op: "Worst Case", time: "O(log n)", space: "O(1)" },
    { op: "Recursive Binary Search", time: "O(log n)", space: "O(log n)" },
    { op: "Lower Bound", time: "O(log n)", space: "O(1)" },
    { op: "Upper Bound", time: "O(log n)", space: "O(1)" },
    { op: "Search on Answer", time: "O(log Range)", space: "O(1)" },
    { op: "Rotated Array Search", time: "O(log n)", space: "O(1)" }
  ]
},

properties: [
  "Requires sorted or monotonic input",
  "Reduces search space by half each step",
  "Very efficient for large datasets",
  "Uses Divide and Conquer",
  "Can solve optimization problems",
  "Supports Lower and Upper Bound searches",
  "Can be implemented iteratively or recursively",
  "Frequently asked in coding interviews"
],

complexity: {
  best: "O(1)",
  average: "O(log n)",
  worst: "O(log n)",
  space: "O(1)"
},

  learningObjectives: [
    "Understand WHY binary search works and the exact conditions required",
    "Master the universal binary search template that handles all edge cases",
    "Learn all 6 variants: exact match, lower bound, upper bound, rotated, on answer, on function",
    "Recognize hidden binary search in problems that don't look like search problems",
    "Solve 25+ real interview problems from Easy to Hard with proven optimal solutions",
  ],

  prerequisites: [
    "Arrays and indexing",
    "Sorting basics",
    "Loops and conditionals",
    "Logarithms (conceptual)",
  ],

  whyLearn: {
    importance: "Binary search is the most elegant algorithm in computer science. It reduces O(n) linear search to O(log n) by eliminating HALF the search space each step. For n=1,000,000: linear needs 1,000,000 steps — binary needs just 20. It appears in 40%+ of hard interview problems disguised as optimization problems.",
    useCases: [
      "Dictionary lookup — find word in O(log n) instead of O(n)",
      "Database indexing — B-trees use binary search principles",
      "Git bisect — find which commit introduced a bug in O(log n) commits",
      "Machine learning — binary search on hyperparameters",
      "Competitive programming — 'minimum maximum' or 'maximum minimum' problems",
      "System design — consistent hashing uses binary search",
      "Square root, cube root — computed via binary search on answer",
    ],
  },

  // ─────────────────────────────────────────────
  // COMPLETE CONCEPT
  // ─────────────────────────────────────────────
  concept: {
    intro: `Binary Search is a divide-and-conquer search algorithm that works on SORTED (or monotonic) data.
The core idea: at each step, compare the target with the MIDDLE element.
Eliminate HALF the remaining search space based on the comparison.
Repeat until found or space is empty.

This gives O(log n) time — the most dramatic speedup possible for search.`,

    howItWorks: `VISUAL EXAMPLE: Find 23 in [1, 3, 5, 7, 9, 11, 15, 19, 23, 27, 31]
                                   ↑                    ↑                    ↑
                                 lo=0                mid=5                hi=10

Step 1: mid = (0+10)//2 = 5 → arr[5] = 11
        11 < 23 → target is in RIGHT half → lo = mid+1 = 6

        [1, 3, 5, 7, 9, 11, 15, 19, 23, 27, 31]
                               ↑         ↑    ↑
                             lo=6      mid=8  hi=10

Step 2: mid = (6+10)//2 = 8 → arr[8] = 23
        23 == 23 → FOUND at index 8! ✅

Result: found in 2 steps instead of scanning all 11 elements!

KEY OBSERVATION: Each step HALVES the remaining candidates.
n → n/2 → n/4 → n/8 → ... → 1
Number of steps = log₂(n)`,

    goldenRule: `THE GOLDEN RULE OF BINARY SEARCH:
"Maintain the INVARIANT that the answer always lies within [lo, hi]"

As long as you never discard the answer from your search space,
binary search is GUARANTEED to find it.

WHEN DOES BINARY SEARCH APPLY?
1. The data is sorted (or monotonic — values only go up or down)
2. OR you can check: "is a given value valid/feasible?" in O(1) or O(n)
   → Then binary search on the ANSWER space

MONOTONIC FUNCTION:
f(x) is monotonically increasing if: x1 < x2 → f(x1) ≤ f(x2)
Example: "Can I finish in time with speed x?" — as x increases, it becomes easier.
This is monotonic → binary search on speed!`,

    levels: [
      {
        level: "Beginner",
        color: "bg-green-100 text-green-800",
        title: "The Universal Template + 3 Steps",
        sections: [
          {
            heading: "Step 1: Identify — Is Binary Search Applicable?",
            content: `Ask yourself these questions:

✅ YES to binary search if:
  - Array is SORTED (or can be sorted without losing info)
  - You need to FIND a specific value efficiently
  - You need to find FIRST/LAST occurrence of a value
  - Problem asks for MINIMUM/MAXIMUM satisfying a condition
  - You can VERIFY if a value works in O(n) or less

❌ NO to binary search if:
  - Array is unsorted and you need indices (use HashMap)
  - You need ALL occurrences (use two binary searches + count)
  - Order matters and can't be sorted
  - Random access not available (linked list — use slow/fast pointer)`,
          },
          {
            heading: "Step 2: The Universal Template (Never Get Wrong Again)",
            content: `There are 3 common templates. Learn ONE — the cleanest:

TEMPLATE (works for ALL binary search variants):

lo = 0
hi = n - 1

while lo <= hi:
    mid = lo + (hi - lo) // 2    ← SAFE: avoids integer overflow
    
    if arr[mid] == target:
        return mid               ← exact match found
    elif arr[mid] < target:
        lo = mid + 1             ← target in right half
    else:
        hi = mid - 1             ← target in left half

return -1                        ← not found

CRITICAL DETAILS:
1. mid = lo + (hi-lo)//2  NOT (lo+hi)//2  → avoids overflow in Java/C++
2. while lo <= hi  (note: ≤ not <)
3. lo = mid + 1  and  hi = mid - 1  (not mid)  → prevents infinite loop
4. return -1 after loop  → element not found`,
          },
          {
            heading: "Step 3: Trace Through an Example",
            content: `Finding 7 in [1, 3, 5, 7, 9, 11, 13]:
indices:        0  1  2  3  4   5   6

Iteration 1:
  lo=0, hi=6
  mid = 0 + (6-0)//2 = 3
  arr[3] = 7 == 7 → FOUND at index 3!  ✅

Finding 6 in [1, 3, 5, 7, 9, 11, 13]:

Iteration 1: lo=0, hi=6, mid=3, arr[3]=7 > 6 → hi = 2
Iteration 2: lo=0, hi=2, mid=1, arr[1]=3 < 6 → lo = 2
Iteration 3: lo=2, hi=2, mid=2, arr[2]=5 < 6 → lo = 3
Now lo=3 > hi=2 → loop ends → return -1  (6 not in array) ✅

WHY mid = lo + (hi-lo)//2?
If lo=2,000,000,000 and hi=2,000,000,000:
  (lo+hi) = 4,000,000,000 → OVERFLOW in 32-bit int!
  lo + (hi-lo)//2 = 2,000,000,000 + 0 → SAFE ✅`,
          },
          {
            heading: "Lower Bound — Find First Position",
            content: `Lower bound: find the FIRST index where arr[index] >= target.
If all elements < target: returns n (out of bounds).

This is different from exact search — it finds insertion point.

TEMPLATE:
lo = 0; hi = n  ← NOTE: hi = n, not n-1!

while lo < hi:  ← NOTE: strict < not <=
    mid = lo + (hi - lo) // 2
    if arr[mid] < target:
        lo = mid + 1    ← move lo right
    else:
        hi = mid        ← move hi left (might be answer)

return lo  ← lo == hi, this is the answer

UPPER BOUND: first index where arr[index] > target.
Same template but change condition:
    if arr[mid] <= target:
        lo = mid + 1
    else:
        hi = mid

COUNT of target in sorted array:
= upper_bound(target) - lower_bound(target)`,
          },
        ],
        code: `# Python — Binary Search Complete Templates

# ── Template 1: Exact Search ──────────────────
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2    # safe mid calculation
        if arr[mid] == target:
            return mid                # found!
        elif arr[mid] < target:
            lo = mid + 1              # search right half
        else:
            hi = mid - 1              # search left half
    return -1                         # not found

# ── Template 2: Lower Bound ───────────────────
# Returns: first index i where arr[i] >= target
def lower_bound(arr, target):
    lo, hi = 0, len(arr)             # hi = n (inclusive upper range)
    while lo < hi:                    # strict <
        mid = lo + (hi - lo) // 2
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid                  # might be the answer
    return lo                         # lo == hi at end

# ── Template 3: Upper Bound ───────────────────
# Returns: first index i where arr[i] > target
def upper_bound(arr, target):
    lo, hi = 0, len(arr)
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] <= target:
            lo = mid + 1
        else:
            hi = mid
    return lo

# ── Count occurrences of target ───────────────
def count_occurrences(arr, target):
    return upper_bound(arr, target) - lower_bound(arr, target)

# ── Python built-in (bisect module) ──────────
import bisect
arr = [1, 2, 2, 3, 3, 3, 4, 5]
bisect.bisect_left(arr, 3)    # 3 (lower bound)
bisect.bisect_right(arr, 3)   # 6 (upper bound)
bisect.bisect(arr, 3)         # 6 (same as bisect_right)

# Test all templates:
arr = [1, 3, 5, 7, 7, 7, 9, 11]
print(binary_search(arr, 7))    # 3 (any index of 7)
print(lower_bound(arr, 7))      # 3 (first 7)
print(upper_bound(arr, 7))      # 6 (one past last 7)
print(count_occurrences(arr, 7))# 3 (three 7s)`,
      },
      {
        level: "Intermediate",
        color: "bg-yellow-100 text-yellow-800",
        title: "6 Variants of Binary Search",
        sections: [
          {
            heading: "Variant 1: Exact Match",
            content: `The classic binary search.
Find if target exists and return its index.
Template: while lo <= hi, return mid when found, return -1 after loop.

Common problems:
- Search in sorted array
- Find peak element
- Search a 2D matrix`,
          },
          {
            heading: "Variant 2: First/Last Occurrence",
            content: `Find FIRST or LAST index of a repeated element.

FIRST occurrence: when arr[mid] == target, don't stop!
Set hi = mid  (might be earlier occurrence)
Continue until lo == hi.

LAST occurrence: when arr[mid] == target, set lo = mid
But need lo != mid to avoid infinite loop when lo==hi-1.
Use: lo = mid + 1 variant and track last seen index.

Alternative: lower_bound gives first, upper_bound-1 gives last.`,
          },
          {
            heading: "Variant 3: Rotated Sorted Array",
            content: `Array sorted but rotated at some pivot.
Example: [4,5,6,7,0,1,2] — sorted [0,1,2,4,5,6,7] rotated at index 4.

KEY INSIGHT: In any rotation, at least ONE half is always sorted.
Check which half is sorted by comparing arr[lo] and arr[mid]:

If arr[lo] <= arr[mid]: LEFT half is sorted.
  If target in [arr[lo], arr[mid]]: search left (hi = mid-1)
  Else: search right (lo = mid+1)

If arr[mid] < arr[lo]: RIGHT half is sorted.
  If target in [arr[mid], arr[hi]]: search right (lo = mid+1)
  Else: search left (hi = mid-1)`,
          },
          {
            heading: "Variant 4: Find Peak Element",
            content: `Peak: element greater than its neighbors.
Array has no duplicates. Can be unsorted!

KEY INSIGHT: If arr[mid] < arr[mid+1], peak is in RIGHT half.
If arr[mid] > arr[mid+1], peak is in LEFT half (including mid).

Why this works: the peak must exist somewhere. By always moving
toward the larger neighbor, we're climbing uphill — guaranteed to reach a peak.

Template: while lo < hi (strict), return lo at end.`,
          },
          {
            heading: "Variant 5: Binary Search on Answer",
            content: `The MOST POWERFUL variant. Apply when:
- Problem asks "minimum/maximum X satisfying condition"
- You can CHECK if a value X is valid in O(n) or O(1)
- Condition is monotonic: if X works, all X' > X also work (or vice versa)

FRAMEWORK:
1. Identify the answer space [lo, hi]
2. Write a check(x) function: does value x satisfy our condition?
3. Binary search: find smallest x where check(x) is True

Examples:
- "Minimum speed to finish in H hours" → binary search on speed
- "Koko eating bananas" → binary search on eating speed
- "Allocate minimum pages" → binary search on max pages per student
- "Square root" → binary search on the answer itself`,
          },
          {
            heading: "Variant 6: Binary Search on Monotonic Function",
            content: `Find where a function changes from False to True (or True to False).
Function must be monotonic: FFFFFTTTTT or TTTTTFFFFF.

Template:
lo = min_value; hi = max_value
while lo < hi:
    mid = lo + (hi-lo)//2
    if f(mid):
        hi = mid       # mid might be the first True
    else:
        lo = mid + 1   # mid is False, answer is right of mid

return lo  ← first position where f(lo) is True

This is essentially the lower_bound template applied to a boolean function!
Every "find minimum X satisfying condition" problem uses this.`,
          },
        ],
        code: `# Python — All 6 Binary Search Variants

# ── Variant 1: Exact Match ────────────────────
def search(arr, target):
    lo, hi = 0, len(arr)-1
    while lo <= hi:
        mid = lo + (hi-lo)//2
        if arr[mid] == target: return mid
        elif arr[mid] < target: lo = mid+1
        else: hi = mid-1
    return -1

# ── Variant 2a: First Occurrence ─────────────
def first_occurrence(arr, target):
    lo, hi = 0, len(arr)-1
    result = -1
    while lo <= hi:
        mid = lo + (hi-lo)//2
        if arr[mid] == target:
            result = mid            # record, but keep searching LEFT
            hi = mid - 1
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return result

# ── Variant 2b: Last Occurrence ──────────────
def last_occurrence(arr, target):
    lo, hi = 0, len(arr)-1
    result = -1
    while lo <= hi:
        mid = lo + (hi-lo)//2
        if arr[mid] == target:
            result = mid            # record, but keep searching RIGHT
            lo = mid + 1
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return result

# ── Variant 3: Rotated Sorted Array ──────────
def search_rotated(nums, target):
    lo, hi = 0, len(nums)-1
    while lo <= hi:
        mid = lo + (hi-lo)//2
        if nums[mid] == target: return mid
        if nums[lo] <= nums[mid]:        # left half sorted
            if nums[lo] <= target < nums[mid]:
                hi = mid-1
            else:
                lo = mid+1
        else:                            # right half sorted
            if nums[mid] < target <= nums[hi]:
                lo = mid+1
            else:
                hi = mid-1
    return -1

# ── Variant 4: Find Peak Element ─────────────
def find_peak(nums):
    lo, hi = 0, len(nums)-1
    while lo < hi:
        mid = lo + (hi-lo)//2
        if nums[mid] < nums[mid+1]:
            lo = mid+1              # peak is right
        else:
            hi = mid                # peak is left (including mid)
    return lo

# ── Variant 5: Binary Search on Answer ───────
# Koko eating bananas: minimum speed to eat all in h hours
def min_eating_speed(piles, h):
    def can_finish(speed):
        return sum((p + speed-1)//speed for p in piles) <= h
    lo, hi = 1, max(piles)
    while lo < hi:
        mid = lo + (hi-lo)//2
        if can_finish(mid):
            hi = mid            # try slower
        else:
            lo = mid+1          # need faster
    return lo

# ── Variant 6: Boolean Function ──────────────
# Find minimum x where f(x) becomes True
def binary_search_on_function(lo, hi, f):
    while lo < hi:
        mid = lo + (hi-lo)//2
        if f(mid):
            hi = mid
        else:
            lo = mid+1
    return lo   # first x where f(x) is True`,
      },
      {
        level: "Advanced",
        color: "bg-red-100 text-red-800",
        title: "Advanced: 2D Binary Search, Infinite Arrays, and Expert Tricks",
        sections: [
          {
            heading: "Binary Search in 2D Matrix",
            content: `For a matrix where each row and column is sorted:

APPROACH 1: Treat as 1D array (O(log(m×n)))
If ENTIRE matrix is sorted (row end ≤ next row start):
  Map 1D index i → (i//n, i%n) and binary search.

APPROACH 2: Start at top-right corner (O(m+n))
For matrix where each row and each column is sorted separately:
  Start at arr[0][col-1] (top-right corner).
  If current > target → move left (col--)
  If current < target → move down (row++)
  This is NOT binary search — it's a two-pointer approach.

APPROACH 3: Binary search within sorted rows (O(m log n))
Binary search to find which row could contain target,
then binary search within that row.`,
          },
          {
            heading: "Binary Search on Infinite/Unknown Size Array",
            content: `When array size is unknown (infinite or very large):
1. Find range: start with lo=0, hi=1
2. While arr[hi] < target: lo = hi; hi = hi * 2  (exponential expansion)
3. Binary search within [lo, hi]

This finds the range in O(log i) where i is the target's index,
then searches in O(log i). Total: O(log i).

REAL-WORLD USE:
- Reading from stream of unknown size
- Database cursor with unknown result count
- Searching in a linked structure`,
          },
          {
            heading: "Binary Search with Floating Point",
            content: `When answer is a real number (not integer):
Use PRECISION-based termination instead of lo <= hi.

while hi - lo > EPSILON (e.g., 1e-9):
    mid = (lo + hi) / 2
    if check(mid):
        hi = mid
    else:
        lo = mid

OR: run exactly 100 iterations (enough for any precision).

EXAMPLES:
- Square root with decimal precision
- Minimize maximum distance
- Find exact boundary in continuous space`,
          },
          {
            heading: "When to NOT Use Binary Search",
            content: `COMMON TRAPS:
❌ Unsorted array for pair finding → use HashMap (Two Sum)
❌ Finding kth element in unsorted → use QuickSelect O(n)
❌ On non-monotonic functions → binary search gives wrong answer
❌ On linked lists → no O(1) random access
❌ When you need ALL occurrences → use two binary searches (lower+upper bound)

HIDDEN BINARY SEARCH RECOGNITION:
"Find the minimum X such that condition Y is satisfied"
"Find the maximum X such that condition Y is satisfied"
"Is it possible to achieve X?" (monotonic yes/no)

If the condition is monotonic (once True, stays True), binary search on answer!`,
          },
          {
            heading: "Complexity Analysis",
            content: `TIME COMPLEXITY:
Binary Search: O(log n)
Binary Search on Answer with O(n) check: O(n log(answer_range))
Binary Search on Answer with O(n log n) check: O(n log n log(answer_range))

SPACE COMPLEXITY:
Iterative: O(1)
Recursive: O(log n) call stack

LOG BASE CONVERSION:
log₂(1,000) ≈ 10
log₂(1,000,000) ≈ 20
log₂(1,000,000,000) ≈ 30
log₂(10^18) ≈ 60

So binary search on 10^18 values takes at most 60 iterations!
This is why "binary search on answer" often has range [1, 10^18].`,
          },
        ],
        code: `# Advanced Binary Search

# ── 2D Matrix Search (fully sorted) ──────────
def search_matrix(matrix, target):
    if not matrix: return False
    m, n = len(matrix), len(matrix[0])
    lo, hi = 0, m*n - 1
    while lo <= hi:
        mid = lo + (hi-lo)//2
        val = matrix[mid//n][mid%n]    # convert 1D index to 2D
        if val == target: return True
        elif val < target: lo = mid+1
        else: hi = mid-1
    return False

# ── Infinite Array Search ─────────────────────
def search_infinite(reader, target):
    # reader.get(i) returns arr[i] (assume infinite array)
    lo, hi = 0, 1
    # Expand range until arr[hi] >= target
    while reader.get(hi) < target:
        lo = hi
        hi *= 2
    # Now binary search in [lo, hi]
    while lo <= hi:
        mid = lo + (hi-lo)//2
        val = reader.get(mid)
        if val == target: return mid
        elif val < target: lo = mid+1
        else: hi = mid-1
    return -1

# ── Floating Point Binary Search ─────────────
def square_root_precise(x, precision=1e-9):
    if x < 0: return -1
    if x < 1: lo, hi = x, 1.0   # for x < 1, sqrt(x) > x
    else: lo, hi = 1.0, float(x)
    while hi - lo > precision:
        mid = (lo + hi) / 2
        if mid * mid <= x:
            lo = mid
        else:
            hi = mid
    return lo

print(f"{square_root_precise(2):.9f}")   # 1.414213562

# ── Binary Search on Answer: Allocate Books ──
# Minimum pages: split n books among m students to minimize max pages
def allocate_books(pages, m):
    def can_allocate(max_pages):
        students = 1; current = 0
        for p in pages:
            if p > max_pages: return False  # single book exceeds limit
            if current + p > max_pages:
                students += 1; current = 0
            current += p
        return students <= m
    lo = max(pages)        # at least the largest book
    hi = sum(pages)        # at most all books to one student
    while lo < hi:
        mid = lo + (hi-lo)//2
        if can_allocate(mid):
            hi = mid           # try less
        else:
            lo = mid+1         # need more
    return lo

print(allocate_books([10,20,30,40], 2))  # 60

# ── Binary Search Trap: Find Minimum in Rotated ──
def find_minimum(nums):
    lo, hi = 0, len(nums)-1
    while lo < hi:
        mid = lo + (hi-lo)//2
        if nums[mid] > nums[hi]:    # min is in right half
            lo = mid+1
        else:                        # min is in left half (incl mid)
            hi = mid
    return nums[lo]

# ── Advanced: Count Negative Numbers in Sorted Matrix ──
def count_negatives(grid):
    # Each row is sorted in non-increasing order
    total = 0
    for row in grid:
        # Binary search for first non-negative (>= 0)
        lo, hi = 0, len(row)
        while lo < hi:
            mid = lo + (hi-lo)//2
            if row[mid] < 0: hi = mid
            else: lo = mid+1
        total += hi  # hi elements are negative
    return total`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // STEP-BY-STEP ALGORITHM
  // ─────────────────────────────────────────────
  algorithm: {
    title: "Universal Binary Search Algorithm",
    steps: [
      {
        step: 1,
        title: "Define Search Space",
        detail: "Set lo = leftmost valid index (usually 0), hi = rightmost valid index (usually n-1 or n for bounds). For 'search on answer', lo = minimum possible answer, hi = maximum possible answer.",
        code: `lo = 0
hi = len(arr) - 1   # for exact search
# OR
hi = len(arr)       # for lower/upper bound
# OR
lo, hi = 1, max(arr)  # for search on answer`,
      },
      {
        step: 2,
        title: "Calculate Midpoint Safely",
        detail: "Always use mid = lo + (hi-lo)//2. NEVER use (lo+hi)//2 — it can overflow in Java/C++ when lo+hi exceeds INT_MAX. Both give same result but the first is always safe.",
        code: `mid = lo + (hi - lo) // 2
# Safe: lo + (hi-lo)//2 when lo=hi=2^30 gives 2^30+0 = OK
# Unsafe: (lo+hi)//2 when lo=hi=2^30 gives 2^31 = OVERFLOW in 32-bit`,
      },
      {
        step: 3,
        title: "Evaluate and Eliminate",
        detail: "Compare arr[mid] with target. Eliminate the half that CANNOT contain the answer. Move lo or hi — NEVER move to mid (causes infinite loop when lo=hi-1).",
        code: `if arr[mid] == target:
    return mid              # exact match
elif arr[mid] < target:
    lo = mid + 1            # ✅ exclude mid, go right
else:
    hi = mid - 1            # ✅ exclude mid, go left
# NEVER: lo = mid or hi = mid in exact match template`,
      },
      {
        step: 4,
        title: "Choose Loop Condition",
        detail: "Use 'while lo <= hi' for exact match (terminates when space empty). Use 'while lo < hi' for lower/upper bound (terminates when lo==hi, which is the answer).",
        code: `# Exact search: loop until space empty
while lo <= hi:   # exits when lo > hi
    ...
return -1         # not found

# Lower/upper bound: loop until converged
while lo < hi:    # exits when lo == hi (the answer)
    ...
return lo         # lo == hi == answer`,
      },
      {
        step: 5,
        title: "Handle the Result",
        detail: "For exact search: return -1 if loop ends without finding. For lower bound: return lo (always valid). For 'search on answer': verify lo is actually valid if problem requires.",
        code: `# Exact search
return -1   # element not in array

# Lower bound  
return lo   # first index where arr[lo] >= target
            # if lo == len(arr), target > all elements

# Search on answer
return lo   # minimum x where check(x) is True`,
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
      syntax: `# Python — Binary Search Complete Reference

# ── Built-in bisect module ────────────────────
import bisect

arr = [1, 3, 5, 7, 7, 7, 9, 11]

# bisect_left: index of first element >= target (lower bound)
bisect.bisect_left(arr, 7)      # 3 (first 7 at index 3)
bisect.bisect_left(arr, 6)      # 3 (6 would be inserted at index 3)
bisect.bisect_left(arr, 12)     # 8 (past end)

# bisect_right: index of first element > target (upper bound)
bisect.bisect_right(arr, 7)     # 6 (one past last 7)
bisect.bisect(arr, 7)           # 6 (same as bisect_right)

# insort: insert while maintaining sorted order O(n)
bisect.insort(arr, 6)           # inserts 6 at correct position
bisect.insort_left(arr, 7)      # inserts 7 before existing 7s
bisect.insort_right(arr, 7)     # inserts 7 after existing 7s

# ── Manual Implementation (all variants) ──────

# 1. Exact search — O(log n)
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: lo = mid + 1
        else: hi = mid - 1
    return -1

# 2. Lower bound — first index >= target
def lower_bound(arr, target):
    lo, hi = 0, len(arr)
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] < target: lo = mid + 1
        else: hi = mid
    return lo

# 3. Upper bound — first index > target
def upper_bound(arr, target):
    lo, hi = 0, len(arr)
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] <= target: lo = mid + 1
        else: hi = mid
    return lo

# 4. First occurrence
def first_occ(arr, target):
    lo, hi = 0, len(arr)-1; res = -1
    while lo <= hi:
        mid = lo + (hi-lo)//2
        if arr[mid] == target: res = mid; hi = mid-1
        elif arr[mid] < target: lo = mid+1
        else: hi = mid-1
    return res

# 5. Last occurrence
def last_occ(arr, target):
    lo, hi = 0, len(arr)-1; res = -1
    while lo <= hi:
        mid = lo + (hi-lo)//2
        if arr[mid] == target: res = mid; lo = mid+1
        elif arr[mid] < target: lo = mid+1
        else: hi = mid-1
    return res

# 6. Recursive binary search — O(log n) time, O(log n) space
def binary_search_rec(arr, target, lo=0, hi=None):
    if hi is None: hi = len(arr) - 1
    if lo > hi: return -1
    mid = lo + (hi - lo) // 2
    if arr[mid] == target: return mid
    elif arr[mid] < target: return binary_search_rec(arr, target, mid+1, hi)
    else: return binary_search_rec(arr, target, lo, mid-1)

# 7. Search on answer template
def search_on_answer(lo, hi, check):
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if check(mid): hi = mid
        else: lo = mid + 1
    return lo

# Usage:
result = search_on_answer(1, 10**9, lambda x: x*x >= 50)
print(result)  # 8 (smallest x where x² >= 50, since 7²=49<50, 8²=64>=50)`,
    },
    {
      lang: "JavaScript",
      emoji: "🟨",
      color: "bg-yellow-100 text-yellow-800",
      syntax: `// JavaScript — Binary Search Complete Reference

// ── Exact Search ──────────────────────────────
function binarySearch(arr, target) {
    let lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

// ── Lower Bound ───────────────────────────────
function lowerBound(arr, target) {
    let lo = 0, hi = arr.length;
    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

// ── Upper Bound ───────────────────────────────
function upperBound(arr, target) {
    let lo = 0, hi = arr.length;
    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (arr[mid] <= target) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

// ── First and Last Occurrence ─────────────────
function firstOccurrence(arr, target) {
    let lo = 0, hi = arr.length - 1, result = -1;
    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (arr[mid] === target) { result = mid; hi = mid - 1; }
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return result;
}

// ── Search in Rotated Sorted Array ───────────
function searchRotated(nums, target) {
    let lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (nums[mid] === target) return mid;
        if (nums[lo] <= nums[mid]) {          // left sorted
            if (nums[lo] <= target && target < nums[mid])
                hi = mid - 1;
            else lo = mid + 1;
        } else {                               // right sorted
            if (nums[mid] < target && target <= nums[hi])
                lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}

// ── Binary Search on Answer ───────────────────
function searchOnAnswer(lo, hi, check) {
    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (check(mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}

// Example: sqrt
function mySqrt(x) {
    if (x < 2) return x;
    return searchOnAnswer(1, x, mid => mid * mid > x) - 1;
}

// ── Floating Point Binary Search ──────────────
function sqrtPrecise(x, eps = 1e-9) {
    let lo = 0, hi = Math.max(1, x);
    while (hi - lo > eps) {
        const mid = (lo + hi) / 2;
        if (mid * mid <= x) lo = mid;
        else hi = mid;
    }
    return lo;
}

// ── 2D Matrix Search ──────────────────────────
function searchMatrix(matrix, target) {
    const m = matrix.length, n = matrix[0].length;
    let lo = 0, hi = m * n - 1;
    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        const val = matrix[Math.floor(mid / n)][mid % n];
        if (val === target) return true;
        else if (val < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return false;
}`,
    },
    {
      lang: "Java",
      emoji: "☕",
      color: "bg-orange-100 text-orange-800",
      syntax: `// Java — Binary Search Complete Reference
import java.util.Arrays;

// ── Built-in Arrays.binarySearch ──────────────
int[] arr = {1, 3, 5, 7, 9, 11};
Arrays.sort(arr);                        // must be sorted first
int idx = Arrays.binarySearch(arr, 7);  // returns index or negative
// If not found: returns -(insertion point) - 1
// So: if result < 0, element not present

// ── Manual Exact Search ───────────────────────
public static int binarySearch(int[] arr, int target) {
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;   // safe overflow prevention
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

// ── Lower Bound ───────────────────────────────
public static int lowerBound(int[] arr, int target) {
    int lo = 0, hi = arr.length;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

// ── Upper Bound ───────────────────────────────
public static int upperBound(int[] arr, int target) {
    int lo = 0, hi = arr.length;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] <= target) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

// ── First and Last Occurrence ─────────────────
public static int firstOccurrence(int[] arr, int target) {
    int lo = 0, hi = arr.length-1, result = -1;
    while (lo <= hi) {
        int mid = lo + (hi-lo)/2;
        if (arr[mid] == target) { result = mid; hi = mid-1; }
        else if (arr[mid] < target) lo = mid+1;
        else hi = mid-1;
    }
    return result;
}

// ── Search on Answer ──────────────────────────
// Koko Eating Bananas
public static int minEatingSpeed(int[] piles, int h) {
    int lo = 1, hi = Arrays.stream(piles).max().getAsInt();
    while (lo < hi) {
        int mid = lo + (hi-lo)/2;
        if (canFinish(piles, h, mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
private static boolean canFinish(int[] piles, int h, int speed) {
    int hours = 0;
    for (int p : piles) hours += (p + speed - 1) / speed;
    return hours <= h;
}

// ── Rotated Array Search ──────────────────────
public static int searchRotated(int[] nums, int target) {
    int lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi-lo)/2;
        if (nums[mid] == target) return mid;
        if (nums[lo] <= nums[mid]) {
            if (nums[lo] <= target && target < nums[mid]) hi = mid-1;
            else lo = mid+1;
        } else {
            if (nums[mid] < target && target <= nums[hi]) lo = mid+1;
            else hi = mid-1;
        }
    }
    return -1;
}`,
    },
    {
      lang: "C++",
      emoji: "⚙️",
      color: "bg-purple-100 text-purple-800",
      syntax: `// C++ — Binary Search Complete Reference
#include <algorithm>
#include <vector>
using namespace std;

// ── STL Binary Search Functions ───────────────
vector<int> v = {1, 3, 5, 7, 7, 7, 9, 11};

// binary_search: returns bool
bool found = binary_search(v.begin(), v.end(), 7);  // true

// lower_bound: iterator to first element >= target
auto it = lower_bound(v.begin(), v.end(), 7);       // points to first 7
int idx = it - v.begin();                            // index = 3

// upper_bound: iterator to first element > target
auto it2 = upper_bound(v.begin(), v.end(), 7);      // points to 9
int idx2 = it2 - v.begin();                         // index = 6

// Count occurrences:
int count = upper_bound(v.begin(),v.end(),7) - lower_bound(v.begin(),v.end(),7);  // 3

// equal_range: returns pair(lower_bound, upper_bound)
auto [lo_it, hi_it] = equal_range(v.begin(), v.end(), 7);
int cnt = hi_it - lo_it;  // 3

// ── Manual Exact Search ───────────────────────
int binarySearch(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;   // safe!
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

// ── Lower and Upper Bound (manual) ───────────
int lowerBound(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size();
    while (lo < hi) {
        int mid = lo + (hi-lo)/2;
        if (arr[mid] < target) lo = mid+1;
        else hi = mid;
    }
    return lo;
}

// ── Search on Answer ──────────────────────────
bool canAllocate(vector<int>& pages, int m, int maxPages) {
    int students = 1, current = 0;
    for (int p : pages) {
        if (p > maxPages) return false;
        if (current + p > maxPages) { students++; current = 0; }
        current += p;
    }
    return students <= m;
}

int allocateBooks(vector<int>& pages, int m) {
    int lo = *max_element(pages.begin(), pages.end());
    int hi = accumulate(pages.begin(), pages.end(), 0);
    while (lo < hi) {
        int mid = lo + (hi-lo)/2;
        if (canAllocate(pages, m, mid)) hi = mid;
        else lo = mid+1;
    }
    return lo;
}

// ── 2D Matrix Search ──────────────────────────
bool searchMatrix(vector<vector<int>>& matrix, int target) {
    int m = matrix.size(), n = matrix[0].size();
    int lo = 0, hi = m*n-1;
    while (lo <= hi) {
        int mid = lo + (hi-lo)/2;
        int val = matrix[mid/n][mid%n];
        if (val == target) return true;
        else if (val < target) lo = mid+1;
        else hi = mid-1;
    }
    return false;
}`,
    },
  ],

  // ─────────────────────────────────────────────
  // PATTERNS
  // ─────────────────────────────────────────────
  patterns: [
    {
      name: "Classic Exact Match",
      emoji: "🎯",
      color: "bg-violet-50 border-violet-200",
      titleColor: "text-violet-800",
      when: "Find if value exists in sorted array, find index of target",
      avoid: "Unsorted arrays (sort first if allowed) or when you need insertion point",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      steps: [
        "lo=0, hi=n-1",
        "while lo <= hi: compute mid",
        "if arr[mid]==target: return mid",
        "elif arr[mid]<target: lo=mid+1 else hi=mid-1",
        "return -1 after loop",
      ],
      template: `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: lo = mid + 1
        else: hi = mid - 1
    return -1`,
    },
    {
      name: "Lower Bound / Upper Bound",
      emoji: "📍",
      color: "bg-blue-50 border-blue-200",
      titleColor: "text-blue-800",
      when: "Find first/last occurrence, count occurrences, find insertion point, range queries",
      avoid: "When you just need any occurrence (use exact match instead)",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      steps: [
        "lo=0, hi=n (not n-1!)",
        "while lo < hi (strict!): compute mid",
        "Lower: if arr[mid]<target: lo=mid+1 else hi=mid",
        "Upper: if arr[mid]<=target: lo=mid+1 else hi=mid",
        "return lo (lo==hi is the answer)",
      ],
      template: `def lower_bound(arr, target):   # first index where arr[i] >= target
    lo, hi = 0, len(arr)
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] < target: lo = mid + 1
        else: hi = mid
    return lo

def upper_bound(arr, target):   # first index where arr[i] > target
    lo, hi = 0, len(arr)
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] <= target: lo = mid + 1
        else: hi = mid
    return lo

# Count occurrences:
count = upper_bound(arr, target) - lower_bound(arr, target)`,
    },
    {
      name: "Binary Search on Answer",
      emoji: "🏹",
      color: "bg-green-50 border-green-200",
      titleColor: "text-green-800",
      when: "Find minimum/maximum value satisfying a condition. Condition must be monotonic.",
      avoid: "When check function is not monotonic or when answer space has gaps",
      timeComplexity: "O(n log(answer_range)) where n is cost of check()",
      spaceComplexity: "O(1)",
      steps: [
        "Define answer space [lo, hi]",
        "Write check(x): returns True if x satisfies condition",
        "Binary search: if check(mid) is True → hi=mid (try smaller)",
        "If check(mid) is False → lo=mid+1 (need larger)",
        "Return lo (smallest x where check is True)",
      ],
      template: `def solve(data):
    def check(x):
        # Returns True if x is feasible
        # Must be MONOTONIC: if x works, all larger x also work
        return is_feasible(data, x)
    
    lo = min_possible_answer
    hi = max_possible_answer
    
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if check(mid):
            hi = mid         # valid, try smaller
        else:
            lo = mid + 1     # not valid, need larger
    
    return lo  # minimum x where check(x) is True`,
    },
    {
      name: "Rotated Array Search",
      emoji: "🌀",
      color: "bg-orange-50 border-orange-200",
      titleColor: "text-orange-800",
      when: "Sorted array that was rotated at unknown pivot. Find element or minimum.",
      avoid: "Arrays with duplicates (adds complication) or completely unsorted arrays",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      steps: [
        "At least one half is always sorted in a rotated array",
        "Check if left half is sorted: arr[lo] <= arr[mid]",
        "If target in sorted half → search there, else search other half",
        "For finding minimum: if arr[mid]>arr[hi], min is in right; else left",
      ],
      template: `def search_rotated(nums, target):
    lo, hi = 0, len(nums)-1
    while lo <= hi:
        mid = lo + (hi-lo)//2
        if nums[mid] == target: return mid
        if nums[lo] <= nums[mid]:      # LEFT half is sorted
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1          # target in left sorted half
            else:
                lo = mid + 1          # target in right half
        else:                          # RIGHT half is sorted
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1          # target in right sorted half
            else:
                hi = mid - 1          # target in left half
    return -1`,
    },
  ],

  // ─────────────────────────────────────────────
  // PROBLEMS
  // ─────────────────────────────────────────────
  problems: [
    {
      name: "Binary Search",
      difficulty: "Easy",
      companies: ["Amazon", "Microsoft", "Google", "Apple"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/binary-search/", id: "#704" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/binary-search/", id: "Practice" },
      ],
      statement: "Given sorted array of integers and a target, return index of target, or -1 if not found.",
      example: "[-1,0,3,5,9,12], target=9 → 4 | [-1,0,3,5,9,12], target=2 → -1",
      constraints: ["Array is sorted ascending", "All values unique", "O(log n) time required"],
      approaches: [
        {
          title: "Linear Search (Baseline)",
          emoji: "🐢",
          tag: "O(n) — Wrong!",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Scan left to right. Finds it but ignores sorted property. Violates O(log n) requirement.",
          when: "Never. Shows you understand what NOT to do.",
          code: `def search_linear(nums, target):
    for i, x in enumerate(nums):
        if x == target: return i
    return -1
# O(n) — completely ignores sorted property!`,
        },
        {
          title: "Iterative Binary Search",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(log n) | Space: O(1)",
          idea: "Maintain lo and hi pointers. Compute mid. If arr[mid] is target → found. If too small → search right. If too big → search left.",
          when: "Always. The standard O(log n) O(1) space solution.",
          code: `def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2  # safe: avoids overflow
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            lo = mid + 1            # search right half
        else:
            hi = mid - 1            # search left half
    return -1

# Trace: [-1,0,3,5,9,12], target=9
# lo=0,hi=5: mid=2, nums[2]=3 < 9 → lo=3
# lo=3,hi=5: mid=4, nums[4]=9 == 9 → return 4 ✅`,
        },
        {
          title: "Recursive Binary Search",
          emoji: "🔄",
          tag: "O(log n) space",
          complexity: "Time: O(log n) | Space: O(log n) call stack",
          idea: "Same logic as iterative but expressed recursively. Each call reduces problem size by half.",
          when: "Good to show in interviews but iterative is preferred (O(1) space).",
          code: `def search_recursive(nums, target, lo=0, hi=None):
    if hi is None: hi = len(nums) - 1
    if lo > hi: return -1
    mid = lo + (hi - lo) // 2
    if nums[mid] == target: return mid
    elif nums[mid] < target:
        return search_recursive(nums, target, mid+1, hi)
    else:
        return search_recursive(nums, target, lo, mid-1)`,
        },
      ],
      ai: {
        hints: ["What can you conclude about the target's location from comparing with arr[mid]?", "How many elements do you eliminate each iteration?"],
        followUps: ["First Bad Version", "Search Insert Position", "Find Minimum in Rotated Array"],
        interviewQuestions: ["Why lo + (hi-lo)//2 instead of (lo+hi)//2?", "What happens when lo==hi?"],
      },
    },
    {
      name: "Find First and Last Position",
      difficulty: "Medium",
      companies: ["Amazon", "Facebook", "Google", "Microsoft", "LinkedIn"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", id: "#34" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/find-first-and-last-positions-of-an-element-in-a-sorted-array/", id: "Practice" },
      ],
      statement: "Given sorted array (may have duplicates), find starting and ending position of target. Return [-1,-1] if not found.",
      example: "[5,7,7,8,8,10], target=8 → [3,4] | [5,7,7,8,8,10], target=6 → [-1,-1]",
      constraints: ["O(log n) time required", "Array may have duplicates", "Return [-1,-1] if absent"],
      approaches: [
        {
          title: "Linear Scan",
          emoji: "🐢",
          tag: "O(n) — Violates constraint",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Scan to find first and last. O(n) — violates the O(log n) requirement.",
          when: "Never. Just shows understanding of what's needed.",
          code: `def search_range_linear(nums, target):
    first = last = -1
    for i, x in enumerate(nums):
        if x == target:
            if first == -1: first = i
            last = i
    return [first, last]`,
        },
        {
          title: "Two Binary Searches — Optimal",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(log n) | Space: O(1)",
          idea: "Run two binary searches: one to find FIRST occurrence (continue left when found), one for LAST occurrence (continue right when found).",
          when: "Always. Two separate O(log n) passes = O(log n) total.",
          code: `def search_range(nums, target):
    def find_first():
        lo, hi = 0, len(nums)-1
        result = -1
        while lo <= hi:
            mid = lo + (hi-lo)//2
            if nums[mid] == target:
                result = mid
                hi = mid - 1      # keep going LEFT
            elif nums[mid] < target: lo = mid+1
            else: hi = mid-1
        return result
    
    def find_last():
        lo, hi = 0, len(nums)-1
        result = -1
        while lo <= hi:
            mid = lo + (hi-lo)//2
            if nums[mid] == target:
                result = mid
                lo = mid + 1      # keep going RIGHT
            elif nums[mid] < target: lo = mid+1
            else: hi = mid-1
        return result
    
    return [find_first(), find_last()]

# Alternative using lower/upper bound:
def search_range_v2(nums, target):
    lo = lower_bound(nums, target)      # first index >= target
    if lo == len(nums) or nums[lo] != target:
        return [-1, -1]                 # target not present
    hi = upper_bound(nums, target) - 1  # last index of target
    return [lo, hi]`,
        },
      ],
      ai: {
        hints: ["What if you don't return immediately when you find target?", "Can you use lower_bound and upper_bound?"],
        followUps: ["Count Occurrences in Sorted Array", "Search Insert Position", "Find K Closest Elements"],
        interviewQuestions: ["How does this differ from simple binary search?", "Can you do it in a single binary search?"],
      },
    },
    {
      name: "Search in Rotated Sorted Array",
      difficulty: "Medium",
      companies: ["Amazon", "Facebook", "Google", "Microsoft", "Uber"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/", id: "#33" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/", id: "Practice" },
      ],
      statement: "Search target in a sorted array that was rotated at an unknown pivot.",
      example: "[4,5,6,7,0,1,2], target=0 → 4 | [4,5,6,7,0,1,2], target=3 → -1",
      constraints: ["All values unique", "O(log n) time", "Unknown pivot position"],
      approaches: [
        {
          title: "Find Pivot then Binary Search",
          emoji: "📊",
          tag: "O(log n) two pass",
          complexity: "Time: O(log n) | Space: O(1)",
          idea: "First find pivot (minimum element). Then determine which sorted half target is in. Binary search that half.",
          when: "Correct but two passes. The single-pass approach is preferred.",
          code: `def search_two_pass(nums, target):
    # Find minimum (pivot)
    lo, hi = 0, len(nums)-1
    while lo < hi:
        mid = lo + (hi-lo)//2
        if nums[mid] > nums[hi]: lo = mid+1
        else: hi = mid
    pivot = lo
    n = len(nums)
    # Binary search in correct half
    if target >= nums[pivot] and target <= nums[n-1]:
        lo, hi = pivot, n-1
    else:
        lo, hi = 0, pivot-1
    while lo <= hi:
        mid = lo + (hi-lo)//2
        if nums[mid] == target: return mid
        elif nums[mid] < target: lo = mid+1
        else: hi = mid-1
    return -1`,
        },
        {
          title: "Single Pass Binary Search",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(log n) | Space: O(1)",
          idea: `At each step, exactly ONE half is always sorted.
Determine which half is sorted (compare arr[lo] with arr[mid]).
Check if target lies in the sorted half.
If yes → search there. If no → search the other half.`,
          when: "Best — single pass O(log n). The expected interview answer.",
          code: `def search(nums, target):
    lo, hi = 0, len(nums) - 1
    
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        
        if nums[mid] == target:
            return mid
        
        # Check if LEFT half is sorted
        if nums[lo] <= nums[mid]:
            # Is target in sorted left half?
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1         # yes → search left
            else:
                lo = mid + 1         # no → search right
        
        # RIGHT half must be sorted
        else:
            # Is target in sorted right half?
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1         # yes → search right
            else:
                hi = mid - 1         # no → search left
    
    return -1

# Trace: [4,5,6,7,0,1,2], target=0
# lo=0,hi=6: mid=3, nums[3]=7
#   nums[0]=4 <= nums[3]=7 → LEFT sorted
#   Is 0 in [4..7)? No → lo=4
# lo=4,hi=6: mid=5, nums[5]=1
#   nums[4]=0 <= nums[5]=1 → LEFT sorted (well, 0<=1 ✓)
#   Is 0 in [0..1)? 0>=0 and 0<1 → YES → hi=4
# lo=4,hi=4: mid=4, nums[4]=0 == 0 → return 4 ✅`,
        },
      ],
      ai: {
        hints: ["In any rotated array, one half is always fully sorted", "How do you know which half is sorted?"],
        followUps: ["Find Minimum in Rotated Array", "Search in Rotated Array II (with duplicates)", "Find Pivot"],
        interviewQuestions: ["What changes if the array has duplicates?", "How do you find the pivot?"],
      },
    },
    {
      name: "Find Minimum in Rotated Sorted Array",
      difficulty: "Medium",
      companies: ["Amazon", "Microsoft", "Facebook", "Google"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", id: "#153" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/find-minimum-element-in-a-sorted-and-rotated-array/", id: "Practice" },
      ],
      statement: "Find the minimum element in a sorted array that was rotated at an unknown pivot.",
      example: "[3,4,5,1,2] → 1 | [4,5,6,7,0,1,2] → 0 | [1] → 1",
      constraints: ["All values unique", "O(log n) time"],
      approaches: [
        {
          title: "Linear Scan",
          emoji: "🐢",
          tag: "O(n)",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Scan all elements, return minimum.",
          when: "Never for this problem. O(log n) is achievable and expected.",
          code: `def find_min_linear(nums):
    return min(nums)  # O(n)`,
        },
        {
          title: "Binary Search on Pivot",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(log n) | Space: O(1)",
          idea: `The minimum element is the pivot.
Key insight: if arr[mid] > arr[hi], the minimum is in the RIGHT half.
If arr[mid] <= arr[hi], the minimum is in the LEFT half (including mid).

Why compare with hi (not lo)?
The right portion is always sorted correctly.
arr[mid] > arr[hi] means the rotation point is in the right half.`,
          when: "Always. The standard O(log n) solution.",
          code: `def find_min(nums):
    lo, hi = 0, len(nums) - 1
    
    while lo < hi:
        mid = lo + (hi - lo) // 2
        
        if nums[mid] > nums[hi]:
            lo = mid + 1        # min is in right half
        else:
            hi = mid            # min is in left half (including mid)
    
    return nums[lo]

# Trace: [4,5,6,7,0,1,2]
# lo=0,hi=6: mid=3, nums[3]=7 > nums[6]=2 → lo=4
# lo=4,hi=6: mid=5, nums[5]=1 <= nums[6]=2 → hi=5
# lo=4,hi=5: mid=4, nums[4]=0 <= nums[5]=1 → hi=4
# lo=4,hi=4: loop ends → return nums[4]=0 ✅

# Why this works:
# If arr[mid] > arr[hi]: the array wraps around between mid and hi
#   → minimum is somewhere in (mid, hi]
# If arr[mid] <= arr[hi]: the right part [mid..hi] is properly sorted
#   → minimum is at most arr[mid], so it's in [lo..mid]`,
        },
      ],
      ai: {
        hints: ["Compare arr[mid] with arr[hi] (not arr[lo])", "If arr[mid] > arr[hi], where must the rotation be?"],
        followUps: ["Search in Rotated Array", "Find Pivot", "Number of Rotations"],
        interviewQuestions: ["What if there are duplicates?", "How many rotations? (answer: index of minimum)"],
      },
    },
    {
      name: "Koko Eating Bananas",
      difficulty: "Medium",
      companies: ["Amazon", "Google", "Facebook", "Microsoft"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/koko-eating-bananas/", id: "#875" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/koko-eating-bananas/", id: "Practice" },
      ],
      statement: "Koko eats k bananas/hour. She has h hours and n piles. Find minimum k to finish all piles in h hours.",
      example: "piles=[3,6,7,11], h=8 → 4 | piles=[30,11,23,4,20], h=5 → 30",
      constraints: ["1 ≤ k ≤ max(piles)", "Hours to eat pile p at speed k = ⌈p/k⌉"],
      approaches: [
        {
          title: "Linear Search on Speed",
          emoji: "🐢",
          tag: "O(max(piles) × n)",
          complexity: "Time: O(max×n) | Space: O(1)",
          idea: "Try every possible speed from 1 to max. First speed that works is answer.",
          when: "Correct but too slow for large piles.",
          code: `def min_eating_speed_linear(piles, h):
    for speed in range(1, max(piles)+1):
        hours = sum((p+speed-1)//speed for p in piles)
        if hours <= h:
            return speed`,
        },
        {
          title: "Binary Search on Answer",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n log max(piles)) | Space: O(1)",
          idea: `Binary search on speed k (the answer).
- Answer space: [1, max(piles)] (at max speed, eat largest pile in 1 hour)
- check(k): can we finish in h hours at speed k?
- Monotonic: if speed k works, speed k+1 also works → binary search!
Find MINIMUM k where check(k) is True.`,
          when: "Always. This is the 'binary search on answer' pattern.",
          code: `def min_eating_speed(piles, h):
    def can_finish(speed):
        # Total hours at this speed
        hours = sum((p + speed - 1) // speed for p in piles)
        return hours <= h
    
    lo = 1               # minimum possible speed
    hi = max(piles)      # maximum needed speed (eat biggest in 1 hr)
    
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if can_finish(mid):
            hi = mid         # valid speed, try slower
        else:
            lo = mid + 1     # too slow, need faster
    
    return lo   # minimum speed that works

# WHY binary search works here:
# If speed k can finish in h hours → any speed > k also works
# If speed k cannot finish → no speed < k works either
# This MONOTONIC property makes binary search applicable!

# Trace: piles=[3,6,7,11], h=8
# lo=1, hi=11
# mid=6: hours = ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6)=1+1+2+2=6<=8 → hi=6
# lo=1, hi=6, mid=3: hours=1+2+3+4=10>8 → lo=4
# lo=4, hi=6, mid=5: hours=1+2+2+3=8<=8 → hi=5
# lo=4, hi=5, mid=4: hours=1+2+2+3=8<=8 → hi=4
# lo=4, hi=4 → return 4 ✅`,
        },
      ],
      ai: {
        hints: ["The condition 'can finish in h hours' is monotonic with respect to speed", "Try binary searching on the speed instead of the hours"],
        followUps: ["Ship Packages in D Days", "Allocate Books", "Minimize Maximum Distance to Gas Station"],
        interviewQuestions: ["How do you identify this as a binary search on answer problem?", "What makes the condition monotonic?"],
      },
    },
    {
      name: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      companies: ["Google", "Amazon", "Facebook", "Microsoft", "Apple"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/", id: "#4" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/median-of-two-sorted-arrays/", id: "Practice" },
      ],
      statement: "Find the median of two sorted arrays. Overall runtime must be O(log(m+n)).",
      example: "[1,3] and [2] → 2.0 | [1,2] and [3,4] → 2.5",
      constraints: ["O(log(min(m,n))) time", "Cannot merge arrays (O(m+n))"],
      approaches: [
        {
          title: "Merge and Find Median",
          emoji: "🐢",
          tag: "O(m+n) — Violates constraint",
          complexity: "Time: O(m+n) | Space: O(m+n)",
          idea: "Merge two sorted arrays, find median of combined array.",
          when: "Wrong for this problem. Shows understanding but violates O(log n) requirement.",
          code: `def find_median_merge(nums1, nums2):
    merged = sorted(nums1 + nums2)
    n = len(merged)
    if n % 2: return float(merged[n//2])
    return (merged[n//2-1] + merged[n//2]) / 2`,
        },
        {
          title: "Binary Search on Partition",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(log(min(m,n))) | Space: O(1)",
          idea: `Binary search on partition position in the smaller array.
We want to find partition (i, j) such that:
- i elements from nums1 and j elements from nums2 form the LEFT half
- Left max ≤ Right min (valid partition)
- i + j = (m+n+1) // 2

For valid partition at i:
  max(nums1[i-1], nums2[j-1]) ≤ min(nums1[i], nums2[j])

If nums1[i-1] > nums2[j]: i is too large, move left (hi = i-1)
If nums2[j-1] > nums1[i]: i is too small, move right (lo = i+1)`,
          when: "Required for O(log n) solution. Advanced but important.",
          code: `def find_median(nums1, nums2):
    # Ensure nums1 is the smaller array
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    
    m, n = len(nums1), len(nums2)
    half = (m + n + 1) // 2
    
    lo, hi = 0, m
    
    while lo <= hi:
        i = lo + (hi - lo) // 2   # partition in nums1
        j = half - i               # partition in nums2
        
        # Get boundary values (use -inf/+inf for edges)
        maxLeft1  = float('-inf') if i == 0 else nums1[i-1]
        minRight1 = float('inf')  if i == m else nums1[i]
        maxLeft2  = float('-inf') if j == 0 else nums2[j-1]
        minRight2 = float('inf')  if j == n else nums2[j]
        
        if maxLeft1 <= minRight2 and maxLeft2 <= minRight1:
            # Found valid partition!
            if (m + n) % 2 == 1:
                return float(max(maxLeft1, maxLeft2))
            else:
                return (max(maxLeft1, maxLeft2) + min(minRight1, minRight2)) / 2
        elif maxLeft1 > minRight2:
            hi = i - 1    # i too large
        else:
            lo = i + 1    # i too small`,
        },
      ],
      ai: {
        hints: ["Think about what partition means: which elements are in the left half?", "Binary search on the partition position in the smaller array"],
        followUps: ["Kth Smallest Element in Two Sorted Arrays", "Find K Pairs with Smallest Sums"],
        interviewQuestions: ["Why binary search on the smaller array?", "How do you handle even vs odd total length?"],
      },
    },
    {
      name: "Capacity to Ship Packages",
      difficulty: "Medium",
      companies: ["Amazon", "Facebook", "Google"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/", id: "#1011" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/capacity-to-ship-packages-within-d-days/", id: "Practice" },
      ],
      statement: "Find minimum weight capacity of ship to ship all packages within d days. Must maintain order.",
      example: "weights=[1,2,3,4,5,6,7,8,9,10], days=5 → 15",
      constraints: ["Must ship in order (cannot rearrange)", "Minimum capacity ≥ max weight"],
      approaches: [
        {
          title: "Binary Search on Capacity",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n log(sum)) | Space: O(1)",
          idea: `Binary search on the ship capacity.
Answer space: [max(weights), sum(weights)]
- min capacity: must fit heaviest package
- max capacity: all packages in one day

check(capacity): greedy — fill each day until adding next exceeds capacity.
Count days needed. Valid if ≤ d.

Monotonic: higher capacity → fewer or equal days → valid.`,
          when: "Always. Same pattern as Koko eating bananas.",
          code: `def ship_within_days(weights, days):
    def can_ship(capacity):
        day_count = 1
        current = 0
        for w in weights:
            if w > capacity: return False   # single package too heavy
            if current + w > capacity:
                day_count += 1              # start new day
                current = 0
            current += w
        return day_count <= days
    
    lo = max(weights)       # must fit heaviest
    hi = sum(weights)       # all in one day
    
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if can_ship(mid):
            hi = mid
        else:
            lo = mid + 1
    
    return lo`,
        },
      ],
      ai: {
        hints: ["Same pattern as Koko Eating Bananas!", "The minimum capacity is max(weights), maximum is sum(weights)"],
        followUps: ["Koko Eating Bananas", "Split Array Largest Sum", "Allocate Books"],
        interviewQuestions: ["Why is lower bound max(weights)?", "What makes this monotonic?"],
      },
    },
    {
      name: "Sqrt(x)",
      difficulty: "Easy",
      companies: ["Google", "Amazon", "Bloomberg", "Apple"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/sqrtx/", id: "#69" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/square-root-of-an-integer/", id: "Practice" },
      ],
      statement: "Compute floor of square root of x without using built-in functions.",
      example: "4 → 2 | 8 → 2 (floor of 2.828) | 9 → 3",
      constraints: ["Return floor (integer part)", "No built-in sqrt"],
      approaches: [
        {
          title: "Newton's Method",
          emoji: "🧮",
          tag: "O(log n) converges fast",
          complexity: "Time: O(log n) in practice | Space: O(1)",
          idea: "Newton's iteration: x_{n+1} = (x_n + S/x_n) / 2 converges quadratically to √S.",
          when: "Shows mathematical depth. Converges faster than binary search in practice.",
          code: `def my_sqrt_newton(x):
    if x < 2: return x
    r = x
    while r * r > x:
        r = (r + x // r) // 2
    return r`,
        },
        {
          title: "Binary Search on Answer",
          emoji: "⚡",
          tag: "OPTIMAL (clearest)",
          complexity: "Time: O(log n) | Space: O(1)",
          idea: "Binary search on the answer space [0, x]. Find largest k where k² ≤ x.",
          when: "Cleanest approach. Shows binary search on answer mastery.",
          code: `def my_sqrt(x):
    if x < 2: return x
    lo, hi = 1, x // 2   # sqrt(x) <= x//2 for x >= 4
    
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        sq = mid * mid
        
        if sq == x:
            return mid           # perfect square
        elif sq < x:
            lo = mid + 1         # try larger
        else:
            hi = mid - 1         # too large
    
    return hi   # hi is floor of sqrt(x) when loop ends

# WHY return hi?
# When loop ends, lo > hi.
# lo² > x and hi² ≤ x (from the loop logic)
# So hi is the largest integer where hi² ≤ x = floor(√x)

# Trace: x=8
# lo=1,hi=4: mid=2, 4<8 → lo=3
# lo=3,hi=4: mid=3, 9>8 → hi=2
# lo=3>hi=2: return hi=2 ✅`,
        },
      ],
      ai: {
        hints: ["What's the largest k where k² ≤ x?", "Binary search for that k in [1, x//2]"],
        followUps: ["Valid Perfect Square", "Find the Smallest Letter Greater Than Target", "Nth Root of Number"],
        interviewQuestions: ["Why use hi//2 as upper bound?", "How does Newton's method compare to binary search here?"],
      },
    },
  ],

  // ─────────────────────────────────────────────
  // INTERVIEW TIPS
  // ─────────────────────────────────────────────
  interviewTips: [
    "Always use mid = lo + (hi-lo)//2, NEVER (lo+hi)//2 — prevents overflow in Java/C++",
    "Three conditions determine the template: exact match (lo<=hi, return -1), lower bound (lo<hi, return lo), search on answer (lo<hi, return lo)",
    "For 'find minimum X satisfying condition': binary search [min_ans, max_ans], hi=mid when check passes, lo=mid+1 when fails",
    "Rotated array: one half is ALWAYS sorted — determine which one by comparing arr[lo] with arr[mid]",
    "After loop ends in lower bound template: lo==hi is ALWAYS the answer — no need to validate",
    "For duplicates in rotated array: when arr[lo]==arr[mid]==arr[hi], do lo++; hi-- (degrades to O(n))",
    "Binary search on floating point: use EPSILON termination or exactly 100 iterations",
    "Recognize hidden binary search: 'minimum maximum', 'maximum minimum', 'is X feasible?' — all suggest binary search on answer",
    "Import bisect in Python — bisect_left = lower_bound, bisect_right = upper_bound",
    "State the invariant before coding: 'answer is always in [lo, hi]' — never discard the actual answer",
  ],

  // ─────────────────────────────────────────────
  // MISTAKES
  // ─────────────────────────────────────────────
  mistakes: [
    "Using (lo+hi)//2 — causes integer overflow in Java/C++ for large lo and hi",
    "Using lo = mid or hi = mid in exact match template — causes infinite loop when lo=hi-1",
    "Wrong loop condition: using lo<hi for exact search (misses single element) or lo<=hi for bounds (infinite loop)",
    "Off-by-one in hi initialization: using n-1 for lower bound (should be n to allow 'all elements < target')",
    "Forgetting to return lo (not hi) after lower bound loop — lo==hi is the answer",
    "For rotated array: using arr[lo] vs arr[hi] comparison incorrectly — use arr[lo]<=arr[mid] for left sorted check",
    "Not handling duplicates in rotated array — arr[lo]==arr[mid] case needs special treatment",
    "Binary search on non-monotonic function — result is undefined, never do this",
    "Returning wrong value for lower bound when target doesn't exist (lo can equal n — past end)",
    "In 'search on answer': setting wrong lo/hi bounds — lo must be minimum possible, hi must be maximum possible",
  ],

  // ─────────────────────────────────────────────
  // QUIZ
  // ─────────────────────────────────────────────
  quiz: [
    {
      q: "Why use mid = lo + (hi-lo)//2 instead of mid = (lo+hi)//2?",
      options: [
        "They give different results",
        "(lo+hi)//2 can overflow when lo+hi exceeds 32-bit integer max",
        "lo+(hi-lo)//2 is faster",
        "Just a coding convention",
      ],
      answer: 1,
      explanation: "In Java/C++ with 32-bit ints: if lo=1.5×10⁹ and hi=2×10⁹, then lo+hi = 3.5×10⁹ which exceeds INT_MAX (2.1×10⁹) and OVERFLOWS. lo+(hi-lo)//2 computes the difference first (always ≤ 2×10⁹), avoiding overflow. Python has arbitrary precision so it's less critical there.",
    },
    {
      q: "For lower bound template, what is the correct loop condition?",
      options: [
        "while lo <= hi (same as exact search)",
        "while lo < hi (strict less than)",
        "while lo != hi",
        "while lo < hi - 1",
      ],
      answer: 1,
      explanation: "Lower bound uses 'while lo < hi' because when lo==hi, we've converged to the answer. With lo<=hi, if lo==hi and arr[lo] != target, we'd need extra handling. The strict lo<hi terminates exactly when lo==hi, and that value IS the answer (first index >= target).",
    },
    {
      q: "Binary search on answer: when check(mid) returns True, what do we do?",
      options: [
        "Return mid immediately",
        "Set lo = mid + 1 (search right for better answer)",
        "Set hi = mid (mid might be the optimal answer, try smaller)",
        "Set hi = mid - 1",
      ],
      answer: 2,
      explanation: "When finding MINIMUM x satisfying condition: check(mid)==True means mid WORKS, but there might be a smaller valid answer. So set hi=mid (NOT mid-1, to keep mid as candidate) and continue searching left. When loop ends, lo==hi is the minimum valid answer.",
    },
    {
      q: "In a rotated sorted array [4,5,6,7,0,1,2], lo=0, hi=6, mid=3. arr[3]=7. Which half is sorted?",
      options: [
        "Right half [0,1,2] is sorted",
        "Left half [4,5,6,7] is sorted",
        "Neither half is sorted",
        "Both halves are sorted",
      ],
      answer: 1,
      explanation: "Check: arr[lo]=arr[0]=4 <= arr[mid]=arr[3]=7. Since the left endpoint ≤ mid value, the LEFT half [4,5,6,7] (indices 0-3) is in sorted order. The right half [0,1,2] (indices 4-6) contains the rotation point.",
    },
    {
      q: "For 'Ship Packages in D Days', what are the binary search bounds [lo, hi]?",
      options: [
        "[0, sum(weights)]",
        "[1, max(weights)]",
        "[max(weights), sum(weights)]",
        "[min(weights), max(weights)]",
      ],
      answer: 2,
      explanation: "lo = max(weights): the ship must fit the heaviest single package (can't split packages). hi = sum(weights): worst case is fitting ALL packages on one day. Any valid answer lies in this range. Searching outside these bounds is wasteful.",
    },
    {
      q: "lower_bound([1,3,5,7,9], 6) returns what?",
      options: ["2 (index of 5)", "3 (index of 7)", "-1 (6 not found)", "4 (index of 9)"],
      answer: 1,
      explanation: "lower_bound returns the first index where arr[i] >= 6. arr[3]=7 is the first element >= 6 (since arr[2]=5 < 6 but arr[3]=7 >= 6). So it returns 3. This is the 'insertion point' for 6 to maintain sorted order.",
    },
  ],

  practice_links: [
    { platform: "LeetCode Binary Search", url: "https://leetcode.com/tag/binary-search/", color: "bg-orange-500", problems: "250+ problems", recommended: true },
    { platform: "Striver's Binary Search Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", color: "bg-indigo-600", problems: "Complete roadmap", recommended: true },
    { platform: "NeetCode Binary Search", url: "https://neetcode.io/roadmap", color: "bg-violet-600", problems: "Curated 20 must-do" },
    { platform: "GFG Binary Search", url: "https://www.geeksforgeeks.org/binary-search/", color: "bg-green-600", problems: "Deep theory + practice" },
    { platform: "Codeforces Binary Search", url: "https://codeforces.com/problemset?tags=binary+search", color: "bg-blue-600", problems: "Competitive level" },
    { platform: "InterviewBit Binary Search", url: "https://www.interviewbit.com/courses/programming/binary-search/", color: "bg-teal-600", problems: "Interview focused" },
  ],
};

export default binarySearch;
