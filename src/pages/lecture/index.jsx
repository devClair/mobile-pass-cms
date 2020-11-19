import React from "react";

import { Route } from "react-router-dom";

// ui
import Layout from "./../../layout/";
import List from "./list";
import Create from "./create";
import Detail from "./detail";

const Lecture = (props) => {
  const { match } = props;
  return (
    <Layout>
      <Route exact path={match.path} component={List} />
      <Route path={`${match.path}/create`} component={Create} />
      <Route path={`${match.path}/detail/:lecture_no`} component={Detail} />
    </Layout>
  );
};

export default Lecture;
