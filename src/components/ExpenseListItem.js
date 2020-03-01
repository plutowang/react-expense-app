import React from "react";
import { Link } from "react-router-dom";

// Export a stateless function components
// show up description, amount, createdAt
export const ExpenseListItem = ({ id, description, amount, createAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>
      ${amount} -- {createAt}
    </p>
  </div>
);

export default ExpenseListItem;
