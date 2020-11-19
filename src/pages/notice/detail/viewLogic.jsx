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

// react-router-dom
import { useHistory } from "react-router-dom";

export const useViewLogic = (props) => {
  // const path = window.location.pathname.split("/")[1];

  const { notice_no } = props;

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const file = reducer.acceptedFile.file;

  const loadingFunction = useLoadingFunction();
  const history = useHistory();

  const getNoticeData = async (params) => {
    try {
      let data = await apiObject.getCmsNotice(
        {
          notice_no,
        },
        loadingFunction
      );

      console.log(JSON.stringify(data));
      let responselistDepartments = await apiObject.listDepartments(
        {
          locale: "ko-KR",
        },
        loadingFunction
      );
      responselistDepartments.data.items.reverse();

      dispatch({
        type: "LIST_CMS_NOTICES",
        payload: {
          notice_data: {
            code: data.code,
            data: [data.data.item],
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

  const putImageFunction = async (inputEvent) => {
    // web
    const file = inputEvent;

    const file_name = uuidv4();
    const file_extension = file.name
      .substring(file.name.lastIndexOf("."), file.name.length)
      .toLowerCase();
    console.log(`profile/${file_name}${file_extension}`);

    try {
      var data = await Storage.put(
        {
          key: `profile/${file_name}${file_extension}`,
          object: file,
          config: {
            contentType: file.type, // "image/jpeg",
          },
        },
        loadingFunction // 로딩이 필요하다면 넣는다.
      );

      console.log({ data });
    } catch (error) {
      //  실패
    }
    return data;
  };

  const updateNoticeData = async (params) => {
    const {
      notice_no,
      notice_title,
      notice_content,
      notice_state,
      notice_order_weight,
    } = params;
    console.log({ params });

    try {
      let response = "";
      let notice_img_no = "";
      if (file) {
        response = await putImageFunction(file);
        console.log({ response }); //{key: "profile/test.png"}
      }

      if (response) {
        response = await apiObject.createImage(
          { file_path: response.key, image_type: "IN" },
          loadingFunction
        );
        console.log({ response });

        if (response.data.message === "Success") {
          notice_img_no = response.data.item.image_no;
        }
      }

      let responseUpdateCmsInquiry = await apiObject.updateCmsNotice(
        {
          notice_no,
          notice_title,
          notice_content,
          notice_state,
          notice_order_weight,
          notice_img_no,
        },
        loadingFunction
      );
      console.log({ responseUpdateCmsInquiry });

      if (responseUpdateCmsInquiry.data.uptate_count === 0) {
        alert("이미 답변을 작성했습니다.");
      }

      await getNoticeData();
    } catch (error) {
      alert(error);
      console.log("Error", error);
      console.log("Error", error.code);
      console.log("Error", error.message);
      console.log("Error", error.response.data);
    }
  };

  const deleteCmsNotice = async (params) => {
    const { notice_no } = params;
    console.log({ params });
    let result = "";

    try {
      let responseDeleteCmsNotice = await apiObject.deleteCmsNotice(
        {
          notice_no,
        },
        loadingFunction
      );
      console.log({ responseDeleteCmsNotice });
      // result = responseDeleteCmsNotice.data.message; /* message: "Success" */
      history.replace(`/notice`);
    } catch (error) {
      console.log("Error", error);
      console.log("Error", error.code);
      console.log("Error", error.message);
      console.log("Error", error.response.data);
      alert("삭제에 실패하였습니다.");
      // result = "Fail by error";
    }
  };

  return { getNoticeData, updateNoticeData, deleteCmsNotice };
};
