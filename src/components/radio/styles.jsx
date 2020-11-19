import styled from "styled-components";

const Wrapper = styled.div`
  & .radio_wrap {
    margin-right: 40px;
    & .radio_icon {
      & img {
        padding: 16px 8px 0 0;
        cursor: pointer;
      }
    }
  }
`;

export default Wrapper;
