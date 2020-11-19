import React, { useContext, useState, useRef, useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../../layout";
import {
  Container,
  Grid,
  IconButton,
  Button,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  TextField,
  Typography,
  Box,
} from "@material-ui/core";

import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

//-------------------------------------------
// date-fns
import {
  subMonths,
  addMonths,
  startOfToday,
  endOfToday,
  format,
  endOfMonth,
} from "date-fns";

import {
  makeStyles,
  styled,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import FormatListBulletedOutlinedIcon from "@material-ui/icons/FormatListBulletedOutlined";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import { Pagination } from "@material-ui/lab";
import Wrapper from "./styles";
import { useHistory } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb";
import Radio from "../../../components/radio";
import { Modal } from "../../../components/modal/";
import ButtonType from "../../../components/button-type/";

import SearchDialog from "../../../components/search-dialog";
import ChipsArray from "../../../components/chips-array";

import { useViewLogic } from "./viewLogic";

import Dropzone from "../../../components/dropzone";
import {
  TableRowContainer,
  SelectComponent,
  TextFieldComponent,
  DatePickerComponent,
  CheckBoxComponent,
  SearchFieldComponent,
  WysiwygComponent,
  SliderComponent,
} from "../../../components/table-row-component";

const useStyles = makeStyles((theme) => ({
  upload_button: {
    color: "white",
    backgroundColor: "rgba(76,175,80,1.0)",
  },
  outlinedCustom: {
    // maxHeight: 16.5,
    "& .MuiOutlinedInput-input": {
      paddingTop: 14,
      paddingBottom: 16,
    },
  },
  api_help: {
    color: "#ec407a !important",
  },
  checkbox: {
    height: "unset!important",
    marginTop: "5px",
    // color: "rgba(0, 0, 0, 0.26)!important",
  },
  table_container: {
    backgroundColor: "white",
    // border: "2px solid white",
  },
  row_container: {
    minHeight: 52,
    borderBottom: "1px solid white",
  },
  row_item: {
    height: "100%",
  },
  row_title: {
    height: "100%",
  },
  row_title_text_container: {
    height: "100%",
    backgroundColor: "#ddd",
    paddingLeft: "5px",
    paddingRight: "5px",
    // borderRadius: "3px",
  },
  row_title_text: {
    wordBreak: "keep-all",
    fontWeight: 500,
    lineHeight: "1.3",
    // "& .MuiTypography-subtitle1": {
    // lineHeight: "1.3",
    // },
  },
  row_content: {
    height: "100%",
    paddingLeft: "10px",
    paddingRight: "10px",
    // "& .MuiOutlinedInput-input": {
    //   padding: "5px 5px 7px 5px",
    // },
    "& .MuiTypography-subtitle1": {
      paddingLeft: "15px",
    },
  },
  row_content_text_container: {
    height: "100%",
  },
  // text_field: {
  //   padding: "6px 15px 7px 15px",
  // },
  text_area: {
    width: "calc(100% - 180px)",
    backgroundColor: "white",
  },
}));

const CreateComponent = (props) => {
  const classes = useStyles();

  // const { notice, notice_no } = props;

  const { createCmsNotice } = useViewLogic();

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const history = useHistory();
  const [isEditable, setIsEditable] = useState(true);
  const [modalSw, setModalSw] = useState(false);

  const [state, setState] = useState({
    notice_title: "", //제목
    notice_content: "", //공지내용
    notice_state: false, //노출허용
    notice_order_weight: 0, //가중치

    // notice_img_no: notice.notice_img_no, //가중치
  });

  const onsubmit = () => {
    createCmsNotice({
      ...state,
      notice_state: +state.notice_state,
    });
  };

  useEffect(() => {
    //   setState({
    //     ...state,
    //     notice_no: notice.notice_no,
    //     notice_title: notice.notice_title,
    //     notice_content: notice.notice_content,
    //   });
  }, [isEditable]);

  const rows = [
    {
      title: "작성일",
      field: "createdAt",
      isFullWidth: false,
      component: (
        <TextFieldComponent
          isEditable={false}
          value={format(new Date(), "yyyy-MM-dd")}
        />
      ),
    },
    {
      title: "순서",
      field: "notice_order_weight",
      isFullWidth: false,
      component: (
        <SliderComponent
          isEditable={true}
          value={state.notice_order_weight}
          onChange={(value) => {
            setState({ ...state, notice_order_weight: value });
          }}
          marks={reducer.banner.marks}
        />
      ),
    },
    {
      title: "공지제목",
      field: "notice_title",
      isFullWidth: false,
      component: (
        <TextFieldComponent
          isEditable={true}
          value={state.notice_title}
          onChange={(event) => {
            setState({ ...state, notice_title: event.target.value });
          }}
        />
      ),
    },

    {
      title: "메인노출",
      field: "notice_state",
      isFullWidth: false,
      component: (
        <CheckBoxComponent
          isEditable={true}
          checked={state.notice_state}
          onChange={(e) => {
            setState({ ...state, notice_state: e.target.checked });
          }}
          // message={`※ 체크 시 배너가 노출됩니다`}
        />
      ),
    },

    // {
    //   title: "공지이미지",
    //   field: "banner_image",
    //   isFullWidth: true,
    //   component: (
    //     <div className="profile_img">
    //       <Dropzone
    //         isEditable={true}
    //         // currentImage={banner.tb_banner_img.full_file_path}
    //       ></Dropzone>
    //     </div>
    //   ),
    // },
    {
      title: "공지내용",
      field: "notice_content",
      isFullWidth: true,
      component: (
        <TextFieldComponent
          isEditable={true}
          value={state.notice_content}
          onChange={(event) => {
            setState({ ...state, notice_content: event.target.value });
          }}
          multiline={true}
          rows={10}
        />
      ),
    },
  ];

  return (
    // <Wrapper isEditable={isEditable}>
    <Grid container>
      {/* detail top */}
      <Grid item xs={12}>
        <Box pb={4}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Breadcrumb pb={0} title="공지작성" text="" />
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    color={"default"}
                    startIcon={<FormatListBulletedOutlinedIcon />}
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    나가기
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color={"primary"}
                    startIcon={<SaveOutlinedIcon />}
                    onClick={() => {
                      setIsEditable(!isEditable);
                      if (isEditable) {
                        onsubmit();
                      }
                    }}
                  >
                    {"업로드"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* detail table */}
      <Grid item xs={12} className={classes.table_container}>
        {/* <TableRowContainer
          isEditable={isEditable}
          handleChange={handleChange}
          department={department}
          currentDepartment={currentDepartment}
          lecture={lecture}
          lecture_diseaseRef={lecture_diseaseRef}
        /> */}
        <Grid container>
          {rows.map((x, index) => {
            return (
              <TableRowContainer
                // isEditable={isEditable}
                // handleChange={handleChange}
                // department={department}
                // currentDepartment={currentDepartment}
                // lecture={lecture}
                // lecture_diseaseRef={lecture_diseaseRef}
                title={x.title}
                component={x.component}
                isFullWidth={x.isFullWidth}
                key={index}
              />
            );
          })}
        </Grid>

        <ul></ul>
      </Grid>

      {/* detail bottom */}
      <Grid item xs={12}>
        <Box mt={4}>
          <Grid container justify="flex-end" className="btn_wrap">
            <ButtonType
              title="목록"
              className="gray"
              onClick={() => {
                history.goBack();
                // setState({ ...state, isDetail: false });
              }}
            />
            {/* <ButtonType
            title="삭제하기"
            onClick={() => {
              setModalSw(true);
              // setModalOverflow(true);
            }}
          /> */}
          </Grid>
        </Box>
      </Grid>
      {modalSw && (
        <Modal title="소비자정보를 삭제하시겠습니까?">
          <Grid container justify="center" className="btn_wrap">
            <Grid
              item
              onClick={() => {
                setModalSw(false);
                // setModalOverflow(false);
              }}
            >
              확인
            </Grid>
            <Grid
              item
              onClick={() => {
                setModalSw(false);
                // setModalOverflow(false);
              }}
            >
              취소
            </Grid>
          </Grid>
        </Modal>
      )}
    </Grid>
    // </Wrapper>
  );
};

const Create = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({
        type: "SET_ACCEPTED_FILE",
        payload: {
          img: "",
          file: "",
        },
      });
    };
  }, []);

  return (
    <>
      <CreateComponent />
    </>
  );
};

export default Create;
