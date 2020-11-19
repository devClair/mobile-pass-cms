import React, { useState, useEffect, useContext } from "react";
// import { useHistory } from "react-router-dom";

import { Grid } from "@material-ui/core";
import Wrapper from "./styles";

//-------------------------------------------
// redux
import { useDispatch, useSelector } from "react-redux";

//--------------------------------------------------
// redux
import { Auth, AuthType, CurrentAuthUiState } from "@psyrenpark/auth";
//--------------------------------------------------
//

export const SignUpComponent = (props) => {
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const userIdChange = (e) => {
    setUserId(e.target.value);
  };
  const [userEmail, setUserEmail] = useState("");
  const userEmailChange = (e) => {
    setUserEmail(e.target.value);
  };
  const [userPassword, setUserPassword] = useState("");
  const userPasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const [btnSw, setBtnSw] = useState(false);

  const signUpFunction = async () => {
    Auth.signUpProcess(
      {
        email: userEmail,
        password: userPassword,
        authType: AuthType.EMAIL,
        cognitoRegComm: {
          user_name: "이름",
          user_type: "D", // S , D,  N
          user_division: "고려대",
          user_department: "수의학과",
          mobile_no: "01000001112",
          user_verify_img_no: "2",
        },
        lang: "en",
      },
      (data) => {
        // 성공처리
        console.log("loginFunctionTest -> data", data);

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

        // // 유저 정보 가져오기
        //   history.push("/movie");
      },
      (error) => {
        // 실패처리,
        console.log("loginFunctionTest -> error", error);
        alert(error.message);
      },
      (isLoading) => {
        // 로딩처리
        dispatch({ type: "SET_IS_LOADING", payload: isLoading });
      }
    );
  };

  useEffect(() => {
    if (userId.length > 0 && userEmail.length > 0 && userPassword.length > 7) {
      setBtnSw(true);
    } else {
      setBtnSw(false);
    }
  }, [userId, userEmail, userPassword]);

  return (
    <Grid className="sign_up sign">
      <Grid className="input_wrap">
        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={userIdChange}
        />
        {/* <h2>이미 사용 중인 아이디입니다.</h2> */}
      </Grid>
      <Grid className="input_wrap">
        <input
          type="text"
          placeholder="이메일 주소"
          value={userEmail}
          onChange={userEmailChange}
        />
        {/* <h2>올바르지 않은 이메일 주소 형식입니다.</h2> */}
      </Grid>
      <Grid className="input_wrap">
        <input
          type="password"
          placeholder="비밀번호(8자리 이상의 숫자, 알파벳, 특수문자)"
          value={userPassword}
          onChange={userPasswordChange}
        />
        {/* <h2>
              비밀번호는 8자리 이상이며, 문자, 숫자와 특수문자를 포함할 수 있습니다.
            </h2> */}
      </Grid>
      <button
        type="button"
        className={btnSw ? "btn_move on" : "btn_move"}
        onClick={() => {
          if (btnSw) {
            signUpFunction();
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
        이미 회원이신가요?
        <span
          onClick={() => {
            // setLoginState("signIn");
          }}
        >
          &nbsp;로그인하기
        </span>
      </h3>
    </Grid>
  );
};
