import * as firebase from "firebase/app";
import moment from "moment";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// database.ref("expenses").on("child_removed", snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });
// database.ref("expenses").on("child_changed", snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });
database.ref("expenses").on("child_added", snapshot => {
  console.log("child_added",snapshot.key, snapshot.val());
});
// database.ref().on("value", snapshot => {
//   const expenses = [];
//   snapshot.forEach(childSnapshot => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });
//   console.log("expenses", expenses);
// });

// database
//   .ref("expenses")
//   .once("value")
//   .then(snapshot => {
//     const expenses = [];
//     snapshot.forEach(childSnapshot => {
//       expenses.push({
//         id:childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//     console.log("expenses", expenses);
//   });

const expenses = [
  {
    id: "0",
    description: "January Rent",
    note: "This was the fial payment for that address",
    amount: 54500,
    createdAt: 0
  },
  {
    id: "1",
    description: "Gum Bill",
    note: "This was the fial payment for gum",
    amount: 900,
    createdAt: moment(0)
      .subtract(4, "days")
      .valueOf()
  },
  {
    id: "2",
    description: "Water Bill",
    note: "This was the fial payment for water",
    amount: 1200,
    createdAt: moment(0)
      .add(4, "days")
      .valueOf()
  },
  {
    id: "3",
    description: "Gym Bill",
    note: "This was the fial payment for gym",
    amount: 890,
    createdAt: moment(0)
      .add(8, "days")
      .valueOf()
  }
];

// expenses.forEach(expense => {
//   database.ref("expenses").push({
//     description: expense.description,
//     note: expense.note,
//     amount: expense.amount,
//     createdAt: expense.createdAt
//   });
// });

// const firebaseExpenses = expenses.reduce((map, expense) => {
//   map[expense.id] = {
//     description: expense.description,
//     note: expense.note,
//     amount: expense.amount,
//     createdAt: expense.createdAt
//   };
//   return map;
// }, {});
// database.ref("firebaseExpenses").update(firebaseExpenses);
// const notes = [
//   {
//     id: "12",
//     title: "Fist Note",
//     body: "This is my note"
//   },
//   {
//     id: "21",
//     title: "Second Note",
//     body: "This is my note"
//   },
//   {
//     id: "23",
//     title: "Third Note",
//     body: "This is my note"
//   }
// ];

// const firebaseNote = notes.reduce((map, note) => {
//   const id = note.id;
//   const title = note.title;
//   const body = note.body;
//   map[id] = { title, body };
//   return map;
// }, {});

// database.ref().update({
//   notes: notes
// });
// console.log(firebaseNote);
// database.ref().update({
//   firebaseNotes: firebaseNote
// });

// database.ref().set({
//   name: "Beck!!!!",
//   age: 26,
//   job: {
//     position: "Sofrware Developer",
//     company: "Amazon"
//   },
//   isSingle: false,
//   location: {
//     city: "toronto",
//     country: "Canada"
//   }
// });

// database.ref().on("value", snapshot => {
//   const val = snapshot.val();
//   console.log(`${val.name} is a ${val.job.position} at ${val.job.company}`);
// });

// const onValueChange = database.ref().on(
//   "value",
//   snapshot => {
//     const val = snapshot.val();
//     console.log(val);
//   },
//   e => {
//     console.error(e);
//   }
// );

// setTimeout(() => {
//   database.ref("age").set(27);
// }, 1500);

// setTimeout(() => {
//   database.ref().off("value", onValueChange);
// }, 2000);

// setTimeout(() => {
//   database.ref("age").set(27);
// }, 2500);

// database
//   .ref("attribute")
//   .set({
//     hight: 173,
//     weight: 62
//   })
//   .then(() => {
//     console.log("data is saved!");
//   })
//   .catch(e => {
//     console.log("this failed.", e);
//   });

// database.ref().update({
//   name: "Beck",
//   "location/city": "Toronto, ON"
// });

// database.ref("isSingle").remove();
// same as database.ref("isSingle").set(null)

// database
//   .ref()
//   .once("value")
//   .then(snapshot => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch(e => {
//     console.log("this failed.", e);
//   });
