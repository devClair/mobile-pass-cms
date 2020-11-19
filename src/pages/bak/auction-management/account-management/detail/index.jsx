import React, { useContext, useState } from "react";

import Layout from "./../../../../layout/";
import { Grid } from "@material-ui/core";
import Wrapper from "./styles";
import { useHistory } from "react-router-dom";
import Breadcrumb from "../../../../components/breadcrumb";
import { Modal } from "../../../../components/modal/";
import ButtonType from "../../../../components/button-type";

//-------------------------------------------
// redux
import { useDispatch, useSelector } from "react-redux";

const AccountManagementDetailComponent = () => {
  const history = useHistory();
  // 확인 모달
  const [modalSw, setModalSw] = useState(false);

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Grid className="customer_detail">
        <Breadcrumb title="경매장관리" text="계정관리" />
        <Grid className="table">
          <ul>
            <li>
              <span className="title">이메일주소</span>
              <span className="text">byuntisse2213123@gmail.com</span>
            </li>
            <li>
              <span className="title">이름</span>
              <span className="text">욤</span>
            </li>
            <li>
              <span className="title">연락처</span>
              <span className="text">01060606060</span>
            </li>
            <li>
              <span className="title">가입일자</span>
              <span className="text">2020.04.10</span>
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
              <span className="title">반품횟수</span>
              <span className="text">2</span>
            </li>
            <li>
              <span className="title">계정상태</span>
              <span className="text">정상수</span>
            </li>
            <li>
              <span className="title">경매장 권한</span>
              <span className="text">고구려 (2020.10.20)</span>
            </li>
          </ul>
        </Grid>
        <Grid container justify="flex-end" className="btn_wrap">
          <ButtonType
            title="목록"
            onClick={() => {
              history.push("/account-management");
            }}
          />
          <ButtonType
            title="계정삭제"
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
        <Modal title="계정정보를 삭제하시겠습니까?">
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

const AccountManagementDetail = () => {
  return (
    <Layout>
      <AccountManagementDetailComponent />
    </Layout>
  );
};

export default AccountManagementDetail;
