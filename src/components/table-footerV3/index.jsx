import React, { useEffect, useState } from "react";

import Wrapper from "./styles";
import { Grid, Button, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));

const TableFooter = (props) => {
  const { leftRows, pagination, rightRows } = props;

  const classes = useStyles();

  return (
    <Wrapper>
      <Grid container justify="space-between" className="table_footer">
        <Grid item>
          <Grid container justify="space-between" spacing={1}>
            {leftRows &&
              leftRows.map((row, index) => {
                return (
                  <Grid key={index} item>
                    {row.component}
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        <Grid item className="table_pagination">
          {pagination && pagination.component}
        </Grid>
        <Grid item>
          <Grid container justify="space-between" spacing={1}>
            {rightRows &&
              rightRows.map((row, index) => {
                return (
                  <Grid key={index} item>
                    {row.component}
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default TableFooter;
