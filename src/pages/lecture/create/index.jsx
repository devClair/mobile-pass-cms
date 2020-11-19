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
  Radio,
  RadioGroup,
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
import { format, setHours } from "date-fns";

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
// import Radio from "../../../components/radio";
import { Modal } from "../../../components/modal/";
import ButtonType from "../../../components/button-type/";

import Dropzone from "../../../components/dropzone";
import SearchDialog from "../../../components/search-dialog";
import ChipsArray from "../../../components/chips-array";

import { useCmsLectures } from "./viewLogic";

// table-row-component
import {
  TableRowContainer,
  SelectComponent,
  TextFieldComponent,
  DatePickerComponent,
  CheckBoxComponent,
  SearchFieldComponent,
  TimeInputComponent,
  WysiwygComponent,
  SliderComponent,
  SearchAndChips,
} from "../../../components/table-row-component";

import { produce, setAutoFreeze } from "immer";

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
    marginTop: "10px",
    marginBottom: "10px",
    // maxHeight: 16.5,
    "& .MuiOutlinedInput-input": {
      // paddingLeft: "10px",
      // paddingRight: "10px",
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

  inputPlayTimeContainer: {
    paddingLeft: "15px",
  },
  inputPlayTime: {
    width: 48,
  },
  test: {
    maxWidth: 580,
  },
}));

