import React from 'react'

export default function ContentMain(props) {

    const { projectDetail } = props;
    console.log('ContentMain => projectDetail', projectDetail)

    const renderCardTaskList = () => {
        // render task
        return projectDetail.lstTask?.map((task, index) => {
            return <div key={index} className="card pb-2" style={{ width: '17rem', height: 'auto' }}>
                <div className="card-header">
                    {/* BACKLOG 3 */}
                    {task.statusName}
                </div>
                <ul className="list-group list-group-flush">
                    {/* render task detail */}
                    {task.lstTaskDeTail?.map((taskDetail, index) => {
                        return (
                            <li key={index} className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }}>
                                <p className='font-weight-bold'>
                                    {taskDetail.taskName}
                                </p>
                                <div className="block" style={{ display: 'flex' }}>
                                    <div className="block-left">
                                        <p className='p-0 m-0 text-success'>{taskDetail.taskTypeDetail.taskType}</p>
                                        <p className='p-0 m-0 text-danger'>{taskDetail.priorityTask.priority}</p>
                                        {/* <i className="fa fa-bookmark" />
                                        <i className="fa fa-arrow-up" /> */}
                                    </div>
                                    <div className="block-right">
                                        <div className="avatar-group" style={{ display: 'flex' }}>
                                            {/* avatar user */}
                                            {taskDetail.assigness?.map((user, index) => {
                                                return <div key={index} className='avatar'>
                                                    <img src={user.avatar} alt={user.name} />
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </li>)
                    })}
                </ul>
            </div>
        })
    }
    return (
        <div className="content" style={{ display: 'flex' }}>
            {renderCardTaskList()}
            {/* <div className="card" style={{ width: '17rem', height: '25rem' }}>
                <div className="card-header">
                    SELECTED FOR DEVELOPMENT 2
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                </ul>
            </div>
            <div className="card" style={{ width: '17rem', height: '25rem' }}>
                <div className="card-header">
                    IN PROGRESS 2
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                </ul>
            </div>
            <div className="card" style={{ width: '17rem', height: '25rem' }}>
                <div className="card-header">
                    DONE 3
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
            </div> */}
        </div>
    )
}
