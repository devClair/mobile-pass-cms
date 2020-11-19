import styled from "styled-components";

const Wrapper = styled.div`
  & .ProgressBar {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background: #fff;
    z-index: 400;
    & > div {
      background: #3c5dff;
    }
  }
`;

export default Wrapper;
