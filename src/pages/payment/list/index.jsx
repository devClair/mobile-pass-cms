import React, { useEffect } from "react";

import Layout from "./../../../layout/";
import { Grid, Checkbox, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Wrapper from "./styles";

import { Route, useHistory } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb";

import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import TableHeader from "../../../components/table-headerV2";
import Table from "../../../components/table";
import TableFooter from "../../../components/table-footerV3";

import {
  TableHeaderSortSpan,
  SearchFilter,
  DatePicker,
} from "../../../components/table-header-column";

import {
  ExcelDownloadButton,
  TablePagination,
} from "../../../components/table-footer-component";

import { AdjustmentDialog } from "../dialog";

// redux
import { useDispatch, useSelector } from "react-redux";

// viewLogic
import { useViewLogic } from "./viewLogic";

const useStyles = makeStyles((theme) => ({}));

const List = (props) => {
  const { match } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const reducer = useSelector((state) => state.reducer);

  const payment = reducer.payment;

  const history = useHistory();

  const { save } = useViewLogic();

  const onChangeOrderColumn = ({ order_column, order_type }) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "payment",
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
        reducer_type: "payment",
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
    payment.search_type_data.map((typeInfo, index) => {
      list_params[typeInfo.search_column] = null;
    });

    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "payment",
        list_params: {
          ...list_params,
          [menuItem]: searchText,
          current_page: 1,
        },
      },
    });
  };

  const onRowClick = (rowData) => {
    history.push(`${match.url}/detail/${rowData.lecture_no}`);
  };

  const onShowPaymentModal = () => {
    // history.push(`${match.url}/create`);
    setOpen(true);
  };

  const onPageNoClick = (n) => {
    console.log("onPageNoClick -> n", n);

    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "payment",
        list_params: {
          current_page: n,
        },
      },
    });
  };

  const onClickExcelButton = async (params) => {
    return await save();
  };

  const tableColumns = [
    {
      title: "번호",
      field: "lecture_no",
    },
    {
      title: "강의명",
      field: "lecture_title",
    },
    {
      title: "강사명",
      field: "lecturer_name",
    },
    {
      title: "생성일",
      field: "createdAt",
      render: (rowData) => new Date(rowData.createdAt).yyyymmdd(),
    },
    {
      title: "결제 수",
      field: "income_count",
    },
    {
      title: "시청 완료수",
      field: "sales_count",
    },
    {
      title: "총 결제",
      field: "sales_total_sum",
    },
    {
      title: "총 시청 완료한 수",
      field: "sales_lecture_sum",
    },
    {
      title: "현재 판매가",
      field: "current_real_price",
    },
  ];

  const tableHeaderColumns = [
    {
      component: (
        <TableHeaderSortSpan
          order_key="lecture_no"
          order_data={reducer.sort_span_dic["lecture_no"]}
          order_column={payment?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="income_count"
          order_data={reducer.sort_span_dic["income_count"]}
          order_column={payment?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="reg_lecture_count"
          order_data={reducer.sort_span_dic["reg_lecture_count"]}
          order_column={payment?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="sales_count"
          order_data={reducer.sort_span_dic["sales_count"]}
          order_column={payment?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="current_real_price"
          order_data={reducer.sort_span_dic["current_real_price"]}
          order_column={payment?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="createdAt"
          order_data={reducer.sort_span_dic["createdAt"]}
          order_column={payment?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    // {
    //   component: (
    //     <TableHeaderSortSpan
    //       order_key="payment_state"
    //       order_data={reducer.sort_span_dic["payment_state"]}
    //       order_column={payment?.list_params?.order_column}
    //       onChange={onChangeOrderColumn}
    //     />
    //   ),
    // },
    // {
    //   component: (
    //     <TableHeaderSortSpan
    //       order_key="state"
    //       order_data={reducer.sort_span_dic["state"]}
    //       order_column={payment?.list_params?.order_column}
    //       onChange={onChangeOrderColumn}
    //     />
    //   ),
    // },
    {
      component: (
        <DatePicker
          filter_dt={payment.list_params.filter_end_dt}
          onChange={onChangeDateColumn}
        />
      ),
    },
    {
      component: (
        <SearchFilter
          search_type_data={payment.search_type_data}
          onChange={onChangeSearchColumn}
        />
      ),
    },
  ];

  const leftRows = [
    {
      component: <ExcelDownloadButton onDownload={onClickExcelButton} />,
    },
    {
      component: (
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditOutlinedIcon />}
            onClick={onShowPaymentModal}
          >
            정산보기
          </Button>
        </Grid>
      ),
    },
  ];

  const rightRows = [];

  const pagination = {
    component: (
      <TablePagination
        count={payment.payment_data.total_page}
        page={
          payment.list_params.current_page
            ? payment.list_params.current_page
            : 1
        }
        onClick={onPageNoClick}
      />
    ),
  };

  return (
    <Wrapper>
      <Grid className="customer">
        <Grid className="table_wrap">
          <TableHeader
            titleComponent={<Breadcrumb title="결제 관리" text="" />}
            columns={tableHeaderColumns}
          />
          <Grid className="table">
            <Table
              data={payment.payment_data.data}
              columns={tableColumns}
              onRowClick={onRowClick}
              options={{
                pageSize: 10,
                paging: true,
              }}
            />
          </Grid>

          <TableFooter
            leftRows={leftRows}
            rightRows={rightRows}
            pagination={pagination}
          />
          <AdjustmentDialog open={open} setOpen={setOpen} />
        </Grid>
      </Grid>
    </Wrapper>
  );
};
export default List;
