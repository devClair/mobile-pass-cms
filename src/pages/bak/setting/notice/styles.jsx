import styled from "styled-components";

const Wrapper = styled.div`
  & .notice {
    & .table_wrap {
      & .btn_wrap {
        padding-bottom: 16px;
        & .btn_post {
          & button {
            width: 180px;
            height: 50px;
            color: #fff;
            font-weight: bold;
            background: #6f86af;
          }
        }
      }
    }
  }
`;

export default Wrapper;
