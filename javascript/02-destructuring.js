/**
 * ==========================================
 *  DESTRUCTURING
 * ==========================================
 *  One of the most used ES6+ features.
 *  Essential for React, Node.js, and modern JS.
 *
 *  Run: node 02-destructuring.js
 * ==========================================
 */

// --- Basic Array Destructuring ---
// Problem: Extract specific elements from an array into named variables.
// Solution: [a, b, c] = array assigns by position.
const colors = ["red", "green", "blue", "yellow", "purple"];
const [first, second, third] = colors;
console.log("array basic:", first, second, third);
// → red green blue


// --- Skip Elements ---
// Problem: Only need the 1st and 3rd elements.
// Solution: Leave blanks with commas to skip positions.
const scores = [95, 87, 92, 78, 88];
const [highest, , thirdScore] = scores;
console.log("skip:", highest, thirdScore);
// → 95 92


// --- Rest Pattern with Arrays ---
// Problem: Get the first item and collect the rest.
// Solution: ...rest gathers all remaining elements into a new array.
const queue = ["urgent", "normal", "low", "minimal"];
const [priority, ...others] = queue;
console.log("rest:", priority, others);
// → "urgent" ["normal", "low", "minimal"]


// --- Basic Object Destructuring ---
// Problem: Extract specific properties from an object.
// Solution: { key } = object extracts by property name (order doesn't matter).
const user = {
    name: "Sai Teja",
    age: 25,
    email: "sai@example.com",
    location: "Hyderabad",
    role: "developer"
};
const { name, age, email } = user;
console.log("object basic:", name, age, email);
// → Sai Teja 25 sai@example.com


// --- Renaming During Destructuring ---
// Problem: The property name conflicts with an existing variable, or I want a different name.
// Solution: { originalName: newName } renames during extraction.
const { name: userName, role: jobTitle } = user;
console.log("rename:", userName, jobTitle);
// → Sai Teja developer


// --- Default Values ---
// Problem: A property might not exist on the object.
// Solution: { key = defaultValue } uses the default if the property is undefined.
const profile = { username: "saiteja", plan: "free" };
const { username, plan, country = "India" } = profile;
console.log("defaults:", username, plan, country);
// → saiteja free India


// --- Nested Destructuring ---
// Problem: Extract values from deeply nested objects.
// Solution: Mirror the nesting structure in the destructuring pattern.
const developer = {
    info: {
        name: "Sai",
        address: { city: "Hyderabad", state: "Telangana" }
    },
    skills: ["JavaScript", "React", "Node.js"]
};
const { info: { address: { city } } } = developer;
const [firstSkill] = developer.skills;
console.log("nested:", city, firstSkill);
// → Hyderabad JavaScript


// --- Function Parameter Destructuring ---
// Problem: A function takes a config object — extract params with defaults directly in the signature.
// Solution: Destructure in the function parameter itself.
function createServer({ host = "localhost", port = 3000, protocol = "http" } = {}) {
    return `${protocol}://${host}:${port}`;
}
console.log("fn params:", createServer({ port: 8080 }));
// → http://localhost:8080
console.log("fn params:", createServer({ host: "api.example.com", port: 443, protocol: "https" }));
// → https://api.example.com:443


// --- Swap Variables ---
// Problem: Swap two variables without a temporary variable.
// Solution: [a, b] = [b, a] — array destructuring in one line.
let a = 10;
let b = 20;
[a, b] = [b, a];
console.log("swap:", a, b);
// → 20 10


// --- Real-World: API Response ---
// Problem: Extract specific pieces from a complex API response.
// Solution: Combine nested destructuring with array destructuring.
const apiResponse = {
    status: 200,
    data: {
        users: [
            { id: 1, name: "Alice", active: true },
            { id: 2, name: "Bob", active: false },
            { id: 3, name: "Charlie", active: true }
        ],
        pagination: { page: 1, totalPages: 5, totalItems: 47 }
    },
    headers: { "content-type": "application/json" }
};

const {
    status,
    data: {
        users: [{ name: firstUserName }],
        pagination: { totalPages }
    }
} = apiResponse;
console.log("api response:", status, firstUserName, totalPages);
// → 200 Alice 5
