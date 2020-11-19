import React, { useState } from "react";

import Wrapper from "./styles";
import { Grid } from "@material-ui/core";

const ButtonType = (props) => {
  const { onClick, title, className } = props;

  return (
    <Wrapper>
      <Grid item className={className} onClick={onClick}>
        {title}
      </Grid>
    </Wrapper>
  );
};

export default ButtonType;
