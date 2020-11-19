import styled from "styled-components";

const Wrapper = styled.div`
  & .sidebar {
    width: 350px;
    height: 100%;
    background: #fff;
    & .logo {
      width: 100%;
      height: 100px;
      background: #222222;
      cursor: pointer;
      & > div {
        & > div {
          display: inline-block;
          &.text_box {
            padding: 6px 0 0 20px;
            color: #fff;
          }
        }
      }
    }
    & .gnb {
      & ul {
        & > li {
          & a {
            position: relative;
            display: block;
            width: 100%;
            height: 80px;
            line-height: 80px;
            padding: 0 30px 0 40px;
            font-size: 20px;
            color: #363636;
            cursor: pointer;
            &::before {
              content: "";
              position: absolute;
              right: 30px;
              top: 34px;
              width: 18px;
              height: 12px;
              background: url("/images/sidebar_arrow.png");
              transform: rotate(-90deg);
              transition: all 0.4s;
            }
            border-bottom: 1px solid rgba(0, 0, 0, 0.16);
          }
          &.on {
            & a {
              color: #efcf00;
            }
          }
          & .depth2 {
            overflow: hidden;
            max-height: 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.16);
            transition: max-height 0.4s ease;
            & li {
              & a {
                display: block;
                height: 60px;
                line-height: 60px;
                padding-left: 40px;
                font-size: 20px;
                color: #222222;
                background: #fff;
              }
              &.on {
                & a {
                  color: #459bfe;
                }
              }
            }
          }
          &.on {
            & span {
              &::before {
                transform: rotate(0deg);
              }
            }
            & .depth2 {
              max-height: 500px;
            }
          }
        }
      }
    }
  }
  @media (max-width: 960px) {
    & .sidebar {
      display: none;
    }
  }
`;

export default Wrapper;
