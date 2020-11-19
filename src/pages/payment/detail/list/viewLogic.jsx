import React, { useEffect, useState } from "react";

// apiObject
import { apiObject } from "../../../../api";

// redux
import { useDispatch, useSelector } from "react-redux";

// storage
import { Storage } from "@psyrenpark/storage";

//uuid
import { v4 as uuidv4 } from "uuid";

// hooks
import useLoadingFunction from "../../../../Hooks/useLoadingFunction";

export const useViewLogic = (lecture_no) => {
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const reg_lecture = reducer.reg_lecture;

  const loadingFunction = useLoadingFunction();

  const list = async () => {
    try {
      let data = await apiObject.listCmsPaymentsHistorys(
        {
          ...reg_lecture.list_params,
          lecture_no: lecture_no,
          // lecture_no: 16,
        },
        loadingFunction
      );
      console.log("list -> data", JSON.stringify(data));

      let responselistDepartments = await apiObject.listDepartments(
        {
          langCode: "ko",
        },
        loadingFunction
      );

      responselistDepartments.data.items.reverse();

      dispatch({
        type: "LIST_CMS_REG_LECTURES",
        payload: {
          reg_lecture_data: {
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
      let data = await apiObject.saveCmsPaymentsHistorys(
        {
          ...reg_lecture.list_params,
          lecture_no: lecture_no,
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

  const sendEmail = async (props) => {
    console.log("sendSms -> props", props);

    const { title, body } = props;

    try {
      let data = await apiObject.sendCmsPaymentsHistorysToEmail(
        {
          ...reg_lecture.list_params,
          lecture_no: lecture_no,
          title,
          body,
        },
        loadingFunction
      );
      console.log("sendEmail -> data", data);
    } catch (error) {
      console.log("sendEmail -> error", error);
    }
  };

  const sendSms = async (props) => {
    console.log("sendSms -> props", props);

    const { title, body } = props;

    try {
      let data = await apiObject.sendCmsPaymentsHistorysToSms(
        {
          ...reg_lecture.list_params,
          lecture_no: lecture_no,
          title,
          body,
        },
        loadingFunction
      );
      console.log("sendSms -> data", data);
    } catch (error) {
      console.log("sendSms -> error", error);
    }
  };

  useEffect(() => {
    list();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reg_lecture.list_params]);

  return { save, sendEmail, sendSms };
};
