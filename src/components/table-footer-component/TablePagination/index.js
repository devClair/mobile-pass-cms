// react
import React, { useEffect, useState } from "react";

// ui
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Link } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  button: {
    // margin: theme.spacing(1),
  },
}));

export const TablePagination = (props) => {
  const classes = useStyles();
  const { count, page, onClick } = props;

  return (
    <>
      <Pagination
        count={count}
        page={page}
        onChange={(e, n) => {
          if (onClick) {
            onClick(n);
          }
        }}
      />
    </>
  );
};
