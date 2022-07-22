import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { CreateProjectServices, getAllProjectCategory } from '../../services/JiraServices';
import { withFormik, Formik } from 'formik';


function CreateProject(props) {

    const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = props;
    const arrProjectCategory = useSelector(state => state.projectCategryReducer.arrProjectCategory);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        projectName: '',
        description: '',
        categoryId: ''
    })

    useEffect(() => {
        const action = getAllProjectCategory();
        dispatch(action)
    }, [])

    const handleEditorChange = (content, editor) => {
        // console.log('value', value);
        setFieldValue('description', content)
    }


    return (
        <div className='container'>
            <h3 className='text-center'>CreateProject</h3>
            <form className='container' onSubmit={handleSubmit} >
                <div className='form-group'>
                    <p>Name</p>
                    <input className='form-control' name='projectName' onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <p>Description</p>
                    {/* <input className='form-control' name='description' /> */}
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
                    <select name="categoryId" className='form-control' onChange={handleChange}>
                        {arrProjectCategory.map((item, index) => {
                            return <option key={index} value={item.id}>{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
                <button type='submit' className='btn btn-success'>Create project</button>
            </form>
        </div>
    )
}
const CreateProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        // console.log('propsvalue', props)
        return {
            projectName: '',
            description: '',
            categoryId: props.arrProjectCategory[0]?.id
        }
    },
    handleChange: e => {
        console.log(e)
    },
    handleSubmit: (values, { props, setSubmitting }) => {
        console.log('handleSubmit => values', values);
        const action = CreateProjectServices(values);
        props.dispatch(action)
    },
    displayName: 'CreateProjectFormik',
})(CreateProject);

const mapStateToProps = (state) => {
    return {
        arrProjectCategory: state.projectCategryReducer.arrProjectCategory
    }
}
export default connect(mapStateToProps)(CreateProjectForm)