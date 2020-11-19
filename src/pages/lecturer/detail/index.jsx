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

const InstructorDetailComponent = (props) => {
  const classes = useStyles();
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const { instructor, lecturer_no } = props;
  const department_info = reducer.department_info;
  const banklist = reducer.banklist;

  const { update, deleteCmsLecturer } = useViewLogic({ lecturer_no });

  const history = useHistory();
  const [isEditable, setIsEditable] = useState(false);
  const [modalSw, setModalSw] = useState(false);

  const [state, setState] = useState({
    user_name: instructor?.tb_user?.user_name,
    user_email: instructor?.tb_user?.user_email,
    lecturer_name: instructor?.tb_lecturer_content?.lecturer_name,
    lecturer_title: instructor?.tb_lecturer_content?.lecturer_title,
    lecturer_department_no: instructor?.lecturer_department_no,
    lecturer_division: instructor?.tb_lecturer_content?.lecturer_division,
    bank_code_no: instructor?.bank_code_no,
    account_number: instructor?.account_number,
    createdAt: instructor?.tb_lecturer_content?.createdAt,
    lecturer_abstract_title:
      instructor?.tb_lecturer_content?.lecturer_abstract_title,
    lecturer_career: instructor?.tb_lecturer_content?.lecturer_career,
    isExposed: instructor?.best_lecturer_state, //메인노출
    profile_img: {
      img: instructor?.tb_image?.full_file_path,
      file: "",
    },
  });
  // console.log({ instructor });
  // console.log({ state });
  // console.log({ department_info });
  // console.log({ banklist });

  const onsubmit = () => {
    update({
      user_no: lecturer_no,
      // lecturer_introduction_img_no,
      profile_img: state.profile_img,
      lecturer_department_no: state.lecturer_department_no,
      account_number: state.account_number,
      bank_code_no: state.bank_code_no,
      best_lecturer_state: state.isExposed ? 1 : 0,
      lecturer_name: state.lecturer_name,
      lecturer_title: state.lecturer_title,
      lecturer_career: state.lecturer_career,
      lecturer_division: state.lecturer_division,
      lecturer_abstract_title: state.lecturer_abstract_title,

      // lecturer_name_en,
      // lecturer_title_en,
      // lecturer_career_en,
      // lecturer_division_en,
    });
  };

  useEffect(() => {
    setState({
      ...state,
      user_name: instructor?.tb_user?.user_name,
      user_email: instructor?.tb_user?.user_email,
      lecturer_name: instructor?.tb_lecturer_content?.lecturer_name,
      lecturer_title: instructor?.tb_lecturer_content?.lecturer_title,
      lecturer_department_no: instructor?.lecturer_department_no,
      lecturer_division: instructor?.tb_lecturer_content?.lecturer_division,
      bank_code_no: instructor?.bank_code_no,
      account_number: instructor?.account_number,
      createdAt: instructor?.tb_lecturer_content?.createdAt,
      lecturer_abstract_title:
        instructor?.tb_lecturer_content?.lecturer_abstract_title,
      lecturer_career: instructor?.tb_lecturer_content?.lecturer_career,
      isExposed: instructor?.best_lecturer_state, //메인노출
      profile_img: {
        img: instructor?.tb_image?.full_file_path,
        file: "",
      },
    });
  }, [isEditable, instructor]);

  const rows = [
    {
      title: "회원명",
      field: "user_name",
      isFullWidth: false,
      component: <Typography variant="subtitle1">{state.user_name}</Typography>,
    },
    {
      title: "email",
      field: "user_email",
      isFullWidth: false,
      component: (
        <Typography variant="subtitle1">{state.user_email}</Typography>
      ),
    },
    {
      title: "강사명",
      field: "lecturer_name",
      isFullWidth: false,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
          value={state.lecturer_name}
          onChange={(event) => {
            setState({ ...state, lecturer_name: event.target.value });
          }}
        />
      ),
    },
    {
      title: "직위",
      field: "lecturer_title",
      isFullWidth: false,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
          value={state.lecturer_title}
          onChange={(event) => {
            setState({ ...state, lecturer_title: event.target.value });
          }}
        />
      ),
    },
    {
      title: "진료과",
      field: "lecturer_department_no",
      isFullWidth: false,
      component: (
        <SelectComponent
          isEditable={isEditable}
          currentValue={state.lecturer_department_no}
          onChange={(event) => {
            setState({ ...state, lecturer_department_no: event.target.value });
          }}
          menuItems={reducer?.department_info.map((x) => {
            return {
              key: x.code_id,
              value: x.code_no,
            };
          })}
        />
      ),
    },
    {
      title: "소속",
      field: "lecturer_division",
      isFullWidth: false,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
          value={state.lecturer_division}
          onChange={(event) => {
            setState({ ...state, lecturer_division: event.target.value });
          }}
        />
      ),
    },
    {
      title: "입금계좌",
      field: "bank_info",
      isFullWidth: false,
      component: (
        <Grid container alignItems="center">
          <Grid item>
            <SelectComponent
              isEditable={isEditable}
              currentValue={state.bank_code_no}
              onChange={(event) => {
                setState({ ...state, bank_code_no: event.target.value });
              }}
              menuItems={reducer?.banklist.map((x) => {
                return {
                  key: x.code_information["ko-KR"],
                  value: x.code_no,
                };
              })}
            />
          </Grid>
          <Grid item>
            <TextFieldComponent
              isEditable={isEditable}
              value={state.account_number}
              onChange={(event) => {
                setState({ ...state, account_number: event.target.value });
              }}
            />
          </Grid>
        </Grid>
      ),
    },
    {
      title: "메인노출",
      field: "lecturer_state",
      isFullWidth: false,
      component: (
        <Grid container alignItems="center">
          <Grid item>
            <CheckBoxComponent
              isEditable={isEditable}
              checked={state.isExposed}
              onChange={(e) => {
                setState({ ...state, isExposed: e.target.checked });
              }}
              // message={`※ 진료과당 4명의 강사진만 메인 노출 가능합니다.`}
            />
          </Grid>
          <Grid item>
            {isEditable && (
              <Typography color="textSecondary">{`※ 체크시 메인화면에 노출됩니다`}</Typography>
            )}
          </Grid>
        </Grid>
      ),
    },

    {
      title: "한 줄 소개",
      field: "lecturer_abstract_title",
      isFullWidth: true,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
          value={state.lecturer_abstract_title}
          onChange={(event) => {
            setState({ ...state, lecturer_abstract_title: event.target.value });
          }}
          fullWidth
        />
      ),
    },

    {
      title: "약력",
      field: "lecturer_career",
      isFullWidth: true,
      component: (
        <WysiwygComponent
          isEditable={isEditable}
          value={state.lecturer_career}
          onChange={(value) => {
            setState({ ...state, lecturer_career: value });
          }}
        />
      ),
    },

    {
      title: "강사프로필",
      field: "lecturer_img",
      isFullWidth: true,
      component: (
        <div className="profile_img">
          <Dropzone
            name={"lecturer_img"}
            isEditable={isEditable}
            currentImage={state.profile_img.img}
            onChange={(data) => {
              setState({
                ...state,
                profile_img: {
                  img: data.img,
                  file: data.file,
                },
              });
            }}
            w={380}
            h={240}
            minSize={"380x240"}
          ></Dropzone>
        </div>
      ),
    },
  ];

  return (
    <Grid container>
      {/* detail top */}
      <Grid item xs={12}>
        <Box pb={4}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Breadcrumb pb={0} title="강사관리" text="" />
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
                deleteCmsLecturer({
                  user_no: lecturer_no,
                });
              }}
            />
          </Grid>
        </Box>
      </Grid>
    </Grid>
    // </Wrapper>
  );
};

const Detail = (props) => {
  const { match } = props;
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  var lecturer_no = parseInt(match.params.lecturer_no);

  const { get } = useViewLogic({
    lecturer_no,
  });

  const instructor = reducer.lecturer.lecturer_data.data.find(
    (x) => x.user_no === lecturer_no
  );
  // console.log("lecturer", lecturer);

  useEffect(() => {
    get();

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
    <>
      {instructor && (
        <InstructorDetailComponent
          instructor={instructor}
          lecturer_no={lecturer_no}
        />
      )}
    </>
  );
};

export default Detail;
