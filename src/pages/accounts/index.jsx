import React, { useState } from "react";

// @material-ui/core/styles
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/core
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Fade,
} from "@material-ui/core";

// react-router-dom
import { Route, useHistory, Link } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";

// query-string
import queryString from "query-string";

// react-hook-form & @hookform
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

// layout
import Layout from "../../layout";

// components/accounts
import { SignIn, ChangePassword } from "../../components/accounts";

import BackgroundImage from "../../images/accounts/bg_img.png";
import Logo from "../../images/accounts/logo.png";

// viewLogic
// import { useSignIn } from "./viewLogic";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "0 auto",
    [theme.breakpoints.up("xl")]: {
      maxWidth: "1920px",
    },
  },
  imageContainer: {
    position: "absolute",
    [theme.breakpoints.up("md")]: {
      position: "unset",
    },
  },
  foreGround: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  inputContainer: {
    width: "400px",
    margin: "16px",
    padding: "40px 16px",
    background: "rgba(265,265,265,0.8)",
    "& .MuiInputBase-root": {
      background: "white",
    },
  },

  backGround: {
    width: "100vw",
    height: "100vh",
    position: "relative",
    "&::before ": {
      content: '""',
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      position: "absolute",
      backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: "cover",
      backgroundPositionX: "20%",
      backgroundPositionY: "center",
      filter: "brightness(0.8)",
    },
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      width: 600,
    },
  },
}));

const AccountsContainer = (props) => {
  const classes = useStyles();

  return (
    // <div className={classes.backgroundImageTest}></div>;

    <div className={classes.container}>
      <Grid container>
        <Grid item xs={12} md={6} lg={3} className={classes.imageContainer}>
          {/* <img src={BackgroundImage} className={classes.background} /> */}
          <div className={classes.backGround} />
        </Grid>
        <Grid item xs={12} md={6} lg={9} className={classes.foreGround}>
          <div className={classes.inputContainer}>{props.children}</div>
        </Grid>
      </Grid>
    </div>
  );
};

const Accounts = (props) => {
  const { match, location } = props;
  // const entryFlow = match.params.entryFlow;
  const querData = queryString.parse(location.search);
  // console.log(querData);

  return (
    <Layout locationPathname={location.pathname}>
      {/* {queryData.entryflow === "signin" && <SignInComponent></SignInComponent>}
      {queryData.entryflow === "pwd" && <ChangePassword></ChangePassword>} */}
      {/* <Route exact path={`/accounts/signin`} component={SignIn} />
      <Route exact path={`/accounts/pwd`} component={ChangePassword} /> */}
      <AccountsContainer>
        {querData.entryFlow === "signin" && <SignIn />}
        {querData.entryFlow === "pwd" && <ChangePassword />}
      </AccountsContainer>
    </Layout>
  );
};

export default Accounts;