const CreateComponent = (props) => {
  const { match } = props;
  const classes = useStyles();

  const { listFacultys, listDepartments, createCmsLecture } = useCmsLectures();

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const history = useHistory();
  const [isEditable, setIsEditable] = useState(true);

  const [state, setState] = useState({
    instructor_info: [
      {
        user_no: "",
        name: "",
        title: "",
      },
    ],
    lecture_department_no: "",
    lecture_faculty_no: "",
    lecture_title: "",
    lecture_abstract_title: "",
    lecture_abstract_content: "",
    lecture_content: "",
    lecture_video_preview_img_no: "",
    lecture_vimeo_url: "",
    lecture_chat_url: "",
    best_bare_state: false,
    best_bare_order_weight: 10,
    original_price: 0, //원가
    real_price: 0, //판매가
    share_rate_to_lecturer: 50, //수익분배 ※설정한 비율만큼 강사에게 지급됩니다
    tb_tag_info: [], //태그 목록
    tb_disease_info: [], //태그 목록
    lecture_type: "", //강의유형
    lecture_state: true, //승인
    live_begin_dt: new Date(), //강의시작일,
    possible_date: 10, //유효기간,

    make_user_info: {
      user_no: reducer.myUser.user_no, // 작성자 user_no,
      user_name: reducer.myUser.user_name, // 작성자 user_name,
    },
    play_time: {
      value: 0,
      h: Math.floor(0 / 3600),
      m: Math.floor((0 % 3600) / 60),
      s: Math.floor((0 % 3600) % 60),
    },
    thumbnail: {
      img: "",
      file: "",
    },
  });

  const onsubmit = () => {
    return createCmsLecture({
      user_no: state.instructor_info[0].user_no,
      lecture_type: state.lecture_type,
      lecture_department_no: state.lecture_department_no,
      lecture_faculty_no: state.lecture_faculty_no,
      live_begin_dt: state.live_begin_dt,
      lecture_title: state.lecture_title,
      lecture_content: state.lecture_content,
      lecture_abstract_title: state.lecture_abstract_title,
      lecture_abstract_content: state.lecture_abstract_content,
      lecture_vimeo_url: state.lecture_vimeo_url,
      lecture_chat_url: state.lecture_chat_url,
      best_bare_state: state.best_bare_state,
      best_bare_order_weight: state.best_bare_order_weight,
      tag_no_array: state.tb_tag_info,
      disease_no_array: state.tb_disease_info,
      // lecture_video_preview_img_no: state.lecture_video_preview_img_no,
      original_price: state.original_price,
      real_price: state.real_price,
      share_rate_to_lecturer: state.share_rate_to_lecturer,
      lecture_state: state.lecture_state,
      possible_date: state.possible_date,
      play_time: state.play_time,
      thumbnail: state.thumbnail,
      make_user_no: state.make_user_info.user_no,
    });
  };

  const handleFormCheck = async () => {
    console.log({ state });

    const urlRegex = /(^http(s)?:\/\/)([a-z0-9]{1})/i;

    if (state.lecture_department_no === "") {
      alert(`진료과는 필수입니다`);
      return;
    }
    if (state.lecture_faculty_no === "") {
      alert(`학부는 필수입니다`);
      return;
    }
    if (state.lecture_title === "") {
      alert(`강의명은 필수입니다`);
      return;
    }
    if (state.instructor_info.length === 0) {
      alert(`강사명은 필수입니다`);
      return;
    }
    if (Boolean(!state.instructor_info[0].user_no)) {
      alert(`강사명은 필수입니다`);
      return;
    }
    if (state.lecture_abstract_title === "") {
      alert(`소제목은 필수입니다`);
      return;
    }
    if (state.live_begin_dt === "") {
      alert(`게시일을 확인해주세요`);
      return;
    }
    if (
      state.lecture_chat_url !== "" &&
      !urlRegex.test(state.lecture_chat_url)
    ) {
      alert(`채팅창코드의 Url이 올바르지 않습니다.`);
      return;
    }
    if (
      state.lecture_vimeo_url !== "" &&
      !urlRegex.test(state.lecture_vimeo_url)
    ) {
      alert(`동영상링크의 Url이 올바르지 않습니다.`);
      return;
    }
    if (state.thumbnail.img === "") {
      alert(`썸네일 이미지는 필수입니다`);
      return;
    }
    return onsubmit();
  };

  useEffect(() => {
    listFacultys(state.lecture_department_no);
  }, [state.lecture_department_no]);

  const rows = [
    {
      title: "진료과",
      field: "lecture_department_no",
      isFullWidth: false,
      isRequired: true,
      component: (
        <SelectComponent
          isEditable={isEditable}
          // currentValue={lecture.lecture_department_no}
          currentValue={state.lecture_department_no}
          onChange={(event) => {
            setState({ ...state, lecture_department_no: event.target.value });
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
      title: "학부",
      field: "lecture_faculty_no",
      isFullWidth: false,
      isRequired: true,
      component: (
        <SelectComponent
          isEditable={isEditable}
          // currentValue={lecture.lecture_department_no}
          currentValue={state.lecture_faculty_no}
          onChange={(event) => {
            setState({ ...state, lecture_faculty_no: event.target.value });
          }}
          menuItems={reducer?.faculty_info.map((x) => {
            return {
              key: x.code_information["ko-KR"],
              value: x.code_no,
            };
          })}
        />
      ),
    },
    {
      title: "강의명",
      field: "lecture_title",
      isFullWidth: false,
      isRequired: true,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
          value={state.lecture_title}
          onChange={(event) => {
            setState({ ...state, lecture_title: event.target.value });
          }}
          fullWidth
        />
      ),
    },
    {
      title: "강사명",
      field: "instructor_info",
      isFullWidth: false,
      isRequired: true,
      component: (
        <SearchFieldComponent
          isEditable={isEditable}
          value={state.instructor_info}
          onChange={(instructor) => {
            setState({
              ...state,
              instructor_info: [
                {
                  user_no: instructor.user_no,
                  name: instructor.name,
                  title: instructor.title,
                },
              ],
            });
          }}
          handleDelete={() => () => {
            setState({
              ...state,
              instructor_info: [],
            });
          }}
        />
      ),
    },
    {
      title: "소제목",
      field: "lecture_abstract_title",
      isFullWidth: false,
      isRequired: true,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
          value={state.lecture_abstract_title}
          onChange={(event) => {
            setState({ ...state, lecture_abstract_title: event.target.value });
          }}
          fullWidth
        />
      ),
    },
    {
      title: "작성자",
      field: "make_user_info",
      isFullWidth: false,
      component: (
        <TextFieldComponent
          isEditable={false}
          value={state.make_user_info.user_name}
        />
      ),
    },
    {
      title: "게시일",
      field: "live_begin_dt",
      isFullWidth: false,
      component: (
        <DatePickerComponent
          isEditable={isEditable}
          value={new Date(state.live_begin_dt)}
          onChange={(event) => {
            setState({ ...state, live_begin_dt: event });
          }}
        />
      ),
    },
    {
      title: "유효기간",
      field: "possible_date",
      isFullWidth: false,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
          value={state.possible_date}
          onChange={(event) => {
            setState({ ...state, possible_date: event.target.value });
          }}
          number
          min={0}
          max={999}
        />
      ),
    },
    {
      title: "Best 노출",
      field: "best_bare_state",
      isFullWidth: false,
      component: (
        <CheckBoxComponent
          isEditable={isEditable}
          checked={state.best_bare_state}
          onChange={(e) => {
            setState({ ...state, best_bare_state: e.target.checked });
          }}
          message={
            <Typography color="textSecondary">
              ※ 체크 시 Best 강의에 노출됩니다
            </Typography>
          }
        />
      ),
    },
    {
      title: "Best 가중치",
      field: "best_bare_order_weight",
      isFullWidth: false,
      component: (
        <SliderComponent
          isEditable={isEditable}
          value={state.best_bare_order_weight}
          onChange={(value) => {
            setState({ ...state, best_bare_order_weight: value });
          }}
          // marks={reducer.banner.marks}
        />
      ),
    },
    {
      title: "판매가/기준가(원)",
      field: "real_price",
      isFullWidth: false,
      component: (
        // <Box width={80}>
        <Grid container alignItems="center">
          <Grid item>
            <Box width={120}>
              <TextFieldComponent
                isEditable={isEditable}
                value={state.real_price}
                onChange={(event) => {
                  setState({ ...state, real_price: event.target.value });
                }}
                number
                step={500}
                min={0}
              />
            </Box>
          </Grid>

          <Grid item>
            <Box width={120}>
              <TextFieldComponent
                isEditable={isEditable}
                value={state.original_price}
                onChange={(event) => {
                  setState({ ...state, original_price: event.target.value });
                }}
                number
                step={500}
                min={0}
              />
            </Box>
          </Grid>
        </Grid>
        // </Box>
      ),
    },
    {
      title: "수익분배율(%)",
      field: "share_rate_to_lecturer",
      isFullWidth: false,
      component: (
        <Grid container alignItems="center">
          <Grid item>
            <Box width={80}>
              <TextFieldComponent
                isEditable={isEditable}
                value={state.share_rate_to_lecturer}
                onChange={(event) => {
                  setState({
                    ...state,
                    share_rate_to_lecturer: event.target.value,
                  });
                }}
                number
                step={1}
                min={0}
                max={100}
              />
            </Box>
          </Grid>
          <Grid item>
            <Box pr={2}>
              <Typography color="textSecondary">
                {isEditable && `※ 설정한 비율만큼 강사에게 지급됩니다`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ),
    },
    {
      title: "채팅창코드",
      field: "lecture_chat_url",
      isFullWidth: false,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
          value={state.lecture_chat_url}
          onChange={(event) => {
            setState({ ...state, lecture_chat_url: event.target.value });
          }}
          fullWidth
        />
      ),
    },
    {
      title: "동영상링크",
      field: "lecture_vimeo_url",
      isFullWidth: false,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
          value={state.lecture_vimeo_url}
          onChange={(event) => {
            setState({ ...state, lecture_vimeo_url: event.target.value });
          }}
          fullWidth
        />
      ),
    },

    {
      title: "재생시간",
      field: "play_time",
      isFullWidth: false,
      component: (
        <Box pl={1}>
          <Grid container justify="flex-start" alignItems="center">
            <Grid item className={classes.inputPlayTime}>
              <TimeInputComponent
                isEditable={isEditable}
                value={state.play_time.h}
                onChange={(event) => {
                  setState(
                    produce(state, (draft) => {
                      draft.play_time.h = event.target.value;
                    })
                  );
                }}
                min={0}
              />
            </Grid>
            <span style={{ padding: "8px" }}> {` : `}</span>

            <Grid item className={classes.inputPlayTime}>
              <TimeInputComponent
                isEditable={isEditable}
                value={state.play_time.m}
                onChange={(event) => {
                  setState(
                    produce(state, (draft) => {
                      draft.play_time.m = event.target.value;
                    })
                  );
                }}
                min={0}
                max={59}
              />
            </Grid>
            <span style={{ padding: "8px" }}> {` : `}</span>

            <Grid item className={classes.inputPlayTime}>
              <TimeInputComponent
                isEditable={isEditable}
                value={state.play_time.s}
                onChange={(event) => {
                  setState(
                    produce(state, (draft) => {
                      draft.play_time.s = event.target.value;
                    })
                  );
                }}
                min={0}
                max={59}
              />
            </Grid>
          </Grid>
        </Box>
      ),
    },
    {
      title: "강의유형",
      field: "lecture_type",
      isFullWidth: false,
      component: (
        <Box pl={1}>
          <RadioGroup
            row
            // name="lecture_type"
            value={state.lecture_type}
            onChange={(e) => {
              setState({ ...state, lecture_type: e.target.value });
            }}
          >
            <FormControlLabel
              value="vod"
              control={<Radio color="primary" />}
              label="다시보기"
              labelPlacement="end"
              disabled={!isEditable}
            />
            <FormControlLabel
              value="live"
              control={<Radio color="primary" />}
              label="라이브"
              labelPlacement="end"
              disabled={!isEditable}
            />
          </RadioGroup>
        </Box>
      ),
    },

    {
      title: "승인",
      field: "lecture_state",
      isFullWidth: true,
      component: (
        <CheckBoxComponent
          isEditable={isEditable}
          checked={state.lecture_state}
          onChange={(e) => {
            setState({ ...state, lecture_state: e.target.checked });
          }}
          message={
            <Typography color="textSecondary">
              ※ 체크 시 강의가 승인됩니다
            </Typography>
          }
        />
      ),
    },

    // {
    //   title: "기준가(원)",
    //   field: "original_price",
    //   isFullWidth: false,
    //   component: (
    //     <TextFieldComponent
    //       isEditable={isEditable}
    //       value={state.original_price}
    //       onChange={(event) => {
    //         setState({ ...state, original_price: event.target.value });
    //       }}
    //       number
    //       step={500}
    //       min={0}
    //     />
    //   ),
    // },

    {
      title: "소개글",
      field: "lecture_abstract_content",
      isFullWidth: true,
      component: (
        <WysiwygComponent
          isEditable={isEditable}
          value={state.lecture_abstract_content}
          onChange={(value) => {
            setState({
              ...state,
              lecture_abstract_content: value,
            });
          }}
          test={classes.test}
        />
      ),
    },
    {
      title: "상세정보",
      field: "lecture_content",
      isFullWidth: true,
      component: (
        <WysiwygComponent
          isEditable={isEditable}
          value={state.lecture_content}
          onChange={(value) => {
            setState({ ...state, lecture_content: value });
          }}
        />
      ),
    },

    {
      title: "썸네일",
      field: "thumbnail",
      isFullWidth: true,
      isRequired: true,
      component: (
        <div className="profile_img">
          <Dropzone
            isEditable={isEditable}
            currentImage={state.thumbnail.img}
            onChange={(data) => {
              setState({
                ...state,
                thumbnail: {
                  img: data.img,
                  file: data.file,
                },
              });
            }}
            w={930}
            h={580}
            minSize={"930x580"}
          ></Dropzone>
        </div>
      ),
    },
    // {
    //   title: "병증",
    //   field: "tb_disease_info",
    //   isFullWidth: false,
    //   component: (
    //     <SearchAndChips
    //       chipData={state.tb_disease_info.map((x, i) => {
    //         return { key: i, label: `#${x.disease_name}` };
    //       })}
    //       handleDelete={(chipToDelete) => () => {
    //         setState({
    //           ...state,
    //           tb_disease_info: state.tb_disease_info.filter(
    //             (x, i) => i !== chipToDelete.key
    //           ),
    //         });
    //       }}
    //       handleAdd={(chipToadd) => {
    //         setState(
    //           produce(state, (draft) => {
    //             draft.tb_disease_info.push({
    //               disease_name: chipToadd,
    //             });
    //           })
    //         );
    //       }}
    //       isEditable={isEditable}
    //       placeholder="연관 병증 입력.."
    //     />
    //   ),
    // },
    {
      title: "태그목록",
      field: "tb_tag_info",
      isFullWidth: true,
      component: (
        <SearchAndChips
          chipData={state.tb_tag_info.map((x, i) => {
            return { key: i, label: `#${x.tag_name}` };
          })}
          handleDelete={(chipToDelete) => () => {
            setState({
              ...state,
              tb_tag_info: state.tb_tag_info.filter(
                (x, i) => i !== chipToDelete.key
              ),
            });
          }}
          handleAdd={(tagToadd) => {
            setState(
              produce(state, (draft) => {
                draft.tb_tag_info.push({
                  tag_name: tagToadd,
                });
              })
            );
          }}
          isEditable={isEditable}
          placeholder="연관 태그 입력.."
        />
      ),
    },
  ];

  return (
    // <Wrapper isEditable={isEditable}>
    <Grid container>
      {/* detail top */}
      <Grid item xs={12}>
        <Box pb={2}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Breadcrumb title="강의업로드" text="*는 필수입력 항목입니다." />
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
                    {"나가기"}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color={isEditable ? "primary" : "default"}
                    startIcon={
                      isEditable ? <SaveOutlinedIcon /> : <EditOutlinedIcon />
                    }
                    onClick={async () => {
                      const lecture_no = await handleFormCheck();
                      lecture_no &&
                        history.push(`/lecture/detail/${lecture_no}`);
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
          {rows.map((x) => {
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
                isRequired={x.isRequired}
              />
            );
          })}
        </Grid>

        <ul></ul>
      </Grid>

      {/* detail bottom */}
      <Grid item xs={12}>
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
              window.confirm("정말 삭제하시겠습니까?");
            }}
          /> */}
        </Grid>
      </Grid>
    </Grid>
    // </Wrapper>
  );
};

const Detail = (props) => {
  const { match } = props;
  const reducer = useSelector((state) => state.reducer);
  const { listDepartments } = useCmsLectures();
  useEffect(() => {
    listDepartments();
  }, []);

  return <>{reducer.myUser.user_no && <CreateComponent match={match} />}</>;
};

export default Detail;
