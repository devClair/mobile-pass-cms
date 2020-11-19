import React, { useState, useEffect, useContext } from "react";

// Link
// import { Link, navigate } from "gatsby";

import { apiObject } from "../../../api";
import { useHistory } from "react-router-dom";

//-------------------------------------------
// redux
import { useDispatch, useSelector } from "react-redux";

//--------------------------------------------------
// redux
import {
  Auth,
  CurrentAuthUiState,
  AuthType,
  UserState,
} from "@psyrenpark/auth";

//--------------------------------------------------
// hook
import { useForm, useWatch, Controller } from "react-hook-form";

// material-ui
import {
  Grid,
  Container,
  Typography,
  Box,
  IconButton,
  Checkbox,
  MaterialUIInput,
  Button,
} from "@material-ui/core";
import { QueueOutlined, LockOutlined } from "@material-ui/icons";

// styled-component
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import useLoadingFunction from "../../../Hooks/useLoadingFunction";

const Background = "/images/login-page/login_background.png";
const KoscoliveLogo = "/images/login-page/koskolive_logo.png";
const LogoLiveStudy = "/images/livestudy_logo.png";

//--------------------------------------------------

const useStyles = makeStyles((theme) => ({
  background: {
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
      backgroundImage: `url(${Background})`,
      backgroundSize: "cover",
      backgroundPositionX: "20%",
      backgroundPositionY: "center",
      filter: "brightness(0.8)",
    },
  },
  foreground: {
    position: "relative",
  },
  login_container: {
    height: 680,
  },

  left_container: {
    backgroundColor: "rgba(242,194,0,0.5)",
    color: "white",
    wordBreak: "keep-all",
    height: "100%",
    // padding: 24,
  },
  left_top_container: {
    flex: 2,
    "& > div": {
      height: "100%",
    },
    // background: 'red',
  },
  // left_top_item:{

  // },
  left_bottom_container: {
    flex: 1,
    // border: '2px dotted white',
    "& > div": {
      height: "100%",
    },
  },
  sign_up: {
    cursor: "pointer",
  },
  forgot_password: {
    cursor: "pointer",
  },
  right_container: {
    backgroundColor: "white",

    "& img": {
      width: "150px",
      height: "150px",
    },

    // height: '100%',
  },
  sign_in_button: {
    height: "62px",
    backgroundColor: "#f2c200",
    color: "white",
  },
  input_wrap: {
    paddingBottom: "10px",
    width: "100%",
    "& >input": {
      width: "100%",
      height: "60px",
      lineHeight: "60px",
      padding: "0 20px",
      fontSize: "16px",
      color: "#9e743a",
      background: "#ffffff",
      border: "2px solid #484848",
      borderRadius: "12px",
      "&::placeholder": {
        color: "#9e743a",
      },
    },
  },
}));

