import React, { useEffect, useState } from "react";

import Wrapper from "./styles";
import { Grid, Button, Link } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

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
    <Wrapper>
      <Grid container justify="space-between" className="table_footer">
        <Grid item className="btn_excel">
          {excel && (
            <button
              variant="contained"
              className="btn_excel"
              onClick={onClickExcelButton}
            >
              엑셀저장
            </button>
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
        <Grid className="table_pagination">
          <Pagination
            page={page}
            count={count}
            onChange={(e, n) => {
              console.log("TableFooter -> n", n);
              if (onChangeCallback) {
                onChangeCallback(n);
              }
            }}
          />
        </Grid>
        {createButton && (
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditOutlinedIcon />}
              onClick={goToCreate}
            >
              작성하기
            </Button>
          </Grid>
        )}
        {goBackButton && (
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditOutlinedIcon />}
              onClick={onBackCallback}
            >
              전체목록
            </Button>
          </Grid>
        )}
      </Grid>
    </Wrapper>
  );
};

export default TableFooter;
