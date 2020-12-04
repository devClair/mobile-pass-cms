import React, { useEffect, useState, useRef } from "react";

//-------------------------------------------
// ui
import clsx from "clsx";
import {
  Grid,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  InputBase,
  Button,
  ButtonGroup,
  Menu,
  Typography,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import { ArrowDropDown, ArrowDropUp, Search } from "@material-ui/icons";

import Picker from "../picker";

//-------------------------------------------
// redux
import { useDispatch, useSelector } from "react-redux";

//-------------------------------------------
// date-fns
import { startOfMonth, endOfMonth, format, endOfToday } from "date-fns";

const useStyles = makeStyles((theme) => ({
  upload_button: {
    color: "white",
    backgroundColor: "rgba(76,175,80,1.0)",
  },
  formControl: {
    // maxHeight: 16.5,
    "& .MuiOutlinedInput-input": {
      paddingTop: "16.5px",
      paddingBottom: "16.5px",
    },
  },
  api_help: {
    color: "#ec407a !important",
  },
  checkbox: {
    // height: "unset!important",
    // marginTop: "5px",
    color: "rgba(0, 0, 0, 0.54)!important",
  },
  default_text: {
    width: "264",
    paddingLeft: "5",
    color: "rgb(200, 200, 200)!important",
  },
  search_grid: {
    cursor: "pointer",
  },
  selectOutlined: {
    color: theme.palette.primary.main,
    "& .MuiOutlinedInput-input": {
      paddingTop: 14,
      paddingBottom: 16,
      background: "white",
      fontWeight: "500",
      width: 104,
    },
    "& fieldset": {
      borderWidth: "2px !important",
      "&.MuiOutlinedInput-notchedOutline": {
        borderColor: `${theme.palette.primary.light} !important`,
      },
    },
    // maxHeight: 16.5,
  },
  headerContainer: {
    border: `solid 1px ${theme.palette.grey[300]}`,
    borderRadius: 4,
  },
  headerItemLabel: {
    width: 56,
    background: theme.palette.grey[200],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.grey[500],
    borderRadius: "4px 0 0 4px",
  },
  outlinedCustomHeader: {
    "& .MuiOutlinedInput-input": {
      paddingTop: 10,
      paddingBottom: 11,
      background: "white",
      minWidth: 64,
      // fontWeight: "500",
    },
    "& fieldset": {
      border: "none",
    },
  },
  buttonOutlinedCustom: {
    "& .MuiButton-outlined": {
      borderColor: theme.palette.grey[300],
    },
  },
  searchFilter: {
    "& .MuiOutlinedInput-input": {
      paddingTop: 12,
      paddingBottom: 13,
      background: theme.palette.grey[200],
      color: theme.palette.grey[500],
    },
    "& fieldset": {
      borderWidth: "1px !important",
      borderRight: "none",
      borderRadius: "4px 0 0 4px",
      "&.MuiOutlinedInput-notchedOutline": {
        borderColor: `${theme.palette.grey[300]} !important`,
      },
    },
  },
  searchText: {
    borderRadius: "0 4px 4px 0",
    paddingLeft: "8px",
    "& svg": {
      cursor: "pointer",
    },
    "& .MuiInputAdornment-positionStart": {
      // color: theme.palette.grey[500],
      color: theme.palette.primary.main,
    },
    "&.MuiOutlinedInput-root": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: `${theme.palette.grey[300]} !important`,
        borderWidth: `1px !important`,
      },
    },
  },
  searchButton: {
    marginLeft: 3,
  },
}));

export const TableHeaderSortSpan = (props) => {
  const classes = useStyles();
  const { onChange, order_key, order_data, order_column } = props;
  const [count, setCount] = useState(0);

  const onClick = (params) => {
    var countTemp = count + 1;

    onChange({
      order_column: order_key,
      order_type: countTemp % 2 === 1 ? "DESC" : "ASC",
    });
    setCount(countTemp);
  };

  useEffect(() => {
    if (order_column !== order_key) {
      setCount(0);
    }
  }, [order_column]);

  return (
    <Grid
      container
      className={classes.search_grid}
      justify="center"
      alignItems={"center"}
      direction="row"
      spacing={1}
    >
      <Grid container className="search_select" alignItems="center">
        <Typography
          display="inline"
          variant={order_column === order_key ? "h6" : undefined}
          color="textSecondary"
          onClick={onClick}
        >
          {order_data.value}
        </Typography>
        {count % 2 === 1 ? <ArrowDropDown /> : <ArrowDropUp />}
      </Grid>
    </Grid>
  );
};

