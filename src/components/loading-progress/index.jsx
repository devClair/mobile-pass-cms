import React, { useEffect } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { CircularProgress, LinearProgress } from "@material-ui/core";
// import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

// redux
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  //   root: {
  //     width: "40%",
  //     "& > * + *": {
  //       marginTop: theme.spacing(2),
  //     },
  //   },
}));

export default function SimpleBackdrop() {
  const classes = useStyles();
  const isLoading = useSelector((state) => Boolean(state.reducer.isLoading));

  // const [open, setOpen] = React.useState(false);

  // useEffect(() => {
  //   console.log(reducer.isLoading);
  //   // setOpen(reducer.isLoading);
  // }, [reducer.isLoading]);

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleToggle}>
        Show backdrop
      </Button> */}
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="primary" />
        {/* <div className={classes.root}>
          <LinearProgress color="primary" />
        </div> */}
      </Backdrop>
    </div>
  );
}
