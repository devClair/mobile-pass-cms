import { useEffect } from "react";

// apiObject
import { apiObject, apiObjectMobilePass } from "../../../api";

// redux
import { useDispatch, useSelector } from "react-redux";

// hooks
import useLoadingFunction from "../../../Hooks/useLoadingFunction";

// react-router-dom
import { useHistory } from "react-router-dom";

// @psyrenpark/auth
import { Auth, CurrentAuthUiState, AuthType } from "@psyrenpark/auth";

export const useSignIn = (props) => {
  const { setError } = props;
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const lecture = reducer.lecture;

  const loadingFunction = useLoadingFunction();

  const history = useHistory();

  const signInProcess = (data) => {
    // id: "test"
    // pwd: "test"
    const userEmail = data.id;
    const userPassword = data.pwd;

    Auth.signInProcess(
      {
        authType: AuthType.EMAIL,
        email: userEmail,
        password: userPassword,
      },
      async () => {
        // // 유저 정보 가져오기
        try {
          var userData = await apiObject.getUser({
            langCode: "ko",
            loadingFunction,
          });
          console.log("signInFuntion -> userData", userData);

          dispatch({
            type: "SIGN_IN",
            payload: userData,
          });
        } catch (error) {
          alert(error);
        }
      },
      (data) => {
        dispatch({
          type: "SET_MY_AUTH",
          payload: {
            authType: AuthType.EMAIL,
            email: userEmail,
            password: userPassword,
          },
        });

        dispatch({
          type: "SET_CURRENT_AUTH_UI_STATE",
          payload: CurrentAuthUiState.CONFIRM_SIGN_UP,
        });
      },
      (error) => {
        // 실패처리,
        console.log("signInFuntion -> error", error);
        console.log(error.message);
        alert("로그인에 실패하였습니다. 다시 시도해주세요.");
      },
      loadingFunction
    );
  };

  const signInApi = async ({ params, entries }) => {
    let responseGetTest = "";
    try {
      responseGetTest = await apiObjectMobilePass.getTest(
        {
          ...params,
        },
        loadingFunction
      );
      // 에러처리예시
      // let responseGetTest = await apiObject.updateuserLecture(
      //   {
      //     ...params,
      //   },
      //   loadingFunction
      // );

      responseGetTest = {
        ...responseGetTest,
        result: [
          // { key: "id", value: "E-MAIL" },
          // { key: "pwd", value: "PASSWORD" },
        ],
        ...params,
      };
      responseGetTest.result &&
        responseGetTest.result.map((x) => {
          const errorEntry = entries.find((y) => y.key === x.key);
          errorEntry &&
            setError(errorEntry.key, {
              type: "manual",
              message: errorEntry.invalidMessage,
            });
        });
      console.log({ responseGetTest });
      signInProcess(responseGetTest);
    } catch (error) {
      console.log("Error", error);
      console.log("Error", error?.code);
      console.log("Error", error?.message);
      console.log("Error", error?.response.data);
      alert("로그인에 실패하였습니다. 다시 시도해주세요.");
    }
    // return responseGetTest;
  };

  useEffect(() => {}, [lecture.list_params]);

  return { signInApi };
};
