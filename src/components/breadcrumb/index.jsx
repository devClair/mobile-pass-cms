import React from "react";

import Wrapper from "./styles";
import { Grid } from "@material-ui/core";

const Breadcrumb = (props) => {
  const { title, text, pb } = props;
  return (
    <Wrapper pb={pb}>
      <Grid container className="breadcrumb">
        <Grid className="title">{title}</Grid>
        <Grid className="text">{text}</Grid>
      </Grid>
    </Wrapper>
  );
};

export default Breadcrumb;
