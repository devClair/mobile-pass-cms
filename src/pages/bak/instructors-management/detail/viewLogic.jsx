import React, { useEffect } from "react";

// apiObject
import { apiObject } from "../../../api";

// redux
import { useDispatch, useSelector } from "react-redux";

export const updateCmsLecture = async (params) => {
  const {
    lecture_no,
    best_bare_state,
    begin_dt,
    end_dt,
    lecture_vimeo_url,
    lecture_chat_url,
    lecture_content,
    lecture_state,
  } = params;
  try {
    let lecture_data = await apiObject.updateCmsLecture(
      {
        lecture_no: lecture_no, // 필수
        best_bare_state: best_bare_state,
        begin_dt: begin_dt,
        end_dt: end_dt,
        lecture_vimeo_url: lecture_vimeo_url,
        lecture_chat_url: lecture_chat_url,
        lecture_content: lecture_content,
        lecture_state: lecture_state,
      },
      alert("success")
    );
    console.log({ lecture_data });
    // console.log("signInFuntion -> userData", JSON.stringify(userData.list));
    // console.log("signInFuntion -> userData", userData.list[0]);

    //   dispatch({
    //     type: "UPDATE_CMS_LECTURE",
    //     payload: {
    //       code: lecture_data.code,
    //       data: lecture_data.data.items,
    //     },
    //   });

    console.log("UPDATE_CMS_LECTURE -> success");
  } catch (error) {
    alert(error);
  }
};
