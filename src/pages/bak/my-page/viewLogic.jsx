import React, { useEffect } from "react";

// apiObject
import { apiObject } from "../../api";

// redux
import { useDispatch, useSelector } from "react-redux";

// storage
import { Storage } from "@psyrenpark/storage";

//uuid
import { v4 as uuidv4 } from "uuid";

// hooks
import useLoadingFunction from "../../Hooks/useLoadingFunction";
export const useCmsLecturer = () => {
  const loadingFunction = useLoadingFunction();
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const file = reducer.acceptedFile.file;

  const getCmsLecturer = async (params) => {
    try {
      let responsegetCmsLecturer = await apiObject.getCmsLecturerDetail(
        {
          langCode: "ko",
        },
        loadingFunction
      );
      console.log({ responsegetCmsLecturer });
      let responselistDepartments = await apiObject.listDepartments(
        {
          langCode: "ko",
        },
        loadingFunction
      );

      console.log({ responselistDepartments });
      responselistDepartments.data.items.reverse();

      dispatch({
        type: "GET_CMS_LECTURER",
        payload: {
          instructor_info: responsegetCmsLecturer.data.item,
          department_info: responselistDepartments.data.items,
        },
      });

      console.log("GET_CMS_LECTURER -> success");
    } catch (error) {
      alert(error);
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

  const updateCmsLecturer = async (params) => {
    let bodyParams = params;
    try {
      let response = "";
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
        // {
        //   code: 0,
        //   data:{
        //     message: "Success",
        //     item: {
        //       createdAt: "2020-09-10T02:48:53.481Z",
        //       file_path: "profile/test.png",
        //       image_no: 34,
        //       image_type: "IN",
        //       updatedAt: "2020-09-10T02:48:53.481Z",
        //       user_no: 102,
        //     }
        //   }
        // }
        if (response.data.message === "Success") {
          bodyParams = {
            ...bodyParams,
            lecturer_introduction_img_no: response.data.item.image_no,
          };
        }
      }
      console.log({ bodyParams });

      let responseUpdateCmsLecturer = await apiObject.updateCmsLecturer(
        bodyParams,
        loadingFunction
      );
      console.log({ responseUpdateCmsLecturer });
      // console.log("signInFuntion -> userData", JSON.stringify(userData.list));
      // console.log("signInFuntion -> userData", userData.list[0]);

      console.log("UPDATE_CMS_LECTURER -> success");
      await getCmsLecturer();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getCmsLecturer();
  }, []);

  // useEffect(() => {}, [reducer.instructor_info.lecturer_introduction_img_no]);

  return { updateCmsLecturer };
};
