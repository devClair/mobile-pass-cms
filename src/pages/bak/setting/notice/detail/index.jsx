import React, { useContext, useState, useEffect } from "react";

import Layout from "./../../../../layout/";
import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Wrapper from "./styles";

import { useHistory } from "react-router-dom";
import Breadcrumb from "../../../../components/breadcrumb";
import Radio from "../../../../components/radio";
import ButtonType from "../../../../components/button-type";
import { Modal } from "../../../../components/modal/";

//-------------------------------------------
// redux
import { useDispatch, useSelector } from "react-redux";

const tempRadio = [
  { key: 0, value: "전체" },
  { key: 1, value: "딜러" },
  { key: 2, value: "소비자" },
];

const NoticeDetailComponent = () => {
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const [infoType, setInfoType] = useState("");
  const history = useHistory();
  const [modalSw, setModalSw] = useState(false);
  useEffect(() => {
    console.log(history.location.state);
    setInfoType(history.location.state);
  }, []);
  return (
    <Wrapper>
      <Grid className="question_detail">
        <Breadcrumb title="설정" text="공지사항알림" />
        <Grid container className="table">
          {/*  */}
          <Grid item xs={6} className="tr">
            <Grid container>
              <Grid className="td_1">제목</Grid>
              <Grid className="td_2">안녕하세요.</Grid>
            </Grid>
          </Grid>
          {/*  */}
          <Grid item xs={6} className="tr">
            <Grid container>
              <Grid className="td_1">작성자</Grid>
              <Grid className="td_2">관리자</Grid>
            </Grid>
          </Grid>
          {/*  */}
          <Grid item xs={6} className="tr">
            <Grid container>
              <Grid className="td_1">대상</Grid>
              <Grid className="td_2">
                {/* Tabs */}
                <Radio data={tempRadio} />
              </Grid>
            </Grid>
          </Grid>
          {/*  */}
          <Grid item xs={6} className="tr">
            <Grid container>
              <Grid className="td_1">작성일자</Grid>
              <Grid className="td_2">2020.04.04</Grid>
            </Grid>
          </Grid>
          {/*  */}
          <Grid item xs={12} className="tr">
            <Grid container>
              <Grid className="td_1 info">내용</Grid>
              <Grid className="td_2 info">공지사항입니다.</Grid>
            </Grid>
          </Grid>
          {/*  */}
        </Grid>
        <Grid container justify="flex-end" className="btn_wrap">
          <ButtonType
            title="목록"
            onClick={() => {
              history.push("/question");
            }}
          />
          {infoType === "info" ? (
            <>
              <ButtonType
                title="보내기"
                className="blue"
                onClick={() => {
                  history.push("/question");
                  alert("보냄");
                }}
              />
            </>
          ) : (
            <>
              <ButtonType
                title="재전송"
                className="blue"
                onClick={() => {
                  history.push("/question");
                  alert("보냄");
                }}
              />
              <ButtonType
                title="공지삭제"
                className="gray"
                onClick={() => {
                  setModalSw(true);
                  dispatch({
                    type: "SET_MODAL_OVER_FLOW",
                    payload: true,
                  });
                }}
              />
            </>
          )}
        </Grid>
      </Grid>
      {modalSw && (
        <Modal title="공지정보를 삭제하시겠습니까?">
          <Grid container justify="center" className="btn_wrap">
            <Grid
              item
              onClick={() => {
                setModalSw(false);
                dispatch({
                  type: "SET_MODAL_OVER_FLOW",
                  payload: true,
                });
              }}
            >
              확인
            </Grid>
            <Grid
              item
              onClick={() => {
                setModalSw(false);
                dispatch({
                  type: "SET_MODAL_OVER_FLOW",
                  payload: true,
                });
              }}
            >
              취소
            </Grid>
          </Grid>
        </Modal>
      )}
    </Wrapper>
  );
};

const NoticeDetail = () => {
  return (
    <Layout>
      <NoticeDetailComponent />
    </Layout>
  );
};

export default NoticeDetail;
