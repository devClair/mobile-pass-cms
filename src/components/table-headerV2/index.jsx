import React, { useState } from "react";

import Wrapper from "./styles";
import {
  Grid,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  InputBase,
  Button,
} from "@material-ui/core";
import Picker from "../picker/";

import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import Menu from "@material-ui/core/Menu";

//-------------------------------------------
// redux
import { useDispatch, useSelector } from "react-redux";

//-------------------------------------------
// date-fns
import { startOfMonth, endOfMonth, format, endOfToday } from "date-fns";

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    padding: theme.spacing(2),
    "@media (min-width: 1280px)": {
      padding: theme.spacing(3, 5),
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },

  column_item: {
    display: "flex",
    alignItems: "center",

    marginLeft: "5px",
    padding: "5px",
  },
}));

const useTabs = (TabValue, Content) => {
  const [currentIndex, setCurrentIndex] = useState(TabValue);
  return {
    currentItem: Content[currentIndex],
    changeItem: setCurrentIndex,
  };
};

const TableHeader = (props) => {
  // console.log(window.location.pathname);
  const path = window.location.pathname.split("/")[1];
  const { columns } = props;

  // const reducer = useSelector((state) => state.reducer);
  // const dispatch = useDispatch();
  // const reducer_path = reducer[path];
  // const department = reducer.department_info;

  // const { currentItem, changeItem } = useTabs(0, reducer_path.sort_tab_data);

  // const [currentDepartment, setCurrentDepartment] = useState(
  //   reducer_path.list_params.current_department
  // );

  // const handleChange = (event) => {
  //   setCurrentDepartment(event.target.value);
  // };

  // const [tempSearchText, setTempSearchText] = useState("");

  const classes = useStyles();

  return (
    <Grid container justify="space-between" className={classes.tableHeader}>
      <Grid item>
        <Grid container justify="flex-start">
          {columns
            .filter((x) => x.position === "left")
            .map((column, index) => {
              return (
                <Grid key={index} className={classes.column_item}>
                  {column.component}
                </Grid>
              );
            })}
        </Grid>
      </Grid>
      <Grid item>
        <Grid container justify="flex-end">
          {columns
            .filter((x) => x.position === "right")
            .map((column, index) => {
              return (
                <Grid key={index} className={classes.column_item}>
                  {column.component}
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TableHeader;
