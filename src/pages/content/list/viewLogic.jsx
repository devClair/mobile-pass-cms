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

  const content = reducer.content;

  const loadingFunction = useLoadingFunction();

  const listCmsContents = async () => {
    try {
      let data = await apiObject.listCmsContents(
        {
          order_column: content.list_params.order_column,
          order_type: content.list_params.order_type,
          current_page: content.list_params.current_page,
          filter_begin_dt: content.list_params.selectedDate1,
          filter_end_dt: content.list_params.selectedDate2,
          content_type: content.list_params.content_type,
          // search_name:
          //   content.list_params.search_type?.search_column === "lecturer_name"
          //     ? content.list_params.search_text
          //     : null,
        },
        loadingFunction
      );
      console.log("listCmsContents -> data", JSON.stringify(data));

      let responselistDepartments = await apiObject.listDepartments(
        {
          langCode: "ko-KR",
        },
        loadingFunction
      );
      responselistDepartments.data.items.reverse();
      dispatch({
        type: "LIST_CMS_CONTENTS",
        payload: {
          content_data: {
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

  useEffect(() => {
    listCmsContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content.list_params]);

  return {};
};
