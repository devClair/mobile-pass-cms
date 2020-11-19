import styled from "styled-components";

const Wrapper = styled.div`
  & .price {
    & .table_wrap {
      & .table {
        border-top: 4px solid #000;
        & .tr {
          border-bottom: 1px solid #ccc;
          & > div {
            height: 52px;
            line-height: 52px;
            font-size: 14px;
            color: #333;
            &.td_1 {
              width: 180px;
              font-weight: 500;
              text-align: center;
              background: #ddd;
            }
            &.td_2 {
              width: calc(100% - 180px);
              padding-left: 40px;
              background: #fff;
              & input {
                width: 100px;
                height: 32px;
                padding: 0 8px;
                margin-right: 8px;
                text-align: right;
                border-radius: 4px;
                border: 1px solid #ccc;
              }
            }
          }
        }
      }
      & > p {
        padding-top: 8px;
        color: #a4a4a4;
        font-size: 12px;
      }
      & .btn_wrap {
        padding-top: 24px;
      }
    }
  }
`;

export default Wrapper;
