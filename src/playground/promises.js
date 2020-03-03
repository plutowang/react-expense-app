const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("this is my resolved data!");
    // reject("ERROR: someting wrong!");
  }, 1500);
});

console.log("before!");
// promise.then(
//   data => {
//     console.log(1, data);
//   },
//   error => {
//     console.log("error", error);
//   }
// );
promise
  .then(data => {
    console.log(1, data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("this is my other promist!");
      }, 1500);
    });
  })
  .then(str => {
    console.log(2, "is run", str);
  })
  .catch(error => {
    console.log("error", error);
  });
console.log("after!");
