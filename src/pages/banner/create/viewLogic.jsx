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

export const useViewLogic = () => {
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

  const create = async (params) => {
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

      let data = await apiObject.createCmsBanner(
        {
          ...params,
          banner_state: params.banner_state ? 1 : 0,
          banner_img_no: banner_img_no,
        },
        loadingFunction
      );
      // console.log("createCmsBanner -> data", JSON.stringify(data));
      const responseCreateCmsBanner = data;
      console.log({ responseCreateCmsBanner });
      // history.goBack();

      responseCreateCmsBanner.data.item.banner_no &&
        history.push(`detail/${responseCreateCmsBanner.data.item.banner_no}`);
    } catch (error) {
      alert(error);
      console.log("Error", error);
      console.log("Error", error.code);
      console.log("Error", error.message);
      console.log("Error", error.response.data);
    }
  };

  return { create };
};
