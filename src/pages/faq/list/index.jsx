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
  const faq = reducer.faq;
  const history = useHistory();
  const { save } = useViewLogic();

  const tableColumns = [
    {
      title: "번호",
      field: "faq_no",
    },
    {
      title: "언어",
      field: "locale",
    },
    {
      title: "문의 제목",
      field: "faq_title",
      // render: (rowData) => rowData.tb_lecture_department.code_id,
    },
    {
      title: "정렬 가중치",
      field: "faq_order_weight",
      // render: (rowData) => new Date(rowData.createdAt).yyyymmdd(),
    },
    {
      title: "업로드 일시",
      field: "createdAt",
      render: (rowData) => new Date(rowData.createdAt).yyyymmdd(),
    },
    {
      title: "노출 허용",
      field: "faq_status",
      type: "boolean",
      // render: (rowData) => (rowData.lecture_state == 1 ? true : false),
      render: (rowData) => (
        <Checkbox
          checked={rowData.faq_status == 1 ? true : false}
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
        reducer_type: "faq",
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
        reducer_type: "faq",
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
        reducer_type: "faq",
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
          order_key="faq_no"
          order_data={reducer.sort_span_dic["faq_no"]}
          order_column={faq?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="faq_title"
          order_data={reducer.sort_span_dic["faq_title"]}
          order_column={faq?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="createdAt"
          order_data={reducer.sort_span_dic["createdAt"]}
          order_column={faq?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="faq_order_weight"
          order_data={reducer.sort_span_dic["faq_order_weight"]}
          order_column={faq?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },

    {
      component: (
        <TableHeaderSortSpan
          order_key="faq_status"
          order_data={reducer.sort_span_dic["faq_status"]}
          order_column={faq?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <DatePicker
          filter_dt={faq.list_params.filter_end_dt}
          onChange={onChangeDateColumn}
        />
      ),
    },
    // {
    //   component: (
    //     <SearchFilter
    //       search_type_data={faq.search_type_data}
    //       onChange={onChangeSearchColumn}
    //     />
    //   ),
    // },
  ];

  const onRowClick = (rowData) => {
    history.push(`${match.url}/detail/${rowData.faq_no}`);
  };

  const goToCreate = () => {
    history.push(`${match.url}/create`);
  };

  const onPageNoClick = (n) => {
    console.log("onPageNoClick -> n", n);

    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "faq",
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
            titleComponent={<Breadcrumb title="FAQ 관리" text="" />}
            columns={tableHeaderColumns}
          />
          <Grid className="table">
            <Table
              data={faq.faq_data.data}
              columns={tableColumns}
              onRowClick={onRowClick}
              options={{
                pageSize: 10,
                paging: true,
              }}
            />
          </Grid>
          <TableFooter
            data={faq.faq_data.data}
            count={faq.faq_data.total_page}
            page={
              faq.list_params.current_page ? faq.list_params.current_page : 1
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
