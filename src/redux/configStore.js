import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import { logInReducer } from './reducers/logInReducer';
import { projectCategryReducer } from './reducers/ProjectCategoryReducer';
import { ProjectManagementReducer } from './reducers/ProjectManagementReducer';
import { DrawerPopUpReducer } from './reducers/DrawerPopUpReducer';
import { ProjectReducer } from './reducers/ProjectReducer';
import { TaskManagementReducer } from './reducers/TaskManagementReducer';

const rootReducer = combineReducers({
    logInReducer,
    projectCategryReducer,
    ProjectManagementReducer,
    DrawerPopUpReducer,
    ProjectReducer,
    TaskManagementReducer,
});




let middleWare = applyMiddleware(reduxThunk);

let composeCustom = compose(middleWare, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export const store = createStore(rootReducer, composeCustom);