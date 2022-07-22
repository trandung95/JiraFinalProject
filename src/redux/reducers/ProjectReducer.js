import { EDIT_PROJECT, PUT_PROJECT_DETAIL, UPDATE_PROJECT } from "../types/JiraFinal";

const stateDefault = {
    projectEdit: {
        "id": 0,
        "projectName": "string",
        // "creator": 0,
        "categoryId": 1,
        "description": "<h3>string</h3>",
    },
    projectDetail: {}
}

export const ProjectReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case EDIT_PROJECT: {
            state.projectEdit = action.projectEditModel
            return { ...state }
        }
        case UPDATE_PROJECT: {
            state.projectEdit = action.data
            return { ...state }
        }
        case PUT_PROJECT_DETAIL: {
            state.projectDetail = action.projectDetail;
            return { ...state }
        }
        default: return state;
    }
}