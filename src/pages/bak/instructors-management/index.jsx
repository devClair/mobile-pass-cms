import React, { useContext, useState, useEffect } from "react";

import Layout from "./../../layout/";
import { Grid } from "@material-ui/core";
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
import { useCmsInstructors } from "./viewLogic";

//-------------------------------------------
// apiObject
import { apiObject } from "../../api";

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
    this.getFullYear(),
    "-",
    (mm > 9 ? "" : "0") + mm,
    "-",
    (dd > 9 ? "" : "0") + dd,
  ].join("");
};

const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const tempTabs = [
  { key: 0, value: "번호순", order_column: "lecture_no", order_type: "DESC" },
  { key: 1, value: "기간순", order_column: "updatedAt", order_type: "DESC" },
  { key: 2, value: "업로드순", order_column: "createdAt", order_type: "DESC" },
  // { key: 3, value: "조회수", order_column: "view_count", order_type: "DESC" },
  // {
  //   key: 4,
  //   value: "강의명",
  //   order_column: "lecture_title",
  //   order_type: "DESC",
  // },
  {
    key: 5,
    value: "Best노출만",
    order_column: "best_bare_state",
    order_type: "DESC",
  },
  {
    key: 6,
    value: "승인만",
    order_column: "lecture_state",
    order_type: "DESC",
  },
  {
    key: 7,
    value: "승인대기만",
    order_column: "lecture_state",
    order_type: "ASC",
  },
];

// {
//   "user_no": 101,
//   "lecturer_name": "홍길동",
//   "lecturer_department_no": 2,
//   "lecturer_division": "서울대 교수 소속",
//   "lecturer_title": "박사",
//   "lecturer_career": "\n    서울대 내과 내과학 박사\n    - 서울고\n    - 서울중\n    - 서울초\n    ",
//   "lecturer_introduction_img_no": 6,
//   "createdAt": "2020-09-17T07:47:51.710Z",
//   "updatedAt": "2020-09-17T07:47:51.710Z",
//   "tb_user": {
//     "lecturer_status": 1,
//     "user_status": 0
//   },
//   "tb_image": {
//     "full_file_path": "https://kl-dev-file.s3-ap-northeast-1.amazonaws.com/public/profile/a0deb216-517a-42d1-8332-d648b3278ba6.png",
//     "image_type": "IN",
//     "file_path": "profile/a0deb216-517a-42d1-8332-d648b3278ba6.png"
//   },
//   "tb_lecturer_department": {
//     "code_id": "내과",
//     "code_type": "department",
//     "code_information": {
//       "ko": "내과"
//     }
//   }
// },

const tableColumns = [
  {
    title: "진료과",
    field: "code_id",
    render: (rowData) => rowData?.tb_lecturer_department?.code_id,
  },
  {
    title: "강사명",
    field: "lecturer_name",
    // render: (rowData) => rowData.tb_user.user_name,
  },
  {
    title: "소속",
    field: "lecturer_division",
    // render: (rowData) =>
    //   new Date(rowData.begin_dt).yyyymmdd() +
    //   " ~ " +
    //   new Date(rowData.end_dt).yyyymmdd(),
  },
  {
    title: "가입일",
    field: "createdAt",
    render: (rowData) => new Date(rowData.createdAt).yyyymmdd(),
  },
  // {
  //   title: "메인 노출",
  //   field: "best_bare_state",
  //   type: "boolean",
  //   // render: (rowData) => (rowData.best_bare_state == 1 ? true : false),
  // },
  {
    title: "계정 활성화",
    field: "lecturer_status",
    type: "boolean",
    render: (rowData) =>
      rowData?.tb_user?.lecturer_status === 1 ? true : false,
  },
];

const selectedMenuData = [
  { key: 0, value: "강사 이름", search_column: "lecturer_name" },
  { key: 1, value: "강의 제목", search_column: "lecturer_title" },
  { key: 2, value: "강의 내용", search_column: "lecture_content" },
];

const InstructorList = (props) => {
  const { state, setState } = props;

  const history = useHistory();

  // Tabs
  const [tabValue, setTabValue] = useState(tempTabs[0]);

  const [selectedMenu, setSelectedMenu] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState();
  const currentPageChange = (e, n) => {
    setCurrentPage(n);
  };

  // Search
  const [searchText, setSearchText] = useState("");

  const [orderColumn, setOrderColumn] = useState("lecture_no");
  const [orderType, setOrderType] = useState("DESC");

  const [selectedDate1, handleDateChange1] = useState(null);
  const [selectedDate2, handleDateChange2] = useState(null);

  useCmsInstructors({
    orderColumn,
    setOrderColumn,
    orderType,
    setOrderType,
    tabValue,
    setTabValue,
    selectedDate1,
    handleDateChange1,
    selectedDate2,
    handleDateChange2,
    searchText,
    setSearchText,
    selectedMenu,
    setSelectedMenu,
    currentPage,
    setCurrentPage,
  });

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setOrderColumn(tabValue.order_column);
    setOrderType(tabValue.order_type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabValue]);

  return (
    <Wrapper>
      <Grid className="customer">
        <Breadcrumb title="강사진" text="" />
        <Grid className="table_wrap">
          <TableHeader
            sortTab={true}
            sortTabData={tempTabs}
            setTabValue={setTabValue}
            selectedDate1={selectedDate1}
            handleDateChange1={handleDateChange1}
            selectedDate2={selectedDate2}
            handleDateChange2={handleDateChange2}
            isSearchDateFilter={true}
            selectedMenuData={selectedMenuData}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            setSearchText={setSearchText}
          />
          <Grid className="table">
            <Table
              data={reducer.instructor_list_info}
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
            data={reducer.instructor_list_info}
            totalPage={reducer.instructor_list_info.total_page}
            currentPageChange={currentPageChange}
            // searchTextChange={searchTextChange}
          >
            {/* <ExcelColumn label="1" value="no" /> */}
          </TableFooter>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const InstructorsManagement = () => {
  const [state, setState] = useState({
    rowData: {},
    isDetail: false,
  });

  return (
    <Layout>
      {state.isDetail ? (
        <LectureDetail state={state} setState={setState} />
      ) : (
        <InstructorList state={state} setState={setState} />
      )}
    </Layout>
  );
};

export default InstructorsManagement;
