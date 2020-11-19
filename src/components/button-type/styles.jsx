import styled from "styled-components";

const Wrapper = styled.div`
  & > div {
    width: 180px;
    height: 50px;
    line-height: 46px;
    margin-left: 20px;
    text-align: center;
    color: #fff;
    font-weight: bold;
    background: #f2c200;
    border: 2px solid #f2c200;
    cursor: pointer;
    &.blue {
      color: #f2c200;
      background: #fff;
    }
    &.gray {
      color: #979797;
      background: #fff;
      border: 2px solid #979797;
    }
  }
`;

export default Wrapper;
