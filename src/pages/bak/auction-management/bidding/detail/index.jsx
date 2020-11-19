import React, { useContext, useState } from "react";

import Layout from "./../../../../layout/";
import { Grid } from "@material-ui/core";
import { Wrapper, Bar } from "./styles";

import { useHistory } from "react-router-dom";
import Breadcrumb from "../../../../components/breadcrumb";
import ButtonType from "../../../../components/button-type/";
import { Modal, ModalInfo } from "../../../../components/modal/";
import Slider from "react-slick";
import { useEffect } from "react";

//-------------------------------------------
// redux
import { useDispatch, useSelector } from "react-redux";

var settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};

const tempDealerList = [
  { key: "고씨", value: 65 },
  { key: "요씨", value: 60 },
  { key: "곽씨", value: 40 },
  { key: "마씨", value: 20 },
  { key: "쾌씨", value: 20 },
  { key: "쿰씨", value: 15 },
];

const BiddingDetailComponent = () => {
  const history = useHistory();
  const [dataKinds, setDataKinds] = useState("");
  // 상세보기 모달
  const [infoSw, setInfoSw] = useState(false);
  // 확인 모달
  const [modalSw, setModalSw] = useState(false);

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(history.location.state);
    setDataKinds(history.location.state);
  }, []);

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
            {infoSw === "dealer" && (
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
                    <Grid className="td_1">소속단지</Grid>
                    <Grid className="td_2">경기도 수원시 오토컬렉션</Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid className="td_1">판매횟수</Grid>
                    <Grid className="td_2">2</Grid>
                  </Grid>
                </Grid>
                {/*  */}
                <Grid container className="tr">
                  <Grid item xs={6}>
                    <Grid className="td_1">반품횟수</Grid>
                    <Grid className="td_2">0</Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid className="td_1">계정상태</Grid>
                    <Grid className="td_2">정상</Grid>
                  </Grid>
                </Grid>
                {/*  */}
                <Grid container className="tr">
                  <Grid item xs={12}>
                    <Grid className="td_1">경매장 권한</Grid>
                    <Grid className="td_2">부여</Grid>
                  </Grid>
                </Grid>
                {/*  */}
              </>
            )}
          </Grid>
        </ModalInfo>
      )}
      <Grid className="bidding_detail">
        <Breadcrumb title="경매장관리" text="입찰" />
        <Grid className="table">
          <ul>
            <li>
              <span className="title">이름</span>
              <span className="text center">욤</span>
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
              <span className="text">01020301020</span>
            </li>
            <li>
              <span className="title">경매차량</span>
              <span className="text center">Ray/12년형</span>
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
              <span className="title">등록일자</span>
              <span className="text">2020.04.04</span>
            </li>
            {dataKinds === "ing" ? (
              <li>
                <span className="title">희망금액(만원)</span>
                <span className="text">1500</span>
              </li>
            ) : (
              <li>
                <span className="title">낙찰금액(만원)</span>
                <span className="text">600</span>
              </li>
            )}
            <li>
              <span className="title graph">참여딜러</span>
              <span className="text graph center">
                {tempDealerList.map((x, index) => {
                  return (
                    <span key={index} className="list">
                      <em className="name">{x.key}</em>
                      <Bar
                        width={`${x.value}%`}
                        bg={index === 1 || index === 2 ? "#d42f23" : "#001740"}
                        className="no"
                      ></Bar>
                      <em className="value">{x.value}만원</em>
                    </span>
                  );
                })}
              </span>
              <span
                className="info"
                onClick={() => {
                  setInfoSw("dealer");
                }}
              >
                회원 상세정보
              </span>
            </li>
            {dataKinds !== "ing" && (
              <li>
                <span className="title">확정딜러</span>
                <span className="text">이길동(600만원)</span>
              </li>
            )}
          </ul>
        </Grid>
        <Grid className="explanation">
          <p>막대그래프 색상 : 파란색 - 일반견적 / 빨간색 - 감가없는견적</p>
        </Grid>
        <Grid container justify="flex-end" className="btn_wrap">
          <ButtonType
            title="목록"
            onClick={() => {
              history.push("/bidding");
            }}
          />
          <ButtonType
            title="경매삭제"
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
        <Modal title="경매정보를 삭제하시겠습니까?">
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

const BiddingDetail = () => {
  return (
    <Layout>
      <BiddingDetailComponent />
    </Layout>
  );
};

export default BiddingDetail;
