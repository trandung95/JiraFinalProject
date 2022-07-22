import { USER_LOGIN } from "../../util/setting";
import { GET_USER_SEARCH, USER_SIGNIN_API } from "../types/JiraFinal";

let userLogin = {}
if (localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
    userLogin: userLogin,
    userSearch: [],
}

export const logInReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case USER_SIGNIN_API: {
            console.log('log in reducer -> state: ', state)
            return { ...state, userLogin: action.result.data.content }
        }
        case GET_USER_SEARCH: {
            state.userSearch = action.userSearch;
            // console.log('loginReducer',state.userSearch)
            return { ...state }
        }
        default: return state;
    }
}