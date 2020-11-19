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

export const ChangePasswordComponent = props => {
  const reducer = useSelector(state => state.reducer);
  const dispatch = useDispatch();

  const [userOldPassword, setUserOldPassword] = useState('');
  const userOldPasswordChange = e => {
    setUserOldPassword(e.target.value);
  };

  const [userNewPassword, setUserNewPassword] = useState('');
  const userNewPasswordChange = e => {
    setUserNewPassword(e.target.value);
  };
  const [userConfirmNewPassword, setUserConfirmNewPassword] = useState('');
  const userConfirmNewPasswordChange = e => {
    setUserConfirmNewPassword(e.target.value);
  };

  const [btnSw, setBtnSw] = useState(false);

  const changePasswordFunction = async () => {
    Auth.changePasswordProcess(
      {
        email: reducer.myAuth.userEmail,
        authType: AuthType.EMAIL,
        oldPassword: userOldPassword,
        newPassword: userNewPassword,
      },
      data => {
        // 성공처리
        console.log('changePasswordFunction -> data', data);
      },
      error => {
        // 실패처리,
        console.log('changePasswordFunction -> error', error);
        alert(error.message);
      },
      isLoading => {
        // 로딩처리
        dispatch({ type: 'SET_IS_LOADING', payload: isLoading });
      },
    );
  };

  useEffect(() => {
    if (userOldPassword.length > 7 && userNewPassword.length > 7) {
      setBtnSw(true);
    } else {
      setBtnSw(false);
    }
  }, [userOldPassword, userNewPassword]);
  return (
    <Grid className="forgot">
      <h2>기존 비빌번호를 입력하세요</h2>
      <Grid className="input_wrap input_password">
        <input type="password" placeholder="기존 비밀번호" value={userOldPassword} onChange={userOldPasswordChange} />
      </Grid>
      <h2>새로운 비밀번호를 설정하세요.</h2>
      <Grid className="input_wrap input_password">
        <input
          type="password"
          placeholder="새 비밀번호(8자리 이상의 숫자, 알파벳, 특수문자)"
          value={userNewPassword}
          onChange={userNewPasswordChange}
        />
      </Grid>
      {/* <Grid className="input_wrap input_password">
        <input
          type="password"
          placeholder="새 비밀번호 확인"
          value={userConfirmPassword}
          onChange={userConfirmPasswordChange}
        />
        <p className="warning">
                새 비밀번호와 비밀번호 확인이 일치하지 않습니다.
              </p>
      </Grid> */}
      <button
        type="button"
        className={btnSw ? 'btn_move on' : 'btn_move'}
        onClick={() => {
          if (btnSw) {
            // setLoginState("signIn");
            changePasswordFunction();
          }
        }}
      >
        다음
      </button>
    </Grid>
  );
};
