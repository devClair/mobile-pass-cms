import styled from "styled-components";

export const StyledPicker = styled.div`
  & > div {
    background-color: "red";
    position: relative;
    /* 달력 아이콘 */
    &::before {
      content: "";
      position: absolute;
      right: 8px;
      top: 10px;
      z-index: 1000;
      width: 14px;
      height: 14px;
      background: url("/images/calendar_icon.png") no-repeat;
      cursor: pointer;
    }
    /* 타이틀 */
    & > label {
      display: none;
    }
    & > div {
      margin: 0;
      & input {
        width: 80px;
        height: 32px;
        line-height: 32px;
        padding: 0 8px;
        font-size: 14px;
        color: #666;
        border: 1px solid #d9d9d9;
      }
      &::before,
      &::after {
        display: none;
      }
    }
  }
`;
