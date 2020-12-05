import React, { useEffect, useState, useRef } from "react";

// @material-ui/core
import { Box, Button, Checkbox, TextField } from "@material-ui/core";

// @material-ui/core/styles
import { makeStyles } from "@material-ui/core/styles";

// react-router-dom
import { useHistory } from "react-router-dom";

// layout
import Layout from "../../../layout";

// components/table-headerV2
import TableHeader from "../../../components/table-headerV2";

// components/table
import Table from "../../../components/table";

// components/table-footerV2
import TableFooter from "../../../components/table-footerV2";

// components/table-header-column
import {
  SearchComponent,
  SelectComponent,
  ButtonGroupComponent,
} from "../../../components/table-header-column";

import { TextFieldController } from "../../../components/useFormComponents";

// redux
import { useDispatch, useSelector } from "react-redux";

// viewLogic
import { useViewLogic } from "./viewLogic";

// react-data-export
import ReactExport from "react-data-export";

// react-hook-form & @hookform
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
  const terms = reducer[reducer_key];
  const dispatch = useDispatch();

  return (
    <SelectComponent
      className="selectOutlined"
      variant="outlined"
      items={filter_list_type.map((x) => reducer.filter_list_type[x])}
      current={terms.list_params.filter_list_type}
      onChange={(item) => {
        dispatch({
          type: "SET_LIST_PARAMS",
          payload: {
            reducer_key: reducer_key,
            list_params: {
              filter_list_type: item.key,
            },
          },
        });
      }}
    />
  );
};

const List = (props) => {
  const { match, location } = props;
  const locationPathname = location.pathname;
  const reducer_key = locationPathname.split("/")[1];
  const classes = useStyles();

  const [isReady, setIsReady] = useState(false);

  const reducer = useSelector((state) => state.reducerMobilePass);
  const terms = reducer[reducer_key];
  const dispatch = useDispatch();
  const history = useHistory();
  const { save, updateTerms } = useViewLogic({ reducer_key: reducer_key });

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
      filter_list_type: "terms_of_service",
    },
    {
      filter_list_type: "privacy_policy",
    },
  ];

  const onChangeFilterCountryCode = (item) => {
    dispatch({
      type: "SET_LIST_PARAMS",
      payload: {
        reducer_key: reducer_key,
        list_params: {
          filter_country_code: item.key,
        },
      },
    });
  };

  const tableHeaderColumns = [
    {
      component: (
        <SelectComponent
          className="outlinedCustomHeader"
          variant="outlined"
          items={reducer.filter_country_code}
          current={terms.list_params.filter_country_code}
          onChange={onChangeFilterCountryCode}
          label="국가"
        />
      ),
      position: "left",
    },
  ];

  const onSubmit = (data) => {
    return updateTerms({
      ...data,
      ...terms.list_params,
    });
  };

  const onClickExcelButton = async (params) => {
    return await save();
  };

  useEffect(() => {
    Object.keys(watch()).find((x) => Boolean(watch(x)) === false)
      ? setIsReady(false)
      : setIsReady(true);
  }, [watch()]);

  useEffect(() => {
    console.log(`content : ${terms.content}`);
    setValue("content", terms.content);
  }, [terms.content]);

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
          <TableHeader columns={tableHeaderColumns} />
          <Box px={6} pb={5}>
            <Box pb={3}>
              <FormProvider {...methods}>
                <TextFieldController
                  name="content"
                  className="termsInput"
                  placeholder="해당 내용이 없습니다."
                  errors={errors}
                  multiline
                  rows={29}
                  noCheck
                />
              </FormProvider>
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
export default List;
