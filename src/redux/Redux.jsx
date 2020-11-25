//----------------------------------------------------
// redux
import { createStore, applyMiddleware, combineReducers } from "redux";
import {
  composeWithDevTools,
  // devToolsEnhancer,
} from "redux-devtools-extension";

import reducer from "./Reducer";

const appReducer = combineReducers({
  reducer,
});

export const store = createStore(appReducer, composeWithDevTools());
// export const store = createStore(appReducer, devToolsEnhancer({ trace: true, traceLimit: 10 });
