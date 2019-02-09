/**
 * ==========================================
 *  ASYNC JAVASCRIPT
 * ==========================================
 *  Promises, async/await, and common patterns
 *  for handling asynchronous operations.
 *
 *  Run: node 06-async-js.js
 * ==========================================
 */

// --- Creating a Promise ---
// Problem: Simulate an async operation that can succeed or fail.
// Solution: new Promise((resolve, reject) => { ... })
//   resolve() = success path, reject() = error path.
function delayedResponse(shouldSucceed) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldSucceed) resolve("Success!");
            else reject("Error!");
        }, 1000);
    });
}

delayedResponse(true).then(msg => console.log("promise resolve:", msg));
// → "Success!" (after 1 second)


// --- Promise Chaining ---
// Problem: Three async steps that depend on each other (user → orders → total).
// Solution: .then() returns a new promise, so you can chain them.
function getUser(id) {
    return new Promise(resolve =>
        setTimeout(() => resolve({ id, name: "Alice" }), 300)
    );
}
function getOrders(userName) {
    return new Promise(resolve =>
        setTimeout(() => resolve([
            { item: "Laptop", price: 999 },
            { item: "Mouse", price: 29 }
        ]), 300)
    );
}
function getOrderTotal(orders) {
    return new Promise(resolve =>
        setTimeout(() => resolve(orders.reduce((sum, o) => sum + o.price, 0)), 300)
    );
}

getUser(1)
    .then(user => getOrders(user.name))
    .then(orders => getOrderTotal(orders))
    .then(total => console.log("chained total:", total));
// → 1028


// --- async/await ---
// Problem: Promise chains get hard to read with many steps.
// Solution: async/await makes async code look synchronous.
//   await pauses until the promise resolves.
async function getUserOrderTotal(userId) {
    const user = await getUser(userId);
    const orders = await getOrders(user.name);
    const total = await getOrderTotal(orders);
    return total;
}

getUserOrderTotal(1).then(total => console.log("async/await total:", total));
// → 1028


// --- Error Handling with try/catch ---
// Problem: An async call might fail — need a graceful fallback.
// Solution: Wrap await calls in try/catch. catch handles rejected promises.
function fetchUser(shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) reject(new Error("Network error"));
            else resolve({ name: "Bob", role: "admin" });
        }, 300);
    });
}

async function safeGetUser(shouldFail) {
    try {
        const user = await fetchUser(shouldFail);
        return user;
    } catch (error) {
        console.log("caught:", error.message);
        return { name: "Guest", role: "viewer" };
    }
}

safeGetUser(false).then(u => console.log("try/catch success:", u));
safeGetUser(true).then(u => console.log("try/catch fallback:", u));


// --- Promise.all: Run in parallel ---
// Problem: Need data from 3 independent APIs — waiting one-by-one is slow.
// Solution: Promise.all() runs all promises concurrently and waits for all to finish.
//   Fails fast — if any one rejects, the whole thing rejects.
function fetchPosts()    { return new Promise(r => setTimeout(() => r(["Post1", "Post2"]), 500)); }
function fetchComments() { return new Promise(r => setTimeout(() => r(["Comment1", "Comment2"]), 700)); }
function fetchLikes()    { return new Promise(r => setTimeout(() => r(42), 300)); }

Promise.all([fetchPosts(), fetchComments(), fetchLikes()])
    .then(([posts, comments, likes]) => {
        console.log("Promise.all:", { posts, comments, likes });
    });
// → { posts: [...], comments: [...], likes: 42 }
// Finishes in ~700ms (the slowest one), not 1500ms (sum of all)


// --- Promise.allSettled: Get all results even if some fail ---
// Problem: Some API calls might fail, but I still want results from the ones that succeed.
// Solution: Promise.allSettled() never rejects. Each result has status: "fulfilled" or "rejected".
function api1() { return Promise.resolve("Data from API 1"); }
function api2() { return Promise.reject("API 2 is down"); }
function api3() { return Promise.resolve("Data from API 3"); }

Promise.allSettled([api1(), api2(), api3()])
    .then(results => {
        results.forEach((r, i) => {
            console.log(`allSettled API ${i + 1}:`, r.status, r.value || r.reason);
        });
    });
// → fulfilled "Data from API 1"
// → rejected "API 2 is down"
// → fulfilled "Data from API 3"


// --- Promise.race: First one wins ---
// Problem: Two servers can handle the request — use whichever responds first.
// Solution: Promise.race() resolves/rejects with the first promise to settle.
function serverA() { return new Promise(r => setTimeout(() => r("Response from Server A"), 200)); }
function serverB() { return new Promise(r => setTimeout(() => r("Response from Server B"), 500)); }

Promise.race([serverA(), serverB()])
    .then(result => console.log("race:", result));
// → "Response from Server A" (faster)


// --- Sequential vs Parallel ---
// Problem: Fetching 3 profiles — is it faster to do it one-by-one or all at once?
// Solution: Sequential takes sum of all times. Parallel takes time of the slowest.
function fetchProfile(id) {
    return new Promise(resolve =>
        setTimeout(() => resolve({ id, name: `User ${id}` }), 300)
    );
}

async function sequential() {
    const start = Date.now();
    const u1 = await fetchProfile(1);
    const u2 = await fetchProfile(2);
    const u3 = await fetchProfile(3);
    console.log("sequential:", Date.now() - start, "ms", [u1, u2, u3]);
}
// → ~900ms (300 + 300 + 300)

async function parallel() {
    const start = Date.now();
    const [u1, u2, u3] = await Promise.all([
        fetchProfile(1), fetchProfile(2), fetchProfile(3)
    ]);
    console.log("parallel:", Date.now() - start, "ms", [u1, u2, u3]);
}
// → ~300ms (all run at the same time)

sequential().then(() => parallel());
