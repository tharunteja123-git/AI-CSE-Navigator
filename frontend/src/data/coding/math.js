const math = {
  name: "Mathematics",
  emoji: "🔢",
  color: "bg-rose-500",
  light: "bg-rose-50",
  border: "border-rose-200",
  text: "text-rose-700",
  total: 35,


definition: {
  short:
    "Mathematics in Data Structures and Algorithms is the application of mathematical concepts, formulas, and number theory to solve programming problems efficiently. Many problems that appear complex can be solved using mathematical observations in O(1) or O(log n) time instead of brute force.",

  analogy:
    "Think of mathematics as a toolbox filled with shortcuts. Instead of walking a long path step by step (brute force), mathematics gives you a bridge that lets you reach the answer instantly using formulas and logical reasoning.",

  properties: [
    "Provides optimized solutions using mathematical formulas",
    "Frequently reduces time complexity from O(n) to O(log n) or O(1)",
    "Forms the foundation of Number Theory and Competitive Programming",
    "Essential for modular arithmetic and large number computations",
    "Widely used in Cryptography, Machine Learning and Computer Graphics",
    "Important for probability, combinatorics and statistics",
    "Helps derive efficient algorithms instead of brute-force solutions",
    "Commonly tested in coding interviews and programming contests"
  ],

  complexity: [
    { op: "Addition / Subtraction", time: "O(1)", space: "O(1)" },
    { op: "Multiplication", time: "O(1)", space: "O(1)" },
    { op: "Division / Modulo", time: "O(1)", space: "O(1)" },
    { op: "Power (Fast Exponentiation)", time: "O(log n)", space: "O(1)" },
    { op: "GCD (Euclidean)", time: "O(log n)", space: "O(1)" },
    { op: "LCM", time: "O(log n)", space: "O(1)" },
    { op: "Prime Check", time: "O(√n)", space: "O(1)" },
    { op: "Prime Sieve", time: "O(n log log n)", space: "O(n)" },
    { op: "Factorization", time: "O(√n)", space: "O(1)" },
    { op: "Modular Exponentiation", time: "O(log n)", space: "O(1)" }
  ]
},

properties: [
  "Foundation of many DSA algorithms",
  "Optimizes brute-force solutions",
  "Uses formulas instead of repeated computation",
  "Essential for Number Theory",
  "Important in Competitive Programming",
  "Frequently asked in coding interviews",
  "Used in Cryptography and Security",
  "Improves algorithmic thinking"
],

complexity: {
  best: "O(1)",
  average: "O(log n)",
  worst: "O(√n)",
  space: "O(1)"
},
  learningObjectives: [
    "Master all core math concepts: GCD, LCM, primes, modular arithmetic, combinatorics",
    "Learn and apply 50+ mathematical formulas used in coding interviews",
    "Understand number theory from basic divisibility to advanced Euler's theorem",
    "Solve 35+ real interview problems with optimal mathematical solutions",
    "Recognize when a problem has a direct mathematical formula vs algorithmic solution",
  ],

  prerequisites: [
    "Basic arithmetic (+, -, ×, ÷)",
    "Loops and conditionals",
    "Arrays and basic data structures",
    "Modulo operator (%)",
  ],

  whyLearn: {
    importance: "Mathematics is the language of algorithms. Problems that seem to need complex data structures often have elegant O(1) or O(log n) mathematical solutions. Top companies like Google and Facebook test math heavily.",
    useCases: [
      "Cryptography — RSA encryption uses prime factorization and modular arithmetic",
      "Graphics — rotation, scaling use linear algebra",
      "Machine Learning — gradient descent, probability theory",
      "Competitive programming — 40%+ problems have mathematical insights",
      "Finance — compound interest, probability, statistics",
      "Game theory — optimal strategy calculation",
      "Computer science — algorithm analysis uses mathematical proofs",
    ],
  },

  concept: {
    intro: `Mathematics in programming goes far beyond basic arithmetic. It gives you the power to solve problems in O(1) that would otherwise take O(n) or more. This guide takes you from basic arithmetic to advanced number theory — everything you need to master DSA math.`,

    levels: [
      // ─────────────── BEGINNER ───────────────
      {
        level: "Beginner",
        color: "bg-green-100 text-green-800",
        title: "Core Math Foundations",
        sections: [
          {
            heading: "1. Basic Arithmetic and Operators",
            content: `Every programming problem uses basic arithmetic. Master these:

ADDITION (+): a + b
SUBTRACTION (-): a - b  
MULTIPLICATION (*): a * b
DIVISION (/): a / b  → real division (5/2 = 2.5)
INTEGER DIVISION (//): a // b → floor division (5//2 = 2)
MODULO (%): a % b → remainder (17 % 5 = 2)
POWER (**): a ** b = a^b  (2**10 = 1024)

MODULO PROPERTIES (extremely important):
(a + b) % m = ((a % m) + (b % m)) % m
(a × b) % m = ((a % m) × (b % m)) % m
(a - b) % m = ((a % m) - (b % m) + m) % m  ← add m to prevent negative

NOTE: Division modulo needs "modular inverse" (advanced topic)

ORDER OF OPERATIONS (BODMAS / PEMDAS):
Brackets → Orders (powers) → Division → Multiplication → Addition → Subtraction`,
          },
          {
            heading: "2. Even and Odd Numbers",
            content: `A number is EVEN if it's divisible by 2 (n % 2 == 0)
A number is ODD if it leaves remainder 1 when divided by 2 (n % 2 == 1)

Properties:
Even + Even = Even
Odd + Odd = Even
Even + Odd = Odd
Even × anything = Even
Odd × Odd = Odd

Bit trick (faster than modulo):
n & 1 == 0  → EVEN
n & 1 == 1  → ODD

Why: The last bit of any number is 1 if and only if it's odd.
4 = 100 → last bit 0 → even
7 = 111 → last bit 1 → odd`,
          },
          {
            heading: "3. Absolute Value, Min, Max",
            content: `ABSOLUTE VALUE: |n| = distance from zero
|5| = 5, |-5| = 5, |0| = 0
abs(n) in Python/Java/C++
Math.abs(n) in JavaScript

Without built-in: if n < 0: return -n; else return n

MINIMUM: smallest of two/more values
min(a, b) = a if a < b else b
min(3, 7, 1, 9) = 1

MAXIMUM: largest of two/more values
max(a, b) = a if a > b else b
max(3, 7, 1, 9) = 9

CLAMPING: keep value within range [lo, hi]
clamp(n, lo, hi) = max(lo, min(n, hi))
clamp(15, 0, 10) = 10  (clamp to max)
clamp(-5, 0, 10) = 0   (clamp to min)
clamp(7,  0, 10) = 7   (within range)`,
          },
          {
            heading: "4. Floor, Ceiling, Rounding",
            content: `FLOOR (⌊n⌋): largest integer ≤ n (round DOWN)
⌊3.7⌋ = 3
⌊-3.7⌋ = -4  ← goes more negative!
Python: n // 1  or  math.floor(n)
Java/C++: Math.floor(n)  or  (int)n for positive

CEILING (⌈n⌉): smallest integer ≥ n (round UP)
⌈3.2⌉ = 4
⌈-3.2⌉ = -3
Python: math.ceil(n)
Formula without library: ⌈a/b⌉ = (a + b - 1) // b  [for positive integers]

ROUNDING: nearest integer
3.4 → 3, 3.5 → 4 (Python: round(n))
Python rounds to EVEN for .5: round(2.5) = 2, round(3.5) = 4

INTEGER CEILING DIVISION (very useful in DSA!):
ceil(a/b) for integers = (a + b - 1) // b
Example: ceil(7/2) = (7+1)//2 = 4  ✅
Example: ceil(10/3) = (10+2)//3 = 4 ✅`,
          },
          {
            heading: "5. Sum Formulas — Avoid Loops!",
            content: `ARITHMETIC SERIES (1 + 2 + 3 + ... + n):
Sum = n × (n + 1) / 2
Example: 1+2+3+4+5 = 5×6/2 = 15  ✅

SUM OF FIRST n ODD NUMBERS (1+3+5+...+(2n-1)):
Sum = n²
Example: 1+3+5+7 (n=4) = 4² = 16 ✅

SUM OF FIRST n EVEN NUMBERS (2+4+6+...+2n):
Sum = n × (n + 1)
Example: 2+4+6+8 (n=4) = 4×5 = 20 ✅

SUM OF SQUARES (1² + 2² + ... + n²):
Sum = n × (n+1) × (2n+1) / 6
Example: 1+4+9+16 (n=4) = 4×5×9/6 = 30 ✅

SUM OF CUBES (1³ + 2³ + ... + n³):
Sum = [n × (n+1) / 2]²
= (Sum of 1..n)²  ← beautiful!
Example: 1+8+27+64 (n=4) = (4×5/2)² = 10² = 100 ✅

GEOMETRIC SERIES (a + ar + ar² + ... + arⁿ⁻¹):
Sum = a × (rⁿ - 1) / (r - 1)  for r ≠ 1
Sum = n × a                     for r = 1`,
          },
        ],
        code: `# Python — Basic Math Foundations

import math

# ── Arithmetic ────────────────────────────────
print(17 % 5)           # 2 (remainder)
print(17 // 5)          # 3 (floor division)
print(2 ** 10)          # 1024 (power)
print(-7 % 3)           # 2 (Python: always non-negative)
print(-7 // 3)          # -3 (Python: always floor)

# Modulo properties
a, b, m = 13, 7, 5
print((a + b) % m)                        # 0
print(((a % m) + (b % m)) % m)            # 0  ← same!
print((a * b) % m)                        # 1
print(((a % m) * (b % m)) % m)            # 1  ← same!

# ── Even/Odd ──────────────────────────────────
def is_even(n): return n % 2 == 0
def is_odd(n):  return n & 1 == 1         # faster with bit trick

print(is_even(4))  # True
print(is_odd(7))   # True

# ── Floor and Ceiling ─────────────────────────
print(math.floor(3.7))   # 3
print(math.ceil(3.2))    # 4
print(math.floor(-3.7))  # -4

# Integer ceiling division (very useful!)
def ceil_div(a, b):
    return (a + b - 1) // b

print(ceil_div(7, 2))    # 4 (ceil(3.5) = 4)
print(ceil_div(10, 3))   # 4 (ceil(3.33) = 4)
print(ceil_div(9, 3))    # 3 (ceil(3.0) = 3)

# ── Sum Formulas ──────────────────────────────
def sum_1_to_n(n):  return n * (n + 1) // 2
def sum_squares(n): return n * (n+1) * (2*n+1) // 6
def sum_cubes(n):   return (n * (n+1) // 2) ** 2

print(sum_1_to_n(100))   # 5050  (Gauss's formula)
print(sum_squares(4))    # 30    (1+4+9+16)
print(sum_cubes(4))      # 100   (1+8+27+64)

# ── Average ───────────────────────────────────
arr = [1, 2, 3, 4, 5]
avg = sum(arr) / len(arr)    # 3.0
# Avoid overflow for large numbers:
avg_safe = sum(arr) // len(arr)   # integer average

# Safe average of two numbers (no overflow):
mid = a + (b - a) // 2    # better than (a+b)//2 for large a,b`,
      },

      // ─────────────── INTERMEDIATE ───────────────
      {
        level: "Intermediate",
        color: "bg-yellow-100 text-yellow-800",
        title: "Number Theory — GCD, LCM, Primes, Factorization",
        sections: [
          {
            heading: "1. Divisibility Rules",
            content: `Quick checks without actual division:

Divisible by 2:  last digit is 0,2,4,6,8
Divisible by 3:  sum of digits divisible by 3
Divisible by 4:  last 2 digits divisible by 4
Divisible by 5:  last digit is 0 or 5
Divisible by 6:  divisible by 2 AND 3
Divisible by 7:  no simple rule (just divide)
Divisible by 8:  last 3 digits divisible by 8
Divisible by 9:  sum of digits divisible by 9
Divisible by 10: last digit is 0
Divisible by 11: alternating sum of digits divisible by 11
Divisible by 12: divisible by 3 AND 4

Example: Is 123456 divisible by 9?
1+2+3+4+5+6 = 21, 2+1 = 3. Not divisible by 9.

IMPORTANT DIVISIBILITY PROPERTY:
If a | b and a | c, then a | (b + c) and a | (b - c)
(if a divides b and c, it divides their sum and difference)`,
          },
          {
            heading: "2. GCD — Greatest Common Divisor",
            content: `GCD(a, b) = largest number that divides BOTH a and b.
Also called HCF (Highest Common Factor).

Examples:
GCD(12, 8) = 4   (factors of 12: 1,2,3,4,6,12  factors of 8: 1,2,4,8)
GCD(15, 25) = 5
GCD(7, 13) = 1   (coprime numbers)
GCD(0, n) = n    (by definition)
GCD(n, n) = n

EUCLIDEAN ALGORITHM (most important):
GCD(a, b) = GCD(b, a % b)  until b = 0
Then GCD = a

PROOF IDEA:
Any divisor of a and b also divides (a mod b).
Because: a mod b = a - ⌊a/b⌋ × b

Example: GCD(48, 18)
GCD(48, 18) = GCD(18, 48%18) = GCD(18, 12)
            = GCD(12, 18%12) = GCD(12, 6)
            = GCD(6, 12%6)  = GCD(6, 0)
            = 6  ✅

EXTENDED EUCLIDEAN ALGORITHM:
Finds x, y such that: ax + by = GCD(a,b)
Used in modular inverse and cryptography.`,
          },
          {
            heading: "3. LCM — Least Common Multiple",
            content: `LCM(a, b) = smallest positive number divisible by BOTH a and b.

KEY FORMULA: LCM(a, b) = (a × b) / GCD(a, b)
Or better: LCM(a, b) = a / GCD(a, b) × b  (avoid overflow)

Examples:
LCM(12, 8) = (12×8)/GCD(12,8) = 96/4 = 24
LCM(4, 6)  = (4×6)/GCD(4,6)  = 24/2 = 12
LCM(7, 13) = (7×13)/1 = 91    (coprime → LCM = product)
LCM(a, a)  = a

RELATIONSHIP:
GCD(a, b) × LCM(a, b) = a × b

MULTIPLE NUMBERS:
LCM(a, b, c) = LCM(LCM(a, b), c)
GCD(a, b, c) = GCD(GCD(a, b), c)

APPLICATIONS:
- Find when two events coincide (repeat cycles)
- Fraction addition: use LCM as common denominator
- Scheduling problems
- Gear problems in physics`,
          },
          {
            heading: "4. Prime Numbers",
            content: `A PRIME is a number > 1 with exactly 2 factors: 1 and itself.
First 25 primes: 2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97

KEY FACTS:
- 2 is the ONLY even prime
- 1 is NOT a prime (by definition)
- Primes are infinite (Euclid's theorem)
- Every composite number has a prime factor ≤ √n

PRIMALITY TEST — NAIVE:
Check divisibility from 2 to n-1: O(n)

PRIMALITY TEST — OPTIMIZED:
Check divisibility from 2 to √n: O(√n)
Why: if n = a×b and a ≤ b, then a ≤ √n

FURTHER OPTIMIZATION:
- Check 2 separately
- Then check only odd numbers from 3 to √n
- This gives O(√n / 2)

BEST OPTIMIZATION (for interview):
- Check 2 and 3 separately
- Then check numbers of form 6k±1 (all primes > 3 have this form)
  Because all integers = 6k, 6k+1, 6k+2, 6k+3, 6k+4, 6k+5
  6k divisible by 6, 6k+2 by 2, 6k+3 by 3, 6k+4 by 2
  Only 6k+1 and 6k+5 (= 6k-1 = 6(k+1)-1) can be prime

SIEVE OF ERATOSTHENES:
Find ALL primes up to n in O(n log log n) time.
Algorithm: mark all multiples of each prime as composite.`,
          },
          {
            heading: "5. Prime Factorization",
            content: `Every integer > 1 can be written UNIQUELY as a product of primes.
This is the FUNDAMENTAL THEOREM OF ARITHMETIC.

Examples:
12 = 2² × 3
360 = 2³ × 3² × 5
1000 = 2³ × 5³
97 = 97 (prime)

ALGORITHM:
Divide by 2 until odd, then try odd divisors from 3 to √n.

Number of divisors of n = p1^a1 × p2^a2 × ... × pk^ak:
= (a1+1)(a2+1)...(ak+1)

Example: 12 = 2² × 3¹
Divisors: (2+1)(1+1) = 6  [divisors: 1,2,3,4,6,12] ✅

Sum of divisors:
= (1+p1+p1²+...+p1^a1)(1+p2+...+p2^a2)...
= ((p1^(a1+1)-1)/(p1-1))...

APPLICATIONS:
- Find all factors of a number
- Count divisors
- Find perfect numbers (sum of proper divisors = n)`,
          },
          {
            heading: "6. Modular Arithmetic",
            content: `Modular arithmetic is arithmetic "wrapped around" a modulus m.
Think of a clock: after 12 comes 1 (not 13).

a ≡ b (mod m) means: a and b have same remainder when divided by m.
Or equivalently: m divides (a - b).

PROPERTIES (critical for solving problems):
(a + b) mod m = ((a mod m) + (b mod m)) mod m
(a - b) mod m = ((a mod m) - (b mod m) + m) mod m
(a × b) mod m = ((a mod m) × (b mod m)) mod m
(a^b) mod m   = use fast exponentiation

MODULAR INVERSE:
The inverse of a (mod m) is x such that: a × x ≡ 1 (mod m)
Exists only when GCD(a, m) = 1 (coprime).

By Fermat's Little Theorem (m is prime):
a^(m-1) ≡ 1 (mod m)  →  a^(m-2) ≡ a^(-1) (mod m)
So: modular inverse = pow(a, m-2, m)

FERMAT'S LITTLE THEOREM:
If p is prime and GCD(a, p) = 1:
a^p ≡ a (mod p)
a^(p-1) ≡ 1 (mod p)

COMMON MODULUS: 10^9 + 7 (= 1000000007)
Why: it's a prime, fits in 32-bit int, products fit in 64-bit`,
          },
          {
            heading: "7. Fast Exponentiation (Binary Exponentiation)",
            content: `Computing a^n naively takes O(n) multiplications.
Binary exponentiation computes a^n in O(log n) multiplications.

KEY INSIGHT:
a^n = a^(n/2) × a^(n/2)        if n is even
a^n = a^((n-1)/2) × a^((n-1)/2) × a  if n is odd

So instead of multiplying a by itself n times,
we can SQUARE a and halve n each step.

EXAMPLE: 2^10
2^10 = (2^5)^2 = ((2^2 × 2)^2)^2
= ((4×2)^2)^2 = (8^2)^2 = 64^2 = 4096... wait

Better trace:
n=10: even  → a²=4,  n=5
n=5:  odd   → result×=4, a²=16, n=2
n=2:  even  → a²=256, n=1
n=1:  odd   → result×=256, n=0
result = 4 × 256 = 1024 ✅

WITH MODULO: pow(a, n, m) in Python (built-in, O(log n))
Java: BigInteger.modPow(a, n, m)

This is ESSENTIAL for cryptography and competitive programming.`,
          },
        ],
        code: `# Python — Number Theory Complete Reference
import math

# ── GCD (Euclidean Algorithm) ─────────────────
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

# Python built-in:
print(math.gcd(48, 18))    # 6
print(math.gcd(100, 75))   # 25

# GCD of multiple numbers:
from functools import reduce
def gcd_multi(*args):
    return reduce(math.gcd, args)

print(gcd_multi(12, 18, 24))   # 6

# ── LCM ──────────────────────────────────────
def lcm(a, b):
    return a // math.gcd(a, b) * b   # divide first to avoid overflow

print(lcm(4, 6))     # 12
print(lcm(12, 18))   # 36
print(lcm(7, 13))    # 91

# LCM of multiple numbers:
def lcm_multi(*args):
    return reduce(lcm, args)

print(lcm_multi(2, 3, 4))   # 12

# ── Prime Check ───────────────────────────────
def is_prime(n):
    if n < 2: return False
    if n == 2: return True
    if n % 2 == 0: return False
    if n == 3: return True
    if n % 3 == 0: return False
    # Check 6k ± 1 form
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

print(is_prime(97))    # True
print(is_prime(100))   # False

# ── Sieve of Eratosthenes ─────────────────────
def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n+1, i):
                is_prime[j] = False
    return [i for i in range(n+1) if is_prime[i]]

print(sieve(30))   # [2,3,5,7,11,13,17,19,23,29]

# ── Prime Factorization ───────────────────────
def prime_factors(n):
    factors = {}
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors[d] = factors.get(d, 0) + 1
            n //= d
        d += 1
    if n > 1:
        factors[n] = factors.get(n, 0) + 1
    return factors

print(prime_factors(360))   # {2:3, 3:2, 5:1}

# Count divisors using factorization
def count_divisors(n):
    result = 1
    for exp in prime_factors(n).values():
        result *= (exp + 1)
    return result

print(count_divisors(12))   # 6 (divisors: 1,2,3,4,6,12)

# ── Modular Arithmetic ────────────────────────
MOD = 10**9 + 7

def add_mod(a, b, m=MOD):     return (a + b) % m
def sub_mod(a, b, m=MOD):     return (a - b + m) % m
def mul_mod(a, b, m=MOD):     return (a * b) % m

# Modular inverse (Fermat's little theorem, m must be prime)
def mod_inv(a, m=MOD):        return pow(a, m-2, m)

# Division modulo (when m is prime)
def div_mod(a, b, m=MOD):     return mul_mod(a, mod_inv(b, m), m)

print(div_mod(10, 2))   # 5 (10/2 mod 10^9+7)

# ── Fast Exponentiation ───────────────────────
def fast_pow(base, exp, mod):
    result = 1
    base %= mod
    while exp > 0:
        if exp & 1:            # if exp is odd
            result = result * base % mod
        base = base * base % mod
        exp >>= 1              # halve exp
    return result

# Python built-in is even better:
print(pow(2, 100, 10**9+7))   # 2^100 mod 10^9+7, O(log n)`,
      },

      // ─────────────── ADVANCED ───────────────
      {
        level: "Advanced",
        color: "bg-red-100 text-red-800",
        title: "Advanced: Combinatorics, Statistics, and Number Theory",
        sections: [
          {
            heading: "1. Combinatorics — Counting",
            content: `PERMUTATIONS: ordered arrangements of r items from n distinct items
P(n, r) = n! / (n-r)!
Example: arrangements of 3 letters from {A,B,C,D}
P(4,3) = 4!/(4-3)! = 24/1 = 24

All permutations of n items: n! (n factorial)
n! = n × (n-1) × (n-2) × ... × 1
0! = 1 (by definition)
1! = 1, 2! = 2, 3! = 6, 4! = 24, 5! = 120

COMBINATIONS (nCr): unordered selection of r items from n
C(n, r) = n! / (r! × (n-r)!)
Also written as C(n,r), nCr, or "n choose r"

C(4,2) = 4! / (2!×2!) = 24/4 = 6
C(n,0) = 1 (empty selection)
C(n,n) = 1 (select all)
C(n,1) = n
C(n, r) = C(n, n-r)  ← SYMMETRY PROPERTY

PASCAL'S TRIANGLE:
C(n,r) = C(n-1,r-1) + C(n-1,r)
Each entry is sum of two entries above it.
Row 0: 1
Row 1: 1 1
Row 2: 1 2 1
Row 3: 1 3 3 1
Row 4: 1 4 6 4 1

TOTAL SUBSETS: 2^n (sum of all C(n,r) for r=0 to n)`,
          },
          {
            heading: "2. Probability Basics",
            content: `PROBABILITY: P(event) = favorable outcomes / total outcomes
Range: 0 ≤ P(E) ≤ 1
P(impossible) = 0, P(certain) = 1

COMPLEMENT: P(not E) = 1 - P(E)
Example: P(not rolling 6) = 1 - 1/6 = 5/6

ADDITION RULE:
P(A or B) = P(A) + P(B) - P(A and B)
If mutually exclusive: P(A or B) = P(A) + P(B)

MULTIPLICATION RULE:
If independent: P(A and B) = P(A) × P(B)
If dependent:   P(A and B) = P(A) × P(B|A)

EXPECTED VALUE:
E(X) = Σ xi × P(xi)
Example: fair die → E = 1×(1/6) + 2×(1/6) + ... + 6×(1/6) = 3.5

BAYES' THEOREM:
P(A|B) = P(B|A) × P(A) / P(B)
"Posterior = Likelihood × Prior / Evidence"`,
          },
          {
            heading: "3. Catalan Numbers",
            content: `Catalan numbers are a sequence that appears surprisingly often in combinatorics.

C₀=1, C₁=1, C₂=2, C₃=5, C₄=14, C₅=42, C₆=132...

FORMULA:
Cₙ = C(2n, n) / (n+1)
Cₙ = (2n)! / ((n+1)! × n!)

RECURRENCE:
Cₙ = Σ Cᵢ × Cₙ₋₁₋ᵢ  for i=0 to n-1
C₀ = 1

APPLICATIONS (appears in MANY DSA problems):
1. Valid parentheses combinations for n pairs
2. Number of BSTs with n distinct keys
3. Number of triangulations of (n+2)-gon
4. Number of full binary trees with n+1 leaves
5. Number of non-crossing handshakes for 2n people
6. Number of monotonic paths in n×n grid without crossing diagonal
7. Stack-sortable permutations of length n

Example: n=3 pairs of parentheses:
((())), (()()), (())(), ()(()), ()()() → 5 = C₃ ✅`,
          },
          {
            heading: "4. Statistics: Mean, Median, Mode",
            content: `MEAN (Average):
Arithmetic mean = sum / count
= (a₁ + a₂ + ... + aₙ) / n

WEIGHTED MEAN:
= Σ (weight × value) / Σ weights

GEOMETRIC MEAN:
= (a₁ × a₂ × ... × aₙ)^(1/n)
Used when values are multiplicative (growth rates)

HARMONIC MEAN:
= n / (1/a₁ + 1/a₂ + ... + 1/aₙ)
Used for rates (e.g., average speed)

MEDIAN: middle value when sorted
For odd n: median = arr[n//2]
For even n: median = (arr[n//2-1] + arr[n//2]) / 2

Why median > mean for outliers:
[1, 2, 3, 4, 100] → mean=22, median=3
Median is more "robust" to outliers.

MODE: most frequently occurring value
Can have multiple modes (bimodal, multimodal)
Or no mode (all values unique)

VARIANCE: average squared deviation from mean
σ² = Σ(xᵢ - μ)² / n

STANDARD DEVIATION: σ = √(variance)
Measures spread of data around mean`,
          },
          {
            heading: "5. Euler's Totient Function",
            content: `φ(n) (phi of n) = count of numbers from 1 to n that are coprime to n (GCD = 1).

φ(1) = 1
φ(2) = 1  (only 1 is coprime to 2)
φ(4) = 2  (1 and 3 are coprime to 4)
φ(6) = 2  (1 and 5 are coprime to 6)
φ(p) = p-1  for any prime p (all numbers 1..p-1 are coprime)

FORMULA:
φ(n) = n × ∏(1 - 1/p)  for all prime p dividing n

Example: φ(12) = 12 × (1-1/2) × (1-1/3) = 12 × 1/2 × 2/3 = 4
(1, 5, 7, 11 are coprime to 12) ✅

EULER'S THEOREM:
If GCD(a, n) = 1: a^φ(n) ≡ 1 (mod n)
Fermat's Little Theorem is a special case: φ(p) = p-1

APPLICATIONS:
- RSA cryptography uses φ(n)
- Count reduced fractions with denominator n
- Generalization of Fermat's little theorem`,
          },
          {
            heading: "6. Matrix Math for Sequences",
            content: `MATRIX EXPONENTIATION: compute nth term of recurrence in O(log n).

Fibonacci: F(n) = F(n-1) + F(n-2)

Matrix form:
|F(n+1)|   |1 1|^n   |F(1)|
|F(n)  | = |1 0|   × |F(0)|

Compute matrix^n using fast exponentiation: O(k³ × log n)
where k = size of matrix (2×2 for Fibonacci)

This converts O(n) Fibonacci to O(log n)!

MATRIX MULTIPLICATION:
C[i][j] = Σ A[i][k] × B[k][j]
For n×n matrices: O(n³) naive, O(n^2.37) Strassen

APPLICATIONS:
- Fibonacci in O(log n)
- Any linear recurrence in O(log n)
- Graph adjacency matrix powers (paths of length k)
- Page rank computation`,
          },
          {
            heading: "7. Chinese Remainder Theorem (CRT)",
            content: `CRT: Given system of congruences:
x ≡ a₁ (mod m₁)
x ≡ a₂ (mod m₂)
...
x ≡ aₖ (mod mₖ)

If all mᵢ are pairwise coprime, there exists a UNIQUE solution x mod (m₁×m₂×...×mₖ).

EXAMPLE:
x ≡ 2 (mod 3)   → x = 2, 5, 8, 11, ...
x ≡ 3 (mod 5)   → x = 3, 8, 13, 18, ...
x ≡ 2 (mod 7)   → x = 2, 9, 16, 23, ...
Solution: x = 23, and it repeats every 3×5×7 = 105

APPLICATIONS:
- Cryptography (RSA algorithm)
- Calendar computations
- Competitive programming problems
- Synchronization of periodic events`,
          },
        ],
        code: `# Python — Advanced Math Reference

import math
from functools import reduce

# ── Factorials and Combinations ──────────────
import math
print(math.factorial(10))    # 3628800

# nCr (combinations) without overflow
def nCr(n, r):
    if r > n: return 0
    if r == 0 or r == n: return 1
    r = min(r, n - r)    # use smaller r (symmetry)
    result = 1
    for i in range(r):
        result = result * (n - i) // (i + 1)
    return result

print(nCr(10, 3))    # 120
print(nCr(20, 10))   # 184756

# nCr with modulo (for large numbers)
def nCr_mod(n, r, mod=10**9+7):
    if r > n: return 0
    num = den = 1
    for i in range(r):
        num = num * (n - i) % mod
        den = den * (i + 1) % mod
    return num * pow(den, mod-2, mod) % mod

# Precompute factorials for multiple queries
def precompute_factorials(n, mod=10**9+7):
    fact = [1] * (n+1)
    inv_fact = [1] * (n+1)
    for i in range(1, n+1):
        fact[i] = fact[i-1] * i % mod
    inv_fact[n] = pow(fact[n], mod-2, mod)
    for i in range(n-1, -1, -1):
        inv_fact[i] = inv_fact[i+1] * (i+1) % mod
    def C(n, r):
        if r < 0 or r > n: return 0
        return fact[n] * inv_fact[r] % mod * inv_fact[n-r] % mod
    return C

C = precompute_factorials(1000)
print(C(100, 50))    # C(100,50) mod 10^9+7

# ── Catalan Numbers ──────────────────────────
def catalan(n, mod=10**9+7):
    return nCr_mod(2*n, n, mod) * pow(n+1, mod-2, mod) % mod

for i in range(7):
    print(f"C({i}) = {catalan(i)}")
# C(0)=1, C(1)=1, C(2)=2, C(3)=5, C(4)=14, C(5)=42, C(6)=132

# ── Euler's Totient Function ──────────────────
def euler_totient(n):
    result = n
    p = 2
    while p * p <= n:
        if n % p == 0:
            while n % p == 0: n //= p
            result -= result // p
        p += 1
    if n > 1: result -= result // n
    return result

print(euler_totient(12))   # 4
print(euler_totient(36))   # 12

# Sieve for Euler's totient (all values 1..n)
def euler_sieve(n):
    phi = list(range(n+1))
    for i in range(2, n+1):
        if phi[i] == i:    # i is prime
            for j in range(i, n+1, i):
                phi[j] -= phi[j] // i
    return phi

# ── Statistics ───────────────────────────────
def statistics(arr):
    n = len(arr)
    mean = sum(arr) / n
    sorted_arr = sorted(arr)
    median = (sorted_arr[n//2] if n%2 else
              (sorted_arr[n//2-1] + sorted_arr[n//2]) / 2)
    from collections import Counter
    cnt = Counter(arr)
    max_freq = max(cnt.values())
    mode = [k for k,v in cnt.items() if v == max_freq]
    variance = sum((x - mean)**2 for x in arr) / n
    std_dev = variance ** 0.5
    return {"mean": mean, "median": median, "mode": mode,
            "variance": variance, "std_dev": std_dev}

print(statistics([1, 2, 2, 3, 4, 5, 100]))

# ── Matrix Exponentiation (Fibonacci in O(log n)) ──
def matrix_mult(A, B, mod=10**9+7):
    n = len(A)
    C = [[0]*n for _ in range(n)]
    for i in range(n):
        for k in range(n):
            if A[i][k] == 0: continue
            for j in range(n):
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % mod
    return C

def matrix_pow(M, p, mod=10**9+7):
    n = len(M)
    result = [[1 if i==j else 0 for j in range(n)] for i in range(n)]  # identity
    while p:
        if p & 1: result = matrix_mult(result, M, mod)
        M = matrix_mult(M, M, mod)
        p >>= 1
    return result

def fibonacci_fast(n, mod=10**9+7):
    if n <= 1: return n
    M = [[1,1],[1,0]]
    result = matrix_pow(M, n-1, mod)
    return result[0][0]

print(fibonacci_fast(10))    # 55
print(fibonacci_fast(100))   # F(100) mod 10^9+7`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // FORMULAS REFERENCE TABLE
  // ─────────────────────────────────────────────
  formulas: [
    // Arithmetic
    { category: "Arithmetic", formula: "1 + 2 + ... + n", result: "n(n+1)/2", name: "Sum of first n naturals" },
    { category: "Arithmetic", formula: "1² + 2² + ... + n²", result: "n(n+1)(2n+1)/6", name: "Sum of squares" },
    { category: "Arithmetic", formula: "1³ + 2³ + ... + n³", result: "[n(n+1)/2]²", name: "Sum of cubes" },
    { category: "Arithmetic", formula: "1 + 3 + 5 + ... + (2n-1)", result: "n²", name: "Sum of first n odd numbers" },
    { category: "Arithmetic", formula: "2 + 4 + 6 + ... + 2n", result: "n(n+1)", name: "Sum of first n even numbers" },
    { category: "Arithmetic", formula: "a + (a+d) + ... + (a+(n-1)d)", result: "n/2 × (2a + (n-1)d)", name: "Arithmetic series sum" },
    { category: "Arithmetic", formula: "a + ar + ar² + ... + arⁿ⁻¹", result: "a(rⁿ-1)/(r-1)", name: "Geometric series sum" },
    { category: "Arithmetic", formula: "⌈a/b⌉", result: "(a + b - 1) // b", name: "Integer ceiling division" },
    // GCD/LCM
    { category: "GCD/LCM", formula: "GCD(a, b)", result: "GCD(b, a%b) until b=0", name: "Euclidean algorithm" },
    { category: "GCD/LCM", formula: "LCM(a, b)", result: "a/GCD(a,b) × b", name: "LCM from GCD" },
    { category: "GCD/LCM", formula: "GCD(a,b) × LCM(a,b)", result: "a × b", name: "GCD × LCM = product" },
    { category: "GCD/LCM", formula: "GCD(a, 0)", result: "a", name: "GCD with zero" },
    // Primes
    { category: "Primes", formula: "is_prime(n)", result: "check divisors up to √n", name: "Primality test" },
    { category: "Primes", formula: "Prime form", result: "6k ± 1 for k≥1", name: "All primes > 3" },
    { category: "Primes", formula: "π(n) ≈", result: "n / ln(n)", name: "Prime counting approximation" },
    { category: "Primes", formula: "Num divisors of p1^a1×...×pk^ak", result: "(a1+1)(a2+1)...(ak+1)", name: "Count divisors" },
    // Modular Arithmetic
    { category: "Modular", formula: "(a+b) mod m", result: "((a%m)+(b%m)) mod m", name: "Modular addition" },
    { category: "Modular", formula: "(a×b) mod m", result: "((a%m)×(b%m)) mod m", name: "Modular multiplication" },
    { category: "Modular", formula: "a⁻¹ mod p (p prime)", result: "pow(a, p-2, p)", name: "Modular inverse (Fermat)" },
    { category: "Modular", formula: "aᵖ mod p (p prime)", result: "a mod p", name: "Fermat's Little Theorem" },
    { category: "Modular", formula: "aᵖ⁻¹ mod p (p prime)", result: "1 mod p", name: "Fermat's Little Theorem v2" },
    // Combinatorics
    { category: "Combinatorics", formula: "C(n, r)", result: "n! / (r! × (n-r)!)", name: "Combinations" },
    { category: "Combinatorics", formula: "P(n, r)", result: "n! / (n-r)!", name: "Permutations" },
    { category: "Combinatorics", formula: "C(n, 0) + C(n,1) + ... + C(n,n)", result: "2ⁿ", name: "Sum of combinations = subsets" },
    { category: "Combinatorics", formula: "C(n, r)", result: "C(n-1, r-1) + C(n-1, r)", name: "Pascal's recurrence" },
    { category: "Combinatorics", formula: "Catalan(n)", result: "C(2n, n) / (n+1)", name: "nth Catalan number" },
    // Statistics
    { category: "Statistics", formula: "Arithmetic Mean", result: "Σxᵢ / n", name: "Average" },
    { category: "Statistics", formula: "Geometric Mean", result: "(x₁×x₂×...×xₙ)^(1/n)", name: "Geometric average" },
    { category: "Statistics", formula: "Harmonic Mean", result: "n / Σ(1/xᵢ)", name: "Harmonic average" },
    { category: "Statistics", formula: "Variance", result: "Σ(xᵢ - μ)² / n", name: "Population variance" },
    { category: "Statistics", formula: "Std Deviation", result: "√(Variance)", name: "Standard deviation" },
    // Number Theory
    { category: "Number Theory", formula: "φ(n)", result: "n × ∏(1 - 1/p)", name: "Euler's totient" },
    { category: "Number Theory", formula: "φ(p) for prime p", result: "p - 1", name: "Totient of prime" },
    { category: "Number Theory", formula: "a^φ(n) mod n", result: "1 (if GCD(a,n)=1)", name: "Euler's theorem" },
    { category: "Number Theory", formula: "Wilson's theorem", result: "(p-1)! ≡ -1 (mod p)", name: "Primality via factorials" },
  ],

  // ─────────────────────────────────────────────
  // LANGUAGES
  // ─────────────────────────────────────────────
  languages: [
    {
      lang: "Python",
      emoji: "🐍",
      color: "bg-blue-100 text-blue-800",
      syntax: `# Python — Math Complete Reference
import math
from functools import reduce
import statistics as stats

# ── Math Module ───────────────────────────────
math.floor(3.7)          # 3
math.ceil(3.2)           # 4
math.sqrt(16)            # 4.0
math.isqrt(16)           # 4 (integer sqrt, no float)
math.log(100, 10)        # 2.0
math.log2(8)             # 3.0
math.log10(1000)         # 3.0
math.exp(1)              # e ≈ 2.718
math.pi                  # 3.14159...
math.e                   # 2.71828...
math.inf                 # infinity
math.factorial(10)       # 3628800
math.gcd(48, 18)         # 6 (Python 3.5+)
math.lcm(4, 6)           # 12 (Python 3.9+)
math.comb(10, 3)         # 120 nCr (Python 3.8+)
math.perm(10, 3)         # 720 nPr (Python 3.8+)
math.fabs(-5.0)          # 5.0 (float abs)
math.copysign(3, -1)     # -3.0 (copy sign)
math.trunc(3.9)          # 3 (toward zero)

# ── Built-in Functions ────────────────────────
abs(-5)                  # 5
round(3.567, 2)          # 3.57
divmod(17, 5)            # (3, 2) → quotient and remainder
pow(2, 10)               # 1024
pow(2, 10, 1000)         # 24  (2^10 mod 1000, O(log n))

# ── Number Checks ─────────────────────────────
(15).bit_length()        # 4 (bits needed to represent 15)
bin(13)                  # '0b1101'
oct(8)                   # '0o10'
hex(255)                 # '0xff'
int('ff', 16)            # 255 (hex to int)
int('1101', 2)           # 13  (binary to int)

# ── Statistics ────────────────────────────────
import statistics as s
data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
s.mean(data)             # 5.5
s.median(data)           # 5.5
s.mode([1,1,2,3])        # 1
s.variance(data)         # 9.166...
s.stdev(data)            # 3.027...
s.geometric_mean(data)   # 4.528...
s.harmonic_mean(data)    # 3.414...

# ── Random Numbers ────────────────────────────
import random
random.random()          # [0.0, 1.0)
random.randint(1, 10)    # [1, 10] inclusive
random.choice([1,2,3])   # random element
random.shuffle(arr)      # in-place shuffle
random.sample(arr, k)    # k unique random elements

# ── Infinity and Special Values ───────────────
float('inf')             # positive infinity
float('-inf')            # negative infinity
float('nan')             # Not a Number
math.isinf(x)            # check if infinite
math.isnan(x)            # check if NaN
math.isfinite(x)         # check if finite`,
    },
    {
      lang: "JavaScript",
      emoji: "🟨",
      color: "bg-yellow-100 text-yellow-800",
      syntax: `// JavaScript — Math Complete Reference

// ── Math Object ───────────────────────────────
Math.floor(3.7)         // 3
Math.ceil(3.2)          // 4
Math.round(3.5)         // 4
Math.trunc(3.9)         // 3 (toward zero)
Math.sqrt(16)           // 4
Math.cbrt(27)           // 3 (cube root)
Math.abs(-5)            // 5
Math.pow(2, 10)         // 1024
Math.log(Math.E)        // 1
Math.log2(8)            // 3
Math.log10(1000)        // 3
Math.exp(1)             // e ≈ 2.718
Math.PI                 // 3.14159...
Math.E                  // 2.71828...
Math.max(1,5,3,9,2)     // 9
Math.min(1,5,3,9,2)     // 1
Math.sign(-5)           // -1 (sign of number)
Math.hypot(3, 4)        // 5 (√(3²+4²))
Math.clz32(1)           // 31 (leading zeros in 32-bit)
Math.random()           // [0, 1)
Math.fround(1.337)      // nearest 32-bit float

// ── Integer Math (no built-in int type) ───────
// Floor division:
Math.floor(17 / 5)      // 3
17 / 5 | 0              // 3 (bitwise OR with 0 = floor for positive)
~~(17/5)                // 3 (double NOT trick)

// Modulo (careful with negatives in JS!):
17 % 5                  // 2
-7 % 3                  // -1 ← NEGATIVE in JS! (unlike Python)
((-7 % 3) + 3) % 3      // 2  ← correct positive modulo

// ── GCD (no built-in) ─────────────────────────
function gcd(a, b) {
    while (b) { [a, b] = [b, a % b]; }
    return a;
}
const lcm = (a, b) => (a / gcd(a, b)) * b;

// ── Number Checks ─────────────────────────────
Number.isInteger(5.0)   // true
Number.isFinite(1/0)    // false
Number.isNaN(NaN)       // true
Number.isSafeInteger(9007199254740991)  // true (MAX_SAFE_INTEGER)
Number.MAX_SAFE_INTEGER // 2^53 - 1
Number.MIN_SAFE_INTEGER // -(2^53 - 1)
Number.MAX_VALUE        // largest float
Number.POSITIVE_INFINITY
Number.NEGATIVE_INFINITY

// ── BigInt for large numbers ──────────────────
const big = 9007199254740993n;  // add 'n' suffix
big + 1n                        // works correctly!
// Cannot mix BigInt and Number directly

// ── Random Integer in [min, max] ──────────────
const randInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;`,
    },
    {
      lang: "Java",
      emoji: "☕",
      color: "bg-orange-100 text-orange-800",
      syntax: `// Java — Math Complete Reference

// ── Math Class ────────────────────────────────
Math.floor(3.7)           // 3.0 (returns double!)
Math.ceil(3.2)            // 4.0 (returns double!)
Math.round(3.5)           // 4 (returns long)
Math.abs(-5)              // 5
Math.abs(-5L)             // 5L (long version)
Math.sqrt(16.0)           // 4.0
Math.cbrt(27.0)           // 3.0
Math.pow(2, 10)           // 1024.0 (returns double)
Math.log(Math.E)          // 1.0
Math.log10(1000)          // 3.0
Math.exp(1)               // e
Math.PI                   // 3.14159...
Math.E                    // 2.71828...
Math.max(3, 7)            // 7
Math.min(3, 7)            // 3
Math.signum(-5.0)         // -1.0
Math.hypot(3, 4)          // 5.0

// ── Integer Operations ─────────────────────────
int a = 17, b = 5;
int quotient = a / b;     // 3 (integer division, floor for positives)
int remainder = a % b;    // 2
// WARNING: -7 % 3 = -1 in Java! (same sign as dividend)
int mod = ((a % b) + b) % b;  // always positive modulo

// ── Overflow-safe arithmetic ───────────────────
Math.addExact(Integer.MAX_VALUE, 1);   // throws ArithmeticException
Math.multiplyExact(100000, 100000);    // throws if overflow
Math.toIntExact(5000000000L);          // throws if > Integer.MAX_VALUE

// ── Long and BigInteger ────────────────────────
long big = 9_000_000_000L;            // use L suffix for long
import java.math.BigInteger;
BigInteger n = BigInteger.valueOf(1000000000L);
n.multiply(BigInteger.valueOf(1000000000L));  // no overflow!
n.mod(BigInteger.valueOf(1000000007L));
n.modPow(BigInteger.valueOf(n), BigInteger.valueOf(MOD)); // fast pow
BigInteger.probablePrime(512, new java.util.Random());   // large prime

// ── GCD/LCM ───────────────────────────────────
// Java 5+: BigInteger.gcd()
// Java doesn't have Math.gcd() for int — implement yourself:
public static int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}
public static long lcm(long a, long b) {
    return a / gcd((int)a, (int)b) * b;
}

// ── Factorial and Combinations ────────────────
// No built-in — use BigInteger for large values
public static BigInteger factorial(int n) {
    BigInteger result = BigInteger.ONE;
    for (int i = 2; i <= n; i++)
        result = result.multiply(BigInteger.valueOf(i));
    return result;
}

// ── Random ────────────────────────────────────
import java.util.Random;
Random rand = new Random();
rand.nextInt(10);         // [0, 10)
rand.nextInt(10) + 1;     // [1, 10]
rand.nextDouble();        // [0.0, 1.0)`,
    },
    {
      lang: "C++",
      emoji: "⚙️",
      color: "bg-purple-100 text-purple-800",
      syntax: `// C++ — Math Complete Reference
#include <cmath>
#include <numeric>    // gcd, lcm (C++17)
#include <algorithm>  // min, max
#include <random>
using namespace std;

// ── cmath Functions ────────────────────────────
floor(3.7)            // 3.0
ceil(3.2)             // 4.0
round(3.5)            // 4.0
trunc(3.9)            // 3.0 (toward zero)
abs(-5)               // 5 (int)
fabs(-5.0)            // 5.0 (double)
sqrt(16.0)            // 4.0
cbrt(27.0)            // 3.0
pow(2.0, 10.0)        // 1024.0
log(M_E)              // 1.0
log2(8.0)             // 3.0
log10(1000.0)         // 3.0
exp(1.0)              // e
M_PI                  // 3.14159...
M_E                   // 2.71828...
hypot(3.0, 4.0)       // 5.0

// ── Integer Operations ─────────────────────────
int a = 17, b = 5;
cout << a / b;          // 3 (floor for positive)
cout << a % b;          // 2
// Negative modulo: (-7 % 3 = -1 in C++!)
auto mod = [](int a, int b) { return ((a % b) + b) % b; };

// ── Min/Max ───────────────────────────────────
min(3, 7)             // 3
max(3, 7)             // 7
min({1, 5, 3, 9, 2})  // 1 (initializer list)
max({1, 5, 3, 9, 2})  // 9
clamp(15, 0, 10)       // 10 (C++17)

// ── GCD/LCM (C++17) ───────────────────────────
#include <numeric>
gcd(48, 18)           // 6
lcm(4, 6)             // 12

// Manual implementation:
int my_gcd(int a, int b) { return b ? my_gcd(b, a%b) : a; }
long long my_lcm(long long a, long long b) { return a / my_gcd(a,b) * b; }

// ── Fast Power ────────────────────────────────
long long fast_pow(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = result * base % mod;
        base = base * base % mod;
        exp >>= 1;
    }
    return result;
}

// ── Overflow Detection ────────────────────────
// Use long long for intermediate calculations
long long a_ll = 1000000000LL;
long long product = a_ll * a_ll;  // 10^18, fits in long long
// __int128 for even larger: 39 digits
__int128 huge = (__int128)a_ll * a_ll * a_ll;

// ── Random Numbers ────────────────────────────
#include <random>
mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
uniform_int_distribution<int> dist(1, 100);
int random_num = dist(rng);        // random int in [1, 100]`,
    },
  ],

  // ─────────────────────────────────────────────
  // PATTERNS
  // ─────────────────────────────────────────────
  patterns: [
    {
      name: "Euclidean Algorithm — GCD",
      emoji: "➗",
      color: "bg-blue-50 border-blue-200",
      titleColor: "text-blue-800",
      when: "GCD, LCM, coprime check, simplify fractions, find period of repeating patterns",
      avoid: "Nothing — Euclidean is always optimal for GCD",
      timeComplexity: "O(log min(a,b))",
      spaceComplexity: "O(1) iterative, O(log n) recursive",
      steps: [
        "GCD(a, b) = GCD(b, a % b)",
        "Repeat until b = 0",
        "At that point, a = GCD",
        "LCM = a / GCD(a,b) × b (divide first!)",
      ],
      template: `def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

def lcm(a, b):
    return a // gcd(a, b) * b  # divide BEFORE multiply to avoid overflow

# Extended Euclidean (finds x,y such that ax + by = gcd(a,b))
def extended_gcd(a, b):
    if b == 0: return a, 1, 0
    g, x, y = extended_gcd(b, a % b)
    return g, y, x - (a // b) * y`,
    },
    {
      name: "Sieve of Eratosthenes",
      emoji: "🔢",
      color: "bg-green-50 border-green-200",
      titleColor: "text-green-800",
      when: "Find all primes up to n, precompute prime factors, count primes in range",
      avoid: "When n > 10^7 (memory intensive). Use segmented sieve for larger ranges.",
      timeComplexity: "O(n log log n)",
      spaceComplexity: "O(n)",
      steps: [
        "Create boolean array of size n+1, all True",
        "Mark 0 and 1 as False (not prime)",
        "For each prime p from 2 to √n: mark all multiples of p as False",
        "Start marking from p² (smaller multiples already marked)",
        "Remaining True values are primes",
      ],
      template: `def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:                    # i is prime
            for j in range(i*i, n+1, i):  # mark multiples
                is_prime[j] = False
    return [i for i in range(n+1) if is_prime[i]]

# Smallest prime factor sieve (for fast factorization):
def spf_sieve(n):
    spf = list(range(n+1))           # spf[i] = smallest prime factor of i
    for i in range(2, int(n**0.5)+1):
        if spf[i] == i:              # i is prime
            for j in range(i*i, n+1, i):
                if spf[j] == j:     # not yet assigned
                    spf[j] = i
    return spf`,
    },
    {
      name: "Fast Power (Binary Exponentiation)",
      emoji: "⚡",
      color: "bg-yellow-50 border-yellow-200",
      titleColor: "text-yellow-800",
      when: "a^n mod m (cryptography, counting, DP with modular arithmetic)",
      avoid: "Nothing — always use this over naive multiplication for large exponents",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1) iterative",
      steps: [
        "If exp is odd: result × base, exp--",
        "Square base, halve exp",
        "Repeat until exp = 0",
        "Apply modulo at each step to prevent overflow",
      ],
      template: `def fast_pow(base, exp, mod=None):
    result = 1
    if mod: base %= mod
    while exp > 0:
        if exp & 1:                          # exp is odd
            result = result * base % mod if mod else result * base
        base = base * base % mod if mod else base * base
        exp >>= 1                            # exp //= 2
    return result

# Python built-in (fastest):
pow(2, 100, 10**9+7)    # O(log 100) with modulo
pow(2, 100)             # exact answer (arbitrary precision)

# Modular inverse using Fermat's little theorem:
def mod_inv(a, m):       # m must be prime
    return pow(a, m-2, m)`,
    },
    {
      name: "Prefix Sum for Range Queries",
      emoji: "➕",
      color: "bg-purple-50 border-purple-200",
      titleColor: "text-purple-800",
      when: "Multiple range sum queries, subarray sum equals k, 2D range sum queries",
      avoid: "When array is modified frequently (use Segment Tree or BIT instead)",
      timeComplexity: "O(n) build, O(1) per query",
      spaceComplexity: "O(n)",
      steps: [
        "Build prefix[i] = sum of arr[0..i-1]",
        "prefix[0] = 0 (empty prefix)",
        "Range sum arr[l..r] = prefix[r+1] - prefix[l]",
        "For 2D: prefix[i][j] = prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1] + arr[i][j]",
      ],
      template: `def build_prefix(arr):
    n = len(arr)
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i+1] = prefix[i] + arr[i]
    return prefix

def range_sum(prefix, l, r):  # inclusive [l, r]
    return prefix[r+1] - prefix[l]

# 2D Prefix Sum:
def build_2d_prefix(matrix):
    m, n = len(matrix), len(matrix[0])
    pre = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            pre[i][j] = (pre[i-1][j] + pre[i][j-1]
                        - pre[i-1][j-1] + matrix[i-1][j-1])
    return pre`,
    },
    {
      name: "Catalan Number Recognizer",
      emoji: "🌀",
      color: "bg-red-50 border-red-200",
      titleColor: "text-red-800",
      when: "Counting valid parentheses, BST structures, triangulations, non-crossing patterns",
      avoid: "When counting ordered arrangements (use factorials/permutations instead)",
      timeComplexity: "O(n) with DP, O(log n) with formula",
      spaceComplexity: "O(n) for DP, O(1) for formula",
      steps: [
        "Recognize: does problem count non-crossing or balanced structures?",
        "If n pairs/items → answer is C(n) = C(2n,n)/(n+1)",
        "Use DP: C(0)=1, C(n) = Σ C(i)×C(n-1-i) for i=0..n-1",
        "Or formula: C(n) = C(2n,n)/(n+1)",
      ],
      template: `# Catalan numbers: 1, 1, 2, 5, 14, 42, 132, 429...
def catalan_dp(n):
    cat = [0] * (n+1)
    cat[0] = cat[1] = 1
    for i in range(2, n+1):
        for j in range(i):
            cat[i] += cat[j] * cat[i-1-j]
    return cat[n]

def catalan_formula(n, mod=10**9+7):
    return nCr_mod(2*n, n, mod) * pow(n+1, mod-2, mod) % mod

# Applications:
# - Valid parentheses with n pairs → Catalan(n)
# - BSTs with n distinct keys → Catalan(n)
# - Triangulations of (n+2)-gon → Catalan(n)`,
    },
  ],

  // ─────────────────────────────────────────────
  // PROBLEMS
  // ─────────────────────────────────────────────
  problems: [
    {
      name: "Count Primes",
      difficulty: "Medium",
      companies: ["Amazon", "Bloomberg", "Microsoft", "Google"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/count-primes/", id: "#204" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/sieve-of-eratosthenes/", id: "Practice" },
      ],
      statement: "Count the number of primes less than n.",
      example: "n=10 → 4 (primes: 2,3,5,7) | n=0 → 0 | n=1 → 0",
      constraints: ["0 ≤ n ≤ 5×10⁶", "Count primes STRICTLY less than n"],
      approaches: [
        {
          title: "Trial Division for Each Number",
          emoji: "🐢",
          tag: "O(n√n)",
          complexity: "Time: O(n√n) | Space: O(1)",
          idea: "For each number 2..n-1, check if prime by trial division up to √i.",
          when: "Never for large n. Shows understanding of primality test.",
          code: `def count_primes_naive(n):
    def is_prime(num):
        if num < 2: return False
        for i in range(2, int(num**0.5)+1):
            if num % i == 0: return False
        return True
    return sum(1 for i in range(2, n) if is_prime(i))`,
        },
        {
          title: "Sieve of Eratosthenes",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n log log n) | Space: O(n)",
          idea: "Mark composites by sieving multiples. Start each prime's marking from p² (smaller multiples already marked by smaller primes).",
          when: "Always. The standard algorithm for counting primes.",
          code: `def count_primes(n):
    if n < 2: return 0
    is_prime = [True] * n
    is_prime[0] = is_prime[1] = False
    
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            # Start from i*i — all smaller multiples already marked
            for j in range(i*i, n, i):
                is_prime[j] = False
    
    return sum(is_prime)

# Optimization: only check odd numbers
def count_primes_optimized(n):
    if n < 2: return 0
    if n == 2: return 1
    # Sieve only for odd numbers (2 handled separately)
    sieve = [True] * (n//2)   # sieve[i] represents 2i+1
    sieve[0] = False           # 1 is not prime
    for i in range(1, int(n**0.5)//2 + 1):
        if sieve[i]:
            p = 2*i+1          # actual prime
            start = (p*p - 1) // 2
            sieve[start::p] = [False] * len(sieve[start::p])
    return 1 + sum(sieve)     # +1 for prime 2`,
        },
      ],
      ai: {
        hints: ["Why start marking from p² and not p?", "Why is Sieve O(n log log n) and not O(n²)?"],
        followUps: ["Count Primes in Range [l, r]", "Nth Prime", "Prime Factorization"],
        interviewQuestions: ["What's the time complexity of Sieve?", "How to find primes in range [l, r] efficiently?"],
      },
    },
    {
      name: "GCD of Array",
      difficulty: "Easy",
      companies: ["Google", "Amazon", "Microsoft"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/find-greatest-common-divisor-of-array/", id: "#1979" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/gcd-two-numbers/", id: "Practice" },
      ],
      statement: "Find GCD of all numbers in an array. Return GCD of minimum and maximum element.",
      example: "[2,5,6,9,10] → GCD(2,10) = 2 | [7,5,6,8,3] → GCD(3,8) = 1",
      constraints: ["Array non-empty", "All positive integers"],
      approaches: [
        {
          title: "GCD of min and max only",
          emoji: "⚡",
          tag: "OPTIMAL for this problem",
          complexity: "Time: O(n + log(max)) | Space: O(1)",
          idea: "GCD of whole array = GCD of min and max (per problem statement). Find min and max in O(n), then GCD in O(log n).",
          when: "As stated in this specific problem.",
          code: `import math
def find_gcd(nums):
    return math.gcd(min(nums), max(nums))`,
        },
        {
          title: "GCD of entire array (general)",
          emoji: "🔢",
          tag: "General Solution",
          complexity: "Time: O(n log max) | Space: O(1)",
          idea: "Reduce array: GCD of all = GCD(GCD(a[0],a[1]), a[2], ...). Each GCD call is O(log max).",
          when: "When you need GCD of entire array, not just min/max.",
          code: `from math import gcd
from functools import reduce

def array_gcd(nums):
    return reduce(gcd, nums)

# Equivalent to:
def array_gcd_manual(nums):
    result = nums[0]
    for i in range(1, len(nums)):
        result = gcd(result, nums[i])
        if result == 1: return 1  # early exit optimization
    return result`,
        },
      ],
      ai: {
        hints: ["GCD is associative: GCD(a,b,c) = GCD(GCD(a,b),c)", "Use reduce to apply GCD across array"],
        followUps: ["Find LCM of Array", "Coprime Arrays", "GCD of Strings"],
        interviewQuestions: ["How does GCD(a,b,c) relate to GCD(a,b) and c?", "When can you exit early?"],
      },
    },
    {
      name: "Power of Three",
      difficulty: "Easy",
      companies: ["Google", "Amazon", "Facebook"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/power-of-three/", id: "#326" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/find-if-a-number-is-power-of-another-number/", id: "Practice" },
      ],
      statement: "Given an integer n, return true if it is a power of three.",
      example: "27 → true | 9 → true | 45 → false | 0 → false",
      constraints: ["-2^31 ≤ n ≤ 2^31 - 1"],
      approaches: [
        {
          title: "Loop Division",
          emoji: "🔄",
          tag: "O(log n)",
          complexity: "Time: O(log₃ n) | Space: O(1)",
          idea: "Keep dividing by 3. If we reach 1 → power of 3. If we get non-multiple → not.",
          when: "Simple and generalizable to any base.",
          code: `def is_power_of_three_loop(n):
    if n <= 0: return False
    while n % 3 == 0:
        n //= 3
    return n == 1`,
        },
        {
          title: "Logarithm",
          emoji: "📊",
          tag: "O(1) with float risk",
          complexity: "Time: O(1) | Space: O(1)",
          idea: "n is power of 3 if log₃(n) is an integer. Check: 3^round(log₃(n)) == n.",
          when: "Clever but risky due to floating point errors.",
          code: `import math
def is_power_of_three_log(n):
    if n <= 0: return False
    x = math.log(n) / math.log(3)
    return abs(x - round(x)) < 1e-10 and 3**round(x) == n`,
        },
        {
          title: "Max Power of 3 Divisibility",
          emoji: "⚡",
          tag: "OPTIMAL O(1)",
          complexity: "Time: O(1) | Space: O(1)",
          idea: "Largest power of 3 that fits in 32-bit int is 3^19 = 1162261467. If n is a power of 3, it must divide 3^19 (since all powers of 3 are factors of each other).",
          when: "O(1) and no floating point. Best interview answer.",
          code: `def is_power_of_three(n):
    # 3^19 = 1162261467 is the largest power of 3 in 32-bit int
    # A power of 3 divides 3^19 evenly
    return n > 0 and 1162261467 % n == 0

# Generalization: is power of 2?  → n & (n-1) == 0 (bit trick)
# Is power of 3? → 3^19 % n == 0 (divisibility trick)
# Is power of 5? → 5^13 % n == 0 (5^13 = 1220703125 fits in int)
# Works because 2,3,5 are PRIME — their max powers divide higher powers`,
        },
      ],
      ai: {
        hints: ["Why does 3^19 % n == 0 work?", "This only works because 3 is prime — why?"],
        followUps: ["Power of Two", "Power of Four", "Power of Two (bit trick)"],
        interviewQuestions: ["Why does this approach only work for prime bases?", "What about Power of 4?"],
      },
    },
    {
      name: "Factorial Trailing Zeros",
      difficulty: "Medium",
      companies: ["Amazon", "Microsoft", "Bloomberg", "Adobe"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/factorial-trailing-zeroes/", id: "#172" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/count-trailing-zeroes-factorial-n/", id: "Practice" },
      ],
      statement: "Given n, return the number of trailing zeros in n!",
      example: "3 → 0 (3!=6) | 5 → 1 (5!=120) | 10 → 2 (10!=3628800)",
      constraints: ["0 ≤ n ≤ 10⁴", "Must be O(log n) — NOT compute n!"],
      approaches: [
        {
          title: "Naive — Compute n! then count",
          emoji: "🐢",
          tag: "Wrong — Too Slow/Overflow",
          complexity: "Time: O(n) | Space: O(n) digits",
          idea: "Compute n! and count trailing zeros. Fails for large n due to huge numbers.",
          when: "Never. n! for n=100 has 158 digits!",
          code: `# ⚠️ Works in Python but too slow for large n
def trailing_zeros_naive(n):
    factorial = 1
    for i in range(1, n+1): factorial *= i
    count = 0
    while factorial % 10 == 0:
        count += 1; factorial //= 10
    return count`,
        },
        {
          title: "Count Factor 5s — Mathematical",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(log n) | Space: O(1)",
          idea: `Trailing zeros come from factors of 10 = 2 × 5.
Factors of 2 are always more than factors of 5 in n!.
So count ONLY factors of 5 in 1 × 2 × ... × n.

Every multiple of 5 contributes one 5.
Every multiple of 25 contributes TWO 5s (one extra).
Every multiple of 125 contributes THREE 5s (two extra).

Count = ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + ...`,
          when: "Always. Pure math, O(log n).",
          code: `def trailing_zeros(n):
    count = 0
    power = 5
    while power <= n:
        count += n // power
        power *= 5
    return count

# Equivalent elegant version:
def trailing_zeros_v2(n):
    count = 0
    while n >= 5:
        n //= 5
        count += n
    return count

# Trace for n=100:
# 100//5  = 20 (multiples of 5: 5,10,...,100)
# 100//25 = 4  (multiples of 25: 25,50,75,100 — each contributes extra 5)
# 100//125= 0  (stop)
# Total: 24 trailing zeros in 100! ✅`,
        },
      ],
      ai: {
        hints: ["Trailing zeros = factors of 10 = min(factors of 2, factors of 5)", "Why are factors of 2 always more than factors of 5?"],
        followUps: ["Factorial Digit Sum", "Find if n! is divisible by p^k", "Count of Zeros in Numbers 1..n"],
        interviewQuestions: ["What if we wanted count of some other digit?", "How many times does prime p appear in n!?"],
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
      statement: "Array contains n distinct numbers in range [0, n]. Find the missing number.",
      example: "[3,0,1] → 2 | [9,6,4,2,3,5,7,0,1] → 8",
      constraints: ["Exactly one number missing", "All numbers distinct"],
      approaches: [
        {
          title: "Sort and Scan",
          emoji: "📊",
          tag: "O(n log n)",
          complexity: "Time: O(n log n) | Space: O(1)",
          idea: "Sort. Numbers should equal their indices. Find where they don't.",
          when: "Simple but slow.",
          code: `def missing_number_sort(nums):
    nums.sort()
    for i, n in enumerate(nums):
        if i != n: return i
    return len(nums)`,
        },
        {
          title: "Gauss Formula — Sum",
          emoji: "➕",
          tag: "O(1) space",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Expected sum = n(n+1)/2. Actual sum = sum of array. Missing = expected - actual.",
          when: "Clean O(1) space solution. Slight overflow risk for large n.",
          code: `def missing_number_sum(nums):
    n = len(nums)
    expected = n * (n+1) // 2      # Gauss formula
    return expected - sum(nums)`,
        },
        {
          title: "XOR — Bit Manipulation",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "XOR all indices 0..n with all array values. Duplicate pairs cancel. Missing number remains.",
          when: "No overflow risk. Most elegant. Shows bit mastery.",
          code: `def missing_number(nums):
    result = len(nums)          # start with n
    for i, num in enumerate(nums):
        result ^= i ^ num       # XOR with both index and value
    return result

# WHY: result = n ^ 0^nums[0] ^ 1^nums[1] ^ ... ^ (n-1)^nums[n-1]
# All pairs (i ^ nums[i]) cancel EXCEPT for the missing index
# That missing index XORed with 0 = the missing number`,
        },
      ],
      ai: {
        hints: ["What's the sum of 0 to n? (Gauss formula)", "What's the XOR of all numbers from 0 to n?"],
        followUps: ["Find All Duplicates in Array", "First Missing Positive", "Single Number"],
        interviewQuestions: ["What if two numbers were missing?", "What about overflow with sum approach?"],
      },
    },
    {
      name: "Ugly Number II — nth Ugly Number",
      difficulty: "Medium",
      companies: ["Amazon", "Google", "Microsoft", "Facebook"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/ugly-number-ii/", id: "#264" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/ugly-numbers/", id: "Practice" },
      ],
      statement: "Ugly numbers have only prime factors 2, 3, 5. Find the nth ugly number. (1 is ugly)",
      example: "n=10 → 12 (1,2,3,4,5,6,8,9,10,12)",
      constraints: ["1 ≤ n ≤ 1690", "1 is considered ugly"],
      approaches: [
        {
          title: "Check Each Number",
          emoji: "🐢",
          tag: "O(n×log n)",
          complexity: "Time: O(n×log n) | Space: O(1)",
          idea: "For each number, keep dividing by 2, 3, 5. If result is 1 → ugly. Count ugly numbers until nth.",
          when: "Slow for large n. Shows understanding.",
          code: `def nth_ugly_number_naive(n):
    def is_ugly(num):
        for p in [2, 3, 5]:
            while num % p == 0:
                num //= p
        return num == 1
    count = ugly = 0
    while count < n:
        ugly += 1
        if is_ugly(ugly): count += 1
    return ugly`,
        },
        {
          title: "DP with Three Pointers",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(n)",
          idea: `Generate ugly numbers in order using DP and 3 pointers.
Every ugly number = some previous ugly × 2, 3, or 5.
Maintain 3 pointers (i2, i3, i5) into the dp array.
Next ugly = min(dp[i2]×2, dp[i3]×3, dp[i5]×5).
Advance the pointer(s) that produced the minimum.`,
          when: "Always. O(n) and generates in order.",
          code: `def nth_ugly_number(n):
    dp = [0] * n
    dp[0] = 1
    i2 = i3 = i5 = 0    # pointers for ×2, ×3, ×5
    
    for i in range(1, n):
        next2 = dp[i2] * 2
        next3 = dp[i3] * 3
        next5 = dp[i5] * 5
        
        dp[i] = min(next2, next3, next5)
        
        # Advance ALL pointers that produced this minimum
        # (handles duplicates like 6 = 2×3 = 3×2)
        if dp[i] == next2: i2 += 1
        if dp[i] == next3: i3 += 1
        if dp[i] == next5: i5 += 1
    
    return dp[n-1]

# Trace first 10: [1,2,3,4,5,6,8,9,10,12]
# dp[1]=min(2,3,5)=2, advance i2
# dp[2]=min(4,3,5)=3, advance i3
# dp[3]=min(4,6,5)=4, advance i2
# dp[4]=min(6,6,5)=5, advance i5
# dp[5]=min(6,6,10)=6, advance i2 AND i3 (both give 6)`,
        },
      ],
      ai: {
        hints: ["Every ugly number is a previous ugly × 2, 3, or 5", "How do you generate them in sorted order?"],
        followUps: ["Super Ugly Number", "Ugly Number III (custom primes)", "Ugly Number I (check if ugly)"],
        interviewQuestions: ["Why advance multiple pointers at the minimum?", "Generalize to k primes?"],
      },
    },
    {
      name: "Excel Sheet Column Number",
      difficulty: "Easy",
      companies: ["Microsoft", "Amazon", "Bloomberg", "Uber"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/excel-sheet-column-number/", id: "#171" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/find-excel-column-number-column-title/", id: "Practice" },
      ],
      statement: "Convert Excel column title (A, B, ..., Z, AA, AB, ...) to its corresponding column number.",
      example: "A→1, B→2, Z→26, AA→27, AB→28, ZY→701",
      constraints: ["Only uppercase English letters", "1 ≤ len ≤ 7"],
      approaches: [
        {
          title: "Base-26 Conversion",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Exactly like converting a base-26 number to decimal. A=1, B=2, ..., Z=26. Process left to right: result = result×26 + value(char).",
          when: "Always. Direct mathematical insight.",
          code: `def title_to_number(columnTitle):
    result = 0
    for char in columnTitle:
        result = result * 26 + (ord(char) - ord('A') + 1)
    return result

# Trace "AB":
# char='A': result = 0*26 + 1 = 1
# char='B': result = 1*26 + 2 = 28  ✅

# Reverse (number to title):
def number_to_title(n):
    result = ""
    while n > 0:
        n -= 1                              # adjust for 1-indexing
        result = chr(n % 26 + ord('A')) + result
        n //= 26
    return result

print(number_to_title(28))   # "AB"  ✅`,
        },
      ],
      ai: {
        hints: ["Think of it as base-26 but starting from 1 not 0", "A=1 not A=0 — what adjustment does this require?"],
        followUps: ["Excel Sheet Column Title (reverse)", "Base Conversion"],
        interviewQuestions: ["Why is this NOT exactly base-26?", "Handle the reverse conversion?"],
      },
    },
    {
      name: "Reverse Integer",
      difficulty: "Medium",
      companies: ["Amazon", "Microsoft", "Bloomberg", "Apple"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/reverse-integer/", id: "#7" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/reverse-digits-of-an-integer/", id: "Practice" },
      ],
      statement: "Reverse digits of a 32-bit signed integer. Return 0 if reversed overflows 32-bit range.",
      example: "123 → 321 | -123 → -321 | 120 → 21 | 1534236469 → 0 (overflow)",
      constraints: ["Must stay in [-2^31, 2^31 - 1]", "No extra string/array conversion"],
      approaches: [
        {
          title: "String Reversal",
          emoji: "📝",
          tag: "O(n) simple",
          complexity: "Time: O(n digits) | Space: O(n)",
          idea: "Convert to string, reverse, check overflow.",
          when: "Simple. Mentionable but not the intended solution.",
          code: `def reverse_str(x):
    sign = -1 if x < 0 else 1
    s = str(abs(x))[::-1]
    result = sign * int(s)
    if result < -2**31 or result > 2**31-1: return 0
    return result`,
        },
        {
          title: "Math — Digit by Digit",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(log n) | Space: O(1)",
          idea: "Extract digits using % 10, build reversed number using × 10 + digit. Check overflow BEFORE each multiplication.",
          when: "Always. O(1) space, no string conversion.",
          code: `def reverse(x):
    INT_MAX = 2**31 - 1   # 2147483647
    INT_MIN = -(2**31)    # -2147483648
    
    result = 0
    sign = -1 if x < 0 else 1
    x = abs(x)
    
    while x != 0:
        digit = x % 10           # extract last digit
        x //= 10                 # remove last digit
        
        # Check overflow BEFORE appending digit
        if result > (INT_MAX - digit) // 10:
            return 0
        
        result = result * 10 + digit
    
    result *= sign
    if result < INT_MIN or result > INT_MAX: return 0
    return result`,
        },
      ],
      ai: {
        hints: ["How do you extract the last digit of a number?", "Check for overflow before multiplying by 10"],
        followUps: ["Palindrome Number", "String to Integer (atoi)"],
        interviewQuestions: ["How do you check overflow without converting to larger type?", "Handle negative numbers?"],
      },
    },
  ],

  // ─────────────────────────────────────────────
  // INTERVIEW TIPS
  // ─────────────────────────────────────────────
  interviewTips: [
    "Gauss formula: 1+2+...+n = n(n+1)/2 — memorize for missing number, sum problems",
    "Trailing zeros in n! = ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + ... — count factor 5s only",
    "Fast power: pow(a, n, mod) in Python — always O(log n), use instead of loop",
    "GCD: Euclidean algorithm O(log min(a,b)) — memorize both recursive and iterative",
    "LCM(a,b) = a // GCD(a,b) * b — divide BEFORE multiply to avoid overflow",
    "Modular inverse of a mod prime p: pow(a, p-2, p) — Fermat's little theorem",
    "Integer ceiling division: (a + b - 1) // b — use instead of math.ceil(a/b)",
    "For primes: all primes > 3 have form 6k±1 — speeds up primality test by 3x",
    "Catalan numbers count parentheses, BSTs, triangulations — recognize pattern",
    "n^2 sum of first n odds, n(n+1) sum of first n evens — instant O(1) solutions",
    "Matrix exponentiation: any linear recurrence can be computed in O(log n)",
    "Sieve of Eratosthenes: O(n log log n) — fastest practical prime finding up to 10^7",
  ],

  // ─────────────────────────────────────────────
  // COMMON MISTAKES
  // ─────────────────────────────────────────────
  mistakes: [
    "Integer overflow: use long long in Java/C++ when multiplying large numbers",
    "Python modulo: -7 % 3 = 2 (always positive) — different from Java/C++ (-7%3=-1)",
    "Java: Math.floor() and Math.ceil() return double, not int — cast with (int)",
    "LCM: computing a*b/GCD(a,b) can overflow — always do a/GCD(a,b)*b instead",
    "Primality test: forget to check n<2 special case (0 and 1 are not prime)",
    "Sieve: start marking from i*i not 2*i (smaller multiples already marked)",
    "Fast power: applying modulo only at end causes overflow — apply at each step",
    "Counting primes: edge case n=0 or n=1 returns 0 (no primes < 0 or < 1)",
    "GCD(0, n) = n by definition — handle zero inputs carefully",
    "Round half: Python rounds to even (round(2.5)=2, round(3.5)=4) — not always expected",
    "Catalan index: Catalan(0)=1, Catalan(1)=1, Catalan(2)=2 — 0-indexed!",
  ],

  // ─────────────────────────────────────────────
  // QUIZ
  // ─────────────────────────────────────────────
  quiz: [
    {
      q: "What is the sum of numbers 1 to 100 using Gauss's formula?",
      options: ["5000", "5050", "4950", "10000"],
      answer: 1,
      explanation: "n(n+1)/2 = 100×101/2 = 5050. This is Gauss's famous formula. Legend says he found it at age 9 when his teacher asked the class to sum 1 to 100. Instead of adding sequentially, he paired: 1+100=101, 2+99=101, ..., 50+51=101. That's 50 pairs of 101 = 5050.",
    },
    {
      q: "How many trailing zeros does 100! have?",
      options: ["10", "20", "24", "25"],
      answer: 2,
      explanation: "Count factors of 5: ⌊100/5⌋ + ⌊100/25⌋ + ⌊100/125⌋ = 20 + 4 + 0 = 24. The 24 comes from: 20 multiples of 5 (each contributes one 5), plus 4 multiples of 25 (25,50,75,100 — each contributes one EXTRA 5).",
    },
    {
      q: "GCD(48, 18) using Euclidean algorithm — how many steps?",
      options: ["2 steps → 6", "3 steps → 6", "4 steps → 6", "5 steps → 6"],
      answer: 0,
      explanation: "GCD(48,18): 48=2×18+12 → GCD(18,12). 18=1×12+6 → GCD(12,6). 12=2×6+0 → GCD(6,0)=6. That's 3 applications of the formula: (48,18)→(18,12)→(12,6)→(6,0). Result = 6.",
    },
    {
      q: "What is the 5th Catalan number C(5)?",
      options: ["14", "28", "42", "132"],
      answer: 2,
      explanation: "Catalan sequence: C(0)=1, C(1)=1, C(2)=2, C(3)=5, C(4)=14, C(5)=42. Formula: C(5) = C(10,5)/6 = 252/6 = 42. This counts e.g. the number of valid expressions with 5 pairs of parentheses.",
    },
    {
      q: "What is the modular inverse of 3 modulo 7?",
      options: ["2", "3", "5", "6"],
      answer: 2,
      explanation: "We need x such that 3×x ≡ 1 (mod 7). Check: 3×5=15=2×7+1, so 15 mod 7 = 1. Answer: 5. Using Fermat: pow(3, 7-2, 7) = pow(3,5,7) = 243 mod 7 = 5. ✅",
    },
    {
      q: "How many divisors does 360 have? (360 = 2³ × 3² × 5¹)",
      options: ["12", "18", "24", "36"],
      answer: 2,
      explanation: "Using the formula: number of divisors = (a1+1)(a2+1)(a3+1) for n = p1^a1 × p2^a2 × p3^a3. For 360 = 2³ × 3² × 5¹: (3+1)(2+1)(1+1) = 4×3×2 = 24 divisors.",
    },
    {
      q: "ceil(7/2) using integer arithmetic without math.ceil()?",
      options: ["3", "4 using (7+1)//2", "4 using (7+2-1)//2", "4 using both b and c"],
      answer: 3,
      explanation: "⌈a/b⌉ = (a+b-1)//b for positive integers. Here: (7+2-1)//2 = 8//2 = 4 ✅. This formula is extremely useful in DSA — memorize it. Also works: (7+1)//2 = 4 when b=2 specifically.",
    },
  ],

  // ─────────────────────────────────────────────
  // PRACTICE LINKS
  // ─────────────────────────────────────────────
  practice_links: [
    { platform: "LeetCode Math", url: "https://leetcode.com/tag/math/", color: "bg-orange-500", problems: "400+ problems", recommended: true },
    { platform: "GFG Mathematical Algorithms", url: "https://www.geeksforgeeks.org/mathematical-algorithms/", color: "bg-green-600", problems: "Deep theory + practice", recommended: true },
    { platform: "Project Euler", url: "https://projecteuler.net/", color: "bg-slate-700", problems: "750+ math challenges — the gold standard" },
    { platform: "Striver's Maths Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", color: "bg-indigo-600", problems: "Interview-focused math" },
    { platform: "NeetCode Math & Geometry", url: "https://neetcode.io/roadmap", color: "bg-violet-600", problems: "Curated interview problems" },
    { platform: "Codeforces Math", url: "https://codeforces.com/problemset?tags=math", color: "bg-blue-600", problems: "Competitive math problems" },
    { platform: "SPOJ Math", url: "https://www.spoj.com/problems/classical/sort=6/", color: "bg-red-600", problems: "Classic math problems" },
  ],
};

export default math;