export const SignInComponent = (props) => {
  const classes = useStyles();
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();

  const loadingFunction = useLoadingFunction();

  const signInFuntion = async (data) => {
    console.log("signInFuntion -> data", data);

    var userEmail = data.userEmail;
    var userPassword = data.userPassword;

    Auth.signInProcess(
      {
        authType: AuthType.EMAIL,
        email: userEmail,
        password: userPassword,
      },
      async (data) => {
        // 성공처리
        console.log("signInFuntion -> data", data);
        // dispatch({ type: "SET_CURRENT_AUTH_UI_STATE", payload: isLoading });
        // // 유저 정보 가져오기

        try {
          var userData = await apiObject.getUser({
            langCode: "ko",
            loadingFunction,
          });
          console.log("signInFuntion -> userData", userData);
          // console.log("signInFuntion -> userData", JSON.stringify(userData.list));
          // console.log("signInFuntion -> userData", userData.list[0]);

          dispatch({
            type: "SIGN_IN",
            payload: userData,
          });

          // navigate("/")
          // history.push("/");
        } catch (error) {
          alert(error);
        }
      },
      (data) => {
        console.log("signInFuntion -> error", data);

        dispatch({
          type: "SET_MY_AUTH",
          payload: {
            authType: AuthType.EMAIL,
            email: userEmail,
            password: userPassword,
          },
        });

        dispatch({
          type: "SET_CURRENT_AUTH_UI_STATE",
          payload: CurrentAuthUiState.CONFIRM_SIGN_UP,
        });
      },
      (error) => {
        // 실패처리,
        console.log("signInFuntion -> error", error);
        console.log(error.message);
      },
      loadingFunction
    );
  };

  return (
    <Grid
      container
      className={classes.background}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} className={classes.foreground}>
        <Container maxWidth="md">
          <Grid container className={classes.login_container}>
            <Grid item xs={12} md={5}>
              <Grid
                container
                className={classes.left_container}
                direction="column"
                justify="space-between"
              >
                <Grid item className={classes.left_top_container}>
                  <Grid container alignItems="center" justify="center">
                    <Grid item className={classes.left_top_item}>
                      <Box px={3} pt={12}>
                        <Grid container justify="center">
                          <Grid item>
                            <img src={KoscoliveLogo} alt="kosko live" />
                          </Grid>
                          <Box pt={5}>
                            <Typography color="inherit" align="center">
                              실시간으로 진행되는 Kosco Live 강사진의 라이브
                              의학 교육 지금 만나보세요.
                            </Typography>
                          </Box>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={classes.left_bottom_container}>
                  <Grid container alignItems="center" justify="center">
                    <Grid item xs={12}>
                      <Grid container alignItems="center" justify="center">
                        <Grid
                          item
                          xs={5}
                          onClick={() => {
                            // navigate(
                            //   `/auth?auth_ui_state=${CurrentAuthUiState.AGREE_SIGN_UP}`
                            // );
                          }}
                          className={classes.sign_up}
                        >
                          {/* <Link to="/signup"> */}
                          <Grid container alignItems="center">
                            <Grid item>
                              <IconButton color="inherit">
                                <QueueOutlined />
                              </IconButton>
                            </Grid>
                            <Grid item>
                              <Typography display="inline" color="inherit">
                                회원가입
                              </Typography>
                            </Grid>
                          </Grid>
                          {/* </Link> */}
                        </Grid>
                      </Grid>

                      <Grid container alignItems="center" justify="center">
                        <Grid
                          item
                          xs={5}
                          onClick={() => {
                            // navigate(
                            //   `/auth?auth_ui_state=${CurrentAuthUiState.FORGOT_PASSWORD}`
                            // );
                          }}
                          className={classes.forgot_password}
                        >
                          {/* <Link to="forgot-password"> */}
                          <Grid container alignItems="center">
                            <Grid item>
                              <IconButton color="inherit">
                                <LockOutlined />
                              </IconButton>
                            </Grid>
                            <Grid item>
                              <Typography display="inline" color="inherit">
                                PW찾기
                              </Typography>
                            </Grid>
                          </Grid>
                          {/* </Link> */}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={7} className={classes.right_container}>
              <Box py={12} px={6}>
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    <img src={LogoLiveStudy} alt="kosko live" />
                  </Grid>
                  {/* <Grid item xs={4}>
                    <Typography
                      component="h1"
                      variant="h2"
                      align="center"
                      color="inherit"
                      gutterBottom
                      style={{
                        paddingTop: "30px",
                        fontWeight: "700",
                        // color: "#ffffff",
                      }}
                    >
                      LIVET
                    </Typography>
                  </Grid> */}

                  <Grid item xs={12}>
                    <Box pt={7} pb={6}>
                      <Grid container justify="center" spacing={2}>
                        <Grid item xs={10}>
                          <Grid container justify="center">
                            <Grid item className={classes.input_wrap}>
                              <input
                                name="userEmail"
                                ref={register({
                                  required: true,
                                  pattern: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
                                })}
                                type="text"
                                placeholder="이메일 주소"
                              />
                              {errors?.userEmail && (
                                <p className="warning">
                                  email 정보가 올바르지 않습니다.
                                </p>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={10}>
                          <Grid container justify="center">
                            <Grid item className={classes.input_wrap}>
                              <input
                                name="userPassword"
                                ref={register({
                                  required: true,
                                  pattern: /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/,
                                })}
                                type="password"
                                placeholder="비밀번호"
                                onKeyDown={(e) => {
                                  e.key === "Enter" &&
                                    handleSubmit(signInFuntion)();
                                }}
                              />
                              {errors.userPassword && (
                                <p className="warning">
                                  password 정보가 올바르지 않습니다.
                                </p>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container justify="center">
                            <Grid item>
                              <Checkbox /> 로그인 유지
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={10}>
                          <Button
                            variant="contained"
                            // color="primary"
                            fullWidth
                            className={classes.sign_in_button}
                            // className={
                            //   watch("userEmail", false) && watch("userPassword", false)
                            //     ? "btn_move on"
                            //     : "btn_move"
                            // }
                            // className={"btn_move"}
                            onClick={handleSubmit(signInFuntion)}
                          >
                            Login
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};
