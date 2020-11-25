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
  outlinedCustom: {
    color: theme.palette.primary.main,
    "& .MuiOutlinedInput-input": {
      paddingTop: 14,
      paddingBottom: 16,
      background: "white",
      fontWeight: "500",
    },
    "& fieldset": {
      borderWidth: "2px !important",
      "&.MuiOutlinedInput-notchedOutline": {
        borderColor: `${theme.palette.primary.light} !important`,
      },
    },
    // maxHeight: 16.5,
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

export const OrderSelectMenu = (props) => {
  const classes = useStyles();
  const { onChange, filter_list_type, order_data, order_column } = props;

  const [state, setState] = useState("");

  const handleChange = (event) => {
    setState(event.target.value);

    if (onChange) {
      onChange({
        order_column: order_data[filter_list_type].find(
          (order) => order.value === event.target.value
        ).value,
      });
    }
  };
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      console.log({ order_column });
      setState(order_column);
    } else {
      console.log(order_data[filter_list_type][0]);
      setState(order_data[filter_list_type][0].value);
    }
  }, [filter_list_type]);

  return (
    <Select
      // className={classes[className]}
      variant="outlined"
      value={state}
      onChange={handleChange}
    >
      {order_data[filter_list_type]?.map((order, index) => {
        return (
          <MenuItem key={order.key} value={order.value}>
            {order.key}
          </MenuItem>
        );
      })}
    </Select>
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
      <Grid item className="divider"></Grid>
      <Grid item className="date">
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
                <Search fontSize={"small"} />
              </InputAdornment>
            }
            labelWidth={0}
          />
        </FormControl>
      </Grid>
      <Grid item className="date">
        <Button variant="contained" onClick={onClickSearchButton}>
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
  const { items, current, onChange, variant, className } = props;

  const onSelectMenuItem = (event) => {
    if (onChange) {
      onChange(items.find((item) => item.key === event.target.value));
    }
  };

  return (
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
    <ButtonGroup aria-label="contained primary button group">
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
