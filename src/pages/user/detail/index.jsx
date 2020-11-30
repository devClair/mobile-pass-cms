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
  FormControlLabel,
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
  // SelectComponent,
  // TextFieldComponent,
  DatePickerComponent,
  CheckBoxComponent,
  SearchFieldComponent,
  WysiwygComponent,
} from "../../../components/table-row-component";
import {
  useForm,
  Controller,
  useFormContext,
  FormProvider,
} from "react-hook-form";

import { apiObject } from "../../../api";

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

  const { user, user_no } = props;

  const { update, getDep, getFac } = useViewLogic({ user_no });

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const history = useHistory();
  const [isEditable, setIsEditable] = useState(false);
  const [modalSw, setModalSw] = useState(false);

  const { watch, setValue, handleSubmit, getValues } = useFormContext();

  const [dep, setDep] = useState([]);
  const [fac, setFac] = useState([]);

  // useEffect(() => {
  //   getDepartments();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user.]);
  // useEffect(() => {
  //   getFacultys();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [watch("feed_department_no")]);

  const [state, setState] = useState({
    // user_name: user.user_name,
    // user_email: user.user_email,
    // mobile_no: user.mobile_no,
    // user_division: user.user_division,
    lecturer_status: user.lecturer_status ? true : false,
    // img_path: user.tb_image?.full_file_path,
    profile_img: {
      img: user.tb_image?.full_file_path,
      file: "",
    },
  });

  const onSubmit = (data) => {
    update({
      ...data,
      user_no: user.user_no,
      lecturer_status: state.lecturer_status,
      profile_img: state.profile_img,
    });
  };

  useEffect(() => {
    const initData = async () => {
      let depList = await getDep();
      setDep(depList);

      setValue("user_department_no", user.user_department_no);
      setValue("user_faculty_no", user.user_faculty_no);
      setValue("user_name", user.user_name);
      setValue("user_email", user.user_email);
      setValue("user_division", user.user_division);
      setValue("mobile_no", user.mobile_no);
      // setValue("lecturer_status", Boolean(user.lecturer_status));
    };
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const setFacData = async () => {
      if (watch("user_department_no") !== "") {
        let facList = await getFac(watch("user_department_no"));
        console.log({ facList });
        setFac(facList);
        setValue("user_faculty_no", facList[0]?.code_no);
      }
    };
    setFacData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("user_department_no", false)]);

  const rows = [
    {
      title: "이름",
      field: "user_name",
      isFullWidth: false,
      component: (
        <TextFieldComponent isEditable={isEditable} name={"user_name"} />
      ),
    },
    {
      title: "이메일",
      field: "user_email",
      isFullWidth: false,
      component: (
        <TextFieldComponent isEditable={isEditable} name={"user_email"} />
      ),
    },
    {
      title: "휴대폰",
      field: "mobile_no",
      isFullWidth: false,
      component: (
        <TextFieldComponent isEditable={isEditable} name={"mobile_no"} number />
      ),
    },
    {
      title: "가입일자",
      field: "createdAt",
      isFullWidth: false,
      component: (
        <Typography>
          {format(new Date(user.createdAt), "yyyy-MM-dd")}
        </Typography>
      ),
    },
    {
      title: "진료과",
      field: "code_id",
      isFullWidth: false,
      component: (
        <Box display="flex" alignItems="center">
          <SelectComponent
            name={"user_department_no"}
            isEditable={isEditable}
            menuItems={dep}
          />
          &nbsp;&nbsp;&gt;&nbsp;&nbsp;
          {/* &gt; */}
          <SelectComponent
            name={"user_faculty_no"}
            isEditable={isEditable}
            menuItems={fac}
          />
        </Box>
      ),
    },
    {
      title: "소속",
      field: "user_division",
      isFullWidth: false,
      component: (
        <TextFieldComponent isEditable={isEditable} name={"user_division"} />
      ),
    },
    {
      title: "구분",
      field: "user_type",
      isFullWidth: false,
      component: (
        <Box display="flex" justifyContent="space-between">
          <Typography>
            {user.user_type === "doctor" ? "의사" : "학생"}
          </Typography>
          <Typography>
            {user.user_type === "doctor" && user.doctor_license !== null
              ? `면허번호: ${user.doctor_license}`
              : ""}
          </Typography>
        </Box>
      ),
    },
    {
      title: "강사권한부여",
      field: "lecturer_status",
      isFullWidth: false,
      component:
        user.user_type === "doctor" ? (
          <CheckBoxComponent
            isEditable={isEditable}
            checked={state.lecturer_status}
            onChange={(e) => {
              setState({ ...state, lecturer_status: e.target.checked });
            }}
            message={`※ 체크 시 강사권한이 부여됩니다`}
          />
        ) : (
          <TextFieldComponent
            isEditable={false}
            value={"학생아이디에는 강사권한을 부여할 수 없습니다."}
          />
        ),
    },
    {
      title: "회원프로필",
      field: "user_img",
      isFullWidth: true,
      component: (
        <div className="profile_img">
          <Dropzone
            name={"user_img"}
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
              <Breadcrumb pb={0} title="회원정보" text="" />
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
                        handleSubmit(onSubmit)();
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
  );
};

const Detail = (props) => {
  const { match } = props;

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const methods = useForm();

  var user_no = parseInt(match.params.user_no);

  const { get } = useViewLogic({
    user_no,
  });

  const user = reducer.user.user_data.data.find((x) => x.user_no === user_no);

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
    <FormProvider {...methods}>
      {user ? (
        <DetailComponent user={user} user_no={user_no} />
      ) : (
        <div>데이터 없음</div>
      )}
    </FormProvider>
  );
};

