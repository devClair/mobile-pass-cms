import React, { useEffect, useRef } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Breadcrumb from "../../../components/breadcrumb";
import Table from "../../../components/table";
import TableHeader from "../../../components/table-headerV2";
import TableFooter from "../../../components/table-footerV3";

import { DatePicker } from "../../../components/table-header-column";

import {
  ExcelDownloadButton,
  TablePagination,
} from "../../../components/table-footer-component";

// redux
import { useDispatch, useSelector } from "react-redux";

// viewLogic
import { useViewLogic } from "./viewLogic";

import { useReactToPrint } from "react-to-print";

const AdjustmentComponent = (props) => {
  const dispatch = useDispatch();

  const { handlePrint } = props;

  const reducer = useSelector((state) => state.reducer);

  const adjustment = reducer.adjustment;

  const {} = useViewLogic();

  const onChangeDateColumn = ({ filter_begin_dt, filter_end_dt }) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "adjustment",
        list_params: {
          filter_begin_dt,
          filter_end_dt,
          current_page: 1,
        },
      },
    });
  };

  const onPageNoClick = (n) => {
    console.log("onPageNoClick -> n", n);

    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "adjustment",
        list_params: {
          current_page: n,
        },
      },
    });
  };

  const tableColumns = [
    {
      title: "강사명",
      field: "lecturer_name",
    },
    {
      title: "등록 수",
      field: "income_count",
    },
    {
      title: "등록 합계",
      field: "income_total_sum",
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
      title: "강사 수입",
      field: "sales_lecture_sum",
    },
  ];

  const tableHeaderColumns = [
    {
      component: (
        <DatePicker
          filter_dt={adjustment.list_params.filter_end_dt}
          onChange={onChangeDateColumn}
        />
      ),
    },
  ];

  const rightRows = [
    {
      component: (
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            // startIcon={<EditOutlinedIcon />}
            onClick={handlePrint}
          >
            인쇄
          </Button>
        </Grid>
      ),
    },
  ];

  const pagination = {
    component: (
      <TablePagination
        count={adjustment.adjustment_data.total_page}
        page={
          adjustment.list_params.current_page
            ? adjustment.list_params.current_page
            : 1
        }
        onClick={onPageNoClick}
      />
    ),
  };

  return (
    <>
      <TableHeader
        titleComponent={<Breadcrumb title="결제 내역" text="" />}
        columns={tableHeaderColumns}
      />

      <Table
        data={adjustment.adjustment_data.data}
        columns={tableColumns}
        options={{
          pageSize: 10,
          paging: true,
        }}
      />
      <TableFooter
        // leftRows={leftRows}
        rightRows={rightRows}
        pagination={pagination}
      />
      <Grid
        style={{
          //   height: "10",
          padding: 10,
        }}
      ></Grid>
    </>
  );
};

export const AdjustmentDialog = (props) => {
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <Dialog
        open={open}
        maxWidth={"md"}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        ref={componentRef}
      >
        <DialogContent>
          <AdjustmentComponent handlePrint={handlePrint} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
