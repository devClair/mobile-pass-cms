import React from "react";
import { Route, Redirect } from "react-router-dom";

// ui
// import Layout from "./../../layout/";
import List from "./list";
// import Detail from "./detail";

const RoutingContainer = (props) => {
  const { match } = props;
  // console.log("RoutingContainer");
  // console.log(match);

  return (
    <>
      <Route exact path={match.path} component={List} />
    </>
  );
};

export default RoutingContainer;
