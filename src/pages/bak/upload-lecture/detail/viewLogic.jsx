import React, { useEffect } from "react";

// apiObject
import { apiObject } from "../../../api";

// redux
import { useDispatch, useSelector } from "react-redux";

export const createCmsLecture = async (params) => {
  const {
    lecture_department,
    lecture_name,
    begin_dt,
    end_dt,
    lecture_vimeo_url,
    lecture_chat_url,
    lecture_content,
  } = params;
  try {
    let lecture_data = await apiObject.createCmsLecture(
      {
        lecture_department: lecture_department,
        lecture_name: lecture_name,
        begin_dt: begin_dt,
        end_dt: end_dt,
        lecture_vimeo_url: lecture_vimeo_url,
        lecture_chat_url: lecture_chat_url,
        lecture_content: lecture_content,
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

    console.log("INSERT_CMS_LECTURE -> success");
  } catch (error) {
    alert(error);
  }
};
