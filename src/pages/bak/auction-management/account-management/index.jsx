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

const tempTabs = [
  { key: 0, value: "이름순" },
  { key: 1, value: "가입일자순" },
  { key: 2, value: "승인일자순" },
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
    title: "이메일주소",
    field: "user_email",
  },
  {
    title: "가입일자",
    field: "sign_up_dt",
  },
  {
    title: "경매장 승인일자",
    field: "approve_dt",
  },
  {
    title: "소속단지",
    field: "belong",
  },
  {
    title: "계정상태",
    field: "account_state",
  },
];

const AccountManagementComponent = () => {
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
      <Grid className="account_management">
        <Breadcrumb title="경매장관리" text="계정관리" />
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
                history.push(`/account-management/detail/${1}`);
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

const AccountManagement = () => {
  return (
    <Layout>
      <AccountManagementComponent />
    </Layout>
  );
};

export default AccountManagement;
