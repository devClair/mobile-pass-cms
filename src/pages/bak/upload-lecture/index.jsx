import React, { useContext, useState, useEffect } from "react";

import Layout from "./../../layout/";
import { Grid, Button } from "@material-ui/core";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Pagination } from "@material-ui/lab";
import Wrapper from "./styles";

import { useHistory } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb";

import TableHeader from "../../components/table-header";
import Table from "../../components/table";
import TableFooter from "../../components/table-footer";
import ReactExport from "react-data-export";

// detail component
import LectureDetail from "./detail";

//-------------------------------------------
// redux
import { useDispatch, useSelector } from "react-redux";

//-------------------------------------------
// apiObject
import { useCmsLectures } from "./viewLogic";

//-------------------------------------------
// apiObject
import { apiObject } from "../../api";

const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const tempTabs = [
  { key: 0, value: "이름순" },
  { key: 1, value: "가입일자순" },
  { key: 2, value: "이용횟수순" },
];

const tableColumns = [
  {
    title: "번호",
    field: "lecture_no",
  },
  {
    title: "진료과",
    field: "lecture_department",
  },
  {
    title: "강의명",
    field: "lecture_name",
  },
  {
    title: "강사명",
    field: "instructor",
  },
  {
    title: "기간",
    field: "period",
  },
  {
    title: "조회수",
    field: "view_count",
  },
  {
    title: "업로드 일시",
    field: "createdAt_processed",
  },
  {
    title: "상태",
    field: "lecture_state",
  },
];

const LectureList = (props) => {
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
        <Breadcrumb pb={0} title="강의업로드" text="" />
        <Grid container justify="flex-end">
          <Grid item>
            <Button
              variant="contained"
              // color={isEditable ? "primary" : "secondary"}
              color={"primary"}
              startIcon={<SaveOutlinedIcon />}
              onClick={() => {
                setState({
                  ...state,
                  isDetail: true,
                  isEditable: true,
                  rowData: {},
                });
              }}
            >
              업로드
            </Button>
          </Grid>
          {/* <Grid item>
            <Button
              variant="contained"
              className={classes.upload_button}
              startIcon={<BackupOutlinedIcon />}
            >
              승인요청
            </Button>
          </Grid> */}
        </Grid>
        <Grid className="table_wrap">
          {/* <TableHeader
            departmentFilter={true}
            sortTab={true}
            dateFilter={true}
            searchFilter={true}
            // sortTab={true}
            // sortTabData={tempTabs}
            // setTabValue={setTabValue}
            // selectedDate1={selectedDate1}
            // handleDateChange1={handleDateChange1}
            // selectedDate2={selectedDate2}
            // handleDateChange2={handleDateChange2}
          /> */}
          <Grid className="table">
            <Table
              data={reducer.lecture?.lecture_data.data}
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
            data={reducer.lecture?.lecture_data.data}
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

const UploadLecture = () => {
  const [state, setState] = useState({
    rowData: {},
    isDetail: false,
    isEditable: false,
  });

  useCmsLectures();
  return (
    <Layout>
      {state.isDetail ? (
        <LectureDetail state={state} setState={setState} />
      ) : (
        <LectureList state={state} setState={setState} />
      )}
    </Layout>
  );
};

export default UploadLecture;
