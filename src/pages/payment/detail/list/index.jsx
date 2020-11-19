import React, { useEffect } from "react";

import Layout from "./../../../../layout/";
import { Grid, Checkbox, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Wrapper from "./styles";

import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";

import { Route, useHistory } from "react-router-dom";
import Breadcrumb from "../../../../components/breadcrumb";
import TableHeader from "../../../../components/table-headerV2";
import Table from "../../../../components/table";
import TableFooter from "../../../../components/table-footerV3";
import {
  TableHeaderSortSpan,
  SearchFilter,
  DatePicker,
  TypeSelectMenu,
} from "../../../../components/table-header-column";

import {
  ExcelDownloadButton,
  TablePagination,
} from "../../../../components/table-footer-component";

import {
  AdjustmentDialog,
  SendEmailFormDialog,
  SendSmsFormDialog,
} from "../dialog";

// redux
import { useDispatch, useSelector } from "react-redux";

// viewLogic
import { useViewLogic } from "./viewLogic";

const useStyles = makeStyles((theme) => ({}));

const List = (props) => {
  const { lecture_no, match } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [adjustmentDialogOpen, setAdjustmentDialogOpen] = React.useState(false);
  const [sendEmailFormDialogOpen, setSendEmailFormDialogOpen] = React.useState(
    false
  );
  const [sendSmsFormDialogOpen, setSendSmsFormDialogOpen] = React.useState(
    false
  );

  const reducer = useSelector((state) => state.reducer);

  const reg_lecture = reducer.reg_lecture;

  const history = useHistory();

  const { save, sendEmail, sendSms } = useViewLogic(lecture_no);

  const onChangeOrderColumn = ({ order_column, order_type }) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "reg_lecture",
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
        reducer_type: "reg_lecture",
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
    reg_lecture.search_type_data.map((typeInfo, index) => {
      list_params[typeInfo.search_column] = null;
    });

    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "reg_lecture",
        list_params: {
          ...list_params,
          [menuItem]: searchText,
          current_page: 1,
        },
      },
    });
  };

  const onChangeTypeSeletMenu = ({ index, key, value, type }) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "reg_lecture",
        list_params: {
          user_type: type !== "all" ? type : null,
          // order_type,
          // current_page: 1,
        },
      },
    });
  };

  const onRowClick = (rowData) => {
    history.push(`${match.url}/detail/${rowData.user_no}`);
  };

  const goToCreate = () => {
    history.push(`${match.url}/create`);
  };

  const goBack = () => {
    history.goBack();
  };

  const onPageNoClick = (n) => {
    console.log("onPageNoClick -> n", n);

    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "reg_lecture",
        list_params: {
          current_page: n,
        },
      },
    });
  };

  const onClickExcelButton = async (params) => {
    return await save();
  };

  const onShowAdjustmentDialog = () => {
    setAdjustmentDialogOpen(true);
  };

  const onShowSendEmailFormDialog = () => {
    setSendEmailFormDialogOpen(true);
  };

  const onShowSendSmsFormDialog = () => {
    // history.push(`${match.url}/create`);
    setSendSmsFormDialogOpen(true);
  };

  const tableColumns = [
    {
      title: "번호",
      field: "reg_lecture_no",
    },
    {
      title: "유저타입",
      field: "user_type",
      render: (rowData) => rowData.tb_user.user_type,
    },
    {
      title: "진료과",
      field: "user_name",
      render: (rowData) => rowData.tb_user.tb_user_department.code_id,
    },
    {
      title: "이름",
      field: "user_name",
      render: (rowData) => rowData.tb_user.user_name,
    },
    {
      title: "이메일 주소",
      field: "user_email",
      render: (rowData) => rowData.tb_user.user_email,
    },
    {
      title: "결제 수단",
      field: "sales_count", //TODO: 결제 수단
    },
    {
      title: "결제 금액",
      field: "real_price",
    },
    {
      title: "승인",
      field: "reg_lecture_state",
    },
    {
      title: "결제 일시",
      field: "createdAt",
      render: (rowData) => new Date(rowData.createdAt).yyyymmdd(),
    },
  ];

  const tableHeaderColumns = [
    {
      component: (
        <TableHeaderSortSpan
          order_key="real_price"
          order_data={reducer.sort_span_dic["real_price"]}
          order_column={reg_lecture?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <TableHeaderSortSpan
          order_key="createdAt"
          order_data={reducer.sort_span_dic["createdAt"]}
          order_column={reg_lecture?.list_params?.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
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
        <DatePicker
          filter_dt={reg_lecture.list_params.filter_end_dt}
          onChange={onChangeDateColumn}
        />
      ),
    },
    {
      component: (
        <SearchFilter
          search_type_data={reg_lecture.search_type_data}
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
            onClick={onShowAdjustmentDialog}
          >
            정산보기
          </Button>
        </Grid>
      ),
    },
    {
      component: (
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SendOutlinedIcon />}
            onClick={onShowSendEmailFormDialog}
          >
            이메일 발송
          </Button>
        </Grid>
      ),
    },
    {
      component: (
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SendOutlinedIcon />}
            onClick={onShowSendSmsFormDialog}
          >
            문자 발송
          </Button>
        </Grid>
      ),
    },
  ];

  const rightRows = [
    // {
    //   component: (
    //     <Grid item>
    //       <Button
    //         variant="contained"
    //         color="primary"
    //         startIcon={<EditOutlinedIcon />}
    //         onClick={goToCreate}
    //       >
    //         작성하기
    //       </Button>
    //     </Grid>
    //   ),
    // },
    {
      component: (
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditOutlinedIcon />}
            onClick={goBack}
          >
            전체목록
          </Button>
        </Grid>
      ),
    },
  ];

  const pagination = {
    component: (
      <TablePagination
        count={reg_lecture.reg_lecture_data.total_page}
        page={
          reg_lecture.list_params.current_page
            ? reg_lecture.list_params.current_page
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
            // columns={[]}
          />
          <Grid className="table">
            <Table
              data={reg_lecture.reg_lecture_data.data}
              columns={tableColumns}
              // onRowClick={onRowClick}
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
          <AdjustmentDialog
            open={adjustmentDialogOpen}
            setOpen={setAdjustmentDialogOpen}
          />
          <SendEmailFormDialog
            open={sendEmailFormDialogOpen}
            setOpen={setSendEmailFormDialogOpen}
            sendCallback={sendEmail}
          />
          <SendSmsFormDialog
            open={sendSmsFormDialogOpen}
            setOpen={setSendSmsFormDialogOpen}
            sendCallback={sendSms}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};
export default List;
