import React from "react";
import { Route } from "react-router-dom";

// layout
import Layout from "./../../layout/";

// page
import List from "./list";
import Detail from "./detail";

const Inquiry = (props) => {
  const { match } = props;

  return (
    <Layout>
      <Route exact path={match.path} component={List} />
      <Route path={`${match.path}/detail/:inquiry_no`} component={Detail} />
    </Layout>
  );
};

export default Inquiry;
