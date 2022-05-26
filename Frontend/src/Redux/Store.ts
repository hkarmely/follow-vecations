import { createStore } from "redux";
import { authReducer } from "./AuthState";
import { vacationsReducer } from "./VacationsState";
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { followedVacationsReducer } from "./FollowedVacationsState";


export const vacationsStore = createStore(vacationsReducer, composeWithDevTools(applyMiddleware()));

export const authStore = createStore(authReducer, composeWithDevTools(applyMiddleware()));

export const followedVacationsStore = createStore(followedVacationsReducer, composeWithDevTools(applyMiddleware()));

