import styled from "styled-components";

const Wrapper = styled.div`
  & .breadcrumb {
    color: #333;
    & .title {
      font-size: 24px;
      font-weight: bold;
    }
    & .text {
      padding: 8px 0 0 24px;
      font-size: 16px;
      color: #f44336;
    }
  }
`;

export default Wrapper;
