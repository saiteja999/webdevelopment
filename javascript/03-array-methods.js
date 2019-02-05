/**
 * ==========================================
 *  ARRAY METHODS
 * ==========================================
 *  The bread and butter of JS development.
 *  You'll use these every single day.
 *
 *  Run: node 03-array-methods.js
 * ==========================================
 */

const products = [
    { id: 1, name: "Laptop", price: 999, category: "electronics", inStock: true },
    { id: 2, name: "Headphones", price: 149, category: "electronics", inStock: true },
    { id: 3, name: "Desk Chair", price: 299, category: "furniture", inStock: false },
    { id: 4, name: "Monitor", price: 449, category: "electronics", inStock: true },
    { id: 5, name: "Notebook", price: 12, category: "stationery", inStock: true },
    { id: 6, name: "Standing Desk", price: 599, category: "furniture", inStock: true },
    { id: 7, name: "Pen Set", price: 8, category: "stationery", inStock: false },
    { id: 8, name: "Webcam", price: 79, category: "electronics", inStock: true },
];


// --- map(): Transform every element ---
// Problem: Get just the product names from the array of objects.
// Solution: map() returns a new array with the callback applied to each element.
const names = products.map(p => p.name);
console.log("map:", names);
// → ["Laptop", "Headphones", "Desk Chair", "Monitor", ...]


// --- filter(): Keep only matching elements ---
// Problem: Get products that are in stock AND cost more than $100.
// Solution: filter() returns a new array with only elements where the callback returns true.
const expensive = products.filter(p => p.inStock && p.price > 100);
console.log("filter:", expensive.map(p => p.name));
// → ["Laptop", "Headphones", "Monitor", "Standing Desk"]


// --- find() and findIndex() ---
// Problem: Find a single product by name, and the index of the $12 item.
// Solution: find() returns the first match (or undefined). findIndex() returns the index (or -1).
const monitor = products.find(p => p.name === "Monitor");
const cheapIndex = products.findIndex(p => p.price === 12);
console.log("find:", monitor);
console.log("findIndex:", cheapIndex);
// → { id: 4, name: "Monitor", ... }
// → 4


// --- reduce(): Accumulate into a single value ---
// Problem: Calculate the total price of all in-stock products.
// Solution: reduce(callback, initialValue) — the callback gets (accumulator, current).
const totalInStock = products
    .filter(p => p.inStock)
    .reduce((sum, p) => sum + p.price, 0);
console.log("reduce total:", totalInStock);
// → 2287 (999 + 149 + 449 + 12 + 599 + 79)


// --- some() and every() ---
// Problem: Check if ANY product is out of stock. Check if ALL are under $1000.
// Solution: some() returns true if at least one matches. every() returns true if all match.
const someOutOfStock = products.some(p => !p.inStock);
const allUnder1000 = products.every(p => p.price < 1000);
console.log("some out of stock:", someOutOfStock); // true
console.log("every under 1000:", allUnder1000);     // true


// --- sort() ---
// Problem: Sort products by price (lowest first).
// Solution: sort((a, b) => a - b) for ascending.
// Using [...products] to avoid mutating the original array.
const sorted = [...products].sort((a, b) => a.price - b.price);
console.log("sort:", sorted.map(p => `${p.name}: $${p.price}`));
// → ["Pen Set: $8", "Notebook: $12", "Webcam: $79", ...]


// --- filter() + map() chain ---
// Problem: Get names of in-stock electronics, in uppercase.
// Solution: Chain filter → map. Each returns a new array to pass along.
const elecNames = products
    .filter(p => p.category === "electronics" && p.inStock)
    .map(p => p.name.toUpperCase());
console.log("chain:", elecNames);
// → ["LAPTOP", "HEADPHONES", "MONITOR", "WEBCAM"]


// --- reduce() for groupBy ---
// Problem: Group products by category into an object.
// Solution: reduce with an object as accumulator. For each item, push into the right key.
const grouped = products.reduce((acc, p) => {
    acc[p.category] = acc[p.category] || [];
    acc[p.category].push(p.name);
    return acc;
}, {});
console.log("groupBy:", grouped);
// → { electronics: [...], furniture: [...], stationery: [...] }


// --- flat() and flatMap() ---
// Problem: Flatten a nested array. Also flatten while mapping.
// Solution: flat(depth) flattens. flatMap() is map() + flat(1) in one step.
const nested = [[1, 2], [3, [4, 5]], [6]];
const flattened = nested.flat(Infinity);
console.log("flat:", flattened);
// → [1, 2, 3, 4, 5, 6]

const posts = [
    { title: "Post 1", tags: ["js", "web"] },
    { title: "Post 2", tags: ["css", "design"] },
    { title: "Post 3", tags: ["js", "node"] },
];
const allTags = posts.flatMap(p => p.tags);
console.log("flatMap:", allTags);
// → ["js", "web", "css", "design", "js", "node"]


// --- Chaining Everything Together ---
// Problem: From products, get in-stock electronics sorted by price (high→low) as formatted strings.
// Solution: Chain filter → filter → sort → map → join.
const report = products
    .filter(p => p.category === "electronics")
    .filter(p => p.inStock)
    .sort((a, b) => b.price - a.price)
    .map(p => `${p.name} - $${p.price}`)
    .join("\n");
console.log("chained:\n" + report);
// → Laptop - $999
//   Monitor - $449
//   Headphones - $149
//   Webcam - $79
