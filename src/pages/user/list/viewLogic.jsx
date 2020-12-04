import React, { useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

// apiObject
import { apiObject, apiObjectMobilePass } from "../../../api";
import { Storage } from "@psyrenpark/storage";
import { v4 as uuidv4 } from "uuid";

// hooks
import useLoadingFunction from "../../../Hooks/useLoadingFunction";

export const useViewLogic = () => {
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const user = reducer.user;

  const loadingFunction = useLoadingFunction();

  const list = async () => {
    try {
      let data = await apiObject.listCmsUsers(
        {
          ...user.list_params,
          // order_column: user.list_params.order_column,
          // order_type: user.list_params.order_type,
          // current_page: user.list_params.current_page,
          // filter_begin_dt: user.list_params.selectedDate1,
          // filter_end_dt: user.list_params.selectedDate2,
          // search_name:
          //   user.list_params.search_type?.search_column === "lecturer_name"
          //     ? user.list_params.search_text
          //     : null,
        },
        loadingFunction
      );
      // console.log("list -> data", JSON.stringify(data));
      const responseListCmsUsers = data;
      console.log({ responseListCmsUsers });

      let responselistDepartments = await apiObject.listDepartments(
        {
          langCode: "ko-KR",
        },
        loadingFunction
      );

      responselistDepartments.data.items.reverse();
      dispatch({
        type: "LIST_CMS_USERS",
        payload: {
          user_data: {
            code: data.code,
            data: data.data.items,
            next_token: data.data.next_token,
            total_count: data.data.total_count,
            total_page: data.data.total_page,
            current_page: data.data.current_page,
          },
          department_info: data.data.items,
        },
      });
      // console.log("LIST_CMS_LECTURES -> success");
    } catch (error) {
      // alert(error);
      // console.log("Error", error);
      // console.log("Error", error.code);
      // console.log("Error", error.message);
      // console.log("Error", error.response.data);
    }
  };

  const save = async () => {
    var file_url = null;

    try {
      let data = await apiObject.saveCmsUsers(
        {
          ...user.list_params,
          // order_column: user.list_params.order_column,
          // order_type: user.list_params.order_type,
          // current_page: user.list_params.current_page,
          // filter_begin_dt: user.list_params.selectedDate1,
          // filter_end_dt: user.list_params.selectedDate2,
          // search_name:
          //   user.list_params.search_type?.search_column === "lecturer_name"
          //     ? user.list_params.search_text
          //     : null,
        },
        loadingFunction
      );

      file_url = data.data.file_url;
    } catch (error) {
      alert(error);
      alert(error?.response?.data?.data?.message);
      // console.log("Error", error);
      // console.log("Error", error.code);
      // console.log("Error", error.message);
      // console.log("Error", error.response.data.message);
      file_url = "fail";
    }

    return file_url;
  };

  const test = async () => {
    try {
      let responseApiObjectMobilePass = await apiObjectMobilePass.getTest(
        {},
        loadingFunction
      );
      // console.log("list -> data", JSON.stringify(data));

      console.log({ responseApiObjectMobilePass });

      console.log("LIST_CMS_LECTURES -> success");
    } catch (error) {
      // alert(error);
      // console.log("Error", error);
      // console.log("Error", error.code);
      // console.log("Error", error.message);
      // console.log("Error", error.response.data);
    }
  };

  useEffect(() => {
    list();
    // test();
  }, [user.list_params]);

  return { save };
};
