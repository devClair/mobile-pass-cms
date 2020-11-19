import React, { useEffect, useState } from "react";

import Layout from "./../../../layout/";
import { Grid, Checkbox, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Wrapper from "./styles";

import { Route, useHistory, Link } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb";

import TableHeader from "../../../components/table-headerV2";
import Table from "../../../components/table";
import TableFooter from "../../../components/table-footerV2";
import {
  TableHeaderSortSpan,
  SearchFilter,
  DatePicker,
  TypeSelectMenu,
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

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const user = reducer.user;
  const history = useHistory();
  const { save } = useViewLogic();

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
      field: "department_no",
      render: (rowData) => rowData?.tb_user_department?.code_id,
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
      title: "가입 일자",
      field: "createdAt",
      render: (rowData) => new Date(rowData.createdAt).yyyymmdd(),
    },
    {
      title: "강사 권한 부여",
      field: "lecturer_status",
      type: "boolean",
      render: (rowData) => (
        <Checkbox
          checked={rowData.lecturer_status === 1 ? true : false}
          className={classes.checkbox}
          disabled
        />
      ),
    },
    // {
    //   title: "강사 권한 부여",
    //   field: "user_status",
    //   type: "boolean",
    //   // render: (rowData) => (rowData.lecture_state == 1 ? true : false),
    //   render: (rowData) => (
    //     <Checkbox
    //       checked={rowData.tb_user.user_status == 1 ? true : false}
    //       className={classes.checkbox}
    //       disabled
    //     />
    //   ),
    // },

    // {
    //   title: "메인 노출",
    //   field: "best_user_state",
    //   type: "boolean",
    //   // render: (rowData) => (rowData.lecture_state == 1 ? true : false),
    //   render: (rowData) => (
    //     <Checkbox
    //       checked={rowData.best_user_state == 1 ? true : false}
    //       className={classes.checkbox}
    //       disabled
    //     />
    //   ),
    // },
  ];

  const onChangeTypeSeletMenu = ({ index, key, value, type }) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "user",
        list_params: {
          user_type: type !== "all" ? type : null,
          // order_type,
          // current_page: 1,
        },
      },
    });
  };

  const onChangeOrderColumn = ({ order_column, order_type }) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "user",
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
        reducer_type: "user",
        list_params: {
          filter_begin_dt,
          filter_end_dt,
          current_page: 1,
        },
      },
    });
  };

  const onChangeSearchColumn = ({ searchText, menuItem }) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "user",
        list_params: {
          [menuItem]: searchText,
          current_page: 1,
        },
      },
    });
  };

  const tableHeaderColumns = [
    {
      component: (
        <TypeSelectMenu
          type_data={reducer.user_type_data}
          onChange={onChangeTypeSeletMenu}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="user_name"
          order_data={reducer.sort_span_dic["user_name"]}
          order_column={user?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="createdAt"
          order_data={reducer.sort_span_dic["createdAt"]}
          order_column={user?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="lecturer_status"
          order_data={reducer.sort_span_dic["lecturer_status"]}
          order_column={user?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <DatePicker
          filter_dt={user.list_params.filter_end_dt}
          onChange={onChangeDateColumn}
        />
      ),
    },
    // {
    //   component: (
    //     <SearchFilter
    //       search_type_data={user.search_type_data}
    //       onChange={onChangeSearchColumn}
    //     />
    //   ),
    // },
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
        reducer_type: "user",
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
            titleComponent={<Breadcrumb title="회원 관리" text="" />}
            columns={tableHeaderColumns}
          />
          <Grid className="table">
            <Table
              data={user.user_data.data}
              columns={tableColumns}
              onRowClick={onRowClick}
              options={{
                pageSize: 10,
                paging: true,
              }}
            />
          </Grid>
          <TableFooter
            data={user.user_data.data}
            count={user.user_data.total_page}
            page={
              user.list_params.current_page ? user.list_params.current_page : 1
            }
            excel={true}
            onChangeCallback={onPageNoClick}
            createButton={false}
            goToCreate={goToCreate}
            onExcelDownload={onClickExcelButton}
          ></TableFooter>
        </Grid>
      </Grid>
    </Wrapper>
  );
};
export default List;
