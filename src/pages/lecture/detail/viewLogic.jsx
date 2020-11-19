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
import { produce, setAutoFreeze } from "immer";

//-------------------------------------------
// date-fns
import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

export const useCmsLectures = () => {
  // const path = window.location.pathname.split("/")[1];

  let returnStr = "";
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const loadingFunction = useLoadingFunction();

  const listFacultys = async (department_code_no) => {
    let responseListFacultys = await apiObject.listFacultys(
      {
        department_code_no: department_code_no,
      },
      loadingFunction
    );
    console.log({ responseListFacultys });
    responseListFacultys.data.items.reverse();

    dispatch({
      type: "LIST_FACULTYS",
      payload: {
        faculty_info: responseListFacultys.data.items,
      },
    });
  };

  const getCmsLecture = async (params) => {
    const { lecture_no } = params;
    try {
      let responseGetCmsLectures = await apiObject.getCmsLectures(
        {
          lecture_no: lecture_no,
        },
        loadingFunction
      );
      console.log({ responseGetCmsLectures });

      const proccessedData = produce(
        responseGetCmsLectures.data.item,
        (draft) => {
          const value = responseGetCmsLectures.data.item.play_time;

          draft.play_time = {
            value: value,

            h: Math.floor(value / 3600),
            m: Math.floor((value % 3600) / 60),
            s: Math.floor((value % 3600) % 60),
            // h: format(new Date(value * 1000), "hh"),
            // m: format(new Date(value * 1000), "mm"),
            // s: format(new Date(value * 1000), "ss"),
            // all: format(
            //   zonedTimeToUtc(new Date(value * 1000), "Asia/Seoul"),
            //   "yyyy-MM-dd h:m:s"
            // ),
          };
        }
      );
      console.log({ proccessedData });
      await listFacultys(
        responseGetCmsLectures.data.item.lecture_department_no
      );

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
            data: [proccessedData],
          },
          acceptedFile_img:
            responseGetCmsLectures.data.item.tb_lecture_video_preview
              .full_file_path,

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

  const updateCmsLecture = async (params) => {
    console.log({ params });
    try {
      let response = "";
      let lecture_video_preview_img_no = "";
      let tag_no_array = [];
      if (params.thumbnail.file) {
        response = await putImageFunction(params.thumbnail.file);
        console.log({ response }); //{key: "profile/test.png"}
      }

      if (response) {
        response = await apiObject.createImage(
          { file_path: response.key, image_type: "IN" },
          loadingFunction
        );
        console.log({ response });

        if (response.data.message === "Success") {
          lecture_video_preview_img_no = response.data.item.image_no;
        }
      }

      if (params.tag_no_array.length > 0) {
        // params.tag_no_array.forEach((x, i, array) => {
        //   console.log(x);
        // });
        for (let i = 0; i < params.tag_no_array.length; i++) {
          const responseGetTag = await apiObject.getTag(
            { tag_name: params.tag_no_array[i].tag_name, tag_type: "IN" },
            loadingFunction
          );
          console.log({ responseGetTag }); //{key: "profile/test.png"}
          tag_no_array.push(responseGetTag.data.item.tag_no);
        }
      }

      const proccessedParams = {
        ...params,
        lecture_video_preview_img_no: lecture_video_preview_img_no,
        best_bare_state: params.best_bare_state ? 1 : 0,
        tag_no_array: tag_no_array,
        // disease_no_array: params.disease_no_array.map((x) => {
        //   return x.disease_name;
        // }),
        lecture_state: params.lecture_state ? 1 : 0,
        play_time:
          Number(params.play_time.h) * 3600 +
          Number(params.play_time.m) * 60 +
          Number(params.play_time.s),
      };

      let responseUpdateCmsLecture = await apiObject.updateCmsLecture(
        proccessedParams,
        loadingFunction
      );
      console.log({ responseUpdateCmsLecture });

      await getCmsLecture({
        lecture_no: responseUpdateCmsLecture.data.item.lecture_no,
      });

      console.log("UPDATE_CMS_LECTURE -> success");
      returnStr = "success";
    } catch (error) {
      console.log("Error", error);
      console.log("Error", error.code);
      console.log("Error", error.message);
      console.log("Error", error.response.data);
    }
    return "returnStr";
  };

  return { getCmsLecture, updateCmsLecture, listFacultys };
};
