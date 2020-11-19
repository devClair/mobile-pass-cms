import React, { useContext, useEffect, useState } from "react";

import Layout from "./../../../layout/";
import { Grid } from "@material-ui/core";
import Wrapper from "./styles";

import { useHistory } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb";
import TableHeader from "../../../components/table-header";

const StatusComponent = () => {
  const history = useHistory();

  const tempTabs = [{ key: 0, value: "깡통데이터" }];

  // Tabs
  const [tabValue, setTabValue] = useState(tempTabs[0].value);

  // Picker
  const [selectedDate1, handleDateChange1] = useState(new Date());
  const [selectedDate2, handleDateChange2] = useState(new Date());

  useEffect(() => {
    console.log(selectedDate1);
  }, [selectedDate1]);

  useEffect(() => {
    console.log(selectedDate2);
  }, [selectedDate2]);

  return (
    <Wrapper>
      <Grid className="status">
        <Breadcrumb title="경매장관리" text="현황" />
        <Grid className="table_wrap">
          <TableHeader
            sortTab={false}
            sortTabData={tempTabs}
            setTabValue={setTabValue}
            selectedDate1={selectedDate1}
            handleDateChange1={handleDateChange1}
            selectedDate2={selectedDate2}
            handleDateChange2={handleDateChange2}
          />
          {/*  */}
          <Grid className="table">
            <Grid container className="tr">
              <Grid item className="td_1">
                거래건수
              </Grid>
              <Grid item className="td_2">
                2000건
              </Grid>
            </Grid>
          </Grid>
          {/*  */}
        </Grid>
        <Grid className="table_wrap">
          <TableHeader
            sortTab={false}
            sortTabData={tempTabs}
            setTabValue={setTabValue}
            selectedDate1={selectedDate1}
            handleDateChange1={handleDateChange1}
            selectedDate2={selectedDate2}
            handleDateChange2={handleDateChange2}
          />
          {/*  */}
          <Grid className="table">
            {/*  */}
            <Grid container className="tr">
              <Grid item className="td_1">
                배달수익
              </Grid>
              <Grid item className="td_2">
                2,050,000
              </Grid>
            </Grid>
            {/*  */}
            <Grid container className="tr">
              <Grid item className="td_1">
                경매수익
              </Grid>
              <Grid item className="td_2">
                1,000,000
              </Grid>
            </Grid>
            {/*  */}
            <Grid container className="tr">
              <Grid item className="td_1">
                지출
              </Grid>
              <Grid item className="td_2">
                750,000
              </Grid>
            </Grid>
            {/*  */}
            <Grid container className="tr">
              <Grid item className="td_1">
                통계
              </Grid>
              <Grid item className="td_2">
                2,300,000
              </Grid>
            </Grid>
            {/*  */}
          </Grid>
          {/*  */}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const Status = () => {
  return (
    <Layout>
      <StatusComponent />
    </Layout>
  );
};

export default Status;
