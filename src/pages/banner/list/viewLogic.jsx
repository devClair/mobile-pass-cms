import React, { useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

// apiObject
import { apiObject } from "../../../api";
import { Storage } from "@psyrenpark/storage";
import { v4 as uuidv4 } from "uuid";

// hooks
import useLoadingFunction from "../../../Hooks/useLoadingFunction";

export const useViewLogic = () => {
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const banner = reducer.banner;

  const loadingFunction = useLoadingFunction();

  const listCmsBanners = async () => {
    console.log(
      "listCmsBanners -> banner.list_params.banner_type,",
      banner.list_params.banner_type
    );

    try {
      let data = await apiObject.listCmsBanners(
        {
          order_column: banner.list_params.order_column,
          order_type: banner.list_params.order_type,
          current_page: banner.list_params.current_page,
          filter_begin_dt: banner.list_params.selectedDate1,
          filter_end_dt: banner.list_params.selectedDate2,
          banner_type: banner.list_params.banner_type,
          // search_name:
          //   banner.list_params.search_type?.search_column === "lecturer_name"
          //     ? banner.list_params.search_text
          //     : null,
        },
        loadingFunction
      );
      // console.log("list -> data", JSON.stringify(data));
      const resonseListCmsBanners = data;
      console.log({ resonseListCmsBanners });
      let responselistDepartments = await apiObject.listDepartments(
        {
          langCode: "ko-KR",
        },
        loadingFunction
      );
      responselistDepartments.data.items.reverse();
      dispatch({
        type: "LIST_CMS_BANNERS",
        payload: {
          banner_data: {
            code: data.code,
            data: data.data.items,
            next_token: data.data.next_token,
            total_count: data.data.total_count,
            total_page: data.data.total_page,
            current_page: data.data.current_page,
          },
          department_info: data.data.items,
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

  useEffect(() => {
    listCmsBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banner.list_params]);

  return {};
};
