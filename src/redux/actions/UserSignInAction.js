import { GET_ALL_PROJECT_CATEGORY, USER_SIGNIN_API, GET_LIST_PROJECT, OPEN_DRAWER_POP_UP, SET_SUBMIT_EDIT_PROJECT, EDIT_PROJECT, UPDATE_PROJECT, GET_USER_SEARCH, PUT_PROJECT_DETAIL, GET_ALL_PROJECT, GET_ALL_TASK_TYPE, GET_ALL_PRIORITY, GET_ALL_USER, GET_ALL_STATUS } from '../types/JiraFinal';

export const userSignInAction = (result) => {
    return {
        type: USER_SIGNIN_API,
        result
    }
}
export const getAllProjectCategoryAction = (result) => {
    return {
        type: GET_ALL_PROJECT_CATEGORY,
        result
    }
}
export const getListProjectAction = (result) => {
    return {
        type: GET_LIST_PROJECT,
        result
    }
}
export const openDrawerPopUpAction = (title, form) => {
    return {
        type: OPEN_DRAWER_POP_UP,
        title: title,
        // component: <FormEdit />
        component: form
    }
}
// export const submitEditAction = () => {
//     return {
//         type: SET_SUBMIT_EDIT_PROJECT,
//         submitFunction: submitForm
//     }
// }

export const editProjectAction = (record) => {
    return {
        type: EDIT_PROJECT,
        projectEditModel: record
    }
}
export const updateProjectAction = (data) => {
    return {
        type: UPDATE_PROJECT,
        data
    }
}

export const getUserSearchAction = (content) => {
    return {
        type: GET_USER_SEARCH,
        userSearch: content
    }
}
export const projectDetailAction = (data) => {
    return {
        type: PUT_PROJECT_DETAIL,
        projectDetail: data
    }
}
export const getAllProjectAction = (result) => {
    return {
        type: GET_ALL_PROJECT,
        arrProject: result.data.content
    }
}
export const getAllTaskTypeAction = (result) => {
    return {
        type: GET_ALL_TASK_TYPE,
        arrTaskType: result.data.content
    }
}
export const getAllPriorityAction = (result) => {
    return {
        type: GET_ALL_PRIORITY,
        arrPriority: result.data.content
    }
}
export const getAllUserAction = (result) => {
    return {
        type: GET_ALL_USER,
        arrUser: result.data.content
    }
}
export const getAllStatusAction = (result) => {
    return {
        type: GET_ALL_STATUS,
        arrStatus: result.data.content
    }
}