import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

// Export a stateless function components
// show up description, amount, createdAt
export const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>
      {numeral(amount / 100).format("$0,0.00")}
      --
      {moment(createdAt).format("MMM. DDDo, YYYY")}
    </p>
  </div>
);

export default ExpenseListItem;
