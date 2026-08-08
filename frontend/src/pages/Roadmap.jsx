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
    color: "indigo",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-700",
    ring: "ring-indigo-200",
    bar: "bg-indigo-500",
    badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
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

            {
  heading: "Indentation in Conditional Statements",
  body: `Indentation is one of the most important rules in Python. It is the whitespace placed at the beginning of a line to define which statements belong to a particular block of code. Unlike languages such as C, C++, and Java, Python does not use curly braces {} to define code blocks. Python uses indentation instead.
When Python sees a colon (:) after a statement such as if, elif, else, for, while, or a function definition, it expects the following block of code to be indented.
----------------------------------------
What is Indentation?
----------------------------------------
Indentation means adding spaces or tabs before a statement.
Example:
if age >= 18:
    print("You are eligible")
Here:
if age >= 18: → Condition
    print("You are eligible") → Indented code block
The four spaces before print() tell Python that the print statement belongs to the if statement.
----------------------------------------
Why Does Python Use Indentation?
----------------------------------------
Indentation makes the structure of Python code visually clear.
Compare this with languages that use braces:
Python:
if age >= 18:
    print("Eligible")
C/Java style:
if (age >= 18) {
    print("Eligible");
}
Python removes the need for {} by using indentation to represent the structure of the program.
----------------------------------------
Standard Indentation
----------------------------------------
The standard Python convention is four spaces for each indentation level.
Example:
if age >= 18:
    print("Eligible")
    print("You can vote")
Both print statements have the same indentation, so both belong to the if block.
----------------------------------------
Multiple Statements Inside a Block
----------------------------------------
You can place multiple statements inside the same conditional block.
Example:
age = 21
if age >= 18:
    print("Age requirement satisfied")
    print("You are eligible to vote")
    print("You can continue")
All three statements are indented equally, so Python considers all three statements part of the if block.
----------------------------------------
Nested Indentation
----------------------------------------
A conditional statement can exist inside another conditional statement. This is called a nested conditional.
Each new block requires another indentation level.
Example:
age = 21
has_id = True
if age >= 18:
    print("Adult")
    if has_id:
        print("ID verified")
Here:
First level:
if age >= 18:
    print("Adult")
Second level:
    if has_id:
        print("ID verified")
The inner if statement is indented inside the outer if block.
----------------------------------------
Indentation Levels
----------------------------------------
Think of indentation as levels.
Level 0:
if age >= 18:
Level 1:
    print("Adult")
Level 1:
    if has_id:
Level 2:
        print("ID verified")
Level 2 statements belong to the inner block.
Level 1 statements belong to the outer block.
----------------------------------------
Indentation with if...else
----------------------------------------
Both if and else blocks have their own indentation.
Example:
age = 16
if age >= 18:
    print("Eligible")
else:
    print("Not eligible")
Notice that if and else are aligned at the same indentation level.
Their statements are indented one level inside them.
Correct structure:
if condition:
    statement
else:
    statement
----------------------------------------
Indentation with if...elif...else
----------------------------------------
Every conditional branch has its own block.
Example:
marks = 85
if marks >= 90:
    print("A+")
elif marks >= 75:
    print("A")
else:
    print("Needs improvement")
The keywords if, elif, and else are aligned.
Their corresponding statements are indented.
----------------------------------------
Incorrect Indentation
----------------------------------------
Example:
if age >= 18:
print("Eligible")
This is incorrect because print() is not indented.
Python will raise:
IndentationError
Correct:
if age >= 18:
    print("Eligible")
----------------------------------------
Unexpected Indentation
----------------------------------------
Indentation should only be added where Python expects a new block.
Incorrect:
age = 20
    print(age)
There is no statement before print() that creates an indented block.
Python raises an IndentationError.
Correct:
age = 20
print(age)
----------------------------------------
Inconsistent Indentation
----------------------------------------
Do not randomly change the number of spaces within the same block.
Incorrect:
if age >= 18:
    print("Adult")
      print("Eligible")
The statements do not have consistent indentation.
Correct:
if age >= 18:
    print("Adult")
    print("Eligible")
----------------------------------------
Spaces vs Tabs
----------------------------------------
Python allows indentation using spaces or tabs, but mixing tabs and spaces can cause errors.
The recommended practice is:
Use four spaces for each indentation level.
Most modern Python editors automatically insert four spaces when you press Tab.
Example:
if condition:
    print("Statement")
----------------------------------------
Indentation Determines Program Structure
----------------------------------------
Indentation is not just formatting in Python. It changes the actual meaning and execution structure of the program.
Example:
age = 20
if age >= 18:
    print("Adult")
print("Program finished")
Here, only the first print statement belongs to the if block.
The second print statement is outside the if block because it has no indentation.
If age is 20:
Adult
Program finished
If age is 15:
Program finished
This demonstrates that indentation determines which statements are controlled by the condition.
----------------------------------------
Colon and Indentation Work Together
----------------------------------------
A colon (:) indicates that a new block is beginning.
Example:
if age >= 18:
    print("Eligible")
The colon tells Python:
"A block is starting."
The indentation tells Python:
"This statement belongs to that block."
The general pattern is:
statement:
    indented statement
----------------------------------------
Indentation After elif and else
----------------------------------------
The same rule applies to elif and else.
Example:
temperature = 35
if temperature > 40:
    print("Very hot")
elif temperature > 30:
    print("Hot")
else:
    print("Normal")
if, elif, and else are at the same level.
Their corresponding code blocks are indented.
----------------------------------------
Indentation and pass
----------------------------------------
If a block does not contain any code yet, Python requires a statement such as pass.
Example:
if age >= 18:
    pass
The pass statement allows the block to remain empty without producing an error.
----------------------------------------
Professional Python Practice
----------------------------------------
Use four spaces for indentation.
Keep indentation consistent.
Do not mix tabs and spaces.
Keep statements belonging to the same block at the same indentation level.
Use an editor that automatically manages indentation.
Indent nested blocks one additional level.
----------------------------------------
Key Rule to Remember
----------------------------------------
Colon (:) → Starts a new block.
Indentation → Defines the block.
Same indentation → Same block.
More indentation → Nested block.
Less indentation → End of the current block.
Example:
if condition:
    statement_1
    statement_2
    if another_condition:
        statement_3
    statement_4
statement_5
Here:
statement_1 → Inside first if
statement_2 → Inside first if
statement_3 → Inside nested if
statement_4 → Inside first if
statement_5 → Outside all conditions
----------------------------------------
Summary
----------------------------------------
Python uses indentation to define the structure of conditional statements. Four spaces are the standard indentation level. Statements with the same indentation belong to the same block, while additional indentation creates nested blocks. Correct indentation is essential because Python treats indentation as part of the program's syntax, not merely as visual formatting.`,
},

{
  heading: "The if Statement",
  body: `The if statement is the simplest conditional statement in Python. It is used when you want Python to execute a block of code only when a particular condition is True.
The basic structure is:
if condition:
    statement
Python first evaluates the condition. If the condition evaluates to True, the indented block is executed. If the condition evaluates to False, Python skips the block and continues with the next statement.
----------------------------------------
Basic Example
----------------------------------------
age = 20
if age >= 18:
    print("You are an adult")
Output:
You are an adult
Here:
age >= 18 → Condition
: → Indicates that the if block begins
    print(...) → Code belonging to the if block
Because 20 >= 18 is True, Python executes the print statement.
----------------------------------------
When the Condition is False
----------------------------------------
age = 15
if age >= 18:
    print("You are an adult")
print("Program continues")
Output:
Program continues
The condition 15 >= 18 is False, so Python skips the indented statement. Execution then continues with the next statement outside the if block.
----------------------------------------
How Python Executes an if Statement
----------------------------------------
Python follows these steps:
1. Read the if statement.
2. Evaluate the condition.
3. Convert the result to True or False.
4. If the result is True, execute the indented block.
5. If the result is False, skip the block.
6. Continue executing the remaining program.
Example:
marks = 85
if marks >= 40:
    print("Pass")
Python evaluates:
85 >= 40
Result:
True
Therefore:
Pass
is printed.
----------------------------------------
Using Comparison Operators
----------------------------------------
The condition of an if statement commonly uses comparison operators.
Example:
age = 21
if age == 21:
    print("Age is 21")
Other examples:
if age > 18:
    print("Above 18")
if age < 30:
    print("Below 30")
if age >= 18:
    print("Eligible")
if age <= 60:
    print("Within limit")
if age != 25:
    print("Age is not 25")
----------------------------------------
Using Variables in Conditions
----------------------------------------
Conditions usually compare variables with values.
Example:
salary = 50000
if salary > 30000:
    print("Good salary")
Python evaluates the value stored in salary and then checks the condition.
----------------------------------------
Using Boolean Variables
----------------------------------------
An if statement can directly use a Boolean variable.
Example:
is_logged_in = True
if is_logged_in:
    print("Welcome to your dashboard")
Because is_logged_in contains True, the statement executes.
Another example:
is_admin = False
if is_admin:
    print("Admin panel")
The condition is False, so nothing is printed.
----------------------------------------
Using Expressions
----------------------------------------
The condition does not have to be a simple comparison. It can be an expression.
Example:
a = 10
b = 20
if a + b > 25:
    print("Sum is greater than 25")
Python first calculates:
10 + 20 = 30
Then checks:
30 > 25
Result:
True
----------------------------------------
Multiple Statements Inside if
----------------------------------------
An if block can contain multiple statements.
Example:
age = 22
if age >= 18:
    print("You are an adult")
    print("You can vote")
    print("You can apply for a driving license")
All three statements execute because they belong to the same indented block.
----------------------------------------
Nested if Statement
----------------------------------------
An if statement can be placed inside another if statement.
Example:
age = 22
has_id = True
if age >= 18:
    print("Age requirement satisfied")
    if has_id:
        print("ID verified")
The inner if executes only when the outer if condition is True.
----------------------------------------
Using String Conditions
----------------------------------------
Strings can also be compared in conditions.
Example:
name = "Rahul"
if name == "Rahul":
    print("Welcome Rahul")
Python compares the value of name with the string "Rahul".
----------------------------------------
Using Membership with if
----------------------------------------
The in operator can be used to check whether a value exists inside a collection.
Example:
languages = ["Python", "Java", "C++"]
if "Python" in languages:
    print("Python is available")
Output:
Python is available
----------------------------------------
Using None with if
----------------------------------------
None can also be checked using an if statement.
Example:
data = None
if data is None:
    print("No data available")
This is commonly used when a value has not been assigned yet.
----------------------------------------
Truthy and Falsy Values
----------------------------------------
Python does not require every condition to explicitly contain True or False. Many values are automatically treated as True or False in a condition.
Falsy values include:
False
None
0
0.0
""
[]
()
{}
Example:
name = ""
if name:
    print("Name entered")
Because an empty string is falsy, the statement is not executed.
Example:
name = "Rahul"
if name:
    print("Name entered")
Output:
Name entered
A non-empty string is truthy.
----------------------------------------
The Colon (:)
----------------------------------------
The colon after the condition is mandatory.
Correct:
if age >= 18:
    print("Eligible")
Incorrect:
if age >= 18
    print("Eligible")
The second example produces a SyntaxError because the colon is missing.
----------------------------------------
Indentation Requirement
----------------------------------------
The statements controlled by if must be indented.
Correct:
if age >= 18:
    print("Eligible")
Incorrect:
if age >= 18:
print("Eligible")
The incorrect version raises an IndentationError.
----------------------------------------
if with Function Calls
----------------------------------------
An if statement can control whether a function is called.
Example:
is_valid = True
if is_valid:
    print("Validation successful")
----------------------------------------
Real-World Example — Voting
----------------------------------------
age = 25
if age >= 18:
    print("You are eligible to vote")
The condition determines whether the user is eligible.
----------------------------------------
Real-World Example — Login
----------------------------------------
is_logged_in = True
if is_logged_in:
    print("Open Dashboard")
The dashboard action occurs only when the user is logged in.
----------------------------------------
Real-World Example — Minimum Balance
----------------------------------------
balance = 5000
withdrawal = 2000
if balance >= withdrawal:
    print("Withdrawal allowed")
The condition checks whether enough balance is available.
----------------------------------------
Important Rule
----------------------------------------
An if statement performs an action only when its condition is True.
The basic mental model is:
if condition:
    execute this code
If condition → True:
Code executes.
If condition → False:
Code is skipped.
----------------------------------------
Summary
----------------------------------------
The if statement is the foundation of decision making in Python. It evaluates a condition and executes an indented block only when that condition is True. Conditions can use comparison operators, Boolean values, expressions, strings, collections, and other Python objects. The if statement is the building block for more advanced decision-making structures such as if...else, if...elif...else, and nested conditions.`,
},

