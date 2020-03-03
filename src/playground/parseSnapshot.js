// export const startSetExpenses = () => {
//     return dispatch => {
//       database
//         .ref("expenses")
//         .once("value")
//         .then(snapshot => {
//           const obj = snapshot.val();
//           const expensesData = [];
//           Object.keys(obj).forEach(id => {
//             expensesData.push({
//               id,
//               description: obj[id].description || "",
//               note: obj[id].note || "",
//               amount: obj[id].amount || 0,
//               createdAt: obj[id].createdAt || "no date"
//             });
//           });
//           return expensesData;
//         })
//         .then(expensesData => {
//           dispatch(setExpenses(expensesData));
//         });
//     };
//   };
  
  // export const startSetExpenses = () => {
  //   return dispatch => {
  //     database.ref("expenses").once("value", snapshot => {
  //       const obj = snapshot.val() || {};
  //       const expensesData = [];
  //       Object.keys(obj).forEach(id => {
  //         expensesData.push({
  //           id,
  //           description: obj[id].description || "",
  //           note: obj[id].note || "",
  //           amount: obj[id].amount || 0,
  //           createdAt: obj[id].createdAt || "no date"
  //         });
  //       });
  //       dispatch(setExpenses(expensesData));
  //     });
  //   };
  // };