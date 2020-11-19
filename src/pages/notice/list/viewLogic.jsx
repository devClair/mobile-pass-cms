import React, { useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

// apiObject
import { apiObject } from "../../../api";
import { Storage } from "@psyrenpark/storage";
import { v4 as uuidv4 } from "uuid";

// hooks
import useLoadingFunction from "../../../Hooks/useLoadingFunction";

export const useViewLogic = () => {
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const notice = reducer.notice;

  const loadingFunction = useLoadingFunction();

  const list = async () => {
    try {
      console.log(notice.list_params);
      let data = await apiObject.listCmsNotices(
        {
          ...notice.list_params,
          // order_column: notice.list_params.order_column,
          // order_type: notice.list_params.order_type,
          // current_page: notice.list_params.current_page,
          // filter_begin_dt: new Date(notice.list_params.filter_begin_dt).toISOString(),
          // filter_end_dt: notice.list_params.filter_end_dt.toISOString(),
          // filter_begin_dt: new Date().toISOString(),
          // filter_end_dt: new Date().toISOString(),
          // search_name:
          //   notice.list_params.search_type?.search_column === "lecturer_name"
          //     ? notice.list_params.search_text
          //     : null,
        },
        loadingFunction
      );
      // console.log("listCmsNotices -> data", JSON.stringify(data));
      const responseListCmsNotices = data;
      console.log({ responseListCmsNotices });

      let responselistDepartments = await apiObject.listDepartments(
        {
          langCode: "ko-KR",
        },
        loadingFunction
      );
      responselistDepartments.data.items.reverse();
      dispatch({
        type: "LIST_CMS_NOTICES",
        payload: {
          notice_data: {
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
    } catch (error) {
      alert(error);
      console.log("Error", error);
      console.log("Error", error.code);
      console.log("Error", error.message);
      console.log("Error", error.response.data);
    }
  };

  const save = async () => {
    var file_url = null;

    try {
      let data = await apiObject.saveCmsNotices(
        {
          ...notice.list_params,
        },
        loadingFunction
      );

      file_url = data.data.file_url;
    } catch (error) {
      alert(error?.response?.data?.data?.message);
      file_url = "fail";
    }

    return file_url;
  };

  useEffect(() => {
    list();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notice.list_params]);

  return { save };
};
