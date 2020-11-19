import React from "react";

// layout
import Layout from "./../../layout/";

// react-router-dom
import { Route } from "react-router-dom";

// list
import FaqList from "./list";

// create
import FaqCreate from "./create";

// detail
import FaqDetail from "./detail";

const Lecture = (props) => {
  const { match } = props;

  return (
    <Layout>
      <Route exact path={match.path} component={FaqList} />
      <Route path={`${match.path}/create`} component={FaqCreate} />
      <Route path={`${match.path}/detail/:faq_no`} component={FaqDetail} />
    </Layout>
  );
};

export default Lecture;
