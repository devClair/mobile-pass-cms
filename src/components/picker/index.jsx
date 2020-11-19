import React, { useState, useEffect } from "react";

import { StyledPicker } from "./styles";
import { Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

//-------------------------------------------
// date-fns
import { subMonths, addMonths, endOfToday, format, endOfMonth } from "date-fns";

const useStyles = makeStyles((theme) => ({
  change_month_button: {
    padding: 0,
    color: "#333",
  },
  picker: {
    backgroundColor: "white",
  },
}));

const Picker = (props) => {
  const classes = useStyles();
  const { value, onChange } = props;

  const prevMonth = () => {
    onChange(subMonths(value, 1));
  };
  const nextMonth = () => {
    onChange(addMonths(value, 1));
  };

  return (
    <Grid container alignItems="center">
      <Grid item>
        <IconButton
          color="inherit"
          className={classes.change_month_button}
          onClick={prevMonth}
        >
          <ArrowLeftIcon />
        </IconButton>
      </Grid>

      <StyledPicker>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            variant="inline"
            openTo="month"
            views={["year", "month"]}
            // label="Year and Month"
            // helperText="Start from year selection"
            value={value}
            onChange={onChange}
            format="yyyy-MM"
            autoOk
            maxDate={endOfToday()}
            className={classes.picker}
          />
        </MuiPickersUtilsProvider>
      </StyledPicker>
      <Grid item>
        <IconButton
          color="inherit"
          className={classes.change_month_button}
          onClick={nextMonth}
          disabled={
            format(endOfMonth(value), "yyyy-MM-dd") ===
            format(endOfMonth(new Date()), "yyyy-MM-dd")
          }
        >
          <ArrowRightIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Picker;
