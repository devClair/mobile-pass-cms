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
  selectOutlined: {
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

  const { notice, notice_no } = props;

  const { updateNoticeData, deleteCmsNotice } = useViewLogic({ notice_no });

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const history = useHistory();
  const [isEditable, setIsEditable] = useState(false);
  const [modalSw, setModalSw] = useState(false);

  const [state, setState] = useState({
    notice_no: notice.notice_no,

    notice_title: notice.notice_title, //제목
    notice_content: notice.notice_content, //문의내용
    notice_state: !!notice.notice_state, //노출허용
    notice_order_weight: notice.notice_order_weight, //가중치

    // notice_img_no: notice.notice_img_no, //가중치
  });

  const notice_type_text = [
    { key: "lecture", value: "강의문의" },
    { key: "payment", value: "결제문의" },
  ];

  const onsubmit = () => {
    updateNoticeData({
      ...state,
      notice_state: +state.notice_state,
    });
  };

  useEffect(() => {
    setState({
      ...state,
      notice_no: notice.notice_no,
      notice_title: notice.notice_title,
      notice_content: notice.notice_content,
      notice_state: !!notice.notice_state,
      notice_order_weight: notice.notice_order_weight,
    });
  }, [isEditable, notice]);

  const rows = [
    {
      title: "작성일",
      field: "createdAt",
      isFullWidth: false,
      component: (
        <TextFieldComponent
          isEditable={false}
          value={format(new Date(notice.createdAt), "yyyy-MM-dd")}
        />
      ),
    },
    {
      title: "순서",
      field: "notice_order_weight",
      isFullWidth: false,
      component: (
        <SliderComponent
          isEditable={isEditable}
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
          isEditable={isEditable}
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
          isEditable={isEditable}
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
    //   field: "notice_img",
    //   isFullWidth: true,
    //   component: (
    //     <div className="profile_img">
    //       <Dropzone
    //         isEditable={isEditable}
    //         currentImage={notice?.tb_image?.full_file_path}
    //       />
    //     </div>
    //   ),
    // },
    {
      title: "공지내용",
      field: "notice_content",
      isFullWidth: true,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
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
              <Breadcrumb pb={0} title="공지관리" text="" />
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
          {rows.map((x, index) => {
            return (
              <TableRowContainer
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
            <ButtonType
              title="삭제하기"
              onClick={() => {
                deleteCmsNotice({
                  notice_no: state.notice_no,
                });
              }}
            />
          </Grid>
        </Box>
      </Grid>
      {/* {modalSw && (
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
      )} */}
    </Grid>
    // </Wrapper>
  );
};

const Detail = (props) => {
  const { match } = props;
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  var notice_no = parseInt(match.params.notice_no);

  const { getNoticeData } = useViewLogic({
    notice_no,
  });

  const notice = reducer.notice.notice_data.data.find(
    (x) => x.notice_no === notice_no
  );
  console.log("notice", notice);

  useEffect(() => {
    getNoticeData();

    return () => {
      dispatch({
        type: "SET_ACCEPTED_FILE",
        payload: {
          img: "",
          file: "",
        },
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>{notice && <DetailComponent notice={notice} notice_no={notice_no} />}</>
  );
};

export default Detail;
