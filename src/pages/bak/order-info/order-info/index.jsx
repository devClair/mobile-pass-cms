import React, { useContext, useState, useEffect } from "react";

import Layout from "./../../../layout/";
import { Grid } from "@material-ui/core";
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

const tempTabs = [
  { key: 0, value: "이름순" },
  { key: 1, value: "거래일자순" },
  { key: 2, value: "배송일정순" },
];

const tableColumns = [
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
    title: "거래차량",
    field: "trade_car",
  },
  {
    title: "거래일자",
    field: "trade_date",
  },
  {
    title: "배송일정",
    field: "delivery_date",
  },
  {
    title: "거래상태",
    field: "trade_state",
  },
  {
    title: "반품상태",
    field: "refund_state",
    render: (rowData) => {
      return (
        <span className="refund_state">
          {rowData.refund_state === 0 && "-"}
          {rowData.refund_state === 1 && <em className="off">미승인</em>}
          {rowData.refund_state === 2 && <em className="on">승인</em>}
        </span>
      );
    },
  },
];

const OrderInfoComponent = () => {
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const history = useHistory();

  // Tabs
  const [tabValue, setTabValue] = useState(tempTabs[0].value);

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
      <Grid className="order_info">
        <Breadcrumb title="주문정보" />
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
          <Grid className="table">
            <Table
              data={reducer.tempTableData}
              columns={tableColumns}
              onRowClick={() => {
                history.push(`/order-info/detail/${1}`);
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
            <ExcelColumn label="1" value="no" />
          </TableFooter>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const OrderInfo = () => {
  return (
    <Layout>
      <OrderInfoComponent />
    </Layout>
  );
};

export default OrderInfo;
