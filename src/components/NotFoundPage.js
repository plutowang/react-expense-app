import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const NotFoundPage = () => (
  <div>
    <Header />
    <div className="no-found">
      <Link className="no-found__text" to="/">404 - Not Found</Link>
    </div>
  </div>
);

export default NotFoundPage;
