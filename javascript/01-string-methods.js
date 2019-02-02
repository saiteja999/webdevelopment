/**
 * ==========================================
 *  STRING METHODS
 * ==========================================
 *  The most commonly used string operations
 *  in both frontend and backend JavaScript.
 *
 *  Run: node 01-string-methods.js
 * ==========================================
 */

// --- split(): Break a string into an array ---
// Problem: Parse a CSV string into individual values.
// Solution: split(",") splits on every comma.
const csv = "Alice,Bob,Charlie,Diana,Eve";
const names = csv.split(",");
console.log("split:", names);
// → ["Alice", "Bob", "Charlie", "Diana", "Eve"]


// --- join(): Combine an array into a string ---
// Problem: Display array items separated by a custom delimiter.
// Solution: join(" | ") places the separator between each element.
const fruits = ["Apple", "Banana", "Cherry", "Date"];
const display = fruits.join(" | ");
console.log("join:", display);
// → "Apple | Banana | Cherry | Date"


// --- slice(): Extract a portion of a string ---
// Problem: Pull out "JavaScript" from a sentence.
// Solution: slice(start, end) — start is inclusive, end is exclusive.
const language = "I love JavaScript and TypeScript";
const extracted = language.slice(7, 17);
console.log("slice:", extracted);
// → "JavaScript"


// --- trim(), trimStart(), trimEnd(): Remove whitespace ---
// Problem: User input has leading/trailing spaces.
// Solution: trim() removes whitespace from both sides.
const userInput = "   hello@example.com   ";
const cleaned = userInput.trim();
console.log("trim:", `"${cleaned}"`);
// → "hello@example.com"


// --- replace() and replaceAll() ---
// Problem: Replace occurrences of a word in a string.
// Solution: replace() hits the first match. replaceAll() hits every match.
const greeting = "Hello world! Welcome to the world of coding!";
const first = greeting.replace("world", "JavaScript");
const all = greeting.replaceAll("world", "JavaScript");
console.log("replace first:", first);
// → "Hello JavaScript! Welcome to the world of coding!"
console.log("replaceAll:", all);
// → "Hello JavaScript! Welcome to the JavaScript of coding!"


// --- includes(), startsWith(), endsWith() ---
// Problem: Check if a URL contains certain patterns.
// Solution: These return true/false without needing regex.
const url = "https://api.example.com/users/123";
console.log("includes 'api':", url.includes("api"));       // true
console.log("startsWith 'https':", url.startsWith("https")); // true
console.log("endsWith '123':", url.endsWith("123"));         // true


// --- Template Literals (backticks + ${}) ---
// Problem: Build a string with embedded variables.
// Solution: Backtick strings allow ${expression} interpolation.
const name = "Sai";
const age = 25;
const city = "Hyderabad";
const message = `Hi, I'm ${name}, ${age} years old, from ${city}.`;
console.log("template literal:", message);
// → "Hi, I'm Sai, 25 years old, from Hyderabad."


// --- padStart() and padEnd() ---
// Problem: Format numbers as 2-digit strings for a clock display.
// Solution: padStart(targetLength, padString) pads the beginning.
const hours = 9;
const minutes = 5;
const time = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
console.log("padStart:", time);
// → "09:05"


// --- Chaining String Methods ---
// Problem: Parse structured data from a messy string.
// Solution: Chain trim() → split() → map() to clean and extract.
const rawData = "  Product: iPhone 15 Pro | Price: $999 | Stock: 42  ";
const parsed = rawData
    .trim()
    .split(" | ")
    .map(part => part.split(": ")[1]);
console.log("chained:", parsed);
// → ["iPhone 15 Pro", "$999", "42"]
