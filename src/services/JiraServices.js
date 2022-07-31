import { ACCESSTOKEN, USER_LOGIN } from "../util/setting"
import { getAllPriorityAction, getAllProjectAction, getAllProjectCategoryAction, getAllStatusAction, getAllTaskTypeAction, getAllUserAction, getListProjectAction, getTaskDetailAction, getUserSearchAction, projectDetailAction, updateProjectAction, userSignInAction } from "../redux/actions/UserSignInAction"
import { history } from "../App";
import { http } from "../util/setting";
import { openNotification } from "../components/Jira/Notification/Notification";
import { getTimeProps } from "antd/lib/date-picker/generatePicker";

export const jiraSignInService = (values) => {
    return async (dispatch) => {
        try {
            // const result = await axios({
            //     url: `${DOMAIN}/api/Users/signin`,
            //     method: 'POST',
            //     headers: {
            //         'TokenCybersoft': TOKEN_CYBERSOFT,
            //         'Authorization': 'Bearer ' + localStorage.getItem(ACCESSTOKEN)
            //     },
            //     data: {
            //         email: values.userName,
            //         passWord: values.password
            //     }
            // })
            const dataSignIn = {
                'email': values.userName,
                'passWord': values.password
            }
            const result = await http.post('/api/Users/signin', dataSignIn);

            console.log('sign in result: ', result);
            //neu dang nhap thanh cong
            if (result.data.statusCode === 200) {
                localStorage.setItem(ACCESSTOKEN, result.data.content.accessToken);
                localStorage.setItem(USER_LOGIN, JSON.stringify(result.data.content));
                const action = userSignInAction(result);
                dispatch(action);
                //chuyen huong trang
                history.push('/projectmanagement');
                openNotification("info", "topRight", "Welcome", `Hello ${values.userName}`)
            }
            //neu that bai
        } catch (err) {
            console.log({ err })
            openNotification("error", "top", "Login", "Login failed!")
        }
    }
}

export const getAllProjectCategory = () => {
    return async (dispatch) => {
        try {
            // const result = await axios({
            //     url: `${DOMAIN}/api/ProjectCategory`,
            //     method: 'GET',
            //     headers: {
            //         'TokenCybersoft': TOKEN_CYBERSOFT,
            //         'Authorization': 'Bearer ' + localStorage.getItem(ACCESSTOKEN)
            //     },
            // })
            const result = await http.get('/api/ProjectCategory')

            console.log('getAllProjectCategory => result: ', result);
            if (result.data.statusCode === 200) {
                const action = getAllProjectCategoryAction(result);
                dispatch(action);
            }
        } catch (err) {
            console.log({ err })
        }
    }
}
export const CreateProjectServices = (values) => {
    return async (dispatch) => {
        try {
            // const result = await axios({
            //     url: `${DOMAIN}/api/Project/createProject`,
            //     method: 'POST',
            //     data: {
            //         projectName: values.projectName,
            //         description: values.description,
            //         categoryId: values.categoryId,
            //     },
            //     headers: { 'TokenCybersoft': TOKEN_CYBERSOFT },
            // })
            const data = {
                "projectName": values.projectName,
                "description": values.description,
                "categoryId": values.categoryId,
                // "alias":"string"
            }
            const result = await http.post('/api/Project/createProject', data)
            console.log('CreateProjectServices => result: ', result)
            openNotification("success", "top", "Create project", `${values.projectName} add success!`)
        } catch (err) {
            openNotification("error", "top", "Create project", "Create project failed!")
            console.log({ err })
        }
    }
}


export const getProjectListService = () => {
    return async (dispatch) => {
        try {
            const result = await http.get('/api/Project/getAllProject');
            if (result.data.statusCode === 200) {
                console.log('getProjectListService => resut: ', result)
                const action = getListProjectAction(result.data.content);
                dispatch(action);
            }
        } catch (err) {
            console.log({ err })
        }
    }
}
export const updateProjectService = (projectUpdate) => {
    return async (dispatch) => {
        try {
            const result = await http.put(`/api/Project/updateProject?projectId=${projectUpdate.id}`, projectUpdate);
            console.log("updateProjectService=> projectUpdate", projectUpdate)

            // if (result.data.statusCode === 200) {
            //     const action = updateProjectAction(result.data.content);// data.content trả về không giống với khi đưa lên, không sử dụng
            //     dispatch(action);
            // }
            if (result.data.statusCode === 200) {
                console.log("updateProjectService => result: ", result);
                const action = getProjectListService();
                dispatch(action);
                openNotification("success", "top", "Edit project", "Edit project success!")
            }
        } catch (err) {
            console.log({ err })
        }
    }
}
export const deleteProjectService = (projectDelete) => {
    return async (dispatch) => {
        try {
            const result = await http.delete(`/api/Project/deleteProject?projectId=${projectDelete.id}`);
            if (result.data.statusCode === 200) {
                console.log("deleteProjectService => result: ", result);
                const action = getProjectListService();
                dispatch(action);
                openNotification('success', 'top', 'Delete project', `${projectDelete.projectName}, ID:${projectDelete.id} deleted!`)
            }
        } catch (err) {
            openNotification('error', 'top', 'Delete failed', "Some thing went wrong!")
            console.log({ err })
        }
    }
}

