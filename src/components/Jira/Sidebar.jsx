import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    BarsOutlined,
    PlusOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawerPopUpAction } from '../../redux/actions/UserSignInAction';
import FormCreateTask from '../Forms/FormCreateTask';


const { Header, Sider, Content } = Layout;

export default function Sidebar() {
    const [state, setState] = useState({
        collapsed: false
    });
    const dispatch = useDispatch();
    const toggle = () => {
        setState({
            collapsed: !state.collapsed
        })
    }
    return (
        // <div className="sideBar">
        //     <div className="sideBar-top">
        //         <div className="sideBar-icon">
        //             <i className="fab fa-jira" />
        //         </div>
        //         <div className="sideBar-icon" data-toggle="modal" data-target="#searchModal" style={{ cursor: 'pointer' }}>
        //             <i className="fa fa-search" />
        //             <span className="title">SEARCH ISSUES</span>
        //         </div>
        //         <div className="sideBar-icon">
        //             <i className="fa fa-plus" />
        //             <span className="title">CREATE ISSUES</span>
        //         </div>
        //     </div>
        //     <div className="sideBar-bottom">
        //         <div className="sideBar-icon">
        //             <i className="fa fa-question-circle" />
        //             <span className="title">ABOUT</span>
        //         </div>
        //     </div>
        // </div>
        <Sider trigger={null} collapsibale collapsed={state.collapsed} style={{ height: '100%' }}>
            <div className='text-right text-white pr-2' onClick={toggle} style={{ cursor: 'pointer' }}><BarsOutlined /></div>
            <Menu theme='dark' mode="inline" defaultSelectKeys={["1"]}>
                <Menu.Item key="1" icon={<PlusOutlined />} onClick={() => {
                    const action = openDrawerPopUpAction("Create task", <FormCreateTask />);
                    dispatch(action);
                }}>
                    Create task
                </Menu.Item>
                <Menu.Item key="2" icon={<SearchOutlined />}>
                    Search
                </Menu.Item>
            </Menu>
        </Sider>
    )
}
