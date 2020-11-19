import React, { useEffect } from "react";

// apiObject
import { apiObject } from "../../api";

// redux
import { useDispatch, useSelector } from "react-redux";

// date-fns
import { format } from "date-fns";

export const useCmsLectures = () => {
  const dispatch = useDispatch();

  const listCmsLectures = async () => {
    try {
      let listCmsLecturesResponse = await apiObject.listCmsLectures({
        order_column: "lecture_no",
        order_type: "DESC",
        // order_type,
        // begin_dt,
        // end_dt,
        // user_type,
        // filter_begin_dt,
        // filter_end_dt,
        // next_token,
        // LoadingCallback,
      });
      console.log({ listCmsLecturesResponse });

      let deep_copied_response = JSON.parse(
        JSON.stringify(listCmsLecturesResponse.data.items)
      );

      let processed_data = deep_copied_response.map((x) => {
        let begin_dt_processed = format(new Date(x.begin_dt), "yyyy.MM.dd");
        let end_dt_processed = format(new Date(x.end_dt), "yyyy.MM.dd");
        let createdAt_processed = format(new Date(x.createdAt), "yyyy.MM.dd");
        let updatedAt_processed = format(new Date(x.updatedAt), "yyyy.MM.dd");

        return {
          ...x,
          begin_dt_processed: begin_dt_processed,
          end_dt_processed: end_dt_processed,
          createdAt_processed: createdAt_processed,
          updatedAt_processed: updatedAt_processed,
          period: `${begin_dt_processed} - ${end_dt_processed}`,
          instructor: `${x.tb_user.user_name} ${x.tb_user.user_type}`,
        };
      });

      // let getTagResponse = await apiObject.getTag({
      //   tag_name: "아토피",
      //   tag_type: "IN",
      // });
      // console.log({ getTagResponse });

      dispatch({
        type: "LIST_CMS_LECTURES",
        payload: {
          code: listCmsLecturesResponse.code,
          data: processed_data,
        },
      });

      console.log("LIST_CMS_LECTURES -> success");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    listCmsLectures();
  }, []);

  return;
};
