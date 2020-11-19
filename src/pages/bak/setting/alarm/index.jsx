import React, { useContext, useEffect, useState } from "react";

import Layout from "./../../../layout/";
import { Grid } from "@material-ui/core";
import Wrapper from "./styles";

import { useHistory } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb";
import ButtonType from "../../../components/button-type";
import TableHeader from "../../../components/table-header";

//-------------------------------------------
// redux
import { useDispatch, useSelector } from "react-redux";

const AlarmComponent = () => {
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const history = useHistory();
  const [modifySw, setModifySw] = useState(false);

  return (
    <Wrapper>
      <Grid className="alarm">
        <Breadcrumb title="설정" text="차량금액 설정" />
        <Grid className="table_wrap">
          {/*  */}
          <Grid className="table">
            <Grid container className="tr">
              <Grid item className="td_1">
                고객 주문 알림음
              </Grid>
              <Grid item className="td_2">
                {modifySw ? (
                  <>
                    <input type="text" value="알림음1.mp4" />
                    <button type="button">파일첨부</button>
                    <button type="button">삭제</button>
                  </>
                ) : (
                  "알림음1.mp4"
                )}
              </Grid>
            </Grid>
            {/*  */}
            <Grid container className="tr">
              <Grid item className="td_1">
                고객 문의 알림음
              </Grid>
              <Grid item className="td_2">
                {modifySw ? (
                  <>
                    <input type="text" value="알림음2.mp4" />
                    <button type="button">파일첨부</button>
                    <button type="button">삭제</button>
                  </>
                ) : (
                  "알림음2.mp4"
                )}
              </Grid>
            </Grid>
            {/*  */}
            <Grid container className="tr">
              <Grid item className="td_1">
                채팅 알림음
              </Grid>
              <Grid item className="td_2">
                {modifySw ? (
                  <>
                    <input type="text" value="알림음3.mp4" />
                    <button type="button">파일첨부</button>
                    <button type="button">삭제</button>
                  </>
                ) : (
                  "알림음3.mp4"
                )}
              </Grid>
            </Grid>
            {/*  */}
          </Grid>
          {/*  */}

          <Grid container justify="flex-end" className="btn_wrap">
            {modifySw ? (
              <>
                <ButtonType
                  title="목록"
                  onClick={() => {
                    setModifySw(!modifySw);
                  }}
                />{" "}
                <ButtonType
                  className="blue"
                  title="저장하기"
                  onClick={() => {
                    setModifySw(!modifySw);
                  }}
                />
              </>
            ) : (
              <ButtonType
                className="gray"
                title="수정하기"
                onClick={() => {
                  setModifySw(!modifySw);
                }}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const Alarm = () => {
  return (
    <Layout>
      <AlarmComponent />
    </Layout>
  );
};

export default Alarm;
