/**
 * ==========================================
 *  ES6+ FEATURES
 * ==========================================
 *  Modern JavaScript features you'll see
 *  in every codebase and framework.
 *
 *  Run: node 07-es6-features.js
 * ==========================================
 */

// --- Spread Operator: Arrays ---
// Problem: Merge two arrays into one, or clone an array.
// Solution: ...array spreads each element out.
const frontend = ["HTML", "CSS", "JavaScript"];
const backend = ["Node.js", "Express", "MongoDB"];
const fullStack = [...frontend, ...backend];
console.log("spread merge:", fullStack);
// → ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"]

const original = [1, 2, 3];
const clone = [...original];
clone.push(4);
console.log("spread clone:", original, clone);
// → [1, 2, 3] [1, 2, 3, 4]  — original is unchanged


// --- Spread Operator: Objects ---
// Problem: Merge config objects (later properties overwrite earlier ones).
// Solution: { ...objA, ...objB } — objB's properties win on conflict.
const defaults = { theme: "light", fontSize: 14, lang: "en" };
const userPrefs = { theme: "dark", fontSize: 18 };
const settings = { ...defaults, ...userPrefs };
console.log("spread obj:", settings);
// → { theme: "dark", fontSize: 18, lang: "en" }

const product = { name: "Phone", price: 699 };
const withStock = { ...product, inStock: true };
console.log("spread + add:", withStock);
// → { name: "Phone", price: 699, inStock: true }


// --- Rest Parameters ---
// Problem: A function that takes a variable number of arguments.
// Solution: ...rest collects remaining arguments into an array.
function multiplySum(multiplier, ...numbers) {
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    return multiplier * sum;
}
console.log("rest params:", multiplySum(2, 1, 2, 3));  // → 12
console.log("rest params:", multiplySum(3, 10, 20));    // → 90


// --- Optional Chaining (?.) ---
// Problem: Accessing nested properties that might not exist crashes with "Cannot read property of undefined".
// Solution: ?. short-circuits to undefined instead of throwing.
const company = {
    name: "TechCorp",
    ceo: { name: "Jane", address: { city: "San Francisco" } }
};
console.log("?. ceo city:", company.ceo?.address?.city);           // → "San Francisco"
console.log("?. cto name:", company.cto?.name);                    // → undefined (no crash)
console.log("?. eng lead:", company.departments?.engineering?.lead); // → undefined


// --- Nullish Coalescing (??) ---
// Problem: || treats 0, "", and false as falsy — but sometimes those are intentional values.
// Solution: ?? only falls back if the left side is null or undefined.
const config = {
    port: 0,
    host: "",
    debug: false,
    timeout: null,
    retries: undefined
};
console.log("?? port:", config.port ?? 3000);       // → 0 (not 3000! 0 is intentional)
console.log("?? host:", config.host ?? "localhost"); // → "" (not "localhost"!)
console.log("?? debug:", config.debug ?? true);      // → false (not true!)
console.log("?? timeout:", config.timeout ?? 5000);  // → 5000 (null triggers fallback)
console.log("?? retries:", config.retries ?? 3);     // → 3 (undefined triggers fallback)


// --- Short-Circuit Evaluation ---
// Problem: Quick conditional logic without if/else.
// Solution: && returns the right side if left is truthy. || returns the first truthy value.
const user = { name: "Alice", isAdmin: true, preferences: null };
const access = user.isAdmin && "Admin Panel" || "Dashboard";
console.log("short-circuit:", access);
// → "Admin Panel"

const prefs = user.preferences || { theme: "default" };
console.log("|| fallback:", prefs);
// → { theme: "default" }


// --- Map and Set ---
// Problem: Need a key-value store that accepts any key type (Map),
//          or need to remove duplicates from an array (Set).
// Solution: Map = key/value pairs (any type as key). Set = unique values only.
const sessions = new Map();
sessions.set("user1", { loggedIn: true, lastSeen: "10:00" });
sessions.set("user2", { loggedIn: false, lastSeen: "09:30" });
sessions.set("user3", { loggedIn: true, lastSeen: "10:15" });
console.log("Map get:", sessions.get("user1"));
console.log("Map has:", sessions.has("user2"));
console.log("Map size:", sessions.size);

const withDupes = [1, 2, 3, 2, 4, 3, 5, 1, 6, 5];
const unique = [...new Set(withDupes)];
console.log("Set unique:", unique);
// → [1, 2, 3, 4, 5, 6]


// --- for...of vs for...in ---
// Problem: Iterating arrays vs objects uses different syntax.
// Solution: for...of iterates VALUES (arrays, strings, Maps, Sets).
//           for...in iterates KEYS (object properties).
const skills = ["JavaScript", "Python", "Rust"];
const person = { name: "Alice", age: 30, job: "Developer" };

console.log("for...of (values):");
for (const skill of skills) {
    console.log(" ", skill);
}

console.log("for...in (keys):");
for (const key in person) {
    console.log(`  ${key}: ${person[key]}`);
}

console.log("Object.entries (key + value):");
for (const [key, value] of Object.entries(person)) {
    console.log(`  ${key} = ${value}`);
}


// --- Tagged Template Literals ---
// Problem: Custom processing of template literal strings (used in libraries like styled-components).
// Solution: A tag function receives the string parts and interpolated values separately.
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] !== undefined ? `**${values[i]}**` : "");
    }, "");
}
const item = "JavaScript";
const level = "essential";
console.log("tagged:", highlight`Learning ${item} is ${level} for web dev`);
// → "Learning **JavaScript** is **essential** for web dev"
