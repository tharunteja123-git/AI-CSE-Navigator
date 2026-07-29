const strings = {
  name: "Strings",
  emoji: "🔤",
  color: "bg-purple-500",
  light: "bg-purple-50",
  border: "border-purple-200",
  text: "text-purple-700",
  total: 30,

  learningObjectives: [
    "Understand string immutability and memory implications",
    "Master character frequency maps and sliding window on strings",
    "Implement KMP and Rabin-Karp pattern matching",
    "Solve 30+ string interview problems with optimal solutions",
    "Use string methods fluently across Python, JS, Java, C++",
  ],

  prerequisites: ["Arrays basics", "ASCII & Unicode", "Loops", "HashMaps"],

  whyLearn: {
    importance: "Strings appear in nearly every software system — parsing, search, validation, NLP. String problems are in 40%+ of coding interviews and test your pattern recognition deeply.",
    useCases: [
      "Search engines — finding keywords in billions of documents",
      "DNA sequencing — pattern matching in genetic strings",
      "Compilers — tokenizing and parsing source code",
      "Data validation — email, phone, password format checks",
      "NLP & AI — tokenization, embeddings, text processing",
    ],
  },

  definition: {
    short: "A string is an immutable sequence of characters (in Python, Java, JS). Each character has a Unicode/ASCII value. Strings are essentially read-only arrays of characters.",
    analogy: "A string is like a printed word on paper — you can read any letter directly, but to 'change' it you must write a whole new word on a new piece of paper.",
    properties: [
      "Immutable in Python, Java, JavaScript — any change creates a new string",
      "Mutable in C++ (std::string) and char[] in C",
      "Each character maps to an integer via ASCII (ord()) or Unicode",
      "String length is O(1) in Python/Java, O(n) in C (null-terminated)",
      "Concatenation is O(n+m) — always use StringBuilder in loops in Java",
      "String comparison is O(n) — must check every character",
    ],
    complexity: [
      { op: "Access character",       time: "O(1)",     space: "O(1)" },
      { op: "Find substring (naive)", time: "O(n×m)",   space: "O(1)" },
      { op: "Find substring (KMP)",   time: "O(n+m)",   space: "O(m)" },
      { op: "Concatenation",          time: "O(n+m)",   space: "O(n+m)" },
      { op: "Substring (slice)",      time: "O(k)",     space: "O(k)" },
      { op: "Comparison",             time: "O(n)",     space: "O(1)" },
      { op: "Reverse",                time: "O(n)",     space: "O(n)" },
    ],
  },

  languages: [
    {
      lang: "Python",
      emoji: "🐍",
      color: "bg-blue-100 text-blue-800",
      syntax: `# Python Strings — Immutable sequences
s = "Hello, World!"
s2 = 'single quotes work too'
s3 = """Multi-line
string"""

# ── Access & Slicing ──────────────────
s[0]                  # 'H' (first char)
s[-1]                 # '!' (last char)
s[7:12]               # 'World'
s[::-1]               # Reverse: '!dlroW ,olleH'
s[::2]                # Every 2nd char

# ── Case & Strip ──────────────────────
s.upper()             # 'HELLO, WORLD!'
s.lower()             # 'hello, world!'
s.title()             # 'Hello, World!'
s.capitalize()        # 'Hello, world!'
s.strip()             # Remove whitespace both ends
s.lstrip()            # Remove left whitespace
s.rstrip()            # Remove right whitespace
s.strip("!")          # Remove specific chars

# ── Search ────────────────────────────
s.find("World")       # 7 (returns -1 if not found)
s.index("World")      # 7 (raises ValueError if not found)
s.rfind("l")          # Last occurrence
s.count("l")          # Count occurrences → 3
s.startswith("Hello") # True
s.endswith("!")       # True
"World" in s          # True (membership)

# ── Replace & Split ───────────────────
s.replace("l", "L")           # Replace all
s.replace("l", "L", 1)        # Replace only first
s.split(",")                  # ['Hello', ' World!']
s.split()                     # Split on any whitespace
",".join(["a","b","c"])       # "a,b,c"

# ── Validation ────────────────────────
"abc".isalpha()       # All letters
"123".isdigit()       # All digits
"abc123".isalnum()    # All alphanumeric
"   ".isspace()       # All whitespace
"Hello".istitle()     # Title case?

# ── Formatting ────────────────────────
f"Name: {name}, Age: {age}"   # f-string (best)
"Name: {}, Age: {}".format(name, age)
"Name: %s" % name             # Old style

# ── ASCII & Unicode ───────────────────
ord('A')              # 65
chr(65)               # 'A'
ord('a') - ord('a')   # 0 (useful for array indexing)
ord('z') - ord('a')   # 25

# ── Useful Patterns ───────────────────
sorted("banana")               # ['a','a','a','b','n','n']
set("banana")                  # {'a','b','n'}
"".join(sorted("banana"))      # 'aaabnn'
from collections import Counter
Counter("banana")              # Counter({'a':3,'n':2,'b':1})

# ── String as List of Chars ───────────
list("hello")                  # ['h','e','l','l','o']
"".join(['h','e','l','l','o']) # 'hello'`,
    },
    {
      lang: "JavaScript",
      emoji: "🟨",
      color: "bg-yellow-100 text-yellow-800",
      syntax: `// JavaScript Strings — Immutable primitives
const s = "Hello, World!";
const s2 = \`Template literal: \${2 + 2}\`; // ES6

// ── Access ────────────────────────────
s[0];                    // 'H'
s.charAt(0);             // 'H' (older API)
s.charCodeAt(0);         // 72 (ASCII)
String.fromCharCode(72); // 'H'
s.at(-1);                // '!' (ES2022, supports negative)
s.length;                // 13 (property!)

// ── Case & Trim ───────────────────────
s.toUpperCase();         // 'HELLO, WORLD!'
s.toLowerCase();         // 'hello, world!'
s.trim();                // Remove whitespace both ends
s.trimStart();           // Remove from start
s.trimEnd();             // Remove from end

// ── Search ────────────────────────────
s.indexOf("World");      // 7 (-1 if not found)
s.lastIndexOf("l");      // Last occurrence
s.includes("World");     // true
s.startsWith("Hello");   // true
s.endsWith("!");         // true
s.search(/World/);       // 7 (regex search, returns index)
s.match(/[aeiou]/g);     // Find all vowels → array

// ── Slice & Substring ─────────────────
s.slice(7, 12);          // 'World' (supports negative)
s.substring(7, 12);      // 'World' (no negative support)
s.slice(-6);             // 'orld!' (from end)

// ── Replace & Split ───────────────────
s.replace("l", "L");     // Replace FIRST only!
s.replaceAll("l", "L");  // Replace ALL (ES2021)
s.replace(/l/g, "L");    // Replace all via regex
s.split(", ");           // ['Hello', 'World!']
s.split("");             // Array of chars
["a","b"].join("-");     // "a-b"

// ── Build strings ─────────────────────
s.repeat(3);             // "Hello...Hello...Hello..."
s.padStart(20, "*");     // Pad to length with *
s.padEnd(20, "-");       // Pad to length with -
s.concat(" How are you?"); // Concatenate

// ── Useful patterns ───────────────────
[...s]                   // Spread to char array
s.split("").reverse().join(""); // Reverse string
[...new Set(s)].join("") // Remove duplicate chars`,
    },
    {
      lang: "Java",
      emoji: "☕",
      color: "bg-orange-100 text-orange-800",
      syntax: `// Java — String (immutable) & StringBuilder (mutable)
String s = "Hello, World!";

// ── Access ────────────────────────────
s.charAt(0);             // 'H'
s.length();              // 13 (method, not property!)
s.indexOf("World");      // 7
s.lastIndexOf("l");      // 10
s.substring(7, 12);      // "World"
s.substring(7);          // "World!" (to end)

// ── Case & Strip ──────────────────────
s.toUpperCase();         // "HELLO, WORLD!"
s.toLowerCase();         // "hello, world!"
s.trim();                // Remove whitespace
s.strip();               // Unicode-aware trim (Java 11)
s.stripLeading();        // Remove leading (Java 11)
s.stripTrailing();       // Remove trailing (Java 11)

// ── Search ────────────────────────────
s.contains("World");     // true
s.startsWith("Hello");   // true
s.endsWith("!");         // true
s.matches(".*World.*");  // Regex match

// ── Replace & Split ───────────────────
s.replace("l", "L");     // Replace ALL (not first!)
s.replaceAll("l+", "L"); // Regex replace all
s.replaceFirst("l","L"); // Replace first only
s.split(",");            // String[]
String.join(",", "a","b","c"); // "a,b,c"

// ── Compare ───────────────────────────
s.equals("Hello");                   // ✅ Content equal
s.equalsIgnoreCase("hello, world!"); // Case-insensitive
s.compareTo("Hello");                // Lexicographic
s == "Hello";                        // ❌ Reference equal (WRONG!)

// ── Convert ───────────────────────────
s.toCharArray();         // char[]
String.valueOf(42);      // "42"
Integer.parseInt("42");  // 42
s.isEmpty();             // false
s.isBlank();             // false (Java 11, checks whitespace)

// ── StringBuilder (USE IN LOOPS!) ─────
StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(", ");
sb.append("World");
sb.insert(0, "Say: ");   // Insert at index
sb.delete(0, 4);         // Delete range
sb.deleteCharAt(0);      // Delete single char
sb.reverse();            // Reverse
sb.replace(0,5,"Hi");   // Replace range
sb.toString();           // Convert back to String
sb.length();             // Current length

// ⚠️ NEVER do this in loops:
// String result = "";
// for (...) result += c;  // Creates new String each time = O(n²)
// Use StringBuilder instead!

// ── String Pool ───────────────────────
// Strings are cached in a pool
// "hello" == "hello" → true (same pool ref)
// new String("hello") == new String("hello") → false (new objects)
// Always use .equals() for string comparison!`,
    },
    {
      lang: "C++",
      emoji: "⚙️",
      color: "bg-purple-100 text-purple-800",
      syntax: `// C++ — std::string (MUTABLE unlike Python/Java)
#include <string>
#include <algorithm>
#include <sstream>
using namespace std;

string s = "Hello, World!";

// ── Access ────────────────────────────
s[0];                    // 'H' (no bounds check)
s.at(0);                 // 'H' (with bounds check)
s.front();               // 'H' (first char)
s.back();                // '!' (last char)
s.length(); s.size();    // 13 (both work)

// ── Mutation (MUTABLE!) ───────────────
s.push_back('!');        // Add char to end
s.pop_back();            // Remove last char
s += " How are you?";    // Append
s.append(" test");       // Append string
s.insert(7, "Dear ");    // Insert at position
s.erase(7, 5);           // Erase 5 chars at pos 7
s.replace(7, 5, "C++");  // Replace portion
s.clear();               // Empty string
s.assign("New string");  // Replace entire content

// ── Search ────────────────────────────
s.find("World");         // 7 (string::npos if not found)
s.rfind("l");            // Last occurrence
s.find_first_of("aeiou");// First vowel position
s.find_last_of("aeiou"); // Last vowel position

// Check not found:
if (s.find("xyz") == string::npos) { /* not found */ }

// ── Substring & Compare ───────────────
s.substr(7, 5);          // "World" (start, length)
s.compare("Hello");      // <0, 0, or >0
s.empty();               // false

// ── Convert ───────────────────────────
to_string(42);           // "42"
to_string(3.14);         // "3.140000"
stoi("42");              // 42
stod("3.14");            // 3.14
stol("123456");          // long

// ── Algorithms with strings ───────────
sort(s.begin(), s.end());           // Sort chars
reverse(s.begin(), s.end());        // Reverse
transform(s.begin(),s.end(),s.begin(),::tolower); // Lowercase
transform(s.begin(),s.end(),s.begin(),::toupper); // Uppercase
count(s.begin(), s.end(), 'l');     // Count 'l'

// ── Split string (no built-in!) ───────
vector<string> split(string s, char delim) {
    vector<string> tokens;
    stringstream ss(s);
    string token;
    while(getline(ss, token, delim)) tokens.push_back(token);
    return tokens;
}`,
    },
  ],

  patterns: [
    {
      name: "Sliding Window on String",
      emoji: "🪟",
      color: "bg-purple-50 border-purple-200",
      titleColor: "text-purple-800",
      when: "Longest/shortest substring with constraint (at most k distinct chars, no repeats, contains all chars)",
      avoid: "When substring doesn't need to be contiguous",
      timeComplexity: "O(n)",
      spaceComplexity: "O(k) where k = window size or alphabet size",
      steps: [
        "Use left and right pointers, both start at 0",
        "Expand right — add s[right] to window",
        "When constraint violated — shrink from left",
        "Track best answer after each valid window",
      ],
      template: `def longest_with_constraint(s, k):
    left = best = 0
    freq = {}
    for right, ch in enumerate(s):
        freq[ch] = freq.get(ch, 0) + 1  # expand
        while len(freq) > k:             # constraint violated
            freq[s[left]] -= 1
            if freq[s[left]] == 0: del freq[s[left]]
            left += 1                    # shrink
        best = max(best, right - left + 1)
    return best`,
    },
    {
      name: "Two Pointer on String",
      emoji: "👆👆",
      color: "bg-blue-50 border-blue-200",
      titleColor: "text-blue-800",
      when: "Palindrome check, reverse words, remove duplicates, valid palindrome with deletions",
      avoid: "When characters aren't compared symmetrically",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      steps: [
        "left starts at 0, right at len-1",
        "Skip non-alphanumeric if needed",
        "Compare s[left] and s[right]",
        "Move both inward",
      ],
      template: `def is_palindrome(s):
    # Clean: only alphanumeric, lowercase
    s = ''.join(c.lower() for c in s if c.isalnum())
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]: return False
        left += 1; right -= 1
    return True`,
    },
    {
      name: "Character Frequency Map",
      emoji: "📊",
      color: "bg-green-50 border-green-200",
      titleColor: "text-green-800",
      when: "Anagram check, permutation in string, group anagrams, first unique character",
      avoid: "When order of characters matters",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1) — alphabet is fixed size 26",
      steps: [
        "Use dict or Counter or array of 26 ints",
        "Increment for one string, decrement for other",
        "All zeros → anagram",
      ],
      template: `from collections import Counter

# Method 1: Counter
def is_anagram(s, t):
    return Counter(s) == Counter(t)

# Method 2: Array of 26 (O(1) space)
def is_anagram_optimal(s, t):
    if len(s) != len(t): return False
    count = [0] * 26
    for a, b in zip(s, t):
        count[ord(a)-ord('a')] += 1
        count[ord(b)-ord('a')] -= 1
    return all(c == 0 for c in count)`,
    },
    {
      name: "KMP Pattern Matching",
      emoji: "🔍",
      color: "bg-red-50 border-red-200",
      titleColor: "text-red-800",
      when: "Find all occurrences of pattern in text. Better than O(n×m) naive approach.",
      avoid: "When pattern is very short (naive O(nm) may be faster in practice)",
      timeComplexity: "O(n + m) total",
      spaceComplexity: "O(m) for failure function",
      steps: [
        "Build LPS (Longest Proper Prefix which is also Suffix) array for pattern",
        "Use LPS to skip comparisons when mismatch occurs",
        "Never go back in text pointer",
      ],
      template: `def kmp(text, pattern):
    # Build failure function (LPS array)
    lps = [0] * len(pattern)
    j = 0
    for i in range(1, len(pattern)):
        while j and pattern[i] != pattern[j]: j = lps[j-1]
        if pattern[i] == pattern[j]: j += 1
        lps[i] = j
    # Search
    j = 0; results = []
    for i, ch in enumerate(text):
        while j and ch != pattern[j]: j = lps[j-1]
        if ch == pattern[j]: j += 1
        if j == len(pattern):
            results.append(i - j + 1)   # found at index
            j = lps[j-1]
    return results`,
    },
  ],

  problems: [
    {
      name: "Valid Anagram",
      difficulty: "Easy",
      companies: ["Amazon", "Microsoft", "Bloomberg", "Uber"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/valid-anagram/", id: "#242" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/check-whether-two-strings-are-anagram-of-each-other/", id: "Practice" },
      ],
      statement: "Given two strings s and t, return true if t is an anagram of s (same characters, same frequencies).",
      example: "s='anagram', t='nagaram' → true | s='rat', t='car' → false",
      constraints: ["Only lowercase English letters", "1 ≤ s.length, t.length ≤ 5×10⁴"],
      approaches: [
        {
          title: "Sort and Compare",
          emoji: "📊",
          tag: "O(n log n)",
          complexity: "Time: O(n log n) | Space: O(n)",
          idea: "Anagrams have identical characters. Sorting both makes identical anagrams equal.",
          when: "Simple. Explain first, then optimize.",
          code: `def is_anagram(s, t):
    if len(s) != len(t): return False
    return sorted(s) == sorted(t)`,
        },
        {
          title: "Frequency Array (Optimal)",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1) — only 26 letters",
          idea: "Use array of size 26. Increment for chars in s, decrement for chars in t. If all zeros → anagram.",
          when: "Best interview answer. O(1) space since alphabet is fixed.",
          code: `def is_anagram(s, t):
    if len(s) != len(t): return False
    count = [0] * 26
    for a, b in zip(s, t):
        count[ord(a) - ord('a')] += 1
        count[ord(b) - ord('a')] -= 1
    return all(c == 0 for c in count)`,
        },
        {
          title: "Counter (Pythonic)",
          emoji: "🐍",
          tag: "Pythonic",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "Python Counter handles everything. One line.",
          when: "Quickest in Python interviews. Know this.",
          code: `from collections import Counter
def is_anagram(s, t):
    return Counter(s) == Counter(t)`,
        },
      ],
      ai: {
        hints: ["What makes two strings anagrams?", "Can you count characters without sorting?"],
        followUps: ["Group Anagrams", "Find All Anagrams in String", "Minimum steps to anagram"],
        interviewQuestions: ["What if strings contain Unicode characters?", "What if whitespace matters?"],
      },
    },
    {
      name: "Longest Substring Without Repeating",
      difficulty: "Medium",
      companies: ["Amazon", "Google", "Facebook", "Microsoft", "Adobe"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", id: "#3" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/", id: "Practice" },
        { name: "InterviewBit", url: "https://www.interviewbit.com/problems/longest-substring-without-repeat/", id: "Practice" },
      ],
      statement: "Find the length of the longest substring without repeating characters.",
      example: "s='abcabcbb' → 3 ('abc') | s='bbbbb' → 1 ('b') | s='pwwkew' → 3 ('wke')",
      constraints: ["0 ≤ s.length ≤ 5×10⁴", "English letters, digits, symbols, spaces"],
      approaches: [
        {
          title: "Brute Force",
          emoji: "🐢",
          tag: "O(n²)",
          complexity: "Time: O(n²) | Space: O(n)",
          idea: "Try every substring. For each start, extend until a repeat is found.",
          when: "Never.",
          code: `def length_of_longest(s):
    best = 0
    for i in range(len(s)):
        seen = set()
        for j in range(i, len(s)):
            if s[j] in seen: break
            seen.add(s[j])
            best = max(best, j - i + 1)
    return best`,
        },
        {
          title: "Sliding Window (Optimal)",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(n)",
          idea: "Maintain window [left, right] with no repeats. When s[right] is seen inside window, jump left to just past its previous position.",
          when: "Classic sliding window. Always use this.",
          code: `def length_of_longest(s):
    seen = {}                    # char → last seen index
    left = best = 0
    for right, ch in enumerate(s):
        if ch in seen and seen[ch] >= left:
            left = seen[ch] + 1  # jump left past the repeat
        seen[ch] = right
        best = max(best, right - left + 1)
    return best`,
        },
      ],
      ai: {
        hints: ["What happens when you encounter a character you've seen before?", "Can you track where each character was last seen?"],
        followUps: ["Longest Substring with At Most K Distinct Characters", "Minimum Window Substring"],
        interviewQuestions: ["What if we want the actual substring?", "Handle Unicode characters?"],
      },
    },
    {
      name: "Group Anagrams",
      difficulty: "Medium",
      companies: ["Amazon", "Facebook", "Google", "Microsoft"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/group-anagrams/", id: "#49" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/given-a-sequence-of-words-print-all-anagrams-together/", id: "Practice" },
      ],
      statement: "Given array of strings, group all anagrams together.",
      example: '["eat","tea","tan","ate","nat","bat"] → [["bat"],["nat","tan"],["ate","eat","tea"]]',
      constraints: ["All lowercase English letters", "1 ≤ strs.length ≤ 10⁴"],
      approaches: [
        {
          title: "Sort as HashMap Key",
          emoji: "🗝️",
          tag: "Standard",
          complexity: "Time: O(n × k log k) | Space: O(n × k)",
          idea: "Anagrams share the same sorted form. Use sorted string as key in HashMap. Group all strings with same key.",
          when: "Standard interview answer. Clean and clear.",
          code: `from collections import defaultdict
def group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))  # 'eat' → ('a','e','t')
        groups[key].append(s)
    return list(groups.values())`,
        },
        {
          title: "Frequency Count as Key",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n × k) | Space: O(n × k)",
          idea: "Instead of sorting (O(k log k)), use a tuple of 26 character counts as key. This reduces per-string work from O(k log k) to O(k).",
          when: "More optimal. Good to mention in interviews.",
          code: `from collections import defaultdict
def group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        count = [0] * 26
        for c in s:
            count[ord(c) - ord('a')] += 1
        groups[tuple(count)].append(s)
    return list(groups.values())`,
        },
      ],
      ai: {
        hints: ["What property do all anagrams share?", "Can you compute a 'signature' for each string?"],
        followUps: ["Valid Anagram", "Find All Anagrams in String"],
        interviewQuestions: ["What's the difference between the two approaches in practice?"],
      },
    },
  ],

  interviewTips: [
    "Always check: case-sensitive? What characters (letters only, or all ASCII)?",
    "For palindrome problems: clean the string first (lowercase, alphanumeric only)",
    "StringBuilder/list.join() for building strings — never concatenate in a loop",
    "ASCII trick: ord(c) - ord('a') gives 0-25 for lowercase — use for array indexing",
    "Counter/HashMap for frequency problems — O(1) space if only 26 letters",
    "Sliding window for 'longest/shortest substring with constraint' — always O(n)",
    "For pattern matching in interviews: mention KMP exists even if you use naive",
  ],

  mistakes: [
    "s.replace('l','L') in Java replaces ALL occurrences. In JS only the FIRST!",
    "Comparing strings with == in Java compares references, not content. Use .equals()",
    "Python string slicing s[::-1] creates a new string — not in-place",
    "StringBuilder is NOT thread-safe. Use StringBuffer in multi-threaded Java",
    "split('') in JS creates array of chars. split() without arg in Python splits on whitespace",
    "ord() and chr() in Python vs charCodeAt() and fromCharCode() in JS — easy to mix up",
  ],

  quiz: [
    {
      q: "s.replace('l', 'L') in JavaScript replaces how many occurrences?",
      options: ["All of them", "Only the first one", "Last one", "None"],
      answer: 1,
      explanation: "JavaScript's .replace() with a string argument replaces only the FIRST occurrence. Use .replaceAll() or .replace(/l/g, 'L') with regex + g flag to replace all.",
    },
    {
      q: "What is the time complexity of checking if two strings are anagrams using a frequency array?",
      options: ["O(n log n)", "O(n²)", "O(n)", "O(1)"],
      answer: 2,
      explanation: "We scan each string once (O(n) each) and check an array of 26 elements (O(1)). Total: O(n). Since alphabet size is fixed at 26, the array space is O(1).",
    },
    {
      q: "Why should you use StringBuilder instead of String concatenation in Java loops?",
      options: [
        "StringBuilder is newer API",
        "String += in loops is O(n²) total, StringBuilder is O(n)",
        "String doesn't support +=",
        "StringBuilder supports more methods",
      ],
      answer: 1,
      explanation: "Each String += creates a NEW String object copying all previous characters. For n concatenations, total copies = 1+2+3+...+n = O(n²). StringBuilder maintains a mutable buffer, making each append O(1) amortized.",
    },
    {
      q: "Sliding window for 'longest substring without repeating chars' has what complexity?",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(n × alphabet)"],
      answer: 2,
      explanation: "Each character is added to window once (right pointer) and removed at most once (left pointer). Total operations = 2n = O(n). The HashMap stores at most the window size.",
    },
  ],

  practice_links: [
    { platform: "LeetCode Strings", url: "https://leetcode.com/tag/string/", color: "bg-orange-500", problems: "200+ problems", recommended: true },
    { platform: "Striver's String Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", color: "bg-indigo-600", problems: "Basic to Hard", recommended: true },
    { platform: "NeetCode Strings", url: "https://neetcode.io/roadmap", color: "bg-violet-600", problems: "Top interview strings" },
    { platform: "GFG String Problems", url: "https://www.geeksforgeeks.org/string-data-structure/", color: "bg-green-600", problems: "Theory + Practice" },
    { platform: "HackerRank Strings", url: "https://www.hackerrank.com/domains/algorithms?filters%5Bsubdomains%5D%5B%5D=strings", color: "bg-emerald-600", problems: "Beginner to Advanced" },
  ],
};

export default strings;
