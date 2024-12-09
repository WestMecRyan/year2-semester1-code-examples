
let numArray = [2, 73, 200, 153, 4];
for (let item of numArray) {
    console.log(item);
}

const user = {
    name: "Juan",
    age: 19,
    occupation: "Developer"
}

// Object.keys(obj)
console.log(Object.keys(user));

// cache the keys of user as an array
// called userProperties
let userProperties = Object.keys(user);
console.log(userProperties)
// run a for let loop to log each
// property
for (let key of userProperties) {
    console.log(key);
}

// log each individual value of
// user with a for let loop
let userValues = Object.values(user);
for (let val of userValues) {
    console.log(val);
}

let userEntries = Object.entries(user);
console.log(userEntries);
// log each entry as a key:value pair
// ex: ['name', 'Juan']
// logs as // name : Juan