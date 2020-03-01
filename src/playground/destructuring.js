//
// Object destructuring
//

// const person = {
//   name: "Beck",
//   age: 26,
//   location: {
//     city: "Toronto",
//     temp: 30
//   }
// };

// // const name = person.name;
// // const age = person.age;
// const { name = "Anonymous", age } = person;
// console.log(`${name} is ${age}`);

// // if (person.location.city && person.location.city) {
// //   console.log(`It's ${person.location.temp} in ${person.location.city}`);
// // }

// const { temp: temperature, city } = person.location;
// if (city && temperature) {
//   console.log(`It's ${temperature} in ${city}`);
// }

// const book = {
//   title: "Ego is the Enemy",
//   author: "Ryan Holiday",
//   publisher: {
//     name: "Penguin"
//   }
// };

// const { name: publisherName = "Self Publisher" } = book.publisher;
// console.log(publisherName);

//
// Array destructuring
//

const address = ["1299 S Juniper St.", "Philadelphia", "Pennsylvanis", "19147"];

const [, city, state = "New York"] = address;

console.log(`You are in ${city} ${state}`);

const item = ["Coffee (hot)", "$2.00", "$2.50", "$2.75"];

const [product, , mediumCost] = item;

console.log(`A medium ${product} costs ${mediumCost}`);
