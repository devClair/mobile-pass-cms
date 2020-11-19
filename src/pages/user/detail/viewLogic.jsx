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

  const { user_no } = props;

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const file = reducer.acceptedFile.file;

  const loadingFunction = useLoadingFunction();

  const get = async (params) => {
    try {
      let data = await apiObject.getCmsUser(
        {
          user_no: user_no,
        },
        loadingFunction
      );
      // console.log(JSON.stringify(data));
      let responseGetCmsUser = data;
      console.log({ responseGetCmsUser });
      let responselistDepartments = await apiObject.listDepartments(
        {
          locale: "ko-KR",
        },
        loadingFunction
      );
      responselistDepartments.data.items.reverse();

      dispatch({
        type: "GET_CMS_USER",
        payload: {
          user_data: {
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

  const update = async (params) => {
    console.log({ params });

    try {
      let response = "";
      let user_verify_img_no = "";

      if (params.profile_img.file) {
        response = await putImageFunction(params.profile_img.file);
        console.log({ response }); //{key: "profile/test.png"}
      }

      if (response) {
        response = await apiObject.createImage(
          { file_path: response.key, image_type: "IN" },
          loadingFunction
        );
        console.log({ response });

        if (response.data.message === "Success") {
          user_verify_img_no = response.data.item.image_no;
        }
      }

      /**
       * [CMS] 가입된 유저 정보 변경하기 (인증 필요)
       * @param {int} user_no                   - [필수] 변경할 유저 no
       * @param {string} user_name              - 유저 이름 변경
       * @param {string} mobile_no              - 전화 번호
       * @param {string} user_division          - 유저 소속
       * @param {string} user_department_no     - 유저 과 번호
       * @param {string} user_verify_img_no     - 유저 검증 이미지 번호
       * @param {int} lecturer_status           - 강사 권한 부여 ( 의사일 경우만 작동)
       * @param {Function} LoadingCallback      - 로딩 콜백
       */

      let responseUpdateCmsUser = await apiObject.updateCmsUser(
        {
          ...params,
          lecturer_status: params.lecturer_status ? 1 : 0,
          user_verify_img_no: user_verify_img_no,
        },
        loadingFunction
      );
      console.log({ responseUpdateCmsUser });

      // if (responseUpdateCmsUser.data.uptate_count === 0) {
      //   alert("이미 답변을 작성했습니다.");
      // }

      await get();
    } catch (error) {
      alert(error);
      console.log("Error", error);
      console.log("Error", error.code);
      console.log("Error", error.message);
      console.log("Error", error.response.data);
    }
  };

  const getDep = async () => {
    try {
      let data = await apiObject.listDepartments({});

      return data.data?.items;
    } catch (e) {
      console.log(e);
    }
  };
  const getFac = async (user_dep_no) => {
    console.log("dep+no", user_dep_no);
    try {
      let data = await apiObject.listFacultys({
        department_code_no: user_dep_no,
      });

      return data.data?.items;
    } catch (e) {
      console.log(e);
    }
  };

  return { get, update, getDep, getFac };
};
