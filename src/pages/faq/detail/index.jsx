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

import Dropzone from "../../../components/dropzone";
import SearchDialog from "../../../components/search-dialog";
import ChipsArray from "../../../components/chips-array";

import { useCmsLectures } from "./viewLogic";

import {
  TableRowContainer,
  TextFieldComponent,
  CheckBoxComponent,
  SliderComponent,
} from "../../../components/table-row-component";

// const theme = createMuiTheme({
//   override: {
//     MuiInputBase: {
//       input: {
//         paddingTop: 14,
//         paddingBottom: 16,
//         backgroundColor: "red",
//       },
//     },
//   },
// });

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

const DetailComponent = (props) => {
  const classes = useStyles();

  const { faq, faq_no } = props;

  const { updateCmsFaq } = useCmsLectures({ faq_no });

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const history = useHistory();
  const [isEditable, setIsEditable] = useState(false);
  const [modalSw, setModalSw] = useState(false);

  const [state, setState] = useState({
    faq_no: faq.faq_no,
    faq_title: faq.faq_title,
    faq_content: faq.faq_content,
    faq_status: !!faq.faq_status,
    faq_order_weight: faq.faq_order_weight,
  });

  const onsubmit = () => {
    return updateCmsFaq({
      ...state,
      faq_status: +state.faq_status,
    });
  };

  const handleFormCheck = async () => {
    console.log({ state });

    // const regNumber = /(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/;

    if (state.faq_title === "") {
      alert(`제목은 필수입니다`);
      return;
    }
    if (state.faq_content === "") {
      alert(`답변내용은 필수입니다`);
      return;
    }

    return onsubmit();
  };

  useEffect(() => {
    // console.log(state.possible_date);
    // console.log(lecture?.possible_date);

    setState({
      faq_no: faq.faq_no,
      faq_title: faq.faq_title,
      faq_content: faq.faq_content,
      faq_status: faq.faq_status && true,
      faq_order_weight: faq.faq_order_weight,
    });
    // lecture_no: faq.lecture_no,
    // lecture_department_no: faq.lecture_department_no,
    // disease_info: lecture?.tb_disease_info?.disease_name,
    // lecture_title: lecture?.tb_lecturer.tb_lecturer_content.lecture_title,
    // lecturer_name: lecture?.tb_lecturer.tb_lecturer_content.lecturer_name,

    // lecturer_title: lecture?.tb_lecturer.lecturer_title,
    // possible_date: lecture?.possible_date,
    // live_begin_dt: lecture?.live_begin_dt,
    // best_bare_state: Boolean(lecture?.best_bare_state) ? true : false,
    // lecture_vimeo_url: lecture?.lecture_vimeo_url,
    // lecture_chat_url: lecture?.lecture_chat_url,

    // lecture_state: Boolean(lecture?.lecture_state) ? true : false,
    // lecture_content: lecture?.tb_lecture_content.lecture_content,

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditable]);

  const rows = [
    {
      title: "FAQ 제목",
      field: "faq_title",
      isFullWidth: true,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
          placeholder="FAQ 제목을 입력해주세요"
          value={state.faq_title}
          onChange={(event) => {
            setState({ ...state, faq_title: event.target.value });
          }}
        />
      ),
    },
    {
      title: "노출허용",
      field: "faq_status",
      isFullWidth: false,
      component: (
        <CheckBoxComponent
          isEditable={isEditable}
          checked={state.faq_status}
          onChange={(event) => {
            setState({ ...state, faq_status: event.target.checked });
          }}
        />
      ),
    },
    {
      title: "순서",
      field: "faq_order_weight",
      isFullWidth: false,
      component: (
        <SliderComponent
          isEditable={isEditable}
          value={state.faq_order_weight}
          onChange={(value) => {
            setState({ ...state, faq_order_weight: value });
          }}
          // marks={reducer.banner.marks}
        />
      ),
    },
    {
      title: "답변 내용",
      field: "faq_content",
      isFullWidth: true,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
          placeholder="답변 내용을 입력해주세요"
          value={state.faq_content}
          onChange={(event) => {
            setState({ ...state, faq_content: event.target.value });
          }}
          multiline={true}
          rows={10}
          fullWidth
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

const FaqDetail = (props) => {
  const { match } = props;
  const reducer = useSelector((state) => state.reducer);

  var faq_no = parseInt(match.params.faq_no);

  const {} = useCmsLectures({
    faq_no,
  });

  const faq = reducer.faq.faq_data.data.find((x) => x.faq_no === faq_no);
  console.log("faq", faq);

  return (
    <>
      {faq ? <DetailComponent faq={faq} faq_no={faq_no} /> : <div>테스트</div>}
    </>
  );
};

export default FaqDetail;
