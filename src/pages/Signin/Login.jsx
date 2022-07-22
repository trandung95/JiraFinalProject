import React from 'react';
import { Prompt } from 'react-router-dom';
import { Col, Row, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, FacebookOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';
import { withFormik, Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux'
import { jiraSignInService } from '../../services/JiraServices';


function Login(props) {

  const { values, touched, errors, handleChange, handleBlur, handleSubmit, } = props;
  return (
    <form onSubmit={handleSubmit} className='container' style={{ height: window.innerHeight }}>
      <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: window.innerHeight }}>
        <h1 className='text-center'>{props.displayName}Login Page</h1>

        <div className='d-flex'>
          <Input onChange={handleChange} style={{ minWidth: "300px" }} name='userName' size='large' placeholder='Username' prefix={<UserOutlined />} />
        </div>
        {/* div này dùng để hiện thông báo lỗi, sử dụng thuộc tính errors */}
        <div className='text-danger'>{errors.userName}</div>

        <div className='d-flex mt-3'>
          <Input onChange={handleChange} style={{ minWidth: "300px" }} type="password" name='password' size='large' placeholder='Password' prefix={<LockOutlined />} />
        </div>

        {/* toán tử 3 ngôi: nếu đụng phần password mà phạm lỗi thì hiện lên div chứa báo lỗi, không thì sẽ để rỗng '' */}
        {touched.password ? <div className='text-danger'>{errors.password}</div> : ''}

        <div className="mt-3 d-flex">
          <Button htmlType='submit' style={{ backgroundColor: 'rgb(102,117,223)', color: '#fff', minWidth: "300px" }} type="prmary" shape="round" size={'medium'}>Login</Button>
        </div>
        <div className="social mt-3">
          <Button className='ml-2' type='primary' shape='circle' icon={<FacebookOutlined />} size={"large"}></Button>
          <Button className='ml-2' type='primary' shape='circle' icon={<TwitterOutlined />} size={"large"}></Button>
          <Button className='ml-2' type='primary' shape='circle' icon={<YoutubeOutlined />} size={"large"}></Button>
        </div>
      </div>
    </form>
  )
}

const LoginJiraWithFormik = withFormik({
  mapPropsToValues: () => ({
    userName: '',
    password: '',
  }),
  // validationSchema là phần xét lỗi, phạm lỗi nào sẽ hiện thông báo lỗi thông qua thuộc tính errors
  validationSchema: Yup.object().shape({
    userName: Yup.string().required('Username is required!').email('Email is invalid'),
    password: Yup.string().min(6, 'Password too short, must be at least 6 character').max(32, 'Password must not be over 32 character').required('Password must be fill'),
  }),

  //hàm handleChange bị cancel nhưng vẫn đặt vào input để lấy value
  handleChange: e => {
    console.log(e)
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    // let action = {
    //   type: USER_SIGNIN_API,
    //   userLogin: {
    //     userName: values.userName,
    //     password: values.password
    //   }
    // }
    // setSubmitting(true)
    const action = jiraSignInService(values)
    props.dispatch(action);
    
    console.log("login => props: ", props);
    
    // console.log('login => value: ', values);
  },

  displayName: 'Login Page',
})(Login);

//conect bọc ngoài component nào thì component đó sẽ có props của redux
export default connect()(LoginJiraWithFormik);

// commitg