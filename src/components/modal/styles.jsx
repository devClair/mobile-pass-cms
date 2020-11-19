import styled from "styled-components";

const Wrapper = styled.div`
  & .modal_wrap {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1800;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    & .modal {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      max-width: 400px;
      width: 100%;
      height: 230px;
      border-radius: 5px;
      background: #fff;
      & h2 {
        padding: 80px 0 50px;
        text-align: center;
        & span {
          display: inline-block;
          &.text {
            height: 24px;
            line-height: 24px;
            margin-left: 16px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.75);
          }
        }
      }
      & .btn_wrap {
        & > div {
          width: 60px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          background: #459bfe;
          color: #fff;
          border-radius: 4px;
          font-size: 14px;
          border:1px solid :#459bfe;
          cursor:pointer;
          &:nth-child(2) {
           margin-left:16px; 
           background:#fff;
           border:1px solid #dddddd;
           color:#666666;
          }
        }
      }
    }
  }
  & .modal_info{
    position:fixed;
    left:0;
    top:0;
    z-index:2100;
    width:100%;
    height:100vh;
    background:rgba(0,0,0,0.6);
    & .modal{
      position:absolute;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
      max-width:1280px;
      width:100%;
      padding:60px 60px 100px 60px;
      background:#fff;
      & h2{
        padding-bottom:40px;
        font-size:22px;
        color:#333;
        font-weight:bold;
      }
      & .btn_close{
        position:absolute;
        right:30px;
        top:30px;
        widtH:24px;
        height:24px;
        background:url('/images/close_icon.png');
      }
      /* 슬라이드 */
      & .slide{
        & .mask{
          & .img_box{
            width:200px;
            height:200px;
            border:1px solid #c6c6c6;
            cursor:pointer;
          }
        }
        & .slick-arrow{
          width:36px;
          height:36px;
          &::before{
            display:none;
          }
          &.slick-prev{
            left:-45px;
            background:url('/images/slide_btn_prev.png');
          }
          &.slick-next{
            background:url('/images/slide_btn_next.png');
          }
        }
      }
      /* 상세정보 테이블 */
      & .table{
        margin-top:40px;
        border:1px solid #c6c6c6;
        /* 100% 행 */
        & .tr{
          border-bottom:1px solid #c6c6c6;
        /* 50% 행 */
          &>div{
            /* 각 아이템 */
            &>div{
              display:inline-block;
              height:52px;
              line-height:52px;
              font-size:18px;
              color:#333;
              &.td_1{
                width:180px;
                font-weight:500;
                text-align:center;
                background:#dddddd;
              }
              &.td_2{
                width:calc(100% - 180px);
                text-indent:40px;
                &.download{
                  color:#4199ff;
                  text-decoration:underline;
                  cursor:pointer;
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default Wrapper;
