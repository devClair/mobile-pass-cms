import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  makeStyles,
  Box,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Breadcrumb from "../../../../components/breadcrumb";
import Table from "../../../../components/table";
import TableHeader from "../../../../components/table-headerV2";
import TableFooter from "../../../../components/table-footerV3";

import { DatePicker } from "../../../../components/table-header-column";

import { WysiwygComponent } from "../../../../components/wysiwyg";

import {
  ExcelDownloadButton,
  TablePagination,
} from "../../../../components/table-footer-component";

// redux
import { useDispatch, useSelector } from "react-redux";

// viewLogic
import { useViewLogic } from "./viewLogic";

import { useReactToPrint } from "react-to-print";

const AdjustmentComponent = (props) => {
  const { lecture_no, handlePrint } = props;

  const dispatch = useDispatch();

  const reducer = useSelector((state) => state.reducer);

  const adjustment = reducer.adjustment;

  const {} = useViewLogic(lecture_no);

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
      title: "강의명",
      field: "lecture_title",
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
  const { open, setOpen, lecture_no } = props;

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
          <AdjustmentComponent
            lecture_no={lecture_no}
            handlePrint={handlePrint}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  wysiwyg_wrapper: {
    border: "solid 1px #dddddd",
    // padding: "20px",
    height: "500px",
  },
  sub_title: {
    marginBottom: "10px",
    fontWeight: "700",
    fontSize: "16px",
    color: "#484848",
  },
}));

// TODO : email 발송 관련, 및 api 제막 필요

export const SendEmailFormDialog = (props) => {
  const classes = useStyles();

  const { open, setOpen, sendCallback } = props;

  const [data, setData] = useState({
    title: "",
    body: "",
  });

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSend = async () => {
    console.log("handleSend -> data", data);

    if (sendCallback) {
      await sendCallback(data);
    }
    setOpen(false);

    setData({
      title: "",
      body: "",
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        maxWidth={"md"}
        fullWidth={true}
        // onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Email 발송</DialogTitle>
        <DialogContent>
          <Box pt={2}>
            <Typography className={classes.sub_title}>Title</Typography>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label=""
              // type="email"
              fullWidth
              value={data.title}
              onChange={(e) => {
                setData((state) => ({
                  ...state,
                  title: e.target.value,
                }));
              }}
            />
          </Box>
          <Box pt={2}>
            <Typography className={classes.sub_title}>Message</Typography>
            <WysiwygComponent
              value={"테스트"}
              isEditable={true}
              onChange={(text) => {
                setData((state) => ({
                  ...state,
                  body: text,
                }));
              }}
              wrapperClassName={classes.wysiwyg_wrapper}
              editorClassName={classes.wysiwyg_wrapper}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSend} color="primary">
            send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export const SendSmsFormDialog = (props) => {
  const classes = useStyles();
  const { open, setOpen, sendCallback } = props;

  // const [data, setData] = useState({
  //   title: "",
  //   body: "",
  // });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSend = async () => {
    console.log("handleSend -> data", {
      title,
      body,
    });

    if (sendCallback) {
      await sendCallback({
        title,
        body,
      });
    }
    setOpen(false);

    setTitle("");
    setBody("");
  };

  return (
    <div>
      <Dialog
        open={open}
        maxWidth={"md"}
        fullWidth={true}
        // onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">sms 발송</DialogTitle>
        <DialogContent>
          <Box pt={2}>
            <Typography className={classes.sub_title}>Title</Typography>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label=""
              // type="email"
              value={title}
              fullWidth
              onChange={(e) => {
                console.log(
                  "SendSmsFormDialog -> e.target.value",
                  e.target.value
                );
                setTitle(e.target.value);
              }}
            />
          </Box>
          <Box pt={2}>
            <Typography className={classes.sub_title}>Message</Typography>
            <TextField
              autoFocus
              margin="dense"
              id="body"
              label=""
              // type="email"
              value={body}
              fullWidth
              onChange={(e) => {
                console.log(
                  "SendSmsFormDialog -> e.target.value",
                  e.target.value
                );
                setBody(e.target.value);
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSend} color="primary">
            send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
