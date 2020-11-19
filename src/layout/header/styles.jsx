import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  background: #f8faff;
  & .header {
    & .util {
      & span {
        display: inline-block;
        line-height: 100px;
        padding-right: 30px;
        font-size: 20px;
        color: #363636;
      }
      & .btn_logout {
        width: 120px;
        height: 100px;
        font-size: 18px;
        color: #fff;
        background: #222222;
        font-weight: 300;
      }
    }
  }
`;

export default Wrapper;
