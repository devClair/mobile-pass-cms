import React, { useContext, useState } from "react";

import Layout from "./../../../../layout/";
import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Wrapper from "./styles";

import { useHistory } from "react-router-dom";
import Breadcrumb from "../../../../components/breadcrumb";
import Radio from "../../../../components/radio";
import ButtonType from "../../../../components/button-type/";
import { Modal } from "../../../../components/modal/";

//-------------------------------------------
// redux
import { useDispatch, useSelector } from "react-redux";

const QuestionDetailComponent = () => {
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const history = useHistory();
  const [modalSw, setModalSw] = useState(false);
  return (
    <Wrapper>
      <Grid className="question_detail">
        <Breadcrumb title="1:1 문의" />
        <Grid container className="table">
          {/*  */}
          <Grid item xs={6} className="tr">
            <Grid container>
              <Grid item xs={4} className="td_1">
                제목
              </Grid>
              <Grid item xs={8} className="td_2">
                문의드립니다.
              </Grid>
            </Grid>
          </Grid>
          {/*  */}
          <Grid item xs={6} className="tr">
            <Grid container>
              <Grid item xs={4} className="td_1">
                작성자
              </Grid>
              <Grid item xs={8} className="td_2">
                홍길동
              </Grid>
            </Grid>
          </Grid>
          {/*  */}
          <Grid item xs={6} className="tr">
            <Grid container>
              <Grid item xs={4} className="td_1">
                문의종류
              </Grid>
              <Grid item xs={8} className="td_2">
                어플 관련 문의
              </Grid>
            </Grid>
          </Grid>
          {/*  */}
          <Grid item xs={6} className="tr">
            <Grid container>
              <Grid item xs={4} className="td_1">
                작성일자
              </Grid>
              <Grid item xs={8} className="td_2">
                2020.04.04
              </Grid>
            </Grid>
          </Grid>
          {/*  */}
          <Grid item xs={12} className="tr">
            <Grid container>
              <Grid item xs={2} className="td_1 info">
                내용
              </Grid>
              <Grid item xs={10} className="td_2 info">
                내용
                <br />
                내용
                <br />
                내용
              </Grid>
            </Grid>
          </Grid>
          {/*  */}
        </Grid>
        <Grid className="table awnser">
          <Grid item xs={12} className="tr">
            <Grid container>
              <Grid item xs={2} className="td_1 info">
                답변문의
              </Grid>
              <Grid item xs={10} className="td_2 info">
                <textarea placeholder="답변내용을 입력해주세요." />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="flex-end" className="btn_wrap">
          <ButtonType
            title="목록"
            onClick={() => {
              history.push("/question");
            }}
          />
          <ButtonType
            title="문의삭제"
            className="gray"
            onClick={() => {
              setModalSw(true);
              dispatch({
                type: "SET_MODAL_OVER_FLOW",
                payload: true,
              });
            }}
          />
        </Grid>
      </Grid>
      {modalSw && (
        <Modal title="문의정보를 삭제하시겠습니까?">
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

const QuestionDetail = () => {
  return (
    <Layout>
      <QuestionDetailComponent />
    </Layout>
  );
};

export default QuestionDetail;
