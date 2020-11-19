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

  const { inquiry_no } = props;

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const file = reducer.acceptedFile.file;

  const loadingFunction = useLoadingFunction();

  const get = async (params) => {
    try {
      let data = await apiObject.getCmsInquiry(
        {
          inquiry_no,
        },
        loadingFunction
      );
      // console.log(JSON.stringify(data));
      const responseGetCmsInquiry = data;
      console.log({ responseGetCmsInquiry });
      let responselistDepartments = await apiObject.listDepartments(
        {
          locale: "ko-KR",
        },
        loadingFunction
      );
      console.log({ responselistDepartments });
      responselistDepartments.data.items.reverse();

      dispatch({
        type: "GET_CMS_INQUIRY",
        payload: {
          inquiry_data: {
            code: data.code,
            data: [data.data.item],
          },
          department_info: responselistDepartments.data.items,
        },
      });

      console.log("GET_CMS_INQUIRY -> success");
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

  const update = async (params) => {
    const {
      inquiry_no,
      response_title,
      response_content,
      inquiry_state,
    } = params;
    console.log({ params });

    try {
      let response = "";
      let lecture_video_preview_img_no = "";

      let responseUpdateCmsInquiry = await apiObject.updateCmsInquiry(
        {
          inquiry_no,
          response_title,
          response_content,
          inquiry_state,
        },
        loadingFunction
      );
      console.log({ responseUpdateCmsInquiry });

      if (responseUpdateCmsInquiry.data.uptate_count === 0) {
        alert("이미 답변을 작성했습니다.");
      }

      await get();
    } catch (error) {
      alert(error);
      console.log("Error", error);
      console.log("Error", error.code);
      console.log("Error", error.message);
      console.log("Error", error.response.data);
    }
  };

  return { get, update };
};
