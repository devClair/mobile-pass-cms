import React, { useEffect, useState } from "react";

// ui

import Layout from "./../../../layout/";
import { Grid, Checkbox } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
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

//-------------------------------------------
// date-fns
import { format } from "date-fns";

// component
import { RatioContainer } from "../../../components/ratio-container";

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
  const banner = reducer.banner;
  const history = useHistory();
  const {} = useViewLogic();

  const handleChange = (event, newValue) => {
    // setBannerType(newValue);
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "banner",
        list_params: {
          tab_index: newValue,
          banner_type: banner.tab_type_data[newValue].type,
        },
      },
    });
  };

  const tableColumns = [
    {
      title: "번호",
      field: "banner_no",
    },

    {
      title: "이미지",
      field: "full_file_path",
      render: (rowData) => (
        <RatioContainer w={1640} h={268}>
          <img
            src={rowData.tb_banner_img.full_file_path}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </RatioContainer>
      ),
    },
    // {
    //   title: "분류",
    //   field: "banner_type",
    //   // render: (rowData) => new Date(rowData.createdAt).yyyymmdd(),
    // },
    {
      title: "코드",
      field: "banner_title",
    },
    {
      title: "설명",
      field: "banner_content",
    },
    {
      title: "가중치",
      field: "banner_order_weight",
    },
    // {
    //   title: "작성자",
    //   field: "user_no",
    //   render: (rowData) => rowData.tb_banner_user.user_no,
    // },
    {
      title: "업로드일시",
      field: "createdAt",
      render: (rowData) => format(new Date(rowData.createdAt), "yyyy-MM-dd"),
    },

    {
      title: "수정일시",
      field: "updatedAt",
      render: (rowData) => format(new Date(rowData.updatedAt), "yyyy-MM-dd"),
    },
    {
      title: "상태",
      field: "banner_state",
      type: "boolean",
      // render: (rowData) => (rowData.lecture_state == 1 ? true : false),
      render: (rowData) => (
        <Checkbox
          checked={rowData.banner_state == 1 ? true : false}
          className={classes.checkbox}
          disabled
        />
      ),
    },
  ];

  const onChangeOrderColum = ({ order_column, order_type }) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "banner",
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
          order_column={banner?.list_params?.order_column}
          onChange={onChangeOrderColum}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="createdAt"
          order_data={reducer.sort_span_dic["createdAt"]}
          order_column={banner?.list_params?.order_column}
          onChange={onChangeOrderColum}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="no"
          order_data={reducer.sort_span_dic["no"]}
          order_column={banner?.list_params?.order_column}
          onChange={onChangeOrderColum}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="state"
          order_data={reducer.sort_span_dic["state"]}
          order_column={banner?.list_params?.order_column}
          onChange={onChangeOrderColum}
        />
      ),
    },
  ];

  const goToDetail = (rowData) => {
    history.push(`${match.url}/detail/${rowData.banner_no}`);
  };

  const goToCreate = () => {
    history.push(`${match.url}/create`);
  };

  const onPageNoClick = (e, n) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "banner",
        list_params: {
          current_page: n,
        },
      },
    });
  };

  useEffect(() => {
    console.log({ banner });
  }, [banner]);

  return (
    <Wrapper>
      <Grid className="customer">
        <Grid className="table_wrap">
          <TableHeader
            titleComponent={<Breadcrumb title="Banner" text="" />}
            columns={[]}
          />

          <AppBar position="static">
            <Tabs
              value={
                banner.list_params.tab_index ? banner.list_params.tab_index : 0
              }
              onChange={handleChange}
              aria-label="table tabs"
            >
              {banner.tab_type_data.map((type_data, index) => {
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
              data={banner.banner_data.data}
              columns={tableColumns}
              onRowClick={goToDetail}
              options={{
                pageSize: 10,
                paging: true,
              }}
            />
          </Grid>

          <TableFooter
            data={banner.banner_data.data}
            count={banner.banner_data.total_page}
            page={banner.list_params.current_page}
            excel={false}
            onChangeCallback={onPageNoClick}
            createButton={true}
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
