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
  // const path = window.location.pathname.split("/")[1];

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const faq = reducer.faq;
  // const file = reducer.acceptedFile.file;

  const loadingFunction = useLoadingFunction();

  const list = async () => {
    try {
      let data = await apiObject.listCmsFaqs(
        {
          ...faq.list_params,
        },
        loadingFunction
      );
      console.log("list -> data", JSON.stringify(data));

      let responselistDepartments = await apiObject.listDepartments(
        {
          langCode: "ko-KR",
        },
        loadingFunction
      );
      console.log({ responselistDepartments });
      responselistDepartments.data.items.reverse();

      dispatch({
        type: "LIST_CMS_FAQS",
        payload: {
          faq_data: {
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
      let data = await apiObject.saveCmsFaqs(
        {
          ...faq.list_params,
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
  }, [faq.list_params]);

  return { save };
};