export default Detail;

const SelectComponent = (props) => {
  const classes = useStyles();
  const { locale } = useSelector((state) => state.reducer);
  const { isEditable, menuItems, name } = props;
  const { control, watch } = useFormContext();

  return (
    <Controller
      as={
        isEditable ? (
          <Select
            className={classes.selectOutlined}
            // variant="outlined"
            readOnly={!isEditable}
          >
            {menuItems?.map((item, index) => {
              return (
                <MenuItem value={item.code_no} key={index}>
                  {item.code_information[locale]}
                </MenuItem>
              );
            })}
          </Select>
        ) : (
          <Typography>
            {
              menuItems.find((item) => item.code_no == watch(name))
                ?.code_information[locale]
            }
          </Typography>
        )
      }
      name={name}
      control={control}
      defaultValue={""}
    />
  );
};

const TextFieldComponent = (props) => {
  const classes = useStyles();
  const { isEditable, name, multiline, rows, number, placeholder } = props;
  const { control, register } = useFormContext();

  return (
    // <Controller
    //   as={
    //     <TextField
    //       variant="outlined"
    //       placeholder={placeholder}
    //       multiline={multiline}
    //       rows={rows}
    //       fullWidth
    //       inputProps={{
    //         readOnly: !isEditable,
    //         type: number ? "number" : "text",
    //       }}
    //     />
    //   }
    //   control={control}
    //   defaultValue={""}
    //   name={name}
    //   rules={{
    //     required: true,
    //   }}
    // />

    <TextField
      name={name}
      variant="outlined"
      inputRef={register({
        required: true,
      })}
      placeholder={placeholder}
      multiline={multiline}
      rows={rows}
      fullWidth
      inputProps={{
        readOnly: !isEditable,
        type: number ? "number" : "text",
      }}
    />
  );
};

// const CheckBoxComponent = (props) => {
//   const classes = useStyles();
//   const { isEditable, name, message } = props;
//   const { control, register, getValues } = useFormContext();
//   return (
//     // 추후 재작성
//     // <Controller
//     //   as={
//     //     <Checkbox
//     //       disabled={!isEditable}
//     //       color={"primary"}
//     //       // inputRef={register}
//     //     />
//     //     // <FormControlLabel
//     //     //   control={
//     //     //     <Checkbox
//     //     //       disabled={!isEditable}
//     //     //       color={"primary"}
//     //     //       inputRef={register}
//     //     //     />
//     //     //   }
//     //     //   label={isEditable && message}

//     //     //   // checked = {}
//     //     // />
//     //   }
//     //   name={name}
//     //   control={control}
//     //   // defaultValue=""
//     // />

//     // <FormControlLabel
//     //   control={
//     //     <Checkbox
//     //       disabled={!isEditable}
//     //       color={"primary"}
//     //       inputRef={register}
//     //       name={name}
//     //     />
//     //   }
//     //   label={isEditable && message}

//     //   // checked = {}
//     // />

//     // 이렇게도 작동, label때문에 wrapper 사용
//     <Checkbox
//       disabled={!isEditable}
//       color={"primary"}
//       inputRef={register}
//       name={name}
//     />
//   );
// };

const DropzoneComponent = (props) => {
  const classes = useStyles();
  const { isEditable, name, img_path } = props;
  const { control, register } = useFormContext();
  return (
    // <FormControlLabel
    //   control={<Checkbox disabled={!isEditable} color={"primary"} />}
    //   label={isEditable && message}
    //   inputRef={register}
    //   name={name}
    // />

    <div className="profile_img">
      <Dropzone
        isEditable={isEditable}
        currentImage={img_path}
        name={name}
        register={register}
      />
    </div>

    // 이렇게도 작동, label때문에 wrapper 사용
    // <Checkbox
    //   disabled={!isEditable}
    //   color={"primary"}
    //   inputRef={register}
    //   name={name}
    // />
  );
};
