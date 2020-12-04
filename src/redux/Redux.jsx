//----------------------------------------------------
// redux
import { createStore, applyMiddleware, combineReducers } from "redux";
import {
  composeWithDevTools,
  // devToolsEnhancer,
} from "redux-devtools-extension";

import reducer from "./Reducer";
import reducerMobilePass from "./ReducerMobilePass";

const appReducer = combineReducers({
  reducer,
  reducerMobilePass,
});

export const store = createStore(appReducer, composeWithDevTools());
// export const store = createStore(appReducer, devToolsEnhancer({ trace: true, traceLimit: 10 });
