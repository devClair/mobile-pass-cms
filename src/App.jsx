import React from "react";
import Routes from "./Routes";

//--------------------------------------------------
// redux
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/Redux";

//--------------------------------------------------
// apu
import { Auth } from "@psyrenpark/auth";
import { Api } from "@psyrenpark/api";
import { Storage } from "@psyrenpark/storage";
import awsmobile from "./aws-exports";

import LoadingProgress from "./components/loading-progress";
Auth.setConfigure(awsmobile);
Api.setConfigure(awsmobile);
Storage.setConfigure(awsmobile);

const App = () => {
  return (
    <Provider store={store}>
      <LoadingProgress />
      <Routes />
    </Provider>
  );
};

export default App;
