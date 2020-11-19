import React from "react";

// layout
import Layout from "./../../layout/";

// react-router-dom
import { Route } from "react-router-dom";

// list
import List from "./list";

// detail
import Detail from "./detail";

const Lecturer = (props) => {
  const { match } = props;

  return (
    <Layout>
      <Route exact path={match.path} component={List} />
      <Route path={`${match.path}/detail/:lecturer_no`} component={Detail} />
    </Layout>
  );
};

export default Lecturer;
