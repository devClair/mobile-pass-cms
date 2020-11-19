import React from "react";

// layout
import Layout from "./../../layout/";

// react-router-dom
import { Redirect } from "react-router-dom";

const Dashboard = (props) => {
  const { match } = props;

  return <Redirect to="/user" />;
};

export default Dashboard;
