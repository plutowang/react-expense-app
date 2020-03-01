// Higher Order Component (HOC) - A component (HOC) that renders another component

import React from "react";
import ReactDOM from "react-dom";

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = WrappedComponent => {
  const waring = props => (
    <div>
      {props.isAdmin && <p>This is private info. Please do not share!</p>}
      <WrappedComponent {...props} />
    </div>
  );
  return waring;
};

const requireAuthentication = WrappedComponent => {
  const auth = props => (
    <div>
      {props.isAutenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Please Login to view the info</p>
      )}
    </div>
  );
  return auth;
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);
// ReactDOM.render(
//   <AdminInfo isAdmin={false} info="There are the details" />,
//   document.getElementById("app")
// );
ReactDOM.render(
  <AuthInfo isAutenticated={true} info="There are the details" />,
  document.getElementById("app")
);
