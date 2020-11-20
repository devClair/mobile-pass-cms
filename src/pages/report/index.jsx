import React from "react";
import { Route } from "react-router-dom";

// ui
// import Layout from "./../../layout/";
import List from "./list";

const RoutingContainer = (props) => {
  const { match } = props;

  return (
    <>
      {/* <Layout> */}
      <Route exact path={match.path} component={List} />
      {/* <Route path={`${match.path}/detail/:user_no`} component={Detail} /> */}

      {/* </Layout> */}
    </>
  );
};

export default RoutingContainer;