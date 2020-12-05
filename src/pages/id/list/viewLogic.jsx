import React, { useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

// apiObject
import { apiObject, apiObjectMobilePass } from "../../../api";

// hooks
import useLoadingFunction from "../../../Hooks/useLoadingFunction";

export const useViewLogic = (props) => {
  const { reducer_key } = props;
  const id = useSelector((state) => state.reducerMobilePass[reducer_key]);
  const dispatch = useDispatch();

  const loadingFunction = useLoadingFunction();

  const list = async () => {
    try {
      let data = await apiObject.listCmsUsers(
        {
          ...id.list_params,
        },
        loadingFunction
      );

      const responseListCmsUsers = data;
      console.log({ responseListCmsUsers });

      dispatch({
        type: "LIST_CMS_TABLE_DATA",
        payload: {
          reducer_key: reducer_key,
          table_data: {
            code: data.code,
            data: data.data.items,
            next_token: data.data.next_token,
            total_count: data.data.total_count,
            total_page: data.data.total_page,
            current_page: data.data.current_page,
          },
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

  const save = async () => {
    var file_url = null;

    try {
      let data = await apiObject.saveCmsUsers(
        {
          ...id.list_params,
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
    list();
  }, [id.list_params]);

  return { save };
};
