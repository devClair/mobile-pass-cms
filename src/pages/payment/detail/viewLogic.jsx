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

export const useViewLogic = (props) => {
  // const path = window.location.pathname.split("/")[1];

  const { lecture_no } = props;

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const loadingFunction = useLoadingFunction();

  const get = async () => {
    try {
      let responseGetCmsLectures = await apiObject.getCmsLectures(
        //TODO getCmsPayment를 사용해야할수도 있음
        {
          lecture_no: lecture_no,
        },
        loadingFunction
      );
      console.log({ responseGetCmsLectures });
      let responselistDepartments = await apiObject.listDepartments(
        {
          langCode: "ko",
        },
        loadingFunction
      );
      console.log({ responselistDepartments });
      responselistDepartments.data.items.reverse();

      dispatch({
        type: "GET_CMS_LECTURES",
        payload: {
          lecture_data: {
            code: responseGetCmsLectures.code,
            data: [responseGetCmsLectures.data.item],
          },
          department_info: responselistDepartments.data.items,
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
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {};
};
