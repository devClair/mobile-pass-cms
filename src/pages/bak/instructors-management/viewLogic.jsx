import React, { useEffect, useState } from "react";

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

export const useCmsInstructors = (props) => {
  const {
    orderColumn,
    orderType,
    tabValue,
    selectedDate1,
    selectedDate2,
    selectedMenu,
    setSelectedMenu,
    searchText,
    setSearchText,
    currentPage,
  } = props;

  const dispatch = useDispatch();

  const loadingFunction = useLoadingFunction();

  const listCmsLecturer = async () => {
    try {
      let responselistCmsLecturer = await apiObject.listCmsLecturer(
        {
          order_column: orderColumn,
          order_type: orderType,
          current_page: currentPage ? currentPage : null,
          search_lecturer_name:
            selectedMenu.search_column === "lecturer_name" ? searchText : null,
          // order_type,
          // begin_dt,
          // end_dt,
          // user_type,
          // filter_begin_dt: selectedDate1,
          // filter_end_dt: selectedDate2,
          // next_token,
          // LoadingCallback,
        },
        loadingFunction
      );
      console.log({ responselistCmsLecturer });

      let responselistDepartments = await apiObject.listDepartments(
        {
          langCode: "ko",
        },
        loadingFunction
      );

      console.log({ responselistDepartments });
      responselistDepartments.data.items.reverse();

      dispatch({
        type: "LIST_CMS_LECTURERS",
        payload: {
          code: responselistCmsLecturer.code,
          instructor_list_info: responselistCmsLecturer.data.items,
          department_info: responselistDepartments.data.items,
          next_token: responselistCmsLecturer.data.next_token,
          total_count: responselistCmsLecturer.data.total_count,
          total_page: responselistCmsLecturer.data.total_page,
          current_page: responselistCmsLecturer.data.current_page,
        },
      });

      console.log("LIST_CMS_LECTURERS -> success");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    listCmsLecturer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    orderColumn,
    orderType,
    selectedDate1,
    selectedDate2,
    searchText,
    currentPage,
  ]);

  return;
};
