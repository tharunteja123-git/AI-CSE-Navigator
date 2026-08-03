const arrays = {
  name: "Arrays",
  emoji: "📊",
  color: "bg-blue-500",
  light: "bg-blue-50",
  border: "border-blue-200",
  text: "text-blue-700",
  total: 50,

  learningObjectives: [
    "Understand how arrays store data in contiguous memory",
    "Master time & space complexity for all operations",
    "Apply Two Pointer, Sliding Window, and Prefix Sum patterns",
    "Solve 50+ real interview problems with optimal solutions",
    "Implement arrays in Python, JavaScript, Java, and C++",
  ],

  prerequisites: ["Variables & Data Types", "Loops (for, while)", "Functions", "Basic Math"],

  whyLearn: {
    importance: "Arrays are the most fundamental data structure. Almost every algorithm and data structure is built on top of arrays. They appear in 60%+ of all coding interviews.",
    useCases: [
      "Store and process datasets (e.g., stock prices, temperatures)",
      "Image processing — pixels are stored in 2D arrays",
      "Database records stored in tabular (2D array) format",
      "Implementing other data structures: stacks, queues, heaps",
      "Matrix operations in machine learning and graphics",
    ],
  },

  definition: {
    short: "An array is a collection of elements stored in contiguous memory locations, all of the same data type, accessible via a numeric index starting at 0.",
    analogy: "Think of an array like a row of numbered parking spots. Each spot has a fixed number (index), you can directly drive to spot #5 without checking spots 1-4, and all spots are lined up next to each other.",
    properties: [
      "Fixed size in static arrays; dynamic in ArrayList/Python lists",
      "Zero-indexed: first element is at index 0, last at index n-1",
      "Random access in O(1) — jump directly to any element by index",
      "Insertion/Deletion in the middle requires shifting — O(n)",
      "Cache-friendly — contiguous memory means CPU cache hits are high",
      "Homogeneous in typed languages (int[], String[]); mixed in Python/JS",
    ],
    complexity: [
      { op: "Access by index",    time: "O(1)",           space: "O(1)" },
      { op: "Search (unsorted)",  time: "O(n)",           space: "O(1)" },
      { op: "Search (sorted)",    time: "O(log n)",       space: "O(1)" },
      { op: "Insert at end",      time: "O(1) amortized", space: "O(1)" },
      { op: "Insert at index i",  time: "O(n)",           space: "O(1)" },
      { op: "Delete at index i",  time: "O(n)",           space: "O(1)" },
      { op: "Delete at end",      time: "O(1)",           space: "O(1)" },
    ],
  },

  languages: [
    {
      lang: "Python",
      emoji: "🐍",
      color: "bg-blue-100 text-blue-800",
      syntax: `# Python — Lists (dynamic arrays)
arr = [1, 2, 3, 4, 5]
arr = list(range(10))         # [0,1,2,3,4,5,6,7,8,9]

# ── Access & Slicing ──────────────────
arr[0]                        # First element   → O(1)
arr[-1]                       # Last element    → O(1)
arr[1:4]                      # Slice [1,2,3]   → O(k)
arr[::-1]                     # Reverse copy    → O(n)
arr[::2]                      # Every 2nd       → O(n)

# ── Mutation Methods ─────────────────
arr.append(6)                 # Add to end      → O(1)
arr.insert(2, 99)             # Insert at index → O(n)
arr.pop()                     # Remove last     → O(1)
arr.pop(2)                    # Remove at index → O(n)
arr.remove(99)                # Remove by value → O(n)
arr.extend([7, 8, 9])         # Extend with list→ O(k)
arr.clear()                   # Empty the list  → O(1)

# ── Query Methods ────────────────────
arr.index(3)                  # First index of value → O(n)
arr.count(3)                  # Count occurrences    → O(n)
len(arr)                      # Length               → O(1)
3 in arr                      # Membership check     → O(n)

# ── Sorting & Ordering ───────────────
arr.sort()                    # In-place sort   → O(n log n)
arr.sort(reverse=True)        # Descending
arr.sort(key=lambda x: -x)    # Custom key
sorted(arr)                   # Returns new sorted list
arr.reverse()                 # In-place reverse → O(n)

# ── List Comprehensions ──────────────
squares = [x**2 for x in range(10)]
evens   = [x for x in arr if x % 2 == 0]
matrix  = [[0]*cols for _ in range(rows)]   # 2D array

# ── Useful Built-ins ─────────────────
max(arr), min(arr), sum(arr)
enumerate(arr)                # (index, value) pairs
zip(arr1, arr2)               # Pair elements
any(x > 5 for x in arr)      # Any match?
all(x > 0 for x in arr)      # All match?

# ── Collections ──────────────────────
from collections import Counter, deque
Counter([1,1,2,3])            # {1:2, 2:1, 3:1}
deque(arr)                    # O(1) push/pop from both ends`,
    },
    {
      lang: "JavaScript",
      emoji: "🟨",
      color: "bg-yellow-100 text-yellow-800",
      syntax: `// JavaScript Arrays — Dynamic, mixed types allowed
const arr = [1, 2, 3, 4, 5];
const arr2 = Array(5).fill(0);        // [0,0,0,0,0]
const arr3 = Array.from({length:5}, (_,i)=>i); // [0,1,2,3,4]

// ── Access ────────────────────────────
arr[0];                               // First
arr[arr.length - 1];                  // Last
arr.at(-1);                           // Last (ES2022)
arr.slice(1, 4);                      // [2,3,4] non-mutating

// ── Mutation Methods ──────────────────
arr.push(6);                          // Add to end      → O(1)
arr.pop();                            // Remove last     → O(1)
arr.unshift(0);                       // Add to front    → O(n)
arr.shift();                          // Remove first    → O(n)
arr.splice(2, 1, 99);                 // Remove/insert   → O(n)
arr.fill(0, 2, 4);                    // Fill range with 0

// ── Non-mutating Methods ──────────────
arr.concat([6, 7]);                   // Join arrays
arr.flat();                           // Flatten nested
arr.flatMap(x => [x, x*2]);          // Map then flatten

// ── Search ────────────────────────────
arr.indexOf(3);                       // First index (-1 if not found)
arr.lastIndexOf(3);                   // Last index
arr.includes(3);                      // Boolean
arr.find(x => x > 3);                // First match
arr.findIndex(x => x > 3);           // Index of first match

// ── Iteration (Higher Order) ──────────
arr.map(x => x * 2);                 // Transform → new array
arr.filter(x => x % 2 === 0);        // Filter → new array
arr.reduce((acc, x) => acc + x, 0);  // Accumulate → single value
arr.forEach(x => console.log(x));    // Side effects, no return
arr.every(x => x > 0);               // All satisfy?
arr.some(x => x > 4);                // Any satisfy?

// ── Sort ──────────────────────────────
arr.sort((a, b) => a - b);           // Ascending numbers
arr.sort((a, b) => b - a);           // Descending
arr.sort();                           // ⚠️ Default is string sort!
[...arr].sort((a,b)=>a-b);          // Non-mutating sort

// ── Spread & Destructuring ────────────
const copy = [...arr];               // Shallow copy
const [first, second, ...rest] = arr;// Destructure
const merged = [...arr1, ...arr2];   // Merge arrays`,
    },
    {
      lang: "Java",
      emoji: "☕",
      color: "bg-orange-100 text-orange-800",
      syntax: `// Java — Static Array + ArrayList (dynamic)
import java.util.*;

// ── Static Array ──────────────────────
int[] arr = {1, 2, 3, 4, 5};
int[] arr2 = new int[5];              // [0,0,0,0,0]
int n = arr.length;                   // Length (field, not method)
Arrays.fill(arr, 0);                  // Fill all with 0
Arrays.sort(arr);                     // Sort in-place O(n log n)
Arrays.sort(arr, 0, 3);              // Sort range [0,3)
Arrays.copyOf(arr, n);               // Copy full array
Arrays.copyOfRange(arr, 1, 4);       // Copy [1,4)
Arrays.toString(arr);                 // "[1, 2, 3, 4, 5]"
Arrays.binarySearch(arr, 3);         // Binary search (must be sorted)
Arrays.equals(arr, arr2);            // Deep equality

// ── 2D Array ──────────────────────────
int[][] matrix = new int[3][3];
int[][] m2 = {{1,2},{3,4},{5,6}};
Arrays.deepToString(matrix);          // Print 2D

// ── ArrayList (dynamic) ──────────────
ArrayList<Integer> list = new ArrayList<>();
list.add(1);                          // Add to end
list.add(0, 99);                      // Add at index
list.get(0);                          // Access by index
list.set(0, 10);                      // Update by index
list.remove(Integer.valueOf(1));      // Remove by value
list.remove(0);                       // Remove by index
list.size();                          // Length
list.contains(3);                     // Existence check
list.indexOf(3);                      // First index
list.isEmpty();                       // Empty check
list.clear();                         // Empty list
Collections.sort(list);              // Sort
Collections.reverse(list);           // Reverse
Collections.max(list);               // Max element
Collections.min(list);               // Min element
Collections.frequency(list, 3);      // Count occurrences

// ── Convert between Array & List ─────
List<Integer> fromArr = Arrays.asList(1, 2, 3);
Integer[] backToArr = list.toArray(new Integer[0]);

// ── Stream API (Java 8+) ──────────────
int[] arr3 = {1,2,3,4,5};
Arrays.stream(arr3).filter(x->x%2==0).map(x->x*2).toArray();
Arrays.stream(arr3).sum();
Arrays.stream(arr3).max().getAsInt();`,
    },
    {
      lang: "C++",
      emoji: "⚙️",
      color: "bg-purple-100 text-purple-800",
      syntax: `// C++ — Static Array + std::vector (dynamic)
#include <vector>
#include <algorithm>
#include <numeric>

// ── Static Array ──────────────────────
int arr[] = {1, 2, 3, 4, 5};
int arr2[5] = {};                     // [0,0,0,0,0]
int n = sizeof(arr)/sizeof(arr[0]);   // Length

// ── std::vector (preferred) ───────────
vector<int> v = {1, 2, 3, 4, 5};
vector<int> v2(5, 0);                 // 5 zeros
vector<int> v3(v);                    // Copy

// Modifying
v.push_back(6);                       // Add to end   → O(1) amortized
v.pop_back();                         // Remove last  → O(1)
v.insert(v.begin()+2, 99);           // Insert at idx→ O(n)
v.erase(v.begin()+2);                // Remove at idx→ O(n)
v.erase(v.begin(), v.begin()+3);     // Remove range
v.clear();                            // Empty vector

// Access
v[0]; v.at(0);                       // Index access (at() checks bounds)
v.front(); v.back();                  // First / Last
v.size(); v.empty();                  // Size / Empty check

// Algorithms (from <algorithm>)
sort(v.begin(), v.end());            // Sort ascending
sort(v.begin(), v.end(), greater<int>()); // Sort descending
sort(v.begin(), v.end(), [](int a,int b){ return a>b; }); // Custom
reverse(v.begin(), v.end());         // Reverse in-place
*max_element(v.begin(), v.end());    // Max value
*min_element(v.begin(), v.end());    // Min value
accumulate(v.begin(), v.end(), 0);  // Sum
count(v.begin(), v.end(), 3);        // Count occurrences
find(v.begin(), v.end(), 3);         // Iterator to element
binary_search(v.begin(),v.end(),3);  // Bool (sorted only)
lower_bound(v.begin(),v.end(),3);    // First >= 3
upper_bound(v.begin(),v.end(),3);    // First > 3
unique(v.begin(), v.end());          // Remove consecutive dups

// ── 2D Vector ─────────────────────────
vector<vector<int>> mat(3, vector<int>(3, 0)); // 3x3 zeros`,
    },
    {
      lang: "SQL",
      emoji: "🗄️",
      color: "bg-green-100 text-green-800",
      syntax: `-- SQL Arrays (PostgreSQL)
-- SQL tables are essentially 2D arrays

-- Create table with array column
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    student TEXT,
    grades INTEGER[]
);

-- Insert array values
INSERT INTO scores VALUES (1, 'Rahul', ARRAY[85, 92, 78, 95]);
INSERT INTO scores VALUES (2, 'Priya', '{88, 76, 91, 83}');

-- Access elements (1-indexed in PostgreSQL!)
SELECT grades[1] AS first_grade FROM scores;
SELECT grades[2:3] AS mid_grades FROM scores;     -- Slice

-- Array functions
SELECT array_length(grades, 1) FROM scores;       -- Length
SELECT array_upper(grades, 1) FROM scores;        -- Upper bound
SELECT unnest(grades) FROM scores;                -- Expand to rows
SELECT array_append(grades, 100) FROM scores;     -- Add element
SELECT array_prepend(70, grades) FROM scores;     -- Add to front
SELECT array_cat(grades, ARRAY[100,99]) FROM scores; -- Concatenate
SELECT array_remove(grades, 78) FROM scores;      -- Remove value

-- Check membership
SELECT * FROM scores WHERE 95 = ANY(grades);     -- Contains 95?
SELECT * FROM scores WHERE grades @> ARRAY[85];   -- Contains all?

-- Aggregate into array
SELECT array_agg(student) FROM scores;            -- Collect to array
SELECT array_agg(grade ORDER BY grade DESC)
FROM unnest(ARRAY[85,92,78,95]) AS grade;

-- Array statistics
SELECT avg(grade) FROM unnest(ARRAY[85,92,78,95]) AS grade;
SELECT max(grade) FROM unnest(ARRAY[85,92,78,95]) AS grade;`,
    },
  ],

  patterns: [
    {
      name: "Two Pointer",
      emoji: "👆👆",
      color: "bg-blue-50 border-blue-200",
      titleColor: "text-blue-800",
      when: "Sorted arrays, finding pairs with target sum, removing duplicates, palindrome check",
      avoid: "Unsorted arrays where relationship between elements isn't monotonic",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      steps: [
        "Initialize left=0, right=n-1",
        "Check condition with arr[left] and arr[right]",
        "Move the pointer that helps satisfy the condition",
        "Stop when left >= right",
      ],
      template: `def two_pointer(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        curr = arr[left] + arr[right]
        if curr == target:
            return [left, right]        # Found!
        elif curr < target:
            left += 1                   # Need larger sum
        else:
            right -= 1                  # Need smaller sum
    return []                           # Not found`,
    },
    {
      name: "Sliding Window",
      emoji: "🪟",
      color: "bg-purple-50 border-purple-200",
      titleColor: "text-purple-800",
      when: "Max/min subarray of size k, longest substring with constraint, subarray sum",
      avoid: "When the window is not contiguous or order doesn't matter",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1) or O(k)",
      steps: [
        "Initialize window with first k elements",
        "Slide: add arr[right], remove arr[right-k]",
        "Update best answer at each step",
        "Return best",
      ],
      template: `# Fixed size window — max sum of k elements
def max_sum_k(arr, k):
    window = sum(arr[:k])
    best = window
    for i in range(k, len(arr)):
        window += arr[i] - arr[i-k]    # slide right
        best = max(best, window)
    return best

# Variable size window — longest subarray with condition
def longest_valid(arr, condition):
    left = best = 0
    for right in range(len(arr)):
        # expand window by adding arr[right]
        while not condition(left, right):
            left += 1                   # shrink
        best = max(best, right-left+1)
    return best`,
    },
    {
      name: "Prefix Sum",
      emoji: "➕",
      color: "bg-green-50 border-green-200",
      titleColor: "text-green-800",
      when: "Range sum queries, subarray sum equals k, count subarrays",
      avoid: "When array is modified between queries (use Segment Tree instead)",
      timeComplexity: "O(n) build, O(1) query",
      spaceComplexity: "O(n)",
      steps: [
        "Build prefix array: pre[i] = pre[i-1] + arr[i-1]",
        "Range sum arr[l..r] = pre[r+1] - pre[l]",
        "For subarray sum = k: use HashMap of prefix sums",
      ],
      template: `def build_prefix(arr):
    n = len(arr)
    pre = [0] * (n + 1)
    for i in range(n):
        pre[i+1] = pre[i] + arr[i]
    return pre

# Range sum in O(1)
def range_sum(pre, l, r):
    return pre[r+1] - pre[l]

# Count subarrays with sum = k
def subarray_sum_k(arr, k):
    count = 0
    cur = 0
    seen = {0: 1}                       # prefix_sum -> count
    for x in arr:
        cur += x
        count += seen.get(cur - k, 0)  # found subarrays ending here
        seen[cur] = seen.get(cur, 0) + 1
    return count`,
    },
    {
      name: "Kadane's Algorithm",
      emoji: "⚡",
      color: "bg-yellow-50 border-yellow-200",
      titleColor: "text-yellow-800",
      when: "Maximum subarray sum, maximum product subarray variants",
      avoid: "When you need to find the actual subarray indices (need modification)",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      steps: [
        "Initialize cur = best = arr[0]",
        "For each element: cur = max(element, cur + element)",
        "Update best = max(best, cur)",
        "If cur < 0, it drags down future sums — restart",
      ],
      template: `def kadane(arr):
    cur = best = arr[0]
    for x in arr[1:]:
        cur = max(x, cur + x)           # extend or restart
        best = max(best, cur)
    return best

# With subarray tracking
def kadane_with_range(arr):
    cur = best = arr[0]
    start = end = temp = 0
    for i in range(1, len(arr)):
        if arr[i] > cur + arr[i]:
            cur = arr[i]; temp = i
        else:
            cur += arr[i]
        if cur > best:
            best = cur; start = temp; end = i
    return best, arr[start:end+1]`,
    },
    {
      name: "Dutch National Flag",
      emoji: "🏳️",
      color: "bg-red-50 border-red-200",
      titleColor: "text-red-800",
      when: "Sort array of 3 values (0,1,2) in one pass, partition around pivot",
      avoid: "When more than 3 distinct values exist",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      steps: [
        "Three pointers: low=0, mid=0, high=n-1",
        "If arr[mid]==0: swap with low, advance both",
        "If arr[mid]==1: just advance mid",
        "If arr[mid]==2: swap with high, decrease high only",
      ],
      template: `def sort_012(arr):
    low = mid = 0
    high = len(arr) - 1
    while mid <= high:
        if arr[mid] == 0:
            arr[low], arr[mid] = arr[mid], arr[low]
            low += 1; mid += 1
        elif arr[mid] == 1:
            mid += 1
        else:                           # arr[mid] == 2
            arr[mid], arr[high] = arr[high], arr[mid]
            high -= 1                   # don't advance mid!`,
    },
    {
      name: "Boyer-Moore Voting",
      emoji: "🗳️",
      color: "bg-orange-50 border-orange-200",
      titleColor: "text-orange-800",
      when: "Find majority element (appears > n/2 times)",
      avoid: "When no majority element guaranteed (need verification pass)",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      steps: [
        "Initialize candidate = None, count = 0",
        "For each element: if count==0, set as candidate",
        "If element == candidate: count++, else count--",
        "Verify candidate in second pass if needed",
      ],
      template: `def majority_element(arr):
    candidate = None
    count = 0
    for x in arr:
        if count == 0:
            candidate = x
        count += 1 if x == candidate else -1
    return candidate                    # Guaranteed if majority exists`,
    },
  ],

  problems: [
    {
      name: "Two Sum",
      difficulty: "Easy",
      companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/two-sum/", id: "#1" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/given-an-array-a-and-a-number-x-check-for-pair-in-a-with-sum-as-x/", id: "Practice" },
      ],
      statement: "Given array of integers and a target, return indices of two numbers that add up to target.",
      example: "nums=[2,7,11,15], target=9 → [0,1] (nums[0]+nums[1]=2+7=9)",
      constraints: ["2 ≤ nums.length ≤ 10⁴", "Exactly one solution exists", "Can't use same element twice"],
      approaches: [
        {
          title: "Brute Force — Try All Pairs",
          emoji: "🐢",
          tag: "O(n²)",
          complexity: "Time: O(n²) | Space: O(1)",
          idea: "Check every pair (i,j) where i<j. If nums[i]+nums[j]==target, return [i,j].",
          when: "Never in interviews. Show it first, then optimize.",
          code: `def two_sum(nums, target):
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return [i, j]`,
        },
        {
          title: "HashMap — One Pass",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "For each num, the complement is (target - num). If complement already exists in our map, we found our pair. Otherwise, store num with its index.",
          when: "Always. This is the expected interview answer.",
          code: `def two_sum(nums, target):
    seen = {}                      # value → index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i              # store current for future`,
        },
        {
          title: "Two Pointer (sorted variant)",
          emoji: "👆",
          tag: "O(n log n)",
          complexity: "Time: O(n log n) | Space: O(1)",
          idea: "Sort array with original indices. Use two pointers. Only works if indices aren't needed, or if array is already sorted.",
          when: "When array is pre-sorted and indices don't matter.",
          code: `def two_sum_sorted(nums, target):
    # Assumes array is already sorted
    left, right = 0, len(nums) - 1
    while left < right:
        s = nums[left] + nums[right]
        if s == target:
            return [left, right]
        elif s < target:
            left += 1
        else:
            right -= 1
    return []`,
        },
      ],
      ai: {
        hints: ["Think about what you need to find given each number", "Can you store something as you scan so you don't need a second loop?"],
        followUps: ["3Sum", "4Sum", "Two Sum II (sorted array)", "Two Sum III (design)"],
        compareWith: ["Binary Search approach", "HashSet vs HashMap"],
        interviewQuestions: [
          "What if there are multiple valid answers?",
          "Can you solve it with O(1) space?",
          "What if the array is sorted?",
        ],
      },
    },
    {
      name: "Maximum Subarray (Kadane's)",
      difficulty: "Medium",
      companies: ["Amazon", "Microsoft", "Google", "Apple", "Adobe"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/maximum-subarray/", id: "#53" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/", id: "Practice" },
        { name: "HackerRank", url: "https://www.hackerrank.com/challenges/maxsubarray/problem", id: "Practice" },
      ],
      statement: "Find the contiguous subarray with the largest sum and return its sum.",
      example: "[-2,1,-3,4,-1,2,1,-5,4] → 6 (subarray [4,-1,2,1])",
      constraints: ["1 ≤ nums.length ≤ 10⁵", "Array contains negative numbers"],
      approaches: [
        {
          title: "Brute Force",
          emoji: "🐢",
          tag: "O(n²)",
          complexity: "Time: O(n²) | Space: O(1)",
          idea: "Try every starting index, extend to the right, track maximum sum seen.",
          when: "Never. Just to establish baseline.",
          code: `def max_subarray(nums):
    best = float('-inf')
    for i in range(len(nums)):
        cur = 0
        for j in range(i, len(nums)):
            cur += nums[j]
            best = max(best, cur)
    return best`,
        },
        {
          title: "Kadane's Algorithm",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "At each position: should I extend the current subarray (cur + x) or start fresh (x alone)? If cur is negative, it hurts — restart. Track the max across all positions.",
          when: "Always. THE canonical solution.",
          code: `def max_subarray(nums):
    cur = best = nums[0]
    for x in nums[1:]:
        cur = max(x, cur + x)          # extend or restart
        best = max(best, cur)
    return best

# With subarray indices:
def max_subarray_range(nums):
    cur = best = nums[0]
    start = end = temp = 0
    for i in range(1, len(nums)):
        if nums[i] > cur + nums[i]:
            cur = nums[i]; temp = i    # restart from i
        else:
            cur += nums[i]
        if cur > best:
            best = cur; start = temp; end = i
    return best, nums[start:end+1]`,
        },
        {
          title: "Divide & Conquer",
          emoji: "✂️",
          tag: "O(n log n)",
          complexity: "Time: O(n log n) | Space: O(log n)",
          idea: "Split in half. Max subarray is in left half, right half, or crosses midpoint. Recurse on both halves and combine.",
          when: "Good for interview variety. Shows D&C knowledge.",
          code: `def max_subarray(nums):
    def helper(l, r):
        if l == r: return nums[l]
        mid = (l + r) // 2
        left_max = helper(l, mid)
        right_max = helper(mid+1, r)
        cross_l = cross_r = float('-inf')
        cur = 0
        for i in range(mid, l-1, -1):
            cur += nums[i]; cross_l = max(cross_l, cur)
        cur = 0
        for i in range(mid+1, r+1):
            cur += nums[i]; cross_r = max(cross_r, cur)
        return max(left_max, right_max, cross_l + cross_r)
    return helper(0, len(nums)-1)`,
        },
      ],
      ai: {
        hints: ["What happens when current sum goes negative?", "Is it ever worth continuing with a negative running total?"],
        followUps: ["Maximum Product Subarray", "Maximum Sum Circular Subarray", "Minimum Subarray Sum"],
        compareWith: ["DP vs Greedy approach", "Kadane's vs Divide & Conquer"],
        interviewQuestions: [
          "Can you return the actual subarray, not just the sum?",
          "What if all numbers are negative?",
          "How to handle circular arrays?",
        ],
      },
    },
    {
      name: "Best Time to Buy & Sell Stock",
      difficulty: "Easy",
      companies: ["Amazon", "Facebook", "Goldman Sachs", "Microsoft", "Bloomberg"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", id: "#121" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/best-time-to-buy-and-sell-stock/", id: "Practice" },
        { name: "InterviewBit", url: "https://www.interviewbit.com/problems/best-time-to-buy-and-sell-stock/", id: "Practice" },
      ],
      statement: "Given prices array where prices[i] is price on day i, find max profit by buying then selling on a later day.",
      example: "[7,1,5,3,6,4] → 5 (buy at 1 on day 2, sell at 6 on day 5)",
      constraints: ["Must buy before selling", "Return 0 if no profit possible"],
      approaches: [
        {
          title: "Brute Force",
          emoji: "🐢",
          tag: "O(n²)",
          complexity: "Time: O(n²) | Space: O(1)",
          idea: "Try every pair (buy_day, sell_day) where sell > buy.",
          when: "Never use.",
          code: `def max_profit(prices):
    best = 0
    for i in range(len(prices)):
        for j in range(i+1, len(prices)):
            best = max(best, prices[j] - prices[i])
    return best`,
        },
        {
          title: "Track Minimum Price",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Scan left to right. Track min price seen so far. At each day, potential profit = today - min_so_far. Track max profit.",
          when: "Always. Single pass, O(1) space.",
          code: `def max_profit(prices):
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    return max_profit`,
        },
      ],
      ai: {
        hints: ["You need the cheapest buy price seen before the current day", "What's the profit if you sell today?"],
        followUps: ["Stock II (multiple transactions)", "Stock III (at most 2)", "Stock IV (at most k)", "With cooldown", "With fee"],
        interviewQuestions: ["What if you can buy and sell multiple times?", "What if you must wait 1 day after selling?"],
      },
    },
    {
      name: "Container With Most Water",
      difficulty: "Medium",
      companies: ["Google", "Amazon", "Adobe", "Uber", "Salesforce"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/container-with-most-water/", id: "#11" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/container-with-most-water/", id: "Practice" },
      ],
      statement: "Given n heights, find two lines that form a container holding the most water. Water = min(h[l], h[r]) × (r - l).",
      example: "[1,8,6,2,5,4,8,3,7] → 49 (lines at index 1 and 8, height=7, width=7)",
      constraints: ["n ≥ 2", "Heights are non-negative integers"],
      approaches: [
        {
          title: "Brute Force",
          emoji: "🐢",
          tag: "O(n²)",
          complexity: "Time: O(n²) | Space: O(1)",
          idea: "Try every pair of lines.",
          when: "Never.",
          code: `def max_area(height):
    best = 0
    for i in range(len(height)):
        for j in range(i+1, len(height)):
            water = min(height[i], height[j]) * (j-i)
            best = max(best, water)
    return best`,
        },
        {
          title: "Two Pointer",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Start with widest. Moving the taller wall inward always loses — shorter wall limits water, and width decreases. So always move the shorter wall inward.",
          when: "Classic greedy two-pointer. Always.",
          code: `def max_area(height):
    left, right = 0, len(height) - 1
    best = 0
    while left < right:
        h = min(height[left], height[right])
        best = max(best, h * (right - left))
        if height[left] < height[right]:
            left += 1          # move shorter wall
        else:
            right -= 1
    return best`,
        },
      ],
      ai: {
        hints: ["Why does moving the taller wall never help?", "Width always decreases — what must increase?"],
        followUps: ["Trapping Rain Water (harder version)", "Largest Rectangle in Histogram"],
        interviewQuestions: ["Prove why the two-pointer approach is correct.", "Can there be multiple optimal answers?"],
      },
    },
    {
      name: "Product of Array Except Self",
      difficulty: "Medium",
      companies: ["Amazon", "Apple", "Facebook", "Microsoft", "LinkedIn"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/product-of-array-except-self/", id: "#238" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/product-array-puzzle/", id: "Practice" },
      ],
      statement: "Return array where result[i] = product of all elements except nums[i]. No division. O(n) time.",
      example: "[1,2,3,4] → [24,12,8,6]",
      constraints: ["No division allowed", "O(n) time", "Solve with O(1) extra space (output excluded)"],
      approaches: [
        {
          title: "Using Division (not allowed!)",
          emoji: "🚫",
          tag: "Forbidden",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Total product ÷ each element. Fails on zeros and violates the no-division constraint.",
          when: "NEVER — interviewers explicitly forbid this.",
          code: `# ⚠️ NOT the intended solution — division is NOT allowed
def product_except_self_wrong(nums):
    total = 1
    for x in nums: total *= x
    return [total // x for x in nums]   # Also breaks on zeros!`,
        },
        {
          title: "Prefix × Suffix Arrays",
          emoji: "🔄",
          tag: "O(n) space",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "result[i] = (product of all left of i) × (product of all right of i). Build two arrays.",
          when: "Good solution, explain before the O(1) optimization.",
          code: `def product_except_self(nums):
    n = len(nums)
    prefix = [1] * n               # prefix[i] = product of nums[:i]
    suffix = [1] * n               # suffix[i] = product of nums[i+1:]
    for i in range(1, n):
        prefix[i] = prefix[i-1] * nums[i-1]
    for i in range(n-2, -1, -1):
        suffix[i] = suffix[i+1] * nums[i+1]
    return [prefix[i] * suffix[i] for i in range(n)]`,
        },
        {
          title: "O(1) Space — Two Passes",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1) extra",
          idea: "Use output array as prefix in first pass. In second pass, multiply by running suffix from the right.",
          when: "Best answer. Memorize this pattern.",
          code: `def product_except_self(nums):
    n = len(nums)
    result = [1] * n
    # Pass 1: result[i] = product of everything LEFT
    for i in range(1, n):
        result[i] = result[i-1] * nums[i-1]
    # Pass 2: multiply by product of everything RIGHT
    right = 1
    for i in range(n-1, -1, -1):
        result[i] *= right
        right *= nums[i]
    return result`,
        },
      ],
      ai: {
        hints: ["What do you need for each position? Left side product and right side product.", "Can you compute both without explicit arrays?"],
        followUps: ["Maximum Product Subarray", "Product of last k elements"],
        interviewQuestions: ["How do you handle zeros?", "What if there are two zeros?"],
      },
    },
    {
      name: "Trapping Rain Water",
      difficulty: "Hard",
      companies: ["Google", "Amazon", "Microsoft", "Goldman Sachs", "Uber"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/trapping-rain-water/", id: "#42" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/trapping-rain-water/", id: "Practice" },
        { name: "InterviewBit", url: "https://www.interviewbit.com/problems/trapping-rain-water/", id: "Practice" },
      ],
      statement: "Given heights of walls, compute how much water can be trapped after raining.",
      example: "[0,1,0,2,1,0,1,3,2,1,2,1] → 6 units of water",
      constraints: ["n ≥ 0", "Heights are non-negative integers"],
      approaches: [
        {
          title: "Brute Force",
          emoji: "🐢",
          tag: "O(n²)",
          complexity: "Time: O(n²) | Space: O(1)",
          idea: "For each bar: scan left for max, scan right for max. Water = min(max_l, max_r) - height[i].",
          when: "Never.",
          code: `def trap(height):
    n = len(height)
    water = 0
    for i in range(1, n-1):
        max_l = max(height[:i+1])
        max_r = max(height[i:])
        water += min(max_l, max_r) - height[i]
    return water`,
        },
        {
          title: "Prefix Max Arrays",
          emoji: "📊",
          tag: "O(n) space",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "Precompute max_left[i] and max_right[i]. water[i] = min(max_left[i], max_right[i]) - height[i].",
          when: "Good readable solution. Explain this first.",
          code: `def trap(height):
    n = len(height)
    max_l = [0]*n; max_r = [0]*n
    max_l[0] = height[0]
    for i in range(1, n):
        max_l[i] = max(max_l[i-1], height[i])
    max_r[n-1] = height[n-1]
    for i in range(n-2, -1, -1):
        max_r[i] = max(max_r[i+1], height[i])
    return sum(min(max_l[i], max_r[i]) - height[i] for i in range(n))`,
        },
        {
          title: "Two Pointer (Space Optimal)",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "The side with smaller max_wall determines water level. Process that side, move pointer inward. Two pointer handles both sides simultaneously.",
          when: "Best solution. Know this cold.",
          code: `def trap(height):
    left, right = 0, len(height)-1
    max_l = max_r = water = 0
    while left < right:
        if height[left] <= height[right]:
            if height[left] >= max_l: max_l = height[left]
            else: water += max_l - height[left]
            left += 1
        else:
            if height[right] >= max_r: max_r = height[right]
            else: water += max_r - height[right]
            right -= 1
    return water`,
        },
        {
          title: "Monotonic Stack",
          emoji: "📚",
          tag: "O(n) alternative",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "Use stack to track indices. When taller bar found, calculate water trapped by popped shorter bars.",
          when: "Alternative approach. Shows stack mastery.",
          code: `def trap(height):
    stack = []
    water = 0
    for i, h in enumerate(height):
        while stack and h > height[stack[-1]]:
            mid = stack.pop()
            if stack:
                bounded = min(h, height[stack[-1]]) - height[mid]
                water += bounded * (i - stack[-1] - 1)
        stack.append(i)
    return water`,
        },
      ],
      ai: {
        hints: ["How much water can position i hold?", "It depends on the tallest wall on both sides.", "Can you know the max without scanning both sides for every position?"],
        followUps: ["Container With Most Water", "Largest Rectangle in Histogram"],
        interviewQuestions: ["Why does the two-pointer work here?", "What's the connection to Container With Most Water?"],
      },
    },
  ],

  interviewTips: [
    "Always clarify: sorted or unsorted? Duplicates allowed? Return indices or values?",
    "State brute force first (O(n²)), then say 'Can we do better?' and optimize",
    "For subarray problems: think Sliding Window or Kadane's first",
    "For pair sum problems: think Two Pointer (sorted) or HashMap (unsorted)",
    "Edge cases to always check: empty array, single element, all negatives, all same",
    "Mention time and space complexity before and after optimization",
    "Draw the array on the whiteboard — visualize the pointers moving",
  ],

  mistakes: [
    "Off-by-one in two pointer: use left < right (not <=) when searching for pairs",
    "Forgetting arr[::-1] creates a COPY in Python — doesn't reverse in-place",
    "In Java: Arrays.sort() sorts in-place, Collections.sort() returns nothing",
    "JavaScript default sort() is lexicographic — always pass comparator for numbers",
    "Slicing in Python is O(k) time and O(k) space — not free!",
    "Kadane's fails for all-negative if initialized to 0 — use arr[0] or float('-inf')",
  ],

  quiz: [
    {
      q: "What is the time complexity of accessing arr[5] in an array?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      answer: 2,
      explanation: "Arrays store elements in contiguous memory. Index gives direct memory address calculation: base_address + index * element_size. This is O(1).",
    },
    {
      q: "You need to find if a pair with target sum exists in an UNSORTED array. Best approach?",
      options: ["Sort + Two Pointer O(n log n)", "HashMap O(n)", "Brute Force O(n²)", "Binary Search O(n log n)"],
      answer: 1,
      explanation: "HashMap stores each element as we scan. For each element, check if complement (target - element) exists in map. One pass = O(n).",
    },
    {
      q: "Which pattern is best for finding the maximum sum subarray of size k?",
      options: ["Two Pointer", "Sliding Window", "Prefix Sum", "Divide & Conquer"],
      answer: 1,
      explanation: "Fixed-size Sliding Window: compute first window sum, then slide right by adding new element and removing leftmost. O(n) time.",
    },
    {
      q: "arr.insert(0, val) in Python is O(?) time",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      answer: 2,
      explanation: "Inserting at the beginning requires shifting ALL existing elements one position right. This is O(n). Only appending to end is O(1) amortized.",
    },
    {
      q: "Kadane's algorithm starts with cur = arr[0], not cur = 0. Why?",
      options: [
        "It's just convention",
        "To handle all-negative arrays correctly",
        "To skip the first element",
        "No reason — cur = 0 works fine",
      ],
      answer: 1,
      explanation: "If all elements are negative (e.g., [-3,-1,-2]), the answer is -1 (least negative). Starting with cur=0 would wrongly return 0. Starting with arr[0] handles this correctly.",
    },
  ],

  practice_links: [
    { platform: "LeetCode Arrays", url: "https://leetcode.com/tag/array/", color: "bg-orange-500", problems: "300+ problems", recommended: true },
    { platform: "Striver's Array Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", color: "bg-indigo-600", problems: "Easy to Hard roadmap", recommended: true },
    { platform: "NeetCode Arrays", url: "https://neetcode.io/roadmap", color: "bg-violet-600", problems: "Curated 20 must-do" },
    { platform: "GFG Array Problems", url: "https://www.geeksforgeeks.org/array-data-structure/#standard-problems-on-array", color: "bg-green-600", problems: "Theory + practice" },
    { platform: "HackerRank Arrays", url: "https://www.hackerrank.com/domains/data-structures?filters%5Bsubdomains%5D%5B%5D=arrays", color: "bg-emerald-600", problems: "Beginner friendly" },
    { platform: "InterviewBit Arrays", url: "https://www.interviewbit.com/courses/programming/arrays/", color: "bg-blue-600", problems: "Interview focused" },
    { platform: "Codeforces Arrays", url: "https://codeforces.com/problemset?tags=arrays", color: "bg-red-500", problems: "Competitive level" },
  ],
};

export default arrays;



