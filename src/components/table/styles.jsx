import styled from "styled-components";

const Wrapper = styled.div`
  & .table {
    /* 체크박스 */
    & th {
      & .MuiIconButton-colorSecondary {
        display: none;
        color: #aaa;
        &:hover {
          background: none;
        }
      }
    }
    & .MuiIconButton-colorSecondary {
      color: #d9d9d9;
      &:hover {
        background: none;
      }
    }
    & .MuiCheckbox-colorSecondary.Mui-checked {
      color: #eb9d1f !important;
      &:hover {
        background: none;
      }
    }
    /* 체크박스 */
    & > div {
      box-shadow: none;
      /* 테이블 전체 */
      & > div:nth-child(2) {
      }
      & > div:first-child {
        display: none;
        /* 테이블 행 선택 이벤트 */
        & div > {
          & h6 {
            display: none;
          }
        }
        /* 툴바 */
        & > div:first-child {
          & h6 {
            padding-left: 15px;
            font-size: 20px;
            font-weight: bold;
            color: #707070;
            font-family: "Noto Sans KR", sans-serif;
          }
        }
      }
      /* 테이블 바디 */
      & > div:nth-child(2) {
        border: 1px solid #e1e1e1;
        & tr {
          border-top: 1px solid #e1e1e1;
          &:first-child {
            border-top: none;
          }
          & th {
            height: 50px;
            padding: 0;
            font-family: "Noto Sans KR", sans-serif;
            font-size: 14px;
            font-weight: bold;
            color: #333333;
            text-align: center;
            background: #dddddd;
            &:last-child {
            }
            & > span {
              position: relative;
              & > .MuiTableSortLabel-icon {
                display: block;
                position: absolute;
                right: -19px;
                top: 9px;
                width: 9px;
                height: 6px;
                text-indent: -99999px;
                background: url("/images/sort_arrow_icon.png") no-repeat;
                background-size: 9px;
              }
              &.MuiCheckbox-root {
                width: 24px;
                height: 24px;
              }
            }
          }
          & td {
            height: 50px;
            padding: 0;
            font-family: "Noto Sans KR", sans-serif;
            font-size: 14px !important;
            color: #707070;
            text-align: center;
            border-color: #ddd;
          }
        }
      }
      & > table {
        display: none;
      }
    }
  }
`;

export default Wrapper;
