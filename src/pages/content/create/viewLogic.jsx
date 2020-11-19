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

// useHistory
import { useHistory } from "react-router-dom";

export const useCmsLectures = () => {
  // const path = window.location.pathname.split("/")[1];

  // const { notice_no } = props;

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const file = reducer.acceptedFile.file;

  const loadingFunction = useLoadingFunction();
  const history = useHistory();

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

  const createCmsFaq = async (params) => {
    const {
      notice_title,
      notice_content,

      // notice_type,
      // notice_state,
      // notice_order_weight,
    } = params;
    console.log({ params });

    try {
      let response = "";
      let lecture_video_preview_img_no = "";
      // if (file) {
      //   response = await putImageFunction(file);
      //   console.log({ response }); //{key: "profile/test.png"}
      // }

      // if (response) {
      //   response = await apiObject.createImage(
      //     { file_path: response.key, image_type: "IN" },
      //     loadingFunction
      //   );
      //   console.log({ response });

      //   if (response.data.message === "Success") {
      //     lecture_video_preview_img_no = response.data.item.image_no;
      //   }
      // }

      let responseCreateCmsFaq = await apiObject.createCmsNotice(
        {
          notice_title,
          notice_content,
          // begin_dt: begin_dt,
          // end_dt: end_dt,
          // lecture_vimeo_url: lecture_vimeo_url,
          // lecture_chat_url: lecture_chat_url,
          // lecture_title: lecture_title,
          // lecture_content: lecture_content,
          // lecture_state: lecture_state ? 1 : 0,
          // best_bare_state: best_bare_state ? 1 : 0,
          // best_bare_order_weight: best_bare_order_weight,
          // lecture_video_preview_img_no: lecture_video_preview_img_no,
        },
        loadingFunction
      );
      console.log({ responseCreateCmsFaq });

      console.log("CREATE_CMS_FAQ -> success");
      history.goBack();
    } catch (error) {
      alert(error);
      console.log("Error", error);
      console.log("Error", error.code);
      console.log("Error", error.message);
      console.log("Error", error.response.data);
    }
  };

  return { createCmsFaq };
};
