import React from "react";

import { Route } from "react-router-dom";

// ui
import Layout from "./../../layout/";
import List from "./list";
import Detail from "./detail";

const Payment = (props) => {
  const { match } = props;
  return (
    <Layout>
      <Route exact path={match.path} component={List} />
      <Route path={`${match.path}/detail/:lecture_no`} component={Detail} />
    </Layout>
  );
};

export default Payment;
