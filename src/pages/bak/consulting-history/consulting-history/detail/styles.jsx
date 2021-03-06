import styled from "styled-components";

const Wrapper = styled.div`
  & .order_detail {
    & .table {
      padding-top: 40px;
      & ul {
        border-top: 4px solid #000;
        & li {
          border-bottom: 1px solid #c6c6c6;
          & > span {
            display: inline-block;
            height: 52px;
            line-height: 52px;
            font-size: 14px;
            color: #333;
            &.title {
              width: 180px;
              text-align: center;
              font-weight: bold;
              background: #ddd;
            }
            &.text {
              width: calc(100% - 180px);
              padding-left: 40px;
              background: #fff;
              &.download {
                color: #4199ff;
                text-decoration: underline;
                cursor: pointer;
              }
            }
            &.info {
              width: 140px;
              text-align: center;
              background: #6f86af;
              font-weight: bold;
              color: #fff;
              cursor: pointer;
            }
            &.center {
              width: calc(100% - 320px);
            }
          }
        }
      }
    }
    & .btn_wrap {
      padding-top: 40px;
    }
  }
`;

export default Wrapper;