{
  heading: "The if...else Statement",
  body: `The if...else statement is used when a program needs to choose between two possible paths.
The if block runs when the condition is True.
The else block runs when the condition is False.
Unlike a simple if statement, if...else guarantees that one of the two blocks will execute.
----------------------------------------
Basic Syntax
----------------------------------------
if condition:
    statement_if_true
else:
    statement_if_false
The if and else keywords must be aligned at the same indentation level.
The statements inside each block must be indented.
----------------------------------------
Basic Example
----------------------------------------
age = 20
if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")
Output:
You are an adult
The condition:
age >= 18
is True, so Python executes the if block and skips the else block.
----------------------------------------
When the Condition is False
----------------------------------------
age = 15
if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")
Output:
You are a minor
The condition:
15 >= 18
is False.
Therefore, Python skips the if block and executes the else block.
----------------------------------------
How if...else Works
----------------------------------------
Python follows this process:
1. Evaluate the condition.
2. If the condition is True, execute the if block.
3. If the condition is False, execute the else block.
4. Continue with the remaining program.
Only one of the two blocks executes.
----------------------------------------
Flow of Execution
----------------------------------------
Consider:
marks = 35
if marks >= 40:
    print("Pass")
else:
    print("Fail")
Python checks:
35 >= 40
Result:
False
Therefore:
Fail
is printed.
If marks were 80:
80 >= 40
Result:
True
Therefore:
Pass
is printed.
----------------------------------------
if and else Must Be Aligned
----------------------------------------
Correct:
if age >= 18:
    print("Eligible")
else:
    print("Not eligible")
Incorrect:
if age >= 18:
    print("Eligible")
    else:
        print("Not eligible")
The else must belong to the same indentation level as its if.
----------------------------------------
Multiple Statements
----------------------------------------
Both blocks can contain multiple statements.
Example:
age = 22
if age >= 18:
    print("Adult")
    print("Eligible to vote")
else:
    print("Minor")
    print("Not eligible to vote")
All statements inside the selected block are executed.
----------------------------------------
Using Comparison Operators
----------------------------------------
if score >= 40:
    print("Pass")
else:
    print("Fail")
Other comparisons can also be used:
if temperature > 30:
    print("Hot")
else:
    print("Normal")
if password == "python123":
    print("Login successful")
else:
    print("Incorrect password")
----------------------------------------
Using Boolean Values
----------------------------------------
is_logged_in = True
if is_logged_in:
    print("Welcome to Dashboard")
else:
    print("Please login")
If is_logged_in is True, the first block executes.
If it is False, the else block executes.
----------------------------------------
Using Expressions
----------------------------------------
a = 10
b = 5
if a > b:
    print("a is greater")
else:
    print("b is greater or equal")
Python evaluates the expression before choosing a block.
----------------------------------------
Using Strings
----------------------------------------
name = "Rahul"
if name == "Rahul":
    print("Welcome Rahul")
else:
    print("Unknown user")
String comparisons can be used directly in conditions.
----------------------------------------
Using Membership Operators
----------------------------------------
language = "Python"
if language in ["Python", "Java", "C++"]:
    print("Supported language")
else:
    print("Unsupported language")
----------------------------------------
Using Logical Operators
----------------------------------------
age = 25
has_id = True
if age >= 18 and has_id:
    print("Entry allowed")
else:
    print("Entry denied")
The entire logical expression is evaluated before Python chooses the block.
----------------------------------------
Real-World Example — Voting
----------------------------------------
age = 17
if age >= 18:
    print("You are eligible to vote")
else:
    print("You are not eligible to vote")
The program chooses exactly one result based on age.
----------------------------------------
Real-World Example — Login
----------------------------------------
username = "admin"
password = "1234"
if username == "admin" and password == "1234":
    print("Login successful")
else:
    print("Invalid username or password")
This pattern is commonly used in authentication logic.
----------------------------------------
Real-World Example — ATM
----------------------------------------
balance = 5000
withdrawal = 6000
if balance >= withdrawal:
    print("Withdrawal successful")
else:
    print("Insufficient balance")
Because the balance is less than the withdrawal amount, the else block executes.
----------------------------------------
Real-World Example — Even or Odd
----------------------------------------
number = 7
if number % 2 == 0:
    print("Even number")
else:
    print("Odd number")
The modulus operator checks whether the number has a remainder of zero.
----------------------------------------
Nested if with else
----------------------------------------
An if...else statement can contain another if...else statement.
Example:
age = 20
has_id = True
if age >= 18:
    if has_id:
        print("Entry allowed")
    else:
        print("ID required")
else:
    print("Underage")
Here, the inner decision is made only after the outer condition is True.
----------------------------------------
The else Block Is Optional in if
----------------------------------------
An if statement can exist without else:
if temperature > 40:
    print("Very hot")
But when else is added:
if temperature > 40:
    print("Very hot")
else:
    print("Temperature is normal")
the program has an action for both possible outcomes.
----------------------------------------
Important Difference
----------------------------------------
Simple if:
if condition:
    statement
If the condition is False, nothing from the if block executes.
if...else:
if condition:
    statement_1
else:
    statement_2
If the condition is False, the else block executes.
Therefore, if...else is useful when there are exactly two possible paths.
----------------------------------------
Common Mistake — Using = Instead of ==
----------------------------------------
Do not use assignment = when comparing values.
Incorrect:
if age = 18:
    print("Age is 18")
Correct:
if age == 18:
    print("Age is 18")
Remember:
=  → Assignment
== → Comparison
----------------------------------------
Common Mistake — Missing Colon
----------------------------------------
Incorrect:
if age >= 18
    print("Adult")
Correct:
if age >= 18:
    print("Adult")
The colon is required after the condition and after else.
----------------------------------------
Common Mistake — Incorrect Indentation
----------------------------------------
Incorrect:
if age >= 18:
print("Adult")
else:
print("Minor")
Correct:
if age >= 18:
    print("Adult")
else:
    print("Minor")
Python uses indentation to identify the blocks.
----------------------------------------
Key Rules
----------------------------------------
• if checks the condition.
• True → execute the if block.
• False → execute the else block.
• Only one branch executes.
• if and else must be aligned.
• Statements inside each block must be indented.
• A colon is required after if and else.
• Conditions can contain comparisons, expressions, Boolean values, and logical operators.
----------------------------------------
Summary
----------------------------------------
The if...else statement allows Python programs to choose between two different execution paths. When the condition is True, Python executes the if block. When the condition is False, Python executes the else block. This makes if...else one of the most important tools for creating decision-based and interactive Python programs.`,
},
{
  heading: "The if...elif...else Statement",
  body: `The if...elif...else statement is used when a program needs to choose between more than two possible conditions.
The if statement checks the first condition.
If the first condition is False, Python checks the elif condition.
Python can have multiple elif blocks.
If none of the if or elif conditions are True, the else block executes.
Only one branch of the entire if...elif...else chain executes.
----------------------------------------
Basic Syntax
----------------------------------------
if condition_1:
    statement_1
elif condition_2:
    statement_2
elif condition_3:
    statement_3
else:
    statement_4
The conditions are checked from top to bottom.
As soon as Python finds a True condition, it executes that block and skips the remaining branches.
----------------------------------------
Basic Example
----------------------------------------
marks = 75
if marks >= 90:
    print("Grade A+")
elif marks >= 75:
    print("Grade A")
elif marks >= 60:
    print("Grade B")
else:
    print("Needs Improvement")
Output:
Grade A
Python checks:
marks >= 90
75 >= 90
False
Then:
marks >= 75
75 >= 75
True
Therefore Python executes:
print("Grade A")
Python does not check the remaining elif and else blocks.
----------------------------------------
How Python Checks Conditions
----------------------------------------
Consider:
temperature = 25
if temperature >= 40:
    print("Very Hot")
elif temperature >= 30:
    print("Hot")
elif temperature >= 20:
    print("Pleasant")
else:
    print("Cold")
Python checks:
40 or above → False
30 or above → False
20 or above → True
Therefore:
Pleasant
is printed.
The checking stops as soon as a True condition is found.
----------------------------------------
Why Use elif?
----------------------------------------
Without elif, multiple independent if statements may execute.
Example:
marks = 85
if marks >= 40:
    print("Pass")
if marks >= 75:
    print("Good")
if marks >= 90:
    print("Excellent")
Output:
Pass
Good
Here, multiple conditions can execute.
With elif:
if marks >= 90:
    print("Excellent")
elif marks >= 75:
    print("Good")
elif marks >= 40:
    print("Pass")
else:
    print("Fail")
Output:
Good
Only one branch executes.
----------------------------------------
Order of Conditions Matters
----------------------------------------
Python checks conditions from top to bottom.
Example:
marks = 95
if marks >= 40:
    print("Pass")
elif marks >= 75:
    print("Good")
elif marks >= 90:
    print("Excellent")
else:
    print("Fail")
Output:
Pass
The first condition is already True, so Python never reaches the later conditions.
Better ordering:
if marks >= 90:
    print("Excellent")
elif marks >= 75:
    print("Good")
elif marks >= 40:
    print("Pass")
else:
    print("Fail")
Output:
Excellent
More specific conditions should generally be checked before broader conditions.
----------------------------------------
Using Multiple elif Blocks
----------------------------------------
Python allows multiple elif conditions.
Example:
score = 82
if score >= 90:
    print("A+")
elif score >= 80:
    print("A")
elif score >= 70:
    print("B")
elif score >= 60:
    print("C")
elif score >= 50:
    print("D")
else:
    print("F")
Output:
A
Only the first matching condition is executed.
----------------------------------------
The else Block Is Optional
----------------------------------------
An if...elif chain does not require an else block.
Example:
age = 25
if age < 18:
    print("Minor")
elif age >= 18:
    print("Adult")
If no condition is True and there is no else block, Python simply continues with the next statement.
----------------------------------------
Using Comparison Operators
----------------------------------------
elif conditions can use all comparison operators.
Example:
number = 0
if number > 0:
    print("Positive")
elif number < 0:
    print("Negative")
else:
    print("Zero")
Output:
Zero
This is a common pattern for classifying a number.
----------------------------------------
Using Logical Operators
----------------------------------------
Multiple conditions can be combined using and, or, and not.
Example:
age = 25
salary = 50000
if age >= 18 and salary >= 40000:
    print("Eligible")
elif age >= 18:
    print("Age eligible but salary is low")
else:
    print("Not eligible")
----------------------------------------
Using Strings
----------------------------------------
A string can be used to select between different options.
Example:
language = "Python"
if language == "Python":
    print("Python selected")
elif language == "Java":
    print("Java selected")
elif language == "C++":
    print("C++ selected")
else:
    print("Unknown language")
Output:
Python selected
----------------------------------------
Real-World Example — Login
----------------------------------------
role = "admin"
if role == "admin":
    print("Open Admin Dashboard")
elif role == "developer":
    print("Open Developer Dashboard")
elif role == "student":
    print("Open Student Dashboard")
else:
    print("Access Denied")
The program selects the appropriate dashboard based on the user's role.
----------------------------------------
Real-World Example — Grade System
----------------------------------------
marks = 86
if marks >= 90:
    grade = "A+"
elif marks >= 80:
    grade = "A"
elif marks >= 70:
    grade = "B"
elif marks >= 60:
    grade = "C"
elif marks >= 50:
    grade = "D"
else:
    grade = "F"
print(grade)
Output:
A
----------------------------------------
Real-World Example — Age Category
----------------------------------------
age = 25
if age < 13:
    print("Child")
elif age < 18:
    print("Teenager")
elif age < 60:
    print("Adult")
else:
    print("Senior Citizen")
Python evaluates each condition in order.
Because age is 25:
age < 13 → False
age < 18 → False
age < 60 → True
Output:
Adult
----------------------------------------
Real-World Example — Temperature
----------------------------------------
temperature = 32
if temperature >= 40:
    print("Extremely Hot")
elif temperature >= 30:
    print("Hot")
elif temperature >= 20:
    print("Comfortable")
elif temperature >= 10:
    print("Cool")
else:
    print("Cold")
Output:
Hot
----------------------------------------
Nested if Inside elif
----------------------------------------
An elif branch can contain another if statement.
Example:
age = 25
has_id = True
if age < 18:
    print("Underage")
elif age >= 18:
    if has_id:
        print("Entry allowed")
    else:
        print("ID required")
The inner if is evaluated only when the elif condition is True.
----------------------------------------
elif Must Belong to an if
----------------------------------------
An elif cannot be used independently.
Incorrect:
elif age >= 18:
    print("Adult")
Python will raise a SyntaxError.
Correct:
if age < 18:
    print("Minor")
elif age >= 18:
    print("Adult")
----------------------------------------
else Must Come Last
----------------------------------------
The else block must always come after the if and all elif blocks.
Correct:
if score >= 90:
    print("A+")
elif score >= 75:
    print("A")
else:
    print("Needs Improvement")
Incorrect:
if score >= 90:
    print("A+")
else:
    print("Needs Improvement")
elif score >= 75:
    print("A")
The elif after else is invalid syntax.
----------------------------------------
Indentation Rules
----------------------------------------
The if, elif, and else keywords must be aligned.
Correct:
if condition:
    print("First")
elif another_condition:
    print("Second")
else:
    print("Third")
The statements inside each branch must be indented.
----------------------------------------
Colon Requirement
----------------------------------------
A colon is required after every if, elif, and else statement.
Correct:
if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")
----------------------------------------
Important Difference Between if and elif
----------------------------------------
Multiple independent if statements:
if condition_1:
    statement_1
if condition_2:
    statement_2
Both conditions can execute if both are True.
if...elif:
if condition_1:
    statement_1
elif condition_2:
    statement_2
Only the first True branch executes.
Use separate if statements when multiple actions may need to happen.
Use if...elif...else when exactly one decision path should be selected.
----------------------------------------
Mental Model
----------------------------------------
Think of if...elif...else like a decision chain:
if → Try the first condition.
elif → Try the next condition if the previous one failed.
elif → Continue checking.
else → Execute when nothing matched.
The flow is:
Condition 1
↓
True → Execute Block 1 → Finish
False
↓
Condition 2
↓
True → Execute Block 2 → Finish
False
↓
Condition 3
↓
True → Execute Block 3 → Finish
False
↓
else → Execute Default Block
----------------------------------------
Key Rules
----------------------------------------
• if starts the conditional chain.
• elif means "else if".
• Multiple elif blocks are allowed.
• Conditions are checked from top to bottom.
• The first True condition wins.
• Only one branch executes.
• else handles the case where no condition is True.
• else is optional.
• else must always come last.
• elif must come before else.
• if, elif, and else must be properly indented.
• A colon is required after every condition and else.
• The order of conditions can change the result.
----------------------------------------
Summary
----------------------------------------
The if...elif...else statement allows Python programs to make decisions among multiple possible choices. Python evaluates conditions from top to bottom and immediately executes the first block whose condition is True. If none of the conditions are True, the optional else block executes. Understanding condition order, indentation, and the difference between independent if statements and an if...elif...else chain is essential for writing reliable Python programs.`,
},

