import React, { useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

// apiObject
import { apiObject, apiObjectMobilePass } from "../../../api";

// hooks
import useLoadingFunction from "../../../Hooks/useLoadingFunction";

// date-fns
import { format } from "date-fns";

export const useViewLogic = (props) => {
  const { reducer_key } = props;
  const terms = useSelector((state) => state.reducerMobilePass[reducer_key]);
  const dispatch = useDispatch();

  const loadingFunction = useLoadingFunction();

  const getTerms = async () => {
    console.log(terms.list_params);
    try {
      let data = await apiObject.listCmsUsers(
        {
          ...terms.list_params,
        },
        loadingFunction
      );

      const responseGetTerms = data;
      console.log({ responseGetTerms });

      dispatch({
        type: "GET_TERMS_CONTENT",
        payload: {
          reducer_key: reducer_key,
          // content: data.content,
          content: `content data : ${format(
            new Date(),
            "yyyy-MM-dd hh:mm:ss"
          )}`,
        },
      });
      // console.log("LIST_CMS_LECTURES -> success");
    } catch (error) {
      // alert(error);
      console.log("Error", error);
      // console.log("Error", error.code);
      // console.log("Error", error.message);
      // console.log("Error", error.response.data);
    }
  };

  const updateTerms = async (params) => {
    console.log({ params });
    try {
      // const responseGetTest = await apiObjectMobilePass.getTest(params);
      // console.log({ responseGetTest });
      getTerms(); // 혹은 response 값으로 dispatch
    } catch (error) {
      // alert(error);
      console.log("Error", error);
      // console.log("Error", error.code);
      // console.log("Error", error.message);
      // console.log("Error", error.response.data);
    }
  };

  const save = async () => {
    var file_url = null;

    try {
      let data = await apiObject.saveCmsUsers(
        {
          ...terms.list_params,
        },
        loadingFunction
      );

      file_url = data.data.file_url;
    } catch (error) {
      alert(error);
      alert(error?.response?.data?.data?.message);
      // console.log("Error", error);
      // console.log("Error", error.code);
      // console.log("Error", error.message);
      // console.log("Error", error.response.data.message);
      file_url = "fail";
    }

    return file_url;
  };

  useEffect(() => {
    getTerms();
  }, [terms.list_params]);

  return { updateTerms, save };
};
