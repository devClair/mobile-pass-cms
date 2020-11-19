import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Grid } from "@material-ui/core";
import Wrapper from "./styles";

import { apiObject } from "../../../api";

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

export const SignInComponent = (props) => {
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const userEmailChange = (e) => {
    setUserEmail(e.target.value);
  };
  const [userPassword, setUserPassword] = useState("");
  const userPasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const [btnSw, setBtnSw] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const loadingFunction = (isLoading) => {
    // 로딩처리
    dispatch({ type: "SET_IS_LOADING", payload: isLoading });
  };

  const signInFuntion = async () => {
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

        alert("로그인 성공");
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
        alert(error.message);
      },
      loadingFunction
    );
  };

  const changeSignUpUiFunction = () => {
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
      payload: CurrentAuthUiState.SIGN_UP,
    });
  };

  useEffect(() => {
    // 정규식 필요

    if (userEmail.length > 0 && userPassword.length > 0) {
      setBtnSw(true);
    } else {
      setBtnSw(false);
    }
  }, [userEmail, userPassword]);

  return (
    <Grid className="sign_in sign">
      <Grid className="input_wrap">
        <input
          type="text"
          placeholder="이메일 주소"
          value={userEmail}
          onChange={userEmailChange}
        />
      </Grid>
      <Grid className="input_wrap">
        <input
          type="password"
          placeholder="비밀번호"
          value={userPassword}
          onChange={userPasswordChange}
          onKeyUp={() => {
            if (window.event.keyCode === 13) {
              signInFuntion();
            }
          }}
        />
      </Grid>
      {errorMsg && <p className="warning">로그인 정보가 올바르지 않습니다.</p>}
      <p
        className="forgot"
        onClick={() => {
          dispatch({
            type: "SET_CURRENT_AUTH_UI_STATE",
            payload: CurrentAuthUiState.FORGOT_PASSWORD,
            // payload: CurrentAuthUiState.CHANGE_PASSWORD,
          });
        }}
      >
        비밀번호를 잊으셨나요?
      </p>
      <button
        type="button"
        className={btnSw ? "btn_move on" : "btn_move"}
        onClick={() => {
          if (btnSw) {
            signInFuntion();
          }
        }}
      >
        다음
      </button>
      <p className="terms">
        회원가입을 하시거나 로그인을 하시면, 저희의 <span>약관</span>과<br />
        <span>개인정보처리방침</span>에 동의하는 것으로 간주됩니다.
      </p>
      <h3>
        처음이신가요?
        <span onClick={changeSignUpUiFunction}>&nbsp;회원가입하기</span>
      </h3>
    </Grid>
  );
};