{
  heading: "Nested if Statements",
  body: `A nested if statement is an if statement placed inside another if statement. It is used when a program needs to make a second decision only after a first condition has been satisfied.
Think of nested if statements as a decision inside another decision.
For example:
First check whether a person is an adult.
If they are an adult, then check whether they have an ID.
Only when both conditions are satisfied should entry be allowed.
----------------------------------------
Basic Syntax
----------------------------------------
if condition_1:
    if condition_2:
        statement
The inner if belongs to the outer if block, so it must have one additional indentation level.
----------------------------------------
Basic Example
----------------------------------------
age = 20
if age >= 18:
    print("You are an adult")
    if age >= 21:
        print("You are 21 or older")
Output:
You are an adult
The outer condition is True, so Python enters the outer block.
It then evaluates the inner condition.
20 >= 21 is False, so the inner print statement is skipped.
----------------------------------------
Understanding the Execution Flow
----------------------------------------
Consider:
age = 25
if age >= 18:
    print("Adult")
    if age >= 21:
        print("21 or older")
Python first checks:
age >= 18
25 >= 18
True
Python enters the outer block.
Then it checks:
age >= 21
25 >= 21
True
Therefore both statements execute.
Output:
Adult
21 or older
----------------------------------------
Nested if with else
----------------------------------------
An inner if can also have an else block.
Example:
age = 20
has_id = True
if age >= 18:
    if has_id:
        print("Entry allowed")
    else:
        print("ID required")
else:
    print("Underage")
Here, Python first checks the person's age.
If the person is an adult, Python then checks whether they have an ID.
----------------------------------------
Step-by-Step Execution
----------------------------------------
Suppose:
age = 20
has_id = True
Python checks:
age >= 18
Result:
True
Python enters the outer block.
Then:
has_id
Result:
True
Python executes:
Entry allowed
Output:
Entry allowed
----------------------------------------
When the Outer Condition is False
----------------------------------------
Example:
age = 16
has_id = True
if age >= 18:
    if has_id:
        print("Entry allowed")
    else:
        print("ID required")
else:
    print("Underage")
The outer condition is False.
Therefore Python never checks the inner if statement.
Output:
Underage
This is an important property of nested conditions:
If the outer condition fails, the inner condition is never evaluated.
----------------------------------------
Nested if with Multiple Levels
----------------------------------------
Python allows more than one level of nesting.
Example:
age = 25
has_id = True
is_member = True
if age >= 18:
    if has_id:
        if is_member:
            print("Premium entry allowed")
Here:
Level 1:
if age >= 18:
Level 2:
    if has_id:
Level 3:
        if is_member:
Each nested block is indented one additional level.
----------------------------------------
Nested if with elif
----------------------------------------
An inner conditional can also contain elif.
Example:
age = 25
if age >= 18:
    if age >= 60:
        print("Senior")
    elif age >= 30:
        print("Middle-aged")
    else:
        print("Young adult")
else:
    print("Minor")
The outer if first checks whether the person is an adult.
Only then does the inner if...elif...else chain execute.
----------------------------------------
Nested if vs Multiple Conditions
----------------------------------------
Sometimes nested if statements can be replaced with logical operators.
Nested version:
age = 25
has_id = True
if age >= 18:
    if has_id:
        print("Entry allowed")
Equivalent logical condition:
if age >= 18 and has_id:
    print("Entry allowed")
Both can produce the same result.
The best choice depends on how complex the decision is and whether separate stages of validation make the code clearer.
----------------------------------------
Nested if for Validation
----------------------------------------
Nested conditions are useful when validation must happen in stages.
Example:
username = "admin"
password = "python123"
if username == "admin":
    if password == "python123":
        print("Login successful")
    else:
        print("Incorrect password")
else:
    print("Unknown username")
The password is checked only after the username is confirmed.
----------------------------------------
Real-World Example — ATM
----------------------------------------
balance = 5000
withdrawal = 2000
pin_correct = True
if pin_correct:
    if withdrawal <= balance:
        print("Withdrawal successful")
    else:
        print("Insufficient balance")
else:
    print("Incorrect PIN")
The program first verifies the PIN.
Only after the PIN is correct does it check the account balance.
----------------------------------------
Real-World Example — Student Eligibility
----------------------------------------
age = 20
marks = 75
if age >= 18:
    if marks >= 60:
        print("Eligible for the program")
    else:
        print("Marks requirement not satisfied")
else:
    print("Age requirement not satisfied")
The program checks age first and marks second.
----------------------------------------
Real-World Example — Online Purchase
----------------------------------------
logged_in = True
balance = 5000
price = 3000
if logged_in:
    if balance >= price:
        print("Purchase successful")
    else:
        print("Insufficient balance")
else:
    print("Please login first")
The purchase check occurs only when the user is logged in.
----------------------------------------
Indentation in Nested if
----------------------------------------
Indentation is extremely important in nested conditions.
Correct:
if age >= 18:
    if has_id:
        print("Entry allowed")
Incorrect:
if age >= 18:
if has_id:
    print("Entry allowed")
The inner if must be indented because it belongs to the outer if block.
----------------------------------------
Identifying Which Block a Statement Belongs To
----------------------------------------
Look at the indentation level.
Example:
if condition_1:
    print("A")
    if condition_2:
        print("B")
    print("C")
print("D")
Here:
print("A") → Outer if block
if condition_2 → Outer if block
print("B") → Inner if block
print("C") → Outer if block
print("D") → Outside both if statements
This is why indentation is part of Python's syntax.
----------------------------------------
Nested if with Boolean Values
----------------------------------------
Boolean variables are often useful in nested conditions.
Example:
is_logged_in = True
is_admin = True
if is_logged_in:
    if is_admin:
        print("Admin dashboard")
    else:
        print("User dashboard")
else:
    print("Please login")
The second decision is made only after the first condition succeeds.
----------------------------------------
Nested if with Membership
----------------------------------------
Example:
language = "Python"
level = "Beginner"
if language in ["Python", "Java"]:
    if level == "Beginner":
        print("Beginner programming course")
    else:
        print("Advanced programming course")
else:
    print("Language not supported")
----------------------------------------
Avoiding Unnecessary Nesting
----------------------------------------
Nested if statements are useful, but excessive nesting can make code difficult to read.
For simple conditions, logical operators can sometimes make the code cleaner.
Nested:
if age >= 18:
    if has_id:
        print("Allowed")
Cleaner:
if age >= 18 and has_id:
    print("Allowed")
However, nested conditions can be clearer when each decision represents a separate validation step.
----------------------------------------
Important Rules
----------------------------------------
• A nested if is an if statement inside another if statement.
• The inner if executes only when execution reaches it.
• If the outer condition is False, the inner condition is skipped.
• Each nested block requires additional indentation.
• Nested if can contain else and elif.
• Nested conditions can be combined with logical operators when appropriate.
• Avoid unnecessary levels of nesting because deeply nested code can become difficult to maintain.
----------------------------------------
Mental Model
----------------------------------------
Think of nested if as a series of locked doors.
First door:
Are you 18 or older?
If No → Stop.
If Yes → Continue.
Second door:
Do you have an ID?
If No → Stop.
If Yes → Continue.
Third door:
Are you a member?
If No → Stop.
If Yes → Allow entry.
Each decision is reached only after the previous decision succeeds.
----------------------------------------
Summary
----------------------------------------
Nested if statements allow Python programs to make decisions inside other decisions. The outer condition controls whether execution reaches the inner condition. Each additional level requires additional indentation. Nested conditions are especially useful for staged validation, authentication, permissions, eligibility checks, and other situations where one decision depends on another.`,
},

