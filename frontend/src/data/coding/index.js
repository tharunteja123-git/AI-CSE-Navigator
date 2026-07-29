import arrays from "./arrays";
import strings from "./strings";
import linkedList from "./linkedList";
import sorting from "./sorting";
import twopointers from "./twopointers";
import trees from "./trees";
import bitManipulation from "./bitManipulation";
import math from "./math";
import binarySearch from "./binarySearch";
import timeComplexity from "./timeComplexity";
import dp from "./dynamicProgramming";

// ── Coming soon (stub files ready, data being added) ──
//import stackData from "./stack";
/*import queueData from "./queue";
import treesData from "./trees";
import bstData from "./bst";
import graphsData from "./graphs";
import dpData from "./dp";
import recursionData from "./recursion";
import backtrackingData from "./backtracking";
import greedyData from "./greedy";
import hashingData from "./hashing";
import binarySearchData from "./binarySearch";
import twoPointersData from "./twoPointers";
import slidingWindowData from "./slidingWindow";
import prefixSumData from "./prefixSum";
import trieData from "./trie";
import bitManipulationData from "./bitManipulation";
import mathData from "./math";*/

// ── Active topics (full data) ──
export const ACTIVE_TOPICS = [arrays, strings, linkedList, sorting, twopointers,trees,bitManipulation,math,binarySearch,timeComplexity,dp];

// ── Coming soon topics ──
/*export const COMING_SOON_TOPICS = [
  { ...stackData,          name: "Stack & Queue",         emoji: "📚", total: 25 },
  { ...treesData,          name: "Trees & BST",           emoji: "🌳", total: 35 },
  { ...graphsData,         name: "Graphs",                emoji: "🕸️", total: 30 },
  { ...dpData,             name: "Dynamic Programming",   emoji: "⚡", total: 40 },
  { ...recursionData,      name: "Recursion & Backtracking", emoji: "🔄", total: 20 },
  { ...greedyData,         name: "Greedy Algorithms",     emoji: "💰", total: 20 },
  { ...hashingData,        name: "Hashing",               emoji: "🗂️", total: 20 },
  { ...binarySearchData,   name: "Binary Search",         emoji: "🔍", total: 20 },
  { ...twoPointersData,    name: "Two Pointers",          emoji: "👆👆", total: 15 },
  { ...slidingWindowData,  name: "Sliding Window",        emoji: "🪟", total: 15 },
  { ...prefixSumData,      name: "Prefix Sum",            emoji: "➕", total: 10 },
  { ...trieData,           name: "Tries",                 emoji: "🌲", total: 10 },
  { ...bitManipulationData,name: "Bit Manipulation",      emoji: "💡", total: 15 },
  { ...mathData,           name: "Math & Number Theory",  emoji: "🔢", total: 15 },
];*/

// ── All topics combined ──
const TOPICS = [...ACTIVE_TOPICS, /*...COMING_SOON_TOPICS*/];

export default TOPICS;
