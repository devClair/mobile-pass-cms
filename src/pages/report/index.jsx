import React from "react";
import { Route, Redirect } from "react-router-dom";

// ui
import List from "./list";

const RoutingContainer = (props) => {
  const { match } = props;
  // console.log(match);

  return (
    <>
      <Route exact path={match.path} component={List} />
    </>
  );
};

export default RoutingContainer;
