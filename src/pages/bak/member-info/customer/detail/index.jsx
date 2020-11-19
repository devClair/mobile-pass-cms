import React, { useContext, useState } from "react";

import Layout from "./../../../../layout/";
import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Wrapper from "./styles";

import { useHistory } from "react-router-dom";
import Breadcrumb from "../../../../components/breadcrumb";
import Radio from "../../../../components/radio";
import { Modal } from "../../../../components/modal/";
import ButtonType from "../../../../components/button-type/";

const tempRadio = [
  { key: 0, value: "정상" },
  { key: 1, value: "정지" },
];

const CustomerDetailComponent = (props) => {
  const { state, setState } = props;
  const user = state.rowData;
  const history = useHistory();
  const [modalSw, setModalSw] = useState(false);
  console.log(state);
  return (
    <Wrapper>
      <Grid className="customer_detail">
        <Breadcrumb title="회원관리" text="" />
        <Grid className="table">
          <ul>
            <li>
              <span className="title">이름</span>
              <span className="text">{user.user_name}</span>
            </li>
            <li>
              <span className="title">이메일</span>
              <span className="text">{user.user_email}</span>
            </li>
            <li>
              <span className="title">휴대폰</span>
              <span className="text">{user.mobile_no}</span>
            </li>
            <li>
              <span className="title">가입일자</span>
              <span className="text">{user.createdAt}</span>
            </li>
            <li>
              <span className="title">진료과</span>
              <span className="text">{user.user_department}</span>
            </li>
            <li>
              <span className="title">소속</span>
              <span className="text">{user.user_division}</span>
            </li>
            <li>
              <span className="title">구분</span>
              {/* <span className="text">
                <Radio data={tempRadio} />
              </span> */}
              <span className="text">{user.user_type}</span>
            </li>
            <li>
              <span className="title">권한</span>
              <span className="text">{user.lecturer_status}</span>
            </li>
            <li>
              <span className="title">사진첨부</span>
              <span className="text"></span>
            </li>
          </ul>
        </Grid>
        <Grid container justify="flex-end" className="btn_wrap">
          <ButtonType
            title="목록"
            onClick={() => {
              history.push("/customer");
            }}
          />
          <ButtonType
            title="회원삭제"
            className="gray"
            onClick={() => {
              setModalSw(true);
              // setModalOverflow(true);
            }}
          />
        </Grid>
      </Grid>
      {modalSw && (
        <Modal title="소비자정보를 삭제하시겠습니까?">
          <Grid container justify="center" className="btn_wrap">
            <Grid
              item
              onClick={() => {
                setModalSw(false);
                // setModalOverflow(false);
              }}
            >
              확인
            </Grid>
            <Grid
              item
              onClick={() => {
                setModalSw(false);
                // setModalOverflow(false);
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

const CustomerDetail = (props) => {
  const { state, setState } = props;
  return <CustomerDetailComponent state={state} setState={setState} />;
};

export default CustomerDetail;
