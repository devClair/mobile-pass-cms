import React, { useState } from "react";

import Wrapper from "./styles";
import {
  Grid,
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
  const {
    children,
    departmentFilter,
    sortTab,
    dateFilter,
    searchFilter,
  } = props;
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const reducer_path = reducer[path];
  const department = reducer.department_info;

  const { currentItem, changeItem } = useTabs(0, reducer_path.sort_tab_data);

  const [currentDepartment, setCurrentDepartment] = useState(
    reducer_path.list_params.current_department
  );

  const handleChange = (event) => {
    setCurrentDepartment(event.target.value);
  };

  const [tempSearchText, setTempSearchText] = useState("");

  const classes = useStyles();

  return (
    <Grid container className="table_header" justify="space-between">
      <Grid item>
        <Grid container>
          <Grid item>
            {departmentFilter && (
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={currentDepartment}
                  onChange={handleChange}
                >
                  {department?.map((x) => {
                    return (
                      <MenuItem key={x.code_id} value={x.code_no}>
                        {x.code_id}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container justify="flex-end">
          <Grid className="content">{children}</Grid>
          {sortTab === true && (
            <Grid item className="sort_item">
              {reducer_path.sort_tab_data.map((x, index) => {
                return (
                  <span
                    key={index}
                    className={
                      reducer_path.list_params.order_column ===
                        x.order_column &&
                      reducer_path.list_params.order_type === x.order_type
                        ? "option on"
                        : "option"
                    }
                    onClick={() => {
                      changeItem(index);
                      dispatch({
                        type: "SET_LIST_PARAMS",
                        payload: {
                          list_params: {
                            order_column: x.order_column,
                            order_type: x.order_type,
                            current_page: 1,
                          },
                          path: path,
                        },
                      });
                    }}
                  >
                    {x.value}
                  </span>
                );
              })}
            </Grid>
          )}
          {dateFilter && (
            <Grid item className="picker_wrap">
              <Grid className="date">
                <Picker
                  value={reducer_path.list_params.filter_end_dt}
                  onChange={(e) => {
                    const today = new Date();
                    dispatch({
                      type: "SET_LIST_PARAMS",
                      payload: {
                        list_params: {
                          filter_begin_dt: startOfMonth(e),
                          filter_end_dt:
                            format(endOfMonth(e), "yyyy-MM-dd") ===
                            format(endOfMonth(today), "yyyy-MM-dd")
                              ? endOfToday()
                              : endOfMonth(e),
                          current_page: 1,
                        },
                        path: path,
                      },
                    });
                  }}
                />
              </Grid>
            </Grid>
          )}
          {searchFilter && (
            <Grid item className="picker_wrap">
              <Grid className="date">
                <FormControl margin="dense">
                  <Select
                    value={reducer_path.list_params.search_type}
                    onChange={(event) => {
                      dispatch({
                        type: "SET_LIST_PARAMS",
                        payload: {
                          list_params: {
                            search_type: reducer_path.search_type_data.filter(
                              (x) => x.search_column === event.target.value
                            )[0].search_column,
                          },
                          path: path,
                        },
                      });
                    }}
                  >
                    {reducer_path.search_type_data.map((x, index) => {
                      return (
                        <MenuItem value={x.search_column} key={x.key}>
                          {x.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid className="divider"></Grid>
              <Grid className="date">
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                    value={tempSearchText}
                    onChange={(e) => {
                      console.log(
                        "TableHeader -> e.target.value",
                        e.target.value
                      );
                      setTempSearchText(e.target.value);
                    }}
                  />
                </div>
              </Grid>
              <Grid className="date">
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch({
                      type: "SET_LIST_PARAMS",
                      payload: {
                        list_params: {
                          search_text: tempSearchText,
                          current_page: 1,
                        },
                        path: path,
                      },
                    });
                  }}
                >
                  검색
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TableHeader;
