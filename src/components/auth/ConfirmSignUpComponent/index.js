import React, { useState, useEffect, useContext } from 'react';
// import { useHistory } from "react-router-dom";

import { Grid } from '@material-ui/core';
import Wrapper from './styles';

//-------------------------------------------
// redux
import { useDispatch, useSelector } from 'react-redux';

//--------------------------------------------------
// redux
import { Auth, AuthType } from '@psyrenpark/auth';
//--------------------------------------------------
//

export const ConfirmSignUpComponent = props => {
  const reducer = useSelector(state => state.reducer);
  const dispatch = useDispatch();

  const [userCode, setUserCode] = useState('');
  const codeChange = e => {
    setUserCode(e.target.value);
  };

  const [btnSw, setBtnSw] = useState(false);

  const confirmSignUpFunction = async () => {
    if (!reducer.myAuth.email || !reducer.myAuth.password || !reducer.myAuth.authType) {
      alert('null');
    }
    Auth.confirmSignUpProcess(
      {
        email: reducer.myAuth.email,
        password: reducer.myAuth.password,
        authType: reducer.myAuth.authType,
        code: userCode,
      },
      data => {
        // 성공처리
        console.log('loginFunctionTest -> data', data);
      },
      error => {
        // 실패처리,
        console.log('loginFunctionTest -> error', error);
        alert(error.message);
      },
      isLoading => {
        // 로딩처리
        dispatch({ type: 'SET_IS_LOADING', payload: isLoading });
      },
    );
  };

  const resendSignUpFunction = async () => {
    if (!reducer.myAuth.email || !reducer.myAuth.password || !reducer.myAuth.authType) {
      alert('null');
    }
    Auth.resendSignUpProcess(
      {
        email: reducer.myAuth.email,
      },
      data => {
        // 성공처리
        console.log('loginFunctionTest -> data', data);
      },
      error => {
        // 실패처리,
        console.log('loginFunctionTest -> error', error);
        alert(error.message);
      },
      isLoading => {
        // 로딩처리
        dispatch({ type: 'SET_IS_LOADING', payload: isLoading });
      },
    );
  };

  useEffect(() => {
    if (userCode.length > 5) {
      setBtnSw(true);
    } else {
      setBtnSw(false);
    }
  }, [userCode]);

  return (
    <Grid className="sign_up sign">
      <Grid className="input_wrap">
        <input type="text" placeholder="이메일 주소" value={reducer.myAuth.email} disabled />
        {/* <h2>올바르지 않은 이메일 주소 형식입니다.</h2> */}
      </Grid>
      <Grid className="input_wrap">
        <input type="code" placeholder="인증코드" value={userCode} onChange={codeChange} />
        {/* <h2>
              비밀번호는 8자리 이상이며, 문자, 숫자와 특수문자를 포함할 수 있습니다.
            </h2> */}
      </Grid>
      <button
        type="button"
        className={btnSw ? 'btn_move on' : 'btn_move'}
        onClick={() => {
          if (btnSw) {
            confirmSignUpFunction();
          }
        }}
      >
        확인
      </button>
      <p className="terms">
        회원가입을 하시거나 로그인을 하시면, 저희의 <span>약관</span>과<br />
        <span>개인정보처리방침</span>에 동의하는 것으로 간주됩니다.
      </p>
      <h3>
        메일을 못 받으셨나요?
        <span onClick={resendSignUpFunction}>&nbsp;메일 재전송</span>
      </h3>
    </Grid>
  );
};
