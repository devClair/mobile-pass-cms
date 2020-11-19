import React, { useState, useEffect, useContext } from "react";
// import { useHistory } from "react-router-dom";

import { Grid, Checkbox } from "@material-ui/core";
import MaterialUIInput from "@material-ui/core/Input";
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

//--------------------------------------------------
// hook
import { useForm, useWatch, Controller } from "react-hook-form";

//--------------------------------------------------

export const SignInComponent = (props) => {
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  // const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    errors,
    formState,
    control,
    trigger,
  } = useForm();

  const { toggle } = watch();

  const loadingFunction = (isLoading) => {
    // 로딩처리
    dispatch({ type: "SET_IS_LOADING", payload: isLoading });
  };

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
        alert(error.message);
      },
      loadingFunction
    );
  };

  const changeSignUpUiFunction = () => {
    dispatch({
      type: "SET_CURRENT_AUTH_UI_STATE",
      payload: CurrentAuthUiState.SIGN_UP,
    });
  };

  return (
    <Grid className="sign_in sign">
      <Grid className="input_wrap">
        <input
          name="userEmail"
          ref={register({
            required: true,
            pattern: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
          })}
          type="text"
          placeholder="이메일 주소"
        />
      </Grid>
      {/* {watch("userEmail", false) === true && (
        <p className="warning">email 정보가 올바르지 않습니다.</p>
      )} */}

      {errors?.userEmail && (
        <p className="warning">email 정보가 올바르지 않습니다.</p>
      )}
      <Grid className="input_wrap">
        <input
          name="userPassword"
          ref={register({
            required: true,
            pattern: /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/,
          })}
          type="password"
          placeholder="비밀번호"
          onKeyUp={() => {
            if (window.event.keyCode === 13) {
              handleSubmit(signInFuntion);
            }
          }}
        />
      </Grid>
      {errors.userPassword && (
        <p className="warning">password 정보가 올바르지 않습니다.</p>
      )}

      {/* <Grid
              className="check_box"
              onClick={() => {
                setCheckSw(!checkSw);
              }}
            >
              {checkSw ? (
                <img src="/images/icon/check_on_icon.png" alt="" />
              ) : (
                <img src="/images/icon/check_off_icon.png" alt="" />
              )}
            </Grid> */}

      {/* <Controller
        as={
          <Checkbox
            color="secondary"
            size="small"
            inputProps={{ "aria-label": "checkbox with default color" }}
          />
        }
        name="firstName"
        rules={{ required: true }}
        control={control}
        defaultValue=""
      />

      <input
        styles={{}}
        type="checkbox"
        name="toggle"
        ref={register({
          required: true,
        })}
      />

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Checkbox
            color="secondary"
            size="small"
            inputProps={{ "aria-label": "checkbox with default color" }}
            // checked={value ? true : false}
            // onChange={(value) => {
            //   console.log(value.target);
            //   onChange(value ? true : false);
            // }}
          />
        )}
        name="firstName"
        rules={{ required: true }}
        defaultValue=""
      /> */}

      <p
        className="forgot"
        onClick={() => {
          dispatch({
            type: "SET_CURRENT_AUTH_UI_STATE",
            payload: CurrentAuthUiState.FORGOT_PASSWORD,
          });
        }}
      >
        비밀번호를 잊으셨나요?
      </p>

      {/* {toggle && (
        <button
          type="button"
          className={
            watch("userEmail", false) && watch("userPassword", false)
              ? "btn_move on"
              : "btn_move"
          }
          // className={"btn_move"}
          onClick={handleSubmit(signInFuntion)}
        >
          다음
        </button>
      )} */}

      <button
        type="button"
        className={
          watch("userEmail", false) && watch("userPassword", false)
            ? "btn_move on"
            : "btn_move"
        }
        // className={"btn_move"}
        onClick={handleSubmit(signInFuntion)}
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
