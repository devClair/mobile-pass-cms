import React, { useEffect, useState } from "react";

import Layout from "./../../../layout/";
import { Grid, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Wrapper from "./styles";

import { Route, useHistory } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb";

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
  grayCheckbox: {
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

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const lecturer = reducer.lecturer;
  const history = useHistory();
  const { save } = useViewLogic();
  // console.log({ lecturer });

  const tableColumns = [
    {
      title: "번호",
      field: "user_no",
    },
    {
      title: "회원명",
      field: "department_no",
      render: (rowData) => rowData?.tb_user?.user_name,
    },

    // {
    //   title: "소속",
    //   field: "code_id",
    //   render: (rowData) => rowData?.tb_lecturer_content?.lecturer_division,
    // },
    {
      title: "진료과",
      field: "department_no",
      render: (rowData) => rowData?.tb_lecturer_department?.code_id,
    },
    {
      title: "강사명",
      field: "lecturer_name",
      render: (rowData) => rowData?.tb_lecturer_content?.lecturer_name,
    },
    {
      title: "직위",
      field: "lecturer_title",
      render: (rowData) => rowData?.tb_lecturer_content?.lecturer_title,
    },
    {
      title: "소속",
      field: "lecturer_division",
      render: (rowData) => rowData?.tb_lecturer_content?.lecturer_division,
    },
    {
      title: "가입일",
      field: "createdAt",
      render: (rowData) => new Date(rowData?.createdAt).yyyymmdd(),
    },
    // {
    //   title: "강사 권한 부여",
    //   field: "lecturer_status",
    //   type: "boolean",
    //   // render: (rowData) => (rowData.lecture_state == 1 ? true : false),
    //   render: (rowData) => (
    //     <Checkbox
    //       checked={rowData.tb_user.lecturer_status == 1 ? true : false}
    //       className={classes.checkbox}
    //       disabled
    //     />
    //   ),
    // },
    {
      title: "강사권한",
      field: "lecturer_status",
      type: "boolean",
      // render: (rowData) => (rowData.lecture_state == 1 ? true : false),
      render: (rowData) => (
        <Checkbox
          checked={rowData?.tb_user.lecturer_status == 1 ? true : false}
          color="default"
          disabled
        />
      ),
    },
    {
      title: "메인노출",
      field: "best_lecturer_state",
      type: "boolean",
      // render: (rowData) => (rowData.lecture_state == 1 ? true : false),
      render: (rowData) => (
        <Checkbox
          checked={rowData?.best_lecturer_state == 1 ? true : false}
          disabled
        />
      ),
    },
  ];

  const onChangeOrderColumn = ({ order_column, order_type }) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "lecturer",
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
        reducer_type: "lecturer",
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
    lecturer.search_type_data.map((typeInfo, index) => {
      list_params[typeInfo.search_column] = null;
    });

    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "lecturer",
        list_params: {
          ...list_params,
          [menuItem]: searchText,
          current_page: 1,
          // current_type : menuItem
        },
      },
    });
  };

  const tableHeaderColumns = [
    {
      component: (
        <TableHeaderSortSpan
          order_key="user_no"
          order_data={reducer.sort_span_dic["user_no"]}
          order_column={lecturer?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="createdAt"
          order_data={reducer.sort_span_dic["createdAt"]}
          order_column={lecturer?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="best_lecturer_state"
          order_data={reducer.sort_span_dic["best_lecturer_state"]}
          order_column={lecturer?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    // {
    //   component: (
    //     <DatePicker
    //       filter_dt={lecturer.list_params.filter_end_dt}
    //       onChange={onChangeDateColumn}
    //     />
    //   ),
    // },
    {
      component: (
        <SearchFilter
          search_type_data={lecturer.search_type_data}
          onChange={onChangeSearchColumn}
        />
      ),
    },
  ];

  const onRowClick = (rowData) => {
    history.push(`${match.url}/detail/${rowData.user_no}`);
  };

  const goToCreate = () => {
    history.push(`${match.url}/create`);
  };

  const onPageNoClick = (n) => {
    console.log("onPageNoClick -> n", n);

    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "lecturer",
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
            titleComponent={<Breadcrumb title="강사진 관리" text="" />}
            columns={tableHeaderColumns}
          />
          <Grid className="table">
            <Table
              data={lecturer.lecturer_data.data}
              columns={tableColumns}
              onRowClick={onRowClick}
              options={{
                pageSize: 10,
                paging: true,
              }}
            />
          </Grid>
          <TableFooter
            data={lecturer.lecturer_data.data}
            count={lecturer.lecturer_data.total_page}
            page={
              lecturer.list_params.current_page
                ? lecturer.list_params.current_page
                : 1
            }
            excel={true}
            onChangeCallback={onPageNoClick}
            // createButton={true}
            // goToCreate={goToCreate}
            onExcelDownload={onClickExcelButton}
          ></TableFooter>
        </Grid>
      </Grid>
    </Wrapper>
  );
};
export default List;