{
  heading: "Ternary (Conditional) Expression",
  body: `A ternary expression is a short and compact way to write a simple if...else decision in a single line.
It is useful when you need to choose between exactly two values based on one condition.
Instead of writing multiple lines with if and else, Python allows the decision to be written as an expression.
----------------------------------------
Basic Syntax
----------------------------------------
value_if_true if condition else value_if_false
Python first evaluates the condition.
If the condition is True, value_if_true is returned.
If the condition is False, value_if_false is returned.
----------------------------------------
Basic Example
----------------------------------------
age = 20
status = "Adult" if age >= 18 else "Minor"
print(status)
Output:
Adult
Python evaluates:
age >= 18
20 >= 18
True
Therefore:
status = "Adult"
----------------------------------------
Equivalent if...else
----------------------------------------
Ternary expression:
age = 20
status = "Adult" if age >= 18 else "Minor"
Equivalent normal conditional:
age = 20
if age >= 18:
    status = "Adult"
else:
    status = "Minor"
Both produce the same result.
The ternary expression is simply a shorter form for simple two-way decisions.
----------------------------------------
Another Example
----------------------------------------
number = 7
result = "Even" if number % 2 == 0 else "Odd"
print(result)
Output:
Odd
The condition:
number % 2 == 0
is False because 7 % 2 is 1.
Therefore:
result = "Odd"
----------------------------------------
Using Numbers
----------------------------------------
age = 25
fee = 1000 if age >= 18 else 500
print(fee)
Output:
1000
The value assigned to fee depends on the condition.
----------------------------------------
Using Comparison Operators
----------------------------------------
marks = 85
result = "Pass" if marks >= 40 else "Fail"
print(result)
Output:
Pass
This is useful when a program needs to select one of two simple results.
----------------------------------------
Using Boolean Values
----------------------------------------
is_logged_in = True
message = "Welcome" if is_logged_in else "Please login"
print(message)
Output:
Welcome
----------------------------------------
Using Strings
----------------------------------------
name = "Rahul"
message = "User found" if name == "Rahul" else "User not found"
print(message)
Output:
User found
----------------------------------------
Using Expressions
----------------------------------------
a = 10
b = 20
larger = a if a > b else b
print(larger)
Output:
20
The expression selects whichever value is larger.
----------------------------------------
Finding the Minimum
----------------------------------------
a = 15
b = 8
smallest = a if a < b else b
print(smallest)
Output:
8
----------------------------------------
Finding the Maximum
----------------------------------------
a = 15
b = 8
largest = a if a > b else b
print(largest)
Output:
15
----------------------------------------
Ternary Expression with Function Calls
----------------------------------------
is_valid = True
message = "Valid" if is_valid else "Invalid"
print(message)
A function result can also be used as the condition.
----------------------------------------
Nested Ternary Expressions
----------------------------------------
A ternary expression can technically contain another ternary expression.
Example:
marks = 85
grade = "A" if marks >= 90 else "B" if marks >= 75 else "C"
print(grade)
Output:
B
Python evaluates the conditions from left to right.
However, deeply nested ternary expressions can become difficult to read.
For complex decisions, normal if...elif...else statements are usually better.
----------------------------------------
Ternary Expression vs if...elif...else
----------------------------------------
Use a ternary expression when there are only two simple outcomes.
Example:
result = "Pass" if marks >= 40 else "Fail"
For multiple conditions, use if...elif...else.
Example:
if marks >= 90:
    grade = "A+"
elif marks >= 75:
    grade = "A"
elif marks >= 60:
    grade = "B"
else:
    grade = "C"
Trying to put many decisions into one ternary expression can reduce readability.
----------------------------------------
Ternary Expression Returns a Value
----------------------------------------
One important difference is that a ternary expression produces a value.
Example:
age = 20
status = "Adult" if age >= 18 else "Minor"
The selected value is assigned to status.
This makes ternary expressions useful inside assignments and other expressions.
----------------------------------------
Using Ternary Inside print()
----------------------------------------
You can use a ternary expression directly inside a function call.
Example:
age = 20
print("Adult" if age >= 18 else "Minor")
Output:
Adult
No separate variable is required.
----------------------------------------
Using Ternary in Calculations
----------------------------------------
Example:
age = 20
discount = 10 if age >= 18 else 5
price = 1000
final_price = price - discount
print(final_price)
The ternary expression determines the discount value.
----------------------------------------
Truthy and Falsy Conditions
----------------------------------------
A ternary expression can use Python's truthy and falsy values.
Example:
name = "Rahul"
message = "Name exists" if name else "Name is empty"
print(message)
Output:
Name exists
A non-empty string is truthy.
An empty string is falsy.
----------------------------------------
Using None
----------------------------------------
value = None
message = "Available" if value is not None else "No value"
print(message)
Output:
No value
The is operator is commonly used when checking against None.
----------------------------------------
Using Logical Operators
----------------------------------------
age = 25
has_id = True
status = "Allowed" if age >= 18 and has_id else "Denied"
print(status)
Output:
Allowed
The complete logical condition is evaluated before Python selects the value.
----------------------------------------
Real-World Example — Login Status
----------------------------------------
logged_in = True
status = "Online" if logged_in else "Offline"
print(status)
Output:
Online
----------------------------------------
Real-World Example — Pass or Fail
----------------------------------------
marks = 72
result = "Pass" if marks >= 40 else "Fail"
print(result)
Output:
Pass
----------------------------------------
Real-World Example — Positive or Negative
----------------------------------------
number = -10
result = "Positive" if number > 0 else "Negative or Zero"
print(result)
Output:
Negative or Zero
----------------------------------------
Important Rules
----------------------------------------
• A ternary expression is a compact form of a simple if...else decision.
• It must contain a condition.
• It provides two possible values or expressions.
• The syntax is value_if_true if condition else value_if_false.
• The condition is evaluated first.
• Only one of the two expressions is selected.
• A ternary expression produces a value.
• It can be used in assignments, function calls, calculations, and other expressions.
• Use normal if...elif...else when the logic becomes complex.
• Avoid deeply nested ternary expressions because they can reduce readability.
----------------------------------------
Mental Model
----------------------------------------
Think of a ternary expression as:
Is the condition True?
↓
Yes → Choose the first value.
No → Choose the second value.
Example:
age = 20
status = "Adult" if age >= 18 else "Minor"
The decision is:
age >= 18?
Yes → "Adult"
No → "Minor"
----------------------------------------
Summary
----------------------------------------
A ternary expression provides a concise way to choose between two values based on a condition. It is especially useful for short and simple decisions such as Pass or Fail, Adult or Minor, Online or Offline, and selecting the larger or smaller value. For complex decision-making, regular if...elif...else statements are easier to read and maintain.`,
},

{
  heading: "The match...case Statement",
  body: `The match...case statement is a pattern matching feature introduced in Python 3.10. It provides a clean way to compare a value against multiple possible patterns and execute the code associated with the first matching pattern.
It is similar to a switch statement found in some other programming languages, but Python's match...case is more powerful because it supports pattern matching, literals, structures, sequences, mappings, and conditions.
The basic idea is:
Take a value.
Compare it with different patterns.
When a pattern matches, execute that case.
----------------------------------------
Basic Syntax
----------------------------------------
match value:
    case pattern_1:
        statement_1
    case pattern_2:
        statement_2
    case pattern_3:
        statement_3
    case _:
        default_statement
Here:
match → Starts the pattern-matching statement.
value → The value Python will compare against the cases.
case → Defines a possible matching pattern.
_ → Wildcard pattern that matches anything.
----------------------------------------
Simple Example
----------------------------------------
day = 2
match day:
    case 1:
        print("Monday")
    case 2:
        print("Tuesday")
    case 3:
        print("Wednesday")
    case _:
        print("Invalid day")
Output:
Tuesday
Python evaluates the value of day and checks each case from top to bottom.
day = 2
case 1 → No match
case 2 → Match
Python executes:
print("Tuesday")
After a case matches, the remaining cases are not executed.
----------------------------------------
How match...case Works
----------------------------------------
Python follows a simple process:
1. Evaluate the expression after match.
2. Compare the resulting value against the first case.
3. If the pattern matches, execute that case.
4. Stop checking further cases.
5. If no case matches, execute the wildcard case if it exists.
Example:
command = "start"
match command:
    case "start":
        print("Starting...")
    case "stop":
        print("Stopping...")
    case "pause":
        print("Paused")
    case _:
        print("Unknown command")
Output:
Starting...
----------------------------------------
The Wildcard Pattern _
----------------------------------------
The underscore _ is commonly used as the default case.
Example:
choice = 5
match choice:
    case 1:
        print("Option 1")
    case 2:
        print("Option 2")
    case 3:
        print("Option 3")
    case _:
        print("Invalid option")
Because 5 does not match 1, 2, or 3, the _ case executes.
The wildcard means:
"Match anything that reaches this case."
----------------------------------------
match...case Without a Default
----------------------------------------
The wildcard case is optional.
Example:
status = "success"
match status:
    case "success":
        print("Operation completed")
    case "failed":
        print("Operation failed")
If status contains another value, nothing happens because there is no matching case.
----------------------------------------
Matching Strings
----------------------------------------
match...case works very well with strings.
Example:
command = "login"
match command:
    case "login":
        print("Opening login page")
    case "logout":
        print("Logging out")
    case "profile":
        print("Opening profile")
    case _:
        print("Unknown command")
This is useful for menu systems, commands, application states, and user actions.
----------------------------------------
Matching Integers
----------------------------------------
Example:
option = 2
match option:
    case 1:
        print("Create account")
    case 2:
        print("Login")
    case 3:
        print("Exit")
    case _:
        print("Invalid option")
Output:
Login
----------------------------------------
Matching Boolean Values
----------------------------------------
Boolean values can also be matched.
Example:
is_admin = True
match is_admin:
    case True:
        print("Admin access")
    case False:
        print("Regular user")
----------------------------------------
Multiple Values in One Case
----------------------------------------
The | operator can be used to match multiple alternatives.
Example:
day = "Saturday"
match day:
    case "Saturday" | "Sunday":
        print("Weekend")
    case "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday":
        print("Weekday")
    case _:
        print("Invalid day")
Output:
Weekend
The first case matches either Saturday or Sunday.
----------------------------------------
Using Conditions with if
----------------------------------------
A case can have an additional condition using a guard with if.
Example:
age = 25
match age:
    case age if age >= 18:
        print("Adult")
    case _:
        print("Minor")
The pattern matches the value and the guard then checks the additional condition.
The guard is useful when simple pattern matching is not enough.
----------------------------------------
Matching Exact Values
----------------------------------------
Example:
status = "success"
match status:
    case "success":
        print("Request completed")
    case "error":
        print("Request failed")
    case "pending":
        print("Request is still processing")
    case _:
        print("Unknown status")
This style is useful when working with fixed application states.
----------------------------------------
Matching Tuples
----------------------------------------
One of the powerful features of match...case is that it can match the structure of data.
Example:
point = (10, 20)
match point:
    case (0, 0):
        print("Origin")
    case (0, y):
        print("On Y-axis")
    case (x, 0):
        print("On X-axis")
    case (x, y):
        print("Point:", x, y)
Output:
Point: 10 20
Here x and y capture values from the tuple.
The pattern:
(x, y)
matches a two-element tuple and assigns its values to x and y.
----------------------------------------
Capturing Values
----------------------------------------
Patterns can capture values into variables.
Example:
point = (5, 10)
match point:
    case (x, y):
        print("X =", x)
        print("Y =", y)
Output:
X = 5
Y = 10
This is different from simply comparing the complete tuple.
The pattern extracts the individual values.
----------------------------------------
Matching Lists
----------------------------------------
Sequence patterns can also be used.
Example:
numbers = [1, 2, 3]
match numbers:
    case [1, 2, 3]:
        print("Exact sequence")
    case [1, 2, x]:
        print("Last value:", x)
    case _:
        print("Different sequence")
Output:
Exact sequence
Python checks the structure and values of the list.
----------------------------------------
Matching Different Structures
----------------------------------------
Example:
data = ("Rahul", 21)
match data:
    case (name, age):
        print("Name:", name)
        print("Age:", age)
The pattern matches the two-element sequence and captures its values.
----------------------------------------
The _ Wildcard in Patterns
----------------------------------------
The wildcard can ignore a value.
Example:
point = (10, 20)
match point:
    case (0, 0):
        print("Origin")
    case (x, _):
        print("X coordinate:", x)
The underscore means:
"I don't care about this value."
Output:
X coordinate: 10
----------------------------------------
Matching Dictionaries
----------------------------------------
match...case can also match dictionary structures.
Example:
user = {"name": "Rahul", "role": "admin"}
match user:
    case {"name": name, "role": "admin"}:
        print(name, "is an admin")
    case {"name": name}:
        print(name, "is a user")
    case _:
        print("Unknown data")
Output:
Rahul is an admin
This is particularly useful when working with structured data such as API responses.
----------------------------------------
Real-World Example — Menu System
----------------------------------------
choice = 2
match choice:
    case 1:
        print("Create Account")
    case 2:
        print("Login")
    case 3:
        print("View Profile")
    case 4:
        print("Exit")
    case _:
        print("Invalid choice")
This provides a clean way to implement menu-based applications.
----------------------------------------
Real-World Example — HTTP Status
----------------------------------------
status = 404
match status:
    case 200:
        print("Success")
    case 201:
        print("Created")
    case 400:
        print("Bad Request")
    case 401:
        print("Unauthorized")
    case 404:
        print("Not Found")
    case 500:
        print("Server Error")
    case _:
        print("Unknown status")
This pattern is useful in backend development when handling API responses.
----------------------------------------
Real-World Example — User Role
----------------------------------------
role = "admin"
match role:
    case "admin":
        print("Full access")
    case "developer":
        print("Development access")
    case "student":
        print("Student access")
    case _:
        print("Limited access")
----------------------------------------
match...case vs if...elif...else
----------------------------------------
For simple value comparisons:
match...case can be cleaner.
Example:
match command:
    case "start":
        print("Start")
    case "stop":
        print("Stop")
    case "pause":
        print("Pause")
The equivalent if...elif structure is:
if command == "start":
    print("Start")
elif command == "stop":
    print("Stop")
elif command == "pause":
    print("Pause")
Both approaches are valid.
Use the structure that makes the logic easiest to understand.
----------------------------------------
When to Use match...case
----------------------------------------
match...case is useful when:
• Comparing one value against many possible patterns.
• Building menu systems.
• Handling commands.
• Processing application states.
• Matching API responses.
• Working with tuples and sequences.
• Extracting values from structured data.
• Matching dictionaries and structured objects.
• Implementing pattern-based logic.
----------------------------------------
When if...elif Is Better
----------------------------------------
Use if...elif when the logic mainly consists of independent conditions or complex comparisons.
Example:
temperature = 35
if temperature > 40:
    print("Very Hot")
elif temperature > 30:
    print("Hot")
elif temperature > 20:
    print("Normal")
This type of range-based decision is usually clearer with if...elif.
----------------------------------------
Important Difference
----------------------------------------
if...elif primarily evaluates Boolean conditions.
match...case primarily performs pattern matching.
Example:
if:
    condition → True or False
match:
    value → pattern
This distinction becomes especially useful when working with structured data.
----------------------------------------
Indentation Rules
----------------------------------------
Like other Python control-flow statements, match and case use indentation.
Correct:
match value:
    case 1:
        print("One")
    case 2:
        print("Two")
Incorrect:
match value:
case 1:
    print("One")
The case must be indented inside match.
The statement inside case must be indented one additional level.
----------------------------------------
Version Requirement
----------------------------------------
match...case was introduced in Python 3.10.
Therefore, your Python version should be Python 3.10 or newer to use this feature.
You can check your Python version with:
python --version
Example:
Python 3.12.0
If you are using an older Python version, match...case will not be available.
----------------------------------------
Important Rules
----------------------------------------
• match starts pattern matching.
• case defines a pattern.
• Cases are evaluated from top to bottom.
• The first matching case executes.
• _ can be used as a wildcard/default case.
• Multiple alternatives can be combined using |.
• A case can use an if guard.
• Patterns can match values and data structures.
• Patterns can capture values into variables.
• match...case requires Python 3.10 or newer.
• Proper indentation is required.
• The wildcard case should normally be placed last.
----------------------------------------
Mental Model
----------------------------------------
Think of match...case as a pattern detector.
Given:
value
Python asks:
Does it match case 1?
No → Try case 2.
No → Try case 3.
Yes → Execute that case and finish.
No cases match → Execute _ if provided.
For structured data, Python can also ask:
Does the shape match?
Do the values match?
Can values be extracted?
Are additional conditions satisfied?
This makes match...case more powerful than a basic switch-style statement.
----------------------------------------
Summary
----------------------------------------
The match...case statement is Python's pattern matching system, introduced in Python 3.10. It allows programs to compare values against multiple patterns and can handle simple values as well as structured data such as tuples, lists, and dictionaries. The first matching case is executed, while the wildcard _ can provide a default branch. For simple value-based decisions, match...case can make code cleaner and easier to read, while if...elif remains preferable for many range-based and complex Boolean conditions.`,
},

