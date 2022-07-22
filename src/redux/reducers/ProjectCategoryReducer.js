import { GET_ALL_PROJECT_CATEGORY } from "../types/JiraFinal";

const stateDefault = {
    arrProjectCategory: []
};

export const projectCategryReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_ALL_PROJECT_CATEGORY: {
            // console.log('project reducer => action.result', action.result.data.content)
            state.arrProjectCategory = action.result.data.content;
            console.log('projectCategoryReducer=> state: ', state)
            return { ...state };
        }
        default: return state;
    }
}