import React, { useEffect } from "react";

// apiObject

import { apiObject } from "../../../api";

// redux
import { useDispatch, useSelector } from "react-redux";

export const useCmsUser = () => {
  const dispatch = useDispatch();

  const listCmsUsers = async () => {
    try {
      let userData = await apiObject.listCmsUsers({
        order_column: "asc",
        // order_type,
        // begin_dt,
        // end_dt,
        // user_type,
        // filter_begin_dt,
        // filter_end_dt,
        // next_token,
        // LoadingCallback,
      });
      console.log({ userData });
      // console.log("signInFuntion -> userData", JSON.stringify(userData.list));
      // console.log("signInFuntion -> userData", userData.list[0]);

      dispatch({
        type: "GET_CMS_USER",
        payload: {
          code: userData.code,
          data: userData.data.items,
        },
      });

      console.log("GET_CMS_USER -> success");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    listCmsUsers();
  }, []);

  return;
};
