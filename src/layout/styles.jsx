import styled from "styled-components";

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  /* min-width: 960px; */

  & .sidebar {
    float: left;
  }
  & .contents {
    float: left;
    width: calc(100% - 350px);
    min-height: 900px;
    border-left: 1px solid rgba(0, 0, 0, 0.16);
    /* & .pages {
      padding: 40px;
    } */
  }
  @media (max-width: 960px) {
    & .contents {
      width: calc(100%);
    }
  }
`;

export default Wrapper;
