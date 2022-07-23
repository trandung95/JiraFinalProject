import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Slider } from 'antd';
// import { number } from 'yup';
// import { withFormik, Formik } from 'formik';
// import * as Yup from 'yup';
import { createTaskService, getAllPriorityService, getAllProjectService, getAllStatusService, getAllTaskTypeService, getAllUserService, getUserByProjectIdService } from '../../services/JiraServices';
import { SET_SUBMIT_EDIT_PROJECT } from '../../redux/types/JiraFinal';

const { Option } = Select;
const children = [];
export default function FormCreateTask(props) {

    const { arrProject, arrTaskType, arrPriority, arrUser, arrStatus } = useSelector(state => state.ProjectManagementReducer);
    // console.log("arrProject", arrProject);
    const dispatch = useDispatch();
    const { callBackSubmit } = useSelector(state => state.DrawerPopUpReducer)

    useEffect(() => {
        dispatch(getAllProjectService());
        dispatch(getAllTaskTypeService());
        dispatch(getAllPriorityService());
        // dispatch(getAllUserService());
        dispatch(getAllStatusService());
        dispatch({
            type: SET_SUBMIT_EDIT_PROJECT,
            submitFunction: handleSubmitValue
        })
    }, [])
    // const handleChange = (value) => {
    //     console.log(`Selected: ${value}`);
    // };

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 5,
        timeTrackingRemaining: 15
    })
    const [inputValue, setInputValue] = useState({
        // listUserAsign: [],
        // taskName: "",
        // description: "",
        // statusId: "",
        // originalEstimate: 0,
        // timeTrackingSpent: 0,
        // timeTrackingRemaining: 0,
        // projectId: 0,
        // typeId: 0,
        // priorityId: 0
    })
    const handleChangeValue = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        })
        console.log(inputValue)
    }
    //lấy value từ Editor
    const handleEditorChange = (content, editor) => {
        setInputValue({
            ...inputValue,
            description: content
        })
    }
    const handleSubmitValue = (e) => {
        // e.preventDefault()
        console.log('handleSubmitValue', inputValue)
        dispatch(createTaskService(inputValue))
    }

    const userOption = arrUser?.map((item, index) => {
        return { label: item.name, value: item.userId }
    })
    // console.log("userOption", userOption)

    return (
        <div className='container'>
            <div className='form-group'>
                <button className='btn btn-success' onClick={handleSubmitValue}>submit</button>
                <p>Project</p>
                <select name="projectId" className='form-control' onChange={(e) => {
                    let projectId = e.target.value;
                    console.log("projectID", projectId)
                    setInputValue({ ...inputValue, projectId: projectId })
                    dispatch(getUserByProjectIdService(projectId))
                }}>
                    {arrProject?.map((item, index) => {
                        return <option key={index} value={item.id}>{item.projectName}</option>
                    })}
                </select>
            </div>

            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Task name</p>
                        <input className='form-control' name='taskName' onChange={handleChangeValue} />
                    </div>
                    <div className='col-6'>
                        <p>Status Id</p>
                        <select className='form-control' name='statusId' onChange={handleChangeValue} >
                            {arrStatus?.map((item, index) => {
                                return <option key={index} value={item.statusId}>{item.statusName}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>priority</p>
                        <select name='priorityId' className='form-control' onChange={handleChangeValue}>
                            {/* <option>high</option>
                            <option>low</option> */}
                            {arrPriority?.map((item, index) => {
                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-6'>
                        <p>type</p>
                        <select name='typeId' className='form-control' onChange={handleChangeValue}>
                            {/* <option>New Task</option>
                            <option>Bug</option> */}
                            {arrTaskType?.map((item, index) => {
                                return <option key={index} value={item.id}>{item.taskType}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-12 mt-3'>
                        <p>original Estimate</p>
                        <input name="originalEstimate" type='number' min={0} defaultValue={0} className="form-control" onChange={handleChangeValue} />
                    </div>
                </div>
            </div>
            <div>
                <p>Description</p>
                <Editor
                    name='description'
                    // initialValue='<p>text here...</p>'
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={handleEditorChange}
                />
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Members</p>
                        <Select
                            mode="multiple"
                            options={userOption}
                            optionFilterProp="label"
                            placeholder="Please select"
                            onChange={(values) => {
                                setInputValue({
                                    ...inputValue,
                                    listUserAsign: values
                                })
                            }}
                            style={{
                                width: '100%',
                            }}
                            onSelect={(value) => {
                                console.log(value)
                            }}
                        >
                            {children}
                        </Select>
                    </div>
                    <div className='col-6'>
                        <p>Time tracking</p>
                        <Slider defaultValue={30} value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                        <div className='row'>
                            <div className='col-6 text-left'>{timeTracking.timeTrackingSpent}h Logged</div>
                            <div className='col-6 text-right'>{timeTracking.timeTrackingRemaining}h remaining</div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <input className='form-control' defaultValue={0} min={0} placeholder='Time spent' type={"number"} name="timeTrackingSpent" onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingSpent: e.target.value
                                    });
                                    setInputValue({
                                        ...inputValue,
                                        timeTrackingSpent: e.target.value
                                    })
                                }} />
                            </div>
                            <div className='col-6'>
                                <input className='form-control' defaultValue={0} min={0} placeholder='Time remaining' type={"number"} name="timeTrackingRemaining" onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    });
                                    setInputValue({
                                        ...inputValue,
                                        timeTrackingRemaining: e.target.value
                                    })
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


// const formCreateTask = withFormik({
//     enableReinitialize: true,
//     mapPropsToValues: (props) => {

//         return {
//             taskName: "",
//             description: "",
//             statusId: "",
//             originalEstimate: 0,
//             timeTrackingSpent: 0,
//             timeTrackingRemaining: 0,
//             projectId: 0,
//             typeId: 0,
//             priorityId: 0
//         }
//     },
//     validationSchema: Yup.object().shape(),

//     handleSubmit: (values, { props, setSubmitting }) => {

//         console.log("FormCreateTask => value", values)
//     },
//     displayName: 'createTaskForm',
// })(FormCreateTask);


// export default formCreateTask;