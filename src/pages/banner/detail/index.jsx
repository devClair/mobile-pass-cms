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

import { useViewLogic } from "./viewLogic";

// table-row-component
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

const BannerDetailComponent = (props) => {
  const classes = useStyles();

  const { banner, banner_no } = props;
  console.log({ banner });

  const { update, deleteCmsBanner } = useViewLogic({ banner_no });

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const history = useHistory();
  const [isEditable, setIsEditable] = useState(false);
  const [modalSw, setModalSw] = useState(false);

  const [state, setState] = useState({
    banner_no: banner.banner_no,
    banner_type: banner.banner_type,
    banner_state: banner.banner_state,
    banner_title: banner.banner_title,
    banner_order_weight: banner.banner_order_weight,
    createdAt: banner.createdAt,
    updatedAt: banner.updatedAt,
    banner_content: banner.banner_content,
    banner_img: {
      img: banner.tb_banner_img.full_file_path,
      file: "",
    },
    banner_url: banner.banner_url,
  });

  const onsubmit = () => {
    update({
      banner_no: state.banner_no,
      banner_type: state.banner_type,
      banner_title: state.banner_title,
      banner_content: state.banner_content,
      banner_state: state.banner_state,
      banner_order_weight: state.banner_order_weight,
      banner_img: state.banner_img,
      banner_url: state.banner_url,
    });
  };

  useEffect(() => {
    // console.log(banner);
    setState({
      ...state,
      banner_no: banner.banner_no,
      banner_type: banner.banner_type,
      banner_state: banner.banner_state,
      banner_title: banner.banner_title,
      banner_order_weight: banner.banner_order_weight,
      createdAt: banner.createdAt,
      updatedAt: banner.updatedAt,
      banner_content: banner.banner_content,
      banner_img: {
        img: banner.tb_banner_img.full_file_path,
        file: "",
      },
      banner_url: banner.banner_url,
    });
  }, [isEditable, banner]);

  let ratio = {
    w: 1640,
    h: 268,
  };

  switch (state.banner_type) {
    case "main":
      ratio = { w: 1640, h: 268 };
      break;
    case "live":
      ratio = { w: 1640, h: 125 };
      break;
    case "chat":
      ratio = { w: 506, h: 132 };
      break;

    default:
      break;
  }

  const rows = [
    {
      title: "위치",
      field: "banner_type",
      isFullWidth: false,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
          value={state.banner_type}
          onChange={(event) => {
            setState({ ...state, banner_type: event.target.value });
          }}
        />
      ),
    },

    {
      title: "노출가중치",
      field: "banner_order_weight",
      isFullWidth: false,
      component: (
        // <TextFieldComponent
        //   isEditable={isEditable}
        //   value={state.banner_order_weight}
        //   onChange={(event) => {
        //     setState({ ...state, banner_order_weight: event.target.value });
        //   }}
        //   number={true}
        // />
        <SliderComponent
          isEditable={isEditable}
          value={state.banner_order_weight}
          onChange={(value) => {
            setState({ ...state, banner_order_weight: value });
          }}
          marks={reducer.banner.marks}
        />
      ),
    },
    {
      title: "코드",
      field: "banner_title",
      isFullWidth: false,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
          value={state.banner_title}
          onChange={(event) => {
            setState({ ...state, banner_title: event.target.value });
          }}
        />
      ),
    },
    {
      title: "배너노출",
      field: "banner_state",
      isFullWidth: false,
      component: (
        <CheckBoxComponent
          isEditable={isEditable}
          checked={state.banner_state}
          onChange={(e) => {
            setState({ ...state, banner_state: e.target.checked });
          }}
          message={`※ 체크 시 배너가 노출됩니다`}
        />
      ),
    },

    {
      title: "업로드일시",
      field: "createdAt",
      isFullWidth: false,
      component: (
        <Typography variant="subtitle1">
          {format(new Date(state.createdAt), "yyyy-MM-dd hh:mm:dd")}
        </Typography>
      ),
    },
    {
      title: "수정일시",
      field: "updatedAt",
      isFullWidth: false,
      component: (
        <Typography variant="subtitle1">
          {format(new Date(state.updatedAt), "yyyy-MM-dd hh:mm:dd")}
        </Typography>
      ),
    },
    {
      title: "배너이미지",
      field: "banner_image",
      isFullWidth: true,
      component: (
        <div className="profile_img">
          <Dropzone
            isEditable={isEditable}
            currentImage={state.banner_img.img}
            onChange={(data) => {
              setState({
                ...state,
                banner_img: {
                  img: data.img,
                  file: data.file,
                },
              });
            }}
            w={ratio.w}
            h={ratio.h}
            minSize={`"${ratio.w}x${ratio.h}"`}
          ></Dropzone>
        </div>
      ),
    },
    {
      title: "설명",
      field: "banner_content",
      isFullWidth: true,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
          value={state.banner_content}
          onChange={(event) => {
            setState({ ...state, banner_content: event.target.value });
          }}
        />
      ),
    },
    {
      title: "URL",
      field: "banner_url",
      isFullWidth: true,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
          value={state.banner_url}
          onChange={(event) => {
            setState({ ...state, banner_url: event.target.value });
          }}
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
              <Breadcrumb pb={0} title="Banners" text="" />
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
              />
            );
          })}
        </Grid>

        <ul></ul>
      </Grid>

      {/* detail bottom */}
      <Grid item xs={12}>
        {" "}
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
                deleteCmsBanner({
                  banner_no: state.banner_no,
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

  var banner_no = parseInt(match.params.banner_no);

  const { get } = useViewLogic({
    banner_no,
  });

  const banner = reducer.banner.banner_data.data.find(
    (x) => x.banner_no === banner_no
  );
  // console.log("banner", banner);

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
      {banner && (
        <BannerDetailComponent banner={banner} banner_no={banner_no} />
      )}
    </>
  );
};

export default Detail;
