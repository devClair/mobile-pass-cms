import React, { useEffect, useState, useRef } from "react";

// @material-ui/core
import { Typography, Box, Button } from "@material-ui/core";

// @material-ui/core/styles
import { makeStyles } from "@material-ui/core/styles";

// react-router-dom
import { useHistory } from "react-router-dom";

// layout
import Layout from "../../../layout";

// redux
import { useDispatch, useSelector } from "react-redux";

import {
  SelectController,
  TextFieldController,
} from "../../../components/useFormComponents";

// viewLogic
import { useViewLogic } from "./viewLogic";

// react-data-export
import ReactExport from "react-data-export";

// react-hook-form
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const useStyles = makeStyles((theme) => ({
  test: { color: "red" },
  submitBtnBox: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const HeaderComponent = (props) => {
  const { reducer_key, filter_list_type } = props;
  const reducer = useSelector((state) => state.reducerMobilePass);
  const push = reducer[reducer_key];
  const dispatch = useDispatch();

  return (
    <Typography color="primary" variant="h6">
      {reducer.filter_list_type[filter_list_type[0]].label}
    </Typography>
  );
};

const Create = (props) => {
  const { match, location } = props;
  const locationPathname = location.pathname;
  const reducer_key = locationPathname.split("/")[1];

  const classes = useStyles();
  const [isReady, setIsReady] = useState(false);

  const reducer = useSelector((state) => state.reducerMobilePass);
  const push = reducer[reducer_key];
  const dispatch = useDispatch();
  const history = useHistory();
  const { save } = useViewLogic({ reducer_key: reducer_key });

  const methods = useForm({
    defaultValues: {
      user_type: "",
    },
  });
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    /* reset, */
    errors,
    setError,
    /* clearErrors  */
  } = methods;

  const listParams = [
    {
      filter_list_type: "app_push",
      order_column: ["created_at", "title"],
      filter_column: {
        key: "filter_user_type",
        value: ["all", "client", "business", "doctor"],
      },
      search_filter: ["title", "content"],
    },
  ];

  const onSubmit = (data) => {
    console.log({ data });
    // return updatePush({
    //   ...data,
    //   ...push.list_params,
    // });
  };

  // const tableColumns = [
  //   {
  //     title: "번호",
  //     field: "user_no",
  //   },
  //   {
  //     title: "구분",
  //     field: "user_type",
  //   },
  //   {
  //     title: "이름",
  //     field: "user_name",
  //   },
  //   {
  //     title: "소속",
  //     field: "user_division",
  //   },
  //   {
  //     title: "진료과",
  //     field: "department_no",
  //     render: (rowData) => rowData?.tb_user_department?.code_id,
  //   },
  //   {
  //     title: "이메일주소",
  //     field: "user_email",
  //   },
  //   {
  //     title: "전화번호",
  //     field: "mobile_no",
  //   },
  //   {
  //     title: "가입 일자",
  //     field: "createdAt",
  //     render: (rowData) => new Date(rowData.createdAt).yyyymmdd(),
  //   },
  //   {
  //     title: "강사 권한 부여",
  //     field: "lecturer_status",
  //     type: "boolean",
  //     render: (rowData) => (
  //       <Checkbox
  //         checked={rowData.lecturer_status === 1 ? true : false}
  //         // className={classes.checkbox}
  //         // disabled
  //       />
  //     ),
  //   },
  // ];

  const goToList = () => {
    history.push(`${match.url}`);
  };

  useEffect(() => {
    Object.keys(watch()).find((x) => Boolean(watch(x)) === false)
      ? setIsReady(false)
      : setIsReady(true);
  }, [watch()]);

  return (
    <>
      <FormProvider {...methods}>
        <Layout
          headerComponent={
            <HeaderComponent
              reducer_key={reducer_key}
              filter_list_type={listParams.map((x) => x.filter_list_type)}
            />
          }
          locationPathname={locationPathname}
        >
          <Box py={3} px={5} maxWidth={1000}>
            <Typography variant="h6">푸쉬알림 등록</Typography>
            <Box py={2}>
              <Box py={2}>
                <Typography variant="body1" gutterBottom>
                  <Box fontWeight={500}>대상 선택</Box>
                </Typography>
                <SelectController
                  name="user_type"
                  className="outlinedCustom"
                  placeholder="선택"
                  menuItems={[
                    {
                      key: "일반회원",
                      value: "client",
                    },
                    {
                      key: "의료진",
                      value: "doctor",
                    },
                    {
                      key: "사업자회원",
                      value: "business",
                    },
                  ]}
                  errors={errors}
                />
              </Box>
              <Box py={2}>
                <Typography variant="body1" gutterBottom>
                  <Box fontWeight={500}>제목 입력</Box>
                </Typography>
                <TextFieldController
                  name="title"
                  className="outlinedCustom"
                  placeholder="푸쉬알림 제목을 입력해주세요"
                  errors={errors}
                  noCheck
                />
              </Box>
              <Box py={2}>
                <Typography variant="body1" gutterBottom>
                  <Box fontWeight={500}>내용 입력</Box>
                </Typography>
                <TextFieldController
                  name="content"
                  className="outlinedCustom"
                  placeholder="푸쉬알림 내용을 입력해주세요"
                  multilin
                  errors={errors}
                  multiline
                  rows={10}
                  noCheck
                />
              </Box>
            </Box>
            <div className={classes.submitBtnBox}>
              <Button
                onClick={() => {
                  handleSubmit(onSubmit)();
                }}
                variant="contained"
                color={isReady ? "primary" : "default"}
                size="large"
              >
                저장하기
              </Button>
            </div>
          </Box>
        </Layout>
      </FormProvider>
      <DevTool control={methods.control} />
    </>
  );
};
export default Create;
