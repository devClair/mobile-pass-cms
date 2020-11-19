import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: url("/images/car_bg.jpg") no-repeat center center;
  background-size: cover;
  & .login_wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 520px;
    width: 100%;
    padding: 80px 60px 40px;
    border: solid 1px #707070;
    background: #fff;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    & .logo {
      padding-bottom: 80px;
      text-align: center;
    }
    & .input_wrap {
      position: relative;
      margin-bottom: 20px;
      & input {
        width: 100%;
        height: 56px;
        padding: 0 30px 0 80px;
        font-size: 16px;
        border: 1px solid #9b9b9b;
        border-radius: 56px;
        &::placeholder {
          color: #ccc;
        }
      }
      &::before {
        content: "";
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        background: url("/images/id_icon.png") no-repeat;
      }
      &.password {
        margin-bottom: 0;
        &::before {
          background: url("/images/password_icon.png") no-repeat;
        }
      }
    }
    & .util {
      padding: 24px 0;
      & > span {
        vertical-align: middle;
        &.icon {
          & > span {
            padding: 0;
            color: #459bfe;
          }
        }
        &.text {
          margin-left: 8px;
          font-size: 14px;
          color: #484848;
        }
      }
    }
    & .btn_login {
      & button {
        width: 100%;
        height: 72px;
        color: #fff;
        font-size: 24px;
        font-weight: 500;
        border-radius: 72px;
        background: #459bfe;
      }
    }
  }
`;

export default Wrapper;
