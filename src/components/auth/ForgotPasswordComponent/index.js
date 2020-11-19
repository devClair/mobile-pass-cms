import React, { useState, useEffect, useContext } from 'react';
// import { useHistory } from "react-router-dom";
import { Grid } from '@material-ui/core';
import Wrapper from './styles';

//-------------------------------------------
// redux
import { useDispatch, useSelector } from 'react-redux';

//--------------------------------------------------
// redux
import { Auth, CurrentAuthUiState, AuthType } from '@psyrenpark/auth';

//--------------------------------------------------
//

export const ForgotPasswordComponent = props => {
  const reducer = useSelector(state => state.reducer);
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState('');
  const userEmailChange = e => {
    setUserEmail(e.target.value);
  };

  const [btnSw, setBtnSw] = useState(false);

  const forgotPasswordFunction = async () => {
    if (!userEmail) {
      alert('null');
    }
    Auth.forgotPasswordProcess(
      {
        email: userEmail,
        authType: AuthType.EMAIL,
      },
      data => {
        // 성공처리
        console.log('resendSignUpFunction -> data', data);

        dispatch({
          type: 'SET_MY_AUTH',
          payload: {
            // authType: AuthType.EMAIL,
            email: userEmail,
            // password: userPassword,
          },
        });

        dispatch({
          type: 'SET_CURRENT_AUTH_UI_STATE',
          payload: CurrentAuthUiState.CONFIRM_FORGOT_PASSWORD,
        });
      },
      error => {
        // 실패처리,
        console.log('resendSignUpFunction -> error', error);
        alert(error.message);
      },
      isLoading => {
        // 로딩처리
        dispatch({ type: 'SET_IS_LOADING', payload: isLoading });
      },
    );
  };

  useEffect(() => {
    if (userEmail.length > 0) {
      setBtnSw(true);
    } else {
      setBtnSw(false);
    }
  }, [userEmail]);
  return (
    <>
      <Grid className="forgot">
        <h2>비밀번호를 잊으셨나요?</h2>
        <h3>비밀번호 재설정 인증번호를 보내드리겠습니다.</h3>
        <Grid className="input_wrap">
          <input type="text" placeholder="이메일 주소" value={userEmail} onChange={userEmailChange} />
          {/* <p className="warning">올바르지 않은 이메일 주소 형식입니다.</p> */}
        </Grid>
        <button
          className={btnSw ? 'btn_move on' : 'btn_move'}
          onClick={() => {
            if (btnSw) {
              // setForgotState("result_num");
              forgotPasswordFunction();
            }
          }}
        >
          다음
        </button>
      </Grid>
    </>
  );
};
