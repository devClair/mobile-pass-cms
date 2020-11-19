import styled from "styled-components";

const Wrapper = styled.div`
  & .statistics {
    & .table_wrap {
      & .table {
        padding-top: 18px;
        & > div {
          padding-right: 20px;
          text-align: center;
          &:last-child {
            padding-right: 0;
          }
          & h2 {
            height: 54px;
            line-height: 50px;
            border-bottom: 4px solid #000;
            border-radius: 12px 12px 0 0;
            background: #fff;
          }
          & ul {
            & li {
              border-bottom: 1px solid #ddd;
              & span {
                display: inline-block;
                height: 72px;
                line-height: 72px;
                font-size: 14px;
                color: #333;
                &.title {
                  width: 66%;
                  font-weight: bold;
                  background: #dddddd;
                }
                &.text {
                  width: 34%;
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default Wrapper;
