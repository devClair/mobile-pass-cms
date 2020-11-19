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

  const inquiry = reducer.inquiry;

  const loadingFunction = useLoadingFunction();

  const listCmsInquirys = async () => {
    try {
      let data = await apiObject.listCmsInquirys(
        {
          ...inquiry.list_params,
        },
        loadingFunction
      );
      // console.log("list -> data", JSON.stringify(data));
      const responseListCmsInquirys = data;
      console.log({ responseListCmsInquirys });
      let responselistDepartments = await apiObject.listDepartments(
        {
          langCode: "ko-KR",
        },
        loadingFunction
      );
      console.log({ responselistDepartments });
      responselistDepartments.data.items.reverse();
      dispatch({
        type: "LIST_CMS_INQUIRYS",
        payload: {
          inquiry_data: {
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
      let data = await apiObject.saveCmsInquirys(
        {
          ...inquiry.list_params,
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
    listCmsInquirys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inquiry.list_params]);

  return { save };
};