export const searchUserService = (inputValue) => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/api/Users/getUser?keyword=${inputValue}`)
            console.log('searchUserService=> result: ', result);
            if (result.data.statusCode === 200) {
                const action = getUserSearchAction(result.data.content);
                dispatch(action);
            }
        } catch (err) {
            console.log({ err })
        }
    }
}
export const assignUserProjectService = (data) => {
    return async (dispatch) => {
        try {
            const result = await http.post('/api/Project/assignUserProject', data)
            console.log('assignUserProjectService => result: ', result);
            const action = getProjectListService();
            dispatch(action);
            openNotification('success', 'top', 'Add user', `User Added`)
        } catch (err) {
            openNotification('error', 'top', 'Add user', `Add failed!`)
            console.log({ err })
        }
    }
}
export const removeUserFromProjectService = (data) => {
    return async (dispatch) => {
        try {
            const result = await http.post('/api/Project/removeUserFromProject', data);
            console.log(result);
            const action = getProjectListService();
            dispatch(action);
        } catch (err) {
            console.log(err)
        }
    }
}
export const getProjectDetailService = (id) => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/api/Project/getProjectDetail?id=${id}`)
            console.log('getProjectDetailService result=> ', result)
            if (result.data.statusCode === 200) {
                const action = projectDetailAction(result.data.content);
                dispatch(action)
            }
        } catch (err) {
            console.log(err)
        }
    }
}
export const getAllProjectService = () => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/api/Project/getAllProject`);
            console.log('getAllProjectService => result: ', result)
            const action = getAllProjectAction(result);
            dispatch(action)
        } catch (err) {
            console.log({ err })
        }
    }
}
export const getAllTaskTypeService = () => {
    return async (dispatch) => {
        try {
            const result = await http.get('/api/TaskType/getAll');
            console.log('getAllTaskTypeService => result', result);
            const action = getAllTaskTypeAction(result);
            dispatch(action)
        } catch (err) {
            console.log({ err })
        }
    }
}
export const getAllPriorityService = () => {
    return async (dispatch) => {
        try {
            const result = await http.get('/api/Priority/getAll');
            console.log('getAllPriorityService=> result', result)
            dispatch(getAllPriorityAction(result))
        } catch (err) {
            console.log({ err })
        }
    }
}
// export const getAllUserService = () => {
//     return async (dispatch) => {
//         try {
//             const result = await http.get('/api/Users/getUser');
//             console.log('getAllUserService => result ', result);
//             dispatch(getAllUserAction(result))
//         } catch (err) {
//             console.log({ err })
//         }
//     }
// }
export const createTaskService = (task) => {
    return async (dispatch) => {
        try {
            const result = await http.post('/api/Project/createTask', task);
            console.log('createTaskService=> result: ', result)
        } catch (err) {
            console.log({ err })
        }
    }
}
export const getAllStatusService = () => {
    return async (dispatch) => {
        try {
            const result = await http.get('/api/Status/getAll');
            console.log('getAllStatusService', result);
            dispatch(getAllStatusAction(result))
        } catch (err) {
            console.log({ err })
        }
    }
}
export const getUserByProjectIdService = (projectId) => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/api/Users/getUserByProjectId?idProject=${projectId}`);
            console.log('getUserByProjectIdService', result);
            dispatch(getAllUserAction(result))
        } catch (err) {
            console.log({ err })
        }
    }
}
export const getAllCommentService = (taskID) => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/api/Comment/getAll?taskId=${taskID}`);
            console.log("getAllTaskComment=>result", result);
        } catch (err) {
            console.log({ err });
        }
    }
}
export const getTaskDetailService = (taskID) => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/api/Project/getTaskDetail?taskId=${taskID}`);
            console.log("getTaskDetailService => result", result.data.content);
            dispatch(getTaskDetailAction(result.data.content))
        } catch (err) {
            console.log({ err })
        }
    }
}