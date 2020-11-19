import React, { useContext, useState, useEffect } from "react";

import Layout from "./../../../layout/";
import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Wrapper from "./styles";
import { useHistory } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb";

import TableHeader from "../../../components/table-header";
import Table from "../../../components/table";
import TableFooter from "../../../components/table-footer";
import ReactExport from "react-data-export";

//-------------------------------------------
// redux
import { useDispatch, useSelector } from "react-redux";

const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const tempTableTabs = [
  { key: 0, value: "입찰중" },
  { key: 1, value: "판매완료" },
];

const tempSortTabs = [
  { key: 0, value: "이름순" },
  { key: 1, value: "등록일자순" },
  { key: 2, value: "참여딜러순" },
];

const tableColumns1 = [
  {
    title: "번호",
    field: "no",
  },
  {
    title: "이름",
    field: "user_nm",
  },
  {
    title: "연락처",
    field: "user_phone",
  },
  {
    title: "경매차량",
    field: "car",
  },
  {
    title: "등록일자",
    field: "enrollment_dt",
  },
  {
    title: "희망금액(만원)",
    field: "price",
  },
  {
    title: "참여딜러",
    field: "dealer",
  },
];

const tableColumns2 = [
  {
    title: "번호",
    field: "no",
  },
  {
    title: "이름",
    field: "user_nm",
  },
  {
    title: "연락처",
    field: "user_phone",
  },
  {
    title: "경매차량",
    field: "car",
  },
  {
    title: "등록일자",
    field: "enrollment_dt",
  },
  {
    title: "판매일자",
    field: "sell_dt",
  },
  {
    title: "낙찰금액(만원)",
    field: "price",
  },
  {
    title: "참여딜러",
    field: "dealer",
  },
];

const useTabs = (TabValue, Content) => {
  const [currentIndex, setCurrentIndex] = useState(TabValue);
  return {
    currentItem: Content[currentIndex],
    changeItem: setCurrentIndex,
  };
};

const BiddingComponent = () => {
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const { currentItem, changeItem } = useTabs(0, tempTableTabs);
  const history = useHistory();
  // Tabs
  const [tabValue, setTabValue] = useState(tempSortTabs[0].value);

  // Picker
  const [selectedDate1, handleDateChange1] = useState(new Date());
  const [selectedDate2, handleDateChange2] = useState(new Date());

  // Pagination
  const [currentPage, setCurrentPage] = useState();
  const currentPageChange = (e, n) => {
    setCurrentPage(n);
  };

  // Search
  const [searchText, setSearchText] = useState("");
  const searchTextChange = (e) => {
    setSearchText(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    console.log(tabValue);
  }, [tabValue]);

  useEffect(() => {
    console.log(selectedDate1);
  }, [selectedDate1]);

  useEffect(() => {
    console.log(selectedDate2);
  }, [selectedDate2]);

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  return (
    <Wrapper>
      <Grid className="bidding">
        <Breadcrumb title="경매장관리" text="입찰" />
        <Grid className="table_wrap">
          <TableHeader
            sortTab={true}
            sortTabData={tempSortTabs}
            setTabValue={setTabValue}
            selectedDate1={selectedDate1}
            handleDateChange1={handleDateChange1}
            selectedDate2={selectedDate2}
            handleDateChange2={handleDateChange2}
          >
            <Grid container className="tabs">
              {tempTableTabs.map((x, index) => {
                return (
                  <Grid
                    item
                    key={index}
                    className={currentItem.value === x.value ? "tab on" : "tab"}
                    onClick={() => {
                      changeItem(index);
                    }}
                  >
                    {x.value}
                  </Grid>
                );
              })}
            </Grid>
          </TableHeader>
          <Grid className="table">
            <Table
              data={reducer.tempTableData}
              columns={currentItem.key === 0 ? tableColumns1 : tableColumns2}
              onRowClick={() => {
                history.push({
                  pathname: `/bidding/detail/${1}`,
                  state: currentItem.key === 0 ? "ing" : "end",
                });
              }}
              options={{
                // search: search,
                // selection: selection,
                // paginationType: "stepped",
                pageSize: 10,
                paging: true,
              }}
              // onSelectionChange={onSelectionChange} />
            />
          </Grid>
          <TableFooter
            data={reducer.tempTableData}
            currentPageChange={currentPageChange}
            searchTextChange={searchTextChange}
          >
            {/* <ExcelColumn label="1" value="no" /> */}
          </TableFooter>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const Bidding = () => {
  return (
    <Layout>
      <BiddingComponent />
    </Layout>
  );
};

export default Bidding;
