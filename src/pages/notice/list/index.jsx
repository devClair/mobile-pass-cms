import React, { useEffect, useState } from "react";

// ui

import Layout from "./../../../layout/";
import { Grid, Chip, Checkbox, AppBar, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Wrapper from "./styles";
import { Route, useHistory } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb";
import TableHeader from "../../../components/table-headerV2";
import Table from "../../../components/table";
import TableFooter from "../../../components/table-footerV2";
import {
  TableHeaderSortSpan,
  DatePicker,
  SearchFilter,
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

const a11yProps = (index, type) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    type: type,
  };
};

const List = (props) => {
  const { match } = props;
  const classes = useStyles();

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const notice = reducer.notice;
  const history = useHistory();
  const { save } = useViewLogic();

  const tableColumns = [
    {
      title: "번호",
      field: "notice_no",
    },
    {
      title: "작성자",
      field: "user_name",
      render: (rowData) => rowData.tb_notice_user.user_name,
    },
    {
      title: "제목",
      field: "notice_title",
      // render: (rowData) => rowData.notice_title,
    },
    {
      title: "작성일자 일시",
      field: "createdAt",
      render: (rowData) => new Date(rowData.createdAt).yyyymmdd(),
    },
    {
      title: "조회수",
      field: "view_count",
    },
    {
      title: "노출 가중치",
      field: "notice_order_weight",
    },
    {
      title: "노출 허용",
      field: "notice_state",
      type: "boolean",
      // render: (rowData) => (rowData.lecture_state == 1 ? true : false),
      render: (rowData) => (
        <Checkbox
          checked={!!rowData.notice_state}
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
        reducer_type: "notice",
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
        reducer_type: "notice",
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
        reducer_type: "notice",
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
        <TableHeaderSortSpan
          order_key="notice_no"
          order_data={reducer.sort_span_dic["notice_no"]}
          order_column={notice?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="createdAt"
          order_data={reducer.sort_span_dic["createdAt"]}
          order_column={notice?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="view_count"
          order_data={reducer.sort_span_dic["view_count"]}
          order_column={notice?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="notice_order_weight"
          order_data={reducer.sort_span_dic["notice_order_weight"]}
          order_column={notice?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="notice_state"
          order_data={reducer.sort_span_dic["notice_state"]}
          order_column={notice?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <DatePicker
          filter_dt={notice.list_params.filter_end_dt}
          onChange={onChangeDateColumn}
        />
      ),
    },
    // {
    //   component: (
    //     <SearchFilter
    //       search_type_data={notice.search_type_data}
    //       onChange={onChangeSearchColumn}
    //     />
    //   ),
    // },
  ];
  const goToDetail = (rowData) => {
    history.push(`${match.url}/detail/${rowData.notice_no}`);
  };

  const goToCreate = () => {
    history.push(`${match.url}/create`);
  };

  const onPageNoClick = (n) => {
    console.log("onPageNoClick -> n", n);
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "notice",
        list_params: {
          current_page: n,
        },
      },
    });
  };

  const onClickExcelButton = async (params) => {
    return await save();
  };

  const handleChange = (event, newValue) => {
    // setBannerType(newValue);
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "notice",
        list_params: {
          tab_index: newValue,
          notice_type: notice.tab_type_data[newValue].type,
        },
      },
    });
  };

  return (
    <Wrapper>
      <Grid className="customer">
        <Grid className="table_wrap">
          <TableHeader
            titleComponent={<Breadcrumb title="Notice 관리" text="" />}
            columns={tableHeaderColumns}
          />
          <AppBar position="static">
            <Tabs
              value={
                notice.list_params.tab_index ? notice.list_params.tab_index : 0
              }
              onChange={handleChange}
              aria-label="table tabs"
            >
              {notice.tab_type_data.map((type_data, index) => {
                return (
                  <Tab
                    key={index}
                    label={type_data.value}
                    // banner_type={type_data.type}
                    {...a11yProps(index, type_data.type)}
                  />
                );
              })}
            </Tabs>
          </AppBar>
          <Grid className="table">
            <Table
              data={notice.notice_data.data}
              columns={tableColumns}
              onRowClick={goToDetail}
              options={{
                pageSize: 10,
                paging: true,
              }}
            />
          </Grid>
          <TableFooter
            data={notice.notice_data.data}
            count={notice.notice_data.total_page}
            page={
              notice.list_params.current_page
                ? notice.list_params.current_page
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
