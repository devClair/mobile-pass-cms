import styled from "styled-components";

const Wrapper = styled.div`
  & .customer_detail {
    & .table {
      padding-top: 40px;
      & ul {
        border-top: 4px solid #000;
        & li {
          border-bottom: 1px solid #c6c6c6;
          float: left;
          width: 50%;
          &.xs12 {
            width: 100%;
          }
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
          & > input {
            display: inline-block;
            height: 52px;
            line-height: 52px;
            font-size: 14px;
            color: #333;

            &.text {
              width: calc(100% - 180px);
              padding-left: 40px;
              background: #fff;
              border: ${(props) =>
                props.isEditable ? "2px solid gray" : "none"};
              border-radius: ${(props) => (props.isEditable ? "5px" : "0px")};
              &:focus {
                border: ${(props) =>
                  props.isEditable ? "2px solid #1976d2" : "none"};
              }
            }
          }
        }
      }
    }
    & .btn_wrap {
      padding-top: 40px;
      /* & > div {
        width: 180px;
        height: 50px;
        line-height: 46px;
        text-align: center;
        color: #fff;
        font-weight: bold;
        background: #459bfe;
        border: 2px solid #459bfe;
        cursor: pointer;
        &.btn_list {
          margin-right: 20px;
        }
        &.btn_delete {
          color: #979797;
          background: #fff;
          border: 2px solid #979797;
        }
      } */
    }
  }
`;

export default Wrapper;
