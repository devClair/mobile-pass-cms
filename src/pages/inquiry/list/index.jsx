import React, { useEffect, useState } from "react";

// ui

import Layout from "./../../../layout/";
import { Grid, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Wrapper from "./styles";
import { Route, useHistory } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb";
import TableHeader from "../../../components/table-headerV2";
import Table from "../../../components/table";
import TableFooter from "../../../components/table-footerV2";
import {
  TableHeaderSortSpan,
  TypeSelectMenu,
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
  const inquiry = reducer.inquiry;
  const history = useHistory();
  const { save } = useViewLogic();

  const tableColumns = [
    {
      title: "번호",
      field: "inquiry_no",
    },
    // {
    //   title: "언어",
    //   field: "locale",
    // },
    {
      title: "분류",
      field: "inquiry_type",
      // render: (rowData) => new Date(rowData.createdAt).yyyymmdd(),
    },
    {
      title: "강의명",
      field: "lecture_title",
      render: (rowData) =>
        rowData.tb_inquiry_lecture?.tb_lecture_content?.lecture_title,
    },
    {
      title: "문의 제목",
      field: "inquiry_title",
      // render: (rowData) => rowData.tb_lecture_department.code_id,
    },
    {
      title: "작성자",
      field: "user_name",
      render: (rowData) => rowData.tb_inquiry_user.user_name,
    },

    {
      title: "작성일자 일시",
      field: "createdAt",
      render: (rowData) => new Date(rowData.createdAt).yyyymmdd(),
    },
    {
      title: "상태",
      field: "response_state",
      type: "boolean",
      // render: (rowData) => (rowData.lecture_state == 1 ? true : false),
      render: (rowData) => (
        <Chip
          label={rowData.response_state ? "답변완료" : "답변대기"}
          variant="default"
          color={rowData.response_state ? "primary" : "default"}
        />
      ),
    },
    // {
    //   title: "상태",
    //   field: "inquiry_status",
    //   type: "boolean",
    //   // render: (rowData) => (rowData.lecture_state == 1 ? true : false),
    //   render: (rowData) => (
    //     <Checkbox
    //       checked={rowData.lecture_state == 1 ? true : false}
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
        reducer_type: "inquiry",
        list_params: {
          inquiry_type: type !== "all" ? type : null,
          // order_type,
          // current_page: 1,
        },
      },
    });
  };

  const onChangeOrderColum = ({ order_column, order_type }) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "inquiry",
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
        reducer_type: "inquiry",
        list_params: {
          filter_begin_dt,
          filter_end_dt,
          current_page: 1,
        },
      },
    });
  };

  const tableHeaderColumns = [
    {
      component: (
        <TypeSelectMenu
          type_data={reducer.inquiry_type_data}
          onChange={onChangeTypeSeletMenu}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="inquiry_no"
          order_data={reducer.sort_span_dic["inquiry_no"]}
          order_column={inquiry?.list_params?.order_column}
          onChange={onChangeOrderColum}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="createdAt"
          order_data={reducer.sort_span_dic["createdAt"]}
          order_column={inquiry?.list_params?.order_column}
          onChange={onChangeOrderColum}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="response_state"
          order_data={reducer.sort_span_dic["response_state"]}
          order_column={inquiry?.list_params?.order_column}
          onChange={onChangeOrderColum}
        />
      ),
    },
    {
      component: (
        <DatePicker
          filter_dt={inquiry.list_params.filter_end_dt}
          onChange={onChangeDateColumn}
        />
      ),
    },
  ];

  const goToDetail = (rowData) => {
    history.push(`${match.url}/detail/${rowData.inquiry_no}`);
  };

  // const goToCreate = () => {
  //   history.push(`${match.url}/create`);
  // };

  const onPageNoClick = (e, n) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "inquiry",
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
            titleComponent={<Breadcrumb title="1-1 문의 관리" text="" />}
            columns={tableHeaderColumns}
          />
          <Grid className="table">
            <Table
              data={inquiry.inquiry_data.data}
              columns={tableColumns}
              onRowClick={goToDetail}
              options={{
                pageSize: 10,
                paging: true,
              }}
            />
          </Grid>
          <TableFooter
            data={inquiry.inquiry_data.data}
            count={inquiry.inquiry_data.total_page}
            page={inquiry.list_params.current_page}
            excel={true}
            onChangeCallback={onPageNoClick}
            createButton={false}
            // goToCreate={goToCreate}
            onExcelDownload={onClickExcelButton}
          >
            {/* {tableColumns.map((x) => {
              return <ExcelColumn label={x.title} value={x.field} />;
            })} */}
          </TableFooter>
        </Grid>
      </Grid>
    </Wrapper>
  );
};
export default List;