export const SearchFilter = (props) => {
  const classes = useStyles();
  const { search_type_data, onChange } = props;

  const [searchText, setSearchText] = useState();
  const [menuItem, setMenuItem] = useState(
    search_type_data.length > 0 && search_type_data[0].search_column
      ? search_type_data[0].search_column
      : ""
  );

  const onClickSearchButton = () => {
    if (onChange) {
      onChange({
        searchText: searchText ? searchText : null,
        menuItem: menuItem ? menuItem : null,
      });
    }
  };

  const onChangeSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const onSelectMenuItem = (event) => {
    setMenuItem(event.target.value);
    setSearchText("");
  };

  return (
    <Grid
      container
      className="search_grid"
      justify="center"
      direction="row"
      spacing={1}
    >
      <Grid item className="search_select">
        <FormControl margin="dense">
          <Select
            style={{ width: 100 }}
            value={menuItem}
            onChange={onSelectMenuItem}
          >
            {search_type_data.map((search_type, index) => {
              return (
                <MenuItem
                  value={search_type.search_column}
                  key={search_type.key}
                >
                  {search_type.value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl
          // className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          {/* <InputLabel htmlFor="outlined-adornment-password">{}</InputLabel> */}
          <OutlinedInput
            inputProps={{
              style: {
                height: 6,
                width: 70,
              },
            }}
            id="outlined-adornment-search"
            type={"text"}
            value={searchText}
            onChange={onChangeSearchText}
            startAdornment={
              <InputAdornment position="start">
                <Search fontSize={"medium"} />
              </InputAdornment>
            }
            labelWidth={0}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={onClickSearchButton}
        >
          검색
        </Button>
      </Grid>
    </Grid>
  );
};

export const DatePicker = (props) => {
  const classes = useStyles();
  const { filter_dt, onChange } = props;

  const [date, setDate] = useState(filter_dt ? filter_dt : new Date());

  const onChangeDatePicker = (event) => {
    const today = new Date();

    setDate(event);

    var dateData = {
      filter_begin_dt: startOfMonth(event),
      filter_end_dt:
        format(endOfMonth(event), "yyyy-MM-dd") ===
        format(endOfMonth(today), "yyyy-MM-dd")
          ? endOfToday()
          : endOfMonth(event),
    };
    console.log("onChangeDatePicker -> dateData", dateData);

    if (onChange) {
      onChange(dateData);
    }
  };

  return (
    <Grid item className="picker_wrap">
      <Box ml={5} className="date">
        <Picker value={date} onChange={onChangeDatePicker} />
      </Box>
    </Grid>
  );
};

export const TypeSelectMenu = (props) => {
  const classes = useStyles();
  const { items, current, onChange, variant, className } = props;

  const [state, setState] = useState("");

  const onSelectMenuItem = (event) => {
    setState(event.target.value);

    if (onChange) {
      onChange(items.find((item) => item.key === event.target.value));
    }
  };
  useEffect(() => {
    // setState(items.find((x) => x.value === list_type).value);
    setState(current);
  }, []);

  return (
    <Select
      className={classes[className]}
      variant={variant}
      value={state}
      onChange={onSelectMenuItem}
    >
      {items.map((item, index) => {
        return (
          <MenuItem key={item.key} value={item.key}>
            {item.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export const SelectComponent = (props) => {
  const classes = useStyles();
  const { items, current, onChange, variant, className, label } = props;

  const onSelectMenuItem = (event) => {
    if (onChange) {
      onChange(items.find((item) => item.key === event.target.value));
    }
  };

  return (
    <Grid container className={label && classes.headerContainer}>
      {label && (
        <Grid item className={classes.headerItemLabel}>
          <Typography variant="body1">{label}</Typography>
        </Grid>
      )}
      <Grid item>
        <Select
          className={classes[className]}
          variant={variant}
          value={current}
          onChange={onSelectMenuItem}
        >
          {items.map((item, index) => {
            return (
              <MenuItem key={item.key} value={item.key}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
    </Grid>
  );
};

export const ButtonGroupComponent = (props) => {
  const classes = useStyles();
  const { items, current, onClick, variant, className } = props;

  const handleOnClick = (item) => (e) => {
    if (onClick) {
      onClick(item);
    }
  };

  return (
    <ButtonGroup size="large" className={classes.buttonOutlinedCustom}>
      {items.map((x, i) => {
        return (
          <Button
            color={x.key === current ? "primary" : "default"}
            variant={x.key === current ? "contained" : "outlined"}
            onClick={handleOnClick(x)}
          >
            {x.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export const SearchComponent = (props) => {
  const classes = useStyles();
  const reducer = useSelector((state) => state.reducer);
  const {
    items,
    current,
    reducer_key,
    onChange,
    onSubmit,
    variant,
    className,
  } = props;
  // console.log(props);
  const [state, setState] = useState({
    search_filter: "",
    search_text: "",
  });

  const onSelectMenuItem = (e) => {
    setState({ ...state, search_filter: e.target.value, search_text: "" });
    // if (onChange) {
    //   onChange(items.find((item) => item.key === event.target.value));
    // }
  };

  const onInputChange = (e) => {
    setState({ ...state, search_text: e.target.value });
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        search_filter: state.search_filter,
        search_text: state.search_text.trim(),
      });
      // onSubmit(ref.current.value.trim());
    }
  };

  useEffect(() => {
    // console.log(current);
    // console.log(items);
    setState({
      ...state,
      search_filter: current.search_filter,
      search_text: current.search_text,
    });
  }, [
    reducer[reducer_key].list_params.search_filter,
    reducer[reducer_key].list_params.current_page,
  ]);

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item>
        <Select
          className={classes.searchFilter}
          variant="outlined"
          value={state.search_filter}
          onChange={onSelectMenuItem}
        >
          {items.map((item, index) => {
            return (
              <MenuItem key={item.key} value={item.key}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
      {/* <Grid item className="divider"></Grid> */}
      <Grid item>
        <FormControl variant="outlined">
          <OutlinedInput
            inputProps={{
              style: {
                height: 7,
                width: 128,
                paddingTop: 16,
                paddingBottom: 21,
                lineHeight: 1,
              },
            }}
            type={"text"}
            value={state.search_text}
            onChange={onInputChange}
            startAdornment={
              <InputAdornment position="start" onClick={handleSubmit}>
                <Search fontSize={"medium"} />
              </InputAdornment>
            }
            labelWidth={0}
            className={classes.searchText}
            onKeyUp={(e) => {
              e.key === "Enter" && handleSubmit();
            }}
          />
        </FormControl>
      </Grid>
      {/* <Grid item className={classes.searchButton}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          검색
        </Button>
      </Grid> */}
    </Grid>
  );
};
