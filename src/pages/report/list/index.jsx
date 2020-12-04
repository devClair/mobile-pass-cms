import React, { useEffect, useState, useRef } from "react";

import {
  Grid,
  Checkbox,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// react-router-dom
import { Route, useHistory } from "react-router-dom";

// layout
import Layout from "../../../layout";

// components
import Breadcrumb from "../../../components/breadcrumb";
import TableHeader from "../../../components/table-headerV2";
import Table from "../../../components/table";
import TableFooter from "../../../components/table-footerV2";
import {
  TableHeaderSortSpan,
  SearchComponent,
  DatePicker,
  SelectComponent,
  ButtonGroupComponent,
} from "../../../components/table-header-column";

// redux
import { useDispatch, useSelector } from "react-redux";

// viewLogic
import { useViewLogic } from "./viewLogic";

// react-data-export
import ReactExport from "react-data-export";

// react-hook-form
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const useStyles = makeStyles((theme) => ({
  test: { color: "red" },
}));

const HeaderComponent = (props) => {
  const reducer = useSelector((state) => state.reducer);
  const report = reducer.report;
  const dispatch = useDispatch();
  const { filter_list_type } = props;

  return (
    <SelectComponent
      className="selectOutlined"
      variant="outlined"
      items={filter_list_type.map((x) => reducer.filter_list_type[x])}
      current={report.list_params.filter_list_type}
      onChange={(item) => {
        dispatch({
          type: "SET_HADER_LIST_PARAMS",
          payload: {
            reducer_type: "report",
            list_params: {
              filter_list_type: item.key,
              current_page: 1,
            },
          },
        });
      }}
    />
  );
};

const List = (props) => {
  const { match, location } = props;

  let locationPathname = location.pathname;
  const classes = useStyles();

  const reducer = useSelector((state) => state.reducer);
  const report = reducer.report;
  const dispatch = useDispatch();
  const history = useHistory();
  const { save } = useViewLogic();

  const methods = useForm({
    defaultValues: {
      // user_type: "client_user",
    },
  });
  // const { watch, setValue, handleSubmit, reset } = methods;

  const [state, setState] = useState({
    orderColumn: [],
    filter_column: { key: "", value: [] },
    filter_column_2nd: { key: "", value: [] },
    search_filter: [],
    search_text: "",
  });

  const listParams = [
    {
      filter_list_type: "standard_q",
      order_column: ["user_name", "birth"],
      filter_column: { key: "filter_gender", value: ["all", "male", "female"] },
      filter_column_2nd: {
        key: "filter_test_result",
        value: ["all", "positive", "negative", "invalid"],
      },
      search_filter: ["user_name", "email", "remarks"],
    },
    {
      filter_list_type: "standard_f",
      order_column: ["user_name", "birth"],
      filter_column: { key: "filter_gender", value: ["all", "male", "female"] },
      filter_column_2nd: {
        key: "filter_test_result",
        value: ["all", "positive", "negative", "invalid"],
      },
      search_filter: ["user_name", "email", "remarks"],
    },
  ];

  const tableColumns = [
    {
      title: "번호",
      field: "user_no",
    },
    {
      title: "구분",
      field: "user_type",
    },
    {
      title: "이름",
      field: "user_name",
    },
    {
      title: "소속",
      field: "user_division",
    },
    {
      title: "진료과",
      field: "department_no",
      render: (rowData) => rowData?.tb_user_department?.code_id,
    },
    {
      title: "이메일주소",
      field: "user_email",
    },
    {
      title: "전화번호",
      field: "mobile_no",
    },
    {
      title: "가입 일자",
      field: "createdAt",
      render: (rowData) => new Date(rowData.createdAt).yyyymmdd(),
    },
    {
      title: "강사 권한 부여",
      field: "lecturer_status",
      type: "boolean",
      render: (rowData) => (
        <Checkbox
          checked={rowData.lecturer_status === 1 ? true : false}
          // className={classes.checkbox}
          // disabled
        />
      ),
    },
  ];

  const onChangeOrderColumn = (item) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "report",
        list_params: {
          order_column: item.key,
          // order_type,
          current_page: 1,
        },
      },
    });
  };

  const onChangeFilterCountryCode = (item) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "report",
        list_params: {
          filter_country_code: item.key,
          // order_type,
          current_page: 1,
        },
      },
    });
  };

  const onChangeFilterColumn = (item) => {
    // console.log({ item });
    // console.log({ state });
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "report",
        list_params: {
          [state.filter_column.key]: item.key,
          current_page: 1,
        },
      },
    });
  };
  const onChangeFilterColumn2nd = (item) => {
    // console.log({ item });
    // console.log({ state });
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "report",
        list_params: {
          [state.filter_column_2nd.key]: item.key,
          current_page: 1,
        },
      },
    });
  };

  const onSubmitSearchText = (params) => {
    // console.log({ value });
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "report",
        list_params: {
          search_filter: params.search_filter,
          search_text: params.search_text,
          // order_type,
          current_page: 1,
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
          items={state.orderColumn.map((x) => reducer.order_column[x])}
          current={report.list_params.order_column}
          onChange={onChangeOrderColumn}
          label="정렬"
        />
      ),
      position: "left",
    },

    {
      component: (
        <ButtonGroupComponent
          items={state.filter_column.value.map(
            (x) => reducer[state.filter_column.key][x]
          )}
          current={report.list_params[state.filter_column.key]}
          onClick={onChangeFilterColumn}
        />
      ),
      position: "left",
    },
    {
      component: (
        <ButtonGroupComponent
          items={state.filter_column_2nd.value.map(
            (x) => reducer[state.filter_column_2nd.key][x]
          )}
          current={report.list_params[state.filter_column_2nd.key]}
          onClick={onChangeFilterColumn2nd}
        />
      ),
      position: "left",
    },
    {
      component: (
        <SearchComponent
          // search_type_data={report.search_type_data}
          items={state.search_filter.map((x) => reducer.search_filter[x])}
          reducer_key="report"
          current={{
            search_filter: report.list_params.search_filter,
            search_text: report.list_params.search_text,
          }}
          // onChange={onChangeSearchFilter}
          onSubmit={onSubmitSearchText}
        />
      ),
      position: "right",
    },

    // {
    //   component: (
    //     <DatePicker
    //       filter_dt={report.list_params.filter_end_dt}
    //       onChange={onChangeDateColumn}
    //     />
    //   ),
    // },
  ];

  const onRowClick = (rowData) => {
    // history.push(`${match.url}/detail/${rowData.user_no}`);
  };

  const goToCreate = () => {
    history.push(`${match.url}/create`);
  };

  const onPageNoClick = (n) => {
    console.log("onPageNoClick -> n", n);

    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "report",
        list_params: {
          current_page: n,
        },
      },
    });
  };

  const onClickExcelButton = async (params) => {
    return await save();
  };

  const mounted = useRef(false);

  useEffect(() => {
    let changedByFilterListType = listParams.find(
      (x) => x.filter_list_type === report.list_params.filter_list_type
    );

    setState({
      ...state,
      orderColumn: changedByFilterListType.order_column,
      filter_column: changedByFilterListType.filter_column,
      filter_column_2nd: changedByFilterListType.filter_column_2nd,
      search_filter: changedByFilterListType.search_filter,
      search_text: changedByFilterListType.search_text,
    });

    if (!mounted.current) {
      mounted.current = true;
    } else {
      const [filter_gender, ...rest_filter_column] = listParams.map((x) => {
        return {
          [x.filter_column.key]: x.filter_column.value[0],
        };
      });
      const [filter_test_result, ...rest_filter_column_2nd] = listParams.map(
        (x) => {
          console.log(x.filter_column_2nd.key);
          console.log(x.filter_column_2nd.value[0]);
          return {
            [x.filter_column_2nd.key]: x.filter_column_2nd.value[0],
          };
        }
      );
      // console.log(filter_gender, filter_test_result);
      // console.log(rest_filter_column, rest_filter_column_2nd);

      dispatch({
        type: "SET_HADER_LIST_PARAMS",
        payload: {
          reducer_type: "report",
          list_params: {
            order_column: changedByFilterListType.order_column[0],
            ...filter_gender,
            ...filter_test_result,
            search_filter: changedByFilterListType.search_filter[0],
            search_text: "",
            current_page: 1,
          },
        },
      });
    }
  }, [report.list_params.filter_list_type]);

  return (
    <>
      <FormProvider {...methods}>
        <Layout
          headerComponent={
            <HeaderComponent
              filter_list_type={listParams.map((x) => x.filter_list_type)}
            />
          }
          locationPathname={locationPathname}
        >
          <TableHeader columns={tableHeaderColumns} searchComponent />
          <Table
            data={report.user_data.data}
            columns={tableColumns}
            onRowClick={onRowClick}
            options={{
              pageSize: 10,
              paging: true,
            }}
          />
          <TableFooter
            data={report.user_data.data}
            count={report.user_data.total_page}
            page={
              report.list_params.current_page
                ? report.list_params.current_page
                : 1
            }
            excel={true}
            onChangeCallback={onPageNoClick}
            createButton={false}
            // goToCreate={goToCreate}
            onExcelDownload={onClickExcelButton}
          ></TableFooter>
        </Layout>
      </FormProvider>
      <DevTool control={methods.control} />
    </>
  );
};
export default List;
