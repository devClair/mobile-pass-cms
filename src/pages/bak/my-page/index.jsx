import React, { useContext, useState, useRef, useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../layout";
import {
  Grid,
  IconButton,
  Button,
  Checkbox,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  makeStyles,
  styled,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import BackupOutlinedIcon from "@material-ui/icons/BackupOutlined";
import { Pagination } from "@material-ui/lab";
import Wrapper from "./styles";
import { useHistory } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb";
import Radio from "../../components/radio";
import { Modal } from "../../components/modal/";
import ButtonType from "../../components/button-type/";
import Dropzone from "../../components/dropzone";

import { useCmsLecturer } from "./viewLogic";

const useStyles = makeStyles((theme) => ({
  upload_button: {
    color: "white",
    backgroundColor: "rgba(76,175,80,1.0)",
  },
  checkbox: {
    height: "unset!important",
    marginTop: "5px",
    color: "rgba(0, 0, 0, 0.26)!important",
  },
  default_text: {
    width: "264",
    paddingLeft: "5",
    color: "rgb(200, 200, 200)!important",
  },
  text_area: {
    width: "calc(100% - 180px)",
    backgroundColor: "white",
  },
}));

const tempRadio = [
  { key: 0, value: "정상" },
  { key: 1, value: "정지" },
];

const DetailComponent = (props) => {
  // const { state, isLoading, setModalOverflow } = useContext(UserContext);
  const classes = useStyles();

  const lecturer_name_ref = useRef("");
  const lecturer_title_ref = useRef("");
  const lecturer_career_ref = useRef("");
  const lecturer_division_ref = useRef("");

  const [isEditable, setIsEditable] = useState(false);
  const [modalSw, setModalSw] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState("");

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const instructor = reducer.instructor_info;
  const department = reducer.department_info;
  const { updateCmsLecturer } = useCmsLecturer();

  const onsubmit = () => {
    updateCmsLecturer({
      lecturer_name: lecturer_name_ref.current.value,
      // lecturer_title : "",
      lecturer_career: lecturer_career_ref.current.value,
      lecturer_title: lecturer_title_ref.current.value,
      lecturer_department_no: currentDepartment,
      lecturer_division: lecturer_division_ref.current.value,
    });
  };
  const handleChange = (event) => {
    setCurrentDepartment(event.target.value);
  };
  console.log({ instructor });
  console.log({ department });
  useEffect(() => {
    setCurrentDepartment(instructor.lecturer_department_no);
  }, [instructor]);

  return (
    <Wrapper isEditable={isEditable}>
      <Grid className="customer_detail">
        <Breadcrumb pb={0} title="마이페이지" text="" />
        <Grid container justify="flex-end" spacing={1}>
          {isEditable && (
            <Grid item>
              <Button
                variant="contained"
                // color={isEditable ? "primary" : "secondary"}
                color={"default"}
                startIcon={
                  isEditable ? <SaveOutlinedIcon /> : <EditOutlinedIcon />
                }
                onClick={() => {
                  setIsEditable(!isEditable);
                }}
              >
                취소
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button
              variant="contained"
              // color={isEditable ? "primary" : "secondary"}
              color={isEditable ? "primary" : "default"}
              startIcon={
                isEditable ? <SaveOutlinedIcon /> : <EditOutlinedIcon />
              }
              onClick={() => {
                if (!isEditable) {
                  setIsEditable(true);
                } else {
                  setIsEditable(false);
                  onsubmit();
                }
              }}
            >
              {isEditable ? "저장" : "수정"}
            </Button>
          </Grid>
          {/* <Grid item>
            <Button
              variant="contained"
              className={classes.upload_button}
              startIcon={<BackupOutlinedIcon />}
            >
              승인요청
            </Button>
          </Grid> */}
        </Grid>
        <Grid className="table">
          <ul>
            <li>
              <span className="title">강사명</span>
              <input
                className="text"
                defaultValue={instructor?.lecturer_name}
                readOnly={!isEditable}
                ref={lecturer_name_ref}
              />
            </li>
            <li>
              <span className="title">메인노출</span>
              <Checkbox
                className={classes.checkbox}
                defaultChecked={true ? true : false}
                disabled
              ></Checkbox>
              <span className={classes.default_text}>
                ※진료과 별로 4명의 강사진만 메인 노출 가능
              </span>
            </li>

            <li>
              <span className="title">소속</span>
              <input
                className="text"
                defaultValue={instructor?.lecturer_division}
                readOnly={!isEditable}
                ref={lecturer_division_ref}
              />
            </li>

            <li>
              <span className="title">진료과</span>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                disabled={!isEditable}
              >
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={currentDepartment}
                  onChange={handleChange}
                >
                  {department?.map((x) => {
                    return (
                      <MenuItem key={x.code_id} value={x.code_no}>
                        {x.code_id}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {/* <input
                className="text"
                defaultValue={instructor?.tb_lecturer_department?.code_id}
                readOnly={!isEditable}
                // ref={periodRef}
              /> */}
            </li>

            <li className="xs12">
              <span className="title">직위</span>
              <input
                className="text"
                defaultValue={instructor?.lecturer_title}
                readOnly={!isEditable}
                ref={lecturer_title_ref}
              />
            </li>

            {/* <li className="xs12">
              <span className="title">사진업로드</span>
              <input
              className="text"
              // defaultValue={lecture.lecture_vimeo_url}
              readOnly={!isEditable}
              ref={lecture_vimeo_urlRef}
              />
            </li> */}
            <li className="xs12">
              <span
                className="title"
                style={{ height: 221, display: "inline-block" }}
              >
                학력
              </span>
              {/* <textarea
                className="text"
                defaultValue={instructor.lecturer_career}
                readOnly={!isEditable}
                ref={lecturer_career_ref}
              /> */}
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={10}
                defaultValue={instructor.lecturer_career}
                variant="outlined"
                // readOnly={!isEditable}
                inputProps={{
                  readOnly: !isEditable,
                }}
                className={classes.text_area}
              />
            </li>
            <li className="xs12">
              <span
                className="title"
                style={{ height: 330, display: "inline-block" }}
              >
                프로필사진
              </span>
              {/* <input
                className="text"
                // defaultValue={lecture.lecture_chat_url}
                readOnly={!isEditable}
                ref={lecture_chat_urlRef}
              /> */}
              <div className="profile_img">
                <Dropzone
                  isEditable={isEditable}
                  currentImage={instructor.tb_image.full_file_path}
                ></Dropzone>
              </div>
            </li>
          </ul>
        </Grid>
        <Grid container justify="flex-end" className="btn_wrap">
          {/* <ButtonType
            title="목록"
            className="gray"
            onClick={() => {
              history.push("/customer");
            }}
          /> */}
          {/* <ButtonType
            title="삭제하기"
            onClick={() => {
              setModalSw(true);
              // setModalOverflow(true);
            }}
          /> */}
        </Grid>
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
    </Wrapper>
  );
};

const MyPage = (props) => {
  const { state, setState } = props;
  const reducer = useSelector((state) => state.reducer);

  useEffect(() => {
    console.log(reducer.isLoading);
  }, [reducer.isLoading]);
  return (
    <Layout>
      <DetailComponent state={state} setState={setState} />
    </Layout>
  );
};

export default MyPage;
