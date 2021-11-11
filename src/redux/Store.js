import { combineReducers, createStore } from "redux";
import { UserReducer } from "./reducers/UserReducer";


const reducers = combineReducers({ data: UserReducer })
const Store = createStore(reducers);

export default Store;