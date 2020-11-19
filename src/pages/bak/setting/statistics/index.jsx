import React, { useContext, useState } from "react";

import Layout from "./../../../layout/";
import { Grid } from "@material-ui/core";
import Wrapper from "./styles";

import { useHistory } from "react-router-dom";
import TableHeader from "../../../components/table-header";
import Breadcrumb from "../../../components/breadcrumb";

const tempData = [
  {
    title: "경로",
    list: [
      { key: "유튜브", value: "1" },
      { key: "신한은행", value: "2" },
      { key: "인터넷", value: "3" },
      { key: "지인", value: "4" },
      { key: "기타", value: "5" },
      { key: "합계", value: "15" },
    ],
  },
  {
    title: "거주지역",
    list: [
      { key: "서울", value: "1" },
      { key: "경기", value: "2" },
      { key: "인천", value: "3" },
      { key: "부산", value: "4" },
      { key: "대구", value: "5" },
      { key: "합계", value: "15" },
    ],
  },
  {
    title: "성별",
    list: [
      { key: "남성", value: "3" },
      { key: "여성", value: "6" },
      { key: "합계", value: "9" },
    ],
  },
  {
    title: "연령",
    list: [
      { key: "1020", value: "1" },
      { key: "2030", value: "2" },
      { key: "3040", value: "3" },
      { key: "4050", value: "4" },
      { key: "5060", value: "5" },
      { key: "합계", value: "15" },
    ],
  },
];

const StatisticsComponent = () => {
  const history = useHistory();

  const tempTabs = [{ key: 0, value: "" }];

  // Tabs
  const [tabValue, setTabValue] = useState(tempTabs[0].value);

  // Picker
  const [selectedDate1, handleDateChange1] = useState(new Date());
  const [selectedDate2, handleDateChange2] = useState(new Date());

  return (
    <Wrapper>
      <Grid className="statistics">
        <Breadcrumb title="설정" text="설문조사·통계" />
        <Grid className="table_wrap">
          <TableHeader
            sortTab={true}
            sortTabData={tempTabs}
            setTabValue={setTabValue}
            selectedDate1={selectedDate1}
            handleDateChange1={handleDateChange1}
            selectedDate2={selectedDate2}
            handleDateChange2={handleDateChange2}
          />
          <Grid container className="table">
            {tempData.map((x, index) => {
              return (
                <Grid item xs={3} key={index}>
                  <h2>{x.title}</h2>
                  <ul>
                    {x.list.map((x, i) => {
                      return (
                        <li key={index}>
                          <span className="title">{x.key}</span>
                          <span className="text">{x.value}건</span>
                        </li>
                      );
                    })}
                  </ul>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const Statistics = () => {
  return (
    <Layout>
      <StatisticsComponent />
    </Layout>
  );
};

export default Statistics;
