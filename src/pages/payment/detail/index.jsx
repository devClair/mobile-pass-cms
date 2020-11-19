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

import List from "./list";

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
}));

const DetailComponent = (props) => {
  const classes = useStyles();
  const { lecture, lecture_no } = props;

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const history = useHistory();
  const [isEditable, setIsEditable] = useState(false);

  const [state, setState] = useState({
    lecture_no: lecture.lecture_no,
    lecture_department_no: lecture.lecture_department_no,
    disease_info: lecture?.tb_disease_info?.disease_name,
    instructor_info: [
      {
        user_no: lecture?.tb_lecturer.tb_lecturer_content.user_no,
        name: lecture?.tb_lecturer.tb_lecturer_content.lecturer_name,
        title: lecture?.tb_lecturer.tb_lecturer_content.lecturer_title,
      },
    ],
    possible_date: lecture?.possible_date,
    live_begin_dt: lecture?.live_begin_dt,
    best_bare_state: Boolean(lecture?.best_bare_state) ? true : false,
    lecture_vimeo_url: lecture?.lecture_vimeo_url,
    lecture_chat_url: lecture?.lecture_chat_url,

    lecture_state: Boolean(lecture?.lecture_state) ? true : false,
    lecture_content: lecture?.tb_lecture_content.lecture_content,
  });

  useEffect(() => {
    setState({
      ...state,
      lecture_no: lecture.lecture_no,
      lecture_department_no: lecture.lecture_department_no,
      disease_info: lecture?.tb_disease_info?.disease_name,
      lecture_title: lecture?.tb_lecture_content.lecture_title,

      instructor_info: [
        {
          user_no: lecture?.tb_lecturer.tb_lecturer_content.user_no,
          name: lecture?.tb_lecturer.tb_lecturer_content.lecturer_name,
          title: lecture?.tb_lecturer.tb_lecturer_content.lecturer_title,
        },
      ],
      possible_date: lecture?.possible_date,
      live_begin_dt: lecture?.live_begin_dt,
      best_bare_state: Boolean(lecture?.best_bare_state) ? true : false,
      lecture_vimeo_url: lecture?.lecture_vimeo_url,
      lecture_chat_url: lecture?.lecture_chat_url,

      lecture_state: Boolean(lecture?.lecture_state) ? true : false,
      lecture_content: lecture?.tb_lecture_content.lecture_content,
    });
  }, [isEditable]);

  const rows = [
    {
      title: "진료과",
      field: "tb_lecture_department",
      isFullWidth: false,
      component: (
        <SelectComponent
          isEditable={isEditable}
          // currentValue={lecture.lecture_department_no}
          currentValue={state.lecture_department_no}
          onChange={(event) => {
            setState({ ...state, lecture_department_no: event.target.value });
          }}
          menuItems={reducer.department_info.map((x) => {
            return {
              key: x.code_id,
              value: x.code_no,
            };
          })}
        />
      ),
    },
    // {
    //   title: "병증",
    //   field: "tb_disease_info",
    //   isFullWidth: false,
    //   component: (
    //     <TextFieldComponent
    //       isEditable={isEditable}
    //       value={state.disease_info}
    //       onChange={(event) => {
    //         setState({ ...state, disease_info: event.target.value });
    //       }}
    //     />
    //   ),
    // },

    {
      title: "강의명",
      field: "lecture_title",
      isFullWidth: false,
      component: (
        <TextFieldComponent
          isEditable={isEditable}
          value={state.lecture_title}
          onChange={(event) => {
            setState({ ...state, lecture_title: event.target.value });
          }}
        />
      ),
    },

    {
      title: "강사명",
      field: "lecturer_name",
      isFullWidth: false,
      component: (
        // <TextFieldComponent
        //   isEditable={isEditable}
        //   value={state.lecturer_name}
        //   onChange={(event) => {
        //     setState({ ...state, lecturer_name: event.target.value });
        //   }}
        // />
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
          handleDelete={() => {
            setState({
              ...state,
              instructor_info: [],
            });
          }}
        />
      ),
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12} style={{ marginBottom: 50 }}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Breadcrumb pb={0} title="강의관리" text="" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.table_container}>
        <Grid container>
          {rows.map((x, index) => {
            return (
              <TableRowContainer
                key={index}
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
    </Grid>
  );
};

const Detail = (props) => {
  const { match } = props;
  console.log("Detail -> match", match);
  const reducer = useSelector((state) => state.reducer);
  const {} = useViewLogic({
    lecture_no: match.params.lecture_no,
  });
  const lecture = reducer.lecture.lecture_data.data.find(
    (x) => x.lecture_no == match.params.lecture_no
  );

  return (
    <>
      {lecture ? (
        <Grid className="table_wrap">
          <DetailComponent
            match={match}
            lecture={lecture}
            lecture_no={match.params.lecture_no}
          />
          <Grid
            style={{
              margin: 50,
            }}
          />
          <List lecture_no={match.params.lecture_no} />
        </Grid>
      ) : (
        <div>로딩</div>
      )}
    </>
  );
};

export default Detail;
