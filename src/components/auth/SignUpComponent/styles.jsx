import styled from "styled-components";

const Wrapper = styled.div`
  min-width: 1200px;
  /* login */
  & .login_wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    & .modal {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
    }
    & .login {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      max-width: 600px;
      width: 100%;
      text-align: center;
      & .login_inner {
        padding: 56px 100px;
        border-radius: 16px;
        box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.4);
        background: #1a1a1a;
        & .logo {
          width: 280px;
          margin: 0 auto;
          & img {
            width: 100%;
          }
        }
        & .sign {
          padding-top: 60px;
          & .input_wrap {
            padding-bottom: 10px;
            & input {
              width: 100%;
              height: 60px;
              line-height: 60px;
              padding: 0 20px;
              font-size: 16px;
              color: rgba(255, 255, 255, 0.5);
              background: #484848;
              border: 2px solid #484848;
              border-radius: 12px;
              &::placeholder {
                color: rgba(255, 255, 255, 0.5);
              }
            }
            & h2 {
              line-height: 24px;
              padding-top: 10px;
              text-align: left;
              font-weight: 500;
              color: #f00000;
            }
            &.on {
              border-color: #f00000;
            }
          }
          & .btn_move {
            width: 100%;
            height: 60px;
            line-height: 58px;
            margin-top: 32px;
            font-size: 20px;
            color: #fff;
            background: none;
            border: 2px solid #8d8d8d;
            border-radius: 12px;
            transition: all 0.4s;
            &.on {
              color: #fff;
              background: #2c5dff;
              border-color: #2c5dff;
            }
          }
          & h3 {
            padding-top: 20px;
            font-size: 20px;
            color: #fff;
            font-weight: 300;
            & span {
              font-weight: 500;
              cursor: pointer;
            }
          }
        }
        & .forgot {
          width: 100%;
          text-align: left;
          color: #fff;
          & h2 {
            line-height: 48px;
            font-size: 32px;
          }
          & h3 {
            padding-top: 40px;
            font-size: 18px;
          }
          & .input_wrap {
            padding-top: 40px;
            & input {
              width: 100%;
              height: 60px;
              line-height: 60px;
              padding: 0 32px;
              font-size: 16px;
              color: rgba(255, 255, 255, 0.5);
              border: 2px solid #484848;
              border-radius: 12px;
              background: #484848;
              &::placeholder {
                color: rgba(255, 255, 255, 0.5);
              }
            }
            & p {
              padding-top: 10px;
            }
            &.input_password {
              padding: 20px 0 0 0;
              &:last-child {
                padding: 10px 0 0 0;
              }
            }
          }
          & .btn_send {
            margin-top: 30px;
            text-align: center;
            & button {
              display: inline-block;
              font-size: 14px;
              font-weight: bold;
              color: #fff;
              background: none;
            }
          }
          & .btn_move {
            width: 100%;
            height: 60px;
            margin-top: 30px;
            font-size: 16px;
            color: #fff;
            border: 2px solid #8d8d8d;
            border-radius: 12px;
            background: none;
            transition: all 0.4s;
            &.on {
              color: #fff;
              background: #2c5dff;
              border: 2px solid #2c5dff;
            }
          }
        }
      }
    }
    & p {
      &.text {
        padding-top: 20px;
        font-size: 14px;
      }
      &.warning {
        font-size: 16px;
        font-weight: 500;
        text-align: left;
        color: #f00000;
      }
      &.forgot {
        padding-top: 32px;
        text-align: center !important;
        font-size: 20px;
        color: #fff;
        cursor: pointer;
      }
      &.terms {
        line-height: 24px;
        padding-top: 40px;
        font-weight: bold;
        color: #949494;
        & span {
          color: #2c5dff;
          cursor: pointer;
        }
      }
    }
  }
  /* main */
  & .header {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    padding: 0 60px;
    height: 100px;
    & span {
      cursor: pointer;
    }
    & .btn_login {
      width: 87px;
      height: 40px;
      line-height: 42px;
      text-align: center;
      font-size: 18px;
      color: #fff;
      border-radius: 4px;
      background: #2c5dff;
      cursor: pointer;
    }
  }
  & .main {
    width: 100%;
    height: 850px;
    background: url("/images/main/main_bg.png") no-repeat center top;
    background-size: cover;
    & .text {
      text-align: center;
      color: #fff;
      & h2 {
        line-height: 96px;
        font-size: 72px;
        font-weight: bold;
      }
      & .btn_now {
        margin-top: 80px;
        width: 888px;
        height: 80px;
        line-height: 80px;
        background: #2c5dff;
        font-size: 32px;
        color: #fff;
      }
    }
  }
  & .section {
    width: 100%;
    background: #1a1a1a;
    border-bottom: 8px solid #222;
    & .section_inner {
      max-width: 1200px;
      width: 100%;
      height: 540px;
      margin: auto;
      & > div {
        height: 100%;
        & .text_box {
          color: #fff;
          & h2 {
            line-height: 80px;
            font-size: 50px;
            font-weight: 500;
          }
          & h3 {
            padding-top: 20px;
            font-size: 28px;
          }
        }
      }
    }
  }
  & .footer {
    width: 100%;
    background: #1a1a1a;
    & .footer_inner {
      max-width: 1200px;
      width: 100%;
      height: 560px;
      margin: 0 auto;
      & ul {
        padding-top: 120px;
        & li {
          padding-bottom: 20px;
          color: #828282;
          &:last-child {
            padding-bottom: 0;
          }
        }
      }
      & p {
        line-height: 22px;
        padding-top: 160px;
        color: #828282;
        font-size: 14px;
      }
    }
  }
`;

export default Wrapper;
