import React, { useState, useEffect, useContext } from 'react';
// import { useHistory } from "react-router-dom";
import { Grid } from '@material-ui/core';
import Wrapper from './styles';

//-------------------------------------------
// redux
import { useDispatch, useSelector } from 'react-redux';

//--------------------------------------------------
// redux
import { Auth, CurrentAuthUiState } from '@psyrenpark/auth';

//--------------------------------------------------
//

export const ConfirmForgotPasswordComponent = props => {
  const reducer = useSelector(state => state.reducer);
  const dispatch = useDispatch();

  const [userCode, setUserCode] = useState('');
  const userCodeChange = e => {
    setUserCode(e.target.value);
  };

  const [userPassword, setUserPassword] = useState('');
  const userPasswordChange = e => {
    setUserPassword(e.target.value);
  };

  const [btnSw, setBtnSw] = useState(false);

  const confirmForgotPasswordFunction = async () => {
    if (!reducer.myAuth.email) {
      alert('null');
    }
    Auth.confirmForgotPasswordProcess(
      {
        email: reducer.myAuth.email,
        code: userCode,
        newPassword: userPassword,
      },
      data => {
        // 성공처리
        console.log('resendSignUpFunction -> data', data);

        dispatch({
          type: 'SET_MY_AUTH',
          payload: {
            authType: null,
            email: null,
            password: null,
          },
        });

        dispatch({
          type: 'SET_CURRENT_AUTH_UI_STATE',
          payload: CurrentAuthUiState.SIGN_IN,
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

  const resendForgotPasswordFunction = async () => {
    if (!reducer.myAuth.email) {
      alert('null');
    }
    Auth.resendForgotPasswordProcess(
      {
        email: reducer.myAuth.email,
      },
      data => {
        // 성공처리
        console.log('resendSignUpFunction -> data', data);

        alert('메일이 전송되었습니다.');
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
    if (userCode.length > 5 && userPassword.length > 7) {
      setBtnSw(true);
    } else {
      setBtnSw(false);
    }
  }, [userCode, userPassword]);

  return (
    <Grid className="forgot">
      <h2>{`회원님의 이메일[${reducer.myAuth.email}]로 전송된 인증코드를 입력하세요.`}</h2>
      <p className="text">비밀번호 재설정 인증번호를 보내드리겠습니다.</p>
      <Grid className="input_wrap">
        <input type="text" placeholder="6자리 숫자" value={userCode} onChange={userCodeChange} />
        {/* <p className="warning">
                코드가 유효하지 않습니다. 코드를 다시 요청하세요.
              </p> */}
      </Grid>
      <Grid className="input_wrap">
        <input type="text" placeholder="변경할 패스워드" value={userPassword} onChange={userPasswordChange} />
        {/* <p className="warning">
                코드가 유효하지 않습니다. 코드를 다시 요청하세요.
              </p> */}
      </Grid>
      <Grid className="btn_send">
        <button
          type="button"
          onClick={() => {
            resendForgotPasswordFunction();
          }}
        >
          인증번호 재전송
        </button>
      </Grid>
      <button
        type="button"
        className={btnSw ? 'btn_move on' : 'btn_move'}
        onClick={() => {
          if (btnSw) {
            confirmForgotPasswordFunction();
          }
        }}
      >
        다음
      </button>
    </Grid>
  );
};
