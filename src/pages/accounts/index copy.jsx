import React, { useState } from "react";

// @material-ui/core/styles
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/core
import { Container, Grid, Typography, Box } from "@material-ui/core";

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
    "@media (min-width: 1920px)": {
      maxWidth: "1920px",
    },
    // display: "flex",
    position: "relative",
    height: "100vh",
    "& >div": {
      height: "100%",
    },
  },

  imageContainer: {
    // position: "relative",
    "& .backgroundImage": {
      // maxWidth: 600,
      // position: "absolute",
      // top: 0,
      // left: 0,
      width: "100%",
      height: "100vh",
      objectFit: "cover",
      "@media (min-width: 960px)": {
        width: "unset",
      },
    },
    "& .logo": {
      position: "absolute",
      top: 0,
      left: 0,
    },
  },
  rightContainer: {
    // display: "flex",
    // justifyContent: "flex-start",
  },
}));

const AccountsContainer = (props) => {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12} md={6}>
          <div className={classes.imageContainer}>
            <img src={BackgroundImage} className="backgroundImage" />
            <img src={Logo} className="logo" />
          </div>
        </Grid>
        <Grid item xs={6}>
          <Grid container alignItems="center" justify="center">
            <Grid item className={classes.rightContainer}>
              <div>{props.children}</div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const Accounts = (props) => {
  const { match, location } = props;
  // const entryFlow = match.params.entryFlow;
  const querData = queryString.parse(location.search);

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
