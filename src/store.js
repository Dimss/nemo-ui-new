import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import { routerReducer, routerMiddleware } from "react-router-redux";
import loginReducer from "./reducers/loginReducer";
import singupReducer from "./reducers/signupReducer";
import appHeaderReducer from "./reducers/appHeaderReducer";
import feedReducer from "./reducers/feedReducer";
export const history = createHistory();

const middleware = routerMiddleware(history);

export const store = createStore(
  combineReducers({
    loginReducer,
    singupReducer,
    appHeaderReducer,
    feedReducer,
    router: routerReducer
  }),
  applyMiddleware(thunk, middleware)
);
