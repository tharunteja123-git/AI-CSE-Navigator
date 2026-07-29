const twoPointers = {
  name: "Two Pointers",
  emoji: "👆👆",
  color: "bg-cyan-500",
  light: "bg-cyan-50",
  border: "border-cyan-200",
  text: "text-cyan-700",
  total: 30,

  definition: {
  short:
    "Two Pointers is an algorithmic technique that uses two indices or pointers to traverse a data structure simultaneously. It helps reduce nested-loop solutions from O(n²) to O(n) by intelligently moving one or both pointers.",

  analogy:
    "Imagine two people searching a bookshelf—one starts from the left end and the other from the right end. Instead of one person checking every book twice, both move toward each other until they find the answer.",

  properties: [
    "Usually reduces O(n²) to O(n)",
    "Works mainly on Arrays and Strings",
    "Often requires sorted input",
    "Uses constant extra memory O(1)",
    "Very common in coding interviews",
    "Easy to combine with Binary Search or Sliding Window"
  ],

  complexity: [
    {
      op: "Traversal",
      time: "O(n)",
      space: "O(1)"
    },
    {
      op: "Pair Search",
      time: "O(n)",
      space: "O(1)"
    },
    {
      op: "Palindrome Check",
      time: "O(n)",
      space: "O(1)"
    },
    {
      op: "Duplicate Removal",
      time: "O(n)",
      space: "O(1)"
    }
  ]
},

  learningObjectives: [
    "Understand what Two Pointers is and why it exists",
    "Master all 4 variants: Opposite Ends, Same Direction, Fast & Slow, Split & Merge",
    "Recognize which problems need Two Pointers vs other patterns",
    "Solve 30+ real interview problems from Easy to Hard with optimal solutions",
    "Implement Two Pointers cleanly in Python, JavaScript, Java, C++",
  ],

  prerequisites: ["Arrays basics", "Strings basics", "Sorting (some problems need sorted input)", "Basic Loops"],

  whyLearn: {
    importance: "Two Pointers converts O(n²) brute force into O(n) optimal in dozens of classic problems. It's one of the most frequently tested patterns — appearing in 35%+ of array/string interviews at top companies.",
    useCases: [
      "Finding pairs with target sum in a sorted array",
      "Removing duplicates from sorted array in-place",
      "Checking if a string is a palindrome",
      "Detecting cycles in linked lists (fast/slow pointer)",
      "Merging two sorted arrays or linked lists",
      "Trapping rain water in O(n) time",
      "Squaring a sorted array and keeping it sorted",
    ],
  },

  // ─────────────────────────────────────────────
  // FULL CONCEPT: BASIC TO ADVANCED
  // ─────────────────────────────────────────────
  concept: {
    intro: `Two Pointers is a technique where you use two variables (called pointers) to iterate through a data structure simultaneously. Instead of using nested loops (O(n²)), you move two pointers strategically to reduce the time complexity to O(n).

The key insight: in many problems, once you know something about the element at one pointer, you can decide which direction to move, eliminating the need to check all pairs.`,

    whyItWorks: `Imagine you have a sorted array and need to find two numbers that add up to a target.

Brute force: try every pair → O(n²)

With Two Pointers:
- Left pointer starts at the smallest element
- Right pointer starts at the largest element
- If sum < target: move left right (need larger sum)
- If sum > target: move right left (need smaller sum)
- If sum == target: found it!

Why does this work? Because the array is sorted — moving left right always increases the sum, moving right left always decreases it. We never need to backtrack both pointers, so we finish in O(n).`,

    levels: [
      // ─────────────── BEGINNER ───────────────
      {
        level: "Beginner",
        color: "bg-green-100 text-green-800",
        title: "Understanding Pointers and Why We Need Two",
        sections: [
          {
            heading: "What is a Pointer in Programming?",
            content: `In DSA, a pointer is just a variable that stores an INDEX into an array or string. It "points to" an element.

arr = [1, 3, 5, 7, 9]
        ↑              ↑
      left=0        right=4

left and right are just integer variables holding indices.
left = 0 means "I am looking at arr[0] which is 1"
right = 4 means "I am looking at arr[4] which is 9"`,
          },
          {
            heading: "The Problem with One Pointer (Brute Force)",
            content: `Let's say we want to find if any two numbers in a sorted array sum to 10.

arr = [1, 3, 5, 7, 9]

One pointer approach (nested loops):
for i in range(n):
    for j in range(i+1, n):
        if arr[i] + arr[j] == 10:
            return True

Pairs checked: (1,3), (1,5), (1,7), (1,9), (3,5), (3,7), (3,9), (5,7), (5,9), (7,9)
That's 10 pairs for 5 elements → O(n²)
For 10,000 elements: 50,000,000 checks!`,
          },
          {
            heading: "Two Pointers: The Smart Way",
            content: `With Two Pointers on the same sorted array:

arr = [1, 3, 5, 7, 9]
       ↑           ↑
     left=0     right=4

Step 1: arr[left]+arr[right] = 1+9 = 10 ✅ Found!

Even if we didn't find it immediately:
Step 1: sum = 1+9 = 10 → Found!

Another example: target = 12
Step 1: 1+9=10 < 12 → move left right
Step 2: 3+9=12 ✅ Found!

We checked only 2 pairs instead of 10!
This is O(n) — each pointer moves at most n times.`,
          },
          {
            heading: "The Golden Rule of Two Pointers",
            content: `TWO POINTERS WORKS WHEN:
1. The array/string is sorted (or can be sorted)
2. OR the data has a property where moving a pointer in one direction 
   monotonically increases or decreases some value

ALWAYS REMEMBER:
- left starts at 0 (or beginning)
- right starts at n-1 (or end)
- They move TOWARD each other (for opposite ends pattern)
- They NEVER cross (while left < right)
- Each pointer moves at most n times → O(n) total`,
          },
        ],
        code: `# Complete beginner example: Check if array has pair with target sum
# (Array MUST be sorted)

def has_pair_with_sum(arr, target):
    left = 0                          # Start at leftmost (smallest)
    right = len(arr) - 1              # Start at rightmost (largest)
    
    while left < right:               # Stop when pointers meet
        current_sum = arr[left] + arr[right]
        
        if current_sum == target:
            return True               # Found the pair!
        
        elif current_sum < target:
            left += 1                 # Sum too small, need larger number
                                      # Move left pointer RIGHT
        
        else:  # current_sum > target
            right -= 1                # Sum too large, need smaller number
                                      # Move right pointer LEFT
    
    return False                      # No pair found


# Test it:
arr = [1, 3, 5, 7, 9]
print(has_pair_with_sum(arr, 10))    # True  (1+9)
print(has_pair_with_sum(arr, 8))     # True  (1+7 or 3+5)
print(has_pair_with_sum(arr, 4))     # True  (1+3)
print(has_pair_with_sum(arr, 20))    # False

# Trace for target=8:
# left=0(1), right=4(9): 1+9=10 > 8  → right-- → right=3(7)
# left=0(1), right=3(7): 1+7=8 == 8  → FOUND!`,
      },

      // ─────────────── INTERMEDIATE ───────────────
      {
        level: "Intermediate",
        color: "bg-yellow-100 text-yellow-800",
        title: "The 4 Variants of Two Pointers",
        sections: [
          {
            heading: "Variant 1: Opposite Ends (Most Common)",
            content: `Both pointers start at opposite ends and MOVE TOWARD each other.

Use for:
✅ Pair sum problems (sorted array)
✅ Palindrome check
✅ Container with most water
✅ Trapping rain water (simplified)

Template:
left = 0, right = n-1
while left < right:
    process(arr[left], arr[right])
    if condition_to_move_left: left += 1
    elif condition_to_move_right: right -= 1
    else: handle_answer()`,
          },
          {
            heading: "Variant 2: Same Direction (Slow & Fast)",
            content: `Both pointers start at the same end (usually 0) and move in the SAME direction, but at different speeds.

Use for:
✅ Remove duplicates from sorted array
✅ Move zeros to end
✅ Remove elements by value
✅ Squares of sorted array

slow pointer: tracks where to WRITE next valid element
fast pointer: READS and scans ahead

Template:
slow = 0
for fast in range(n):
    if condition(arr[fast]):
        arr[slow] = arr[fast]   # write to slow
        slow += 1               # advance slow
# After loop: arr[0..slow-1] is the answer`,
          },
          {
            heading: "Variant 3: Fast & Slow Pointer (Floyd's)",
            content: `Typically used on LINKED LISTS. Slow moves 1 step, fast moves 2 steps.

Use for:
✅ Detect cycle in linked list
✅ Find middle of linked list
✅ Find start of cycle
✅ Palindrome linked list (find middle first)

Key property: If there's a cycle, fast will lap slow and they'll meet.
If no cycle, fast reaches null first.

Template:
slow = fast = head
while fast and fast.next:
    slow = slow.next           # 1 step
    fast = fast.next.next      # 2 steps
    if slow == fast:
        return True  # cycle!
return False`,
          },
          {
            heading: "Variant 4: Split & Merge (Two Arrays)",
            content: `Two pointers on TWO DIFFERENT arrays or two halves of the same array.

Use for:
✅ Merge two sorted arrays
✅ Intersection of two sorted arrays
✅ Merge step in merge sort
✅ Compare strings with backspaces

Template:
i = 0  # pointer for array A
j = 0  # pointer for array B
while i < len(A) and j < len(B):
    if A[i] < B[j]:
        process(A[i]); i += 1
    elif A[i] > B[j]:
        process(B[j]); j += 1
    else:
        process_both(); i += 1; j += 1
# Handle remaining elements`,
          },
        ],
        code: `# Variant 1: Opposite Ends — Palindrome Check
def is_palindrome(s):
    # Clean: keep only alphanumeric, make lowercase
    s = ''.join(c.lower() for c in s if c.isalnum())
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True

# Test:
print(is_palindrome("A man a plan a canal Panama"))  # True
print(is_palindrome("race a car"))                   # False


# Variant 2: Same Direction — Remove Duplicates from Sorted Array
def remove_duplicates(nums):
    if not nums: return 0
    slow = 0                              # slow: next write position
    for fast in range(1, len(nums)):      # fast: scans ahead
        if nums[fast] != nums[slow]:      # found new unique element
            slow += 1
            nums[slow] = nums[fast]       # write it
    return slow + 1                       # length of unique portion

# Test:
nums = [1, 1, 2, 3, 3, 4]
k = remove_duplicates(nums)
print(nums[:k])  # [1, 2, 3, 4]


# Variant 3: Fast & Slow — Find Middle of Linked List
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next         # 1 step
        fast = fast.next.next    # 2 steps
    return slow                  # slow is at middle


# Variant 4: Two Arrays — Merge Two Sorted Arrays
def merge_sorted(arr1, arr2):
    result = []
    i = j = 0
    while i < len(arr1) and j < len(arr2):
        if arr1[i] <= arr2[j]:
            result.append(arr1[i]); i += 1
        else:
            result.append(arr2[j]); j += 1
    result.extend(arr1[i:])     # remaining from arr1
    result.extend(arr2[j:])     # remaining from arr2
    return result

# Test:
print(merge_sorted([1,3,5,7], [2,4,6,8]))  # [1,2,3,4,5,6,7,8]`,
      },

      // ─────────────── ADVANCED ───────────────
      {
        level: "Advanced",
        color: "bg-red-100 text-red-800",
        title: "Advanced Patterns and Tricky Variations",
        sections: [
          {
            heading: "3Sum and kSum: Reducing to Two Pointers",
            content: `3Sum: Find all triplets that sum to 0.
Key insight: Fix one element, then use Two Pointers on remaining sorted array.

Time: O(n²) — much better than O(n³) brute force.

Algorithm:
1. Sort the array
2. For each index i (fix arr[i] as first element):
   a. Use Two Pointers from i+1 and n-1
   b. Find pairs that sum to -arr[i]
   c. Skip duplicates carefully

4Sum: Fix TWO elements (two nested loops), then Two Pointers → O(n³)
kSum: Recursively reduce to (k-1)Sum → O(n^(k-1))`,
          },
          {
            heading: "Two Pointers with Multiple Conditions",
            content: `Sometimes moving a pointer depends on more than one condition.
Example: Valid Palindrome II (can delete one character)

Strategy: 
When mismatch found, try BOTH options:
- Skip left char: check if s[left+1..right] is palindrome
- Skip right char: check if s[left..right-1] is palindrome

If either works → return True

This shows Two Pointers can handle "optional" operations.`,
          },
          {
            heading: "Two Pointers on Linked Lists: Advanced",
            content: `Finding the start of cycle (Floyd's Phase 2):

Phase 1: Detect cycle
- slow and fast meet at some point inside cycle

Phase 2: Find cycle start
- Reset slow to head
- Move BOTH slow and fast ONE step at a time
- Where they meet = start of cycle

PROOF: Let F = steps to cycle start, C = cycle length, h = steps ahead in cycle when they meet.
When they first meet: slow took F+h steps, fast took 2(F+h)
Extra steps of fast in cycle: F+h ≡ 0 (mod C)
Resetting slow to head: after F more steps, slow reaches cycle start.
Fast also travels F more steps from meeting point → reaches cycle start.`,
          },
          {
            heading: "When NOT to Use Two Pointers",
            content: `Two Pointers does NOT work when:
❌ Array is unsorted AND sorting would lose needed information (indices)
   → Use HashMap instead (Two Sum problem)
❌ You need all intermediate positions, not just endpoints
   → Use Sliding Window
❌ Problem requires accessing more than 2 elements simultaneously
   → Consider different approach
❌ Elements aren't comparable in a meaningful order
   → Two Pointers won't give useful movement decisions

DECISION TREE:
Need pair/triplet? → Sorted? → Yes → Two Pointers
                             → No  → HashMap (for pairs)
                                     or Sort+TwoPointers (if indices don't matter)
Need subarray? → Sliding Window (more powerful)
Need middle/cycle? → Fast & Slow on linked list`,
          },
          {
            heading: "Optimizations and Edge Cases",
            content: `ALWAYS handle these edge cases:
1. Empty array/string → return immediately
2. Single element → may not need both pointers
3. All duplicates → test skip logic carefully
4. Already sorted → opposite ends works immediately
5. All same sign numbers → target sum may be impossible

OPTIMIZATIONS:
- Skip duplicates after finding answer (for 3Sum, 4Sum)
- Early termination: if arr[left]*3 > target (3Sum), break outer loop
- For 3Sum: if arr[i] > 0 and target = 0, break (all remaining sums > 0)
- Use sorted() strategically — sometimes sorting + Two Pointers beats HashMap even for pairs`,
          },
        ],
        code: `# Advanced Example 1: 3Sum — All Triplets Summing to Zero
def three_sum(nums):
    nums.sort()                           # MUST sort first
    result = []
    
    for i in range(len(nums) - 2):
        # Optimization: if smallest > 0, no triplet can sum to 0
        if nums[i] > 0: break
        
        # Skip duplicate values for i
        if i > 0 and nums[i] == nums[i-1]: continue
        
        # Two Pointers on rest of array
        left, right = i + 1, len(nums) - 1
        
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            
            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                # Skip duplicates for left and right
                while left < right and nums[left] == nums[left+1]: left += 1
                while left < right and nums[right] == nums[right-1]: right -= 1
                left += 1; right -= 1
            
            elif total < 0:
                left += 1          # Need larger sum
            else:
                right -= 1         # Need smaller sum
    
    return result

# Test:
print(three_sum([-1,0,1,2,-1,-4]))  # [[-1,-1,2],[-1,0,1]]
print(three_sum([0,0,0]))            # [[0,0,0]]
print(three_sum([1,2,3]))            # []


# Advanced Example 2: Find Cycle Start in Linked List (Floyd Phase 2)
def detect_cycle_start(head):
    slow = fast = head
    
    # Phase 1: Detect cycle
    cycle_exists = False
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            cycle_exists = True
            break
    
    if not cycle_exists:
        return None
    
    # Phase 2: Find cycle start
    slow = head                    # Reset slow to head
    while slow != fast:            # Move BOTH one step
        slow = slow.next
        fast = fast.next
    
    return slow                    # Both point to cycle start


# Advanced Example 3: 4Sum — All Quadruplets
def four_sum(nums, target):
    nums.sort()
    result = []
    n = len(nums)
    
    for i in range(n - 3):
        if i > 0 and nums[i] == nums[i-1]: continue  # skip i duplicates
        
        for j in range(i+1, n - 2):
            if j > i+1 and nums[j] == nums[j-1]: continue  # skip j duplicates
            
            left, right = j+1, n-1
            while left < right:
                total = nums[i] + nums[j] + nums[left] + nums[right]
                if total == target:
                    result.append([nums[i], nums[j], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left+1]: left += 1
                    while left < right and nums[right] == nums[right-1]: right -= 1
                    left += 1; right -= 1
                elif total < target:
                    left += 1
                else:
                    right -= 1
    return result

# Test:
print(four_sum([1,0,-1,0,-2,2], 0))  # [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LANGUAGES: Complete reference
  // ─────────────────────────────────────────────
  languages: [
    {
      lang: "Python",
      emoji: "🐍",
      color: "bg-blue-100 text-blue-800",
      syntax: `# Python — Two Pointers Complete Reference

# ─────────────────────────────────────────
# PATTERN 1: OPPOSITE ENDS
# ─────────────────────────────────────────

# Template
def opposite_ends_template(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        val = arr[left] + arr[right]   # or any operation
        if val == target:
            return [left, right]
        elif val < target:
            left += 1
        else:
            right -= 1
    return []

# Palindrome check
def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True

# Reverse array in place
def reverse_array(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr

# ─────────────────────────────────────────
# PATTERN 2: SAME DIRECTION
# ─────────────────────────────────────────

# Template
def same_direction_template(arr):
    slow = 0
    for fast in range(len(arr)):
        if valid(arr[fast]):          # define your condition
            arr[slow] = arr[fast]
            slow += 1
    return slow                       # length of result

# Move zeros to end (maintain relative order)
def move_zeros(nums):
    slow = 0
    for fast in range(len(nums)):
        if nums[fast] != 0:           # non-zero: write to slow
            nums[slow] = nums[fast]
            slow += 1
    # Fill remaining with zeros
    while slow < len(nums):
        nums[slow] = 0
        slow += 1
    return nums

# Remove specific element
def remove_element(nums, val):
    slow = 0
    for fast in range(len(nums)):
        if nums[fast] != val:
            nums[slow] = nums[fast]
            slow += 1
    return slow

# Squares of sorted array (still sorted)
def sorted_squares(nums):
    n = len(nums)
    result = [0] * n
    left, right = 0, n - 1
    pos = n - 1                        # fill from the end (largest first)
    while left <= right:
        l_sq = nums[left] ** 2
        r_sq = nums[right] ** 2
        if l_sq > r_sq:
            result[pos] = l_sq; left += 1
        else:
            result[pos] = r_sq; right -= 1
        pos -= 1
    return result

# ─────────────────────────────────────────
# PATTERN 3: FAST & SLOW (LINKED LIST)
# ─────────────────────────────────────────

def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast: return True
    return False

def middle_of_list(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow

# ─────────────────────────────────────────
# PATTERN 4: TWO ARRAYS
# ─────────────────────────────────────────

def intersect_sorted(a, b):
    i = j = 0; result = []
    while i < len(a) and j < len(b):
        if a[i] == b[j]: result.append(a[i]); i += 1; j += 1
        elif a[i] < b[j]: i += 1
        else: j += 1
    return result

# ─────────────────────────────────────────
# TIPS FOR PYTHON
# ─────────────────────────────────────────
# Use enumerate() when you need index + value
# list[::-1] reverses but creates copy (not in-place)
# For in-place palindrome: compare s[i] and s[~i]  (~i = -i-1)
def is_palindrome_v2(s):
    return all(s[i] == s[~i] for i in range(len(s)//2))`,
    },
    {
      lang: "JavaScript",
      emoji: "🟨",
      color: "bg-yellow-100 text-yellow-800",
      syntax: `// JavaScript — Two Pointers Complete Reference

// ─────────────────────────────────────────
// PATTERN 1: OPPOSITE ENDS
// ─────────────────────────────────────────

// Pair with target sum (sorted array)
function twoSum(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target)  return [left, right];
        else if (sum < target) left++;
        else right--;
    }
    return [];
}

// Palindrome check
function isPalindrome(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++; right--;
    }
    return true;
}

// Reverse array in place
function reverseArray(arr) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++; right--;
    }
    return arr;
}

// Container with most water
function maxArea(height) {
    let left = 0, right = height.length - 1, best = 0;
    while (left < right) {
        const h = Math.min(height[left], height[right]);
        best = Math.max(best, h * (right - left));
        if (height[left] < height[right]) left++;
        else right--;
    }
    return best;
}

// ─────────────────────────────────────────
// PATTERN 2: SAME DIRECTION
// ─────────────────────────────────────────

// Remove duplicates from sorted array
function removeDuplicates(nums) {
    if (!nums.length) return 0;
    let slow = 0;
    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    return slow + 1;
}

// Move zeros to end
function moveZeroes(nums) {
    let slow = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            nums[slow] = nums[fast];
            slow++;
        }
    }
    while (slow < nums.length) nums[slow++] = 0;
    return nums;
}

// Squares of sorted array
function sortedSquares(nums) {
    const n = nums.length;
    const result = new Array(n);
    let left = 0, right = n - 1, pos = n - 1;
    while (left <= right) {
        const lSq = nums[left] ** 2;
        const rSq = nums[right] ** 2;
        if (lSq > rSq) { result[pos--] = lSq; left++; }
        else            { result[pos--] = rSq; right--; }
    }
    return result;
}

// ─────────────────────────────────────────
// 3SUM — ADVANCED
// ─────────────────────────────────────────
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] > 0) break;                  // optimization
        if (i > 0 && nums[i] === nums[i-1]) continue; // skip duplicates
        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left+1]) left++;
                while (left < right && nums[right] === nums[right-1]) right--;
                left++; right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    return result;
}`,
    },
    {
      lang: "Java",
      emoji: "☕",
      color: "bg-orange-100 text-orange-800",
      syntax: `// Java — Two Pointers Complete Reference

// ─────────────────────────────────────────
// PATTERN 1: OPPOSITE ENDS
// ─────────────────────────────────────────

// Two Sum II (sorted array)
public int[] twoSum(int[] numbers, int target) {
    int left = 0, right = numbers.length - 1;
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target)       return new int[]{left+1, right+1};
        else if (sum < target)   left++;
        else                     right--;
    }
    return new int[]{};
}

// Valid Palindrome
public boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        while (left < right && !Character.isLetterOrDigit(s.charAt(left)))
            left++;
        while (left < right && !Character.isLetterOrDigit(s.charAt(right)))
            right--;
        if (Character.toLowerCase(s.charAt(left)) !=
            Character.toLowerCase(s.charAt(right)))
            return false;
        left++; right--;
    }
    return true;
}

// Reverse string in place
public void reverseString(char[] s) {
    int left = 0, right = s.length - 1;
    while (left < right) {
        char temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++; right--;
    }
}

// ─────────────────────────────────────────
// PATTERN 2: SAME DIRECTION
// ─────────────────────────────────────────

// Remove duplicates from sorted array
public int removeDuplicates(int[] nums) {
    if (nums.length == 0) return 0;
    int slow = 0;
    for (int fast = 1; fast < nums.length; fast++) {
        if (nums[fast] != nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    return slow + 1;
}

// Move zeros to end
public void moveZeroes(int[] nums) {
    int slow = 0;
    for (int fast = 0; fast < nums.length; fast++) {
        if (nums[fast] != 0) {
            nums[slow++] = nums[fast];
        }
    }
    while (slow < nums.length) nums[slow++] = 0;
}

// Sorted squares
public int[] sortedSquares(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    int left = 0, right = n - 1, pos = n - 1;
    while (left <= right) {
        int lSq = nums[left] * nums[left];
        int rSq = nums[right] * nums[right];
        if (lSq > rSq) { result[pos--] = lSq; left++;  }
        else            { result[pos--] = rSq; right--; }
    }
    return result;
}

// ─────────────────────────────────────────
// 3SUM
// ─────────────────────────────────────────
public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
        if (nums[i] > 0) break;
        if (i > 0 && nums[i] == nums[i-1]) continue;
        int left = i+1, right = nums.length-1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                while (left<right && nums[left]==nums[left+1]) left++;
                while (left<right && nums[right]==nums[right-1]) right--;
                left++; right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    return result;
}

// ─────────────────────────────────────────
// FAST & SLOW — LINKED LIST
// ─────────────────────────────────────────
public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}

public ListNode findMiddle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}`,
    },
    {
      lang: "C++",
      emoji: "⚙️",
      color: "bg-purple-100 text-purple-800",
      syntax: `// C++ — Two Pointers Complete Reference
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

// ─────────────────────────────────────────
// PATTERN 1: OPPOSITE ENDS
// ─────────────────────────────────────────

// Two Sum (sorted array)
vector<int> twoSum(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target)       return {left+1, right+1};
        else if (sum < target)   left++;
        else                     right--;
    }
    return {};
}

// Valid Palindrome
bool isPalindrome(string s) {
    int left = 0, right = s.size() - 1;
    while (left < right) {
        while (left < right && !isalnum(s[left]))  left++;
        while (left < right && !isalnum(s[right])) right--;
        if (tolower(s[left]) != tolower(s[right])) return false;
        left++; right--;
    }
    return true;
}

// Reverse string in place
void reverseString(vector<char>& s) {
    int left = 0, right = s.size() - 1;
    while (left < right) {
        swap(s[left++], s[right--]);
    }
}

// Container with most water
int maxArea(vector<int>& height) {
    int left = 0, right = height.size()-1, best = 0;
    while (left < right) {
        int h = min(height[left], height[right]);
        best = max(best, h * (right - left));
        if (height[left] < height[right]) left++;
        else right--;
    }
    return best;
}

// ─────────────────────────────────────────
// PATTERN 2: SAME DIRECTION
// ─────────────────────────────────────────

// Remove duplicates
int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    int slow = 0;
    for (int fast = 1; fast < nums.size(); fast++) {
        if (nums[fast] != nums[slow]) {
            nums[++slow] = nums[fast];
        }
    }
    return slow + 1;
}

// Move zeros
void moveZeroes(vector<int>& nums) {
    int slow = 0;
    for (int fast = 0; fast < nums.size(); fast++) {
        if (nums[fast] != 0) nums[slow++] = nums[fast];
    }
    while (slow < nums.size()) nums[slow++] = 0;
}

// Sorted squares
vector<int> sortedSquares(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n);
    int left = 0, right = n-1, pos = n-1;
    while (left <= right) {
        int lSq = nums[left]*nums[left];
        int rSq = nums[right]*nums[right];
        if (lSq > rSq) { result[pos--] = lSq; left++;  }
        else            { result[pos--] = rSq; right--; }
    }
    return result;
}

// ─────────────────────────────────────────
// 3SUM — ADVANCED
// ─────────────────────────────────────────
vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    int n = nums.size();
    for (int i = 0; i < n-2; i++) {
        if (nums[i] > 0) break;
        if (i > 0 && nums[i] == nums[i-1]) continue;
        int left = i+1, right = n-1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.push_back({nums[i], nums[left], nums[right]});
                while (left<right && nums[left]==nums[left+1]) left++;
                while (left<right && nums[right]==nums[right-1]) right--;
                left++; right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    return result;
}

// ─────────────────────────────────────────
// FAST & SLOW — LINKED LIST
// ─────────────────────────────────────────
bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}

ListNode* findMiddle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}`,
    },
  ],

  // ─────────────────────────────────────────────
  // PATTERNS REFERENCE
  // ─────────────────────────────────────────────
  patterns: [
    {
      name: "Opposite Ends",
      emoji: "↔️",
      color: "bg-blue-50 border-blue-200",
      titleColor: "text-blue-800",
      when: "Sorted array, find pair/triplet with target sum, palindrome, water container",
      avoid: "Unsorted arrays where order cannot be restored (use HashMap for pairs instead)",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      steps: [
        "Set left=0, right=n-1",
        "Compute value using arr[left] and arr[right]",
        "If value too small: left++ (need larger)",
        "If value too large: right-- (need smaller)",
        "Stop when left >= right",
      ],
      template: `def opposite_ends(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        val = arr[left] + arr[right]
        if val == target:
            return [left, right]        # Found answer
        elif val < target:
            left += 1                   # Need bigger → move left right
        else:
            right -= 1                  # Need smaller → move right left
    return []`,
    },
    {
      name: "Same Direction (Slow & Fast)",
      emoji: "→→",
      color: "bg-green-50 border-green-200",
      titleColor: "text-green-800",
      when: "Remove duplicates/elements in-place, move zeros, partition array, find subarray",
      avoid: "When you need to compare elements far apart or in reverse",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      steps: [
        "slow=0 (write position), fast=0 (read position)",
        "fast scans ALL elements",
        "When arr[fast] meets condition: write to arr[slow], slow++",
        "Array[0..slow-1] = result after loop",
      ],
      template: `def same_direction(arr):
    slow = 0                            # write pointer
    for fast in range(len(arr)):        # read pointer
        if should_keep(arr[fast]):      # your condition
            arr[slow] = arr[fast]       # write valid element
            slow += 1                   # advance write head
    return slow                         # count of valid elements`,
    },
    {
      name: "Fast & Slow (Floyd's)",
      emoji: "🐢🐇",
      color: "bg-purple-50 border-purple-200",
      titleColor: "text-purple-800",
      when: "Linked list cycle detection/start, find middle of list, palindrome linked list",
      avoid: "Arrays (use index arithmetic instead). Non-linked sequential structures.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      steps: [
        "slow = fast = head",
        "slow moves 1 step, fast moves 2 steps each iteration",
        "If they meet → cycle exists",
        "To find middle: when fast reaches end, slow is at middle",
        "To find cycle start: reset slow to head, move both 1 step",
      ],
      template: `def fast_slow(head):
    slow = fast = head
    # Phase 1: detect meeting point
    while fast and fast.next:
        slow = slow.next          # 1 step
        fast = fast.next.next     # 2 steps
        if slow == fast:
            break                 # met inside cycle
    else:
        return None               # no cycle
    # Phase 2: find cycle start
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next
    return slow                   # cycle start node`,
    },
    {
      name: "Two Arrays Merge",
      emoji: "🔀",
      color: "bg-yellow-50 border-yellow-200",
      titleColor: "text-yellow-800",
      when: "Merge two sorted arrays/lists, find intersection/union, compare two sequences",
      avoid: "Unsorted arrays — sort them first",
      timeComplexity: "O(n + m)",
      spaceComplexity: "O(n + m) for result, O(1) if merging in-place",
      steps: [
        "i=0 for first array, j=0 for second array",
        "Compare arr1[i] and arr2[j]",
        "Process smaller (or equal) element, advance that pointer",
        "After one array exhausted, append rest of other",
      ],
      template: `def merge_two(arr1, arr2):
    result = []
    i = j = 0
    while i < len(arr1) and j < len(arr2):
        if arr1[i] <= arr2[j]:
            result.append(arr1[i]); i += 1
        else:
            result.append(arr2[j]); j += 1
    result.extend(arr1[i:])       # remaining from arr1
    result.extend(arr2[j:])       # remaining from arr2
    return result`,
    },
  ],

  // ─────────────────────────────────────────────
  // PROBLEMS: ALL with multiple approaches
  // ─────────────────────────────────────────────
  problems: [
    {
      name: "Two Sum II (Sorted Array)",
      difficulty: "Easy",
      companies: ["Amazon", "Microsoft", "Bloomberg", "Adobe"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", id: "#167" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/two-pointers-technique/", id: "Practice" },
      ],
      statement: "Given a 1-indexed sorted array, find two numbers that add up to target. Return their indices.",
      example: "[2,7,11,15], target=9 → [1,2]",
      constraints: ["Array is sorted ascending", "Exactly one solution exists", "Can't use same element twice"],
      approaches: [
        {
          title: "Brute Force — Try All Pairs",
          emoji: "🐢",
          tag: "O(n²)",
          complexity: "Time: O(n²) | Space: O(1)",
          idea: "Try every pair. Works but wasteful on sorted data.",
          when: "Never. Show to establish baseline.",
          code: `def two_sum_brute(numbers, target):
    n = len(numbers)
    for i in range(n):
        for j in range(i+1, n):
            if numbers[i] + numbers[j] == target:
                return [i+1, j+1]   # 1-indexed`,
        },
        {
          title: "Binary Search for Complement",
          emoji: "🔍",
          tag: "O(n log n)",
          complexity: "Time: O(n log n) | Space: O(1)",
          idea: "For each element, binary search for its complement in the remaining array.",
          when: "Good step toward optimal. Shows binary search knowledge.",
          code: `def two_sum_bs(numbers, target):
    import bisect
    for i in range(len(numbers)):
        complement = target - numbers[i]
        j = bisect.bisect_left(numbers, complement, i+1)
        if j < len(numbers) and numbers[j] == complement:
            return [i+1, j+1]`,
        },
        {
          title: "Two Pointers — Optimal",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Left at index 1, right at end. If sum too small → left++. If sum too big → right--. The sorted property guarantees we never miss the answer.",
          when: "Always. This is THE answer for sorted arrays.",
          code: `def two_sum(numbers, target):
    left, right = 0, len(numbers) - 1
    while left < right:
        s = numbers[left] + numbers[right]
        if s == target:
            return [left+1, right+1]   # 1-indexed
        elif s < target:
            left += 1                  # need larger sum
        else:
            right -= 1                 # need smaller sum`,
        },
      ],
      ai: {
        hints: ["The array is sorted — what does that tell you about moving each pointer?", "If sum is too small, which pointer should move and why?"],
        followUps: ["Two Sum (unsorted → HashMap)", "3Sum", "4Sum", "Two Sum IV (BST)"],
        interviewQuestions: ["Why can't we use HashMap here?", "What if the array had duplicates?"],
      },
    },

    {
      name: "Valid Palindrome",
      difficulty: "Easy",
      companies: ["Facebook", "Microsoft", "Apple", "Amazon"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/valid-palindrome/", id: "#125" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/check-if-a-string-is-palindrome/", id: "Practice" },
      ],
      statement: "Given string, return true if it's a palindrome considering only alphanumeric characters (ignore case).",
      example: '"A man, a plan, a canal: Panama" → true | "race a car" → false',
      constraints: ["Only consider alphanumeric chars", "Case-insensitive"],
      approaches: [
        {
          title: "Reverse and Compare",
          emoji: "🔄",
          tag: "O(n) space",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "Clean the string, reverse it, compare.",
          when: "Simple but uses extra space.",
          code: `def is_palindrome(s):
    clean = ''.join(c.lower() for c in s if c.isalnum())
    return clean == clean[::-1]`,
        },
        {
          title: "Two Pointers — Optimal",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Left and right pointers skip non-alphanumeric chars. Compare remaining chars. Stop when mismatch found.",
          when: "Best — O(1) space, in-place.",
          code: `def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        # Skip non-alphanumeric from left
        while left < right and not s[left].isalnum():
            left += 1
        # Skip non-alphanumeric from right
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True`,
        },
      ],
      ai: {
        hints: ["What characters should you ignore?", "Can you skip them in-place without creating a new string?"],
        followUps: ["Valid Palindrome II (one deletion allowed)", "Palindrome Linked List", "Longest Palindromic Substring"],
        interviewQuestions: ["What if you can delete exactly one character?", "Handle Unicode characters?"],
      },
    },

    {
      name: "Remove Duplicates from Sorted Array",
      difficulty: "Easy",
      companies: ["Amazon", "Microsoft", "Google", "Adobe"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/", id: "#26" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/remove-duplicates-sorted-array/", id: "Practice" },
      ],
      statement: "Remove duplicates in-place from sorted array. Return count of unique elements k. First k elements must contain unique values.",
      example: "[1,1,2,3,3,4] → k=4, nums=[1,2,3,4,...]",
      constraints: ["Must be in-place", "Relative order must be maintained", "Array is sorted"],
      approaches: [
        {
          title: "HashSet (Wrong approach for in-place)",
          emoji: "🚫",
          tag: "Violates constraint",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "Store unique elements in set. Wrong — violates in-place constraint.",
          when: "Never — understand why this is wrong.",
          code: `# ⚠️ VIOLATES in-place constraint
def remove_duplicates_wrong(nums):
    seen = set()
    result = []
    for x in nums:
        if x not in seen:
            result.append(x)
            seen.add(x)
    nums[:len(result)] = result
    return len(result)`,
        },
        {
          title: "Same Direction Two Pointers — Optimal",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "slow pointer is the last written unique position. fast pointer scans ahead. When fast finds a new value (different from slow), write it to slow+1 and advance slow.",
          when: "Always. Classic slow-fast pointer.",
          code: `def remove_duplicates(nums):
    if not nums: return 0
    slow = 0                              # last written position
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:      # found new unique value
            slow += 1
            nums[slow] = nums[fast]       # write to next position
    return slow + 1                       # count of unique elements

# Trace on [1,1,2,3,3,4]:
# slow=0(1), fast=1(1): same → skip
# slow=0(1), fast=2(2): diff → slow=1, nums[1]=2 → [1,2,2,3,3,4]
# slow=1(2), fast=3(3): diff → slow=2, nums[2]=3 → [1,2,3,3,3,4]
# slow=2(3), fast=4(3): same → skip
# slow=2(3), fast=5(4): diff → slow=3, nums[3]=4 → [1,2,3,4,3,4]
# Return slow+1 = 4`,
        },
      ],
      ai: {
        hints: ["The array is sorted so duplicates are adjacent.", "slow pointer: where to write. fast pointer: what to read."],
        followUps: ["Remove Duplicates II (allow at most 2)", "Remove Element by Value", "Move Zeros"],
        interviewQuestions: ["What if duplicates can appear at most twice?", "Why does this only work on sorted arrays?"],
      },
    },

    {
      name: "Move Zeroes",
      difficulty: "Easy",
      companies: ["Facebook", "Amazon", "Bloomberg"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/move-zeroes/", id: "#283" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/move-zeroes-end-array/", id: "Practice" },
      ],
      statement: "Move all zeroes to end while maintaining relative order of non-zero elements. Do it in-place.",
      example: "[0,1,0,3,12] → [1,3,12,0,0]",
      constraints: ["In-place", "Maintain relative order of non-zeros", "Minimize total operations"],
      approaches: [
        {
          title: "Copy Non-Zeros then Fill",
          emoji: "📋",
          tag: "Simple",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Two passes: first move all non-zeros left, then fill rest with zeros.",
          when: "Simple and correct. Mention before optimized version.",
          code: `def move_zeroes(nums):
    slow = 0
    # Pass 1: move non-zeros to front
    for fast in range(len(nums)):
        if nums[fast] != 0:
            nums[slow] = nums[fast]
            slow += 1
    # Pass 2: fill rest with zeros
    while slow < len(nums):
        nums[slow] = 0
        slow += 1`,
        },
        {
          title: "Optimal — Single Pass Swap",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "When non-zero found, swap it with position at slow pointer. This avoids the second pass and minimizes writes (only swap when slow != fast).",
          when: "Best — single pass, minimizes total operations.",
          code: `def move_zeroes_optimal(nums):
    slow = 0
    for fast in range(len(nums)):
        if nums[fast] != 0:
            # Only swap if pointers differ (avoids unnecessary swaps)
            if slow != fast:
                nums[slow], nums[fast] = nums[fast], nums[slow]
            slow += 1

# Trace on [0,1,0,3,12]:
# fast=0(0): zero → skip. slow=0
# fast=1(1): non-zero → swap [1,0,0,3,12]. slow=1
# fast=2(0): zero → skip. slow=1
# fast=3(3): non-zero → swap [1,3,0,0,12]. slow=2
# fast=4(12):non-zero → swap [1,3,12,0,0]. slow=3
# Result: [1,3,12,0,0] ✅`,
        },
      ],
      ai: {
        hints: ["Think of slow as 'next position for a non-zero element'", "What's the difference between write-and-fill vs swap approach?"],
        followUps: ["Remove Duplicates", "Remove Element", "Sort Colors"],
        interviewQuestions: ["Why minimize total operations?", "What if we don't care about order?"],
      },
    },

    {
      name: "3Sum — All Triplets",
      difficulty: "Medium",
      companies: ["Amazon", "Facebook", "Google", "Microsoft", "Apple"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/3sum/", id: "#15" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/find-a-triplet-that-sum-to-a-given-value/", id: "Practice" },
        { name: "InterviewBit", url: "https://www.interviewbit.com/problems/3-sum/", id: "Practice" },
      ],
      statement: "Find all unique triplets in the array that sum to zero.",
      example: "[-1,0,1,2,-1,-4] → [[-1,-1,2],[-1,0,1]]",
      constraints: ["No duplicate triplets in answer", "Elements can repeat in input", "Return all triplets"],
      approaches: [
        {
          title: "Brute Force — Try All Triplets",
          emoji: "🐢",
          tag: "O(n³)",
          complexity: "Time: O(n³) | Space: O(n) for result",
          idea: "Three nested loops. Check every combination. Use set to avoid duplicates.",
          when: "Never. Understand to appreciate the optimization.",
          code: `def three_sum_brute(nums):
    result = set()
    n = len(nums)
    for i in range(n):
        for j in range(i+1, n):
            for k in range(j+1, n):
                if nums[i]+nums[j]+nums[k] == 0:
                    result.add(tuple(sorted([nums[i],nums[j],nums[k]])))
    return [list(t) for t in result]`,
        },
        {
          title: "Sort + Two Pointers — Optimal",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n²) | Space: O(n) for sorting",
          idea: "Sort first. Fix i, use Two Pointers from i+1 to n-1. Skip duplicates carefully at each level to avoid duplicate triplets.",
          when: "Always. This is THE standard answer.",
          code: `def three_sum(nums):
    nums.sort()                               # Step 1: Sort
    result = []
    
    for i in range(len(nums) - 2):
        # Optimization: if smallest > 0, all sums will be > 0
        if nums[i] > 0: break
        
        # Skip duplicate for i (avoid duplicate triplets)
        if i > 0 and nums[i] == nums[i-1]: continue
        
        # Two Pointers for remaining subarray
        left, right = i+1, len(nums)-1
        
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            
            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                # Skip duplicates for left
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                # Skip duplicates for right
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                left += 1                     # Move both after finding answer
                right -= 1
            elif total < 0:
                left += 1                     # Need larger sum
            else:
                right -= 1                    # Need smaller sum
    
    return result

# Trace on [-4,-1,-1,0,1,2] (sorted):
# i=0(-4): left=1(-1), right=5(2): -4-1+2=-3<0 → left++
#           left=2(-1), right=5(2): -4-1+2=-3<0 → left++
#           left=3(0),  right=5(2): -4+0+2=-2<0 → left++
#           ... continues until left>=right
# i=1(-1): skip if nums[1]==nums[0]? No.
#   left=2(-1), right=5(2): -1-1+2=0 ✅ add [-1,-1,2]
#   left=3(0),  right=4(1): -1+0+1=0  ✅ add [-1,0,1]
# i=2(-1): nums[2]==nums[1] → skip`,
        },
      ],
      ai: {
        hints: [
          "Sort first — this allows Two Pointers and easy duplicate skipping",
          "After finding a valid triplet, you must advance BOTH pointers",
          "Duplicate skipping: skip while next value same as current",
        ],
        followUps: ["3Sum Closest", "3Sum Smaller", "4Sum", "4Sum II"],
        interviewQuestions: [
          "How do you avoid duplicate triplets?",
          "What's the time complexity and can you do better?",
          "What if target is not 0?",
        ],
      },
    },

    {
      name: "Container With Most Water",
      difficulty: "Medium",
      companies: ["Google", "Amazon", "Adobe", "Uber", "Apple"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/container-with-most-water/", id: "#11" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/container-with-most-water/", id: "Practice" },
      ],
      statement: "Given n heights, find two lines that together form a container holding the most water. Return max water volume.",
      example: "[1,8,6,2,5,4,8,3,7] → 49 (lines at index 1 and 8, min height 7, width 7)",
      constraints: ["n ≥ 2", "Cannot slant the container", "Water = min(h[l], h[r]) × (r-l)"],
      approaches: [
        {
          title: "Brute Force",
          emoji: "🐢",
          tag: "O(n²)",
          complexity: "Time: O(n²) | Space: O(1)",
          idea: "Try every pair of lines.",
          when: "Never. Just shows the O(n²) baseline.",
          code: `def max_area_brute(height):
    best = 0
    for i in range(len(height)):
        for j in range(i+1, len(height)):
            water = min(height[i], height[j]) * (j - i)
            best = max(best, water)
    return best`,
        },
        {
          title: "Two Pointers — Greedy Optimal",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: `The water is limited by the SHORTER wall. If we move the taller wall inward, width decreases AND height can only stay same or decrease (shorter wall still limits). So moving the taller wall NEVER helps.
We must move the SHORTER wall — it's our only hope to find a taller wall.`,
          when: "Always. The greedy proof makes this O(n).",
          code: `def max_area(height):
    left, right = 0, len(height) - 1
    best = 0
    
    while left < right:
        h = min(height[left], height[right])
        water = h * (right - left)
        best = max(best, water)
        
        # Move the shorter wall — only way to potentially improve
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1        # If equal, doesn't matter which we move
    
    return best

# WHY THIS WORKS (proof):
# At each step, we have walls at left and right.
# Water = min(h[left], h[right]) × (right - left)
# If height[left] < height[right]:
#   Moving right inward → width decreases, min height ≤ h[left]
#   → water can only decrease or stay same → moving right is POINTLESS
#   → we MUST move left (our only hope)
# Same logic applies when height[right] < height[left]
# When equal, moving either is fine (optimal skipped by neither choice)`,
        },
      ],
      ai: {
        hints: ["What limits the water height?", "If you move the taller wall, can water ever increase?"],
        followUps: ["Trapping Rain Water (harder)", "Largest Rectangle in Histogram"],
        interviewQuestions: ["Prove the greedy approach is correct.", "What if all heights are equal?"],
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
      statement: "Given heights of walls, compute how much rainwater can be trapped between them.",
      example: "[0,1,0,2,1,0,1,3,2,1,2,1] → 6 units",
      constraints: ["Water at position i = min(max_left, max_right) - height[i]", "Non-negative result only"],
      approaches: [
        {
          title: "Brute Force",
          emoji: "🐢",
          tag: "O(n²)",
          complexity: "Time: O(n²) | Space: O(1)",
          idea: "For each position, scan left for max and scan right for max.",
          when: "Never.",
          code: `def trap_brute(height):
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
          idea: "Precompute max_left[i] and max_right[i] arrays. water[i] = min(max_l[i], max_r[i]) - height[i].",
          when: "Good readable solution. Explain this first.",
          code: `def trap_prefix(height):
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
          title: "Two Pointers — Space Optimal",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: `Key insight: water at position i = min(max_left_so_far, max_right_so_far) - height[i].
We don't need full arrays — we can track max from each side as we go.
If max_left < max_right: we know the left side is the limiting factor.
Water at left = max_left - height[left]. Process left, advance left.
Else: right side is limiting. Process right, advance right.`,
          when: "Best — O(1) space. Memorize this.",
          code: `def trap(height):
    left, right = 0, len(height)-1
    max_l = max_r = water = 0
    
    while left < right:
        if height[left] <= height[right]:
            # Left side is limiting factor
            if height[left] >= max_l:
                max_l = height[left]      # New max, no water trapped
            else:
                water += max_l - height[left]  # Water = max_l - current
            left += 1
        else:
            # Right side is limiting factor
            if height[right] >= max_r:
                max_r = height[right]     # New max, no water trapped
            else:
                water += max_r - height[right] # Water = max_r - current
            right -= 1
    
    return water

# INTUITION:
# We need min(max_left, max_right) at each position.
# If height[left] <= height[right]:
#   We know max_right >= height[right] >= height[left]
#   So min(max_left, max_right) = max_left (left side limits)
#   We can safely compute water for left position
# Vice versa for right side`,
        },
        {
          title: "Monotonic Stack",
          emoji: "📚",
          tag: "O(n) alternative",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "Use stack to process water horizontally. When taller bar found, calculate water in the valley.",
          when: "Alternative approach. Good to know for interviews.",
          code: `def trap_stack(height):
    stack = []   # stores indices, decreasing height
    water = 0
    for i, h in enumerate(height):
        while stack and h > height[stack[-1]]:
            mid = stack.pop()
            if stack:
                bounded_h = min(h, height[stack[-1]]) - height[mid]
                width = i - stack[-1] - 1
                water += bounded_h * width
        stack.append(i)
    return water`,
        },
      ],
      ai: {
        hints: [
          "Water at position i depends on max wall to its left AND right",
          "The shorter wall limits the water level",
          "If you know one side's max is definitely larger, you can safely process the other side",
        ],
        followUps: ["Container With Most Water (easier)", "Largest Rectangle in Histogram"],
        interviewQuestions: [
          "Why does the two pointer approach work when we can't see both max values?",
          "How does the stack approach differ from two pointers?",
        ],
      },
    },

    {
      name: "Sort Colors (Dutch National Flag)",
      difficulty: "Medium",
      companies: ["Amazon", "Microsoft", "Google", "Facebook"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/sort-colors/", id: "#75" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/", id: "Practice" },
      ],
      statement: "Given array of 0s, 1s, and 2s, sort it in-place without using built-in sort. One pass preferred.",
      example: "[2,0,2,1,1,0] → [0,0,1,1,2,2]",
      constraints: ["In-place", "O(n) time", "Only 3 values: 0, 1, 2"],
      approaches: [
        {
          title: "Count and Rebuild",
          emoji: "📊",
          tag: "Two Pass",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Count 0s, 1s, 2s. Rebuild array.",
          when: "Simple but 2 passes.",
          code: `def sort_colors_count(nums):
    c0 = c1 = c2 = 0
    for x in nums:
        if x == 0: c0 += 1
        elif x == 1: c1 += 1
        else: c2 += 1
    nums[:c0] = [0]*c0
    nums[c0:c0+c1] = [1]*c1
    nums[c0+c1:] = [2]*c2`,
        },
        {
          title: "Dutch National Flag — One Pass",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: `3 pointers: low, mid, high.
Invariant maintained at all times:
- nums[0..low-1] = all 0s
- nums[low..mid-1] = all 1s  
- nums[mid..high] = unknown
- nums[high+1..n-1] = all 2s

Process nums[mid]:
- If 0: swap with low, advance both low and mid
- If 1: just advance mid (it's in right place)
- If 2: swap with high, decrease high (DON'T advance mid — swapped element unknown)`,
          when: "Always. Single pass with 3 pointers.",
          code: `def sort_colors(nums):
    low = mid = 0
    high = len(nums) - 1
    
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1                    # now nums[mid] was nums[low]=1
        elif nums[mid] == 1:
            mid += 1                    # 1 is in correct position
        else:                           # nums[mid] == 2
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1                   # ⚠️ DON'T advance mid!
                                        # swapped element needs checking

# Trace on [2,0,2,1,1,0]:
# low=0,mid=0,high=5: nums[0]=2 → swap(0,5) → [0,0,2,1,1,2], high=4
# low=0,mid=0,high=4: nums[0]=0 → swap(0,0) → same, low=1,mid=1
# low=1,mid=1,high=4: nums[1]=0 → swap(1,1) → same, low=2,mid=2
# low=2,mid=2,high=4: nums[2]=2 → swap(2,4) → [0,0,1,1,2,2], high=3
# low=2,mid=2,high=3: nums[2]=1 → mid=3
# low=2,mid=3,high=3: nums[3]=1 → mid=4
# mid > high → done! [0,0,1,1,2,2] ✅`,
        },
      ],
      ai: {
        hints: ["Maintain three regions: 0s, 1s (unknown), 2s", "Why not advance mid when swapping with high?"],
        followUps: ["Sort Colors II (k colors)", "Wiggle Sort", "Segregate Even Odd"],
        interviewQuestions: ["Generalize to k colors?", "What's the invariant maintained by the algorithm?"],
      },
    },

    {
      name: "Squares of Sorted Array",
      difficulty: "Easy",
      companies: ["Google", "Facebook", "Apple"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/squares-of-a-sorted-array/", id: "#977" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/squares-of-a-sorted-array/", id: "Practice" },
      ],
      statement: "Given integer array sorted in non-decreasing order (may have negatives), return array of squares in sorted order.",
      example: "[-4,-1,0,3,10] → [0,1,9,16,100]",
      constraints: ["Input is sorted but may have negatives", "Output must be sorted"],
      approaches: [
        {
          title: "Square then Sort",
          emoji: "📊",
          tag: "O(n log n)",
          complexity: "Time: O(n log n) | Space: O(n)",
          idea: "Square all elements, then sort.",
          when: "Simple but doesn't use the sorted property.",
          code: `def sorted_squares_naive(nums):
    return sorted(x*x for x in nums)`,
        },
        {
          title: "Two Pointers from Ends — Optimal",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "Largest squares come from either end (most negative or most positive). Use left and right pointers, fill result array from the end (largest first).",
          when: "Always. Uses sorted property for O(n).",
          code: `def sorted_squares(nums):
    n = len(nums)
    result = [0] * n
    left, right = 0, n - 1
    pos = n - 1                         # fill from end (largest first)
    
    while left <= right:
        l_sq = nums[left] ** 2
        r_sq = nums[right] ** 2
        
        if l_sq > r_sq:
            result[pos] = l_sq
            left += 1                   # consume left
        else:
            result[pos] = r_sq
            right -= 1                  # consume right
        
        pos -= 1                        # move to next position in result
    
    return result

# Trace on [-4,-1,0,3,10]:
# pos=4: l=-4(16), r=10(100): 100>16 → result[4]=100, right=3(3)
# pos=3: l=-4(16), r=3(9):   16>9  → result[3]=16,  left=1(-1)
# pos=2: l=-1(1),  r=3(9):   9>1   → result[2]=9,   right=2(0)
# pos=1: l=-1(1),  r=0(0):   1>0   → result[1]=1,   left=2(0)
# pos=0: l=0(0),   r=0(0):   tie  → result[0]=0,   right=1
# Return [0,1,9,16,100] ✅`,
        },
      ],
      ai: {
        hints: ["Largest squares always come from the ends of a sorted array", "Fill result from the back"],
        followUps: ["Merge Sorted Array", "Sort Array By Parity"],
        interviewQuestions: ["Why fill from the back?", "What if the array had no negatives?"],
      },
    },

    {
      name: "Valid Palindrome II (One Deletion)",
      difficulty: "Medium",
      companies: ["Facebook", "Amazon", "Google"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/valid-palindrome-ii/", id: "#680" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/check-string-palindrome-one-character-can-deleted/", id: "Practice" },
      ],
      statement: "Given string s, return true if it can become a palindrome after deleting at most one character.",
      example: '"abca" → true (delete "b" or "c") | "abc" → false',
      constraints: ["Can delete at most 1 character", "Case sensitive this time"],
      approaches: [
        {
          title: "Try All Deletions",
          emoji: "🐢",
          tag: "O(n²)",
          complexity: "Time: O(n²) | Space: O(n)",
          idea: "Try deleting each character, check if result is palindrome.",
          when: "Never. O(n²) and wasteful.",
          code: `def valid_palindrome_brute(s):
    def is_pal(t): return t == t[::-1]
    if is_pal(s): return True
    for i in range(len(s)):
        if is_pal(s[:i] + s[i+1:]):
            return True
    return False`,
        },
        {
          title: "Two Pointers with One Chance",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Use Two Pointers normally. When mismatch found, we have ONE chance to delete. Try skipping left char OR right char, check which makes palindrome. Only need O(n) time.",
          when: "Always. Elegant use of Two Pointers.",
          code: `def valid_palindrome(s):
    def is_palindrome_range(left, right):
        while left < right:
            if s[left] != s[right]:
                return False
            left += 1; right -= 1
        return True
    
    left, right = 0, len(s) - 1
    
    while left < right:
        if s[left] != s[right]:
            # One mismatch found — try both deletions
            return (is_palindrome_range(left+1, right) or   # skip left
                    is_palindrome_range(left, right-1))      # skip right
        left += 1
        right -= 1
    
    return True   # Already a palindrome (0 deletions needed)

# Trace on "abca":
# left=0(a), right=3(a): match → left=1, right=2
# left=1(b), right=2(c): MISMATCH!
# Try skip left (s[2:3] = "c"): is "c" palindrome? Yes!
# Return True ✅

# Trace on "abc":
# left=0(a), right=2(c): MISMATCH
# Skip left: is "bc" palindrome? No
# Skip right: is "ab" palindrome? No
# Return False ✅`,
        },
      ],
      ai: {
        hints: ["When a mismatch is found, what are your only two choices?", "You only get one chance to delete"],
        followUps: ["Valid Palindrome III (k deletions)", "Minimum insertions to make palindrome"],
        interviewQuestions: ["Can you extend this to k deletions?", "What if we could also replace characters?"],
      },
    },

    {
      name: "Linked List Cycle II — Find Cycle Start",
      difficulty: "Medium",
      companies: ["Amazon", "Microsoft", "Google", "Apple"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/linked-list-cycle-ii/", id: "#142" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/find-first-node-of-loop-in-a-linked-list/", id: "Practice" },
      ],
      statement: "Given a linked list, return the node where the cycle begins. Return null if no cycle.",
      example: "head=[3,2,0,-4], pos=1 (tail connects to index 1) → Node with value 2",
      constraints: ["O(1) space preferred", "No modification of the list"],
      approaches: [
        {
          title: "HashSet",
          emoji: "🗂️",
          tag: "O(n) space",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "Store visited nodes. First repeated node = cycle start.",
          when: "Simple and intuitive. O(n) space.",
          code: `def detect_cycle_hash(head):
    seen = set()
    curr = head
    while curr:
        if curr in seen: return curr    # First repeated = cycle start
        seen.add(curr)
        curr = curr.next
    return None`,
        },
        {
          title: "Floyd's Two-Phase Algorithm",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: `Phase 1: Fast (2 steps) and slow (1 step). If cycle, they meet.
Phase 2: Reset slow to head. Move BOTH 1 step at a time. 
They meet at the cycle start.

MATHEMATICAL PROOF:
Let F = distance from head to cycle start
Let C = cycle length  
Let h = steps from cycle start where they meet in phase 1
When they first meet: slow took F+h steps, fast took 2(F+h) steps
Extra distance of fast (in cycle): F+h (must be divisible by C)
So: F + h = k×C for some integer k
Therefore: F = k×C - h (distance fast still needs in cycle to reach start)
In phase 2: slow starts at head (F steps to cycle start)
Fast starts at meeting point (k×C - h steps = F steps to cycle start)
They meet at cycle start! ✅`,
          when: "Always. O(1) space. Classic Floyd's.",
          code: `def detect_cycle(head):
    slow = fast = head
    
    # Phase 1: Find meeting point
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            break
    else:
        return None   # No cycle (fast reached end)
    
    # Phase 2: Find cycle start
    slow = head              # Reset slow to head
    while slow != fast:      # Move both 1 step
        slow = slow.next
        fast = fast.next
    
    return slow   # Both now point to cycle start`,
        },
      ],
      ai: {
        hints: ["Phase 1 tells you a cycle EXISTS and gives a meeting point inside the cycle", "Phase 2 uses mathematical property: resetting slow to head and moving both 1 step leads to cycle start"],
        followUps: ["Linked List Cycle I (just detect)", "Happy Number (same pattern)", "Find Duplicate Number"],
        interviewQuestions: ["Explain the mathematical proof.", "What if the cycle length is 1?"],
      },
    },
  ],

  // ─────────────────────────────────────────────
  // INTERVIEW TIPS
  // ─────────────────────────────────────────────
  interviewTips: [
    "First question to ask: Is the array sorted? Sorted = possible Two Pointers candidate",
    "When you see 'find pair/triplet with sum', immediately think Two Pointers (sorted) or HashMap (unsorted)",
    "For 3Sum: Sort first, then fix one element, Two Pointers on rest — O(n²) total",
    "Always check: while left < right (NOT left <= right) for opposite ends to avoid same element twice",
    "For same-direction: think of slow as 'write pointer' and fast as 'read pointer'",
    "When mismatch in palindrome with one deletion: try BOTH skips (left+1 OR right-1) and return either",
    "Mention Floyd's algorithm by name — it signals advanced knowledge",
    "After finding answer in 3Sum/4Sum, skip ALL duplicates before moving pointers",
    "Edge cases: empty array, single element, all same elements, all negative numbers",
    "Two Pointers vs Sliding Window: Two Pointers for fixed endpoints/pairs, Sliding Window for subarrays",
  ],

  // ─────────────────────────────────────────────
  // COMMON MISTAKES
  // ─────────────────────────────────────────────
  mistakes: [
    "Using Two Pointers on UNSORTED array for pair-sum (use HashMap instead)",
    "Using left <= right instead of left < right — causes using same element twice",
    "In 3Sum: not skipping duplicates → returns duplicate triplets",
    "In Dutch National Flag: advancing mid after swapping with high (the swapped element is unknown!)",
    "For sorted_squares: forgetting negatives squared can be larger than positives squared",
    "In Floyd's Phase 2: resetting BOTH pointers to head (only slow goes to head)",
    "Advancing both pointers when equal in valid_palindrome_ii (need to check BOTH deletions)",
    "Off-by-one: in 1-indexed problems like Two Sum II, returning [left, right] instead of [left+1, right+1]",
  ],

  // ─────────────────────────────────────────────
  // QUIZ
  // ─────────────────────────────────────────────
  quiz: [
    {
      q: "You have a SORTED array and need to find a pair summing to target. Which approach is optimal?",
      options: ["HashMap — O(n) time, O(n) space", "Two Pointers — O(n) time, O(1) space", "Binary Search — O(n log n)", "Sort then Binary Search"],
      answer: 1,
      explanation: "Both HashMap and Two Pointers give O(n) time. But since the array is already sorted, Two Pointers uses O(1) extra space vs O(n) for HashMap. Two Pointers wins when array is sorted.",
    },
    {
      q: "In the same-direction Two Pointers pattern for removing duplicates, what does the slow pointer represent?",
      options: ["Current element being checked", "Next position to write a valid element", "Last duplicate found", "Length of the array"],
      answer: 1,
      explanation: "Slow pointer is the 'write position' — it points to where the next unique/valid element should be written. Fast pointer is the 'read position' scanning ahead. After the loop, slow (or slow+1) is the count of valid elements.",
    },
    {
      q: "In Floyd's cycle detection, why does fast move 2 steps and slow move 1 step?",
      options: [
        "To make it faster overall",
        "So fast laps slow inside any cycle — they are guaranteed to meet if cycle exists",
        "To find the middle of the list",
        "It's just a convention — any speed ratio works",
      ],
      answer: 1,
      explanation: "If a cycle exists, fast gains 1 step on slow per iteration inside the cycle. Eventually fast laps slow and they meet at some node inside the cycle. If no cycle, fast reaches null. The 2:1 ratio is the simplest that guarantees meeting.",
    },
    {
      q: "In 3Sum, after finding a valid triplet [nums[i], nums[left], nums[right]], what do you do?",
      options: [
        "Return immediately",
        "Advance only left++",
        "Advance both left++ and right--, then skip all duplicates",
        "Reset to i+1 and n-1",
      ],
      answer: 2,
      explanation: "After recording the triplet, advance BOTH pointers (left++, right--). Then skip ALL duplicates at left (while nums[left]==nums[left-1]) and right (while nums[right]==nums[right+1]) to avoid recording the same triplet again.",
    },
    {
      q: "For Trapping Rain Water with Two Pointers: when height[left] <= height[right], we process the LEFT side. Why?",
      options: [
        "Left is always smaller",
        "We know max_right >= height[right] >= height[left], so left side is the bottleneck",
        "It's just a convention",
        "Right side computation is harder",
      ],
      answer: 1,
      explanation: "When height[left] <= height[right], we know the right max is AT LEAST height[right] which is >= height[left]. So the water at left position is determined by max_left (the left side is the bottleneck). We can safely compute water[left] = max_left - height[left].",
    },
    {
      q: "In Dutch National Flag (Sort Colors), why do we NOT advance mid after swapping nums[mid] with nums[high]?",
      options: [
        "It's an optimization",
        "The element swapped from high is unknown and needs to be examined at mid",
        "high and mid would become equal",
        "No reason — we could advance mid",
      ],
      answer: 1,
      explanation: "After swapping nums[mid] with nums[high], nums[high] now contains 2 (correctly placed). But nums[mid] now contains whatever was at nums[high] before — we don't know if it's 0, 1, or 2. We MUST examine it before advancing mid.",
    },
  ],

  // ─────────────────────────────────────────────
  // PRACTICE LINKS
  // ─────────────────────────────────────────────
  practice_links: [
    { platform: "LeetCode Two Pointers", url: "https://leetcode.com/tag/two-pointers/", color: "bg-orange-500", problems: "200+ problems", recommended: true },
    { platform: "Striver's Two Pointers Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", color: "bg-indigo-600", problems: "Full roadmap coverage", recommended: true },
    { platform: "NeetCode Two Pointers", url: "https://neetcode.io/roadmap", color: "bg-violet-600", problems: "Curated must-do list" },
    { platform: "GFG Two Pointers", url: "https://www.geeksforgeeks.org/two-pointers-technique/", color: "bg-green-600", problems: "Theory + Examples" },
    { platform: "HackerRank Arrays", url: "https://www.hackerrank.com/domains/data-structures?filters%5Bsubdomains%5D%5B%5D=arrays", color: "bg-emerald-600", problems: "Good starting practice" },
    { platform: "InterviewBit Two Pointers", url: "https://www.interviewbit.com/courses/programming/two-pointers/", color: "bg-blue-600", problems: "Interview focused" },
  ],
};

export default twoPointers;
