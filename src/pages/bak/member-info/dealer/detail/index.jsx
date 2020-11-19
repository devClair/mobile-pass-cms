import React, { useContext, useState } from "react";

import Layout from "./../../../../layout/";
import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Wrapper from "./styles";

import { useHistory } from "react-router-dom";
import Breadcrumb from "../../../../components/breadcrumb";
import Radio from "../../../../components/radio";
import { Modal } from "../../../../components/modal";
import ButtonType from "../../../../components/button-type";

//-------------------------------------------
// redux
import { useDispatch, useSelector } from "react-redux";

const tempRadio = [
  { key: 0, value: "정상" },
  { key: 1, value: "정지" },
];

const tempRadio2 = [
  { key: 0, value: "부여" },
  { key: 1, value: "미부여" },
];

const DealerDetailComponent = () => {
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const history = useHistory();
  const [modalSw, setModalSw] = useState(false);
  return (
    <Wrapper>
      <Grid className="customer_detail">
        <Breadcrumb title="회원정보" text="딜러" />
        <Grid className="table">
          <ul>
            <li>
              <span className="title">이메일주소</span>
              <span className="text">byuntisse2213123@gmail.com</span>
            </li>
            <li>
              <span className="title">이름</span>
              <span className="text">뀜</span>
            </li>
            <li>
              <span className="title">연락처</span>
              <span className="text">01020304050</span>
            </li>
            <li>
              <span className="title">가입일자</span>
              <span className="text">2020.04.04</span>
            </li>
            <li>
              <span className="title">소속단지</span>
              <span className="text">꿀단지</span>
            </li>
            <li>
              <span className="title">판매횟수</span>
              <span className="text">5</span>
            </li>
            <li>
              <span className="title">반품</span>
              <span className="text">0</span>
            </li>
            <li>
              <span className="title">계정상태</span>
              <span className="text">
                <Radio data={tempRadio} />
              </span>
            </li>
            <li>
              <span className="title">경매장 권한</span>
              <span className="text">
                <Radio data={tempRadio2} />
              </span>
            </li>
          </ul>
        </Grid>
        <Grid container justify="flex-end" className="btn_wrap">
          <ButtonType
            className="btn_list"
            title="목록"
            onClick={() => {
              history.push("/dealer");
            }}
          />
          <ButtonType
            className="gray"
            title="목록"
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
        <Modal title="딜러정보를 삭제하시겠습니까?">
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

const DealerDetail = () => {
  return (
    <Layout>
      <DealerDetailComponent />
    </Layout>
  );
};

export default DealerDetail;
