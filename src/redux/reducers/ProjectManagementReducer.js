import { GET_ALL_PRIORITY, GET_ALL_PROJECT, GET_ALL_STATUS, GET_ALL_TASK_TYPE, GET_ALL_USER, GET_LIST_PROJECT } from "../types/JiraFinal";

const stateDefault = {
    projectList: [],
    arrProject: [],
    arrTaskType: [],
    arrPriority: [],
    arrUser: [],
    arrStatus: [],
};

export const ProjectManagementReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_LIST_PROJECT: {
            state.projectList = action.result
            return { ...state }
        }
        case GET_ALL_PROJECT: {
            state.arrProject = action.arrProject;
            return { ...state }
        }
        case GET_ALL_TASK_TYPE: {
            state.arrTaskType = action.arrTaskType;
            return { ...state }
        }
        case GET_ALL_PRIORITY: {
            state.arrPriority = action.arrPriority;
            return { ...state }
        }
        case GET_ALL_USER: {
            state.arrUser = action.arrUser;
            return { ...state }
        }
        case GET_ALL_STATUS: {
            state.arrStatus = action.arrStatus;
            return { ...state }
        }
        default: return state
    }
}