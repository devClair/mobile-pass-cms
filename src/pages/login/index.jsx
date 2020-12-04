import React, { useContext } from "react";

import { Grid, Checkbox } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { AuthComponent } from "../../components/auth";

const LoginComponent = () => {
  const history = useHistory();

  return (
    <>
      <AuthComponent />
    </>
  );
};

const Login = () => {
  return (
    <>
      <LoginComponent />
    </>
  );
};

export default Login;

{
  /* <Wrapper>
<Grid className="login_wrap">
  <h1 className="logo">
    <img src="/images/car_logo.png" alt="" />
  </h1>
  <Grid className="input_wrap id">
    <input type="text" placeholder="ID" />
  </Grid>
  <Grid className="input_wrap password">
    <input type="text" placeholder="PASSWORD" />
  </Grid>
  <Grid className="util">
    <span className="icon">
      <Checkbox />
    </span>
    <span className="text">아이디 저장</span>
  </Grid>
  <Grid
    container
    className="btn_login"
    onClick={() => {
      history.push("/customer");
    }}
  >
    <button type="button">로그인</button>
  </Grid>
</Grid>
</Wrapper> */
}
