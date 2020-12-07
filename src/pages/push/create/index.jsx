import React, { useEffect, useState, useRef } from "react";

// @material-ui/core
import { Typography, Box } from "@material-ui/core";

// @material-ui/core/styles
import { makeStyles } from "@material-ui/core/styles";

// react-router-dom
import { useHistory } from "react-router-dom";

// layout
import Layout from "../../../layout";

// redux
import { useDispatch, useSelector } from "react-redux";

import { SelectController } from "../../../components/useFormComponents";

// viewLogic
import { useViewLogic } from "./viewLogic";

// react-data-export
import ReactExport from "react-data-export";

// react-hook-form
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const useStyles = makeStyles((theme) => ({
  test: { color: "red" },
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

  const reducer = useSelector((state) => state.reducerMobilePass);
  const push = reducer[reducer_key];
  const dispatch = useDispatch();
  const history = useHistory();
  const { save } = useViewLogic({ reducer_key: reducer_key });

  const methods = useForm({
    defaultValues: {
      name: "value",
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
          <Box py={3} px={5}>
            <Typography variant="h6">푸쉬알림 등록</Typography>
            <Box py={2}>
              <Box py={1}>
                <Typography variant="body1">대상 선택</Typography>
                <SelectController
                  name="user_type"
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
                />
              </Box>
              <Box py={1}>
                <Typography variant="body1">제목 입력</Typography>
              </Box>
            </Box>
          </Box>
        </Layout>
      </FormProvider>
      <DevTool control={methods.control} />
    </>
  );
};
export default Create;
