import React, { useState, useEffect } from "react";

import Wrapper from "./styles";
import { useHistory } from "react-router";

//-------------------------------------------
// redux
import { useDispatch, useSelector } from "react-redux";

// @psyrenpark/auth
import {
  Auth,
  CurrentAuthUiState,
  AuthType,
  UserState,
} from "@psyrenpark/auth";

// material-ui/core/styles
import { makeStyles } from "@material-ui/core/styles";

// material-ui/core
import { Grid, AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: (props) => `calc(100% - ${props.drawerWidth}px)`,
    marginLeft: (props) => props.drawerWidth,
  },
  BtnLogout: {
    textTransform: "none",
  },
}));

const Header = (props) => {
  const { drawerWidth } = props;
  const history = useHistory();
  const classes = useStyles({ drawerWidth: drawerWidth });

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const signOutFunction = async () => {
    Auth.signOutProcess(
      {
        authType: AuthType.EMAIL,
      },
      async (data) => {
        // 성공처리
        console.log("signOutFunction -> data", data);

        dispatch({
          type: "SIGN_OUT",
        });

        alert("로그아웃");
      },
      (error) => {
        // 실패처리,
        console.log("signOutFunction -> error", error);
        alert(error.message);
      },
      (isLoading) => {
        // 로딩처리
        dispatch({ type: "SET_IS_LOADING", payload: isLoading });
      }
    );
  };

  return (
    <AppBar position="fixed" className={classes.appBar} color="transparent">
      <Toolbar>
        <Grid container justify="space-between" className="header">
          <Typography variant="h6" noWrap color="primary">
            Permanent drawer
          </Typography>
          <Grid item className="util">
            <Button
              color="primary"
              variant="contained"
              onClick={signOutFunction}
              className={classes.BtnLogout}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