{
  heading: "The pass Statement",
  body: `The pass statement is a Python statement that does nothing.
It is used as a placeholder when Python requires a statement to be present, but you do not want to execute any code yet.
In simple words:
pass = "Do nothing for now."
The pass statement is especially useful while designing a program, creating empty functions or classes, leaving a conditional branch temporarily empty, or preparing code that will be implemented later.
----------------------------------------
Basic Syntax
----------------------------------------
pass
The pass statement does not require parentheses, arguments, or any additional syntax.
----------------------------------------
Basic Example
----------------------------------------
if True:
    pass
Python accepts this code and simply does nothing when the pass statement executes.
Without pass:
if True:
Python raises an IndentationError because Python expects an indented statement after the colon.
With pass:
if True:
    pass
The block is syntactically complete.
----------------------------------------
Why Do We Need pass?
----------------------------------------
Python does not allow certain blocks to remain completely empty.
For example:
if age >= 18:
Python expects an indented statement after the colon.
If you are not ready to write the logic yet, use pass:
if age >= 18:
    pass
This tells Python:
"The block is intentionally empty."
----------------------------------------
pass Does Not Mean Stop
----------------------------------------
An important point is that pass does not stop program execution.
It simply does nothing and then Python continues with the next statement.
Example:
print("Start")
pass
print("End")
Output:
Start
End
The pass statement does not terminate the program.
----------------------------------------
pass vs break
----------------------------------------
pass and break have completely different purposes.
pass:
Does nothing.
break:
Immediately exits the current loop.
Example:
for i in range(3):
    pass
print("Loop completed")
The loop continues normally.
Example:
for i in range(3):
    break
print("Loop stopped")
Here break terminates the loop.
----------------------------------------
pass vs continue
----------------------------------------
pass and continue are also different.
pass does nothing.
continue skips the remaining statements of the current loop iteration and moves to the next iteration.
Example:
for i in range(3):
    pass
The loop continues normally.
Example:
for i in range(3):
    continue
The current iteration immediately moves to the next iteration.
----------------------------------------
pass Inside if
----------------------------------------
pass can be used when a condition should intentionally perform no action.
Example:
age = 15
if age >= 18:
    pass
else:
    print("Minor")
Output:
Minor
When age is 15, the else block executes.
When age is 18 or above, the if block executes pass and does nothing.
----------------------------------------
pass Inside if...elif...else
----------------------------------------
Example:
status = "pending"
if status == "success":
    print("Success")
elif status == "pending":
    pass
else:
    print("Failed")
When status is "pending", Python intentionally performs no action.
This can be useful when a particular state needs to be handled later.
----------------------------------------
pass Inside Loops
----------------------------------------
pass can be used inside for and while loops.
Example:
for number in range(5):
    pass
The loop still executes five iterations, but no visible action occurs during those iterations.
After the loop:
print("Finished")
Output:
Finished
----------------------------------------
pass Inside a for Loop with a Condition
----------------------------------------
Example:
for number in range(1, 6):
    if number == 3:
        pass
    else:
        print(number)
Output:
1
2
4
5
The pass itself produces no output.
When number is 3, Python simply does nothing for that iteration.
----------------------------------------
pass Inside a while Loop
----------------------------------------
Example:
count = 0
while count < 3:
    pass
    count += 1
The pass does nothing, while count += 1 allows the loop to progress.
Output:
No output
The loop finishes after count reaches 3.
----------------------------------------
Empty Function with pass
----------------------------------------
A function body cannot be completely empty.
This is invalid:
def calculate():
Python expects an indented statement.
Use pass when the function will be implemented later:
def calculate():
    pass
Now Python accepts the function definition.
The function can be called:
calculate()
Nothing happens because its body contains only pass.
----------------------------------------
Placeholder Function
----------------------------------------
pass is commonly used while designing an application.
Example:
def login():
    pass
def register():
    pass
def logout():
    pass
These functions are placeholders.
Later, you can replace pass with the actual implementation.
----------------------------------------
Empty Class with pass
----------------------------------------
A class body also cannot be completely empty.
Example:
class Student:
    pass
This creates a valid class without defining any attributes or methods yet.
You can then create an object:
student = Student()
print(student)
The class exists even though it currently has no custom behavior.
----------------------------------------
Placeholder Class in Project Development
----------------------------------------
When building a large Python application, you may define the structure first and implement functionality later.
Example:
class AIModel:
    pass
class Database:
    pass
class APIClient:
    pass
This allows the program structure to be created before the implementation is completed.
----------------------------------------
pass in Exception Handling
----------------------------------------
pass can be used when an exception should intentionally be ignored.
Example:
try:
    number = int("abc")
except ValueError:
    pass
The ValueError occurs, but the except block intentionally performs no action.
The program can then continue.
However, silently ignoring exceptions should be done carefully because it can hide real problems.
----------------------------------------
pass as a Temporary Placeholder
----------------------------------------
One of the most common uses of pass is during development.
Suppose you are planning a function:
def calculate_salary():
    pass
Later, you can replace it with:
def calculate_salary():
    salary = 50000
    bonus = 5000
    return salary + bonus
The pass statement is useful while the function is still under development.
----------------------------------------
pass in Conditional Branches
----------------------------------------
Sometimes a branch is intentionally inactive.
Example:
feature_enabled = False
if feature_enabled:
    pass
else:
    print("Feature is currently disabled")
The pass makes the empty branch valid Python code.
----------------------------------------
pass Does Not Return a Value
----------------------------------------
pass itself does not produce a useful value.
It is a statement, not a value-producing expression.
Example:
def example():
    pass
Calling example() returns None because the function reaches the end without a return statement.
The None result comes from the function's behavior, not because pass explicitly returns None.
----------------------------------------
pass vs return
----------------------------------------
These statements have very different purposes.
pass:
Does nothing and continues execution.
return:
Ends a function and optionally sends a value back to the caller.
Example:
def first():
    pass
    print("Still running")
first()
Output:
Still running
Example:
def second():
    return
    print("This never runs")
second()
The return statement ends the function immediately.
----------------------------------------
pass vs print
----------------------------------------
pass does not display anything.
Example:
pass
There is no output.
print displays information:
print("Hello")
Output:
Hello
Therefore, pass should not be used when you want to display something.
----------------------------------------
pass vs comments
----------------------------------------
A comment is ignored by Python and is mainly used to explain code.
Example:
# Add login logic here
A pass statement is actual Python code that makes an otherwise empty block syntactically valid.
Example:
def login():
    pass
A comment alone cannot always replace pass.
For example:
def login():
    # Login logic will be added later
Depending on the block, Python still requires an actual statement.
Using pass makes the placeholder explicit.
----------------------------------------
Using pass During Prototyping
----------------------------------------
When developing a large application, you may know the structure before knowing the implementation.
Example:
def authenticate_user():
    pass
def generate_token():
    pass
def analyze_resume():
    pass
def recommend_career():
    pass
Later, each placeholder can be replaced with actual Python logic.
This is useful during the early design stage of software development.
----------------------------------------
Important Rules
----------------------------------------
• pass is a valid Python statement.
• It performs no operation.
• It is mainly used as a placeholder.
• It can be used inside if statements.
• It can be used inside loops.
• It can be used inside functions.
• It can be used inside classes.
• It can be used inside exception handlers.
• It does not stop a loop.
• It does not exit a function.
• It does not return a value.
• It does not produce output.
• It allows intentionally empty blocks to remain syntactically valid.
----------------------------------------
Mental Model
----------------------------------------
Think of pass as an empty instruction.
Python:
"Execute this statement."
pass:
"Do nothing."
Then Python:
"Continue with the next statement."
Example:
print("A")
pass
print("B")
Execution:
A
↓
pass → nothing happens
↓
B
----------------------------------------
When to Use pass
----------------------------------------
Use pass when:
• A function is planned but not implemented yet.
• A class is planned but not implemented yet.
• A conditional branch intentionally has no action.
• A loop body needs a placeholder.
• An exception should intentionally be ignored.
• You are prototyping the structure of a program.
• You want to temporarily leave a block empty.
----------------------------------------
When Not to Use pass
----------------------------------------
Do not use pass when you actually need an action.
If you want to exit a loop, use break.
If you want to skip the current loop iteration, use continue.
If you want to exit a function, use return.
If you want to display something, use print().
If you want to explain code, use a comment.
----------------------------------------
Summary
----------------------------------------
The pass statement is Python's simplest placeholder statement. It intentionally performs no operation while allowing a code block to remain syntactically valid. It is commonly used during development, prototyping, empty functions, empty classes, conditional branches, loops, and selected exception handlers. Remember that pass does not stop execution, exit a function, skip a loop iteration, or return a value. It simply does nothing and allows Python to continue.`,
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
            detail: "Loops allow Python to repeat a block of code efficiently. The for loop is used to iterate over sequences and other iterable objects, while the while loop repeats code as long as a condition remains True. Learn iteration, range(), loop control, and nested loops to build reliable Python programs.",
            subsections: [
              {
  heading: "Introduction to Loops",
  body: `A loop is a control-flow structure used to execute the same block of code repeatedly.
Instead of writing the same statements again and again, Python allows us to place them inside a loop and repeat them automatically.
Loops are one of the most important concepts in programming because many real-world problems require repetitive operations.
For example, a program may need to:
Print numbers from 1 to 100.
Process every student in a class.
Read every item from a list.
Check every character in a string.
Process thousands of records from a database.
Repeat an operation until a condition becomes False.
Without loops, these tasks would require writing the same code many times.
----------------------------------------
Simple Example Without a Loop
----------------------------------------
print("Hello")
print("Hello")
print("Hello")
print("Hello")
print("Hello")
The same statement is repeated five times.
This works, but it is inefficient and difficult to maintain.
----------------------------------------
The Same Example With a Loop
----------------------------------------
for i in range(5):
    print("Hello")
Output:
Hello
Hello
Hello
Hello
Hello
The loop allows Python to repeat the print statement automatically.
----------------------------------------
Why Do We Need Loops?
----------------------------------------
Loops reduce repetitive code and make programs shorter, cleaner, and easier to maintain.
Consider printing numbers from 1 to 100.
Without a loop, you would need 100 print statements.
With a loop:
for number in range(1, 101):
    print(number)
The same logic handles all 100 numbers.
----------------------------------------
Basic Loop Concept
----------------------------------------
A loop generally has three important parts:
Start
↓
Check or obtain the next value
↓
Execute the loop body
↓
Repeat
Eventually, the loop reaches its stopping condition or runs out of values.
----------------------------------------
Types of Loops in Python
----------------------------------------
Python primarily provides two looping statements:
1. for loop
2. while loop
The for loop is generally used when iterating over an iterable or when you know the sequence of values that should be processed.
The while loop is used when repetition should continue as long as a condition remains True.
----------------------------------------
The for Loop
----------------------------------------
The for loop iterates over items in an iterable.
An iterable is an object that can provide its elements one at a time.
Examples include:
Lists
Tuples
Strings
Sets
Dictionaries
Ranges
Many other Python objects
Example:
numbers = [10, 20, 30]
for number in numbers:
    print(number)
Output:
10
20
30
Python takes each element from numbers and assigns it to number one at a time.
----------------------------------------
The for Loop Is Iteration
----------------------------------------
Consider:
names = ["Rahul", "Anita", "Kiran"]
for name in names:
    print(name)
Python performs:
name = "Rahul"
print("Rahul")
Then:
name = "Anita"
print("Anita")
Then:
name = "Kiran"
print("Kiran")
The loop automatically moves from one element to the next.
----------------------------------------
The while Loop
----------------------------------------
A while loop repeatedly executes a block of code while a condition is True.
Example:
count = 1
while count <= 5:
    print(count)
    count += 1
Output:
1
2
3
4
5
The condition:
count <= 5
is checked before every iteration.
When count becomes 6, the condition becomes False and the loop stops.
----------------------------------------
for vs while
----------------------------------------
The main difference is how repetition is controlled.
for:
Iterates through an iterable.
Example:
for number in [1, 2, 3]:
    print(number)
while:
Continues while a condition is True.
Example:
number = 1
while number <= 3:
    print(number)
    number += 1
A for loop is often convenient when processing a known collection of values.
A while loop is useful when the number of repetitions depends on a changing condition.
----------------------------------------
Iteration
----------------------------------------
Iteration means executing the loop body once for each cycle of the loop.
Example:
for number in range(3):
    print(number)
There are three iterations:
Iteration 1 → number = 0
Iteration 2 → number = 1
Iteration 3 → number = 2
Each execution of the loop body is called an iteration.
----------------------------------------
Loop Variable
----------------------------------------
The variable used by a for loop is called the loop variable.
Example:
for name in ["Rahul", "Anita", "Kiran"]:
    print(name)
Here:
name → loop variable
The loop variable receives one element during each iteration.
The variable name can be anything meaningful.
Example:
for student in students:
    print(student)
for item in items:
    print(item)
for number in numbers:
    print(number)
Meaningful variable names make loops easier to understand.
----------------------------------------
Loop Body
----------------------------------------
The statements that execute repeatedly are called the loop body.
Example:
for number in range(3):
    print("Number:", number)
    print("Processing...")
Both print statements belong to the loop body because they are indented.
Output:
Number: 0
Processing...
Number: 1
Processing...
Number: 2
Processing...
----------------------------------------
Indentation in Loops
----------------------------------------
Python uses indentation to identify the statements belonging to a loop.
Correct:
for number in range(3):
    print(number)
Incorrect:
for number in range(3):
print(number)
The loop body must be indented.
----------------------------------------
Loops and Conditions
----------------------------------------
Loops can contain conditional statements.
Example:
for number in range(1, 6):
    if number % 2 == 0:
        print(number, "is even")
Output:
2 is even
4 is even
This allows programs to repeat an operation while making decisions during each iteration.
----------------------------------------
Conditions Inside while Loops
----------------------------------------
A while loop can also contain conditions.
Example:
number = 1
while number <= 5:
    if number % 2 == 0:
        print(number, "is even")
    number += 1
Output:
2 is even
4 is even
----------------------------------------
Nested Loops
----------------------------------------
A loop can be placed inside another loop.
This is called a nested loop.
Example:
for i in range(3):
    for j in range(2):
        print(i, j)
The inner loop runs completely for each iteration of the outer loop.
Nested loops are commonly used for tables, matrices, grids, combinations, and many algorithmic problems.
----------------------------------------
Infinite Loops
----------------------------------------
A loop that never becomes False or never reaches the end of its iterable is called an infinite loop.
Example:
while True:
    print("Running")
The condition True never becomes False, so the loop continues indefinitely.
Infinite loops can be intentional, such as in continuously running services, but they can also happen accidentally.
----------------------------------------
Accidental Infinite Loop
----------------------------------------
Example:
count = 1
while count <= 5:
    print(count)
If count is never changed, the condition remains True forever.
A corrected version:
count = 1
while count <= 5:
    print(count)
    count += 1
The variable controlling the condition must eventually change so that the loop can terminate.
----------------------------------------
Loop Termination
----------------------------------------
Every loop needs a way to finish.
A for loop normally terminates when all elements of its iterable have been processed.
A while loop terminates when its condition becomes False.
Example:
for number in range(3):
    print(number)
The loop ends automatically after processing 0, 1, and 2.
Example:
count = 1
while count <= 3:
    print(count)
    count += 1
The loop ends when count becomes 4.
----------------------------------------
Loops Can Process Large Amounts of Data
----------------------------------------
Loops are especially powerful when processing large collections.
Example:
students = ["Rahul", "Anita", "Kiran", "Priya"]
for student in students:
    print("Processing:", student)
The same operation is applied to every student.
The collection could contain thousands or millions of items without requiring separate statements for every item.
----------------------------------------
Loops in Real Python Applications
----------------------------------------
Loops appear throughout real software development.
Examples:
Processing API responses.
Reading files line by line.
Processing database records.
Validating user input.
Searching collections.
Training machine-learning data.
Processing images.
Generating reports.
Iterating through JSON data.
Handling multiple users or requests.
Building menus.
Running repeated background tasks.
----------------------------------------
Loops in AI and Data Processing
----------------------------------------
Loops are also important in AI and data-related programming.
Example:
scores = [85, 90, 78, 92]
total = 0
for score in scores:
    total += score
average = total / len(scores)
print(average)
Output:
86.25
The loop processes every score and calculates the total.
Many data-processing operations follow this same basic idea:
Take one item.
Process it.
Move to the next item.
Continue until all items are processed.
----------------------------------------
Loop Control Statements
----------------------------------------
Python provides statements that allow you to control loop execution.
The most important ones are:
break
continue
pass
break → immediately exits the loop.
continue → skips the current iteration and moves to the next iteration.
pass → does nothing and acts as a placeholder.
These will be covered separately in detail.
----------------------------------------
for...else and while...else
----------------------------------------
Python also allows an else block to be associated with a loop.
Example:
for number in range(3):
    print(number)
else:
    print("Loop completed")
The loop else executes when the loop finishes normally.
It does not execute when the loop is terminated using break.
This is a distinct Python feature and will be covered separately.
----------------------------------------
Loop Execution Flow
----------------------------------------
A loop can be visualized as:
Start
↓
Get value / Check condition
↓
Execute loop body
↓
Update or move to next value
↓
Repeat
↓
Loop finished?
No → Repeat
Yes → Continue with the next statement
Understanding this flow makes both for and while loops much easier to understand.
----------------------------------------
Choosing the Right Loop
----------------------------------------
Use a for loop when you want to iterate over:
A list.
A tuple.
A string.
A set.
A dictionary.
A range.
Another iterable.
Example:
for item in items:
    print(item)
Use a while loop when repetition depends on a condition.
Example:
while password != correct_password:
    password = input("Enter password: ")
The loop continues until the condition becomes False.
----------------------------------------
Important Rules
----------------------------------------
• Loops repeat a block of code.
• Python has two primary loops: for and while.
• A for loop iterates over an iterable.
• A while loop continues while its condition is True.
• Each execution of a loop body is an iteration.
• Loop variables receive values during iteration.
• Loop bodies must be properly indented.
• A loop can contain if statements.
• A loop can contain another loop.
• A nested loop is a loop inside another loop.
• for loops normally finish after all iterable elements are processed.
• while loops must eventually reach a False condition unless intentionally infinite.
• break can terminate a loop.
• continue can skip an iteration.
• pass performs no operation.
----------------------------------------
Mental Model
----------------------------------------
Think of a loop like processing a queue of tasks.
For a for loop:
Take the next item.
Process it.
Take the next item.
Process it.
Continue until there are no items left.
For a while loop:
Check the condition.
If True → perform the task.
Check again.
If True → perform the task again.
Continue until the condition becomes False.
----------------------------------------
Summary
----------------------------------------
Loops allow Python programs to repeat operations efficiently without duplicating code. Python provides two primary looping mechanisms: for and while. The for loop is designed for iterating over iterable objects such as lists, strings, dictionaries, sets, and ranges, while the while loop continues as long as a condition remains True. Loops can contain conditions, nested loops, and loop-control statements. Understanding iteration, loop variables, loop bodies, termination, and the difference between for and while provides the foundation for writing efficient Python programs.`,
},
{

}

            ],
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
  project:  "bg-indigo-100 text-indigo-700 border-indigo-200",
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
  official: "bg-slate-950/70 text-slate-200 hover:bg-slate-900",
  article:  "bg-slate-950/70 text-slate-200 hover:bg-slate-900",
  video:    "bg-slate-950/70 text-red-300 hover:bg-slate-900",
  course:   "bg-slate-950/70 text-indigo-300 hover:bg-slate-900",
  platform: "bg-slate-950/70 text-violet-300 hover:bg-slate-900",
  tool:     "bg-slate-950/70 text-amber-300 hover:bg-slate-900",
};

