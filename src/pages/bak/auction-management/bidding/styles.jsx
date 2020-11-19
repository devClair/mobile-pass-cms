import styled from "styled-components";

const Wrapper = styled.div`
  & .bidding {
    & .table_wrap {
      & .tabs {
        & .tab {
          width: 140px;
          height: 44px;
          line-height: 44px;
          text-align: center;
          color: #b7b7b7;
          background: #fff;
          box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.07);
          border-radius: 16px 16px 0 0;
          cursor: pointer;
          &.on {
            background: #459bfe;
            color: #fff;
          }
        }
      }
    }
  }
`;

export default Wrapper;
