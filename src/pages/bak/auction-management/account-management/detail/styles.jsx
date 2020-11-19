import styled from "styled-components";

const Wrapper = styled.div`
  & .customer_detail {
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
