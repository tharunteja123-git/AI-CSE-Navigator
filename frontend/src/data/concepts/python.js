
const pythonConcept = {
  id: "python",
  language: "Python",
  emoji: "🐍",
  tagline: "The language that reads like English and thinks like a mathematician",
  color: "bg-blue-500",
  light: "bg-blue-50",
  border: "border-blue-200",
  text: "text-blue-700",
  gradient: "from-blue-600 to-indigo-600",

  overview: {
    what: `Python is a high-level, interpreted, dynamically-typed programming language created by Guido van Rossum and first released in 1991. The name comes from the British comedy group "Monty Python", not the snake.

Python was designed with one core philosophy: code should be readable. When you open a Python file, it almost reads like English sentences. This is not an accident — it is the single most important design decision Guido made.`,

    why: `Python became the #1 most-used language in the world by 2024 for several reasons:

1. READABLE CODE — No curly braces, no semicolons. Indentation IS the structure.
2. BATTERIES INCLUDED — The standard library has everything from HTTP servers to XML parsers.
3. VERSATILE — Web (Django/FastAPI), Data Science (NumPy/Pandas), AI (TensorFlow/PyTorch), Scripting, Automation, APIs.
4. HUGE ECOSYSTEM — 400,000+ packages on PyPI (Python Package Index).
5. JOB MARKET — Required in 65%+ of data science and backend engineering roles.
6. FAST TO WRITE — What takes 50 lines in Java often takes 10 in Python.`,

    philosophy: `The Python philosophy is encoded in PEP 20 — "The Zen of Python".
Run this in any Python shell: import this

Key principles:
• Beautiful is better than ugly
• Explicit is better than implicit
• Simple is better than complex
• Readability counts
• There should be one obvious way to do it
• If the implementation is hard to explain, it's a bad idea`,

    versions: `PYTHON VERSIONS:
Python 2.x  — Legacy, reached end of life Jan 1, 2020. DO NOT USE.
Python 3.0  — Released 2008, broke backward compatibility intentionally.
Python 3.10+ — Modern Python. Use Python 3.10, 3.11, or 3.12 for all new projects.

CHECK YOUR VERSION:
python --version        # or python3 --version
# Output: Python 3.12.1

WHY 3 BROKE 2:
print "hello"     # Python 2 — print is a statement
print("hello")    # Python 3 — print is a function
5/2 = 2           # Python 2 — integer division
5/2 = 2.5         # Python 3 — true division (correct behavior)
unicode everywhere in Python 3 — no more encoding headaches`,
  },

  sections: [
    // ────────────────────────────────────────────────────────
    // SECTION 1: SETUP & FIRST PROGRAM
    // ────────────────────────────────────────────────────────
    {
      id: "setup",
      title: "Setup & Your First Program",
      emoji: "🚀",
      content: `Before writing Python, you need Python installed. Then you need a way to run it.

HOW PYTHON RUNS YOUR CODE:
Your .py file → Python Interpreter → Converts to bytecode (.pyc) → CPython VM executes it

Python is INTERPRETED — unlike C++/Java which compile to machine code, Python reads and executes line by line. This makes debugging easier but slightly slower.`,
      subsections: [
        {
          title: "Installation",
          content: `Download from python.org → Choose Python 3.12+

VERIFY INSTALLATION:
Open terminal (Command Prompt / PowerShell / Terminal):
  python --version        # Windows: might need python3
  python3 --version       # Mac/Linux

PYTHON REPL (Read-Eval-Print Loop):
Just type 'python' in terminal — you get an interactive shell.
Great for quick experiments.
>>> 2 + 2
4
>>> "hello" + " world"
'hello world'
Exit with exit() or Ctrl+D`,
        },
        {
          title: "Running Python Files",
          content: `Create a file called hello.py using any text editor.
Run it with: python hello.py

IDEs (Integrated Development Environments) — pick ONE:
• VS Code + Python extension (recommended for beginners)
• PyCharm (powerful, heavier, professional)
• Jupyter Notebook (best for data science and learning)
• Thonny (designed for beginners)`,
          code: `# hello.py — Your very first Python program

# This is a comment. Python ignores everything after #
# Comments explain WHY your code does something

print("Hello, World!")               # print() displays output
print("My name is Python 🐍")
print("I am", 3, "decades old")      # print handles multiple values

# Python knows what type each value is automatically:
print(2 + 3)        # → 5      (integer math)
print(2.5 + 1.5)    # → 4.0    (float math)
print("Hi" * 3)     # → HiHiHi (string repetition!)

# Run this file with: python hello.py`,
        },
      ],
    },

    // ────────────────────────────────────────────────────────
    // SECTION 2: VARIABLES & DATA TYPES
    // ────────────────────────────────────────────────────────
    {
      id: "variables",
      title: "Variables & Data Types",
      emoji: "📦",
      content: `A variable is a named container that holds a value in memory.

Python is DYNAMICALLY TYPED — you don't declare the type. Python figures it out.
Python is STRONGLY TYPED — once a type is set, you can't accidentally mix them.

VARIABLE NAMING RULES:
✅ Must start with a letter or underscore: name, _name, name1
❌ Cannot start with a number: 1name (SyntaxError)
✅ Can contain letters, digits, underscores
❌ Cannot contain spaces or special chars: my-var (SyntaxError)
✅ Case sensitive: name ≠ Name ≠ NAME
❌ Cannot use reserved words: if, for, class, return, etc.

NAMING CONVENTIONS (Python style guide - PEP 8):
  Variables & functions: snake_case       (my_variable, calculate_sum)
  Constants:            UPPER_SNAKE_CASE  (MAX_SIZE, PI)
  Classes:              PascalCase        (StudentProfile, BankAccount)
  Private:              _leading_underscore (_internal_var)`,
      code: `# ── CREATING VARIABLES ────────────────────────────────────────────

name = "Rahul"              # str (string) — text in quotes
age = 21                    # int (integer) — whole number
gpa = 8.75                  # float — decimal number
is_student = True           # bool — True or False (capital!)
nothing = None              # NoneType — absence of value

# Python infers the type — no need to write int age = 21
print(type(name))           # <class 'str'>
print(type(age))            # <class 'int'>
print(type(gpa))            # <class 'float'>
print(type(is_student))     # <class 'bool'>
print(type(nothing))        # <class 'NoneType'>

# ── DYNAMIC TYPING — type CAN change ──────────────────────────────
x = 10
print(x, type(x))          # 10 <class 'int'>
x = "now I am a string"
print(x, type(x))          # now I am a string <class 'str'>
x = 3.14
print(x, type(x))          # 3.14 <class 'float'>

# ── MULTIPLE ASSIGNMENT ───────────────────────────────────────────
a = b = c = 0               # all three point to same value 0
x, y, z = 1, 2, 3          # unpacking — very Pythonic!
first, *rest = [1, 2, 3, 4, 5]  # first=1, rest=[2,3,4,5]
a, b = b, a                 # SWAP without temp variable — only in Python!

print(a, b)                 # swapped!

# ── CHECKING AND COMPARING TYPES ──────────────────────────────────
num = 42
print(isinstance(num, int))         # True
print(isinstance(num, (int, float)))# True — is it int OR float?
print(type(num) == int)             # True — exact type match

# ── CONSTANTS (by convention — Python doesn't enforce) ────────────
MAX_RETRIES = 3
GRAVITATIONAL_CONSTANT = 9.8
PI = 3.14159265358979

# ── DELETION ──────────────────────────────────────────────────────
temp = "temporary"
del temp
# print(temp)   # NameError: name 'temp' is not defined`,
    },

    // ────────────────────────────────────────────────────────
    // SECTION 3: NUMBERS
    // ────────────────────────────────────────────────────────
    {
      id: "numbers",
      title: "Numbers — int, float, complex",
      emoji: "🔢",
      content: `Python has three built-in numeric types:

int     — Whole numbers, no size limit (Python ints are arbitrary precision!)
float   — Decimal numbers, stored as 64-bit IEEE 754 double precision
complex — Numbers with real and imaginary parts (for advanced math/engineering)

KEY DIFFERENCE FROM C++/JAVA:
In Python, integers have NO overflow. You can compute 2**1000 and get the exact answer.
In Java, int overflows at 2^31. You'd get wrong answers.`,
      code: `# ── INTEGER — Whole numbers ───────────────────────────────────────

a = 100
b = -50
big = 10_000_000        # Underscores for readability (Python 3.6+)
binary_num = 0b1010     # Binary literal → 10
octal_num  = 0o17       # Octal literal  → 15
hex_num    = 0xFF       # Hex literal    → 255

print(big)              # 10000000
print(binary_num)       # 10
print(hex_num)          # 255

# No overflow in Python!
huge = 2 ** 1000
print(huge)             # Exact 301-digit answer!

# ── ARITHMETIC OPERATORS ──────────────────────────────────────────
x, y = 17, 5
print(x + y)            # 22  — Addition
print(x - y)            # 12  — Subtraction
print(x * y)            # 85  — Multiplication
print(x / y)            # 3.4 — True division (always float!)
print(x // y)           # 3   — Floor division (round down)
print(x % y)            # 2   — Modulo (remainder)
print(x ** y)           # 1419857 — Exponentiation (17^5)

# Negative floor division — tricky!
print(-17 // 5)         # -4 (NOT -3!) — always floors toward -infinity
print(-17 % 5)          # 3  (NOT -2!) — always non-negative in Python

# ── FLOAT — Decimal numbers ───────────────────────────────────────
pi = 3.14159
sci = 1.5e10            # Scientific notation: 1.5 × 10^10
small = 2.5e-4          # 0.00025

print(pi)               # 3.14159
print(sci)              # 15000000000.0

# FLOATING POINT PRECISION — the famous issue
print(0.1 + 0.2)        # 0.30000000000000004 — NOT 0.3!
# WHY: floats are stored in binary. 0.1 has no exact binary representation.
# FIX: use round() or decimal module
print(round(0.1 + 0.2, 1))         # 0.3

from decimal import Decimal
print(Decimal('0.1') + Decimal('0.2'))   # 0.3 exactly

# ── MATH FUNCTIONS ────────────────────────────────────────────────
import math

print(abs(-15))         # 15   — absolute value
print(round(3.7))       # 4    — round to nearest int
print(round(3.456, 2))  # 3.46 — round to 2 decimal places
print(math.floor(3.9))  # 3    — always rounds down
print(math.ceil(3.1))   # 4    — always rounds up
print(math.sqrt(16))    # 4.0  — square root
print(math.pow(2, 8))   # 256.0
print(math.log(100, 10))# 2.0  — log base 10
print(math.log2(8))     # 3.0  — log base 2
print(math.e)           # 2.718281828...
print(math.pi)          # 3.141592653...
print(math.sin(math.pi/2))   # 1.0
print(math.factorial(5))     # 120
print(math.gcd(48, 18))      # 6  (Python 3.5+)

# ── TYPE CONVERSION ───────────────────────────────────────────────
print(int(3.9))         # 3    — truncates, does NOT round
print(int("42"))        # 42   — string to int
print(float(5))         # 5.0
print(float("3.14"))    # 3.14
print(str(100))         # "100"
print(bin(10))          # '0b1010'
print(hex(255))         # '0xff'
print(oct(8))           # '0o10'

# ── COMPLEX NUMBERS ───────────────────────────────────────────────
c = 3 + 4j              # j is imaginary unit in Python
print(c.real)           # 3.0
print(c.imag)           # 4.0
print(abs(c))           # 5.0  — magnitude = sqrt(3²+4²)`,
    },

    // ────────────────────────────────────────────────────────
    // SECTION 4: STRINGS
    // ────────────────────────────────────────────────────────
    {
      id: "strings",
      title: "Strings — Text Handling",
      emoji: "🔤",
      content: `Strings are sequences of characters. In Python 3, strings are always Unicode — you can use any language, emoji, or special character naturally.

IMMUTABILITY: Strings cannot be changed after creation. Every "modification" creates a new string.
This is important for performance — if you concatenate 1000 strings in a loop with +=, you create 1000 new strings!`,
      code: `# ── CREATING STRINGS ──────────────────────────────────────────────
s1 = 'Single quotes work fine'
s2 = "Double quotes also work"
s3 = """Triple quotes
span multiple
lines"""
s4 = '''Also valid
multiline'''
raw = r"C:\Users\name\file"  # Raw string — no escape processing
byte = b"bytes literal"       # Bytes object, not str

print(s1)
print(s3)
print(raw)                   # C:\Users\name\file (no escape)

# ── ESCAPE CHARACTERS ─────────────────────────────────────────────
print("Hello\nWorld")        # \n = newline
print("Tab\there")           # \t = tab
print("Quote: \"hi\"")       # \" = literal quote
print("Backslash: \\")       # \\ = literal backslash
print("\u0041")              # Unicode: A
print("\U0001F600")          # Emoji: 😀

# ── STRING INDEXING & SLICING ─────────────────────────────────────
word = "PYTHON"
#         0 1 2 3 4 5   ← positive indices
#        -6-5-4-3-2-1   ← negative indices (from end)

print(word[0])               # P  — first character
print(word[-1])              # N  — last character
print(word[2])               # T
print(word[-2])              # O

# Slicing: word[start : stop : step]
# start = inclusive, stop = EXCLUSIVE
print(word[1:4])             # YTH  → indices 1,2,3 (not 4)
print(word[:3])              # PYT  → from start to index 3
print(word[3:])              # HON  → from index 3 to end
print(word[:])               # PYTHON → full copy
print(word[::2])             # PTO  → every 2nd character
print(word[::-1])            # NOHTYP → reversed string!
print(word[1:5:2])           # YH  → from 1 to 4, step 2

# ── STRING METHODS — the most important ones ──────────────────────
text = "  Hello, World! Hello, Python!  "

# Case methods
print(text.upper())          # "  HELLO, WORLD! HELLO, PYTHON!  "
print(text.lower())          # "  hello, world! hello, python!  "
print(text.title())          # "  Hello, World! Hello, Python!  "
print(text.capitalize())     # First char up, rest down
print(text.swapcase())       # Toggle each character's case

# Whitespace methods
print(text.strip())          # Remove leading & trailing whitespace
print(text.lstrip())         # Remove left whitespace only
print(text.rstrip())         # Remove right whitespace only

# Search methods
print(text.find("Hello"))    # 2   — first index, or -1 if not found
print(text.rfind("Hello"))   # 17  — last occurrence
print(text.index("World"))   # 9   — like find but raises ValueError
print(text.count("Hello"))   # 2   — count occurrences
print("Hello" in text)       # True — membership check
print(text.startswith("  ")) # True
print(text.endswith("!  "))  # True

# Replace & Split
print(text.replace("Hello", "Hi"))      # Replace ALL occurrences
print(text.replace("Hello", "Hi", 1))   # Replace only first
clean = text.strip()
parts = clean.split(", ")               # ["Hello" "World! Hello" "Python!"]
print(parts)
print(" | ".join(parts))                # Rejoin with " | "

words = "one two three".split()         # Default split on whitespace
print(words)                            # ['one', 'two', 'three']

# Validation methods
print("hello".isalpha())     # True  — all alphabetic
print("hello123".isalnum())  # True  — all alphanumeric
print("123".isdigit())       # True  — all digits
print("  ".isspace())        # True  — all whitespace
print("UPPER".isupper())     # True
print("lower".islower())     # True

# Alignment
print("Python".center(12))       # "   Python   "
print("Python".center(12, "-"))  # "---Python---"
print("Python".ljust(12, "."))   # "Python......"
print("Python".rjust(12, "."))   # "......Python"
print("42".zfill(5))             # "00042"

# ── STRING FORMATTING — 3 ways ────────────────────────────────────
name = "Rahul"; age = 21; gpa = 8.75

# Method 1: f-strings (Python 3.6+) — RECOMMENDED ─────────────────
print(f"Name: {name}, Age: {age}")          # Name: Rahul, Age: 21
print(f"GPA: {gpa:.2f}")                    # GPA: 8.75 (2 decimal places)
print(f"Age squared: {age**2}")             # Age squared: 441 — expressions!
print(f"Upper: {name.upper()}")             # Method calls inside f-strings
print(f"{'Python':>10}")                    # Right-align in 10 chars
print(f"{'Python':<10}")                    # Left-align
print(f"{'Python':^10}")                    # Center-align
print(f"{1000000:,}")                       # 1,000,000 — thousand separator
print(f"{0.12345:.2%}")                     # 12.35% — percentage format

# Method 2: .format() method
print("Name: {}, Age: {}".format(name, age))
print("Name: {n}, Age: {a}".format(n=name, a=age))
print("{0} is {1} and {0} is cool".format("Python", "amazing"))

# Method 3: % formatting (old style — avoid but know it)
print("Name: %s, Age: %d, GPA: %.2f" % (name, age, gpa))

# ── STRING OPERATIONS ─────────────────────────────────────────────
s = "Hello"
print(s + " World")         # Concatenation — creates NEW string
print(s * 3)                # Repetition: HelloHelloHello
print(len(s))               # Length: 5
print(s[1:3])               # Slice: el
print(list(s))              # ['H','e','l','l','o'] — iterate chars

# EFFICIENT CONCATENATION (avoid += in loops!)
# Bad: O(n²)
# result = ""
# for char in some_list:
#     result += char   ← Creates new string every iteration!

# Good: O(n)
parts = ["Hello", " ", "World", "!"]
result = "".join(parts)      # ← join() is always the right tool
print(result)               # Hello World!

# ── MULTILINE STRINGS ─────────────────────────────────────────────
sql_query = """
    SELECT name, age
    FROM students
    WHERE gpa > 8.0
    ORDER BY name;
"""
print(sql_query)

# ── STRING AS SEQUENCE ────────────────────────────────────────────
for char in "ABCD":
    print(char)             # A, B, C, D each on new line

print(list("hello"))        # ['h', 'e', 'l', 'l', 'o']
print(sorted("python"))     # ['h', 'n', 'o', 'p', 't', 'y']
print(min("python"))        # h (lexicographically smallest)
print(max("python"))        # y (lexicographically largest)`,
    },

    // ────────────────────────────────────────────────────────
    // SECTION 5: BOOLEAN & COMPARISON
    // ────────────────────────────────────────────────────────
    {
      id: "booleans",
      title: "Booleans & Comparison",
      emoji: "✅",
      content: `Booleans are the foundation of every decision in code. There are exactly two boolean values: True and False. Note the capital letters — Python is case-sensitive.

Boolean is actually a SUBCLASS of int in Python. True == 1 and False == 0. This means you can do arithmetic with booleans!`,
      code: `# ── BOOLEAN VALUES ───────────────────────────────────────────────
print(True)                  # True
print(False)                 # False
print(type(True))            # <class 'bool'>

# Booleans are integers!
print(True + True)           # 2
print(True * 5)              # 5
print(False + 1)             # 1
print(sum([True, True, False, True]))  # 3 — count True values!

# ── COMPARISON OPERATORS ──────────────────────────────────────────
a, b = 10, 20

print(a == b)    # False — equality (== not =)
print(a != b)    # True  — inequality
print(a < b)     # True  — less than
print(a > b)     # False — greater than
print(a <= b)    # True  — less than or equal
print(a >= b)    # False — greater than or equal

# CHAINED COMPARISONS — Python is elegant here
x = 15
print(10 < x < 20)           # True  — is x between 10 and 20?
print(1 <= x <= 100)         # True
# This means: (10 < x) AND (x < 20)
# Java/C++ would write: x > 10 && x < 20

# ── LOGICAL OPERATORS ─────────────────────────────────────────────
# and — both must be True
print(True and True)         # True
print(True and False)        # False
print(False and True)        # False

# or — at least one must be True
print(True or False)         # True
print(False or False)        # False

# not — flips the value
print(not True)              # False
print(not False)             # True

# Real examples
age = 20; has_id = True
print(age >= 18 and has_id)  # True — can enter club

score = 85
print(score >= 90 or score >= 85)  # True — A or A- grade

# ── SHORT-CIRCUIT EVALUATION ──────────────────────────────────────
# Python stops evaluating as soon as result is determined

def check():
    print("check() called!")
    return True

# With 'and': if first is False, second is NEVER evaluated
print(False and check())     # False — check() is never called!

# With 'or': if first is True, second is NEVER evaluated
print(True or check())       # True — check() is never called!

# PRACTICAL USE: safe default values
name = ""
display_name = name or "Anonymous"    # "" is falsy → uses "Anonymous"
print(display_name)          # Anonymous

config = None
value = config or "default"
print(value)                 # default

# ── TRUTHINESS — Every value has a bool interpretation ────────────
# FALSY VALUES (evaluate to False):
# False, None, 0, 0.0, 0j, "", [], (), {}, set()
# Any empty container is falsy!

# TRUTHY VALUES (evaluate to True):
# True, any non-zero number, any non-empty string/container

print(bool(0))               # False
print(bool(""))              # False
print(bool([]))              # False
print(bool(None))            # False
print(bool({}))              # False

print(bool(1))               # True
print(bool(-1))              # True (non-zero!)
print(bool("hello"))         # True
print(bool([0]))             # True (non-empty, even if contains 0)

# PYTHONIC TRUTHINESS CHECKS:
items = []
if not items:                # instead of: if len(items) == 0:
    print("List is empty!")

user = None
if user:                     # instead of: if user is not None:
    print("User exists")

# ── IDENTITY vs EQUALITY ──────────────────────────────────────────
# == checks VALUE equality
# is checks IDENTITY (same object in memory)

a = [1, 2, 3]
b = [1, 2, 3]
c = a                        # c points to SAME object as a

print(a == b)                # True  — same values
print(a is b)                # False — different objects in memory
print(a is c)                # True  — same object!

# ALWAYS use 'is' for None, True, False:
x = None
print(x == None)             # Works but not recommended
print(x is None)             # CORRECT — Pythonic way
print(x is not None)         # Also common pattern`,
    },

    // ────────────────────────────────────────────────────────
    // SECTION 6: CONTROL FLOW
    // ────────────────────────────────────────────────────────
    {
      id: "control-flow",
      title: "Control Flow — if, elif, else",
      emoji: "🔀",
      content: `Control flow determines which code runs and when. Python uses INDENTATION (4 spaces) to define code blocks — there are no curly braces like in C++/Java.

INDENTATION IS SYNTAX in Python. Getting it wrong causes IndentationError. This is intentional — it forces readable code.`,
      code: `# ── BASIC IF-ELIF-ELSE ───────────────────────────────────────────
marks = 78

if marks >= 90:
    print("Grade: A")
    print("Outstanding!")
elif marks >= 80:
    print("Grade: B")
    print("Great work!")
elif marks >= 70:
    print("Grade: C")           # This runs — 78 >= 70
    print("Good effort!")       # Indented = part of this block
elif marks >= 60:
    print("Grade: D")
else:
    print("Grade: F")
    print("Please retry")

print("This runs regardless")   # Back to no indent = always runs

# RULES:
# - 'if' is required
# - 'elif' (else if) — zero or more, must follow if
# - 'else' — optional, must be last, catches everything else
# Only ONE branch executes — the first True condition wins

# ── NESTED IF ────────────────────────────────────────────────────
age = 20; has_license = True; car_available = False

if age >= 18:
    print("Old enough to drive")
    if has_license:
        if car_available:
            print("Can drive!")
        else:
            print("No car available")   # This runs
    else:
        print("Need a license first")
else:
    print("Too young to drive")

# Deep nesting is a CODE SMELL — flatten when possible
# Better version using and:
if age >= 18 and has_license and car_available:
    print("Can drive!")
elif age >= 18 and has_license:
    print("Has license, needs car")    # This runs
elif age >= 18:
    print("Needs license")
else:
    print("Too young")

# ── TERNARY OPERATOR (Conditional Expression) ─────────────────────
# Python's one-liner if-else
score = 75
result = "Pass" if score >= 50 else "Fail"
print(result)               # Pass

grade = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "F"
print(grade)                # C

# With functions:
absolute = score if score >= 0 else -score

# ── MATCH STATEMENT (Python 3.10+) — Pattern Matching ────────────
# Like switch-case but MORE powerful
command = "quit"

match command:
    case "quit":
        print("Exiting...")          # This runs
    case "help":
        print("Showing help...")
    case "start" | "begin":         # Multiple patterns with |
        print("Starting...")
    case str(s) if len(s) > 10:     # Guard condition
        print(f"Long command: {s}")
    case _:                          # Default (like else)
        print(f"Unknown: {command}")

# Match with tuples/structures:
point = (0, 5)

match point:
    case (0, 0):
        print("Origin")
    case (x, 0):
        print(f"On x-axis at {x}")
    case (0, y):
        print(f"On y-axis at {y}")  # This runs, y=5
    case (x, y):
        print(f"Point at ({x},{y})")

# ── WALRUS OPERATOR := (Python 3.8+) — Assign and Test ───────────
# Assigns a value AND uses it in the condition simultaneously
import re

text = "Python is amazing"
if match := re.search(r"(\\w+) is", text):
    print(f"Found: {match.group()}")    # Found: Python is
    print(f"Word: {match.group(1)}")    # Word: Python

# Without walrus, you'd need two lines:
# match = re.search(r"(\\w+) is", text)
# if match:

# Also useful in while loops:
# while chunk := file.read(8192):
#     process(chunk)`,
    },

    // ────────────────────────────────────────────────────────
    // SECTION 7: LOOPS
    // ────────────────────────────────────────────────────────
    {
      id: "loops",
      title: "Loops — for, while, and Iteration",
      emoji: "🔄",
      content: `Python has two loop types: 'for' (iterate over a sequence) and 'while' (repeat while condition is True).

Python's 'for' loop is actually a FOR-EACH loop. It iterates over ANY iterable — lists, strings, dicts, ranges, files, generators, and more. This is much more powerful than C's for(i=0; i<n; i++).`,
      code: `# ── FOR LOOP — iterating over sequences ──────────────────────────
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)
# apple
# banana
# cherry

# Iterate over a string (character by character):
for char in "Python":
    print(char, end=" ")        # P y t h o n  (end=" " changes newline)
print()                         # Print newline

# ── range() — generate number sequences ──────────────────────────
# range(stop)           → 0, 1, 2, ..., stop-1
# range(start, stop)    → start, start+1, ..., stop-1
# range(start, stop, step)

for i in range(5):
    print(i, end=" ")           # 0 1 2 3 4
print()

for i in range(1, 6):
    print(i, end=" ")           # 1 2 3 4 5
print()

for i in range(0, 20, 5):
    print(i, end=" ")           # 0 5 10 15
print()

for i in range(10, 0, -1):
    print(i, end=" ")           # 10 9 8 7 6 5 4 3 2 1 (countdown!)
print()

# range is LAZY — generates one number at a time, doesn't store all
print(list(range(5)))           # [0, 1, 2, 3, 4]

# ── enumerate() — index AND value together ────────────────────────
languages = ["Python", "JavaScript", "Java", "C++"]

# BAD way (C-style, un-Pythonic):
for i in range(len(languages)):
    print(i, languages[i])

# GOOD way (Pythonic):
for i, lang in enumerate(languages):
    print(f"{i}: {lang}")
# 0: Python
# 1: JavaScript
# 2: Java
# 3: C++

for i, lang in enumerate(languages, start=1):  # Start counting from 1
    print(f"{i}. {lang}")

# ── zip() — iterate multiple lists in parallel ────────────────────
names  = ["Alice", "Bob", "Charlie"]
scores = [95,      88,    72]
grades = ["A",     "B",   "C"]

for name, score, grade in zip(names, scores, grades):
    print(f"{name}: {score} ({grade})")
# Alice: 95 (A)
# Bob: 88 (B)
# Charlie: 72 (C)

# zip stops at the shortest iterable
combined = list(zip(names, scores))    # [('Alice',95), ('Bob',88), ('Charlie',72)]

# Unzip (transpose):
unzipped_names, unzipped_scores = zip(*combined)

# ── LOOP CONTROL — break, continue, pass ─────────────────────────
# break — exit the loop entirely
for i in range(10):
    if i == 5:
        break
    print(i, end=" ")          # 0 1 2 3 4
print()

# continue — skip to next iteration
for i in range(10):
    if i % 2 == 0:
        continue                # Skip even numbers
    print(i, end=" ")          # 1 3 5 7 9
print()

# pass — do nothing (placeholder)
for i in range(5):
    pass                        # Valid empty loop — no IndentationError

# ── FOR-ELSE — Python's unique feature ───────────────────────────
# The 'else' block runs ONLY if the loop completed without 'break'
# This is unique to Python — no other major language has this

target = 7
for i in range(10):
    if i == target:
        print(f"Found {target} at index {i}")
        break
else:
    print(f"{target} not found")   # Runs only if no break occurred

# Common pattern: search for item
def find_prime(numbers):
    for n in numbers:
        for i in range(2, n):
            if n % i == 0:
                break            # n is not prime, inner break
        else:
            print(f"{n} is prime")  # Only runs if inner loop didn't break

find_prime([2, 3, 4, 5, 6, 7])

# ── WHILE LOOP — repeat while condition is True ───────────────────
count = 0
while count < 5:
    print(count, end=" ")       # 0 1 2 3 4
    count += 1                  # MUST update, or infinite loop!
print()

# While with break (do-while pattern):
while True:
    user_input = input("Enter 'quit' to exit: ")
    if user_input == "quit":
        break
    print(f"You entered: {user_input}")

# While-else:
n = 10
while n > 0:
    n -= 3
else:
    print(f"Loop ended normally, n = {n}")  # n = -2

# ── NESTED LOOPS ──────────────────────────────────────────────────
# Multiplication table
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i}×{j}={i*j}", end="  ")
    print()
# 1×1=1  1×2=2  1×3=3
# 2×1=2  2×2=4  2×3=6
# 3×1=3  3×2=6  3×3=9

# Flatten nested list:
matrix = [[1,2,3],[4,5,6],[7,8,9]]
flat = []
for row in matrix:
    for num in row:
        flat.append(num)
print(flat)                 # [1,2,3,4,5,6,7,8,9]

# ── COMPREHENSIONS — Pythonic loop expressions ────────────────────
# Instead of building lists with for loops, use comprehensions

# List comprehension:
squares = [x**2 for x in range(1, 6)]
print(squares)              # [1, 4, 9, 16, 25]

# With condition (filter):
evens = [x for x in range(20) if x % 2 == 0]
print(evens)                # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Transform and filter:
words = ["hello", "world", "python", "is", "cool"]
long_upper = [w.upper() for w in words if len(w) > 4]
print(long_upper)           # ['HELLO', 'WORLD', 'PYTHON']

# Nested comprehension (flattens matrix):
flat = [num for row in matrix for num in row]
print(flat)                 # [1,2,3,4,5,6,7,8,9]

# Dictionary comprehension:
word_lengths = {word: len(word) for word in words}
print(word_lengths)         # {'hello':5, 'world':5, 'python':6, 'is':2, 'cool':4}

# Set comprehension:
unique_lengths = {len(w) for w in words}
print(unique_lengths)       # {2, 4, 5, 6}

# Generator expression (lazy — doesn't store in memory):
total = sum(x**2 for x in range(1000000))  # No list created!
print(total)`,
    },

    // ────────────────────────────────────────────────────────
    // SECTION 8: LISTS
    // ────────────────────────────────────────────────────────
    {
      id: "lists",
      title: "Lists — The Workhorse of Python",
      emoji: "📋",
      content: `Lists are Python's most versatile data structure. They are ORDERED, MUTABLE (changeable), allow DUPLICATES, and can hold ANY types (even mixed).

Think of a list as a dynamic array — it grows and shrinks automatically.

Under the hood, Python lists are implemented as dynamic arrays with automatic resizing. When the array fills up, Python allocates roughly 1.125x more space and copies everything over. This is why append() is O(1) amortized but occasionally O(n).`,
      code: `# ── CREATING LISTS ───────────────────────────────────────────────
empty = []                              # Empty list
empty2 = list()                         # Also empty list
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True, None] # Mixed types — valid in Python
nested = [[1,2], [3,4], [5,6]]         # List of lists
from_range = list(range(1, 11))        # [1,2,3,...,10]
from_string = list("python")           # ['p','y','t','h','o','n']
repeated = [0] * 5                     # [0, 0, 0, 0, 0]
repeated2 = [[]] * 3                   # CAREFUL: all point to SAME list!

# Safe 2D list creation:
matrix = [[0] * 3 for _ in range(3)]  # Correct 3x3 matrix

# ── INDEXING & SLICING ────────────────────────────────────────────
lst = [10, 20, 30, 40, 50]
print(lst[0])               # 10   — first element
print(lst[-1])              # 50   — last element
print(lst[1:3])             # [20, 30]
print(lst[::2])             # [10, 30, 50] — every 2nd
print(lst[::-1])            # [50, 40, 30, 20, 10] — reversed copy

# MODIFY via index:
lst[2] = 300
print(lst)                  # [10, 20, 300, 40, 50]

# MODIFY via slice:
lst[1:3] = [200, 3000]
print(lst)                  # [10, 200, 3000, 40, 50]

lst[1:3] = []               # Delete elements via slice
print(lst)                  # [10, 40, 50]

# ── ADDING ELEMENTS ───────────────────────────────────────────────
fruits = ["apple", "banana"]

fruits.append("cherry")        # Add to END → O(1)
print(fruits)                  # ['apple', 'banana', 'cherry']

fruits.insert(1, "blueberry")  # Insert at index → O(n) (shifts everything)
print(fruits)                  # ['apple', 'blueberry', 'banana', 'cherry']

fruits.extend(["date", "elderberry"])  # Add multiple → O(k)
print(fruits)

fruits += ["fig", "grape"]     # Also extends (NOT creates new list)

more = fruits + ["mango"]      # + creates a NEW list, doesn't modify
print(more)

# ── REMOVING ELEMENTS ─────────────────────────────────────────────
lst = [10, 20, 30, 20, 40, 20]

lst.remove(20)              # Remove FIRST occurrence of value → O(n)
print(lst)                  # [10, 30, 20, 40, 20]

popped = lst.pop()          # Remove & return LAST element → O(1)
print(popped)               # 20
print(lst)                  # [10, 30, 20, 40]

popped = lst.pop(1)         # Remove & return at index → O(n)
print(popped)               # 30
print(lst)                  # [10, 20, 40]

del lst[0]                  # Delete by index → O(n)
print(lst)                  # [20, 40]

del lst[:]                  # Delete ALL elements (keep variable)
lst.clear()                 # Same — clears the list

# ── SEARCHING & CHECKING ──────────────────────────────────────────
numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]

print(3 in numbers)         # True  — O(n) search
print(7 in numbers)         # False
print(numbers.index(5))     # 4     — first index of 5
print(numbers.count(1))     # 2     — how many times 1 appears
print(len(numbers))         # 10
print(max(numbers))         # 9
print(min(numbers))         # 1
print(sum(numbers))         # 39

# ── SORTING ───────────────────────────────────────────────────────
nums = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]

# sort() — in-place, modifies original, returns None
nums.sort()
print(nums)                 # [1, 1, 2, 3, 3, 4, 5, 5, 6, 9]
nums.sort(reverse=True)
print(nums)                 # [9, 6, 5, 5, 4, 3, 3, 2, 1, 1]

# sorted() — returns NEW sorted list, original unchanged
original = [3, 1, 4, 1, 5]
new_sorted = sorted(original)
print(original)             # [3, 1, 4, 1, 5] — unchanged
print(new_sorted)           # [1, 1, 3, 4, 5]

# Sort by custom key:
words = ["banana", "apple", "cherry", "date", "elderberry"]
words.sort(key=len)         # Sort by length
print(words)                # ['date', 'apple', 'banana', 'cherry', 'elderberry']

# Sort by multiple criteria:
students = [("Alice", 90), ("Bob", 85), ("Charlie", 90), ("Dave", 85)]
students.sort(key=lambda x: (-x[1], x[0]))  # Score desc, name asc
print(students)             # [('Alice',90),('Charlie',90),('Bob',85),('Dave',85)]

# reverse() — in-place reversal
lst = [1, 2, 3, 4, 5]
lst.reverse()               # O(n), modifies in-place
print(lst)                  # [5, 4, 3, 2, 1]

# ── COPY vs REFERENCE ─────────────────────────────────────────────
# THIS IS ONE OF THE MOST IMPORTANT CONCEPTS:

original = [1, 2, 3]
alias = original            # Both point to SAME list
alias.append(4)
print(original)             # [1, 2, 3, 4] — MODIFIED!

# SHALLOW COPY — creates new list but shared nested objects
shallow = original.copy()   # or original[:]  or list(original)
shallow.append(5)
print(original)             # [1, 2, 3, 4] — unchanged
print(shallow)              # [1, 2, 3, 4, 5]

# Problem with shallow copy and nested lists:
nested = [[1, 2], [3, 4]]
shallow_copy = nested.copy()
shallow_copy[0].append(99)   # This MODIFIES the inner list!
print(nested)                # [[1, 2, 99], [3, 4]] — still affected!

# DEEP COPY — truly independent
import copy
deep = copy.deepcopy(nested)
deep[0].append(100)
print(nested)                # [[1, 2, 99], [3, 4]] — unchanged

# ── USEFUL LIST OPERATIONS ────────────────────────────────────────
lst = [5, 2, 8, 1, 9, 3]

# Check if list is empty:
if not lst:                  # More Pythonic than: if len(lst) == 0:
    print("empty")

# Unpack first and last:
first = lst[0]
last = lst[-1]
head, *tail = lst            # head=5, tail=[2,8,1,9,3]
*init, last = lst            # init=[5,2,8,1,9], last=3

# Find all indices of a value:
data = [1, 2, 3, 2, 4, 2]
indices = [i for i, x in enumerate(data) if x == 2]
print(indices)              # [1, 3, 5]

# Remove duplicates while preserving order:
seen = set(); unique = []
for x in data:
    if x not in seen:
        seen.add(x); unique.append(x)
print(unique)               # [1, 2, 3, 4]

# Or using dict (Python 3.7+ preserves insertion order):
unique2 = list(dict.fromkeys(data))
print(unique2)              # [1, 2, 3, 4]

# Flatten nested list:
nested = [[1,2,3],[4,5],[6,7,8,9]]
flat = [x for row in nested for x in row]
# Or: import itertools; flat = list(itertools.chain.from_iterable(nested))`,
    },

    // ────────────────────────────────────────────────────────
    // SECTION 9: TUPLES
    // ────────────────────────────────────────────────────────
    {
      id: "tuples",
      title: "Tuples — Immutable Sequences",
      emoji: "🔒",
      content: `Tuples are like lists but IMMUTABLE — once created, they cannot be changed.

WHY USE TUPLES OVER LISTS?
1. Protection: data that should never change (coordinates, RGB colors, database records)
2. Performance: tuples are faster than lists for access and iteration
3. Dictionary keys: tuples can be dict keys, lists cannot (because lists are unhashable)
4. Multiple return values: Python functions use tuples to return multiple values
5. Named tuples: excellent for structured data without full class overhead`,
      code: `# ── CREATING TUPLES ──────────────────────────────────────────────
empty = ()                          # Empty tuple
single = (42,)                      # IMPORTANT: comma makes it a tuple
no_paren = 1, 2, 3                  # Parentheses are optional!
coords = (10.5, 20.3)
rgb = (255, 128, 0)
mixed = (1, "hello", 3.14, True)
from_list = tuple([1, 2, 3, 4, 5])

print(type((42)))                   # <class 'int'>    — no comma = int
print(type((42,)))                  # <class 'tuple'>  — comma = tuple

# ── ACCESSING ─────────────────────────────────────────────────────
point = (10, 20, 30)
print(point[0])             # 10
print(point[-1])            # 30
print(point[0:2])           # (10, 20)  — slicing returns tuple

# CANNOT modify:
# point[0] = 99             # TypeError: 'tuple' object does not support item assignment

# ── UNPACKING — The most common tuple usage ───────────────────────
x, y = (10, 20)             # Unpack into variables
a, b, c = 1, 2, 3          # No parentheses needed
first, *rest = (1, 2, 3, 4, 5)  # first=1, rest=[2,3,4,5]

# Swapping variables (uses tuple under the hood):
a, b = 5, 10
a, b = b, a                 # Swap! Python evaluates right side first
print(a, b)                 # 10 5

# ── NAMED TUPLES — structured data ───────────────────────────────
from collections import namedtuple

# Define structure once:
Student = namedtuple('Student', ['name', 'age', 'gpa'])

# Create instances:
s1 = Student(name="Rahul", age=21, gpa=8.75)
s2 = Student("Priya", 20, 9.1)

print(s1.name)              # Rahul  — access by name
print(s1[0])                # Rahul  — also by index
print(s1.gpa)               # 8.75

print(f"{s1.name}: {s1.gpa}")

# Named tuples are still immutable:
# s1.name = "Kumar"         # AttributeError

# Convert to dict:
print(s1._asdict())         # {'name': 'Rahul', 'age': 21, 'gpa': 8.75}

# ── TUPLES AS DICTIONARY KEYS ─────────────────────────────────────
# Lists cannot be dict keys (unhashable). Tuples can!

grid = {}
grid[(0, 0)] = "Start"
grid[(5, 5)] = "End"
grid[(2, 3)] = "Checkpoint"

print(grid[(0, 0)])         # Start

# ── FUNCTIONS RETURNING MULTIPLE VALUES ───────────────────────────
def min_max_avg(numbers):
    return min(numbers), max(numbers), sum(numbers)/len(numbers)

lo, hi, avg = min_max_avg([3, 1, 4, 1, 5, 9, 2, 6])
print(f"Min: {lo}, Max: {hi}, Avg: {avg:.2f}")

# ── TUPLE METHODS ─────────────────────────────────────────────────
t = (1, 2, 3, 2, 4, 2, 1)
print(t.count(2))           # 3   — count occurrences
print(t.index(4))           # 4   — first index of value

# ── CONVERSION ────────────────────────────────────────────────────
lst = [1, 2, 3]
tup = tuple(lst)
back_to_lst = list(tup)     # Convert to list to modify

# ── WHEN TO USE TUPLE vs LIST ─────────────────────────────────────
# USE TUPLE for:
#   - Coordinates: (lat, lon) = (28.6, 77.2)
#   - RGB colors: (255, 0, 0)
#   - Database records: (id, name, score)
#   - Multiple return values: return x, y
#   - Dict keys: {(0,0): "origin"}

# USE LIST for:
#   - Shopping cart (items added/removed)
#   - Student roster (enrollment changes)
#   - Any sequence that CHANGES over time`,
    },

    // ────────────────────────────────────────────────────────
    // SECTION 10: DICTIONARIES
    // ────────────────────────────────────────────────────────
    {
      id: "dictionaries",
      title: "Dictionaries — Key-Value Storage",
      emoji: "📖",
      content: `Dictionaries store data as KEY: VALUE pairs. They are the most important Python data structure after lists.

UNDER THE HOOD: Python dicts use a HASH TABLE. This gives O(1) average time for lookup, insert, and delete regardless of dictionary size. This is why dicts are so fast.

KEY REQUIREMENTS:
- Keys must be HASHABLE (immutable): strings, numbers, tuples ✅
- Lists, sets, other dicts ❌ — unhashable, cannot be keys
- Values can be ANYTHING — even other dicts (nested dicts)

Python 3.7+ GUARANTEES dict insertion order is preserved.`,
      code: `# ── CREATING DICTIONARIES ────────────────────────────────────────
empty = {}                              # Empty dict (NOT a set!)
empty2 = dict()                         # Also empty dict

student = {
    "name": "Rahul Kumar",
    "age": 21,
    "gpa": 8.75,
    "skills": ["Python", "JavaScript", "SQL"],
    "active": True,
}

# From keyword arguments:
config = dict(host="localhost", port=3000, debug=True)

# From list of key-value pairs:
pairs = [("one", 1), ("two", 2), ("three", 3)]
num_dict = dict(pairs)
print(num_dict)             # {'one': 1, 'two': 2, 'three': 3}

# ── ACCESSING VALUES ──────────────────────────────────────────────
print(student["name"])      # Rahul Kumar — direct access
# print(student["phone"])   # KeyError: 'phone' — dangerous!

# SAFE ACCESS with .get():
print(student.get("phone"))         # None — no error!
print(student.get("phone", "N/A"))  # N/A — custom default
print(student.get("name", "Unknown"))# Rahul Kumar — key exists

# ── MODIFYING DICTIONARIES ────────────────────────────────────────
d = {"a": 1, "b": 2}

d["c"] = 3                  # Add new key
d["a"] = 100                # Update existing key
print(d)                    # {'a': 100, 'b': 2, 'c': 3}

# Update multiple keys:
d.update({"d": 4, "e": 5, "a": 999})   # Also overwrites
d.update(f=6, g=7)                       # keyword args version
print(d)

# ── REMOVING FROM DICTS ───────────────────────────────────────────
d = {"a": 1, "b": 2, "c": 3, "d": 4}

val = d.pop("b")                # Remove by key, return value
print(val)                      # 2
print(d)                        # {'a':1,'c':3,'d':4}

val = d.pop("z", "default")     # Safe pop with default
print(val)                      # default

k, v = d.popitem()              # Remove and return LAST inserted item
print(k, v)                     # d 4  (Python 3.7+ LIFO)

del d["c"]                      # Delete key (KeyError if not found)
d.clear()                       # Remove all items

# ── CHECKING KEYS & VALUES ────────────────────────────────────────
info = {"name": "Alice", "age": 25, "city": "Bangalore"}

print("name" in info)           # True  — checks KEYS by default
print("Alice" in info)          # False — "Alice" is a value, not key
print("Alice" in info.values()) # True

print("phone" not in info)      # True

# ── ITERATION ─────────────────────────────────────────────────────
info = {"name": "Alice", "age": 25, "city": "Bangalore"}

# Keys (default):
for key in info:
    print(key)              # name, age, city

# Values:
for value in info.values():
    print(value)            # Alice, 25, Bangalore

# Key-value pairs (most common):
for key, value in info.items():
    print(f"{key}: {value}")
# name: Alice
# age: 25
# city: Bangalore

# ── DICTIONARY COMPREHENSION ──────────────────────────────────────
# Build dict with a single expression
squares = {x: x**2 for x in range(1, 6)}
print(squares)              # {1:1, 2:4, 3:9, 4:16, 5:25}

# Filter while building:
even_squares = {x: x**2 for x in range(1, 11) if x % 2 == 0}
print(even_squares)         # {2:4, 4:16, 6:36, 8:64, 10:100}

# Invert a dictionary:
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)             # {1:'a', 2:'b', 3:'c'}

# Word frequency count:
text = "the cat sat on the mat the cat"
freq = {}
for word in text.split():
    freq[word] = freq.get(word, 0) + 1
print(freq)                 # {'the':3,'cat':2,'sat':1,'on':1,'mat':1}

# More Pythonic with Counter:
from collections import Counter
freq2 = Counter(text.split())
print(freq2)                # Counter({'the':3,'cat':2,...})
print(freq2.most_common(2)) # [('the',3),('cat',2)]

# ── NESTED DICTIONARIES ───────────────────────────────────────────
company = {
    "name": "TechCorp",
    "employees": {
        "E001": {"name": "Alice", "role": "Engineer", "salary": 100000},
        "E002": {"name": "Bob",   "role": "Manager",  "salary": 120000},
    },
    "address": {
        "city": "Bangalore",
        "country": "India",
    }
}

print(company["employees"]["E001"]["name"])     # Alice
print(company["address"]["city"])               # Bangalore

# Safe nested access:
emp_phone = company.get("employees", {}).get("E001", {}).get("phone", "N/A")
print(emp_phone)            # N/A

# ── SETDEFAULT & defaultdict ──────────────────────────────────────
# setdefault: set value only if key doesn't exist
d = {}
d.setdefault("count", 0)    # Sets count=0 if not exists
d["count"] += 1
print(d)                    # {'count': 1}

# Group items by some property:
students = [("Alice", "A"), ("Bob", "B"), ("Charlie", "A"), ("Dave", "B")]
by_grade = {}
for name, grade in students:
    by_grade.setdefault(grade, []).append(name)
print(by_grade)             # {'A':['Alice','Charlie'],'B':['Bob','Dave']}

# defaultdict — auto-creates default value for missing keys
from collections import defaultdict

word_groups = defaultdict(list)
for name, grade in students:
    word_groups[grade].append(name)
print(dict(word_groups))    # Same result, cleaner code

counter = defaultdict(int)
for word in "hello world hello python".split():
    counter[word] += 1      # No KeyError — defaults to 0
print(dict(counter))`,
    },

    // ────────────────────────────────────────────────────────
    // SECTION 11: SETS
    // ────────────────────────────────────────────────────────
    {
      id: "sets",
      title: "Sets — Unique Collections",
      emoji: "🎯",
      content: `Sets store UNIQUE elements with NO ORDER and NO INDEXING. They are backed by a hash table, so membership testing is O(1) — much faster than list.

Use sets when:
• You need to eliminate duplicates
• You need fast membership testing (in operation)
• You need set operations: union, intersection, difference`,
      code: `# ── CREATING SETS ────────────────────────────────────────────────
empty_set = set()           # NOT {} — that's an empty dict!
numbers = {1, 2, 3, 4, 5}
with_dups = {1, 1, 2, 2, 3}    # Duplicates are removed
print(with_dups)            # {1, 2, 3}

from_list = set([1, 2, 2, 3, 3, 4])
print(from_list)            # {1, 2, 3, 4}

from_string = set("mississippi")
print(from_string)          # {'m','i','s','p'} — unique chars

# ── BASIC OPERATIONS ──────────────────────────────────────────────
s = {1, 2, 3}

s.add(4)                    # Add single element → O(1)
s.update([5, 6, 7])         # Add multiple elements
print(s)                    # {1, 2, 3, 4, 5, 6, 7}

s.remove(3)                 # Remove element (KeyError if not found)
s.discard(99)               # Remove safely (no error if missing)
popped = s.pop()            # Remove and return ARBITRARY element
s.clear()                   # Remove all elements

# ── MEMBERSHIP TESTING — Why sets shine ──────────────────────────
big_list = list(range(1000000))
big_set = set(big_list)

# List: O(n) — scans every element
999999 in big_list           # SLOW

# Set: O(1) — hash lookup
999999 in big_set            # INSTANT

# ── SET OPERATIONS ────────────────────────────────────────────────
a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}

# Union — everything in either set
print(a | b)                # {1,2,3,4,5,6,7,8}
print(a.union(b))           # Same

# Intersection — only elements in BOTH
print(a & b)                # {4, 5}
print(a.intersection(b))    # Same

# Difference — in a but NOT in b
print(a - b)                # {1, 2, 3}
print(a.difference(b))      # Same
print(b - a)                # {6, 7, 8}

# Symmetric difference — in one or other, but NOT both
print(a ^ b)                # {1,2,3,6,7,8}
print(a.symmetric_difference(b))

# Update operations (modify in-place):
a |= b                      # Union update
a &= b                      # Intersection update
a -= b                      # Difference update
a ^= b                      # Symmetric difference update

# ── SUBSET & SUPERSET ────────────────────────────────────────────
small = {1, 2}
large = {1, 2, 3, 4, 5}

print(small.issubset(large))   # True  — all of small is in large
print(small <= large)           # Same with operator
print(small < large)            # True  — proper subset (not equal)
print(large.issuperset(small))  # True
print(large >= small)           # Same
print(small.isdisjoint({6, 7})) # True — no common elements

# ── FROZENSET — Immutable Set ────────────────────────────────────
fs = frozenset([1, 2, 3])
# fs.add(4)                 # AttributeError — can't modify!

# Frozensets can be used as dict keys or inside sets:
d = {frozenset({1,2}): "pair", frozenset({3,4}): "another pair"}

# ── PRACTICAL EXAMPLES ───────────────────────────────────────────
# Remove duplicates from list (order NOT preserved):
data = [1, 3, 2, 3, 1, 4, 5, 4]
unique = list(set(data))
print(unique)               # Order not guaranteed

# Find common items:
likes1 = {"Python", "Music", "Gaming", "Travel"}
likes2 = {"Java", "Music", "Reading", "Travel"}
common = likes1 & likes2
print(common)               # {'Music', 'Travel'}

# Find all unique characters:
unique_chars = set("programming")
print(unique_chars)         # Set of unique chars

# Check if any duplicates exist:
items = [1, 2, 3, 4, 5]
has_duplicates = len(items) != len(set(items))
print(has_duplicates)       # False`,
    },

    // ────────────────────────────────────────────────────────
    // SECTION 12: FUNCTIONS
    // ────────────────────────────────────────────────────────
    {
      id: "functions",
      title: "Functions — Reusable Code Blocks",
      emoji: "⚙️",
      content: `A function is a named, reusable block of code. Functions are FIRST-CLASS OBJECTS in Python — they can be stored in variables, passed as arguments, and returned from other functions.

The DRY principle: Don't Repeat Yourself. Functions let you write logic once and use it many times.

TYPES OF ARGUMENTS:
1. Positional — order matters
2. Keyword — named, any order
3. Default — has a preset value
4. *args — variable number of positional arguments
5. **kwargs — variable number of keyword arguments`,
      code: `# ── BASIC FUNCTION ───────────────────────────────────────────────
def greet(name):
    """Greet a person by name.
    
    This string right after def is a DOCSTRING — Python documentation.
    Access it with: greet.__doc__
    """
    return f"Hello, {name}!"

result = greet("Rahul")
print(result)               # Hello, Rahul!
print(greet.__doc__[:16])   # Greet a person

# ── PARAMETERS & ARGUMENTS ───────────────────────────────────────
# Parameters: variables in function definition
# Arguments: values passed when calling

def describe_person(name, age, city="Unknown"):      # city has default
    print(f"{name}, {age}, from {city}")

describe_person("Alice", 25)                # Positional, city=Unknown
describe_person("Bob", 30, "Bangalore")     # Positional
describe_person("Charlie", 28, city="Mumbai")  # Keyword argument
describe_person(age=22, name="Dave")        # Any order with keywords!

# ── RETURN VALUES ────────────────────────────────────────────────
def calculate(a, b):
    return a + b, a - b, a * b    # Returns tuple of 3 values!

add, sub, mul = calculate(10, 3)
print(add, sub, mul)        # 13 7 30

def nothing():
    pass                    # No return statement → returns None

result = nothing()
print(result)               # None

# Early return:
def find_first_even(numbers):
    for n in numbers:
        if n % 2 == 0:
            return n        # Return immediately when found
    return None             # Explicit None if not found

# ── *args — VARIABLE POSITIONAL ARGUMENTS ────────────────────────
def sum_all(*args):         # args is a TUPLE of all extra positional args
    print(type(args))       # <class 'tuple'>
    return sum(args)

print(sum_all(1, 2, 3))            # 6
print(sum_all(1, 2, 3, 4, 5, 6))  # 21
print(sum_all(10))                 # 10

def mixed(first, second, *rest):
    print(f"First: {first}")
    print(f"Second: {second}")
    print(f"Rest: {rest}")

mixed(1, 2, 3, 4, 5)
# First: 1
# Second: 2
# Rest: (3, 4, 5)

# ── **kwargs — VARIABLE KEYWORD ARGUMENTS ────────────────────────
def create_profile(**kwargs):       # kwargs is a DICT
    print(type(kwargs))             # <class 'dict'>
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

create_profile(name="Alice", age=25, city="Bangalore", role="Engineer")

# Real use case — building flexible APIs:
def make_request(url, method="GET", **options):
    print(f"{method} {url}")
    for k, v in options.items():
        print(f"  {k}: {v}")

make_request("https://api.example.com/users",
             headers={"Authorization": "Bearer token"},
             timeout=30,
             verify_ssl=True)

# ── FULL SIGNATURE ────────────────────────────────────────────────
def full_example(pos1, pos2, /, normal, *, kw_only, **kwargs):
    # pos1, pos2: positional-only (Python 3.8+)
    # normal: positional or keyword
    # kw_only: keyword-only (after *)
    pass

# ── UNPACKING ARGUMENTS ───────────────────────────────────────────
def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]
print(add(*numbers))        # Unpack list as positional args → 6

info = {"a": 10, "b": 20, "c": 30}
print(add(**info))          # Unpack dict as keyword args → 60

# ── LAMBDA FUNCTIONS ──────────────────────────────────────────────
# One-line anonymous functions for simple operations
square = lambda x: x ** 2
print(square(5))            # 25

add = lambda a, b: a + b
print(add(3, 4))            # 7

# Common uses with map, filter, sorted:
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# map — apply function to all elements
squares = list(map(lambda x: x**2, numbers))
print(squares)              # [1,4,9,16,25,36,49,64,81,100]

# filter — keep only elements where function returns True
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)                # [2, 4, 6, 8, 10]

# sorted with key:
words = ["banana", "apple", "cherry", "date"]
sorted_by_len = sorted(words, key=lambda x: len(x))
print(sorted_by_len)        # ['date','apple','banana','cherry']

students = [("Alice", 90), ("Bob", 85), ("Charlie", 95)]
sorted_students = sorted(students, key=lambda s: s[1], reverse=True)
print(sorted_students)      # [('Charlie',95),('Alice',90),('Bob',85)]

# ── SCOPE — LEGB RULE ─────────────────────────────────────────────
# Python looks for variables in this order:
# L — Local (inside current function)
# E — Enclosing (outer function, for closures)
# G — Global (module level)
# B — Built-in (Python built-ins like print, len)

x = "global"                # Global scope

def outer():
    x = "enclosing"         # Enclosing scope
    
    def inner():
        x = "local"         # Local scope
        print(x)            # "local" — finds local first
    
    inner()
    print(x)                # "enclosing"

outer()
print(x)                    # "global"

# global keyword — modify global from inside function:
counter = 0

def increment():
    global counter          # Declare we mean the GLOBAL counter
    counter += 1

increment(); increment()
print(counter)              # 2

# nonlocal keyword — modify enclosing scope:
def make_counter():
    count = 0
    def increment():
        nonlocal count      # Modify enclosing 'count'
        count += 1
        return count
    return increment

counter = make_counter()
print(counter())            # 1
print(counter())            # 2
print(counter())            # 3

# ── HIGHER ORDER FUNCTIONS ───────────────────────────────────────
# Functions that take/return functions

def apply_twice(f, x):      # Takes a function as argument!
    return f(f(x))

def double(x): return x * 2
print(apply_twice(double, 3))  # 12 (3 → 6 → 12)

# Functions returning functions (factories):
def make_multiplier(n):
    def multiplier(x):
        return x * n       # n is captured from enclosing scope
    return multiplier      # Return the inner function

triple = make_multiplier(3)
quadruple = make_multiplier(4)
print(triple(5))            # 15
print(quadruple(5))         # 20`,
    },

    // ────────────────────────────────────────────────────────
    // SECTION 13: CLASSES & OOP
    // ────────────────────────────────────────────────────────
    {
      id: "classes",
      title: "Classes & Object-Oriented Programming",
      emoji: "🏗️",
      content: `Object-Oriented Programming (OOP) organizes code around OBJECTS — entities that have both DATA (attributes) and BEHAVIOR (methods).

THE 4 PILLARS OF OOP:
1. ENCAPSULATION — bundling data and methods, hiding internal details
2. INHERITANCE — creating new classes based on existing ones
3. POLYMORPHISM — same interface, different behavior
4. ABSTRACTION — exposing essential features, hiding complexity

In Python, EVERYTHING is an object. Numbers, strings, functions — all objects.`,
      code: `# ── BASIC CLASS ──────────────────────────────────────────────────
class Student:
    """A class representing a student."""
    
    # CLASS VARIABLE — shared by ALL instances
    school_name = "CSE Academy"
    student_count = 0
    
    # __init__ — constructor, called when creating an object
    def __init__(self, name, age, gpa):
        # INSTANCE VARIABLES — unique to each object
        self.name = name        # self refers to THIS specific object
        self.age = age
        self.gpa = gpa
        self.courses = []       # Each student gets their OWN empty list
        Student.student_count += 1
    
    # INSTANCE METHOD — has self parameter
    def introduce(self):
        return f"Hi, I'm {self.name}, {self.age} years old, GPA: {self.gpa}"
    
    def enroll(self, course):
        self.courses.append(course)
        print(f"{self.name} enrolled in {course}")
    
    def get_grade(self):
        if self.gpa >= 9.0: return "A+"
        elif self.gpa >= 8.0: return "A"
        elif self.gpa >= 7.0: return "B"
        else: return "C"
    
    # CLASS METHOD — operates on class, not instance
    @classmethod
    def get_student_count(cls):
        return f"Total students: {cls.student_count}"
    
    # STATIC METHOD — doesn't need class or instance
    @staticmethod
    def is_valid_gpa(gpa):
        return 0.0 <= gpa <= 10.0
    
    # __repr__ — official string representation (for developers)
    def __repr__(self):
        return f"Student('{self.name}', {self.age}, {self.gpa})"
    
    # __str__ — human-readable string (for users)
    def __str__(self):
        return f"{self.name} (GPA: {self.gpa})"
    
    # __len__ — enables len()
    def __len__(self):
        return len(self.courses)
    
    # __eq__ — enables ==
    def __eq__(self, other):
        if not isinstance(other, Student):
            return False
        return self.name == other.name and self.gpa == other.gpa

# Creating objects (instances):
s1 = Student("Rahul", 21, 8.75)
s2 = Student("Priya", 20, 9.2)

print(s1.introduce())       # Hi, I'm Rahul, 21 years old, GPA: 8.75
print(s1.get_grade())       # A
print(str(s1))              # Rahul (GPA: 8.75)
print(repr(s1))             # Student('Rahul', 21, 8.75)

s1.enroll("Data Structures")
s1.enroll("Algorithms")
print(len(s1))              # 2 — number of courses

print(Student.get_student_count())      # Total students: 2
print(Student.is_valid_gpa(8.5))        # True
print(Student.school_name)              # CSE Academy

# ── INHERITANCE ──────────────────────────────────────────────────
class GraduateStudent(Student):         # GraduateStudent inherits from Student
    """Graduate students have research topics."""
    
    def __init__(self, name, age, gpa, research_topic):
        super().__init__(name, age, gpa)   # Call parent's __init__
        self.research_topic = research_topic
        self.publications = []
    
    # OVERRIDE parent method:
    def introduce(self):
        base = super().introduce()      # Get parent's output
        return f"{base}\nResearching: {self.research_topic}"
    
    def publish(self, paper):
        self.publications.append(paper)
        print(f"Published: {paper}")
    
    def get_grade(self):
        # Graduate grading is stricter
        if self.gpa >= 9.5: return "Distinction"
        elif self.gpa >= 8.5: return "First Class"
        else: return "Pass"

grad = GraduateStudent("Dr. Alice", 26, 9.5, "Machine Learning")
print(grad.introduce())     # Overridden version + base
print(grad.get_grade())     # Distinction
grad.publish("Attention is All You Need: A Survey")
print(isinstance(grad, Student))        # True — IS-A relationship
print(isinstance(grad, GraduateStudent))# True

# ── MULTIPLE INHERITANCE ─────────────────────────────────────────
class Athlete:
    def play_sport(self):
        return "Playing sport"

class StudentAthlete(Student, Athlete):     # Multiple inheritance
    def __init__(self, name, age, gpa, sport):
        Student.__init__(self, name, age, gpa)
        self.sport = sport
    
    def daily_routine(self):
        return f"{self.name}: Study + {self.play_sport()}"

sa = StudentAthlete("Virat", 22, 7.5, "Cricket")
print(sa.daily_routine())   # Virat: Study + Playing sport
print(Student.student_count)# Counts this too

# MRO — Method Resolution Order (which class's method is called):
print(StudentAthlete.__mro__)   # Order Python searches for methods

# ── ENCAPSULATION — Private & Protected ──────────────────────────
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner              # Public — accessible anywhere
        self._bank_name = "PyBank"      # Protected — convention only
        self.__balance = balance        # Private — name mangled
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            return f"Deposited ₹{amount}. New balance: ₹{self.__balance}"
        return "Invalid amount"
    
    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            return f"Withdrawn ₹{amount}. Remaining: ₹{self.__balance}"
        return "Insufficient funds"
    
    @property                       # Getter — accessed like attribute
    def balance(self):
        return self.__balance
    
    @balance.setter                 # Setter — validates before setting
    def balance(self, amount):
        if amount >= 0:
            self.__balance = amount
        else:
            raise ValueError("Balance cannot be negative")

account = BankAccount("Rahul", 10000)
print(account.deposit(5000))            # Deposited...
print(account.withdraw(3000))           # Withdrawn...
print(account.balance)                  # 12000 — via property
account.balance = 15000                 # Via setter
# account.__balance                     # AttributeError — name mangled
print(account._BankAccount__balance)    # 15000 — mangled name (don't use in real code)

# ── PROPERTIES — ELEGANT GETTERS/SETTERS ─────────────────────────
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero!")
        self._celsius = value
    
    @property
    def fahrenheit(self):                # Read-only property (no setter)
        return self._celsius * 9/5 + 32
    
    @property
    def kelvin(self):
        return self._celsius + 273.15

temp = Temperature(100)
print(temp.celsius)         # 100
print(temp.fahrenheit)      # 212.0
print(temp.kelvin)          # 373.15
temp.celsius = 0            # Calls setter
print(temp.fahrenheit)      # 32.0

# ── DATACLASS — automatic __init__, __repr__, __eq__ ─────────────
from dataclasses import dataclass, field

@dataclass
class Point:
    x: float
    y: float
    z: float = 0.0          # Default value
    
    def distance_to_origin(self):
        return (self.x**2 + self.y**2 + self.z**2) ** 0.5

p1 = Point(3.0, 4.0)
p2 = Point(1.0, 2.0, 3.0)
print(p1)                   # Point(x=3.0, y=4.0, z=0.0) — auto __repr__
print(p1 == Point(3.0, 4.0))# True — auto __eq__
print(p1.distance_to_origin()) # 5.0`,
    },

    // ────────────────────────────────────────────────────────
    // SECTION 14: ERROR HANDLING
    // ────────────────────────────────────────────────────────
    {
      id: "error-handling",
      title: "Error Handling — try, except, finally",
      emoji: "🛡️",
      content: `Errors in Python are called EXCEPTIONS. When an error occurs, Python creates an exception object and "raises" it. If not handled, the program crashes with a traceback.

EXCEPTION HIERARCHY (partial):
BaseException
└── Exception
    ├── TypeError
    ├── ValueError
    ├── NameError
    ├── KeyError
    ├── IndexError
    ├── AttributeError
    ├── ImportError
    ├── FileNotFoundError
    ├── ZeroDivisionError
    ├── OverflowError
    └── RuntimeError

PHILOSOPHY: "It's Easier to Ask Forgiveness than Permission" (EAFP)
Python style: Try to do it, catch the error if it fails.
Java/C++ style: Check first (Look Before You Leap - LBYL).`,
      code: `# ── BASIC TRY-EXCEPT ─────────────────────────────────────────────
try:
    x = int(input("Enter a number: "))
    result = 100 / x
    print(f"100 / {x} = {result}")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except ValueError:
    print("Please enter a valid integer!")

# ── MULTIPLE EXCEPTIONS ───────────────────────────────────────────
def safe_divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Error: Division by zero")
        return None
    except TypeError:
        print(f"Error: Cannot divide {type(a)} by {type(b)}")
        return None

print(safe_divide(10, 2))    # 5.0
print(safe_divide(10, 0))    # Error: Division by zero
print(safe_divide("ten", 2)) # Error: cannot divide

# Catch multiple exception types together:
try:
    data = [1, 2, 3]
    value = data[10]         # IndexError
except (IndexError, KeyError) as e:
    print(f"Access error: {e}")

# ── EXCEPTION OBJECT ──────────────────────────────────────────────
try:
    num = int("not_a_number")
except ValueError as e:
    print(f"Exception type: {type(e).__name__}")
    print(f"Exception message: {e}")
    print(f"Args: {e.args}")
# Exception type: ValueError
# Exception message: invalid literal for int() with base 10: 'not_a_number'

# ── ELSE CLAUSE — runs if NO exception occurred ───────────────────
def read_file(filename):
    try:
        with open(filename, 'r') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"File {filename} not found")
        return None
    else:
        # Only runs if NO exception
        print(f"Successfully read {len(content)} characters")
        return content
    finally:
        # ALWAYS runs — cleanup code
        print("File operation attempted")

# ── FINALLY — always executes ────────────────────────────────────
def connect_to_db():
    connection = None
    try:
        # Simulate database connection
        connection = "DB_CONNECTION"
        result = query_data(connection)   # Might raise exception
        return result
    except Exception as e:
        print(f"Database error: {e}")
        return None
    finally:
        if connection:
            # This ALWAYS runs — even if exception or return
            print("Closing database connection")
            # close_connection(connection)

# ── RAISING EXCEPTIONS ────────────────────────────────────────────
def validate_age(age):
    if not isinstance(age, int):
        raise TypeError(f"Age must be an integer, got {type(age).__name__}")
    if age < 0:
        raise ValueError(f"Age cannot be negative: {age}")
    if age > 150:
        raise ValueError(f"Age {age} seems unrealistic")
    return True

try:
    validate_age(-5)
except ValueError as e:
    print(f"Validation failed: {e}")

# Re-raise exception:
def process():
    try:
        risky_operation()
    except ValueError as e:
        print(f"Logging error: {e}")
        raise           # Re-raise the SAME exception

# ── CUSTOM EXCEPTIONS ─────────────────────────────────────────────
class ApplicationError(Exception):
    """Base class for application exceptions."""
    pass

class InsufficientFundsError(ApplicationError):
    """Raised when account balance is too low."""
    
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(
            f"Insufficient funds: Need ₹{amount}, have ₹{balance}"
        )

class InvalidTransactionError(ApplicationError):
    """Raised for invalid transaction parameters."""
    pass

def transfer(balance, amount):
    if amount <= 0:
        raise InvalidTransactionError("Transfer amount must be positive")
    if amount > balance:
        raise InsufficientFundsError(balance, amount)
    return balance - amount

try:
    new_balance = transfer(500, 1000)
except InsufficientFundsError as e:
    print(f"Transfer failed: {e}")
    print(f"Short by: ₹{e.amount - e.balance}")
except InvalidTransactionError as e:
    print(f"Invalid: {e}")

# ── CONTEXT MANAGERS — with statement ────────────────────────────
# 'with' automatically handles setup and teardown

# Files — automatically closed even if exception occurs:
with open("data.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("Python is amazing!\n")
# File is automatically closed here, even if exception occurred

with open("data.txt", "r") as file:
    for line in file:
        print(line.strip())

# CUSTOM CONTEXT MANAGER using contextmanager:
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.time()
    try:
        yield               # Code inside 'with' block runs here
    finally:
        elapsed = time.time() - start
        print(f"Time elapsed: {elapsed:.3f}s")

with timer():
    # This code is timed
    total = sum(range(1000000))
    print(f"Sum: {total}")

# ── EXCEPTION CHAINING ───────────────────────────────────────────
def parse_config(text):
    try:
        return int(text)
    except ValueError as e:
        raise RuntimeError("Config parsing failed") from e  # Chain exceptions

try:
    parse_config("invalid")
except RuntimeError as e:
    print(f"Error: {e}")
    print(f"Caused by: {e.__cause__}")`,
    },

    // ────────────────────────────────────────────────────────
    // SECTION 15: FILE I/O
    // ────────────────────────────────────────────────────────
    {
      id: "file-io",
      title: "File I/O — Reading & Writing Files",
      emoji: "📁",
      content: `File I/O (Input/Output) lets your program read from and write to files on disk. Python makes this straightforward with the open() function and the 'with' statement.

FILE MODES:
'r'  — Read (default). File must exist.
'w'  — Write. Creates file or OVERWRITES if exists.
'a'  — Append. Creates file or adds to end if exists.
'x'  — Exclusive create. Fails if file exists.
'b'  — Binary mode (for images, PDFs, etc.)
'+'  — Read and write (combine: 'r+', 'w+')

TEXT vs BINARY:
Text mode ('r', 'w'): handles encoding, converts \\n automatically
Binary mode ('rb', 'wb'): raw bytes, for images/audio/PDFs`,
      code: `# ── WRITING FILES ────────────────────────────────────────────────
# 'w' mode — creates or overwrites
with open("students.txt", "w") as file:
    file.write("Alice,21,8.75\n")
    file.write("Bob,22,7.5\n")
    file.write("Charlie,20,9.1\n")

# writelines — write a list of lines (no auto newline!)
lines = ["Line 1\n", "Line 2\n", "Line 3\n"]
with open("output.txt", "w") as file:
    file.writelines(lines)

# 'a' mode — append to existing file
with open("students.txt", "a") as file:
    file.write("Dave,23,8.0\n")

# ── READING FILES ─────────────────────────────────────────────────
# read() — entire file as one string
with open("students.txt", "r") as file:
    content = file.read()
    print(content)
    print(f"Total characters: {len(content)}")

# readline() — one line at a time
with open("students.txt", "r") as file:
    first_line = file.readline()    # "Alice,21,8.75\n"
    second_line = file.readline()   # "Bob,22,7.5\n"
    print(first_line.strip())       # Alice,21,8.75
    print(second_line.strip())      # Bob,22,7.5

# readlines() — all lines as list
with open("students.txt", "r") as file:
    lines = file.readlines()        # List of strings with \n
    print(len(lines))               # Number of lines

# Iterate line by line (most memory-efficient for large files):
with open("students.txt", "r") as file:
    for line in file:               # No readlines() needed
        name, age, gpa = line.strip().split(",")
        print(f"{name}: GPA {gpa}")

# ── CSV FILES ─────────────────────────────────────────────────────
import csv

# Write CSV:
students = [
    ["Name", "Age", "GPA"],          # Header row
    ["Alice", 21, 8.75],
    ["Bob", 22, 7.5],
    ["Charlie", 20, 9.1],
]

with open("students.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(students)

# Read CSV:
with open("students.csv", "r") as file:
    reader = csv.DictReader(file)   # Each row as a dict
    for row in reader:
        print(f"{row['Name']}: {row['GPA']}")

# ── JSON FILES ────────────────────────────────────────────────────
import json

# Python dict → JSON file
data = {
    "university": "IIT Bombay",
    "students": [
        {"name": "Alice", "gpa": 8.75, "skills": ["Python", "ML"]},
        {"name": "Bob", "gpa": 7.5, "skills": ["JavaScript", "React"]},
    ],
    "total": 2
}

with open("data.json", "w") as file:
    json.dump(data, file, indent=4)    # indent for pretty formatting

# JSON file → Python dict
with open("data.json", "r") as file:
    loaded = json.load(file)
    print(loaded["university"])        # IIT Bombay
    print(loaded["students"][0]["name"])# Alice

# String versions:
json_string = json.dumps(data, indent=2)    # dict → string
parsed = json.loads(json_string)             # string → dict

# ── FILE PATH OPERATIONS ──────────────────────────────────────────
import os
from pathlib import Path           # Modern, recommended approach

# Using pathlib (Python 3.4+):
path = Path("data") / "students" / "records.csv"
print(path)                        # data/students/records.csv

current = Path.cwd()               # Current working directory
home = Path.home()                 # Home directory

# Check file/directory:
p = Path("students.txt")
print(p.exists())                  # True/False
print(p.is_file())                 # True
print(p.is_dir())                  # False

# File info:
print(p.name)                      # "students.txt"
print(p.stem)                      # "students"
print(p.suffix)                    # ".txt"
print(p.parent)                    # Parent directory

# Create directories:
Path("logs/2025").mkdir(parents=True, exist_ok=True)

# List directory contents:
for item in Path(".").iterdir():
    print(item, "DIR" if item.is_dir() else "FILE")

# Find files by pattern:
for txt_file in Path(".").glob("*.txt"):
    print(txt_file)

# Read/write with Path objects:
content = p.read_text(encoding="utf-8")    # Read entire file
p.write_text("New content", encoding="utf-8")

# ── BINARY FILES ──────────────────────────────────────────────────
# Copy an image (or any binary file):
with open("image.jpg", "rb") as src:
    data = src.read()

with open("image_copy.jpg", "wb") as dst:
    dst.write(data)

# Stream large binary files (don't load all into memory):
with open("large_file.bin", "rb") as src, open("copy.bin", "wb") as dst:
    while chunk := src.read(8192):     # Read 8KB at a time (walrus operator)
        dst.write(chunk)`,
    },

    // ────────────────────────────────────────────────────────
    // SECTION 16: MODULES & PACKAGES
    // ────────────────────────────────────────────────────────
    {
      id: "modules",
      title: "Modules, Packages & pip",
      emoji: "📦",
      content: `A MODULE is a Python file (.py) containing code (functions, classes, variables).
A PACKAGE is a directory of modules with an __init__.py file.

Python has three types of modules:
1. BUILT-IN — part of Python itself: math, os, sys, json, datetime
2. STANDARD LIBRARY — included with Python: collections, itertools, pathlib
3. THIRD-PARTY — installed via pip: numpy, pandas, requests, flask

pip (Package Installer for Python) downloads from PyPI (Python Package Index).`,
      code: `# ── IMPORTING ─────────────────────────────────────────────────────

# Import entire module:
import math
print(math.sqrt(16))        # 4.0 — use module.function

# Import specific names:
from math import sqrt, pi, floor
print(sqrt(25))             # 5.0 — no prefix needed
print(pi)                   # 3.14159...

# Import with alias:
import numpy as np          # Convention for numpy
import pandas as pd         # Convention for pandas
from datetime import datetime as dt

# Import all (AVOID in production code):
from math import *          # Pollutes namespace — hard to track origins

# ── IMPORTANT STANDARD LIBRARY MODULES ───────────────────────────

# os — operating system interface
import os
print(os.getcwd())          # Current working directory
print(os.listdir('.'))      # Files in current directory
os.mkdir("new_folder")      # Create directory
os.rename("old.txt", "new.txt")
os.remove("file.txt")
print(os.path.join("folder", "subfolder", "file.txt"))
print(os.environ.get("HOME"))  # Environment variables

# sys — system parameters
import sys
print(sys.version)          # Python version string
print(sys.argv)             # Command-line arguments
print(sys.path)             # Python module search path
sys.exit(0)                 # Exit with code 0

# datetime — dates and times
from datetime import datetime, date, timedelta

now = datetime.now()
print(now)                  # 2025-01-15 14:30:45.123456
print(now.year)             # 2025
print(now.strftime("%d %B %Y"))         # 15 January 2025
print(datetime.strptime("25/12/2025", "%d/%m/%Y"))

today = date.today()
tomorrow = today + timedelta(days=1)
week_later = today + timedelta(weeks=1)
print((tomorrow - today).days)          # 1

# collections — specialized containers
from collections import Counter, defaultdict, deque, OrderedDict

# Counter — count occurrences
words = "the cat sat on the mat the cat".split()
counts = Counter(words)
print(counts)               # Counter({'the':3,'cat':2,...})
print(counts.most_common(2))# [('the',3),('cat',2)]
counts.update(["the", "dog"])

# deque — double-ended queue (O(1) both ends)
dq = deque([1, 2, 3])
dq.appendleft(0)            # O(1) — unlike list.insert(0,x)
dq.append(4)
dq.popleft()                # O(1) — unlike list.pop(0)
dq.rotate(1)                # Rotate right by 1

# itertools — combinatorics and iteration tools
import itertools

# Product (cartesian product):
for combo in itertools.product([1,2], ['a','b']):
    print(combo)            # (1,'a'), (1,'b'), (2,'a'), (2,'b')

# Permutations:
for p in itertools.permutations([1,2,3], 2):
    print(p)                # All 2-element orderings

# Combinations:
for c in itertools.combinations([1,2,3,4], 2):
    print(c)                # All 2-element subsets

# Chain — flatten iterables:
combined = list(itertools.chain([1,2], [3,4], [5,6]))
print(combined)             # [1,2,3,4,5,6]

# groupby — group consecutive elements:
data = [1,1,2,2,2,3,1,1]
for key, group in itertools.groupby(data):
    print(key, list(group))
# 1 [1, 1]
# 2 [2, 2, 2]
# 3 [3]
# 1 [1, 1]

# functools — higher-order function tools
from functools import reduce, partial, lru_cache

# reduce — fold a sequence:
product = reduce(lambda x, y: x*y, [1,2,3,4,5])
print(product)              # 120

# partial — create function with pre-filled arguments:
def power(base, exp): return base ** exp
square = partial(power, exp=2)
cube = partial(power, exp=3)
print(square(5))            # 25
print(cube(5))              # 125

# lru_cache — memoize expensive functions:
@lru_cache(maxsize=None)
def fibonacci(n):
    if n < 2: return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(100))       # Instant — memoized!
print(fibonacci.cache_info())   # Shows hits/misses

# re — regular expressions
import re

text = "Contact us at support@example.com or sales@company.org"

# Find all email addresses:
emails = re.findall(r'[\\w.-]+@[\\w.-]+\\.[a-z]{2,}', text)
print(emails)               # ['support@example.com', 'sales@company.org']

# Search for pattern:
match = re.search(r'(\\w+)@(\\w+)\\.([\\w.]+)', text)
if match:
    print(match.group())    # support@example.com
    print(match.group(1))   # support

# Replace pattern:
cleaned = re.sub(r'[aeiou]', '*', "Hello World")
print(cleaned)              # H*ll* W*rld

# Split on pattern:
parts = re.split(r'[,;\\s]+', "one,two; three  four")
print(parts)                # ['one', 'two', 'three', 'four']

# ── CREATING YOUR OWN MODULE ──────────────────────────────────────
# File: my_math.py
def add(a, b): return a + b
def subtract(a, b): return a - b
PI = 3.14159

# In another file:
# import my_math
# print(my_math.add(3, 4))    # 7
# print(my_math.PI)           # 3.14159

# from my_math import add, PI
# print(add(3, 4))            # 7 — no prefix

# ── if __name__ == '__main__' ─────────────────────────────────────
# This allows the file to be used as both a module and a script
# Code under this block ONLY runs when file is executed directly,
# NOT when imported as a module

def helper():
    return "helper function"

if __name__ == "__main__":
    # This runs only when you do: python myfile.py
    # NOT when someone does: import myfile
    print("Running as script!")
    print(helper())

# ── VIRTUAL ENVIRONMENTS ──────────────────────────────────────────
# Create isolated Python environment for each project

# Create:
# python -m venv venv

# Activate (Mac/Linux):
# source venv/bin/activate

# Activate (Windows):
# venv\\Scripts\\activate

# Install packages:
# pip install requests numpy pandas

# Save dependencies:
# pip freeze > requirements.txt

# Install from requirements:
# pip install -r requirements.txt

# Deactivate:
# deactivate`,
    },

    // ────────────────────────────────────────────────────────
    // SECTION 17: GENERATORS & ITERATORS
    // ────────────────────────────────────────────────────────
    {
      id: "generators",
      title: "Generators & Iterators",
      emoji: "🔁",
      content: `ITERATORS are objects that produce values one at a time. They implement __iter__() and __next__().

GENERATORS are a simple way to create iterators using 'yield'. The key advantage: they produce values LAZILY — only when asked. This means:
- Constant memory usage regardless of sequence size
- Can represent INFINITE sequences
- Process data without loading everything into memory first`,
      code: `# ── ITERABLES vs ITERATORS ───────────────────────────────────────
# Iterable: has __iter__() — lists, strings, dicts, sets, files
# Iterator: has __next__() — produces values one at a time

lst = [1, 2, 3]
it = iter(lst)              # Get iterator from iterable
print(next(it))             # 1
print(next(it))             # 2
print(next(it))             # 3
# print(next(it))           # StopIteration — exhausted!

# For loops use iterators internally:
# for x in lst:
#     print(x)
# IS EQUIVALENT TO:
it = iter(lst)
while True:
    try:
        x = next(it)
        print(x)
    except StopIteration:
        break

# ── GENERATOR FUNCTIONS — yield ───────────────────────────────────
def count_up(start, stop):
    """Generate numbers from start to stop-1."""
    current = start
    while current < stop:
        yield current       # Pause here, return value, resume next call
        current += 1
        # Function state is PRESERVED between yields!

gen = count_up(1, 5)
print(gen)                  # <generator object count_up at 0x...>
print(next(gen))            # 1
print(next(gen))            # 2
for num in gen:             # Can iterate the rest
    print(num)              # 3, 4

# ── REAL USE CASE: Reading large files ───────────────────────────
def read_large_file(filename, chunk_size=1024):
    """Read file in chunks — never loads entire file into memory."""
    with open(filename, 'rb') as file:
        while True:
            chunk = file.read(chunk_size)
            if not chunk:
                break
            yield chunk

# Process without loading everything:
# for chunk in read_large_file("huge_file.txt"):
#     process(chunk)

# ── INFINITE GENERATORS ──────────────────────────────────────────
def fibonacci():
    """Generate Fibonacci numbers forever."""
    a, b = 0, 1
    while True:         # Infinite loop! But we yield, so it's safe
        yield a
        a, b = b, a + b

fib = fibonacci()
first_10 = [next(fib) for _ in range(10)]
print(first_10)         # [0,1,1,2,3,5,8,13,21,34]

def natural_numbers():
    n = 1
    while True:
        yield n
        n += 1

# ── GENERATOR EXPRESSIONS ────────────────────────────────────────
# Like list comprehensions but with () instead of []
# Lazy — doesn't compute everything upfront

# List comprehension — creates full list immediately
squares_list = [x**2 for x in range(1000000)]   # 8MB memory!

# Generator expression — lazy, O(1) memory
squares_gen = (x**2 for x in range(1000000))    # Tiny memory

# Use with sum, max, min, any, all:
total = sum(x**2 for x in range(1000))          # No intermediate list!
print(total)

# First even number greater than 100:
first = next(x for x in range(200) if x % 2 == 0 and x > 100)
print(first)            # 102

# ── yield FROM ───────────────────────────────────────────────────
def chain(*iterables):
    for it in iterables:
        yield from it       # Yield all items from sub-iterable

result = list(chain([1,2,3], [4,5], [6,7,8]))
print(result)           # [1,2,3,4,5,6,7,8]

def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)    # Recursive with yield from
        else:
            yield item

deep_nested = [1, [2, 3, [4, 5]], [6, [7, [8]]]]
print(list(flatten(deep_nested)))   # [1,2,3,4,5,6,7,8]

# ── CUSTOM ITERATOR CLASS ────────────────────────────────────────
class Range:
    """Custom implementation of range()."""
    
    def __init__(self, start, stop, step=1):
        self.start = start
        self.stop = stop
        self.step = step
        self.current = start
    
    def __iter__(self):
        self.current = self.start   # Reset for each iteration
        return self
    
    def __next__(self):
        if self.current >= self.stop:
            raise StopIteration
        value = self.current
        self.current += self.step
        return value

my_range = Range(1, 10, 2)
for n in my_range:
    print(n, end=" ")       # 1 3 5 7 9
print()
print(list(my_range))       # [1,3,5,7,9] — can reuse!`,
    },

    // ────────────────────────────────────────────────────────
    // SECTION 18: DECORATORS
    // ────────────────────────────────────────────────────────
    {
      id: "decorators",
      title: "Decorators — Extending Functions",
      emoji: "🎁",
      content: `Decorators are functions that WRAP other functions to add behavior without modifying the original code. They use the @ syntax.

Think of a decorator like a gift wrapper: it doesn't change what's inside (the original function), it just adds something around it (extra behavior).

DECORATORS ARE USED FOR:
- Logging and monitoring
- Authentication and authorization  
- Caching/memoization
- Rate limiting
- Input validation
- Timing functions`,
      code: `# ── HOW DECORATORS WORK ──────────────────────────────────────────
# Step 1: Understand that functions are objects
def greet():
    return "Hello!"

# Store function reference:
say_hello = greet
print(say_hello())          # Hello! — calling through reference

# Step 2: Functions can accept functions:
def apply_twice(func):
    return func() + " " + func()

print(apply_twice(greet))   # Hello! Hello!

# Step 3: Functions can return functions:
def make_shouty(func):
    def wrapper():
        result = func()
        return result.upper() + "!!!"
    return wrapper          # Return the wrapper function

shouty_greet = make_shouty(greet)
print(shouty_greet())       # HELLO!!!!

# Step 4: This IS a decorator:
@make_shouty                # Equivalent to: greet = make_shouty(greet)
def greet():
    return "Hello!"

print(greet())              # HELLO!!!!

# ── DECORATOR WITH ARGUMENTS ──────────────────────────────────────
from functools import wraps     # Preserves original function metadata

def logger(func):
    @wraps(func)            # Copy __name__, __doc__ etc. from func
    def wrapper(*args, **kwargs):
        print(f"→ Calling {func.__name__} with args={args} kwargs={kwargs}")
        result = func(*args, **kwargs)
        print(f"← {func.__name__} returned {result}")
        return result
    return wrapper

@logger
def add(a, b):
    """Add two numbers."""
    return a + b

result = add(3, 4)
# → Calling add with args=(3, 4) kwargs={}
# ← add returned 7
print(add.__name__)         # add (not wrapper — thanks to @wraps!)
print(add.__doc__)          # Add two numbers.

# ── DECORATOR FACTORY (decorator that takes arguments) ────────────
def repeat(n):
    """Decorator that runs function n times."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say(message):
    print(message)

say("Hello!")
# Hello!
# Hello!
# Hello!

# ── TIMING DECORATOR ─────────────────────────────────────────────
import time

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(0.1)
    return "done"

result = slow_function()    # slow_function took 0.1001s

# ── CACHING DECORATOR ─────────────────────────────────────────────
def memoize(func):
    cache = {}
    @wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper

@memoize
def fibonacci(n):
    if n < 2: return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(40))        # Instant — without cache would take seconds

# Built-in version (more powerful):
from functools import lru_cache

@lru_cache(maxsize=128)
def expensive_calc(n):
    return sum(range(n))

# ── STACKING DECORATORS ───────────────────────────────────────────
@logger
@timer
def greet(name):
    return f"Hello, {name}!"

# Equivalent to: greet = logger(timer(greet))
# Applied bottom-up, executed top-down

result = greet("World")

# ── CLASS-BASED DECORATORS ────────────────────────────────────────
class RateLimit:
    """Limit function calls per minute."""
    
    def __init__(self, max_calls):
        self.max_calls = max_calls
        self.calls = []
    
    def __call__(self, func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            now = time.time()
            # Remove calls older than 1 minute:
            self.calls = [t for t in self.calls if now - t < 60]
            if len(self.calls) >= self.max_calls:
                raise RuntimeError("Rate limit exceeded!")
            self.calls.append(now)
            return func(*args, **kwargs)
        return wrapper

@RateLimit(max_calls=5)
def api_call(endpoint):
    return f"Response from {endpoint}"`,
    },

    // ────────────────────────────────────────────────────────
    // SECTION 19: ADVANCED TOPICS
    // ────────────────────────────────────────────────────────
    {
      id: "advanced",
      title: "Advanced Python — async, typing, dataclasses",
      emoji: "🚀",
      content: `Advanced Python features that distinguish professional code from beginner code.`,
      code: `# ── TYPE HINTS (Python 3.5+) ──────────────────────────────────────
# Python is dynamically typed, but type hints help:
# - IDEs give better autocomplete
# - Bug detection before runtime
# - Self-documenting code

def greet(name: str) -> str:
    return f"Hello, {name}!"

def add_numbers(a: int, b: int) -> int:
    return a + b

from typing import List, Dict, Tuple, Optional, Union, Any, Callable

def process_students(
    students: List[Dict[str, Any]],
    threshold: float = 7.0
) -> Tuple[List[str], List[str]]:
    passed = [s["name"] for s in students if s["gpa"] >= threshold]
    failed = [s["name"] for s in students if s["gpa"] < threshold]
    return passed, failed

def find_user(user_id: int) -> Optional[str]:
    # Optional means can return str or None
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)

def transform(
    data: List[int],
    func: Callable[[int], int]  # Function type hint
) -> List[int]:
    return [func(x) for x in data]

# Python 3.10+ — new syntax
def modern_hints(
    name: str,
    age: int | None = None,        # Union without Union[]
    scores: list[float] = [],      # Lowercase generics
) -> dict[str, int | float]:
    return {"name": hash(name), "age": age or 0}

# ── ASYNC/AWAIT — Asynchronous Programming ─────────────────────
import asyncio

# Synchronous (blocking) — one at a time
# Asynchronous (non-blocking) — many at once while waiting

async def fetch_data(url: str) -> str:
    """Simulate async HTTP request."""
    print(f"  Fetching {url}...")
    await asyncio.sleep(1)      # await = "pause here, let others run"
    return f"Data from {url}"

async def main():
    # Sequential — takes 3 seconds:
    # r1 = await fetch_data("url1")
    # r2 = await fetch_data("url2")
    # r3 = await fetch_data("url3")

    # Concurrent — takes ~1 second:
    results = await asyncio.gather(
        fetch_data("https://api.example.com/users"),
        fetch_data("https://api.example.com/posts"),
        fetch_data("https://api.example.com/comments"),
    )
    print(results)

asyncio.run(main())             # Run async main

# ── CONTEXT MANAGERS — __enter__ & __exit__ ──────────────────────
class DatabaseConnection:
    def __init__(self, host):
        self.host = host
        self.connection = None
    
    def __enter__(self):
        print(f"Connecting to {self.host}...")
        self.connection = f"Connection to {self.host}"
        return self.connection
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing connection...")
        self.connection = None
        if exc_type:
            print(f"Error occurred: {exc_val}")
        return False  # Don't suppress exceptions

with DatabaseConnection("localhost:5432") as conn:
    print(f"Using {conn}")
    # query_data(conn)

# ── SLOTS — Memory optimization ───────────────────────────────────
class Point:                    # Regular class
    def __init__(self, x, y):
        self.x = x
        self.y = y

class PointSlots:               # With __slots__
    __slots__ = ['x', 'y']     # Fixed set of attributes
    def __init__(self, x, y):
        self.x = x
        self.y = y

# __slots__ uses ~30% less memory and is faster for attribute access
# Tradeoff: can't add arbitrary attributes

# ── ABSTRACT BASE CLASSES ─────────────────────────────────────────
from abc import ABC, abstractmethod

class Shape(ABC):               # Abstract — can't instantiate
    @abstractmethod
    def area(self) -> float:    # Must implement in subclass
        pass
    
    @abstractmethod
    def perimeter(self) -> float:
        pass
    
    def describe(self):         # Concrete method — inherits normally
        return f"{type(self).__name__}: area={self.area():.2f}"

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self) -> float:
        return 3.14159 * self.radius ** 2
    
    def perimeter(self) -> float:
        return 2 * 3.14159 * self.radius

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self) -> float:
        return self.width * self.height
    
    def perimeter(self) -> float:
        return 2 * (self.width + self.height)

# Shape()         # TypeError — can't instantiate abstract class
c = Circle(5)
r = Rectangle(4, 6)
print(c.describe())         # Circle: area=78.54
print(r.describe())         # Rectangle: area=24.00

shapes: list[Shape] = [c, r]
for shape in shapes:
    print(shape.area())     # Polymorphism — right method called

# ── DUNDER METHODS (Magic Methods) ────────────────────────────────
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __add__(self, other):       # v1 + v2
        return Vector(self.x + other.x, self.y + other.y)
    
    def __sub__(self, other):       # v1 - v2
        return Vector(self.x - other.x, self.y - other.y)
    
    def __mul__(self, scalar):      # v * 3
        return Vector(self.x * scalar, self.y * scalar)
    
    def __rmul__(self, scalar):     # 3 * v
        return self.__mul__(scalar)
    
    def __abs__(self):              # abs(v) — magnitude
        return (self.x**2 + self.y**2) ** 0.5
    
    def __eq__(self, other):        # v1 == v2
        return self.x == other.x and self.y == other.y
    
    def __len__(self):              # len(v) — dimension
        return 2
    
    def __getitem__(self, index):   # v[0], v[1]
        return (self.x, self.y)[index]
    
    def __iter__(self):             # for coord in v:
        yield self.x
        yield self.y
    
    def __bool__(self):             # if v:
        return self.x != 0 or self.y != 0

v1 = Vector(2, 3)
v2 = Vector(1, 4)

print(v1 + v2)              # Vector(3, 7)
print(v1 * 3)               # Vector(6, 9)
print(3 * v1)               # Vector(6, 9) — uses __rmul__
print(abs(v1))              # 3.605...
print(v1[0])                # 2
print(list(v1))             # [2, 3]
for coord in v1:
    print(coord)            # 2, 3

# ── WALRUS OPERATOR IN LOOPS ──────────────────────────────────────
import re

data = ["Phone: 9876543210", "Email: test@test.com", "Name: Alice", "Phone: 1234567890"]

# Find all phone numbers:
phones = [
    match.group(1)
    for line in data
    if (match := re.search(r'Phone: (\\d+)', line))
]
print(phones)               # ['9876543210', '1234567890']`,
    },

    // ────────────────────────────────────────────────────────
    // SECTION 20: BEST PRACTICES
    // ────────────────────────────────────────────────────────
    {
      id: "best-practices",
      title: "Pythonic Code & Best Practices",
      emoji: "✨",
      content: `Writing code that works is step 1. Writing GOOD Python code means following conventions that make code readable, maintainable, and efficient. This is called writing "Pythonic" code.`,
      code: `# ── NAMING CONVENTIONS ───────────────────────────────────────────

# ❌ Non-Pythonic (C-style)
def CalcAvg(numList):               # PascalCase for functions
    s = 0
    for i in range(0, len(numList)):
        s = s + numList[i]
    return s / len(numList)

# ✅ Pythonic
def calculate_average(numbers):     # snake_case
    """Calculate arithmetic mean of numbers.
    
    Args:
        numbers: list of numeric values
    Returns:
        float: arithmetic mean
    Raises:
        ValueError: if numbers is empty
    """
    if not numbers:
        raise ValueError("Cannot average empty sequence")
    return sum(numbers) / len(numbers)

# ── COMMON PYTHONIC PATTERNS ──────────────────────────────────────

# Unpacking in loops:
pairs = [("Alice", 90), ("Bob", 85), ("Charlie", 78)]

# ❌ Non-Pythonic:
for pair in pairs:
    print(pair[0], pair[1])

# ✅ Pythonic:
for name, score in pairs:
    print(name, score)

# Enumerate instead of range + index:
fruits = ["apple", "banana", "cherry"]

# ❌
for i in range(len(fruits)):
    print(i, fruits[i])

# ✅
for i, fruit in enumerate(fruits, start=1):
    print(i, fruit)

# Comprehensions over map/filter:

# ❌ (acceptable but verbose)
squares = list(map(lambda x: x**2, filter(lambda x: x%2==0, range(10))))

# ✅ (preferred)
squares = [x**2 for x in range(10) if x % 2 == 0]

# String formatting with f-strings:
name = "Python"; version = 3.12

# ❌ Old ways:
msg1 = "Hello " + name + " " + str(version)
msg2 = "Hello %s %.1f" % (name, version)
msg3 = "Hello {} {}".format(name, version)

# ✅ f-string:
msg4 = f"Hello {name} {version}"

# Default mutable argument trap:

# ❌ DANGEROUS — mutable default shared across calls!
def append_item(item, lst=[]):
    lst.append(item)
    return lst

print(append_item("a"))     # ['a']
print(append_item("b"))     # ['a', 'b'] — WRONG! lst is shared!

# ✅ Use None as default, create new list in body:
def append_item(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst

print(append_item("a"))     # ['a']
print(append_item("b"))     # ['b'] — Correct!

# Returning early vs deep nesting:

# ❌ Deeply nested:
def process(data):
    if data is not None:
        if len(data) > 0:
            if isinstance(data[0], int):
                return sum(data)
            else:
                return "Not integers"
        else:
            return "Empty"
    else:
        return "None input"

# ✅ Early return (guard clauses):
def process(data):
    if data is None: return "None input"
    if len(data) == 0: return "Empty"
    if not isinstance(data[0], int): return "Not integers"
    return sum(data)

# Context managers for resources:

# ❌ Manual cleanup:
file = open("data.txt")
try:
    content = file.read()
finally:
    file.close()

# ✅ Context manager:
with open("data.txt") as file:
    content = file.read()

# ── WHAT NOT TO DO ────────────────────────────────────────────────

# 1. Don't check type with ==
if type(x) == int:          # Works but fragile
    pass
if isinstance(x, int):      # Better — handles inheritance

# 2. Don't use bare except
try:
    risky()
except:                     # Catches EVERYTHING including SystemExit!
    pass

try:
    risky()
except Exception as e:      # Catch specific exceptions
    handle(e)

# 3. Don't build strings with + in loops
result = ""
for name in names:
    result += name + ", "   # O(n²)

result = ", ".join(names)   # O(n)

# 4. Don't use global variables
global_state = []           # Hard to test and debug

def add_item(items, item):  # Pass as parameter instead
    return items + [item]

# 5. Don't repeat yourself (DRY)
# If you copy-paste code, extract it into a function

# ── PEP 8 — THE STYLE GUIDE ──────────────────────────────────────
# Indentation: 4 spaces (NOT tabs)
# Line length: 79 characters (PEP 8) or 88 (Black formatter)
# Blank lines: 2 between top-level functions/classes, 1 between methods
# Imports: stdlib first, then third-party, then local. One per line.
# Spaces around operators: x = 1 + 2 (NOT x=1+2)
# No spaces inside brackets: f(a, b) (NOT f( a, b ))

import os                   # stdlib
import sys

import requests             # third-party
import numpy as np

from mypackage import helper  # local

# Use tools to enforce style:
# black file.py             — auto-format
# flake8 file.py            — check style
# mypy file.py              — check types
# pylint file.py            — full analysis`,
    },
  ],

  // ──────────────────────────────────────────────────────────────
  // QUIZ QUESTIONS
  // ──────────────────────────────────────────────────────────────
  quiz: [
    {
      q: "What is the output of: print(type(42))?",
      options: ["<class 'number'>", "<class 'integer'>", "<class 'int'>", "int"],
      answer: 2,
      explanation: "type() returns the class of an object. In Python, integers are of class 'int', shown as <class 'int'>.",
    },
    {
      q: "What does 5 // 2 evaluate to?",
      options: ["2.5", "3", "2", "2.0"],
      answer: 2,
      explanation: "// is floor division — divides and rounds DOWN to nearest integer. 5/2 = 2.5, floor = 2. Returns an int when both operands are ints.",
    },
    {
      q: "Which is the correct way to check if x is None?",
      options: ["if x == None:", "if x = None:", "if x is None:", "if x.isNone():"],
      answer: 2,
      explanation: "Always use 'is' for None comparison. None is a singleton — there's only one None object. 'is' checks identity (same object), '==' checks equality. PEP 8 recommends 'is None'.",
    },
    {
      q: "What does 'hello'[::-1] return?",
      options: ["'hello'", "'olleh'", "['h','e','l','l','o']", "Error"],
      answer: 1,
      explanation: "Slicing with step -1 reverses the sequence. s[::-1] means: no start, no stop, step -1 (go backwards). 'hello' reversed = 'olleh'.",
    },
    {
      q: "What is the difference between list.sort() and sorted()?",
      options: [
        "No difference",
        "sort() returns new list; sorted() modifies in place",
        "sort() modifies in place returns None; sorted() returns new list",
        "sorted() works on lists only; sort() works on any iterable",
      ],
      answer: 2,
      explanation: "list.sort() is an in-place method — modifies the list and returns None. sorted() is a built-in function that works on ANY iterable and returns a NEW sorted list, leaving original unchanged.",
    },
    {
      q: "What does *args do in a function definition?",
      options: [
        "Multiplies arguments",
        "Accepts variable number of keyword arguments as dict",
        "Accepts variable number of positional arguments as tuple",
        "Makes all arguments optional",
      ],
      answer: 2,
      explanation: "*args collects all extra positional arguments into a TUPLE. You can pass any number of positional arguments. **kwargs does the same for keyword arguments, collected into a DICT.",
    },
    {
      q: "What is the output of: [x**2 for x in range(5) if x % 2 != 0]?",
      options: ["[0,1,4,9,16]", "[1,9]", "[1,4,9]", "[0,4,16]"],
      answer: 1,
      explanation: "range(5) = [0,1,2,3,4]. Filter: keep only odd numbers (x%2!=0) → [1,3]. Apply x**2 → [1,9]. The condition comes AFTER the for clause but acts as a filter.",
    },
    {
      q: "What does 'yield' do in a function?",
      options: [
        "Same as return but allows multiple returns",
        "Turns the function into a generator that produces values lazily",
        "Yields control to another thread",
        "Is an alias for return",
      ],
      answer: 1,
      explanation: "'yield' turns a function into a generator. It pauses execution, returns the value, and resumes from that point on the next call to next(). Generators are memory-efficient — they produce values lazily, one at a time.",
    },
    {
      q: "What is the LEGB rule?",
      options: [
        "A Python sorting algorithm",
        "The order Python searches for variable names: Local, Enclosing, Global, Built-in",
        "Lambda Expression Generator Builder",
        "A list encoding method",
      ],
      answer: 1,
      explanation: "LEGB is Python's variable lookup order: Local (current function) → Enclosing (outer functions) → Global (module level) → Built-in (Python built-ins like print, len). Python searches in this order and uses the first match found.",
    },
    {
      q: "What is the key difference between a shallow and deep copy?",
      options: [
        "No practical difference",
        "Shallow copy is faster; deep copy is slower but identical result",
        "Shallow copy creates new container but shares nested objects; deep copy is fully independent",
        "Deep copy only works on dictionaries",
      ],
      answer: 2,
      explanation: "Shallow copy (list.copy(), list[:], copy.copy()) creates a new top-level container but nested objects are SHARED. Modifying nested objects affects both. Deep copy (copy.deepcopy()) creates completely independent copies at all levels.",
    },
  ],

  // ──────────────────────────────────────────────────────────────
  // RESOURCES
  // ──────────────────────────────────────────────────────────────
  resources: [
    { name: "Official Python Docs",    url: "https://docs.python.org/3/",                      type: "docs",    note: "Always the most accurate reference" },
    { name: "Python Tutorial (docs)",  url: "https://docs.python.org/3/tutorial/",              type: "read",    note: "Official beginner tutorial" },
    { name: "Real Python",             url: "https://realpython.com/",                          type: "read",    note: "High-quality Python tutorials and articles" },
    { name: "Python for Everybody",    url: "https://www.py4e.com/",                            type: "course",  note: "Free course by Dr. Chuck, perfect for beginners" },
    { name: "CS50P",                   url: "https://cs50.harvard.edu/python/",                 type: "course",  note: "Harvard's free Python course — excellent" },
    { name: "Automate the Boring Stuff",url:"https://automatetheboringstuff.com/",              type: "book",    note: "Free online book — practical Python" },
    { name: "Python Cookbook",         url: "https://www.oreilly.com/library/view/python-cookbook/",type:"book", note: "Advanced recipes and patterns" },
    { name: "PEP 8 Style Guide",       url: "https://pep8.org/",                               type: "guide",   note: "The definitive Python style guide" },
    { name: "PyPI",                    url: "https://pypi.org/",                               type: "tool",    note: "Python Package Index — 400K+ packages" },
    { name: "Colab Notebooks",         url: "https://colab.research.google.com/",              type: "tool",    note: "Free online Python notebooks — no setup needed" },
  ],
};

export default pythonConcept;
