import styled from "styled-components";

const Wrapper = styled.div`
  & .question_detail {
    & .table {
      border-top: 4px solid #000;
      & .tr {
        & > div {
          border-bottom: 1px solid #ccc;
          & > div {
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            font-weight: bold;
            color: #363636;
            &.td_1 {
              text-align: center;
              background: #dfdfdf;
              &.info {
                height: 200px;
                line-height: 200px;
              }
            }
            &.td_2 {
              padding-left: 40px;
              background: #fff;
              font-weight: normal;
              &.info {
                height: 200px;
                line-height: 1.6;
                padding: 20px;
                & textarea {
                  width: 100%;
                  height: 100%;
                  font-size: 14px;
                  color: #333;
                  border: none;
                  resize: none;
                  &::placeholder {
                    color: #ddd;
                  }
                }
              }
            }
          }
        }
      }
      &.awnser {
        margin-top: 20px;
        border-top: 1px solid #ccc;
        & tr {
          & > div {
            & .td_2 {
              padding: 20px;
            }
          }
        }
      }
    }
    & .btn_wrap {
      padding-top: 32px;
    }
  }
`;

export default Wrapper;
