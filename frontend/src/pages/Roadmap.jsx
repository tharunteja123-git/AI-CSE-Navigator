
import { useState, useMemo, useRef } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Link } from "react-router-dom";
import {
  FiCheckCircle, FiCircle, FiChevronDown, FiChevronUp,
  FiExternalLink, FiYoutube, FiBook, FiCode, FiAward,
  FiZap, FiTarget, FiTrendingUp, FiStar, FiClock,
  FiUsers, FiBookOpen, FiGlobe, FiLayers, FiCpu,
  FiArrowRight, FiLock, FiUnlock, FiGift,
} from "react-icons/fi";

// ─────────────────────────────────────────────────────────────────
// PYTHON ROADMAP DATA — 5 Levels, 1000+ lines of real content
// ─────────────────────────────────────────────────────────────────

const ROADMAP = [
  // ─── LEVEL 1: ABSOLUTE BEGINNER ────────────────────────────────
  {
    level: 1,
    label: "Absolute Beginner",
    emoji: "🌱",
    tagline: "Zero to first working program",
    duration: "3–4 weeks",
    color: "emerald",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
    bar: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    sections: [
      {
        id: "l1-setup",
        title: "Environment Setup",
        emoji: "⚙️",
        why: "The right setup saves hundreds of hours of frustration.",
        topics: [
          {
            title: "Install Python 3.12+",
            type: "task",
            detail: "Download from python.org. Choose the latest Python 3.12.x. Check 'Add to PATH' during install on Windows.",
            code: `# Verify your installation
python --version       # Should print Python 3.12.x
python3 --version      # macOS / Linux alternative

# Launch the interactive REPL
python
>>> print("Hello!")
Hello!
>>> 2 + 2
4
>>> exit()`,
            resources: [
              { label: "Python Official Download", url: "https://python.org/downloads", type: "official" },
              { label: "Installation Guide (Real Python)", url: "https://realpython.com/installing-python/", type: "article" },
            ],
          },
          {
            title: "Set Up VS Code",
            type: "task",
            detail: "VS Code is the best editor for Python. Install the Python extension by Microsoft. This gives you autocomplete, debugging, and linting.",
            code: `# Extensions to install in VS Code:
# 1. Python (Microsoft) — main extension
# 2. Pylance — better autocomplete
# 3. Black Formatter — auto-format your code
# 4. Python Indent — smart indentation

# First file: hello.py
print("Hello, Python!")
print("I am", 3 + 1, "weeks from writing real programs")

# Run it: press Ctrl+F5 or open terminal and type:
# python hello.py`,
            resources: [
              { label: "VS Code Python Setup", url: "https://code.visualstudio.com/docs/python/python-tutorial", type: "official" },
              { label: "VS Code on YouTube", url: "https://youtube.com/watch?v=cUAK4x_7thA", type: "video" },
            ],
          },
          {
            title: "Understand How Python Runs",
            type: "concept",
            detail: "Python is an INTERPRETED language. You write .py files → Python reads and runs them line by line → No separate compile step needed.",
            code: `# Three ways to run Python:

# 1. Interactive REPL — for quick experiments
python                 # starts REPL
>>> 1 + 1
2

# 2. Script file — for real code
# Save as script.py, then run:
python script.py

# 3. Jupyter Notebook — for data science
pip install jupyter
jupyter notebook       # Opens in browser`,
            resources: [
              { label: "Python for Beginners (Microsoft)", url: "https://learn.microsoft.com/en-us/training/paths/beginner-python/", type: "course" },
            ],
          },
        ],
      },
      {
        id: "l1-basics",
        title: "Python Fundamentals",
        emoji: "📦",
        why: "These 6 concepts are the DNA of every Python program ever written.",
        topics: [
          {
            title: "Variables",
            type: "concept",
            detail: "A variable is a named reference to a value stored in memory. Python is dynamically typed — you never write 'int x = 5' like in Java. Python figures out the type automatically. This is the most fundamental concept in all of programming.",
            subsections: [
              {
                heading: "What is a Variable?",
                body: `A variable is one of the most fundamental concepts in programming.
Every program, from a simple calculator to an Artificial Intelligence application, relies on variables to store and manipulate information.
A variable is a named reference to a value (object) stored in memory.
Instead of remembering the memory address where a piece of data is stored, programmers give it a meaningful name.
Think of a variable as a label attached to a box.
The box contains some data.
The label helps you identify the contents without knowing where the box is physically located.
Example:
age = 21
Here:
age → Variable name
21 → Value
= → Assignment operator.
When Python executes this statement, it creates an integer object with the value 21 and makes the variable "age" refer to that object.
# Simple Definition
A variable is a name that refers to a value stored in memory.
Instead of writing values repeatedly throughout a program, we store them in variables and use those names whenever needed.
---
# Technical Definition
In Python, variables are references to objects.
Unlike many programming languages, variables themselves do not directly store values.
Instead,
Variable
↓
Reference
↓
Object in Memory
Python automatically manages this reference system.
---`,
              },
              {
                heading: "Why Variables Matter",
                body: `Without variables, changing one value means editing every line. With a variable, you change it once and every usage updates automatically. Variables follow the DRY principle: Don't Repeat Yourself. They make programs easier to read, modify, maintain, and debug.
Imagine writing a program without variables.
Example:
print("Rahul")
print("Rahul")
print("Rahul")
print("Rahul")
Now suppose the person's name changes to "Arjun".
You would need to replace every occurrence manually.
Instead,
name = "Rahul"
print(name)
print(name)
print(name)
Now changing
name = "Arjun"
updates every place automatically.
Variables make programs
• Easier to read
• Easier to modify
• Easier to maintain
• Easier to debug
---`,
              },
              {
                heading: "Real World Analogies",
                body: `Imagine a school locker.
The locker has
Locker Number → Variable
Books inside → Value
When someone says
Locker 25
you immediately know which locker they mean.
You don't care where the locker was manufactured.
You only use its label.
Variables work exactly the same way.
---
# Another Analogy
Suppose your phone stores your friend's phone number.
Instead of remembering
+91XXXXXXXXXX
you save
Rahul
Now when you want to call,
you simply tap
Rahul
Variables are exactly like contact names.
---`,
              },
              {
                heading: "Variable Characteristics",
                body: "Every Python variable has: (1) A name, (2) A value, (3) A data type, (4) A memory location managed by Python, (5) A lifetime — how long it exists, (6) A scope — where it can be accessed.",
              },
              {
                heading: "Assignment vs Equality",
                body: "= is the assignment operator. It stores a value. == is the comparison operator. It checks if two values are equal. x = 10 means store 10 in x. x == 10 means is x equal to 10?",
              },
              {
                heading: "Dynamic Typing",
                body: "Python is dynamically typed — the same variable can hold different types at different times. x = 10 then x = 'Python' then x = 3.14 is perfectly valid. Java/C++ would reject this. However, changing types unnecessarily makes code confusing.",
              },
              {
                heading: "Variables Store References, Not Values",
                body: "This is Python's most important internal concept. x = 100 followed by y = x does NOT copy the value. Both x and y point to the same integer object in memory. Use id() to check: print(id(x)) and print(id(y)) will print the same number. For mutable objects like lists, this means list2 = list1 followed by list2.append(4) also changes list1 — because both point to the same object.",
              },
              {
                heading: "LEGB Rule — Variable Scope",
                body: `After learning how to create variables, the next important concept is **scope**.
Scope determines **where a variable can be accessed** inside a program.
Think of scope as the visibility of a variable.
If a variable is outside its scope, Python cannot use it and raises a **NameError**.
---
# Why Scope Matters
Imagine a company.
• The CEO can access company-wide information.
• A manager can access only department information.
• An employee can access only personal information.
Variables work in a similar way.
Some variables are available everywhere.
Some exist only inside a function.
Some belong only to a loop or object.
---
# Types of Variable Scope
Python mainly has four scopes.
1. Local Scope
2. Enclosing Scope
3. Global Scope
4. Built-in Scope
Python searches variables using the **LEGB Rule**.
L → Local
E → Enclosing
G → Global
B → Built-in
Python always searches in this order.
# 1. Local Scope
A local variable is created inside a function.
It exists only while the function is running.
Example
def greet():
    message = "Hello"
    print(message)
greet()
Output
Hello
Outside the function
print(message)
Error
NameError: name 'message' is not defined
Why?
Because the variable only exists inside greet().
---
# Local Variables are Temporary
Example
def square(x):
    result = x * x
    return result
print(square(5))
Output
25
After the function finishes,
result disappears from memory.
---
# 2. Global Scope
Variables created outside functions are global variables.
They can be accessed almost anywhere.
Example
language = "Python"
def show():
    print(language)
show()
print(language)
Output
Python
Python
---
# Changing Global Variables
Reading a global variable is easy.
Changing it is different.
>Wrong
count = 10
def update():
    count = count + 1
This gives an error.
>Correct
count = 10
def update():
    global count
    count += 1
update()
print(count)
Output
11
The global keyword tells Python to modify the original variable.
---
# When to Use Global
Use global variables only when necessary.
Too many global variables make programs difficult to maintain.
Professional programmers usually avoid them.
---
# 3. Enclosing Scope
This occurs with nested functions.
Example
def outer():
    message = "Python"
    def inner():
        print(message)
    inner()
outer()
Output
Python
The inner function can access variables from the outer function.
---
# Modifying Enclosing Variables
Use the nonlocal keyword.
Example
def outer():
    count = 0
    def inner():
        nonlocal count
        count += 1
        print(count)
    inner()
    inner()
outer()

Output
1
2
nonlocal modifies variables from the enclosing function.
---
# 4. Built-in Scope
Python already provides many predefined names.
Examples
print()
len()
max()
min()
sum()
type()
input()
These are available everywhere.
Example
numbers = [5, 2, 8]
print(max(numbers))
Output
8
Python found max() in the built-in scope.
---
# LEGB Rule
Whenever Python sees a variable,
it searches in this order.
1. Local
2. Enclosing
3. Global
4. Built-in
Example
x = "Global"
def outer():
    x = "Outer"
    def inner():
        x = "Inner"
        print(x)
    inner()
outer()
Output
Inner
Python always chooses the nearest scope first.
---`,
              },
              {
                heading: "global and nonlocal Keywords",
                body: "To modify a global variable inside a function, declare: global count. Without this, Python creates a new local variable instead. For nested functions, use nonlocal to modify the enclosing function's variable. Without nonlocal, the inner function cannot modify the outer one's variable.",
              },
              {
                heading: "Constants in Python",
                body: "Python has no true constant keyword unlike Java/C++. By convention, constants are written in UPPERCASE: PI = 3.14159, MAX_USERS = 100, DATABASE_URL = 'localhost'. Python technically allows changing them, but professional programmers never do.",
              },

              {
heading: "Literals in Python",
body: `A Literal is a fixed value written directly in the source code. Unlike variables, which can change during program execution, literals represent constant values that Python reads exactly as they are written. Whenever you write a number, a string, True, False, or None directly in your code, you are using a literal.
Think of a literal as the actual data, while a variable is the name used to store that data.
Example:
age = 21
Here:
age → Variable
21 → Integer Literal
Python creates an integer object with the value 21 and stores it in the variable age.
----------------------------------------
What are Literals?
----------------------------------------
A Literal is a fixed value written directly in a Python program.
Examples:
10
3.14
"Python"
True
None
These values are called literals because they are written literally in the code.
----------------------------------------
Why Do We Need Literals?
----------------------------------------
Literals provide the actual values that programs work with.
Without literals, variables would have nothing to store.
Example:
name = "Rahul"
marks = 95
is_pass = True
Here:
"Rahul", 95, and True are literals.
----------------------------------------
Types of Literals in Python
----------------------------------------
Python supports several types of literals:
• Numeric Literals
• String Literals
• Boolean Literals
• Special Literal (None)
• Collection Literals
----------------------------------------
1. Numeric Literals
----------------------------------------
Numeric literals represent numbers.
Integer Literals:
10
-25
0
999
Float Literals:
3.14
0.5
-12.75
Complex Literals:
2 + 3j
5j
Example:
a = 10
b = 3.14
c = 2 + 3j
----------------------------------------
2. String Literals
----------------------------------------
String literals represent text enclosed in quotes.
Single Quotes:
'Python'
Double Quotes:
"Python"
Triple Quotes:
"""This is
a multi-line
string"""
Example:
language = "Python"
message = 'Hello World'
paragraph = """Python is easy.
It is powerful.
It is widely used."""
----------------------------------------
3. Boolean Literals
----------------------------------------
Python has only two Boolean literals:
True
False
Example:
is_student = True
is_admin = False
These values are mainly used in conditions and logical operations.
----------------------------------------
4. None Literal
----------------------------------------
None represents the absence of a value.
Example:
data = None
This is commonly used when a variable has no meaningful value yet.
----------------------------------------
5. Collection Literals
----------------------------------------
List Literal:
numbers = [1, 2, 3]
Tuple Literal:
point = (10, 20)
Set Literal:
colors = {"Red", "Green", "Blue"}
Dictionary Literal:
student = {
    "name": "Rahul",
    "age": 21
}
----------------------------------------
String Literal Examples
----------------------------------------
Single Line:
name = "Rahul"
Multi-Line:
text = """Python is
a programming
language."""
Quotes Inside Strings:
message = "He said, 'Hello'"
----------------------------------------
Numeric Literal Formats
----------------------------------------
Decimal:
100
Binary:
0b1010
Output:
10
Octal:
0o12
Output:
10
Hexadecimal:
0xA
Output:
10
Scientific Notation:
5e3
Output:
5000.0
----------------------------------------
Difference Between Variable and Literal
----------------------------------------
Variable:
age = 21
age is a variable.
21 is a literal.
The variable can change:
age = 22
The literal itself never changes.
----------------------------------------
Real-World Examples
----------------------------------------
ATM PIN:
pin = 1234
1234 is an integer literal.
Website Status:
is_logged_in = False
False is a Boolean literal.
User Name:
username = "Rahul"
"Rahul" is a string literal.
----------------------------------------
Common Beginner Mistakes
----------------------------------------
Forgetting Quotes:
name = Rahul
This causes an error because Python treats Rahul as a variable.
Correct:
name = "Rahul"
Using True and False Correctly:
True
False
These must start with a capital letter.
----------------------------------------
Summary
----------------------------------------
A Literal is a fixed value written directly in the code.
Python supports:
• Numeric Literals (int, float, complex)
• String Literals
• Boolean Literals (True, False)
• None Literal
• Collection Literals (list, tuple, set, dictionary)
Variables store literals, and literals provide the actual data that Python programs use during execution.`,
},
              {
                heading: "del Statement",
                body: `Python provides the del keyword.
It removes variables, list elements, dictionary items, or entire objects.
---
# Delete a Variable
x = 100
del x
print(x)
Output
NameError
The variable no longer exists.
---
# Delete Multiple Variables
a = 1
b = 2
c = 3
del a, b
Only c remains.
---
# Delete List Elements
numbers = [10,20,30,40]
del numbers[1]
Output
[10,30,40]
---
# Delete a Slice
numbers = [1,2,3,4,5,6]
del numbers[2:5]
Output
[1,2,6]
---
# Delete Entire List
numbers = [1,2,3]
del numbers
The variable itself is removed.
---
# Delete Dictionary Keys
student = {
    "name":"Rahul",
    "age":20
}
del student["age"]
Output
{'name': 'Rahul'}
---
# Difference Between del and None
Using del
x = 10
del x
Variable disappears completely.
Using None
x = 10
x = None
Variable still exists.
Its value is simply None.
---
# Best Practices
• Keep variables inside the smallest possible scope.
• Avoid excessive global variables.
• Use nonlocal only when necessary.
• Remember variables hold references, not actual objects.
• Write constants using UPPERCASE.
• Use del only when you truly want to remove a variable or object reference.
Understanding scope, references, constants, and the del statement is essential because almost every Python program—from small scripts to large AI applications—relies on these concepts.`,
              },
              {
                heading: "Naming Rules & PEP 8",
                body: `Writing correct variable names is one of the first skills every Python programmer should learn. Python allows great flexibility when naming variables, but there are a few rules that must always be followed.
If a variable name violates these rules, Python will immediately produce a SyntaxError.
Understanding these rules helps you write readable, professional, and error-free code.
---
# Rule 1: Variable Name Must Start with a Letter or Underscore
A variable can begin with:
• Uppercase letter (A–Z)
• Lowercase letter (a–z)
• Underscore (_)
Examples
name = "Rahul"
_age = 20
Student = "Alice"
total_marks = 95
All of these are valid.
---
# Rule 2: Variable Cannot Start with a Number
A variable name cannot begin with a digit.
Invalid
1name = "Rahul"
9age = 20
123value = 50
Python does not know whether these represent numbers or variable names.
Correct
name1 = "Rahul"
age9 = 20
value123 = 50
Numbers are allowed only after the first character.
---
# Rule 3: Only Letters, Numbers, and Underscores are Allowed
A variable name may contain:
• Letters
• Digits
• Underscore (_)
Nothing else.
Valid
student_name
marks2025
Invalid
student-name
user@name
first name
price$
The characters -, @, #, $, %, space are not allowed.
---
# Rule 4: Spaces are Not Allowed
Python treats spaces as separators.
Invalid
student name = "Rahul"
Correct
student_name = "Rahul"
studentName = "Rahul"
---
# Rule 5: Variable Names are Case Sensitive
Python treats uppercase and lowercase letters as different variables.
Example
name = "Rahul"
Name = "Teja"
NAME = "Python"
These are three completely different variables.
Output
print(name)
Rahul
print(Name)
Teja
print(NAME)
Python
Always use a consistent naming style.
---
# Rule 6: Keywords Cannot Be Used as Variable Names
Python has reserved words called keywords.
These words already have special meanings.
Examples
if, else, for, while, class, return, import, try, except, def, True, False, None
Invalid
class = "Python"
for = 10
return = 5
Python will immediately throw an error.
To see all Python keywords:
import keyword
print(keyword.kwlist)
---
# Rule 7: Avoid Using Built-in Function Names
Python already provides many built-in functions: print(), list(), str(), int(), sum(), max(), min(), len().
Avoid using these names as variables.
---
# Naming Convention (PEP 8)
Python follows the PEP 8 Style Guide.
Recommended style:
Variables: student_name, total_marks
Functions: calculate_salary(), find_maximum()
Constants: PI = 3.14159, MAX_USERS = 100
Classes: Student, EmployeeDetails`,
              },
              {
                heading: "Variable Lifetime",
                body: `Variables also have different lifetimes.
Local Variable: Created when function starts. Destroyed when function ends.
Global Variable: Created when program starts. Exists until program finishes.`,
              },
              {
                heading: "Best Practices",
                body: "Keep variables inside the smallest possible scope. Avoid excessive global variables — they make code hard to test. Use nonlocal only when truly needed. Write constants in UPPERCASE. Use del only when you truly need to remove a reference. Use isinstance() over type() == for type checking.",
              },
            ],
            code: `# ── VARIABLE CREATION — Python auto-detects type ────────────────
name       = "Rahul Kumar"   # str       — text in quotes
age        = 21              # int       — whole numbers, no size limit!
gpa        = 8.75            # float     — decimal numbers
is_student = True            # bool      — True or False (capital!)
phone      = None            # NoneType  — no value yet

# Check type with type()
print(type(name))            # <class 'str'>
print(type(age))             # <class 'int'>
print(type(gpa))             # <class 'float'>
print(type(is_student))      # <class 'bool'>
print(type(phone))           # <class 'NoneType'>

# isinstance() — better type check (handles inheritance too)
print(isinstance(age, int))              # True
print(isinstance(gpa, (int, float)))     # True — int OR float

# ── ASSIGNMENT ───────────────────────────────────────────────────
age = 20          # creates variable
age = 25          # reassigns — now points to new object 25

x = 10            # x points to 10
y = x             # y also points to SAME object 10
print(id(x) == id(y))  # True — same object in memory!

# Augmented assignment
score = 50
score = score + 20   # long form
score += 20          # shorthand — same result
score *= 2           # score = score * 2

# ── MULTIPLE ASSIGNMENT ───────────────────────────────────────────
x, y, z = 10, 20, 30       # unpack — each gets its own value
a = b = c = 0              # all three point to same 0 object

# Star unpacking
first, *rest = [1, 2, 3, 4, 5]
# first = 1, rest = [2, 3, 4, 5]

*init, last = [1, 2, 3, 4, 5]
# init = [1, 2, 3, 4], last = 5

# Swap without temp variable — Python exclusive!
a, b = 5, 10
a, b = b, a
print(a, b)           # 10 5

# ── DYNAMIC TYPING ───────────────────────────────────────────────
x = 10
print(x, type(x))    # 10 <class 'int'>
x = "Python"
print(x, type(x))    # Python <class 'str'>
x = 3.14
print(x, type(x))    # 3.14 <class 'float'>

# ── MUTABLE REFERENCE TRAP ───────────────────────────────────────
list1 = [1, 2, 3]
list2 = list1           # BOTH point to SAME list!
list2.append(4)
print(list1)            # [1, 2, 3, 4] — list1 is ALSO changed!

# Fix: create independent copy
list3 = list1.copy()    # shallow copy — independent
list3.append(99)
print(list1)            # unchanged!

import copy
deep = copy.deepcopy(list1)  # deep copy for nested structures

# ── SCOPE — LEGB RULE ─────────────────────────────────────────────
language = "Python"          # Global scope

def outer():
    framework = "Django"     # Enclosing scope

    def inner():
        version = "3.12"     # Local scope
        print(version)       # Local — found immediately
        print(framework)     # Enclosing — found in outer()
        print(language)      # Global — found at module level
        print(len)           # Built-in — Python built-in

    inner()

outer()

# ── GLOBAL KEYWORD ────────────────────────────────────────────────
count = 0

def increment():
    global count             # Must declare to modify global
    count += 1               # Without 'global', this raises UnboundLocalError

increment()
increment()
print(count)                 # 2

# ── NONLOCAL KEYWORD ─────────────────────────────────────────────
def make_counter():
    count = 0
    def increment():
        nonlocal count       # Modify outer function's count
        count += 1
        print(count)
    return increment

counter = make_counter()
counter()                    # 1
counter()                    # 2
counter()                    # 3

# ── CONSTANTS — UPPERCASE convention ─────────────────────────────
PI           = 3.14159265358979
GRAVITY      = 9.8
MAX_RETRIES  = 3
DATABASE_URL = "localhost:5432"
APP_NAME     = "CSE Navigator"

# ── DEL STATEMENT ────────────────────────────────────────────────
x = 100
del x

# del list elements
numbers = [10, 20, 30, 40, 50]
del numbers[1]           # Remove 20  → [10, 30, 40, 50]
del numbers[1:3]         # Remove slice → [10, 50]

# del dict key
student = {"name": "Rahul", "age": 20, "city": "Hyderabad"}
del student["age"]
print(student)           # {'name': 'Rahul', 'city': 'Hyderabad'}

# del vs None
x = 10
del x                    # Variable GONE — NameError if accessed
y = 10
y = None                 # Variable STILL EXISTS — value is just None`,
            resources: [
              { label: "Python Variables (W3Schools)", url: "https://www.w3schools.com/python/python_variables.asp", type: "article" },
              { label: "CS50P Week 0 — Variables", url: "https://cs50.harvard.edu/python/2022/weeks/0/", type: "course" },
              { label: "Python Variables (Real Python)", url: "https://realpython.com/python-variables/", type: "article" },
              { label: "Python Scope LEGB (Real Python)", url: "https://realpython.com/python-scope-legb-rule/", type: "article" },
              { label: "Python Official Docs — Variables", url: "https://docs.python.org/3/reference/simple_stmts.html#assignment-statements", type: "official" },
            ],
          },
          {
            title: "Data Types — Understanding Different Kinds of Data",
            type: "concept",
            detail: "Every value in Python has a data type. Data types determine what kind of data a variable stores and what operations can be performed on it. Python provides built-in types like int, float, str, bool, list, tuple, set, dictionary, bytes, and NoneType, making it easy to work with numbers, text, collections, and more.",
            subsections: [
              {
                heading: "What are Data Types?",
                body: `Data Types define the kind of value a variable can store.
Every value in Python belongs to a specific data type.
The data type tells Python:
• What kind of data is stored.
• How much memory should be allocated.
• Which operations are allowed on that value.
Example:
age = 21
name = "Rahul"
cgpa = 8.75
is_student = True
Here:
21 → Integer (int)
"Rahul" → String (str)
8.75 → Float
True → Boolean (bool)
Python automatically identifies the data type of every value without requiring the programmer to specify it (Dynamic Typing).`,
              },
              {
                heading: "Python Built-in Data Types",
                body:`Python provides several built-in data types.
The most commonly used are:
Numeric Types
• int
• float
• complex
Text Type
• str
Boolean Type
• bool
Sequence Types
• list
• tuple
• range
Set Types
• set
• frozenset
Mapping Type
• dict
Binary Types
• bytes
• bytearray
• memoryview
Special Type
• NoneType
Among these, the most frequently used data types are:
int, float, str, bool, list, tuple, dict, set.
These cover more than 95% of real-world Python programs.`
  },
  {
      heading: "Numeric Data Types (int, float, complex)",
      body:`Numbers are one of the most commonly used data types in Python.
Whenever we perform calculations, store ages, salaries, percentages, scientific values, coordinates, or mathematical expressions, we use numeric data types.
Python provides three built-in numeric data types:
• Integer (int)
• Float (float)
• Complex (complex)
Unlike many programming languages, Python automatically chooses the correct numeric type based on the value assigned.
Example:
age = 21          # Integer
salary = 45000.75 # Float
z = 3 + 4j        # Complex Number
--------------------------------------------------
1. Integer (int)
An Integer is a whole number without a decimal point.
Integers can be:
• Positive
• Negative
• Zero
Examples:
10
0
-25
999999
Python integers have unlimited size.
Unlike languages such as C or Java, Python integers do not overflow after reaching a fixed limit.
Example:
x = 999999999999999999999999999999999999999
This is still a valid integer in Python.
Common Uses:
• Number of students
• Product quantity
• Employee ID
• Mobile OTP
• Loop counters
Example:
students = 120
temperature = -5
Checking Integer Type
age = 21
print(type(age))
Output:
<class 'int'>
--------------------------------------------------
2. Float (float)
A Float stores decimal (floating-point) numbers.
Examples:
3.14
5.0
-12.75
0.001
A float is used whenever precision with decimal values is required.
Example:
cgpa = 8.73
height = 172.5
pi = 3.14159265
Checking Float Type
price = 99.95
print(type(price))
Output:
<class 'float'>
Scientific Notation
Python also supports scientific notation.
Example:
distance = 5e3
Output:
5000.0
Example:
mass = 3.5e-4
Output:
0.00035
--------------------------------------------------
3. Complex Numbers (complex)
Complex numbers contain two parts:
Real Part
Imaginary Part
Python represents the imaginary part using the letter j.
General Form:
a + bj
Examples:
3 + 4j
5j
-2 + 7j

Example:
z = 3 + 4j
print(type(z))
Output:
<class 'complex'>
Accessing Real and Imaginary Parts
z = 3 + 4j
print(z.real)
print(z.imag)
Output:
3.0
4.0

Where are Complex Numbers Used?
Most beginners rarely use them.
They are commonly used in:
• Electrical Engineering
• Signal Processing
• Artificial Intelligence Research
• Quantum Computing
• Scientific Computing
• Mathematical Modeling

--------------------------------------------------

Arithmetic Operations

Python supports arithmetic on all numeric types.

Example:

a = 20
b = 5

print(a + b)
print(a - b)
print(a * b)
print(a / b)
print(a // b)
print(a % b)
print(a ** b)

Output:

25
15
100
4.0
4
0
3200000
--------------------------------------------------
Numeric Type Hierarchy
Python follows this hierarchy:
Integer (int)
        ↓
Float (float)
        ↓
Complex (complex)

Whenever different numeric types are combined, Python converts the smaller type into the larger type automatically.

--------------------------------------------------
Summary
Integer (int)
• Stores whole numbers
• Unlimited size
• No decimal point

Float (float)
• Stores decimal numbers
• Supports scientific notation
• Used for precise calculations

Complex (complex)
• Stores numbers with real and imaginary parts
• Written using 'j'
• Mainly used in scientific and engineering applications
These three data types together form Python's Numeric Data Types and are the foundation for almost every mathematical operation in Python.`,
  },

  {
  heading: "Type Conversion (Implicit & Explicit Casting)",
  body: `Type Conversion means converting one data type into another.
Python provides two types of type conversion:
• Implicit Type Conversion
• Explicit Type Conversion (Type Casting)
Type conversion allows different data types to work together correctly.
Why Do We Need Type Conversion?
Different data types cannot always perform operations together.
Example:
age = 20
name = "Rahul"
Adding them directly is impossible because Python needs compatible data types before performing operations.
1. Implicit Type Conversion
Implicit means Automatic.
Python automatically converts one data type into another whenever it can perform the operation safely.
The programmer does NOT write any conversion code.
Python performs it automatically.
Example:
a = 10
b = 5.5
print(a + b)
Output:
15.5
Python converts 10 into 10.0 and then performs the addition.
More Examples:
Integer + Float
10 + 2.5
Output:
12.5
Float + Integer
3.8 + 2
Output:
5.8
Integer + Complex
10 + (2+3j)
Output:
(12+3j)
Float + Complex
2.5 + (3+4j)
Output:
(5.5+4j)
Type Promotion Hierarchy:
Integer
↓
Float
↓
Complex
Examples:
int + int → int
5 + 2
Output:
7
int + float → float
5 + 2.5
Output:
7.5
float + float → float
2.5 + 4.5
Output:
7.0
int + complex → complex
5 + (2+1j)
Output:
(7+1j)
float + complex → complex
5.5 + (2+3j)
Output:
(7.5+3j)
complex + complex → complex
(2+3j) + (4+5j)
Output:
(6+8j)
Implicit Conversion Does NOT Work Everywhere.
Example:
10 + "20"
Output:
TypeError
Python will NOT automatically convert strings into numbers.
2. Explicit Type Conversion
Explicit means Manual.
The programmer converts the data type using built-in functions.
This is called Type Casting.
Python provides:
int()
float()
str()
bool()
complex()
Convert to Integer:
x = int(5.9)
print(x)
Output:
5
Convert String to Integer:
age = int("25")
Output:
25
Convert Float to Integer:
x = int(9.99)
Output:
9
int() removes the decimal part instead of rounding.
Convert Integer to Float:
marks = float(95)
Output:
95.0
Convert String to Float:
price = float("99.95")
Output:
99.95
Convert Integer to String:
age = str(21)
Output:
"21"
Example:
name = "Rahul"
age = 21
print(name + " is " + str(age) + " years old")
Convert Float to String:
pi = str(3.14)
Output:
"3.14"
Convert Number to Boolean:
print(bool(1))
Output:
True
print(bool(0))
Output:
False
Falsy Values:
0
0.0
None
False
""
[]
()
{}
set()
Everything else becomes True.
Convert to Complex:
x = complex(5)
Output:
(5+0j)
Example:
complex(5,3)
Output:
(5+3j)
Common Conversion Functions:
int() → Integer
float() → Float
str() → String
bool() → Boolean
complex() → Complex Number
Invalid Conversions:
int("Hello")
Output:
ValueError
float("Python")
Output:
ValueError
Real-Life Example:
age = "21"
salary = "45000.50"
age = int(age)
salary = float(salary)
print(age + 5)
print(salary + 1000)
Output:
26
46000.5
Summary:
Implicit Conversion:
• Done automatically by Python.
• Safe conversions only.
• Mostly used with numeric data types.
Explicit Conversion:
• Done manually by the programmer.
• Uses int(), float(), str(), bool(), and complex().
• Required when Python cannot convert automatically.
Numeric Type Promotion:
int + int → int
int + float → float
float + float → float
int + complex → complex
float + complex → complex
complex + complex → complex
Understanding type conversion is essential because almost every real-world Python program reads data as strings and converts them into the required data type before processing.`,
},

{
  heading: "Checking Data Types (type() and isinstance())",
  body: `After creating variables, programmers often need to know what type of data a variable stores. Python provides two built-in functions for checking data types:
• type()
• isinstance()
These functions are useful while debugging programs, validating user input, and writing reliable Python applications.
----------------------------------------
1. The type() Function
----------------------------------------
The type() function returns the exact data type (class) of an object.
Syntax:
type(object)
Example:
age = 21
price = 99.5
name = "Rahul"
is_student = True
print(type(age))
print(type(price))
print(type(name))
print(type(is_student))
Output:
<class 'int'>
<class 'float'>
<class 'str'>
<class 'bool'>
----------------------------------------
Checking Other Data Types
----------------------------------------
print(type([1,2,3]))
Output:
<class 'list'>
print(type((1,2,3)))
Output:
<class 'tuple'>
print(type({"name":"Rahul"}))
Output:
<class 'dict'>
print(type({1,2,3}))
Output:
<class 'set'>
print(type(None))
Output:
<class 'NoneType'>
----------------------------------------
2. The isinstance() Function
----------------------------------------
The isinstance() function checks whether an object belongs to a particular data type.
Instead of returning the data type, it returns either True or False.
Syntax:
isinstance(object, datatype)
Example:
age = 21
print(isinstance(age, int))
Output:
True
Example:
price = 45.5
print(isinstance(price, float))
Output:
True
Example:
name = "Python"
print(isinstance(name, str))
Output:
True
----------------------------------------
Checking Multiple Data Types
----------------------------------------
Python can check more than one data type at the same time.
Example:
num = 10
print(isinstance(num, (int, float)))
Output:
True
Example:
value = 5.5
print(isinstance(value, (int, float)))
Output:
True
----------------------------------------
Difference Between type() and isinstance()
----------------------------------------
type()
• Returns the exact data type.
• Used when you want to know what type an object is.
Example:
type(5)
Output:
<class 'int'>
isinstance()
• Returns True or False.
• Checks whether an object belongs to a specific type.
Example:
isinstance(5, int)
Output:
True
----------------------------------------
Real-World Example
----------------------------------------
age = input("Enter your age: ")
if isinstance(age, str):
    age = int(age)
print(type(age))
Output:
<class 'int'>
----------------------------------------
When Should You Use Them?
----------------------------------------
Use type()
• To display the data type.
• During debugging.
• To inspect unknown objects.
Use isinstance()
• To validate user input.
• Before performing calculations.
• While writing reusable functions.
• In production-quality Python programs.
----------------------------------------
Summary
----------------------------------------
type()
• Returns the exact data type.
• Output is a class object.
isinstance()
• Returns True or False.
• Checks whether an object belongs to a specific data type.
• Can check multiple data types together.
• Preferred over type() when validating data in real-world Python applications.`,
},
            ],
            code: `# Checking data types in Python
x = 5
y = 3.14
name = "Alice"
is_valid = True
numbers = [1, 2, 3]

print(type(x))        # <class 'int'>
print(type(y))        # <class 'float'>
print(type(name))     # <class 'str'>
print(type(is_valid)) # <class 'bool'>
print(type(numbers))  # <class 'list'>`,
            resources: [
              { label: "Python Data Types (W3Schools)", url: "https://www.w3schools.com/python/python_datatypes.asp", type: "article" },
              { label: "Python Data Types (Real Python)", url: "https://realpython.com/python-data-types/", type: "article" },
            ],
          },
          {
            title: "Operators & Expressions",
            type: "concept",
            detail:"Operators are special symbols that perform operations on values and variables. They allow Python programs to calculate results, compare data, make decisions, combine conditions, manipulate objects, and control program logic. Mastering operators is essential because they are used in almost every Python program, from simple calculations to complex real-world applications.",
            subsections: [
{
heading: "What are Arithmetic Operators?",
body: `Arithmetic operators are special symbols used to perform mathematical calculations on numbers. They allow Python programs to add, subtract, multiply, divide, find remainders, calculate powers, and perform floor division. Arithmetic operators are among the most frequently used operators because almost every Python program performs some kind of calculation. Whether you are building a calculator, processing data, developing AI models, or creating web applications, arithmetic operators play an essential role.
An arithmetic operation always involves one or more operands (values or variables) and an operator that performs the calculation.
Example:
a = 10
b = 3
Here:
a and b → Operands
+, -, *, /, %, //, ** → Arithmetic Operators
The result of every arithmetic operation is a new value that can be stored in another variable or used directly in expressions.
Python follows the standard mathematical order of operations (PEMDAS/BODMAS), meaning multiplication and division are performed before addition and subtraction unless parentheses are used to change the order.
Arithmetic operators work with integers, floating-point numbers, and complex numbers. Some operators also work with strings and collections in special ways, which will be covered later.
Understanding arithmetic operators is the foundation for solving mathematical problems, writing algorithms, performing data analysis, and implementing real-world applications in Python.`
},
{
heading: "Types of Arithmetic Operators",
body: `Python provides seven arithmetic operators:
+  → Addition
-  → Subtraction
*  → Multiplication
/  → Division
// → Floor Division
%  → Modulus (Remainder)
** → Exponent (Power)
Each operator performs a different mathematical operation and is used in different programming scenarios. In the following sections, each operator will be explained in detail with syntax, examples, outputs, and real-world use cases.`,
},
{
heading: "Arithmetic Operators in Python",
body: `Python provides seven arithmetic operators that perform mathematical calculations. These operators are used in almost every Python program, from basic calculations to complex scientific and AI applications.
----------------------------------------
1. Addition (+)
----------------------------------------
The addition operator adds two or more values.
Syntax:
result = a + b
Example:
a = 10
b = 5
print(a + b)
Output:
15
The + operator can also concatenate strings.
Example:
first = "Hello"
second = "Python"
print(first + " " + second)
Output:
Hello Python
----------------------------------------
2. Subtraction (-)
----------------------------------------
The subtraction operator subtracts one value from another.
Syntax:
result = a - b
Example:
a = 20
b = 8
print(a - b)
Output:
12
----------------------------------------
3. Multiplication (*)
----------------------------------------
The multiplication operator multiplies two values.
Syntax:
result = a * b
Example:
a = 7
b = 6
print(a * b)
Output:
42
The * operator can also repeat strings.
Example:
print("Python " * 3)
Output:
Python Python Python
----------------------------------------
4. Division (/)
----------------------------------------
The division operator performs normal division and always returns a floating-point value.
Syntax:
result = a / b
Example:
a = 10
b = 2
print(a / b)
Output:
5.0
Example:
print(7 / 2)
Output:
3.5
----------------------------------------
5. Floor Division (//)
----------------------------------------
Floor division removes the decimal part and returns the nearest smaller integer.
Syntax:
result = a // b
Example:
print(7 // 2)
Output:
3
Example:
print(15 // 4)
Output:
3
Example:
print(20 // 5)
Output:
4
----------------------------------------
6. Modulus (%)
----------------------------------------
The modulus operator returns the remainder after division.
Syntax:
result = a % b
Example:
print(10 % 3)
Output:
1
Example:
print(20 % 5)
Output:
0
Common Uses:
• Check even or odd numbers
• Check divisibility
• Create cyclic patterns
----------------------------------------
7. Exponent (**)
----------------------------------------
The exponent operator raises a number to a power.
Syntax:
result = a ** b
Example:
print(2 ** 3)
Output:
8
Example:
print(5 ** 2)
Output:
25
Example:
print(9 ** 0.5)
Output:
3.0
----------------------------------------
8. Operator Precedence (PEMDAS/BODMAS)
----------------------------------------
Python follows the standard order of mathematical operations.
Order:
1. Parentheses ()
2. Exponent **
3. Multiplication *, Division /, Floor Division //, Modulus %
4. Addition +
5. Subtraction -
Example:
print(5 + 2 * 3)
Output:
11
Explanation:
2 × 3 = 6
5 + 6 = 11
Example:
print((5 + 2) * 3)
Output:
21
Explanation:
5 + 2 = 7
7 × 3 = 21
----------------------------------------
Summary
----------------------------------------
+  → Addition
-  → Subtraction
*  → Multiplication
/  → Division (returns float)
// → Floor Division (returns integer)
%  → Remainder
** → Power
() → Changes execution order`,
},
{
heading: "Comparison Operators (Relational Operators)",
body: `Comparison operators are used to compare two values or variables. Instead of performing mathematical calculations, they compare values and return either True or False. Since the result is always a Boolean value, comparison operators are mainly used in decision-making statements such as if, elif, while loops, filtering data, validating user input, searching, sorting, and many real-world applications.
Comparison operators work with numbers, strings, characters, lists, tuples, and many other Python objects. Python compares values based on their actual content rather than simply checking memory locations.
----------------------------------------
What is a Boolean Result?
----------------------------------------
Every comparison returns one of two values:
True → The comparison is correct.
False → The comparison is incorrect.
Example:
print(10 > 5)
Output:
True
Example:
print(8 < 3)
Output:
False
----------------------------------------
Types of Comparison Operators
----------------------------------------
Python provides six comparison operators:
==  Equal to
!=  Not equal to
>   Greater than
<   Less than
>=  Greater than or equal to
<=  Less than or equal to
----------------------------------------
1. Equal To (==)
----------------------------------------
The == operator checks whether two values are equal.
Syntax:
value1 == value2
Example:
a = 10
b = 10
print(a == b)
Output:
True
Example:
print(5 == 8)
Output:
False
Remember:
== compares values.
= assigns values.
Example:
x = 10
print(x == 10)
Output:
True
----------------------------------------
2. Not Equal To (!=)
----------------------------------------
The != operator checks whether two values are different.
Syntax:
value1 != value2
Example:
print(10 != 5)
Output:
True
Example:
print(20 != 20)
Output:
False
----------------------------------------
3. Greater Than (>)
----------------------------------------
Checks whether the value on the left is greater than the value on the right.
Syntax:
value1 > value2
Example:
print(15 > 10)
Output:
True
Example:
print(5 > 20)
Output:
False
----------------------------------------
4. Less Than (<)
----------------------------------------
Checks whether the value on the left is smaller than the value on the right.
Syntax:
value1 < value2
Example:
print(8 < 20)
Output:
True
Example:
print(12 < 5)
Output:
False
----------------------------------------
5. Greater Than or Equal To (>=)
----------------------------------------
Returns True if the first value is greater than or equal to the second value.
Syntax:
value1 >= value2
Example:
print(10 >= 10)
Output:
True
Example:
print(20 >= 15)
Output:
True
Example:
print(5 >= 10)
Output:
False
----------------------------------------
6. Less Than or Equal To (<=)
----------------------------------------
Returns True if the first value is less than or equal to the second value.
Syntax:
value1 <= value2
Example:
print(8 <= 10)
Output:
True
Example:
print(10 <= 10)
Output:
True
Example:
print(25 <= 5)
Output:
False
----------------------------------------
Comparison Between Strings
----------------------------------------
Python compares strings alphabetically using Unicode (ASCII) values.
Example:
print("Apple" == "Apple")
Output:
True
Example:
print("Apple" != "Banana")
Output:
True
Example:
print("Cat" > "Bat")
Output:
True
Explanation:
'C' comes after 'B' in Unicode.
Example:
print("apple" > "Apple")
Output:
True
Explanation:
Lowercase letters have higher Unicode values than uppercase letters.
----------------------------------------
Comparison Between Variables
----------------------------------------
Example:
age = 21
minimum_age = 18
print(age >= minimum_age)
Output:
True
Example:
salary = 25000
required_salary = 30000
print(salary >= required_salary)
Output:
False
----------------------------------------
Using Comparison Operators in if Statements
----------------------------------------
Example:
marks = 85
if marks >= 35:
    print("Pass")
Output:
Pass
Example:
age = 16
if age >= 18:
    print("Eligible")
else:
    print("Not Eligible")
Output:
Not Eligible
----------------------------------------
Real-World Examples
----------------------------------------
Checking Login Age
age = 22
print(age >= 18)
Output:
True
Checking Password Length
password = "Python123"
print(len(password) >= 8)
Output:
True
Checking Product Stock
stock = 0
print(stock == 0)
Output:
True
Checking Marks
marks = 91
print(marks > 90)
Output:
True
----------------------------------------
Common Beginner Mistakes
----------------------------------------
Using = instead of ==
Wrong:
if age = 18:
Correct:
if age == 18:
Comparing different data types unnecessarily
Example:
print(10 == "10")
Output:
False
Reason:
One is an integer and the other is a string.
----------------------------------------
Summary
----------------------------------------
==  Checks whether two values are equal.
!=  Checks whether two values are different.
>   Checks whether the left value is greater.
<   Checks whether the left value is smaller.
>=  Checks whether the left value is greater than or equal.
<=  Checks whether the left value is less than or equal.
Every comparison operator returns either True or False and forms the foundation of decision-making in Python programs.`,
},
{
heading: "Logical Operators",
body: `Logical operators are used to combine two or more conditions into a single expression. Instead of comparing values directly like comparison operators, logical operators evaluate multiple Boolean expressions and return either True or False. They are extremely important in decision-making because real-world programs usually need to check multiple conditions at the same time.
For example, a website may allow login only if the username is correct AND the password is correct. A student may pass only if attendance is above 75% AND marks are above the passing score. These situations are solved using logical operators.
Python provides three logical operators:
and
or
not
----------------------------------------
1. AND Operator (and)
----------------------------------------
The and operator returns True only when every condition is True. If even one condition is False, the final result becomes False.
Syntax:
condition1 and condition2
Example:
age = 20
citizen = True
print(age >= 18 and citizen)
Output:
True
Example:
marks = 80
attendance = 70
print(marks >= 35 and attendance >= 75)
Output:
False
Truth Table:
True and True → True
True and False → False
False and True → False
False and False → False
Real-Life Example:
You can vote only if:
Age ≥ 18 AND Citizenship = True
----------------------------------------
2. OR Operator (or)
----------------------------------------
The or operator returns True if at least one condition is True. It returns False only when every condition is False.
Syntax:
condition1 or condition2
Example:
is_admin = False
is_teacher = True
print(is_admin or is_teacher)
Output:
True
Example:
marks = 25
sports_quota = True
print(marks >= 35 or sports_quota)
Output:
True
Truth Table:
True or True → True
True or False → True
False or True → True
False or False → False
Real-Life Example:
A student can join the event if they are:
A Class Representative OR Sports Captain.
----------------------------------------
3. NOT Operator (not)
----------------------------------------
The not operator reverses the Boolean value.
True becomes False.
False becomes True.
Syntax:
not condition
Example:
is_logged_in = True
print(not is_logged_in)
Output:
False
Example:
print(not False)
Output:
True
Example:
age = 16
print(not(age >= 18))
Output:
True
Real-Life Example:
If a website checks:
not account_blocked
It means only users whose accounts are NOT blocked can continue.
----------------------------------------
Combining Multiple Logical Operators
----------------------------------------
Example:
age = 22
salary = 50000
experience = 3
print(age >= 18 and salary >= 30000 and experience >= 2)
Output:
True
Example:
python = True
java = False
cpp = False
print(python or java or cpp)
Output:
True
----------------------------------------
Logical Operators with Comparison Operators
----------------------------------------
Example:
marks = 82
attendance = 88
print(marks >= 35 and attendance >= 75)
Output:
True
Example:
temperature = 42
print(temperature < 0 or temperature > 40)
Output:
True
----------------------------------------
Operator Precedence
----------------------------------------
Python evaluates logical operators in this order:
1. not
2. and
3. or
Example:
print(True or False and False)
Output:
True
Explanation:
False and False → False
True or False → True
Using parentheses improves readability.
Example:
print((True or False) and False)
Output:
False
----------------------------------------
Short-Circuit Evaluation
----------------------------------------
Python stops evaluating conditions as soon as the final result is known.
Example:
print(True or (10 / 0))
Output:
True
The second condition is never executed because the first condition already makes the result True.
Example:
print(False and (10 / 0))
Output:
False
The division is skipped because False and anything is always False.
----------------------------------------
Real-World Examples
----------------------------------------
Login Validation:
username = "admin"
password = "python123"
print(username == "admin" and password == "python123")
Output:
True
College Admission:
marks = 90
sports = False
print(marks >= 85 or sports)
Output:
True
Website Access:
logged_in = True
blocked = False
print(logged_in and not blocked)
Output:
True
----------------------------------------
Common Beginner Mistakes
----------------------------------------
Using & instead of and
Wrong:
a > 5 & b < 10
Correct:
a > 5 and b < 10
Forgetting parentheses in complex expressions
Example:
(age >= 18 and citizen) or is_admin
is easier to understand than writing everything together.
----------------------------------------
Summary
----------------------------------------
and → Returns True only if every condition is True.
or → Returns True if at least one condition is True.
not → Reverses a Boolean value.
Logical operators are used with comparison operators to build powerful decision-making conditions in Python programs such as authentication systems, validations, AI models, web applications, and business logic.`,
},
{
heading: "Bitwise Operators",
body: `Bitwise operators perform operations directly on the binary (bit-level) representation of integers. Instead of working with decimal numbers, Python first converts numbers into binary and then performs the operation bit by bit. Bitwise operators are commonly used in system programming, networking, encryption, graphics, embedded systems, operating systems, and performance optimization.
Python provides six bitwise operators:
& (AND)
| (OR)
^ (XOR)
~ (NOT)
<< (Left Shift)
>> (Right Shift)
----------------------------------------
Binary Representation
----------------------------------------
Before learning bitwise operators, understand that every integer is stored in binary.
Example:
Decimal: 5
Binary : 0101
Decimal: 3
Binary : 0011
Most bitwise operations are performed on these binary values.
----------------------------------------
1. Bitwise AND (&)
----------------------------------------
Returns 1 only when both corresponding bits are 1.
Syntax:
a & b
Example:
a = 5
b = 3
print(a & b)
Binary:
0101
0011
----
0001
Output:
1
----------------------------------------
2. Bitwise OR (|)
----------------------------------------
Returns 1 if at least one corresponding bit is 1.
Syntax:
a | b
Example:
a = 5
b = 3
print(a | b)
Binary:
0101
0011
----
0111
Output:
7
----------------------------------------
3. Bitwise XOR (^)
----------------------------------------
Returns 1 when the corresponding bits are different.
Syntax:
a ^ b
Example:
a = 5
b = 3
print(a ^ b)
Binary:
0101
0011
----
0110
Output:
6
----------------------------------------
4. Bitwise NOT (~)
----------------------------------------
Inverts every bit.
Syntax:
~a
Example:
a = 5
print(~a)
Output:
-6
Explanation:
Python uses two's complement representation for negative numbers, so the result may look unexpected.
Formula:
~x = -(x + 1)
Example:
~5 = -6
----------------------------------------
Summary Table
----------------------------------------
&  → Bitwise AND
|  → Bitwise OR
^  → Bitwise XOR
~  → Bitwise NOT
<< → Left Shift (×2)
>> → Right Shift (÷2)
----------------------------------------
Real-World Examples
----------------------------------------
Checking Even or Odd:
num = 10
print(num & 1)
Output:
0
Explanation:
0 means even.
Example:
num = 7
print(num & 1)
Output:
1
Explanation:
1 means odd.
Multiply by 2:
num = 8
print(num << 1)
Output:
16
Divide by 2:
num = 16
print(num >> 1)
Output:
8
----------------------------------------
Common Beginner Mistakes
----------------------------------------
Do not confuse:
&& (used in C, Java)
with
& (Bitwise AND in Python)
Python does not have &&.
Remember:
and → Logical operator
& → Bitwise operator
Similarly:
or → Logical operator
| → Bitwise operator
----------------------------------------
When Are Bitwise Operators Used?
----------------------------------------
• Operating Systems
• Device Drivers
• Embedded Systems
• Networking
• Encryption Algorithms
• Graphics Programming
• Competitive Programming
• Performance Optimization
----------------------------------------
Summary
----------------------------------------
Bitwise operators work directly on binary representations of integers.
They are faster than many arithmetic operations and are commonly used in low-level programming.
& → AND
| → OR
^ → XOR
~ → NOT
<< → Left Shift (Multiply by 2)
>> → Right Shift (Divide by 2)
Although bitwise operators are less common in everyday Python programming, they are important for interviews, system programming, and understanding how computers process data internally.`,
},

{
heading: "Left Shift (<<) and Right Shift (>>) — Visual Explanation",
body: `Bit shifting moves the binary digits (bits) of a number either to the left or to the right.

Before understanding shift operators, remember that every integer inside a computer is stored in binary (0s and 1s).

Example:
Decimal Number:
5

Binary Representation:
0101

Each position (bit) has a value.

Bit Position:
8   4   2   1
↓   ↓   ↓   ↓
0   1   0   1

Binary:
0101

Value Calculation:
(0 × 8) + (1 × 4) + (0 × 2) + (1 × 1)
= 4 + 1
= 5

========================================
1. Left Shift (<<)
========================================

The left shift operator moves every bit towards the left.

Syntax:
number << positions

Every left shift inserts a 0 on the right side.

Example:

a = 5

Binary:
0101

Perform:

a << 1

Step 1:
Move every bit one position to the left.

Before:
0 1 0 1

After Shift:
1 0 1 _

Step 2:
Fill the empty position with 0.

Result:
1 0 1 0

Binary:
1010

Convert back to Decimal:

Bit Position:
8   4   2   1
↓   ↓   ↓   ↓
1   0   1   0

= (1 × 8)
+ (0 × 4)
+ (1 × 2)
+ (0 × 1)

= 8 + 2

= 10

Output:
10

----------------------------------------

Example:

a = 5

a << 2

Original Binary:
0101

Shift One Time:
1010

Shift Second Time:
10100

Binary:
10100

Bit Position:

16   8   4   2   1
↓    ↓   ↓   ↓   ↓
1    0   1   0   0

= 16 + 4

= 20

Output:
20

Observation:

5 << 1 = 10

5 << 2 = 20

5 << 3 = 40

Each left shift multiplies the number by 2.

Formula:

number << n

=

number × (2ⁿ)

========================================
2. Right Shift (>>)
========================================

The right shift operator moves every bit towards the right.

Syntax:

number >> positions

Every right shift removes the last bit on the right.

Example:

a = 20

Binary:

10100

Perform:

a >> 1

Step 1:

Move every bit one position right.

Before:

1 0 1 0 0

After:

0 1 0 1 0

Binary:

01010

Convert back:

Bit Position:

16  8  4  2  1
↓   ↓  ↓  ↓  ↓
0   1  0  1  0

= 8 + 2

= 10

Output:
10

----------------------------------------

Example:

a = 20

a >> 2

Original Binary:

10100

Shift Once:

01010

Shift Again:

00101

Binary:

00101

Convert back:

Bit Position:

16  8  4  2  1
↓   ↓  ↓  ↓  ↓
0   0  1  0  1

= 4 + 1

= 5

Output:
5

Observation:

20 >> 1 = 10

20 >> 2 = 5

20 >> 3 = 2

Each right shift divides the number by 2 (floor division).

Formula:

number >> n

=

number // (2ⁿ)

========================================
Easy Trick to Remember
========================================

<<  Move Left
→ Number becomes Bigger
→ Multiply by 2

>>

Move Right

→ Number becomes Smaller

→ Divide by 2

========================================
Quick Examples
========================================

5 << 1 = 10

5 << 2 = 20

5 << 3 = 40

40 >> 1 = 20

40 >> 2 = 10

40 >> 3 = 5

========================================
Memory Tip
========================================

Imagine binary digits standing in a queue.

Left Shift (<<)

0 1 0 1

↓

1 0 1 0

↓

1 0 1 0 0

Everyone moves LEFT.
A zero enters from the RIGHT.

Right Shift (>>)

1 0 1 0 0

↓

0 1 0 1 0

↓

0 0 1 0 1

Everyone moves RIGHT.
The last bit disappears.

This is why left shifting doubles the value and right shifting halves the value for positive integers.`,
},


{
heading: "Assignment Operators",
body: `Assignment operators are used to assign values to variables. The most common assignment operator is (=), but Python also provides compound assignment operators that combine an arithmetic operation with assignment. These operators make code shorter, cleaner, and easier to read. Assignment operators are widely used in loops, counters, mathematical calculations, data processing, and real-world applications.
----------------------------------------
1. Assignment Operator (=)
----------------------------------------
The = operator assigns a value to a variable.
Syntax:
variable = value
Example:
x = 10
print(x)
Output:
10
Example:
name = "Python"
print(name)
Output:
Python
----------------------------------------
2. Addition Assignment (+=)
----------------------------------------
Adds a value to the existing variable and stores the result back in the same variable.
Syntax:
variable += value
Equivalent To:
variable = variable + value
Example:
x = 10
x += 5
print(x)
Output:
15
----------------------------------------
3. Subtraction Assignment (-=)
----------------------------------------
Subtracts a value from the variable and stores the updated value.
Syntax:
variable -= value
Equivalent To:
variable = variable - value
Example:
x = 20
x -= 8
print(x)
Output:
12
----------------------------------------
4. Multiplication Assignment (*=)
----------------------------------------
Multiplies the variable by another value and stores the result.
Syntax:
variable *= value
Equivalent To:
variable = variable * value
Example:
x = 6
x *= 4
print(x)
Output:
24
----------------------------------------
5. Division Assignment (/=)
----------------------------------------
Divides the variable by another value.
The result is always a floating-point number.
Syntax:
variable /= value
Equivalent To:
variable = variable / value
Example:
x = 20
x /= 4
print(x)
Output:
5.0
----------------------------------------
6. Floor Division Assignment (//=)
----------------------------------------
Performs floor division and stores the integer result.
Syntax:
variable //= value
Equivalent To:
variable = variable // value
Example:
x = 17
x //= 5
print(x)
Output:
3
----------------------------------------
7. Modulus Assignment (%=)
----------------------------------------
Calculates the remainder and stores it.
Syntax:
variable %= value
Equivalent To:
variable = variable % value
Example:
x = 17
x %= 5
print(x)
Output:
2
----------------------------------------
8. Exponent Assignment (**=)
----------------------------------------
Raises the variable to a power and stores the result.
Syntax:
variable **= value
Equivalent To:
variable = variable ** value
Example:
x = 3
x **= 4
print(x)
Output:
81
----------------------------------------
Real-World Examples
----------------------------------------
Counter:
count = 0
count += 1
print(count)
Output:
1
Bank Balance:
balance = 5000
balance += 2500
print(balance)
Output:
7500
Discount:
price = 1000
price -= 200
print(price)
Output:
800
Square Calculation:
num = 5
num **= 2
print(num)
Output:
25
----------------------------------------
Why Use Assignment Operators?
----------------------------------------
Instead of writing:
score = score + 10
You can simply write:
score += 10
This makes programs shorter, cleaner, and easier to maintain.
----------------------------------------
Common Beginner Mistakes
----------------------------------------
Wrong:
x =+ 5
Correct:
x += 5
Remember:
=+ is not the same as +=.
----------------------------------------
Summary
----------------------------------------
= → Assign a value
+= → Add and assign
-= → Subtract and assign
*= → Multiply and assign
/= → Divide and assign
//= → Floor divide and assign
%= → Find remainder and assign
**= → Raise to power and assign
Assignment operators improve code readability and are commonly used in loops, counters, accumulators, mathematical computations, and real-world Python applications.`,
},

{
heading: "Identity Operators (is, is not)",
body: `Identity operators are used to check whether two variables refer to the same object in memory. Unlike comparison operators, which compare values, identity operators compare the memory location (identity) of objects. These operators are useful when working with objects, lists, dictionaries, classes, and checking for None. Python provides two identity operators:
is
is not
----------------------------------------
1. Identity Operator (is)
----------------------------------------
The is operator returns True if both variables refer to the exact same object in memory.
Syntax:
object1 is object2
Example:
a = [1, 2, 3]
b = a
print(a is b)
Output:
True
Explanation:
Both variables point to the same list object in memory.
Example:
x = 100
y = 100
print(x is y)
Output:
True
Note:
For small integers and some strings, Python may internally reuse objects (called interning), so the result may be True.
----------------------------------------
2. Identity Operator (is not)
----------------------------------------
The is not operator returns True if two variables refer to different objects.
Syntax:
object1 is not object2
Example:
a = [1, 2, 3]
b = [1, 2, 3]
print(a is not b)
Output:
True
Explanation:
Although both lists contain the same values, they are stored as different objects in memory.
----------------------------------------
Difference Between == and is
----------------------------------------
== compares values.
is compares memory locations.
Example:
a = [10, 20]
b = [10, 20]
print(a == b)
Output:
True
print(a is b)
Output:
False
Explanation:
The values are equal, but both lists are different objects.
Example:
a = [10, 20]
b = a
print(a == b)
Output:
True
print(a is b)
Output:
True
Explanation:
Both variables point to the same object.
----------------------------------------
Checking for None
----------------------------------------
The most common use of the is operator is checking whether a variable is None.
Example:
value = None
print(value is None)
Output:
True
Example:
name = "Python"
print(name is None)
Output:
False
Using is None is considered the Pythonic and recommended way instead of using == None.
Correct:
if value is None:
    print("No value found")
Avoid:
if value == None:
----------------------------------------
Real-World Examples
----------------------------------------
Checking Missing Data:
data = None
if data is None:
    print("Data not available")
Output:
Data not available
Object Reference:
list1 = [1, 2]
list2 = list1
print(list1 is list2)
Output:
True
Separate Objects:
list1 = [1, 2]
list2 = [1, 2]
print(list1 is list2)
Output:
False
----------------------------------------
Common Beginner Mistakes
----------------------------------------
Using is to compare values.
Wrong:
print(10 is 10)
Correct:
print(10 == 10)
Remember:
Use == for comparing values.
Use is for comparing object identity.
----------------------------------------
Summary
----------------------------------------
is → Returns True if two variables refer to the same object.
is not → Returns True if two variables refer to different objects.
== → Compares values.
is → Compares memory locations.
The most common real-world use of identity operators is checking whether a variable is None and determining whether two variables reference the same object in memory.`,
},

{
heading: "Membership Operators (in, not in)",
body: `Membership operators are used to check whether a value exists inside a collection such as a string, list, tuple, set, or dictionary. They return either True or False depending on whether the specified value is found. Membership operators are commonly used in searching, validation, filtering, authentication, and many real-world Python applications.
Python provides two membership operators:
in
not in
----------------------------------------
1. Membership Operator (in)
----------------------------------------
The in operator returns True if the specified value exists inside the collection.
Syntax:
value in collection
Example:
numbers = [10, 20, 30, 40]
print(20 in numbers)
Output:
True
Example:
fruits = ["Apple", "Banana", "Mango"]
print("Orange" in fruits)
Output:
False
----------------------------------------
2. Membership Operator (not in)
----------------------------------------
The not in operator returns True if the specified value does not exist inside the collection.
Syntax:
value not in collection
Example:
fruits = ["Apple", "Banana", "Mango"]
print("Orange" not in fruits)
Output:
True
Example:
numbers = [10, 20, 30]
print(20 not in numbers)
Output:
False
----------------------------------------
Membership in Strings
----------------------------------------
The in operator can search for characters or words inside a string.
Example:
language = "Python Programming"
print("Python" in language)
Output:
True
Example:
print("Java" in language)
Output:
False
Example:
print("Pro" in language)
Output:
True
Explanation:
Python checks whether the given substring exists inside the string.
----------------------------------------
Membership in Lists
----------------------------------------
Example:
colors = ["Red", "Green", "Blue"]
print("Green" in colors)
Output:
True
print("Yellow" in colors)
Output:
False
----------------------------------------
Membership in Tuples
----------------------------------------
Example:
numbers = (1, 2, 3, 4)
print(3 in numbers)
Output:
True
----------------------------------------
Membership in Sets
----------------------------------------
Sets are optimized for membership checking and are much faster than lists for large collections.
Example:
languages = {"Python", "Java", "C++"}
print("Python" in languages)
Output:
True
----------------------------------------
Membership in Dictionaries
----------------------------------------
When used with dictionaries, membership operators check only the keys, not the values.
Example:
student = {
    "name": "Rahul",
    "age": 21,
    "course": "Python"
}
print("name" in student)
Output:
True
Example:
print("Rahul" in student)
Output:
False
Explanation:
"Rahul" is a value, not a key.
To check values:
print("Rahul" in student.values())
Output:
True
----------------------------------------
Real-World Examples
----------------------------------------
Login Validation:
users = ["admin", "teacher", "student"]
username = "admin"
print(username in users)
Output:
True
Checking Allowed File Types:
allowed = ["jpg", "png", "gif"]
extension = "png"
print(extension in allowed)
Output:
True
Checking Blacklisted Words:
message = "Welcome to Python"
print("Python" in message)
Output:
True
Dictionary Example:
employee = {
    "id": 101,
    "name": "Alice"
}
print("salary" not in employee)
Output:
True
----------------------------------------
Case Sensitivity
----------------------------------------
Membership operators are case-sensitive.
Example:
print("python" in "Python")
Output:
False
Example:
print("Python" in "Python")
Output:
True
----------------------------------------
Common Beginner Mistakes
----------------------------------------
Remember that dictionary membership checks keys only.
Wrong:
student = {"name":"Rahul"}
print("Rahul" in student)
Output:
False
Correct:
print("Rahul" in student.values())
Output:
True
Another mistake is forgetting that membership is case-sensitive.
----------------------------------------
Summary
----------------------------------------
in → Returns True if a value exists in a collection.
not in → Returns True if a value does not exist in a collection.
Membership operators work with strings, lists, tuples, sets, dictionaries, and other iterable objects.
For dictionaries, membership checks keys by default.
These operators are widely used for searching, validation, authentication, filtering, and checking whether data exists before performing operations.`,
},
],           code: `# Arithmetic
x, y = 17, 5
print(x + y)     # 22 — addition
print(x - y)     # 12 — subtraction
print(x * y)     # 85 — multiplication
print(x / y)     # 3.4 — TRUE division (always float)
print(x // y)    # 3   — FLOOR division (rounds down)
print(x % y)     # 2   — modulo (remainder)
print(x ** y)    # 1419857 — power

# Useful math
import math
print(abs(-5))          # 5
print(round(3.7))       # 4
print(math.sqrt(16))    # 4.0
print(math.floor(3.9))  # 3
print(math.ceil(3.1))   # 4

# Floating point trap — every Python dev hits this
print(0.1 + 0.2)        # 0.30000000000000004 <- NOT 0.3!
print(round(0.1 + 0.2, 1))  # 0.3 — fixed`,
            resources: [
              { label: "Python Numbers (W3Schools)", url: "https://www.w3schools.com/python/python_numbers.asp", type: "article" },
            ],
          },
          {
           title: "Conditional Statements (if, elif, else)",
           type: "concept",
           detail: "Conditional statements allow your program to make decisions based on conditions. Python executes different blocks of code depending on whether a condition evaluates to True or False. Mastering if, elif, and else is essential for building interactive, intelligent, and real-world applications.",
           subsections: [
            {
heading: "Introduction to Conditional Statements",
body: `In programming, not every statement should execute every time. A program often needs to make decisions based on certain conditions. Conditional statements allow Python to choose different actions depending on whether a condition is True or False. They control the flow of execution and make programs intelligent, interactive, and capable of solving real-world problems.
Think of conditional statements as decision makers. Just like humans make decisions every day, a Python program also decides what to do based on specific conditions.
Example:
If it is raining,
take an umbrella.
Otherwise,
go without an umbrella.
Similarly, a Python program checks a condition and executes the appropriate block of code.
----------------------------------------
Why Do We Need Conditional Statements?
----------------------------------------
Without conditional statements, a program would execute every statement one after another without making any decisions.
Conditional statements help programs:
• Make decisions.
• Execute different code based on conditions.
• Validate user input.
• Handle errors.
• Build interactive applications.
• Automate real-world tasks.
----------------------------------------
How Conditional Statements Work
----------------------------------------
Every conditional statement evaluates a condition.
A condition always produces either:
True
or
False
If the condition is True,
Python executes the corresponding block of code.
If the condition is False,
Python either skips that block or executes another block if available.
Example:
Age = 20
Condition:
Age >= 18
Result:
True
Action:
Eligible to Vote
Another Example:
Age = 15
Condition:
Age >= 18
Result:
False
Action:
Not Eligible to Vote
----------------------------------------
Flow of Execution
----------------------------------------
Python reads code from top to bottom.
When it encounters a conditional statement, it first evaluates the condition.
If the condition is True,
the corresponding block executes.
Otherwise,
Python checks the next condition or continues with the remaining program.
----------------------------------------
Real-Life Examples
----------------------------------------
ATM Machine:
If balance is sufficient,
allow withdrawal.
Otherwise,
display "Insufficient Balance".
Login System:
If username and password are correct,
allow login.
Otherwise,
display "Invalid Credentials".
Online Shopping:
If total amount is greater than ₹1000,
provide free delivery.
Otherwise,
add delivery charges.
Weather App:
If temperature is below 20°C,
suggest wearing a jacket.
Otherwise,
display normal weather information.
----------------------------------------
Conditional Statements in Python
----------------------------------------
Python provides the following conditional statements:
• if
• if...else
• if...elif...else
• Nested if
• Shorthand if
• Shorthand if...else
These statements help create different execution paths depending on various conditions.
----------------------------------------
Indentation in Conditional Statements
----------------------------------------
Unlike many programming languages that use curly braces {}, Python uses indentation (spaces) to define blocks of code.
Correct Example:
if age >= 18:
    print("Eligible")
Incorrect Example:
if age >= 18:
print("Eligible")
This produces an IndentationError because Python requires proper indentation after every conditional statement.
The standard practice is to use four spaces for indentation.
----------------------------------------
Key Points
----------------------------------------
• Conditional statements help programs make decisions.
• Every condition evaluates to either True or False.
• Python executes code based on the result of the condition.
• Indentation is mandatory in Python.
• Conditional statements are used in almost every real-world Python application.
----------------------------------------
Summary
----------------------------------------
Conditional statements are one of the most important concepts in Python programming. They allow programs to think, make decisions, and perform different actions based on different situations. Almost every Python application, from simple calculators to Artificial Intelligence systems, uses conditional statements to control program execution. Understanding conditional statements is the foundation for building interactive, intelligent, and real-world software.`

            },

           ],
           code: `marks = 78

if marks >= 90:
    print("Grade: A — Outstanding!")
elif marks >= 80:
    print("Grade: B — Great work!")
elif marks >= 70:
    print("Grade: C — Good effort")  # ← This runs
else:
    print("Needs improvement")

# One-liner (ternary)
result = "Pass" if marks >= 50 else "Fail"
print(result)   # Pass

# Real-world pattern
age = 20
has_id = True
if age >= 18 and has_id:
    print("Entry allowed")
elif age >= 18:
    print("Need ID")
else:
    print("Too young")

# CHAINED comparisons — Python exclusive
x = 15
print(10 < x < 20)   # True — Java/C++ can't do this!`,
            resources: [
              { label: "Python If Else (Programiz)", url: "https://www.programiz.com/python-programming/if-elif-else", type: "article" },
              { label: "CS50P - Conditionals", url: "https://cs50.harvard.edu/python/2022/weeks/1/", type: "course" },
            ],
          },
          {
            title: "Loops — for & while",
            type: "concept",
            detail: "Python's for loop is actually a FOR-EACH — it works on ANY sequence. Use range() for number sequences. enumerate() when you need both index and value.",
            code: `# for loop — iterates over ANY iterable
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# range — generate numbers
for i in range(5):          # 0,1,2,3,4
    print(i, end=" ")

for i in range(1, 11):      # 1 to 10
    print(i, end=" ")

for i in range(0, 20, 5):   # 0,5,10,15
    print(i, end=" ")

for i in range(10, 0, -1):  # 10,9,8...1
    print(i, end=" ")

# enumerate — index + value together (USE THIS, not range(len()))
languages = ["Python", "Go", "Rust"]
for i, lang in enumerate(languages, start=1):
    print(f"{i}. {lang}")

# while loop
count = 0
while count < 5:
    print(count)
    count += 1          # MUST update or infinite loop!

# break and continue
for i in range(10):
    if i == 5: break    # stop entirely
    if i % 2 == 0: continue  # skip even
    print(i)            # prints 1, 3`,
            resources: [
              { label: "Python Loops (Real Python)", url: "https://realpython.com/python-for-loop/", type: "article" },
              { label: "Corey Schafer — Loops", url: "https://youtube.com/watch?v=6iF8Xb7Z3wQ", type: "video" },
            ],
          },
          {
            title: "Functions — Reusable Code",
            type: "concept",
            detail: "Functions are the single biggest tool for writing good code. Every time you copy-paste code, you should write a function instead.",
            code: `# Basic function
def greet(name):
    """Say hello to someone. (This is a docstring — always write these)"""
    return f"Hello, {name}!"

print(greet("Rahul"))   # Hello, Rahul!

# Default parameters
def introduce(name, role="Student", city="India"):
    print(f"{name} is a {role} from {city}")

introduce("Alice")                      # uses defaults
introduce("Bob", city="Bangalore")      # keyword arg

# Multiple return values (returns a tuple)
def stats(numbers):
    return min(numbers), max(numbers), sum(numbers)/len(numbers)

lo, hi, avg = stats([3, 1, 4, 1, 5, 9])
print(f"Min:{lo} Max:{hi} Avg:{avg:.2f}")

# *args — variable positional args
def add_all(*numbers):    # numbers becomes a tuple
    return sum(numbers)

print(add_all(1, 2, 3, 4, 5))   # 15

# **kwargs — variable keyword args
def show_info(**details):  # details becomes a dict
    for k, v in details.items():
        print(f"{k}: {v}")

show_info(name="Rahul", age=21, city="Hyderabad")

# Lambda — one-liner anonymous functions
square = lambda x: x**2
print(square(5))         # 25`,
            resources: [
              { label: "Python Functions (Real Python)", url: "https://realpython.com/defining-your-own-python-function/", type: "article" },
              { label: "Corey Schafer — Functions", url: "https://youtube.com/watch?v=9Os0o3wzS_I", type: "video" },
            ],
          },
        ],
      },
      {
        id: "l1-practice",
        title: "Level 1 Projects & Practice",
        emoji: "🏗️",
        why: "Building something real — even tiny — teaches 10x more than reading.",
        topics: [
          {
            title: "Project: Calculator",
            type: "project",
            detail: "Build a command-line calculator that handles add, subtract, multiply, divide, and handles division by zero gracefully.",
            code: `def calculator():
    print("=== Python Calculator ===")
    
    while True:
        print("\\n1. Add  2. Subtract  3. Multiply  4. Divide  5. Exit")
        choice = input("Choose: ")
        
        if choice == "5": break
        if choice not in "1234":
            print("Invalid choice!"); continue
        
        try:
            a = float(input("First number: "))
            b = float(input("Second number: "))
        except ValueError:
            print("Please enter valid numbers!"); continue
        
        if choice == "1": print(f"Result: {a + b}")
        elif choice == "2": print(f"Result: {a - b}")
        elif choice == "3": print(f"Result: {a * b}")
        elif choice == "4":
            if b == 0: print("Cannot divide by zero!")
            else: print(f"Result: {a / b:.4f}")

calculator()`,
            resources: [],
          },
          {
            title: "Project: Number Guessing Game",
            type: "project",
            detail: "Random number guessing game with hints (too high/low), limited attempts, and a play-again option.",
            code: `import random

def guessing_game():
    print("=== Number Guessing Game ===")
    
    while True:
        secret = random.randint(1, 100)
        attempts = 0
        max_attempts = 7
        
        print(f"\\nGuess a number 1–100. You have {max_attempts} tries!")
        
        while attempts < max_attempts:
            try:
                guess = int(input(f"Attempt {attempts+1}/{max_attempts}: "))
            except ValueError:
                print("Enter a valid number!"); continue
            
            attempts += 1
            
            if guess == secret:
                print(f"🎉 Correct in {attempts} attempts!")
                break
            elif guess < secret:
                remaining = max_attempts - attempts
                print(f"Too low! {remaining} attempts left.")
            else:
                remaining = max_attempts - attempts
                print(f"Too high! {remaining} attempts left.")
        else:
            print(f"Game over! The number was {secret}")
        
        again = input("\\nPlay again? (y/n): ")
        if again.lower() != 'y':
            print("Thanks for playing!")
            break

guessing_game()`,
            resources: [
              { label: "Beginner Python Projects", url: "https://realpython.com/python-beginner-projects/", type: "article" },
            ],
          },
          {
            title: "Practice: HackerRank Python 30 Days",
            type: "practice",
            detail: "Complete the first 10 days of HackerRank's 30 Days of Code in Python. Solves real problems with immediate feedback.",
            resources: [
              { label: "HackerRank 30 Days of Code", url: "https://hackerrank.com/domains/tutorials/30-days-of-code", type: "platform" },
              { label: "W3Schools Python Exercises", url: "https://www.w3schools.com/python/python_exercises.asp", type: "platform" },
            ],
          },
        ],
      },
    ],
    youtube: [
      { channel: "CS50P (Harvard)", url: "https://youtube.com/playlist?list=PLhQjrBD2T382_R182iC2gNZI9HzWFMC_8", note: "Best free Python course on the internet" },
      { channel: "Corey Schafer", url: "https://youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU", note: "Crisp, professional, no filler" },
      { channel: "Mosh Hamedani — Python for Beginners", url: "https://youtube.com/watch?v=_uQrJ0TkZlc", note: "6-hour full beginner course" },
    ],
    platforms: [
      { name: "HackerRank Python", url: "https://hackerrank.com/domains/python", note: "Structured exercises with grading" },
      { name: "W3Schools Python", url: "https://w3schools.com/python", note: "Quick reference and try-it-yourself" },
      { name: "Python Tutor (Visualizer)", url: "https://pythontutor.com", note: "See exactly how Python runs your code" },
    ],
  },

  // ─── LEVEL 2: CORE PYTHON ──────────────────────────────────────
  {
    level: 2,
    label: "Core Python",
    emoji: "🔥",
    tagline: "Data structures, OOP & the Python standard library",
    duration: "4–5 weeks",
    color: "blue",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    ring: "ring-blue-200",
    bar: "bg-blue-500",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    sections: [
      {
        id: "l2-ds",
        title: "Data Structures",
        emoji: "📊",
        why: "These 4 structures are the backbone of every Python program. Know them inside-out.",
        topics: [
          {
            title: "Lists — Ordered, Mutable",
            type: "concept",
            detail: "Python's most versatile structure. Ordered, mutable, allows duplicates, any types. Backed by a dynamic array internally.",
            code: `nums = [3, 1, 4, 1, 5, 9, 2, 6]

# Adding & removing
nums.append(7)          # Add to end O(1)
nums.insert(0, 0)       # Insert at index O(n)
nums.pop()              # Remove last O(1)
nums.pop(0)             # Remove at index O(n)
nums.remove(1)          # Remove first occurrence O(n)

# Sorting
nums.sort()             # In-place sort
nums.sort(reverse=True) # Descending
new = sorted(nums)      # Returns NEW sorted list

# Searching
print(5 in nums)        # True O(n)
print(nums.index(4))    # First index of 4
print(nums.count(1))    # Count occurrences

# Slicing
print(nums[1:4])        # Elements 1,2,3
print(nums[::-1])       # Reversed copy

# List comprehension — the Pythonic way
squares = [x**2 for x in range(1, 11)]
evens   = [x for x in range(20) if x % 2 == 0]
words   = ["hello", "world", "python"]
upper   = [w.upper() for w in words if len(w) > 4]

# Flatten 2D list
matrix = [[1,2,3],[4,5,6],[7,8,9]]
flat   = [n for row in matrix for n in row]`,
            resources: [
              { label: "Python Lists (Real Python)", url: "https://realpython.com/python-list/", type: "article" },
            ],
          },
          {
            title: "Dictionaries — Key-Value / O(1) Lookup",
            type: "concept",
            detail: "Python's most powerful structure. Hash table backed → O(1) average lookup. Python 3.7+ preserves insertion order.",
            code: `student = {"name": "Rahul", "age": 21, "gpa": 8.75}

# Safe access
print(student.get("phone", "N/A"))  # N/A — no KeyError

# Add / Update
student["college"] = "IIT Bombay"
student.update({"age": 22, "rank": 5})

# Remove
del student["rank"]
gpa = student.pop("gpa")   # Remove and return value

# Iteration
for key in student:             # Keys
    print(key)
for val in student.values():    # Values
    print(val)
for k, v in student.items():   # Both
    print(f"{k}: {v}")

# Dict comprehension
squares = {x: x**2 for x in range(1, 6)}
filtered = {k: v for k, v in squares.items() if v > 4}

# Word frequency — classic interview problem
text = "the cat sat on the mat the cat"
freq = {}
for word in text.split():
    freq[word] = freq.get(word, 0) + 1

# Shorter with Counter
from collections import Counter
freq2 = Counter(text.split())
print(freq2.most_common(3))`,
            resources: [
              { label: "Python Dictionaries (Real Python)", url: "https://realpython.com/python-dicts/", type: "article" },
            ],
          },
          {
            title: "Tuples & Sets",
            type: "concept",
            detail: "Tuples: immutable sequences, great for multiple return values and dict keys. Sets: unordered unique elements, O(1) membership testing.",
            code: `# ── TUPLES — immutable lists ───────────────────────────────────
coords = (10.5, 20.3)
rgb    = (255, 128, 0)
single = (42,)          # ← comma required for single element!

# Unpacking — most common tuple use
x, y = (10, 20)
a, b = b, a             # Swap!
first, *rest = (1, 2, 3, 4, 5)  # first=1, rest=[2,3,4,5]

# Multiple return values use tuples
def min_max(nums):
    return min(nums), max(nums)

lo, hi = min_max([3, 1, 4, 1, 5])

# ── SETS — unique elements, O(1) membership ──────────────────────
s1 = {1, 2, 3, 4, 5}
s2 = {4, 5, 6, 7, 8}

# Set operations
print(s1 | s2)   # Union:        {1,2,3,4,5,6,7,8}
print(s1 & s2)   # Intersection: {4, 5}
print(s1 - s2)   # Difference:   {1, 2, 3}
print(s1 ^ s2)   # Symmetric:    {1,2,3,6,7,8}

# Remove duplicates — classic use
data = [1, 3, 2, 3, 1, 4, 5, 4]
unique = list(set(data))        # Order NOT preserved

# Membership testing — O(1) vs list O(n)
big_set  = set(range(1000000))
999999 in big_set               # INSTANT
999999 in list(range(1000000))  # SLOW`,
            resources: [
              { label: "Python Sets (Real Python)", url: "https://realpython.com/python-sets/", type: "article" },
            ],
          },
        ],
      },
      {
        id: "l2-oop",
        title: "Object-Oriented Programming",
        emoji: "🏗️",
        why: "OOP is how you build big programs. Every Django model, FastAPI schema, and ML pipeline uses OOP.",
        topics: [
          {
            title: "Classes & Objects",
            type: "concept",
            detail: "A class is a blueprint. An object is the actual thing built from that blueprint. Python makes OOP much simpler than Java.",
            code: `class Student:
    """A student in our university."""
    
    # Class variable — shared by ALL instances
    school = "CSE Academy"
    count = 0
    
    def __init__(self, name, age, gpa):
        # Instance variables — unique to each object
        self.name = name
        self.age  = age
        self.gpa  = gpa
        self.courses = []
        Student.count += 1
    
    def introduce(self):
        return f"Hi, I'm {self.name}, GPA: {self.gpa}"
    
    def enroll(self, course):
        self.courses.append(course)
    
    def get_grade(self):
        if self.gpa >= 9: return "A+"
        if self.gpa >= 8: return "A"
        if self.gpa >= 7: return "B"
        return "C"
    
    @classmethod
    def get_count(cls):
        return f"Total students: {cls.count}"
    
    @staticmethod
    def valid_gpa(gpa):
        return 0.0 <= gpa <= 10.0
    
    def __repr__(self):
        return f"Student('{self.name}', {self.gpa})"
    
    def __str__(self):
        return f"{self.name} ({self.gpa})"

s1 = Student("Rahul", 21, 8.75)
s1.enroll("Data Structures")
print(s1.get_grade())       # A
print(Student.get_count())  # Total students: 1`,
            resources: [
              { label: "OOP in Python (Real Python)", url: "https://realpython.com/python3-object-oriented-programming/", type: "article" },
              { label: "Corey Schafer OOP Series", url: "https://youtube.com/watch?v=ZDa-Z5JzLYM", type: "video" },
            ],
          },
          {
            title: "Inheritance & Polymorphism",
            type: "concept",
            detail: "Inheritance = reuse parent code. Polymorphism = same method name, different behavior. These two together are why OOP exists.",
            code: `class Animal:
    def __init__(self, name, sound):
        self.name  = name
        self.sound = sound
    
    def speak(self):
        return f"{self.name} says {self.sound}"
    
    def __repr__(self):
        return f"{type(self).__name__}('{self.name}')"

class Dog(Animal):
    def __init__(self, name):
        super().__init__(name, "Woof")
    
    def fetch(self, item):
        return f"{self.name} fetches the {item}!"

class Cat(Animal):
    def __init__(self, name):
        super().__init__(name, "Meow")
    
    def speak(self):             # OVERRIDE parent method
        return f"{self.name} gracefully meows"

class GuideDog(Dog):            # Multi-level inheritance
    def __init__(self, name, owner):
        super().__init__(name)
        self.owner = owner
    
    def guide(self):
        return f"{self.name} guides {self.owner}"

# Polymorphism — same call, different behavior
animals = [Dog("Rex"), Cat("Whiskers"), Dog("Buddy")]
for animal in animals:
    print(animal.speak())  # Each calls its OWN speak()

print(isinstance(GuideDog("Max", "Alice"), Dog))    # True
print(isinstance(GuideDog("Max", "Alice"), Animal)) # True`,
            resources: [
              { label: "Python Inheritance (Programiz)", url: "https://www.programiz.com/python-programming/inheritance", type: "article" },
            ],
          },
          {
            title: "Properties & Encapsulation",
            type: "concept",
            detail: "@property makes attributes smart — run logic when getting or setting. This is Python's version of getters/setters, but much cleaner.",
            code: `class BankAccount:
    def __init__(self, owner, balance):
        self.owner    = owner       # Public
        self._name    = "PyBank"    # Protected (convention only)
        self.__balance = balance    # Private (name-mangled)
    
    @property
    def balance(self):              # Getter
        return self.__balance
    
    @balance.setter
    def balance(self, amount):      # Setter with validation
        if amount < 0:
            raise ValueError("Balance cannot be negative")
        self.__balance = amount
    
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self.__balance += amount
        return f"Deposited ₹{amount}. Balance: ₹{self.__balance}"
    
    def withdraw(self, amount):
        if amount > self.__balance:
            raise ValueError("Insufficient funds")
        self.__balance -= amount
        return f"Withdrawn ₹{amount}. Balance: ₹{self.__balance}"

acc = BankAccount("Rahul", 10000)
print(acc.deposit(5000))       # Clean method call
print(acc.balance)             # Uses @property getter
acc.balance = 20000            # Uses @property setter
# acc.__balance                # AttributeError — private!`,
            resources: [
              { label: "Python Properties (Real Python)", url: "https://realpython.com/python-property/", type: "article" },
            ],
          },
        ],
      },
      {
        id: "l2-stdlib",
        title: "Standard Library Must-Knows",
        emoji: "📚",
        why: "Python's standard library means you rarely need external packages for common tasks.",
        topics: [
          {
            title: "os & pathlib — File System",
            type: "concept",
            detail: "pathlib is the modern way to handle file paths — use it over os.path. os handles environment, processes, and directory operations.",
            code: `from pathlib import Path
import os

# pathlib — modern, Pythonic
p = Path("data") / "students" / "records.csv"
print(p)             # data/students/records.csv

# Create, check, read
Path("logs").mkdir(exist_ok=True)      # Create dir
print(Path("file.txt").exists())       # Check exists
content = Path("file.txt").read_text() # Read entire file
Path("out.txt").write_text("Hello!")   # Write file

# List files
for f in Path(".").glob("*.py"):       # All Python files
    print(f.name, f.stat().st_size)

# os — environment and system
print(os.getcwd())                     # Current directory
print(os.environ.get("HOME"))          # Environment variable
os.rename("old.txt", "new.txt")        # Rename file
os.remove("temp.txt")                  # Delete file`,
            resources: [
              { label: "pathlib (Real Python)", url: "https://realpython.com/python-pathlib/", type: "article" },
            ],
          },
          {
            title: "datetime — Dates & Times",
            type: "concept",
            detail: "Every real app deals with dates. Master strftime/strptime for formatting, and timedelta for date arithmetic.",
            code: `from datetime import datetime, date, timedelta

now   = datetime.now()
today = date.today()

print(now)                          # 2025-01-15 14:30:45
print(now.year, now.month, now.day) # 2025 1 15

# Formatting
print(now.strftime("%d %B %Y"))     # 15 January 2025
print(now.strftime("%I:%M %p"))     # 02:30 PM

# Parsing
dt = datetime.strptime("25/12/2025", "%d/%m/%Y")
print(dt)                           # 2025-12-25

# Arithmetic
tomorrow    = today + timedelta(days=1)
next_week   = today + timedelta(weeks=1)
three_hours = now  + timedelta(hours=3)
days_diff   = (date(2026, 1, 1) - today).days
print(f"Days until 2026: {days_diff}")`,
            resources: [
              { label: "Python datetime (Real Python)", url: "https://realpython.com/python-datetime/", type: "article" },
            ],
          },
          {
            title: "collections — Power Containers",
            type: "concept",
            detail: "Counter, defaultdict, deque — these three solve problems that would otherwise need 10+ lines of code in a single line.",
            code: `from collections import Counter, defaultdict, deque, namedtuple

# Counter — count anything
words = "the cat sat on the mat the cat".split()
c = Counter(words)
print(c)                        # Counter({'the':3,'cat':2,...})
print(c.most_common(2))         # [('the',3),('cat',2)]

# defaultdict — no KeyError on missing keys
groups = defaultdict(list)
students = [("Alice","A"),("Bob","B"),("Charlie","A")]
for name, grade in students:
    groups[grade].append(name)
print(dict(groups))             # {'A':['Alice','Charlie'],'B':['Bob']}

# deque — O(1) from both ends
dq = deque([1, 2, 3])
dq.appendleft(0)                # [0,1,2,3]
dq.append(4)                    # [0,1,2,3,4]
dq.popleft()                    # O(1) — list.pop(0) is O(n)!
dq.rotate(1)                    # [4,1,2,3]

# namedtuple — structured data without a class
Point   = namedtuple("Point",   ["x","y"])
Student = namedtuple("Student", ["name","gpa","year"])

p = Point(10, 20)
s = Student("Rahul", 8.75, 3)
print(p.x, p.y)     # 10 20 — named access
print(s.name)       # Rahul`,
            resources: [
              { label: "Python collections module", url: "https://realpython.com/python-collections-module/", type: "article" },
            ],
          },
        ],
      },
      {
        id: "l2-errors",
        title: "Error Handling & File I/O",
        emoji: "🛡️",
        why: "Production code fails. Handling errors gracefully is what separates amateur from professional code.",
        topics: [
          {
            title: "Exception Handling",
            type: "concept",
            detail: "try/except/else/finally — Python's error handling is more expressive than most languages. Create custom exceptions for domain-specific errors.",
            code: `# Basic try-except
try:
    result = 100 / int(input("Enter a number: "))
    print(f"Result: {result}")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except ValueError:
    print("Please enter a valid integer!")
except Exception as e:
    print(f"Unexpected error: {e}")
else:
    print("Success!")    # Runs ONLY if no exception
finally:
    print("Always runs") # Runs ALWAYS (cleanup here)

# Custom exceptions
class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount  = amount
        super().__init__(f"Need ₹{amount}, have ₹{balance}")

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(balance, amount)
    return balance - amount

try:
    withdraw(500, 1000)
except InsufficientFundsError as e:
    print(f"Failed: {e}")
    print(f"Short by: ₹{e.amount - e.balance}")`,
            resources: [
              { label: "Python Exceptions (Real Python)", url: "https://realpython.com/python-exceptions/", type: "article" },
            ],
          },
          {
            title: "File Reading & Writing",
            type: "concept",
            detail: "ALWAYS use 'with' for files — it automatically closes them even if an exception occurs. Never call file.close() manually.",
            code: `# Writing
with open("output.txt", "w") as f:
    f.write("Line 1\\n")
    f.writelines(["Line 2\\n", "Line 3\\n"])

# Reading
with open("output.txt", "r") as f:
    content = f.read()            # Entire file as string
    
with open("output.txt", "r") as f:
    for line in f:                # Line by line (memory efficient)
        print(line.strip())

# CSV files
import csv

# Write CSV
students = [["Name","GPA"],["Alice",8.75],["Bob",7.5]]
with open("students.csv","w",newline="") as f:
    csv.writer(f).writerows(students)

# Read CSV as dicts
with open("students.csv","r") as f:
    for row in csv.DictReader(f):
        print(f"{row['Name']}: {row['GPA']}")

# JSON
import json

data = {"name":"Rahul","skills":["Python","SQL"],"gpa":8.75}
json.dump(data, open("data.json","w"), indent=2)  # Write
loaded = json.load(open("data.json","r"))         # Read
print(json.dumps(data))                           # To string`,
            resources: [
              { label: "File I/O (Real Python)", url: "https://realpython.com/read-write-files-python/", type: "article" },
            ],
          },
        ],
      },
      {
        id: "l2-projects",
        title: "Level 2 Projects",
        emoji: "🚀",
        why: "These projects use all of Level 2 and will be portfolio-worthy.",
        topics: [
          {
            title: "Project: Student Grade Manager",
            type: "project",
            detail: "A full OOP-based grade manager with file persistence (JSON), class operations, and a CLI menu.",
            code: `import json
from pathlib import Path

class Student:
    def __init__(self, name, roll):
        self.name   = name
        self.roll   = roll
        self.grades = {}
    
    def add_grade(self, subject, marks):
        self.grades[subject] = marks
    
    @property
    def gpa(self):
        if not self.grades: return 0
        return sum(self.grades.values()) / len(self.grades)
    
    def to_dict(self):
        return {"name":self.name,"roll":self.roll,"grades":self.grades}
    
    @classmethod
    def from_dict(cls, d):
        s = cls(d["name"], d["roll"])
        s.grades = d["grades"]
        return s

class GradeManager:
    FILE = Path("students.json")
    
    def __init__(self):
        self.students = {}
        self.load()
    
    def add(self, name, roll):
        self.students[roll] = Student(name, roll)
        self.save()
        print(f"Added: {name}")
    
    def grade(self, roll, subject, marks):
        if roll not in self.students:
            print("Student not found!"); return
        self.students[roll].add_grade(subject, marks)
        self.save()
    
    def report(self):
        if not self.students:
            print("No students yet."); return
        print(f"\\n{'Name':<15}{'Roll':<8}{'GPA':<8}")
        print("-" * 31)
        for s in sorted(self.students.values(), key=lambda x: -x.gpa):
            print(f"{s.name:<15}{s.roll:<8}{s.gpa:<8.2f}")
    
    def save(self):
        data = [s.to_dict() for s in self.students.values()]
        self.FILE.write_text(json.dumps(data, indent=2))
    
    def load(self):
        if self.FILE.exists():
            for d in json.loads(self.FILE.read_text()):
                s = Student.from_dict(d)
                self.students[s.roll] = s

mgr = GradeManager()
mgr.add("Alice", "R001"); mgr.grade("R001","Python",92)
mgr.add("Bob",   "R002"); mgr.grade("R002","Python",78)
mgr.report()`,
            resources: [],
          },
        ],
      },
    ],
    youtube: [
      { channel: "Corey Schafer — OOP Series", url: "https://youtube.com/playlist?list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc", note: "Best OOP tutorial for Python" },
      { channel: "Tech With Tim — Intermediate Python", url: "https://youtube.com/watch?v=HGOBQPFzWKo", note: "Goes deep on all core concepts" },
      { channel: "ArjanCodes — Pythonic Patterns", url: "https://youtube.com/c/ArjanCodes", note: "Professional Python code style" },
    ],
    platforms: [
      { name: "LeetCode Python Track", url: "https://leetcode.com/problemset/?topicSlugs=python", note: "Apply data structures to problems" },
      { name: "Exercism Python", url: "https://exercism.org/tracks/python", note: "Mentor-reviewed exercises" },
      { name: "PyBites", url: "https://codechalleng.es", note: "Python-specific bite-sized challenges" },
    ],
  },

  // ─── LEVEL 3: INTERMEDIATE ─────────────────────────────────────
  {
    level: 3,
    label: "Intermediate",
    emoji: "⚡",
    tagline: "Advanced features, APIs, databases & testing",
    duration: "4–6 weeks",
    color: "violet",
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
    ring: "ring-violet-200",
    bar: "bg-violet-500",
    badge: "bg-violet-100 text-violet-700 border-violet-200",
    sections: [
      {
        id: "l3-advanced",
        title: "Advanced Python Features",
        emoji: "🧙",
        why: "These features separate Python beginners from Python professionals.",
        topics: [
          {
            title: "Generators & Iterators",
            type: "concept",
            detail: "Generators produce values LAZILY — one at a time. They use O(1) memory regardless of sequence size. Critical for processing large datasets.",
            code: `# Generator function — uses yield
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
print([next(fib) for _ in range(10)])  # [0,1,1,2,3,5,8,13,21,34]

# Generator expression (like list comp but lazy)
squares_gen  = (x**2 for x in range(1_000_000))  # tiny memory!
squares_list = [x**2 for x in range(1_000_000)]  # 8MB memory!

total = sum(x**2 for x in range(1000))  # no intermediate list!

# yield from — delegate to sub-generator
def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

deep = [1, [2, 3, [4, 5]], [6, [7, [8]]]]
print(list(flatten(deep)))   # [1,2,3,4,5,6,7,8]

# File processing without loading into memory
def read_chunks(filename, size=8192):
    with open(filename, "rb") as f:
        while chunk := f.read(size):
            yield chunk`,
            resources: [
              { label: "Generators (Real Python)", url: "https://realpython.com/introduction-to-python-generators/", type: "article" },
            ],
          },
          {
            title: "Decorators",
            type: "concept",
            detail: "Decorators add behavior to functions without modifying them. Used everywhere in Django, FastAPI, Flask, pytest.",
            code: `from functools import wraps
import time

# Basic decorator
def timer(func):
    @wraps(func)   # Preserves __name__, __doc__
    def wrapper(*args, **kwargs):
        start  = time.perf_counter()
        result = func(*args, **kwargs)
        end    = time.perf_counter()
        print(f"{func.__name__} took {end-start:.4f}s")
        return result
    return wrapper

@timer
def slow_sort(lst):
    return sorted(lst)

result = slow_sort(list(range(100000, 0, -1)))

# Decorator with arguments
def retry(max_attempts=3, delay=1.0):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    print(f"Attempt {attempt+1} failed: {e}. Retrying...")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.5)
def fetch_data(url):
    # Simulate network call that might fail
    import random
    if random.random() < 0.7:
        raise ConnectionError("Network error")
    return "data"`,
            resources: [
              { label: "Decorators (Real Python)", url: "https://realpython.com/primer-on-python-decorators/", type: "article" },
              { label: "ArjanCodes Decorators", url: "https://youtube.com/watch?v=QH5fw9kxDQA", type: "video" },
            ],
          },
          {
            title: "Context Managers",
            type: "concept",
            detail: "The 'with' statement manages resources cleanly. Write your own with __enter__/__exit__ or @contextmanager for elegant resource management.",
            code: `from contextlib import contextmanager
import time

# Custom context manager — class based
class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self
    
    def __exit__(self, *args):
        self.elapsed = time.perf_counter() - self.start
        print(f"Elapsed: {self.elapsed:.4f}s")
        return False   # Don't suppress exceptions

with Timer() as t:
    total = sum(range(1_000_000))
print(f"Sum: {total}")

# Using @contextmanager (simpler)
@contextmanager
def database_transaction(db):
    try:
        db.begin()
        yield db
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()

# Multiple context managers
with open("in.txt") as src, open("out.txt","w") as dst:
    dst.write(src.read().upper())`,
            resources: [
              { label: "Context Managers (Real Python)", url: "https://realpython.com/python-with-statement/", type: "article" },
            ],
          },
          {
            title: "Type Hints & Dataclasses",
            type: "concept",
            detail: "Type hints are now standard in all professional Python. dataclasses auto-generate __init__, __repr__, __eq__ — use them instead of manual classes for data containers.",
            code: `from typing import Optional, Union
from dataclasses import dataclass, field

# Type hints — Python 3.10+ syntax
def greet(name: str, times: int = 1) -> str:
    return (f"Hello, {name}! " * times).strip()

def find_user(user_id: int) -> Optional[str]:
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)   # Returns str or None

def process(value: int | str) -> str:  # Union type
    return str(value)

# Dataclass — auto-generates boilerplate
@dataclass
class Student:
    name:    str
    age:     int
    gpa:     float = 0.0
    courses: list  = field(default_factory=list)
    
    def grade(self) -> str:
        return "A" if self.gpa >= 8 else "B"

s1 = Student("Rahul", 21, 8.75)
s2 = Student("Priya", 20, 9.1)

print(s1)              # Student(name='Rahul', age=21, gpa=8.75, courses=[])
print(s1 == s1)        # True — auto __eq__
print(s1.grade())      # A

# Frozen dataclass — immutable
from dataclasses import dataclass
@dataclass(frozen=True)
class Point:
    x: float
    y: float

p = Point(3.0, 4.0)
# p.x = 5   # FrozenInstanceError!`,
            resources: [
              { label: "Python Type Checking (Real Python)", url: "https://realpython.com/python-type-checking/", type: "article" },
              { label: "Dataclasses Guide", url: "https://realpython.com/python-data-classes/", type: "article" },
            ],
          },
        ],
      },
      {
        id: "l3-web",
        title: "Web APIs with FastAPI",
        emoji: "🌐",
        why: "FastAPI is the most modern Python web framework — async, typed, auto-documented. Used at Uber, Netflix, Microsoft.",
        topics: [
          {
            title: "FastAPI Fundamentals",
            type: "concept",
            detail: "FastAPI auto-generates Swagger docs, validates requests using Pydantic, and is async by design. Start here for any backend Python project.",
            code: `# pip install fastapi uvicorn[standard]
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="Student API", version="1.0")

# Pydantic model — auto validates incoming data
class StudentCreate(BaseModel):
    name:  str
    age:   int
    gpa:   float
    email: Optional[str] = None

class Student(StudentCreate):
    id: int

# In-memory DB (use PostgreSQL in production)
db: dict[int, Student] = {}
counter = 0

@app.get("/")
def root():
    return {"message": "Student API is running"}

@app.post("/students", response_model=Student, status_code=201)
def create_student(data: StudentCreate):
    global counter
    counter += 1
    student = Student(id=counter, **data.model_dump())
    db[counter] = student
    return student

@app.get("/students/{student_id}", response_model=Student)
def get_student(student_id: int):
    if student_id not in db:
        raise HTTPException(404, detail="Student not found")
    return db[student_id]

@app.get("/students", response_model=list[Student])
def list_students(skip: int = 0, limit: int = 10):
    students = list(db.values())
    return students[skip : skip + limit]

# Run with: uvicorn main:app --reload
# Docs at:  http://localhost:8000/docs`,
            resources: [
              { label: "FastAPI Official Tutorial", url: "https://fastapi.tiangolo.com/tutorial/", type: "official" },
              { label: "Bitfumes FastAPI Course", url: "https://youtube.com/watch?v=7t2alSnE2-I", type: "video" },
            ],
          },
          {
            title: "Databases with SQLAlchemy",
            type: "concept",
            detail: "SQLAlchemy ORM lets you work with databases using Python classes. Never write raw SQL in your application code.",
            code: `# pip install sqlalchemy alembic
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

DATABASE_URL = "sqlite:///./students.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

class Base(DeclarativeBase): pass

class Student(Base):
    __tablename__ = "students"
    
    id    = Column(Integer, primary_key=True, index=True)
    name  = Column(String(100), nullable=False)
    email = Column(String(100), unique=True)
    gpa   = Column(Float, default=0.0)

# Create tables
Base.metadata.create_all(engine)

# CRUD operations
def create_student(name: str, email: str, gpa: float):
    with SessionLocal() as db:
        student = Student(name=name, email=email, gpa=gpa)
        db.add(student)
        db.commit()
        db.refresh(student)
        return student

def get_all_students():
    with SessionLocal() as db:
        return db.query(Student).all()

def update_gpa(student_id: int, new_gpa: float):
    with SessionLocal() as db:
        student = db.get(Student, student_id)
        if student:
            student.gpa = new_gpa
            db.commit()`,
            resources: [
              { label: "SQLAlchemy ORM Tutorial", url: "https://docs.sqlalchemy.org/en/20/orm/quickstart.html", type: "official" },
            ],
          },
        ],
      },
      {
        id: "l3-testing",
        title: "Testing with pytest",
        emoji: "🧪",
        why: "Untested code is broken code you haven't found yet. pytest is the industry standard for Python testing.",
        topics: [
          {
            title: "pytest — Test Your Code",
            type: "concept",
            detail: "Write tests BEFORE you think you're done. pytest discovers and runs all files starting with test_. Use fixtures for setup/teardown.",
            code: `# pip install pytest pytest-cov

# calculator.py
def add(a, b): return a + b
def divide(a, b):
    if b == 0: raise ZeroDivisionError("Cannot divide by zero")
    return a / b

# test_calculator.py
import pytest
from calculator import add, divide

# Basic tests — function names MUST start with test_
def test_add_positive():
    assert add(3, 4) == 7

def test_add_negative():
    assert add(-1, -1) == -2

def test_add_floats():
    assert add(0.1, 0.2) == pytest.approx(0.3)

def test_divide_normal():
    assert divide(10, 2) == 5.0

def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

# Parametrize — test many inputs at once
@pytest.mark.parametrize("a,b,expected", [
    (3, 4, 7),
    (-1, 1, 0),
    (0, 0, 0),
    (100, -50, 50),
])
def test_add_parametrized(a, b, expected):
    assert add(a, b) == expected

# Run: pytest test_calculator.py -v
# Coverage: pytest --cov=calculator --cov-report=html`,
            resources: [
              { label: "pytest Official Docs", url: "https://docs.pytest.org/en/stable/", type: "official" },
              { label: "Testing in Python (Real Python)", url: "https://realpython.com/pytest-python-testing/", type: "article" },
            ],
          },
        ],
      },
    ],
    youtube: [
      { channel: "ArjanCodes — Advanced Python", url: "https://youtube.com/c/ArjanCodes", note: "Best channel for professional Python patterns" },
      { channel: "Tech With Tim — FastAPI", url: "https://youtube.com/watch?v=iWS9ogMPOI0", note: "FastAPI project from scratch" },
      { channel: "Patrick Loeber — Python Pro Tips", url: "https://youtube.com/c/PythonEngineer", note: "Intermediate to advanced concepts" },
    ],
    platforms: [
      { name: "LeetCode — Medium Problems", url: "https://leetcode.com/problemset/?difficulty=MEDIUM", note: "50 mediums to solidify DSA in Python" },
      { name: "FastAPI Official Tutorial", url: "https://fastapi.tiangolo.com/tutorial/", note: "Best API framework tutorial" },
      { name: "TestDriven.io", url: "https://testdriven.io", note: "FastAPI + Docker + testing projects" },
    ],
  },

  // ─── LEVEL 4: ADVANCED ─────────────────────────────────────────
  {
    level: 4,
    label: "Advanced",
    emoji: "🏆",
    tagline: "AI/ML, async, performance & system design",
    duration: "6–8 weeks",
    color: "orange",
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    ring: "ring-orange-200",
    bar: "bg-orange-500",
    badge: "bg-orange-100 text-orange-700 border-orange-200",
    sections: [
      {
        id: "l4-ml",
        title: "Python for AI & Machine Learning",
        emoji: "🤖",
        why: "Python owns the AI/ML space. NumPy, Pandas, scikit-learn, PyTorch — all Python. This is why Python matters in 2025.",
        topics: [
          {
            title: "NumPy — Numerical Computing",
            type: "concept",
            detail: "NumPy arrays are 100x faster than Python lists for numerical operations. Every ML library uses NumPy arrays internally.",
            code: `import numpy as np

# Creating arrays
a = np.array([1, 2, 3, 4, 5])
b = np.zeros((3, 4))          # 3x4 of zeros
c = np.ones((2, 3))           # 2x3 of ones
d = np.arange(0, 20, 2)       # [0,2,4,...,18]
e = np.linspace(0, 1, 5)      # 5 evenly spaced: [0,.25,.5,.75,1]
r = np.random.randn(3, 3)     # 3x3 random normal

# Vectorized operations — no loops needed!
x = np.array([1, 2, 3, 4, 5])
print(x * 2)         # [2 4 6 8 10]
print(x ** 2)        # [1 4 9 16 25]
print(x + x)         # [2 4 6 8 10]
print(np.sqrt(x))    # [1. 1.41 1.73 2. 2.24]

# Aggregations
print(x.mean(), x.std(), x.sum(), x.max(), x.min())

# Reshape and indexing
m = np.arange(12).reshape(3, 4)
print(m[1, :])        # Second row
print(m[:, 2])        # Third column
print(m[0:2, 1:3])   # Submatrix

# Boolean indexing
data = np.array([1, -2, 3, -4, 5])
print(data[data > 0])  # [1 3 5] — only positives

# Matrix operations
A = np.random.rand(3, 3)
B = np.random.rand(3, 3)
print(A @ B)          # Matrix multiply
print(np.linalg.inv(A))  # Inverse
print(np.linalg.det(A))  # Determinant`,
            resources: [
              { label: "NumPy Quickstart", url: "https://numpy.org/doc/stable/user/quickstart.html", type: "official" },
              { label: "NumPy Tutorial (Real Python)", url: "https://realpython.com/numpy-tutorial/", type: "article" },
            ],
          },
          {
            title: "Pandas — Data Analysis",
            type: "concept",
            detail: "Pandas is the Excel of Python — but 1000x more powerful. Every data scientist uses it daily.",
            code: `import pandas as pd

# Creating DataFrames
df = pd.DataFrame({
    "name":   ["Alice","Bob","Charlie","Dave","Eve"],
    "score":  [92, 78, 88, 65, 95],
    "grade":  ["A","B","A","C","A"],
    "city":   ["Bangalore","Mumbai","Delhi","Hyderabad","Chennai"],
})

# Exploration
print(df.head())           # First 5 rows
print(df.info())           # Data types and nulls
print(df.describe())       # Statistics summary

# Selection
print(df["name"])          # Single column (Series)
print(df[["name","score"]]) # Multiple columns
print(df[df["score"] > 80]) # Filter rows
print(df.query("grade == 'A' and score > 85"))  # SQL-like

# Operations
df["grade_num"] = df["score"].apply(lambda x: 4 if x>=90 else 3 if x>=80 else 2)
df_sorted = df.sort_values("score", ascending=False)
by_grade   = df.groupby("grade")["score"].mean()

# Handling missing data
df2 = pd.read_csv("students.csv")
print(df2.isnull().sum())      # Count nulls per column
df2.fillna(0, inplace=True)    # Fill nulls with 0
df2.dropna(inplace=True)       # Drop rows with any null

# Merging DataFrames (SQL JOIN equivalent)
courses = pd.DataFrame({"name":["Alice","Bob"],"course":["ML","Web"]})
merged = pd.merge(df, courses, on="name", how="left")`,
            resources: [
              { label: "Pandas Official Tutorial", url: "https://pandas.pydata.org/docs/getting_started/intro_tutorials/", type: "official" },
              { label: "Kaggle Pandas Course", url: "https://kaggle.com/learn/pandas", type: "course" },
            ],
          },
          {
            title: "Machine Learning with scikit-learn",
            type: "concept",
            detail: "scikit-learn is the go-to ML library. Consistent API across all models: fit → predict → score. Master this before PyTorch.",
            code: `from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import numpy as np

# Simulate dataset (use real CSV in practice)
np.random.seed(42)
X = np.random.randn(200, 4)           # 200 samples, 4 features
y = (X[:, 0] + X[:, 1] > 0).astype(int)  # Binary labels

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Preprocess — always scale numerical features!
scaler  = StandardScaler()
X_train = scaler.fit_transform(X_train)  # fit + transform
X_test  = scaler.transform(X_test)       # only transform!

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
preds = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, preds):.3f}")
print(classification_report(y_test, preds))

# Cross-validation (better than single split)
cv_scores = cross_val_score(model, X, y, cv=5)
print(f"CV: {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")

# Feature importance
importance = model.feature_importances_
print("Feature importances:", importance)`,
            resources: [
              { label: "scikit-learn User Guide", url: "https://scikit-learn.org/stable/user_guide.html", type: "official" },
              { label: "Kaggle ML Course", url: "https://kaggle.com/learn/intro-to-machine-learning", type: "course" },
            ],
          },
        ],
      },
      {
        id: "l4-async",
        title: "Async Python",
        emoji: "⚡",
        why: "Async is essential for high-performance servers, web scraping, and AI APIs that call external services concurrently.",
        topics: [
          {
            title: "asyncio & async/await",
            type: "concept",
            detail: "async/await lets Python do multiple I/O operations concurrently without threads. One thread, many tasks. Essential for FastAPI, web scraping, and API clients.",
            code: `import asyncio
import aiohttp   # pip install aiohttp
import time

# Basic async function
async def fetch(session, url):
    async with session.get(url) as response:
        return await response.json()

# Sequential — SLOW (each waits for previous)
async def fetch_sequential(urls):
    results = []
    async with aiohttp.ClientSession() as session:
        for url in urls:
            results.append(await fetch(session, url))
    return results

# Concurrent — FAST (all start at once!)
async def fetch_concurrent(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        return await asyncio.gather(*tasks)

# Compare speeds
async def main():
    urls = [f"https://jsonplaceholder.typicode.com/posts/{i}" for i in range(1, 6)]
    
    start = time.time()
    await fetch_sequential(urls)
    print(f"Sequential: {time.time()-start:.2f}s")
    
    start = time.time()
    await fetch_concurrent(urls)
    print(f"Concurrent: {time.time()-start:.2f}s")  # ~5x faster!

asyncio.run(main())

# FastAPI is async too!
from fastapi import FastAPI
app = FastAPI()

@app.get("/slow")
async def slow_endpoint():
    await asyncio.sleep(1)   # Non-blocking sleep
    return {"status": "done"}`,
            resources: [
              { label: "asyncio (Real Python)", url: "https://realpython.com/async-io-python/", type: "article" },
              { label: "AsyncIO Tutorial", url: "https://youtube.com/watch?v=t5Bo1Je9EmE", type: "video" },
            ],
          },
        ],
      },
    ],
    youtube: [
      { channel: "Sentdex — ML with Python", url: "https://youtube.com/c/sentdex", note: "Practical ML projects from scratch" },
      { channel: "Andrej Karpathy — Neural Nets", url: "https://youtube.com/watch?v=VMj-3S1tku0", note: "Best explanation of neural networks" },
      { channel: "Tech With Tim — Async Python", url: "https://youtube.com/watch?v=t5Bo1Je9EmE", note: "asyncio deep dive" },
    ],
    platforms: [
      { name: "Kaggle Learn", url: "https://kaggle.com/learn", note: "Free ML courses with notebooks" },
      { name: "fast.ai", url: "https://fast.ai", note: "Top-down deep learning in Python" },
      { name: "LeetCode Hard", url: "https://leetcode.com/problemset/?difficulty=HARD", note: "25 hards to reach FAANG level" },
    ],
  },

  // ─── LEVEL 5: EXPERT ───────────────────────────────────────────
  {
    level: 5,
    label: "Expert / Pro",
    emoji: "🚀",
    tagline: "LLMs, MLOps, system design & getting hired",
    duration: "Ongoing",
    color: "pink",
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-700",
    ring: "ring-pink-200",
    bar: "bg-pink-500",
    badge: "bg-pink-100 text-pink-700 border-pink-200",
    sections: [
      {
        id: "l5-llm",
        title: "LLMs & RAG Systems",
        emoji: "🧠",
        why: "Building with LLMs is the hottest Python skill in 2025. Every AI startup is hiring Python devs who can build RAG systems.",
        topics: [
          {
            title: "LangChain & RAG Pipeline",
            type: "concept",
            detail: "RAG = Retrieval Augmented Generation. LLM + your own data. The pattern behind every AI chatbot that knows your company's docs.",
            code: `# pip install langchain langchain-google-genai chromadb
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.schema import Document

# 1. Load & chunk documents
def load_documents(texts: list[str]) -> list[Document]:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000, chunk_overlap=200
    )
    docs = [Document(page_content=t) for t in texts]
    return splitter.split_documents(docs)

# 2. Create vector store
def build_vectorstore(docs):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    return Chroma.from_documents(docs, embeddings)

# 3. Build RAG chain
def build_rag(vectorstore):
    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
    return RetrievalQA.from_chain_type(
        llm=llm, retriever=retriever, return_source_documents=True
    )

# 4. Query
texts = [
    "Python was created by Guido van Rossum in 1991...",
    "FastAPI is a modern web framework for Python...",
    "Machine learning is a subset of AI...",
]
docs   = load_documents(texts)
store  = build_vectorstore(docs)
chain  = build_rag(store)
result = chain.invoke("Who created Python?")
print(result["result"])`,
            resources: [
              { label: "LangChain Docs", url: "https://python.langchain.com/docs/introduction/", type: "official" },
              { label: "Build RAG App", url: "https://youtube.com/watch?v=tcqEUSNCn8I", type: "video" },
            ],
          },
          {
            title: "MLOps — Deploy ML Models",
            type: "concept",
            detail: "Building a model is 20% of the work. Deploying, monitoring, and updating it is the other 80%. MLflow + FastAPI + Docker.",
            code: `# pip install mlflow fastapi uvicorn joblib scikit-learn
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

# 1. Train with MLflow tracking
mlflow.set_experiment("iris-classification")

with mlflow.start_run():
    X, y = load_iris(return_X_y=True)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    n_estimators = 100
    mlflow.log_param("n_estimators", n_estimators)
    
    model = RandomForestClassifier(n_estimators=n_estimators)
    model.fit(X_train, y_train)
    
    accuracy = model.score(X_test, y_test)
    mlflow.log_metric("accuracy", accuracy)
    mlflow.sklearn.log_model(model, "model")

# 2. Serve with FastAPI
from fastapi import FastAPI
import joblib
import numpy as np

app = FastAPI()
model = joblib.load("model.pkl")

@app.post("/predict")
async def predict(features: list[float]):
    X = np.array(features).reshape(1, -1)
    pred = model.predict(X)[0]
    prob = model.predict_proba(X)[0].tolist()
    return {"prediction": int(pred), "probabilities": prob}`,
            resources: [
              { label: "MLflow Documentation", url: "https://mlflow.org/docs/latest/index.html", type: "official" },
              { label: "MLOps Course (Made With ML)", url: "https://madewithml.com", note: "Best free MLOps course" },
            ],
          },
        ],
      },
      {
        id: "l5-career",
        title: "Get Hired as a Python Developer",
        emoji: "💼",
        why: "All the code in the world means nothing if you can't land interviews. This section is how you turn skills into a job.",
        topics: [
          {
            title: "Portfolio Projects That Get Noticed",
            type: "task",
            detail: "Recruiters look at GitHub for 30 seconds. These 3 project types get callbacks.",
            code: `# Project 1: AI-Powered API
# Tech: FastAPI + LangChain + Gemini + PostgreSQL + Docker

# Project 2: Data Pipeline
# Tech: Python + Pandas + SQLAlchemy + Airflow (or cron)

# Project 3: Open Source Contribution
# Find a Python package you use → fix a bug → open PR`,
            resources: [
              { label: "GitHub Profile README Generator", url: "https://rahuldkjain.github.io/gh-profile-readme-generator/", type: "tool" },
              { label: "How to Get a Python Job (Talk Python)", url: "https://talkpython.fm", type: "article" },
            ],
          },
          {
            title: "Python Interview Prep",
            type: "practice",
            detail: "Companies that hire Python devs test 3 areas: DSA (LeetCode), Python-specific questions, and a take-home project.",
            code: `# COMMON PYTHON INTERVIEW QUESTIONS:

# 1. What is the GIL?
# Global Interpreter Lock — only one Python thread runs at a time.

# 2. Mutable vs Immutable
# Mutable: list, dict, set
# Immutable: str, tuple, int, float

# Default mutable argument TRAP:
def bad(lst=[]):      # DANGER — shares across calls!
    lst.append(1); return lst
def good(lst=None):   # CORRECT
    if lst is None: lst = []
    lst.append(1); return lst`,
            resources: [
              { label: "Python Interview Questions", url: "https://realpython.com/python-interview-questions/", type: "article" },
              { label: "NeetCode Python Roadmap", url: "https://neetcode.io/roadmap", type: "platform" },
            ],
          },
        ],
      },
    ],
    youtube: [
      { channel: "Sam Witteveen — LangChain Tutorials", url: "https://youtube.com/c/SamWitteveen", note: "Best LangChain + Gemini tutorials" },
      { channel: "Made With ML — MLOps", url: "https://youtube.com/c/MadeWithML", note: "Production ML systems in Python" },
      { channel: "NeetCode — Python DSA", url: "https://youtube.com/c/NeetCode", note: "Best LeetCode explanations in Python" },
    ],
    platforms: [
      { name: "NeetCode 150", url: "https://neetcode.io/practice", note: "The 150 problems that cover all patterns" },
      { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", note: "Must-read for senior roles" },
      { name: "Made With ML", url: "https://madewithml.com", note: "MLOps in Python — free course" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// HELPER: localStorage progress
// ─────────────────────────────────────────────────────────────────
const STORAGE_KEY = "py-roadmap-progress-v2";

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}
function saveProgress(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
  catch {}
}

// ─────────────────────────────────────────────────────────────────
// COLOR MAPS
// ─────────────────────────────────────────────────────────────────
const TYPE_COLORS = {
  concept:  "bg-indigo-100 text-indigo-700 border-indigo-200",
  task:     "bg-amber-100 text-amber-700 border-amber-200",
  project:  "bg-emerald-100 text-emerald-700 border-emerald-200",
  practice: "bg-violet-100 text-violet-700 border-violet-200",
};
const TYPE_LABELS = {
  concept: "Concept", task: "Setup", project: "Project", practice: "Practice",
};
const RESOURCE_ICONS = {
  official: <FiGlobe className="text-xs" />,
  article:  <FiBook className="text-xs" />,
  video:    <FiYoutube className="text-xs text-red-500" />,
  course:   <FiBookOpen className="text-xs" />,
  platform: <FiCode className="text-xs" />,
  tool:     <FiZap className="text-xs" />,
};
const RESOURCE_COLORS = {
  official: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100",
  article:  "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100",
  video:    "bg-red-50 border-red-200 text-red-700 hover:bg-red-100",
  course:   "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100",
  platform: "bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100",
  tool:     "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100",
};

// ─────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────

function ResourceLink({ r }) {
  const color = RESOURCE_COLORS[r.type] || RESOURCE_COLORS.article;
  const icon  = RESOURCE_ICONS[r.type]  || <FiExternalLink className="text-xs" />;
  return (
    <a href={r.url} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${color}`}>
      {icon}{r.label}
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────
// 21st.dev FeatureShowcase pattern — SubsectionAccordion
// Left: accordion steps  |  Right: animated content panel
// ─────────────────────────────────────────────────────────────────
function SubsectionAccordion({ subsections }) {
  const [active, setActive] = useState(0);
  const contentRef = useRef(null);

  const handleStep = (i) => {
    setActive(i);
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">

      {/* ── Eyebrow header (FeatureShowcase top bar) ── */}
      <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-indigo-50 to-white border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-indigo-100 rounded-md flex items-center justify-center flex-shrink-0">
            <FiBookOpen className="text-indigo-500 text-[10px]" />
          </div>
          <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">
            Full Concept
          </span>
          <span className="text-[10px] text-slate-400">·</span>
          <span className="text-[10px] text-slate-400 font-semibold">{subsections.length} topics</span>
        </div>
        {/* Dot indicators */}
        <div className="flex items-center gap-1">
          {subsections.map((_, i) => (
            <button key={i} onClick={() => handleStep(i)}
              className={`rounded-full transition-all duration-300 ${
                i === active ? "w-4 h-1.5 bg-indigo-500" : "w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Two-column layout: left accordion + right panel ── */}
      <div className="grid md:grid-cols-[220px_1fr]">

        {/* LEFT: Accordion steps (21st.dev left column) */}
        <div className="border-r border-slate-100 bg-slate-50/60 p-3 space-y-1">
          {subsections.map((sub, i) => {
            const isActive = i === active;
            return (
              <button key={i} onClick={() => handleStep(i)}
                className={`relative w-full text-left rounded-xl border px-3.5 py-2.5 transition-all duration-200 group ${
                  isActive
                    ? "border-indigo-200 bg-white shadow-sm"
                    : "border-transparent hover:border-slate-200 hover:bg-white"
                }`}
              >
                {/* Left rail accent — 21st.dev accordion trigger style */}
                <div className={`absolute left-0 top-3 bottom-3 w-0.5 rounded-full transition-all ${
                  isActive ? "bg-indigo-500" : "bg-transparent group-hover:bg-slate-300"
                }`} />
                <div className="flex items-start gap-2.5 pl-1">
                  <span className={`w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    isActive ? "bg-indigo-500 text-white" : "bg-slate-200 text-slate-500"
                  }`}>{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-semibold leading-tight line-clamp-2 transition-colors ${
                      isActive ? "text-indigo-700" : "text-slate-600 group-hover:text-slate-800"
                    }`}>{sub.heading}</p>
                    {isActive && (
                      <p className="text-[10px] text-indigo-400 mt-0.5 font-medium">Reading now</p>
                    )}
                  </div>
                  {isActive && <FiArrowRight className="text-indigo-400 text-xs flex-shrink-0 mt-0.5" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* RIGHT: Content panel (21st.dev right column / TabsContent) */}
        <div ref={contentRef}
          className="p-5 min-h-[180px] max-h-[360px] overflow-y-auto bg-white relative">

          {/* Animated content (like TabsContent switching) */}
          <div key={active} style={{ animation: "fadeInUp 0.22s ease-out both" }}>

            {/* Section title */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-7 bg-indigo-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                {active + 1}
              </span>
              <h4 className="font-bold text-slate-900 text-sm leading-tight">
                {subsections[active].heading}
              </h4>
            </div>

            {/* Body text */}
            <div className="text-sm text-slate-600 leading-6 whitespace-pre-line pl-9">
              {subsections[active].body}
            </div>
          </div>

          {/* Bottom nav (21st.dev CTA row) */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
            <button onClick={() => handleStep(Math.max(0, active - 1))}
              disabled={active === 0}
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-indigo-600 disabled:opacity-25 transition-colors">
              <FiChevronUp className="rotate-[-90deg] text-xs" /> Prev
            </button>
            <span className="text-[11px] text-slate-300 tabular-nums">
              {active + 1} / {subsections.length}
            </span>
            <button onClick={() => handleStep(Math.min(subsections.length - 1, active + 1))}
              disabled={active === subsections.length - 1}
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-indigo-600 disabled:opacity-25 transition-colors">
              Next <FiChevronDown className="rotate-[-90deg] text-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* CSS keyframe */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SectionTopicShowcase — 21st.dev FeatureShowcase adapted
// Left: topic list (accordion steps)  |  Right: topic detail panel (TabsContent)
// ─────────────────────────────────────────────────────────────────
function SectionTopicShowcase({ section, levelKey, progress, onToggle }) {
  const [activeTab, setActiveTab] = useState(0);
  const panelRef = useRef(null);

  const handleTabChange = (i) => {
    setActiveTab(i);
    panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const topic = section.topics[activeTab];
  const key = `${levelKey}-${section.id}-${activeTab}`;
  const checked = !!progress[key];

  const typeColor = TYPE_COLORS[topic?.type] || TYPE_COLORS.concept;
  const typeLabel = TYPE_LABELS[topic?.type] || "Concept";

  return (
    <div className="grid md:grid-cols-[220px_1fr] min-h-[300px] rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden shadow-sm">

      {/* ── LEFT: Step list (FeatureShowcase Accordion steps) ── */}
      <div className="border-r border-slate-200 bg-slate-50/40 p-3">

        {/* Section stats */}
        <div className="flex items-center justify-between px-2 py-1.5 mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {section.topics.length} Topics
          </span>
          <span className="text-[10px] font-bold text-indigo-500">
            {section.topics.filter((_, ti) => progress[`${levelKey}-${section.id}-${ti}`]).length} done
          </span>
        </div>

        {/* Topic steps */}
        <div className="space-y-1">
          {section.topics.map((t, ti) => {
            const isActive = ti === activeTab;
            const isDone = !!progress[`${levelKey}-${section.id}-${ti}`];
            return (
              <button key={ti} onClick={() => handleTabChange(ti)}
                className={`relative w-full text-left rounded-xl border px-3 py-2.5 transition-all duration-200 group ${
                  isActive
                    ? "border-indigo-200 bg-white shadow-sm"
                    : "border-transparent hover:border-slate-200 hover:bg-white/80"
                }`}>
                {/* Active left rail (FeatureShowcase AccordionItem border) */}
                <div className={`absolute left-0 top-2 bottom-2 w-0.5 rounded-full transition-all ${
                  isActive ? "bg-indigo-500" : "bg-transparent group-hover:bg-slate-200"
                }`} />
                <div className="flex items-start gap-2 pl-1">
                  {/* Done indicator */}
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    isDone
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : isActive
                        ? "border-indigo-400"
                        : "border-slate-300 group-hover:border-slate-400"
                  }`}>
                    {isDone && <FiCheckCircle className="text-[9px]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-semibold leading-tight transition-colors ${
                      isDone ? "line-through text-slate-400" : isActive ? "text-indigo-700" : "text-slate-700 group-hover:text-slate-900"
                    }`}>{t.title}</p>
                    <p className={`text-[10px] mt-0.5 transition-colors ${
                      isActive ? "text-indigo-400" : isDone ? "text-slate-400" : "text-slate-400"
                    }`}>{isActive ? "Viewing now" : isDone ? "Completed" : t.type}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── RIGHT: Content panel (FeatureShowcase Card / TabsContent) ── */}
      <div ref={panelRef} className="overflow-y-auto max-h-[600px] bg-white">

        {topic && (
          <div key={`${activeTab}-content`} style={{ animation: "topicFadeIn 0.2s ease-out both" }}>

            {/* ── Panel header — card toolbar ── */}
            <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-slate-100">
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${typeColor}`}>
                    {typeLabel}
                  </span>
                  {topic.subsections?.length > 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-50 border border-violet-200 text-violet-600">
                      {topic.subsections.length} subtopics
                    </span>
                  )}
                  {checked && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                      ✓ Completed
                    </span>
                  )}
                </div>
                <h3 className={`font-extrabold text-base text-slate-900 leading-tight tracking-tight ${
                  checked ? "line-through text-slate-400" : ""
                }`}>{topic.title}</h3>
              </div>
              {/* Mark done button */}
              <button onClick={() => onToggle(key)}
                className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-xl border flex-shrink-0 transition-all ${
                  checked
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : "bg-white border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600"
                }`}>
                <FiCheckCircle className="text-xs" />
                {checked ? "Done!" : "Mark done"}
              </button>
            </div>

            {/* ── Panel body ── */}
            <div className="px-5 py-4 space-y-5">

              {/* Detail */}
              <p className="text-sm text-slate-700 leading-6">{topic.detail}</p>

              {/* Subsections (nested SubsectionAccordion) */}
              {topic.subsections?.length > 0 && (
                <SubsectionAccordion subsections={topic.subsections} />
              )}

              {/* Code block — 21st.dev dark card style */}
              {topic.code && (
                <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl shadow-slate-900/10">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                    </div>
                    <span className="text-[10px] text-white/25 font-mono ml-2 flex-1">solution.py</span>
                    <span className="text-[10px] bg-indigo-600/25 text-indigo-300 border border-indigo-600/30 px-2 py-0.5 rounded-md font-mono">
                      Python 3.12 🐍
                    </span>
                  </div>
                  <div className="bg-[#0d1117] flex">
                    {/* Line numbers */}
                    <div className="select-none bg-[#161b22]/60 border-r border-white/5 py-3 px-2 text-right flex-shrink-0 min-w-[32px]">
                      {topic.code.split("\n").map((_, i) => (
                        <div key={i} className="text-[10px] text-white/15 font-mono leading-5">{i+1}</div>
                      ))}
                    </div>
                    <pre className="flex-1 px-4 py-3 text-xs font-mono text-emerald-300 leading-5 overflow-x-auto whitespace-pre max-h-80 overflow-y-auto">
                      <code>{topic.code}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Resources — FeatureShowcase CTA row */}
              {topic.resources?.length > 0 && (
                <div className="pt-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <FiArrowRight className="text-indigo-400 text-xs" /> Resources & Links
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {topic.resources.map((r, i) => <ResourceLink key={i} r={r} />)}
                  </div>
                </div>
              )}
            </div>

            {/* ── Panel footer: prev / next navigation ── */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => handleTabChange(Math.max(0, activeTab - 1))}
                disabled={activeTab === 0}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-colors">
                <FiChevronDown className="rotate-90 text-sm" /> Previous
              </button>
              <span className="text-xs text-slate-300 tabular-nums font-mono">
                {activeTab + 1} / {section.topics.length}
              </span>
              <button
                onClick={() => handleTabChange(Math.min(section.topics.length - 1, activeTab + 1))}
                disabled={activeTab === section.topics.length - 1}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-colors">
                Next <FiChevronDown className="-rotate-90 text-sm" />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes topicFadeIn {
          from { opacity: 0; transform: translateY(6px); filter: blur(2px); }
          to   { opacity: 1; transform: translateY(0);   filter: blur(0); }
        }
      `}</style>
    </div>
  );
}

function TopicCard({ topic, checked, onToggle }) {
  const [open, setOpen] = useState(false);
  const typeColor = TYPE_COLORS[topic.type] || TYPE_COLORS.concept;
  const typeLabel = TYPE_LABELS[topic.type] || "Concept";
  const hasSubsections = topic.subsections?.length > 0;

  return (
    <div className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
      checked ? "border-emerald-200 bg-emerald-50/50" : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
    }`}>
      {/* Header */}
      <div className="flex items-start gap-3 p-4">
        <button onClick={onToggle}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
            checked ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 hover:border-indigo-400"
          }`}>
          {checked && <FiCheckCircle className="text-[11px]" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${typeColor}`}>{typeLabel}</span>
            {hasSubsections && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-indigo-50 border-indigo-200 text-indigo-600">
                {topic.subsections.length} subtopics
              </span>
            )}
          </div>
          <h4 className={`font-bold text-sm ${checked ? "line-through text-slate-400" : "text-slate-800"}`}>{topic.title}</h4>
          {!open && <p className="text-xs text-slate-500 mt-1 line-clamp-1">{topic.detail}</p>}
        </div>
        <button onClick={() => setOpen(v => !v)}
          className="text-slate-400 hover:text-slate-600 transition-colors p-1 flex-shrink-0">
          {open ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      </div>

      {/* Expanded content */}
      {open && (
        <div className="px-4 pb-4 space-y-4 border-t border-slate-100 pt-4">

          {/* Main detail */}
          <p className="text-sm text-slate-600 leading-6">{topic.detail}</p>

          {/* Subsections accordion — full concept breakdown */}
          {hasSubsections && (
            <SubsectionAccordion subsections={topic.subsections} />
          )}

          {/* Code block */}
          {topic.code && (
            <div className="bg-slate-900 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                </div>
                <span className="text-[10px] text-white/30 font-mono ml-2">Python 3.12</span>
                <span className="text-[9px] text-white/15 ml-auto">🐍</span>
              </div>
              <pre className="px-4 py-3 text-xs font-mono text-emerald-300 leading-5 overflow-x-auto whitespace-pre max-h-96 overflow-y-auto">
                <code>{topic.code}</code>
              </pre>
            </div>
          )}

          {/* Resources */}
          {topic.resources?.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Resources</p>
              <div className="flex flex-wrap gap-2">
                {topic.resources.map((r, i) => <ResourceLink key={i} r={r} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function LevelCard({ data, progress, onToggle, globalOpen, onGlobalOpen }) {
  const [openSections, setOpenSections] = useState(new Set([data.sections[0]?.id]));
  const [showResources, setShowResources] = useState(false);

  const totalTopics = data.sections.reduce((a, s) => a + s.topics.length, 0);
  const doneTopics  = data.sections.reduce((a, s) =>
    a + s.topics.filter((_, ti) => progress[`${data.level}-${s.id}-${ti}`]).length, 0
  );
  const pct = totalTopics ? Math.round((doneTopics / totalTopics) * 100) : 0;

  const colorMap = {
    emerald: { ring:"ring-emerald-400", node:"bg-emerald-500", bg:"bg-emerald-500" },
    blue:    { ring:"ring-blue-400",    node:"bg-blue-500",    bg:"bg-blue-500"    },
    violet:  { ring:"ring-violet-400",  node:"bg-violet-500",  bg:"bg-violet-500"  },
    orange:  { ring:"ring-orange-400",  node:"bg-orange-500",  bg:"bg-orange-500"  },
    pink:    { ring:"ring-pink-400",    node:"bg-pink-500",    bg:"bg-pink-500"    },
  };
  const c = colorMap[data.color];

  const isOpen = globalOpen === data.level;
  const toggleSection = (id) => setOpenSections(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  return (
    <div id={`level-${data.level}`}
      className={`rounded-3xl border-2 transition-all duration-300 ${
        isOpen ? `${data.border} ${data.ring} ring-4` : "border-slate-200 hover:border-slate-300"
      }`}>

      {/* Level Header */}
      <button onClick={() => onGlobalOpen(isOpen ? null : data.level)}
        className="w-full text-left p-6 flex items-center gap-5">
        {/* Level badge */}
        <div className={`w-14 h-14 ${c.node} rounded-2xl flex flex-col items-center justify-center text-white flex-shrink-0 shadow-lg`}>
          <span className="text-xl leading-none">{data.emoji}</span>
          <span className="text-[10px] font-bold mt-0.5">LVL {data.level}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h2 className="font-extrabold text-slate-900 text-lg">{data.label}</h2>
            {pct === 100 && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">Complete ✓</span>}
          </div>
          <p className="text-sm text-slate-500">{data.tagline}</p>
          {/* Progress bar */}
          <div className="mt-2 flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-500 ${c.bg}`} style={{ width:`${pct}%` }} />
            </div>
            <span className={`text-xs font-bold ${data.text}`}>{doneTopics}/{totalTopics}</span>
          </div>
        </div>

        <div className="text-slate-400 flex-shrink-0">
          {isOpen ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}
        </div>
      </button>

      {/* Expanded content */}
      {isOpen && (
        <div className="px-6 pb-6 space-y-5">

          {/* Sections */}
          {data.sections.map(section => (
            <div key={section.id} className="rounded-2xl border border-slate-200 overflow-hidden">
              <button onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{section.emoji}</span>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{section.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{section.why}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-slate-400">
                    {section.topics.filter((_, ti) => progress[`${data.level}-${section.id}-${ti}`]).length}/{section.topics.length}
                  </span>
                  {openSections.has(section.id) ? <FiChevronUp className="text-slate-400" /> : <FiChevronDown className="text-slate-400" />}
                </div>
              </button>

              {openSections.has(section.id) && (
                <div className="bg-white">
                  <SectionTopicShowcase
                    section={section}
                    levelKey={data.level}
                    progress={progress}
                    onToggle={onToggle}
                  />
                </div>
              )}
            </div>
          ))}

          {/* Resources & YouTube */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <button onClick={() => setShowResources(v => !v)}
              className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-2">
                <FiBookOpen className="text-slate-500" />
                <p className="font-bold text-slate-700 text-sm">YouTube Channels & Platforms</p>
              </div>
              {showResources ? <FiChevronUp className="text-slate-400" /> : <FiChevronDown className="text-slate-400" />}
            </button>

            {showResources && (
              <div className="p-4 grid sm:grid-cols-2 gap-4">
                {/* YouTube */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1">
                    <FiYoutube className="text-red-500" /> YouTube Channels
                  </p>
                  <div className="space-y-2">
                    {data.youtube.map((y, i) => (
                      <a key={i} href={y.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-red-50 border border-red-100 hover:bg-red-100 transition-colors group">
                        <FiYoutube className="text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-red-800 group-hover:underline">{y.channel}</p>
                          <p className="text-[10px] text-red-500 mt-0.5">{y.note}</p>
                        </div>
                        <FiExternalLink className="text-red-300 text-xs ml-auto flex-shrink-0 mt-0.5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Platforms */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1">
                    <FiGlobe className="text-indigo-500" /> Practice Platforms
                  </p>
                  <div className="space-y-2">
                    {data.platforms.map((p, i) => (
                      <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-colors group">
                        <FiCode className="text-indigo-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-indigo-800 group-hover:underline">{p.name}</p>
                          <p className="text-[10px] text-indigo-500 mt-0.5">{p.note}</p>
                        </div>
                        <FiExternalLink className="text-indigo-300 text-xs ml-auto flex-shrink-0 mt-0.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────
export default function Roadmap() {
  const [progress, setProgress] = useState(loadProgress);
  const [openLevel, setOpenLevel] = useState(1);

  const handleToggle = (key) => {
    setProgress(prev => {
      const next = { ...prev, [key]: !prev[key] };
      saveProgress(next);
      return next;
    });
  };

  // Overall stats
  const stats = useMemo(() => {
    let total = 0, done = 0;
    ROADMAP.forEach(level => {
      level.sections.forEach(section => {
        section.topics.forEach((_, ti) => {
          total++;
          if (progress[`${level.level}-${section.id}-${ti}`]) done++;
        });
      });
    });
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [progress]);

  const levelStats = useMemo(() => ROADMAP.map(level => {
    let total = 0, done = 0;
    level.sections.forEach(section => {
      section.topics.forEach((_, ti) => {
        total++;
        if (progress[`${level.level}-${section.id}-${ti}`]) done++;
      });
    });
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }), [progress]);

  const resetProgress = () => {
    if (window.confirm("Reset all progress? This cannot be undone.")) {
      setProgress({});
      saveProgress({});
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full min-h-screen pb-16">

        {/* ── HERO ── */}
        <div className="mb-8 relative">
          <div className="absolute -top-10 -left-10 w-56 h-56 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-6 right-0 w-40 h-40 bg-violet-100/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 text-indigo-700 text-xs font-bold px-4 py-2 rounded-full mb-5 shadow-sm shadow-indigo-100">
              <span className="text-base">🐍</span>
              Python Career Roadmap 2025
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse ml-1" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3 leading-tight">
              Zero to Python Pro
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              A practical, step-by-step roadmap from absolute beginner to AI Engineer.
              Every topic includes real code, curated resources, and YouTube channels.
              Check off topics as you complete them — progress saves to your browser.
            </p>
          </div>
        </div>

        {/* ── OVERALL PROGRESS CARD ── */}
        <div className="bg-gradient-to-br from-[#0f0f1a] via-slate-900 to-[#150f2a] rounded-3xl p-6 mb-8 text-white relative overflow-hidden border border-white/5 shadow-2xl shadow-indigo-900/20">
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-600/10 rounded-full translate-y-10 -translate-x-10 blur-xl" />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage:"linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)", backgroundSize:"36px 36px" }} />
          <div className="relative">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
              <div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Overall Progress</p>
                <h2 className="text-2xl font-extrabold">
                  {stats.done}/{stats.total} topics completed
                </h2>
                <p className="text-white/40 text-sm mt-1">
                  {stats.pct === 0 ? "Start with Level 1 below 👇" :
                   stats.pct < 40 ? "Great start! Keep going." :
                   stats.pct < 80 ? "You're making real progress!" :
                   stats.pct === 100 ? "🎉 Roadmap complete! You're a Python Pro." :
                   "Almost there! Final stretch."}
                </p>
              </div>
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#6366f1" strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 34}
                    strokeDashoffset={2 * Math.PI * 34 * (1 - stats.pct / 100)}
                    style={{ transition:"stroke-dashoffset 0.8s ease" }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-base font-extrabold text-indigo-400">
                  {stats.pct}%
                </div>
              </div>
            </div>

            {/* Level progress pills */}
            <div className="grid grid-cols-5 gap-2">
              {ROADMAP.map((level, i) => {
                const ls = levelStats[i];
                return (
                  <button key={level.level} onClick={() => setOpenLevel(level.level)}
                    className="text-center group">
                    <div className="text-xl mb-1">{level.emoji}</div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-1">
                      <div className="h-full bg-indigo-400 rounded-full transition-all duration-500" style={{ width:`${ls.pct}%` }} />
                    </div>
                    <p className="text-[9px] text-white/30 group-hover:text-white/60 transition-colors">{level.label}</p>
                    <p className="text-[10px] font-bold text-indigo-400">{ls.pct}%</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── QUICK STATS ROW ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { icon:<FiLayers/>,     label:"Levels",       value:"5",           color:"text-indigo-600", bg:"bg-indigo-50", border:"border-indigo-100" },
            { icon:<FiBook/>,       label:"Total Topics",  value:`${stats.total}`, color:"text-violet-600", bg:"bg-violet-50", border:"border-violet-100" },
            { icon:<FiCode/>,       label:"Code Examples", value:"50+",         color:"text-emerald-600",bg:"bg-emerald-50",border:"border-emerald-100"},
            { icon:<FiYoutube/>,    label:"YouTube Links", value:"15+",         color:"text-red-600",   bg:"bg-red-50",   border:"border-red-100"   },
          ].map(s => (
            <div key={s.label} className={`rounded-2xl border p-4 ${s.bg} ${s.border} hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-default`}>
              <div className={`${s.color} mb-2 text-lg`}>{s.icon}</div>
              <p className={`text-2xl font-extrabold ${s.color} tabular-nums`}>{s.value}</p>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── LEVEL CARDS ── */}
        <div className="space-y-4">
          {ROADMAP.map((level) => (
            <LevelCard
              key={level.level}
              data={level}
              progress={progress}
              onToggle={handleToggle}
              globalOpen={openLevel}
              onGlobalOpen={setOpenLevel}
            />
          ))}
        </div>

        {/* ── COMING SOON ── */}
        <div className="mt-8 rounded-3xl border-2 border-dashed border-slate-200 p-8 text-center">
          <div className="text-4xl mb-3">🔜</div>
          <h3 className="font-bold text-slate-700 text-lg mb-2">More Content Coming Soon</h3>
          <p className="text-slate-400 text-sm mb-5">
            Advanced Django REST Framework, Python for DevOps, Web Scraping with Playwright,
            Quantum Python, Competitive Programming in Python, and Interview Mock Sessions.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Django REST","Web Scraping","Python DevOps","Competitive Python","Interview Prep","FastAPI Advanced","PyTorch Deep Dive","Python Patterns"].map(tag => (
              <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full border border-slate-200">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── RESET BUTTON ── */}
        <div className="mt-6 text-center">
          <button onClick={resetProgress}
            className="text-xs text-slate-400 hover:text-red-500 transition-colors border border-slate-200 hover:border-red-200 px-3 py-1.5 rounded-lg">
            Reset all progress
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
} 