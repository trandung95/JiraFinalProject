import { OPEN_DRAWER_POP_UP, SET_SUBMIT_EDIT_PROJECT } from '../types/JiraFinal';
import { CLOSE_DRAWER_POP_UP } from '../types/JiraFinal';

const stateDefault = {
    visible: false,
    title: '',
    componentContentDrawer: <span className='text-success'>content here!!</span>,
    callBackSubmit: (props) => {
        return alert('submit default')
    },
};
export const DrawerPopUpReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case OPEN_DRAWER_POP_UP:
            state.visible = true;
            state.title = action.title;
            state.componentContentDrawer = action.component;
            return { ...state };
        case CLOSE_DRAWER_POP_UP:
            state.visible = false;
            return { ...state };
        case SET_SUBMIT_EDIT_PROJECT:
            state.callBackSubmit = action.submitFunction;
            return { ...state };
        // case SET_SUBMIT_CREATE_TASK:{
        //     return {...state,callBackSubmit:action.submitFunction}
        // }
        default: return state;
    }
}