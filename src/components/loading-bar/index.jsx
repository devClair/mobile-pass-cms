import React from "react";

import Wrapper from "./styles";

import LinearProgress from "@material-ui/core/LinearProgress";

const LoadingBar = () => {
  return (
    <Wrapper>
      <LinearProgress className="ProgressBar" />
    </Wrapper>
  );
};

export default LoadingBar;
