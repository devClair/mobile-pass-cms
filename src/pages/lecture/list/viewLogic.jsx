import React, { useEffect, useState } from "react";

// apiObject
import { apiObject } from "../../../api";

// redux
import { useDispatch, useSelector } from "react-redux";

// storage
import { Storage } from "@psyrenpark/storage";

//uuid
import { v4 as uuidv4 } from "uuid";

// hooks
import useLoadingFunction from "../../../Hooks/useLoadingFunction";

export const useViewLogic = () => {
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const lecture = reducer.lecture;

  const loadingFunction = useLoadingFunction();

  const list = async () => {
    try {
      let data = await apiObject.listCmsLectures(
        {
          ...lecture.list_params,
          // order_column: lecture.list_params.order_column,
          // order_type: lecture.list_params.order_type,
          // current_page: lecture.list_params.current_page,
          // filter_begin_dt: lecture.list_params.selectedDate1,
          // filter_end_dt: lecture.list_params.selectedDate2,
          // search_lecturer_name:
          //   lecture.list_params.search_type?.search_column === "lecturer_name"
          //     ? lecture.list_params.search_text
          //     : null,
        },
        loadingFunction
      );
      // console.log("list -> data", JSON.stringify(data))

      let responselistDepartments = await apiObject.listDepartments(
        {
          langCode: "ko",
        },
        loadingFunction
      );

      responselistDepartments.data.items.reverse();

      dispatch({
        type: "LIST_CMS_LECTURES",
        payload: {
          lecture_data: {
            code: data.code,
            data: data.data.items,
            next_token: data.data.next_token,
            total_count: data.data.total_count,
            total_page: data.data.total_page,
            current_page: data.data.current_page,
          },
          department_info: responselistDepartments.data.items,
        },
      });
      console.log("LIST_CMS_LECTURES -> success");
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
      let data = await apiObject.saveCmsLectures(
        {
          ...lecture.list_params,
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
  }, [lecture.list_params]);

  return { save };
};
