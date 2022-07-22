import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { SET_SUBMIT_EDIT_PROJECT } from '../../redux/types/JiraFinal';
import { withFormik, Formik } from 'formik';
import * as Yup from 'yup';
import { getAllProjectCategory, updateProjectService } from '../../services/JiraServices';

function FormEdit(props) {
    const arrProjectCategory = useSelector(state => state.projectCategryReducer.arrProjectCategory);
    
    const dispatch = useDispatch();
    const { values, touched, errors, handleChange, handleSubmit, setValues, setFieldValue } = props
    console.log('form edit => props', props);
    
    useEffect(() => {
        const action = getAllProjectCategory();
        dispatch(action)

        // setFieldValue('description', values.description);
        dispatch({
            type: SET_SUBMIT_EDIT_PROJECT,
            submitFunction: handleSubmit
        })
    }, [])
    const handleEditorChange = (content, editor) => {
        // console.log('handleEditorChange', content)
        values.description = content;
        // console.log('values.description =>', values)
    }
    return (
        <form className='container-fluid' onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-6'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project ID</p>
                        <input value={values.id} className='form-control' name='id' disabled />
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project Name</p>
                        <input value={values.projectName} className='form-control' name='projectName' onChange={handleChange} />
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Category</p>
                        <select className='form-control' name="categoryId" value={values.categoryId} onChange={handleChange}>
                            {arrProjectCategory?.map((item, index) => {
                                return <option key={index} value={item.id}>{item.projectCategoryName}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Description</p>
                        <Editor
                            // name='descriptionFormEdit'
                            name='description'
                            initialValue={values.description}
                            // value={values.description}
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
                </div>
            </div>
        </form>
    )
}

const EditProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { projectEdit } = props
        return {
            id: projectEdit?.id,
            projectName: projectEdit?.projectName,
            description: projectEdit?.description,
            categoryId: projectEdit?.categoryId
        }
    },
    validationSchema: Yup.object().shape(),

    handleSubmit: (values, { props, setSubmitting }) => {
        console.log('form edit => du lieu gui di value => ', values);
        const action = updateProjectService(values);
        props.dispatch(action);
    },
    displayName: 'editProjectForm',
})(FormEdit);

const mapStateToProps = (state) => {
    return {
        projectEdit: state.ProjectReducer.projectEdit
    }
}
export default connect(mapStateToProps)(EditProjectForm)