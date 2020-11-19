import styled from "styled-components";

const Wrapper = styled.div`
  & .order_info {
    & .table_wrap {
      & .table {
        & .refund_state {
          & em {
            display: inline-block;
            width: 64px;
            height: 26px;
            line-height: 24px;
            font-size: 12px;
            color: #fff;
            border-radius: 26px;
            border: 1px solid #ccc;
            background: #ccc;
            &.off {
            }
            &.on {
              background: #fff;
              color: #222;
            }
          }
        }
      }
    }
  }
`;

export default Wrapper;