// ─────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────

function ResourceLink({ r }) {
  const color = RESOURCE_COLORS[r.type] || RESOURCE_COLORS.article;
  const icon  = RESOURCE_ICONS[r.type]  || <FiExternalLink className="text-xs" />;
  return (
    <a href={r.url} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${color}`}>
      {icon}{r.label}
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────
// SubsectionAccordion — clean vertical accordion, full-width
// No side-by-side split. Each subtopic opens inline below its tab.
// ─────────────────────────────────────────────────────────────────
function SubsectionAccordion({ subsections }) {
  const [active, setActive] = useState(null);

  const toggle = (i) => setActive(prev => prev === i ? null : i);

  const renderBody = (body) => {
    const lines = body.split("\n");
    const output = [];
    let i = 0;
    while (i < lines.length) {
      const t = lines[i].trim();
      i++;
      if (!t || t === "---") continue;

      // Arrow / separator lines
      if (t.startsWith("↓") || t.startsWith("→") || t === "↓" || t === "→") {
        output.push(
          <div key={i} className="flex items-center gap-2 py-1">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-indigo-400 text-xs font-bold">{t}</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
        );
        continue;
      }

      // Bullet points
      if (t.startsWith("•") || (t.startsWith("-") && t.length > 2 && t[1] === " ")) {
        output.push(
          <div key={i} className="flex items-start gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-2" />
            <span className="text-slate-300 text-sm leading-6">{t.replace(/^[•\-]\s*/, "")}</span>
          </div>
        );
        continue;
      }

      // Numbered items like "1. Something" or "1) Something"
      if (/^\d+[.)]\s/.test(t)) {
        const num = t.match(/^(\d+)/)[1];
        const text = t.replace(/^\d+[.)]\s*/, "");
        output.push(
          <div key={i} className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{num}</span>
            <span className="text-slate-300 text-sm leading-6">{text}</span>
          </div>
        );
        continue;
      }

      // Code-like inline lines (short variable assignments)
      if (/^[a-z_A-Z][\w]*\s*=\s*.+/.test(t) && t.length < 72 && !t.includes(" is ") && !t.includes(" are ")) {
        output.push(
          <div key={i} className="font-mono text-xs bg-[#0b0f18] border border-white/5 px-3 py-1.5 rounded-lg text-emerald-300">{t}</div>
        );
        continue;
      }

      // Hash comment lines
      if (t.startsWith("#") && t.length < 80) {
        output.push(
          <div key={i} className="font-mono text-xs bg-[#0b0f18] border border-white/5 px-3 py-1.5 rounded-lg text-slate-400 italic">{t}</div>
        );
        continue;
      }

      // Label → value pairs
      if (t.includes("→") && t.length < 80) {
        const [lbl, ...rest] = t.split("→");
        output.push(
          <div key={i} className="flex items-center gap-2 font-mono text-xs bg-[#0b0f18] border border-white/5 px-3 py-1.5 rounded-lg">
            <span className="text-slate-100 font-bold">{lbl.trim()}</span>
            <span className="text-slate-600">→</span>
            <span className="text-indigo-300">{rest.join("→").trim()}</span>
          </div>
        );
        continue;
      }

      // Uppercase label lines
      if (/^[A-Z][A-Z\s]+:$/.test(t)) {
        output.push(<p key={i} className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest pt-2 pb-0.5">{t}</p>);
        continue;
      }

      // Normal paragraph text
      output.push(<p key={i} className="text-slate-300 text-sm leading-6">{t}</p>);
    }
    return output;
  };

  return (
    <div className="rounded-xl bg-[#0d111b] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/70">
        <FiBookOpen className="text-indigo-400 text-xs flex-shrink-0" />
        <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-widest">Full Concept</span>
        <span className="ml-auto text-[10px] text-slate-500 font-medium">{subsections.length} subtopics</span>
      </div>

      {/* Accordion items — full width, vertical */}
      <div className="divide-y divide-slate-800/60">
        {subsections.map((sub, i) => {
          const isOpen = active === i;
          return (
            <div key={i}>
              <button
                onClick={() => toggle(i)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                  isOpen ? "bg-slate-900/70" : "bg-slate-950/60 hover:bg-slate-900/70"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0 ${
                    isOpen ? "bg-indigo-500 text-slate-950" : "bg-slate-800 text-slate-400"
                  }`}>{i + 1}</span>
                  <span className={`text-sm font-semibold leading-snug ${
                    isOpen ? "text-slate-100" : "text-slate-300"
                  }`}>{sub.heading}</span>
                </div>
                <div className={`ml-3 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                  <FiChevronDown className={`text-sm ${isOpen ? "text-indigo-500" : "text-slate-300"}`} />
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-2 bg-slate-950/70 space-y-2">
                  {renderBody(sub.body)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// tokenizePython — splits one Python line into colored token objects
// ─────────────────────────────────────────────────────────────────
const PY_KEYWORDS = new Set([
  "def","class","return","import","from","if","elif","else","for","while",
  "in","not","and","or","True","False","None","try","except","finally","with",
  "as","pass","break","continue","yield","lambda","del","global","nonlocal",
  "raise","assert","is","async","await",
]);
const PY_BUILTINS = new Set([
  "print","range","len","type","int","str","float","bool","list","dict","set",
  "tuple","input","open","enumerate","zip","map","filter","sorted","reversed",
  "sum","min","max","abs","round","isinstance","hasattr","getattr","setattr",
  "super","property","staticmethod","classmethod","next","iter","any","all",
]);

function tokenizeLine(raw) {
  // Preserve leading indent exactly
  const indent = raw.match(/^( *)/)[1];
  const code   = raw.slice(indent.length);

  // Detect trailing comment, skip # inside strings
  let body    = code;
  let comment = "";
  let inStr   = false;
  let strChar = "";
  for (let ci = 0; ci < code.length; ci++) {
    const ch = code[ci];
    if (!inStr && (ch === '"' || ch === "'")) { inStr = true; strChar = ch; }
    else if (inStr && ch === strChar && code[ci-1] !== "\\") inStr = false;
    else if (!inStr && ch === "#") { comment = code.slice(ci); body = code.slice(0, ci); break; }
  }

  // Regex tokenizer: strings, numbers, identifiers, operators, whitespace
  const TOKEN_RE = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\d+\.?\d*|[a-zA-Z_]\w*|\s+|[^\w\s"'])/g;
  const tokens = [];
  let m;
  while ((m = TOKEN_RE.exec(body)) !== null) {
    const tok = m[0];
    if (!tok) continue;
    let cls = "";
    if (/^["']/.test(tok))                     cls = "text-amber-300";
    else if (/^\d/.test(tok))                 cls = "text-orange-300";
    else if (PY_KEYWORDS.has(tok))             cls = "text-violet-400 font-semibold";
    else if (PY_BUILTINS.has(tok))             cls = "text-cyan-300";
    else if (/^[A-Z_][A-Z0-9_]{2,}$/.test(tok)) cls = "text-orange-200";
    else if (/^[A-Z][a-zA-Z]+/.test(tok))     cls = "text-emerald-300";
    else if (/^[=<>!+\-*/%&|^~()\[\]{},.:;@]/.test(tok)) cls = "text-slate-400";
    else if (/^\s+$/.test(tok))               cls = "";
    else                                       cls = "text-slate-100";
    tokens.push({ text: tok, cls });
  }

  return { indent, tokens, comment };
}

// ─────────────────────────────────────────────────────────────────
// SyntaxLine — renders ONE line, preserving exact indentation
// ─────────────────────────────────────────────────────────────────
function SyntaxLine({ line }) {
  const { indent, tokens, comment } = tokenizeLine(line);
  return (
    <span>
      {indent ? <span>{indent}</span> : null}
      {tokens.map((tok, i) =>
        tok.cls
          ? <span key={i} className={tok.cls}>{tok.text}</span>
          : <span key={i}>{tok.text}</span>
      )}
      {comment ? <span className="text-slate-500 italic">{comment}</span> : null}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────
// CodeBlock — syntax-highlighted Python code editor look
// ─────────────────────────────────────────────────────────────────
function CodeBlock({ code, filename = "solution.py" }) {
  const lines = code.split("\n");
  return (
    <div className="rounded-xl overflow-hidden border border-white/5 shadow-xl">
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#161b22] border-b border-white/5">
        <div className="flex gap-1.5">
          <span className="block w-3 h-3 rounded-full bg-red-500/70" />
          <span className="block w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="block w-3 h-3 rounded-full bg-emerald-500/70" />
        </div>
        <span className="text-[11px] text-slate-500 font-mono">{filename}</span>
        <span className="ml-auto text-[10px] text-slate-600 font-mono">Python 3.12 🐍</span>
      </div>
      <div className="flex bg-[#0d1117] overflow-x-auto">
        <div className="select-none flex-shrink-0 py-3 pl-3 pr-4 border-r border-white/5 text-right">
          {lines.map((_, i) => (
            <div key={i} className="text-[11px] text-slate-600 font-mono leading-5">{i + 1}</div>
          ))}
        </div>
        <pre className="flex-1 py-3 px-4 text-[12px] font-mono leading-5 overflow-x-auto whitespace-pre max-h-80 overflow-y-auto">
          {lines.map((line, i) => (
            <div key={i}>
              <SyntaxLine line={line} />
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// ConceptBox — visual highlight for important concept explanations
// ─────────────────────────────────────────────────────────────────
function ConceptBox({ type = "info", children }) {
  const styles = {
    info:    { bg:"bg-indigo-500/10", border:"border-indigo-500/20", icon:"💡", label:"Key Concept",  text:"text-indigo-300", label_c:"text-indigo-400" },
    tip:     { bg:"bg-emerald-500/10",border:"border-emerald-500/20",icon:"⚡", label:"Pro Tip",      text:"text-emerald-300",label_c:"text-emerald-400"},
    warning: { bg:"bg-amber-500/10",  border:"border-amber-500/20",  icon:"⚠️", label:"Watch Out",   text:"text-amber-200",  label_c:"text-amber-400"  },
    syntax:  { bg:"bg-violet-500/10", border:"border-violet-500/20", icon:"📐", label:"Syntax",      text:"text-violet-200", label_c:"text-violet-400" },
    memory:  { bg:"bg-sky-500/10",    border:"border-sky-500/20",    icon:"🧠", label:"Remember",    text:"text-sky-200",    label_c:"text-sky-400"    },
  };
  const s = styles[type] || styles.info;
  return (
    <div className={`rounded-xl border ${s.bg} ${s.border} px-4 py-3`}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-sm">{s.icon}</span>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${s.label_c}`}>{s.label}</span>
      </div>
      <div className={`text-sm leading-6 ${s.text}`}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SectionTopicShowcase — vertical topic list left + full content right
// Uses full available width, readable at any screen size
// ─────────────────────────────────────────────────────────────────
function SectionTopicShowcase({ section, levelKey, progress, onToggle }) {
  const [activeTab, setActiveTab] = useState(0);
  const panelRef = useRef(null);

  const handleTabChange = (i) => {
    setActiveTab(i);
    panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const topic = section.topics[activeTab];
  const key   = `${levelKey}-${section.id}-${activeTab}`;
  const checked = !!progress[key];
  const typeLabel = TYPE_LABELS[topic?.type] || "Concept";
  const doneCnt = section.topics.filter((_, ti) => progress[`${levelKey}-${section.id}-${ti}`]).length;

  return (
    <div className="flex flex-col md:flex-row min-h-0">

      {/* ── LEFT: Topic list — clean, no boxes, just rows ── */}
      <div className="md:w-52 flex-shrink-0 border-b md:border-b-0 md:border-r border-white/5 bg-[#0b0f18]">
        {/* Tiny header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {section.topics.length} Topics
          </span>
          <span className="text-[10px] text-indigo-400 font-bold">{doneCnt} done</span>
        </div>
        {/* Topic list — plain rows, no pill boxes */}
        <div>
          {section.topics.map((t, ti) => {
            const isActive = ti === activeTab;
            const isDone   = !!progress[`${levelKey}-${section.id}-${ti}`];
            return (
              <button key={ti} onClick={() => handleTabChange(ti)}
                className={`w-full text-left flex items-start gap-2.5 px-4 py-3 border-b border-white/[0.04] transition-all group relative ${
                  isActive ? "bg-indigo-600/10" : "hover:bg-white/[0.02]"
                }`}>
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-indigo-500 rounded-full" />
                )}
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                  isDone ? "bg-indigo-600 border-indigo-600" : isActive ? "border-indigo-500" : "border-slate-700 group-hover:border-slate-500"
                }`}>
                  {isDone && (
                    <svg viewBox="0 0 10 10" className="w-2 h-2 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1.5 5.5l2 2 5-4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold leading-4 ${
                    isDone ? "line-through text-slate-600" : isActive ? "text-slate-100" : "text-slate-400 group-hover:text-slate-200"
                  }`}>{t.title}</p>
                  <p className={`text-[10px] mt-0.5 ${isActive ? "text-indigo-400" : "text-slate-600"}`}>
                    {TYPE_LABELS[t.type] || "Concept"}
                    {t.subsections?.length > 0 && ` · ${t.subsections.length} subtopics`}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── RIGHT: Full content panel — uses remaining width ── */}
      <div ref={panelRef} className="flex-1 min-w-0 overflow-y-auto bg-[#0d111b]" style={{ maxHeight: "560px" }}>
        {topic && (
          <div key={`${activeTab}-content`} style={{ animation: "topicFadeIn 0.18s ease-out both" }}>

            {/* Topic header */}
            <div className="px-5 pt-5 pb-4 border-b border-white/5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 uppercase tracking-wider">
                      {typeLabel}
                    </span>
                    {topic.subsections?.length > 0 && (
                      <span className="text-[10px] text-slate-500">{topic.subsections.length} subtopics</span>
                    )}
                    {checked && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">✓ Completed</span>
                    )}
                  </div>
                  <h3 className={`font-extrabold text-lg leading-tight ${checked ? "line-through text-slate-500" : "text-slate-50"}`}>
                    {topic.title}
                  </h3>
                </div>
                <button onClick={() => onToggle(key)}
                  className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 transition-all ${
                    checked ? "bg-indigo-600 text-white" : "bg-white/5 border border-white/10 text-slate-400 hover:border-indigo-500/50 hover:text-indigo-300"
                  }`}>
                  <FiCheckCircle className="text-xs" />
                  {checked ? "Done" : "Mark done"}
                </button>
              </div>

              <p className="text-sm text-slate-400 mt-3 leading-6">{topic.detail}</p>
            </div>

            {/* Content body */}
            <div className="px-5 py-4 space-y-4">

              {/* Visual concept boxes for important keywords in detail */}
              {topic.type === "concept" && (
                <ConceptBox type="syntax">
                  <span className="font-mono text-xs">
                    {topic.title.toLowerCase().includes("variable") && "variable_name = value  # Python infers type automatically"}
                    {topic.title.toLowerCase().includes("function") && "def function_name(params):\n    # body\n    return value"}
                    {topic.title.toLowerCase().includes("class") && "class ClassName:\n    def __init__(self, ...):\n        self.attr = value"}
                    {topic.title.toLowerCase().includes("loop") && "for item in iterable:  # for-each\n    # body\nwhile condition:  # while loop\n    # body"}
                    {topic.title.toLowerCase().includes("if") && "if condition:\n    # runs if True\nelif other:\n    # else-if\nelse:\n    # fallback"}
                    {topic.title.toLowerCase().includes("list") && "my_list = [1, 2, 3]    # mutable, ordered\nmy_list.append(4)       # add to end O(1)\nmy_list[0]              # access by index O(1)"}
                    {topic.title.toLowerCase().includes("dict") && "my_dict = {key: value}  # hash table O(1) lookup\nmy_dict[key] = val      # set\nmy_dict.get(key, default)  # safe access"}
                    {topic.title.toLowerCase().includes("string") && 'text = "Python"   # str — immutable sequence\nf"Hello {name}"   # f-string formatting\ntext[0]           # indexing\ntext[::-1]        # slicing reversed'}
                    {!["variable","function","class","loop","if","list","dict","string"].some(k => topic.title.toLowerCase().includes(k)) && `# ${topic.title}\n# See code examples below`}
                  </span>
                </ConceptBox>
              )}

              {/* Subsections */}
              {topic.subsections?.length > 0 && (
                <SubsectionAccordion subsections={topic.subsections} />
              )}

              {/* Code block with syntax highlighting */}
              {topic.code && (
                <CodeBlock code={topic.code} filename={`${topic.title.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "")} .py`} />
              )}

              {/* Resources */}
              {topic.resources?.length > 0 && (
                <div className="rounded-xl bg-[#0b0f18] border border-white/5 p-4">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <FiArrowRight className="text-indigo-400 text-xs" /> Resources & Links
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {topic.resources.map((r, i) => <ResourceLink key={i} r={r} />)}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`\n        @keyframes topicFadeIn {\n          from { opacity: 0; transform: translateY(5px); }\n          to   { opacity: 1; transform: translateY(0); }\n        }\n      `}</style>
    </div>
  );
}

function TopicCard({ topic, checked, onToggle }) {
  const [open, setOpen] = useState(false);
  const typeColor = TYPE_COLORS[topic.type] || TYPE_COLORS.concept;
  const typeLabel = TYPE_LABELS[topic.type] || "Concept";
  const hasSubsections = topic.subsections?.length > 0;

  return (
    <div className={`rounded-2xl transition-all duration-200 overflow-hidden ${
      checked ? "bg-[#0d1420]" : "bg-[#0d1420] ring-1 ring-slate-800/20 hover:ring-slate-700/30"
    }`}>
      {/* Header */}
      <div className="flex items-start gap-3 px-4 py-3">
          <button onClick={onToggle}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
            checked ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-700 hover:border-indigo-600"
          }`}>
          {checked && <FiCheckCircle className="text-[11px]" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-3 mb-1 text-[10px] text-slate-400">
            <span className="uppercase tracking-[0.18em]">{typeLabel}</span>
            {hasSubsections && (
              <span>{topic.subsections.length} subtopics</span>
            )}
          </div>
          <h4 className={`font-bold text-sm ${checked ? "line-through text-slate-500" : "text-slate-100"}`}>{topic.title}</h4>
          {!open && <p className="text-xs text-slate-400 mt-1 line-clamp-1">{topic.detail}</p>}
        </div>
        <button onClick={() => setOpen(v => !v)}
          className="text-slate-500 hover:text-slate-300 transition-colors p-1 flex-shrink-0">
          {open ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      </div>

      {/* Expanded content */}
      {open && (
        <div className="px-4 pb-4 space-y-4 pt-4">

          {/* Main detail */}
          <p className="text-sm text-slate-300 leading-6">{topic.detail}</p>

          {/* Subsections accordion — full concept breakdown */}
          {hasSubsections && (
            <SubsectionAccordion subsections={topic.subsections} />
          )}

          {/* Code block with syntax highlighting */}
          {topic.code && (
            <CodeBlock code={topic.code} filename={`${topic.title.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "")}.py`} />
          )}

          {/* Resources */}
          {topic.resources?.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Resources</p>
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
    emerald: { ring:"ring-indigo-400", node:"bg-indigo-500", bg:"bg-indigo-500" },
    blue:    { ring:"ring-blue-400",    node:"bg-blue-500",    bg:"bg-blue-500"    },
    violet:  { ring:"ring-violet-400",  node:"bg-violet-500",  bg:"bg-violet-500"  },
    orange:  { ring:"ring-orange-400",  node:"bg-orange-500",  bg:"bg-orange-500"  },
    pink:    { ring:"ring-pink-400",    node:"bg-pink-500",    bg:"bg-pink-500"    },
  };
  const c = colorMap[data.color] || colorMap['emerald'] || { ring:"ring-indigo-400", node:"bg-indigo-500", bg:"bg-indigo-500" };

  const isOpen = globalOpen === data.level;
  const toggleSection = (id) => setOpenSections(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  return (
    <div id={`level-${data.level}`}
      className="rounded-2xl transition-all duration-200 bg-[#0d1420] ring-1 ring-slate-800/20 hover:ring-slate-700/30">

      {/* Level Header */}
      <button onClick={() => onGlobalOpen(isOpen ? null : data.level)}
        className="w-full text-left px-5 py-4 flex items-center gap-4">
        {/* Level badge */}
        <div className={`w-14 h-14 ${c.node} rounded-2xl flex flex-col items-center justify-center text-white flex-shrink-0 shadow-lg`}>
          <span className="text-xl leading-none">{data.emoji}</span>
          <span className="text-[10px] font-bold mt-0.5">LVL {data.level}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h2 className="font-extrabold text-slate-50 text-lg">{data.label}</h2>
            {pct === 100 && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-900/40 text-indigo-400">Complete ✓</span>}
          </div>
          <p className="text-sm text-slate-400">{data.tagline}</p>
          {/* Progress bar */}
          <div className="mt-2 flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-500 ${c.bg}`} style={{ width: `${pct}%` }} />
            </div>
            <span className={`text-xs font-bold ${data.text}`}>{doneTopics}/{totalTopics}</span>
          </div>
        </div>

        <div className="text-slate-500 flex-shrink-0">
          {isOpen ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}
        </div>
      </button>

      {/* Expanded content */}
      {isOpen && (
        <div className="px-4 pb-5 space-y-4">

          {/* Sections */}
          {data.sections.map(section => {
            const secDone  = section.topics.filter((_, ti) => progress[`${data.level}-${section.id}-${ti}`]).length;
            const secTotal = section.topics.length;
            const secPct   = secTotal ? Math.round((secDone / secTotal) * 100) : 0;
            const isSecOpen= openSections.has(section.id);

            return (
              <div key={section.id} className={`rounded-xl overflow-hidden border transition-all ${
                isSecOpen ? "border-indigo-500/20" : "border-white/5 hover:border-white/10"
              }`}>
                {/* Section header */}
                <button onClick={() => toggleSection(section.id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 text-left transition-all ${
                    isSecOpen ? "bg-indigo-600/10" : "bg-[#0f1522] hover:bg-[#111827]"
                  }`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
                      isSecOpen ? "bg-indigo-500/20" : "bg-white/5"
                    }`}>{section.emoji}</div>
                    <div className="min-w-0">
                      <p className={`font-bold text-sm ${isSecOpen ? "text-slate-100" : "text-slate-200"}`}>{section.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{section.why}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    {/* Mini progress */}
                    <div className="hidden sm:flex items-center gap-2">
                      <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${secPct === 100 ? "bg-emerald-500" : "bg-indigo-500"}`} style={{ width:`${secPct}%` }} />
                      </div>
                      <span className={`text-[10px] font-bold tabular-nums ${secPct === 100 ? "text-emerald-400" : "text-slate-500"}`}>{secDone}/{secTotal}</span>
                    </div>
                    <div className={`transition-transform duration-200 ${isSecOpen ? "rotate-180" : ""}`}>
                      <FiChevronDown className={`text-sm ${isSecOpen ? "text-indigo-400" : "text-slate-600"}`} />
                    </div>
                  </div>
                </button>

                {/* Section content */}
                {isSecOpen && (
                  <div className="bg-[#0b0f18] border-t border-white/5">
                    <SectionTopicShowcase section={section} levelKey={data.level} progress={progress} onToggle={onToggle} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Resources & YouTube */}
          <div className="rounded-2xl bg-[#0f1720] overflow-hidden">
            <button onClick={() => setShowResources(v => !v)}
              className="w-full flex items-center justify-between px-4 py-3 bg-slate-900/40 hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-2">
                <FiBookOpen className="text-slate-400" />
                <p className="font-bold text-slate-200 text-sm">YouTube Channels & Platforms</p>
              </div>
              {showResources ? <FiChevronUp className="text-slate-500" /> : <FiChevronDown className="text-slate-500" />}
            </button>

            {showResources && (
              <div className="space-y-4 p-4 text-slate-300">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500 mb-2 flex items-center gap-2">
                    <FiYoutube className="text-red-500" /> YouTube Channels
                  </p>
                  <div className="space-y-2">
                    {data.youtube.map((y, i) => (
                      <a key={i} href={y.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/40 hover:bg-slate-900/60 transition-colors group">
                        <FiYoutube className="text-red-400 flex-shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-100 group-hover:underline">{y.channel}</p>
                          <p className="text-xs text-slate-400 mt-1">{y.note}</p>
                        </div>
                        <FiExternalLink className="text-slate-500 text-xs ml-auto flex-shrink-0 mt-0.5" />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500 mb-2 flex items-center gap-2">
                    <FiGlobe className="text-indigo-300" /> Practice Platforms
                  </p>
                  <div className="space-y-2">
                    {data.platforms.map((p, i) => (
                      <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/40 hover:bg-slate-900/60 transition-colors group">
                        <FiCode className="text-indigo-300 flex-shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-100 group-hover:underline">{p.name}</p>
                          <p className="text-xs text-slate-400 mt-1">{p.note}</p>
                        </div>
                        <FiExternalLink className="text-slate-500 text-xs ml-auto flex-shrink-0 mt-0.5" />
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
      <div className="w-full -mx-4 sm:-mx-6 -my-4 lg:-my-8 px-4 sm:px-6 lg:px-8 pb-8 bg-[#0a0e17] min-h-screen">

        {/* ── HERO ── */}
        <div className="mb-6 relative pt-6">
          <div className="absolute -top-10 -left-10 w-56 h-56 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-6 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-800/20 text-indigo-400 text-xs font-bold px-4 py-2 rounded-full mb-5">
              <span className="text-base">🐍</span>
              Python Career Roadmap 2025
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse ml-1" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-50 tracking-tight mb-3 leading-tight">
              Zero to Python Pro
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              A practical, step-by-step roadmap from absolute beginner to AI Engineer.
              Every topic includes real code, curated resources, and YouTube channels.
              Check off topics as you complete them — progress saves to your browser.
            </p>
          </div>
        </div>

        {/* ── OVERALL PROGRESS CARD ── */}
        <div className="bg-[#0d1420] rounded-2xl p-5 mb-6 text-white relative overflow-hidden border border-indigo-900/30 shadow-2xl shadow-black/40">
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/5 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/5 rounded-full translate-y-10 -translate-x-10 blur-xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage:"linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)", backgroundSize:"36px 36px" }} />
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
                      <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width:`${ls.pct}%` }} />
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { icon:<FiLayers/>,     label:"Levels",       value:"5",           color:"text-indigo-400", bg:"bg-[#0d1420]", border:"border-indigo-900/30" },
            { icon:<FiBook/>,       label:"Total Topics",  value:`${stats.total}`, color:"text-indigo-400", bg:"bg-[#0d1420]", border:"border-indigo-900/30" },
            { icon:<FiCode/>,       label:"Code Examples", value:"50+",         color:"text-indigo-400", bg:"bg-[#0d1420]", border:"border-indigo-900/30" },
            { icon:<FiYoutube/>,    label:"YouTube Links", value:"15+",         color:"text-red-400",     bg:"bg-[#0d1420]", border:"border-indigo-900/30" },
          ].map(s => (
            <div key={s.label} className={`rounded-2xl border p-4 ${s.bg} ${s.border} hover:-translate-y-0.5 hover:shadow-md hover:shadow-indigo-900/20 transition-all duration-200 cursor-default`}>
              <div className={`${s.color} mb-2 text-lg`}>{s.icon}</div>
              <p className={`text-2xl font-extrabold ${s.color} tabular-nums`}>{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── LEVEL CARDS ── */}
        <div className="space-y-3">
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
        <div className="mt-8 rounded-3xl border-2 border-dashed border-indigo-900/40 p-8 text-center">
          <div className="text-4xl mb-3">🔜</div>
          <h3 className="font-bold text-slate-200 text-lg mb-2">More Content Coming Soon</h3>
          <p className="text-slate-500 text-sm mb-5">
            Advanced Django REST Framework, Python for DevOps, Web Scraping with Playwright,
            Quantum Python, Competitive Programming in Python, and Interview Mock Sessions.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Django REST","Web Scraping","Python DevOps","Competitive Python","Interview Prep","FastAPI Advanced","PyTorch Deep Dive","Python Patterns"].map(tag => (
              <span key={tag} className="text-xs bg-[#0d1420] text-slate-400 px-3 py-1.5 rounded-full border border-indigo-900/30">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── RESET BUTTON ── */}
        <div className="mt-6 text-center">
          <button onClick={resetProgress}
            className="text-xs text-slate-500 hover:text-red-400 transition-colors border border-indigo-900/30 hover:border-red-800/40 px-3 py-1.5 rounded-lg">
            Reset all progress
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}