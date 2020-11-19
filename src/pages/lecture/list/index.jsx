import React, { useEffect } from "react";

import Layout from "./../../../layout/";
import { Grid, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Wrapper from "./styles";

import { Route, useHistory } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb";

// import TableHeader from "../../../components/table-header";
// import Table from "../../../components/table";
// import TableFooter from "../../../components/table-footer";

import TableHeader from "../../../components/table-headerV2";
import Table from "../../../components/table";
import TableFooter from "../../../components/table-footerV2";
import {
  TableHeaderSortSpan,
  SearchFilter,
  DatePicker,
} from "../../../components/table-header-column";

// redux
import { useDispatch, useSelector } from "react-redux";

// viewLogic
import { useViewLogic } from "./viewLogic";

// react-data-export
import ReactExport from "react-data-export";
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const useStyles = makeStyles((theme) => ({
  upload_button: {
    color: "white",
    backgroundColor: "rgba(76,175,80,1.0)",
  },
  formControl: {
    // maxHeight: 16.5,
    "& .MuiOutlinedInput-input": {
      paddingTop: "16.5px",
      paddingBottom: "16.5px",
    },
  },
  api_help: {
    color: "#ec407a !important",
  },
  checkbox: {
    // height: "unset!important",
    // marginTop: "5px",
    color: "rgba(0, 0, 0, 0.54)!important",
  },
  default_text: {
    width: "264",
    paddingLeft: "5",
    color: "rgb(200, 200, 200)!important",
  },
}));

const List = (props) => {
  const { match } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const reducer = useSelector((state) => state.reducer);

  const lecture = reducer.lecture;

  const history = useHistory();

  const { save } = useViewLogic();

  const tableColumns = [
    {
      title: "번호",
      field: "lecture_no",
    },
    {
      title: "진료과",
      field: "department_id",
      render: (rowData) => rowData.tb_lecture_department.code_id,
    },
    {
      title: "진료학",
      field: "faculty_id",
      render: (rowData) => rowData.tb_lecture_faculty.code_id,
    },
    {
      title: "강의명",
      field: "lecture_title",
      render: (rowData) => rowData.tb_lecture_content.lecture_title,
    },
    {
      title: "강사명",
      field: "user_no",
      render: (rowData) =>
        rowData.tb_lecturer.tb_lecturer_content.lecturer_name,
    },
    {
      title: "게시일",
      field: "live_begin_dt",
      render: (rowData) => new Date(rowData.live_begin_dt).yyyymmdd(),
    },
    {
      title: "업로드 일시",
      field: "createdAt",
      render: (rowData) => new Date(rowData.createdAt).yyyymmdd(),
    },
    {
      title: "조회수",
      field: "view_count",
    },
    {
      title: "가중치",
      field: "best_bare_order_weight",
    },
    {
      title: "Best노출",
      field: "best_bare_state",
      type: "boolean",
      // render: (rowData) => (rowData.best_bare_state == 1 ? true : false),
      render: (rowData) => (
        <Checkbox
          checked={rowData.best_bare_state == 1 ? true : false}
          className={classes.checkbox}
          disabled
        />
      ),
    },
    {
      title: "상태",
      field: "lecture_state",
      type: "boolean",
      // render: (rowData) => (rowData.lecture_state == 1 ? true : false),
      render: (rowData) => (
        <Checkbox
          checked={rowData.lecture_state == 1 ? true : false}
          className={classes.checkbox}
          disabled
        />
      ),
    },
  ];

  const onChangeOrderColumn = ({ order_column, order_type }) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "lecture",
        list_params: {
          order_column,
          order_type,
          current_page: 1,
        },
      },
    });
  };

  const onChangeDateColumn = ({ filter_begin_dt, filter_end_dt }) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "lecture",
        list_params: {
          filter_begin_dt,
          filter_end_dt,
          current_page: 1,
        },
      },
    });
  };

  const onChangeSearchColumn = ({ searchText, menuItem }) => {
    // 선택한 search_type value 초기화
    var list_params = {};
    lecture.search_type_data.map((typeInfo, index) => {
      list_params[typeInfo.search_column] = null;
    });

    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "lecture",
        list_params: {
          ...list_params,
          [menuItem]: searchText,
          current_page: 1,
        },
      },
    });
  };

  const tableHeaderColumns = [
    {
      component: (
        <TableHeaderSortSpan
          order_key="lecture_no"
          order_data={reducer.sort_span_dic["lecture_no"]}
          order_column={lecture?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="live_begin_dt"
          order_data={reducer.sort_span_dic["live_begin_dt"]}
          order_column={lecture?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="createdAt"
          order_data={reducer.sort_span_dic["createdAt"]}
          order_column={lecture?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="best_bare_order_weight"
          order_data={reducer.sort_span_dic["best_bare_order_weight"]}
          order_column={lecture?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="best_bare_state"
          order_data={reducer.sort_span_dic["best_bare_state"]}
          order_column={lecture?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="lecture_state"
          order_data={reducer.sort_span_dic["lecture_state"]}
          order_column={lecture?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    // {
    //   component: (
    //     <TableHeaderSortSpan
    //       order_key="state"
    //       order_data={reducer.sort_span_dic["state"]}
    //       order_column={lecture?.list_params?.order_column}
    //       onChange={onChangeOrderColumn}
    //     />
    //   ),
    // },
    // {
    //   component: (
    //     <DatePicker
    //       filter_dt={lecture.list_params.filter_end_dt}
    //       onChange={onChangeDateColumn}
    //     />
    //   ),
    // },
    {
      component: (
        <SearchFilter
          search_type_data={lecture.search_type_data}
          onChange={onChangeSearchColumn}
        />
      ),
    },
  ];

  const onRowClick = (rowData) => {
    history.push(`${match.url}/detail/${rowData.lecture_no}`);
  };

  const goToCreate = () => {
    history.push(`${match.url}/create`);
  };

  const onPageNoClick = (n) => {
    console.log("onPageNoClick -> n", n);

    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "lecture",
        list_params: {
          current_page: n,
        },
      },
    });
  };

  const onClickExcelButton = async (params) => {
    return await save();
  };

  return (
    <Wrapper>
      <Grid className="customer">
        <Grid className="table_wrap">
          <TableHeader
            titleComponent={<Breadcrumb title="강의 관리" text="" />}
            columns={tableHeaderColumns}
          />
          <Grid className="table">
            <Table
              data={lecture.lecture_data.data}
              columns={tableColumns}
              onRowClick={onRowClick}
              options={{
                pageSize: 10,
                paging: true,
              }}
            />
          </Grid>

          <TableFooter
            data={lecture.lecture_data.data}
            count={lecture.lecture_data.total_page}
            page={
              lecture.list_params.current_page
                ? lecture.list_params.current_page
                : 1
            }
            excel={true}
            onChangeCallback={onPageNoClick}
            createButton={true}
            goToCreate={goToCreate}
            onExcelDownload={onClickExcelButton}
          ></TableFooter>
        </Grid>
      </Grid>
    </Wrapper>
  );
};
export default List;
