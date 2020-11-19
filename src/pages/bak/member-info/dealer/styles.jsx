import styled from "styled-components";

const Wrapper = styled.div`
  & .table_wrap {
    & .table_sort {
      padding-bottom: 12px;
      & .sort_item {
        margin-right: 20px;
        & span {
          display: inline-block;
          font-size: 14px;
          font-weight: 500;
          color: #666;
          line-height: 32px;
          &.divider {
            padding: 0 4px;
          }
          &.option {
            cursor: pointer;
          }
        }
      }
      & .picker_wrap {
        & > div {
          display: inline-block;
          &.divider {
            width: 8px;
            height: 1px;
            margin: 16px 8px 0;
            background: #d9d9d9;
          }
        }
      }
    }
    & .table_util {
      margin-top: 40px;
      position: relative;
      width: 100%;
      height: 32px;
      & .btn_excel {
        & button {
          width: 100px;
          height: 32px;
          line-height: 32px;
          padding-right: 10px;
          font-size: 14px;
          color: #333;
          text-align: right;
          border: 1px solid #ddd;
          outline: none;
          cursor: pointer;
          box-sizing: border-box;
          padding-right: 10px;
          background: url("/images/save_icon.png") no-repeat left 10px center;
          background-size: 18px;
        }
      }
      & .table_pagination {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        & > nav {
          & ul {
            & li {
              & button {
                &.Mui-selected {
                  color: #fff;
                  background: #001740 !important;
                  border-radius: 4px;
                }
                & span {
                }
                &:hover {
                  background: none;
                }
              }
            }
          }
        }
      }
      & .search_box {
        position: relative;
        width: 200px;
        & .search_icon {
          position: absolute;
          left: 4px;
          top: 4px;
        }
        & input {
          width: 100%;
          height: 32px;
          line-height: 32px;
          border: 1px solid #d9d9d9;
          padding-left: 28px;
        }
      }
    }
  }
`;

export default Wrapper;
