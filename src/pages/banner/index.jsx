import React from "react";
import { Route } from "react-router-dom";

// layout
import Layout from "./../../layout/";

// page
import List from "./list";
import Create from "./create";
import Detail from "./detail";

const Inquiry = (props) => {
  const { match } = props;

  return (
    <Layout>
      <Route exact path={match.path} component={List} />
      <Route path={`${match.path}/create`} component={Create} />
      <Route path={`${match.path}/detail/:banner_no`} component={Detail} />
    </Layout>
  );
};

export default Inquiry;
