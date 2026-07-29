const bitManipulation = {
  name: "Bit Manipulation",
  emoji: "💡",
  color: "bg-yellow-500",
  light: "bg-yellow-50",
  border: "border-yellow-200",
  text: "text-yellow-700",
  total: 30,


definition: {
  short:
    "Bit Manipulation is the technique of solving problems by operating directly on the binary representation of numbers using bitwise operators. It enables extremely fast and memory-efficient solutions for many interview and system-level programming problems.",

  analogy:
    "Imagine every number is a row of light switches (bits). Instead of changing the whole number, you simply turn individual switches ON or OFF to get the result instantly.",

  properties: [
    "Works directly on binary representation (0s and 1s)",
    "Uses CPU-level bitwise instructions for maximum speed",
    "Often reduces O(n) space solutions to O(1)",
    "Very common in competitive programming and interviews",
    "Important in operating systems, networking and cryptography",
    "Requires understanding of binary numbers and two's complement",
    "Useful for subsets, masks and state compression",
    "Can simplify many mathematical operations"
  ],

  complexity: [
    { op: "AND (&)", time: "O(1)", space: "O(1)" },
    { op: "OR (|)", time: "O(1)", space: "O(1)" },
    { op: "XOR (^)", time: "O(1)", space: "O(1)" },
    { op: "NOT (~)", time: "O(1)", space: "O(1)" },
    { op: "Left Shift (<<)", time: "O(1)", space: "O(1)" },
    { op: "Right Shift (>>)", time: "O(1)", space: "O(1)" },
    { op: "Set/Clear Bit", time: "O(1)", space: "O(1)" },
    { op: "Check Bit", time: "O(1)", space: "O(1)" }
  ]
},

properties: [
  "Bitwise operations execute in constant time",
  "Used for bitmasking and subset generation",
  "Excellent for optimization problems",
  "Memory efficient",
  "Frequently asked in interviews",
  "Requires binary representation knowledge"
],

complexity: {
  best: "O(1)",
  average: "O(1)",
  worst: "O(1)",
  space: "O(1)"
},
  learningObjectives: [
    "Understand how computers store numbers in binary (two's complement)",
    "Master all 6 bitwise operators: AND, OR, XOR, NOT, Left Shift, Right Shift",
    "Learn 30+ bit tricks and formulas used in real interviews",
    "Recognize which problems can be solved with bit manipulation in O(1) space",
    "Solve 30+ real problems from Easy to Hard with multiple approaches",
  ],

  prerequisites: [
    "Basic Math (division, modulo)",
    "Binary number system basics",
    "Loops and Conditionals",
    "Arrays (for some problems)",
  ],

  whyLearn: {
    importance: "Bit manipulation appears in 20%+ of top-company interviews. It enables O(1) space solutions for problems that otherwise need O(n) space. Understanding bits is ESSENTIAL for systems programming, cryptography, competitive programming, and impressing interviewers.",
    useCases: [
      "Cryptography — XOR is the foundation of many encryption algorithms",
      "Graphics programming — pixel color operations use bit masking",
      "Network programming — IP subnet masks use AND operation",
      "Competitive programming — bitmask DP for subset problems",
      "Database systems — bloom filters use bit arrays",
      "Operating systems — file permissions (rwx = 3 bits)",
      "Embedded systems — hardware register manipulation",
    ],
  },

  // ─────────────────────────────────────────────
  // COMPLETE CONCEPT: BASIC TO ADVANCED
  // ─────────────────────────────────────────────
  concept: {
    intro: `Bit manipulation means directly operating on the binary (0s and 1s) representation of numbers.
Every number in a computer is stored as a sequence of bits (binary digits).
Instead of using arithmetic (+,-,*,/), bit operations work directly on these bits,
making them EXTREMELY fast — a single CPU instruction instead of many.

This is one of the most powerful low-level skills in programming.`,

    levels: [
      {
        level: "Beginner",
        color: "bg-green-100 text-green-800",
        title: "Binary Numbers and Basic Operators",
        sections: [
          {
            heading: "How Numbers are Stored in Binary",
            content: `Every integer is stored as a sequence of bits (0 or 1).
Each bit position represents a power of 2.

Example: 13 in binary

Position:  7   6   5   4   3   2   1   0
Bit:       0   0   0   0   1   1   0   1
Value:    128  64  32  16   8   4   2   1

13 = 8 + 4 + 1 = 2³ + 2² + 2⁰ = 1101 in binary

How to convert decimal to binary:
13 ÷ 2 = 6 remainder 1  → bit 0 = 1
 6 ÷ 2 = 3 remainder 0  → bit 1 = 0
 3 ÷ 2 = 1 remainder 1  → bit 2 = 1
 1 ÷ 2 = 0 remainder 1  → bit 3 = 1
Read remainders bottom to top: 1101

How to convert binary to decimal:
1101 = 1×2³ + 1×2² + 0×2¹ + 1×2⁰
     = 8    + 4    + 0    + 1    = 13`,
          },
          {
            heading: "The 6 Bitwise Operators",
            content: `AND  (&)  : bit is 1 only if BOTH bits are 1
OR   (|)  : bit is 1 if AT LEAST ONE bit is 1
XOR  (^)  : bit is 1 if bits are DIFFERENT
NOT  (~)  : flips every bit (0→1, 1→0)
LEFT SHIFT  (<<) : shifts bits left, multiply by 2
RIGHT SHIFT (>>) : shifts bits right, divide by 2

Truth table (for each bit position):
A  B  | A&B  A|B  A^B  ~A
0  0  |  0    0    0    1
0  1  |  0    1    1    1
1  0  |  0    1    1    0
1  1  |  1    1    0    0

Memory trick:
AND = multiplication (1×1=1, anything×0=0)
OR  = addition      (at least one 1 → result is 1)
XOR = difference    (same→0, different→1)`,
          },
          {
            heading: "Visual Examples of Each Operator",
            content: `Let's use a=12 (1100) and b=10 (1010):

     1 1 0 0   ← a = 12
  &  1 0 1 0   ← b = 10
  ---------
     1 0 0 0   ← a & b = 8
(only positions where BOTH are 1)

     1 1 0 0   ← a = 12
  |  1 0 1 0   ← b = 10
  ---------
     1 1 1 0   ← a | b = 14
(positions where AT LEAST ONE is 1)

     1 1 0 0   ← a = 12
  ^  1 0 1 0   ← b = 10
  ---------
     0 1 1 0   ← a ^ b = 6
(positions where bits DIFFER)

  ~  1 1 0 0   ← a = 12
  ---------
     0 0 1 1   ← ~a = -13 (in two's complement)

Left Shift:  5 << 1 = 10  (5×2=10)   → 0101 → 1010
Right Shift: 20 >> 2 = 5 (20÷4=5)   → 10100 → 00101`,
          },
          {
            heading: "Two's Complement: How Negatives are Stored",
            content: `Computers store negative numbers using two's complement.
For n-bit integers:
  Positive numbers: stored normally
  Negative numbers: flip all bits of positive, then add 1

Example: -5 in 8-bit two's complement
Step 1: 5 in binary  = 00000101
Step 2: Flip all bits = 11111010
Step 3: Add 1        = 11111011  ← this is -5

Why this matters for bit manipulation:
~ (NOT) gives: ~n = -(n+1)   ← very useful!
~0 = -1
~1 = -2
~5 = -6
So: ~n + n = -1  (always)

Range of int (32-bit):
  Positive: 0 to 2^31 - 1 = 2,147,483,647
  Negative: -2^31 to -1 = -2,147,483,648 to -1`,
          },
        ],
        code: `# Python — Bitwise Operators Basics

a, b = 12, 10   # a=1100, b=1010

# Basic operations
print(a & b)     # AND  = 8   (1000)
print(a | b)     # OR   = 14  (1110)
print(a ^ b)     # XOR  = 6   (0110)
print(~a)        # NOT  = -13 (two's complement)
print(a << 1)    # Left shift  = 24 (12×2)
print(a >> 1)    # Right shift = 6  (12÷2)

# View binary representation
print(bin(13))         # '0b1101'
print(bin(13)[2:])     # '1101' (remove '0b' prefix)
print(format(13, 'b')) # '1101'
print(format(13, '08b'))# '00001101' (8 bits with padding)

# Convert binary string to integer
print(int('1101', 2))  # 13

# Check individual bits
n = 13  # 1101
print(n & 1)           # 1 (last bit = 1, n is odd)
print((n >> 1) & 1)    # 0 (second bit = 0)
print((n >> 2) & 1)    # 1 (third bit = 1)
print((n >> 3) & 1)    # 1 (fourth bit = 1)`,
      },

      // ─────────────── INTERMEDIATE ───────────────
      {
        level: "Intermediate",
        color: "bg-yellow-100 text-yellow-800",
        title: "Essential Bit Tricks and Formulas",
        sections: [
          {
            heading: "Formula 1: Check if bit i is SET",
            content: `To check if bit at position i is 1:
(n >> i) & 1

How it works:
n = 13 = 1101
i = 2

Step 1: n >> 2 = 11 = 0011  (shift right by 2)
Step 2: 0011 & 0001 = 0001  (AND with 1)
Result: 1 → bit 2 is SET

Alternative: n & (1 << i)
1 << 2 = 0100
1101 & 0100 = 0100 (non-zero → bit is set)

Use case: Check if number has specific flag/feature set`,
          },
          {
            heading: "Formula 2: Set bit i (turn it ON)",
            content: `To set bit at position i to 1:
n | (1 << i)

How it works:
n = 1001  (bit 2 is 0)
i = 2
1 << 2 = 0100

1001 | 0100 = 1101  ← bit 2 is now 1

Key insight: OR with 1 always sets the bit
OR with 0 leaves bit unchanged
So we create a mask with only bit i as 1 → OR it

Use case: Add a flag/feature to a bitmask`,
          },
          {
            heading: "Formula 3: Clear bit i (turn it OFF)",
            content: `To clear bit at position i to 0:
n & ~(1 << i)

How it works:
n = 1101  (bit 2 is 1, we want to clear it)
i = 2
1 << 2   = 0100
~(1<<2)  = 1011  (mask with 0 at position 2)

1101 & 1011 = 1001  ← bit 2 is now 0

Key insight: AND with 0 always clears the bit
AND with 1 leaves bit unchanged
So we create a mask with 0 at position i, 1 everywhere else

Use case: Remove a flag/feature from a bitmask`,
          },
          {
            heading: "Formula 4: Toggle bit i (flip it)",
            content: `To flip bit at position i:
n ^ (1 << i)

How it works:
n = 1101  (bit 2 is 1, flip to 0)
1 << 2 = 0100

1101 ^ 0100 = 1001  ← bit 2 flipped from 1 to 0

Now flip bit 1 (which is 0):
n = 1001
1 << 1 = 0010

1001 ^ 0010 = 1011  ← bit 1 flipped from 0 to 1

Key insight: XOR with 1 always flips the bit
XOR with 0 leaves bit unchanged`,
          },
          {
            heading: "Formula 5: Check if number is Power of 2",
            content: `n is a power of 2 if and only if: n > 0 AND (n & (n-1)) == 0

WHY THIS WORKS — The most elegant bit trick:

Powers of 2 in binary:
1  = 0001
2  = 0010
4  = 0100
8  = 1000
16 = 10000

Notice: exactly ONE bit is set.

n-1 when n is power of 2:
1-1=0  = 0000
2-1=1  = 0001
4-1=3  = 0011
8-1=7  = 0111
16-1=15= 01111

Key: n and n-1 share NO common bits when n is power of 2!
So n & (n-1) = 0 exactly when n is power of 2.

For n=6 (not power of 2):
6  = 110
5  = 101
6 & 5 = 100 ≠ 0  → NOT power of 2  ✅`,
          },
          {
            heading: "Formula 6: Remove Lowest Set Bit",
            content: `n & (n-1)  removes the lowest (rightmost) set bit

Examples:
n = 1100 (12)
n-1 = 1011 (11)
n & (n-1) = 1000  ← rightmost 1 removed!

n = 1010 (10)
n-1 = 1001 (9)
n & (n-1) = 1000  ← rightmost 1 removed!

WHY:
Subtracting 1 flips the rightmost 1 to 0,
and all bits after it (zeros) become 1s.
ANDing n with n-1 cancels out all the changed bits.

APPLICATIONS:
1. Count set bits: loop while n>0, do n = n & (n-1), count iterations
2. Check power of 2: if n & (n-1) == 0, it's power of 2
3. Find lowest set bit: n & (-n)  (or n & ~(n-1))`,
          },
          {
            heading: "Formula 7: Isolate the Lowest Set Bit",
            content: `n & (-n)  gives only the lowest set bit

Examples:
n  = 1010 (10)
-n = 0110 (−10 in two's complement)
n & (-n) = 0010  ← only the lowest set bit!

n  = 1100 (12)
-n = 0100 (-12)
n & (-n) = 0100  ← only bit 2

WHY:
-n in two's complement = ~n + 1 (flip bits, add 1)
This creates a pattern where ONLY the lowest bit of n is 1 in both n and -n.

APPLICATIONS:
- Iterate over only set bits efficiently
- Fenwick Tree (Binary Indexed Tree) operations
- Find rightmost set bit position`,
          },
          {
            heading: "Formula 8: XOR Properties — The Magic Operator",
            content: `XOR has MAGICAL properties that enable O(1) space solutions:

1. n ^ n = 0          (XOR with itself = 0)
2. n ^ 0 = n          (XOR with 0 = itself)
3. XOR is COMMUTATIVE: a^b = b^a
4. XOR is ASSOCIATIVE: (a^b)^c = a^(b^c)
5. n ^ n ^ m = m      (duplicates cancel!)

CONSEQUENCE: If you XOR all numbers and some appear twice,
they cancel out, leaving only the unique numbers.

Example: [1,2,3,2,1]
1^2^3^2^1 = (1^1)^(2^2)^3 = 0^0^3 = 3  ← the single element!

This is used in:
- Find the single non-duplicate element (O(1) space)
- Swap two variables without temp: a^=b; b^=a; a^=b
- Find missing number
- Find two non-repeating elements`,
          },
          {
            heading: "Shift Operator Formulas",
            content: `LEFT SHIFT (<<):
n << k = n × 2^k

1 << 0 = 1
1 << 1 = 2
1 << 2 = 4
1 << 3 = 8
1 << k = 2^k  ← VERY USEFUL for creating masks

n << 1  = n × 2     (multiply by 2)
n << 2  = n × 4     (multiply by 4)
n << k  = n × 2^k   (multiply by 2^k)

RIGHT SHIFT (>>):
n >> k = n ÷ 2^k  (integer division)

100 >> 1 = 50   (100÷2)
100 >> 2 = 25   (100÷4)
13  >> 1 = 6    (13÷2, floor)
13  >> 2 = 3    (13÷4, floor)
n   >> k = n ÷ 2^k  (floor division)

CRITICAL: For signed integers in Java/C++
>> is ARITHMETIC shift (preserves sign bit)
>>> is LOGICAL shift (fills with 0) — use this for unsigned operations

In Python: no overflow, >> is always arithmetic`,
          },
        ],
        code: `# Python — Essential Bit Tricks

n = 13   # 1101 in binary

# ── Check/Set/Clear/Toggle individual bits ──
def get_bit(n, i):   return (n >> i) & 1        # get bit i
def set_bit(n, i):   return n | (1 << i)         # set bit i to 1
def clear_bit(n, i): return n & ~(1 << i)        # set bit i to 0
def toggle_bit(n, i):return n ^ (1 << i)         # flip bit i

print(get_bit(13, 0))     # 1 (13=1101, bit0=1)
print(get_bit(13, 1))     # 0 (bit1=0)
print(set_bit(9, 1))      # 11 (1001 → 1011)
print(clear_bit(13, 2))   # 9  (1101 → 1001)
print(toggle_bit(13, 1))  # 15 (1101 → 1111)

# ── Check power of 2 ──
def is_power_of_2(n):
    return n > 0 and (n & (n-1)) == 0

print(is_power_of_2(16))  # True  (10000)
print(is_power_of_2(6))   # False (110)
print(is_power_of_2(1))   # True  (1)
print(is_power_of_2(0))   # False

# ── Count set bits (Brian Kernighan's Algorithm) ──
def count_set_bits(n):
    count = 0
    while n:
        n = n & (n-1)   # remove lowest set bit
        count += 1
    return count

print(count_set_bits(13))  # 3 (1101 has three 1s)
print(count_set_bits(7))   # 3 (0111)
print(count_set_bits(8))   # 1 (1000)

# ── XOR tricks ──
# Swap without temp variable
a, b = 5, 9
a ^= b;  b ^= a;  a ^= b
print(a, b)   # 9 5 (swapped!)

# Find lowest set bit
n = 12   # 1100
print(n & (-n))   # 4 (100) ← lowest set bit

# ── Shift tricks ──
print(5 << 3)     # 40  (5 × 2³ = 5 × 8)
print(100 >> 2)   # 25  (100 ÷ 4)
print(1 << 10)    # 1024 (2^10)
print(n >> 31)    # Sign bit: 0 for positive, -1 for negative (Python)`,
      },

      // ─────────────── ADVANCED ───────────────
      {
        level: "Advanced",
        color: "bg-red-100 text-red-800",
        title: "Advanced Techniques — Bitmask DP, Tricks, and Optimizations",
        sections: [
          {
            heading: "Count Set Bits: All Three Approaches Compared",
            content: `Approach 1: Naive — check each bit   O(32) per number
Approach 2: Brian Kernighan         O(set bits) per number
Approach 3: Lookup Table            O(1) per number with O(256) preprocessing
Approach 4: Python's bin().count()  O(log n) — built-in

Brian Kernighan's algorithm is the gold standard for interviews.
Key: n & (n-1) removes ONLY the lowest set bit, so we loop
exactly as many times as there are set bits.

Counting set bits for all numbers 0 to n:
Using DP (very clever!):
dp[i] = dp[i >> 1] + (i & 1)
Explanation: number i has same bits as i>>1, plus its last bit

Why: i>>1 just removes the last bit. Number of set bits in i
equals number of set bits in i//2, plus whether i is odd.

Example:
dp[0] = 0
dp[1] = dp[0] + 1 = 1
dp[2] = dp[1] + 0 = 1
dp[3] = dp[1] + 1 = 2
dp[4] = dp[2] + 0 = 1
dp[5] = dp[2] + 1 = 2`,
          },
          {
            heading: "Bitmask: Representing Subsets",
            content: `With n elements, there are 2^n subsets.
Each subset can be represented by an n-bit mask.
Bit i = 1 means element i is IN the subset.

Example with 3 elements {A, B, C}:
mask = 000 → {} (empty set)
mask = 001 → {A}
mask = 010 → {B}
mask = 011 → {A, B}
mask = 100 → {C}
mask = 101 → {A, C}
mask = 110 → {B, C}
mask = 111 → {A, B, C}

Key operations:
Check if i is in mask:   mask & (1 << i)
Add i to mask:           mask | (1 << i)
Remove i from mask:      mask & ~(1 << i)
All n elements:          (1 << n) - 1
Iterate all subsets:     for mask in range(1 << n)

Iterate subsets of a mask (very useful for bitmask DP):
sub = mask
while sub > 0:
    process(sub)
    sub = (sub-1) & mask   # gets next smaller subset`,
          },
          {
            heading: "Bitmask DP: The Power of Subsets",
            content: `Bitmask DP is used when n ≤ 20 and you need to track which elements are used.

Classic Problem: Traveling Salesman Problem (TSP)
State: dp[mask][i] = min cost to visit all cities in mask, ending at city i
Time: O(2^n × n²)  — feasible for n ≤ 20

Classic Problem: Minimum XOR Sum (Assignment Problem)
Assign n workers to n tasks minimizing total cost.
State: dp[mask] = min cost to assign tasks for each worker in mask

Template:
n = len(nums)
dp = [infinity] * (1 << n)
dp[0] = base_case

for mask in range(1 << n):
    bits_set = bin(mask).count('1')    # current index
    for i in range(n):
        if mask & (1 << i):            # if i is in current mask
            prev_mask = mask ^ (1 << i)  # mask without i
            dp[mask] = min(dp[mask], dp[prev_mask] + cost(bits_set-1, i))`,
          },
          {
            heading: "XOR Advanced: Finding Two Unique Elements",
            content: `Problem: Array has all elements appearing twice EXCEPT two elements appear once.
Find both unique elements. O(n) time, O(1) space.

Naive approach: HashMap → O(n) space
Advanced XOR approach: O(1) space

Algorithm:
Step 1: XOR all elements → result = a ^ b (the two unique elements)
        (all pairs cancel out due to n^n = 0)
Step 2: Find any set bit in result = a ^ b
        (this bit is DIFFERENT between a and b)
Step 3: Divide all elements into two groups:
        Group 1: elements with that bit SET
        Group 2: elements with that bit NOT SET
        a goes to one group, b to the other (since they differ at this bit)
Step 4: XOR each group separately → gives a and b
        (duplicates still cancel within each group)

Why Step 3 works: Any duplicate pair (x,x) — both x go to same group
because they have the SAME bit value at every position.
Only a and b are separated because they DIFFER at the chosen bit.`,
          },
          {
            heading: "Gray Code: Advanced Bit Pattern",
            content: `Gray Code: sequence of numbers where consecutive numbers differ by exactly 1 bit.
0 → 0000
1 → 0001
2 → 0011
3 → 0010
4 → 0110
5 → 0111
6 → 0101
7 → 0100

FORMULA: gray(n) = n ^ (n >> 1)

Why useful: error correction, analog-to-digital conversion, cyclic systems.

Properties:
- gray(n) = n ^ (n >> 1)
- Inverse: n = gray XOR (gray>>1) XOR (gray>>2) XOR ...
- Adjacent codes differ by exactly 1 bit
- Used in LeetCode problem #89 and many encoding applications`,
          },
          {
            heading: "Bit Manipulation for Competitive Programming",
            content: `Advanced tricks used in competitive programming:

1. Multiply/Divide by 2^k without division:
   n * 2^k = n << k
   n / 2^k = n >> k (floor)

2. Check even/odd:
   n & 1 == 0  → even (faster than n % 2 == 0)
   n & 1 == 1  → odd

3. Absolute value without branching:
   mask = n >> 31       (all 0s for positive, all 1s for negative)
   abs_n = (n ^ mask) - mask

4. Min/Max without branching:
   min(a,b) = b ^ ((a ^ b) & -(a < b))
   max(a,b) = a ^ ((a ^ b) & -(a < b))

5. Turn off rightmost consecutive 1s:
   n & (n+1)
   Example: 10111 → 10000

6. Turn on rightmost consecutive 0s:
   n | (n-1)
   Example: 10100 → 10111

7. Propagate rightmost set bit:
   n | (n-1)  (same as above)

8. Next higher number with same number of set bits:
   (called "next permutation" of bits — used in bitmask enumeration)`,
          },
        ],
        code: `# Advanced Bit Manipulation

# ── Count set bits for 0 to n using DP ──
def count_bits_dp(n):
    dp = [0] * (n + 1)
    for i in range(1, n+1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp

print(count_bits_dp(5))  # [0,1,1,2,1,2] (set bits for 0,1,2,3,4,5)

# ── Find all subsets of array using bitmask ──
def all_subsets(arr):
    n = len(arr)
    result = []
    for mask in range(1 << n):          # 0 to 2^n - 1
        subset = []
        for i in range(n):
            if mask & (1 << i):          # bit i is set
                subset.append(arr[i])
        result.append(subset)
    return result

print(all_subsets([1,2,3]))
# [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]

# ── Find two unique elements in array ──
def find_two_unique(nums):
    # Step 1: XOR all → a^b
    xor = 0
    for x in nums: xor ^= x
    
    # Step 2: Find rightmost set bit (differs between a and b)
    diff_bit = xor & (-xor)    # isolate lowest set bit
    
    # Step 3 & 4: Divide into groups and XOR each
    a = b = 0
    for x in nums:
        if x & diff_bit:        # bit is set → goes to group a
            a ^= x
        else:                   # bit not set → goes to group b
            b ^= x
    return [a, b]

print(find_two_unique([1,2,1,3,2,5]))  # [3, 5]

# ── Bitmask DP: Minimum Cost Assignment ──
def min_xor_sum(nums1, nums2):
    n = len(nums1)
    dp = [float('inf')] * (1 << n)
    dp[0] = 0
    
    for mask in range(1 << n):
        i = bin(mask).count('1')  # number of bits set = current index in nums1
        if i >= n: continue
        for j in range(n):
            if mask & (1 << j): continue  # j already used
            new_mask = mask | (1 << j)
            dp[new_mask] = min(dp[new_mask], dp[mask] + (nums1[i] ^ nums2[j]))
    
    return dp[(1 << n) - 1]    # all bits set = all assigned

print(min_xor_sum([1,2,3], [3,2,1]))  # 0

# ── Iterate all non-empty subsets of a mask ──
def iterate_subsets(mask):
    sub = mask
    while sub > 0:
        print(bin(sub)[2:], end=' ')
        sub = (sub - 1) & mask    # next smaller subset

print("Subsets of 1011:")
iterate_subsets(0b1011)  # 1011 1010 1001 1000 0011 0010 0001`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // FORMULAS REFERENCE TABLE
  // ─────────────────────────────────────────────
  formulas: [
    { formula: "n & 1",              result: "0 if even, 1 if odd",                                      use: "Check parity" },
    { formula: "n >> 1",             result: "n ÷ 2 (floor)",                                             use: "Fast divide by 2" },
    { formula: "n << 1",             result: "n × 2",                                                     use: "Fast multiply by 2" },
    { formula: "1 << k",             result: "2^k",                                                       use: "Create bitmask for position k" },
    { formula: "(n >> i) & 1",       result: "value of bit i (0 or 1)",                                   use: "Get bit at position i" },
    { formula: "n | (1 << i)",       result: "n with bit i set to 1",                                     use: "Set bit i" },
    { formula: "n & ~(1 << i)",      result: "n with bit i set to 0",                                     use: "Clear bit i" },
    { formula: "n ^ (1 << i)",       result: "n with bit i flipped",                                      use: "Toggle bit i" },
    { formula: "n & (n-1)",          result: "n with lowest set bit removed",                             use: "Count set bits, check power of 2" },
    { formula: "n & (-n)",           result: "only the lowest set bit of n",                              use: "Isolate rightmost bit (Fenwick tree)" },
    { formula: "n & (n-1) == 0",     result: "true if n is power of 2 (n>0)",                            use: "Power of 2 check" },
    { formula: "n ^ n",              result: "0",                                                          use: "Cancel duplicate elements" },
    { formula: "n ^ 0",              result: "n",                                                          use: "XOR identity" },
    { formula: "~n",                 result: "-(n+1)",                                                    use: "Two's complement NOT" },
    { formula: "(1 << n) - 1",       result: "n ones: 111...1",                                           use: "Mask for n bits, all subsets count" },
    { formula: "n ^ (n >> 1)",       result: "Gray code of n",                                            use: "Gray code generation" },
    { formula: "n | (n-1)",          result: "n with rightmost 0s set to 1",                              use: "Fill trailing zeros" },
    { formula: "n & (n+1)",          result: "n with trailing 1s cleared",                                use: "Clear trailing ones" },
    { formula: "(sub-1) & mask",     result: "next smaller subset of mask",                               use: "Enumerate subsets of a mask" },
    { formula: "a^=b;b^=a;a^=b",    result: "swaps a and b without temp",                                use: "In-place swap (XOR trick)" },
  ],

  // ─────────────────────────────────────────────
  // LANGUAGES
  // ─────────────────────────────────────────────
  languages: [
    {
      lang: "Python",
      emoji: "🐍",
      color: "bg-blue-100 text-blue-800",
      syntax: `# Python — Bit Manipulation Complete Reference

# ── Basic Operators ───────────────────────────
a, b = 60, 13   # a=0011 1100, b=0000 1101
print(a & b)     # AND  = 12   (0000 1100)
print(a | b)     # OR   = 61   (0011 1101)
print(a ^ b)     # XOR  = 49   (0011 0001)
print(~a)        # NOT  = -61  (two's complement)
print(a << 2)    # Left shift  = 240 (1111 0000)
print(a >> 2)    # Right shift = 15  (0000 1111)

# ── Python-Specific Notes ─────────────────────
# Python integers have UNLIMITED precision (no overflow!)
# No unsigned right shift (>>>) — Python ints are arbitrary precision
# Use & 0xFFFFFFFF to simulate 32-bit unsigned

# Simulate 32-bit behavior
def to_32bit(n):
    return n & 0xFFFFFFFF

def to_signed_32bit(n):
    n = n & 0xFFFFFFFF
    return n if n < 0x80000000 else n - 0x100000000

# ── Bit Check/Set/Clear/Toggle ────────────────
def get_bit(n, i):    return (n >> i) & 1
def set_bit(n, i):    return n | (1 << i)
def clear_bit(n, i):  return n & ~(1 << i)
def toggle_bit(n, i): return n ^ (1 << i)

# ── Count Set Bits ────────────────────────────
# Method 1: Brian Kernighan (O(set_bits))
def count_bits_bk(n):
    count = 0
    while n:
        n &= n - 1       # remove lowest set bit
        count += 1
    return count

# Method 2: Built-in (Python 3.10+)
def count_bits_builtin(n):
    return bin(n).count('1')

# Method 3: bin() is O(log n)
import bin
print(bin(13).count('1'))   # 3 (13 = 1101)

# ── Power of 2 Check ──────────────────────────
def is_power_of_2(n):
    return n > 0 and (n & (n-1)) == 0

# ── XOR Applications ──────────────────────────
# Swap without temp
a, b = 10, 20
a ^= b; b ^= a; a ^= b
print(a, b)   # 20 10

# Find single element
from functools import reduce
import operator
nums = [1, 2, 3, 2, 1]
single = reduce(operator.xor, nums)  # 3

# ── Bitmask for Subsets ───────────────────────
n = 3
for mask in range(1 << n):
    subset = [i for i in range(n) if mask & (1 << i)]
    print(f"mask {mask:03b} → {subset}")

# ── Practical Formulas ────────────────────────
print(5 & 1)              # 1 (odd)
print(4 & 1)              # 0 (even)
print(8 & (-8))           # 8 (lowest set bit of 8=1000)
print(12 & (-12))         # 4 (lowest set bit of 12=1100)
print(bin(7 ^ (7>>1)))    # 0b100 = Gray code of 7
print(~5 + 1 == -5)       # True (two's complement)
print((100 + 200) >> 1)   # 150 (average without overflow)`,
    },
    {
      lang: "JavaScript",
      emoji: "🟨",
      color: "bg-yellow-100 text-yellow-800",
      syntax: `// JavaScript — Bit Manipulation Complete Reference
// ⚠️ JS bitwise ops work on 32-bit SIGNED integers

// ── Basic Operators ───────────────────────────
let a = 60, b = 13;   // 0011 1100, 0000 1101
console.log(a & b);    // AND  = 12
console.log(a | b);    // OR   = 61
console.log(a ^ b);    // XOR  = 49
console.log(~a);       // NOT  = -61
console.log(a << 2);   // Left shift  = 240
console.log(a >> 2);   // Signed right shift = 15
console.log(-1 >>> 0); // Unsigned right shift = 4294967295

// ── IMPORTANT: JS uses 32-bit signed integers ─
// For numbers > 2^31-1, use BigInt
// -1 >> 0 = -1  (arithmetic, preserves sign)
// -1 >>> 0 = 4294967295 (logical, fills with 0s)

// ── Bit Check/Set/Clear/Toggle ────────────────
const getBit    = (n, i) => (n >> i) & 1;
const setBit    = (n, i) => n | (1 << i);
const clearBit  = (n, i) => n & ~(1 << i);
const toggleBit = (n, i) => n ^ (1 << i);

console.log(getBit(13, 0));    // 1 (13=1101)
console.log(getBit(13, 1));    // 0
console.log(setBit(9, 1));     // 11 (1001→1011)
console.log(clearBit(13, 2));  // 9  (1101→1001)
console.log(toggleBit(13, 0)); // 12 (1101→1100)

// ── Count Set Bits ────────────────────────────
function countBits(n) {
    let count = 0;
    while (n) {
        n &= n - 1;            // remove lowest set bit
        count++;
    }
    return count;
}

// ── Power of 2 ────────────────────────────────
const isPowerOf2 = n => n > 0 && (n & (n-1)) === 0;

// ── XOR Tricks ────────────────────────────────
// Swap without temp
let x = 5, y = 9;
x ^= y; y ^= x; x ^= y;
console.log(x, y);   // 9 5

// Single element in array
function singleNumber(nums) {
    return nums.reduce((xor, n) => xor ^ n, 0);
}

// ── Bitmask for Subsets ───────────────────────
function allSubsets(arr) {
    const n = arr.length;
    const result = [];
    for (let mask = 0; mask < (1 << n); mask++) {
        const subset = [];
        for (let i = 0; i < n; i++) {
            if (mask & (1 << i)) subset.push(arr[i]);
        }
        result.push(subset);
    }
    return result;
}

// ── Practical Formulas ────────────────────────
console.log(5 & 1);          // 1 (odd)
console.log(4 & 1);          // 0 (even)
console.log(8 & -8);         // 8 (lowest set bit)
console.log(Math.floor(100/4) === (100 >> 2));  // true
console.log(1 << 10);        // 1024 = 2^10`,
    },
    {
      lang: "Java",
      emoji: "☕",
      color: "bg-orange-100 text-orange-800",
      syntax: `// Java — Bit Manipulation Complete Reference
// Java uses 32-bit int (signed) and 64-bit long (signed)

// ── Basic Operators ───────────────────────────
int a = 60, b = 13;
System.out.println(a & b);   // AND = 12
System.out.println(a | b);   // OR  = 61
System.out.println(a ^ b);   // XOR = 49
System.out.println(~a);      // NOT = -61
System.out.println(a << 2);  // Left shift  = 240
System.out.println(a >> 2);  // Signed right shift = 15
System.out.println(-1 >>> 1);// Unsigned right shift = 2147483647

// KEY: Java has THREE shift operators:
// <<  : left shift (always fills with 0)
// >>  : signed right shift (fills with sign bit)
// >>> : unsigned right shift (always fills with 0)
// Use >>> when dealing with negative numbers as unsigned

// ── Bit Operations ────────────────────────────
public static int getBit(int n, int i)    { return (n >> i) & 1; }
public static int setBit(int n, int i)    { return n | (1 << i); }
public static int clearBit(int n, int i)  { return n & ~(1 << i); }
public static int toggleBit(int n, int i) { return n ^ (1 << i); }

// ── Count Set Bits ────────────────────────────
// Method 1: Brian Kernighan
public static int countBits(int n) {
    int count = 0;
    while (n != 0) {
        n &= n - 1;   // remove lowest set bit
        count++;
    }
    return count;
}

// Method 2: Java built-in
Integer.bitCount(13);     // 3
Integer.bitCount(255);    // 8
Long.bitCount(1234567890L);

// ── Power of 2 ────────────────────────────────
public static boolean isPowerOf2(int n) {
    return n > 0 && (n & (n-1)) == 0;
}
// OR: Integer.bitCount(n) == 1

// ── XOR Applications ──────────────────────────
// Single number
public static int singleNumber(int[] nums) {
    int result = 0;
    for (int n : nums) result ^= n;
    return result;
}

// Swap without temp
int x = 5, y = 9;
x ^= y;  y ^= x;  x ^= y;
System.out.println(x + " " + y);   // 9 5

// ── Bitmask Subsets ───────────────────────────
public static List<List<Integer>> subsets(int[] nums) {
    int n = nums.length;
    List<List<Integer>> result = new ArrayList<>();
    for (int mask = 0; mask < (1 << n); mask++) {
        List<Integer> subset = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if ((mask & (1 << i)) != 0)
                subset.add(nums[i]);
        }
        result.add(subset);
    }
    return result;
}

// ── Java Utility Methods ──────────────────────
Integer.toBinaryString(13);          // "1101"
Integer.parseInt("1101", 2);         // 13
Integer.highestOneBit(13);           // 8  (highest set bit)
Integer.lowestOneBit(12);            // 4  (lowest set bit)
Integer.numberOfLeadingZeros(13);    // 28
Integer.numberOfTrailingZeros(12);   // 2
Integer.reverse(13);                 // bit-reversed
Integer.reverseBytes(0x12345678);    // 0x78563412`,
    },
    {
      lang: "C++",
      emoji: "⚙️",
      color: "bg-purple-100 text-purple-800",
      syntax: `// C++ — Bit Manipulation Complete Reference
#include <bits/stdc++.h>
using namespace std;

// ── Basic Operators ───────────────────────────
int a = 60, b = 13;
cout << (a & b);   // AND = 12
cout << (a | b);   // OR  = 61
cout << (a ^ b);   // XOR = 49
cout << (~a);      // NOT = -61
cout << (a << 2);  // Left shift  = 240
cout << (a >> 2);  // Right shift = 15

// C++ uses signed >> (arithmetic shift)
// For unsigned behavior, use unsigned int type

// ── Bit Operations ────────────────────────────
auto getBit    = [](int n, int i) { return (n >> i) & 1; };
auto setBit    = [](int n, int i) { return n | (1 << i); };
auto clearBit  = [](int n, int i) { return n & ~(1 << i); };
auto toggleBit = [](int n, int i) { return n ^ (1 << i); };

// ── Count Set Bits ────────────────────────────
// Method 1: Brian Kernighan
int countBits(int n) {
    int count = 0;
    while (n) { n &= n-1; count++; }
    return count;
}

// Method 2: Built-in GCC (very fast, single CPU instruction)
__builtin_popcount(13);       // 3 (count set bits, 32-bit)
__builtin_popcountll(13LL);   // 3 (count set bits, 64-bit)
__builtin_clz(13);            // 28 (count leading zeros)
__builtin_ctz(12);            // 2  (count trailing zeros)
__builtin_parity(13);         // 1  (parity: XOR of all bits)

// ── Power of 2 ────────────────────────────────
bool isPowerOf2(int n) {
    return n > 0 && !(n & (n-1));
}

// ── Single Number (XOR) ───────────────────────
int singleNumber(vector<int>& nums) {
    return reduce(nums.begin(), nums.end(), 0, bit_xor<int>());
    // OR simpler:
    int res = 0;
    for (int x : nums) res ^= x;
    return res;
}

// ── Bitmask Subsets ───────────────────────────
vector<vector<int>> subsets(vector<int>& nums) {
    int n = nums.size();
    vector<vector<int>> result;
    for (int mask = 0; mask < (1 << n); mask++) {
        vector<int> subset;
        for (int i = 0; i < n; i++)
            if (mask & (1 << i))
                subset.push_back(nums[i]);
        result.push_back(subset);
    }
    return result;
}

// ── Iterate subsets of a mask ─────────────────
void iterateSubsets(int mask) {
    for (int sub = mask; sub > 0; sub = (sub-1) & mask) {
        // process sub
        cout << bitset<8>(sub) << "\\n";
    }
}

// ── Useful C++ Bit Tricks ─────────────────────
// Print binary
cout << bitset<8>(13) << "\\n";   // 00001101

// Swap using XOR
int x = 5, y = 9;
x ^= y; y ^= x; x ^= y;

// Lowest set bit
int lsb = n & (-n);               // lowest set bit value
int lsb_pos = __builtin_ctz(n);   // position of lowest set bit

// Highest set bit position
int msb_pos = 31 - __builtin_clz(n);`,
    },
  ],

  // ─────────────────────────────────────────────
  // PATTERNS
  // ─────────────────────────────────────────────
  patterns: [
    {
      name: "XOR to Cancel Duplicates",
      emoji: "✖️",
      color: "bg-yellow-50 border-yellow-200",
      titleColor: "text-yellow-800",
      when: "Find single element among duplicates, detect changes, swap without temp",
      avoid: "When you need to count occurrences (use HashMap) or when elements appear odd/even arbitrary times",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      steps: [
        "XOR all elements together",
        "Duplicate pairs cancel: n^n = 0",
        "Single element survives: n^0 = n",
        "Result is the answer",
      ],
      template: `def find_single(nums):
    result = 0
    for n in nums:
        result ^= n       # pairs cancel, single survives
    return result

# Works because:
# a ^ a = 0 (same values cancel)
# a ^ 0 = a (survives XOR with 0)
# XOR is commutative & associative
# So order doesn't matter!`,
    },
    {
      name: "Bit Masking for Set Membership",
      emoji: "🎭",
      color: "bg-indigo-50 border-indigo-200",
      titleColor: "text-indigo-800",
      when: "Represent sets/subsets, check presence, enumerate combinations, bitmask DP",
      avoid: "When n > 64 (bitmask too large for integer type)",
      timeComplexity: "O(2^n) for full enumeration",
      spaceComplexity: "O(1) per mask operation",
      steps: [
        "Represent set as integer (bit i = 1 means element i is in set)",
        "Check: (mask >> i) & 1",
        "Add: mask | (1 << i)",
        "Remove: mask & ~(1 << i)",
        "Enumerate all subsets: for mask in range(1 << n)",
      ],
      template: `def enumerate_subsets(arr):
    n = len(arr)
    for mask in range(1 << n):          # 0 to 2^n-1
        subset = []
        for i in range(n):
            if mask & (1 << i):         # is element i in this subset?
                subset.append(arr[i])
        yield mask, subset

# Iterate subsets of a given mask:
def subsets_of_mask(mask):
    sub = mask
    while sub:
        yield sub
        sub = (sub - 1) & mask          # clever: next smaller subset`,
    },
    {
      name: "Brian Kernighan: Count/Clear Set Bits",
      emoji: "⚡",
      color: "bg-green-50 border-green-200",
      titleColor: "text-green-800",
      when: "Count set bits efficiently, iterate over only set bits, clear specific bits",
      avoid: "When n is always small (naive bit checking may be simpler)",
      timeComplexity: "O(set bits) — faster than O(32) for sparse numbers",
      spaceComplexity: "O(1)",
      steps: [
        "n & (n-1) removes the LOWEST set bit",
        "Loop while n > 0",
        "Each iteration processes one set bit",
        "Count iterations for popcount",
      ],
      template: `def count_set_bits(n):
    count = 0
    while n:
        n &= n - 1          # removes lowest set bit
        count += 1
    return count

# Iterate over only set bits (their positions):
def set_bit_positions(n):
    positions = []
    i = 0
    while n:
        if n & 1:           # check lowest bit
            positions.append(i)
        n >>= 1             # shift right
        i += 1
    return positions

# Or using isolate trick:
def set_bit_positions_v2(n):
    positions = []
    while n:
        lsb = n & (-n)                    # isolate lowest set bit
        positions.append(lsb.bit_length()-1)  # find its position
        n ^= lsb                          # remove it
    return positions`,
    },
    {
      name: "Power of 2 Check — n & (n-1)",
      emoji: "2️⃣",
      color: "bg-blue-50 border-blue-200",
      titleColor: "text-blue-800",
      when: "Check if number is power of 2, count set bits is 1, validate hash table sizes",
      avoid: "General divisibility (n % k == 0 is clearer for non-powers-of-2)",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      steps: [
        "Powers of 2 have exactly one set bit: 1,2,4,8,16...",
        "n-1 for power of 2 flips all bits below the set bit",
        "n & (n-1) = 0 only when n has exactly one set bit",
        "Must also check n > 0 (0 is not a power of 2)",
      ],
      template: `def is_power_of_2(n):
    return n > 0 and (n & (n-1)) == 0

# Related: is power of 4?
def is_power_of_4(n):
    # Power of 4: power of 2 AND set bit at even position
    return n > 0 and (n & (n-1)) == 0 and (n & 0xAAAAAAAA) == 0

# Is power of 3? (can't use bit tricks cleanly — 3 is not 2^k)
def is_power_of_3(n):
    return n > 0 and 3**19 % n == 0  # 3^19 is largest power of 3 in 32-bit int`,
    },
  ],

  // ─────────────────────────────────────────────
  // PROBLEMS
  // ─────────────────────────────────────────────
  problems: [
    {
      name: "Single Number",
      difficulty: "Easy",
      companies: ["Amazon", "Facebook", "Microsoft", "Google", "Adobe"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/single-number/", id: "#136" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/find-element-appears-array-every-element-appears-twice/", id: "Practice" },
      ],
      statement: "Every element appears twice except one. Find that element. O(n) time, O(1) space.",
      example: "[4,1,2,1,2] → 4 | [2,2,1] → 1",
      constraints: ["O(n) time", "O(1) extra space", "Every element except one appears exactly twice"],
      approaches: [
        {
          title: "HashMap — Count Frequencies",
          emoji: "🗂️",
          tag: "O(n) space",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "Count each element. Return the one with count 1.",
          when: "Intuitive. Fails O(1) space constraint.",
          code: `def single_number_hash(nums):
    from collections import Counter
    count = Counter(nums)
    for k, v in count.items():
        if v == 1: return k`,
        },
        {
          title: "Sort and Scan",
          emoji: "📊",
          tag: "O(n log n)",
          complexity: "Time: O(n log n) | Space: O(1)",
          idea: "Sort array. Pairs are adjacent. Single element breaks the pattern.",
          when: "Better than HashMap for space but not optimal time.",
          code: `def single_number_sort(nums):
    nums.sort()
    i = 0
    while i < len(nums) - 1:
        if nums[i] == nums[i+1]:
            i += 2    # skip pair
        else:
            return nums[i]
    return nums[-1]`,
        },
        {
          title: "XOR — Perfect Solution",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "XOR all elements. Same elements cancel (n^n=0). Single element remains (n^0=n).",
          when: "Always. This is THE answer. Memorize it.",
          code: `def single_number(nums):
    result = 0
    for n in nums:
        result ^= n
    return result

# One-liner in Python:
from functools import reduce
import operator
single = reduce(operator.xor, nums)

# WHY XOR works:
# [4, 1, 2, 1, 2]
# Start: 0
# XOR 4: 0^4 = 4
# XOR 1: 4^1 = 5
# XOR 2: 5^2 = 7
# XOR 1: 7^1 = 6   (1^1 = 0 cancels)
# XOR 2: 6^2 = 4   (2^2 = 0 cancels)
# Result: 4 ✅`,
        },
      ],
      ai: {
        hints: ["What happens when you XOR a number with itself?", "What property of XOR makes duplicate pairs cancel?"],
        followUps: ["Single Number II (appears 3 times)", "Single Number III (two unique elements)", "Missing Number"],
        interviewQuestions: ["What if every element appears 3 times?", "What if there are two unique elements?"],
      },
    },

    {
      name: "Number of 1 Bits (Hamming Weight)",
      difficulty: "Easy",
      companies: ["Apple", "Microsoft", "Amazon", "Google"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/number-of-1-bits/", id: "#191" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/count-set-bits-in-an-integer/", id: "Practice" },
      ],
      statement: "Return the number of '1' bits in the binary representation of a positive integer (Hamming weight).",
      example: "11 (1011) → 3 | 128 (10000000) → 1 | 2147483645 → 30",
      constraints: ["n is a positive integer", "Treat as unsigned 32-bit integer"],
      approaches: [
        {
          title: "Check Each Bit (Loop 32 times)",
          emoji: "📊",
          tag: "O(32)",
          complexity: "Time: O(32) = O(1) | Space: O(1)",
          idea: "Loop 32 times. Check each bit. Count 1s.",
          when: "Simple. Always constant time. Good starting point.",
          code: `def hamming_weight_naive(n):
    count = 0
    for i in range(32):
        if n & 1:         # check lowest bit
            count += 1
        n >>= 1           # shift right
    return count`,
        },
        {
          title: "Brian Kernighan — Count Only Set Bits",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(set bits) | Space: O(1)",
          idea: "n & (n-1) removes lowest set bit. Loop exactly as many times as there are set bits. Faster for sparse numbers.",
          when: "Best. Interview gold standard for counting set bits.",
          code: `def hamming_weight(n):
    count = 0
    while n:
        n &= n - 1       # remove lowest set bit
        count += 1       # one less set bit
    return count

# Trace for n=13 (1101):
# n=1101: n-1=1100, n&(n-1)=1100, count=1
# n=1100: n-1=1011, n&(n-1)=1000, count=2
# n=1000: n-1=0111, n&(n-1)=0000, count=3
# n=0: loop ends
# Return 3 ✅`,
        },
        {
          title: "DP Approach (Count bits 0 to n)",
          emoji: "💡",
          tag: "O(n) for range",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "When counting for all numbers 0..n: dp[i] = dp[i>>1] + (i&1). Each number has same bits as its half, plus last bit.",
          when: "When you need counts for all numbers 0 to n (LeetCode #338).",
          code: `def count_bits_range(n):
    dp = [0] * (n + 1)
    for i in range(1, n+1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp

# dp[0]=0, dp[1]=1, dp[2]=1, dp[3]=2, dp[4]=1, dp[5]=2...
# dp[6] = dp[3] + 0 = 2
# dp[7] = dp[3] + 1 = 3`,
        },
      ],
      ai: {
        hints: ["n & (n-1) always removes exactly one bit. Which one?", "How many loop iterations does Brian Kernighan's need?"],
        followUps: ["Counting Bits (0 to n)", "Reverse Bits", "Power of Two"],
        interviewQuestions: ["Why is Brian Kernighan's faster for sparse numbers?", "Extend to count bits for all numbers 0..n in O(n)?"],
      },
    },

    {
      name: "Missing Number",
      difficulty: "Easy",
      companies: ["Amazon", "Microsoft", "Google", "Bloomberg"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/missing-number/", id: "#268" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/find-the-missing-number/", id: "Practice" },
      ],
      statement: "Array contains n distinct numbers in range [0,n]. Find the missing number.",
      example: "[3,0,1] → 2 | [0,1] → 2 | [9,6,4,2,3,5,7,0,1] → 8",
      constraints: ["Exactly one number missing", "n distinct numbers in [0, n]"],
      approaches: [
        {
          title: "Sum Formula",
          emoji: "➕",
          tag: "O(1) extra",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Expected sum = n*(n+1)/2. Actual sum = sum of array. Missing = expected - actual.",
          when: "Simple and clean. Beware of integer overflow for large n.",
          code: `def missing_number_sum(nums):
    n = len(nums)
    expected = n * (n+1) // 2
    return expected - sum(nums)`,
        },
        {
          title: "XOR — Elegant Solution",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "XOR all values 0..n with all array values. Pairs cancel. Missing number remains.",
          when: "No overflow risk. More elegant. Shows XOR mastery.",
          code: `def missing_number(nums):
    result = len(nums)                # start with n
    for i, num in enumerate(nums):
        result ^= i ^ num             # XOR with index and value
    return result

# WHY:
# result = n ^ 0 ^ nums[0] ^ 1 ^ nums[1] ^ ... ^ (n-1) ^ nums[n-1]
# Every index i appears twice (once as i, once as nums[i] if not missing)
# Except the missing index — it appears only once as i
# So all pairs cancel, leaving the missing number`,
        },
      ],
      ai: {
        hints: ["What would XOR of [0,1,2,...,n] with all array elements give?", "Pairs cancel in XOR — only unpaired number survives"],
        followUps: ["Find All Numbers Disappeared in Array", "Single Number", "Find Duplicate Number"],
        interviewQuestions: ["What if two numbers were missing?", "What if numbers could be outside [0,n]?"],
      },
    },

    {
      name: "Power of Two",
      difficulty: "Easy",
      companies: ["Google", "Apple", "Amazon"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/power-of-two/", id: "#231" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/program-to-find-whether-a-no-is-power-of-two/", id: "Practice" },
      ],
      statement: "Given an integer n, return true if it is a power of two.",
      example: "1 → true | 16 → true | 3 → false | 0 → false",
      constraints: ["-2^31 ≤ n ≤ 2^31 - 1"],
      approaches: [
        {
          title: "Keep Dividing by 2",
          emoji: "➗",
          tag: "O(log n)",
          complexity: "Time: O(log n) | Space: O(1)",
          idea: "Keep dividing by 2. If we reach 1 → power of 2. If we get odd number before 1 → not power of 2.",
          when: "Intuitive. Shows the concept clearly.",
          code: `def is_power_of_two_naive(n):
    if n <= 0: return False
    while n % 2 == 0:
        n //= 2
    return n == 1`,
        },
        {
          title: "Bit Trick — n & (n-1) == 0",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(1) | Space: O(1)",
          idea: "Powers of 2 have exactly one set bit. n & (n-1) removes the lowest set bit. If result is 0 → only one bit was set → power of 2.",
          when: "Always. Single operation. O(1) guaranteed.",
          code: `def is_power_of_two(n):
    return n > 0 and (n & (n-1)) == 0

# Powers of 2: 1(0001), 2(0010), 4(0100), 8(1000)
# n & (n-1):
#  1 & 0 = 0  ✅
#  2 & 1 = 0  ✅ (10 & 01)
#  4 & 3 = 0  ✅ (100 & 011)
#  8 & 7 = 0  ✅ (1000 & 0111)
#  6 & 5 = 4  ❌ (110 & 101 = 100 ≠ 0)`,
        },
        {
          title: "Count Set Bits == 1",
          emoji: "🔢",
          tag: "Alternative O(1)",
          complexity: "Time: O(1) | Space: O(1)",
          idea: "Power of 2 has exactly 1 set bit. Count set bits using built-in.",
          when: "Readable alternative using built-in popcount.",
          code: `def is_power_of_two_v2(n):
    return n > 0 and bin(n).count('1') == 1
    # OR in C++: __builtin_popcount(n) == 1
    # OR in Java: Integer.bitCount(n) == 1`,
        },
      ],
      ai: {
        hints: ["What do powers of 2 look like in binary?", "What does n-1 look like for a power of 2?"],
        followUps: ["Power of Three", "Power of Four", "Number of 1 Bits"],
        interviewQuestions: ["Can you generalize to power of 4?", "Why does n & (n-1) == 0 work?"],
      },
    },

    {
      name: "Reverse Bits",
      difficulty: "Easy",
      companies: ["Apple", "Amazon", "Microsoft"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/reverse-bits/", id: "#190" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/reverse-bits-of-a-given-32-bits-unsigned-integer/", id: "Practice" },
      ],
      statement: "Reverse the bits of a given 32-bit unsigned integer.",
      example: "43261596 (00000010100101000001111010011100) → 964176192 (00111001011110000010100101000000)",
      constraints: ["Treat as unsigned 32-bit integer", "Exactly 32 bits"],
      approaches: [
        {
          title: "Bit by Bit Reversal",
          emoji: "🔄",
          tag: "Standard",
          complexity: "Time: O(32) = O(1) | Space: O(1)",
          idea: "Extract bits from right of n, add them to left of result. Repeat 32 times.",
          when: "Clear and direct. Always works.",
          code: `def reverse_bits(n):
    result = 0
    for i in range(32):
        result = (result << 1) | (n & 1)  # add n's last bit to result's front
        n >>= 1                            # shift n right
    return result

# Trace (simplified for 8 bits instead of 32):
# n=1011, result=0
# i=0: result=(0<<1)|1=1, n=101
# i=1: result=(1<<1)|1=3, n=10
# i=2: result=(3<<1)|0=6, n=1
# i=3: result=(6<<1)|1=13=1101 ← reversed!`,
        },
        {
          title: "Divide and Conquer — Swap Bit Groups",
          emoji: "⚡",
          tag: "OPTIMAL (O(1) no loop)",
          complexity: "Time: O(1) | Space: O(1)",
          idea: "Swap groups of bits in O(1): first swap 16-bit halves, then 8-bit groups, then 4-bit, 2-bit, finally individual bits.",
          when: "Shows deep bit mastery. O(1) with no loop.",
          code: `def reverse_bits_optimal(n):
    n = (n >> 16) | (n << 16)              # swap 16-bit halves
    n = ((n & 0xFF00FF00) >> 8)  | ((n & 0x00FF00FF) << 8)   # swap bytes
    n = ((n & 0xF0F0F0F0) >> 4)  | ((n & 0x0F0F0F0F) << 4)   # swap nibbles
    n = ((n & 0xCCCCCCCC) >> 2)  | ((n & 0x33333333) << 2)   # swap 2-bit groups
    n = ((n & 0xAAAAAAAA) >> 1)  | ((n & 0x55555555) << 1)   # swap individual bits
    return n & 0xFFFFFFFF   # ensure 32-bit unsigned

# Used in production reversals. Mask meanings:
# 0xFF00FF00 = 11111111 00000000 11111111 00000000 (upper bytes)
# 0x00FF00FF = 00000000 11111111 00000000 11111111 (lower bytes)`,
        },
      ],
      ai: {
        hints: ["Process bits one at a time from right to left", "Build result by shifting and ORing"],
        followUps: ["Number of 1 Bits", "Reverse Integer", "Palindrome Number"],
        interviewQuestions: ["What if called many times? (use cache)", "How does divide & conquer approach work?"],
      },
    },

    {
      name: "Single Number II (appears 3 times)",
      difficulty: "Medium",
      companies: ["Google", "Facebook", "Amazon", "Microsoft"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/single-number-ii/", id: "#137" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/find-the-element-that-appears-once/", id: "Practice" },
      ],
      statement: "Every element appears 3 times except one which appears once. Find it. O(n) time, O(1) space.",
      example: "[2,2,3,2] → 3 | [0,1,0,1,0,1,99] → 99",
      constraints: ["Every element except one appears EXACTLY 3 times", "O(1) space required"],
      approaches: [
        {
          title: "HashMap",
          emoji: "🗂️",
          tag: "O(n) space",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "Count occurrences. Return element with count 1.",
          when: "Simple but uses O(n) space — violates constraint.",
          code: `def single_number_ii_hash(nums):
    from collections import Counter
    for k, v in Counter(nums).items():
        if v == 1: return k`,
        },
        {
          title: "Bit Counting Per Position",
          emoji: "🔢",
          tag: "O(1) space",
          complexity: "Time: O(32n) = O(n) | Space: O(1)",
          idea: "For each of the 32 bit positions: sum the bit values across all numbers. Take modulo 3. If remainder = 1, that bit belongs to the single element.",
          when: "Clean O(1) space solution. Works for 'every element appears k times except one'.",
          code: `def single_number_ii_bits(nums):
    result = 0
    for i in range(32):
        bit_sum = sum((n >> i) & 1 for n in nums)
        if bit_sum % 3:                   # this bit belongs to the single
            result |= (1 << i)
    # Handle negative numbers in Python (32-bit signed)
    if result >= 2**31:
        result -= 2**32
    return result`,
        },
        {
          title: "Bit State Machine — Two Bitmasks",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: `Use two variables 'ones' and 'twos' to track bits seen 1 time and 2 times.
When a bit is seen 3 times → clear it from both.
'ones' will contain bits seen exactly once overall.

State machine for each bit:
(ones_bit, twos_bit) transitions:
(0,0) → sees bit → (1,0)    [seen 1 time]
(1,0) → sees bit → (0,1)    [seen 2 times]  
(0,1) → sees bit → (0,0)    [seen 3 times, reset]`,
          when: "Most elegant. The standard interview answer for this problem.",
          code: `def single_number_ii(nums):
    ones = twos = 0
    for n in nums:
        ones = (ones ^ n) & ~twos    # add to ones if not in twos
        twos = (twos ^ n) & ~ones    # add to twos if not in ones
    return ones                       # ones has bits seen exactly once

# State transitions:
# ones tracks bits seen 1 mod 3 times
# twos tracks bits seen 2 mod 3 times
# When seen 3 times, bit clears from both
# After processing all: ones has bits of the single element`,
        },
      ],
      ai: {
        hints: ["Can you track bits seen 1, 2, and 3 times?", "Modulo 3 arithmetic on each bit position"],
        followUps: ["Single Number III (two unique elements)", "Single Number (appears twice)", "Find Element Appears Once (appears twice rest)"],
        interviewQuestions: ["Generalize to 'every element appears k times'?", "Explain the state machine approach?"],
      },
    },

    {
      name: "Single Number III (Two Unique Elements)",
      difficulty: "Medium",
      companies: ["Google", "Amazon", "Facebook"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/single-number-iii/", id: "#260" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/find-two-non-repeating-elements-in-an-array-of-repeating-elements/", id: "Practice" },
      ],
      statement: "Every element appears twice except two. Find both unique elements. O(n) time, O(1) space.",
      example: "[1,2,1,3,2,5] → [3,5] | [1,2] → [1,2]",
      constraints: ["Exactly two unique elements", "O(1) extra space", "All other elements appear twice"],
      approaches: [
        {
          title: "XOR Split into Two Groups",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: `Step 1: XOR all → a^b (unique elements cancel duplicates)
Step 2: Find any set bit in a^b — this bit DIFFERS between a and b
Step 3: Split all elements by this bit → a in one group, b in other
Step 4: XOR each group → gives a and b (duplicates cancel within groups)`,
          when: "Always. This is the O(1) space solution.",
          code: `def single_number_iii(nums):
    # Step 1: XOR all — get a^b
    xor = 0
    for n in nums: xor ^= n
    
    # Step 2: Find rightmost set bit (differs between a and b)
    diff_bit = xor & (-xor)    # isolate lowest set bit
    
    # Step 3 & 4: Divide into two groups, XOR each
    a = b = 0
    for n in nums:
        if n & diff_bit:        # this bit is SET → goes to group a
            a ^= n
        else:                   # this bit is NOT SET → goes to group b
            b ^= n
    
    return [a, b]

# WHY groups separate a and b:
# diff_bit is set in a, not in b (or vice versa)
# Every duplicate pair (x,x) has same bits at diff_bit position
# → both copies go to same group → cancel each other
# Only a and b are separated → survive XOR in their group`,
        },
      ],
      ai: {
        hints: ["XOR all gives a^b. How can you separate a from b?", "Find one bit where a and b differ"],
        followUps: ["Single Number", "Single Number II", "Find Missing and Repeated"],
        interviewQuestions: ["What if there were three unique elements?", "Why does diff_bit separate a and b but keep duplicates together?"],
      },
    },

    {
      name: "Subsets (Bitmask Approach)",
      difficulty: "Medium",
      companies: ["Amazon", "Facebook", "Google", "Microsoft", "Bloomberg"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/subsets/", id: "#78" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/power-set/", id: "Practice" },
      ],
      statement: "Given integer array, return all possible subsets (power set).",
      example: "[1,2,3] → [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
      constraints: ["No duplicate subsets", "Solution set must not contain duplicates"],
      approaches: [
        {
          title: "Backtracking",
          emoji: "🔄",
          tag: "Standard",
          complexity: "Time: O(2^n × n) | Space: O(n)",
          idea: "At each element: include or exclude. Recurse both ways.",
          when: "Most common approach. Good for understanding.",
          code: `def subsets_backtrack(nums):
    result = []
    def backtrack(start, current):
        result.append(current[:])
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i+1, current)
            current.pop()
    backtrack(0, [])
    return result`,
        },
        {
          title: "Bitmask — Elegant O(2^n × n)",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(2^n × n) | Space: O(2^n × n) for result",
          idea: "Each of 2^n possible subsets corresponds to a binary mask. Bit i = 1 means nums[i] is in the subset. Enumerate all masks 0 to 2^n-1.",
          when: "Shows bit manipulation mastery. Very clean code.",
          code: `def subsets_bitmask(nums):
    n = len(nums)
    result = []
    
    for mask in range(1 << n):          # 0 to 2^n - 1
        subset = []
        for i in range(n):
            if mask & (1 << i):         # bit i is set → include nums[i]
                subset.append(nums[i])
        result.append(subset)
    
    return result

# For nums=[1,2,3]:
# mask=000 (0): {} → []
# mask=001 (1): {1} → [1]
# mask=010 (2): {2} → [2]
# mask=011 (3): {1,2} → [1,2]
# mask=100 (4): {3} → [3]
# mask=101 (5): {1,3} → [1,3]
# mask=110 (6): {2,3} → [2,3]
# mask=111 (7): {1,2,3} → [1,2,3]`,
        },
      ],
      ai: {
        hints: ["n elements → 2^n subsets. Each subset maps to a unique binary number.", "Bit i = 1 means element i is included"],
        followUps: ["Subsets II (with duplicates)", "Combination Sum", "Letter Combinations of Phone Number"],
        interviewQuestions: ["How does bitmask enumerate all 2^n subsets?", "What's the maximum n you can handle with bitmask approach?"],
      },
    },

    {
      name: "Sum of Two Integers Without + or -",
      difficulty: "Medium",
      companies: ["Facebook", "Google", "Amazon", "Microsoft"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/sum-of-two-integers/", id: "#371" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/add-two-numbers-without-using-arithmetic-operators/", id: "Practice" },
      ],
      statement: "Given two integers a and b, return their sum WITHOUT using + or - operators.",
      example: "a=1, b=2 → 3 | a=2, b=3 → 5",
      constraints: ["Cannot use + or - operators", "-1000 ≤ a, b ≤ 1000"],
      approaches: [
        {
          title: "Bit Addition — XOR and Carry",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(1) — 32 iterations max | Space: O(1)",
          idea: `Binary addition insight:
XOR gives sum without carry: 1^1=0 (sum), 1+0=1 (sum), 0+0=0
AND gives carry bits: 1&1=1 (carry), anything else = 0
Carry shifts left by 1

Repeat until no more carry:
1. sum_without_carry = a ^ b
2. carry = (a & b) << 1
3. a = sum_without_carry, b = carry
4. Repeat until b == 0`,
          when: "Classic bit manipulation problem. Know this cold.",
          code: `def get_sum(a, b):
    # Python needs 32-bit masking (unlimited precision integers)
    mask = 0xFFFFFFFF          # 32-bit mask
    
    while b & mask:            # while carry exists
        carry = (a & b) << 1   # AND gives carry, shift left
        a = a ^ b              # XOR gives sum without carry
        b = carry
    
    # Handle negative numbers in Python
    # If result fits in 32-bit signed, return as-is
    # Otherwise convert from unsigned to signed
    if a >> 31 & 1:            # sign bit set → negative
        return ~(a ^ mask)     # convert to Python negative
    return a

# Without Python-specific handling (conceptual):
def get_sum_simple(a, b):
    while b:
        carry = (a & b) << 1   # generate carries
        a = a ^ b              # sum without carries
        b = carry              # next iteration handles carries
    return a

# Trace: a=5(101), b=3(011)
# Iteration 1: carry = (101&011)<<1 = 001<<1 = 010
#              a = 101^011 = 110
#              b = 010
# Iteration 2: carry = (110&010)<<1 = 010<<1 = 100
#              a = 110^010 = 100
#              b = 100
# Iteration 3: carry = (100&100)<<1 = 100<<1 = 1000
#              a = 100^100 = 000
#              b = 1000
# Iteration 4: carry = (000&1000)<<1 = 0
#              a = 000^1000 = 1000
#              b = 0
# Return 1000 = 8 ✅ (5+3=8)`,
        },
      ],
      ai: {
        hints: ["What does XOR do to two bits? What does AND do?", "Think about how binary addition works with carry"],
        followUps: ["Divide Two Integers (without division)", "Multiply Strings"],
        interviewQuestions: ["Explain binary addition step by step", "Why does this terminate in at most 32 iterations?"],
      },
    },
  ],

  // ─────────────────────────────────────────────
  // INTERVIEW TIPS
  // ─────────────────────────────────────────────
  interviewTips: [
    "The XOR trick (n^n=0, n^0=n) solves 'find unique element' problems in O(1) space — memorize it",
    "n & (n-1) removes lowest set bit — used for counting set bits AND checking power of 2",
    "1 << i creates a mask for bit i — use for get/set/clear/toggle bit operations",
    "For 'every element appears k times except one' — use bit counting mod k",
    "Bitmask DP: if n ≤ 20, consider representing state as bitmask (2^20 ≈ 1M states)",
    "Always check for negative number handling in Java/C++ (use >>> for unsigned right shift)",
    "In Python: integers have unlimited precision — use & 0xFFFFFFFF to simulate 32-bit",
    "Gray code formula: gray(n) = n ^ (n>>1) — mention if asked about encoding",
    "Swap without temp: a^=b; b^=a; a^=b — but note risk if a and b are same variable",
    "count_set_bits(n) = count_set_bits(n>>1) + (n&1) — useful for DP on bit counts",
  ],

  // ─────────────────────────────────────────────
  // COMMON MISTAKES
  // ─────────────────────────────────────────────
  mistakes: [
    "In Java: >> preserves sign bit, >>> fills with 0. Use >>> for unsigned operations",
    "Python integers don't overflow — use & 0xFFFFFFFF when simulating 32-bit unsigned",
    "~n in Python gives -(n+1) not a simple bit flip (unlimited precision)",
    "JavaScript: all bitwise ops work on 32-bit SIGNED integers — numbers above 2^31 get truncated",
    "XOR swap: a^=b; b^=a; a^=b — FAILS if a and b reference the same memory location",
    "1 << 31 in Java is MIN_INT (negative) — use 1L << 31 for long, or be careful",
    "Bitmask for n > 30 elements: use long (64-bit) or BigInt — int can't hold 2^31+",
    "n & (n-1) when n=0: result is 0 but 0 is NOT a power of 2 — always check n > 0",
    "Confusing bit INDEX (0-based from right) with bit VALUE (1 << index)",
  ],

  // ─────────────────────────────────────────────
  // QUIZ
  // ─────────────────────────────────────────────
  quiz: [
    {
      q: "What does n & (n-1) do?",
      options: [
        "Checks if n is even",
        "Removes the LOWEST (rightmost) set bit of n",
        "Adds 1 to n",
        "Checks if n is power of 2",
      ],
      answer: 1,
      explanation: "n & (n-1) removes exactly the lowest set bit. Example: n=1100, n-1=1011, n&(n-1)=1000 (rightmost 1 removed). This is Brian Kernighan's trick — loop count = number of set bits.",
    },
    {
      q: "What is 5 ^ 5?",
      options: ["10", "25", "0", "1"],
      answer: 2,
      explanation: "XOR of any number with itself is 0. 5^5: each bit position has same value in both → XOR gives 0. This property is what makes XOR cancel duplicate elements in arrays.",
    },
    {
      q: "How do you set bit at position i in number n?",
      options: ["n & (1 << i)", "n | (1 << i)", "n ^ (1 << i)", "n & ~(1 << i)"],
      answer: 1,
      explanation: "n | (1 << i): 1<<i creates a mask with only bit i set. OR with n sets that bit (OR with 1 always sets, OR with 0 leaves unchanged). n&(1<<i) checks, n^(1<<i) toggles, n&~(1<<i) clears.",
    },
    {
      q: "Array has all elements twice except one. What's the O(1) space solution?",
      options: [
        "Sort and scan for odd one out",
        "XOR all elements — duplicates cancel, unique survives",
        "HashMap to count frequencies",
        "Sum formula: expected sum - actual sum",
      ],
      answer: 1,
      explanation: "XOR all elements: each duplicate pair (x^x=0) cancels. The unique element XORed with 0 remains (n^0=n). Result = the single element. Time O(n), Space O(1). Sum formula also works but has overflow risk.",
    },
    {
      q: "n & (-n) gives what?",
      options: [
        "Always 0",
        "Always -1",
        "The lowest (rightmost) set bit of n as a power of 2",
        "n squared",
      ],
      answer: 2,
      explanation: "-n in two's complement = ~n + 1. This flips all bits after the lowest set bit, making n and -n agree ONLY at the lowest set bit position. So n & (-n) isolates exactly the lowest set bit. Example: n=12(1100), -n=0100, 12&-12=4(0100).",
    },
    {
      q: "What is 1 << 4?",
      options: ["4", "8", "16", "5"],
      answer: 2,
      explanation: "1 << k = 2^k. So 1 << 4 = 2^4 = 16. This is the most common way to create bit masks. 1<<0=1, 1<<1=2, 1<<2=4, 1<<3=8, 1<<4=16. Remember: 1<<k has exactly 1 bit set, at position k.",
    },
    {
      q: "How many subsets does a set of n elements have?",
      options: ["n", "n²", "n!", "2^n"],
      answer: 3,
      explanation: "Each element is either IN or OUT of a subset (2 choices). For n elements: 2×2×...×2 = 2^n total subsets. With bitmask: each integer from 0 to 2^n-1 represents one subset. For n=3: 8 subsets including empty set.",
    },
  ],

  // ─────────────────────────────────────────────
  // PRACTICE LINKS
  // ─────────────────────────────────────────────
  practice_links: [
    { platform: "LeetCode Bit Manipulation", url: "https://leetcode.com/tag/bit-manipulation/", color: "bg-orange-500", problems: "200+ problems", recommended: true },
    { platform: "Striver's Bit Manipulation", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", color: "bg-indigo-600", problems: "Complete roadmap", recommended: true },
    { platform: "GFG Bit Magic", url: "https://www.geeksforgeeks.org/bits-manipulation-important-tactics/", color: "bg-green-600", problems: "All tricks explained" },
    { platform: "NeetCode Bit Manipulation", url: "https://neetcode.io/roadmap", color: "bg-violet-600", problems: "Curated problems" },
    { platform: "HackerRank Bit Manipulation", url: "https://www.hackerrank.com/domains/algorithms?filters%5Bsubdomains%5D%5B%5D=bit-manipulation", color: "bg-emerald-600", problems: "Beginner to Advanced" },
    { platform: "Codeforces Bitmask", url: "https://codeforces.com/problemset?tags=bitmasks", color: "bg-blue-600", problems: "Competitive level" },
  ],
};

export default bitManipulation;

