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
  Chip,
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

import { useViewLogic } from "./viewLogic";

import {
  TableRowContainer,
  SelectComponent,
  TextFieldComponent,
  DatePickerComponent,
  CheckBoxComponent,
  SearchFieldComponent,
  WysiwygComponent,
} from "../../../components/table-row-component";

const useStyles = makeStyles((theme) => ({
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

const DetailComponent = (props) => {
  const classes = useStyles();

  const { inquiry, inquiry_no } = props;

  const { update } = useViewLogic({ inquiry_no });

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const history = useHistory();
  const [isEditable, setIsEditable] = useState(false);
  const [modalSw, setModalSw] = useState(false);

  const [state, setState] = useState({
    inquiry_no: inquiry.inquiry_no,
    inquiry_title: inquiry.inquiry_title, //제목
    inquiry_username: inquiry.tb_inquiry_user.user_name, //작성자
    inquiry_lecture_title:
      inquiry?.tb_inquiry_lecture?.tb_lecture_content?.lecture_title, //강의명
    inquiry_type: inquiry.inquiry_type, //분류
    response_state: inquiry.response_state, //상태
    inquiry_status: inquiry.inquiry_status, //노출허용
    createdAt: inquiry.createdAt, //작성일시
    inquiry_content: inquiry.inquiry_content, //문의내용
    response_title: inquiry.response_title, //답변제목
    response_content: inquiry.response_content, //답변내용
  });

  const inquiry_type_text = [
    { key: "lecture", value: "강의문의" },
    { key: "payment", value: "결제문의" },
  ];

  const onsubmit = () => {
    setTimeout(() => {
      update({
        inquiry_no: state.inquiry_no,
        response_title: state.response_title,
        response_content: state.response_content,
        inquiry_state: state.inquiry_status,
      });
    }, 1000);
  };

  useEffect(() => {
    setState({
      ...state,
      inquiry_no: inquiry.inquiry_no,
      inquiry_title: inquiry.inquiry_title, //제목
      inquiry_username: inquiry.tb_inquiry_user.user_name, //작성자
      inquiry_lecture_title:
        inquiry?.tb_inquiry_lecture?.tb_lecture_content?.lecture_title, //강의명
      inquiry_type: inquiry.inquiry_type, //분류
      response_state: inquiry.response_state, //상태
      inquiry_status: inquiry.inquiry_status, //노출허용
      createdAt: inquiry.createdAt, //작성일시
      inquiry_content: inquiry.inquiry_content, //문의내용
      response_title: inquiry.response_title, //답변제목
      response_content: inquiry.response_content, //답변내용
    });
  }, [isEditable, inquiry]);

  const rows = [
    {
      title: "제목",
      field: "inquiry_title",
      isFullWidth: false,
      component: (
        <Typography variant="subtitle1">{state.inquiry_title}</Typography>
      ),
    },
    {
      title: "작성자",
      field: "inquiry_username",
      isFullWidth: false,
      component: (
        <Typography variant="subtitle1">{state.inquiry_username}</Typography>
      ),
    },
    {
      title: "강의명",
      field: "inquiry_lecture_title",
      isFullWidth: false,
      component: (
        <Typography variant="subtitle1">
          {state.inquiry_lecture_title}
        </Typography>
      ),
    },
    {
      title: "분류",
      field: "inquiry_type",
      isFullWidth: false,
      component: (
        <Typography variant="subtitle1">
          {inquiry_type_text.find((x) => x.key === state.inquiry_type).value}
        </Typography>
      ),
    },

    // {
    //   title: "노출허용",
    //   field: "inquiry_status",
    //   isFullWidth: false,
    //   component: (
    //     <CheckBoxComponent
    //       isEditable={isEditable}
    //       checked={state.inquiry_status}
    //       onChange={(e) => {
    //         setState({ ...state, inquiry_status: e.target.checked });
    //       }}
    //       message={`※ 체크 시 문의목록에 노출됩니다`}
    //     />
    //   ),
    // },
    {
      title: "상태",
      field: "response_state",
      isFullWidth: false,
      component: (
        <Box px={2}>
          {state.response_state ? (
            <Chip label={"답변완료"} variant="default" color={"primary"} />
          ) : (
            <Chip label={"답변대기"} variant="default" color={"default"} />
          )}
        </Box>
      ),
    },

    {
      title: "작성일시",
      field: "createdAt",
      isFullWidth: false,
      component: (
        <Typography variant="subtitle1">
          {format(new Date(state.createdAt), "yyyy-MM-dd hh:mm:ss")}
        </Typography>
      ),
    },

    {
      title: "문의내용",
      field: "inquiry_content",
      isFullWidth: true,
      component: (
        <TextFieldComponent
          isEditable={false}
          value={state.inquiry_content}
          multiline={true}
          rows={10}
        />
        // <Typography variant="subtitle1">{state.inquiry_content}</Typography>
      ),
    },

    {
      title: "답변제목",
      field: "response_title",
      isFullWidth: true,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
          value={state.response_title}
          onChange={(event) => {
            setState({ ...state, response_title: event.target.value });
          }}
          fullWidth
        />
      ),
    },
    {
      title: "답변내용",
      field: "response_content",
      isFullWidth: true,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
          value={state.response_content}
          multiline={true}
          rows={10}
          onChange={(event) => {
            setState({ ...state, response_content: event.target.value });
          }}
          fullWidth
        />
        // <WysiwygComponent
        //   isEditable={isEditable}
        //   value={state.response_content}
        //   onChange={(value) => {
        //     setState({ ...state, response_content: value });
        //   }}
        // />
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
              <Breadcrumb pb={0} title="강의관리" text="" />
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    color={"default"}
                    startIcon={
                      isEditable ? (
                        <ClearOutlinedIcon />
                      ) : (
                        <FormatListBulletedOutlinedIcon />
                      )
                    }
                    onClick={() => {
                      if (isEditable) {
                        setIsEditable(false);
                      } else {
                        history.goBack();
                      }
                    }}
                  >
                    {isEditable ? "취소" : "나가기"}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color={isEditable ? "primary" : "default"}
                    startIcon={
                      isEditable ? <SaveOutlinedIcon /> : <EditOutlinedIcon />
                    }
                    onClick={() => {
                      setIsEditable(!isEditable);
                      if (isEditable) {
                        onsubmit();
                      }
                    }}
                  >
                    {isEditable ? "저장" : "수정"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* detail table */}
      <Grid item xs={12} className={classes.table_container}>
        <Grid container>
          {rows.map((x) => {
            return (
              <TableRowContainer
                title={x.title}
                component={x.component}
                isFullWidth={x.isFullWidth}
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

const Detail = (props) => {
  const { match } = props;
  const reducer = useSelector((state) => state.reducer);

  var inquiry_no = parseInt(match.params.inquiry_no);

  const { get } = useViewLogic({
    inquiry_no,
  });

  const inquiry = reducer.inquiry.inquiry_data.data.find(
    (x) => x.inquiry_no === inquiry_no
  );
  console.log("inquiry", inquiry);

  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {inquiry ? (
        <DetailComponent inquiry={inquiry} inquiry_no={inquiry_no} />
      ) : (
        <div>데이터 없음</div>
      )}
    </>
  );
};

export default Detail;
