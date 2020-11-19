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

  const { lecturer_no } = props;

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const file = reducer.acceptedFile.file;

  const loadingFunction = useLoadingFunction();

  const history = useHistory();

  const get = async (params) => {
    try {
      let data = await apiObject.getCmsLecturer(
        {
          user_no: lecturer_no,
        },
        loadingFunction
      );
      // console.log(JSON.stringify(data));
      let responseGetCmsLecturer = data;
      console.log({ responseGetCmsLecturer });
      let responselistDepartments = await apiObject.listDepartments(
        {
          locale: "ko-KR",
        },
        loadingFunction
      );
      console.log({ responselistDepartments });
      responselistDepartments.data.items.reverse();

      let responseListBanks = await apiObject.listBanks(
        {
          locale: "ko-KR",
        },
        loadingFunction
      );
      console.log({ responseListBanks });
      // responselistDepartments.data.items.reverse();

      dispatch({
        type: "GET_CMS_LECTURER",
        payload: {
          lecturer_data: {
            code: data.code,
            data: [data.data.item],
          },
          department_info: responselistDepartments.data.items,
          banklist: responseListBanks.data.items,
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
      let responsePutImageFunction = "";
      let img_no = "";

      if (params.profile_img.file) {
        responsePutImageFunction = await putImageFunction(
          params.profile_img.file
        );
        // console.log({ responsePutImageFunction }); //{key: "profile/test.png"}
      }

      if (responsePutImageFunction) {
        let responseCreateImage = await apiObject.createImage(
          { file_path: responsePutImageFunction.key, image_type: "IN" },
          loadingFunction
        );
        // console.log({ responseCreateImage });

        if (responseCreateImage.data.message === "Success") {
          img_no = responseCreateImage.data.item.image_no;
        }
      }

      let responseUpdateCmsLecturer = await apiObject.updateCmsLecturer(
        {
          // user_no: lecturer_no,
          ...params,
          lecturer_introduction_img_no: img_no,
        },
        loadingFunction
      );
      console.log({ responseUpdateCmsLecturer });
      console.log("UPDATE_CMS_LECTURER -> success");
      await get();
    } catch (error) {
      alert(error);
      console.log("Error", error);
      console.log("Error", error.code);
      console.log("Error", error.message);
      console.log("Error", error.response.data);
    }
  };

  const deleteCmsLecturer = async (params) => {
    const { user_no } = params;
    console.log({ params });

    try {
      let responseDeleteCmsLecturer = await apiObject.deleteCmsLecturer(
        {
          user_no,
        },
        loadingFunction
      );
      console.log({ responseDeleteCmsLecturer });
      history.replace(`/lecturer`);
    } catch (error) {
      console.log("Error", error);
      console.log("Error", error.code);
      console.log("Error", error.message);
      console.log("Error", error.response.data);
      alert("삭제에 실패하였습니다.");
    }
  };

  return { get, update, deleteCmsLecturer };
};
