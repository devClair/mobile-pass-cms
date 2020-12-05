import React, { useEffect, useState, useRef } from "react";

// @material-ui/core
import { Checkbox } from "@material-ui/core";

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

// redux
import { useDispatch, useSelector } from "react-redux";

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
  const id = reducer[reducer_key];
  const dispatch = useDispatch();

  return (
    <SelectComponent
      className="selectOutlined"
      variant="outlined"
      items={filter_list_type.map((x) => reducer.filter_list_type[x])}
      current={id.list_params.filter_list_type}
      onChange={(item) => {
        dispatch({
          type: "SET_LIST_PARAMS",
          payload: {
            reducer_key: reducer_key,
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
  const locationPathname = location.pathname;
  const reducer_key = locationPathname.split("/")[1];

  const reducer = useSelector((state) => state.reducerMobilePass);
  const id = reducer[reducer_key];
  const dispatch = useDispatch();
  const history = useHistory();
  const { save } = useViewLogic({ reducer_key: reducer_key });

  const methods = useForm({
    defaultValues: {
      // user_type: "client_user",
    },
  });
  // const { watch, setValue, handleSubmit, reset } = methods;

  const [state, setState] = useState({
    orderColumn: [],
    searchFilter: [],
    searchText: "",
  });

  const listParams = [
    {
      filter_list_type: "id_management",
      order_column: ["created_at", "medical_institution"],
      search_filter: ["id", "medical_institution"],
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
      type: "SET_LIST_PARAMS",
      payload: {
        reducer_key: reducer_key,
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
      type: "SET_LIST_PARAMS",
      payload: {
        reducer_key: reducer_key,
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
      type: "SET_LIST_PARAMS",
      payload: {
        reducer_key: reducer_key,
        list_params: {
          [state.filterColumn.key]: item.key,
          current_page: 1,
        },
      },
    });
  };

  const onSubmitSearchText = (params) => {
    // console.log({ value });
    dispatch({
      type: "SET_LIST_PARAMS",
      payload: {
        reducer_key: reducer_key,
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
          items={state.orderColumn.map((x) => {
            // console.log(reducer.order_column[x]);
            if (reducer.order_column[x].key === "created_at")
              return { ...reducer.order_column[x], label: "ID 생성일자" };
            return reducer.order_column[x];
          })}
          current={id.list_params.order_column}
          onChange={onChangeOrderColumn}
          label="정렬"
        />
      ),
      position: "left",
    },

    {
      component: (
        <SearchComponent
          items={state.searchFilter.map((x) => reducer.search_filter[x])}
          reducer_key={reducer_key}
          current={{
            search_filter: id.list_params.search_filter,
            search_text: id.list_params.search_text,
          }}
          onSubmit={onSubmitSearchText}
        />
      ),
      position: "right",
    },
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
      type: "SET_LIST_PARAMS",
      payload: {
        reducer_key: reducer_key,
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
      (x) => x.filter_list_type === id.list_params.filter_list_type
    );

    setState({
      ...state,
      orderColumn: changedByFilterListType.order_column,
      searchFilter: changedByFilterListType.search_filter,
      searchText: changedByFilterListType.search_text,
    });

    if (!mounted.current) {
      mounted.current = true;
    } else {
      dispatch({
        type: "SET_LIST_PARAMS",
        payload: {
          reducer_key: reducer_key,
          list_params: {
            order_column: changedByFilterListType.order_column[0],
            search_filter: changedByFilterListType.search_filter[0],
            search_text: "",
            current_page: 1,
          },
        },
      });
    }
  }, [id.list_params.filter_list_type]);

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
          <TableHeader columns={tableHeaderColumns} searchComponent />
          <Table
            data={id.table_data.data}
            columns={tableColumns}
            onRowClick={onRowClick}
            options={{
              pageSize: 10,
              paging: true,
            }}
          />
          <TableFooter
            data={id.table_data.data}
            count={id.table_data.total_page}
            page={id.list_params.current_page ? id.list_params.current_page : 1}
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
