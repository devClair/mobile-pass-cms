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

// detail component
import CustomerDetail from "./detail";

//-------------------------------------------
// redux
import { useDispatch, useSelector } from "react-redux";

//-------------------------------------------
// apiObject
import { useCmsUser } from "./viewLogic";

//-------------------------------------------
// apiObject
import { apiObject } from "../../../api";

const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const tempTabs = [
  { key: 0, value: "이름순" },
  { key: 1, value: "가입일자순" },
  { key: 2, value: "이용횟수순" },
];

const tableColumns = [
  {
    title: "번호",
    field: "user_no",
  },
  {
    title: "구분",
    field: "user_type",
  },
  {
    title: "이름",
    field: "user_name",
  },
  {
    title: "소속",
    field: "user_division",
  },
  {
    title: "진료과",
    field: "user_department",
  },
  {
    title: "이메일주소",
    field: "user_email",
  },
  {
    title: "전화번호",
    field: "mobile_no",
  },
  {
    title: "가입일자",
    field: "createdAt",
  },
  {
    title: "강사권한",
    field: "lecturer_status",
  },
];

const CustomerComponent = (props) => {
  const { state, setState } = props;

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

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(tabValue);
  // }, [tabValue]);

  // useEffect(() => {
  //   console.log(selectedDate1);
  // }, [selectedDate1]);

  // useEffect(() => {
  //   console.log(selectedDate2);
  // }, [selectedDate2]);

  // useEffect(() => {
  //   console.log(currentPage);
  // }, [currentPage]);

  return (
    <Wrapper>
      <Grid className="customer">
        <Breadcrumb title="회원정보" text="" />
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
              data={reducer.userData.data}
              columns={tableColumns}
              onRowClick={(rowData) => {
                setState({ ...state, isDetail: true, rowData: rowData });
              }}
              options={{
                // search: search,
                // selection: selection,
                // paginationType: "stepped",
                pageSize: 10,
                paging: true,
              }}
              setState={setState}
              // onSelectionChange={onSelectionChange} />
            />
          </Grid>
          <TableFooter
            data={reducer.userData.data}
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

const UserInfo = (props) => {
  const [state, setState] = useState({
    rowData: {},
    isDetail: false,
  });

  useCmsUser();
  return (
    <Layout>
      {state.isDetail ? (
        <CustomerDetail state={state} setState={setState} />
      ) : (
        <CustomerComponent state={state} setState={setState} />
      )}
    </Layout>
  );
};

export default UserInfo;
