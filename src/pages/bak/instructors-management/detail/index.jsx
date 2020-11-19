import React, { useContext, useState, useRef, useEffect } from "react";

import Layout from "../../../layout";
import { Grid, IconButton, Button } from "@material-ui/core";
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
import Breadcrumb from "../../../components/breadcrumb";
import Radio from "../../../components/radio";
import { Modal } from "../../../components/modal/";
import ButtonType from "../../../components/button-type/";

import { updateCmsLecture } from "./viewLogic";

const useStyles = makeStyles((theme) => ({
  upload_button: {
    color: "white",
    backgroundColor: "rgba(76,175,80,1.0)",
  },
}));

const tempRadio = [
  { key: 0, value: "정상" },
  { key: 1, value: "정지" },
];

const DetailComponent = (props) => {
  const classes = useStyles();
  const { state, setState } = props;
  const lecture = state.rowData;
  const history = useHistory();
  const [modalSw, setModalSw] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const lecture_departmentRef = useRef("");
  const lecture_diseaseRef = useRef("");
  const lecture_nameRef = useRef("");
  const user_noRef = useRef("");
  const uploaderRef = useRef("");
  const periodRef = useRef("");
  const best_bare_stateRef = useRef("");
  const bare_orderRef = useRef("");
  const lecture_vimeo_urlRef = useRef("");
  const lecture_chat_urlRef = useRef("");
  const lecture_stateRef = useRef("");
  const lecture_contentRef = useRef("");
  const tag_listRef = useRef("");
  console.log(state);

  const onsubmit = () => {
    updateCmsLecture({
      lecture_no: lecture.lecture_no,
      best_bare_state: best_bare_stateRef.current.value,
      begin_dt: best_bare_stateRef.current.value,
      end_dt: best_bare_stateRef.current.value,
      lecture_vimeo_url: lecture_vimeo_urlRef.current.value,
      lecture_chat_url: lecture_chat_urlRef.current.value,
      lecture_content: lecture_contentRef.current.value,
      lecture_state: lecture_stateRef.current.value,
    });
  };

  return (
    <Wrapper isEditable={isEditable}>
      <Grid className="customer_detail">
        <Breadcrumb pb={0} title="강의관리" text="" />
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
                setIsEditable(!isEditable);
                if (isEditable) {
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
              <span className="title">진료과</span>
              <input
                className="text"
                defaultValue={lecture.lecture_department}
                readOnly={!isEditable}
                ref={lecture_departmentRef}
              />
            </li>
            <li>
              <span className="title">병증</span>
              <input
                className="text"
                defaultValue={"병증필요"}
                readOnly={!isEditable}
                ref={lecture_diseaseRef}
              />
            </li>
            <li>
              <span className="title">강의명</span>
              <input
                className="text"
                defaultValue={lecture.lecture_name}
                readOnly={!isEditable}
                ref={lecture_nameRef}
              />
            </li>
            <li>
              <span className="title">강사명</span>
              <input
                className="text"
                defaultValue={lecture.user_no}
                readOnly={!isEditable}
                ref={user_noRef}
              />
            </li>
            <li>
              <span className="title">작성자</span>
              {/* <span className="text">{lecture.user_department}</span> */}
              <input
                className="text"
                defaultValue={"작성자 필요"}
                readOnly={!isEditable}
                ref={uploaderRef}
              />
            </li>
            <li>
              <span className="title">기간</span>
              <input
                className="text"
                defaultValue={lecture.begin_dt}
                readOnly={!isEditable}
                ref={periodRef}
              />
            </li>
            <li>
              <span className="title">Best노출</span>
              {/* <span className="text">
                <Radio data={tempRadio} />
              </span> */}
              <input
                className="text"
                defaultValue={lecture.best_bare_state}
                readOnly={!isEditable}
                ref={best_bare_stateRef}
              />
            </li>
            <li>
              <span className="title">노출순서</span>
              {/* <span className="text">{lecture.best_bare_state}</span> */}
              <input
                className="text"
                defaultValue={"노출순서 필요"}
                readOnly={!isEditable}
                ref={bare_orderRef}
              />
            </li>
            <li>
              <span className="title">동영상링크</span>
              <input
                className="text"
                defaultValue={lecture.lecture_vimeo_url}
                readOnly={!isEditable}
                ref={lecture_vimeo_urlRef}
              />
            </li>
            <li>
              <span className="title">채팅창코드</span>
              <input
                className="text"
                defaultValue={lecture.lecture_chat_url}
                readOnly={!isEditable}
                ref={lecture_chat_urlRef}
              />
            </li>
            <li className="xs12">
              <span className="title">승인</span>
              <input
                className="text"
                defaultValue={lecture.lecture_state}
                readOnly={!isEditable}
                ref={lecture_stateRef}
              />
            </li>
            <li className="xs12">
              <span className="title">내용</span>
              <input
                className="text"
                defaultValue={lecture.lecture_content}
                readOnly={!isEditable}
                ref={lecture_contentRef}
              />
            </li>
            <li className="xs12">
              <span className="title">태그 목록</span>
              {/* <span className="text">{lecture.best_bare_state}</span> */}
              <input
                className="text"
                defaultValue={"#태그목록 필요"}
                readOnly={!isEditable}
                ref={tag_listRef}
              />
            </li>
          </ul>
        </Grid>
        <Grid container justify="flex-end" className="btn_wrap">
          <ButtonType
            title="목록"
            className="gray"
            onClick={() => {
              // history.push("/customer");
              setState({ ...state, isDetail: false });
            }}
          />
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

const Detail = (props) => {
  const { state, setState } = props;
  return <DetailComponent state={state} setState={setState} />;
};

export default Detail;
