// import React, { useState, useEffect, useContext } from "react";
// // import { useHistory } from "react-router-dom";
// import { Grid } from "@material-ui/core";
// import Wrapper from "./styles";

// //-------------------------------------------
// // redux
// import { useDispatch, useSelector } from "react-redux";

// //--------------------------------------------------
// //
// import {
//   Auth,
//   CurrentAuthUiState,
//   AuthType,
//   UserState,
// } from "@psyrenpark/auth";

// import { SignInComponent } from "./SignInComponent";
// import { SignUpComponent } from "./SignUpComponent";
// import { ConfirmSignUpComponent } from "./ConfirmSignUpComponent";
// import { ForgotPasswordComponent } from "./ForgotPasswordComponent";
// import { ConfirmForgotPasswordComponent } from "./ConfirmForgotPasswordComponent";
// import { ChangePasswordComponent } from "./ChangePasswordComponent";

// export const AuthComponent = (props) => {
//   console.log({ props });
//   const { setLoginSw } = props;

//   const reducer = useSelector((state) => state.reducer);
//   const dispatch = useDispatch();

//   return (
//     <Wrapper>
//       <Grid className="login_wrap">
//         {/* <Grid
//           className="modal"
//           onClick={() => {
//             dispatch({
//               type: "SET_CURRENT_AUTH_UI_STATE",
//               payload: CurrentAuthUiState.SIGN_IN,
//             });
//             // setLoginSw(false);
//           }}
//         /> */}
//         <Grid className="login">
//           <Grid className="login_inner">
//             {reducer.currentAuthUiState === CurrentAuthUiState.SIGN_IN && (
//               <SignInComponent />
//             )}
//             {reducer.currentAuthUiState === CurrentAuthUiState.SIGN_UP && (
//               <SignUpComponent />
//             )}
//             {reducer.currentAuthUiState ===
//               CurrentAuthUiState.CONFIRM_SIGN_UP && <ConfirmSignUpComponent />}
//             {reducer.currentAuthUiState ===
//               CurrentAuthUiState.FORGOT_PASSWORD && <ForgotPasswordComponent />}
//             {reducer.currentAuthUiState ===
//               CurrentAuthUiState.CONFIRM_FORGOT_PASSWORD && (
//               <ConfirmForgotPasswordComponent />
//             )}
//             {reducer.currentAuthUiState ===
//               CurrentAuthUiState.CHANGE_PASSWORD && <ChangePasswordComponent />}
//           </Grid>
//         </Grid>
//       </Grid>
//     </Wrapper>
//   );
// };

import React, { useState, useEffect, useContext } from "react";
// import { useHistory } from "react-router-dom";
import Wrapper from "./styles";

//-------------------------------------------
// redux
import { useDispatch, useSelector } from "react-redux";

//--------------------------------------------------
//
import {
  Auth,
  CurrentAuthUiState,
  AuthType,
  UserState,
} from "@psyrenpark/auth";

import { SignInComponent } from "./SignInComponent";
// import { AgreeSignUpComponent } from "./AgreeSignUpComponent";
import { SignUpComponent } from "./SignUpComponent";
import { ConfirmSignUpComponent } from "./ConfirmSignUpComponent";
import { ForgotPasswordComponent } from "./ForgotPasswordComponent";
import { ConfirmForgotPasswordComponent } from "./ConfirmForgotPasswordComponent";
import { ChangePasswordComponent } from "./ChangePasswordComponent";

// material-ui
import {
  Grid,
  Container,
  Typography,
  Box,
  IconButton,
} from "@material-ui/core";
import { QueueOutlined, LockOutlined } from "@material-ui/icons";

// styled-component
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Noto Sans KR", "Montserrat", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#efcf00",
    },
    secondary: {
      main: "#222222",
    },
  },
});

export const AuthComponent = (props) => {
  console.log({ props });
  const { setLoginSw } = props;

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      {reducer.currentAuthUiState === CurrentAuthUiState.SIGN_IN && (
        <SignInComponent />
      )}
      {/* {reducer.currentAuthUiState === CurrentAuthUiState.SELECT_SIGN_UP_TYPE && <AgreeSignUpComponent />} */}
      {reducer.currentAuthUiState === CurrentAuthUiState.SIGN_UP && (
        <SignUpComponent />
      )}
      {reducer.currentAuthUiState === CurrentAuthUiState.CONFIRM_SIGN_UP && (
        <ConfirmSignUpComponent />
      )}
      {reducer.currentAuthUiState === CurrentAuthUiState.FORGOT_PASSWORD && (
        <ForgotPasswordComponent />
      )}
      {reducer.currentAuthUiState ===
        CurrentAuthUiState.CONFIRM_FORGOT_PASSWORD && (
        <ConfirmForgotPasswordComponent />
      )}
      {reducer.currentAuthUiState === CurrentAuthUiState.CHANGE_PASSWORD && (
        <ChangePasswordComponent />
      )}
      {/* 없을경우 */}
      {!Object.values(CurrentAuthUiState).includes(
        reducer.currentAuthUiState
      ) && <SignInComponent />}
    </ThemeProvider>
  );
};
