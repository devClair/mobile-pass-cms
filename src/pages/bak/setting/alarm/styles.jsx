import styled from "styled-components";

const Wrapper = styled.div`
  & .alarm {
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
                width: 200px;
                height: 32px;
                padding: 0 8px;
                border-radius: 4px;
                border: 1px solid #ccc;
              }
              & button {
                width: 60px;
                height: 24px;
                margin-left: 8px;
                color: #fff;
                font-size: 10px;
                background: #918f8f;
                &:last-child {
                  background: #e64f4f;
                }
              }
            }
          }
        }
      }

      & .btn_wrap {
        padding-top: 24px;
      }
    }
  }
`;

export default Wrapper;
