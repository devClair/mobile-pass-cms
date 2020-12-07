import React from "react";
import { Route, Redirect } from "react-router-dom";

// ui
import List from "./list";
import Detail from "./detail";
import Create from "./create";

const RoutingContainer = (props) => {
  const { match } = props;
  // console.log(match);

  return (
    <>
      <Route exact path={match.path} component={List} />
      <Route exact path={`${match.path}/detail`} component={Detail} />
      <Route exact path={`${match.path}/create`} component={Create} />
    </>
  );
};

export default RoutingContainer;
