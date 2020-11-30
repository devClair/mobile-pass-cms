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
import Wrapper from "./styles";

import { Route, useHistory, Link } from "react-router-dom";

// layout
import Layout from "../../../layout";

// components
import Breadcrumb from "../../../components/breadcrumb";
import TableHeader from "../../../components/table-headerV2";
import Table from "../../../components/table";
import TableFooter from "../../../components/table-footerV2";
import {
  TableHeaderSortSpan,
  SearchFilter,
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
  checkbox: {
    // height: "unset!important",
    // marginTop: "5px",
    color: "rgba(0, 0, 0, 0.54)!important",
  },
}));

const HeaderComponent = (props) => {
  const reducer = useSelector((state) => state.reducer);
  const user = reducer.user;
  const dispatch = useDispatch();
  const { filter_list_type } = props;

  return (
    <SelectComponent
      className="selectOutlined"
      variant="outlined"
      items={filter_list_type.map((x) => reducer.filter_list_type[x])}
      current={user.list_params.filter_list_type}
      onChange={(item) => {
        dispatch({
          type: "SET_HADER_LIST_PARAMS",
          payload: {
            reducer_type: "user",
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
  const user = reducer.user;
  const dispatch = useDispatch();
  const history = useHistory();
  const { save } = useViewLogic();

  const methods = useForm({
    defaultValues: {
      user_type: "client_user",
    },
  });
  const { watch, setValue, handleSubmit, reset } = methods;

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
          className={classes.checkbox}
          disabled
        />
      ),
    },
  ];
  const [state, setState] = useState({
    orderColumn: [],
    filter_column: { key: "", value: [] },
  });

  const listParams = [
    {
      filter_list_type: "client_user",
      order_column: ["user_name", "email"],
      filter_column: { key: "filter_gender", value: ["all", "male", "female"] },
    },
    {
      filter_list_type: "business_user",
      order_column: ["business_name", "history", "join_dt"],
      filter_column: {
        key: "filter_is_approved",
        value: ["all", "awating", "approved"],
      },
    },
  ];

  const onChangeOrderColumn = (item) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "user",
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
        reducer_type: "user",
        list_params: {
          filter_country_code: item.key,
          // order_type,
          current_page: 1,
        },
      },
    });
  };

  const onChangeFilterColumn = (item) => {
    console.log({ item });
    console.log({ state });
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "user",
        list_params: {
          [state.filter_column.key]: item.key,
          current_page: 1,
        },
      },
    });
  };

  const onChangeDateColumn = ({ filter_begin_dt, filter_end_dt }) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "user",
        list_params: {
          filter_begin_dt,
          filter_end_dt,
          current_page: 1,
        },
      },
    });
  };

  const onChangeSearchColumn = ({ searchText, menuItem }) => {
    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "user",
        list_params: {
          [menuItem]: searchText,
          current_page: 1,
        },
      },
    });
  };

  const tableHeaderColumns = [
    {
      component: (
        <SelectComponent
          className="selectOutlined"
          variant="outlined"
          items={state.orderColumn.map((x) => reducer.order_column[x])}
          current={user.list_params.order_column}
          onChange={onChangeOrderColumn}
        />
      ),
    },
    {
      component: (
        <SelectComponent
          className="selectOutlined"
          variant="outlined"
          items={reducer.filter_country_code}
          current={user.list_params.filter_country_code}
          onChange={onChangeFilterCountryCode}
        />
      ),
    },
    {
      component: (
        <ButtonGroupComponent
          items={state.filter_column.value.map(
            (x) => reducer[state.filter_column.key][x]
          )}
          current={user.list_params[state.filter_column.key]}
          onClick={onChangeFilterColumn}
        />
      ),
    },
    // {
    //   component: (
    //     <TableHeaderSortSpan
    //       order_key="createdAt"
    //       order_data={reducer.sort_span_dic["createdAt"]}
    //       order_column={user?.list_params?.order_column}
    //       onChange={onChangeOrderColumn}
    //     />
    //   ),
    // },
    // {
    //   component: (
    //     <TableHeaderSortSpan
    //       order_key="lecturer_status"
    //       order_data={reducer.sort_span_dic["lecturer_status"]}
    //       order_column={user?.list_params?.order_column}
    //       onChange={onChangeOrderColumn}
    //     />
    //   ),
    // },
    // {
    //   component: (
    //     <DatePicker
    //       filter_dt={user.list_params.filter_end_dt}
    //       onChange={onChangeDateColumn}
    //     />
    //   ),
    // },
    // {
    //   component: (
    //     <SearchFilter
    //       search_type_data={user.search_type_data}
    //       onChange={onChangeSearchColumn}
    //     />
    //   ),
    // },
  ];

  const onRowClick = (rowData) => {
    history.push(`${match.url}/detail/${rowData.user_no}`);
  };

  const goToCreate = () => {
    history.push(`${match.url}/create`);
  };

  const onPageNoClick = (n) => {
    console.log("onPageNoClick -> n", n);

    dispatch({
      type: "SET_HADER_LIST_PARAMS",
      payload: {
        reducer_type: "user",
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
      (x) => x.filter_list_type === user.list_params.filter_list_type
    );
    setState({
      ...state,
      orderColumn: changedByFilterListType.order_column,
      filter_column: changedByFilterListType.filter_column,
    });
    if (!mounted.current) {
      mounted.current = true;
    } else {
      const [filter_gender, filter_is_approved] = listParams.map((x) => {
        return {
          [x.filter_column.key]: x.filter_column.value[0],
        };
      });

      dispatch({
        type: "SET_HADER_LIST_PARAMS",
        payload: {
          reducer_type: "user",
          list_params: {
            order_column: changedByFilterListType.order_column[0],
            ...filter_gender,
            ...filter_is_approved,
            current_page: 1,
          },
        },
      });
    }
  }, [user.list_params.filter_list_type]);

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
          <Grid className="customer">
            <Grid className="table_wrap">
              <TableHeader columns={tableHeaderColumns} searchComponent />
              <Grid className="table">
                <Table
                  data={user.user_data.data}
                  columns={tableColumns}
                  onRowClick={onRowClick}
                  options={{
                    pageSize: 10,
                    paging: true,
                  }}
                />
              </Grid>
              <TableFooter
                data={user.user_data.data}
                count={user.user_data.total_page}
                page={
                  user.list_params.current_page
                    ? user.list_params.current_page
                    : 1
                }
                excel={true}
                onChangeCallback={onPageNoClick}
                createButton={false}
                goToCreate={goToCreate}
                onExcelDownload={onClickExcelButton}
              ></TableFooter>
            </Grid>
          </Grid>
        </Layout>
      </FormProvider>
      <DevTool control={methods.control} />
    </>
  );
};
export default List;
