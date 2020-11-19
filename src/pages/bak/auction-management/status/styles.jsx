import styled from "styled-components";

const Wrapper = styled.div`
  & .status {
    & .table_wrap {
      &:last-child {
        padding-top: 60px;
      }
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
            }
          }
        }
      }
    }
  }
`;

export default Wrapper;
