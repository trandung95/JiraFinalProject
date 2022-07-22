import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_DRAWER_POP_UP, OPEN_DRAWER_POP_UP } from '../../../redux/types/JiraFinal';

export default function DrawerPopUp(props) {
    const { visible, componentContentDrawer, callBackSubmit, title } = useSelector(state => state.DrawerPopUpReducer);
    const dispatch = useDispatch()


    const showDrawer = () => {
        const action = {
            type: OPEN_DRAWER_POP_UP,
        }
        dispatch(action)
    };

    const onClose = () => {
        const action = {
            type: CLOSE_DRAWER_POP_UP,
        }
        dispatch(action)
    };
    return (
        <>
            {/* <Button type="primary" onClick={showDrawer}>
                New account
            </Button> */}
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={callBackSubmit} type="primary">Submit</Button>
                    </Space>
                }
            >
                {componentContentDrawer}
            </Drawer>
        </>
    )
}
