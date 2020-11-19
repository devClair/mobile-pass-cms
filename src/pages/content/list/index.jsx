import React, { useEffect, useState } from "react";

// ui

import Layout from "./../../../layout/";
import { Grid, Chip, Checkbox } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import Wrapper from "./styles";
import { Route, useHistory } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb";
import TableHeader from "../../../components/table-headerV2";
import Table from "../../../components/table";
import TableFooter from "../../../components/table-footerV2";
import { TableHeaderSortSpan } from "../../../components/table-header-column";

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
  const content = reducer.content;
  const history = useHistory();
  const {} = useViewLogic();

  const handleChange = (event, newValue) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "content",
        list_params: {
          tab_index: newValue,
          content_type: content.tab_type_data[newValue].type,
        },
      },
    });
  };

  const tableColumns = [
    {
      title: "번호",
      field: "content_no",
    },
    {
      title: "언어",
      field: "content_locale",
    },

    {
      title: "제목",
      field: "content_title",
      // render: (rowData) => rowData.content_title,
    },
    {
      title: "작성자",
      field: "user_name",
      render: (rowData) => rowData.tb_content_user.user_name,
    },
    {
      title: "변경 일시",
      field: "updatedAt",
      render: (rowData) => new Date(rowData.updatedAt).yyyymmdd(),
    },
    // {
    //   title: "조회수",
    //   field: "view_count",
    // },
    // {
    //   title: "상태",
    //   field: "content_status",
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

  const onChangeOrderColum = ({ order_column, order_type }) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "content",
        list_params: {
          order_column,
          order_type,
          current_page: 1,
        },
      },
    });
  };

  const tableHeaderColumns = [
    {
      component: (
        <TableHeaderSortSpan
          order_key="name"
          order_data={reducer.sort_span_dic["name"]}
          order_column={content?.list_params?.order_column}
          onChange={onChangeOrderColum}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="createdAt"
          order_data={reducer.sort_span_dic["createdAt"]}
          order_column={content?.list_params?.order_column}
          onChange={onChangeOrderColum}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="no"
          order_data={reducer.sort_span_dic["no"]}
          order_column={content?.list_params?.order_column}
          onChange={onChangeOrderColum}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="state"
          order_data={reducer.sort_span_dic["state"]}
          order_column={content?.list_params?.order_column}
          onChange={onChangeOrderColum}
        />
      ),
    },
  ];

  const goToDetail = (rowData) => {
    history.push(`${match.url}/detail/${rowData.content_no}`);
  };

  const goToCreate = () => {
    history.push(`${match.url}/create`);
  };

  const onPageNoClick = (n) => {
    console.log("onPageNoClick -> n", n);
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "content",
        list_params: {
          current_page: n,
        },
      },
    });
  };

  return (
    <Wrapper>
      <Grid className="customer">
        <Grid className="table_wrap">
          <TableHeader
            titleComponent={
              <Breadcrumb title="이용약관, 개인정보처리방침 관리" text="" />
            }
            columns={[]}
          />
          <AppBar position="static">
            <Tabs
              value={
                content.list_params.tab_index
                  ? content.list_params.tab_index
                  : 0
              }
              onChange={handleChange}
              aria-label="table tabs"
            >
              {content.tab_type_data.map((type_data, index) => {
                return (
                  <Tab
                    key={index}
                    label={type_data.value}
                    banner_type={type_data.type}
                    {...a11yProps(index, type_data.type)}
                  />
                );
              })}
            </Tabs>
          </AppBar>
          <Grid className="table">
            <Table
              data={content.content_data.data}
              columns={tableColumns}
              onRowClick={goToDetail}
              options={{
                pageSize: 10,
                paging: true,
              }}
            />
          </Grid>
          <TableFooter
            data={content.content_data.data}
            count={content.content_data.total_page}
            page={
              content.list_params.current_page
                ? content.list_params.current_page
                : 1
            }
            excel={false}
            onChangeCallback={onPageNoClick}
            createButton={false}
            goToCreate={goToCreate}
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
