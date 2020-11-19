import styled from "styled-components";

export const Bar = styled.em`
  width: calc(${(props) => `${props.width}`} - 100px);
  height: 20px;
  background: ${(props) => `${props.bg}`};
`;

export const Wrapper = styled.div`
  & .bidding_detail {
    & .table {
      padding-top: 40px;
      & ul {
        border-top: 4px solid #000;
        background: #fff;
        & > li {
          border-bottom: 1px solid #c6c6c6;
          & > span {
            display: inline-block;
            height: 52px;
            line-height: 52px;
            font-size: 14px;
            color: #333;
            &.title {
              width: 180px;
              text-align: center;
              font-weight: bold;
              background: #ddd;
              &.graph {
                height: 210px;
                line-height: 210px;
              }
            }
            &.text {
              width: calc(100% - 180px);
              padding-left: 40px;
              background: #fff;
              &.graph {
                padding-top: 20px;
                height: 210px;
                & .list {
                  display: block;
                  height: 20px;
                  line-height: 20px;
                  margin-bottom: 10px;
                  &:last-child {
                    padding-bottom: 0;
                  }
                  & em {
                    display: inline-block;
                    font-size: 14px;
                    color: #333;
                    &.name {
                      padding-right: 8px;
                    }
                    &.value {
                      padding-left: 8px;
                    }
                  }
                }
              }
            }
            &.info {
              width: 140px;
              text-align: center;
              background: #6f86af;
              font-weight: bold;
              color: #fff;
              cursor: pointer;
            }
            &.center {
              width: calc(100% - 320px);
            }
          }
        }
      }
    }
    & .explanation {
      padding-top: 8px;
      & p {
        font-size: 12px;
        color: #a4a4a4;
      }
    }
    & .btn_wrap {
      padding-top: 40px;
    }
  }
`;
