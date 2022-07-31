import { GET_TASK_DETAIL } from "../types/JiraFinal";

const stateDefault = {
    taskDetailModal: {
        content: {
            priorityTask: {
                priorityId: 1,
                priority: "High"
            },
            taskTypeDetail: {
                id: 1,
                taskType: "bug"
            },
            assigness: [
                {
                    id: 2308,
                    avatar: "https://ui-avatars.com/api/?name=Nguyen Nhan",
                    name: "Nguyen Nhan",
                    alias: "nguyen-nhan"
                },
                {
                    id: 2088,
                    avatar: "https://ui-avatars.com/api/?name=Anh Tu",
                    name: "Anh Tu",
                    alias: "anh-tu"
                }
            ],
            lstComment: [],
            taskId: 5007,
            taskName: "tas",
            alias: "tas",
            description: "<p>task 2</p>",
            statusId: "2",
            originalEstimate: 5,
            timeTrackingSpent: 2,
            timeTrackingRemaining: 1,
            typeId: 1,
            priorityId: 3,
            projectId: 6707
        }
    },
};

export const TaskManagementReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_TASK_DETAIL: {
            state.taskDetailModal.content = action.content
            return { ...state }
        }
        default: return state
    }
}