// react
import React, { useEffect, useState } from "react";

// ui
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Link } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

// icon
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import SaveIcon from "@material-ui/icons/Save";

// lib
import NewWindow from "react-new-window";

const useStylesExcelWindow = makeStyles((theme) => ({
  button: {
    // margin: theme.spacing(1),
  },
}));

const ExecelDownloadWindow = (props) => {
  const { onDownload, setIsOpen } = props;

  const [excelUrl, setExcelUrl] = useState(null);

  const onOpen = async () => {
    if (onDownload) {
      var url = await onDownload();
      console.log("onOpen -> url", url);

      if (url !== "fail") {
        setIsOpen(true);
        setExcelUrl(url);
      } else {
        setIsOpen(false);
      }
    }
  };

  const onUnload = () => {
    setIsOpen(false);
    setExcelUrl(null);
  };

  const onBlock = () => {
    console.log("onBlock");
  };

  const classes = useStylesExcelWindow();

  return (
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
  );
};

const useStylesExcelButton = makeStyles((theme) => ({
  button: {
    // margin: theme.spacing(1),
  },
}));

export const ExcelDownloadButton = (props) => {
  const classes = useStylesExcelButton();

  const { onDownload } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onClick = async () => {
    if (onDownload) {
      setIsOpen(true);
    }
  };

  return (
    <>
      {
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={onClick}
        >
          엑셀저장
        </Button>
      }
      {isOpen && (
        <ExecelDownloadWindow setIsOpen={setIsOpen} onDownload={onDownload} />
      )}
    </>
  );
};
