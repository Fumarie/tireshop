import { productsReducer } from "./productsReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({products: productsReducer})