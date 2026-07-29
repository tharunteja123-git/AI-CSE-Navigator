const sorting = {
  name: "Sorting",
  emoji: "🔃",
  color: "bg-orange-500",
  light: "bg-orange-50",
  border: "border-orange-200",
  text: "text-orange-700",
  total: 45,

  learningObjectives: [
    "Understand all major sorting algorithms and their trade-offs",
    "Master time & space complexity for each algorithm",
    "Know when to use which sorting algorithm",
    "Implement all sorts in Python, JavaScript, Java, C++",
    "Solve 45+ real interview problems involving sorting",
  ],

  prerequisites: ["Arrays", "Recursion basics", "Big-O notation", "Basic Math"],

  whyLearn: {
    importance: "Sorting is foundational — it powers databases, search engines, analytics, and OS schedulers. Understanding sorting deeply shows interviewers you grasp algorithm design.",
    useCases: [
      "E-commerce — sort products by price, rating, relevance",
      "Database ORDER BY — SQL sorts millions of rows efficiently",
      "Binary Search requires sorted data as prerequisite",
      "Machine Learning — sorted features for decision trees",
      "Operating Systems — process scheduling by priority",
    ],
  },

  definition: {
    short: "Sorting is the process of arranging data in a particular order (ascending or descending) so that searching, processing, and analysis become easier and faster.",
    analogy: "Imagine arranging books on a shelf alphabetically. Once arranged, finding any book becomes much faster than searching randomly through a pile.",
    properties: [
      "Comparison-based sorts: Bubble, Selection, Insertion, Merge, Quick, Heap — O(n log n) lower bound",
      "Non-comparison sorts: Counting, Radix, Bucket — can beat O(n log n) with constraints",
      "Stable: preserves relative order of equal elements (Merge, Insertion, Bubble, Counting, Radix)",
      "Unstable: may change order of equal elements (Quick, Heap, Selection)",
      "In-place: O(1) extra space (Bubble, Selection, Insertion, Heap, Quick)",
      "Out-of-place: needs extra memory (Merge, Counting, Radix, Bucket)",
    ],
    complexity: [
      { op: "Bubble Sort",    time: "O(n²) avg",      space: "O(1)",    stable: "✅" },
      { op: "Selection Sort", time: "O(n²) always",   space: "O(1)",    stable: "❌" },
      { op: "Insertion Sort", time: "O(n) best",       space: "O(1)",    stable: "✅" },
      { op: "Merge Sort",     time: "O(n log n)",      space: "O(n)",    stable: "✅" },
      { op: "Quick Sort",     time: "O(n log n) avg",  space: "O(log n)",stable: "❌" },
      { op: "Heap Sort",      time: "O(n log n)",      space: "O(1)",    stable: "❌" },
      { op: "Counting Sort",  time: "O(n+k)",          space: "O(k)",    stable: "✅" },
      { op: "Radix Sort",     time: "O(d·(n+k))",      space: "O(n+k)",  stable: "✅" },
    ],
  },

  languages: [
    {
      lang: "Python",
      emoji: "🐍",
      color: "bg-blue-100 text-blue-800",
      syntax: `# Python — All Sorting Methods

# ── Built-in (TimSort — O(n log n), Stable) ──
arr = [3, 1, 4, 1, 5, 9, 2, 6]
arr.sort()                          # In-place
arr.sort(reverse=True)              # Descending
arr.sort(key=lambda x: -x)          # Custom key
sorted_arr = sorted(arr)            # Returns new list
sorted_arr = sorted(arr, reverse=True)

# Sort list of dicts
students = [{"name":"Rahul","gpa":8.5},{"name":"Priya","gpa":9.1}]
students.sort(key=lambda s: s["gpa"], reverse=True)

# Sort by multiple keys
data = [(1,3),(2,1),(1,2)]
data.sort(key=lambda x: (x[0], x[1]))  # Sort by first, then second

# ── Bubble Sort ──────────────────────
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped: break          # Already sorted
    return arr

# ── Selection Sort ───────────────────
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# ── Insertion Sort ───────────────────
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = key
    return arr

# ── Merge Sort ───────────────────────
def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []; i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]: result.append(left[i]); i += 1
        else: result.append(right[j]); j += 1
    return result + left[i:] + right[j:]

# ── Quick Sort ───────────────────────
def quick_sort(arr):
    if len(arr) <= 1: return arr
    pivot = arr[len(arr)//2]
    left   = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right  = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

# ── Heap Sort ────────────────────────
def heap_sort(arr):
    import heapq
    heapq.heapify(arr)
    return [heapq.heappop(arr) for _ in range(len(arr))]

# ── Counting Sort ────────────────────
def counting_sort(arr):
    if not arr: return arr
    max_val = max(arr)
    count = [0] * (max_val + 1)
    for x in arr: count[x] += 1
    return [i for i, c in enumerate(count) for _ in range(c)]`,
    },
    {
      lang: "JavaScript",
      emoji: "🟨",
      color: "bg-yellow-100 text-yellow-800",
      syntax: `// JavaScript — All Sorting Methods

// ── Built-in (Engine Dependent, usually TimSort) ──
const arr = [3, 1, 4, 1, 5, 9];
arr.sort((a, b) => a - b);          // ⚠️ MUST use comparator for numbers!
arr.sort((a, b) => b - a);          // Descending
[...arr].sort((a, b) => a - b);     // Non-mutating copy

// Sort objects
const students = [{name:"Rahul",gpa:8.5},{name:"Priya",gpa:9.1}];
students.sort((a, b) => b.gpa - a.gpa);  // Sort by GPA descending

// Sort strings
["banana","apple","cherry"].sort();       // Lexicographic

// ── Bubble Sort ──────────────────────
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        let swapped = false;
        for (let j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
}

// ── Insertion Sort ───────────────────
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j+1] = arr[j]; j--;
        }
        arr[j+1] = key;
    }
    return arr;
}

// ── Merge Sort ───────────────────────
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}
function merge(left, right) {
    const result = []; let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return [...result, ...left.slice(i), ...right.slice(j)];
}

// ── Quick Sort ───────────────────────
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[Math.floor(arr.length/2)];
    const left   = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right  = arr.filter(x => x > pivot);
    return [...quickSort(left), ...middle, ...quickSort(right)];
}`,
    },
    {
      lang: "Java",
      emoji: "☕",
      color: "bg-orange-100 text-orange-800",
      syntax: `// Java — All Sorting Methods
import java.util.*;

// ── Built-in ──────────────────────────
int[] arr = {3, 1, 4, 1, 5, 9};
Arrays.sort(arr);                    // Dual-Pivot QuickSort for primitives
Arrays.sort(arr, 0, 4);             // Sort range [0,4)

Integer[] boxed = {3, 1, 4, 1, 5};
Arrays.sort(boxed, Comparator.reverseOrder()); // Descending

List<Integer> list = Arrays.asList(3,1,4,1,5);
Collections.sort(list);              // TimSort for objects
list.sort(Comparator.reverseOrder());

// Sort custom objects
List<Student> students = ...;
students.sort((a, b) -> Double.compare(b.gpa, a.gpa));
students.sort(Comparator.comparingDouble(Student::getGpa).reversed());

// ── Merge Sort ───────────────────────
public static int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;
    int mid = arr.length / 2;
    int[] left = mergeSort(Arrays.copyOfRange(arr, 0, mid));
    int[] right = mergeSort(Arrays.copyOfRange(arr, mid, arr.length));
    return merge(left, right);
}
public static int[] merge(int[] left, int[] right) {
    int[] result = new int[left.length + right.length];
    int i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length)
        result[k++] = left[i] <= right[j] ? left[i++] : right[j++];
    while (i < left.length) result[k++] = left[i++];
    while (j < right.length) result[k++] = right[j++];
    return result;
}

// ── Quick Sort ───────────────────────
public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
public static int partition(int[] arr, int low, int high) {
    int pivot = arr[high], i = low - 1;
    for (int j = low; j < high; j++)
        if (arr[j] <= pivot) { i++; int t=arr[i]; arr[i]=arr[j]; arr[j]=t; }
    int t = arr[i+1]; arr[i+1] = arr[high]; arr[high] = t;
    return i + 1;
}

// ── Heap Sort ────────────────────────
public static void heapSort(int[] arr) {
    int n = arr.length;
    for (int i = n/2-1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n-1; i > 0; i--) {
        int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;
        heapify(arr, i, 0);
    }
}
public static void heapify(int[] arr, int n, int i) {
    int largest = i, l = 2*i+1, r = 2*i+2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        int t = arr[i]; arr[i] = arr[largest]; arr[largest] = t;
        heapify(arr, n, largest);
    }
}`,
    },
    {
      lang: "C++",
      emoji: "⚙️",
      color: "bg-purple-100 text-purple-800",
      syntax: `// C++ — All Sorting Methods
#include <algorithm>
#include <vector>
using namespace std;

// ── Built-in (IntroSort) ──────────────
vector<int> v = {3,1,4,1,5,9};
sort(v.begin(), v.end());            // Ascending
sort(v.begin(), v.end(), greater<int>()); // Descending
sort(v.begin(), v.begin()+4);       // Sort first 4 elements
stable_sort(v.begin(), v.end());     // Stable sort

// Custom comparator
sort(v.begin(), v.end(), [](int a, int b){ return a > b; });

// Sort struct/pair
vector<pair<int,int>> p = {{1,3},{2,1},{1,2}};
sort(p.begin(), p.end());            // By first, then second
sort(p.begin(), p.end(), [](auto& a, auto& b){
    return a.second < b.second;      // Sort by second element
});

// ── Merge Sort ───────────────────────
void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin()+l, arr.begin()+m+1);
    vector<int> right(arr.begin()+m+1, arr.begin()+r+1);
    int i=0, j=0, k=l;
    while(i<left.size() && j<right.size())
        arr[k++] = left[i]<=right[j] ? left[i++] : right[j++];
    while(i<left.size()) arr[k++]=left[i++];
    while(j<right.size()) arr[k++]=right[j++];
}
void mergeSort(vector<int>& arr, int l, int r) {
    if(l>=r) return;
    int m = (l+r)/2;
    mergeSort(arr, l, m);
    mergeSort(arr, m+1, r);
    merge(arr, l, m, r);
}

// ── Quick Sort ───────────────────────
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high], i = low-1;
    for(int j=low; j<high; j++)
        if(arr[j]<=pivot) swap(arr[++i], arr[j]);
    swap(arr[i+1], arr[high]);
    return i+1;
}
void quickSort(vector<int>& arr, int low, int high) {
    if(low<high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi-1);
        quickSort(arr, pi+1, high);
    }
}

// ── Heap Sort ────────────────────────
void heapify(vector<int>& arr, int n, int i) {
    int largest=i, l=2*i+1, r=2*i+2;
    if(l<n && arr[l]>arr[largest]) largest=l;
    if(r<n && arr[r]>arr[largest]) largest=r;
    if(largest!=i) { swap(arr[i],arr[largest]); heapify(arr,n,largest); }
}
void heapSort(vector<int>& arr) {
    int n=arr.size();
    for(int i=n/2-1;i>=0;i--) heapify(arr,n,i);
    for(int i=n-1;i>0;i--) { swap(arr[0],arr[i]); heapify(arr,i,0); }
}`,
    },
  ],

  patterns: [
    {
      name: "Bubble Sort",
      emoji: "🫧",
      color: "bg-blue-50 border-blue-200",
      titleColor: "text-blue-800",
      when: "Teaching purposes only. Never in real interviews.",
      avoid: "Always in production. O(n²) is too slow.",
      timeComplexity: "O(n²) avg | O(n) best (optimized)",
      spaceComplexity: "O(1)",
      steps: ["Compare adjacent pairs", "Swap if out of order", "Repeat n times", "Each pass bubbles largest to end"],
      template: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped: break    # Optimization: already sorted
    return arr`,
    },
    {
      name: "Merge Sort",
      emoji: "🔀",
      color: "bg-green-50 border-green-200",
      titleColor: "text-green-800",
      when: "Need stable sort, sorting linked lists, external sorting, guaranteed O(n log n)",
      avoid: "Memory-constrained systems (needs O(n) extra space)",
      timeComplexity: "O(n log n) always",
      spaceComplexity: "O(n)",
      steps: ["Divide array in half", "Recursively sort each half", "Merge two sorted halves", "Return merged result"],
      template: `def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left  = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    # Merge step
    result = []; i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]: result.append(left[i]); i += 1
        else: result.append(right[j]); j += 1
    return result + left[i:] + right[j:]`,
    },
    {
      name: "Quick Sort",
      emoji: "⚡",
      color: "bg-yellow-50 border-yellow-200",
      titleColor: "text-yellow-800",
      when: "General purpose, fastest in practice, in-place needed",
      avoid: "Need stable sort, worst-case sensitive (already sorted input)",
      timeComplexity: "O(n log n) avg | O(n²) worst",
      spaceComplexity: "O(log n) stack",
      steps: ["Pick pivot (random = best)", "Partition: smaller left, larger right", "Recursively sort both sides", "In-place — no merge step needed"],
      template: `def quick_sort(arr):
    if len(arr) <= 1: return arr
    pivot  = arr[len(arr)//2]          # middle pivot
    left   = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right  = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

# In-place with partition (interview version):
def partition(arr, low, high):
    pivot = arr[high]; i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1; arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1`,
    },
    {
      name: "Heap Sort",
      emoji: "🌳",
      color: "bg-purple-50 border-purple-200",
      titleColor: "text-purple-800",
      when: "Need O(n log n) guaranteed with O(1) space, Top-K problems",
      avoid: "When stability needed or cache performance matters",
      timeComplexity: "O(n log n) always",
      spaceComplexity: "O(1)",
      steps: ["Build max heap in O(n)", "Swap root (max) with last element", "Reduce heap size by 1", "Heapify from root", "Repeat until sorted"],
      template: `def heap_sort(arr):
    n = len(arr)
    # Build max heap
    for i in range(n//2 - 1, -1, -1):
        heapify(arr, n, i)
    # Extract elements
    for i in range(n-1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]   # swap max to end
        heapify(arr, i, 0)

def heapify(arr, n, i):
    largest = i
    left = 2*i + 1; right = 2*i + 2
    if left  < n and arr[left]  > arr[largest]: largest = left
    if right < n and arr[right] > arr[largest]: largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
    },
    {
      name: "Counting Sort",
      emoji: "🔢",
      color: "bg-red-50 border-red-200",
      titleColor: "text-red-800",
      when: "Integers with small known range (e.g., sort exam scores 0-100)",
      avoid: "Large value ranges, floating point, strings directly",
      timeComplexity: "O(n + k) where k = range",
      spaceComplexity: "O(k)",
      steps: ["Find max value k", "Create count array of size k+1", "Count each element", "Reconstruct sorted array from counts"],
      template: `def counting_sort(arr):
    if not arr: return arr
    max_val = max(arr)
    count = [0] * (max_val + 1)
    for x in arr:
        count[x] += 1
    result = []
    for i, c in enumerate(count):
        result.extend([i] * c)
    return result`,
    },
  ],

  problems: [
    {
      name: "Sort Colors (Dutch National Flag)",
      difficulty: "Medium",
      companies: ["Amazon", "Microsoft", "Google", "Facebook"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/sort-colors/", id: "#75" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/", id: "Practice" },
      ],
      statement: "Given array with only 0s, 1s, and 2s — sort it in-place without using built-in sort.",
      example: "[2,0,2,1,1,0] → [0,0,1,1,2,2]",
      constraints: ["In-place only", "O(n) time", "Only one pass preferred"],
      approaches: [
        {
          title: "Count and Fill",
          emoji: "🔢",
          tag: "Two Pass",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Count 0s, 1s, 2s. Then fill array with correct counts.",
          when: "Simple. Two passes.",
          code: `def sort_colors(nums):
    c0 = c1 = c2 = 0
    for n in nums:
        if n == 0: c0 += 1
        elif n == 1: c1 += 1
        else: c2 += 1
    nums[:c0] = [0] * c0
    nums[c0:c0+c1] = [1] * c1
    nums[c0+c1:] = [2] * c2`,
        },
        {
          title: "Dutch National Flag (One Pass)",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) | Space: O(1)",
          idea: "Three pointers: low, mid, high. 0s go left of low, 2s go right of high, 1s stay in middle.",
          when: "Best — single pass, O(1) space.",
          code: `def sort_colors(nums):
    low = mid = 0
    high = len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1; mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1              # don't advance mid!`,
        },
      ],
      ai: {
        hints: ["Think about partitioning into 3 regions", "Dutch National Flag algorithm by Dijkstra"],
        followUps: ["Sort Colors II (k colors)", "Three-way partitioning"],
        interviewQuestions: ["Why don't we advance mid when swapping with high?", "Extend to k colors?"],
      },
    },
    {
      name: "Merge Intervals",
      difficulty: "Medium",
      companies: ["Amazon", "Google", "Facebook", "Microsoft", "Bloomberg"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/merge-intervals/", id: "#56" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/merging-intervals/", id: "Practice" },
      ],
      statement: "Given array of intervals [start, end], merge all overlapping intervals.",
      example: "[[1,3],[2,6],[8,10],[15,18]] → [[1,6],[8,10],[15,18]]",
      constraints: ["Intervals may be unsorted", "Return merged array"],
      approaches: [
        {
          title: "Sort + Merge",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n log n) | Space: O(n)",
          idea: "Sort by start time. Then scan: if current start ≤ last merged end → they overlap → merge by extending end. Else start new interval.",
          when: "Standard solution. Always.",
          code: `def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])  # sort by start
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        last_end = merged[-1][1]
        if start <= last_end:            # overlap!
            merged[-1][1] = max(last_end, end)  # extend
        else:
            merged.append([start, end]) # new interval
    return merged`,
        },
      ],
      ai: {
        hints: ["Sorting by start time is the key", "When do two intervals overlap?"],
        followUps: ["Insert Interval", "Non-overlapping Intervals", "Meeting Rooms I & II"],
        interviewQuestions: ["What if intervals are already sorted?", "How to count non-overlapping intervals?"],
      },
    },
    {
      name: "Kth Largest Element",
      difficulty: "Medium",
      companies: ["Amazon", "Facebook", "Google", "LinkedIn"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", id: "#215" },
        { name: "GFG", url: "https://www.geeksforgeeks.org/kth-smallest-largest-element-in-unsorted-array/", id: "Practice" },
      ],
      statement: "Find the kth largest element in an unsorted array (not kth distinct).",
      example: "nums=[3,2,1,5,6,4], k=2 → 5",
      constraints: ["1 ≤ k ≤ n", "Not necessarily distinct elements"],
      approaches: [
        {
          title: "Sort — Simple",
          emoji: "📊",
          tag: "O(n log n)",
          complexity: "Time: O(n log n) | Space: O(1)",
          idea: "Sort descending, return index k-1.",
          when: "Quick to write. Not optimal.",
          code: `def find_kth_largest(nums, k):
    nums.sort(reverse=True)
    return nums[k-1]`,
        },
        {
          title: "Min-Heap of size k",
          emoji: "🌳",
          tag: "O(n log k)",
          complexity: "Time: O(n log k) | Space: O(k)",
          idea: "Maintain min-heap of size k. If new element > heap min, replace it. Final heap top = kth largest.",
          when: "Good for streaming data / very large arrays.",
          code: `import heapq
def find_kth_largest(nums, k):
    heap = nums[:k]
    heapq.heapify(heap)                   # min-heap of size k
    for num in nums[k:]:
        if num > heap[0]:
            heapq.heapreplace(heap, num)  # replace min
    return heap[0]                        # kth largest`,
        },
        {
          title: "QuickSelect",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n) avg | Space: O(1)",
          idea: "Like QuickSort but only recurse on the side containing kth element. Average O(n).",
          when: "Best average case. Preferred in interviews.",
          code: `import random
def find_kth_largest(nums, k):
    target = len(nums) - k        # kth largest = (n-k)th smallest
    def quickselect(lo, hi):
        pivot = nums[random.randint(lo, hi)]
        # Partition
        left = lo; right = hi; mid = lo
        while mid <= right:
            if nums[mid] < pivot:
                nums[left], nums[mid] = nums[mid], nums[left]
                left += 1; mid += 1
            elif nums[mid] > pivot:
                nums[mid], nums[right] = nums[right], nums[mid]
                right -= 1
            else:
                mid += 1
        if target < left: return quickselect(lo, left-1)
        elif target >= mid: return quickselect(mid, hi)
        else: return nums[target]
    return quickselect(0, len(nums)-1)`,
        },
      ],
      ai: {
        hints: ["Can you avoid sorting the entire array?", "QuickSelect only sorts the partition you need"],
        followUps: ["K Closest Points to Origin", "Top K Frequent Elements", "Find Median from Data Stream"],
        interviewQuestions: ["What's QuickSelect worst case?", "When to use heap vs QuickSelect?"],
      },
    },
    {
      name: "Count Inversions",
      difficulty: "Hard",
      companies: ["Google", "Amazon", "Adobe"],
      platforms: [
        { name: "GFG", url: "https://www.geeksforgeeks.org/counting-inversions/", id: "Practice" },
        { name: "LeetCode", url: "https://leetcode.com/problems/reverse-pairs/", id: "#493 (related)" },
      ],
      statement: "Count pairs (i,j) where i < j but arr[i] > arr[j]. An inversion means the array is 'out of order'.",
      example: "[2,4,1,3,5] → 3 inversions: (2,1),(4,1),(4,3)",
      constraints: ["Count must be exact", "O(n log n) expected"],
      approaches: [
        {
          title: "Brute Force",
          emoji: "🐢",
          tag: "O(n²)",
          complexity: "Time: O(n²) | Space: O(1)",
          idea: "Check every pair.",
          when: "Never — too slow.",
          code: `def count_inversions_brute(arr):
    count = 0
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):
            if arr[i] > arr[j]:
                count += 1
    return count`,
        },
        {
          title: "Modified Merge Sort",
          emoji: "⚡",
          tag: "OPTIMAL",
          complexity: "Time: O(n log n) | Space: O(n)",
          idea: "During merge step: when right element is placed before left elements, all remaining left elements form inversions with it. Count them.",
          when: "Classic. Must know for interviews.",
          code: `def count_inversions(arr):
    if len(arr) <= 1: return arr, 0
    mid = len(arr) // 2
    left,  lc = count_inversions(arr[:mid])
    right, rc = count_inversions(arr[mid:])
    merged, mc = merge_count(left, right)
    return merged, lc + rc + mc

def merge_count(left, right):
    result = []; count = 0; i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
            count += len(left) - i  # all remaining left > right[j]
    result += left[i:] + right[j:]
    return result, count`,
        },
      ],
      ai: {
        hints: ["Think about what happens during merge — when does an inversion occur?", "All left elements remaining when you pick a right element are inversions"],
        followUps: ["Reverse Pairs (#493)", "Global and Local Inversions"],
        interviewQuestions: ["Why merge sort naturally counts inversions?"],
      },
    },
  ],

  interviewTips: [
    "Never code Bubble Sort in an interview — it signals poor algorithm knowledge",
    "For general sorting: mention library sort first (TimSort/IntroSort), then discuss if custom needed",
    "Quick Sort: always mention random pivot to avoid O(n²) worst case",
    "Merge Sort: stable, guaranteed O(n log n) — use for linked lists and external sorting",
    "Heap Sort: O(n log n) + O(1) space — mention when both time and space matter",
    "Counting/Radix Sort: only for integers with known range — always mention the constraint",
    "Algorithm chooser: small/nearly sorted → Insertion, stability needed → Merge, general → Quick",
    "TimSort (Python, Java Objects) combines Merge + Insertion — great for real-world data",
  ],

  mistakes: [
    "Using Bubble Sort in any interview — shows lack of algorithm knowledge",
    "JavaScript sort() without comparator — lexicographic sort gives wrong number order",
    "Not mentioning Quick Sort worst case O(n²) — always address this",
    "Forgetting Merge Sort needs O(n) extra space — not in-place",
    "Counting Sort for large value ranges — O(k) space becomes impractical",
    "Selection Sort: minimum swaps but always O(n²) — only advantage is swap count",
    "Confusing stable (Merge, Insertion) with unstable (Quick, Heap, Selection)",
  ],

  quiz: [
    {
      q: "Which sorting algorithm guarantees O(n log n) in ALL cases including worst case?",
      options: ["Quick Sort", "Merge Sort", "Insertion Sort", "Bucket Sort"],
      answer: 1,
      explanation: "Merge Sort always divides in half and always takes O(n log n) regardless of input. Quick Sort degrades to O(n²) on already-sorted arrays with bad pivot choice.",
    },
    {
      q: "JavaScript's arr.sort() without a comparator will sort numbers incorrectly. Why?",
      options: [
        "JavaScript has a bug",
        "It sorts lexicographically (as strings): 10 comes before 9",
        "It uses a random algorithm",
        "It only works for strings",
      ],
      answer: 1,
      explanation: "Default sort converts elements to strings. So [10, 9, 2] sorts as ['10','2','9'] → [10,2,9]. Always use arr.sort((a,b) => a-b) for numbers.",
    },
    {
      q: "Which sorting algorithm is STABLE?",
      options: ["Quick Sort", "Heap Sort", "Selection Sort", "Merge Sort"],
      answer: 3,
      explanation: "Merge Sort is stable — equal elements maintain their relative order. Quick, Heap, and Selection sorts can swap equal elements, making them unstable.",
    },
    {
      q: "When is Insertion Sort the BEST choice?",
      options: [
        "Large random arrays",
        "Nearly sorted arrays or very small arrays",
        "Arrays with integers in small range",
        "When stability doesn't matter",
      ],
      answer: 1,
      explanation: "Insertion Sort is adaptive — it's O(n) on nearly sorted data because elements don't need to move far. It's also the best choice for arrays smaller than ~10 elements, which is why TimSort and IntroSort use it internally.",
    },
    {
      q: "Counting Sort has complexity O(n+k). What is k?",
      options: ["Number of comparisons", "The range of input values (max - min)", "Number of passes", "Number of buckets"],
      answer: 1,
      explanation: "k is the range of values. If array contains values 0 to 1000, k=1001. If k is much larger than n (e.g., sorting 10 numbers ranging 0 to 10^9), Counting Sort is impractical due to O(k) space.",
    },
  ],

  practice_links: [
    { platform: "LeetCode Sorting", url: "https://leetcode.com/tag/sorting/", color: "bg-orange-500", problems: "150+ problems", recommended: true },
    { platform: "Striver's Sorting Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", color: "bg-indigo-600", problems: "Complete roadmap", recommended: true },
    { platform: "GFG Sorting", url: "https://www.geeksforgeeks.org/sorting-algorithms/", color: "bg-green-600", problems: "All algorithms with practice" },
    { platform: "NeetCode Sorting", url: "https://neetcode.io/roadmap", color: "bg-violet-600", problems: "Curated interview problems" },
    { platform: "Visualgo Sorting", url: "https://visualgo.net/en/sorting", color: "bg-teal-600", problems: "Visual algorithm animations" },
    { platform: "InterviewBit Sorting", url: "https://www.interviewbit.com/courses/programming/sorting/", color: "bg-blue-600", problems: "Interview focused" },
  ],
};

export default sorting;
