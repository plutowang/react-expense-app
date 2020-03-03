import moment from "moment";
// Get Visiable Expenses

const getVisableExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const createdAtMoment = moment(expense.createdAt);
      // if all three of these are true,
      // we have complete mathch and
      // we want to return `True` form the filter
      // undifined startDate or createdAt is after the startDate
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, "day")
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, "day")
        : true;
      const textMatch =
        typeof text !== "string" ||
        (expense.description &&
          expense.description.toLowerCase().includes(text.toLowerCase())) ||
        (expense.note &&
          expense.note.toLowerCase().includes(text.toLowerCase()));

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      // sort by deceending
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return b.amount - a.amount;
      }
    });
};

export default getVisableExpenses;
