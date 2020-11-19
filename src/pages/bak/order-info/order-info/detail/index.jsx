import React, { useContext, useState } from "react";

import Layout from "./../../../../layout/";
import { Grid } from "@material-ui/core";
import Wrapper from "./styles";

import { useHistory } from "react-router-dom";
import Breadcrumb from "../../../../components/breadcrumb";
import Radio from "../../../../components/radio";
import { Modal, ModalInfo } from "../../../../components/modal/";
import Slider from "react-slick";
import ButtonType from "../../../../components/button-type";

//-------------------------------------------
// redux
import { useDispatch, useSelector } from "react-redux";

const tempRadio = [
  { key: 0, value: "승인" },
  { key: 1, value: "미승인" },
  { key: 2, value: "해당없음" },
];

var settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};

const OrderInfoDetailComponent = () => {
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const history = useHistory();
  // 상세보기 모달
  const [infoSw, setInfoSw] = useState(false);
  // 확인 모달
  const [modalSw, setModalSw] = useState(false);
  return (
    <Wrapper>
      {infoSw !== false && (
        <ModalInfo
          title={infoSw === "car" ? "차량 상세정보" : "회원 상세정보"}
          setModalSw={setInfoSw}
        >
          {infoSw === "car" && (
            <Grid className="slide">
              <Slider {...settings}>
                <Grid className="mask">
                  <Grid className="img_box"></Grid>
                </Grid>
                <Grid className="mask">
                  <Grid className="img_box"></Grid>
                </Grid>
                <Grid className="mask">
                  <Grid className="img_box"></Grid>
                </Grid>
                <Grid className="mask">
                  <Grid className="img_box"></Grid>
                </Grid>
                <Grid className="mask">
                  <Grid className="img_box"></Grid>
                </Grid>
                <Grid className="mask">
                  <Grid className="img_box"></Grid>
                </Grid>
                <Grid className="mask">
                  <Grid className="img_box"></Grid>
                </Grid>
                <Grid className="mask">
                  <Grid className="img_box"></Grid>
                </Grid>
                <Grid className="mask">
                  <Grid className="img_box"></Grid>
                </Grid>
              </Slider>
            </Grid>
          )}
          <Grid className="table">
            {infoSw === "car" && (
              <>
                {/*  */}
                <Grid container className="tr">
                  <Grid item xs={6}>
                    <Grid className="td_1">차량 번호</Grid>
                    <Grid className="td_2">12가3456</Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid className="td_1">연식(연형)</Grid>
                    <Grid className="td_2">2017년 2월</Grid>
                  </Grid>
                </Grid>
                {/*  */}
                <Grid container className="tr">
                  <Grid item xs={6}>
                    <Grid className="td_1">연비</Grid>
                    <Grid className="td_2">없음</Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid className="td_1">차종</Grid>
                    <Grid className="td_2">QM6 / SUV · RV</Grid>
                  </Grid>
                </Grid>
                {/*  */}
                <Grid container className="tr">
                  <Grid item xs={6}>
                    <Grid className="td_1">배기량</Grid>
                    <Grid className="td_2">1,580cc</Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid className="td_1">색상</Grid>
                    <Grid className="td_2">흰색</Grid>
                  </Grid>
                </Grid>
                {/*  */}
                <Grid container className="tr">
                  <Grid item xs={6}>
                    <Grid className="td_1">차량 위치</Grid>
                    <Grid className="td_2">경기 수원시 수성구</Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid className="td_1">매매단지</Grid>
                    <Grid className="td_2">오토콜렉션</Grid>
                  </Grid>
                </Grid>
                {/*  */}
                <Grid container className="tr">
                  <Grid item xs={6}>
                    <Grid className="td_1">매물등록일자</Grid>
                    <Grid className="td_2">2020.02.02</Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid className="td_1">성능점검표</Grid>
                    {/* 다운로드 */}
                    <Grid className="td_2 download">다운받기</Grid>
                  </Grid>
                </Grid>
                {/*  */}
                <Grid container className="tr">
                  <Grid item xs={12}>
                    <Grid className="td_1">주요옵션</Grid>
                    <Grid className="td_2">
                      블랙박스, 네비게이션, 썬루프, 후방카메라, 후방감지센서
                    </Grid>
                  </Grid>
                </Grid>
                {/*  */}
              </>
            )}
            {infoSw === "member" && (
              <>
                {/*  */}
                <Grid container className="tr">
                  <Grid item xs={6}>
                    <Grid className="td_1">이름</Grid>
                    <Grid className="td_2">홍길동</Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid className="td_1">이메일주소</Grid>
                    <Grid className="td_2">piouy_@naver.com</Grid>
                  </Grid>
                </Grid>
                {/*  */}
                <Grid container className="tr">
                  <Grid item xs={6}>
                    <Grid className="td_1">연락처</Grid>
                    <Grid className="td_2">01020203030</Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid className="td_1">가입일자</Grid>
                    <Grid className="td_2">2020.04.04</Grid>
                  </Grid>
                </Grid>
                {/*  */}
                <Grid container className="tr">
                  <Grid item xs={6}>
                    <Grid className="td_1">이용횟수</Grid>
                    <Grid className="td_2">5</Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid className="td_1">환불횟수</Grid>
                    <Grid className="td_2">2</Grid>
                  </Grid>
                </Grid>
                {/*  */}
                <Grid container className="tr">
                  <Grid item xs={12}>
                    <Grid className="td_1">계정상태</Grid>
                    <Grid className="td_2">정상</Grid>
                  </Grid>
                </Grid>
                {/*  */}
              </>
            )}
          </Grid>
        </ModalInfo>
      )}
      <Grid className="order_detail">
        <Breadcrumb title="주문정보" />
        <Grid className="table">
          <ul>
            <li>
              <span className="title">이름</span>
              <span className="text center">마나반</span>
              <span
                className="info"
                onClick={() => {
                  setInfoSw("member");
                }}
              >
                회원 상세정보
              </span>
            </li>
            <li>
              <span className="title">연락처</span>
              <span className="text">01020202020</span>
            </li>
            <li>
              <span className="title">거래차량</span>
              <span className="text center">Ray/2012년형</span>
              <span
                className="info"
                onClick={() => {
                  setInfoSw("car");
                }}
              >
                차량 상세정보
              </span>
            </li>
            <li>
              <span className="title">거래일자</span>
              <span className="text">2020.04.04</span>
            </li>
            <li>
              <span className="title">배송일정</span>
              <span className="text">2020.04.05</span>
            </li>
            <li>
              <span className="title">인수상태</span>
              <span className="text">인수확정</span>
            </li>
            <li>
              <span className="title">반품상태</span>
              <span className="text">
                <Radio data={tempRadio} />
              </span>
            </li>
            <li>
              <span className="title">입금여부</span>
              <span className="text">입금완료</span>
            </li>
            <li>
              <span className="title">이전비 환불내역</span>
              <span className="text download">다운받기</span>
            </li>
            <li>
              <span className="title">매매계약서</span>
              <span className="text download">다운받기</span>
            </li>
          </ul>
        </Grid>
        <Grid container justify="flex-end" className="btn_wrap">
          <ButtonType
            title="목록"
            onClick={() => {
              history.push("/order-info");
            }}
          />
          <ButtonType
            title="주문삭제"
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
        <Modal title="주문정보를 삭제하시겠습니까?">
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

const OrderInfoDetail = () => {
  return (
    <Layout>
      <OrderInfoDetailComponent />
    </Layout>
  );
};

export default OrderInfoDetail;
