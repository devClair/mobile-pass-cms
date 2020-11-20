import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//-------------------------------------------
// page
import Login from "./pages/login/";
// import Dashboard from "./pages/dashboard";
// import Customer from "./pages/member-info/customer/";
// import CustomerDetail from "./pages/member-info/customer/detail/";
// import LectureDetail from "./pages/lecture/detail";
// import UploadLecture from "./pages/upload-lecture";
// import MyPage from "./pages/my-page";
// import InstructorsManagement from "./pages/instructors-management";
import Lecture from "./pages/lecture";
import Faq from "./pages/faq";
import Inquiry from "./pages/inquiry";
import Banner from "./pages/banner";
import Notice from "./pages/notice";
import Content from "./pages/content";
import Lecturer from "./pages/lecturer";
import Payment from "./pages/payment";

import User from "./pages/user";
import Report from "./pages/report";
//-------------------------------------------
// redux
import { useDispatch, useSelector } from "react-redux";

//--------------------------------------------------
// auth
import {
  Auth,
  CurrentAuthUiState,
  AuthType,
  UserState,
} from "@psyrenpark/auth";

import { apiObject } from "./api";

import { useLoadingFunction } from "./Hooks";

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
    this.getFullYear(),
    "-",
    (mm > 9 ? "" : "0") + mm,
    "-",
    (dd > 9 ? "" : "0") + dd,
  ].join("");
};

const Routes = () => {
  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const loadingFunction = useLoadingFunction();

  const checkAuth = async () => {
    try {
      var auth = await Auth.currentSession();
      console.log("checkAuth -> auth", auth);

      var isAdmin = await Auth.isIncludeGroup("admin");

      console.log("checkAuth -> isAdmin", isAdmin);

      if (isAdmin) {
        dispatch({
          type: "SET_USER_STATE",
          payload: UserState.SIGNED,
        });
      } else {
        await Auth.signOut();
        dispatch({
          type: "SET_USER_STATE",
          payload: UserState.NOT_SIGN,
        });
      }

      var userData = await apiObject.getUser({}, loadingFunction);
      console.log("checkAuth -> userData", userData);

      // console.log('checkAuth -> userData', userData);

      dispatch({
        type: "SET_MY_USER",
        payload: userData.data.item,
      });
    } catch (error) {
      console.log("checkToLogin -> error", error);

      await Auth.signOut();

      dispatch({
        type: "SET_USER_STATE",
        payload: UserState.NOT_SIGN,
      });
    }
  };

  useEffect(() => {
    // 정규식 필요
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducer.userState]);

  return (
    <div>
      {reducer.userState !== UserState.SIGNED ? (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={User} />
            <Route path="/user" component={User} />
            <Route path="/report" component={Report} />

            <Route path="/lecture" component={Lecture} />
            <Route path="/faq" component={Faq} />
            <Route path="/inquiry" component={Inquiry} />
            <Route path="/banner" component={Banner} />
            <Route path="/notice" component={Notice} />
            <Route path="/content" component={Content} />
            <Route path="/lecturer" component={Lecturer} />
            <Route path="/payment" component={Payment} />

            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
};

export default Routes;
