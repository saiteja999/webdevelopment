/**
 * ==========================================
 *  OBJECTS & CLASSES
 * ==========================================
 *  Object manipulation and OOP patterns
 *  you'll use everywhere in JS.
 *
 *  Run: node 08-objects-classes.js
 * ==========================================
 */

// --- Object.keys(), Object.values(), Object.entries() ---
// Problem: Need to iterate or inspect an object's contents.
// Solution: These static methods convert object properties to arrays.
const car = { brand: "Tesla", model: "Model 3", year: 2024, color: "white" };

console.log("keys:", Object.keys(car));
// → ["brand", "model", "year", "color"]

console.log("values:", Object.values(car));
// → ["Tesla", "Model 3", 2024, "white"]

console.log("entries:", Object.entries(car));
// → [["brand", "Tesla"], ["model", "Model 3"], ...]

console.log("has 'model':", "model" in car);
// → true


// --- Computed Property Names ---
// Problem: Create an object where the key is dynamic (comes from a variable or function argument).
// Solution: [expression]: value — the expression is evaluated as the key name.
function createField(key, value) {
    return { [key]: value };
}
console.log("computed:", createField("email", "sai@example.com"));
// → { email: "sai@example.com" }

const pairs = [["theme", "dark"], ["lang", "en"], ["fontSize", 16]];
const fromPairs = Object.fromEntries(pairs);
console.log("fromEntries:", fromPairs);
// → { theme: "dark", lang: "en", fontSize: 16 }


// --- Shorthand Properties & Methods ---
// Problem: Creating an object where the key name matches the variable name.
// Solution: { title } is shorthand for { title: title }. method() {} is shorthand for method: function() {}.
const title = "Developer";
const experience = 5;
const profile = {
    title,
    experience,
    describe() {
        return `${this.title} with ${this.experience} years`;
    }
};
console.log("shorthand:", profile.describe());
// → "Developer with 5 years"


// --- Deep Clone vs Shallow Clone ---
// Problem: Spread only clones one level deep — nested objects are still shared.
// Solution: structuredClone() creates a fully independent deep copy.
const original = {
    name: "Alice",
    scores: [95, 87, 92],
    address: { city: "NYC", zip: "10001" }
};

const shallow = { ...original };
shallow.address.city = "LA";
console.log("shallow clone leaks:", original.address.city);
// → "LA" — the nested object was shared!

original.address.city = "NYC";
const deep = structuredClone(original);
deep.address.city = "Chicago";
console.log("deep clone safe:", original.address.city, "vs", deep.address.city);
// → "NYC" vs "Chicago" — fully independent


// --- Class with Constructor, Methods, Getter ---
// Problem: Model a bank account with deposit/withdraw logic.
// Solution: class syntax with constructor, methods, and get (computed property).
class BankAccount {
    constructor(owner, balance = 0) {
        this.owner = owner;
        this.balance = balance;
    }

    deposit(amount) {
        this.balance += amount;
        return this.balance;
    }

    withdraw(amount) {
        if (amount > this.balance) return "Insufficient funds";
        this.balance -= amount;
        return this.balance;
    }

    get summary() {
        return `Owner: ${this.owner}, Balance: $${this.balance}`;
    }
}

const account = new BankAccount("Sai", 1000);
console.log("deposit:", account.deposit(500));     // → 1500
console.log("withdraw:", account.withdraw(200));   // → 1300
console.log("withdraw:", account.withdraw(2000));  // → "Insufficient funds"
console.log("summary:", account.summary);          // → "Owner: Sai, Balance: $1300"


// --- Inheritance with extends ---
// Problem: A SavingsAccount is a BankAccount with extra interest behavior.
// Solution: extends inherits all parent methods. super() calls the parent constructor.
class SavingsAccount extends BankAccount {
    constructor(owner, balance, interestRate) {
        super(owner, balance);
        this.interestRate = interestRate;
    }

    addInterest() {
        const interest = this.balance * this.interestRate;
        this.deposit(interest);
        return interest;
    }

    get summary() {
        return `${super.summary} (${this.interestRate * 100}% interest)`;
    }
}

const savings = new SavingsAccount("Sai", 1000, 0.05);
console.log("interest added:", savings.addInterest()); // → 50
console.log("savings:", savings.summary);
// → "Owner: Sai, Balance: $1050 (5% interest)"


// --- Static Methods ---
// Problem: Utility functions related to the class but not to a specific instance.
// Solution: static methods are called on the class itself (BankAccount.transfer), not on instances.
BankAccount.transfer = function (from, to, amount) {
    const result = from.withdraw(amount);
    if (result === "Insufficient funds") return result;
    to.deposit(amount);
    return "Transfer complete";
};

const alice = new BankAccount("Alice", 500);
const bob = new BankAccount("Bob", 300);
console.log("transfer:", BankAccount.transfer(alice, bob, 100));
console.log("after:", alice.summary, "|", bob.summary);
// → "Alice: $400 | Bob: $400"


// --- Private Fields (#) ---
// Problem: Balance should only be changed through deposit/withdraw, not directly.
// Solution: #field makes it truly private — inaccessible from outside the class.
class SecureBankAccount {
    #balance;

    constructor(owner, balance = 0) {
        this.owner = owner;
        this.#balance = balance;
    }

    deposit(amount) { this.#balance += amount; return this.#balance; }
    withdraw(amount) {
        if (amount > this.#balance) return "Insufficient funds";
        this.#balance -= amount;
        return this.#balance;
    }

    get balance() { return this.#balance; }
    get summary() { return `Owner: ${this.owner}, Balance: $${this.#balance}`; }
}

const secure = new SecureBankAccount("Sai", 1000);
console.log("private get:", secure.balance);   // → 1000 (via getter)
console.log("private:", secure.summary);
// secure.#balance → SyntaxError! Can't access private field from outside


// --- Object Iteration: Real-World Example ---
// Problem: Analyze sales data stored as an object.
// Solution: Object.entries() + array methods (reduce, filter, etc.)
const salesData = {
    January: 12000,
    February: 15000,
    March: 11000,
    April: 18000,
    May: 22000,
    June: 19000
};

const entries = Object.entries(salesData);

const bestMonth = entries.reduce((best, curr) => curr[1] > best[1] ? curr : best);
console.log("best month:", bestMonth[0], `($${bestMonth[1]})`);
// → "May ($22000)"

const total = Object.values(salesData).reduce((sum, v) => sum + v, 0);
console.log("total:", total);
// → 97000

const avg = total / entries.length;
console.log("average:", Math.round(avg));
// → 16167

const above15k = entries.filter(([, v]) => v > 15000).map(([k]) => k);
console.log("above $15k:", above15k);
// → ["February", "April", "May", "June"]
