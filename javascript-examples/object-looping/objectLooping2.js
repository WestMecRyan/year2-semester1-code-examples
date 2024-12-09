let numArray = [25, 35, 101, 41, 2];

for (let num of numArray) {
    if (num === 41) { break; }
    else { console.log(num); }
}

let user = {
    name: "Juan",
    age: 20,
    country: "Venezuela"
}
console.log(Object.keys(user));
// instead of console logging Object.keys
// cache the returned array to a variable
let userProperties = Object.keys(user);
// called userProperties
// iterate and log each prop of properties
for (let prop of userProperties) {
    console.log("each prop is: ", prop);
}
// the Object prototype also has a values method
// cache the values of user to a variable
// and iterate and log each value
let userValues = Object.values(user);
for (let val of userValues) {
    console.log(val);
}

console.log("entries", Object.entries(user));
// cache the entries
// iterate over each entry
// and log in the format of a key:value pair
// ex: if entry is ["name", "Juan"]
// log should say // name:Juan
console.log(typeof(entry))
