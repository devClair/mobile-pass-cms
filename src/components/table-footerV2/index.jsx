import React, { useEffect, useState } from "react";

import Wrapper from "./styles";
import { Grid, Button, Link } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";

import ReactExport from "react-data-export";
import { Pagination } from "@material-ui/lab";

// redux
import { useDispatch } from "react-redux";

import NewWindow from "react-new-window";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const useStyles = makeStyles((theme) => ({
  a_button: {
    border: "2px solid #F2C200",
    padding: 8,
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "rgba(242,194,0,0.5)",
      color: "white",
    },
  },
  tableFooter: {
    padding: theme.spacing(2),
    "@media (min-width: 1280px)": {
      padding: theme.spacing(5, 5, 10, 5),
    },
  },
  footerCenter: {
    display: "flex",
    justifyContent: "center",
  },
  footerRight: {
    display: "flex",
    justifyContent: "flex-end",
    "& button": {
      margin: theme.spacing(0, 1),
    },
  },
  pagination: {
    "& .MuiPaginationItem-sizeSmall": { margin: "0 4px" },
  },
}));

const TableFooter = (props) => {
  const {
    data,
    count,
    page,
    excel,
    onChangeCallback,
    createButton,
    goToCreate,
    onExcelDownload,
    goBackButton,
    onBackCallback,
  } = props;

  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [excelUrl, setExcelUrl] = useState(null);

  const onClickExcelButton = async () => {
    if (onExcelDownload) {
      setIsOpen(true);
      // setExcelUrl(await onExcelDownload());
    }
  };

  const onOpen = async () => {
    console.log("onOpen");
    if (onExcelDownload) {
      var url = await onExcelDownload();

      if (url !== "fail") {
        setIsOpen(true);
        setExcelUrl(url);
      } else {
        setIsOpen(false);
      }
    }
  };

  const onUnload = () => {
    console.log("onUnload");
    setIsOpen(false);
    setExcelUrl(null);
  };

  const onBlock = () => {
    console.log("onBlock");
  };

  return (
    <Grid container justify="space-between" className={classes.tableFooter}>
      <Grid item xs={12} md={3} lg={4} className={classes.footerLeft}>
        {/* footerLeft */}
      </Grid>
      <Grid item xs={12} md={6} lg={4} className={classes.footerCenter}>
        {/* footerCenter */}
        <Pagination
          color="primary"
          shape="rounded"
          size="small"
          page={page}
          count={count}
          onChange={(e, n) => {
            console.log("TableFooter -> n", n);
            if (onChangeCallback) {
              onChangeCallback(n);
            }
          }}
          showFirstButton
          showLastButton
          className={classes.pagination}
        />
      </Grid>
      <Grid item xs={12} md={3} lg={4} className={classes.footerRight}>
        {/* footerRight */}
        {createButton && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditOutlinedIcon />}
            onClick={goToCreate}
          >
            작성하기
          </Button>
        )}
        {goBackButton && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditOutlinedIcon />}
            onClick={onBackCallback}
          >
            전체목록
          </Button>
        )}
        {excel && (
          <Button
            variant="contained"
            startIcon={<SaveOutlinedIcon />}
            onClick={onClickExcelButton}
          >
            엑셀저장
          </Button>
        )}
        {isOpen && (
          <NewWindow
            onOpen={onOpen}
            onBlock={onBlock}
            onUnload={onUnload}
            title={"다운로드"}
          >
            <Grid
              container
              alignItems={"center"}
              justify={"center"}
              style={{
                // backgroundColor: "red",
                height: "100vh",
              }}
            >
              <Grid item>
                {!excelUrl ? (
                  <CircularProgress color="inherit" />
                ) : (
                  <a href={excelUrl} className={classes.a_button}>
                    다운로드
                  </a>
                )}
              </Grid>
            </Grid>
          </NewWindow>
        )}
      </Grid>
    </Grid>
  );
};

export default TableFooter;
