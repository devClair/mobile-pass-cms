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

import { useHistory } from "react-router-dom";

export const useViewLogic = (props) => {
  // const path = window.location.pathname.split("/")[1];

  const { banner_no } = props;

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const file = reducer.acceptedFile.file;

  const loadingFunction = useLoadingFunction();
  const history = useHistory();

  const get = async (params) => {
    try {
      let data = await apiObject.getCmsBanner(
        {
          banner_no,
        },
        loadingFunction
      );
      // console.log(JSON.stringify(data));
      const responseGetCmsBanner = data;
      console.log({ responseGetCmsBanner });
      let responselistDepartments = await apiObject.listDepartments(
        {
          locale: "ko-KR",
        },
        loadingFunction
      );
      console.log({ responselistDepartments });
      responselistDepartments.data.items.reverse();

      dispatch({
        type: "GET_CMS_BANNER",
        payload: {
          banner_data: {
            code: data.code,
            data: [data.data.item],
          },
          marks: data.data.marks,
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

  const update = async (params) => {
    console.log({ params });

    try {
      let response = "";
      let banner_img_no = "";
      if (params.banner_img.file) {
        response = await putImageFunction(params.banner_img.file);
        console.log({ response }); //{key: "profile/test.png"}
      }

      if (response) {
        response = await apiObject.createImage(
          { file_path: response.key, image_type: "IN" },
          loadingFunction
        );
        console.log({ response });

        if (response.data.message === "Success") {
          banner_img_no = response.data.item.image_no;
        }
      }

      let data = await apiObject.updateCmsBanner(
        {
          ...params,
          banner_state: params.banner_state ? 1 : 0,
          banner_img_no: banner_img_no,
        },
        loadingFunction
      );
      console.log({ data });

      if (data.data.uptate_count === 0) {
        alert("이미 답변을 작성했습니다.");
      }

      await get();

      console.log("UPDATE_CMS_LECTURE -> success");
      // history.push("/customer");
      // setState((state) => ({ ...state, isDetail: false }));
    } catch (error) {
      alert(error);
      console.log("Error", error);
      console.log("Error", error.code);
      console.log("Error", error.message);
      console.log("Error", error.response.data);
    }
  };

  const deleteCmsBanner = async (params) => {
    const { banner_no } = params;
    console.log({ params });

    try {
      let responseDeleteCmsBanner = await apiObject.deleteCmsBanner(
        {
          banner_no,
        },
        loadingFunction
      );
      console.log({ responseDeleteCmsBanner });
      history.replace(`/banner`);
    } catch (error) {
      console.log("Error", error);
      console.log("Error", error.code);
      console.log("Error", error.message);
      console.log("Error", error.response.data);
      alert("삭제에 실패하였습니다.");
    }
  };
  return { get, update, deleteCmsBanner };
};
