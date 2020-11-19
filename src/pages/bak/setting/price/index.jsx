import React, { useContext, useEffect, useState } from "react";

import Layout from "./../../../layout/";
import { Grid } from "@material-ui/core";
import Wrapper from "./styles";

import { useHistory } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb";
import ButtonType from "../../../components/button-type";
import TableHeader from "../../../components/table-header";

const PriceComponent = () => {
  const history = useHistory();
  const [modifySw, setModifySw] = useState(false);

  return (
    <Wrapper>
      <Grid className="price">
        <Breadcrumb title="설정" text="차량금액 설정" />
        <Grid className="table_wrap">
          {/*  */}
          <Grid className="table">
            <Grid container className="tr">
              <Grid item className="td_1">
                국산차
              </Grid>
              <Grid item className="td_2">
                {modifySw ? <input type="text" value="20" /> : "20"}만원
              </Grid>
            </Grid>
            {/*  */}
            <Grid container className="tr">
              <Grid item className="td_1">
                수입차
              </Grid>
              <Grid item className="td_2">
                {modifySw ? <input type="text" value="30" /> : "30"}만원
              </Grid>
            </Grid>
          </Grid>
          {/*  */}
          <p>
            설정한 금액이 차량 금액 외에 합산되어 노출되며 해당금액은 보증연장
            및 배달의딜러 운영자금으로 사용됩니다.
          </p>
          <Grid container justify="flex-end" className="btn_wrap">
            {modifySw ? (
              <ButtonType
                className="gray"
                title="저장하기"
                onClick={() => {
                  setModifySw(!modifySw);
                }}
              />
            ) : (
              <>
                <ButtonType
                  title="목록"
                  onClick={() => {
                    // history.push("/price");
                    window.location.reload();
                  }}
                />
                <ButtonType
                  className="blue"
                  title="수정하기"
                  onClick={() => {
                    setModifySw(!modifySw);
                  }}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const Price = () => {
  return (
    <Layout>
      <PriceComponent />
    </Layout>
  );
};

export default Price;
