import React, { useState, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Typography from "@material-ui/core/Typography";

import { Grid, InputBase } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";

// apiObject
import { apiObject } from "../../api";

// hooks
import useLoadingFunction from "../../Hooks/useLoadingFunction";

//immer
import { produce, setAutoFreeze } from "immer";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    // width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const SearchDialog = (props) => {
  const classes = useStyles();
  const { onChange } = props;
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = useState([]);
  const ref = useRef();
  const loadingFunction = useLoadingFunction();
  let selectedData = {};

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setRows([]);
    setOpen(false);
  };
  const handleSetInstructor = () => {
    if (selectedData) {
      if (selectedData.name) {
        setRows([]);
        setOpen(false);
        onChange(selectedData);
      } else {
        alert("해당 강사는 아직 선택할 수 없습니다. 강사 정보가 부족합니다.");
      }
    }
  };

  const handleListCmsLecturers = async (search_name) => {
    try {
      let responseListCmsLecturers = await apiObject.listCmsLecturers(
        {
          search_name: search_name,
          current_page: 1,
        },
        loadingFunction
      );
      console.log({ responseListCmsLecturers });

      setRows(
        responseListCmsLecturers.data.items.map((x, i) => {
          // console.log({ x });
          return {
            id: i + 1,
            user_no: x.tb_lecturer_content.user_no,
            user_name: x.tb_user.user_name,
            user_email: x.tb_user.user_email,
            name: x.tb_lecturer_content.lecturer_name,
            title: x.tb_lecturer_content.lecturer_title,
            department_no: x.lecturer_department_no,
            department: x?.tb_lecturer_department?.code_information["ko-KR"],
            divison: x.tb_lecturer_content.lecturer_division,
          };
        })
      );

      // let instructorList = JSON.parse(JSON.stringify(responseListCmsLecturers)).map((x)=>{

      // })

      // produce(responseListCmsLecturers, (draft) => {
      //   draft.map((x) => {
      //     console.log({ x });
      //   });
      // });
    } catch (error) {
      alert(error);
      console.log("Error", error);
      console.log("Error", error.code);
      console.log("Error", error.message);
      console.log("Error", error.response.data);
    }
  };
  React.useEffect(() => {
    handleListCmsLecturers("", loadingFunction);
  }, []);
  React.useEffect(() => {
    selectedData = rows[0];
  }, [rows]);

  const columns = [
    // { field: "id", headerName: "ID", width: 70 },

    { field: "user_name", headerName: "회원명", width: 130 },
    { field: "user_email", headerName: "email", width: 180 },
    { field: "name", headerName: "강사명", width: 130 },
    { field: "title", headerName: "직위", width: 90 },
    {
      field: "department",
      headerName: "진료과",
      // type: "number",
      width: 130,
    },
    {
      field: "divison",
      headerName: "소속",
      // type: "number",
      // width: "100%",
    },
  ];

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <SearchIcon />
      </IconButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth={"md"}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Grid container justify="center" spacing={1}>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <SearchIcon />
                <Grid item>
                  <InputBase
                    placeholder="강사명 검색…"
                    inputRef={ref}
                    onKeyUp={(e) => {
                      e.key === "Enter" &&
                        handleListCmsLecturers(
                          ref.current.value,
                          loadingFunction
                        );
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      handleListCmsLecturers(
                        ref.current.value,
                        loadingFunction
                      );
                    }}
                  >
                    검색
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={100}
              // checkboxSelection
              // disableMultipleSelection
              hideFooter
              onSelectionChange={(e) => {
                selectedData = e.rows[0];
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSetInstructor} color="primary">
            강사명 선택
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default SearchDialog;
