import React from "react";
import { Route, Redirect } from "react-router-dom";

const RoutingContainer = (props) => {
  const { match } = props;
  // console.log("RoutingContainer");
  // console.log(match);

  return (
    <>
      <Redirect to={`/user`} />
    </>
  );
};

export default RoutingContainer;
